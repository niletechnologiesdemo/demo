const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle
} = require('docx');

/* ------------------------------------------------------------- palette */
const W       = 9026;
const FOREST  = '0F3D33';
const GOLD    = 'A97A31';
const INK     = '16191D';
const MUTED   = '5C6470';
const LINE    = 'DDD6CC';
const WASH    = 'FBF1DE';
const FWASH   = 'E6F0EC';

/* XML 1.0 forbids most control characters. Strip them at the boundary so a
   stray character pasted into a string can never produce a corrupt file. */
function clean(v) {
  const s = String(v == null ? '' : v);
  let out = '';
  for (const ch of s) {
    const c = ch.codePointAt(0);
    if (c < 32 && ch !== '\n' && ch !== '\t') continue;
    out += (c === 160) ? ' ' : ch;
  }
  return out;
}

const T = (t, o = {}) => new TextRun({
  text: clean(t), bold: o.bold, italics: o.italics, size: o.size ?? 21,
  color: o.color ?? INK, font: 'Calibri', characterSpacing: o.spacing
});
const b = (t, o = {}) => T(t, { ...o, bold: true });

const P = (kids, o = {}) => new Paragraph({
  alignment: o.align,
  spacing: { before: o.before ?? 0, after: o.after ?? 130 },
  children: Array.isArray(kids) ? kids : [T(kids, o)]
});

const H1 = t => new Paragraph({
  heading: HeadingLevel.HEADING_1, spacing: { before: 340, after: 150 },
  children: [T(t, { bold: true, size: 29, color: FOREST })]
});
const H1B = t => new Paragraph({
  heading: HeadingLevel.HEADING_1, pageBreakBefore: true, spacing: { after: 150 },
  children: [T(t, { bold: true, size: 29, color: FOREST })]
});
const H2 = t => new Paragraph({
  heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 90 },
  children: [T(t, { bold: true, size: 23, color: INK })]
});
const EYE = t => new Paragraph({
  spacing: { before: 200, after: 60 },
  children: [T(t, { bold: true, size: 17, color: GOLD, spacing: 60 })]
});

const BUL = t => new Paragraph({
  numbering: { reference: 'bul', level: 0 }, spacing: { after: 55 },
  children: Array.isArray(t) ? t : [T(t)]
});
const NUM = t => new Paragraph({
  numbering: { reference: 'num', level: 0 }, spacing: { after: 70 },
  children: Array.isArray(t) ? t : [T(t)]
});

const cell = (t, o = {}) => new TableCell({
  width: { size: o.w, type: WidthType.DXA },
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: 'auto' } : undefined,
  margins: { top: 95, bottom: 95, left: 130, right: 130 },
  children: (Array.isArray(t) ? t : [t]).map(x =>
    typeof x === 'string'
      ? new Paragraph({ alignment: o.align, spacing: { after: 0 },
          children: [T(x, { bold: o.bold, size: o.size ?? 20, color: o.color ?? INK })] })
      : x)
});
const hcell = (t, w, o = {}) => cell(t, { w, bold: true, fill: FOREST, color: 'FFFFFF', size: 19, ...o });

const table = (widths, rows) => new Table({
  columnWidths: widths,
  width: { size: widths.reduce((a, c) => a + c, 0), type: WidthType.DXA },
  borders: {
    top:{style:BorderStyle.SINGLE,size:4,color:LINE}, bottom:{style:BorderStyle.SINGLE,size:4,color:LINE},
    left:{style:BorderStyle.SINGLE,size:4,color:LINE}, right:{style:BorderStyle.SINGLE,size:4,color:LINE},
    insideHorizontal:{style:BorderStyle.SINGLE,size:4,color:LINE},
    insideVertical:{style:BorderStyle.SINGLE,size:4,color:LINE}
  },
  rows
});

const RULE = new Paragraph({
  spacing: { before: 60, after: 170 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD } },
  children: [T('')]
});

const CALLOUT = (title, body) => new Table({
  columnWidths: [W],
  width: { size: W, type: WidthType.DXA },
  borders: {
    top:{style:BorderStyle.SINGLE,size:4,color:GOLD}, bottom:{style:BorderStyle.SINGLE,size:4,color:GOLD},
    left:{style:BorderStyle.SINGLE,size:18,color:GOLD}, right:{style:BorderStyle.SINGLE,size:4,color:GOLD},
    insideHorizontal:{style:BorderStyle.NONE,size:0,color:'FFFFFF'},
    insideVertical:{style:BorderStyle.NONE,size:0,color:'FFFFFF'}
  },
  rows: [new TableRow({ children: [new TableCell({
    width: { size: W, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: WASH, color: 'auto' },
    margins: { top: 150, bottom: 150, left: 180, right: 180 },
    children: [
      new Paragraph({ spacing: { after: 70 }, children: [T(title, { bold: true, size: 21, color: GOLD })] }),
      ...(Array.isArray(body) ? body : [body]).map(x =>
        typeof x === 'string' ? new Paragraph({ spacing: { after: 0 }, children: [T(x)] }) : x)
    ]
  })] })]
});

const gbp = n => '£' + n.toLocaleString('en-GB');

/* --------------------------------------------------------------- pricing */
const COMPONENTS = [
  ['Core App',               250, 16000],
  ['Apex Network',            30,  3500],
  ['Social Feed and Follows', 24,  2000],
  ['Referral Module',         19,  2500],
  ['Advertising Module',      38,  2500]
];
const REV = ['Vendor Revenue Share', 38, 5000];

