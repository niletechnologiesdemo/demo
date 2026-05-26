/* SF Merionettes Board Presentation — pptxgenjs build
   Theme: Midnight Executive (SFM navy + ice blue + white)
   v2 — revised per board feedback:
     · no pricing comparisons / no rent-vs-own framing
     · Coach expanded to 3 slides
     · Parent expanded to 3 slides (incl. billing-email mockup)
     · single consolidated Full-Ownership slide
*/
const pptxgen = require('pptxgenjs');
const path = require('path');

const SHOTS = path.join(__dirname, 'screenshots');
const LOGO  = path.join(__dirname, '..', 'Images', 'Logo.png');

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.333" x 7.5"
pres.author  = 'Nile Technologies';
pres.title   = 'SF Merionettes — Operations System Proposal';
pres.subject = 'Custom Web Portal Proposal';
pres.company = 'Nile Technologies';

// ── Brand palette ──────────────────────────────────────────
const C = {
  navy:      '1B3A8C',
  navyDark:  '0B1A47',
  navyDeep:  '102461',
  aqua:      '06B6D4',
  aquaSoft:  'CFFAFE',
  ice:       'E8EEFB',
  iceSoft:   'F4F7FD',
  gold:      'F59E0B',
  goldSoft:  'FEF3C7',
  green:     '10B981',
  greenSoft: 'D1FAE5',
  red:       'EF4444',
  redSoft:   'FEE2E2',
  text:      '0F172A',
  textMid:   '475569',
  textMute:  '94A3B8',
  border:    'E2E8F0',
  white:     'FFFFFF'
};

const F = { head: 'Calibri', body: 'Calibri' };

const TOTAL = 17;

// ── Reusable helpers ───────────────────────────────────────
function darkBg(s) { s.background = { color: C.navyDark }; }
function lightBg(s) { s.background = { color: C.iceSoft }; }

function pageHeader(slide, eyebrow, title, opts = {}) {
  const tone = opts.tone || 'light';
  const color = tone === 'dark' ? C.white : C.text;
  const eyeColor = tone === 'dark' ? C.aqua : C.navy;
  slide.addText(eyebrow.toUpperCase(), {
    x: 0.5, y: 0.32, w: 12.3, h: 0.3,
    fontSize: 11, fontFace: F.head, color: eyeColor, bold: true,
    charSpacing: 6, margin: 0
  });
  slide.addText(title, {
    x: 0.5, y: 0.62, w: 12.3, h: 0.85,
    fontSize: 36, fontFace: F.head, color: color, bold: true,
    margin: 0
  });
}

function footer(slide, page, total) {
  slide.addText('Nile Technologies  ·  SF Merionettes Operations System  ·  May 2026', {
    x: 0.5, y: 7.10, w: 9, h: 0.3,
    fontSize: 9, fontFace: F.body, color: C.textMute, margin: 0
  });
  slide.addText(page + ' / ' + total, {
    x: 12.0, y: 7.10, w: 0.83, h: 0.3,
    fontSize: 9, fontFace: F.body, color: C.textMute, align: 'right', margin: 0
  });
}

function statCard(slide, x, y, w, h, value, label, opts={}) {
  const fill = opts.fill || C.white;
  const valueColor = opts.valueColor || C.navy;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: fill },
    line: { color: opts.line || C.border, width: 0.75 }
  });
  slide.addText(value, {
    x: x+0.18, y: y+0.18, w: w-0.36, h: h*0.55,
    fontSize: opts.valueSize || 30, fontFace: F.head, bold: true,
    color: valueColor, margin: 0, valign: 'middle'
  });
  slide.addText(label, {
    x: x+0.18, y: y+h*0.62, w: w-0.36, h: h*0.30,
    fontSize: 10, fontFace: F.body, color: C.textMid, margin: 0,
    valign: 'top'
  });
}

function shadowImg(slide, opts) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: opts.x+0.05, y: opts.y+0.08, w: opts.w, h: opts.h,
    fill: { color: '0F172A', transparency: 70 },
    line: { type: 'none' }
  });
  slide.addImage({ path: opts.path, x: opts.x, y: opts.y, w: opts.w, h: opts.h });
}

function highlightPanel(slide, x, y, w, h, eyebrow, title, items, opts={}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: C.white }, line: { color: C.border, width: 0.75 }
  });
  slide.addText(eyebrow.toUpperCase(), {
    x: x+0.25, y: y+0.22, w: w-0.5, h: 0.3,
    fontSize: 11, fontFace: F.head, color: C.aqua, bold: true,
    charSpacing: 6, margin: 0
  });
  if (title) {
    slide.addText(title, {
      x: x+0.25, y: y+0.55, w: w-0.5, h: 0.45,
      fontSize: 17, fontFace: F.head, color: C.text, bold: true, margin: 0
    });
  }
  const startY = title ? y + 1.05 : y + 0.65;
  const itemH = (h - (startY - y) - 0.3) / items.length;
  items.forEach((it, i) => {
    const iy = startY + i * itemH;
    slide.addText(it[0], {
      x: x+0.25, y: iy, w: w-0.5, h: 0.3,
      fontSize: 13, fontFace: F.head, color: C.text, bold: true, margin: 0
    });
    slide.addText(it[1], {
      x: x+0.25, y: iy+0.3, w: w-0.5, h: itemH-0.35,
      fontSize: 10.5, fontFace: F.body, color: C.textMid, margin: 0
    });
  });
}

