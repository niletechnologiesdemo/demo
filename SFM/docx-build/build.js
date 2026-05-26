/* SF Merionettes Proposal — DOCX build
   Third-person tone · board-appropriate
*/
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, PageBreak, LevelFormat, ImageRun,
  PageOrientation, TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');
const path = require('path');

// ── Brand palette ──────────────────────────────────────────
const NAVY     = '1B3A8C';
const NAVY_D   = '0B1A47';
const AQUA     = '06B6D4';
const TEXT     = '0F172A';
const TEXTMID  = '475569';
const MUTED    = '64748B';
const BORDER   = 'E2E8F0';
const ICE      = 'F4F7FD';
const GREEN_D  = '047857';
const RED      = 'EF4444';

// ── Page layout (US Letter, 1" margins) ────────────────────
const PAGE_W   = 12240;  // 8.5"
const PAGE_H   = 15840;  // 11"
const MARGIN   = 1440;   // 1" all sides
const CONTENT_W = PAGE_W - MARGIN * 2; // 9360

// ── Helpers ────────────────────────────────────────────────
const sp = (after = 120, before = 0, line = 320) => ({ after, before, line });

function txt(text, opts = {}) {
  return new TextRun({ text, font: 'Calibri', ...opts });
}

// Body paragraph
function para(text, opts = {}) {
  return new Paragraph({
    children: Array.isArray(text)
      ? text.map(t => typeof t === 'string' ? txt(t) : t)
      : [txt(text, opts.run || {})],
    spacing: sp(opts.after ?? 140, opts.before ?? 0, opts.line ?? 320),
    alignment: opts.align,
  });
}

// Lead paragraph (slightly larger, italic-ish for emphasis)
function lead(text) {
  return new Paragraph({
    children: [txt(text, { size: 22, color: TEXTMID, italics: true })],
    spacing: sp(200, 60, 320),
  });
}

// H1 - section title with number band
function h1(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [
      txt(num + '.  ', { size: 28, color: AQUA, bold: true }),
      txt(text, { size: 28, color: NAVY, bold: true })
    ],
    spacing: { before: 400, after: 200 },
    pageBreakBefore: false,
  });
}

// H1 with page break
function h1Page(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [
      txt(num + '.  ', { size: 28, color: AQUA, bold: true }),
      txt(text, { size: 28, color: NAVY, bold: true })
    ],
    spacing: { before: 240, after: 200 },
    pageBreakBefore: true,
  });
}

// H2 — subsection
function h2(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [
      txt(num + '  ', { size: 22, color: NAVY, bold: true }),
      txt(text, { size: 22, color: TEXT, bold: true })
    ],
    spacing: { before: 260, after: 120 },
  });
}

// H3 — sub-subsection
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [txt(text, { size: 20, color: TEXT, bold: true })],
    spacing: { before: 180, after: 80 },
  });
}

// Bullet
function bullet(text, opts = {}) {
  const children = typeof text === 'string'
    ? [txt(text, opts.run || {})]
    : text;
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    children,
    spacing: sp(80, 0, 300),
  });
}

// Bold-prefix bullet
function bbullet(label, body) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    children: [
      txt(label, { bold: true, color: TEXT }),
      txt(' — ' + body, { color: TEXTMID }),
    ],
    spacing: sp(80, 0, 300),
  });
}

// Eyebrow (small capitalised pre-heading text)
function eyebrow(text, color = AQUA) {
  return new Paragraph({
    children: [txt(text.toUpperCase(), { size: 16, color, bold: true, characterSpacing: 60 })],
    spacing: sp(120, 0),
  });
}

// Subtle horizontal rule (using paragraph bottom border)
function hr() {
  return new Paragraph({
    children: [],
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BORDER, space: 1 } },
    spacing: { before: 60, after: 120 },
  });
}

// Aqua accent rule
function aquaRule() {
  return new Paragraph({
    children: [],
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: AQUA, space: 1 } },
    spacing: { before: 60, after: 100 },
  });
}

// Standard cell border
const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: BORDER };
const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

function cell(text, opts = {}) {
  const isHeader = !!opts.header;
  const children = Array.isArray(text)
    ? text.map(p => typeof p === 'string'
        ? new Paragraph({ children: [txt(p, { size: opts.size || 20, color: opts.color || TEXT, bold: isHeader || opts.bold })], spacing: { after: 60 } })
        : p)
    : [new Paragraph({
        children: [txt(text, { size: opts.size || 20, color: opts.color || TEXT, bold: isHeader || opts.bold })],
        spacing: { after: 0 },
        alignment: opts.align,
      })];

  return new TableCell({
    borders: cellBorders,
    width: { size: opts.width, type: WidthType.DXA },
    shading: isHeader
      ? { fill: NAVY, type: ShadingType.CLEAR }
      : (opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined),
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children,
  });
}

// ── Document content ──────────────────────────────────────
const children = [];

// ============================================================
// COVER PAGE
// ============================================================
const LOGO = path.join(__dirname, '..', 'Images', 'Logo.png');
const logoBuf = fs.readFileSync(LOGO);

// Top accent bar
children.push(new Paragraph({
  children: [],
  border: { bottom: { style: BorderStyle.SINGLE, size: 36, color: AQUA, space: 1 } },
  spacing: { before: 0, after: 200 },
}));

// Logo
children.push(new Paragraph({
  children: [new ImageRun({
    type: 'png',
    data: logoBuf,
    transformation: { width: 220, height: 100 },
    altText: { title: 'SFM Logo', description: 'San Francisco Merionettes', name: 'SFM' }
  })],
  spacing: { before: 600, after: 280 },
}));

// Eyebrow
children.push(new Paragraph({
  children: [txt('OPERATIONS MANAGEMENT SYSTEM  ·  PROPOSAL', {
    size: 18, color: AQUA, bold: true, characterSpacing: 80, font: 'Calibri'
  })],
  spacing: { after: 200 },
}));

