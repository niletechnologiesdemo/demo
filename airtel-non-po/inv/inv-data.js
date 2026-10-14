/* Shared mock data for the Non-PO Invoicing wireframes (illustrative only).
   Reference numbers NPO-2627-nnnnnn are issued by the portal when a submission is accepted (HLD 5.2).
   GSTIN = state code + PAN + entity code + Z + check character, so PAN = GSTIN characters 3 to 12.
   Within a state CGST = SGST = 9%; across states IGST = 18%. */
window.INV = (function () {
  var today = '01-Oct-2026';

  /* ------------------------------------------------ invoice families and sub-categories (HLD 6.1; AP-Invoice Category, Paygroup, DOA) */
  var FAM = { PM: 'Property Manager', AP: 'Rush / AP', DN: 'Debit notes' };
  var cats = [
    // Property Manager: booked locator-wise in the PM module, then approved in Oracle under the budget-head DOA
    { id: 'central-toco', fam: 'PM', name: 'Central ToCo', page: 'inv-04', booked: 'PM module', invType: 'Locator-wise lines', approval: 'Budget-head DOA in Oracle, after booking', sla: 'T+2', term: 'From vendor master by supplier GSTIN', payGroup: '-', payAlone: '-', bulk: true,
      text: 'Rent, energy and related charges from the national tower companies, across many sites', locator: 'PN Site Attribute report (active, then inactive) by circle + site ID + technical ID, then the locator master', tol: 'Rs 5 against OCR (Rs 20 either way for Bharti Infratel)' },
    { id: 'local-toco', fam: 'PM', name: 'Local ToCo', page: 'inv-04', booked: 'PM module', invType: 'Locator-wise lines', approval: 'Budget-head DOA in Oracle, after booking', sla: 'T+2', term: 'From vendor master', payGroup: '-', payAlone: '-', bulk: true,
      text: 'Regional tower companies; meter readings where energy is billed', locator: 'ToCo master by site ID and BU code', tol: 'Rs 2 against OCR' },
    { id: 'bw-dom', fam: 'PM', name: 'Bandwidth Domestic', page: 'inv-04', booked: 'PM module', invType: 'Locator-wise lines', approval: 'Budget-head DOA in Oracle, after booking', sla: 'T+2', term: '100% payment within 15 days after receipt', payGroup: '-', payAlone: '-', bulk: true,
      text: 'Domestic circuits billed per circuit ID', locator: 'Bandwidth cost sheet by circuit ID', tol: 'Rs 10 against the pro-rated MRC / QTRC / ARC in the cost sheet' },
    { id: 'bw-intl', fam: 'PM', name: 'Bandwidth International', page: 'inv-04', booked: 'PM module', invType: 'Locator-wise lines', approval: 'Budget-head DOA in Oracle, after booking', sla: 'T+2', term: 'As given in the PM upload format', payGroup: '-', payAlone: '-', bulk: true,
      text: 'International bandwidth in the PM upload format; foreign currency supported', locator: 'Given in the PM upload format', tol: 'Rs 2, or 0.2 for non-INR invoices' },
    { id: 'll-eb', fam: 'PM', name: 'LL_EB (landlord electricity)', page: 'inv-04', booked: 'PM module', invType: 'Locator-wise lines', approval: 'Budget-head DOA in Oracle, after booking', sla: 'T+2', term: 'From PM master', payGroup: '-', payAlone: '-', bulk: true, tbc: 'Whether vendors submit LL_EB: its format is the circle input sheet (HLD 6.2.6)',
      text: 'Landlord electricity reimbursement with meter readings', locator: 'PM master by site ID', tol: 'Input sheet = OCR = Oracle booking amount' },
    { id: 'll-sd', fam: 'PM', name: 'LL Rent SD', page: 'inv-04', booked: 'PM module', invType: 'Locator-wise lines', approval: 'Budget-head DOA in Oracle, after booking', sla: 'T+2', term: 'From PM master', payGroup: '-', payAlone: '-', bulk: true,
      text: 'Rental security deposit (prepayment opex head: no GST or TDS category)', locator: 'PM master by site ID', tol: '-' },
    { id: 'govt-dn', fam: 'PM', name: 'Govt Demand Note', page: 'inv-04', booked: 'PM module', invType: 'Locator-wise lines', approval: 'Budget-head DOA in Oracle, after booking', sla: 'T+2', term: 'From PM master', payGroup: '-', payAlone: '-', bulk: true, tbc: 'Govt Demand Note: further rules and approvals',
      text: 'Government demand notes for sites', locator: 'PM master by site ID', tol: '-' },
    { id: 'diesel', fam: 'PM', name: 'Diesel Knock off', page: 'inv-04', booked: 'PM module', invType: 'Locator-wise lines', approval: 'Budget-head DOA in Oracle, after booking', sla: 'T+2', term: 'From vendor master', payGroup: '-', payAlone: '-', bulk: true, tbc: 'Diesel Knock off: input format and rules',
      text: 'Diesel supplied to sites', locator: 'PM master by site ID', tol: '-' },
    // Rush / AP: approved on the portal first, then booked document-wise in the AP module
    { id: 'll-gst', fam: 'AP', name: 'LL_GST (landlord GST)', page: 'inv-06', booked: 'AP module', invType: 'STANDARD (two lines)', approval: 'PHD checklist review, then force approval', sla: 'T+2 / T+3', term: 'Controlled Expense - Property Manager Transactions', payGroup: 'NETWORK RENT', payAlone: 'No', bulk: false,
      text: 'GST on rent already paid, against one rent voucher' },
    { id: 'rush', fam: 'AP', name: 'Rush', page: 'inv-05', booked: 'AP module', invType: 'STANDARD', approval: 'Force approval or DOA initiation', sla: 'Same day / T+1', term: 'IMMEDIATE', payGroup: 'Autopick', payAlone: 'As per user', bulk: false,
      text: 'Urgent payments limited to predefined Rush scenarios; Rush reason mandatory' },
    { id: 'advance', fam: 'AP', name: 'NFA / other advances (prepayment)', page: 'inv-05', booked: 'AP module', invType: 'PREPAYMENT', approval: 'Force approval or DOA initiation', sla: 'T+2 / T+3', term: 'IMMEDIATE', payGroup: 'Autopick', payAlone: 'As per user', bulk: false,
      text: 'PO or non-PO advance on a pro-forma invoice with NFA or approval email' },
    { id: 'row', fam: 'AP', name: 'ROW (right of way)', page: 'inv-05', booked: 'AP module', invType: 'STANDARD (base) + PREPAYMENT (GST)', approval: 'Force approval', sla: 'T+2 / T+3', term: 'IMMEDIATE', payGroup: 'ROW & OTHER GOVT PAYMENTS', payAlone: 'As per user', bulk: false,
      text: 'Road authority demand notes: rent, restoration, supervision, licence fee' },
    { id: 'sacfa', fam: 'AP', name: 'SACFA', page: 'inv-05', booked: 'AP module', invType: 'STANDARD', approval: 'Force approval', sla: 'T+2 / T+3', term: 'IMMEDIATE', payGroup: 'STATUTORY AUTHORITY', payAlone: 'As per user', bulk: false,
      text: 'Frequency allocation payments on Saral Sanchar snapshots (no invoice)' },
    { id: 'legal', fam: 'AP', name: 'Legal', page: 'inv-05', booked: 'AP module', invType: 'STANDARD', approval: 'DOA initiation', sla: 'T+2 / T+3', term: 'Statutory & Rush Payment', payGroup: 'Autopick', payAlone: 'As per user', bulk: false,
      text: 'Empanelled advocates (reverse charge) and CA firms' },
    { id: 'caf', fam: 'AP', name: 'CAF penalty', page: 'inv-05', booked: 'AP module', invType: 'STANDARD', approval: 'Force approval', sla: 'T+2 / T+3', term: 'IMMEDIATE', payGroup: 'ROW & OTHER GOVT PAYMENTS', payAlone: 'As per user', bulk: false,
      text: 'Penalties paid on the authority challan' },
    { id: 'bsnl', fam: 'AP', name: 'BSNL', page: 'inv-05', booked: 'AP module', invType: 'STANDARD', approval: 'DOA initiation', sla: 'T+2 / T+3', term: 'Statutory & Rush Payment', payGroup: 'Autopick', payAlone: 'As per user', bulk: false,
      text: 'Port, infrastructure, leased-line and TDSAT charges' },
    { id: 'group', fam: 'AP', name: 'Group company (incl. broadband)', page: 'inv-05', booked: 'AP module', invType: 'STANDARD', approval: 'Force approval (APBL books: DOA)', sla: 'T+2 / T+3', term: 'Statutory & Rush Payment', payGroup: 'Autopick / Network Rent', payAlone: 'No', bulk: true,
      text: 'Invoices between Airtel group entities; IUT code in segment 6' },
    { id: 'iuc', fam: 'AP', name: 'IUC', page: 'inv-05', booked: 'AP module', invType: 'STANDARD', approval: 'Force approval', sla: 'T+2 / T+3', term: 'Statutory & Rush Payment', payGroup: 'OPERATOR-IUC', payAlone: 'No', bulk: true,
      text: 'Interconnect usage charges with other operators' },
    { id: 'bank', fam: 'AP', name: 'Bank charges', page: 'inv-05', booked: 'AP module', invType: 'STANDARD', approval: 'Force approval', sla: 'T+2 / T+3', term: 'Statutory & Rush Payment', payGroup: 'BANK/FINANCIAL INST', payAlone: 'No', bulk: true,
      text: 'Bank charges; password-protected PDFs supported' },
    { id: 'apbl', fam: 'AP', name: 'APBL', page: 'inv-05', booked: 'AP module', invType: 'STANDARD', approval: 'DOA', sla: 'T+2 / T+3', term: 'Statutory & Rush Payment', payGroup: 'Autopick', payAlone: 'As per user', bulk: false,
      text: 'Invoices in the APBL books; cost centre needed except group company' },
    { id: 'credit', fam: 'AP', name: 'Credit note', page: 'inv-05', booked: 'AP module', invType: 'CREDIT (negative)', approval: 'Force approval', sla: 'T+2 / T+3', term: 'IMMEDIATE', payGroup: 'Autopick', payAlone: 'No', bulk: true,
      text: 'Vendor credit notes; original tax invoice number and date mandatory' },
    { id: 'govt', fam: 'AP', name: 'Govt vendor', page: 'inv-05', booked: 'AP module', invType: 'STANDARD', approval: 'Force approval against approval email', sla: 'T+2 / T+3', term: 'Per Quality Plan', payGroup: 'Autopick', payAlone: 'As per user', bulk: false,
      text: 'Government bodies, force approved against the approval email' },
    { id: 'tds', fam: 'AP', name: 'TDS rectification', page: 'inv-05', booked: 'AP module', invType: 'STANDARD', approval: 'Force approval', sla: 'T+2 / T+3', term: 'IMMEDIATE', payGroup: 'Autopick', payAlone: 'As per user', bulk: false,
      text: 'TDS rectification input; same format as Rush (client note on the approved HLD)' },
    { id: 'others', fam: 'AP', name: 'Others', page: 'inv-05', booked: 'AP module', invType: 'STANDARD', approval: 'DOA', sla: 'T+2 / T+3', term: 'Per Quality Plan', payGroup: 'Autopick', payAlone: 'As per user', bulk: false,
      text: 'Any other non-PO invoice; common AP rules and the DOA' },
    { id: 'mifi', fam: 'AP', name: 'MiFi', page: '', booked: 'AP module', invType: 'STANDARD', approval: 'Out of scope', sla: '-', term: 'Statutory & Rush Payment', payGroup: 'NETWORK RENT', payAlone: '-', bulk: false, oos: true,
      text: 'Out of scope (HLD 6.1)' },
    // Debit notes: approved before booking; ToCo notes recorded in two stages
    { id: 'toco-dn', fam: 'DN', name: 'ToCo debit note', page: 'inv-07', booked: 'AP, two-stage', invType: 'DEBIT (negative)', approval: 'Force approval', sla: 'T+2 / T+3', term: 'IMMEDIATE', payGroup: 'Autopick', payAlone: '-', suffix: '/DN', bulk: true,
      text: 'Dispute note against a tower company invoice' },
    { id: 'toco-fdn', fam: 'DN', name: 'ToCo Finance debit note', page: 'inv-07', booked: 'AP, two-stage', invType: 'DEBIT (negative)', approval: 'Force approval', sla: 'T+2 / T+3', term: 'IMMEDIATE', payGroup: 'Autopick', payAlone: '-', suffix: '/DNF', bulk: true,
      text: 'Finance debit note against a tower company invoice' },
    { id: 'toco-rev', fam: 'DN', name: 'ToCo DN / Finance DN reversal', page: 'inv-07', booked: 'AP, two-stage', invType: 'STANDARD (positive)', approval: 'DOA initiation (Tax team reversals force approved)', sla: 'T+2 / T+3', term: 'Vendor payment term', payGroup: 'Autopick', payAlone: '-', suffix: '/REV', bulk: true,
      text: 'Reversal of a ToCo debit note that is no longer valid' },
    { id: 'toco-cn', fam: 'DN', name: 'ToCo credit note', page: 'inv-07', booked: 'AP, two-stage', invType: 'CREDIT (negative)', approval: 'Force approval', sla: 'T+2 / T+3', term: 'IMMEDIATE', payGroup: 'Autopick', payAlone: '-', bulk: true,
      text: 'Credit note issued by a tower company' },
    { id: 'man-dn', fam: 'DN', name: 'Manual debit note', page: 'inv-07', booked: 'AP module', invType: 'DEBIT (negative)', approval: 'Force approval', sla: 'T+2 / T+3', term: 'IMMEDIATE', payGroup: 'Autopick', payAlone: '-', suffix: '/DN', bulk: false,
      text: 'Debit note against a vendor other than a tower company' },
    { id: 'man-rev', fam: 'DN', name: 'Manual DN reversal', page: 'inv-07', booked: 'AP module', invType: 'STANDARD (positive)', approval: 'DOA initiation', sla: 'T+2 / T+3', term: 'Statutory & Rush Payment', payGroup: 'Autopick', payAlone: '-', bulk: false,
      text: 'Reversal requested by a circle, validated with the IP team' },
    { id: 'gst-dn', fam: 'DN', name: 'GST non-compliance debit note', page: 'inv-07', booked: 'AP module', invType: 'DEBIT (negative)', approval: 'Force approval', sla: 'T+2 / T+3', term: 'IMMEDIATE', payGroup: 'NETWORK RENT', payAlone: '-', bulk: true,
      text: 'Raised by the Tax team from the GSTR-2B and 6A reconciliation' },
    { id: 'gst-rev', fam: 'DN', name: 'GST non-compliance DN reversal', page: 'inv-07', booked: 'AP module', invType: 'STANDARD (positive)', approval: 'Force approval', sla: 'T+2 / T+3', term: 'Statutory & Rush Payment', payGroup: 'NETWORK RENT', payAlone: '-', suffix: '/REV', bulk: false,
      text: 'Reversal requested by the Tax team' }
  ];
  function cat(id) { return cats.filter(function (c) { return c.id === id; })[0] || cats[0]; }

  /* ------------------------------------------------ circles (operating units) with Airtel GSTIN and BU */
  var circles = {
    'UP East': { bu: '121', ou: 'BAL MO UP East', gstin: '09AAACB2894G1ZN', state: 'Uttar Pradesh' },
    'Delhi': { bu: '111', ou: 'BAL MO Delhi', gstin: '07AAACB2894G1ZR', state: 'Delhi' },
    'Karnataka': { bu: '131', ou: 'BAL MO Karnataka', gstin: '29AAACB2894G1ZJ', state: 'Karnataka' },
    'Maharashtra': { bu: '141', ou: 'BAL MO Maharashtra', gstin: '27AAACB2894G1ZL', state: 'Maharashtra' },
    'Madhya Pradesh': { bu: '161', ou: 'TNL-FF-Madhya Pradesh', gstin: '23AAACB2894G1ZT', state: 'Madhya Pradesh' },
    'Meghalaya': { bu: '171', ou: 'BAL-TNG-NLD-Meghalaya', gstin: '17AAACB2894G1ZH', state: 'Meghalaya' },
    'J&K': { bu: '181', ou: 'BAL MO JK', gstin: '01AAACB2894G1ZB', state: 'Jammu & Kashmir' },
    'Odisha': { bu: '191', ou: 'BAL MO Orissa', gstin: '21AAACB2894G1ZV', state: 'Odisha' },
    'Goa': { bu: '173', ou: 'BAL-MO-ROM-GOA', gstin: '30AAACB2894G1ZS', state: 'Goa' },
    'Andhra Pradesh': { bu: '151', ou: 'BAL MO Andhra Pradesh', gstin: '37AAACB2894G1ZQ', state: 'Andhra Pradesh' },
    'Telangana': { bu: '165', ou: 'BAL MO Telangana', gstin: '36AAACB2894G1ZS', state: 'Telangana' },
    'APO': { bu: '904', ou: 'APO', gstin: '06AAACB2894G1ZP', state: 'Haryana' }
  };

  /* ------------------------------------------------ partners (vendors) - synthetic except where the business input formats name them */
  var vendors = {
    '600124': { name: 'Shree Ganesh Infra Services Pvt Ltd', short: 'Shree Ganesh Infra', gstin: '09AAKCS4821M1Z3', state: 'Uttar Pradesh', site: 'LUCKNOW-OFFICE', irn: 'Yes', email: 'accounts@shreeganeshinfra.example', mobile: '98XXXXX214', type: 'Local ToCo vendor' },
    '412885': { name: 'Indus Towers Ltd', short: 'Indus Towers', gstin: '07AAACI3307Q1ZK', state: 'Delhi', site: 'CENTRAL-TOCO-DEL', irn: 'Yes', email: 'ap.billing@industowers.example', mobile: '99XXXXX731', type: 'Central ToCo vendor' },
    '700845': { name: 'R K Estates', short: 'R K Estates', gstin: '27ABKFR2210D1Z8', state: 'Maharashtra', site: 'PUNE-LL-0418', irn: 'No', email: 'rkestates@example.in', mobile: '97XXXXX508', type: 'Landlord' },
    '600388': { name: 'Metro Fibre Links Pvt Ltd', short: 'Metro Fibre Links', gstin: '29AADCM7730Q1ZL', state: 'Karnataka', site: 'BLR-NOC', irn: 'Yes', type: 'Bandwidth vendor' },
    '600402': { name: 'Sai Krupa Power Solutions', short: 'Sai Krupa Power', gstin: '09ABDFS6614H1Z6', state: 'Uttar Pradesh', site: 'KANPUR-DG', irn: 'No', type: 'Diesel and DG services' },
    '410022': { name: 'SecureOne Facility Services Pvt Ltd', short: 'SecureOne Facility', gstin: '07AAJCS7712K1Z5', state: 'Delhi', site: 'DELHI-HO', irn: 'Yes', type: 'Facility services' },
    '410612': { name: 'Lexwise Legal LLP', short: 'Lexwise Legal', gstin: '29AAKFL9031B1Z2', state: 'Karnataka', site: 'LEGAL', irn: 'No', type: 'Empanelled advocate' },
    '410455': { name: 'Vertex Call Solutions Ltd', short: 'Vertex Call Solutions', gstin: '29AACCV2208H1ZQ', state: 'Karnataka', site: 'BLR-CC', irn: 'Yes', type: 'Call centre services' },
    '517217': { name: 'Axis Bank Ltd', short: 'Axis Bank', gstin: '06AAACU2414K1ZM', state: 'Haryana', site: 'FOREX', irn: 'Yes', type: 'Bank' },
    '202546': { name: 'BSNL - Interconnect', short: 'BSNL', gstin: '17AABCB5576G1ZR', state: 'Meghalaya', site: 'SHILLONG3', irn: 'Yes', type: 'Government operator' },
    '200014': { name: 'Nxtra Data Ltd', short: 'Nxtra Data', gstin: '07AAECN1176P1ZF', state: 'Delhi', site: 'NXTRA-DEL', irn: 'Yes', type: 'Group company' },
    '815429': { name: 'CMO Nagar Panchayat Parishad Rampura', short: 'Nagar Panchayat Rampura', gstin: '', state: 'Madhya Pradesh', site: 'EFT-9363', irn: 'No', type: 'Road authority (ROW)' },
    '246689': { name: 'WPC Wing - SACFA', short: 'SACFA', gstin: '', state: 'Delhi', site: 'ONLINE', irn: 'No', type: 'Statutory authority' },
    '373921': { name: 'CAO (Cash) O/o CCA, Bhubaneswar', short: 'CCA Bhubaneswar', gstin: '', state: 'Odisha', site: 'BHUBANESWAR', irn: 'No', type: 'Statutory authority' },
    '322600': { name: 'GTL Infrastructure Ltd', short: 'GTL Infrastructure', gstin: '27AABCG1234H1ZK', state: 'Maharashtra', site: 'MUMBAI', irn: 'Yes', type: 'Central ToCo vendor' },
    '395966': { name: 'Arora Realty Services', short: 'Arora Realty', gstin: '07AADPA2869E1Z1', state: 'Delhi', site: 'NCR-DEL-RENT', irn: 'No', type: 'Landlord' },
    '588599': { name: 'Zayo Group LLC', short: 'Zayo Group', gstin: '', state: 'London (overseas)', site: 'London', irn: 'No', type: 'International bandwidth' },
    '211609': { name: 'Sunrise Estate Management Services', short: 'Sunrise Estate', gstin: '30ABCFS4410L1Z9', state: 'Goa', site: 'FORT AGUADA', irn: 'No', type: 'Landlord (EB reimbursement)' },
    '830114': { name: 'Pune Municipal Corporation', short: 'Pune Municipal Corp', gstin: '', state: 'Maharashtra', site: 'PMC-PROPTAX', irn: 'No', type: 'Government (demand note)' },
    '815602': { name: 'Gram Panchayat Palwancha', short: 'Gram Panchayat Palwancha', gstin: '', state: 'Telangana', site: 'PALWANCHA', irn: 'No', type: 'Road authority (ROW)' },
    '535444': { name: 'Unique Identification Authority of India', short: 'UIDAI', gstin: '06AAAGU0044A1Z6', state: 'Haryana', site: '998415', irn: 'No', type: 'Government body' }
  };

  /* ------------------------------------------------ invoices */
  // ref, invoice number, vendor, category, circle, invoice date, period, base (Rs; foreign amounts carry cur), status, status date, reason
  var invoices = [
    // Shree Ganesh Infra (vendor persona), UP East, intra-state
    { ref: '', inv: 'SGIS/26-27/0425', v: '600124', cat: 'local-toco', circle: 'UP East', date: '27-Sep-2026', from: '01-Sep-2026', to: '30-Sep-2026', base: 40000, status: 'Draft', on: '27-Sep-2026', lines: 3 },
    { ref: 'NPO-2627-004822', inv: 'SGIS/26-27/0421', v: '600124', cat: 'local-toco', circle: 'UP East', date: '22-Sep-2026', from: '01-Sep-2026', to: '30-Sep-2026', base: 132600, status: 'Submitted', on: '29-Sep-2026', recv: '29-Sep 11:02', queue: 'validation', sla: 'Due in 1d', lines: 5 },
    { ref: 'NPO-2627-004812', inv: 'SGIS/26-27/0418', v: '600124', cat: 'local-toco', circle: 'UP East', date: '18-Sep-2026', from: '01-Sep-2026', to: '30-Sep-2026', base: 184500, status: 'Under Validation', on: '28-Sep-2026', recv: '28-Sep 10:30', queue: 'validation', sla: 'Due today 18:00', slaTone: 'warn', owner: 'PHD team - UP', lines: 6 },
    { ref: 'NPO-2627-004790', inv: 'SGIS/26-27/0409', v: '600124', cat: 'local-toco', circle: 'UP East', date: '12-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 96200, status: 'RFI', on: '26-Sep-2026', reason: 'Signature or stamp missing', rfiNote: 'Checklist 12: a tax invoice must be digitally signed, or signed and stamped. The copy you uploaded has neither. Please upload a signed and stamped copy.', rfiBy: 'PHD team - UP East', lines: 4 },
    { ref: 'NPO-2627-004733', inv: 'SGIS/26-27/0402', v: '600124', cat: 'local-toco', circle: 'UP East', date: '09-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 88000, status: 'Hold', on: '24-Sep-2026', reason: 'Locator inactive for 2 of 6 sites', queue: 'hold', sla: 'On hold 7d', owner: 'PHD team - UP', lines: 6, recv: '24-Sep 12:00' },
    { ref: 'NPO-2627-004655', inv: 'SGIS/26-27/0391', v: '600124', cat: 'local-toco', circle: 'UP East', date: '02-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 42000, status: 'Under Approval', on: '23-Sep-2026', lines: 2, group: 'GRP-UPE-260923-07', oracle: 'PM-INV-88120456' },
    { ref: 'NPO-2627-004610', inv: 'SGIS/26-27/0388', v: '600124', cat: 'rush', circle: 'UP East', date: '01-Sep-2026', from: '20-Aug-2026', to: '22-Aug-2026', base: 24500, status: 'Rejected', on: '15-Sep-2026', reason: 'Duplicate of NPO-2627-004598' },
    { ref: 'NPO-2627-004521', inv: 'SGIS/26-27/0377', v: '600124', cat: 'local-toco', circle: 'UP East', date: '26-Aug-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 212340, status: 'Processed', on: '10-Sep-2026', lines: 6, group: 'GRP-UPE-260910-02', oracle: 'PM-INV-88117302' },
    { ref: 'NPO-2627-004410', inv: 'SGIS/26-27/0352', v: '600124', cat: 'rush', circle: 'UP East', date: '18-Aug-2026', from: '10-Aug-2026', to: '12-Aug-2026', base: 58750, status: 'Validated', on: '03-Sep-2026', oracle: 'AP-98110482', barcode: 'BC2627UPE004410' },
    { ref: 'NPO-2627-004377', inv: 'SGIS/26-27/0349', v: '600124', cat: 'local-toco', circle: 'UP East', date: '16-Aug-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: 205800, status: 'Scheduled payment hold', on: '01-Sep-2026', reason: 'Payment held pending lower-deduction certificate', lines: 6, oracle: 'PM-INV-88114720' },
    { ref: 'NPO-2627-004298', inv: 'SGIS/26-27/0341', v: '600124', cat: 'local-toco', circle: 'UP East', date: '12-Aug-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: 99000, status: 'Need re-approval', on: '29-Aug-2026', reason: 'Budget head changed after approval', lines: 3, oracle: 'PM-INV-88113004' },
    { ref: 'NPO-2627-004102', inv: 'SGIS/26-27/0331', v: '600124', cat: 'local-toco', circle: 'UP East', date: '05-Aug-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: 175000, status: 'Paid', on: '28-Aug-2026', lines: 5, oracle: 'PM-INV-88110211', paid: 'UTR N2408261187 on 28-Aug-2026' },
    { ref: 'NPO-2627-004099', inv: 'SGIS/26-27/0330', v: '600124', cat: 'rush', circle: 'UP East', date: '05-Aug-2026', from: '28-Jul-2026', to: '30-Jul-2026', base: 36400, status: 'Paid', on: '27-Aug-2026', oracle: 'AP-98104471', paid: 'UTR N2408261054 on 27-Aug-2026' },
    // Central ToCo (Indus Towers), Delhi
    { ref: 'NPO-2627-004851', inv: 'IND/26/SEP/80412', v: '412885', cat: 'central-toco', circle: 'Delhi', date: '25-Sep-2026', from: '01-Sep-2026', to: '30-Sep-2026', base: 1563754.58, status: 'Under Validation', on: '30-Sep-2026', recv: '30-Sep 09:12', queue: 'validation', sla: 'Due in 2d', lines: 42 },
    { ref: 'NPO-2627-004702', inv: 'IND/26/AUG/77180', v: '412885', cat: 'central-toco', circle: 'Delhi', date: '20-Aug-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 1873288.14, status: 'Hold', on: '22-Sep-2026', reason: 'Locator not found or inactive for 3 of 51 lines - whole invoice withheld', queue: 'hold', sla: 'On hold 9d', owner: 'PHD team - North', recv: '22-Sep 09:30', lines: 51 },
    { ref: 'NPO-2627-004640', inv: 'IND/26/AUG/77120', v: '412885', cat: 'central-toco', circle: 'Delhi', date: '05-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 558610.17, status: 'Validated', on: '18-Sep-2026', lines: 12, group: 'GRP-DEL-260912-01', oracle: 'PM-INV-88118845' },
    // other partners and categories (back office, approvals, booking)
    { ref: 'NPO-2627-004849', inv: 'SKP/26-27/118', v: '600402', cat: 'rush', circle: 'UP East', date: '29-Sep-2026', from: '27-Sep-2026', to: '29-Sep-2026', base: 54500, status: 'Under Validation', on: '30-Sep-2026', recv: '30-Sep 08:40', queue: 'rush', reason: 'Rush: site diesel outage', sla: 'Due today 18:00', slaTone: 'warn', owner: 'PHD team - UP' },
    { ref: 'NPO-2627-004847', inv: 'MFL/BLR/26/0912', v: '600388', cat: 'bw-dom', circle: 'Karnataka', date: '15-Sep-2026', from: '01-Jul-2026', to: '30-Sep-2026', base: 323525.42, status: 'Under Validation', on: '29-Sep-2026', recv: '29-Sep 17:55', queue: 'manual', reason: 'OCR could not read the invoice period', sla: 'Due in 1d', owner: 'PHD team - KA', lines: 6 },
    { ref: 'NPO-2627-004839', inv: 'RKE/26-27/019', v: '700845', cat: 'll-gst', circle: 'Maharashtra', date: '15-Sep-2026', from: '01-Sep-2026', to: '30-Sep-2026', base: 18000, gstOnly: true, status: 'Under Validation', on: '29-Sep-2026', recv: '29-Sep 15:20', queue: 'manual', reason: 'Checklist 12: signature needs visual review', sla: 'Due in 1d', voucher: '714237' },
    { ref: 'NPO-2627-004818', inv: 'VCS/26/1201', v: '410455', cat: 'others', circle: 'Karnataka', date: '21-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 2390000, status: 'Under Validation', on: '28-Sep-2026', recv: '28-Sep 16:45', queue: 'manual', reason: 'Potential duplicate: same vendor, amount and month as NPO-2627-004771', sla: 'Overdue 4h', slaTone: 'red', owner: 'AP team - South' },
    { ref: 'NPO-2627-004806', inv: 'SKP/26-27/109', v: '600402', cat: 'diesel', circle: 'UP East', date: '20-Sep-2026', from: '01-Sep-2026', to: '15-Sep-2026', base: 78000, status: 'Under Validation', on: '27-Sep-2026', recv: '27-Sep 14:10', queue: 'manual', reason: 'OCR amount differs from the input sheet by Rs 340', sla: 'Overdue 1d', slaTone: 'red', owner: 'PHD team - UP', lines: 3 },
    { ref: 'NPO-2627-004864', inv: 'OPRT-123/25-41', v: '211609', cat: 'll-eb', circle: 'Goa', date: '01-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 10000, status: 'Submitted', on: '30-Sep-2026', recv: '30-Sep 16:20', queue: 'validation', sla: 'Due in 2d', lines: 1 },
    { ref: 'NPO-2627-004862', inv: '2026090025021', v: '588599', cat: 'bw-intl', circle: 'Delhi', date: '04-Sep-2026', from: '01-Sep-2026', to: '30-Sep-2026', base: 1500, cur: 'USD', igst: true, noTax: true, status: 'Submitted', on: '30-Sep-2026', recv: '30-Sep 13:05', queue: 'validation', sla: 'Due in 2d', lines: 1 },
    { ref: 'NPO-2627-004860', inv: 'SFS/2026/0961', v: '410022', cat: 'others', circle: 'Delhi', date: '05-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 485000, status: 'Under Approval', on: '30-Sep-2026', recv: '29-Sep 18:10', urn: '111·410022·SECURITY001·AUG-26', approval: 'DOA level 1 of 2', approver: 'B0APR219' },
    { ref: 'NPO-2627-004834', inv: 'LEX/26/0233', v: '410612', cat: 'legal', circle: 'Karnataka', date: '28-Aug-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 350000, noTax: true, rcm: true, status: 'Under Approval', on: '29-Sep-2026', recv: '27-Sep 12:30', urn: '131·410612·LEGAL007·AUG-26', approval: 'DOA level 1 of 1', approver: 'B0APR219' },
    { ref: 'NPO-2627-004857', inv: 'Kramank /1759/2026RAMPURA', v: '815429', cat: 'row', circle: 'Madhya Pradesh', date: '10-Aug-2026', from: '10-Aug-2026', to: '09-Aug-2027', base: 2492000, noTax: true, status: 'Under Approval', on: '30-Sep-2026', recv: '29-Sep 10:15', approval: 'Force approval - NFA check', approver: 'B0PHD307', nfa: 'General/6036/275856' },
    { ref: 'NPO-2627-004830', inv: 'DR20261700000574', v: '202546', cat: 'bsnl', circle: 'Meghalaya', date: '30-Jul-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: 526.03, status: 'Under Approval', on: '28-Sep-2026', recv: '26-Sep 11:40', approval: 'DOA level 1 of 1', approver: 'B0APR219' },
    { ref: 'NPO-2627-004828', inv: 'S20260016392', v: '246689', cat: 'sacfa', circle: 'J&K', date: '08-Sep-2026', from: '08-Sep-2026', to: '07-Sep-2027', base: 24000, noTax: true, status: 'Under Approval', on: '28-Sep-2026', recv: '25-Sep 15:00', approval: 'Force approval - NFA check', approver: 'B0PHD307' },
    { ref: 'NPO-2627-004791', inv: 'MFL/BLR/25/0611', v: '600388', cat: 'bw-dom', circle: 'Karnataka', date: '30-Jun-2025', from: '01-Jun-2025', to: '30-Jun-2025', base: 42000, status: 'Under Approval', on: '27-Sep-2026', recv: '24-Sep 10:20', reason: 'Activity period more than one year old', approval: 'Exception - BPA head approval', approver: 'B0FIN008', lines: 1 },
    { ref: 'NPO-2627-004869', inv: 'E1/293/PALWANCHA/AIRTELOFC/ROADCUTTING/DEMANDNOTICE/2026-27', v: '815602', cat: 'row', circle: 'Telangana', date: '18-Sep-2026', from: '18-Sep-2026', to: '17-Sep-2027', base: 186400, noTax: true, status: 'Under Approval', on: '30-Sep-2026', recv: '30-Sep 11:20', approval: 'Exception - CFR approval (number over 50 characters)', approver: 'B0FIN008', why: 'Will be booked as E1/293/PALWANCHA/AIRTELOFC/ROADCUTTING/DEMANDNOTIC (unique part at the start: left 50)' },
    { ref: 'NPO-2627-004868', inv: 'MFL/0091', v: '600388', cat: 'bw-dom', circle: 'Karnataka', date: '10-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 42000, status: 'Under Approval', on: '29-Sep-2026', recv: '29-Sep 16:40', approval: 'Exception - same invoice number in a different FY', approver: 'B0FIN008', lines: 1, why: 'MFL/0091 already booked in FY 2025-26; the FY is appended after approval: MFL/0091/FY26-27' },
    { ref: 'NPO-2627-004844', inv: 'GTL/AP/DUPLICATE/JUL26/DN', v: '322600', cat: 'toco-dn', circle: 'Andhra Pradesh', date: '25-Sep-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: -6895, noTax: true, status: 'Under Approval', on: '29-Sep-2026', recv: '28-Sep 17:05', approval: 'Force approval - circle approvals', approver: 'B0PHD307', orig: 'GTL/AP/2026/JUL/4471' },
    { ref: 'NPO-2627-004855', inv: 'AIRTEL414', v: '517217', cat: 'bank', circle: 'APO', date: '04-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 18930.84, status: 'Approved', on: '30-Sep-2026', recv: '26-Sep 09:00', queue: 'booking' },
    { ref: 'NPO-2627-004853', inv: 'NXD/26-27/2291', v: '200014', cat: 'group', circle: 'Delhi', date: '20-Sep-2026', from: '01-Sep-2026', to: '30-Sep-2026', base: 2840000, status: 'Processed', on: '30-Sep-2026', oracle: 'AP-98118702', barcode: 'BC2627DEL004853' },
    { ref: 'NPO-2627-004836', inv: 'GSTNONCOMPLIANCE-JUL26-B2-26-27-BAL-69', v: '395966', cat: 'gst-dn', circle: 'Delhi', date: '29-Aug-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: -4016, noTax: true, status: 'Processed', on: '29-Sep-2026', oracle: 'AP-98118544' },
    { ref: 'NPO-2627-004826', inv: 'OD/CAF/BAL/2026-27/442', v: '373921', cat: 'caf', circle: 'Odisha', date: '02-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 16000, noTax: true, status: 'Processed', on: '27-Sep-2026', oracle: 'AP-98117960', barcode: 'BC2627ODI004826' },
    // R K Estates (landlord persona), Maharashtra
    { ref: 'NPO-2627-004512', inv: 'RKE/26-27/014', v: '700845', cat: 'll-gst', circle: 'Maharashtra', date: '12-Aug-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 18000, gstOnly: true, status: 'Paid', on: '04-Sep-2026', voucher: '709881', oracle: 'AP-98109377', paid: 'UTR N0409260332 on 04-Sep-2026' },
    { ref: 'NPO-2627-004356', inv: 'RKE/26-27/011', v: '700845', cat: 'll-gst', circle: 'Maharashtra', date: '10-Jul-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: 18000, gstOnly: true, status: 'Paid', on: '06-Aug-2026', voucher: '702214', oracle: 'AP-98101125', paid: 'UTR N0608260871 on 06-Aug-2026' },
    // invoices and notes that P&A matches or provides for (pa-data.js): Vertex's Aug-26 invoice settled its provision by URN (the
    // later VCS/26/1201 is flagged as its potential duplicate); GTL ToCo debit notes create DN provisions, their reversals reverse them
    { ref: 'NPO-2627-004771', inv: 'VCS/26/1188', v: '410455', cat: 'others', circle: 'Karnataka', date: '05-Sep-2026', from: '01-Aug-2026', to: '31-Aug-2026', base: 2390000, status: 'Paid', on: '22-Sep-2026', recv: '08-Sep 10:20', urn: '131·410455·CCSVC002·AUG-26', oracle: 'AP-98114906', barcode: 'BC2627KAR004771', paid: 'UTR N2209260618 on 22-Sep-2026' },
    { ref: 'NPO-2627-004466', inv: 'GTL/AP/2026/JUL/4452/DN', v: '322600', cat: 'toco-dn', circle: 'Andhra Pradesh', date: '14-Aug-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: -18600, noTax: true, status: 'Validated', on: '20-Aug-2026', oracle: 'AP-98112730', orig: 'GTL/AP/2026/JUL/4452', provUrn: '151·322600·RENT-AOR·JUL-26·15104·GTL/AP/2026/JUL/4452/DN' },
    { ref: 'NPO-2627-003984', inv: 'GTL/AP/2026/JUN/4390/DN', v: '322600', cat: 'toco-dn', circle: 'Andhra Pradesh', date: '15-Jul-2026', from: '01-Jun-2026', to: '30-Jun-2026', base: -41300, noTax: true, status: 'Validated', on: '22-Jul-2026', oracle: 'AP-98103318', orig: 'GTL/AP/2026/JUN/4390', provUrn: '151·322600·ELEC-AOR·JUN-26·15104·GTL/AP/2026/JUN/4390/DN' },
    { ref: 'NPO-2627-004797', inv: 'GTL/AP/2026/JUN/4390/REV', v: '322600', cat: 'toco-rev', circle: 'Andhra Pradesh', date: '18-Sep-2026', from: '01-Jun-2026', to: '30-Jun-2026', base: 41300, noTax: true, status: 'Validated', on: '25-Sep-2026', oracle: 'AP-98117411', orig: 'GTL/AP/2026/JUN/4390/DN', provUrn: '151·322600·ELEC-AOR·JUN-26·15104·GTL/AP/2026/JUN/4390/DN' },
    // invoices other pages name: bulk attachments (inv-08), approvals decided (inv-16), the AP import rejection (inv-18, inv-20, inv-24) and the rejected-invoice report (inv-20)
    { ref: 'NPO-2627-004866', inv: 'IND/26/SEP/80430', v: '412885', cat: 'central-toco', circle: 'Delhi', date: '25-Sep-2026', from: '01-Sep-2026', to: '30-Sep-2026', base: 1206440.68, status: 'Submitted', on: '30-Sep-2026', recv: '30-Sep 09:14', queue: 'validation', sla: 'Due in 2d', lines: 31 },
    { ref: 'NPO-2627-004811', inv: 'SFS/2026/0888', v: '410022', cat: 'others', circle: 'Delhi', date: '05-Jul-2026', from: '01-Jun-2026', to: '30-Jun-2026', base: 485000, status: 'Paid', on: '15-Sep-2026', recv: '08-Sep 10:00', oracle: 'AP-98112291', barcode: 'BC2627DEL004811', paid: 'UTR N1509260233 on 15-Sep-2026' },
    { ref: 'NPO-2627-004780', inv: 'BSNL/MEG/2026/07/88', v: '202546', cat: 'bsnl', circle: 'Meghalaya', date: '31-Jul-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: 3500, status: 'RFI', on: '26-Sep-2026', recv: '25-Sep 09:30', reason: 'Supporting document missing or incorrect', rfiNote: 'Returned at DOA level 1: attach the port charges schedule for Jul-26.', rfiBy: 'DOA approver (level 1)' },
    { ref: 'NPO-2627-004863', inv: 'SKP/26-27/121', v: '600402', cat: 'rush', circle: 'UP East', date: '30-Sep-2026', from: '29-Sep-2026', to: '30-Sep-2026', base: 35500, status: 'Approved', on: '01-Oct-2026', recv: '30-Sep 14:20', queue: 'booking', reason: 'Oracle AP import rejected: vendor site KANPUR-DG inactive' },
    { ref: 'NPO-2627-004598', inv: 'SGIS/26-27/0388', v: '600124', cat: 'rush', circle: 'UP East', date: '01-Sep-2026', from: '20-Aug-2026', to: '22-Aug-2026', base: 24500, status: 'Paid', on: '09-Sep-2026', recv: '02-Sep 09:40', oracle: 'AP-98111520', barcode: 'BC2627UPE004598', paid: 'UTR N0909260412 on 09-Sep-2026' },
    { ref: 'NPO-2627-004577', inv: 'MFL/BLR/25/0498', v: '600388', cat: 'bw-dom', circle: 'Karnataka', date: '30-Apr-2025', from: '01-Apr-2025', to: '30-Apr-2025', base: 42000, status: 'Rejected', on: '11-Sep-2026', reason: 'Invoice older than one year, not in GSTR-2A / 2B', lines: 1 },
    { ref: 'NPO-2627-004541', inv: 'RKE/26-27/012', v: '700845', cat: 'll-gst', circle: 'Maharashtra', date: '20-Aug-2026', from: '01-Jul-2026', to: '31-Jul-2026', base: 18000, gstOnly: true, status: 'Rejected', on: '08-Sep-2026', reason: 'GST already claimed on voucher 702214 (NPO-2627-004356)', voucher: '702214' }
  ];
  invoices.forEach(function (r) {
    var c = cat(r.cat), vd = vendors[r.v], ci = circles[r.circle] || {};
    r.c = c; r.fam = c.fam; r.vendor = vd.name; r.vshort = vd.short; r.gstin = vd.gstin; r.cur = r.cur || 'INR';
    var inter = r.igst || (vd.gstin && ci.gstin && vd.gstin.slice(0, 2) !== ci.gstin.slice(0, 2));
    var t = r.noTax ? 0 : Math.round(r.base * 0.18 * 100) / 100;
    r.cgst = r.noTax || inter ? 0 : t / 2; r.sgst = r.cgst; r.igstAmt = r.noTax || !inter ? 0 : t;
    r.gst = t; r.total = Math.round((r.base + t) * 100) / 100;
    r.period = r.from && r.to ? r.from + ' to ' + r.to : '';
  });
  function find(ref) { return invoices.filter(function (r) { return r.ref === ref; })[0]; }
  function byInv(no) { return invoices.filter(function (r) { return r.inv === no; })[0]; }
  // the reference the portal issues on submission: the record's own when the invoice is already in the data, else the next free number
  function issuedRef(no) {
    var r = invoices.filter(function (x) { return x.inv === no && x.ref; })[0];
    if (r) return r.ref;
    var max = invoices.reduce(function (m, x) { return x.ref ? Math.max(m, +x.ref.slice(-6)) : m; }, 0);
    return 'NPO-2627-' + ('00000' + (max + 1)).slice(-6);
  }

  /* ------------------------------------------------ statuses (HLD 5.8) */
  var STATUS_INFO = {
    'Draft': 'Saved by the submitter; not yet submitted',
    'Submitted': 'Invoice received; reference number issued',
    'Under Validation': 'Checklist, category and master-data checks in progress',
    'RFI': 'More information requested from the submitter',
    'Under Approval': 'Awaiting approval as per DOA or force approval: after booking for Property Manager invoices, before booking for AP invoices',
    'Approved': 'Approved by the approver(s)',
    'Processed': 'Booked in Oracle EBS',
    'Rejected': 'Rejected, with reason',
    'Validated': 'Validated by AP and ready for payment',
    'Paid': 'Payment made',
    'Hold': 'Processing on hold, with reason',
    'Need re-approval': 'Changed after approval; approval required again',
    'Scheduled payment hold': 'Payment scheduled but held, with reason'
  };
  // status order differs by booking family: PM booked then approved; AP (and debit notes) approved then booked
  var LIFECYCLE = {
    PM: ['Submitted', 'Under Validation', 'Processed', 'Under Approval', 'Approved', 'Validated', 'Paid'],
    AP: ['Submitted', 'Under Validation', 'Under Approval', 'Approved', 'Processed', 'Validated', 'Paid']
  };
  // processing buckets shown on dashboards (BRD 16: processed, hold, rejected, in-process, pending with approver, approved, validated, paid)
  var BUCKETS = [
    { key: 'inprocess', label: 'In-process', of: ['Submitted', 'Under Validation', 'RFI'] },
    { key: 'pending', label: 'Pending with approver', of: ['Under Approval', 'Need re-approval'] },
    { key: 'approved', label: 'Approved', of: ['Approved'] },
    { key: 'processed', label: 'Processed', of: ['Processed'] },
    { key: 'validated', label: 'Validated', of: ['Validated'] },
    { key: 'paid', label: 'Paid', of: ['Paid'] },
    { key: 'hold', label: 'Hold', of: ['Hold', 'Scheduled payment hold'] },
    { key: 'rejected', label: 'Rejected', of: ['Rejected'] }
  ];
  // RFI reasons the PHD team picks from (sample list; the PO portal's list is to be confirmed). Machine-checkable checklist items
  // run on Validate before submission, so an RFI covers only what needs a reviewer; wrong invoice data is rejected instead.
  var RFI_REASONS = ['Signature or stamp missing', 'Invoice form not acceptable (partly handwritten)', 'Invoice copy not readable', 'Supporting document missing or incorrect', 'Other'];
  var REVIEW_CHECKS = [12, 13];   // checklist items confirmed by the PHD team; all others run on Validate
  // partner groups: the tracker's filters and the rail counts (partners see counts in the rail, not tiles)
  var PARTNER_BUCKETS = [
    { key: 'progress', label: 'In progress', of: ['Submitted', 'Under Validation', 'Under Approval', 'Need re-approval', 'Approved', 'Processed', 'Validated'] },
    { key: 'action', label: 'Needs my action', of: ['RFI'] },
    { key: 'hold', label: 'On hold', of: ['Hold', 'Scheduled payment hold'] },
    { key: 'rejected', label: 'Rejected', of: ['Rejected'] },
    { key: 'paid', label: 'Paid', of: ['Paid'] }
  ];
  function tone(s) { return s === 'Paid' ? 'ok' : s === 'Draft' ? 'grey' : ''; }
  function status(s) { return UI.status(s, tone(s)); }
  function timelineRows(r) {
    var seq = LIFECYCLE[r.fam === 'PM' ? 'PM' : 'AP'];
    var exc = seq.indexOf(r.status) < 0 && r.status !== 'Draft';
    var at = exc ? (r.status === 'RFI' || r.status === 'Hold' || r.status === 'Rejected' ? 1 : r.status === 'Need re-approval' ? seq.indexOf('Approved') : seq.indexOf('Validated')) : seq.indexOf(r.status);
    var rows = [];
    seq.forEach(function (s, i) {
      if (i < at) rows.push({ status: s, state: 'done', action: 'Completed', info: STATUS_INFO[s] });
      else if (i === at && !exc) rows.push({ status: s, state: s === 'Paid' ? 'done' : 'current', date: r.on, action: s === 'Paid' ? 'Completed' : 'In progress', info: STATUS_INFO[s] });
      else if (i === at) {
        rows.push({ status: s, state: 'done', action: 'Completed', info: STATUS_INFO[s] });
        rows.push({ status: r.status, state: r.status === 'Rejected' ? 'error' : 'current', date: r.on, action: r.status === 'Rejected' ? 'Rejected' : 'Action pending', reason: UI.esc(r.reason || ''), info: STATUS_INFO[r.status] });
      } else rows.push({ status: s, state: r.status === 'Rejected' ? 'skipped' : 'pending', info: STATUS_INFO[s] });
    });
    return rows;
  }
  // categories a partner submits; AP categories are submitted by Airtel users on the vendor's behalf (to be confirmed by Airtel)
  var PARTNER_CATS = { vendor: ['local-toco', 'bw-dom', 'll-eb', 'diesel'], toco: ['central-toco'], landlord: ['ll-gst'] };
  function canSubmit(R, cat) { return !(R && R.layout === 'partner') || (PARTNER_CATS[R.id] || []).indexOf(cat) >= 0; }
  function partnerCode(R) { return R && R.id === 'toco' ? '412885' : R && R.id === 'landlord' ? '700845' : '600124'; }
  // partner rail: overall, drafts, action required (RFI), on hold - counted from the partner's own invoices
  function railCounts(R) {
    var rows = invoices.filter(function (r) { return r.v === partnerCode(R); });
    var n = function (of) { return String(rows.filter(function (r) { return of.indexOf(r.status) >= 0; }).length); };
    return [String(rows.length), n(['Draft']), n(PARTNER_BUCKETS[1].of), n(PARTNER_BUCKETS[2].of)];
  }
  function buckets(rows) { return BUCKETS.map(function (b) { return { key: b.key, label: b.label, n: rows.filter(function (r) { return b.of.indexOf(r.status) >= 0; }).length }; }); }

  /* ------------------------------------------------ the 18-point invoice checklist (HLD 5.4, Table 3) */
  var checklist = [
    [1, 'Invoice title', 'Must read Invoice, Tax invoice, Debit note, Bill of supply, Utility charge or Demand note'],
    [2, 'Invoice date', 'Mandatory; future dates are not allowed'],
    [3, 'Invoice number', 'Mandatory; for GST invoices at most 16 characters, with only ( ) / - and \\ as special characters'],
    [4, 'Vendor name', 'Matched to GST master data using the supplier GSTIN'],
    [5, 'Vendor address', 'Matched to GST master data using the supplier GSTIN'],
    [6, 'Nature of activity or description', 'Mandatory'],
    [7, 'Invoice amount and currency', 'Base plus GST equals total; line totals equal the base total; amount in words matches; foreign currency needs exchange rate and date; discount reduces the base before GST'],
    [8, 'Vendor and Airtel GSTIN', 'Same state code (first two digits): CGST and SGST; different: IGST'],
    [9, 'HSN / SAC code', 'Mandatory'],
    [10, 'QR code (IRN-applicable vendors)', 'QR code and IRN must be present'],
    [11, 'GST bifurcation', 'GST split must be shown with the rate'],
    [12, 'Signature', 'Tax invoice: digital, or signed and stamped (signature only for individual partners); non-tax invoice: signature or "system generated"'],
    [13, 'Invoice form', 'Either system generated or fully handwritten'],
    [14, 'Invoice or activity period', 'Mandatory for all categories, including landlord GST'],
    [15, 'Bill-to address and entity', 'An Airtel office address; entity within the Bharti Airtel group (configurable list)'],
    [16, 'PAN', 'Must match the PAN inside the supplier GSTIN; mandatory for all invoice types including EB and Local ToCo, except landlord GST'],
    [17, 'Reverse charge (other than landlord GST)', 'Invoice date not more than 45 days before booking, for services on the configurable reverse-charge list'],
    [18, 'Credit notes', 'Original invoice number and original invoice date mandatory']
  ];

  /* ------------------------------------------------ landlord leases and rent vouchers (R K Estates) */
  var leases = [
    { id: 'LSE-MH-0418', site: 'Kothrud rooftop BTS, Pune', locator: '14102-MPUN-0418', freq: 'Monthly', rent: 18000, from: '01-Apr-2024', to: '31-Mar-2033', status: 'Active' },
    { id: 'LSE-MH-0533', site: 'Hinjewadi Phase 2 site, Pune', locator: '14102-MPUN-0533', freq: 'Quarterly', rent: 54000, from: '01-Jan-2025', to: '31-Dec-2034', status: 'Active' },
    { id: 'LSE-MH-0291', site: 'Baner road shop, Pune', locator: '14102-MPUN-0291', freq: 'Monthly', rent: 12500, from: '01-Jun-2019', to: '31-Jul-2026', status: 'Terminated' }
  ];
  var vouchers = [
    { no: '714237', lease: 'LSE-MH-0418', period: 'Sep-2026', amount: 18000, paid: 'Paid 05-Sep-2026', gst: 'Claimed: NPO-2627-004839 (under validation)', claimed: true },
    { no: '716902', lease: 'LSE-MH-0533', period: 'Jul-2026 to Sep-2026 (quarter)', amount: 54000, paid: 'Paid 03-Jul-2026', gst: 'Not claimed', claimed: false },
    { no: '709881', lease: 'LSE-MH-0418', period: 'Aug-2026', amount: 18000, paid: 'Paid 05-Aug-2026', gst: 'Claimed: NPO-2627-004512 (paid)', claimed: true },
    { no: '702214', lease: 'LSE-MH-0418', period: 'Jul-2026', amount: 18000, paid: 'Paid 04-Jul-2026', gst: 'Claimed: NPO-2627-004356 (paid)', claimed: true },
    { no: '719004', lease: 'LSE-MH-0418', period: 'Oct-2026', amount: 18000, paid: 'Not paid (scheduled 05-Oct-2026)', gst: 'Not available until rent is paid', claimed: false, unpaid: true },
    { no: '688120', lease: 'LSE-MH-0291', period: 'Jul-2026', amount: 12500, paid: 'Paid 03-Jul-2026', gst: 'Not claimed - lease terminated', claimed: false, terminated: true }
  ];

  return {
    today: today, FAM: FAM, cats: cats, cat: cat, circles: circles, vendors: vendors, invoices: invoices, find: find, byInv: byInv, issuedRef: issuedRef,
    STATUS_INFO: STATUS_INFO, LIFECYCLE: LIFECYCLE, BUCKETS: BUCKETS, PARTNER_BUCKETS: PARTNER_BUCKETS, RFI_REASONS: RFI_REASONS, PARTNER_CATS: PARTNER_CATS, canSubmit: canSubmit, REVIEW_CHECKS: REVIEW_CHECKS, partnerCode: partnerCode, railCounts: railCounts, tone: tone, status: status, timelineRows: timelineRows, buckets: buckets,
    checklist: checklist, leases: leases, vouchers: vouchers,
    mine: function (code) { return invoices.filter(function (r) { return r.v === code; }); },
    rs: function (n, cur) { return (cur && cur !== 'INR' ? cur + ' ' : '') + UI.inr(n, 2); },
    // the role a page is seen as (wireframe bar choice, else the page default role id)
    role: function (def) { return Page.roleOr('inv', def); },
    isPartner: function (R) { return !!(R && R.layout === 'partner'); },
    detail: function (ref) { return 'inv-11-invoice-detail.html?ref=' + encodeURIComponent(ref); },
    review: function (ref) { return 'inv-14-invoice-review.html?ref=' + encodeURIComponent(ref); }
  };
})();
