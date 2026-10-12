/* Shared mock data for the Provisioning & Actualization wireframes (illustrative only).
   Every provision has a reference (PRV-...) from submission; the URN is generated only after all DOA approvers approve.
   URN = BU + vendor code + item code + month (+ locator for TOCO; + DN number for TOCO debit notes),
   shown with "·" separators; the exact separator is fixed in detailed design (HLD 4.4). */
window.PA = (function () {
  var activities = [
    { id: 'ACT-0001', name: 'Security services - offices', scenario: 1, item: 'SECURITY001', itemDesc: 'Security guarding services', expGL: '4664060', liabGL: '1229567', mode: 'Reversal', route: 'Approval', recurring: true, dept: 'Admin & Facilities' },
    { id: 'ACT-0014', name: 'DG AMC - network sites', scenario: 1, item: 'AMCDG004', itemDesc: 'DG set annual maintenance', expGL: '4282010', liabGL: '1229564', mode: 'Reversal', route: 'Approval', recurring: true, dept: 'Network Operations' },
    { id: 'ACT-0022', name: 'Call centre services', scenario: 1, item: 'CCSVC002', itemDesc: 'Inbound call centre services', expGL: '4652011', liabGL: '1229567', mode: 'Reversal', route: 'Approval', recurring: true, dept: 'Customer Service' },
    { id: 'ACT-0031', name: 'Legal retainer', scenario: 8, item: 'LEGAL007', itemDesc: 'Legal retainership fee', expGL: '4671002', liabGL: '1229567', mode: 'Standing', route: 'Notification', recurring: true, dept: 'Legal' },
    { id: 'ACT-0040', name: 'NSG network support - circle split', scenario: 2, item: 'NSGSUP011', itemDesc: 'Network support services', expGL: '4282031', liabGL: '1229564', mode: 'Standing', route: 'Approval', recurring: true, dept: 'NSG' },
    { id: 'ACT-0052', name: 'Brand cross-charge', scenario: 3, item: 'BRANDCC01', itemDesc: 'Brand usage cross-charge', expGL: '4711003', liabGL: '2451223', mode: 'Standing', route: 'Approval', recurring: true, dept: 'Consolidation' },
    { id: 'ACT-0063', name: 'DG / XFE deferment', scenario: 4, item: 'DEFER021', itemDesc: 'Deferred network expense', expGL: '4282044', liabGL: '1229564', mode: 'Standing', route: 'Approval', recurring: true, dept: 'GPA' },
    { id: 'ACT-0071', name: 'UNOC cost allocation to entities', scenario: 5, item: 'UNOCALL03', itemDesc: 'Unified NOC cost', expGL: '4282050', liabGL: '1229564', mode: 'Standing', route: 'Approval', recurring: true, dept: 'Network Operations' },
    { id: 'ACT-0084', name: 'Expense to revenue reclass', scenario: 6, item: 'RECLASS06', itemDesc: 'Expense to revenue reclass', expGL: '4131026', liabGL: '3243052', mode: 'Standing', route: 'Approval', recurring: true, dept: 'Business Finance' },
    { id: 'ACT-0090', name: 'Data centre rent cross-charge', scenario: 7, item: 'DCRENT02', itemDesc: 'Data centre rent', expGL: '4231001', liabGL: '1229564', mode: 'Reversal', route: 'Notification', recurring: true, dept: 'Business Finance' },
    { id: 'ACT-0096', name: 'Industry membership fee', scenario: 8, item: 'MEMBFEE01', itemDesc: 'Membership and subscription', expGL: '4691005', liabGL: '1229567', mode: 'Reversal', route: 'Notification', recurring: true, dept: 'Corporate Affairs' },
    { id: 'ACT-0102', name: 'Lease expense trend (PM related)', scenario: 9, item: 'LEASEPM09', itemDesc: 'Lease related expense', expGL: '4271004', liabGL: '1229564', mode: 'Standing', route: 'Approval', recurring: true, dept: 'GPA' },
    { id: 'ACT-0110', name: 'VTM penalty', scenario: 10, item: 'VTMPEN010', itemDesc: 'Verification penalty', expGL: '4699021', liabGL: '1229567', mode: 'Reversal', route: 'Approval', recurring: true, dept: 'Business Team' },
    { id: 'ACT-0115', name: 'COGS - enterprise customers', scenario: 11, item: 'COGSENT11', itemDesc: 'Cost of goods sold', expGL: '4101002', liabGL: '1229564', mode: 'Standing', route: 'Approval', recurring: true, dept: 'Business Finance', deferred: true },
    { id: 'ACT-0120', name: 'IT / AMC allocation to Digital Asset books', scenario: 12, item: 'ARITM5304', itemDesc: 'IT and AMC recharge', expGL: '4282037', liabGL: '2445001', mode: 'Standing', route: 'Approval', recurring: true, dept: 'IT Finance' },
    { id: 'ACT-0201', name: 'TOCO rent', scenario: 'T', item: 'RENT-AOR', itemDesc: 'Tower rent - AOR', expGL: '4271004', liabGL: '1229564', mode: 'Reversal', route: 'Notification', recurring: true, dept: 'Network Infra' },
    { id: 'ACT-0202', name: 'TOCO electricity', scenario: 'T', item: 'ELEC-AOR', itemDesc: 'Site electricity - AOR', expGL: '4232001', liabGL: '1229564', mode: 'Reversal', route: 'Notification', recurring: true, dept: 'Network Infra' },
    { id: 'ACT-0203', name: 'TOCO diesel', scenario: 'T', item: 'DSL-AOR', itemDesc: 'Site diesel - AOR', expGL: '4282010', liabGL: '1229564', mode: 'Reversal', route: 'Notification', recurring: true, dept: 'Network Infra' }
  ];
  var SCEN = { 1: 'Input as per format', 2: 'Distributed by defined %', 3: 'Brand cross-charge (% of FSG)', 4: 'Partial expense and deferment', 5: 'Allocation to other legal entities', 6: 'Expense to revenue reclass', 7: 'Input at YTD level', 8: 'Trend basis', 9: 'Trend basis, PM related', 10: 'VTM', 11: 'Provision for COGS (deferred)', 12: 'Allocation (IT / AMC, Nxtra)', T: 'TOCO (DARTS)' };
  var vendors = {
    '410022': { name: 'SecureOne Facility Services Pvt Ltd', pan: 'AAJCS7712K', rpt: 'Non-RPT' },
    '410387': { name: 'Prism Power Systems Pvt Ltd', pan: 'AAGCP4410M', rpt: 'Non-RPT' },
    '410455': { name: 'Vertex Call Solutions Ltd', pan: 'AACCV2208H', rpt: 'Non-RPT' },
    '410612': { name: 'Lexwise Legal LLP', pan: 'AAKFL9031B', rpt: 'Non-RPT' },
    '200014': { name: 'Nxtra Data Ltd', pan: 'AAECN1176P', rpt: 'RPT' },
    '200031': { name: 'Xtelify Ltd', pan: 'AAACX5521L', rpt: 'RPT' },
    '412885': { name: 'Indus Towers Ltd', pan: 'AAACI3307Q', rpt: 'Non-RPT' },
    '412902': { name: 'Summit Digitel Infrastructure Ltd', pan: 'AAYCS6614E', rpt: 'Non-RPT' },
    '410790': { name: 'Telecom Industry Association', pan: 'AAATT1029D', rpt: 'Non-RPT' }
  };
  function urn(p) { return [p.bu, p.vcode, p.item, p.month].concat(p.locator ? [p.locator] : []).concat(p.dn ? [p.dn] : []).join('·'); }
  // status, age (days), amounts in Rs
  var provisions = [
    { ref: 'PRV-26-10412', bu: '111', buName: 'Mobile - Delhi', vcode: '410022', item: 'SECURITY001', act: 'ACT-0001', month: 'SEP-26', from: '01-Sep-2026', to: '30-Sep-2026', amount: 485000, actual: 0, status: 'Submitted', age: 1, source: 'Single entry', maker: 'B0MKR412', raised: '30-Sep-2026' },
    { bu: '111', buName: 'Mobile - Delhi', vcode: '410022', item: 'SECURITY001', act: 'ACT-0001', month: 'AUG-26', from: '01-Aug-2026', to: '31-Aug-2026', amount: 485000, actual: 0, status: 'Open', age: 31, source: 'Single entry', maker: 'B0MKR412', raised: '31-Aug-2026', erpDoc: 'GL-26-0814452' },
    { bu: '111', buName: 'Mobile - Delhi', vcode: '410022', item: 'SECURITY001', act: 'ACT-0001', month: 'JUL-26', from: '01-Jul-2026', to: '31-Jul-2026', amount: 470000, actual: 470000, status: 'Closed', age: 62, source: 'Single entry', maker: 'B0MKR412', raised: '31-Jul-2026', erpDoc: 'GL-26-0711208' },
    { bu: '121', buName: 'Mobile - UP East', vcode: '410387', item: 'AMCDG004', act: 'ACT-0014', month: 'SEP-26', from: '01-Sep-2026', to: '30-Sep-2026', amount: 1260000, actual: 0, status: 'Approved', age: 2, source: 'Bulk upload', maker: 'B0MKR519', raised: '29-Sep-2026' },
    { bu: '121', buName: 'Mobile - UP East', vcode: '410387', item: 'AMCDG004', act: 'ACT-0014', month: 'AUG-26', from: '01-Aug-2026', to: '31-Aug-2026', amount: 1260000, actual: 810000, status: 'Partially actualized', age: 31, source: 'Bulk upload', maker: 'B0MKR519', raised: '31-Aug-2026', erpDoc: 'GL-26-0814790' },
    { bu: '131', buName: 'Mobile - Karnataka', vcode: '410455', item: 'CCSVC002', act: 'ACT-0022', month: 'SEP-26', from: '01-Sep-2026', to: '30-Sep-2026', amount: 2140000, actual: 0, status: 'Interface error', age: 2, source: 'Single entry', maker: 'B0MKR233', raised: '29-Sep-2026', error: 'GL period SEP-26 closed for ledger AIRTEL_IN_LEDGER' },
    { bu: '131', buName: 'Mobile - Karnataka', vcode: '410455', item: 'CCSVC002', act: 'ACT-0022', month: 'JUN-26', from: '01-Jun-2026', to: '30-Jun-2026', amount: 2075000, actual: 0, status: 'Open', age: 92, source: 'Single entry', maker: 'B0MKR233', raised: '30-Jun-2026', erpDoc: 'GL-26-0612931', escalation: 'Business user (90 days)' },
    { ref: 'PRV-26-10398', bu: '101', buName: 'Corporate - Gurugram', vcode: '410612', item: 'LEGAL007', act: 'ACT-0031', month: 'SEP-26', from: '01-Sep-2026', to: '30-Sep-2026', amount: 350000, actual: 0, status: 'Returned', age: 1, source: 'Single entry', maker: 'B0MKR088', raised: '30-Sep-2026', reason: 'Attach the retainer agreement; amount differs from the agreed monthly fee' },
    { ref: 'PRV-26-10405', bu: '101', buName: 'Corporate - Gurugram', vcode: '410790', item: 'MEMBFEE01', act: 'ACT-0096', month: 'SEP-26', from: '01-Sep-2026', to: '30-Sep-2026', amount: 104583, actual: 0, status: 'Draft', age: 0, source: 'Single entry', maker: 'B0MKR088', raised: '' },
    { bu: '62206', buName: 'Xtelify Cloud - Haryana', vcode: '200031', item: 'ARITM5304', act: 'ACT-0120', month: 'AUG-26', from: '01-Aug-2026', to: '31-Aug-2026', amount: 9600000, actual: 0, status: 'Open', age: 31, source: 'Single entry', maker: 'B0GPA204', raised: '31-Aug-2026', erpDoc: 'GL-26-0815002', rptFlag: 'RPT' },
    { bu: '111', buName: 'Mobile - Delhi', vcode: '200014', item: 'DCRENT02', act: 'ACT-0090', month: 'MAY-26', from: '01-May-2026', to: '31-May-2026', amount: 1800000, actual: 0, status: 'Open', age: 153, source: 'Single entry', maker: 'B0BFN017', raised: '31-May-2026', erpDoc: 'GL-26-0512077', rptFlag: 'RPT', escalation: 'Business user (90 days)' },
    { bu: '141', buName: 'Mobile - Maharashtra', vcode: '410455', item: 'CCSVC002', act: 'ACT-0022', month: 'MAR-26', from: '01-Mar-2026', to: '31-Mar-2026', amount: 1950000, actual: 0, status: 'Open', age: 214, source: 'Single entry', maker: 'B0MKR301', raised: '31-Mar-2026', erpDoc: 'GL-26-0331544', escalation: 'Manager (180 days)', yep: true },
    { bu: '141', buName: 'Mobile - Maharashtra', vcode: '410387', item: 'AMCDG004', act: 'ACT-0014', month: 'DEC-25', from: '01-Dec-2025', to: '31-Dec-2025', amount: 760000, actual: 0, status: 'On hold', age: 305, source: 'Bulk upload', maker: 'B0MKR301', raised: '31-Dec-2025', erpDoc: 'GL-25-1229410', escalation: 'CFR (270 days)', hold: 'Vendor dispute under arbitration' },
    { bu: '121', buName: 'Mobile - UP East', vcode: '410022', item: 'SECURITY001', act: 'ACT-0001', month: 'AUG-25', from: '01-Aug-2025', to: '31-Aug-2025', amount: 410000, actual: 0, status: 'Reversed', age: 396, source: 'Single entry', maker: 'B0MKR519', raised: '31-Aug-2025', erpDoc: 'GL-25-0830118', note: 'Reversed under PBR (13 months) at close of Sep-26' },
    { bu: '131', buName: 'Mobile - Karnataka', vcode: '410612', item: 'LEGAL007', act: 'ACT-0031', month: 'JAN-26', from: '01-Jan-2026', to: '31-Jan-2026', amount: 300000, actual: 0, status: 'Force closed', age: 243, source: 'Single entry', maker: 'B0MKR233', raised: '31-Jan-2026', erpDoc: 'GL-26-0131650', note: 'No invoice expected - matter withdrawn; CFR approved 12-Sep-2026' },
    { bu: '111', buName: 'Mobile - Delhi', vcode: '410387', item: 'AMCDG004', act: 'ACT-0014', month: 'JUL-26', from: '01-Jul-2026', to: '31-Jul-2026', amount: 520000, actual: 0, status: 'Cancelled', age: 62, source: 'Single entry', maker: 'B0MKR412', raised: '31-Jul-2026', erpDoc: 'GL-26-0731311', note: 'PO 4500918822 raised in Oracle on 18-Sep-2026; provision settled against the PO' },
    { bu: '111', buName: 'Mobile - Delhi', vcode: '412885', item: 'RENT-AOR', act: 'ACT-0201', month: 'SEP-26', locator: '11106', from: '01-Sep-2026', to: '30-Sep-2026', amount: 3842500, actual: 0, status: 'Open', age: 1, source: 'DARTS', maker: 'DARTS feed', raised: '30-Sep-2026', erpDoc: 'GL-26-0930071' },
    { bu: '111', buName: 'Mobile - Delhi', vcode: '412885', item: 'ELEC-AOR', act: 'ACT-0202', month: 'AUG-26', locator: '11106', from: '01-Aug-2026', to: '31-Aug-2026', amount: 1127400, actual: 1098600, status: 'Partially actualized', age: 31, source: 'DARTS', maker: 'DARTS feed', raised: '31-Aug-2026', erpDoc: 'GL-26-0831402' },
    { bu: '121', buName: 'Mobile - UP East', vcode: '412902', item: 'DSL-AOR', act: 'ACT-0203', month: 'AUG-26', locator: '12114', from: '01-Aug-2026', to: '31-Aug-2026', amount: 264300, actual: 264300, status: 'Closed', age: 31, source: 'DARTS', maker: 'DARTS feed', raised: '31-Aug-2026', erpDoc: 'GL-26-0831433' },
    { bu: '111', buName: 'Mobile - Delhi', vcode: '412885', item: 'RENT-AOR', act: 'ACT-0201', month: 'AUG-26', locator: '11106', dn: 'DN-IT-26-0417', from: '01-Aug-2026', to: '31-Aug-2026', amount: 86200, actual: 0, status: 'Open', age: 14, source: 'Debit note', maker: 'Invoicing (DN validated)', raised: '17-Sep-2026', erpDoc: 'GL-26-0917019' },
    { ref: 'PRV-26-10377', bu: '101', buName: 'Corporate - Gurugram', vcode: '200031', item: 'BRANDCC01', act: 'ACT-0052', month: 'SEP-26', from: '01-Sep-2026', to: '30-Sep-2026', amount: 2450000, actual: 0, status: 'DOA exception', age: 3, source: 'Single entry', maker: 'B0BFN017', raised: '28-Sep-2026', rptFlag: 'RPT', doa: 'DOA API returned no approvers: no matrix for brand cross-charge (RPT)' },
    { ref: 'PRV-26-10431', bu: '151', buName: 'Mobile - Tamil Nadu', vcode: '410022', item: 'SECURITY001', act: 'ACT-0001', month: 'SEP-26', from: '01-Sep-2026', to: '30-Sep-2026', amount: 398000, actual: 0, status: 'Submitted', age: 1, source: 'Bulk upload', maker: 'B0MKR611', raised: '30-Sep-2026' }
  ];
  function pre(p) { return /^(Draft|Submitted|Returned|DOA exception)$/.test(p.status); }
  provisions.forEach(function (p, i) {
    if (!p.ref) p.ref = 'PRV-' + (p.raised ? p.raised.slice(-2) : '26') + '-' + (10000 + i * 13);
    p.pre = pre(p); p.key = p.pre ? p.ref : p.urn;
    var a = activities.filter(function (x) { return x.id === p.act; })[0];
    p.urn = urn(p); p.activity = a; p.vendor = vendors[p.vcode].name; p.rpt = p.rptFlag || vendors[p.vcode].rpt;
    p.scenario = a.scenario; p.scenarioName = SCEN[a.scenario]; p.balance = p.amount - p.actual; p.mode = a.mode;
  });
  return {
    today: '01-Oct-2026', activities: activities, scenarios: SCEN, vendors: vendors, provisions: provisions, urn: urn,
    statusTone: function (s) { return s === 'Closed' ? 'ok' : (s === 'Draft' || s === 'Reversed' || s === 'Force closed' || s === 'Cancelled') ? 'grey' : ''; },
    find: function (u) { return provisions.filter(function (p) { return p.urn === u || p.ref === u; })[0]; },
    rs: function (n) { return UI.inr(n, 2); }
  };
})();
