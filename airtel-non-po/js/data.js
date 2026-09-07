/* ==========================================================================
   Non-PO Automation Platform — mockup seed data.
   Codes, GLs, scenarios and rules are taken from the BRD (25 Aug 26), the
   Partner Portal spec v2 and the GPA Input Tracking Sheet (Apr'26).
   ========================================================================== */

const M = {
  /* Business units. Invoices are punched at locator level (11106, 11109) but
     actualization knocks off against the parent BU — BRD, TOCO §6. */
  bus: [
    { code: '111',   name: 'Bharti Airtel — Haryana',        parent: null,  entity: 'Bharti Airtel Ltd' },
    { code: '11106', name: 'Haryana — AOR North (locator)',  parent: '111', entity: 'Bharti Airtel Ltd' },
    { code: '11109', name: 'Haryana — AOR South (locator)',  parent: '111', entity: 'Bharti Airtel Ltd' },
    { code: '115',   name: 'Bharti Airtel — Punjab',         parent: null,  entity: 'Bharti Airtel Ltd' },
    { code: '219',   name: 'Xtelify Ltd — Digital',          parent: null,  entity: 'Xtelify Ltd' },
    { code: '40202', name: 'Bharti Telemedia — DTH',         parent: null,  entity: 'Bharti Telemedia Ltd' },
    { code: '30105', name: 'Nxtra Data Ltd — MSC Colo',      parent: null,  entity: 'Nxtra Data Ltd' }
  ],

  vendors: [
    { code: '412885', name: 'Haryana Power Utility',     rpt: false, group: 'Non Group', govt: true,  site: 'HR-PWR-01', gstin: '06AAACH1234M1Z5' },
    { code: '598210', name: 'Jones Lang LaSalle',        rpt: false, group: 'Non Group', govt: false, site: 'JLL-DEL-02', gstin: '07AAACJ7654K1ZP' },
    { code: '601144', name: 'Indus Towers Ltd',          rpt: false, group: 'Non Group', govt: false, site: 'IND-GGN-11', gstin: '06AABCI2345P1Z9' },
    { code: '700318', name: 'Nxtra Data Ltd',            rpt: true,  group: 'Group',     govt: false, site: 'NXT-MSC-04', gstin: '06AACCN8899R1ZQ' },
    { code: '512090', name: 'WAISL Ltd — IT AMC',        rpt: false, group: 'Non Group', govt: false, site: 'WAI-BLR-01', gstin: '29AAECW4567L1ZB' },
    { code: '488311', name: 'Sentinel Facility Services', rpt: false, group: 'Non Group', govt: false, site: 'SEN-GGN-03', gstin: '06AAFCS3344N1ZT' },
    { code: '655402', name: 'Onextel Media Pvt Ltd',     rpt: false, group: 'Non Group', govt: false, site: 'ONX-MUM-01', gstin: '27AAECO7712M1ZD' },
    { code: '390877', name: 'Bharti Airtel Services Ltd', rpt: true, group: 'Group',     govt: false, site: 'BASL-DEL-01', gstin: '07AAACB5555J1ZK' }
  ],

  /* Item master is synced from the ERP — Clarification Register Q3. */
  items: [
    { code: 'ELEC-AOR',  desc: 'Electricity — Area of Responsibility', expGL: '4271004', liabGL: '1229564', nature: 'Electricity', recurring: true,  reversal: true  },
    { code: 'RENT-AOR',  desc: 'Site Rent — Area of Responsibility',   expGL: '4271001', liabGL: '1229561', nature: 'Rent',        recurring: true,  reversal: false },
    { code: 'DSL-AOR',   desc: 'Diesel — Area of Responsibility',      expGL: '4271007', liabGL: '1229567', nature: 'Diesel',      recurring: true,  reversal: true  },
    { code: 'SEC-001',   desc: 'Security Services',                    expGL: '4272110', liabGL: '1229570', nature: 'Security',    recurring: true,  reversal: true  },
    { code: 'AMC-IT01',  desc: 'IT Annual Maintenance Contract',       expGL: '4310220', liabGL: '1229580', nature: 'AMC',         recurring: true,  reversal: false },
    { code: 'MSC-COLO',  desc: 'MSC Colocation — Space & Power',       expGL: '4651003', liabGL: '1229590', nature: 'Colocation',  recurring: true,  reversal: false },
    { code: 'SMS-BULK',  desc: 'Bulk SMS Platform Charges',            expGL: '4415009', liabGL: '1229595', nature: 'Platform',    recurring: true,  reversal: true  },
    { code: 'LEGAL-01',  desc: 'Legal Retainer',                       expGL: '4520011', liabGL: '1229599', nature: 'Legal',       recurring: true,  reversal: true  }
  ],

  departments: ['Network Operations', 'Infrastructure', 'IT Shared Services', 'Legal & Regulatory', 'Marketing', 'Supply Chain'],
  managers: ['Vipin Aggarwal', 'Shilpi Goyal', 'Alpesh Gupta', 'Naman Arien', 'Ritika Kanga', 'Prem Sharma'],

  /* GPA input tracking sheet — scenario classification and counts. */
  scenarios: [
    { id: 'STD',   name: 'User provides input as per format',      count: 171, straight: true  },
    { id: 'YTD',   name: 'Input received at YTD level',            count: 4,   straight: false },
    { id: 'TMPL',  name: 'Template based',                         count: 3,   straight: false },
    { id: 'E2R',   name: 'Expense to revenue reclass',             count: 3,   straight: false },
    { id: 'DEFER', name: 'Partially expense and deferment',        count: 3,   straight: false },
    { id: 'COGS',  name: 'Provision for COGS',                     count: 2,   straight: false },
    { id: 'APO',   name: 'APO allocate to other LE by %',          count: 2,   straight: false },
    { id: 'ALLOC', name: 'Allocation',                             count: 2,   straight: false },
    { id: 'TREND', name: 'Trend basis provision',                  count: 2,   straight: false },
    { id: 'BRAND', name: 'Brand cross charge by % of FSG',         count: 2,   straight: false },
    { id: 'TRPM',  name: 'Trend basis — PM related',               count: 1,   straight: false },
    { id: 'VTM',   name: 'VTM provisioning',                       count: 1,   straight: false },
    { id: 'PCT',   name: 'Input distributed by defined %',         count: 1,   straight: false }
  ],

  /* Partner Portal categories — Partners Portal spec v2, §6 Step 1. */
  categories: [
    { id: 'PM-CTOCO', mod: 'PM', name: 'Central Toco',          desc: 'Locator-wise booking against Technical ID / TOCO ID.', sla: 'T+2', fields: 'locator' },
    { id: 'PM-LTOCO', mod: 'PM', name: 'Local Toco',            desc: 'As Central Toco, plus supplier site name.',            sla: 'T+2', fields: 'locator' },
    { id: 'PM-LLEB',  mod: 'PM', name: 'LL_EB — Electricity & DG', desc: 'Meter start / end readings and billing period.',    sla: 'T+2', fields: 'meter'   },
    { id: 'PM-RSD',   mod: 'PM', name: 'LL Rent / Security Deposit', desc: 'Landlord rent and SD against lease schedule.',    sla: 'T+2', fields: 'locator' },
    { id: 'PM-BWD',   mod: 'PM', name: 'Bandwidth — Domestic',   desc: 'Domestic bandwidth circuits, locator wise.',           sla: 'T+2', fields: 'locator' },
    { id: 'PM-BWI',   mod: 'PM', name: 'Bandwidth — International', desc: 'ILD / port / peering charges.',                    sla: 'T+2', fields: 'locator' },
    { id: 'AP-LLGST', mod: 'AP', name: 'LL_GST on Rent',         desc: 'GST only — allowed once the rent itself is paid.',     sla: 'T+3', fields: 'llgst'   },
    { id: 'AP-GDN',   mod: 'AP', name: 'Govt Demand Note',       desc: 'Minimal set — circle, site, vendor, amount.',          sla: 'T+3', fields: 'basic'   },
    { id: 'AP-SACFA', mod: 'AP', name: 'Legal / SACFA',          desc: 'SACFA application number and date.',                   sla: 'T+3', fields: 'basic'   },
    { id: 'AP-ROW',   mod: 'AP', name: 'ROW — Right of Way',     desc: 'Right of way charges to civic authorities.',           sla: 'T+3', fields: 'basic'   },
    { id: 'AP-RUSH',  mod: 'AP', name: 'Rush',                   desc: 'Priority handling. Rush reason mandatory.',            sla: 'Same day / T+1', fields: 'rush' },
    { id: 'AP-OTH',   mod: 'AP', name: 'Others',                 desc: 'Bank charges, NFA advance, group company.',            sla: 'T+3', fields: 'basic'   }
  ],

  /* Rules configuration — Clarification Register groups D and F. */
  config: {
    pbrMonths: 13, fyEnd: '31 Mar 2026', escalation: [90, 180, 270, 365],
    autoReverseMonths: 13, crossChargeMarkup: 11,
    deferment: [
      { cat: 'DG',         pct: 72, life: 35, note: 'Per-motor, GL 4563005 for specific vendors' },
      { cat: 'XFE',        pct: 90, life: 36, note: '' },
      { cat: 'OR',         pct: 78, life: null, note: 'Life to be confirmed' },
      { cat: 'Own retail', pct: null, life: 35, note: '35 / 36 months by sub-category' },
      { cat: 'IPTV',       pct: null, life: 55, note: '' },
      { cat: 'Homes',      pct: null, life: 55, note: '' }
    ]
  }
};

