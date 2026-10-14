/* Shared mock data for the Provisioning & Actualization wireframes (illustrative only). "Today" is 01-Oct-2026.
   Every provision has a reference (PRV-..., DARTS line DRT-..., debit-note provision DNP-...) from submission; the URN is
   generated only after all DOA approvers approve (or, for notification-only activities, DARTS lines and debit notes, when raised).
   URN = BU + vendor code + item code + month (+ locator for TOCO; + DN number for TOCO debit notes; owned / Homes leases
   have no vendor), shown with "·" separators; the exact separator is fixed in detailed design (HLD 4.4).
   Each provision carries its own dates, its Oracle journal (gl), the invoices that settled it (m) and extra events (ev);
   the audit trail, actual, open balance, age and escalation are derived from those below, never made up by a page.
   Age is counted in days from the last day of the service month (HLD open point 18), frozen when the provision closes. */
window.PA = (function () {
  var activities = [
    { id: 'ACT-0001', name: 'Security services - offices', scenario: 1, item: 'SECURITY001', itemDesc: 'Security guarding services', expGL: '4664060', liabGL: '1229567', mode: 'Reversal', route: 'Approval', recurring: true, dept: 'Admin & Facilities' },
    { id: 'ACT-0014', name: 'DG AMC - network sites', scenario: 1, item: 'AMCDG004', itemDesc: 'DG set annual maintenance', expGL: '4282010', liabGL: '1229564', mode: 'Reversal', route: 'Approval', recurring: true, dept: 'Network Operations' },
    { id: 'ACT-0022', name: 'Call centre services', scenario: 1, item: 'CCSVC002', itemDesc: 'Inbound call centre services', expGL: '4652011', liabGL: '1229567', mode: 'Reversal', route: 'Approval', recurring: true, dept: 'Customer Service' },
    { id: 'ACT-0031', name: 'Legal retainer', scenario: 8, item: 'LEGAL007', itemDesc: 'Legal retainership fee', expGL: '4671002', liabGL: '1229567', mode: 'Standing', route: 'Approval', recurring: true, dept: 'Legal' },
    { id: 'ACT-0040', name: 'NSG network support - circle split', scenario: 2, item: 'NSGSUP011', itemDesc: 'Network support services', expGL: '4282031', liabGL: '1229564', mode: 'Standing', route: 'Approval', recurring: true, dept: 'NSG' },
    // scenario 3: revenue side, Unbilled debtor Dr / Revenue Cr (HLD Table 12)
    { id: 'ACT-0052', name: 'Brand cross-charge', scenario: 3, item: 'BRANDCC01', itemDesc: 'Brand usage cross-charge', expGL: '3201015', liabGL: '2451223', dr: '2451223', cr: '3201015', mode: 'Standing', route: 'Approval', recurring: true, dept: 'Consolidation' },
    { id: 'ACT-0063', name: 'DG / XFE deferment', scenario: 4, item: 'DEFER021', itemDesc: 'Deferred network expense', expGL: '4563005', liabGL: '1229564', mode: 'Standing', route: 'Approval', recurring: true, dept: 'GPA' },
    { id: 'ACT-0071', name: 'UNOC cost allocation to entities', scenario: 5, item: 'UNOCALL03', itemDesc: 'Unified NOC cost', expGL: '4282050', liabGL: '1229564', mode: 'Standing', route: 'Approval', recurring: true, dept: 'Network Operations' },
    // scenario 6: 3243052 Dr / 4131026 Cr (HLD Table 12)
    { id: 'ACT-0084', name: 'Expense to revenue reclass', scenario: 6, item: 'RECLASS06', itemDesc: 'Expense to revenue reclass', expGL: '4131026', liabGL: '3243052', dr: '3243052', cr: '4131026', mode: 'Standing', route: 'Approval', recurring: true, dept: 'Business Finance' },
    { id: 'ACT-0090', name: 'Data centre rent cross-charge', scenario: 7, item: 'DCRENT02', itemDesc: 'Data centre rent', expGL: '4231001', liabGL: '1229564', mode: 'Reversal', route: 'Notification', recurring: true, dept: 'Business Finance' },
    { id: 'ACT-0096', name: 'Industry membership fee', scenario: 8, item: 'MEMBFEE01', itemDesc: 'Membership and subscription', expGL: '4691005', liabGL: '1229567', mode: 'Reversal', route: 'Notification', recurring: true, dept: 'Corporate Affairs' },
    { id: 'ACT-0102', name: 'Lease expense trend (PM related)', scenario: 9, item: 'LEASEPM09', itemDesc: 'Lease related expense', expGL: '4271004', liabGL: '1229564', mode: 'Standing', route: 'Approval', recurring: true, dept: 'GPA' },
    { id: 'ACT-0110', name: 'VTM penalty', scenario: 10, item: 'VTMPEN010', itemDesc: 'Verification penalty', expGL: '4699021', liabGL: '1229567', mode: 'Reversal', route: 'Approval', recurring: true, dept: 'Business Team' },
    { id: 'ACT-0115', name: 'COGS - enterprise customers', scenario: 11, item: 'COGSENT11', itemDesc: 'Cost of goods sold', expGL: '4101002', liabGL: '1229564', mode: 'Standing', route: 'Approval', recurring: true, dept: 'Business Finance', deferred: true },
    // scenario 12: in BU 62206 the cost is reclassed out, 2445001 Dr / 4282037 Cr (HLD Table 12)
    { id: 'ACT-0120', name: 'IT / AMC allocation to Digital Asset books', scenario: 12, item: 'ARITM5304', itemDesc: 'IT and AMC recharge', expGL: '4282037', liabGL: '2445001', dr: '2445001', cr: '4282037', mode: 'Standing', route: 'Approval', recurring: true, dept: 'IT Finance' },
    { id: 'ACT-0125', name: 'Government licence and permit fees', scenario: 1, item: 'GOVLIC01', itemDesc: 'Licence and permit fees', expGL: '4699015', liabGL: '1229567', mode: 'Reversal', route: 'Approval', recurring: true, dept: 'Regulatory Affairs' },
    { id: 'ACT-0201', name: 'TOCO rent', scenario: 'T', item: 'RENT-AOR', itemDesc: 'Tower rent - AOR', expGL: '4271004', liabGL: '1229564', mode: 'Reversal', route: 'DARTS', recurring: true, dept: 'Network Infra' },
    { id: 'ACT-0202', name: 'TOCO electricity', scenario: 'T', item: 'ELEC-AOR', itemDesc: 'Site electricity - AOR', expGL: '4232001', liabGL: '1229564', mode: 'Reversal', route: 'DARTS', recurring: true, dept: 'Network Infra' },
    { id: 'ACT-0203', name: 'TOCO diesel', scenario: 'T', item: 'DSL-AOR', itemDesc: 'Site diesel - AOR', expGL: '4282010', liabGL: '1229564', mode: 'Reversal', route: 'DARTS', recurring: true, dept: 'Network Infra' },
    { id: 'ACT-0204', name: 'Owned and Homes site rent', scenario: 'T', item: 'RENT-OWN', itemDesc: 'Site rent - owned and Homes leases', expGL: '4271004', liabGL: '1229564', mode: 'Reversal', route: 'DARTS', recurring: true, dept: 'Network Infra' }
  ];
  activities.forEach(function (a) { a.dr = a.dr || a.expGL; a.cr = a.cr || a.liabGL; });
  var SCEN = { 1: 'Input as per format', 2: 'Distributed by defined %', 3: 'Brand cross-charge (% of FSG)', 4: 'Partial expense and deferment', 5: 'Allocation to other legal entities', 6: 'Expense to revenue reclass', 7: 'Input at YTD level', 8: 'Trend basis', 9: 'Trend basis, PM related', 10: 'VTM', 11: 'Provision for COGS (deferred)', 12: 'Allocation (IT / AMC, Nxtra)', T: 'TOCO (DARTS)' };
  var vendors = {
    '410022': { name: 'SecureOne Facility Services Pvt Ltd', pan: 'AAJCS7712K', rpt: 'Non-RPT' },
    '410029': { name: 'Shakti Security Services', pan: 'AAJCS7712K', rpt: 'Non-RPT', note: 'Second vendor code of SecureOne Facility Services Pvt Ltd (same PAN)' },
    '410387': { name: 'Prism Power Systems Pvt Ltd', pan: 'AAGCP4410M', rpt: 'Non-RPT' },
    '410455': { name: 'Vertex Call Solutions Ltd', pan: 'AACCV2208H', rpt: 'Non-RPT' },
    '410612': { name: 'Lexwise Legal LLP', pan: 'AAKFL9031B', rpt: 'Non-RPT' },
    '410790': { name: 'Telecom Industry Association', pan: 'AAATT1029D', rpt: 'Non-RPT' },
    '410951': { name: 'Metro Networks Co', pan: 'AAFCM8840R', rpt: 'Non-RPT' },
    '510044': { name: 'Department of Telecommunications', pan: 'AAAGD5520J', rpt: 'Non-RPT', govt: true },
    '200014': { name: 'Nxtra Data Ltd', pan: 'AAECN1176P', rpt: 'RPT' },
    '200031': { name: 'Xtelify Ltd', pan: 'AAACX5521L', rpt: 'RPT' },
    '412885': { name: 'Indus Towers Ltd', pan: 'AAACI3307Q', rpt: 'Non-RPT' },
    '412902': { name: 'Summit Digitel Infrastructure Ltd', pan: 'AAYCS6614E', rpt: 'Non-RPT' },
    '322600': { name: 'GTL Infrastructure Ltd', pan: 'AABCG1234H', rpt: 'Non-RPT' },
    '600124': { name: 'Shree Ganesh Infra Services Pvt Ltd', pan: 'AAKCS4821M', rpt: 'Non-RPT' }
  };
  var BUS = { '100': 'Consolidated - NSG', '101': 'Corporate - Gurugram', '111': 'Mobile - Delhi', '121': 'Mobile - UP East', '122': 'Mobile - UP East (Varanasi)', '125': 'Mobile - UP East (Gorakhpur)', '127': 'Mobile - UP East (operations)',
    '131': 'Mobile - Karnataka', '141': 'Mobile - Maharashtra', '151': 'Mobile - Andhra Pradesh', '165': 'Mobile - Telangana', '904': 'APO - Haryana', '62206': 'Xtelify Cloud - Haryana' };
  function urn(p) { return [p.bu].concat(p.vcode ? [p.vcode] : []).concat([p.item, p.month]).concat(p.locator ? [p.locator] : []).concat(p.dn ? [p.dn] : []).join('·'); }

  /* ------------------------------------------------ provisions
     sub: submitted (or raised); apv: DOA approvers [user, approved at] (null = waiting); ret: [returned at, by, reason];
     gl: Oracle journal {batch, sent, posted, doc, date (GL date)} or {batch, sent, imported} or {batch, sent, rejected};
     m: invoices that settled it {inv, amt applied, how, on}; ev: other events [at, event, by, detail, state]; closed: when it stopped being open */
  var provisions = [
    // SecureOne Facility Services - security services (S1, reversal mode)
    { ref: 'PRV-26-10412', bu: '111', vcode: '410022', act: 'ACT-0001', month: 'SEP-26', amount: 485000, status: 'Submitted', source: 'Single entry', maker: 'B0MKR412', created: '30-Sep-2026 16:30', sub: '30-Sep-2026 16:42', apv: [['B0CHK155', null], ['B0CHK090', null]] },
    { ref: 'PRV-26-08372', bu: '111', vcode: '410022', act: 'ACT-0001', month: 'AUG-26', amount: 485000, status: 'Open', source: 'Single entry', maker: 'B0MKR412', sub: '31-Aug-2026 18:00', apv: [['B0CHK155', '01-Sep-2026 10:20'], ['B0CHK090', '01-Sep-2026 14:35']],
      gl: { batch: 'NPP-26-09-0004', sent: '01-Sep-2026 15:00', posted: '01-Sep-2026 18:20', doc: 'GL-26-0814452', date: '31-Aug-2026' }, note: 'Invoice SFS/2026/0961 (NPO-2627-004860) carries this URN and is under approval in Non-PO Invoicing' },
    { ref: 'PRV-26-07264', bu: '111', vcode: '410022', act: 'ACT-0001', month: 'JUL-26', amount: 470000, status: 'Closed', source: 'Single entry', maker: 'B0MKR412', sub: '30-Jul-2026 17:30', apv: [['B0CHK155', '31-Jul-2026 10:15'], ['B0CHK090', '31-Jul-2026 15:05']],
      gl: { batch: 'NPP-26-08-0001', sent: '01-Aug-2026 09:30', posted: '01-Aug-2026 17:40', doc: 'GL-26-0711208', date: '31-Jul-2026' }, m: [{ inv: 'SFS/2026/0912', amt: 470000, how: 'key', on: '23-Sep-2026' }], closed: '23-Sep-2026' },
    { ref: 'PRV-26-10431', bu: '151', vcode: '410022', act: 'ACT-0001', month: 'SEP-26', amount: 398000, status: 'Submitted', source: 'Bulk upload', maker: 'B0MKR611', sub: '30-Sep-2026 18:05', apv: [['B0CHK155', null]] },
    { ref: 'PRV-26-10419', bu: '165', vcode: '410022', act: 'ACT-0001', month: 'SEP-26', amount: 312000, status: 'Submitted', source: 'Single entry', maker: 'B0MKR412', sub: '30-Sep-2026 12:01', apv: [['CFR', null], ['B0CHK155', null], ['B0CHK090', null]],
      note: 'First use of BU 165 for this activity: CFR approval (CFR-26-0117) before the DOA approvers' },
    { ref: 'PRV-26-08417', bu: '121', vcode: '410022', act: 'ACT-0001', month: 'AUG-26', amount: 410000, status: 'Open', source: 'Single entry', maker: 'B0MKR519', sub: '28-Aug-2026 15:10', apv: [['B0CHK155', '31-Aug-2026 10:30'], ['B0CHK090', '31-Aug-2026 15:00']],
      gl: { batch: 'NPP-26-09-0004', sent: '01-Sep-2026 15:00', posted: '01-Sep-2026 18:20', doc: 'GL-26-0814833', date: '31-Aug-2026' }, note: 'Nearest-match candidate for invoice SHK/2026/551 (vendor code 410029, same PAN)' },
    { ref: 'PRV-25-08377', bu: '121', vcode: '410022', act: 'ACT-0001', month: 'AUG-25', amount: 410000, status: 'Open', source: 'Single entry', maker: 'B0MKR519', sub: '29-Aug-2025 16:05', apv: [['B0CHK155', '01-Sep-2025 09:50'], ['B0CHK090', '01-Sep-2025 11:30']],
      gl: { batch: 'NPP-25-09-0002', sent: '01-Sep-2025 12:00', posted: '01-Sep-2025 17:45', doc: 'GL-25-0830118', date: '31-Aug-2025' }, note: 'Beyond the PBR window at the close of Sep-26: reversed in the run on 05-Oct-2026 unless placed on hold' },
    { ref: 'PRV-25-07418', bu: '121', vcode: '410022', act: 'ACT-0001', month: 'JUL-25', amount: 410000, status: 'Reversed', source: 'Single entry', maker: 'B0MKR519', sub: '31-Jul-2025 17:20', apv: [['B0CHK155', '01-Aug-2025 10:05'], ['B0CHK090', '01-Aug-2025 12:40']],
      gl: { batch: 'NPP-25-08-0003', sent: '01-Aug-2025 13:00', posted: '01-Aug-2025 18:10', doc: 'GL-25-0730962', date: '31-Jul-2025' }, closed: '05-Sep-2026 06:00',
      note: 'Reversed under the PBR window (13 months) at the close of Aug-26, run 05-Sep-2026',
      ev: [['05-Sep-2026 06:00', 'PBR reversal', 'System (PBR run)', 'Beyond the 13-month window at the close of Aug-26; URN closed. Reversal mode: Oracle already reversed the journal on 01-Aug-2025, so no journal is posted']] },

    // Prism Power Systems - DG AMC (S1, reversal mode)
    { ref: 'PRV-26-10440', bu: '121', vcode: '410387', act: 'ACT-0014', month: 'SEP-26', amount: 1260000, status: 'Submitted', source: 'Bulk upload', maker: 'B0MKR519', sub: '28-Sep-2026 11:10', apv: [['B0CHK201', null], ['B0CHK090', null]],
      note: 'Bulk upload BLK-26-0412: waiting for approver 1 of 2 (B0CHK201; delegate B0CHK155) - overdue, escalated' },
    { ref: 'PRV-26-10441', bu: '122', vcode: '410387', act: 'ACT-0014', month: 'SEP-26', amount: 1310000, status: 'Submitted', source: 'Bulk upload', maker: 'B0MKR519', sub: '28-Sep-2026 11:10', apv: [['B0CHK201', null], ['B0CHK090', null]],
      note: 'Bulk upload BLK-26-0412: waiting for approver 1 of 2 (B0CHK201; delegate B0CHK155) - overdue, escalated' },
    { ref: 'PRV-26-10442', bu: '125', vcode: '410387', act: 'ACT-0014', month: 'SEP-26', amount: 1255000, status: 'Submitted', source: 'Bulk upload', maker: 'B0MKR519', sub: '28-Sep-2026 11:10', apv: [['B0CHK201', null], ['B0CHK090', null]],
      note: 'Potential duplicate in bulk upload BLK-26-0412 (same vendor, item, month and amount as another row); override reason given' },
    { ref: 'PRV-26-08385', bu: '121', vcode: '410387', act: 'ACT-0014', month: 'AUG-26', amount: 1260000, status: 'Partially actualized', source: 'Bulk upload', maker: 'B0MKR519', sub: '28-Aug-2026 11:40', apv: [['B0CHK155', '29-Aug-2026 10:10'], ['B0CHK090', '29-Aug-2026 16:45']],
      gl: { batch: 'NPP-26-09-0004', sent: '01-Sep-2026 15:00', posted: '01-Sep-2026 18:20', doc: 'GL-26-0814790', date: '31-Aug-2026' },
      m: [{ inv: 'PPS/26-27/0811', amt: 810000, how: 'key', on: '19-Sep-2026' }, { inv: 'PPS/26-27/0890', amt: 324000, how: 'bumap', on: '30-Sep-2026' }], po: '4500921107',
      note: 'PO 4500921107 (Rs 1,40,000.00) found on 01-Oct for the sites not yet billed - review the link',
      ev: [['01-Oct-2026 06:00', 'PO found', 'Daily PO fetch', 'PO 4500921107 raised 30-Sep-2026 for Rs 1,40,000.00: same vendor, item and BU; the open balance is Rs 1,26,000.00'],
        [null, 'PO link review', 'GPA team', 'Confirm to settle the open balance against the PO, or reject the link', 'current']] },
    { ref: 'PRV-26-07279', bu: '111', vcode: '410387', act: 'ACT-0014', month: 'JUL-26', amount: 520000, status: 'Open', source: 'Single entry', maker: 'B0MKR412', sub: '30-Jul-2026 16:20', apv: [['B0CHK155', '31-Jul-2026 10:30'], ['B0CHK090', '31-Jul-2026 15:15']],
      gl: { batch: 'NPP-26-08-0001', sent: '01-Aug-2026 09:30', posted: '01-Aug-2026 17:40', doc: 'GL-26-0731311', date: '31-Jul-2026' }, po: '4500918822',
      note: 'PO 4500918822 raised in Oracle on 30-Sep-2026, found by the daily PO fetch on 01-Oct - review the link',
      ev: [['01-Oct-2026 06:00', 'PO found', 'Daily PO fetch', 'PO 4500918822 raised 30-Sep-2026 for Rs 5,20,000.00: same vendor, item and BU'],
        [null, 'PO link review', 'GPA team', 'Confirm to settle the provision against the PO, or reject the link', 'current']] },
    { ref: 'PRV-26-06183', bu: '131', vcode: '410387', act: 'ACT-0014', month: 'JUN-26', amount: 480000, status: 'Cancelled', source: 'Single entry', maker: 'B0MKR233', sub: '29-Jun-2026 15:10', apv: [['B0CHK155', '30-Jun-2026 10:40'], ['B0CHK090', '30-Jun-2026 16:20']],
      gl: { batch: 'NPP-26-07-0001', sent: '01-Jul-2026 09:20', posted: '01-Jul-2026 17:10', doc: 'GL-26-0612955', date: '30-Jun-2026' }, po: '4500912045', closed: '04-Sep-2026 11:20',
      note: 'PO 4500912045 raised in Oracle on 03-Sep-2026; provision settled against the PO',
      ev: [['04-Sep-2026 06:00', 'PO found', 'Daily PO fetch', 'PO 4500912045 raised 03-Sep-2026 for Rs 4,80,000.00: same vendor, item and BU'],
        ['04-Sep-2026 11:20', 'Settled against the PO', 'B0GPA204', 'Link confirmed; status Cancelled and the cost handed to the PO process. Reversal mode: Oracle reversed the journal on 01-Jul-2026, so no journal is posted']] },
    { ref: 'PRV-25-12288', bu: '141', vcode: '410387', act: 'ACT-0014', month: 'DEC-25', amount: 760000, status: 'Open', source: 'Bulk upload', maker: 'B0MKR301', sub: '30-Dec-2025 12:30', apv: [['B0CHK155', '31-Dec-2025 10:10'], ['B0CHK090', '31-Dec-2025 15:25']],
      gl: { batch: 'NPP-26-01-0001', sent: '01-Jan-2026 09:30', posted: '01-Jan-2026 17:05', doc: 'GL-25-1229410', date: '31-Dec-2025' },
      note: 'Hold requested (CFR-26-0109) on 28-Sep-2026, same vendor dispute as the Aug-25 provision on hold - waiting for CFR',
      ev: [['28-Sep-2026 09:15', 'Hold requested', 'B0GPA204', 'CFR-26-0109: vendor dispute under arbitration; exclude from PBR reversal'], [null, 'CFR decision on the hold', 'CFR', 'CFR-26-0109, due 01-Oct-2026', 'current']] },
    { ref: 'PRV-25-08402', bu: '141', vcode: '410387', act: 'ACT-0014', month: 'AUG-25', amount: 690000, status: 'On hold', source: 'Single entry', maker: 'B0MKR301', sub: '30-Aug-2025 11:10', apv: [['B0CHK155', '01-Sep-2025 10:00'], ['B0CHK090', '01-Sep-2025 11:45']],
      gl: { batch: 'NPP-25-09-0002', sent: '01-Sep-2025 12:00', posted: '01-Sep-2025 17:45', doc: 'GL-25-0830131', date: '31-Aug-2025' }, hold: 'Vendor dispute under arbitration (CFR-26-0087)',
      ev: [['14-Aug-2026 10:05', 'Hold requested', 'B0GPA204', 'CFR-26-0087: vendor dispute under arbitration; exclude from PBR reversal'], ['18-Aug-2026 16:20', 'Hold approved', 'B0CFR007 (CFR)', 'CFR-26-0087 approved; status On hold, excluded from PBR reversal']] },
    { ref: 'PRV-26-08433', bu: '121', vcode: '410387', act: 'ACT-0063', month: 'AUG-26', amount: 3600000, status: 'Open', source: 'Single entry', maker: 'B0GPA204', sub: '31-Aug-2026 11:00', apv: [['B0CHK155', '31-Aug-2026 14:20'], ['B0CHK090', '31-Aug-2026 17:05']],
      gl: { batch: 'NPP-26-09-0004', sent: '01-Sep-2026 15:00', posted: '01-Sep-2026 18:20', doc: 'GL-26-0815019', date: '31-Aug-2026' }, prepaid: 'PPD-26-0201',
      note: 'Scenario 4: 72% (DG) deferred over 35 months in prepaid schedule PPD-26-0201' },
    { ref: 'PRV-26-10359', bu: '100', vcode: '410387', act: 'ACT-0040', month: 'SEP-26', amount: 1500000, status: 'Submitted', source: 'Rule-based (S2)', maker: 'B0BFN017', sub: '27-Sep-2026 15:30', apv: [['B0CHK155', null], ['B0CHK090', null], ['B0CFO012', null]],
      note: 'Split to Delhi, Odisha, Punjab and Haryana at the allocation master percentages; liability at consolidated level' },

    // Vertex Call Solutions - call centre services (S1, reversal mode)
    { ref: 'PRV-26-10352', bu: '131', vcode: '410455', act: 'ACT-0022', month: 'SEP-26', amount: 2140000, status: 'Interface error', source: 'Single entry', maker: 'B0MKR233', sub: '29-Sep-2026 15:40', apv: [['B0CHK155', '30-Sep-2026 11:15'], ['B0CHK090', '30-Sep-2026 19:40']],
      gl: { batch: 'NPP-26-09-0118', sent: '30-Sep-2026 20:55', rejected: '30-Sep-2026 21:05' }, error: 'Account combination 131-4652011 failed cross-validation in Oracle GL' },
    { ref: 'PRV-26-08390', bu: '131', vcode: '410455', act: 'ACT-0022', month: 'AUG-26', amount: 2140000, status: 'Closed', source: 'Single entry', maker: 'B0MKR233', sub: '28-Aug-2026 16:30', apv: [['B0CHK155', '31-Aug-2026 09:40'], ['B0CHK090', '31-Aug-2026 13:15']],
      gl: { batch: 'NPP-26-09-0004', sent: '01-Sep-2026 15:00', posted: '01-Sep-2026 18:20', doc: 'GL-26-0814805', date: '31-Aug-2026' }, m: [{ inv: 'VCS/26/1188', amt: 2140000, how: 'urn', on: '17-Sep-2026' }], closed: '17-Sep-2026',
      note: 'Invoice VCS/26/1188 exceeds the provision by Rs 2,50,000.00 - with business finance for review' },
    { ref: 'PRV-26-06155', bu: '131', vcode: '410455', act: 'ACT-0022', month: 'JUN-26', amount: 2075000, status: 'Open', source: 'Single entry', maker: 'B0MKR233', sub: '29-Jun-2026 16:00', apv: [['B0CHK155', '30-Jun-2026 10:30'], ['B0CHK090', '30-Jun-2026 16:10']],
      gl: { batch: 'NPP-26-07-0001', sent: '01-Jul-2026 09:20', posted: '01-Jul-2026 17:10', doc: 'GL-26-0612931', date: '30-Jun-2026' }, note: 'Oldest open provision for invoice VCS/26/1176, which has no service period (FIFO) - nearest-match review' },
    { ref: 'PRV-26-02790', bu: '141', vcode: '410455', act: 'ACT-0022', month: 'MAR-26', amount: 1950000, status: 'Partially actualized', source: 'Single entry', maker: 'B0MKR301', sub: '30-Mar-2026 17:05', apv: [['B0CHK155', '31-Mar-2026 10:20'], ['B0CHK090', '31-Mar-2026 14:45']],
      gl: { batch: 'NPP-26-04-0001', sent: '01-Apr-2026 09:40', posted: '01-Apr-2026 17:30', doc: 'GL-26-0331544', date: '31-Mar-2026' }, m: [{ inv: 'VCS/26/1240', amt: 1820000, how: 'key', on: '01-Oct-2026' }],
      note: 'Invoice VCS/26/1240 (service Mar-26) is a year-end provision invoice: reclassed to YEP up to the provision value' },
    { ref: 'PRV-26-03901', bu: '121', vcode: '410455', act: 'ACT-0022', month: 'APR-26', amount: 1980000, status: 'Open', source: 'Single entry', maker: 'B0MKR519', sub: '29-Apr-2026 16:15', apv: [['B0CHK155', '30-Apr-2026 11:00'], ['B0CHK090', '30-Apr-2026 15:30']],
      gl: { batch: 'NPP-26-05-0001', sent: '01-May-2026 09:30', posted: '01-May-2026 17:20', doc: 'GL-26-0430287', date: '30-Apr-2026' },
      note: 'Force reversal requested (CFR-26-0112) on 28-Sep-2026 - waiting for CFR',
      ev: [['28-Sep-2026 17:20', 'Force reversal requested', 'B0GPA204', 'CFR-26-0112: disputed - vendor billed under a new contract; provision not payable'], [null, 'CFR decision on the force reversal', 'CFR', 'CFR-26-0112, due 01-Oct-2026', 'current']] },
    { ref: 'PRV-25-08391', bu: '111', vcode: '410455', act: 'ACT-0022', month: 'AUG-25', amount: 1880000, status: 'Open', source: 'Single entry', maker: 'B0MKR412', sub: '29-Aug-2025 15:20', apv: [['B0CHK155', '01-Sep-2025 10:15'], ['B0CHK090', '01-Sep-2025 11:40']],
      gl: { batch: 'NPP-25-09-0002', sent: '01-Sep-2025 12:00', posted: '01-Sep-2025 17:45', doc: 'GL-25-0830124', date: '31-Aug-2025' }, note: 'Beyond the PBR window at the close of Sep-26: reversed in the run on 05-Oct-2026 unless placed on hold' },

    // Lexwise Legal - legal retainer (S8, standing mode)
    { ref: 'PRV-26-10398', bu: '101', vcode: '410612', act: 'ACT-0031', month: 'SEP-26', amount: 350000, status: 'Returned', source: 'Single entry', maker: 'B0MKR088', sub: '30-Sep-2026 09:20', apv: [['B0CHK155', null]],
      ret: ['30-Sep-2026 17:20', 'B0CHK155', 'Attach the retainer agreement; amount differs from the agreed monthly fee'], reason: 'Attach the retainer agreement; amount differs from the agreed monthly fee' },
    { ref: 'PRV-26-07301', bu: '101', vcode: '410612', act: 'ACT-0031', month: 'JUL-26', amount: 350000, status: 'Open', source: 'Single entry', maker: 'B0MKR088', sub: '30-Jul-2026 12:10', apv: [['B0CHK155', '31-Jul-2026 09:55']],
      gl: { batch: 'NPP-26-08-0001', sent: '01-Aug-2026 09:30', posted: '01-Aug-2026 17:40', doc: 'GL-26-0731402', date: '31-Jul-2026' }, note: 'Nearest-match candidate for invoice LEX/26/0187 (booked with item code LEGAL009)' },
    { ref: 'PRV-26-07312', bu: '131', vcode: '410612', act: 'ACT-0031', month: 'JUL-26', amount: 350000, status: 'Closed', source: 'Single entry', maker: 'B0MKR233', sub: '30-Jul-2026 15:00', apv: [['B0CHK155', '31-Jul-2026 10:05']],
      gl: { batch: 'NPP-26-08-0001', sent: '01-Aug-2026 09:30', posted: '01-Aug-2026 17:40', doc: 'GL-26-0731418', date: '31-Jul-2026' },
      m: [{ inv: 'LEX/26/0219', amt: 350000, how: 'key', on: '26-Sep-2026', kdoc: 'GL-26-0930118', kposted: '30-Sep-2026' }], closed: '26-Sep-2026' },
    { ref: 'PRV-26-08396', bu: '131', vcode: '410612', act: 'ACT-0031', month: 'AUG-26', amount: 350000, status: 'Open', source: 'Single entry', maker: 'B0MKR233', sub: '28-Aug-2026 12:20', apv: [['B0CHK155', '31-Aug-2026 10:00']],
      gl: { batch: 'NPP-26-09-0004', sent: '01-Sep-2026 15:00', posted: '01-Sep-2026 18:20', doc: 'GL-26-0814921', date: '31-Aug-2026' }, note: 'Invoice LEX/26/0233 (NPO-2627-004834) carries this URN and is under approval in Non-PO Invoicing' },
    { ref: 'PRV-26-01644', bu: '131', vcode: '410612', act: 'ACT-0031', month: 'FEB-26', amount: 300000, status: 'Open', source: 'Single entry', maker: 'B0MKR233', sub: '27-Feb-2026 15:30', apv: [['B0CHK155', '02-Mar-2026 09:45']],
      gl: { batch: 'NPP-26-03-0001', sent: '02-Mar-2026 10:30', posted: '02-Mar-2026 16:50', doc: 'GL-26-0228644', date: '28-Feb-2026' },
      note: 'Force closure requested (CFR-26-0114) on 29-Sep-2026 - waiting for CFR',
      ev: [['29-Sep-2026 10:44', 'Force closure requested', 'B0GPA204', 'CFR-26-0114: matter withdrawn - no invoice expected'], [null, 'CFR decision on the force closure', 'CFR', 'CFR-26-0114, due 30-Sep-2026 (overdue)', 'current']] },
    { ref: 'PRV-26-00512', bu: '131', vcode: '410612', act: 'ACT-0031', month: 'JAN-26', amount: 300000, status: 'Force closed', source: 'Single entry', maker: 'B0MKR233', sub: '30-Jan-2026 16:40', apv: [['B0CHK155', '02-Feb-2026 10:00']],
      gl: { batch: 'NPP-26-02-0001', sent: '02-Feb-2026 10:40', posted: '02-Feb-2026 17:15', doc: 'GL-26-0131650', date: '31-Jan-2026' }, closed: '12-Sep-2026 11:30',
      wb: { doc: 'GL-26-0912337', date: '12-Sep-2026', posted: '12-Sep-2026 14:20' },
      note: 'No invoice expected - matter withdrawn; written back with CFR approval (CFR-26-0098, 12-Sep-2026)',
      ev: [['08-Sep-2026 15:10', 'Force closure requested', 'B0GPA204', 'CFR-26-0098: matter withdrawn - no invoice expected'], ['12-Sep-2026 11:30', 'Force closure approved', 'B0CFR007 (CFR)', 'CFR-26-0098 approved; URN ended'],
        ['12-Sep-2026 14:20', 'Write-back posted in Oracle', 'B0GPM031 (GPA manager)', 'GL-26-0912337: 131-1229567 Dr / 131-4671002 Cr, Rs 3,00,000.00']] },

    // Telecom Industry Association - membership fee (S8 trend basis: Rs 12,55,000 a year = Rs 1,04,583 a month; notification only)
    { ref: 'PRV-26-10405', bu: '101', vcode: '410790', act: 'ACT-0096', month: 'SEP-26', amount: 104583, status: 'Draft', source: 'Single entry', maker: 'B0MKR088', created: '29-Sep-2026 17:45',
      note: 'Not needed: Sep-26 is covered by invoice TIA/26/MEM/19 (annual fee, released from prepaid schedule PPD-26-0418)' },
    { ref: 'PRV-26-08410', bu: '101', vcode: '410790', act: 'ACT-0096', month: 'AUG-26', amount: 104583, status: 'Closed', source: 'Single entry', maker: 'B0MKR088', sub: '31-Aug-2026 11:12',
      gl: { batch: 'NPP-26-09-0004', sent: '01-Sep-2026 15:00', posted: '01-Sep-2026 18:20', doc: 'GL-26-0814967', date: '31-Aug-2026' }, m: [{ inv: 'TIA/26/MEM/19', amt: 104583, how: 'consol', on: '25-Sep-2026' }], closed: '25-Sep-2026' },
    { ref: 'PRV-26-07290', bu: '101', vcode: '410790', act: 'ACT-0096', month: 'JUL-26', amount: 104583, status: 'Closed', source: 'Single entry', maker: 'B0MKR088', sub: '30-Jul-2026 11:05',
      gl: { batch: 'NPP-26-08-0001', sent: '01-Aug-2026 09:30', posted: '01-Aug-2026 17:40', doc: 'GL-26-0731427', date: '31-Jul-2026' }, m: [{ inv: 'TIA/26/MEM/19', amt: 104583, how: 'consol', on: '25-Sep-2026' }], closed: '25-Sep-2026' },
    { ref: 'PRV-26-06170', bu: '101', vcode: '410790', act: 'ACT-0096', month: 'JUN-26', amount: 104583, status: 'Closed', source: 'Single entry', maker: 'B0MKR088', sub: '29-Jun-2026 11:20',
      gl: { batch: 'NPP-26-07-0001', sent: '01-Jul-2026 09:20', posted: '01-Jul-2026 17:10', doc: 'GL-26-0612968', date: '30-Jun-2026' }, m: [{ inv: 'TIA/26/MEM/19', amt: 104583, how: 'consol', on: '25-Sep-2026' }], closed: '25-Sep-2026' },
    { ref: 'PRV-26-05061', bu: '101', vcode: '410790', act: 'ACT-0096', month: 'MAY-26', amount: 104583, status: 'Closed', source: 'Single entry', maker: 'B0MKR088', sub: '29-May-2026 10:40',
      gl: { batch: 'NPP-26-06-0001', sent: '01-Jun-2026 09:30', posted: '01-Jun-2026 17:00', doc: 'GL-26-0529311', date: '31-May-2026' }, m: [{ inv: 'TIA/26/MEM/19', amt: 104583, how: 'consol', on: '25-Sep-2026' }], closed: '25-Sep-2026' },
    { ref: 'PRV-26-03912', bu: '101', vcode: '410790', act: 'ACT-0096', month: 'APR-26', amount: 104583, status: 'Closed', source: 'Single entry', maker: 'B0MKR088', sub: '29-Apr-2026 11:00',
      gl: { batch: 'NPP-26-05-0001', sent: '01-May-2026 09:30', posted: '01-May-2026 17:20', doc: 'GL-26-0429402', date: '30-Apr-2026' }, m: [{ inv: 'TIA/26/MEM/19', amt: 104583, how: 'consol', on: '25-Sep-2026' }], closed: '25-Sep-2026' },

    // Group companies (RPT)
    { ref: 'PRV-26-10401', bu: '111', vcode: '200014', act: 'ACT-0090', month: 'SEP-26', amount: 1800000, status: 'Approved', source: 'Single entry', maker: 'B0BFN017', sub: '30-Sep-2026 10:05',
      gl: { batch: 'NPP-26-10-0003', sent: '01-Oct-2026 08:30', imported: '01-Oct-2026 08:30' }, note: 'Imported in Oracle (RPT batch NPP-26-10-0003) - waiting for the GPA manager to post' },
    { ref: 'PRV-26-05048', bu: '111', vcode: '200014', act: 'ACT-0090', month: 'MAY-26', amount: 1800000, status: 'Open', source: 'Single entry', maker: 'B0BFN017', sub: '29-May-2026 10:10',
      gl: { batch: 'NPP-26-06-0002', sent: '01-Jun-2026 09:30', posted: '01-Jun-2026 17:00', doc: 'GL-26-0512077', date: '31-May-2026' } },
    { ref: 'PRV-26-08401', bu: '62206', vcode: '200031', act: 'ACT-0120', month: 'AUG-26', amount: 9600000, status: 'Open', source: 'Single entry', maker: 'B0GPA204', sub: '31-Aug-2026 12:00', apv: [['B0CHK155', '31-Aug-2026 15:00'], ['B0CHK090', '31-Aug-2026 17:30'], ['B0CFO012', '01-Sep-2026 10:00']],
      gl: { batch: 'NPP-26-09-0003', sent: '01-Sep-2026 11:00', posted: '01-Sep-2026 18:00', doc: 'GL-26-0815002', date: '31-Aug-2026' } },
    { ref: 'PRV-26-10366', bu: '62206', vcode: '200031', act: 'ACT-0120', month: 'SEP-26', amount: 9850000, status: 'Submitted', source: 'Single entry', maker: 'B0GPA204', sub: '27-Sep-2026 14:02', apv: [['CFR', null], ['B0CHK155', null], ['B0CHK090', null], ['B0CFO012', null]],
      note: 'New GL account for this activity: CFR approval (CFR-26-0106) before the DOA approvers - overdue, escalated' },
    { ref: 'PRV-26-10377', bu: '101', vcode: '200031', act: 'ACT-0052', month: 'SEP-26', amount: 2450000, status: 'DOA exception', source: 'Single entry', maker: 'B0BFN017', sub: '28-Sep-2026 16:40',
      doa: 'DOA API returned no approvers: no matrix for brand cross-charge (RPT)' },

    // Government vendor (excluded from PBR reversal)
    { ref: 'PRV-25-08415', bu: '101', vcode: '510044', act: 'ACT-0125', month: 'AUG-25', amount: 2500000, status: 'Open', source: 'Single entry', maker: 'B0MKR088', sub: '28-Aug-2025 14:00', apv: [['B0CHK155', '01-Sep-2025 10:30'], ['B0CHK090', '01-Sep-2025 12:10']],
      gl: { batch: 'NPP-25-09-0002', sent: '01-Sep-2025 12:00', posted: '01-Sep-2025 17:45', doc: 'GL-25-0830140', date: '31-Aug-2025' }, note: 'Government vendor: excluded from PBR reversal' },

    // TOCO from DARTS (site level, with locator) and owned / Homes leases
    { ref: 'DRT-26-09-04127', bu: '111', vcode: '412885', act: 'ACT-0201', month: 'SEP-26', locator: '11106', site: 'DL-11106-0412', amount: 384250, status: 'Approved', source: 'DARTS', maker: 'DARTS feed',
      darts: ['30-Sep-2026 22:40', '01-Oct-2026 10:12'], gl: { batch: 'NPP-26-10-0004', sent: '01-Oct-2026 10:12', imported: '01-Oct-2026 10:12' }, note: 'Imported in Oracle (DARTS batch NPP-26-10-0004) - waiting for the GPA manager to post' },
    { ref: 'DRT-26-09-04128', bu: '111', vcode: '412885', act: 'ACT-0202', month: 'SEP-26', locator: '11106', site: 'DL-11106-0412', amount: 112740, status: 'Approved', source: 'DARTS', maker: 'DARTS feed',
      darts: ['30-Sep-2026 22:40', '01-Oct-2026 10:12'], gl: { batch: 'NPP-26-10-0004', sent: '01-Oct-2026 10:12', imported: '01-Oct-2026 10:12' }, note: 'Imported in Oracle (DARTS batch NPP-26-10-0004) - waiting for the GPA manager to post' },
    { ref: 'DRT-26-09-07102', bu: '111', vcode: '412902', act: 'ACT-0201', month: 'SEP-26', locator: '11109', site: 'DL-11109-0077', amount: 298600, status: 'Approved', source: 'DARTS', maker: 'DARTS feed',
      darts: ['30-Sep-2026 22:40', '01-Oct-2026 10:12'], gl: { batch: 'NPP-26-10-0004', sent: '01-Oct-2026 10:12', imported: '01-Oct-2026 10:12' }, note: 'Imported in Oracle (DARTS batch NPP-26-10-0004) - waiting for the GPA manager to post' },
    { ref: 'DRT-26-09-07216', bu: '121', vcode: '412902', act: 'ACT-0203', month: 'SEP-26', locator: '12114', site: 'UPE-12114-0301', amount: 26430, status: 'Approved', source: 'DARTS', maker: 'DARTS feed',
      darts: ['30-Sep-2026 22:40', '01-Oct-2026 10:12'], gl: { batch: 'NPP-26-10-0004', sent: '01-Oct-2026 10:12', imported: '01-Oct-2026 10:12' }, note: 'Imported in Oracle (DARTS batch NPP-26-10-0004) - waiting for the GPA manager to post' },
    { ref: 'DRT-26-09-13102', bu: '131', vcode: '', lease: 'LSE-OWN-13102', act: 'ACT-0204', month: 'SEP-26', locator: '13102', site: 'KA-13102-0910 (Owned)', amount: 64000, status: 'Approved', source: 'DARTS', maker: 'DARTS feed',
      darts: ['30-Sep-2026 22:40', '01-Oct-2026 10:12'], gl: { batch: 'NPP-26-10-0004', sent: '01-Oct-2026 10:12', imported: '01-Oct-2026 10:12' }, note: 'Imported in Oracle (DARTS batch NPP-26-10-0004); the lease payment of 05-Oct is on hold in the PM lease module' },
    { ref: 'DRT-26-08-04133', bu: '111', vcode: '412885', act: 'ACT-0202', month: 'AUG-26', locator: '11106', site: 'DL-11106-0412', amount: 110480, status: 'Partially actualized', source: 'DARTS', maker: 'DARTS feed',
      darts: ['31-Aug-2026 22:30', '01-Sep-2026 09:50'], gl: { batch: 'NPP-26-09-0001', sent: '01-Sep-2026 09:50', posted: '01-Sep-2026 16:40', doc: 'GL-26-0831402', date: '31-Aug-2026' },
      m: [{ inv: 'IND/26/AUG/77120', amt: 107960, how: 'site', on: '19-Sep-2026' }] },
    { ref: 'DRT-26-08-07215', bu: '121', vcode: '412902', act: 'ACT-0203', month: 'AUG-26', locator: '12114', site: 'UPE-12114-0301', amount: 25980, status: 'Closed', source: 'DARTS', maker: 'DARTS feed',
      darts: ['31-Aug-2026 22:30', '01-Sep-2026 09:50'], gl: { batch: 'NPP-26-09-0001', sent: '01-Sep-2026 09:50', posted: '01-Sep-2026 16:40', doc: 'GL-26-0831433', date: '31-Aug-2026' },
      m: [{ inv: 'SDIL/26-27/0817', amt: 25980, how: 'site', on: '25-Sep-2026' }], closed: '25-Sep-2026' },
    { ref: 'DRT-26-08-14031', bu: '141', vcode: '', lease: 'LSE-HOM-14031', act: 'ACT-0204', month: 'AUG-26', locator: '14031', site: 'MH-14031-0207 (Homes)', amount: 18500, status: 'Closed', source: 'DARTS', maker: 'DARTS feed',
      darts: ['31-Aug-2026 22:30', '01-Sep-2026 09:50'], gl: { batch: 'NPP-26-09-0001', sent: '01-Sep-2026 09:50', posted: '01-Sep-2026 16:40', doc: 'GL-26-0831447', date: '31-Aug-2026' },
      m: [{ inv: 'LP-26-08-14031', amt: 18500, how: 'lease', on: '02-Sep-2026' }], closed: '02-Sep-2026' },

    // TOCO debit-note provisions: created when the DN is validated in Non-PO Invoicing, reversed when the DN reversal is validated
    { ref: 'DNP-26-0031', bu: '151', vcode: '322600', act: 'ACT-0201', month: 'JUL-26', locator: '15104', dn: 'GTL/AP/2026/JUL/4452/DN', amount: 18600, status: 'Open', source: 'Debit note', maker: 'Invoicing (DN validated)',
      dnv: ['20-Aug-2026 16:10', 'NPO-2627-004466'], gl: { batch: 'NPP-26-09-0004', sent: '01-Sep-2026 15:00', posted: '01-Sep-2026 18:20', doc: 'GL-26-0831468', date: '31-Aug-2026' } },
    { ref: 'DNP-26-0019', bu: '151', vcode: '322600', act: 'ACT-0202', month: 'JUN-26', locator: '15104', dn: 'GTL/AP/2026/JUN/4390/DN', amount: 41300, status: 'Reversed', source: 'Debit note', maker: 'Invoicing (DN validated)',
      dnv: ['22-Jul-2026 15:45', 'NPO-2627-003984'], gl: { batch: 'NPP-26-08-0001', sent: '01-Aug-2026 09:30', posted: '01-Aug-2026 17:40', doc: 'GL-26-0731455', date: '31-Jul-2026' },
      rev: { doc: 'GL-26-0925207', date: '25-Sep-2026', posted: '26-Sep-2026 11:00' }, closed: '25-Sep-2026 15:30',
      note: 'Reversed when the DN reversal (NPO-2627-004797) was validated on 25-Sep-2026',
      ev: [['25-Sep-2026 15:30', 'DN reversal validated', 'Non-PO Invoicing (AP team)', 'NPO-2627-004797: GTL/AP/2026/JUN/4390/REV, Rs 41,300.00; provision reversed'],
        ['26-Sep-2026 11:00', 'Reversal posted in Oracle', 'B0GPM031 (GPA manager)', 'GL-26-0925207: 151-1229564 Dr / 151-4232001 Cr, Rs 41,300.00']] }
  ];

  /* ------------------------------------------------ invoices seen by the matching engine (booked, validated and accounted in Oracle)
     portal: Non-PO Invoicing reference when the invoice came through the portal (see inv-data.js); out: auto | nearest | unmatched | excess | prepaid | hit */
  var invoices = [
    { no: 'PPS/26-27/0811', vcode: '410387', bu: '121', src: 'AP', booked: '18-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 810000, out: 'auto', text: '27 of 42 sites billed for Aug-26' },
    { no: 'PPS/26-27/0890', vcode: '410387', bu: '127', src: 'AP', booked: '29-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 324000, out: 'auto', text: 'Booked in BU 127; mapped to BU 121 by the BU reclass mapping' },
    { no: 'IND/26/AUG/77120', vcode: '412885', bu: '111', src: 'PM', portal: 'NPO-2627-004640', booked: '18-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 558610.17, lines: 12, out: 'auto', text: '12 locator lines matched by site key (locator 11106 electricity shown)' },
    { no: 'SDIL/26-27/0817', vcode: '412902', bu: '121', src: 'PM', booked: '24-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 341760, lines: 14, out: 'auto', text: '14 locator lines matched by site key (locator 12114 diesel shown)' },
    { no: 'SFS/2026/0912', vcode: '410022', bu: '111', src: 'AP', booked: '22-Sep-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: 470000, out: 'auto' },
    { no: 'LEX/26/0219', vcode: '410612', bu: '131', src: 'AP', booked: '25-Sep-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: 350000, out: 'auto', text: 'Standing mode: knock-off journal posted' },
    { no: 'VCS/26/1240', vcode: '410455', bu: '141', src: 'AP', booked: '30-Sep-2026', from: '01-Mar-2026', to: '31-Mar-2026', base: 1820000, out: 'auto', yep: true, text: 'Service Mar-26: YEP reclass of Rs 18,20,000.00 (within the provision value)' },
    { no: 'LP-26-08-14031', vcode: '', lease: 'LSE-HOM-14031', bu: '141', src: 'Lease', booked: '05-Aug-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 18500, out: 'auto', text: 'Lease payment from the PM lease module (Homes)' },
    { no: 'VCS/26/1188', vcode: '410455', bu: '131', src: 'AP', portal: 'NPO-2627-004771', booked: '14-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 2390000, out: 'excess', excess: 250000, text: 'Exceeds the provision by Rs 2,50,000.00 - with business finance for review' },
    { no: 'TIA/26/MEM/19', vcode: '410790', bu: '101', src: 'AP', booked: '24-Sep-2026', from: '01-Apr-2026', to: '31-Mar-2027', base: 1255000, out: 'excess', prepaid: 'PPD-26-0418', text: 'Annual fee FY 2026-27: Apr-26 to Aug-26 knocked off against 5 provisions; Sep-26 to Mar-27 Rs 7,32,085.00 to prepaid' },
    { no: 'VCS/26/1176', vcode: '410455', bu: '131', src: 'AP', booked: '29-Sep-2026', from: '', to: '', base: 2075000, out: 'nearest', cands: ['131·410455·CCSVC002·JUN-26'], text: 'No service period: FIFO suggests the oldest open provision (JUN-26)' },
    { no: 'LEX/26/0187', vcode: '410612', bu: '101', src: 'AP', booked: '28-Sep-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: 350000, item: 'LEGAL009', out: 'nearest', cands: ['101·410612·LEGAL007·JUL-26'], text: 'Booked with item code LEGAL009: 1 candidate with the item code relaxed' },
    { no: 'SHK/2026/551', vcode: '410029', bu: '121', src: 'AP', booked: '29-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 410000, out: 'nearest', cands: ['121·410022·SECURITY001·AUG-26'], text: 'No provision for vendor code 410029: nearest by PAN AAJCS7712K (SecureOne)' },
    { no: 'MNC/26/0071', vcode: '410951', bu: '141', src: 'AP', booked: '26-Sep-2026', from: '01-Sep-2026', to: '30-Sep-2026', base: 118000, out: 'unmatched', text: 'No provision for the vendor or the category' },
    { no: 'SGIS/26-27/0352', vcode: '600124', bu: '121', src: 'AP', portal: 'NPO-2627-004410', booked: '03-Sep-2026', from: '10-Aug-2026', to: '12-Aug-2026', base: 58750, out: 'unmatched', text: 'Rush invoice: no provision for the vendor' },
    { no: 'XTL/26-27/2400', vcode: '200031', bu: '904', src: 'AP', booked: '08-Sep-2026', from: '01-Sep-2026', to: '31-Aug-2028', base: 24000, out: 'prepaid', prepaid: 'PPD-26-0402', text: '24-month subscription, no provision: held in prepaid and released monthly' },
    { no: 'LP-26-09-14052', vcode: '', lease: 'LSE-HOM-14052', bu: '141', src: 'Lease', booked: '28-Sep-2026', from: '01-Oct-2026', to: '31-Dec-2026', base: 55500, out: 'prepaid', prepaid: 'PPD-26-0377', text: 'Quarterly rent paid in advance (Homes lease): held in prepaid' },
    { no: 'SFS/2026/0981', vcode: '410022', bu: '121', src: 'AP', booked: '21-Sep-2026', from: '01-Jun-2025', to: '30-Jun-2025', base: 395000, out: 'hit', text: 'Service before the PBR window: hit, expensed in the current period, not reclassed to YEP' }
  ];

  /* ------------------------------------------------ CFR requests, POs found after provision, prepaid schedules */
  var requests = [
    { id: 'CFR-26-0117', type: 'New BU for activity', key: 'PRV-26-10419', by: 'B0MKR412', on: '30-Sep-2026 12:01', due: '02-Oct-2026', status: 'Waiting for CFR' },
    { id: 'CFR-26-0114', type: 'Force closure', key: '131·410612·LEGAL007·FEB-26', by: 'B0GPA204', on: '29-Sep-2026 10:44', due: '30-Sep-2026', status: 'Waiting for CFR', reason: 'Matter withdrawn - no invoice expected' },
    { id: 'CFR-26-0112', type: 'Force reversal', key: '121·410455·CCSVC002·APR-26', by: 'B0GPA204', on: '28-Sep-2026 17:20', due: '01-Oct-2026', status: 'Waiting for CFR', reason: 'Disputed - vendor billed under a new contract; provision not payable' },
    { id: 'CFR-26-0109', type: 'Hold', key: '141·410387·AMCDG004·DEC-25', by: 'B0GPA204', on: '28-Sep-2026 09:15', due: '01-Oct-2026', status: 'Waiting for CFR', reason: 'Vendor dispute under arbitration (same dispute as the Aug-25 provision on hold)' },
    { id: 'CFR-26-0106', type: 'New GL account', key: 'PRV-26-10366', by: 'B0GPA204', on: '27-Sep-2026 14:02', due: '29-Sep-2026', status: 'Waiting for CFR' },
    { id: 'CFR-26-0098', type: 'Force closure', key: '131·410612·LEGAL007·JAN-26', by: 'B0GPA204', on: '08-Sep-2026 15:10', status: 'Approved', decided: '12-Sep-2026 11:30', reason: 'Matter withdrawn - no invoice expected' },
    { id: 'CFR-26-0087', type: 'Hold', key: '141·410387·AMCDG004·AUG-25', by: 'B0GPA204', on: '14-Aug-2026 10:05', status: 'Approved', decided: '18-Aug-2026 16:20', reason: 'Vendor dispute under arbitration' }
  ];
  var pos = [
    { po: '4500918822', vcode: '410387', bu: '111', item: 'AMCDG004', raised: '30-Sep-2026', amt: 520000, found: '01-Oct-2026 06:00', key: '111·410387·AMCDG004·JUL-26', status: 'Found - review', inv: 'PO invoice not yet booked' },
    { po: '4500921107', vcode: '410387', bu: '121', item: 'AMCDG004', raised: '30-Sep-2026', amt: 140000, found: '01-Oct-2026 06:00', key: '121·410387·AMCDG004·AUG-26', status: 'Found - review', inv: 'PO invoice not yet booked', text: 'PO for the 15 sites not yet billed; PO amount differs from the open balance' },
    { po: '4500912045', vcode: '410387', bu: '131', item: 'AMCDG004', raised: '03-Sep-2026', amt: 480000, found: '04-Sep-2026 06:00', key: '131·410387·AMCDG004·JUN-26', status: 'Settled', settled: '04-Sep-2026 11:20', inv: 'PO invoice booked 18-Sep-2026' }
  ];
  var prepaid = [
    { id: 'PPD-26-0418', inv: 'TIA/26/MEM/19', text: 'Annual membership fee FY 2026-27, after Apr-26 to Aug-26 were knocked off against their provisions', gl: '4691005', bu: '101', from: 'Sep-26', to: 'Mar-27', total: 732085, rel: 104583, cur: 627502, nc: 0, monthly: 104583 },
    { id: 'PPD-26-0402', inv: 'XTL/26-27/2400', text: '24-month subscription booked in September (HLD 5.5 worked example)', gl: '4282037', bu: '904', from: 'Sep-26', to: 'Aug-28', total: 24000, rel: 1000, cur: 12000, nc: 11000, monthly: 1000 },
    { id: 'PPD-26-0377', inv: 'LP-26-09-14052', text: 'Quarterly rent paid in advance - Homes lease LSE-HOM-14052', gl: '4271004', bu: '141', from: 'Oct-26', to: 'Dec-26', total: 55500, rel: 0, cur: 55500, nc: 0, monthly: 18500 },
    { id: 'PPD-26-0201', urn: '121·410387·DEFER021·AUG-26', text: 'Scenario 4 - DG deferment, 72% of Rs 36,00,000.00 over 35 months', gl: '4563005', bu: '121', from: 'Aug-26', to: 'Jul-29', total: 2592000, rel: 111086, cur: 888686, nc: 1592228, monthly: 74057 }
  ];

  /* ------------------------------------------------ dates, ageing and the derived audit trail */
  var MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'], DAY = 864e5;
  function cap(m) { return m.charAt(0) + m.slice(1).toLowerCase(); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function parse(s) {
    var x = /^(\d{2})-(\w{3})-(\d{4})(?: (\d{2}):(\d{2}))?/.exec(s || '');
    return x ? Date.UTC(+x[3], MON.indexOf(x[2].toUpperCase()), +x[1], +(x[4] || 0), +(x[5] || 0)) : null;
  }
  function fmt(t) { var x = new Date(t); return pad(x.getUTCDate()) + '-' + cap(MON[x.getUTCMonth()]) + '-' + x.getUTCFullYear(); }
  function day(s) { var t = parse(s); return t == null ? null : t - t % DAY; }
  function monthEnd(mon) { return Date.UTC(2000 + +mon.slice(4), MON.indexOf(mon.slice(0, 3)) + 1, 0); }
  function addMonths(mon, n) { var i = MON.indexOf(mon.slice(0, 3)) + n, y = 2000 + +mon.slice(4) + Math.floor(i / 12); return cap(MON[(i % 12 + 12) % 12]) + '-' + String(y).slice(2); }
  var TODAY = parse('01-Oct-2026'), YE = parse('31-Mar-2026');
  var ESC = [{ days: 90, to: 'Business user' }, { days: 180, to: 'Manager' }, { days: 270, to: 'CFR' }, { days: 365, to: 'Controller / ACE' }];
  var HOW = { urn: 'Exact URN (selected on the invoicing portal)', key: 'Exact key (rebuilt from BU, vendor, item code and service month)', site: 'Exact site key (TOCO, with locator)',
    lease: 'Lease payment (BU, item code, month and locator; vendor optional)', bumap: 'Exact key after BU reclass (invoice BU mapped to the provision BU)', consol: 'Consolidated invoice (one URN per service month)', force: 'Force match' };
  var PRE = /^(Draft|Submitted|Returned|DOA exception)$/, OPEN = /^(Open|Partially actualized|On hold)$/, CLOSED = /^(Closed|Reversed|Force closed|Cancelled)$/;
  function rs(n) { return 'Rs ' + UI.inr(n, 2); }
  function act(id) { return activities.filter(function (x) { return x.id === id; })[0]; }
  function invoice(no) { return invoices.filter(function (r) { return r.no === no; })[0]; }

  function events(p) {
    var E = [], add = function (at, ev, by, detail, state) { E.push({ at: at || '', t: parse(at), status: ev, by: by || '', detail: detail || '', state: state || 'done' }); };
    var a = p.activity, route = p.dn ? 'DN' : a.route;
    if (p.created) add(p.created, 'Created (draft)', p.maker);
    if (route === 'DARTS' && p.darts) {
      add(p.darts[0], 'DARTS feed received', 'DARTS', 'Site ' + p.site + ' in the ' + p.month + ' feed');
      add(p.darts[1], 'Posted to ERP', 'B0GPA204 (GPA)', 'Sent to the Oracle GL interface with the rest of the feed, batch ' + p.gl.batch);
    } else if (route === 'DN') {
      add(p.dnv[0], 'DN validated in Non-PO Invoicing', 'Non-PO Invoicing (AP team)', p.dnv[1] + ': ' + p.dn + ', ' + rs(p.amount));
      add(p.gl.date + ' 20:00', 'Provision created (month-end DN run)', 'Platform', 'URN carries the DN number');
    } else if (p.status === 'DOA exception') {
      add(p.sub, 'Submitted', p.maker);
      add(p.sub, 'No DOA approvers', 'DOA API', UI.esc(p.doa) + '; GPA team alerted', 'error');
      add(null, 'Approval', '', 'Starts when the provision is retriggered', 'pending');
    } else if (route === 'Notification' && p.sub) {
      add(p.sub, 'Raised', p.maker, 'Notification-only activity: posted without approval; B0CHK155 notified');
      add(p.sub, 'URN generated', 'Platform');
    } else if (p.sub) {
      var n = p.apv.length, doa = p.apv.filter(function (x) { return x[0] !== 'CFR'; }).map(function (x) { return x[0]; });
      add(p.sub, 'Submitted', p.maker, (n > doa.length ? 'CFR approval first, then ' : '') + 'DOA API returned ' + doa.length + ' approver' + (doa.length > 1 ? 's' : '') + ': ' + doa.join(', '));
      var waiting = false;
      p.apv.forEach(function (x, i) {
        var lbl = (x[0] === 'CFR' ? 'CFR approval' : 'Approval') + ' (' + (i + 1) + ' of ' + n + ')';
        if (x[1]) add(x[1], lbl.replace('approval', 'approved').replace('Approval', 'Approved'), x[0]);
        else if (p.ret && !waiting) { add(p.ret[0], 'Returned to maker', p.ret[1], UI.esc(p.ret[2]), 'error'); add(null, 'Correction and resubmission', p.maker, 'With the maker', 'current'); waiting = true; }
        else { add(null, lbl, x[0] === 'CFR' ? 'CFR' : x[0], waiting ? '' : 'Waiting', waiting ? 'pending' : 'current'); waiting = true; }
      });
      if (!waiting) add(p.apv[n - 1][1], 'URN generated', 'Platform', 'After the last approval');
    }
    var g = p.gl;
    if (g) {
      if (!p.darts) add(g.sent, 'Sent to Oracle', 'Platform', 'Batch ' + g.batch);
      if (g.rejected) { add(g.rejected, 'Rejected by Journal Import', 'Oracle Journal Import', UI.esc(p.error), 'error'); add(null, 'Correction and retry', 'GPA team', 'In the error queue; the retry is keyed by URN so it cannot post twice', 'current'); }
      else if (g.imported) add(g.imported, 'Imported, waiting to be posted', 'GPA manager', 'Batch ' + g.batch, 'current');
      else if (g.posted) {
        add(g.posted, 'Posted in Oracle', 'B0GPM031 (GPA manager)', g.doc + ' &middot; GL date ' + g.date);
        if (p.mode === 'Reversal') add(g.posted, 'Reversed in Oracle (auto-reversal)', 'Oracle', 'Reversal mode: GL date ' + fmt(parse(g.date) + DAY) + ', the start of the next period; the URN stays open on the platform until actualized or aged out');
        var end = p.closed ? day(p.closed) : TODAY;
        ESC.forEach(function (e) { var t = monthEnd(p.month) + e.days * DAY; if (t <= end) add(fmt(t), 'Escalated (' + e.days + ' days)', 'System (ageing)', 'To ' + e.to); });
      }
    }
    (p.matches || []).forEach(function (m) {
      add(m.on, 'Invoice matched', m.by || 'Matching engine', m.inv + ' &middot; ' + rs(m.amt) + ' &middot; ' + HOW[m.how]);
      if (m.kdoc) add(m.kposted, 'Knock-off posted in Oracle', 'B0GPM031 (GPA manager)', m.kdoc + ': Liability Dr / Expense Cr, ' + rs(m.amt));
    });
    if (p.status === 'Closed') add(p.closed, 'Closed', 'Platform', 'Fully settled by invoices');
    (p.ev || []).forEach(function (x) { add(x[0], x[1], x[2], x[3], x[4]); });
    var known = E.filter(function (e) { return e.t != null; }).sort(function (x, y) { return x.t - y.t; });
    return known.concat(E.filter(function (e) { return e.t == null; }));
  }

  provisions.forEach(function (p) {
    var a = act(p.act), v = vendors[p.vcode];
    p.activity = a; p.buName = BUS[p.bu]; p.item = a.item;
    p.urn = urn(p); p.pre = PRE.test(p.status); p.key = p.pre ? p.ref : p.urn;
    p.vendor = v ? v.name : 'Lease ' + p.lease; p.rpt = v ? v.rpt : 'Non-RPT'; p.govt = !!(v && v.govt);
    p.scenario = a.scenario; p.scenarioName = p.dn ? 'TOCO debit note' : SCEN[a.scenario]; p.mode = p.dn ? 'DN' : a.mode;
    p.from = fmt(Date.UTC(2000 + +p.month.slice(4), MON.indexOf(p.month.slice(0, 3)), 1)); p.to = fmt(monthEnd(p.month));
    p.raised = p.sub ? fmt(day(p.sub)) : p.darts ? fmt(day(p.darts[0])) : p.dnv ? fmt(day(p.dnv[0])) : '';
    p.erpDoc = p.gl && p.gl.doc;
    p.matches = (p.m || []).map(function (m) { m.invoice = invoice(m.inv); return m; });
    p.actual = p.matches.reduce(function (s, m) { return s + m.amt; }, 0);
    p.open = OPEN.test(p.status); p.ended = CLOSED.test(p.status);
    p.balance = p.ended ? 0 : p.amount - p.actual;
    p.age = Math.round(((p.closed ? day(p.closed) : TODAY) - monthEnd(p.month)) / DAY);
    p.bucket = p.age <= 30 ? '0-30 days' : p.age <= 60 ? '31-60 days' : p.age <= 90 ? '61-90 days' : 'Over 90 days';
    var lvl = ESC.filter(function (e) { return p.age >= e.days; }).pop();
    p.escLevel = p.open && lvl ? lvl : null; p.escalation = p.escLevel ? lvl.to + ' (' + lvl.days + ' days)' : '';
    var run = addMonths(p.month, 14);
    p.pbrClose = addMonths(p.month, 13); p.pbrRun = '05-' + run.slice(0, 4) + '20' + run.slice(4);
    p.yep = !p.pre && monthEnd(p.month) <= YE && (!p.closed || day(p.closed) > YE);
    p.events = events(p);
  });
  invoices.forEach(function (r) {
    var v = vendors[r.vcode];
    r.vendor = v ? v.name : 'Lease ' + r.lease;
    r.settles = provisions.filter(function (p) { return p.matches.some(function (m) { return m.inv === r.no; }); });
    r.applied = r.settles.reduce(function (s, p) { return s + p.matches.filter(function (m) { return m.inv === r.no; })[0].amt; }, 0);
    r.period = r.from ? r.from + ' to ' + r.to : 'Not on invoice';
  });

  /* ------------------------------------------------ financial flash (pa-16 and its line detail pa-24): Aug-26 closing trial balance by FSG line
     (Rs lakh) with this month's platform entries overlaid. Admin and facilities is built from the security-services provisions:
     the Sep-26 provisions and the Oracle auto-reversal on 01-Sep of the Aug-26 reversal-mode provisions. */
  var sec = provisions.filter(function (p) { return p.act === 'ACT-0001'; });
  var secEntries = sec.filter(function (p) { return p.month === 'SEP-26'; }).map(function (p) { return { p: p, entry: 'Provision ' + cap(p.month), amt: p.amount / 1e5, status: p.status }; })
    .concat(sec.filter(function (p) { return p.month === 'AUG-26' && p.gl && p.gl.posted; }).map(function (p) { return { p: p, entry: 'Auto-reversal in Oracle, 01-Sep-2026 (reversal mode)', amt: -p.amount / 1e5, status: 'Reversed in Oracle', rev: true }; }));
  var lk = function (list) { return list.reduce(function (a, e) { return a + e.amt; }, 0); };
  var flash = [
    { id: 'network', l: 'Network operating expenses', g: '4282xxx', tb: 41250.6, prov: 196.4, rev: -22.9, adj: 0 },
    { id: 'toco', l: 'Site rent and energy (TOCO)', g: '4271xxx / 4232xxx', tb: 38410.2, prov: 4682.3, rev: 0, adj: -14.6 },
    { id: 'cc', l: 'Customer service and call centre', g: '4652xxx', tb: 6120.8, prov: 21.4, rev: -18.8, adj: 0 },
    { id: 'admin', l: 'Admin and facilities', g: '4664xxx', tb: 2988.1, prov: lk(secEntries.filter(function (e) { return !e.rev; })), rev: lk(secEntries.filter(function (e) { return e.rev; })), adj: 0, entries: secEntries },
    { id: 'legal', l: 'Legal and professional', g: '4671xxx', tb: 1104.3, prov: 3.5, rev: 0, adj: -3.0 },
    { id: 'it', l: 'IT and AMC (incl. allocations)', g: '4282037', tb: 5502.0, prov: 96.0, rev: 0, adj: 0 }
  ];
  flash.forEach(function (x) { x.run = x.tb + x.prov + x.rev + x.adj; });

  /* ------------------------------------------------ reports (pa-18 lists them; pa-25 shows one): id, name, purpose, users (HLD Table 24, 7.3) */
  var reports = [
    ['open', 'Open provision report', 'Open and partially actualized provisions with remaining balance', 'GPA, business users'],
    ['closed', 'Closed provision report', 'Closed, reversed and force-closed provisions', 'GPA, Finance'],
    ['ageing', 'Ageing report', 'Pending provisions by BU, vendor and month, with escalation level and 0-30 / 31-60 / 61-90 / over 90 buckets', 'GPA, managers, CFR'],
    ['pva', 'Provision vs actual mapping', 'Month\'s knock-off of invoices against provisions, by segment (B2B, B2C, TOCO); for audit sampling', 'GPA, Audit'],
    ['dept', 'Department summary', 'Provisions by department', 'Business finance'],
    ['vendor', 'Vendor summary', 'Provisions by vendor', 'Business finance, GPA'],
    ['trend', 'Monthly trend', 'Provision and actualization trend by month', 'Finance'],
    ['audit', 'Audit trail', 'Every action, approval, override, force match and posting with user and time', 'Audit'],
    ['sugg', 'Matching suggestions', 'Nearest-match candidates with force match and force closure options', 'GPA, P2P'],
    ['unmatched', 'Unmatched invoices', 'Invoices not matched to any provision', 'GPA, P2P'],
    ['pminfra', 'Exception: PM Infra invoices', 'Invoices uploaded that failed validation or are not approved', 'P2P, GPA'],
    ['lease', 'Exception: leases on hold', 'Leases scheduled for payment but on hold', 'P2P, GPA'],
    ['excess', 'Excess and under provision', 'Provision vs invoice match: settled, open, excess and under-provision (ERP report enhancement)', 'GPA, Finance'],
    ['nearest', 'Nearest match value', 'Nearest match value between provision and actualization, by URN (ERP report enhancement)', 'GPA'],
    ['portal-erp', 'Portal vs ERP reconciliation', 'ERP invoice and journal data created by the portal against all ERP data, including direct invoices', 'GPA, P2P, IT']
  ].map(function (r) { return { id: r[0], name: r[1], text: r[2], users: r[3] }; });

  return {
    today: '01-Oct-2026', flash: flash, reports: reports, report: function (id) { return reports.filter(function (r) { return r.id === id; })[0]; },
    activities: activities, scenarios: SCEN, vendors: vendors, bus: BUS, provisions: provisions, invoices: invoices, requests: requests, pos: pos, prepaid: prepaid,
    urn: urn, HOW: HOW, ESC: ESC, parse: parse, fmt: fmt, act: act, invoice: invoice,
    statusTone: function (s) { return s === 'Closed' ? 'ok' : (s === 'Draft' || s === 'Reversed' || s === 'Force closed' || s === 'Cancelled') ? 'grey' : ''; },
    find: function (u) { return provisions.filter(function (p) { return p.urn === u || p.ref === u; })[0]; },
    request: function (key) { return requests.filter(function (r) { return r.key === key; }); },
    poFor: function (key) { return pos.filter(function (r) { return r.key === key; })[0]; },
    schedule: function (id) { return prepaid.filter(function (s) { return s.id === id; })[0]; },
    scenarioLabel: function (p) { return p.dn ? 'TOCO debit note' : p.scenario === 'T' ? 'TOCO (DARTS)' : 'S' + p.scenario + ' ' + p.scenarioName; },
    rs: function (n) { return UI.inr(n, 2); }
  };
})();