// Big title
children.push(new Paragraph({
  children: [txt('Custom Web Portal', { size: 64, color: TEXT, bold: true })],
  spacing: { after: 60 },
}));
children.push(new Paragraph({
  children: [txt('San Francisco Merionettes', { size: 48, color: NAVY, bold: true })],
  spacing: { after: 420 },
}));

// Subtitle / lead
children.push(new Paragraph({
  children: [txt(
    'A proprietary, club-owned operations platform consolidating onboarding, scheduling, attendance, communication, billing, and competition fees into a single unified system.',
    { size: 22, color: TEXTMID, italics: true }
  )],
  spacing: { after: 800, line: 360 },
}));

// Aqua divider
children.push(aquaRule());

// Footer block (prepared for / by)
children.push(new Paragraph({
  children: [
    txt('PREPARED FOR  ', { size: 16, color: MUTED, characterSpacing: 60 }),
  ],
  spacing: { after: 30 },
}));
children.push(new Paragraph({
  children: [
    txt('SF Merionettes Board  ·  Eileen Horng (President)', { size: 22, color: TEXT, bold: true })
  ],
  spacing: { after: 200 },
}));

children.push(new Paragraph({
  children: [
    txt('BY  ', { size: 16, color: MUTED, characterSpacing: 60 }),
  ],
  spacing: { after: 30 },
}));
children.push(new Paragraph({
  children: [
    txt('Nile Technologies', { size: 22, color: TEXT, bold: true }),
    txt('  ·  niletechnologies.com  ·  May 2026', { size: 22, color: MUTED })
  ],
  spacing: { after: 0 },
}));

// ============================================================
// SECTION 1 — CLIENT BRIEF
// ============================================================
children.push(h1Page('1', 'Client Brief'));

children.push(lead(
  'The San Francisco Merionettes operates as one of the Bay Area\'s leading youth artistic-swimming programs. The brief that follows establishes the operational context against which this proposal is structured.'
));

children.push(h3('Organisation'));
children.push(para(
  'The San Francisco Merionettes is a youth artistic-swimming organisation serving fifty-seven swimmers across six competitive teams — Juniors & Youth, 12U A, 12U B, 10U, Intermediates, and Novice. Athletes range in age from six to eighteen. The club operates under the United States Artistic Swimming (USAAS) national umbrella and trains across four pools in San Francisco: JB, HL, Coffman, and Balboa. Coaching is delivered by a team of thirteen, with operational oversight provided by a volunteer board led by the President.'
));

children.push(h3('Current operational stack'));
children.push(para('Day-to-day operations are presently distributed across a number of disconnected platforms:'));
children.push(bbullet('SportsEngine', 'membership records and billing'));
children.push(bbullet('Wix', 'newly-launched club website'));
children.push(bbullet('Google Calendar', 'per-coach scheduling — one calendar per coach'));
children.push(bbullet('Signal', 'coach-to-parent communication and absence notifications'));
children.push(bbullet('WhatsApp', 'parent-to-parent coordination groups'));
children.push(bbullet('Email + Newsletter', 'club-wide announcements and monthly digests'));

children.push(h3('Objective'));
children.push(para(
  'The board has identified the need for a single, unified, mobile-responsive operations platform — one that consolidates the above touchpoints into a coherent system, eliminates dependency on third-party billing platforms with revenue-share arrangements, and provides full data and source-code ownership to the organisation. This proposal sets out the recommended approach, scope, commercial terms, and timeline to deliver such a system.'
));

// ============================================================
// SECTION 2 — CURRENT FRAGMENTED SYSTEM
// ============================================================
children.push(h1Page('2', 'Overview of the Current Fragmented System'));

children.push(lead(
  'The existing operational stack — while serviceable — introduces three structural concerns that this proposal addresses directly: third-party dependency with embedded revenue share, fragmented scheduling, and an absence of communication audit.'
));

children.push(h2('2.1', 'Dependency on SportsEngine and Embedded Revenue Share'));
children.push(para(
  'The club\'s current billing and member-management platform — SportsEngine — operates on a subscription model with a transactional processing share on every payment collected through the platform. This includes membership dues, competition entries, and merchandise. The structure means the club not only pays an ongoing platform subscription, but also surrenders a percentage of every dollar collected from families to a third-party vendor.'
));
children.push(para(
  'Beyond the direct financial impact, the dependency carries structural risk. All member records, transaction history, parent contact details, and operational data reside on SportsEngine\'s servers. The club holds no ownership over the system itself, no ability to model bespoke workflows (the Merionettes\' competition fee structure of entry + per-routine charges, for instance, requires manual entry per swimmer), and no protection against future changes to vendor pricing, terms of service, or product direction. Any decision SportsEngine makes — to raise prices, deprecate a feature, or terminate the service — has a direct and unavoidable consequence for club operations.'
));
children.push(para(
  'The platform is also designed for the general youth-sports market. Synchronised swimming\'s specific operational requirements — co-coaching pairs, multi-child families spanning multiple levels, the USAAS skill-library workflow — are accommodated through workarounds rather than first-class support.'
));

children.push(h2('2.2', 'Fragmented Scheduling'));
children.push(para(
  'Each of the thirteen coaches maintains a personal Google Calendar for the sessions they lead. There is no master club calendar. Parents — particularly those with multiple swimmers on different teams (one parent on the roster has three daughters across Novice, Intermediates, and 12U B) — are required to check two or three separate calendars to plan around practices. When a pool closes, a coach falls ill, or a session is rescheduled, the change must be communicated separately through Signal, WhatsApp, and email, with no central record of what has changed or who has been notified.'
));

