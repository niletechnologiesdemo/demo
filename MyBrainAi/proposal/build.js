const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, ImageRun
} = require('docx');

/* ------------------------------------------------------------- palette */
const W       = 9026;
const FOREST  = '2F6B4F';   // MyBrainAI green
const DEEP    = '1F4A37';
const HONEY   = 'B8892E';
const INK     = '1B241F';
const MUTED   = '5C665F';
const LINE    = 'DCE3DD';
const WASH    = 'FBF3E1';
const FWASH   = 'E6F0EA';

function clean(v) {
  const s = String(v == null ? '' : v); let out = '';
  for (const ch of s) { const c = ch.codePointAt(0); if (c < 32 && ch !== '\n' && ch !== '\t') continue; out += (c === 160) ? ' ' : ch; }
  return out;
}
const T = (t, o = {}) => new TextRun({ text: clean(t), bold: o.bold, italics: o.italics, size: o.size ?? 21, color: o.color ?? INK, font: 'Calibri', characterSpacing: o.spacing });
const b = (t, o = {}) => T(t, { ...o, bold: true });
const P = (kids, o = {}) => new Paragraph({ alignment: o.align, spacing: { before: o.before ?? 0, after: o.after ?? 130 }, children: Array.isArray(kids) ? kids : [T(kids, o)] });
const H1  = t => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 340, after: 150 }, children: [T(t, { bold: true, size: 29, color: FOREST })] });
const H1B = t => new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, spacing: { after: 150 }, children: [T(t, { bold: true, size: 29, color: FOREST })] });
const H2  = t => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 90 }, children: [T(t, { bold: true, size: 23, color: INK })] });
const EYE = t => new Paragraph({ spacing: { before: 200, after: 60 }, children: [T(t, { bold: true, size: 17, color: HONEY, spacing: 60 })] });
const BUL = t => new Paragraph({ numbering: { reference: 'bul', level: 0 }, spacing: { after: 55 }, children: Array.isArray(t) ? t : [T(t)] });
const NUM = t => new Paragraph({ numbering: { reference: 'num', level: 0 }, spacing: { after: 70 }, children: Array.isArray(t) ? t : [T(t)] });

const cell = (t, o = {}) => new TableCell({
  width: { size: o.w, type: WidthType.DXA },
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: 'auto' } : undefined,
  margins: { top: 95, bottom: 95, left: 130, right: 130 },
  children: (Array.isArray(t) ? t : [t]).map(x => typeof x === 'string'
    ? new Paragraph({ alignment: o.align, spacing: { after: 0 }, children: [T(x, { bold: o.bold, size: o.size ?? 20, color: o.color ?? INK })] }) : x)
});
const hcell = (t, w, o = {}) => cell(t, { w, bold: true, fill: FOREST, color: 'FFFFFF', size: 19, ...o });
const bd = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const table = (widths, rows) => new Table({
  columnWidths: widths, width: { size: widths.reduce((a, c) => a + c, 0), type: WidthType.DXA },
  borders: { top: bd, bottom: bd, left: bd, right: bd, insideHorizontal: bd, insideVertical: bd }, rows
});
const RULE = new Paragraph({ spacing: { before: 60, after: 170 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: HONEY } }, children: [T('')] });
const CALLOUT = (title, body) => new Table({
  columnWidths: [W], width: { size: W, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.SINGLE, size: 4, color: HONEY }, bottom: { style: BorderStyle.SINGLE, size: 4, color: HONEY },
    left: { style: BorderStyle.SINGLE, size: 18, color: HONEY }, right: { style: BorderStyle.SINGLE, size: 4, color: HONEY },
    insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' } },
  rows: [new TableRow({ children: [new TableCell({
    width: { size: W, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: WASH, color: 'auto' },
    margins: { top: 150, bottom: 150, left: 180, right: 180 },
    children: [ new Paragraph({ spacing: { after: 70 }, children: [T(title, { bold: true, size: 21, color: HONEY })] }),
      ...(Array.isArray(body) ? body : [body]).map(x => typeof x === 'string' ? new Paragraph({ spacing: { after: 0 }, children: [T(x)] }) : x) ]
  })] })]
});
const usd = n => '$' + n.toLocaleString('en-US');