// ════════════════════════════════════════════════════════════
// SLIDE 1 — TITLE
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  darkBg(s);

  s.addShape(pres.shapes.OVAL, {
    x: 10.5, y: -3, w: 8, h: 8,
    fill: { color: C.aqua, transparency: 75 }, line: { type: 'none' }
  });
  s.addShape(pres.shapes.OVAL, {
    x: -4, y: 4.5, w: 9, h: 9,
    fill: { color: C.navy, transparency: 50 }, line: { type: 'none' }
  });

  s.addImage({ path: LOGO, x: 0.8, y: 0.7, w: 2.4, h: 1.1 });

  s.addText('CUSTOM OPERATIONS SYSTEM · PROPOSAL', {
    x: 0.8, y: 2.5, w: 12, h: 0.4,
    fontSize: 13, fontFace: F.head, color: C.aqua, bold: true,
    charSpacing: 8, margin: 0
  });

  s.addText('Built for the\nSan Francisco Merionettes', {
    x: 0.8, y: 3.0, w: 11.5, h: 2.1,
    fontSize: 54, fontFace: F.head, color: C.white, bold: true,
    margin: 0
  });

  s.addText('One unified platform — replacing SportsEngine, Signal, WhatsApp, fragmented Google Calendars, and scattered email.', {
    x: 0.8, y: 5.2, w: 11.5, h: 0.9,
    fontSize: 17, fontFace: F.body, color: C.ice,
    margin: 0
  });

  s.addShape(pres.shapes.LINE, {
    x: 0.8, y: 6.5, w: 11.7, h: 0,
    line: { color: C.aqua, width: 1.5 }
  });
  s.addText([
    { text: 'PREPARED FOR  ', options: { color: C.textMute, fontSize: 10, charSpacing: 4 } },
    { text: 'SFM Board · Eileen Horng (President)', options: { color: C.white, fontSize: 13, bold: true } }
  ], { x: 0.8, y: 6.7, w: 7, h: 0.4, margin: 0, fontFace: F.body });

  s.addText([
    { text: 'BY  ', options: { color: C.textMute, fontSize: 10, charSpacing: 4 } },
    { text: 'Nile Technologies  ·  niletechnologies.com', options: { color: C.white, fontSize: 13, bold: true } }
  ], { x: 7.8, y: 6.7, w: 5, h: 0.4, margin: 0, fontFace: F.body, align: 'right' });
}