const PLAT_DAYS = COMPONENTS.reduce((a, c) => a + c[1], 0);
const PLATFORM  = COMPONENTS.reduce((a, c) => a + c[2], 0);
const FULL_DAYS = PLAT_DAYS + REV[1];
const COMPLETE  = PLATFORM + REV[2];

const PLAT_DAY  = PLATFORM / PLAT_DAYS,  PLAT_HOUR = PLAT_DAY / 8;
const FULL_DAY  = COMPLETE / FULL_DAYS,  FULL_HOUR = FULL_DAY / 8;

const K = [];
const add = (...x) => K.push(...x);

/* ----------------------------------------------------------------- cover */
add(
  new Paragraph({ spacing: { after: 0 }, children: [T('PROPOSAL & SCOPE OF WORK', { bold: true, size: 20, color: GOLD, spacing: 70 })] }),
  new Paragraph({ spacing: { before: 220, after: 60 }, children: [T('Apex', { bold: true, size: 62, color: FOREST })] }),
  new Paragraph({ spacing: { after: 80 }, children: [T('A members-only business directory for the United Kingdom', { size: 27, color: INK })] }),
  new Paragraph({ spacing: { after: 380 }, children: [T('Mobile applications, member web, business portal and administration console', { size: 21, color: MUTED })] }),
  RULE,
  table([2500, 6526], [
    new TableRow({ children: [cell('Prepared for', { w: 2500, bold: true, color: MUTED }), cell('Mr Sajjad Kassamali', { w: 6526 })] }),
    new TableRow({ children: [cell('Project', { w: 2500, bold: true, color: MUTED }), cell('Apex — Members Network and Apex Deals', { w: 6526 })] }),
    new TableRow({ children: [cell('Launch market', { w: 2500, bold: true, color: MUTED }), cell('London, United Kingdom', { w: 6526 })] }),
    new TableRow({ children: [cell('Prepared by', { w: 2500, bold: true, color: MUTED }), cell('Nile Technologies', { w: 6526 })] }),
    new TableRow({ children: [cell('Date', { w: 2500, bold: true, color: MUTED }), cell('19 August 2026', { w: 6526 })] }),
    new TableRow({ children: [cell('Proposal reference', { w: 2500, bold: true, color: MUTED }), cell('APX-2026-01', { w: 6526 })] }),
    new TableRow({ children: [cell('Valid until', { w: 2500, bold: true, color: MUTED }), cell('18 September 2026', { w: 6526 })] }),
    new TableRow({ children: [
      cell('Platform investment', { w: 2500, bold: true, color: MUTED, fill: WASH }),
      cell(gbp(PLATFORM), { w: 6526, bold: true, size: 26, color: GOLD, fill: WASH })] })
  ]),
  new Paragraph({ spacing: { before: 420 }, children: [T('Commercial in confidence. This document and the accompanying working demonstration are provided solely for the evaluation of the Apex project.', { size: 18, color: MUTED, italics: true })] })
);

/* ------------------------------------------------------------ 1. the idea */
add(H1B('1.  The opportunity'));
add(P('Everybody knows that better prices exist. Almost nobody can find them. A shopper who wants a car, a valet, a table on Friday night or simply a decent haircut is left with a search engine, three telephone calls and the hope that somebody mentions a discount. The offers are real. They are simply invisible unless you happen to know the right person.'));
add(P('Apex closes that gap by making the offers the product. A verified directory of British businesses, each with a digital storefront, each able to publish genuine member-only offers, and a membership that unlocks them. Businesses list at no cost and gain distribution they cannot buy elsewhere. Members pay a modest subscription and recover it many times over. Apex earns from the membership.'));
add(P([b('The commercial logic is unusually clean. '), T('One paying side, one free side, and a marketplace that becomes more valuable to each as the other grows. On a conservative reading of London alone — fifty thousand active users, of whom five thousand subscribe at ten pounds a month — the platform carries fifty thousand pounds of recurring monthly revenue before a single advertising pound is counted.')]));
add(CALLOUT('What Apex is, in one line',
  'A members-only network where verified British businesses publish their best offers and their open roles, and members unlock them with a code they present at the counter.'));

/* -------------------------------------------------------- 2. the concept */
add(H1('2.  The concept, as we understand it'));
add(P('The platform carries two named destinations under a single membership. This is a deliberate structure. It gives the product a clear shape, gives every business two reasons to keep its listing current, and gives Apex a positioning line that no general directory can claim.'));

add(H2('Apex Deals'));
add(P('Exclusive offers from verified businesses. A member browses free, but the value of an offer stays hidden until they hold a membership. When they unlock one, the system issues a code unique to that member and that offer. They present it in store, the business confirms it in their own portal, and the discount is applied.'));

add(H2('Apex Network'));
add(P('The same businesses, hiring. A member sees an opportunity, registers interest and shares their profile. The business reviews it and makes contact directly. Apex introduces. It does not intermediate.'));

add(H2('The membership'));
add(table([3000, 3013, 3013], [
  new TableRow({ tableHeader: true, children: [hcell('', 3000), hcell('Apex Standard', 3013), hcell('Apex Unlimited', 3013)] }),
  new TableRow({ children: [cell('Monthly', { w: 3000, bold: true, color: MUTED }), cell(gbp(10), { w: 3013, bold: true }), cell('£24.99', { w: 3013, bold: true })] }),
  new TableRow({ children: [cell('Annual', { w: 3000, bold: true, color: MUTED }), cell(gbp(100) + ' — two months free', { w: 3013 }), cell(gbp(250) + ' — two months free', { w: 3013 })] }),
  new TableRow({ children: [cell('Offer unlocks', { w: 3000, bold: true, color: MUTED }), cell('Fifteen each month', { w: 3013 }), cell('Unlimited', { w: 3013 })] }),
  new TableRow({ children: [cell('Apex Network', { w: 3000, bold: true, color: MUTED }), cell('Full access', { w: 3013 }), cell('Full access, priority interest', { w: 3013 })] })
]));
add(P('A member using fifteen offers a month recovers roughly ten times the subscription. That ratio is the single most important number in the product, and the application is built to keep it in front of the member: every session shows a running total of what Apex has returned to them.', { before: 140 }));