/* --------------------------------------------------------------- pricing */
const PRICE = 26000;
const EFFORT = [
  ['Foundation: accounts, onboarding, the personal brain, palettes and dark mode, backend', 3],
  ['Mood Journal', 2.5],
  ['Fuel', 2.5],
  ['Communication Hub, including YouTube integration and the learning loop', 5],
  ['Sage, the AI coach', 3],
  ['Subscriptions, notifications, settings, export and delete', 1.5],
  ['Quality assurance, store submission, Google verification and YouTube compliance', 2]
];
const WEEKS = EFFORT.reduce((a, c) => a + c[1], 0);

const K = []; const add = (...x) => K.push(...x);

/* ----------------------------------------------------------------- cover */
const logo = fs.readFileSync(__dirname + '/../assets/img/logo-green.png');
add(
  new Paragraph({ spacing: { after: 260 }, children: [new ImageRun({ data: logo, transformation: { width: 236, height: 75 }, type: 'png' })] }),
  new Paragraph({ spacing: { after: 0 }, children: [T('PROPOSAL & SCOPE OF WORK', { bold: true, size: 20, color: HONEY, spacing: 70 })] }),
  new Paragraph({ spacing: { before: 220, after: 60 }, children: [T('MyBrainAI', { bold: true, size: 62, color: FOREST })] }),
  new Paragraph({ spacing: { after: 80 }, children: [T('A personal AI coach that learns from your own life', { size: 27, color: INK })] }),
  new Paragraph({ spacing: { after: 380 }, children: [T('Phase 1: Mood Journal, Fuel, Communication Hub and Sage, on iOS and Android', { size: 21, color: MUTED })] }),
  RULE,
  table([2500, 6526], [
    new TableRow({ children: [cell('Prepared for', { w: 2500, bold: true, color: MUTED }), cell('Mr Kevin Wilson', { w: 6526 })] }),
    new TableRow({ children: [cell('Project', { w: 2500, bold: true, color: MUTED }), cell('MyBrainAI, Phase 1', { w: 6526 })] }),
    new TableRow({ children: [cell('Launch market', { w: 2500, bold: true, color: MUTED }), cell('United States, English, Apple App Store and Google Play', { w: 6526 })] }),
    new TableRow({ children: [cell('Prepared by', { w: 2500, bold: true, color: MUTED }), cell('Nile Technologies', { w: 6526 })] }),
    new TableRow({ children: [cell('Date', { w: 2500, bold: true, color: MUTED }), cell('3 September 2026', { w: 6526 })] }),
    new TableRow({ children: [cell('Proposal reference', { w: 2500, bold: true, color: MUTED }), cell('MBA-2026-01', { w: 6526 })] }),
    new TableRow({ children: [cell('Valid until', { w: 2500, bold: true, color: MUTED }), cell('3 October 2026', { w: 6526 })] }),
    new TableRow({ children: [ cell('Phase 1 investment', { w: 2500, bold: true, color: MUTED, fill: WASH }), cell(usd(PRICE) + '  fixed', { w: 6526, bold: true, size: 26, color: HONEY, fill: WASH })] })
  ]),
  new Paragraph({ spacing: { before: 420 }, children: [T('Commercial in confidence. This document and the accompanying working design sample are provided solely for the evaluation of the MyBrainAI project, under the non-disclosure agreement already in place between the parties.', { size: 18, color: MUTED, italics: true })] })
);

/* ---------------------------------------------------------- 1. concept */
add(H1B('1.  Concept note'));
add(P('Everybody carries a phone full of apps that each know one thing about them. A nutrition app knows what they ate. A journal knows how they felt. A social platform knows what people are saying to them. None of them talk to each other, and so none of them can answer the question that actually matters on a bad day: why do I feel like this?'));
add(P('Ask a general chatbot and it will offer a walk and a glass of water, because it has no data about you. It is guessing. MyBrainAI is built on the opposite principle. It only answers from what you have logged, it says so when it does not know, and it gets more precise the longer you use it. Accuracy over speed. Facts over platitudes.'));
add(CALLOUT('What MyBrainAI is, in one line',
  'One private brain per person that learns how you feel, what you eat and how you talk, and gives you answers backed by your own data.'));