children.push(h2('2.3', 'Communication Without Audit Trail'));
children.push(para(
  'Absence notifications, schedule changes, payment reminders, and competition logistics flow through coaches\' personal Signal accounts and parent-managed WhatsApp groups. None of these channels are auditable or recorded against a swimmer\'s file. If a coach changes devices, leaves the organisation, or loses access to a Signal group, both the communication history and the parent contact relationships are effectively lost. Newsletter and email communications, while archivable, reach the club inconsistently — parents read some, miss others, and there is no read-receipt or delivery confirmation back to the board.'
));

// ============================================================
// SECTION 3 — PROPOSED SOLUTION
// ============================================================
children.push(h1Page('3', 'Proposed Solution'));

children.push(lead(
  'A custom-built, mobile-responsive operations platform delivered as three role-tailored interfaces operating on a single shared database — fully transferred to the Merionettes on launch day as a proprietary, self-owned asset.'
));

children.push(para(
  'The proposed system replaces the entire current operational stack with a single platform, accessed through three web-based interfaces tailored to the three primary user groups within the organisation. The platform is delivered as a web application that opens in any modern browser on any device — phone, tablet, or laptop — without requiring a native mobile-application install. Push-style notifications are delivered through email and SMS rather than through a native app, eliminating the maintenance overhead of mobile app stores while preserving a seamless user experience on phones.'
));

children.push(h3('The three interfaces'));
children.push(bbullet('Admin Console',  'For the board, the treasurer, and operational leads. Master schedule, member management, billing, communications, plans, reports.'));
children.push(bbullet('Coach Interface', 'For all thirteen coaches. Daily attendance, team management, swimmer profiles, schedule, communications, skill notes.'));
children.push(bbullet('Parent Portal',   'For all parents and guardians. Family schedule, billing, absence reporting, child profiles, announcements, team shop.'));

children.push(para(
  'On launch day the complete codebase, database, deployment scripts, and brand assets are transferred to the Merionettes. The system runs on infrastructure controlled by the club. No ongoing platform fee, subscription, or revenue share is owed to Nile Technologies beyond the one-time build investment outlined in Section 6.'
));

// ============================================================
// SECTION 4 — SCOPE OF WORK · FUNCTIONALITY
// ============================================================
children.push(h1Page('4', 'Scope of Work · Functionality'));

children.push(lead(
  'The system delivers approximately one hundred discrete functional capabilities across the three interfaces. The functionality is grouped below by interface and primary module.'
));

// 4.1 Admin
children.push(h2('4.1', 'Admin Console'));
children.push(para('Intended user: board, treasurer, operations lead. Delivered modules:'));

children.push(h3('Dashboard'));
children.push(bbullet('Live KPIs', 'active swimmers, monthly recurring revenue, today\'s scheduled practices, outstanding balances, recent activity feed.'));
children.push(bbullet('Today snapshot', 'every running session with coach and pool, surfaced at a glance.'));
children.push(bbullet('Quick actions', 'shortcuts for new swimmer onboarding, payment requests, schedule additions, announcements.'));

children.push(h3('Members'));
children.push(bbullet('Master register', 'every swimmer with full profile (personal info, parent contact, emergency contact, allergies, team assignment, routine assignment, USAAS ID, billing history, attendance, training material progress).'));
children.push(bbullet('Search and filter', 'live filters by team, status (active / new / past-due / payment-failed), or free-text search by swimmer or parent name.'));
children.push(bbullet('Multi-child linkage', 'siblings appear connected on the parent\'s account.'));
children.push(bbullet('Add Swimmer flow', 'full-page four-step onboarding wizard: Swimmer info, Parent info, Team & Coach assignment, Billing setup (combined first-payment package including pro-rated dues, registration fee, and optional merchandise).'));

children.push(h3('Teams'));
children.push(bbullet('Six-team overview', 'card grid showing team-level KPIs (swimmer count, attendance rate, MRR).'));
children.push(bbullet('Team detail page', 'six-tab profile for each team — Roster, Schedule, Attendance, Coaches, Training Materials, Billing.'));
children.push(bbullet('Co-coaching support', 'co-coach pairs (such as 12U A\'s Emily and Heidi) surfaced explicitly, with shared roster and notes.'));

children.push(h3('Coaches'));
children.push(bbullet('Personnel register', 'every coach with role (Head / Coach / Assistant), team assignments, weekly hours, attendance-entry rate, skill-note activity.'));
children.push(bbullet('Coach detail page', 'five-tab profile — Overview, Roster, Schedule, Communication, Profile.'));
children.push(bbullet('Add Coach flow', 'modal-based add with role, certifications, team assignment.'));

children.push(h3('Master Schedule'));
children.push(bbullet('Unified club calendar', 'all teams, all pools, all coaches in one view.'));
children.push(bbullet('Three views', 'Week list (agenda style), Day grid (per-pool columns), All-practices table.'));
children.push(bbullet('Working filters', 'multi-select for teams and pools.'));
children.push(bbullet('Per-practice management', 'each session is clickable — edit time, pool, coach, cancel with reason, reschedule. Cancelled sessions remain visible with one-tap Reschedule button. Auto-notification to parents and coaches on every change.'));
children.push(bbullet('New Batch wizard', 'four-step structured flow — Level, Batch Details, Schedule, Roster & Review.'));
children.push(bbullet('Class-specific messaging', 'every practice has its own message thread between that session\'s parents and coaches.'));

children.push(h3('Attendance'));
children.push(bbullet('Date-navigable view', 'every practice scheduled for any selected day, with expandable per-team cards.'));
children.push(bbullet('One-tap marking', 'Present / Late / Absent pills per swimmer.'));
children.push(bbullet('Week summary', 'club-wide attendance roll-up across the selected week.'));
children.push(bbullet('At-risk & trends', 'auto-flagged swimmers below seventy-percent attendance, absence-reason breakdown, six-month trend chart, perfect-attendance recognition list, day-of-week analysis.'));