/* ------------------------------------------------- 3. what already exists */
add(H1B('3.  What we have already built'));
add(P('Rather than describe the platform, we have built it. A complete, clickable demonstration accompanies this proposal, covering all three surfaces with realistic data: twenty-six London businesses, forty-six live offers and fourteen open roles.'));
add(BUL([b('The member application.  '), T('Welcome, sign-up and onboarding; the directory with search and categories; verified business profiles; locked and unlocked offers; membership tiers and checkout; the code wallet; Apex Network; and the member account.')]));
add(BUL([b('The business portal.  '), T('Application and verification status, the profile editor, offer creation, announcements, hiring, self-serve advertising, and the heart of the system, deal code verification at the counter.')]));
add(BUL([b('The administration console.  '), T('The verification queue that keeps the directory legitimate, directory and offer moderation, member and subscription management, and the commercial reporting behind it.')]));
add(P([b('The two halves connect. '), T('A member unlocks an offer in the application and receives a code. That same code, typed into the business portal, resolves to the member, confirms the membership is active, states the discount to apply, and marks itself redeemed. Present it a second time and the portal reports it as already used. This is the mechanism the entire business model rests on, and it is already working.')], { before: 140 }));

/* --------------------------------------------------------- 4. core scope */
add(H1B('4.  The Core App — scope of work'));
add(P('The core is the complete, launchable platform. Everything below is included in the core price and requires no further module in order to operate as a business.'));

add(EYE('MEMBER APPLICATIONS - NATIVE iOS, NATIVE ANDROID AND RESPONSIVE WEB'));
[
  'Account creation, sign-in, social sign-in, and a guided onboarding that captures area and interests.',
  'Directory search by product, category, business name and location, with proximity ordering.',
  'Category browsing across the full taxonomy.',
  'Verified business profiles with imagery, description, trading information, offers and roles.',
  'Offer discovery with locked and unlocked states, popularity and expiry signalling.',
  'Offer unlocking, unique code issue, monthly allowance tracking and the code wallet.',
  'Saved offers, membership purchase and management, billing history, notification and privacy settings.'
].forEach(t => add(BUL(t)));

add(EYE('BUSINESS PORTAL - WEB'));
[
  'Application, document upload and verification status tracking.',
  'Business profile editor including imagery, category, trading area and description.',
  'Offer creation with value, terms, scheduling, expiry and per-member redemption limits.',
  'Deal code verification: entry, member and offer confirmation, the discount to apply, and redemption marking.',
  'Performance reporting covering profile views, unlocks, redemptions, conversion rate and follower growth.'
].forEach(t => add(BUL(t)));

add(EYE('ADMINISTRATION CONSOLE - WEB'));
[
  'The verification queue: application review, document checks, approve, reject or request further information.',
  'Directory management across all listed businesses, with search, filtering and status control.',
  'Offer moderation, including removal and notification of the business.',
  'Member and subscription management, plan mix and churn reporting.',
  'Category taxonomy management and platform revenue reporting.'
].forEach(t => add(BUL(t)));

add(EYE('PLATFORM AND INFRASTRUCTURE'));
[
  'Authentication and authorisation across three distinct roles.',
  'Subscription billing through Stripe: tiers, monthly and annual terms, upgrades, failed-payment recovery and cancellation.',
  'Unique, non-guessable code generation with single-use enforcement.',
  'Search and geospatial infrastructure, media storage and image optimisation.',
  'Transactional email and push notification delivery.',
  'Audit logging, security hardening, deployment pipeline, and submission to the Apple App Store and Google Play.'
].forEach(t => add(BUL(t)));

/* ------------------------------------------------------------ 5. modules */
add(H1B('5.  The optional modules'));
add(P('Each module below is a complete capability in its own right. They can be commissioned alongside the core, or added later without rebuilding what came before, because the core is architected to receive them.'));

add(H2('5.1  Apex Network  —  ' + gbp(3500)));
add(P('Turns the directory into something no competitor offers: a single membership carrying both commercial and professional value. The businesses are already verified and already present. Publishing their vacancies costs them nothing and gives them a hiring channel they would otherwise pay for.'));
[
  'Role posting from the business portal, with contract type, remuneration and description.',
  'The Apex Network destination in the application: browsing, filtering by contract type, and role detail.',
  'Member Network profile and curriculum vitae upload.',
  'Register-interest, with the member profile surfaced to the business.',
  'Interested-candidate management in the business portal.',
  'Notification when a followed business publishes a role, and administrative moderation of postings.'
].forEach(t => add(BUL(t)));

add(H2('5.2  Social Feed and Follows  —  ' + gbp(2000)));
add(P('The difference between a directory people visit when they need something and a network people check. Members follow the businesses they care about and hear about a new offer the moment it is published, which converts Apex from a search tool into a habit.'));
[
  'Follow and unfollow any verified business.',
  'An announcement composer in the business portal, with reach and engagement statistics.',
  'A personalised member feed drawn from followed businesses.',
  'Push notification on publication, so followers see an offer first.'
].forEach(t => add(BUL(t)));