add(H2('The personal brain'));
add(P('When a user installs the app, a brain is created for them and stored under their own account, encrypted, never pooled with anyone else and exportable or deletable at any time. Everything the user does in the app feeds that brain, in three ways.'));
add(BUL([b('What they tell it at the start.  '), T('A name, the areas of life they want to take control of, how they talk (three tone sliders and a sample reply), phrases they never use, and the foods they love and avoid.')]));
add(BUL([b('What they log.  '), T('Every mood check-in and every meal photograph becomes a data point the coach can reason over.')]));
add(BUL([b('What they approve or edit.  '), T('Every reply the brain drafts is either posted unchanged, which confirms the voice, or edited, which corrects it. Both are saved. The brain distils those edits into plain-English rules the user can read and remove.')]));
add(P('This is the same feedback loop you built by hand with a spreadsheet, made invisible and made available to anybody who downloads the app.', { before: 120 }));

add(H2('The three modules, and the coach on top'));
add(P([b('Mood Journal.  '), T('The simplest feature in the app, deliberately. Six drawn faces on the home screen. Tap one, optionally say or type why, tag the trigger, done. A calendar shows the month at a glance, and tapping any day shows what was logged. Over thirty days it becomes something almost nobody has: a record of what actually happened, and when.')]));
add(P([b('Fuel.  '), T('Photograph a meal. The app identifies what is on the plate, returns calories and macronutrients, checks it against the foods the user avoids, and logs it. Daily targets and a coffee count sit at the top.')]));
add(P([b('Communication Hub.  '), T('YouTube connects with one tap and every comment across every video arrives in an inbox, drafted in the user’s voice. Every other platform works by paste: copy comments, direct messages or an email thread from anywhere, paste it in, and get replies in your voice to copy back. A nudge box lets the user tell the brain what to change. An accuracy meter shows how often the brain gets it right, and the automation gates you specified are built in: everything needs a tap at first, simple replies go out on their own at ninety percent, and sensitive messages always come back to the user.')]));
add(P([b('Sage, the coach.  '), T('One assistant sits on top of all three modules and reads them together. Ask why you feel off in the mornings and Sage answers with evidence cards drawn from your own journal and meals: five anxious mornings this month, four of them coffee-first with no breakfast, none on the days you ate oats. It notices patterns unprompted and surfaces them on the home screen.')]));

add(H2('The Phase 1 boundary'));
add(P('Phase 1 tracks three things: how you feel, what you eat and what you say. Physical fitness tracking, financial account connections, email and text aggregation, and the location-based Pulsating Symbols concept are all outside this phase and are listed in Section 7. The app is self-contained and interconnected, so it is priced as a single build rather than as a bundle of parts.'));

/* ------------------------------------------------- 2. already built */
add(H1('2.  What we have already built'));
add(P('Rather than describe the app, we have designed it. A complete, clickable design sample accompanies this proposal, with realistic data throughout: a thirty-one day mood journal, logged meals, a live YouTube inbox and scripted conversations with Sage. It covers the welcome and six-step onboarding, Home, Mood Journal, Fuel with the camera scan, the Communication Hub with the reply composer and paste-in flows, Sage, and the My Brain screen, in three palettes built around your three logo options, each with light and dark mode. This proposal describes the build of that sample into a live product.'));

/* ------------------------------------------------------ 3. scope */
add(H1B('3.  Scope of work'));
add(P('Everything below is included in the Phase 1 price. The applications are built once and published to both the Apple App Store and Google Play.'));