/* --------------------------------------------------------------------------
   Provisions. The Jun-26 electricity provision (P-0001) and the Apr/May/Jun
   rent trio (P-0006..8) are the two walkthroughs from the Primer, so the
   demo thread runs end to end.
   -------------------------------------------------------------------------- */
const PROVISIONS = [
  { id:'P-0001', urn:'111-412885-ELECAOR-JUN26', bu:'111', vendor:'412885', item:'ELEC-AOR', month:'JUN26',
    amount:20000, consumed:19600, status:'PARTIAL', reversal:true, rpt:false, scenario:'STD',
    periodFrom:'01 Jun 2026', periodTo:'30 Jun 2026', dept:'Network Operations', manager:'Vipin Aggarwal',
    basis:'Metabase meter reading feed', source:'Metabase (DARTS)', createdBy:'Prem Sharma',
    createdOn:'30 Jun 2026', postedOn:'30 Jun 2026', jv:'JV-2026-06-88214', age:69, hold:false, locator:'11106' },

  { id:'P-0002', urn:'111-412885-ELECAOR-JUL26', bu:'111', vendor:'412885', item:'ELEC-AOR', month:'JUL26',
    amount:21400, consumed:0, status:'OPEN', reversal:true, rpt:false, scenario:'STD',
    periodFrom:'01 Jul 2026', periodTo:'31 Jul 2026', dept:'Network Operations', manager:'Vipin Aggarwal',
    basis:'Carry-forward — Jun invoice not received', source:'Metabase (DARTS)', createdBy:'System — carry forward',
    createdOn:'31 Jul 2026', postedOn:'31 Jul 2026', jv:'JV-2026-07-90551', age:38, hold:false, locator:'11106' },

  { id:'P-0003', urn:'111-601144-RENTAOR-AUG26', bu:'111', vendor:'601144', item:'RENT-AOR', month:'AUG26',
    amount:1846500, consumed:0, status:'PENDING', reversal:false, rpt:false, scenario:'STD',
    periodFrom:'01 Aug 2026', periodTo:'31 Aug 2026', dept:'Infrastructure', manager:'Shilpi Goyal',
    basis:'Indus master rent schedule — 1,231 sites', source:'Non-PO Portal', createdBy:'Naman Arien',
    createdOn:'31 Aug 2026', postedOn:null, jv:null, age:7, hold:false, locator:null },

  { id:'P-0004', urn:'30105-700318-MSCCOLO-AUG26', bu:'30105', vendor:'700318', item:'MSC-COLO', month:'AUG26',
    amount:4200000, consumed:0, status:'OPEN', reversal:false, rpt:true, scenario:'PCT',
    periodFrom:'01 Aug 2026', periodTo:'31 Aug 2026', dept:'IT Shared Services', manager:'Alpesh Gupta',
    basis:'MSC Colo 60% cost split — Nxtra allocation master', source:'Non-PO Portal', createdBy:'Ritika Kanga',
    createdOn:'31 Aug 2026', postedOn:'31 Aug 2026', jv:'JV-2026-08-93017', age:7, hold:false, locator:null },

  { id:'P-0005', urn:'111-488311-SEC001-MAR26', bu:'111', vendor:'488311', item:'SEC-001', month:'MAR26',
    amount:512000, consumed:0, status:'OPEN', reversal:false, rpt:false, scenario:'STD',
    periodFrom:'01 Mar 2026', periodTo:'31 Mar 2026', dept:'Infrastructure', manager:'Shilpi Goyal',
    basis:'Manpower deployment sheet — 64 guards', source:'Non-PO Portal', createdBy:'Prem Sharma',
    createdOn:'31 Mar 2026', postedOn:'31 Mar 2026', jv:'JV-2026-03-71120', age:160, hold:false, locator:null, yep:true },

  { id:'P-0006', urn:'111-598210-RENTAOR-APR26', bu:'111', vendor:'598210', item:'RENT-AOR', month:'APR26',
    amount:10000, consumed:10000, status:'CLOSED', reversal:false, rpt:false, scenario:'STD',
    periodFrom:'01 Apr 2026', periodTo:'30 Apr 2026', dept:'Infrastructure', manager:'Shilpi Goyal',
    basis:'Lease schedule — ground rent', source:'Non-PO Portal', createdBy:'Naman Arien',
    createdOn:'30 Apr 2026', postedOn:'30 Apr 2026', jv:'JV-2026-04-74882', age:130, hold:false, locator:null },

  { id:'P-0007', urn:'111-598210-RENTAOR-MAY26', bu:'111', vendor:'598210', item:'RENT-AOR', month:'MAY26',
    amount:10000, consumed:10000, status:'CLOSED', reversal:false, rpt:false, scenario:'STD',
    periodFrom:'01 May 2026', periodTo:'31 May 2026', dept:'Infrastructure', manager:'Shilpi Goyal',
    basis:'Lease schedule — ground rent', source:'Non-PO Portal', createdBy:'Naman Arien',
    createdOn:'31 May 2026', postedOn:'31 May 2026', jv:'JV-2026-05-79340', age:99, hold:false, locator:null },

  { id:'P-0008', urn:'111-598210-RENTAOR-JUN26', bu:'111', vendor:'598210', item:'RENT-AOR', month:'JUN26',
    amount:10000, consumed:10000, status:'CLOSED', reversal:false, rpt:false, scenario:'STD',
    periodFrom:'01 Jun 2026', periodTo:'30 Jun 2026', dept:'Infrastructure', manager:'Shilpi Goyal',
    basis:'Lease schedule — ground rent', source:'Non-PO Portal', createdBy:'Naman Arien',
    createdOn:'30 Jun 2026', postedOn:'30 Jun 2026', jv:'JV-2026-06-88903', age:69, hold:false, locator:null },

  { id:'P-0009', urn:'115-512090-AMCIT01-JUL25', bu:'115', vendor:'512090', item:'AMC-IT01', month:'JUL25',
    amount:875000, consumed:0, status:'OPEN', reversal:false, rpt:false, scenario:'DEFER',
    periodFrom:'01 Jul 2025', periodTo:'31 Jul 2025', dept:'IT Shared Services', manager:'Alpesh Gupta',
    basis:'WAISL AMC — annual contract, deferred', source:'Non-PO Portal', createdBy:'Ritika Kanga',
    createdOn:'31 Jul 2025', postedOn:'31 Jul 2025', jv:'JV-2025-07-41209', age:403, hold:false, locator:null, pbr:true },

  { id:'P-0010', urn:'219-655402-SMSBULK-JUN25', bu:'219', vendor:'655402', item:'SMS-BULK', month:'JUN25',
    amount:1340000, consumed:0, status:'HOLD', reversal:false, rpt:false, scenario:'STD',
    periodFrom:'01 Jun 2025', periodTo:'30 Jun 2025', dept:'Marketing', manager:'Naman Arien',
    basis:'Onextel platform usage — disputed volume', source:'Non-PO Portal', createdBy:'Prem Sharma',
    createdOn:'30 Jun 2025', postedOn:'30 Jun 2025', jv:'JV-2025-06-38771', age:434, hold:true,
    holdReason:'Volume dispute with vendor — CFR notified 12 Feb 2026', locator:null },

  { id:'P-0011', urn:'40202-390877-LEGAL01-AUG26', bu:'40202', vendor:'390877', item:'LEGAL-01', month:'AUG26',
    amount:650000, consumed:0, status:'FAILED', reversal:false, rpt:true, scenario:'STD',
    periodFrom:'01 Aug 2026', periodTo:'31 Aug 2026', dept:'Legal & Regulatory', manager:'Vipin Aggarwal',
    basis:'BASL legal retainer — cross entity', source:'Non-PO Portal', createdBy:'Ritika Kanga',
    createdOn:'31 Aug 2026', postedOn:null, jv:null, age:7, hold:false, locator:null,
    failure:'ORA-20001: Accounting flexfield 40202-0000000-4520011-000-00-00000-000-0000-00000 is invalid — IUT segment required for Related Party category' },

  { id:'P-0012', urn:'111-412885-DSLAOR-JUL26', bu:'111', vendor:'412885', item:'DSL-AOR', month:'JUL26',
    amount:342000, consumed:118000, status:'PARTIAL', reversal:true, rpt:false, scenario:'STD',
    periodFrom:'01 Jul 2026', periodTo:'31 Jul 2026', dept:'Network Operations', manager:'Vipin Aggarwal',
    basis:'Metabase diesel consumption feed', source:'Metabase (DARTS)', createdBy:'System — DARTS',
    createdOn:'31 Jul 2026', postedOn:'31 Jul 2026', jv:'JV-2026-07-90612', age:38, hold:false, locator:'11109' },

  { id:'P-0013', urn:'111-601144-RENTAOR-JUL25', bu:'111', vendor:'601144', item:'RENT-AOR', month:'JUL25',
    amount:1802000, consumed:0, status:'REVERSED', reversal:false, rpt:false, scenario:'STD',
    periodFrom:'01 Jul 2025', periodTo:'31 Jul 2025', dept:'Infrastructure', manager:'Shilpi Goyal',
    basis:'Indus master rent schedule', source:'Non-PO Portal', createdBy:'Naman Arien',
    createdOn:'31 Jul 2025', postedOn:'31 Jul 2025', jv:'JV-2025-07-41880', age:403, hold:false, locator:null,
    reversedOn:'31 Aug 2026', reversedWhy:'Auto reversal — 13 month ageing threshold reached' },

  { id:'P-0014', urn:'115-488311-SEC001-AUG26', bu:'115', vendor:'488311', item:'SEC-001', month:'AUG26',
    amount:298000, consumed:0, status:'PENDING', reversal:false, rpt:false, scenario:'STD',
    periodFrom:'01 Aug 2026', periodTo:'31 Aug 2026', dept:'Infrastructure', manager:'Shilpi Goyal',
    basis:'Manpower deployment sheet — 37 guards', source:'Bulk upload NPB-2026-0912', createdBy:'Naman Arien',
    createdOn:'31 Aug 2026', postedOn:null, jv:null, age:7, hold:false, locator:null }
];

