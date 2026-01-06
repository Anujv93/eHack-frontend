/**
 * Strapi Data Restore Script
 * 
 * This script restores data from your backup JSON files to a new Strapi instance.
 * 
 * IMPORTANT: Before running this script:
 * 1. Set up your new Strapi instance
 * 2. Create the SAME content types (certificates, certification-partners, etc.)
 * 3. Generate an API token with full access in your new Strapi admin panel
 * 
 * Usage: 
 *   npx tsx scripts/restore-strapi-data.ts --url "NEW_STRAPI_URL" --token "NEW_API_TOKEN"
 * 
 * Example:
 *   npx tsx scripts/restore-strapi-data.ts --url "http://localhost:1337" --token "your-new-token"
 */

import * as fs from 'fs';
import * as path from 'path';

// Parse command line arguments
function parseArgs(): { url: string; token: string; dryRun: boolean } {
    const args = process.argv.slice(2);
    let url = '';
    let token = '';
    let dryRun = false;

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--url' && args[i + 1]) {
            url = args[i + 1];
            i++;
        } else if (args[i] === '--token' && args[i + 1]) {
            token = args[i + 1];
            i++;
        } else if (args[i] === '--dry-run') {
            dryRun = true;
        }
    }

    if (!url) {
        console.error('\n❌ Error: --url is required');
        console.log('\nUsage: npx tsx scripts/restore-strapi-data.ts --url "STRAPI_URL" --token "API_TOKEN" [--dry-run]');
        console.log('\nOptions:');
        console.log('  --url      New Strapi instance URL (required)');
        console.log('  --token    API token with write access (required for actual restore)');
        console.log('  --dry-run  Preview what would be restored without making changes');
        process.exit(1);
    }

    return { url, token, dryRun };
}

const { url: STRAPI_URL, token: STRAPI_TOKEN, dryRun: DRY_RUN } = parseArgs();

// Backup directory
const BACKUP_DIR = path.join(__dirname, '..', 'strapi-backup');

// Color codes for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    blue: '\x1b[34m',
};

