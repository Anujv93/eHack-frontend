/**
 * Strapi Data Backup Script (CLI Version)
 * 
 * This script fetches ALL data from your Strapi instance and saves it locally.
 * Run this before you run out of API calls to preserve all your content.
 * 
 * Usage: 
 *   npx tsx scripts/backup-strapi-cli.ts --url "YOUR_STRAPI_URL" --token "YOUR_API_TOKEN"
 * 
 * Example:
 *   npx tsx scripts/backup-strapi-cli.ts --url "https://your-project.strapicloud.io" --token "your-api-token-here"
 */

import * as fs from 'fs';
import * as path from 'path';

// Parse command line arguments
function parseArgs(): { url: string; token: string } {
    const args = process.argv.slice(2);
    let url = '';
    let token = '';

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--url' && args[i + 1]) {
            url = args[i + 1];
            i++;
        } else if (args[i] === '--token' && args[i + 1]) {
            token = args[i + 1];
            i++;
        }
    }

    if (!url) {
        console.error('\n❌ Error: --url is required');
        console.log('\nUsage: npx tsx scripts/backup-strapi-cli.ts --url "STRAPI_URL" --token "API_TOKEN"');
        console.log('\nExample:');
        console.log('  npx tsx scripts/backup-strapi-cli.ts --url "https://your-project.strapicloud.io" --token "abc123..."');
        process.exit(1);
    }

    return { url, token };
}

const { url: STRAPI_URL, token: STRAPI_TOKEN } = parseArgs();

// Backup directory
const BACKUP_DIR = path.join(__dirname, '..', 'strapi-backup');
const MEDIA_BACKUP_DIR = path.join(BACKUP_DIR, 'media');

// Color codes for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
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

// Generic fetch function with pagination support
async function fetchAllFromEndpoint(
    endpoint: string,
    populateQuery: string = 'populate=*'
): Promise<{ data: any[]; meta: any }> {
    const allData: any[] = [];
    let page = 1;
    const pageSize = 100;
    let hasMore = true;

    log(`\n📡 Fetching from: ${endpoint}`, colors.cyan);

    while (hasMore) {
        const url = `${STRAPI_URL}${endpoint}?${populateQuery}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

        try {
            const res = await fetch(url, { headers: getHeaders() });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP ${res.status}: ${errorText}`);
            }

            const json = await res.json();

            // Handle collection types (with data array)
            if (Array.isArray(json.data)) {
                allData.push(...json.data);
                const totalPages = json.meta?.pagination?.pageCount || 1;
                log(`   Page ${page}/${totalPages} - Got ${json.data.length} items`, colors.reset);
                hasMore = page < totalPages;
                page++;
            }
            // Handle single types (data is an object)
            else if (json.data) {
                allData.push(json.data);
                hasMore = false;
            }
            else {
                hasMore = false;
            }
        } catch (error) {
            log(`   ❌ Error fetching ${endpoint}: ${error}`, colors.red);
            hasMore = false;
        }
    }

    log(`   ✅ Total items fetched: ${allData.length}`, colors.green);
    return { data: allData, meta: { totalCount: allData.length } };
}

// Download media files
async function downloadMedia(url: string, filename: string): Promise<boolean> {
    try {
        const fullUrl = url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
        const res = await fetch(fullUrl);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const buffer = await res.arrayBuffer();
        const filePath = path.join(MEDIA_BACKUP_DIR, filename);

        // Create subdirectories if needed
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(filePath, Buffer.from(buffer));
        return true;
    } catch (error) {
        log(`   ⚠️ Failed to download: ${url}`, colors.yellow);
        return false;
    }
}

// Extract all media URLs from data
function extractMediaUrls(data: any, urls: Set<string> = new Set()): Set<string> {
    if (!data) return urls;

    if (typeof data === 'string') {
        // Check if it's a URL
        if (data.startsWith('/uploads/') || (data.startsWith('http') && data.includes('/uploads/'))) {
            urls.add(data);
        }
    } else if (Array.isArray(data)) {
        data.forEach(item => extractMediaUrls(item, urls));
    } else if (typeof data === 'object') {
        // Check for Strapi media format
        if (data.url && typeof data.url === 'string') {
            urls.add(data.url);
        }
        // Check for formats (thumbnails, etc.)
        if (data.formats) {
            Object.values(data.formats).forEach((format: any) => {
                if (format?.url) urls.add(format.url);
            });
        }
        // Recurse into object properties
        Object.values(data).forEach(value => extractMediaUrls(value, urls));
    }

    return urls;
}

// Define all Strapi endpoints to backup
const ENDPOINTS = [
    {
        name: 'certificates',
        endpoint: '/api/certificates',
        // Deep populate for all page content
        populate: 'populate[pageContent][populate]=*&populate[certification_partner][populate]=*&populate[certification_categories][populate]=*'
    },
    {
        name: 'certification-partners',
        endpoint: '/api/certification-partners',
        populate: 'populate=*'
    },
    {
        name: 'certification-categories',
        endpoint: '/api/certification-categories',
        populate: 'populate=*'
    },
    {
        name: 'admission-process',
        endpoint: '/api/admission-process',
        populate: 'populate=*'
    },
    // Add more endpoints here if you have other content types
    // Common Strapi endpoints:
    {
        name: 'upload-files',
        endpoint: '/api/upload/files',
        populate: ''
    }
];

