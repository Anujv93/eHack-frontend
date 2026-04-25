/**
 * Get Sub_Pipeline picklist values - what are the actual sub-pipeline names?
 */

const CLIENT_ID     = '1000.HC3GTUDJ0MC86OT5SYI9UE5Q5LODEQ';
const CLIENT_SECRET = 'a3facc221c8335ff94932f59458a377ef835608cf0';
const REFRESH_TOKEN = '1000.6cb58ca5650148788587f540c34b4418.a4bf5576146973176b3b1a77925e6b41';
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
  console.log('✅ Token OK');

  // Get Sub_Pipeline field definition to see all sub-pipeline picklist values
  const r = await fetch(`${BIGIN_API}/settings/fields?module=Pipelines`, {
    headers: { Authorization: `Zoho-oauthtoken ${token}` }
  });
  const d = await r.json();

  const subPipelineField = (d.fields || []).find(f => f.api_name === 'Sub_Pipeline');
  if (subPipelineField) {
    console.log('\n=== SUB_PIPELINE PICKLIST VALUES ===');
    console.log('count:', subPipelineField.pick_list_values?.length);
    (subPipelineField.pick_list_values || []).forEach(v => {
      console.log(`  display_value="${v.display_value}" | actual_value="${v.actual_value}" | id="${v.id}"`);
      if (v.maps && v.maps.length > 0) {
        v.maps.forEach(m => console.log(`    -> Stage: display="${m.display_value}" actual="${m.actual_value}"`));
      }
    });
  } else {
    console.log('Sub_Pipeline field not found. Available fields:');
    (d.fields || []).forEach(f => console.log(' -', f.api_name));
  }
}

main().catch(console.error);