children.push(h3('Billing & POS'));
children.push(bbullet('Onboard New Swimmer', 'combined first-payment package (pro-rated dues + registration fee + optional merch) sent as a single parent payment link.'));
children.push(bbullet('Payment Request', 'ad-hoc charge against any swimmer for any item, dispatched by email link or marked as cash received.'));
children.push(bbullet('Competition Batch', 'bulk billing for an entire team based on routine assignments. Entry, team, duet, solo, and combo fees auto-calculated.'));
children.push(bbullet('Merch POS', 'point-of-sale for suits, warm-ups, caps, goggles and apparel. Charged to a specific swimmer; pickup tracked.'));
children.push(bbullet('Transactions and aging', 'tabs for recent transactions, outstanding aging, recurring dues, competition charges, merch orders.'));
children.push(bbullet('Stripe integration', 'cards, ACH, with standard processing fees borne by the club; cash payments marked manually.'));

children.push(h3('Plans & Pricing'));
children.push(bbullet('Per-team plan management', 'monthly plan configuration for each of the six teams (J&Y $630, 12U A $600, 12U B $600, 10U $550, Intermediates $500, Novice $420).'));
children.push(bbullet('Plan detail pages', 'configuration, included features, billing history, subscriber list, edit and duplicate actions.'));
children.push(bbullet('Competition fee schedules', 'per-event configuration (entry, team, duet, solo, combo amounts).'));

children.push(h3('Communications'));
children.push(bbullet('Compose', 'audience picker (all families, specific level, coaches, parents + coaches), channel selector (Parent Portal, Email, SMS), template library.'));
children.push(bbullet('Sent — Admin', 'board / administrative announcements, filterable by audience scope.'));
children.push(bbullet('Sent — Coaches', 'visibility into every coach\'s outgoing communications.'));
children.push(bbullet('Admin ↔ Coach', 'private one-on-one threads between admin and individual coaches.'));
children.push(bbullet('Parent Inbox', 'inbound messages from parents to admin or coach, filterable by recipient.'));

children.push(h3('Resources'));
children.push(bbullet('Skill video library', 'connected to the USAAS coaching session library at slocoach.com.'));
children.push(bbullet('Assignment workflow', 'videos assignable to specific swimmers or teams; watch-progress tracked.'));

children.push(h3('Reports'));
children.push(bbullet('Revenue analytics', 'YTD revenue, monthly trend, revenue mix (dues / competition / merch / registration), revenue per team, top contributors.'));
children.push(bbullet('Outstanding aging', 'segmented by age of outstanding balance.'));
children.push(bbullet('YoY comparison', 'year-on-year revenue and swimmer-count comparison.'));
children.push(bbullet('Forecast', 'quarterly revenue forecast incorporating recurring dues and known competitions.'));

// 4.2 Coach
children.push(h2('4.2', 'Coach Interface'));
children.push(para('Intended user: all thirteen coaches. Delivered modules:'));

children.push(h3('My Day'));
children.push(bbullet('Co-coach sync banner', 'live notification of actions taken by the coach\'s co-coach (attendance marked, skill notes posted, parent messages received).'));
children.push(bbullet('Inline attendance', 'next upcoming session\'s roster pre-loaded with one-tap Present / Late / Absent pills.'));
children.push(bbullet('Class messages', 'parent messages tied to that specific practice surface here.'));
children.push(bbullet('Quick-send', 'one-tap announcement composer for the coach\'s team.'));

children.push(h3('My Team'));
children.push(bbullet('Six-tab team detail', 'Roster, Schedule, Attendance, Co-coach Notes, Training Materials, Team Communications.'));
children.push(bbullet('Co-coach Notes', 'shared observation feed visible to both coaches in a co-coaching pair, with filter chips per swimmer.'));
children.push(bbullet('Team skill aggregate', 'progress against each of the five USAAS required elements across the full roster.'));

children.push(h3('Swimmer Profile'));
children.push(bbullet('Five-tab per-swimmer view', 'Overview (parent contact, routine, recent activity), Attendance (per-practice history), Skills (progress against required elements), Parent Messages (full thread for that swimmer), Co-coach Notes (observations from both coaches).'));

children.push(h3('My Schedule'));
children.push(bbullet('Week view', 'sessions led by the coach plus their co-coach\'s sessions for visibility.'));
children.push(bbullet('Practice modal', 'four-tab detail per practice — Details, Roster (with absence requests flagged), Class Messages, Session Plan.'));
children.push(bbullet('Cancellation flow', 'cancel with reason, auto-notify all affected families and admin.'));
children.push(bbullet('Sub-request', 'request a sub from a specific co-coach or admin.'));

children.push(h3('Attendance History'));
children.push(bbullet('Filterable per-swimmer log', 'with drill-down to per-practice detail.'));
children.push(bbullet('Status filters', 'Perfect, ninety-percent plus, At-risk.'));
children.push(bbullet('Free-text search', 'by swimmer name.'));

children.push(h3('Messages & Announcements'));
children.push(bbullet('Parent Inbox', 'filterable by practice-tied versus general.'));
children.push(bbullet('Sent by Me', 'outgoing announcements to the coach\'s team.'));
children.push(bbullet('From Admin', 'board announcements relevant to this coach.'));
children.push(bbullet('DM with Admin', 'private threads between this coach and the board.'));

children.push(h3('Add Skill Note (full-page flow)'));
children.push(bbullet('Pick swimmer', 'select from team roster.'));
children.push(bbullet('Topic and observation', 'free-form observation with optional topic tag.'));
children.push(bbullet('Visibility scope', 'both coaches, plus admin, plus parent, or private.'));
children.push(bbullet('Action tag', 'pin to swimmer profile, recommend promotion, flag for follow-up.'));