add(H2('5.3  Referral Module  —  ' + gbp(2500)));
add(P('The cheapest acquisition Apex will ever have. For a members-only product, an invitation from an existing member is both the most persuasive marketing available and entirely consistent with the brand.'));
[
  'A unique referral code and share mechanism for every member.',
  'Attribution tracking from invitation through to paid conversion.',
  'Automatic reward application. A free month for the referring member on qualifying conversion, credited directly against the subscription.',
  'Safeguards against self-referral and abuse, with referral performance reporting for the administrator.'
].forEach(t => add(BUL(t)));

add(H2('5.4  Advertising Module  —  ' + gbp(2500)));
add(P('The second revenue line, and the one that pays for itself. Every business receives its listing free. Those that want a competitive edge can buy visibility, and Apex earns from it without adding a penny of cost per member.'));
[
  'Featured placement: a prominent card on the member home screen and across inner pages.',
  'Category ranking: first position within a chosen category for both browsing and search.',
  'Self-serve campaign purchase from the business portal. Select the type, set the duration, pay by card.',
  'A two-month maximum per booking, so placements stay fresh and inventory keeps turning.',
  'Campaign performance reporting for the business.',
  'Slot inventory, availability, scheduling and conflict handling for the administrator, with advertising revenue reporting.'
].forEach(t => add(BUL(t)));


/* ---------------------------------------------- revenue share, own pages */
add(H1B('5.5  Vendor Revenue Share  —  ' + gbp(5000)));
add(P([b('This is the idea that makes Apex structurally different from every directory that has come before it, and we would encourage you not to treat it as an afterthought.')]));
add(P('Consider what YouTube actually did. Its revenue came from advertising. Rather than keep it, YouTube paid a share back to the people making the videos. It did not then have to commission content, chase creators or police quality. Creators competed with one another to produce the best work available, because the platform paid them to. The content improved itself.'));
add(P('Apex can run precisely the same mechanism in commerce. Our revenue is membership subscription. We pay a share of it back to the businesses whose offers members actually redeem. The consequences follow automatically.'));
[
  'A business has a direct financial reason to publish its genuinely best offer on Apex, rather than its leftovers.',
  'Businesses compete with one another for the top of the table, which raises the quality of every offer on the platform.',
  'The member sees better value, renews, and the subscription pool from which payouts are drawn grows.',
  'Apex acquires something no competitor can copy quickly: a supply side that is motivated rather than merely present.'
].forEach(t => add(BUL(t)));
add(CALLOUT('The mechanism, in practice',
  'Of twenty thousand pounds collected in subscriptions in a given month, a defined share — say five thousand — is distributed among the businesses whose offers were redeemed most. A small independent that publishes something genuinely exceptional can out-earn a far larger competitor. That is a new income stream for the business and, for Apex, a marketplace that improves itself.'));
add(P('What the module delivers:', { before: 160 }));
[
  'Redemption-weighted performance ranking across all businesses, by period.',
  'A configurable share pool, defined either as a percentage of subscription revenue or as a fixed sum.',
  'Period close, calculation and approval workflow under administrative control.',
  'Payout tracking, statements to each participating business, and full reconciliation reporting.',
  'The business-facing view: current standing, earnings to date, and the next payout.'
].forEach(t => add(BUL(t)));
add(P([b('A note on sequencing. '), T('Revenue share works once there is a subscription pool worth sharing. We would recommend building it in Phase 1 so the mechanism is designed into the data from the very first redemption, and switching it on when membership volume justifies it. Retrofitting it later is materially more expensive.')], { before: 150 }));

/* ---------------------------------------------------------- 6. investment */
add(H1B('6.  Investment'));
add(P('All figures are in pounds sterling and exclude applicable taxes.'));
add(table([4200, 1350, 1738, 1738], [
  new TableRow({ tableHeader: true, children: [
    hcell('Component', 4200), hcell('Effort', 1350, { align: AlignmentType.RIGHT }),
    hcell('Investment', 1738, { align: AlignmentType.RIGHT }), hcell('Status', 1738)] }),
  ...COMPONENTS.map(([n, d, v], i) => new TableRow({ children: [
    cell(n, { w: 4200, bold: i === 0 }),
    cell(d + ' days', { w: 1350, align: AlignmentType.RIGHT, color: MUTED }),
    cell(gbp(v), { w: 1738, bold: true, align: AlignmentType.RIGHT }),
    cell(i === 0 ? 'Required' : 'Optional', { w: 1738, color: i === 0 ? FOREST : MUTED, bold: i === 0 })] })),
  new TableRow({ children: [
    cell('Platform total', { w: 4200, bold: true, fill: FOREST, color: 'FFFFFF' }),
    cell(PLAT_DAYS + ' days', { w: 1350, bold: true, align: AlignmentType.RIGHT, fill: FOREST, color: 'FFFFFF' }),
    cell(gbp(PLATFORM), { w: 1738, bold: true, size: 24, align: AlignmentType.RIGHT, fill: FOREST, color: 'FFFFFF' }),
    cell('', { w: 1738, fill: FOREST })] })
]));

