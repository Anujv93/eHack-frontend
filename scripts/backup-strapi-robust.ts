/**
 * Strapi Data Backup Script (Robust Version)
 * 
 * This version has longer timeouts and retry logic for cloud instances.
 * 
 * Usage: 
 *   npx tsx scripts/backup-strapi-robust.ts --url "YOUR_STRAPI_URL" --token "YOUR_API_TOKEN"
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
        console.log('\nUsage: npx tsx scripts/backup-strapi-robust.ts --url "STRAPI_URL" --token "API_TOKEN"');
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

// Sleep helper
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch with timeout and retry
async function fetchWithRetry(
    url: string,
    options: RequestInit,
    maxRetries: number = 3,
    timeoutMs: number = 60000
): Promise<Response> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            return response;
        } catch (error: any) {
            lastError = error;
            log(`   ⚠️ Attempt ${attempt}/${maxRetries} failed: ${error.message}`, colors.yellow);

            if (attempt < maxRetries) {
                const waitTime = attempt * 2000; // Exponential backoff
                log(`   ⏳ Waiting ${waitTime / 1000}s before retry...`, colors.yellow);
                await sleep(waitTime);
            }
        }
    }

    throw lastError || new Error('Fetch failed after retries');
}

// Generic fetch function with pagination support
async function fetchAllFromEndpoint(
    endpoint: string,
    populateQuery: string = 'populate=*'
): Promise<{ data: any[]; meta: any }> {
    const allData: any[] = [];
    let page = 1;
    const pageSize = 25; // Smaller page size to avoid timeouts
    let hasMore = true;

    log(`\n📡 Fetching from: ${endpoint}`, colors.cyan);

    while (hasMore) {
        const url = `${STRAPI_URL}${endpoint}?${populateQuery}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
        log(`   🔗 Requesting page ${page}...`, colors.reset);

        try {
            const res = await fetchWithRetry(url, { headers: getHeaders() }, 3, 90000);

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP ${res.status}: ${errorText}`);
            }

            const json = await res.json();

            // Handle collection types (with data array)
            if (Array.isArray(json.data)) {
                allData.push(...json.data);
                const totalPages = json.meta?.pagination?.pageCount || 1;
                const total = json.meta?.pagination?.total || json.data.length;
                log(`   ✅ Page ${page}/${totalPages} - Got ${json.data.length} items (Total: ${total})`, colors.green);
                hasMore = page < totalPages;
                page++;

                // Small delay between requests to avoid rate limiting
                if (hasMore) {
                    await sleep(500);
                }
            }
            // Handle single types (data is an object)
            else if (json.data) {
                allData.push(json.data);
                log(`   ✅ Got single type item`, colors.green);
                hasMore = false;
            }
            else {
                log(`   ℹ️ No data returned`, colors.yellow);
                hasMore = false;
            }
        } catch (error) {
            log(`   ❌ Error fetching ${endpoint}: ${error}`, colors.red);
            hasMore = false;
        }
    }

    log(`   📊 Total items fetched: ${allData.length}`, colors.green);
    return { data: allData, meta: { totalCount: allData.length } };
}

// Download media files with retry
async function downloadMedia(url: string, filename: string): Promise<boolean> {
    try {
        const fullUrl = url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
        const res = await fetchWithRetry(fullUrl, {}, 2, 30000);

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
        if (data.startsWith('/uploads/') || (data.startsWith('http') && data.includes('/uploads/'))) {
            urls.add(data);
        }
    } else if (Array.isArray(data)) {
        data.forEach(item => extractMediaUrls(item, urls));
    } else if (typeof data === 'object') {
        if (data.url && typeof data.url === 'string') {
            urls.add(data.url);
        }
        if (data.formats) {
            Object.values(data.formats).forEach((format: any) => {
                if (format?.url) urls.add(format.url);
            });
        }
        Object.values(data).forEach(value => extractMediaUrls(value, urls));
    }

    return urls;
}

// Define all Strapi endpoints to backup
const ENDPOINTS = [
    {
        name: 'certificates',
        endpoint: '/api/certificates',
        // Simple populate - gets first level of relations
        populate: 'populate=*'
    },
    {
        name: 'certificates-with-content',
        endpoint: '/api/certificates',
        // Try pageContent populate separately
        populate: 'populate[pageContent][populate]=*'
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
    {
        name: 'upload-files',
        endpoint: '/api/upload/files',
        populate: ''
    }
];

async function main() {
    log('\n╔════════════════════════════════════════════════════════════╗', colors.magenta);
    log('║        STRAPI DATA BACKUP SCRIPT (ROBUST)                 ║', colors.magenta);
    log('║        With retry logic & extended timeouts               ║', colors.magenta);
    log('╚════════════════════════════════════════════════════════════╝', colors.magenta);

    log(`\n🔧 Configuration:`, colors.cyan);
    log(`   Strapi URL: ${STRAPI_URL}`, colors.reset);
    log(`   Auth Token: ${STRAPI_TOKEN ? '✅ Configured' : '⚠️ Not set'}`, STRAPI_TOKEN ? colors.green : colors.yellow);
    log(`   Backup Dir: ${BACKUP_DIR}`, colors.reset);
    log(`   Timeout: 90 seconds per request`, colors.reset);
    log(`   Retries: 3 attempts per endpoint`, colors.reset);

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
    let successCount = 0;
    let failCount = 0;

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
            log(`   💾 Saved: ${config.name}.json (${result.data.length} items)`, colors.green);

            if (result.data.length > 0) successCount++;
            else failCount++;

            // Delay between endpoints
            await sleep(1000);
        } catch (error) {
            log(`   ❌ Failed: ${config.name} - ${error}`, colors.red);
            allData[config.name] = { data: [], error: String(error) };
            failCount++;
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
    let failedDownloads = 0;

    for (const url of allMediaUrls) {
        const urlPath = url.startsWith('http') ? new URL(url).pathname : url;
        const filename = urlPath.replace('/uploads/', '');

        const success = await downloadMedia(url, filename);
        if (success) {
            downloadedCount++;
            log(`   ✅ Downloaded: ${filename}`, colors.green);
        } else {
            failedDownloads++;
        }

        // Small delay between downloads
        await sleep(200);
    }

    // Create media index
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
    log(`   Endpoints with data: ${successCount}/${ENDPOINTS.length}`, successCount > 0 ? colors.green : colors.red);
    log(`   Endpoints empty/failed: ${failCount}/${ENDPOINTS.length}`, failCount > 0 ? colors.yellow : colors.green);
    log(`   Media Files Downloaded: ${downloadedCount}/${allMediaUrls.size}`, colors.reset);
    if (failedDownloads > 0) {
        log(`   Failed Downloads: ${failedDownloads}`, colors.yellow);
    }
    log(`\n📁 Backup Location: ${BACKUP_DIR}`, colors.green);

    log('\n📋 Files created:', colors.cyan);
    log(`   - full-backup-${timestamp}.json`, colors.reset);
    ENDPOINTS.forEach(e => {
        const count = allData[e.name]?.data?.length || 0;
        log(`   - ${e.name}.json (${count} items)`, count > 0 ? colors.green : colors.yellow);
    });
    log(`   - media-index.json`, colors.reset);
    log(`   - media/ folder`, colors.reset);
}

// Run the script
main().catch(error => {
    log(`\n❌ Fatal error: ${error}`, colors.red);
    process.exit(1);
});