add(EYE('ACCOUNTS, ONBOARDING AND THE PERSONAL BRAIN'));
[
  'Account creation, sign-in with Google and Apple, password recovery.',
  'Six-step onboarding: name, focus areas, voice training with tone sliders and a sample reply, food preferences, platform connection, palette choice.',
  'A private brain per user: voice profile, example memory of approved and edited replies, learned rules, and the mood and meal history, all stored under the user’s own account and encrypted at rest.',
  'Three colour palettes matched to the three logo options, with light mode, dark mode and automatic switching by time of day.',
  'Export my brain, and delete my brain, from within the app.'
].forEach(t => add(BUL(t)));

add(EYE('MOOD JOURNAL'));
[
  'Home-screen check-in: six drawn mood faces, an optional note by voice or keyboard, and trigger tags.',
  'Speech-to-text for notes, using the device’s native dictation.',
  'Month calendar with a colour dot per check-in; tap any day to see its entries.',
  'Weekly mood averages and a breakdown of what sits behind the low days.',
  'Evening reminder and check-in streak.'
].forEach(t => add(BUL(t)));

add(EYE('FUEL'));
[
  'Meal capture by camera or from the photo library.',
  'AI identification of the items on the plate, with calories, protein, carbohydrate and fat, and a confidence level. The user can correct items and portions before saving.',
  'Daily calorie and macronutrient targets, a daily coffee count, and a meal timeline with photographs.',
  'Food preferences: foods the user loves and foods they avoid, with avoided foods flagged when they appear in a meal.'
].forEach(t => add(BUL(t)));

add(EYE('COMMUNICATION HUB'));
[
  'YouTube: one-tap connection through Google sign-in. Comments from every video on the channel are fetched automatically, and approved replies are posted back to YouTube from inside the app.',
  'Import of the user’s own past YouTube replies at connection, so the brain starts with their voice already learned.',
  'Inbox in three views: needs you, auto-drafted, and posted. One-tap posting of all auto-drafted replies.',
  'Reply composer: the original comment, the drafted reply, a one-line explanation of why it was written that way, tone chips, a nudge box for instructions in plain English, copy, and approve-and-post.',
  'Paste-in tiles for Facebook, Instagram, TikTok, X, WhatsApp, email, text messages and LinkedIn: paste one message or many, receive replies in your voice, copy one or copy all.',
  'Accuracy meter and automation gates: assisted mode from the start, auto-posting of simple replies once accuracy reaches ninety percent, and a permanent rule that sensitive topics always come back to the user.',
  'The learning loop: every approval and edit saved to the brain, nightly distillation into readable style rules, and a rules screen the user can edit.'
].forEach(t => add(BUL(t)));

add(EYE('SAGE, THE AI COACH'));
[
  'Conversational coach that answers only from the user’s own mood, meal and reply data, and says so when it does not have enough.',
  'Evidence cards beneath each answer showing the counts and patterns the answer rests on.',
  'Unprompted insights on the home screen and by notification when a pattern appears across modules.',
  'Suggested questions, and quick actions such as setting a reminder or drafting a reply.'
].forEach(t => add(BUL(t)));

add(EYE('PLATFORM AND PUBLICATION'));
[
  'Subscription billing through Apple and Google in-app purchase, monthly and annual, with a free trial period of your choosing.',
  'Push notifications, in-app notification centre, and settings.',
  'Secure backend, database and media storage, OpenAI integration for language, vision and embeddings, and a deployment pipeline.',
  'Google OAuth verification and the YouTube API compliance submission, both required before public launch, prepared and filed by us.',
  'Submission to the Apple App Store and Google Play, and handling of any rejection arising from our build.'
].forEach(t => add(BUL(t)));

add(H2('A note on integrations'));
add(P('YouTube is the only platform that lets an app read comments and post replies on a user’s behalf with a single sign-in, which is why it is fully connected in Phase 1. Facebook Pages and Instagram professional accounts have similar interfaces but require a separate Meta application review and do not cover personal profiles; they are listed as a later addition in Section 7. WhatsApp, iPhone text messages and TikTok replies have no usable interface for third-party apps, and the paste-in design is the honest answer. It also keeps the user in control: nothing is connected to those accounts, and only the text they choose to paste reaches their brain.'));