children.push(h3('Send Announcement (full-page flow)'));
children.push(bbullet('Audience scope', 'team-wide, specific swimmer\'s family, or co-coach.'));
children.push(bbullet('Practice tie', 'optionally attach to a specific session for context.'));
children.push(bbullet('Channels', 'Parent Portal, Email, SMS.'));
children.push(bbullet('CC option', 'optionally copy the co-coach.'));

// 4.3 Parent
children.push(h2('4.3', 'Parent Portal'));
children.push(para('Intended user: parents and guardians. Mobile-responsive web — accessible on any phone browser. Delivered modules:'));

children.push(h3('Home'));
children.push(bbullet('Family dashboard', 'every child the parent has registered, the next upcoming practice with live countdown, today\'s family-wide practice list, latest announcements, pinned alerts.'));
children.push(bbullet('Smart hints', 'same-pool pickup tips when multiple children share a pool that evening.'));

children.push(h3('Schedule'));
children.push(bbullet('Combined calendar', 'Monday through Sunday across all the parent\'s children, color-coded by child.'));
children.push(bbullet('Per-child filter', 'view one child\'s schedule in isolation.'));
children.push(bbullet('Practice drill-in', 'every session is clickable into a detailed Practice page.'));

children.push(h3('Practice Detail'));
children.push(bbullet('Logistics', 'location with map link, time, pool, coach.'));
children.push(bbullet('Preparation', 'what to bring (suit, cap, goggles, water bottle, towel).'));
children.push(bbullet('Session focus', 'coach\'s session-plan summary.'));
children.push(bbullet('Class-specific thread', 'parent ↔ coach messages tied specifically to that practice.'));
children.push(bbullet('Quick actions', 'mark-absent and message-coach buttons.'));

children.push(h3('Child Profile (per-child drill-in)'));
children.push(bbullet('Cover statistics', 'attendance percentage, skills complete, balance.'));
children.push(bbullet('Upcoming sessions', 'next three practices for this child.'));
children.push(bbullet('Skill progress', 'against required elements with progress bars.'));
children.push(bbullet('Recent attendance', 'last five sessions with status.'));
children.push(bbullet('Billing summary', 'monthly dues and one-off charges for this child.'));
children.push(bbullet('Message thread', 'all coach communication about this child in one place.'));

children.push(h3('Inbox'));
children.push(bbullet('Categorised announcements', 'from board, from coaches, threads.'));
children.push(bbullet('Filter', 'by source (admin / coach / unread).'));

children.push(h3('Billing'));
children.push(bbullet('Family balance overview', 'rolled-up balance across all the parent\'s children.'));
children.push(bbullet('Per-child dues', 'monthly recurring dues displayed per child.'));
children.push(bbullet('Upcoming charges', 'competition fees, merchandise orders.'));
children.push(bbullet('Payment history', 'with downloadable PDF receipts.'));
children.push(bbullet('Pay-now flow', 'method picker (saved card, new card, ACH, mark-cash), payment confirmation, automatic receipt email.'));
children.push(bbullet('Auto-pay', 'configurable per family.'));

children.push(h3('Mark Absence (full-page flow)'));
children.push(bbullet('Child picker', 'select from the parent\'s registered children.'));
children.push(bbullet('Practice picker', 'select which session to mark.'));
children.push(bbullet('Reason and note', 'reason category and optional free-text note to the coach.'));
children.push(bbullet('Instant notification', 'coach receives via Parent Portal and SMS within seconds.'));
children.push(bbullet('Auto-logged', 'absence logged on the swimmer\'s attendance record automatically.'));

children.push(h3('Profile'));
children.push(bbullet('Contact information', 'email, phone, address, emergency contact.'));
children.push(bbullet('Payment method', 'default card / bank.'));
children.push(bbullet('Notification preferences', 'Parent Portal, SMS, email digest.'));
children.push(bbullet('Children management', 'add, link, edit registered children.'));

children.push(h3('Resources'));
children.push(bbullet('Skill video library', 'mirroring admin and coach views, filterable per child.'));
children.push(bbullet('Watch tracking', 'progress on coach-assigned videos surfaced back to the coach.'));

children.push(h3('Team Shop'));
children.push(bbullet('Product catalogue', 'suits, warm-ups, caps, goggles, t-shirts.'));
children.push(bbullet('Per-product detail', 'child picker, size, pickup notice.'));
children.push(bbullet('One-tap purchase', 'charge to saved payment method.'));

// 4.4 Billing communication
children.push(h2('4.4', 'Billing Communication'));
children.push(para(
  'Every billing event triggers a branded, itemised transactional email to the parent — clearly identifying each child, each charge, and the total amount due. The email contains a one-tap "Pay in Parent Portal" call-to-action linking directly to the payment screen for the relevant charge. The same view is accessible at any time directly through the Parent Portal\'s Billing tab. Successful payments trigger an automatic itemised receipt by email, with the receipt also archived on the parent\'s payment history within the portal.'
));
children.push(para(
  'This dual-touchpoint design ensures parents receive proactive communication via channels they already use (email, SMS), while preserving a single source of truth for billing history within the portal.'
));

// 4.5 SMS
children.push(h2('4.5', 'SMS Integration'));
children.push(para(
  'The platform integrates with Twilio for SMS delivery on urgent communications — pool closures, last-minute schedule changes, payment reminders. Per-family notification preferences are honoured, and SMS volume is billed directly to the club at standard Twilio rates (approximately $0.0075 per outgoing message).'
));

// ============================================================
// SECTION 5 — BENEFITS OF A PROPRIETARY SYSTEM
// ============================================================
children.push(h1Page('5', 'Benefits of a Proprietary System'));

children.push(lead(
  'The decision to build a custom, club-owned platform — rather than continue with a third-party subscription stack — delivers five durable benefits.'
));