/* --------------------------------------------------------------------------
   Invoices arriving from the Partner Portal / PM / AP.
   -------------------------------------------------------------------------- */
const INVOICES = [
  { ref:'NONPO-2026-0012345', invNo:'HPU/JUN26/44120', vendor:'412885', category:'PM-LLEB',
    invDate:'20 Aug 2026', amount:19600, gst:0, bookedBU:'11106', serviceFrom:'01 Jun 2026', serviceTo:'30 Jun 2026',
    urn:'111-412885-ELECAOR-JUN26', status:'MATCHED', match:'EXACT', rush:false, batch:null,
    submittedOn:'20 Aug 2026', bookedOn:'22 Aug 2026', erpDoc:'AP-2026-441201', matchedOn:'22 Aug 2026' },

  { ref:'NONPO-2026-0012410', invNo:'JLL/Q2/2026/0881', vendor:'598210', category:'PM-RSD',
    invDate:'05 Jul 2026', amount:60000, gst:0, bookedBU:'111', serviceFrom:'01 Apr 2026', serviceTo:'30 Sep 2026',
    urn:null, status:'MULTI', match:'MULTI', rush:false, batch:null,
    submittedOn:'05 Jul 2026', bookedOn:'08 Jul 2026', erpDoc:'AP-2026-448820', matchedOn:'08 Jul 2026',
    note:'Six month invoice — three provisioned months actualized, three future months to prepaid.' },

  { ref:'NONPO-2026-0013188', invNo:'IND/HR/AUG26/7712', vendor:'601144', category:'PM-CTOCO',
    invDate:'02 Sep 2026', amount:1846500, gst:332370, bookedBU:'11106', serviceFrom:'01 Aug 2026', serviceTo:'31 Aug 2026',
    urn:null, status:'UNMATCHED', match:null, rush:false, batch:'BATCH-2026-0904',
    submittedOn:'02 Sep 2026', bookedOn:'04 Sep 2026', erpDoc:'PM-2026-771208',
    note:'Provision for this month is still awaiting DOA approval.' },

  { ref:'NONPO-2026-0013204', invNo:'SEN/GGN/0442', vendor:'488311', category:'AP-OTH',
    invDate:'03 Sep 2026', amount:0, gst:0, bookedBU:'115', serviceFrom:null, serviceTo:null,
    urn:null, status:'VALIDATION_FAILED', match:null, rush:false, batch:'BATCH-2026-0904',
    submittedOn:'03 Sep 2026', bookedOn:null, erpDoc:null,
    fails:['Invoice amount is mandatory and must be greater than zero',
           'Service period From / To not supplied — FIFO fallback would apply',
           'Supporting document missing for category Others'] },

  { ref:'NONPO-2026-0013219', invNo:'WAISL/AMC/2025/118', vendor:'512090', category:'AP-OTH',
    invDate:'04 Sep 2026', amount:875000, gst:157500, bookedBU:'115', serviceFrom:'01 Jul 2025', serviceTo:'31 Jul 2025',
    urn:null, status:'UNMATCHED', match:null, rush:false, batch:'BATCH-2026-0904',
    submittedOn:'04 Sep 2026', bookedOn:'05 Sep 2026', erpDoc:'AP-2026-449901',
    note:'Service period falls inside the PBR window for an Aug-26 close.' },

  { ref:'NONPO-2026-0013301', invNo:'ONX/PLT/2025/0620', vendor:'655402', category:'AP-RUSH',
    invDate:'05 Sep 2026', amount:1340000, gst:241200, bookedBU:'219', serviceFrom:'01 Jun 2025', serviceTo:'30 Jun 2025',
    urn:null, status:'RFI', match:null, rush:true, rushReason:'Vendor payment on statutory deadline — 08 Sep 2026',
    batch:null, submittedOn:'05 Sep 2026', bookedOn:null, erpDoc:null,
    note:'Matching provision is on hold pending a volume dispute.' },

  { ref:'NONPO-2026-0013340', invNo:'NXT/MSC/AUG/0091', vendor:'700318', category:'AP-OTH',
    invDate:'06 Sep 2026', amount:4200000, gst:756000, bookedBU:'30105', serviceFrom:'01 Aug 2026', serviceTo:'31 Aug 2026',
    urn:'30105-700318-MSCCOLO-AUG26', status:'BOOKED', match:null, rush:false, batch:null,
    submittedOn:'06 Sep 2026', bookedOn:'07 Sep 2026', erpDoc:'AP-2026-450118',
    note:'URN tagged by the vendor from the seeded template — no derivation needed.' },

  { ref:'NONPO-2026-0013355', invNo:'HPU/JUL26/44980', vendor:'412885', category:'PM-LLEB',
    invDate:'06 Sep 2026', amount:20950, gst:0, bookedBU:'11109', serviceFrom:'01 Jul 2026', serviceTo:'31 Jul 2026',
    urn:null, status:'UNMATCHED', match:null, rush:false, batch:'BATCH-2026-0907',
    submittedOn:'06 Sep 2026', bookedOn:'07 Sep 2026', erpDoc:'PM-2026-771390',
    note:'Booked at locator 11109; the Jul-26 provision sits at locator 11106.' },

  { ref:'NONPO-2026-0013361', invNo:'JLL/GST/2026/0219', vendor:'598210', category:'AP-LLGST',
    invDate:'06 Sep 2026', amount:0, gst:10800, bookedBU:'111', serviceFrom:'01 Apr 2026', serviceTo:'30 Jun 2026',
    urn:null, status:'UNDER_VALIDATION', match:null, rush:false, batch:null,
    submittedOn:'06 Sep 2026', bookedOn:null, erpDoc:null,
    note:'GST only. Base rent of ₹60,000 confirmed paid; 18% cap is ₹10,800.' },

  { ref:'NONPO-2026-0013372', invNo:'BASL/LEG/AUG/0044', vendor:'390877', category:'AP-OTH',
    invDate:'07 Sep 2026', amount:650000, gst:117000, bookedBU:'40202', serviceFrom:'01 Aug 2026', serviceTo:'31 Aug 2026',
    urn:null, status:'SUBMITTED', match:null, rush:false, batch:null,
    submittedOn:'07 Sep 2026', bookedOn:null, erpDoc:null },

  { ref:'NONPO-2026-0013380', invNo:'IND/HR/SEP26/7801', vendor:'601144', category:'PM-CTOCO',
    invDate:'07 Sep 2026', amount:1851200, gst:333216, bookedBU:'11106', serviceFrom:'01 Sep 2026', serviceTo:'30 Sep 2026',
    urn:null, status:'OCR', match:null, rush:false, batch:'BATCH-2026-0907',
    submittedOn:'07 Sep 2026', bookedOn:null, erpDoc:null }
];

