const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = {
  'python.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/200px-Python-logo-notext.svg.png',
  'burpsuite.png': 'https://portswigger.net/content/images/logos/portswigger-logo-bug.png',
  'wireshark.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Wireshark_Icon.png/200px-Wireshark_Icon.png',
  'nmap.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Nmap_logo.svg/200px-Nmap_logo.svg.png',
  'kali.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kali_Linux_2.0_wordmark.svg/200px-Kali_Linux_2.0_wordmark.svg.png',
  'metasploit.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Metasploit_logo.svg/200px-Metasploit_logo.svg.png'
};

const dir = path.join(__dirname, 'public', 'images', 'tools');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

Object.entries(urls).forEach(([filename, url]) => {
  const filePath = path.join(dir, filename);
  https.get(url, (res) => {
    const fileStream = fs.createWriteStream(filePath);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
});