children.push(h2('5.1', 'Built Around the Merionettes\' Actual Workflow'));
children.push(para(
  'Generic platforms must accommodate every variety of youth-sports organisation; their workflows are necessarily compromises. A custom platform models the club\'s specific operational reality: six competitive levels, co-coaching pairs with shared rosters and notes, multi-child family billing rolled up to a single invoice, the entry-plus-per-routine competition fee structure used in synchronised swimming, the four-pool training calendar, and the USAAS skill-library connection. No workarounds; no irrelevant fields; no missing capabilities.'
));

children.push(h2('5.2', 'No Revenue Share, No Per-User Fees, No Recurring Platform Subscription'));
children.push(para(
  'After handover, the platform carries no ongoing platform fees, no per-user pricing, and no transactional revenue share owed to Nile Technologies. The only ongoing operational costs are standard cloud hosting (approximately fifteen dollars per month on a cloud account owned and controlled by the club) and Stripe\'s standard payment-gateway fee (one to two percent per transaction) — the same processing rate any club would absorb on any platform. Nile retains no cut of dues, competition fees, or merchandise sales.'
));

children.push(h2('5.3', 'Complete Ownership of Source Code, Data, and Brand'));
children.push(para(
  'On launch day the complete codebase, database schema, deployment scripts, brand assets, and technical documentation are transferred to the Merionettes. The platform runs on infrastructure controlled by the club. There is no vendor-side claim to club data, member records, or operations. The board owns the system in full and may use, modify, host, or transfer it at its sole discretion.'
));

children.push(h2('5.4', 'No Vendor Lock-In · Maintainable by Any Developer'));
children.push(para(
  'The platform is built on standard open-source web technologies (HTML, CSS, JavaScript, Node.js, PostgreSQL). Any developer who codes — not just Nile Technologies — can read the codebase, modify it, host it on alternative infrastructure, or extend it with new features. The Merionettes are not bound to Nile for future enhancements; the board is free to engage any developer or agency.'
));

children.push(h2('5.5', 'Long-Term Cost Posture'));
children.push(para(
  'A subscription stack accumulates recurring fees year on year. An owned platform is a one-time capital investment that retains value for the life of the system, with no exposure to future price changes from a third party. The asset belongs on the club\'s books, not in a vendor\'s recurring-revenue line.'
));

// ============================================================
// SECTION 6 — COMMERCIALS
// ============================================================
children.push(h1Page('6', 'Commercials'));

children.push(lead(
  'The engagement is structured as a one-time, milestone-aligned investment with no recurring fees, revenue share, or per-user charges owed to Nile Technologies after launch.'
));

children.push(h2('6.1', 'Total Investment'));
children.push(para([
  txt('A one-time investment of '),
  txt('$10,000 – $12,000 (USD)', { bold: true, color: NAVY }),
  txt('. The final figure is set on confirmation of scope. The range reflects optional modules — such as expanded SMS volume tiers, additional resource-library customisation, and enhanced reporting — that may be added or de-scoped during the design phase.'),
]));

// 6.2 Payment schedule TABLE — 30 : 30 : 30 : 10
children.push(h2('6.2', 'Payment Schedule'));
children.push(para(
  'The investment is staggered across four milestone-aligned payments. No payment is due in advance of the corresponding milestone being reached.'
));

const C1 = 600, C2 = 1500, C3 = 1100, C4 = 6160; // sum = 9360
const payTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [C1, C2, C3, C4],
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell('#',           { header: true, width: C1, color: 'FFFFFF', size: 18, align: AlignmentType.CENTER }),
        cell('MILESTONE',   { header: true, width: C2, color: 'FFFFFF', size: 18 }),
        cell('PAYMENT',     { header: true, width: C3, color: 'FFFFFF', size: 18, align: AlignmentType.CENTER }),
        cell('DESCRIPTION', { header: true, width: C4, color: 'FFFFFF', size: 18 }),
      ]
    }),
    new TableRow({ children: [
      cell('1', { width: C1, align: AlignmentType.CENTER, bold: true, size: 22, color: NAVY }),
      cell('Deposit', { width: C2, bold: true, size: 22 }),
      cell('30%', { width: C3, align: AlignmentType.CENTER, bold: true, size: 24, color: AQUA }),
      cell('Project kickoff. Scope-of-work signed by both parties. Project team assigned and onboarded.', { width: C4, size: 20 }),
    ]}),
    new TableRow({ children: [
      cell('2', { width: C1, align: AlignmentType.CENTER, bold: true, size: 22, color: NAVY }),
      cell('Design UI/UX Completion', { width: C2, bold: true, size: 22 }),
      cell('30%', { width: C3, align: AlignmentType.CENTER, bold: true, size: 24, color: AQUA }),
      cell('Full visual design and user-experience flows approved by the board across all three interfaces (Admin Console, Coach Interface, Parent Portal).', { width: C4, size: 20 }),
    ]}),
    new TableRow({ children: [
      cell('3', { width: C1, align: AlignmentType.CENTER, bold: true, size: 22, color: NAVY }),
      cell('Development Completion & Submission for Testing', { width: C2, bold: true, size: 22 }),
      cell('30%', { width: C3, align: AlignmentType.CENTER, bold: true, size: 24, color: AQUA }),
      cell('All functional modules built, integrated with Stripe and Twilio, deployed to a staging environment, and submitted to the board for user-acceptance testing.', { width: C4, size: 20 }),
    ]}),
    new TableRow({ children: [
      cell('4', { width: C1, align: AlignmentType.CENTER, bold: true, size: 22, color: NAVY }),
      cell('Go Live', { width: C2, bold: true, size: 22 }),
      cell('10%', { width: C3, align: AlignmentType.CENTER, bold: true, size: 24, color: AQUA }),
      cell('Production deployment on Merionettes-owned infrastructure. Complete source-code and brand-asset handover. Training session for the board and head coaches.', { width: C4, size: 20 }),
    ]}),
    new TableRow({ children: [
      cell('', { width: C1, fill: ICE }),
      cell('Total', { width: C2, bold: true, size: 22, fill: ICE, color: NAVY }),
      cell('100%', { width: C3, align: AlignmentType.CENTER, bold: true, size: 22, color: NAVY, fill: ICE }),
      cell('Settled in full on Go-Live milestone. No further payments due to Nile Technologies.', { width: C4, size: 20, fill: ICE, color: NAVY }),
    ]}),
  ]
});
children.push(payTable);

