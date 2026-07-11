const CLIENT_ID     = '1000.HC3GTUDJ0MC86OT5SYI9UE5Q5LODEQ';
const CLIENT_SECRET = 'a3facc221c8335ff94932f59458a377ef835608cf0';
const REFRESH_TOKEN = '1000.18637bf2641d4e4c9306b545401cd01b.292c3bcdc2bac725045949c8105406df';
const ACCOUNTS_URL  = 'https://accounts.zoho.in';
const BIGIN_API     = 'https://www.zohoapis.in/bigin/v2';

async function getAccessToken() {
  const res = await fetch(`${ACCOUNTS_URL}/oauth/v2/token?refresh_token=${REFRESH_TOKEN}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  const data = await res.json();
  return data.access_token;
}
async function main() {
    const token = await getAccessToken();
    const res = await fetch(`${BIGIN_API}/settings/pipelines`, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
}
main();