/* Batches for the partner bulk-upload screens. */
const BATCHES = [
  { id:'BATCH-2026-0907', category:'PM-CTOCO', file:'indus_haryana_sep26_locators.xlsx', rows:412,
    ok:389, warn:14, fail:9, on:'07 Sep 2026 09:14', by:'Indus Towers Ltd', status:'PROCESSING' },
  { id:'BATCH-2026-0904', category:'AP-OTH', file:'ap_rush_batch_04sep.xlsx', rows:38,
    ok:31, warn:3, fail:4, on:'04 Sep 2026 16:42', by:'Airtel AP Team', status:'COMPLETE' },
  { id:'BATCH-2026-0829', category:'PM-LLEB', file:'llb_electricity_aug26.xlsx', rows:1180,
    ok:1180, warn:0, fail:0, on:'29 Aug 2026 11:03', by:'Haryana Power Utility', status:'COMPLETE' }
];

/* Bulk provision upload — row level results for the internal bulk screen. */
const BULK_ROWS = [
  { r:1, bu:'115', vendor:'488311', item:'SEC-001',  month:'AUG26', amount:298000, ok:true,  msg:'Accepted — queued for approval' },
  { r:2, bu:'115', vendor:'488311', item:'SEC-001',  month:'AUG26', amount:112000, ok:false, msg:'Duplicate — a provision already exists for this BU, vendor, item and month' },
  { r:3, bu:'111', vendor:'601144', item:'RENT-AOR', month:'AUG26', amount:1846500, ok:true,  msg:'Accepted — queued for approval' },
  { r:4, bu:'111', vendor:'999104', item:'RENT-AOR', month:'AUG26', amount:44000,  ok:false, msg:'Vendor code 999104 not found in the vendor master' },
  { r:5, bu:'219', vendor:'655402', item:'SMS-BULK', month:'AUG26', amount:980000, ok:true,  msg:'Accepted — recurring pattern matched, 11 of last 12 months' },
  { r:6, bu:'111', vendor:'412885', item:'ELEC-XXX', month:'AUG26', amount:23100,  ok:false, msg:'Item code ELEC-XXX does not exist — raise an MDM request' },
  { r:7, bu:'40202', vendor:'390877', item:'LEGAL-01', month:'JUL26', amount:650000, ok:false, msg:'GL period JUL-26 is closed for posting' },
  { r:8, bu:'30105', vendor:'700318', item:'MSC-COLO', month:'AUG26', amount:4200000, ok:true, msg:'Accepted — Related Party, IUT segment resolved' }
];