// 6.3 What is included
children.push(h2('6.3', 'What Is Included'));
children.push(bullet('All three role-tailored interfaces (Admin Console, Coach Interface, Parent Portal)'));
children.push(bullet('Full mobile-responsive design across phone, tablet, and desktop'));
children.push(bullet('Stripe payment-gateway integration'));
children.push(bullet('Twilio SMS integration'));
children.push(bullet('Hosting setup on a Merionettes-owned cloud account (the club retains administrative control of the cloud account)'));
children.push(bullet('Complete source-code handover with technical documentation'));
children.push(bullet('Sixty-day post-launch support window for bug fixes and minor adjustments'));
children.push(bullet('One in-person or video training session for the board and head coaches'));

// 6.4 Operating costs borne by the club
children.push(h2('6.4', 'Ongoing Operating Costs Borne by the Club'));
children.push(para(
  'The following ongoing costs are paid directly by the club to third-party providers — not to Nile Technologies — and reflect standard market rates that would apply on any modern operations platform.'
));
children.push(bbullet('Cloud hosting', 'approximately $15 per month, paid by the club to the chosen cloud provider (AWS, Google Cloud, or DigitalOcean).'));
children.push(bbullet('Stripe processing fees', 'one to two percent per transaction, the standard market rate for online payment processing.'));
children.push(bbullet('Twilio SMS fees', 'approximately $0.0075 per outgoing SMS message; volume dependent.'));

// 6.5 No revenue share / no recurring fees
children.push(h2('6.5', 'No Revenue Share · No Recurring Platform Fees'));
children.push(para([
  txt('Nile Technologies receives no revenue share, no per-user fee, no per-transaction fee, no annual subscription, no upgrade tier, and no recurring platform fee after the launch milestone is settled. ', { bold: true }),
  txt('The platform is the Merionettes\' asset in full, and the club retains one hundred percent of dues, competition fees, merchandise revenue, and any future monetisation opportunity that the platform enables.'),
]));

// ============================================================
// SECTION 7 — TIMELINE
// ============================================================
children.push(h1Page('7', 'Timeline'));

children.push(lead(
  'Total elapsed time of three calendar months from signed scope-of-work to live production deployment, structured across four phases.'
));

const T1 = 1900, T2 = 1100, T3 = 6360; // sum = 9360
const timeTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [T1, T2, T3],
  rows: [
    new TableRow({ tableHeader: true, children: [
      cell('PHASE',   { header: true, width: T1, color: 'FFFFFF', size: 18 }),
      cell('TIMING',  { header: true, width: T2, color: 'FFFFFF', size: 18, align: AlignmentType.CENTER }),
      cell('OUTPUT',  { header: true, width: T3, color: 'FFFFFF', size: 18 }),
    ]}),
    new TableRow({ children: [
      cell('Discovery & Design',       { width: T1, bold: true, size: 22 }),
      cell('Weeks 1–4',                 { width: T2, align: AlignmentType.CENTER, bold: true, color: AQUA, size: 22 }),
      cell('Final scope locked. UI/UX designs approved by the board. Database schema finalised. Milestone 2 payment due on board sign-off.', { width: T3, size: 20 }),
    ]}),
    new TableRow({ children: [
      cell('Core Development',         { width: T1, bold: true, size: 22 }),
      cell('Weeks 5–8',                 { width: T2, align: AlignmentType.CENTER, bold: true, color: AQUA, size: 22 }),
      cell('Admin Console core, Coach Interface core, Parent Portal core all built and unit-tested.', { width: T3, size: 20 }),
    ]}),
    new TableRow({ children: [
      cell('Integration & Testing',    { width: T1, bold: true, size: 22 }),
      cell('Weeks 9–11',                { width: T2, align: AlignmentType.CENTER, bold: true, color: AQUA, size: 22 }),
      cell('Stripe and Twilio integrations completed. Internal QA pass. Submission to the board for User-Acceptance Testing. Milestone 3 payment due.', { width: T3, size: 20 }),
    ]}),
    new TableRow({ children: [
      cell('Launch & Handover',        { width: T1, bold: true, size: 22 }),
      cell('Week 12',                   { width: T2, align: AlignmentType.CENTER, bold: true, color: AQUA, size: 22 }),
      cell('Production deployment on Merionettes-owned infrastructure. Source-code and brand-asset handover. Training session. Milestone 4 (Go-Live) payment due.', { width: T3, size: 20 }),
    ]}),
  ]
});
children.push(timeTable);

children.push(para([
  txt('Target launch: ', { color: TEXTMID }),
  txt('August 2026', { bold: true, color: NAVY }),
  txt(', aligned with the start of the club\'s fall season.', { color: TEXTMID }),
]));

// ============================================================
// SECTION 8 — ABOUT NILE TECHNOLOGIES
// ============================================================
children.push(h1Page('8', 'About Nile Technologies'));

children.push(lead(
  'Nile Technologies is a fifteen-year-old custom software development partner, founded by an ex-Oracle Senior Director and currently delivering across three practice areas from a development centre in New Delhi.'
));

children.push(h3('Company background'));
children.push(para(
  'Nile Technologies was founded in 2011 by an ex-Oracle Senior Director as an Oracle implementation partner serving large corporate clients. From 2016 onward, the company expanded into custom web and mobile development for small-to-mid-sized businesses, non-profits, and start-ups across the United States and globally. The team — approximately one hundred personnel — operates from Nile\'s development centre in New Delhi, India, with project management aligned to U.S. business hours.'
));

