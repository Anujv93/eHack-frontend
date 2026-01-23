/**
 * Script to fetch Zoho Bigin Pipeline configuration
 * Run with: npx tsx scripts/fetch-zoho-pipelines.ts
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });


async function getAccessToken(): Promise<string> {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    const accountsUrl = process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in';

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error('Zoho credentials not configured');
    }

    const tokenUrl = `${accountsUrl}/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`;

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!response.ok) {
        throw new Error(`Token fetch failed: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
}

async function fetchPipelines() {
    console.log('🔄 Fetching Zoho Bigin pipelines...\n');

    const accessToken = await getAccessToken();
    const apiUrl = process.env.ZOHO_BIGIN_API || 'https://www.zohoapis.in/bigin/v2';

    // Fetch pipeline settings
    const response = await fetch(`${apiUrl}/settings/pipelines`, {
        headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` },
    });

    if (!response.ok) {
        const text = await response.text();
        console.error('Error:', text);
        return;
    }

    const data = await response.json();

    console.log('📋 Available Pipelines:\n');
    console.log(JSON.stringify(data, null, 2));

    // Also fetch layouts which contain stage information
    console.log('\n\n📐 Fetching Layouts...\n');

    const layoutsResponse = await fetch(`${apiUrl}/settings/layouts?module=Pipelines`, {
        headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` },
    });

    if (layoutsResponse.ok) {
        const layoutsData = await layoutsResponse.json();
        console.log(JSON.stringify(layoutsData, null, 2));
    }

    // Fetch fields to understand stage values
    console.log('\n\n🏷️ Fetching Pipeline Fields (for Stage values)...\n');

    const fieldsResponse = await fetch(`${apiUrl}/settings/fields?module=Pipelines`, {
        headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` },
    });

    if (fieldsResponse.ok) {
        const fieldsData = await fieldsResponse.json();

        // Find Stage field
        const stageField = fieldsData.fields?.find((f: any) => f.api_name === 'Stage');
        if (stageField) {
            console.log('Stage Field Configuration:');
            console.log(JSON.stringify(stageField, null, 2));
        }
    }
}

fetchPipelines().catch(console.error);