/* ------------------------------------------------------- 4. investment */
add(H1B('4.  Investment'));
add(P('MyBrainAI is one product, not a set of modules. The coach depends on the journal and the meals; the hub depends on the brain; the brain depends on all of them. It is therefore priced as a single fixed sum for the complete Phase 1 scope described in Section 3. All figures are in US dollars.'));
add(table([6626, 2400], [
  new TableRow({ tableHeader: true, children: [hcell('Workstream', 6626), hcell('Effort', 2400, { align: AlignmentType.RIGHT })] }),
  ...EFFORT.map(([n, w]) => new TableRow({ children: [cell(n, { w: 6626 }), cell(w + ' weeks', { w: 2400, align: AlignmentType.RIGHT, color: MUTED })] })),
  new TableRow({ children: [
    cell('Phase 1, complete', { w: 6626, bold: true, fill: FOREST, color: 'FFFFFF' }),
    cell(usd(PRICE), { w: 2400, bold: true, size: 24, align: AlignmentType.RIGHT, fill: FOREST, color: 'FFFFFF' })] })
]));
add(P([b('What the fee covers. '), T('User experience and interface design, backend and mobile engineering, the AI integration and learning pipeline, quality assurance on both platforms, project management, infrastructure set-up, the Google and YouTube approval filings, and store submission. It is one blended fee for the whole team, not an engineering rate with everything else charged separately.')], { before: 160 }));
add(P([b('Effort. '), T('The workstreams above total ' + WEEKS + ' developer-weeks. Delivered by a project manager, a designer, two engineers and a tester working in parallel, that is fourteen to sixteen calendar weeks.')]));

/* ---------------------------------------------------------- 5. timeline */
add(H1('5.  Indicative timeline'));
add(table([1200, 4500, 1663, 1663], [
  new TableRow({ tableHeader: true, children: [hcell('Stage', 1200), hcell('Work', 4500), hcell('Duration', 1663), hcell('Cumulative', 1663)] }),
  new TableRow({ children: [cell('1', { w: 1200, bold: true }), cell('Kickoff, refinement of the design sample into final screens, and sign-off', { w: 4500 }), cell('2 weeks', { w: 1663 }), cell('Week 2', { w: 1663, color: MUTED })] }),
  new TableRow({ children: [cell('2', { w: 1200, bold: true }), cell('Foundation: accounts, the personal brain, backend, AI integration', { w: 4500 }), cell('3 weeks', { w: 1663 }), cell('Week 5', { w: 1663, color: MUTED })] }),
  new TableRow({ children: [cell('3', { w: 1200, bold: true }), cell('Mood Journal, Fuel and the Communication Hub', { w: 4500 }), cell('6 weeks', { w: 1663 }), cell('Week 11', { w: 1663, color: MUTED })] }),
  new TableRow({ children: [cell('4', { w: 1200, bold: true }), cell('Sage, subscriptions, notifications, and a beta build to you', { w: 4500 }), cell('2 weeks', { w: 1663 }), cell('Week 13', { w: 1663, color: MUTED })] }),
  new TableRow({ children: [cell('5', { w: 1200, bold: true }), cell('Your acceptance testing, corrections, store submission and go-live', { w: 4500 }), cell('2 to 3 weeks', { w: 1663 }), cell('Week 15 to 16', { w: 1663, color: MUTED })] }),
  new TableRow({ children: [ cell('', { w: 1200, fill: FOREST }), cell('Phase 1, idea to app store', { w: 4500, bold: true, fill: FOREST, color: 'FFFFFF' }), cell('14 to 16 weeks', { w: 1663, bold: true, fill: FOREST, color: 'FFFFFF' }), cell('', { w: 1663, fill: FOREST })] })
]));
add(P('The Google OAuth verification and YouTube compliance filings are made in Stage 2 so that their review runs in parallel with the build rather than after it.', { before: 130 }));