children.push(h3('Practice areas'));
children.push(bbullet('Enterprise', 'Oracle implementation services for large corporates — the company\'s origin practice.'));
children.push(bbullet('Web & Mobile', 'Custom application development for small-to-mid-sized organisations, non-profits, and startups. The Merionettes engagement falls within this practice.'));
children.push(bbullet('AI', 'Custom AI agents, chatbots, and AI-driven business assistants.'));

children.push(h3('Relevant Engagements'));
children.push(para('Three engagements particularly relevant to the operational model of a synchronised-swimming club:'));

children.push(h3('Shaolin Kung Fu Institute'));
children.push(para([
  txt('Scale: ', { bold: true }),
  txt('approximately one thousand students across five physical locations.'),
]));
children.push(para([
  txt('Engagement: ', { bold: true }),
  txt('multi-tiered operations system — master administrator console (group-wide), per-location administrator console, coach interface, and student interface. Encompasses attendance marking, monthly recurring billing, skill tracking against the institute\'s curriculum, parent portal, and inventory management for uniform sales. The closest analogue in the company\'s portfolio to the Merionettes engagement in terms of workflow.'),
]));

children.push(h3('Royal Personal Training'));
children.push(para([
  txt('Scale: ', { bold: true }),
  txt('boutique appointment-based fitness studio.'),
]));
children.push(para([
  txt('Engagement: ', { bold: true }),
  txt('booking-based operations system. Client class-pack model (sixteen or twenty classes purchased per cycle and consumed via appointment booking), point-of-sale, CRM with auto-renewal nudges and at-risk client identification, communication automation.'),
]));

children.push(h3('Member Gym Operations'));
children.push(para([
  txt('Scale: ', { bold: true }),
  txt('recurring-membership gym.'),
]));
children.push(para([
  txt('Engagement: ', { bold: true }),
  txt('operations system covering monthly recurring billing, batch and trainer scheduling, attendance marking, retail inventory for branded merchandise. Same operational DNA as the Merionettes engagement.'),
]));

children.push(h3('Website'));
children.push(para([
  txt('niletechnologies.com', { color: AQUA, bold: true }),
]));

// ============================================================
// SECTION 9 — NEXT STEPS
// ============================================================
children.push(h1Page('9', 'Next Steps'));

children.push(lead(
  'The path from this proposal to launch is structured across five discrete steps.'
));

children.push(bbullet('Step 1 · Board review', 'review of this proposal by the SF Merionettes Board.'));
children.push(bbullet('Step 2 · Scope confirmation', 'confirmation of final scope-of-work, including any adjustments to the optional modules referenced in Section 6.1.'));
children.push(bbullet('Step 3 · Engagement letter', 'signed engagement letter between the SF Merionettes and Nile Technologies.'));
children.push(bbullet('Step 4 · Deposit', '30% deposit ($3,000–$3,600 depending on agreed scope) marking project commencement.'));
children.push(bbullet('Step 5 · Kickoff', 'project kickoff within five business days of deposit receipt. Three-month build cycle commences.'));

children.push(para([txt('Target launch date: ', { color: TEXTMID }), txt('August 2026', { bold: true, color: NAVY }), txt('.', { color: TEXTMID })]));

children.push(hr());

children.push(para([
  txt('Contact for questions, scope discussion, or scheduling: ', { color: TEXTMID }),
]));
children.push(para([
  txt('Aaditya Kapoor', { bold: true }),
  txt(' · aaditya@niletechnologies.com', { color: TEXTMID }),
]));
children.push(para([
  txt('Sanju Kapoor', { bold: true }),
  txt(' · sanju@niletechnologies.com', { color: TEXTMID }),
]));
children.push(para([
  txt('niletechnologies.com', { color: AQUA, bold: true }),
]));

// ────────────────────────────────────────────────────────────
// Build document
// ────────────────────────────────────────────────────────────
const doc = new Document({
  creator: 'Nile Technologies',
  title: 'SF Merionettes — Operations System Proposal',
  description: 'Custom web portal proposal for the San Francisco Merionettes Board',

  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 22 } } // 11pt default
    },
    paragraphStyles: [
      {
        id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, font: 'Calibri', color: NAVY },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 }
      },
      {
        id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, font: 'Calibri', color: NAVY },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 }
      },
      {
        id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 22, bold: true, font: 'Calibri', color: TEXT },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 }
      }
    ]
  },

  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [
          {
            level: 0, format: LevelFormat.BULLET, text: '•',
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 540, hanging: 270 } } }
          }
        ]
      }
    ]
  },

  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: PAGE_H },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [
              txt('SF MERIONETTES  ·  OPERATIONS SYSTEM PROPOSAL', { size: 16, color: MUTED, characterSpacing: 50 }),
              txt('\t'),
              txt('Nile Technologies  ·  May 2026', { size: 16, color: MUTED }),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: AQUA, space: 6 } },
            spacing: { after: 60 },
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            children: [
              txt('Confidential  ·  Prepared for the SF Merionettes Board', { size: 16, color: MUTED }),
              txt('\t'),
              txt('Page ', { size: 16, color: MUTED }),
              new TextRun({ children: [PageNumber.CURRENT], size: 16, color: MUTED, font: 'Calibri' }),
              txt(' of ', { size: 16, color: MUTED }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: MUTED, font: 'Calibri' }),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: BORDER, space: 6 } },
            spacing: { before: 60 },
          })
        ]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  const out = path.join(__dirname, '..', 'SFM-Proposal.docx');
  fs.writeFileSync(out, buf);
  console.log('✓ Built: SFM-Proposal.docx  (' + (buf.length/1024).toFixed(0) + ' KB)');
}).catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
