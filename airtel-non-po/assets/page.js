/* Page shell for the one-file-per-page wireframes.
   Each page:  <body>  <script src="../assets/kit.js"></script> <script src="../assets/page.js"></script>
               <script> Page.render({ module: 'pa', id: 'pa-03', user: 'B0GPA204', role: 'GPA analyst', states: [...], html: ... }) </script>
   Builds the wireframe bar, the Airtel shell (rail menu, header, footer) and wires clicks (links, tabs, modals,
   collapsible sections, checkboxes, toasts, tooltips, chart table view). */
(function (G) {
  'use strict';
  var UI = G.UI;

  var MODULES = {
    pa: {
      title: 'Provisioning & Actualization',
      pages: [
        { id: 'pa-01', file: 'pa-01-sign-in.html', name: 'Sign-in', desc: 'Airtel single sign-on (Azure AD with MFA) and role selection.' },
        { id: 'pa-02', file: 'pa-02-home.html', name: 'Home', desc: 'Role-based work page: tasks, approvals, reminders, posting errors, open provision summary.' },
        { id: 'pa-03', file: 'pa-03-provision-register.html', name: 'Provision register', desc: 'All provisions with lifecycle status, URN, ageing, missing-month flags, filters and export.' },
        { id: 'pa-04', file: 'pa-04-create-provision.html', name: 'Create provision', desc: 'Single entry: activity drives the scenario; master defaults, validations, duplicate check, URN and journal preview.' },
        { id: 'pa-05', file: 'pa-05-bulk-upload.html', name: 'Bulk upload', desc: 'Template per activity, row-level validation, submit valid rows, other TOCO input formats.' },
        { id: 'pa-06', file: 'pa-06-toco-darts.html', name: 'TOCO / DARTS provisions', desc: 'DARTS feed with Post to ERP, site-level provisions, debit-note provisions and reversals.' },
        { id: 'pa-07', file: 'pa-07-approvals.html', name: 'Approvals inbox', desc: 'DOA approvals, CFR approvals, notification-only items, SLA and delegation.' },
        { id: 'pa-08', file: 'pa-08-approval-review.html', name: 'Approval review', desc: 'Review one provision: lines, calculation, duplicates, attachments; approve, return or reject.' },
        { id: 'pa-09', file: 'pa-09-provision-detail.html', name: 'Provision detail (URN)', desc: 'One URN end to end: lines, journals, Oracle references, invoices matched, prepaid, ageing, audit.' },
        { id: 'pa-10', file: 'pa-10-journal-posting.html', name: 'Journal posting & errors', desc: 'Staging, GL interface, Journal Import, posting by GPA manager; error queue, retry, reconciliation.' },
        { id: 'pa-11', file: 'pa-11-calendar-suggestions.html', name: 'Calendar & suggestions', desc: 'Expected vs raised provisions by month, reminders and auto provision suggestions.' },
        { id: 'pa-12', file: 'pa-12-matching-workbench.html', name: 'Matching workbench', desc: 'Invoices against provisions: exact, nearest (incl. PAN), force match, unmatched, excess, FIFO, BU reclass.' },
        { id: 'pa-13', file: 'pa-13-prepaid-deferment.html', name: 'Prepaid & deferment', desc: 'Prepaid schedules, current / non-current split, monthly release, deferment parameters (scenario 4).' },
        { id: 'pa-14', file: 'pa-14-ageing-reversal.html', name: 'Ageing, reversal & year-end', desc: 'Ageing buckets and escalations, PBR reversal run, holds, force reversal / closure, hits and YEP.' },
        { id: 'pa-15', file: 'pa-15-po-linked.html', name: 'PO raised after provision', desc: 'Daily PO fetch: provisions with a PO raised in Oracle, link, reverse and route to the PO process.' },
        { id: 'pa-16', file: 'pa-16-financial-flash.html', name: 'Financial flash', desc: 'Prior-month trial balance / FSG with today\'s provisions, reversals and adjustments overlaid.' },
        { id: 'pa-17', file: 'pa-17-dashboards.html', name: 'Dashboards', desc: 'Executive, finance, segment (TOCO) and matching-health dashboards.' },
        { id: 'pa-18', file: 'pa-18-reports.html', name: 'Reports', desc: 'Operational reports, ERP report enhancements and Portal-vs-ERP reconciliation.' },
        { id: 'pa-19', file: 'pa-19-masters-config.html', name: 'Masters & configuration', desc: 'Activity master, URN builder, allocation and deferment, prepaid GL list, PBR window, BU reclass, ERP-synced masters.' },
        { id: 'pa-20', file: 'pa-20-notifications.html', name: 'Notifications', desc: 'Approvals, returns, reminders, ageing escalations, posting failures.' },
        { id: 'pa-21', file: 'pa-21-users-roles.html', name: 'Users, roles & access', desc: 'Users from SSO and HRMS, roles, data scope (entity, BU, department), delegation, segregation of duties.' },
        { id: 'pa-22', file: 'pa-22-data-migration.html', name: 'Data migration', desc: 'Open provisions brought over at go-live: template, validation, reconciliation, load status.' }
      ],
      menu: [
        { group: '', items: ['pa-02', 'pa-07', 'pa-20'] },
        { group: 'Provisions', items: ['pa-03', 'pa-04', 'pa-05', 'pa-06', 'pa-11'] },
        { group: 'Oracle posting', items: ['pa-10'] },
        { group: 'Actualization', items: ['pa-12', 'pa-13', 'pa-14', 'pa-15'] },
        { group: 'Insights', items: ['pa-16', 'pa-17', 'pa-18'] },
        { group: 'Administration', items: ['pa-19', 'pa-21', 'pa-22'] }
      ],
      icons: [
        { key: 'notifications', icon: 'bell', label: 'Notification', go: 'pa-20', badge: 6 },
        { key: 'approvals', icon: 'check', label: 'Approvals', go: 'pa-07', badge: 4 },
        { key: 'profile', icon: 'user', label: 'Profile', toast: 'Profile: roles, entity and BU scope from single sign-on' },
        { key: 'logout', icon: 'logout', label: 'Logout', go: 'pa-01' }
      ],
      home: 'pa-02',
      // Proposed access by role (derived from the approved HLD roles, section 3.3) - to be confirmed by Airtel.
      roles: [
        { id: 'maker', name: 'Business user (maker)', user: 'B0MKR412', desc: 'User departments: raise provisions, act on reminders' },
        { id: 'checker', name: 'Approver (DOA)', user: 'B0CHK155', desc: 'Approves provisions routed to them by the DOA API' },
        { id: 'bfin', name: 'Business finance', user: 'B0BFN017', desc: 'Rule-based inputs, allocation, deferment, review' },
        { id: 'gpa', name: 'GPA analyst', user: 'B0GPA204', desc: 'Provisioning accounting: matching, holds, PBR, masters' },
        { id: 'gpam', name: 'GPA manager', user: 'B0GPM031', desc: 'Posts journals in Oracle (final control gate)' },
        { id: 'cfr', name: 'CFR', user: 'B0CFR007', desc: 'New BU / GL / OU, force closure and reversal, holds' },
        { id: 'ace', name: 'ACE / Controller', user: 'B0ACE003', desc: 'Central processing; final ageing escalation' },
        { id: 'p2p', name: 'P2P team', user: 'B0P2P114', desc: 'Invoice booking; matching; TOCO debit notes' },
        { id: 'toco', name: 'NSG / SCM / B2B teams', user: 'B0NSG021', desc: 'TOCO inputs: de-loading, exit penalty, MSC' },
        { id: 'aio', name: 'AIO', user: 'B0AIO009', desc: 'VTM subscriber counts' },
        { id: 'lead', name: 'Finance leadership', user: 'B0LDR002', desc: 'Dashboards, flash, reports' },
        { id: 'audit', name: 'Audit', user: 'B0AUD005', desc: 'Read-only: reports and audit trail' },
        { id: 'admin', name: 'Portal administrator', user: 'B0ADM001', desc: 'Users, roles and access' }
      ],
      // page -> [roles who work on it, roles who view only, note]
      access: {
        'pa-01': ['*', '', ''],
        'pa-02': ['*', '', 'Content changes by role'],
        'pa-03': ['maker bfin gpa ace', 'checker gpam cfr lead audit', 'Records limited to the user\'s entity, BU and department'],
        'pa-04': ['maker bfin gpa ace', '', 'Business finance and GPA raise the rule-based scenarios'],
        'pa-05': ['maker bfin gpa ace toco', '', 'NSG / SCM / B2B upload their TOCO inputs only'],
        'pa-06': ['gpa ace', 'gpam p2p', 'GPA posts the DARTS feed to ERP'],
        'pa-07': ['checker cfr', '', 'Includes absence delegates'],
        'pa-08': ['checker cfr', '', 'Nobody approves a provision they raised'],
        'pa-09': ['maker gpa ace', 'bfin checker gpam cfr lead audit', 'GPA: hold, link PO; maker and GPA: request force closure or reversal'],
        'pa-10': ['gpa gpam', '', 'Analyst corrects and retries; manager posts in Oracle'],
        'pa-11': ['maker bfin gpa ace', 'checker', ''],
        'pa-12': ['gpa p2p ace', '', ''],
        'pa-13': ['gpa bfin', '', 'Business finance maintains deferment parameters'],
        'pa-14': ['gpa cfr', 'ace', 'GPA runs PBR and places holds; CFR approves'],
        'pa-15': ['gpa ace', '', ''],
        'pa-16': ['', 'maker bfin gpa cfr lead', ''],
        'pa-17': ['', 'maker checker bfin gpa gpam cfr ace p2p lead audit', 'Leadership sees all data; others their own scope'],
        'pa-18': ['maker checker bfin gpa cfr ace p2p', 'lead audit', 'Each report has its own users (HLD Table 24); audit uses the audit trail and provision vs actual reports'],
        'pa-19': ['gpa bfin cfr p2p toco aio', 'admin', 'AIO: VTM subscribers only; P2P: TOCO DN master; business teams and CFR: allocation %; business finance: deferment'],
        'pa-20': ['*', '', 'Each user sees their own'],
        'pa-21': ['admin', '', 'Admin rights to be confirmed by the P2P team; controls to be checked with GRC'],
        'pa-22': ['gpa admin', '', 'With the IT team']
      }
    },
    inv: {
      title: 'Non-PO Invoicing',
      pages: [
        { id: 'inv-01', file: 'inv-01-sign-in.html', name: 'Sign-in', desc: 'Partners: email ID, password and OTP to the registered mobile. Airtel users: single sign-on and role selection.' },
        { id: 'inv-02', file: 'inv-02-home.html', name: 'Home', desc: 'Partners: invoice overview by status, action banner, recent invoices. Airtel users: role-based work page.' },
        { id: 'inv-03', file: 'inv-03-submit-invoice.html', name: 'Submit invoice', desc: 'Choose the family and sub-category; approval route and SLA per category; single, bulk or bulk attachments; on-behalf submission.' },
        { id: 'inv-04', file: 'inv-04-pm-invoice.html', name: 'Property Manager invoice', desc: 'Locator-wise invoice form for Central / Local ToCo, Bandwidth, LL_EB, LL Rent SD, Govt demand note and Diesel knock-off.' },
        { id: 'inv-05', file: 'inv-05-ap-invoice.html', name: 'AP / Rush invoice', desc: 'Document-wise invoice form for Rush, ROW, SACFA, Legal, CAF, BSNL, advances, group company, IUC, bank charges, credit notes and others.' },
        { id: 'inv-06', file: 'inv-06-landlord-gst.html', name: 'Landlord GST invoice', desc: 'GST invoice against a paid rent voucher: lease selection, rent-paid check, GST capping, two-line booking.' },
        { id: 'inv-07', file: 'inv-07-debit-note.html', name: 'Debit / credit note', desc: 'ToCo debit, finance and credit notes and reversals (two-stage), manual debit notes, GST non-compliance debit notes.' },
        { id: 'inv-08', file: 'inv-08-bulk-upload.html', name: 'Bulk upload', desc: 'Category templates, locator-wise PM uploads, bulk attachments by Group ID, bulk IRN, row-level results, Tax team file.' },
        { id: 'inv-09', file: 'inv-09-invoice-tracker.html', name: 'Invoice tracker', desc: 'Every invoice with status, reason, SLA and ageing; filters and export; own invoices for partners, circle scope for Airtel users.' },
        { id: 'inv-10', file: 'inv-10-action-required.html', name: 'Action required', desc: 'Respond to information requests, correct and resubmit, replace documents, fix locator issues.' },
        { id: 'inv-11', file: 'inv-11-invoice-detail.html', name: 'Invoice detail', desc: 'One invoice end to end: status history, documents, booking lines, Oracle references, approvals, payment and audit trail.' },
        { id: 'inv-12', file: 'inv-12-leases-vouchers.html', name: 'Leases & rent vouchers', desc: 'Landlord leases, rent vouchers paid or unpaid, GST already claimed; submit a landlord GST invoice against a voucher.' },
        { id: 'inv-13', file: 'inv-13-work-queues.html', name: 'Work queues', desc: 'Under validation, manual queue by reason, Rush and Hold; SLA timers, assignment and bulk actions for PHD / AP.' },
        { id: 'inv-14', file: 'inv-14-invoice-review.html', name: 'Invoice review', desc: 'PHD / AP review: document viewer, OCR vs input vs master, 18-point checklist, category checks; approve, RFI, reject or hold.' },
        { id: 'inv-15', file: 'inv-15-locator-exceptions.html', name: 'Locator exceptions', desc: 'Lines with locator not found or inactive; whole invoice withheld; activation request and re-trigger.' },
        { id: 'inv-16', file: 'inv-16-approvals.html', name: 'Approvals inbox', desc: 'AP invoices approved on the portal before booking: DOA approvals, force approvals with NFA evidence, exception approvals.' },
        { id: 'inv-17', file: 'inv-17-approval-review.html', name: 'Approval review', desc: 'Approve one AP invoice or debit note: DOA route, NFA check, documents; approve, return or reject.' },
        { id: 'inv-18', file: 'inv-18-erp-booking.html', name: 'ERP booking monitor', desc: 'Booking batches by OU: PM upload, OWCC attachments, Send for Approval; AP import, barcode; ToCo CN / DN two-stage; errors and retry.' },
        { id: 'inv-19', file: 'inv-19-dashboards.html', name: 'Dashboards', desc: 'Processing status, Rush against SLA, pending and ageing, escalations, exceptions.' },
        { id: 'inv-20', file: 'inv-20-reports.html', name: 'Reports', desc: 'Pending, Rush, ageing, rejected, GL actualization status, hourly AP error report, Portal vs ERP.' },
        { id: 'inv-21', file: 'inv-21-master-data.html', name: 'Master data', desc: 'PN site attribute, locator, ToCo, PM, opex head, vendor site, TDS, cost sheet, Quality Plan, item codes, Tax team lists.' },
        { id: 'inv-22', file: 'inv-22-configuration.html', name: 'Invoicing configuration', desc: 'Category matrix, templates, tolerances, SLA and escalation, Rush scenarios, reverse-charge list, document number rules.' },
        { id: 'inv-23', file: 'inv-23-users-roles.html', name: 'Users, roles & access', desc: 'Partners mapped to vendor codes, circle and central users, PHD / AP teams, approvers, admin rights, segregation of duties.' },
        { id: 'inv-24', file: 'inv-24-notifications.html', name: 'Notifications', desc: 'Submission alerts, information requests, rejections, exceptions, escalations, approvals and payments.' }
      ],
      menu: [
        { group: '', items: ['inv-02', 'inv-16', 'inv-24'] },
        { group: 'Invoices', items: ['inv-03', 'inv-08', 'inv-09', 'inv-10', 'inv-12'] },
        { group: 'Back office', items: ['inv-13', 'inv-15', 'inv-18'] },
        { group: 'Insights', items: ['inv-19', 'inv-20'] },
        { group: 'Administration', items: ['inv-21', 'inv-22', 'inv-23'] }
      ],
      icons: [
        { key: 'notifications', icon: 'bell', label: 'Notification', go: 'inv-24', badge: 5 },
        { key: 'approvals', icon: 'check', label: 'Approvals', go: 'inv-16', badge: 6 },
        { key: 'profile', icon: 'user', label: 'Profile', toast: 'Profile: partner details from the Partner Portal and the Oracle supplier master; Airtel users: roles and circle scope' },
        { key: 'logout', icon: 'logout', label: 'Logout', go: 'inv-01' }
      ],
      home: 'inv-02',
      // Partner layout (PO Partner Portal): invoice overview counts and red action links in the rail
      partner: {
        counts: function (R) { return G.INV && G.INV.railCounts ? G.INV.railCounts(R) : null; },
        stats: [
          { key: 'overall', value: '46', label: 'Overall invoices', go: 'inv-09' },
          { key: 'draft', value: '3', label: 'Draft invoices', go: 'inv-09?state=draft' },
          { key: 'action', value: '2', label: 'Action required', go: 'inv-10' },
          { key: 'hold', value: '1', label: 'On hold invoices', go: 'inv-09?state=hold' }
        ],
        links: [
          { label: 'Submit invoice', go: 'inv-03' }, { label: 'Bulk upload', go: 'inv-08' }, { label: 'Track invoices', go: 'inv-09' },
          { label: 'Respond to requests', go: 'inv-10' }, { label: 'My leases & rent vouchers', go: 'inv-12' }
        ]
      },
      // Proposed access by role (derived from the approved HLD, sections 3.3 and 5.1) - to be confirmed by Airtel.
      roles: [
        { id: 'vendor', name: 'Vendor (partner)', user: 'Shree Ganesh Infra Services', group: 'Partners', layout: 'partner', desc: 'Submits and tracks own invoices; responds to information requests' },
        { id: 'toco', name: 'Central ToCo vendor', user: 'Indus Towers Ltd', group: 'Partners', layout: 'partner', desc: 'Centralised ToCo vendor user: bulk locator-wise invoices for all circles' },
        { id: 'landlord', name: 'Landlord', user: 'R K Estates', group: 'Partners', layout: 'partner', desc: 'Landlord GST invoices against paid rent vouchers' },
        { id: 'circle', name: 'Circle user', user: 'B0UPE118', group: 'Airtel users', desc: 'Submits for own circle only, on behalf of vendors and landlords; resolves locator issues' },
        { id: 'central', name: 'Central user', user: 'B0CEN021', group: 'Airtel users', desc: 'Submits invoices for any circle' },
        { id: 'phd', name: 'PHD / AP analyst', user: 'B0PHD307', group: 'Airtel users', desc: 'Work queues, invoice review, exceptions, booking monitor; force approvals with NFA evidence' },
        { id: 'apm', name: 'AP manager', user: 'B0APM044', group: 'Airtel users', desc: 'Team queues and SLA; L1 / L2 escalation level' },
        { id: 'approver', name: 'Business approver (DOA)', user: 'B0APR219', group: 'Airtel users', desc: 'Approves AP invoices routed under the DOA matrix' },
        { id: 'tax', name: 'Tax team', user: 'B0TAX015', group: 'Airtel users', desc: 'GST non-compliance debit notes; non-compliant vendor list' },
        { id: 'fin', name: 'Finance (BPA / CFR head)', user: 'B0FIN008', group: 'Airtel users', desc: 'Exception approvals (old period, long invoice numbers); L3 escalation; dashboards' },
        { id: 'p2p', name: 'P2P master owner', user: 'B0P2P114', group: 'Airtel users', desc: 'Maintains masters and invoicing configuration' },
        { id: 'audit', name: 'Audit', user: 'B0AUD005', group: 'Airtel users', desc: 'Read-only: reports and audit trail' },
        { id: 'admin', name: 'Portal administrator', user: 'B0ADM001', group: 'Airtel users', desc: 'Users, roles and access' }
      ],
      // page -> [roles who work on it, roles who view only, note]
      access: {
        'inv-01': ['*', '', ''],
        'inv-02': ['*', '', 'Partners see the invoice overview; Airtel users a role-based work page'],
        'inv-03': ['vendor toco landlord circle central phd', '', 'Circle users submit for their own circle only; PHD / AP resubmit ToCo invoices that failed for internal reasons'],
        'inv-04': ['vendor toco circle central phd', '', 'Central ToCo invoices from the centralised vendor user; other PM sub-categories mostly by circle users'],
        'inv-05': ['circle central phd', '', 'Airtel users only, submitting on the vendor\'s behalf (to be confirmed by Airtel)'],
        'inv-06': ['landlord circle central phd', '', 'Circle users submit on behalf of landlords who do not use the portal'],
        'inv-07': ['circle central phd tax', '', 'Tax team: GST non-compliance debit notes only'],
        'inv-08': ['vendor toco circle central phd tax', '', 'Tax team: GST non-compliance file only'],
        'inv-09': ['vendor toco landlord circle central phd apm', 'approver tax fin audit', 'Partners see their own invoices; circle users their circle'],
        'inv-10': ['vendor toco landlord circle central phd', '', ''],
        'inv-11': ['phd apm', 'vendor toco landlord circle central approver tax fin audit', 'Partners see status, documents and payment; internal tabs for Airtel users'],
        'inv-12': ['landlord circle', 'central phd', ''],
        'inv-13': ['phd apm', 'fin', ''],
        'inv-14': ['phd apm', '', 'The submitter of an invoice cannot review or approve it'],
        'inv-15': ['phd circle central', 'apm', 'Circle users arrange or activate locators for their circle'],
        'inv-16': ['approver phd fin', 'apm', 'PHD / AP record force approvals against the NFA; Finance approves exceptions'],
        'inv-17': ['approver phd fin', '', 'Nobody approves an invoice they submitted'],
        'inv-18': ['phd apm', 'p2p fin', ''],
        'inv-19': ['', 'circle central phd apm approver tax fin p2p audit', 'Circle users see their circle'],
        'inv-20': ['circle central phd apm tax fin p2p', 'audit', ''],
        'inv-21': ['p2p tax', 'phd apm admin', 'Masters configurable by the P2P team only; Tax team maintains its lists'],
        'inv-22': ['p2p', 'phd apm fin', ''],
        'inv-23': ['admin', 'p2p', 'Admin rights to be confirmed by the P2P team; controls to be checked with GRC'],
        'inv-24': ['*', '', 'Each user sees their own']
      },
      accessSub: 'Non-PO Invoicing is used by partners (vendors, the central ToCo vendor and landlords, signing in with email, password and OTP) and by Airtel users (single sign-on).',
      accessNote: 'The approved HLD lists the user types (section 5.1) and stakeholders (section 3.3) but not page-level access. Admin rights are to be confirmed by the P2P team and access controls checked with GRC.',
      accessRules: [
        { icon: 'filter', title: 'Data scope', text: 'Partners see only their own invoices (vendor codes mapped to their partner login). Circle users see and submit for their own circle; central users and PHD / AP teams see all circles they are mapped to.' },
        { icon: 'users', title: 'Separation of duties', text: 'The person who submits an invoice cannot approve it. Every force approval carries an NFA or approval email as evidence. An AP invoice is booked only after all its approvals are complete.' },
        { icon: 'history', title: 'Audit trail', text: 'Every submission, correction, override (such as the duplicate bypass flag), approval and status change is recorded with user, date and time.' }
      ]
    }
  };

  /* ------------------------------------------------------------ roles and access */
  function modKey(mod) { return Object.keys(MODULES).filter(function (k) { return MODULES[k] === mod; })[0]; }
  function roleById(mod, id) { return (mod.roles || []).filter(function (r) { return r.id === id; })[0]; }
  // 'w' works on it, 'v' view only, '' no access
  function accessOf(mod, pid, rid) {
    var a = (mod.access || {})[pid];
    if (!a) return 'w';
    var has = function (list) { return list === '*' || (' ' + list + ' ').indexOf(' ' + rid + ' ') >= 0; };
    return has(a[0]) ? 'w' : has(a[1]) ? 'v' : '';
  }
  function roleFromLabel(mod, s) {
    s = String(s || '').toLowerCase();
    var map = [['maker', 'maker'], ['checker', 'checker'], ['gpa manager', 'gpam'], ['cfr', 'cfr'], ['business finance', 'bfin'], ['leadership', 'lead'], ['administrator', 'admin'], ['audit', 'audit'], ['gpa', 'gpa']];
    for (var i = 0; i < map.length; i++) if (s.indexOf(map[i][0]) >= 0 && roleById(mod, map[i][1])) return map[i][1];
    return roleById(mod, 'gpa') ? 'gpa' : ((mod.roles && mod.roles[0]) ? mod.roles[0].id : '');
  }
  function chosenRole(mod) {
    var k = modKey(mod), q = param('role'), id = '';
    try {
      if (q) { if (q === 'default') localStorage.removeItem('wf-role-' + k); else localStorage.setItem('wf-role-' + k, q); }
      id = localStorage.getItem('wf-role-' + k) || '';
    } catch (e) { id = q && q !== 'default' ? q : ''; }
    return roleById(mod, id) || null;
  }

  function moduleOf(id) { return MODULES[String(id || '').split('-')[0]] || MODULES.pa; }
  function pageOf(id) { var m = moduleOf(id); return m.pages.filter(function (p) { return p.id === id; })[0]; }
  function href(target) {
    if (!target) return null;
    if (/\.html/.test(target) || target.charAt(0) === '#') return target;
    if (target.charAt(0) === '?') return location.pathname.split('/').pop() + target;
    var qi = target.indexOf('?'), id = qi >= 0 ? target.slice(0, qi) : target, q = qi >= 0 ? target.slice(qi) : '';
    var p = pageOf(id);
    return p ? p.file + q : null;
  }
  function param(name) {
    var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(location.search);
    return m ? decodeURIComponent(m[1]) : '';
  }
  // query parameters a page keeps when its state or role changes (e.g. the invoice category: Page.render({ keep: ['cat'] }))
  var KEEP = [];
  function keepParts(skip) {
    return KEEP.filter(function (k) { return k !== skip && param(k); }).map(function (k) { return k + '=' + encodeURIComponent(param(k)); });
  }
  function qs(parts) { parts = parts.filter(Boolean); return parts.length ? '?' + parts.join('&') : ''; }

  var tipEl, toastEl;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.hidden = false;
    clearTimeout(toast.t); toast.t = setTimeout(function () { toastEl.hidden = true; }, 2600);
  }
  function activateTab(key) {
    var grp = key.split(':')[0];
    Array.prototype.forEach.call(document.querySelectorAll('[data-tab^="' + grp + ':"]'), function (t) { t.classList.toggle('is-active', t.getAttribute('data-tab') === key); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-panel^="' + grp + ':"]'), function (p) { p.hidden = p.getAttribute('data-panel') !== key; });
  }
  function onClick(e) {
    var t = e.target;
    var tab = t.closest('[data-tab]'); if (tab) { activateTab(tab.getAttribute('data-tab')); return; }
    var sec = t.closest('[data-sec-toggle]');
    if (sec) { var s = sec.closest('.k-sec'); s.classList.toggle('is-collapsed'); sec.innerHTML = s.classList.contains('is-collapsed') ? '+' : '&minus;'; return; }
    var ct = t.closest('[data-chart-table]');
    if (ct) {
      var id = ct.getAttribute('data-chart-table'), v = document.querySelector('[data-chart-view="' + id + '"]'), tb = document.querySelector('[data-chart-tbl="' + id + '"]');
      var showT = tb.hidden; tb.hidden = !showT; v.hidden = showT; ct.lastChild.textContent = showT ? 'Chart view' : 'Table view'; return;
    }
    var chk = t.closest('[data-check]');
    if (chk && !chk.hasAttribute('data-go') && !chk.hasAttribute('data-state')) {
      if (chk.getAttribute('data-check') === 'radio') {
        Array.prototype.forEach.call(chk.parentNode.querySelectorAll('[data-check="radio"]'), function (c) { c.classList.remove('is-on'); });
        chk.classList.add('is-on');
      } else chk.classList.toggle('is-on');
      return;
    }
    var cl = t.closest('[data-close]');
    if (cl) { var box = cl.closest('[data-modal-id],[data-drawer-id]'); if (box) box.hidden = true; if (!cl.hasAttribute('data-go') && !cl.hasAttribute('data-toast') && !cl.hasAttribute('data-state')) return; }
    var mo = t.closest('[data-modal]'); if (mo) { var m = document.querySelector('[data-modal-id="' + mo.getAttribute('data-modal') + '"]'); if (m) m.hidden = false; return; }
    var dr = t.closest('[data-drawer]'); if (dr) { var d = document.querySelector('[data-drawer-id="' + dr.getAttribute('data-drawer') + '"]'); if (d) d.hidden = false; return; }
    var st = t.closest('[data-state]');
    if (st) { var v2 = st.getAttribute('data-state'); location.search = qs([v2 && v2 !== 'none' ? 'state=' + encodeURIComponent(v2) : ''].concat(keepParts())); return; }
    var go = t.closest('[data-go]');
    if (go) { var h = href(go.getAttribute('data-go')); if (h) { e.preventDefault(); location.href = h; } else toast('Not part of this wireframe set'); return; }
    var ts = t.closest('[data-toast]'); if (ts) { toast(ts.getAttribute('data-toast')); return; }
    var back = t.closest('.k-modal-back'); if (back && t === back) back.hidden = true;
  }
  function onOver(e) {
    var t = e.target.closest && e.target.closest('[data-tip]');
    if (!t) { tipEl.hidden = true; return; }
    tipEl.textContent = t.getAttribute('data-tip'); tipEl.hidden = false;
    var x = e.clientX + 12, y = e.clientY + 14;
    if (x + tipEl.offsetWidth > innerWidth - 8) x = innerWidth - tipEl.offsetWidth - 8;
    tipEl.style.left = x + 'px'; tipEl.style.top = y + 'px';
  }
  function wire() {
    // requirement tags: shows 'to be confirmed' markers and system-behaviour notes; remembered across pages, ?reqs=1 / ?reqs=0 sets it
    var rq = param('reqs');
    try { if (rq) localStorage.setItem('wf-reqs', rq === '1' ? '1' : ''); else rq = localStorage.getItem('wf-reqs'); } catch (x) { /* storage unavailable */ }
    document.body.classList.toggle('show-reqs', rq === '1');
    Array.prototype.forEach.call(document.querySelectorAll('[data-wf-reqs]'), function (c) { c.checked = rq === '1'; });
    document.addEventListener('change', function (e) {
      if (!(e.target.matches && e.target.matches('[data-wf-reqs]'))) return;
      document.body.classList.toggle('show-reqs', e.target.checked);
      try { localStorage.setItem('wf-reqs', e.target.checked ? '1' : ''); } catch (x) { /* storage unavailable */ }
    });
    document.addEventListener('change', function (e) {
      var sel = e.target.closest && e.target.closest('[data-wf-role]');
      if (!sel) return;
      var k = sel.getAttribute('data-wf-role'), v = sel.value;
      try { if (v) localStorage.setItem('wf-role-' + k, v); else localStorage.removeItem('wf-role-' + k); } catch (x) { /* storage unavailable */ }
      var st = param('state');
      location.href = location.pathname.split('/').pop() + qs(['role=' + (v || 'default'), st ? 'state=' + encodeURIComponent(st) : ''].concat(keepParts()));
    });
    tipEl = document.createElement('div'); tipEl.className = 'k-tip'; tipEl.hidden = true; document.body.appendChild(tipEl);
    toastEl = document.createElement('div'); toastEl.className = 'k-tip k-toast'; toastEl.hidden = true; document.body.appendChild(toastEl);
    document.addEventListener('click', onClick);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') Array.prototype.forEach.call(document.querySelectorAll('.k-modal-back,.k-drawer'), function (m) { m.hidden = true; });
    });
  }

  function roleSelect(mod, chosen, defId) {
    if (!(mod.roles || []).length) return '';
    var def = roleById(mod, defId), groups = [];
    mod.roles.forEach(function (r) { if (groups.indexOf(r.group || '') < 0) groups.push(r.group || ''); });
    var opt = function (r) { return '<option value="' + r.id + '"' + (chosen && chosen.id === r.id ? ' selected' : '') + '>' + UI.esc(r.name) + '</option>'; };
    return '<label class="wn-role">Role <select data-wf-role="' + modKey(mod) + '" title="See the portal as this role: the menu shows only the pages the role can open">' +
      '<option value="">Page default' + (def ? ' (' + UI.esc(def.name) + ')' : '') + '</option>' +
      (groups.length > 1 ? groups.map(function (g) { return '<optgroup label="' + UI.esc(g) + '">' + mod.roles.filter(function (r) { return (r.group || '') === g; }).map(opt).join('') + '</optgroup>'; }).join('')
        : mod.roles.map(opt).join('')) +
      '</select></label><a href="' + (modKey(mod)) + '-access.html">Who sees what</a>';
  }

  var REQS = '<label class="wn-toggle" title="Show the to-be-confirmed markers and system-behaviour notes"><input type="checkbox" data-wf-reqs hidden><i></i>Requirement tags</label>';
  function bar(o, mod, page, roleHtml) {
    var i = mod.pages.indexOf(page), prev = i >= 0 ? mod.pages[i - 1] : null, next = i >= 0 ? mod.pages[i + 1] : null, st = param('state');
    // optional variant row (e.g. invoice category, kept in the query string as o.variants.param)
    var V = o.variants, vv = V ? (param(V.param) || V.def || (V.items[0] || {}).id) : '';
    var variants = V ? '<div class="wn2"><span>' + UI.esc(V.label || 'Variant') + ':</span>' +
      V.items.map(function (x) { return '<a href="' + page.file + qs([V.param + '=' + encodeURIComponent(x.id)].concat(keepParts(V.param))) + '" class="' + (vv === x.id ? 'on' : '') + '">' + UI.esc(x.label) + '</a>'; }).join('') + '</div>' : '';
    var states = (o.states || []).length ? '<div class="' + (variants ? 'wn2 wn3' : 'wn2') + '"><span>Page states:</span><a href="' + page.file + qs(keepParts()) + '" class="' + (st ? '' : 'on') + '">Default</a>' +
      o.states.map(function (s) { return '<a href="' + page.file + qs(['state=' + encodeURIComponent(s.id)].concat(keepParts())) + '" class="' + (st === s.id ? 'on' : '') + '">' + UI.esc(s.label) + '</a>'; }).join('') + '</div>' : '';
    if (states || variants) document.body.classList.add('has-states');
    if (states && variants) document.body.classList.add('has-variants');
    states = variants + states;
    return '<div class="wn"><span class="wn-brand">Non-PO Portal<small>wireframes</small></span><span class="wn-mod">' + UI.esc(mod.title) + '</span>' +
      '<span class="wn-page">' + UI.esc(page.id.toUpperCase() + '  ' + page.name) + '</span>' + (roleHtml || '') + REQS +
      '<span class="wn-sp"></span><span class="wn-links">' + (prev ? '<a href="' + prev.file + '">&lsaquo; ' + UI.esc(prev.name) + '</a>' : '') +
      '<a href="../open-points.html">Open points</a><a href="../index.html">All pages</a>' + (next ? '<a href="' + next.file + '">' + UI.esc(next.name) + ' &rsaquo;</a>' : '') + '</span></div>' + states;
  }

  G.Page = {
    MODULES: MODULES,
    state: function () { return param('state'); },
    href: href,
    // the role chosen in the wireframe bar (null = each page's own default role)
    role: function (k) { return chosenRole(MODULES[k || 'pa']); },
    // the role a page is seen as: the one chosen in the wireframe bar, else the page default (role id)
    roleOr: function (k, defId) { var m = MODULES[k || 'pa']; return chosenRole(m) || roleById(m, defId) || null; },
    param: param,
    access: function (pid, rid) { return accessOf(moduleOf(pid), pid, rid); },
    render: function (o) {
      var mod = moduleOf(o.id), page = pageOf(o.id) || { id: o.id, file: '', name: o.title || o.id };
      document.title = page.name + ' - Non-PO Portal wireframes';
      KEEP = (o.keep || []).concat(o.variants ? [o.variants.param] : []);
      var chosen = chosenRole(mod), defId = o.roleId || roleFromLabel(mod, o.viewAs || o.role), rid = chosen ? chosen.id : defId;
      var R = chosen || roleById(mod, defId), lay = o.layout || (R && R.layout) || 'internal';
      var acc = pageOf(o.id) ? accessOf(mod, o.id, rid) : 'w';
      var content = typeof o.html === 'function' ? o.html() : o.html;
      if (chosen && !acc) {
        o.rail = {};
        content = UI.page({ title: 'Not available', accent: 'for this role' }) +
          UI.alert({ tone: 'warn', title: UI.esc(page.name) + ' is not part of the ' + UI.esc(chosen.name) + ' role.', text: 'The menu on the left shows the pages this role can open. Choose another role in the top bar, or "Page default", to see this page.' }) +
          UI.btns([UI.button({ label: 'Go to home', variant: 'primary', go: mod.home })]);
      } else if (chosen && acc === 'v') {
        content = UI.alert({ tone: 'info', title: 'View only for ' + UI.esc(chosen.name) + '.', text: 'This role can see this page but cannot act on it; the actions shown are for the roles that work on it.' }) + content;
      }
      var shell;
      if (lay === 'plain') shell = UI.shell.plain({ content: content });
      else {
        var can = function (pid) { return !!accessOf(mod, pid, rid); };
        var menu = mod.menu.map(function (g) {
          return { group: g.group, items: g.items.filter(can).map(function (pid) { var p = pageOf(pid); return { label: p.name, go: pid, active: pid === (o.navKey || o.id) }; }) };
        }).filter(function (g) { return g.items.length; });
        var args = { logo: '../assets/logo.png', home: mod.home, user: chosen ? chosen.user : (o.user || (R ? R.user : '')), role: chosen ? chosen.name : (o.role || (R ? R.name : '')), menu: menu, rail: o.rail || {}, content: content,
          icons: mod.icons.filter(function (t) { return !t.go || can(t.go); }).map(function (t) { return { icon: t.icon, label: t.label, go: t.go, toast: t.toast, badge: t.badge }; }) };
        if (lay === 'partner') {
          var P = mod.partner || {}, cnt = o.statCounts || (P.counts && P.counts(R)) || (R && R.counts) || [];
          args.stats = (P.stats || []).map(function (s, i) { return { value: cnt[i] != null ? cnt[i] : s.value, label: s.label, go: s.go, active: o.stat === s.key }; });
          args.links = (P.links || []).filter(function (l) { return can(l.go.split('?')[0]); }).map(function (l) { return { label: l.label, go: l.go, active: l.go === (o.navKey || o.id) }; });
        }
        shell = lay === 'partner' ? UI.shell.partner(args) : UI.shell.internal(args);
      }
      document.body.insertAdjacentHTML('beforeend', bar(o, mod, page, roleSelect(mod, chosen, defId)) + '<div class="app">' + shell + '</div>');
      wire();
      var m = param('modal'); if (m) { var el = document.querySelector('[data-modal-id="' + m + '"]'); if (el) el.hidden = false; }
      var tb = param('tab'); if (tb) activateTab(tb);
      if (param('scrollto') === 'bottom') setTimeout(function () { window.scrollTo(0, document.documentElement.scrollHeight); }, 300);
      if (param('qa')) {   // layout check used by build/shot_pages.py: tables wider than the page
        var over = Array.prototype.filter.call(document.querySelectorAll('.k-tablewrap'), function (w) { return w.offsetParent && w.scrollWidth > w.clientWidth + 2; });
        document.body.insertAdjacentHTML('beforeend', '<div id="qa-overflow" hidden>' + over.length + '</div>');
        var sbar = document.querySelector('.k-sticky'), foot = document.querySelector('.sh-footer');
        if (sbar) {
          window.scrollTo(0, document.documentElement.scrollHeight);
          var end = foot ? foot.getBoundingClientRect().top : document.documentElement.scrollHeight - window.scrollY;
          var gap = Math.round(end - sbar.getBoundingClientRect().bottom);
          document.body.insertAdjacentHTML('beforeend', '<div id="qa-gap" hidden>' + gap + '</div>');
        }
      }
    },
    renderAccess: function (k) {
      var mod = MODULES[k], page = { id: k + '-access', file: k + '-access.html', name: 'Who sees which page' };
      var R = mod.roles;
      var head = '<tr><th>Page</th>' + R.map(function (r) { return '<th class="acc-h"><a href="' + pageOf(mod.home).file + '?role=' + r.id + '" title="See the portal as ' + UI.esc(r.name) + '">' + UI.esc(r.name) + '</a></th>'; }).join('') + '<th>Notes</th></tr>';
      var body = mod.pages.map(function (p) {
        return '<tr><td class="acc-p"><a class="k-link" href="' + p.file + '">' + p.id.toUpperCase() + ' ' + UI.esc(p.name) + '</a></td>' +
          R.map(function (r) { var a = accessOf(mod, p.id, r.id); return '<td class="acc-c">' + (a ? '<span class="acc ' + a + '" title="' + (a === 'w' ? 'Works on it' : 'View only') + '"></span>' : '') + '</td>'; }).join('') +
          '<td class="acc-n">' + UI.esc((mod.access[p.id] || [])[2] || '') + '</td></tr>';
      }).join('');
      var html = '<div class="sh-content">' + UI.page({ title: 'Who Sees', accent: 'Which Page', sub: mod.accessSub || (UI.esc(mod.title) + ' is for Airtel employees only (single sign-on). Vendors and landlords have no access to these pages; they use the Non-PO Invoicing pages.') }) +
        UI.alert({ tone: 'warn', title: 'Proposal for Airtel to confirm.', text: mod.accessNote || 'The approved HLD defines the roles and what each does (section 3.3) but not page-level access. Admin rights are to be confirmed by the P2P team and access controls checked with GRC.' }) +
        '<div class="k-legend-src"><span><span class="acc w"></span>Works on the page</span><span><span class="acc v"></span>View only</span><span>Blank: page not in the role\'s menu</span><span>Select a role name to see the portal as that role</span></div>' +
        '<div class="k-tablewrap"><table class="k-table acc-tbl"><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>' +
        UI.section({ title: 'Applies to every page', body: [UI.list({ items: mod.accessRules || [
          { icon: 'filter', title: 'Data scope', text: 'Users see only the records of their entity, BU, cost centre and department, from single sign-on and HRMS. Leadership and GPA see all.' },
          { icon: 'users', title: 'Separation of duties', text: 'Nobody approves a provision they raised; the GPA manager posts journals but does not raise them; audit is read-only everywhere.' },
          { icon: 'history', title: 'Audit trail', text: 'Every submission, approval, override, force match, force closure and posting is recorded with user and time.' }] })] }) +
        UI.section({ title: 'Roles', body: [UI.cards({ cols: 4, items: R.map(function (r) { return { left: true, icon: 'user', title: r.name, text: UI.esc(r.desc), meta: ['Open the portal as this role'], go: pageOf(mod.home).file + '?role=' + r.id }; }) })] }) + '</div>';
      document.title = page.name + ' - Non-PO Portal wireframes';
      document.body.insertAdjacentHTML('beforeend', bar({}, mod, page, roleSelect(mod, chosenRole(mod), '')) + '<div class="app">' + html + '</div>');
      wire();
    },
    renderIndex: function () {
      var html = '<div class="sh-content">' + UI.page({ title: 'Non-PO Portal', accent: 'Wireframes', sub: 'One page per screen. Provisioning & Actualization first, then Non-PO Invoicing. Sample data is illustrative.' }) +
        '<p><a class="k-link" href="open-points.html">Open points for Airtel to confirm</a></p>';
      Object.keys(MODULES).forEach(function (k) {
        var mod = MODULES[k];
        html += '<div class="ix-mod"><h2>' + UI.esc(mod.title) + '</h2><p>' + (mod.pages.length ? mod.pages.length + ' pages' : 'Next, after Provisioning & Actualization') +
          ((mod.roles || []).length ? ' &middot; <a class="k-link" href="' + k + '/' + k + '-access.html">Who sees which page</a>' : '') + '</p><div class="ix-grid">' +
          mod.pages.map(function (p) { return '<a class="ix-card" href="' + k + '/' + p.file + '"><b><span>' + p.id.toUpperCase() + '</span>' + UI.esc(p.name) + '</b><small>' + UI.esc(p.desc) + '</small></a>'; }).join('') + '</div></div>';
      });
      document.title = 'Non-PO Portal wireframes';
      document.body.insertAdjacentHTML('beforeend', '<div class="wn"><span class="wn-brand">Non-PO Portal<small>wireframes</small></span><span class="wn-sp"></span><span class="wn-links"><a href="open-points.html">Open points</a></span></div><div class="app">' + html + '</div>');
      wire();
    },
    // every 'to be confirmed' marker (UI.tbc) in the page files and module data files, plus access notes; read when the page opens, so it follows the pages
    renderOpenPoints: function () {
      var RX = /UI\.tbc\(\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g;
      var RXD = /\{\s*id:\s*'([^']+)'[^{}]*?\bname:\s*'([^']+)'[^{}]*?\bpage:\s*'([^']+)'[^{}]*?\btbc:\s*'((?:[^'\\]|\\.)*)'/g;
      var unesc = function (s) { return s.replace(/\\(.)/g, '$1'); };
      var html = '<div class="sh-content">' + UI.page({ title: 'Open', accent: 'Points', sub: 'Everything marked to be confirmed by Airtel, collected from the wireframe pages when this page opens. Each link opens the page with Requirement tags on, so the marker shows in place.' }) +
        '<div id="op-body">' + UI.p('Collecting the open points...', { muted: true }) + '</div></div>';
      document.title = 'Open points - Non-PO Portal wireframes';
      document.body.insertAdjacentHTML('beforeend', '<div class="wn"><span class="wn-brand">Non-PO Portal<small>wireframes</small></span><span class="wn-page">Open points</span><span class="wn-sp"></span><span class="wn-links"><a href="index.html">All pages</a></span></div><div class="app">' + html + '</div>');
      wire();
      var keys = Object.keys(MODULES).filter(function (k) { return MODULES[k].pages.length; }), jobs = [];
      keys.forEach(function (k) {
        MODULES[k].pages.forEach(function (p) { jobs.push({ k: k, p: p, url: k + '/' + p.file }); });
        jobs.push({ k: k, data: true, url: k + '/' + k + '-data.js' });
      });
      var body = document.getElementById('op-body'), snap = G.OPEN_POINTS_SNAPSHOT;
      Promise.all(jobs.map(function (j) { return fetch(j.url, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.text() : ''; }, function () { return ''; }).then(function (t) { j.text = t; }, function () { j.text = ''; }); })).then(function () {
        // served: read the files live; opened from a folder (the browser blocks reading files): use the snapshot from build/open_points.py
        var live = jobs.some(function (j) { return j.text; });
        if (!live && !snap) { body.innerHTML = UI.alert({ tone: 'warn', title: 'The page files could not be read.', text: 'Open this page through the preview server (for example http://localhost:8765/open-points.html), or run build/open_points.py to write the snapshot.' }); return; }
        var out = '', total = 0;
        keys.forEach(function (k) {
          var mod = MODULES[k], items = [], byText = {};
          var add = function (text, where) {
            if (!byText[text]) { byText[text] = { text: text, where: [] }; items.push(byText[text]); }
            if (byText[text].where.indexOf(where) < 0) byText[text].where.push(where);
          };
          var link = function (p, q, label) { return '<a class="k-link" href="' + k + '/' + p.file + '?' + (q ? q + '&' : '') + 'reqs=1">' + p.id.toUpperCase() + ' ' + UI.esc(label || p.name) + '</a>'; };
          jobs.filter(function (j) { return j.k === k; }).forEach(function (j) {
            var m, cats = [], tbc = [], s = live ? null : (snap.files[j.url] || {});
            if (s) { cats = s.cats || []; tbc = s.tbc || []; }
            else if (j.data) { RXD.lastIndex = 0; while ((m = RXD.exec(j.text))) cats.push([m[1], m[2], m[3], unesc(m[4])]); }
            else { RX.lastIndex = 0; while ((m = RX.exec(j.text))) tbc.push(unesc(m[1] != null ? m[1] : m[2])); }
            cats.forEach(function (c) { var pg = pageOf(c[2]); if (pg) add(c[3], link(pg, 'cat=' + c[0], pg.name + ' (' + c[1] + ')')); });
            if (!j.data) tbc.forEach(function (t) { add(t, link(j.p)); });
          });
          var acc = '<a class="k-link" href="' + k + '/' + k + '-access.html">Who sees which page</a>';
          if (mod.accessNote) add('Page access by role: ' + mod.accessNote, acc);
          mod.pages.forEach(function (p) { var n = (mod.access[p.id] || [])[2]; if (n && /confirm/i.test(n)) add('Access to ' + p.name + ': ' + n, acc); });
          total += items.length;
          out += UI.section({ title: mod.title, sub: items.length + ' open points', body: [UI.table({ dense: true, pager: false, export: false, columns: [{ key: 'n', label: '#' }, { key: 't', label: 'Open point' }, { key: 'w', label: 'Where' }],
            rows: items.map(function (it, i) { return { n: String(i + 1), t: '<div class="op-t">' + UI.esc(it.text) + '</div>', w: '<div class="op-w">' + it.where.join('') + '</div>' }; }) })] });
        });
        body.innerHTML = UI.p(total + ' open points across ' + keys.length + ' modules' + (live ? '.' : ', from the snapshot built on ' + UI.esc(snap.built) + ' (opened from a folder; run build/open_points.py after changing markers).'), { muted: true }) + out;
      });
    }
  };
})(window);