/* ------------------------------------------------------ 6. payment terms */
add(H1B('6.  Payment terms'));
add(P('Payments are milestone-based, in the ratio 30 : 30 : 30 : 10.'));
add(table([5000, 1400, 2626], [
  new TableRow({ tableHeader: true, children: [hcell('Milestone', 5000), hcell('Share', 1400, { align: AlignmentType.CENTER }), hcell('Amount', 2626, { align: AlignmentType.RIGHT })] }),
  new TableRow({ children: [cell('On signing, to commence work', { w: 5000 }), cell('30%', { w: 1400, align: AlignmentType.CENTER }), cell(usd(PRICE * 0.3), { w: 2626, bold: true, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [cell('Design completion and sign-off', { w: 5000 }), cell('30%', { w: 1400, align: AlignmentType.CENTER }), cell(usd(PRICE * 0.3), { w: 2626, bold: true, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [cell('Development completion and beta build for your acceptance testing', { w: 5000 }), cell('30%', { w: 1400, align: AlignmentType.CENTER }), cell(usd(PRICE * 0.3), { w: 2626, bold: true, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [cell('Go-live and publication to both app stores', { w: 5000 }), cell('10%', { w: 1400, align: AlignmentType.CENTER }), cell(usd(PRICE * 0.1), { w: 2626, bold: true, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [ cell('Total', { w: 5000, bold: true, fill: FOREST, color: 'FFFFFF' }), cell('100%', { w: 1400, bold: true, align: AlignmentType.CENTER, fill: FOREST, color: 'FFFFFF' }), cell(usd(PRICE), { w: 2626, bold: true, size: 23, align: AlignmentType.RIGHT, fill: FOREST, color: 'FFFFFF' })] })
]));
add(P('Invoices are payable within fifteen days. Applicable taxes and bank charges are additional.', { before: 120 }));

add(H2('Third-party running costs'));
add(P('These are paid by you directly to the providers and form no part of our fee. They are listed so that there are no surprises after launch.'));
add(table([4400, 4626], [
  new TableRow({ tableHeader: true, children: [hcell('Item', 4400), hcell('Indicative cost', 4626)] }),
  new TableRow({ children: [cell('OpenAI usage (language, vision and embeddings)', { w: 4400 }), cell('Roughly $0.50 to $1.50 per active user per month, depending on how many meals and replies they run through it', { w: 4626 })] }),
  new TableRow({ children: [cell('Cloud hosting, database and media storage', { w: 4400 }), cell('$150 to $300 per month at launch, scaling with users', { w: 4626 })] }),
  new TableRow({ children: [cell('YouTube Data API', { w: 4400 }), cell('Free. A daily usage allowance applies; we file for the extension as part of Phase 1', { w: 4626 })] }),
  new TableRow({ children: [cell('Apple Developer Program', { w: 4400 }), cell('$99 per year', { w: 4626 })] }),
  new TableRow({ children: [cell('Google Play Developer account', { w: 4400 }), cell('$25, one time', { w: 4626 })] }),
  new TableRow({ children: [cell('App store commission on subscriptions', { w: 4400 }), cell('15% of subscription revenue under Apple’s and Google’s small business programmes', { w: 4626 })] })
]));
add(P([b('For context. '), T('At a subscription of $9.99 a month, roughly 250 paying subscribers cover the Phase 1 investment within a year, with the running costs above comfortably inside the subscription.')], { before: 140 }));

/* ------------------------------------------------------ 7. not included */
add(H1('7.  Not included in Phase 1'));
add(P('Each of the following can be scoped and priced separately when you want it. We would rather name them here than have them surface later.'));
[
  [b('Facebook Pages and Instagram connection.  '), T('Direct fetching and posting for Facebook Pages and Instagram professional accounts, subject to Meta application review. Paste-in for both is included in Phase 1.')],
  [b('The wellness store.  '), T('A section of the app linking to your Amazon affiliate products.')],
  [b('Physical fitness tracking.  '), T('Steps, workouts and wearable connections. Existing apps cover this well, and it can be added later through Apple Health and Health Connect.')],
  [b('Financial account connections.  '), T('Banks do not offer these connections to independent applications at this stage.')],
  [b('Email and text message aggregation.  '), T('Automatic reading of inboxes. Paste-in for both is included.')],
  [b('Pulsating Symbols.  '), T('The location-based, real-time venue concept is a separate product and would be proposed on its own.')],
  [b('Brand, marketing and legal.  '), T('Marketing, content, the privacy policy and terms of service. We will build to whatever you and your advisers settle on.')]
].forEach(t => add(BUL(t)));

/* ------------------------------------------------- 8. what we need */
add(H1('8.  What we need from you'));
[
  'A decision on the logo and default palette, and any brand guidance.',
  'The YouTube channel connected to a Google account you control, for testing.',
  'Your Apple Developer and Google Play accounts, opened in your own name, so the app is published as yours from day one.',
  'A decision on subscription pricing and trial length before Stage 4.',
  'Sign-off on the final screens at the end of Stage 1, and feedback within three working days at each stage.'
].forEach(t => add(NUM(t)));

/* ------------------------------------------------- 9. our commitments */
add(H1('9.  Our commitments'));
add(P([b('The fee is the fee.  '), T('The refinements, adjustments and natural back-and-forth of getting MyBrainAI right, within the scope described in this document, will not cost you anything extra. If together we decide to add something genuinely new, we will agree it in a short written addendum before any work starts.')]));
add(P([b('You own it.  '), T('On full payment, all rights in the delivered application, its source code, its design and its data belong to you absolutely. Nile takes no equity and no revenue share in Phase 1.')]));
add(P([b('Warranty.  '), T('For sixty days after go-live we correct any defect in the delivered scope at no charge.')]));
add(P([b('After go-live.  '), T('Ongoing support and maintenance, covering monitoring, security patching, operating system and store compliance updates, and minor enhancements, is available separately from $1,200 per month once the warranty period ends. As discussed, once the app is live and growing, we are open to a conversation about a longer-term technical partnership in place of a support fee.')]));

/* ------------------------------------------------------- 10. acceptance */
add(H1('10.  Acceptance'));
add(P('To proceed, sign below and return a copy. On receipt we will confirm firm dates, book the kickoff and begin Stage 1 immediately.'));
const noB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const sig = (party, name) => new TableCell({
  borders: { top: { style: BorderStyle.SINGLE, size: 2, color: LINE }, bottom: noB, left: noB, right: noB },
  width: { size: 4513, type: WidthType.DXA }, margins: { top: 180, bottom: 80, left: 0, right: 200 },
  children: [
    new Paragraph({ spacing: { after: 160 }, children: [b(party, { color: FOREST })] }),
    new Paragraph({ spacing: { after: 160 }, children: [T('Signature:  ', { color: MUTED, size: 20 }), T('____________________________')] }),
    new Paragraph({ spacing: { after: 150 }, children: [T('Name:  ', { color: MUTED, size: 20 }), b(name)] }),
    new Paragraph({ children: [T('Date:  ', { color: MUTED, size: 20 }), T('______________')] })
  ]
});
add(new Table({ columnWidths: [4513, 4513], width: { size: W, type: WidthType.DXA },
  borders: { top: noB, bottom: noB, left: noB, right: noB, insideHorizontal: noB, insideVertical: noB },
  rows: [new TableRow({ children: [sig('For MyBrainAI', 'Kevin Wilson'), sig('For Nile Technologies', 'Aaditya Kapoor')] })] }));

/* ------------------------------------------------------------- document */
const doc = new Document({
  creator: 'Nile Technologies', title: 'MyBrainAI - Proposal and Scope of Work', description: 'Phase 1 personal AI coach application',
  numbering: { config: [
    { reference: 'bul', levels: [{ level: 0, format: 'bullet', text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 220 } } } }] },
    { reference: 'num', levels: [{ level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 240 } } } }] }
  ] },
  sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } }, children: K }]
});
Packer.toBuffer(doc).then(buf => { fs.writeFileSync(__dirname + '/MyBrainAI-Proposal-and-Scope-of-Work.docx', buf); console.log('written ' + (buf.length / 1024).toFixed(0) + ' KB'); });