add(H2('An additional module, offered separately'));
add(table([4200, 1350, 1738, 1738], [
  new TableRow({ children: [
    cell(REV[0], { w: 4200, bold: true, fill: WASH }),
    cell(REV[1] + ' days', { w: 1350, align: AlignmentType.RIGHT, color: MUTED, fill: WASH }),
    cell(gbp(REV[2]), { w: 1738, bold: true, align: AlignmentType.RIGHT, color: GOLD, fill: WASH }),
    cell('Optional', { w: 1738, color: MUTED, fill: WASH })] }),
  new TableRow({ children: [
    cell('Complete platform, including Vendor Revenue Share', { w: 4200, bold: true }),
    cell(FULL_DAYS + ' days', { w: 1350, bold: true, align: AlignmentType.RIGHT, color: MUTED }),
    cell(gbp(COMPLETE), { w: 1738, bold: true, size: 23, align: AlignmentType.RIGHT }),
    cell('', { w: 1738 })] })
]));
add(P([b('Our recommendation. '), T('Commission the platform in full, and take Vendor Revenue Share with it. The modules are not decoration. Apex Network is what makes the proposition comprehensive, advertising and revenue share are the two commercial engines, and the feed and referral modules are what turn a directory into a network that grows itself. Built together they cost less and take less time than adding them one at a time later, because every retrofit disturbs work already finished.')], { before: 160 }));

