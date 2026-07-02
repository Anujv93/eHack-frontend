const puppeteer = require('puppeteer');
const fs = require('fs');

// Read images and convert to base64
const logoBuffer = fs.readFileSync('images/newnew-ehack-removebg-preview.png');
const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

const alexBuffer = fs.readFileSync('public/images/books/Alex-Hermozi-Freelancing-removebg-preview.png');
const alexBase64 = `data:image/png;base64,${alexBuffer.toString('base64')}`;

const sethBuffer = fs.readFileSync('public/images/books/seth godin.png');
const sethBase64 = `data:image/png;base64,${sethBuffer.toString('base64')}`;

const russellBuffer = fs.readFileSync('public/images/books/Russell Brunson.png');
const russellBase64 = `data:image/png;base64,${russellBuffer.toString('base64')}`;

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
  
  :root {
    --primary: #ff6b00;
    --primary-light: #fff0e6;
    --text-dark: #111827;
    --text-muted: #4b5563;
    --border-color: #e5e7eb;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    color: var(--text-dark);
    margin: 0;
    padding: 0;
    background-color: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    position: relative;
  }

  /* WATERMARK BACKGROUND IMAGES */
  .watermark-1 {
    position: fixed;
    top: 250px;
    right: -100px;
    width: 600px;
    opacity: 0.05;
    z-index: -1;
    transform: rotate(5deg);
    pointer-events: none;
  }
  .watermark-2 {
    position: fixed;
    bottom: 50px;
    left: -50px;
    width: 450px;
    opacity: 0.04;
    z-index: -1;
    pointer-events: none;
  }
  .watermark-3 {
    position: fixed;
    top: 600px;
    left: 200px;
    width: 500px;
    opacity: 0.03;
    z-index: -1;
    pointer-events: none;
  }

  /* --- HEADER --- */
  .header {
    text-align: center;
    padding: 20px 0 30px 0;
    border-bottom: 4px solid var(--primary);
    margin-bottom: 30px;
  }

  .logo {
    width: 250px;
    margin-bottom: 20px;
  }

  .header h1 {
    color: var(--text-dark);
    font-size: 34px;
    margin: 0 0 10px 0;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .header h1 span {
    color: var(--primary);
  }
  
  .header h2 {
    color: var(--text-muted);
    font-size: 18px;
    margin: 0;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  /* --- TABULAR CURRICULUM LAYOUT --- */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 40px;
  }

  th {
    background-color: var(--primary);
    color: white;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 16px 20px;
    text-align: left;
  }

  td {
    padding: 24px 20px;
    border-bottom: 1px solid var(--border-color);
    vertical-align: top;
  }

  /* Avoid breaking rows across pages */
  tr {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Alternating row colors for professional look */
  tbody tr:nth-child(even) {
    background-color: #fcfcfc;
  }

  /* Left Column: Module Info */
  .col-module {
    width: 35%;
    border-right: 1px solid var(--border-color);
  }

  .mod-num {
    display: inline-block;
    background: var(--primary-light);
    color: var(--primary);
    font-size: 14px;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    letter-spacing: 1px;
  }

  .mod-title {
    font-size: 18px;
    font-weight: 800;
    color: var(--text-dark);
    margin: 0 0 8px 0;
    line-height: 1.3;
  }
  
  .mod-duration {
    font-size: 13px;
    font-weight: 600;
    color: var(--primary);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* Right Column: Topics */
  .col-topics {
    width: 65%;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin-bottom: 10px;
    font-size: 14px;
    color: var(--text-dark);
    line-height: 1.5;
    font-weight: 500;
    position: relative;
    padding-left: 20px;
  }
  li:last-child {
    margin-bottom: 0;
  }

  /* Clean Bullet */
  li::before {
    content: '•';
    position: absolute;
    left: 0;
    top: 0;
    color: var(--primary);
    font-weight: bold;
    font-size: 18px;
    line-height: 1.2;
  }

  .footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px 0;
    border-top: 2px solid var(--primary-light);
    color: var(--text-muted);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    page-break-inside: avoid;
  }
</style>
</head>
<body>
  
  <!-- Background Images from HeroSection -->
  <img src="${alexBase64}" class="watermark-1" alt="" />
  <img src="${sethBase64}" class="watermark-2" alt="" />
  <img src="${russellBase64}" class="watermark-3" alt="" />

  <div class="header">
    <img src="${logoBase64}" alt="eHack Academy" class="logo" />
    <h1><span>Digital Marketing</span> Master Program</h1>
    <h2>OFFICIAL COURSE SYLLABUS & CURRICULUM</h2>
  </div>

  <table>
    <thead>
      <tr>
        <th class="col-module">Module Outline</th>
        <th class="col-topics">Key Topics & Concepts Covered</th>
      </tr>
    </thead>
    <tbody>
      
      <!-- MODULE 1 -->
      <tr>
        <td class="col-module">
          <div class="mod-num">MODULE 01</div>
          <h3 class="mod-title">Marketing Foundations & Mindset</h3>
        </td>
        <td class="col-topics">
          <ul>
            <li>The evolution of marketing: Traditional → Digital → AI-driven</li>
            <li>How the internet changed buyer behaviour forever</li>
            <li>The Digital Marketing Ecosystem</li>
            <li>Understanding the customer journey & Funnel thinking</li>
            <li>Metrics that matter: CPC, CPM, CTR, CVR, ROAS, LTV</li>
            <li>The Entrepreneurial Marketing Mindset</li>
            <li>Risk-taking, iteration, and testing as core skills</li>
          </ul>
        </td>
      </tr>

      <!-- MODULE 2 -->
      <tr>
        <td class="col-module">
          <div class="mod-num">MODULE 02</div>
          <h3 class="mod-title">World-Class Marketing Frameworks</h3>
        </td>
        <td class="col-topics">
          <ul>
            <li>Alex Hormozi's $100M Offers & Leads Framework</li>
            <li>The Value Equation & Creating a Grand Slam Offer</li>
            <li>Seth Godin's Purple Cow: Remarkable Marketing</li>
            <li>The Innovation Adoption Curve</li>
            <li>Al Ries & Jack Trout's 22 Immutable Laws of Marketing</li>
            <li>Russell Brunson's Traffic Secrets Framework</li>
            <li>Dream Customer Avatar & The Dream 100 Strategy</li>
          </ul>
        </td>
      </tr>

      <!-- MODULE 3 -->
      <tr>
        <td class="col-module">
          <div class="mod-num">MODULE 03</div>
          <h3 class="mod-title">UX Psychology & Landing Page Science</h3>
        </td>
        <td class="col-topics">
          <ul>
            <li>UX Design Psychology for Marketers</li>
            <li>Cognitive Load Theory, Hick's Law, Fitts's Law</li>
            <li>Gestalt Principles & Reading Patterns (F/Z)</li>
            <li>The Above-the-Fold Law & Landing Page Architecture</li>
            <li>Headline formulas that stop the scroll</li>
            <li>Optimal Landing Page Layout Structure</li>
            <li>ROI-Focused Conversion Optimization & A/B Testing</li>
          </ul>
        </td>
      </tr>

      <!-- MODULE 4 -->
      <tr>
        <td class="col-module">
          <div class="mod-num">MODULE 04</div>
          <h3 class="mod-title">Offer Creation & Lead Gen Systems</h3>
        </td>
        <td class="col-topics">
          <ul>
            <li>Identifying your Niche & The Dream Outcome formula</li>
            <li>Pricing your offer, Bonus Stacking, and Guarantees</li>
            <li>Lead Magnet Design & Types (PDFs, tools, trials)</li>
            <li>The Hook-Story-Offer framework</li>
            <li>Sales funnel stages (Lead → Tripwire → Core → Upsell)</li>
            <li>Squeeze page design & Thank you page strategy</li>
          </ul>
        </td>
      </tr>

      <!-- MODULE 5 -->
      <tr>
        <td class="col-module">
          <div class="mod-num">MODULE 05</div>
          <h3 class="mod-title">Google Ads Mastery</h3>
        </td>
        <td class="col-topics">
          <ul>
            <li>Google Ads account structure & Campaign types</li>
            <li>Keyword research, Match types, and Negative keywords</li>
            <li>Quality Score & Bidding strategies (Target CPA, ROAS)</li>
            <li>Google AdSense for Publishers</li>
            <li>Google Tag Manager (GTM) setup & variables</li>
            <li>GA4 Integration & Conversion tracking</li>
            <li>Competition Analysis with Google Transparency Center</li>
          </ul>
        </td>
      </tr>

      <!-- MODULE 6 -->
      <tr>
        <td class="col-module">
          <div class="mod-num">MODULE 06</div>
          <h3 class="mod-title">Meta Ads & Creative Strategy</h3>
        </td>
        <td class="col-topics">
          <ul>
            <li>Meta Ads Manager overview & Campaign objectives</li>
            <li>Audience targeting: Core, Custom, and Lookalike</li>
            <li>The Meta Pixel: Setup & event tracking</li>
            <li>Budget & bidding: CBO vs. ABO, Advantage+ Campaigns</li>
            <li>The Hook-Story-Offer formula for Meta ad creatives</li>
            <li>UGC (User Generated Content) vs. Polished Creative</li>
            <li>Competition Analysis with Meta Ads Library</li>
          </ul>
        </td>
      </tr>

      <!-- MODULE 7 -->
      <tr>
        <td class="col-module">
          <div class="mod-num">MODULE 07</div>
          <h3 class="mod-title">Leads Nurturing & CRM Systems</h3>
        </td>
        <td class="col-topics">
          <ul>
            <li>Email list building strategies & platform setup</li>
            <li>The Welcome Sequence & Segmenting leads</li>
            <li>Email copywriting (AIDA) & Deliverability</li>
            <li>WhatsApp Business API & Automated sequences</li>
            <li>CRM integration (GoHighLevel / HubSpot)</li>
            <li>Google Display & Meta Retargeting campaigns</li>
            <li>Follow-Up Call Strategy & Sales alignment</li>
          </ul>
        </td>
      </tr>

      <!-- MODULE 8 -->
      <tr>
        <td class="col-module">
          <div class="mod-num">MODULE 08</div>
          <h3 class="mod-title">SEO, AEO, GEO & AIO</h3>
        </td>
        <td class="col-topics">
          <ul>
            <li>SEO (Search Engine Optimisation): On-Page, Technical</li>
            <li>Keyword research & Search intent analysis</li>
            <li>Local SEO: Google Business Profile, local citations</li>
            <li>AEO (Answer Engine Optimisation): Featured snippets</li>
            <li>GEO (Generative Engine Optimisation): AI-powered search</li>
            <li>E-E-A-T signals & AI content formats</li>
            <li>AIO (AI Optimisation): ChatGPT plugins & Perplexity</li>
          </ul>
        </td>
      </tr>

      <!-- MODULE 9 -->
      <tr>
        <td class="col-module">
          <div class="mod-num">MODULE 09</div>
          <h3 class="mod-title">AI-Powered Marketing</h3>
        </td>
        <td class="col-topics">
          <ul>
            <li>AI for Marketing Strategy & Competitive analysis</li>
            <li>AI Copywriting: High-converting ad copy, landing pages</li>
            <li>SEO content writing with AI (E-E-A-T-compliant)</li>
            <li>The Human-AI Writing Workflow (Draft → Refine)</li>
            <li>Midjourney, DALL-E, Adobe Firefly for visuals</li>
            <li>AI video creation tools (Runway, Pika, HeyGen)</li>
            <li>AI for Campaign Analysis & Predictive Forecasting</li>
          </ul>
        </td>
      </tr>

      <!-- MODULE 10 -->
      <tr>
        <td class="col-module">
          <div class="mod-num">MODULE 10</div>
          <h3 class="mod-title">Capstone Project & Portfolio</h3>
        </td>
        <td class="col-topics">
          <ul>
            <li>Build a complete 360° digital marketing campaign</li>
            <li>Market research and customer avatar development</li>
            <li>Grand Slam Offer creation using the Hormozi framework</li>
            <li>Landing page design with above-the-fold optimisation</li>
            <li>Google Ads, Meta Ads, Email & WhatsApp sequences</li>
            <li>Final presentation to a panel & Portfolio compilation</li>
          </ul>
        </td>
      </tr>

    </tbody>
  </table>

  <div class="footer">
    Powered by eHack Academy • Building Job-Ready Digital Marketers
  </div>

</body>
</html>
`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  await page.pdf({
    path: 'public/brochure/Digital-Marketing-MasterProgram-Brochure.pdf',
    format: 'A4',
    printBackground: true,
    // Add margin for breathing room around the whole page to fix sticking to top
    margin: { top: '35px', right: '35px', bottom: '35px', left: '35px' },
    displayHeaderFooter: false,
    preferCSSPageSize: true
  });
  await browser.close();
  console.log('PDF generated successfully!');
})();
