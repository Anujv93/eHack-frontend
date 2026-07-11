/**
 * COMPREHENSIVE DIAGNOSTIC: Check where deals actually ended up in Bigin
 */
const CLIENT_ID     = '1000.HC3GTUDJ0MC86OT5SYI9UE5Q5LODEQ';
const CLIENT_SECRET = 'a3facc221c8335ff94932f59458a377ef835608cf0';
const REFRESH_TOKEN = '1000.18637bf2641d4e4c9306b545401cd01b.292c3bcdc2bac725045949c8105406df';
const ACCOUNTS_URL  = 'https://accounts.zoho.in';
const BIGIN_API     = 'https://www.zohoapis.in/bigin/v2';

async function getAccessToken() {
  const url = `${ACCOUNTS_URL}/oauth/v2/token?refresh_token=${REFRESH_TOKEN}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  const data = await res.json();
  if (!data.access_token) throw new Error('Token error: ' + JSON.stringify(data));
  return data.access_token;
}

async function main() {
  const token = await getAccessToken();
  console.log('✅ Token acquired\n');

  // 1. Fetch the specific deals we created and check their layout/pipeline
  const dealIds = [
    '1182543000000762067',  // test-dm-stages.js test
    '1182543000000762071',  // localhost API test  
    '1182543000000760201',  // PowerShell direct test
    '1182543000000762103',  // Cooldown test
  ];

  console.log('=== CHECKING WHERE OUR DEALS ENDED UP ===\n');
  
  for (const dealId of dealIds) {
    try {
      const res = await fetch(`${BIGIN_API}/Pipelines/${dealId}`, {
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
      });
      
      if (res.status === 200) {
        const data = await res.json();
        const deal = data.data?.[0];
        if (deal) {
          console.log(`Deal ${dealId}: "${deal.Deal_Name}"`);
          console.log(`  Layout:       ${JSON.stringify(deal.Layout)}`);
          console.log(`  Pipeline:     ${JSON.stringify(deal.Pipeline)}`);
          console.log(`  Sub_Pipeline: ${deal.Sub_Pipeline}`);
          console.log(`  Stage:        ${deal.Stage}`);
          console.log('');
        }
      } else if (res.status === 204) {
        console.log(`Deal ${dealId}: NOT FOUND (deleted?)`);
      } else {
        const text = await res.text();
        console.log(`Deal ${dealId}: Error ${res.status} - ${text}`);
      }
    } catch (err) {
      console.log(`Deal ${dealId}: Error - ${err.message}`);
    }
  }

  // 2. List ALL recent deals to see what pipelines they're in
  console.log('\n=== ALL RECENT DEALS (last 20) ===\n');
  try {
    const res = await fetch(`${BIGIN_API}/Pipelines?sort_by=Created_Time&sort_order=desc&per_page=20`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    const data = await res.json();
    if (data.data) {
      for (const deal of data.data) {
        const layoutName = deal.Layout?.name || 'unknown';
        console.log(`  [${layoutName}] "${deal.Deal_Name}" → Stage: ${deal.Stage} | ID: ${deal.id}`);
      }
    }
  } catch (err) {
    console.log('Error listing deals:', err.message);
  }

  // 3. List ALL layouts again and show their FULL details
  console.log('\n\n=== ALL LAYOUTS (with Pipeline/Sub_Pipeline details) ===\n');
  try {
    const res = await fetch(`${BIGIN_API}/settings/layouts?module=Pipelines`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    const data = await res.json();
    if (data.layouts) {
      for (const layout of data.layouts) {
        console.log(`📋 Layout: "${layout.name}" | ID: ${layout.id} | Status: ${layout.status}`);
        
        // Check if the layout has profiles/permissions
        if (layout.profiles) {
          console.log(`   Profiles: ${layout.profiles.map(p => p.name).join(', ')}`);
        }
      }
    }
  } catch (err) {
    console.log('Error:', err.message);
  }

  // 4. Check if "Digital Marketing Leads" is maybe a DIFFERENT layout than what we think
  console.log('\n\n=== SEARCHING FOR DEALS IN EACH LAYOUT ===\n');
  
  const layoutIds = [
    { id: '1182543000000000173', name: 'Layout 173 (was Sales/DM?)' },
    { id: '1182543000000442086', name: 'Layout 086 (eHack Academy)' },
    { id: '1182543000000498517', name: 'Layout 517 (Global Services)' },
  ];
  
  for (const layout of layoutIds) {
    try {
      const res = await fetch(`${BIGIN_API}/Pipelines/search?criteria=(Layout.id:equals:${layout.id})&per_page=5`, {
        headers: { Authorization: `Zoho-oauthtoken ${token}` },
      });
      
      if (res.status === 200) {
        const data = await res.json();
        const count = data.data?.length || 0;
        console.log(`${layout.name}: ${count} deals found`);
        if (data.data) {
          for (const d of data.data) {
            console.log(`   → "${d.Deal_Name}" | Layout: ${d.Layout?.name} | Stage: ${d.Stage}`);
          }
        }
      } else if (res.status === 204) {
        console.log(`${layout.name}: 0 deals (empty)`);
      } else {
        console.log(`${layout.name}: Error ${res.status}`);
      }
    } catch (err) {
      console.log(`${layout.name}: Error - ${err.message}`);
    }
  }

  // 5. Let's also check if pipeline NAMES changed vs what API reports
  console.log('\n\n=== RAW PIPELINE SETTINGS (full JSON) ===\n');
  try {
    const res = await fetch(`${BIGIN_API}/settings/pipeline?module=Pipelines`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log(text.substring(0, 3000));
  } catch (err) {
    console.log('Error:', err.message);
  }
}

main().catch(console.error);