/* ------------------------------------------------- 7. where the money goes */
add(H1('7.  Where the investment goes'));
add(P('We think you are entitled to see the arithmetic behind the number rather than simply the number itself. The figures below are our genuine internal estimates of the effort required, expressed as person-days across design, engineering, quality assurance, project management and deployment.'));
add(table([3600, 1900, 1763, 1763], [
  new TableRow({ tableHeader: true, children: [
    hcell('Measure', 3600), hcell('Basis', 1900, { align: AlignmentType.RIGHT }),
    hcell('Platform', 1763, { align: AlignmentType.RIGHT }), hcell('With Rev Share', 1763, { align: AlignmentType.RIGHT })] }),
  new TableRow({ children: [
    cell('Total engineering effort', { w: 3600 }),
    cell('Person-days', { w: 1900, align: AlignmentType.RIGHT, color: MUTED }),
    cell(String(PLAT_DAYS), { w: 1763, bold: true, align: AlignmentType.RIGHT }),
    cell(String(FULL_DAYS), { w: 1763, bold: true, align: AlignmentType.RIGHT })] }),
  new TableRow({ children: [
    cell('Equivalent person-hours', { w: 3600 }),
    cell('At eight hours per day', { w: 1900, align: AlignmentType.RIGHT, color: MUTED }),
    cell((PLAT_DAYS * 8).toLocaleString('en-GB'), { w: 1763, bold: true, align: AlignmentType.RIGHT }),
    cell((FULL_DAYS * 8).toLocaleString('en-GB'), { w: 1763, bold: true, align: AlignmentType.RIGHT })] }),
  new TableRow({ children: [
    cell('Investment', { w: 3600 }),
    cell('Pounds sterling', { w: 1900, align: AlignmentType.RIGHT, color: MUTED }),
    cell(gbp(PLATFORM), { w: 1763, bold: true, align: AlignmentType.RIGHT }),
    cell(gbp(COMPLETE), { w: 1763, bold: true, align: AlignmentType.RIGHT })] }),
  new TableRow({ children: [
    cell('Effective rate per person-day', { w: 3600, bold: true, fill: WASH }),
    cell('Blended, whole team', { w: 1900, align: AlignmentType.RIGHT, color: MUTED, fill: WASH }),
    cell(gbp(Math.round(PLAT_DAY)), { w: 1763, bold: true, size: 23, color: GOLD, align: AlignmentType.RIGHT, fill: WASH }),
    cell(gbp(Math.round(FULL_DAY)), { w: 1763, bold: true, size: 23, color: GOLD, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [
    cell('Effective rate per person-hour', { w: 3600, bold: true, fill: WASH }),
    cell('Blended, whole team', { w: 1900, align: AlignmentType.RIGHT, color: MUTED, fill: WASH }),
    cell('£' + PLAT_HOUR.toFixed(2), { w: 1763, bold: true, size: 23, color: GOLD, align: AlignmentType.RIGHT, fill: WASH }),
    cell('£' + FULL_HOUR.toFixed(2), { w: 1763, bold: true, size: 23, color: GOLD, align: AlignmentType.RIGHT, fill: WASH })] })
]));
add(P([b('For context. '), T('A London development agency delivering this scope would ordinarily quote between eighty and one hundred and fifty thousand pounds, at an hourly rate between seventy-five and one hundred and twenty pounds. A central or eastern European firm would sit between forty-five and seventy thousand. Our rate reflects a hundred-person development centre in New Delhi, an engineering practice founded on Oracle enterprise implementation, and fifteen years of delivery discipline. It does not reflect any reduction in the standard of the work.')], { before: 160 }));
add(P([b('The rate is blended and covers the entire team. '), T('It includes user experience and interface design, backend and mobile engineering, quality assurance across five surfaces, project management, business analysis, infrastructure and store submission. It is not an engineer-only rate with everything else charged separately.')]));

/* ------------------------------------------------------------ 8. timeline */
add(H1('8.  Indicative timeline'));
add(P('Delivery is phased so that a working, revenue-generating platform reaches the market at the earliest sensible point, rather than everything arriving at once at the end.'));
add(table([1200, 4500, 1663, 1663], [
  new TableRow({ tableHeader: true, children: [
    hcell('Stage', 1200), hcell('Work', 4500), hcell('Duration', 1663), hcell('Cumulative', 1663)] }),
  new TableRow({ children: [cell('1', { w: 1200, bold: true }), cell('Discovery, information architecture, interface design and sign-off', { w: 4500 }), cell('3 weeks', { w: 1663 }), cell('Week 3', { w: 1663, color: MUTED })] }),
  new TableRow({ children: [cell('2', { w: 1200, bold: true }), cell('Platform foundations: data model, authentication, roles, billing', { w: 4500 }), cell('4 weeks', { w: 1663 }), cell('Week 7', { w: 1663, color: MUTED })] }),
  new TableRow({ children: [cell('3', { w: 1200, bold: true }), cell('Core build: member applications, business portal, administration console', { w: 4500 }), cell('8 weeks', { w: 1663 }), cell('Week 15', { w: 1663, color: MUTED })] }),
  new TableRow({ children: [cell('4', { w: 1200, bold: true }), cell('Modules: Network, advertising, feed, referral and revenue share', { w: 4500 }), cell('5 weeks', { w: 1663 }), cell('Week 20', { w: 1663, color: MUTED })] }),
  new TableRow({ children: [cell('5', { w: 1200, bold: true }), cell('Quality assurance, user acceptance testing, store submission and go-live', { w: 4500 }), cell('3 weeks', { w: 1663 }), cell('Week 23', { w: 1663, color: MUTED })] }),
  new TableRow({ children: [
    cell('', { w: 1200, fill: FWASH }),
    cell('Core App only, without modules', { w: 4500, bold: true, fill: FWASH }),
    cell('16 to 17 weeks', { w: 1663, bold: true, fill: FWASH }),
    cell('', { w: 1663, fill: FWASH })] }),
  new TableRow({ children: [
    cell('', { w: 1200, fill: FOREST }),
    cell('Complete platform, all six components', { w: 4500, bold: true, fill: FOREST, color: 'FFFFFF' }),
    cell('22 to 23 weeks', { w: 1663, bold: true, fill: FOREST, color: 'FFFFFF' }),
    cell('', { w: 1663, fill: FOREST })] })
]));
add(P('Stages overlap where it is safe to overlap them. Module work begins while core quality assurance is under way, which is why the complete platform costs six additional weeks rather than the eleven a strictly sequential reading would suggest.', { before: 130 }));

/* ------------------------------------------------------ 9. payment terms */
add(H1B('9.  Payment terms'));
add(P('Payments are milestone-based, in the ratio 30 : 30 : 30 : 10. The schedule below is shown against the platform total. It applies in the same proportions to whichever selection of components is agreed.'));
add(table([5000, 1400, 2626], [
  new TableRow({ tableHeader: true, children: [hcell('Milestone', 5000), hcell('Share', 1400, { align: AlignmentType.CENTER }), hcell('Amount', 2626, { align: AlignmentType.RIGHT })] }),
  new TableRow({ children: [cell('On signing, to commence work', { w: 5000 }), cell('30%', { w: 1400, align: AlignmentType.CENTER }), cell(gbp(PLATFORM * 0.3), { w: 2626, bold: true, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [cell('Design completion and sign-off', { w: 5000 }), cell('30%', { w: 1400, align: AlignmentType.CENTER }), cell(gbp(PLATFORM * 0.3), { w: 2626, bold: true, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [cell('Development completion and submission for user acceptance testing', { w: 5000 }), cell('30%', { w: 1400, align: AlignmentType.CENTER }), cell(gbp(PLATFORM * 0.3), { w: 2626, bold: true, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [cell('Go-live and publication to both app stores', { w: 5000 }), cell('10%', { w: 1400, align: AlignmentType.CENTER }), cell(gbp(PLATFORM * 0.1), { w: 2626, bold: true, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [
    cell('Total', { w: 5000, bold: true, fill: FOREST, color: 'FFFFFF' }),
    cell('100%', { w: 1400, bold: true, align: AlignmentType.CENTER, fill: FOREST, color: 'FFFFFF' }),
    cell(gbp(PLATFORM), { w: 2626, bold: true, size: 23, align: AlignmentType.RIGHT, fill: FOREST, color: 'FFFFFF' })] })
]));
add(P([T('Invoices are payable within fifteen days. Applicable taxes and bank charges are additional. If Vendor Revenue Share is commissioned alongside the platform, the same ratio applies to the combined total of '), b(gbp(COMPLETE)), T(', giving milestones of '), b(gbp(COMPLETE * 0.3)), T(', '), b(gbp(COMPLETE * 0.3)), T(', '), b(gbp(COMPLETE * 0.3)), T(' and '), b(gbp(COMPLETE * 0.1)), T('.')], { before: 120 }));

add(H2('Third-party running costs'));
add(P('These are paid by Apex directly to the providers and form no part of our fee. They are listed here so that there are no surprises after signing.'));
add(table([4400, 4626], [
  new TableRow({ tableHeader: true, children: [hcell('Item', 4400), hcell('Indicative cost', 4626)] }),
  new TableRow({ children: [cell('Cloud hosting, database and media storage', { w: 4400 }), cell(gbp(80) + ' to ' + gbp(250) + ' per month, scaling with usage', { w: 4626 })] }),
  new TableRow({ children: [cell('Stripe transaction fees', { w: 4400 }), cell('1.5% plus 20p per UK card transaction', { w: 4626 })] }),
  new TableRow({ children: [cell('Apple Developer Program', { w: 4400 }), cell('99 US dollars per year', { w: 4626 })] }),
  new TableRow({ children: [cell('Google Play Developer account', { w: 4400 }), cell('25 US dollars, one time', { w: 4626 })] }),
  new TableRow({ children: [cell('Transactional email and push notification', { w: 4400 }), cell(gbp(15) + ' to ' + gbp(60) + ' per month', { w: 4626 })] }),
  new TableRow({ children: [cell('Mapping and geocoding', { w: 4400 }), cell('Nil to ' + gbp(120) + ' per month, usage based', { w: 4626 })] })
]));

/* -------------------------------------------------- 10. the nile promise */
add(H1('10.  The Nile Promise'));
add(P([
  T('We know a build of this size evolves as the detail becomes clear. So we make you a simple promise: the refinements, adjustments and natural back-and-forth of getting Apex right, '),
  b('within the scope described in this document'),
  T(', will not cost you anything extra. The fee is the fee. If, together, we decide to add something genuinely new and beyond this scope, we will agree it in a short written addendum before any work starts. Never a surprise, and never a mid-project renegotiation. This is our written assurance to you.')
]));
add(CALLOUT('And after go-live',
  'We do not build and disappear. Our longest-standing client came to us in 2018 with an idea and no business behind it. We designed and built his platform, we support it around the clock today, and we are presently rebuilding it on current technology seven years later. That is the relationship we are proposing here.'));

/* ------------------------------------------------ 11. support & warranty */
add(H1('11.  Support and maintenance'));
add(P([b('Warranty.  '), T('For sixty days after go-live we correct any defect in the delivered scope at no charge. This covers both mobile applications and both web surfaces.')]));
add(P([b('Ongoing support.  '), T('Beyond the warranty period we offer an annual support and maintenance agreement at ' + gbp(5000) + ' per year. It covers monitoring and uptime management, security patching, operating system and store compliance updates for iOS and Android, defect resolution, minor enhancements, and a named point of contact with an agreed response time. It is optional, it is separate from this proposal, and it can begin at the end of the warranty period.')]));

/* ------------------------------------------------------- 12. we need from */
add(H1('12.  What we need from Apex'));
[
  'A single named point of contact, empowered to make decisions and give approvals.',
  'A requirements session at kickoff to confirm the category taxonomy, the criteria a business must satisfy to be verified, and the terms governing offers.',
  'Sign-off on the interface design at the end of Stage 1.',
  'Brand assets: logo files, brand guidance if any, and the legal entity details required for app store publication.',
  'Commercial decisions on membership pricing, the advertising rate card and the revenue share percentage, before the relevant module is built.',
  'Timely feedback at each stage. The delivery timeline assumes responses within three working days.'
].forEach(t => add(NUM(t)));

/* --------------------------------------------- 13. assumptions/exclusions */
add(H1('13.  Assumptions and exclusions'));
add(H2('Assumptions'));
[
  'Launch is in the United Kingdom, in English, in pounds sterling, with London as the first market.',
  'Apex holds, or will open, a UK Stripe account and both app store developer accounts in its own name.',
  'Business verification in Phase 1 is performed by the Apex team through the administration console. The workflow is built. The human review is yours.',
  'Offer redemption in Phase 1 is completed in person by the business against the member code, using the verification screen provided.',
  'Listing content, imagery and offer copy are supplied by the businesses themselves or by Apex.'
].forEach(t => add(BUL(t)));

add(H2('Explicitly excluded'));
add(P('The following are not included in this proposal. Each can be scoped and priced separately if you would like it, and we would rather name them here than have them surface later.'));
[
  'Member reviews and ratings. The demonstration displays star ratings for realism only. Building member-written reviews with moderation, or integrating ratings from an external source such as Google, is separate work.',
  'Bulk business onboarding. Importing businesses at volume, invitation campaigns and a claim-your-listing mechanic are not included. We recommend discussing this before launch, because manual application alone will not populate a directory of thousands.',
  'Hyperlocal delivery. Ordering and delivery from listed businesses is a Phase 2 proposition and a substantial build in its own right. We would be glad to scope it once Apex has traction.',
  'Brand identity design, marketing, content production, photography, copywriting and search engine optimisation.',
  'Legal instruments: terms of service, privacy policy, business agreements and data protection registration. We will build to whatever you and your solicitor settle on.'
].forEach(t => add(BUL(t)));

/* --------------------------------------------------------- 14. why nile */
add(H1B('14.  Why Nile Technologies'));
add(P('Nile Technologies was founded in 2011 by Atul Kapoor, formerly a Senior Director at Oracle India. For our first five years we did nothing but Oracle enterprise implementation for multinational clients: writing middle layers, integrating systems and building front ends over industrial-scale software. That is an unusual foundation for a company that also builds consumer applications, and it is the reason we think about data architecture and workflow before we think about screens.'));
add(P('Today we are a team of approximately one hundred people at our development centre in New Delhi, working across three practices. Oracle enterprise services for clients including Airtel, Genpact and MakeMyTrip. Web and mobile application development for small and medium businesses in the United Kingdom and the United States. And artificial intelligence, applied both within our own delivery process, which is part of why our costs are what they are, and built for clients as agents, chatbots and decision systems.'));

add(H2('A comparable engagement'));
add(P('In 2018 John O’Brien, a founding member of the eBay team with more than forty years in international distribution and air freight, came to us with an idea for managing reverse logistics for large brands. There was no business, no system and no platform. We designed and developed the entire ShipCycle platform from nothing over two years. It launched, it survived a pandemic, and it now processes in excess of one hundred thousand returned packages every month.'));
add(P('We still run it. We provide round-the-clock support seven days a week, and we are currently rebuilding the platform on current technologies, seven years into the relationship. We mention it because it is the pattern we would expect with Apex: build it properly, support it while it grows, and still be there when it needs to evolve.'));
add(CALLOUT('What that means for Apex',
  'You are not commissioning a mockup from a studio that will hand over a repository and move on. You are engaging a company that has taken a founder from an idea to a hundred thousand transactions a month, and stayed for seven years.'));

/* ------------------------------------------------------------ 15. terms */
add(H1B('15.  Terms and conditions'));
const tc = (n, title, body) => add(new Paragraph({
  spacing: { before: 130, after: 40 },
  children: [b(n + '.  ' + title + '.  ', { color: FOREST }), T(body)]
}));
tc(1, 'Scope and changes', 'Nile Technologies will deliver the scope of work set out in this document. Work beyond that scope will be agreed in writing, covering scope, cost and timeline, before it begins.');
tc(2, 'Fees, payment and taxes', 'Fees are as set out in the Investment and Payment Terms sections, in pounds sterling, and are payable within fifteen days of each milestone invoice. Applicable taxes, bank charges and third-party running costs are additional and are borne by Apex.');
tc(3, 'Timeline and dependencies', 'Timelines are good-faith estimates and assume timely feedback, approvals, access and materials from Apex. Delays in these will move delivery dates accordingly.');
tc(4, 'Client responsibilities', 'Apex will provide a single point of contact empowered to make decisions, timely feedback and approvals at each stage, and the access and materials reasonably required for the work.');
tc(5, 'Intellectual property', 'On receipt of full payment, all rights in the delivered Apex platform, including its source code, its design and its data, belong to Apex absolutely. Nile retains its own pre-existing tools, libraries, frameworks and general know-how, which contain nothing specific to Apex.');
tc(6, 'Confidentiality', 'Each party will keep the other’s confidential information in confidence and use it solely for this engagement. Nile will enter into a mutual non-disclosure agreement on request, and will do so before any further disclosure if Apex prefers.');
tc(7, 'Warranty and support', 'Nile will perform the work in a professional and workmanlike manner. For sixty days after go-live, Nile will correct at no charge any defect in the delivered scope that Apex reports. Ongoing support and maintenance is available under the separate agreement described in Section 11.');
tc(8, 'App store approval', 'Nile will prepare and submit both applications and will address at no charge any rejection arising from our build. Final approval rests with Apple and Google and cannot be guaranteed by either party.');
tc(9, 'Data protection', 'The platform will be built to support compliance with the UK General Data Protection Regulation, including consent capture, data export and deletion. Apex is the data controller and is responsible for its own registration and published policies.');
tc(10, 'Liability', 'Neither party is liable for indirect or consequential losses. Each party’s total liability under this engagement is limited to the fees paid under it. Both parties will act in good faith to put matters right.');
tc(11, 'Independent contractor', 'Nile acts as an independent contractor. Nothing in this document creates a partnership, employment or agency relationship, and Nile takes no equity or revenue interest in Apex.');
tc(12, 'Termination', 'Either party may end the engagement on fifteen days’ written notice. On termination Apex pays for work completed to that date and receives the work produced, and each party returns or destroys the other’s confidential materials.');
tc(13, 'General', 'This document is the entire agreement between the parties on this project and supersedes prior discussions. Any change must be in writing and signed by both. It is governed by the laws of England and Wales. It may be signed in counterparts, including electronically. The parties will first seek to resolve any dispute amicably.');

/* -------------------------------------------------------- 16. next steps */
add(H1('16.  Next steps'));
add(P('To proceed, sign below and return a copy. On receipt we will confirm firm dates, book the kickoff and requirements session, and begin Stage 1 immediately.'));
add(P([b('A closing thought. '), T('You are funding this yourself, and we think that is the right decision. It is the one we would make. Building first and raising afterwards means you arrive at any future conversation holding a live product, real users and real data, rather than an idea and a slide deck. What you commission here is the leverage for every conversation that follows.')]));

/* ------------------------------------------------------- 17. acceptance */
add(H1('17.  Acceptance'));
add(P('Agreed and accepted on the terms set out in this Proposal and Scope of Work:'));
const noB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const sig = (party, name) => new TableCell({
  borders: { top: { style: BorderStyle.SINGLE, size: 2, color: LINE }, bottom: noB, left: noB, right: noB },
  width: { size: 4513, type: WidthType.DXA },
  margins: { top: 180, bottom: 80, left: 0, right: 200 },
  children: [
    new Paragraph({ spacing: { after: 160 }, children: [b(party, { color: FOREST })] }),
    new Paragraph({ spacing: { after: 160 }, children: [T('Signature:  ', { color: MUTED, size: 20 }), T('____________________________')] }),
    new Paragraph({ spacing: { after: 150 }, children: [T('Name:  ', { color: MUTED, size: 20 }), b(name)] }),
    new Paragraph({ spacing: { after: 150 }, children: [T('Title:  ', { color: MUTED, size: 20 }), T('____________________________')] }),
    new Paragraph({ children: [T('Date:  ', { color: MUTED, size: 20 }), T('______________')] })
  ]
});
add(new Table({
  columnWidths: [4513, 4513], width: { size: W, type: WidthType.DXA },
  borders: { top: noB, bottom: noB, left: noB, right: noB, insideHorizontal: noB, insideVertical: noB },
  rows: [new TableRow({ children: [sig('For Apex', 'Sajjad Kassamali'), sig('For Nile Technologies', 'Aaditya Kapoor')] })]
}));

/* ------------------------------------------------------------- document */
const doc = new Document({
  creator: 'Nile Technologies',
  title: 'Apex - Proposal and Scope of Work',
  description: 'Members-only business directory platform',
  numbering: {
    config: [
      { reference: 'bul', levels: [{ level: 0, format: 'bullet', text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 400, hanging: 220 } } } }] },
      { reference: 'num', levels: [{ level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 400, hanging: 240 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    children: K
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('Apex-Proposal-and-Scope-of-Work.docx', buf);
  console.log('written  ' + (buf.length / 1024).toFixed(0) + ' KB');
});