/* Prior-month trial balance for the real-time flash screen. */
const TB = [
  { gl:'4271001', name:'Site Rent',                closing:184650000, mine:1846500, others:2110400 },
  { gl:'4271004', name:'Electricity',              closing:62180000,  mine:20000,   others:412900 },
  { gl:'4271007', name:'Diesel',                   closing:28440000,  mine:342000,  others:88100 },
  { gl:'4272110', name:'Security Services',        closing:19220000,  mine:810000,  others:0 },
  { gl:'4310220', name:'IT Maintenance',           closing:41090000,  mine:875000,  others:1200000 },
  { gl:'4651003', name:'Colocation — Space & Power', closing:98330000, mine:4200000, others:0 },
  { gl:'4415009', name:'Platform Charges',         closing:33710000,  mine:1340000, others:0 },
  { gl:'1229561', name:'Provision for Expenses — Rent', closing:-21140000, mine:-1846500, others:-2110400 },
  { gl:'1229564', name:'Provision for Expenses — Power', closing:-3880000, mine:-20000, others:-412900 }
];

/* --------------------------------------------------------------------------
   Extra depth for the Partner Portal persona — Indus Towers Ltd (601144),
   which books locator-wise through the PM module.
   -------------------------------------------------------------------------- */
PROVISIONS.push(
  { id:'P-0020', urn:'111-601144-RENTAOR-SEP26-11106', bu:'111', vendor:'601144', item:'RENT-AOR', month:'SEP26',
    amount:924300, consumed:0, status:'OPEN', reversal:false, rpt:false, scenario:'STD',
    periodFrom:'01 Sep 2026', periodTo:'30 Sep 2026', dept:'Infrastructure', manager:'Shilpi Goyal',
    basis:'Indus rent schedule — AOR North, 611 sites', source:'Non-PO Portal', createdBy:'Naman Arien',
    createdOn:'31 Aug 2026', postedOn:'31 Aug 2026', jv:'JV-2026-08-93440', age:7, hold:false, locator:'11106' },

  { id:'P-0021', urn:'111-601144-RENTAOR-SEP26-11109', bu:'111', vendor:'601144', item:'RENT-AOR', month:'SEP26',
    amount:926900, consumed:0, status:'OPEN', reversal:false, rpt:false, scenario:'STD',
    periodFrom:'01 Sep 2026', periodTo:'30 Sep 2026', dept:'Infrastructure', manager:'Shilpi Goyal',
    basis:'Indus rent schedule — AOR South, 620 sites', source:'Non-PO Portal', createdBy:'Naman Arien',
    createdOn:'31 Aug 2026', postedOn:'31 Aug 2026', jv:'JV-2026-08-93441', age:7, hold:false, locator:'11109' },

  { id:'P-0022', urn:'115-601144-RENTAOR-AUG26', bu:'115', vendor:'601144', item:'RENT-AOR', month:'AUG26',
    amount:1122400, consumed:1122400, status:'CLOSED', reversal:false, rpt:false, scenario:'STD',
    periodFrom:'01 Aug 2026', periodTo:'31 Aug 2026', dept:'Infrastructure', manager:'Shilpi Goyal',
    basis:'Indus rent schedule — Punjab', source:'Non-PO Portal', createdBy:'Naman Arien',
    createdOn:'31 Aug 2026', postedOn:'31 Aug 2026', jv:'JV-2026-08-93502', age:7, hold:false, locator:null },

  { id:'P-0023', urn:'111-601144-DSLAOR-AUG26', bu:'111', vendor:'601144', item:'DSL-AOR', month:'AUG26',
    amount:488000, consumed:0, status:'OPEN', reversal:true, rpt:false, scenario:'STD',
    periodFrom:'01 Aug 2026', periodTo:'31 Aug 2026', dept:'Network Operations', manager:'Vipin Aggarwal',
    basis:'Indus DG running hours — Metabase', source:'Metabase (DARTS)', createdBy:'System — DARTS',
    createdOn:'31 Aug 2026', postedOn:'31 Aug 2026', jv:'JV-2026-08-93610', age:7, hold:false, locator:null }
);

