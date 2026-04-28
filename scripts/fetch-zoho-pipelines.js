/**
 * DEFINITIVE FINAL TEST - New Inquiry stage in eHack Academy Leads
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
  console.log('✅ Token OK');

  // Contact
  const cr = await fetch(`${BIGIN_API}/Contacts`, {
    method: 'POST',
    headers: { Authorization: `Zoho-oauthtoken ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [{ First_Name: 'Final', Last_Name: 'VerificationTest', Email: 'final-verify@ehack.test', Phone: '+919999999980' }] }),
  });
  const contactId = (await cr.json()).data?.[0]?.details?.id;
  console.log('✅ Contact:', contactId);

  // Deal - exactly what the website will now send
  const dealRes = await fetch(`${BIGIN_API}/Pipelines`, {
    method: 'POST',
    headers: { Authorization: `Zoho-oauthtoken ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [{
      Deal_Name:    'FINAL VERIFY - New Inquiry Stage - DELETE ME',
      Layout:       { id: '1182543000000442086', name: 'eHack Academy Leads' },
      Sub_Pipeline: 'Leads Pipeline Standard',
      Stage:        'New Inquiry',
      Contact_Name: contactId,
      Closing_Date: '2026-05-30',
      Description:  'Definitive test. Safe to delete.',
    }]}),
  });

  const result = await dealRes.json();
  const code = result.data?.[0]?.code;
  const dealId = result.data?.[0]?.details?.id;

  if (code === 'SUCCESS') {
    console.log('\n✅✅✅ COMPLETE SUCCESS!');
    console.log('Deal ID:', dealId);
    console.log('\nConfiguration confirmed:');
    console.log('  Pipeline  : eHack Academy Leads');
    console.log('  Sub-pipe  : Leads Pipeline Standard');
    console.log('  Stage     : New Inquiry ✅');
    console.log('\nAll website forms will now submit directly to the NEW INQUIRY column!');
  } else {
    console.log('❌ FAILED:', JSON.stringify(result));
  }
}

main().catch(console.error);