async function main() {
    log('\n╔════════════════════════════════════════════════════════════╗', colors.magenta);
    log('║           STRAPI DATA BACKUP SCRIPT                       ║', colors.magenta);
    log('║           Saving all your precious data!                  ║', colors.magenta);
    log('╚════════════════════════════════════════════════════════════╝', colors.magenta);

    log(`\n🔧 Configuration:`, colors.cyan);
    log(`   Strapi URL: ${STRAPI_URL}`, colors.reset);
    log(`   Auth Token: ${STRAPI_TOKEN ? '✅ Configured' : '⚠️ Not set (may fail on auth-required endpoints)'}`, STRAPI_TOKEN ? colors.green : colors.yellow);
    log(`   Backup Dir: ${BACKUP_DIR}`, colors.reset);

    // Create backup directories
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    if (!fs.existsSync(MEDIA_BACKUP_DIR)) {
        fs.mkdirSync(MEDIA_BACKUP_DIR, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const allData: Record<string, any> = {};
    const allMediaUrls = new Set<string>();

    // Fetch all endpoints
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', colors.reset);
    log('📦 FETCHING ALL CONTENT TYPES', colors.cyan);
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', colors.reset);

    for (const config of ENDPOINTS) {
        try {
            const result = await fetchAllFromEndpoint(config.endpoint, config.populate);
            allData[config.name] = result;

            // Extract media URLs
            extractMediaUrls(result.data, allMediaUrls);

            // Save individual backup file
            const filePath = path.join(BACKUP_DIR, `${config.name}.json`);
            fs.writeFileSync(filePath, JSON.stringify(result.data, null, 2));
            log(`   💾 Saved: ${config.name}.json`, colors.green);
        } catch (error) {
            log(`   ❌ Failed: ${config.name} - ${error}`, colors.red);
            allData[config.name] = { data: [], error: String(error) };
        }
    }

    // Save combined backup
    const combinedPath = path.join(BACKUP_DIR, `full-backup-${timestamp}.json`);
    fs.writeFileSync(combinedPath, JSON.stringify(allData, null, 2));
    log(`\n💾 Full backup saved: full-backup-${timestamp}.json`, colors.green);

    // Download media files
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', colors.reset);
    log('🖼️  DOWNLOADING MEDIA FILES', colors.cyan);
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', colors.reset);
    log(`   Found ${allMediaUrls.size} media files to download`, colors.reset);

    let downloadedCount = 0;
    let failedCount = 0;

    for (const url of allMediaUrls) {
        // Extract filename from URL
        const urlPath = url.startsWith('http') ? new URL(url).pathname : url;
        const filename = urlPath.replace('/uploads/', '');

        const success = await downloadMedia(url, filename);
        if (success) {
            downloadedCount++;
            log(`   ✅ Downloaded: ${filename}`, colors.green);
        } else {
            failedCount++;
        }
    }

    // Create an index of all media files
    const mediaIndex = Array.from(allMediaUrls).map(url => {
        const urlPath = url.startsWith('http') ? new URL(url).pathname : url;
        return {
            originalUrl: url,
            localPath: path.join('media', urlPath.replace('/uploads/', ''))
        };
    });
    fs.writeFileSync(
        path.join(BACKUP_DIR, 'media-index.json'),
        JSON.stringify(mediaIndex, null, 2)
    );

    // Summary
    log('\n╔════════════════════════════════════════════════════════════╗', colors.magenta);
    log('║                    BACKUP COMPLETE!                        ║', colors.magenta);
    log('╚════════════════════════════════════════════════════════════╝', colors.magenta);
    log('\n📊 Summary:', colors.cyan);
    log(`   Content Types Backed Up: ${ENDPOINTS.length}`, colors.reset);
    log(`   Media Files Downloaded: ${downloadedCount}/${allMediaUrls.size}`, colors.reset);
    if (failedCount > 0) {
        log(`   Failed Downloads: ${failedCount}`, colors.yellow);
    }
    log(`\n📁 Backup Location: ${BACKUP_DIR}`, colors.green);
    log('\n📋 Files created:', colors.cyan);
    log(`   - full-backup-${timestamp}.json (all data combined)`, colors.reset);
    ENDPOINTS.forEach(e => log(`   - ${e.name}.json`, colors.reset));
    log(`   - media-index.json`, colors.reset);
    log(`   - media/ (folder with all downloaded media)`, colors.reset);

    log('\n💡 To restore this data to a new Strapi instance:', colors.yellow);
    log('   1. Set up the same content types in your new Strapi', colors.reset);
    log('   2. Use the Strapi import/export plugin or', colors.reset);
    log('   3. Create a restore script using the REST API', colors.reset);
    log('   4. Upload media files to your new instance', colors.reset);
}

// Run the script
main().catch(error => {
    log(`\n❌ Fatal error: ${error}`, colors.red);
    process.exit(1);
});
