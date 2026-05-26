/* Capture screenshots from the running SFM demo */
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:4711';
const OUT = path.join(__dirname, 'screenshots');

// Slot ratios:
//   Wide desktop slot: 8.3 x 5.2 in → 1.596 → 1440 x 902 (≈900)
//   Half desktop slot: 6.1 x 5.2 in → 1.173 → 1440 x 1228
//   Phone slot:        3.0 x 5.2 in → 0.577 → 480 x 832
//   Email mockup:      4.4 x 5.7 in → 0.772 → 700 x 906
const shots = [
  // --- Admin (1440x900 wide) ---
  { file: 'admin-dashboard.png',     url: '/admin.html',  width: 1440, height: 900, action: null },
  { file: 'admin-schedule.png',      url: '/admin.html',  width: 1440, height: 900, action: "showView('view-schedule')" },
  { file: 'admin-billing.png',       url: '/admin.html',  width: 1440, height: 900, action: "showView('view-billing')" },

  // --- Admin (1440x1228 half) ---
  { file: 'admin-team-12ua.png',     url: '/admin.html',  width: 1440, height: 1228, action: "showView('view-team-detail-12ua')" },
  { file: 'admin-comms.png',         url: '/admin.html',  width: 1440, height: 1228, action: "showView('view-comms')" },

  // --- Coach (1440x900 wide) ---
  { file: 'coach-today.png',         url: '/coach.html',  width: 1440, height: 900, action: null },

  // --- Coach (1440x1228 half) ---
  { file: 'coach-team.png',             url: '/coach.html',  width: 1440, height: 1228, action: "showView('view-team')" },
  { file: 'coach-swimmer-ellie.png',    url: '/coach.html',  width: 1440, height: 1228, action: "showDetailView('view-swimmer-ellie','view-team')" },
  { file: 'coach-schedule.png',         url: '/coach.html',  width: 1440, height: 1228, action: "showView('view-schedule')" },
  { file: 'coach-comms.png',            url: '/coach.html',  width: 1440, height: 1228, action: "showView('view-comms')" },

  // --- Parent (480 x 832 phone slot ratio) ---
  { file: 'parent-home.png',         url: '/parent.html', width: 480,  height: 832,  action: null },
  { file: 'parent-schedule.png',     url: '/parent.html', width: 480,  height: 832,  action: "showView('p-schedule','.bn-item')" },
  { file: 'parent-billing.png',      url: '/parent.html', width: 480,  height: 832,  action: "showView('p-billing','.bn-item')" },
  { file: 'parent-practice.png',     url: '/parent.html', width: 480,  height: 832,  action: "showDetailView('p-practice-janelle','p-home')" },
  { file: 'parent-inbox.png',        url: '/parent.html', width: 480,  height: 832,  action: "showView('p-inbox','.bn-item')" },
  { file: 'parent-pay-sectionals.png', url: '/parent.html', width: 480,  height: 832,  action: "showDetailView('p-pay-sectionals','p-billing')" },
  { file: 'parent-child-janelle.png',  url: '/parent.html', width: 480,  height: 832,  action: "showDetailView('p-child-janelle','p-home')" },
  { file: 'parent-absence.png',        url: '/parent.html', width: 480,  height: 832,  action: "showDetailView('p-absence','p-home')" },

  // --- Email mockup ---
  { file: 'billing-email.png',       url: '/pptx-build/billing-email.html', width: 700, height: 906, action: null }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const shot of shots) {
    const page = await browser.newPage();
    await page.setViewport({ width: shot.width, height: shot.height, deviceScaleFactor: 2 });
    await page.goto(BASE + shot.url, { waitUntil: 'networkidle0', timeout: 30000 });

    if (shot.action) {
      await page.evaluate(shot.action);
      await new Promise(r => setTimeout(r, 350));
    }

    const out = path.join(OUT, shot.file);
    await page.screenshot({ path: out, fullPage: false });
    console.log('✓', shot.file, '(' + shot.width + 'x' + shot.height + ')');
    await page.close();
  }

  await browser.close();
  console.log('\nDone. ' + shots.length + ' screenshots saved to ' + OUT);
})();
