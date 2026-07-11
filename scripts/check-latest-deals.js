const CLIENT_ID     = '1000.HC3GTUDJ0MC86OT5SYI9UE5Q5LODEQ';
const CLIENT_SECRET = 'a3facc221c8335ff94932f59458a377ef835608cf0';
const REFRESH_TOKEN = '1000.18637bf2641d4e4c9306b545401cd01b.292c3bcdc2bac725045949c8105406df';
const ACCOUNTS_URL  = 'https://accounts.zoho.in';
const BIGIN_API     = 'https://www.zohoapis.in/bigin/v2';

async function getAccessToken() {
  const res = await fetch(`${ACCOUNTS_URL}/oauth/v2/token?refresh_token=${REFRESH_TOKEN}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  const data = await res.json();
  if (!data.access_token) throw new Error('Token error: ' + JSON.stringify(data));
  return data.access_token;
}

async function main() {
  const token = await getAccessToken();
  
  console.log('\n=== RECENTLY CREATED DEALS ===\n');
  try {
    const res = await fetch(`${BIGIN_API}/Pipelines?fields=Deal_Name,Created_Time,Layout,Pipeline,Sub_Pipeline,Stage,Owner&sort_by=Created_Time&sort_order=desc&per_page=10`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    
    if (!res.ok) {
        const errText = await res.text();
        console.log(`Failed to fetch deals: ${res.status} - ${errText}`);
        return;
    }

    const data = await res.json();
    if (data.data) {
      for (const deal of data.data) {
        console.log(`Deal Name: "${deal.Deal_Name}"`);
        console.log(`  ID:           ${deal.id}`);
        console.log(`  Created Time: ${deal.Created_Time}`);
        console.log(`  Layout:       ${deal.Layout?.name || 'unknown'} (ID: ${deal.Layout?.id || 'unknown'})`);
        console.log(`  Pipeline:     ${deal.Pipeline?.name || 'unknown'}`);
        console.log(`  Sub_Pipeline: ${deal.Sub_Pipeline}`);
        console.log(`  Stage:        ${deal.Stage}`);
        console.log(`  Owner:        ${deal.Owner?.name}`);
        console.log('--------------------------------------------------');
      }
    } else {
        console.log('No deals found or error in response format.');
    }
  } catch (err) {
    console.log('Error listing deals:', err.message);
  }
}

main().catch(console.error);