// ════════════════════════════════════════════════════════════
// SLIDE 2 — CURRENT STATE  (no pricing)
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Current State', 'The operations stack today is fragmented.');

  const tools = [
    { name: 'SportsEngine',      use: 'Billing',                  issue: 'Clunky · manual' },
    { name: 'Wix',               use: 'Website (new)',            issue: 'Separate stack' },
    { name: 'Google Calendar',   use: 'Schedules · per coach',    issue: 'Fragmented' },
    { name: 'Signal',            use: 'Coach ↔ Parents',          issue: 'No audit log' },
    { name: 'WhatsApp + Email',  use: 'Misc comms',               issue: 'Missed messages' }
  ];
  const tx = 0.5, ty = 1.85, tw = 2.4, th = 1.8, tg = 0.15;
  tools.forEach((t, i) => {
    const x = tx + i * (tw + tg);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: ty, w: tw, h: th,
      fill: { color: C.white }, line: { color: C.border, width: 0.75 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: ty, w: tw, h: 0.08, fill: { color: C.red }, line: { type: 'none' }
    });
    s.addText(t.name, {
      x: x+0.18, y: ty+0.22, w: tw-0.36, h: 0.4,
      fontSize: 15, fontFace: F.head, color: C.text, bold: true, margin: 0
    });
    s.addText(t.use, {
      x: x+0.18, y: ty+0.7, w: tw-0.36, h: 0.4,
      fontSize: 11, fontFace: F.body, color: C.textMid, margin: 0
    });
    // Issue badge
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x+0.18, y: ty+1.25, w: tw-0.36, h: 0.32, rectRadius: 0.05,
      fill: { color: C.redSoft }, line: { type: 'none' }
    });
    s.addText(t.issue, {
      x: x+0.18, y: ty+1.25, w: tw-0.36, h: 0.32,
      fontSize: 10, fontFace: F.head, color: C.red, bold: true,
      align: 'center', valign: 'middle', margin: 0
    });
  });

  s.addText('What this is costing the club', {
    x: 0.5, y: 4.1, w: 12.3, h: 0.4,
    fontSize: 16, fontFace: F.head, color: C.navy, bold: true, margin: 0
  });

  const pains = [
    { t: 'No formal attendance',         d: 'Coaches mark on paper or memory · absences sent on Signal are never recorded.' },
    { t: 'Fragmented communication',     d: 'Schedule changes spread across Signal, WhatsApp, email — some parents miss it.' },
    { t: 'No master calendar',           d: 'Each coach has a personal Google Calendar — multi-child families check 2–3.' },
    { t: 'Manual billing',               d: 'Competition fees + merch + dues entered by hand into SportsEngine.' },
    { t: 'Data lives on personal phones',d: 'If a coach leaves or breaks a phone, their calendar + parent groups are lost.' }
  ];
  pains.forEach((p, i) => {
    const x = 0.5 + (i % 3) * 4.2;
    const y = 4.55 + Math.floor(i / 3) * 1.1;
    s.addText('⚠', {
      x, y, w: 0.35, h: 0.4, fontSize: 17, color: C.gold, margin: 0, bold: true
    });
    s.addText(p.t, {
      x: x+0.38, y, w: 3.7, h: 0.35,
      fontSize: 12, fontFace: F.head, color: C.text, bold: true, margin: 0
    });
    s.addText(p.d, {
      x: x+0.38, y: y+0.32, w: 3.7, h: 0.7,
      fontSize: 10, fontFace: F.body, color: C.textMid, margin: 0
    });
  });

  footer(s, 2, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 3 — PROPOSED SOLUTION
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  darkBg(s);
  pageHeader(s, 'Proposed Solution', 'One platform · three role-tailored interfaces.', { tone: 'dark' });

  s.addShape(pres.shapes.OVAL, {
    x: 5.4, y: 3.0, w: 2.5, h: 2.5,
    fill: { color: C.aqua }, line: { color: C.white, width: 2 }
  });
  s.addText('SFM\nOperations\nPlatform', {
    x: 5.4, y: 3.0, w: 2.5, h: 2.5,
    fontSize: 14, fontFace: F.head, color: C.white, bold: true,
    align: 'center', valign: 'middle', margin: 0
  });

  const roles = [
    { x: 0.6, y: 2.0, label: 'ADMIN', name: 'Board · Treasurer · Eileen',
      desc: 'Master schedule · billing · members · communications · reports.' },
    { x: 9.2, y: 2.0, label: 'COACH', name: 'Emily · Heidi · Niloo · 13 coaches',
      desc: 'One-tap attendance · skill notes · co-coach sync · parent chats.' },
    { x: 5.05, y: 5.65, label: 'PARENT', name: '54 families · web on phone',
      desc: 'Multi-child schedule · billing · absence requests · skill videos.' }
  ];

  roles.forEach(r => {
    const w = 3.6, h = 1.85;
    s.addShape(pres.shapes.RECTANGLE, {
      x: r.x, y: r.y, w, h,
      fill: { color: C.white }, line: { color: C.aqua, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: r.x, y: r.y, w, h: 0.08,
      fill: { color: C.aqua }, line: { type: 'none' }
    });
    s.addText(r.label, {
      x: r.x+0.2, y: r.y+0.18, w: w-0.4, h: 0.32,
      fontSize: 11, fontFace: F.head, color: C.aqua, bold: true,
      charSpacing: 6, margin: 0
    });
    s.addText(r.name, {
      x: r.x+0.2, y: r.y+0.5, w: w-0.4, h: 0.4,
      fontSize: 16, fontFace: F.head, color: C.text, bold: true, margin: 0
    });
    s.addText(r.desc, {
      x: r.x+0.2, y: r.y+0.95, w: w-0.4, h: 0.85,
      fontSize: 11, fontFace: F.body, color: C.textMid, margin: 0
    });
  });

  s.addShape(pres.shapes.LINE, {
    x: 4.2, y: 2.93, w: 2.3, h: 1.3,
    line: { color: C.aqua, width: 1.5, dashType: 'dash' }
  });
  s.addShape(pres.shapes.LINE, {
    x: 7.85, y: 2.93, w: 1.4, h: 1.3,
    line: { color: C.aqua, width: 1.5, dashType: 'dash' }
  });
  s.addShape(pres.shapes.LINE, {
    x: 6.65, y: 5.5, w: 0.02, h: 0.55,
    line: { color: C.aqua, width: 1.5, dashType: 'dash' }
  });

  footer(s, 3, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 4 — ADMIN · 1/4
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Admin Console · 1 of 4', 'Eileen\'s home base — the entire club on one screen.');
  shadowImg(s, { path: path.join(SHOTS, 'admin-dashboard.png'),
    x: 0.5, y: 1.7, w: 8.3, h: 5.2 });
  highlightPanel(s, 9.0, 1.7, 3.85, 5.2, 'KEY FUNCTIONS', null, [
    ['Live KPIs', '56 swimmers · $31,640 MRR · today\'s 5 practices · $1,990 outstanding'],
    ['Today snapshot', 'Every running session, coach, pool — visible at a glance.'],
    ['Activity feed', 'Real-time roll-up of every action across the club.'],
    ['Outstanding tracker', '4 swimmers behind · one-click reminder / retry.'],
    ['Competition status', 'Sectionals — fees billed vs. collected.']
  ]);
  footer(s, 4, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 5 — ADMIN · 2/4 (Master Schedule)
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Admin Console · 2 of 4', 'Master Schedule replaces every coach\'s Google Calendar.');
  shadowImg(s, { path: path.join(SHOTS, 'admin-schedule.png'),
    x: 0.5, y: 1.7, w: 8.3, h: 5.2 });
  highlightPanel(s, 9.0, 1.7, 3.85, 5.2, 'SCHEDULE FUNCTIONS', null, [
    ['One unified calendar', 'Mon → Sun · all 6 teams · all 4 pools (JB · HL · Coffman · Balboa).'],
    ['Click any practice', 'Edit time, pool, coach · cancel with reason · auto-notify families.'],
    ['Cancelled sessions', 'Stay visible with a one-tap Reschedule button.'],
    ['Add Practice or New Batch', 'Single class additions vs. structured 4-step new-batch wizard.'],
    ['Class-specific messages', 'Each practice has its own parent ↔ coach thread.']
  ]);
  footer(s, 5, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 6 — ADMIN · 3/4 (Billing & POS)
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Admin Console · 3 of 4', 'Billing & POS — replaces SportsEngine, supports every revenue stream.');
  shadowImg(s, { path: path.join(SHOTS, 'admin-billing.png'),
    x: 0.5, y: 1.7, w: 8.3, h: 5.2 });
  highlightPanel(s, 9.0, 1.7, 3.85, 5.2, 'BILLING FUNCTIONS', null, [
    ['Recurring dues', 'Auto-bills all 56 swimmers on the 1st — no manual entry.'],
    ['Competition charges', 'Entry + per-routine fees auto-calculated by team lineup.'],
    ['Merch / POS', 'Sell suits, warm-ups, caps — pickup at next practice.'],
    ['Onboarding bundle', 'Combine dues + reg fee + suit into one parent payment link.'],
    ['Stripe-powered', 'Cards · ACH · cash · ~1–2% processing only · no platform fee.']
  ]);
  footer(s, 6, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 7 — ADMIN · 4/4 (Team + Comms)
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Admin Console · 4 of 4', 'Team detail + categorized communications.');
  shadowImg(s, { path: path.join(SHOTS, 'admin-team-12ua.png'),
    x: 0.5, y: 1.7, w: 6.1, h: 5.2 });
  shadowImg(s, { path: path.join(SHOTS, 'admin-comms.png'),
    x: 6.85, y: 1.7, w: 6.1, h: 5.2 });
  s.addText('Team Detail · 12U A · 6-tab profile', {
    x: 0.5, y: 6.95, w: 6.1, h: 0.3,
    fontSize: 11, fontFace: F.head, color: C.navy, bold: true, align: 'center', margin: 0
  });
  s.addText('Communications · categorized into 5 streams', {
    x: 6.85, y: 6.95, w: 6.1, h: 0.3,
    fontSize: 11, fontFace: F.head, color: C.navy, bold: true, align: 'center', margin: 0
  });
  footer(s, 7, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 8 — COACH · 1/3 (My Day)
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Coach Interface · 1 of 3', 'My Day — built around how coaches already co-coach.');
  shadowImg(s, { path: path.join(SHOTS, 'coach-today.png'),
    x: 0.5, y: 1.7, w: 8.3, h: 5.2 });
  highlightPanel(s, 9.0, 1.7, 3.85, 5.2, 'COACH · DAILY VIEW', null, [
    ['Co-coach sync', 'Heidi\'s attendance + notes appear live in Emily\'s view, and vice-versa.'],
    ['One-tap attendance', 'Present / Late / Absent pills · roster pre-loaded for the next session.'],
    ['Class messages', 'Parent messages tied to that specific practice show up here.'],
    ['Quick send', 'One-tap announcement to that team\'s 10 families.'],
    ['Today\'s other teams', 'See what every other coach is running across the club.']
  ]);
  footer(s, 8, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 9 — COACH · 2/3 (Team + Swimmer Detail)
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Coach Interface · 2 of 3', 'Team roster + per-swimmer skill, attendance & parent messages.');

  shadowImg(s, { path: path.join(SHOTS, 'coach-team.png'),
    x: 0.5, y: 1.7, w: 6.1, h: 5.2 });
  shadowImg(s, { path: path.join(SHOTS, 'coach-swimmer-ellie.png'),
    x: 6.85, y: 1.7, w: 6.1, h: 5.2 });

  s.addText('My Team · 12U A roster · skill bars per swimmer', {
    x: 0.5, y: 6.95, w: 6.1, h: 0.3,
    fontSize: 11, fontFace: F.head, color: C.navy, bold: true, align: 'center', margin: 0
  });
  s.addText('Swimmer Profile · skills · parent thread · co-coach notes', {
    x: 6.85, y: 6.95, w: 6.1, h: 0.3,
    fontSize: 11, fontFace: F.head, color: C.navy, bold: true, align: 'center', margin: 0
  });

  // Bottom strip of mini bullets
  // (no extra strip — captions above are enough; keep the slide breathing)

  footer(s, 9, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 10 — COACH · 3/3 (Schedule + Communications)
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Coach Interface · 3 of 3', 'My schedule, parent inbox, and threads with admin.');

  shadowImg(s, { path: path.join(SHOTS, 'coach-schedule.png'),
    x: 0.5, y: 1.7, w: 6.1, h: 5.2 });
  shadowImg(s, { path: path.join(SHOTS, 'coach-comms.png'),
    x: 6.85, y: 1.7, w: 6.1, h: 5.2 });

  s.addText('My Schedule · my sessions vs. co-coach\'s · cancel + reschedule', {
    x: 0.5, y: 6.95, w: 6.1, h: 0.3,
    fontSize: 11, fontFace: F.head, color: C.navy, bold: true, align: 'center', margin: 0
  });
  s.addText('Messages · parent inbox · DM with Eileen (Admin)', {
    x: 6.85, y: 6.95, w: 6.1, h: 0.3,
    fontSize: 11, fontFace: F.head, color: C.navy, bold: true, align: 'center', margin: 0
  });

  footer(s, 10, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 11 — PARENT · 1/3 (Family Home)
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Parent Portal · 1 of 3', 'Built for families like Kelly\'s — 3 daughters, 3 different teams.');

  shadowImg(s, { path: path.join(SHOTS, 'parent-home.png'),
    x: 1.0, y: 1.7, w: 3.0, h: 5.2 });

  const hx = 4.6, hy = 1.7;
  s.addShape(pres.shapes.RECTANGLE, {
    x: hx, y: hy, w: 8.3, h: 5.2,
    fill: { color: C.white }, line: { color: C.border, width: 0.75 }
  });
  s.addText('ONE LOGIN. ONE UNIFIED SCHEDULE. ONE BILL.', {
    x: hx+0.3, y: hy+0.25, w: 7.7, h: 0.3,
    fontSize: 11, fontFace: F.head, color: C.aqua, bold: true,
    charSpacing: 4, margin: 0
  });
  s.addText('What parents can manage', {
    x: hx+0.3, y: hy+0.6, w: 7.7, h: 0.5,
    fontSize: 18, fontFace: F.head, color: C.text, bold: true, margin: 0
  });

  const parent = [
    ['Family dashboard',  'All 3 children on the home screen · countdown to the next practice.'],
    ['Combined schedule', 'Mon → Sun across all teams · same-pool pickup tips.'],
    ['One-tap absence',   'Replaces the Signal message · coach notified instantly + auto-logged.'],
    ['Per-child billing', 'One family invoice rolling up Brianne · Janelle · Syleste.'],
    ['Skill video library','Coach assignments + USAAS link · watch on phone.'],
    ['Team shop',         'Order suits, jackets, caps · pickup at next practice.']
  ];
  parent.forEach((h, i) => {
    const x = hx + 0.3 + (i % 2) * 4;
    const y = hy + 1.25 + Math.floor(i / 2) * 1.15;
    s.addText(h[0], {
      x, y, w: 3.7, h: 0.3,
      fontSize: 13, fontFace: F.head, color: C.text, bold: true, margin: 0
    });
    s.addText(h[1], {
      x, y: y+0.3, w: 3.7, h: 0.7,
      fontSize: 10.5, fontFace: F.body, color: C.textMid, margin: 0
    });
  });

  footer(s, 11, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 12 — PARENT · 2/3 (Schedule · Practice · Inbox)
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Parent Portal · 2 of 3', 'Drill into any practice · message any coach · see every child.');

  const phones = [
    { img: 'parent-schedule.png',    cap: 'Family schedule\nMon → Sun · all children · filterable' },
    { img: 'parent-practice.png',    cap: 'Practice detail\nWhat to bring · per-class messages' },
    { img: 'parent-child-janelle.png', cap: 'Child profile\nAttendance · skills · billing · messages' },
    { img: 'parent-absence.png',     cap: 'Mark absent\nReason · note · coach notified instantly' }
  ];

  const slotW = 2.55, gap = 0.45, startX = 0.5 + (12.33 - (phones.length * slotW + (phones.length-1) * gap)) / 2;

  phones.forEach((p, i) => {
    const x = startX + i * (slotW + gap);
    shadowImg(s, { path: path.join(SHOTS, p.img),
      x, y: 1.7, w: slotW, h: 4.4 });
    s.addText(p.cap, {
      x, y: 6.2, w: slotW, h: 0.75,
      fontSize: 10.5, fontFace: F.head, color: C.text, bold: true,
      align: 'center', margin: 0
    });
  });

  footer(s, 12, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 13 — PARENT · 3/3 (Billing Email + Portal Payment)
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Parent Portal · 3 of 3', 'Billing — friendly email + one-tap portal payment.');

  // Email mockup — left
  shadowImg(s, { path: path.join(SHOTS, 'billing-email.png'),
    x: 0.4, y: 1.6, w: 4.6, h: 5.45 });
  s.addText('Monthly billing email · auto-sent', {
    x: 0.4, y: 7.05, w: 4.6, h: 0.3,
    fontSize: 10, fontFace: F.head, color: C.navy, bold: true, align: 'center', margin: 0
  });

  // Arrow / flow indicator — middle
  s.addShape(pres.shapes.RIGHT_TRIANGLE, {
    x: 5.25, y: 4.05, w: 0.7, h: 0.55,
    fill: { color: C.aqua }, line: { type: 'none' },
    rotate: 30
  });
  s.addText('PAY\nNOW', {
    x: 5.15, y: 3.45, w: 0.9, h: 0.55,
    fontSize: 10, fontFace: F.head, color: C.aqua, bold: true,
    align: 'center', valign: 'middle', margin: 0, charSpacing: 4
  });

  // Phone payment screenshot — middle-right
  shadowImg(s, { path: path.join(SHOTS, 'parent-pay-sectionals.png'),
    x: 6.15, y: 1.85, w: 2.5, h: 4.33 });
  s.addText('Portal payment screen', {
    x: 6.15, y: 6.25, w: 2.5, h: 0.3,
    fontSize: 10, fontFace: F.head, color: C.navy, bold: true, align: 'center', margin: 0
  });

  // Highlights — right
  highlightPanel(s, 8.85, 1.7, 4.0, 5.4, 'HOW BILLING WORKS', null, [
    ['1. Friendly email', 'Parents receive a clear, branded email with the bill broken down by child.'],
    ['2. One-tap pay', 'The "Pay Now" button takes them straight to the Parent Portal · pre-filled.'],
    ['3. Or pay anytime', 'Same view is also accessible directly on their phone — Billing tab.'],
    ['4. Auto-pay default', 'Card on file auto-charges on the 1st — no action needed each month.'],
    ['5. Receipts emailed', 'On every successful charge — itemized PDF + confirmation ID.']
  ]);

  footer(s, 13, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 14 — FULL OWNERSHIP (consolidated · no rent/own framing)
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  darkBg(s);
  pageHeader(s, 'Built For You · Owned By You', '100% yours, end to end.', { tone: 'dark' });

  // Tagline / lead under header
  s.addText('A proprietary system built specifically for SFM — and handed over completely on launch day. No subscription. No per-user fees. No revenue share. Ever.', {
    x: 0.5, y: 1.55, w: 12.3, h: 0.7,
    fontSize: 14, fontFace: F.body, color: C.ice, italic: true,
    margin: 0
  });

  // Four pillars
  const pillars = [
    {
      label: 'TAILORED',
      title: 'Built around SFM\'s workflow',
      body: 'Designed from scratch using your real team names, levels, schedules, coaches, and competition fee structure. Not a generic template adapted with workarounds.'
    },
    {
      label: 'NO REVENUE SHARE',
      title: 'Zero ongoing platform fees',
      body: 'After handover, the platform costs you nothing to run beyond standard cloud hosting (~$15/mo, your account) and Stripe\'s 1–2% gateway. We take no cut of dues or competition fees.'
    },
    {
      label: 'FULL OWNERSHIP',
      title: 'Source code & data are yours',
      body: 'On launch day the complete codebase, database, deployment scripts, and brand assets are transferred to SFM. We retain nothing. You own every file.'
    },
    {
      label: 'NO LOCK-IN',
      title: 'Any developer can maintain it',
      body: 'Built on open-source standards (HTML · CSS · JavaScript · Node · PostgreSQL). Any developer who codes can read it, modify it, or host it elsewhere — without us.'
    }
  ];

  const pw = 2.95, pgap = 0.18, pStartX = 0.5 + (12.33 - (pillars.length * pw + (pillars.length-1) * pgap)) / 2;
  pillars.forEach((p, i) => {
    const x = pStartX + i * (pw + pgap);
    const y = 2.5;
    const h = 4.3;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: pw, h,
      fill: { color: C.white, transparency: 92 }, line: { color: C.aqua, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: pw, h: 0.08,
      fill: { color: C.aqua }, line: { type: 'none' }
    });
    s.addText(p.label, {
      x: x+0.2, y: y+0.22, w: pw-0.4, h: 0.3,
      fontSize: 10, fontFace: F.head, color: C.aqua, bold: true,
      charSpacing: 5, margin: 0
    });
    s.addText(p.title, {
      x: x+0.2, y: y+0.55, w: pw-0.4, h: 0.85,
      fontSize: 16, fontFace: F.head, color: C.white, bold: true, margin: 0
    });
    s.addText(p.body, {
      x: x+0.2, y: y+1.5, w: pw-0.4, h: h-1.7,
      fontSize: 11, fontFace: F.body, color: C.ice, margin: 0
    });
  });

  footer(s, 14, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 15 — INVESTMENT OVERVIEW
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Investment Overview', 'One-time. Staggered. No surprises.');

  // Big number left
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.85, w: 6.2, h: 5.0,
    fill: { color: C.navy }, line: { color: C.navy, width: 1.5 }
  });
  s.addText('TOTAL INVESTMENT', {
    x: 0.7, y: 2.05, w: 5.8, h: 0.4,
    fontSize: 13, fontFace: F.head, color: C.aqua, bold: true, charSpacing: 8, margin: 0
  });
  s.addText('$10,000 – $12,000', {
    x: 0.7, y: 2.5, w: 5.8, h: 1.6,
    fontSize: 52, fontFace: F.head, color: C.white, bold: true, margin: 0
  });
  s.addText('One-time. Final figure depends on scope-of-work confirmation.', {
    x: 0.7, y: 4.1, w: 5.8, h: 0.4,
    fontSize: 13, fontFace: F.body, color: C.ice, italic: true, margin: 0
  });

  s.addText('WHAT\'S INCLUDED', {
    x: 0.7, y: 4.7, w: 5.8, h: 0.3,
    fontSize: 11, fontFace: F.head, color: C.aqua, bold: true, charSpacing: 6, margin: 0
  });
  const incl = [
    'Three role interfaces — Admin · Coach · Parent',
    'Stripe + Twilio integrations',
    'Hosting setup on your cloud',
    'Full source code + brand handover',
    '3-month build · 60-day post-launch support'
  ];
  s.addText(incl.map((t, i) => ({
    text: t,
    options: { bullet: { code: '2713' }, breakLine: i < incl.length-1, color: C.white }
  })), { x: 0.75, y: 5.05, w: 5.7, h: 1.8,
    fontSize: 11, fontFace: F.body, color: C.white, paraSpaceAfter: 4, margin: 0 });

  // Payment schedule right
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.0, y: 1.85, w: 5.85, h: 5.0,
    fill: { color: C.white }, line: { color: C.border, width: 0.75 }
  });
  s.addText('STAGGERED PAYMENT SCHEDULE', {
    x: 7.2, y: 2.05, w: 5.5, h: 0.4,
    fontSize: 11, fontFace: F.head, color: C.aqua, bold: true, charSpacing: 6, margin: 0
  });
  s.addText('Four payments over the 3-month build', {
    x: 7.2, y: 2.45, w: 5.5, h: 0.4,
    fontSize: 15, fontFace: F.head, color: C.text, bold: true, margin: 0
  });

  const milestones = [
    ['25%', 'Deposit',         'Project kickoff · scope locked'],
    ['25%', 'Month 1',         'Design + Admin Console core'],
    ['25%', 'Month 2',         'Coach + Parent Portal'],
    ['25%', 'Month 3 · Launch', 'Final delivery + handover + training']
  ];
  milestones.forEach((m, i) => {
    const y = 3.05 + i * 0.85;
    s.addShape(pres.shapes.OVAL, {
      x: 7.25, y: y+0.05, w: 0.55, h: 0.55,
      fill: { color: C.aqua }, line: { type: 'none' }
    });
    s.addText(m[0], {
      x: 7.25, y: y+0.05, w: 0.55, h: 0.55,
      fontSize: 11, fontFace: F.head, color: C.white, bold: true,
      align: 'center', valign: 'middle', margin: 0
    });
    s.addText(m[1], {
      x: 7.95, y: y, w: 4.7, h: 0.32,
      fontSize: 13, fontFace: F.head, color: C.text, bold: true, margin: 0
    });
    s.addText(m[2], {
      x: 7.95, y: y+0.34, w: 4.7, h: 0.3,
      fontSize: 10, fontFace: F.body, color: C.textMid, margin: 0
    });
  });

  footer(s, 15, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 16 — ABOUT NILE TECHNOLOGIES
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  darkBg(s);
  pageHeader(s, 'About Us', 'Nile Technologies — 15 years building software.', { tone: 'dark' });

  s.addText('A development partner you can rely on', {
    x: 0.5, y: 1.85, w: 7, h: 0.45,
    fontSize: 19, fontFace: F.head, color: C.white, bold: true, margin: 0
  });
  s.addText('Founded in 2011 by an ex-Oracle Senior Director, Nile started as an enterprise Oracle implementation partner. In 2016 we expanded into custom web & mobile development for small and mid-sized businesses worldwide. Today we\'re a 100-person team based in New Delhi — with the same founder-led care we started with.', {
    x: 0.5, y: 2.35, w: 7, h: 2.5,
    fontSize: 12.5, fontFace: F.body, color: C.ice, margin: 0
  });

  const ns = 4.7;
  statCard(s, 0.5,  ns, 1.6, 1.5, '2011',  'Founded',         { fill: '163578', valueColor: C.aqua, line: '2C53B8' });
  statCard(s, 2.25, ns, 1.6, 1.5, '100+',  'Team in Delhi',   { fill: '163578', valueColor: C.aqua, line: '2C53B8' });
  statCard(s, 4.0,  ns, 1.6, 1.5, '15 yrs','Software dev',    { fill: '163578', valueColor: C.aqua, line: '2C53B8' });
  statCard(s, 5.75, ns, 1.6, 1.5, '3',      'Business domains',{ fill: '163578', valueColor: C.aqua, line: '2C53B8' });

  const rx = 8.0;
  s.addShape(pres.shapes.RECTANGLE, {
    x: rx, y: 1.85, w: 4.85, h: 5.0,
    fill: { color: C.white, transparency: 92 }, line: { color: C.aqua, width: 1 }
  });
  s.addText('THREE PRACTICE AREAS', {
    x: rx+0.25, y: 2.0, w: 4.5, h: 0.3,
    fontSize: 11, fontFace: F.head, color: C.aqua, bold: true, charSpacing: 6, margin: 0
  });

  const areas = [
    ['Enterprise',  'Oracle implementation for large corporates (our origin practice).'],
    ['Web & Mobile', 'Custom apps for SMBs, NGOs, startups — SFM falls here.'],
    ['AI',           'Custom AI agents, chatbots, and assistants for businesses.']
  ];
  areas.forEach((a, i) => {
    const y = 2.5 + i * 1.4;
    s.addShape(pres.shapes.OVAL, {
      x: rx+0.25, y: y+0.05, w: 0.45, h: 0.45,
      fill: { color: C.aqua }, line: { type: 'none' }
    });
    s.addText((i+1).toString(), {
      x: rx+0.25, y: y+0.05, w: 0.45, h: 0.45,
      fontSize: 14, fontFace: F.head, color: C.white, bold: true,
      align: 'center', valign: 'middle', margin: 0
    });
    s.addText(a[0], {
      x: rx+0.85, y: y, w: 3.85, h: 0.35,
      fontSize: 14, fontFace: F.head, color: C.white, bold: true, margin: 0
    });
    s.addText(a[1], {
      x: rx+0.85, y: y+0.36, w: 3.85, h: 0.85,
      fontSize: 11, fontFace: F.body, color: C.ice, margin: 0
    });
  });

  s.addShape(pres.shapes.LINE, {
    x: 0.5, y: 6.5, w: 12.3, h: 0,
    line: { color: C.aqua, width: 1 }
  });
  s.addText('niletechnologies.com', {
    x: 0.5, y: 6.65, w: 12.3, h: 0.35,
    fontSize: 13, fontFace: F.head, color: C.aqua, bold: true, align: 'center', margin: 0
  });

  footer(s, 16, TOTAL);
}

// ════════════════════════════════════════════════════════════
// SLIDE 17 — RELEVANT EXPERIENCE + NEXT STEPS
// ════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  lightBg(s);
  pageHeader(s, 'Relevant Experience', 'We\'ve built systems just like this — for clubs and schools.');

  const cases = [
    { tag: 'YOUTH SPORTS · MARTIAL ARTS',
      name: 'Shaolin Kung Fu Institute',
      scale: '1,000 students · 5 locations',
      what: 'Multi-tier admin (master + per-location) · attendance · billing · skill tracking · parent portal. Closest to SFM in workflow.' },
    { tag: 'APPOINTMENT-BASED FITNESS',
      name: 'Royal Personal Training',
      scale: 'Boutique studio · class packs',
      what: 'Booking-based ops · client packs of 16/20 classes · POS · CRM with auto-renewal nudges for at-risk clients.' },
    { tag: 'MEMBERSHIP-BASED FITNESS',
      name: 'Member Gym Operations',
      scale: 'Recurring memberships',
      what: 'Schedules · batches · trainer assignment · POS for plan sales · attendance · inventory for retail merch — same DNA as SFM.' }
  ];
  const cw = 4.05, cgap = 0.15;
  cases.forEach((c, i) => {
    const x = 0.5 + i * (cw + cgap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.85, w: cw, h: 3.5,
      fill: { color: C.white }, line: { color: C.border, width: 0.75 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.85, w: cw, h: 0.08, fill: { color: C.aqua }, line: { type: 'none' }
    });
    s.addText(c.tag, {
      x: x+0.25, y: 2.0, w: cw-0.5, h: 0.3,
      fontSize: 9.5, fontFace: F.head, color: C.aqua, bold: true, charSpacing: 5, margin: 0
    });
    s.addText(c.name, {
      x: x+0.25, y: 2.32, w: cw-0.5, h: 0.45,
      fontSize: 17, fontFace: F.head, color: C.text, bold: true, margin: 0
    });
    s.addText(c.scale, {
      x: x+0.25, y: 2.78, w: cw-0.5, h: 0.3,
      fontSize: 10.5, fontFace: F.body, color: C.navy, italic: true, margin: 0
    });
    s.addText(c.what, {
      x: x+0.25, y: 3.15, w: cw-0.5, h: 2.1,
      fontSize: 11, fontFace: F.body, color: C.textMid, margin: 0
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.55, w: 12.35, h: 1.2,
    fill: { color: C.navy }, line: { type: 'none' }
  });
  s.addText('NEXT STEPS', {
    x: 0.7, y: 5.65, w: 4, h: 0.3,
    fontSize: 11, fontFace: F.head, color: C.aqua, bold: true, charSpacing: 6, margin: 0
  });
  s.addText('Board approval → signed scope-of-work → 25% deposit → kickoff. Launch in Aug 2026 — ready for the fall season.', {
    x: 0.7, y: 5.95, w: 12, h: 0.7,
    fontSize: 14, fontFace: F.head, color: C.white, margin: 0
  });

  s.addText('Aaditya Kapoor  ·  Sanju Kapoor  ·  niletechnologies.com', {
    x: 0.5, y: 6.95, w: 12.35, h: 0.35,
    fontSize: 11, fontFace: F.body, color: C.textMid, align: 'center', italic: true, margin: 0
  });
}

// ── Write file ─────────────────────────────────────────────
pres.writeFile({ fileName: path.join(__dirname, '..', 'SFM-Board-Presentation.pptx') })
  .then(() => console.log('✓ Built: SFM-Board-Presentation.pptx (' + TOTAL + ' slides)'));