function log(message: string, color: string = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function getHeaders(): HeadersInit {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (STRAPI_TOKEN) {
        headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    return headers;
}

// Sleep helper
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Clean data for Strapi v5 POST request
// Remove system fields that Strapi generates automatically
function cleanDataForCreate(item: any): any {
    const cleaned = { ...item };

    // Remove system fields
    delete cleaned.id;
    delete cleaned.documentId;
    delete cleaned.createdAt;
    delete cleaned.updatedAt;
    delete cleaned.publishedAt;

    // Handle nested relations - convert to IDs only
    if (cleaned.certification_partner) {
        // We'll need to match by slug or name and get the new ID
        cleaned.certification_partner = null; // Will be linked separately
    }

    if (cleaned.certification_categories) {
        cleaned.certification_categories = null;
    }

    // Clean pageContent items
    if (cleaned.pageContent && Array.isArray(cleaned.pageContent)) {
        cleaned.pageContent = cleaned.pageContent.map((section: any) => {
            const cleanedSection = { ...section };
            delete cleanedSection.id;

            // Clean nested arrays within sections
            Object.keys(cleanedSection).forEach(key => {
                if (Array.isArray(cleanedSection[key])) {
                    cleanedSection[key] = cleanedSection[key].map((item: any) => {
                        if (typeof item === 'object' && item !== null) {
                            const cleanedItem = { ...item };
                            delete cleanedItem.id;
                            return cleanedItem;
                        }
                        return item;
                    });
                }
            });

            return cleanedSection;
        });
    }

    // Clean certificates array (for partners)
    if (cleaned.certificates) {
        delete cleaned.certificates; // Relations will be created when certificates are added
    }

    // Clean steps array
    if (cleaned.steps && Array.isArray(cleaned.steps)) {
        cleaned.steps = cleaned.steps.map((step: any) => {
            const cleanedStep = { ...step };
            delete cleanedStep.id;
            return cleanedStep;
        });
    }

    return cleaned;
}

// Create a single item in Strapi
async function createItem(endpoint: string, data: any, itemName: string): Promise<{ success: boolean; id?: number; documentId?: string; error?: string }> {
    if (DRY_RUN) {
        log(`   📋 [DRY-RUN] Would create: ${itemName}`, colors.blue);
        return { success: true };
    }

    try {
        const url = `${STRAPI_URL}${endpoint}`;
        const cleanedData = cleanDataForCreate(data);

        const res = await fetch(url, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ data: cleanedData }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errorText}`);
        }

        const result = await res.json();
        return {
            success: true,
            id: result.data?.id,
            documentId: result.data?.documentId
        };
    } catch (error) {
        return { success: false, error: String(error) };
    }
}

// Restore content types in order (partners first, then certificates)
interface RestoreConfig {
    name: string;
    endpoint: string;
    backupFile: string;
    identifyBy: string; // Field to use for logging
}

const RESTORE_ORDER: RestoreConfig[] = [
    {
        name: 'Certification Partners',
        endpoint: '/api/certification-partners',
        backupFile: 'certification-partners.json',
        identifyBy: 'Name'
    },
    {
        name: 'Admission Process',
        endpoint: '/api/admission-process',
        backupFile: 'admission-process.json',
        identifyBy: 'Title'
    },
    {
        name: 'Certificates',
        endpoint: '/api/certificates',
        backupFile: 'certificates-with-content.json', // Use the one with full pageContent
        identifyBy: 'Title'
    },
];

async function loadBackupData(filename: string): Promise<any[]> {
    const filePath = path.join(BACKUP_DIR, filename);

    if (!fs.existsSync(filePath)) {
        log(`   ⚠️ Backup file not found: ${filename}`, colors.yellow);
        return [];
    }

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        log(`   ❌ Failed to read ${filename}: ${error}`, colors.red);
        return [];
    }
}

async function main() {
    log('\n╔════════════════════════════════════════════════════════════╗', colors.magenta);
    log('║           STRAPI DATA RESTORE SCRIPT                      ║', colors.magenta);
    log('║           Restore your backup to a new instance           ║', colors.magenta);
    log('╚════════════════════════════════════════════════════════════╝', colors.magenta);

    log(`\n🔧 Configuration:`, colors.cyan);
    log(`   Target Strapi: ${STRAPI_URL}`, colors.reset);
    log(`   Auth Token: ${STRAPI_TOKEN ? '✅ Configured' : '⚠️ Not set'}`, STRAPI_TOKEN ? colors.green : colors.yellow);
    log(`   Backup Dir: ${BACKUP_DIR}`, colors.reset);
    log(`   Mode: ${DRY_RUN ? '🔍 DRY RUN (no changes will be made)' : '⚡ LIVE (will create data)'}`, DRY_RUN ? colors.blue : colors.yellow);

    if (!DRY_RUN && !STRAPI_TOKEN) {
        log('\n❌ API token is required for live restore. Use --dry-run to preview.', colors.red);
        process.exit(1);
    }

    // Check backup directory
    if (!fs.existsSync(BACKUP_DIR)) {
        log(`\n❌ Backup directory not found: ${BACKUP_DIR}`, colors.red);
        process.exit(1);
    }

    let totalCreated = 0;
    let totalFailed = 0;
    let totalSkipped = 0;

    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', colors.reset);
    log('📦 RESTORING CONTENT TYPES', colors.cyan);
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', colors.reset);

    for (const config of RESTORE_ORDER) {
        log(`\n📡 Restoring: ${config.name}`, colors.cyan);

        const items = await loadBackupData(config.backupFile);

        if (items.length === 0) {
            log(`   ℹ️ No items to restore`, colors.yellow);
            continue;
        }

        log(`   Found ${items.length} items to restore`, colors.reset);

        for (const item of items) {
            const itemName = item[config.identifyBy] || `Item ${item.id}`;

            const result = await createItem(config.endpoint, item, itemName);

            if (result.success) {
                if (DRY_RUN) {
                    totalSkipped++;
                } else {
                    log(`   ✅ Created: ${itemName} (ID: ${result.id})`, colors.green);
                    totalCreated++;
                }
            } else {
                log(`   ❌ Failed: ${itemName} - ${result.error}`, colors.red);
                totalFailed++;
            }

            // Small delay between requests
            await sleep(300);
        }
    }

    // Summary
    log('\n╔════════════════════════════════════════════════════════════╗', colors.magenta);
    log('║                    RESTORE COMPLETE!                       ║', colors.magenta);
    log('╚════════════════════════════════════════════════════════════╝', colors.magenta);

    log('\n📊 Summary:', colors.cyan);
    if (DRY_RUN) {
        log(`   Mode: DRY RUN (no changes made)`, colors.blue);
        log(`   Items that would be created: ${totalSkipped}`, colors.reset);
    } else {
        log(`   Successfully Created: ${totalCreated}`, colors.green);
    }
    if (totalFailed > 0) {
        log(`   Failed: ${totalFailed}`, colors.red);
    }

    log('\n💡 Notes:', colors.yellow);
    log('   - Relations between content types may need manual linking', colors.reset);
    log('   - Media files (images) still reference old Strapi URLs', colors.reset);
    log('   - You may need to re-publish content in the admin panel', colors.reset);

    if (DRY_RUN) {
        log('\n🔍 This was a dry run. Run without --dry-run to actually restore data.', colors.blue);
    }
}

// Run the script
main().catch(error => {
    log(`\n❌ Fatal error: ${error}`, colors.red);
    process.exit(1);
});