INVOICES.push(
  { ref:'NONPO-2026-0013012', invNo:'IND/PB/AUG26/7688', vendor:'601144', category:'PM-CTOCO',
    invDate:'28 Aug 2026', amount:1122400, gst:202032, bookedBU:'115', serviceFrom:'01 Aug 2026', serviceTo:'31 Aug 2026',
    urn:'115-601144-RENTAOR-AUG26', status:'MATCHED', match:'EXACT', rush:false, batch:'BATCH-2026-0829',
    submittedOn:'28 Aug 2026', bookedOn:'29 Aug 2026', erpDoc:'PM-2026-768840', matchedOn:'29 Aug 2026' },

  { ref:'NONPO-2026-0013410', invNo:'IND/HR/DG/AUG26/0912', vendor:'601144', category:'PM-LLEB',
    invDate:'07 Sep 2026', amount:488000, gst:87840, bookedBU:'11106', serviceFrom:'01 Aug 2026', serviceTo:'31 Aug 2026',
    urn:null, status:'UNDER_VALIDATION', match:null, rush:false, batch:'BATCH-2026-0907',
    submittedOn:'07 Sep 2026', bookedOn:null, erpDoc:null,
    note:'DG running hours invoice — matches the Metabase diesel provision.' },

  { ref:'NONPO-2026-0013415', invNo:'IND/HR/SEP26/7811', vendor:'601144', category:'PM-CTOCO',
    invDate:'07 Sep 2026', amount:924300, gst:166374, bookedBU:'11106', serviceFrom:'01 Sep 2026', serviceTo:'30 Sep 2026',
    urn:'111-601144-RENTAOR-SEP26-11106', status:'SUBMITTED', match:null, rush:false, batch:'BATCH-2026-0907',
    submittedOn:'07 Sep 2026', bookedOn:null, erpDoc:null,
    note:'URN carried through from the seeded template — no derivation needed.' },

  { ref:'NONPO-2026-0013088', invNo:'IND/HR/JUL26/7590', vendor:'601144', category:'PM-CTOCO',
    invDate:'12 Aug 2026', amount:1841200, gst:331416, bookedBU:'11109', serviceFrom:'01 Jul 2026', serviceTo:'31 Jul 2026',
    urn:null, status:'REJECTED', match:null, rush:false, batch:null,
    submittedOn:'12 Aug 2026', bookedOn:null, erpDoc:null,
    fails:['Locator 11109 is not valid for the Technical IDs supplied on rows 44–91',
           'Duplicate — invoice IND/HR/JUL26/7590 was already booked under PM-2026-770118 on 09 Aug 2026'] }
);
