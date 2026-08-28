const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle
} = require('docx');

/* ------------------------------------------------------------- palette */
const W     = 9026;
const PLUM  = '2A0F3D';
const GOLD  = 'A87C16';
const INK   = '1C0A28';
const MUTED = '6B5A72';
const LINE  = 'E4D8C6';
const WASH  = 'F9EFD4';
const PWASH = 'F3ECF8';

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
  children: [T(t, { bold: true, size: 29, color: PLUM })]
});
const H1B = t => new Paragraph({
  heading: HeadingLevel.HEADING_1, pageBreakBefore: true, spacing: { after: 150 },
  children: [T(t, { bold: true, size: 29, color: PLUM })]
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
const hcell = (t, w, o = {}) => cell(t, { w, bold: true, fill: PLUM, color: 'FFFFFF', size: 19, ...o });

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

const usd = n => '$' + n.toLocaleString('en-US');

/* --------------------------------------------------------------- money */
const TOTAL    = 300000;
const DEPOSIT  = 60000;
const INSTAL   = 30000;
const COUNT    = 8;

const MILESTONES = [
  ['Deposit',
   'Engagement confirmed. Discovery and requirements workshops, information architecture, the Kavanah design system, and full user-experience design for both websites and the mobile application.',
   DEPOSIT],
  ['Milestone 1',
   'kavanahglobal.com foundation — brand front end, product catalogue and categories, product pages, search and filtering, content management for products and pages.',
   INSTAL],
  ['Milestone 2',
   'kavanahglobal.com commerce — cart, checkout, payment gateway, tax and shipping, order management, customer accounts, gift cards, and the impact ledger that reports what each order funded.',
   INSTAL],
  ['Milestone 3',
   'kavanahglobal.org foundation — the non-profit front end, programme catalogue and programme pages, free preview access, enrolment and programme payments, member accounts and the shared identity across both domains.',
   INSTAL],
  ['Milestone 4',
   'Learning delivery — video hosting and the session player, module and lesson structure, progress tracking, notes, transcripts, downloadable worksheets, and the member library.',
   INSTAL],
  ['Milestone 5',
   'Live sessions and membership — session scheduling, reservations and waitlists, video conferencing integration, calendar invitations and reminders, recording library, and recurring subscription membership with tiers and billing.',
   INSTAL],
  ['Milestone 6',
   'The Mood Journal — morning and night check-ins, mood and emotion capture, sleep, energy and craving tracking, streaks, the twelve-week calendar, the insights engine, and private-by-default data handling with export and deletion.',
   INSTAL],
  ['Milestone 7',
   'Community and the work — circles, threads and replies, pseudonymous handles, moderation tools and reporting, shelter services with bed requests and availability, the Sanctuary register of interest, and the donations engine with receipts.',
   INSTAL],
  ['Milestone 8',
   'Mobile application — the unified iOS and Android app across all modules, administration console handover, full-platform testing and user acceptance, app store submission, deployment, data migration and handover.',
   INSTAL]
];

const K = [];
const add = (...x) => K.push(...x);

/* ----------------------------------------------------------------- cover */
add(
  new Paragraph({ spacing: { after: 0 }, children: [T('PROPOSAL & SCOPE OF WORK', { bold: true, size: 20, color: GOLD, spacing: 70 })] }),
  new Paragraph({ spacing: { before: 220, after: 60 }, children: [T('Kavanah Global', { bold: true, size: 60, color: PLUM })] }),
  new Paragraph({ spacing: { after: 80 }, children: [T('A commerce platform that funds a wellness platform', { size: 27, color: INK })] }),
  new Paragraph({ spacing: { after: 380 }, children: [T('kavanahglobal.com, kavanahglobal.org and one unified mobile application', { size: 21, color: MUTED })] }),
  RULE,
  table([2600, 6426], [
    new TableRow({ children: [cell('Prepared for', { w: 2600, bold: true, color: MUTED }), cell('Ms Daisy Pearl, Founder', { w: 6426 })] }),
    new TableRow({ children: [cell('Organisations', { w: 2600, bold: true, color: MUTED }), cell('Kavanah Global (commercial) and Kavanah Global (non-profit)', { w: 6426 })] }),
    new TableRow({ children: [cell('Location', { w: 2600, bold: true, color: MUTED }), cell('New York — Queens, Great Neck and Manhattan', { w: 6426 })] }),
    new TableRow({ children: [cell('Prepared by', { w: 2600, bold: true, color: MUTED }), cell('Nile Technologies', { w: 6426 })] }),
    new TableRow({ children: [cell('Date', { w: 2600, bold: true, color: MUTED }), cell('26 August 2026', { w: 6426 })] }),
    new TableRow({ children: [cell('Reference', { w: 2600, bold: true, color: MUTED }), cell('KG-2026-01', { w: 6426 })] }),
    new TableRow({ children: [
      cell('Phase 1 investment', { w: 2600, bold: true, color: MUTED, fill: WASH }),
      cell(usd(TOTAL) + ' USD', { w: 6426, bold: true, size: 26, color: GOLD, fill: WASH })] })
  ]),
  new Paragraph({ spacing: { before: 420 }, children: [T('Commercial in confidence. This document accompanies a working demonstration of all three products, built for the evaluation of this project.', { size: 18, color: MUTED, italics: true })] })
);

/* ------------------------------------------------------- 1. client brief */
add(H1B('1.  Client brief'));
add(P('Kavanah Global is a wellness company founded in New York by Daisy Pearl. It infuses psychology, meditation, yoga and nutrition, and it works with people managing addiction, stress and the ordinary difficulty of running a life. It is, in the founder’s words, a company that brings light, and light means awareness, and awareness means education.'));
add(P('The organisation operates under one brand across two legal entities, and this structure is the centre of the entire project:'));
add(BUL([b('kavanahglobal.com '), T('is the commercial company. It sells merchandise — candles, home and energy sets, yoga clothing, apparel, accessories and books.')]));
add(BUL([b('kavanahglobal.org '), T('is the non-profit. It runs overnight shelter for families with nowhere to sleep, delivers paid wellness classes and training, and is developing the Kavanah Global Sanctuary, a residential property in which people can stay while they rebuild.')]));
add(P('The two are not separate businesses that happen to share a name. The commercial company exists to fund the non-profit. That relationship is the brief. Every product sold must visibly pay for a bed, a breakfast or a seat in a programme, and the non-profit must say plainly where its money comes from.'));

add(H2('What was asked for'));
add(P('In our meeting of 25 August 2026 the requirement was set out as follows. The .com is to be a full commercial platform for selling merchandise, carrying the story of the non-profit and directing people to it. The .org is to be the complex one — a web application where people can understand what is offered, view free content, book and pay for classes and trainings, schedule sessions, and consume pre-recorded material.'));
add(P('Beyond that original brief, and following the demonstration we built, the scope has been extended at your direction to include a community forum where members can engage and support one another, a Mood Journal for daily reflection and self-management, a recurring membership, a donations engine, shelter and Sanctuary services, and — rather than the two applications the structure would ordinarily imply — a single unified mobile application carrying all of it.'));

add(CALLOUT('The brief in one line',
  'Build a commerce platform, a wellness platform and one mobile application, so that every dollar spent on the first is visibly converted into shelter, food and education by the second.'));

/* -------------------------------------------------------- 2. the concept */
add(H1B('2.  Concept note'));
add(P('This section describes what is being built and what it does. It is written to be read by anybody, technical or not.'));

add(H2('2.1  kavanahglobal.com — the shop'));
add(P('A complete online store carrying the full Kavanah Global merchandise range, organised into categories, with product pages, size and variant selection, search and filtering, a cart, a secure checkout and customer accounts. It behaves like any well-built modern store, with one difference that runs through every screen.'));
add(P('Every product states what it funds. A candle funds a night of shelter. A book funds two class seats. The cart totals it before payment, the confirmation page repeats it, and the customer’s account keeps a running ledger of everything their orders have paid for. The site also carries a published impact report — real unit costs, monthly figures and an allocation breakdown — because that transparency is the most persuasive marketing asset the organisation has.'));

add(H2('2.2  kavanahglobal.org — the wellness platform'));
add(P('This is the substantial build. It is a full web application, not a brochure, and it contains six things.'));
add(BUL([b('Programmes. '), T('Structured wellness courses — addiction recovery, stress and anxiety, nutrition, life and time management, meditation and breath, movement, grief, and spiritual foundations. Each has a curriculum of pre-recorded sessions, free preview lessons that anybody can watch without paying, a price, and an enrolment and payment flow.')]));
add(BUL([b('The session player. '), T('Where the pre-recorded content is actually consumed. Video with progress tracking, module navigation, timestamped personal notes, transcripts, downloadable worksheets and a discussion thread attached to each session.')]));
add(BUL([b('Live sessions. '), T('A published schedule of live classes, circles and sessions delivered over video. Members reserve a place, receive a calendar invitation and reminders, join from the platform, and watch the recording afterwards where the session is one that is recorded.')]));
add(BUL([b('The Mood Journal. '), T('A daily practice tool. Two short check-ins, one in the morning and one at night, capturing mood, what the person is feeling, and their sleep, energy and craving levels, alongside free writing against a prompt. It keeps a streak, shows a twelve-week calendar, and — the part that gives it real value — surfaces patterns back to the member: that their mood tracks their sleep, that a particular hour of the day is consistently their hardest. Entries are private by default.')]));
add(BUL([b('The community. '), T('Circles where members discuss, ask and support one another. Some are open, some are private to a programme. Members post under a chosen handle rather than a real name, which is deliberate and necessary: people do not write honestly about craving, relapse or grief under a name their employer can search. Moderation tools, reporting and guidelines are included.')]));
add(BUL([b('The work itself. '), T('Shelter services with locations, availability and a request-a-bed flow. The Kavanah Global Sanctuary with its plans and a register of interest. A donations engine with one-off and recurring giving, designated funds and automatic receipts. And a recurring membership that bundles everything for a monthly fee.')]));

add(H2('2.3  The mobile application'));
add(P('One application, on iOS and Android, carrying both organisations. Five sections: Today, Practice, Journal, Circles and Shop.'));
add(P('The decision to build one application rather than two is deliberate and worth stating clearly. Split into two downloads and you get two half-used applications, and the connection between them — which is the entire point of Kavanah Global — disappears. Kept together, a member who buys a candle in the Shop section sees the night of shelter it funded on their Today screen, and a member enrolled in a programme sees the shop that paid for their seat. The loop only closes if it is one application.'));
add(P('The application also puts the two things that drive daily habit into a pocket, where daily habit actually happens: the Mood Journal, which takes ninety seconds twice a day, and the community, which is needed most at eleven o’clock at night. It carries the shelter line as well — beds free tonight, one tap to call, one tap to hold a bed.'));

add(CALLOUT('What the platform is, in one line',
  'A shop, a wellness school, a daily journal, a support community and a shelter service — built as one system, on one member account, so that the money and the meaning move between them.'));

/* --------------------------------------------------------- 3. scope */
add(H1B('3.  Scope of work'));
add(P('The following is the complete scope for Phase 1. It is organised by product.'));

add(H2('3.1  Design and foundation'));
[
 'Discovery and requirements workshops, and a documented functional specification.',
 'Information architecture and user-journey design across all three products.',
 'The Kavanah Global design system — colour, typography, iconography and a full component library, developed from the existing crest and brand.',
 'Complete user-interface design for every screen of both websites and the mobile application.',
 'Cloud infrastructure, environments, domains, certificates, backups and deployment pipelines.',
 'One shared platform back end and one member identity across both domains and the mobile application.'
].forEach(t => add(BUL(t)));

add(H2('3.2  kavanahglobal.com — commerce'));
[
 'Brand front end with full content management, so pages and copy can be edited without a developer.',
 'Product catalogue with categories, collections, variants, stock, pricing and promotions.',
 'Product pages with image galleries, options, reviews and related products.',
 'Search, filtering and sorting.',
 'Cart, secure checkout, payment gateway integration, tax and shipping rules.',
 'Order management, order tracking, returns and customer notifications.',
 'Customer accounts with order history, saved items and addresses.',
 'Gift cards and gift purchasing.',
 'The impact ledger — per-product funding attribution, per-order confirmation and the published impact report.',
 'Cross-domain narrative and routing between the commercial site and the non-profit.'
].forEach(t => add(BUL(t)));

add(H2('3.3  kavanahglobal.org — the wellness platform'));
[
 'Non-profit front end with full content management.',
 'Programme catalogue, programme pages, curricula, instructor profiles and pricing.',
 'Free preview access without payment or card details.',
 'Enrolment and payment for individual programmes, and sponsored-seat requests.',
 'Video hosting, encoding and secure delivery.',
 'The session player — progress tracking, module navigation, notes, transcripts, worksheets and per-session discussion.',
 'Member dashboard with programmes in progress, upcoming sessions and daily practice.',
 'Live session scheduling, reservations, waitlists, video conferencing integration, calendar invitations, reminders and the recordings library.',
 'The Mood Journal — morning and night check-ins, mood and emotion capture, sleep, energy and craving tracking, prompts, streaks, the twelve-week calendar, the insights engine, and export and deletion controls.',
 'The community — circles, threads, replies, reactions, pseudonymous handles, notifications, search, moderation tools, reporting and guidelines.',
 'Recurring membership with tiers, trials, upgrades, downgrades, cancellation and subscription billing.',
 'Shelter services — locations, live bed availability, request-a-bed flow and staff notification.',
 'The Kavanah Global Sanctuary — presentation, phased plans and register of interest.',
 'Donations — one-off and recurring giving, designated funds, fee coverage, automatic receipts and annual summaries.',
 'Compliance-safe presentation throughout, including care statements on every programme and crisis information site-wide.'
].forEach(t => add(BUL(t)));

add(H2('3.4  Mobile application — iOS and Android'));
[
 'One native-quality application covering both organisations, published to the Apple App Store and Google Play.',
 'Today, Practice, Journal, Circles and Shop, on a single member account shared with the websites.',
 'Programme browsing, enrolment, the session player and offline download.',
 'Live session reservations, reminders and joining.',
 'The full Mood Journal with check-ins, streaks and insights.',
 'The community with posting, replying and notifications.',
 'The shop with product browsing, cart and in-app payment.',
 'Personal impact ledger and membership management.',
 'The shelter line — availability, one-tap call and bed requests.',
 'Push notifications, biometric sign-in and analytics.'
].forEach(t => add(BUL(t)));

add(H2('3.5  Administration'));
[
 'A single administration console covering both organisations.',
 'Products, stock, pricing, orders and customers.',
 'Programmes, modules, sessions, video uploads and publishing.',
 'Live session scheduling and attendance.',
 'Members, subscriptions and sponsored seats.',
 'Community moderation queue and reports.',
 'Shelter requests, bed availability and location management.',
 'Donations, receipts and fund allocation.',
 'Impact metrics and reporting across both entities.'
].forEach(t => add(BUL(t)));

add(H2('3.6  Delivery'));
[
 'Full quality assurance, cross-browser and cross-device testing.',
 'Accessibility and performance work.',
 'User acceptance testing with your team, and a training session for the administration console.',
 'Deployment, launch support and documentation.',
 'Complete handover of source code, infrastructure and accounts.'
].forEach(t => add(BUL(t)));

add(H2('3.7  Not included in Phase 1'));
add(P('Stated so the boundary is clear, and so that anything added later is priced honestly rather than absorbed silently.'));
[
 'Brand identity redesign, marketing, advertising, search engine optimisation and social media management.',
 'Content production — filming, editing, photography, copywriting and course material. We build the system that carries the content; the content is yours.',
 'Ongoing third-party running costs — hosting, video streaming, payment processing fees, email and conferencing subscriptions.',
 'Legal instruments — terms of service, privacy policy, non-profit registration and any regulatory filings.',
 'Support and maintenance after launch, which is offered separately.'
].forEach(t => add(BUL(t)));

/* ------------------------------------------------------- 4. commercials */
add(H1B('4.  Commercials'));

add(P([b('Total Phase 1 value: '), T(usd(TOTAL) + ' USD.', { bold: true, size: 24, color: GOLD })]));

add(P('Payment is structured as a deposit on engagement, followed by eight equal instalments released against development milestones. Nothing is paid in advance of work; each instalment falls due as its milestone is delivered.'));

add(table([1500, 5626, 1900], [
  new TableRow({ children: [
    hcell('Stage', 1500), hcell('Delivered', 5626), hcell('Amount', 1900, { align: AlignmentType.RIGHT })
  ]}),
  ...MILESTONES.map((m, i) => new TableRow({ children: [
    cell(m[0], { w: 1500, bold: true, color: PLUM, fill: i === 0 ? WASH : undefined }),
    cell(m[1], { w: 5626, size: 19, fill: i === 0 ? WASH : undefined }),
    cell(usd(m[2]), { w: 1900, bold: true, align: AlignmentType.RIGHT, fill: i === 0 ? WASH : undefined })
  ]})),
  new TableRow({ children: [
    cell('Total', { w: 1500, bold: true, fill: PLUM, color: 'FFFFFF' }),
    cell('Deposit plus ' + COUNT + ' instalments of ' + usd(INSTAL), { w: 5626, bold: true, fill: PLUM, color: 'FFFFFF', size: 19 }),
    cell(usd(TOTAL), { w: 1900, bold: true, size: 24, fill: PLUM, color: 'FFFFFF', align: AlignmentType.RIGHT })
  ]})
]));

add(H2('4.1  Payment terms'));
add(BUL([b('Deposit: '), T(usd(DEPOSIT) + ' on engagement.')]));
add(BUL([b('Instalments: '), T(COUNT + ' payments of ' + usd(INSTAL) + ', each released on delivery of its milestone.')]));
add(BUL([b('Total: '), T(usd(TOTAL) + ' USD.')]));
add(BUL('All amounts are in United States dollars. Bank charges and third-party running costs are additional.'));

add(H2('4.2  A note on the total'));
add(CALLOUT('Please read this line carefully',
  'The total commercial value stated above is an approximation for the delivery of Phase 1. It may extend by a few further payments depending on the final deliverables agreed, the addition of features, or an expansion of scope — in each case against an additional effort estimation that will be shared with you and approved by you before the work begins.'));
add(P('We would rather say this plainly at the start than discover it halfway through. A platform of this size, spanning two organisations, three products and a mobile application, is scoped as accurately as anybody can scope it before the first line of code is written — and then it meets reality. Where that happens, you will be told what the change is, what it costs and what it does to the timeline, and you will decide.'));

add(H2('4.3  Ownership'));
add(CALLOUT('Ownership is transferred in full',
  'On completion of payment, ownership of everything built under this proposal transfers to Kavanah Global in full and without reservation. That includes the complete source code for both websites, the mobile application and the administration console; all designs and design files; the database and all data within it; and all hosting, domain, app store and third-party service accounts. Nothing is withheld, nothing is licensed back to you, and there is no lock-in of any kind. The platform is yours absolutely.'));

/* ------------------------------------------------------- 5. next steps */
add(H1('5.  Next steps'));
add(P('The working demonstration accompanying this proposal is live and can be explored in full — both websites, every screen of the mobile application, and the design system behind them. It was built so that you can see the platform before you commission it, rather than after.'));
add(P('To begin, confirm this proposal and remit the deposit. We will then schedule the discovery workshop, confirm firm dates against each milestone, and start immediately.'));

/* ------------------------------------------------------------- document */
const doc = new Document({
  creator: 'Nile Technologies',
  title: 'Kavanah Global - Proposal and Scope of Work',
  description: 'Commerce platform, wellness platform and unified mobile application',
  numbering: {
    config: [
      { reference: 'bul', levels: [{ level: 0, format: 'bullet', text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 400, hanging: 220 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    children: K
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('Kavanah-Global-Proposal-and-Scope-of-Work.docx', buf);
  console.log('written  ' + (buf.length / 1024).toFixed(0) + ' KB');
  const total = MILESTONES.reduce((a, m) => a + m[2], 0);
  console.log('milestones: ' + MILESTONES.length + '  (deposit + ' + (MILESTONES.length - 1) + ' instalments)');
  console.log('sum check : ' + usd(total) + (total === TOTAL ? '  OK' : '  MISMATCH'));
});
