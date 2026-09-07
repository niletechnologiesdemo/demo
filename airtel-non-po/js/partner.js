/* ==========================================================================
   Non-PO Automation Platform — Partner Portal (external vendor).
   Persona: Indus Towers Ltd (601144), which books locator-wise through PM.
   ========================================================================== */

const PARTNER = '601144';
const myInv  = () => S.invoices.filter(i => i.vendor === PARTNER);
const myProv = () => S.provisions.filter(p => p.vendor === PARTNER && ['OPEN','PARTIAL'].includes(p.status));

function pGroups() {
  return [
    { t:'Submit', items:[
      { l:'Dashboard',          r:'/p/dashboard' },
      { l:'Expected from you',  r:'/p/expected', c:myProv().length },
      { l:'Submit an invoice',  r:'/p/category' },
      { l:'Bulk upload',        r:'/p/bulk' } ]},
    { t:'Track', items:[
      { l:'My invoices',        r:'/p/invoices', c:myInv().length },
      { l:'Upload batches',     r:'/p/batches', c:BATCHES.length },
      { l:'Needs your attention', r:'/p/attention',
        c:myInv().filter(i => ['REJECTED','VALIDATION_FAILED','RFI'].includes(i.status)).length } ]}
  ];
}
const pPage = (active, body) => page({
  groups: pGroups(), active, persona:'p',
  who:'Indus Towers Ltd', sub:'Partner code 601144 · GSTIN 06AABCI2345P1Z9',
  body });

const STATUS_FLOW = ['SUBMITTED','OCR','UNDER_VALIDATION','APPROVED','BOOKED','MATCHED'];
const FLOW_LABEL = ['Submitted','OCR extraction','Under validation','Approved','Booked in ERP','Actualized'];

/* ======================================================================== */
/* 1. Partner dashboard                                                      */
/* ======================================================================== */
function scPDashboard() {
  const I = myInv();
  const need = I.filter(i => ['REJECTED','VALIDATION_FAILED','RFI'].includes(i.status));
  const rows = I.slice(0, 8).map(i => ({
    __href:'/p/invoice/' + i.ref,
    ref:esc(i.ref), inv:esc(i.invNo), cat:esc((M_.cat[i.category]||{}).name),
    d:esc(i.invDate), amt:`<span class="num">${inr(i.amount + i.gst)}</span>`,
    st:pill(i.status), erp:esc(i.erpDoc || '—')
  }));
  return pPage('/p/dashboard', `
    <h4 class="mb-10">Welcome back</h4>
    <p class="color-grey mb-40">One place to submit Non-PO invoices, track them through validation and booking, and see what Airtel is expecting from you.</p>
    ${kpis([
      { n:I.length, l:'Invoices submitted', s:'Last 90 days' },
      { n:I.filter(i => ['SUBMITTED','OCR','UNDER_VALIDATION'].includes(i.status)).length, l:'In progress' },
      { n:I.filter(i => ['BOOKED','MATCHED'].includes(i.status)).length, l:'Booked in ERP' },
      { n:need.length, l:'Needs your attention', go:'/p/attention', s:'Rejected or RFI' },
      { n:myProv().length, l:'Expected from you', go:'/p/expected', s:'Provisions raised, invoice awaited' }
    ])}
    <div class="np-grid g-2-1">
      <div><h4 class="mb-25">Recent submissions</h4>
        ${table([{h:'Reference',k:'ref'},{h:'Invoice',k:'inv'},{h:'Category',k:'cat'},{h:'Date',k:'d'},
          {h:'Total',k:'amt',cls:'tr'},{h:'Status',k:'st'},{h:'ERP document',k:'erp'}], rows, { tight:true })}</div>
      <div>
        <div class="np-panel"><p class="np-eyebrow mb-20">Start here</p>
          <button class="btn btn-sm width-100 mb-15" onclick="go('/p/category')">Submit an invoice</button>
          <button class="btn btn-sm btn-ghost width-100 mb-15" onclick="go('/p/bulk')">Upload in bulk</button>
          <button class="btn btn-sm btn-ghost width-100" onclick="go('/p/expected')">See what is expected</button>
        </div>
        <div class="np-panel"><p class="np-eyebrow mb-20">Service level</p>
          ${dl([['Property Manager','T+2'],['Normal AP','T+2 / T+3'],['Rush','Same day / T+1'],
                ['Escalation','L1 AP team · L2 manager · L3 finance head']])}</div>
        ${need.length ? `<div class="note note-red">${need.length} invoice${need.length>1?'s':''} cannot move until you act.
          <a href="#/p/attention" class="link-red">Open them</a>.</div>` : ''}
      </div></div>`);
}

/* ======================================================================== */
/* 2. Expected from you — URN seeded rows                                    */
/* ======================================================================== */
function scExpected() {
  const rows = myProv().map(p => ({
    urn:urn(p.urn),
    it:`${esc(p.item)}<br><span class="fs-12 color-grey">${esc(iName(p.item))}</span>`,
    bu:esc(p.bu) + (p.locator ? `<br><span class="fs-12 color-grey">locator ${esc(p.locator)}</span>` : ''),
    per:`${esc(p.periodFrom)}<br><span class="fs-12 color-grey">to ${esc(p.periodTo)}</span>`,
    amt:`<span class="num">${inr(remaining(p))}</span>`,
    age:`${p.age} d`,
    act:`<a href="#/p/submit?urn=${encodeURIComponent(p.urn)}" class="link-red">Raise invoice</a>`
  }));
  return pPage('/p/expected', `<h4 class="mb-10">What Airtel is expecting from you</h4>
    <p class="color-grey mb-40">Airtel has already estimated these costs and raised a provision against each one. Submit against a row here and the reference travels with your invoice — no matching guesswork at either end.</p>
    ${kpis([
      { n:myProv().length, l:'Open provisions', s:'Awaiting your invoice' },
      { n:inrShort(myProv().reduce((a,p)=>a+remaining(p),0)), l:'Value expected' },
      { n:myProv().filter(p=>p.age>60).length, l:'Over 60 days', s:'Escalation begins at 90' },
      { n:'Pre-tagged', l:'Reference', s:'Carried into the ERP document' }
    ])}
    ${table([{h:'Airtel reference (URN)',k:'urn'},{h:'Item',k:'it'},{h:'Business unit',k:'bu'},
      {h:'Activity period',k:'per'},{h:'Expected value',k:'amt',cls:'tr'},{h:'Open for',k:'age'},{h:'',k:'act',cls:'fixed-last-col'}],
      rows, { empty:'Nothing outstanding — every provision raised for you has been settled.' })}
    <div class="np-grid g2 mt-50">
      <div class="note note-blue">You are not expected to know an internal identifier like 111-601144-RENTAOR-SEP26. You do not need to — the template you download is already pre-filled with the rows Airtel is expecting. You add invoice number, date and amount.</div>
      <div class="note">Anything you add that was not seeded here is unprovisioned by definition, and Airtel will see it on the missing-provision report. It is still accepted — it simply books straight to expense.</div>
    </div>`);
}

/* ======================================================================== */
/* 3. Select category                                                        */
/* ======================================================================== */
const SUB = { cat:'PM-CTOCO', urn:null, invNo:'', invDate:'', base:'', cgst:'', sgst:'', igst:'',
              from:'', to:'', rcm:false, rushReason:'', irn:false, step:0 };
function scCategory() {
  const pm = M.categories.filter(c => c.mod === 'PM'), ap = M.categories.filter(c => c.mod === 'AP');
  const tile = c => `<div class="tile ${SUB.cat===c.id?'sel':''}" onclick="SUB.cat='${c.id}';render()">
    <h5>${esc(c.name)}</h5><p>${esc(c.desc)}</p>
    <p class="tile-meta">${esc(c.mod)} module · SLA ${esc(c.sla)}</p></div>`;
  return pPage('/p/category', `<h4 class="mb-10">Submit an invoice</h4>
    <p class="color-grey mb-40">Booking works differently by category. Property Manager invoices are booked against the locator; AP invoices against the invoice details.</p>
    <p class="np-eyebrow mb-20">Property Manager — booked locator-wise</p>
    <div class="tiles mb-50">${pm.map(tile).join('')}</div>
    <p class="np-eyebrow mb-20">AP module — booked on invoice details</p>
    <div class="tiles">${ap.map(tile).join('')}</div>
    <div class="mt-50 text-right">
      <a href="#/p/bulk" class="mr-40">Upload in bulk instead</a>
      <button class="btn btn-lg" onclick="SUB.step=0;go('/p/submit')">Continue with ${esc((M_.cat[SUB.cat]||{}).name)}</button></div>`);
}

/* ======================================================================== */
/* 4. Single invoice submission                                              */
/* ======================================================================== */
function scSubmit(q) {
  const c = M_.cat[SUB.cat] || M.categories[0];
  if (q && q.urn) SUB.urn = q.urn;
  const p = SUB.urn ? S.provisions.find(x => x.urn === SUB.urn) : null;
  const steps = ['Invoice details','Checks','Submit'];

  if (SUB.step === 1) return pPage('/p/category', pSubmitChecks(c, p));
  if (SUB.step === 2) return pPage('/p/category', pSubmitDone(c, p));

  const extra =
    c.fields === 'meter' ? `
      ${field('manual','Meter reading — start', '', { ph:'e.g. 448120' })}
      ${field('manual','Meter reading — end', '', { ph:'e.g. 461904' })}
      ${field('manual','Billing period', '', { ph:'01 Aug 2026 – 31 Aug 2026' })}` :
    c.fields === 'locator' ? `
      ${field('manual','Technical ID / TOCO ID', '', { ph:'e.g. HR-GGN-0448' })}
      ${field('auto','Locator ID', p && p.locator ? esc(p.locator) : '11106',
        { hint:'Resolved from the PN Attribute Report. Multiple lines on one Technical ID are grouped, taking the minimum start and maximum end date.' })}
      ${field('auto','Opex head / service mapping', 'Site Rent — AOR',
        { hint:'Drives GST tax category, TDS category and TDS section.' })}` :
    c.fields === 'llgst' ? `
      ${field('manual','Lease reference', '', { select:['LSE-HR-00218 — Plot 44, Sector 18','LSE-HR-00219 — Plot 12, Sector 21'] })}
      ${field('auto','Base rent paid', '₹60,000', { hint:'GST can only be submitted once the rent itself is paid.' })}
      ${field('auto','GST cap at 18%', '₹10,800', { hint:'A higher value is rejected; a lower value is accepted.' })}` :
    c.fields === 'rush' ? `
      ${field('manual','Rush reason', '', { select:['Statutory deadline','Vendor stop-supply notice','Court or regulatory order','Board-approved exception'] })}
      ${field('manual','NFA / approval reference', '', { ph:'Required where force approval applies under DOA' })}` : '';

  return pPage('/p/category', `${crumb([['Submit an invoice','/p/category'],[c.name]])}
    <h4 class="mb-10">${esc(c.name)}</h4>
    <p class="color-grey mb-40">${esc(c.desc)} &nbsp;·&nbsp; ${esc(c.mod)} module &nbsp;·&nbsp; SLA ${esc(c.sla)}</p>
    ${hsteps(steps, 0)}
    ${p ? `<div class="np-panel mb-40" style="border-color:#96ba3a">
      <p class="np-eyebrow mb-15">Submitting against an expected provision</p>
      ${urn(p.urn, true)}
      <p class="fs-14 color-grey mt-15">${esc(iName(p.item))} · ${esc(p.periodFrom)} to ${esc(p.periodTo)} · expecting ${inr(remaining(p))}</p>
      </div>` : `<div class="note note-blue mb-40">No Airtel reference selected. You can still submit — Airtel will derive the match from the service period, vendor and locator.
        <a href="#/p/expected" class="link-red">Pick from what is expected</a>.</div>`}
    <div class="np-grid g3">
      <div>
        ${field('auto','Vendor name', 'Indus Towers Ltd')}
        ${field('auto','GSTIN', '06AABCI2345P1Z9')}
        ${field('auto','Vendor site', 'IND-GGN-11', { hint:'Derived from the quality plan. An inactive or blocked site blocks submission.' })}
        ${field('manual','Invoice number', SUB.invNo, { ph:'No special characters', on:'SUB.invNo=this.value' })}
        ${field('manual','Invoice date', SUB.invDate, { type:'date', on:'SUB.invDate=this.value' })}
      </div>
      <div>
        ${field('manual','Base amount', SUB.base, { ph:'0.00', on:'SUB.base=this.value' })}
        ${field('manual','CGST', SUB.cgst, { ph:'0.00', on:'SUB.cgst=this.value' })}
        ${field('manual','SGST', SUB.sgst, { ph:'0.00', on:'SUB.sgst=this.value' })}
        ${field('manual','IGST', SUB.igst, { ph:'0.00', on:'SUB.igst=this.value' })}
        ${field('auto','Total invoice value', '<span class="color-grey">Calculated on entry</span>')}
      </div>
      <div>
        ${field('manual','Service period from', SUB.from, { type:'date', on:'SUB.from=this.value',
          hint:'Mandatory. Without it the invoice actualizes on a FIFO basis against the oldest open provision.' })}
        ${field('manual','Service period to', SUB.to, { type:'date', on:'SUB.to=this.value' })}
        ${field('auto','Payment terms', 'Immediate', { hint:'Populated from the quality plan and rush logic.' })}
        ${field('auto','TDS section / category', '194C · Contractors — 2%')}
        ${extra}
      </div></div>
    <div class="np-grid g2 mt-30">
      <div class="drop" onclick="SUB.irn=true;render()">
        ${icon('camera')}<div><p class="d-t">${SUB.irn ? 'IRN scanned — QR verified' : 'Scan IRN QR code'}</p>
        <p class="d-s">Available where you are eligible under e-invoicing. Fields are then read from the IRN.</p></div></div>
      <div class="drop" onclick="toast('Mockup — file picker not wired.')">
        ${icon('upload')}<div><p class="d-t">Invoice copy and supporting documents</p>
        <p class="d-s">PDF, JPG, PNG · max 10 MB each · mandatory for this category</p></div></div>
    </div>
    <div class="mt-25"><label class="checkcontainer" style="padding-left:30px">
      <input type="checkbox" ${SUB.rcm?'checked':''} onchange="SUB.rcm=this.checked;render()"><span class="checkmark"></span>
      Reverse Charge Mechanism applies to this invoice</label></div>
    <div class="mt-50 text-right"><a href="#/p/category" class="mr-40">Back</a>
      <button class="btn btn-lg" onclick="SUB.step=1;render()">Run checks</button></div>`);
}

function pSubmitChecks(c, p) {
  const missing = !SUB.invNo || !SUB.base;
  const noPeriod = !SUB.from;
  return `${crumb([['Submit an invoice','/p/category'],[c.name]])}
    <h4 class="mb-10">${esc(c.name)}</h4>
    <p class="color-grey mb-40">Checks run before submission, so an incomplete invoice never enters the queue.</p>
    ${hsteps(['Invoice details','Checks','Submit'], 1)}
    <div class="split"><div>
      ${checks([
        { s: missing?'fail':'pass', t:'Mandatory fields', d: missing
          ? 'Invoice number and base amount are required. Submission is blocked until both are supplied.'
          : 'All mandatory fields for this category are present.' },
        { s:'pass', t:'Vendor master and site', d:'Indus Towers Ltd · site IND-GGN-11 is active and not blocked. GL code and budget head resolved.' },
        { s:'pass', t:'Duplicate check', d:'No invoice with this number is already booked or under processing in PM or AP.' },
        { s:'pass', t:'GST validation', d:'Supplier GSTIN and Airtel GSTIN verified. Tax split is consistent with the place of supply.' },
        { s:'pass', t:'TDS section and category', d:'194C · Contractors · 2% applied from the opex head mapping.' },
        { s: noPeriod?'warn':'pass', t:'Service period', d: noPeriod
          ? 'Not supplied. The invoice will be actualized on a FIFO basis against the oldest open provision, which is a deliberate degradation.'
          : 'Present, and inside an open accounting period.' },
        { s: p?'pass':'warn', t:'Airtel reference (URN)', d: p
          ? `Tagged to ${esc(p.urn)}. The reference is carried onto the ERP document, so no derivation is needed at Airtel's end.`
          : 'Not tagged. Airtel will derive the match from vendor, category, locator and service period.' },
        { s:'pass', t:'Supporting documents', d:'Invoice copy attached. Documents will be uploaded to OWCC on a Group ID basis.' }
      ])}
      <div class="mt-40 text-right"><a href="#" onclick="SUB.step=0;render();return false" class="mr-40">Back</a>
        <button class="btn btn-lg" ${missing?'disabled style="opacity:.4;cursor:not-allowed"':`onclick="SUB.step=2;render()"`}>
          ${missing ? 'Fix the errors above' : 'Submit invoice'}</button></div>
    </div><div class="split-r">
      <p class="np-eyebrow mb-20">What happens next</p>
      ${timeline([
        { k:'ok', when:'Immediately', what:'Airtel reference generated', who:'NONPO-2026-xxxxxxx' },
        { when:'Within minutes', what:'OCR extracts the invoice fields', who:'Compared against what you typed' },
        { when:'T+0', what:'Automated checklist validation', who:'Failures come back to you with the reason' },
        { when:'T+1', what:'DOA approval', who:'Routed on budget head and value' },
        { when:`T+${c.sla.includes('Same')?'1':'2'}`, what:'Booked in the ERP', who:'PM or AP module' },
        { when:'Month end', what:'Actualized against the provision', who:'The URN closes' }
      ])}
    </div></div>`;
}

function pSubmitDone(c, p) {
  const ref = 'NONPO-2026-00' + (13500 + myInv().length);
  return `<div class="text-center" style="max-width:700px;margin:60px auto 0">
    <p class="fs-48 color-red mb-25">${icon('circle-checkmark')}</p>
    <h4 class="mb-20">Invoice submitted</h4>
    <p class="color-grey mb-40">Track it with the reference below. You will be notified at each stage, and immediately if anything fails validation.</p>
    <div class="np-panel"><p class="np-eyebrow mb-15">Airtel reference number</p>
      <p class="fs-30 mb-30">${esc(ref)}</p>
      ${p ? `<p class="np-eyebrow mb-15">Tagged to provision</p>${urn(p.urn, true)}` : ''}
    </div>
    <div class="mt-40"><a href="#/p/category" class="mr-40" onclick="SUB.step=0">Submit another</a>
      <button class="btn btn-lg" onclick="SUB.step=0;go('/p/invoices')">Track my invoices</button></div></div>`;
}

/* ======================================================================== */
/* 5. Bulk upload                                                            */
/* ======================================================================== */
function scPBulk() {
  return pPage('/p/bulk', `<h4 class="mb-10">Bulk invoice upload</h4>
    <p class="color-grey mb-40">Templates differ by booking type. Property Manager files are locator-wise; AP files carry invoice headers.</p>
    <p class="fs-16 mb-10">Follow these steps</p>
    <p class="fs-14 color-grey">1. Download the template for your booking type &nbsp;·&nbsp; 2. Fill every mandatory column &nbsp;·&nbsp; 3. Upload &nbsp;·&nbsp; 4. Review the row results</p>
    <div class="np-grid g2 mt-40">
      <div>
        <div class="download-document mb-30" style="padding:36px 30px">
          ${icon('download','fs-40 pull-left mr-20 color-grey')}
          <div class="pull-left file-name"><p class="fs-16">Property Manager template</p>
            <p class="fs-12 color-grey mt-5">Locator-wise · pre-filled with the provisions expected from you</p></div>
          <div class="pull-right mt-10"><a href="#" class="fs-14" onclick="toast('Mockup — template download not wired.');return false">DOWNLOAD</a></div></div>
        <div class="download-document" style="padding:36px 30px">
          ${icon('download','fs-40 pull-left mr-20 color-grey')}
          <div class="pull-left file-name"><p class="fs-16">AP module template</p>
            <p class="fs-12 color-grey mt-5">Invoice header level · includes RCM and rush columns</p></div>
          <div class="pull-right mt-10"><a href="#" class="fs-14" onclick="toast('Mockup — template download not wired.');return false">DOWNLOAD</a></div></div>
      </div>
      <div class="upload-document" style="padding:36px 30px;min-height:100%">
        <div class="pull-left file-name"><p class="fs-16">Upload your completed template</p>
          <p class="fs-12 color-grey mt-5">XLSX only · max 5,000 rows per file · max 10 MB</p></div>
        <div class="pull-right mt-10"><a href="#/p/batch/BATCH-2026-0907" class="fs-14">BROWSE</a></div></div>
    </div>
    <div class="note note-blue mt-40">Every row that carries an Airtel reference skips derivation entirely. Rows without one are still accepted — they simply take the longer route through Airtel's matching queue.</div>
    <h4 class="mt-60 mb-25">Recent batches</h4>
    ${table([{h:'Batch',k:'a'},{h:'File',k:'b'},{h:'Rows',k:'c',cls:'tr'},{h:'Accepted',k:'d',cls:'tr'},
      {h:'Warnings',k:'e',cls:'tr'},{h:'Failed',k:'f',cls:'tr'},{h:'Uploaded',k:'g'},{h:'Status',k:'h'}],
      BATCHES.map(b => ({ __href:'/p/batch/'+b.id, a:esc(b.id), b:esc(b.file), c:b.rows, d:b.ok,
        e:b.warn, f:`<span class="${b.fail?'color-red':''}">${b.fail}</span>`, g:esc(b.on), h:pill(b.status) })),
      { tight:true })}`);
}

/* ======================================================================== */
/* 6. Batch processing status                                                */
/* ======================================================================== */
function scBatch(id) {
  const b = BATCHES.find(x => x.id === id) || BATCHES[0];
  const sample = [
    { r:12,  tid:'HR-GGN-0448', loc:'11106', per:'01–30 Sep 2026', amt:2280,  s:'ok',   m:'Accepted — URN 111-601144-RENTAOR-SEP26-11106' },
    { r:13,  tid:'HR-GGN-0449', loc:'11106', per:'01–30 Sep 2026', amt:2280,  s:'ok',   m:'Accepted — grouped with row 12 on the same Technical ID' },
    { r:88,  tid:'HR-FBD-1120', loc:'11109', per:'01–30 Sep 2026', amt:1940,  s:'warn', m:'Locator resolved but opex head missing — defaulted to Site Rent — AOR' },
    { r:141, tid:'HR-KNL-0067', loc:'—',     per:'01–30 Sep 2026', amt:2110,  s:'fail', m:'Technical ID not found in the PN Attribute Report' },
    { r:142, tid:'HR-KNL-0068', loc:'11109', per:'—',              amt:2110,  s:'fail', m:'Service period From / To is mandatory' },
    { r:207, tid:'HR-RTK-0311', loc:'11106', per:'01–30 Sep 2026', amt:0,     s:'fail', m:'Amount must be greater than zero' },
    { r:390, tid:'HR-SNP-0904', loc:'11106', per:'01–31 Aug 2026', amt:2280,  s:'warn', m:'Service period is a prior month — will match the Aug provision, not Sep' }
  ];
  const ico = { ok:'pill-closed', warn:'pill-partial', fail:'pill-rejected' };
  const lbl = { ok:'Accepted', warn:'Warning', fail:'Failed' };
  return pPage('/p/batches', `${crumb([['Upload batches','/p/batches'],[b.id]])}
    <h4 class="mb-10">${esc(b.id)}</h4>
    <p class="color-grey mb-40">${esc(b.file)} &nbsp;·&nbsp; uploaded ${esc(b.on)} &nbsp;·&nbsp; ${esc((M_.cat[b.category]||{}).name)}</p>
    ${kpis([
      { n:b.rows, l:'Rows in file' },
      { n:b.ok, l:'Accepted', s:'Moving to validation' },
      { n:b.warn, l:'Accepted with warnings' },
      { n:b.fail, l:'Failed', s:'Correct and re-upload these only' },
      { n:pill(b.status), l:'Batch status' }
    ])}
    <div class="bar b-green mb-50" style="height:6px"><i style="width:${(b.ok/b.rows*100).toFixed(1)}%"></i></div>
    <div class="np-grid g-2-1">
      <div>
        <p class="np-eyebrow mb-20">Row results — sample</p>
        ${table([{h:'Row',k:'r'},{h:'Technical ID',k:'t'},{h:'Locator',k:'l'},{h:'Service period',k:'p'},
          {h:'Amount',k:'a',cls:'tr'},{h:'Result',k:'s'},{h:'Message',k:'m',cls:'wrap'}],
          sample.map(x => ({ r:x.r, t:esc(x.tid), l:esc(x.loc), p:esc(x.per),
            a:`<span class="num">${inr(x.amt)}</span>`,
            s:`<span class="pill ${ico[x.s]}">${lbl[x.s]}</span>`,
            m:`<span class="fs-13 ${x.s==='fail'?'color-red':'color-grey'}">${esc(x.m)}</span>` })), { tight:true })}
        <div class="mt-40"><a href="#" class="mr-40" onclick="toast('Mockup — failed-rows download not wired.');return false">Download failed rows</a>
          <button class="btn btn-sm btn-ghost" onclick="go('/p/bulk')">Re-upload corrections</button></div>
      </div>
      <div><div class="np-panel"><p class="np-eyebrow mb-20">Partial success is the default</p>
        <p class="fs-14 color-grey line-height-22">A failure on one row does not reject the file. ${b.ok} rows are already moving through OCR and validation while you correct the ${b.fail} that failed.</p>
        <hr class="hr">
        <p class="np-eyebrow mb-15">Grouping</p>
        <p class="fs-14 color-grey line-height-22">Where several rows carry the same Technical ID they are grouped into one booking line, taking the minimum start date and the maximum end date.</p></div>
        <div class="note note-blue">Attachments are uploaded to OWCC on a Group ID basis, so one document can cover a whole group of locator lines.</div>
      </div></div>`);
}

function scBatches() {
  return pPage('/p/batches', `<h4 class="mb-10">Upload batches</h4>
    <p class="color-grey mb-40">Every bulk file you have submitted, and how each row fared.</p>
    ${table([{h:'Batch',k:'a'},{h:'Category',k:'i'},{h:'File',k:'b'},{h:'Rows',k:'c',cls:'tr'},
      {h:'Accepted',k:'d',cls:'tr'},{h:'Warnings',k:'e',cls:'tr'},{h:'Failed',k:'f',cls:'tr'},
      {h:'Uploaded',k:'g'},{h:'Status',k:'h'}],
      BATCHES.map(b => ({ __href:'/p/batch/'+b.id, a:esc(b.id), i:esc((M_.cat[b.category]||{}).name),
        b:esc(b.file), c:b.rows, d:b.ok, e:b.warn,
        f:`<span class="${b.fail?'color-red':''}">${b.fail}</span>`, g:esc(b.on), h:pill(b.status) })))}`);
}

/* ======================================================================== */
/* 7. OCR / IRN review                                                       */
/* ======================================================================== */
function scOcr(ref) {
  const i = S.invoices.find(x => x.ref === ref) || myInv()[0];
  const rows = [
    { f:'Invoice number',  src:i.invNo,          ocr:i.invNo,          conf:99, ok:true },
    { f:'Invoice date',    src:i.invDate,        ocr:i.invDate,        conf:97, ok:true },
    { f:'Supplier GSTIN',  src:'06AABCI2345P1Z9', ocr:'06AABCI2345P1Z9', conf:99, ok:true },
    { f:'Base amount',     src:inr(i.amount),    ocr:inr(i.amount),    conf:96, ok:true },
    { f:'CGST',            src:inr(i.gst/2),     ocr:inr(i.gst/2),     conf:94, ok:true },
    { f:'SGST',            src:inr(i.gst/2),     ocr:inr(i.gst/2),     conf:94, ok:true },
    { f:'Total value',     src:inr(i.amount+i.gst), ocr:inr(i.amount+i.gst), conf:95, ok:true },
    { f:'Service period',  src:`${i.serviceFrom} – ${i.serviceTo}`, ocr:'Not detected', conf:38, ok:false }
  ];
  return pPage('/p/invoices', `${crumb([['My invoices','/p/invoices'],[i.ref],['OCR review']])}
    <h4 class="mb-10">OCR review</h4>
    <p class="color-grey mb-40">What OCR read from the document, against what was supplied. Anything below the confidence threshold comes to you before booking.</p>
    <div class="split"><div>
      ${table([{h:'Field',k:'f'},{h:'You supplied',k:'s'},{h:'OCR read',k:'o'},{h:'Confidence',k:'c'},{h:'',k:'v'}],
        rows.map(r => ({ f:esc(r.f), s:esc(r.src),
          o:`<span class="${r.ok?'':'color-red'}">${esc(r.ocr)}</span>`,
          c:`<div class="bar ${r.conf>90?'b-green':'b-amber'}" style="width:90px"><i style="width:${r.conf}%"></i></div>
             <span class="fs-12 color-grey">${r.conf}%</span>`,
          v:r.ok ? '<span class="pill pill-closed">Verified</span>' : '<span class="pill pill-partial">Confirm</span>' })),
        { tight:true })}
      <div class="note note-amber mt-40">Service period is not printed on this document. It decides which provision the invoice settles, so it cannot be inferred — confirm it here or the invoice actualizes on a FIFO basis.</div>
      <div class="np-grid g2 mt-30">
        ${field('manual','Service period from', i.serviceFrom, { type:'date' })}
        ${field('manual','Service period to', i.serviceTo, { type:'date' })}
      </div>
      <div class="mt-40 text-right"><a href="#/p/invoice/${esc(i.ref)}" class="mr-40">Back</a>
        <button class="btn btn-lg" onclick="toast('Confirmed. Invoice moves to validation.',true);go('/p/invoice/${esc(i.ref)}')">Confirm and continue</button></div>
    </div><div class="split-r">
      <p class="np-eyebrow mb-20">Document</p>
      <div style="border:1px solid #ccc;padding:30px;background:#fafafa;text-align:center">
        ${icon('document','fs-48 color-grey')}
        <p class="fs-14 mt-20">${esc(i.invNo)}.pdf</p>
        <p class="fs-12 color-grey mt-5">2 pages · 418 KB</p>
        <p class="mt-25"><a href="#" class="link-red fs-13" onclick="toast('Mockup — document viewer not wired.');return false">Open viewer</a></p>
      </div>
      <hr class="hr">
      <p class="np-eyebrow mb-15">Where each field is trusted from</p>
      ${dl([
        ['OCR','Invoice number and date, base amount, CGST / SGST / IGST, total, supplier GSTIN'],
        ['You','Service billing start and end, Site ID, Airtel ID, invoice type'],
        ['Quality plan','Locator ID, operating unit, BU code, vendor name and code']
      ])}
    </div></div>`);
}

/* ======================================================================== */
/* 8. Invoice list, attention queue and status tracker                       */
/* ======================================================================== */
function scPInvoices(filterAttention) {
  let I = myInv();
  if (filterAttention) I = I.filter(i => ['REJECTED','VALIDATION_FAILED','RFI'].includes(i.status));
  const rows = I.map(i => ({
    __href:'/p/invoice/' + i.ref,
    ref:esc(i.ref), inv:esc(i.invNo), cat:esc((M_.cat[i.category]||{}).name),
    d:esc(i.invDate),
    sp:i.serviceFrom ? `${esc(i.serviceFrom)} – ${esc(i.serviceTo)}` : '<span class="color-red">Not supplied</span>',
    amt:`<span class="num">${inr(i.amount + i.gst)}</span>`,
    st:pill(i.status), erp:esc(i.erpDoc || '—'),
    urn:i.urn ? urn(i.urn) : '<span class="color-grey">—</span>'
  }));
  return pPage(filterAttention ? '/p/attention' : '/p/invoices',
    `<h4 class="mb-10">${filterAttention ? 'Needs your attention' : 'My invoices'}</h4>
     <p class="color-grey mb-40">${filterAttention
       ? 'These cannot move until you act. Each one shows exactly what failed and what to change.'
       : 'Every invoice you have submitted, with its live position in the lifecycle.'}</p>
     ${table([{h:'Reference',k:'ref'},{h:'Invoice',k:'inv'},{h:'Category',k:'cat'},{h:'Date',k:'d'},
       {h:'Service period',k:'sp'},{h:'Total',k:'amt',cls:'tr'},{h:'Status',k:'st'},
       {h:'ERP document',k:'erp'},{h:'Airtel reference',k:'urn'}], rows,
       { empty: filterAttention ? 'Nothing needs your attention.' : 'No invoices submitted yet.' })}`);
}

function scPInvoice(ref) {
  const i = S.invoices.find(x => x.ref === ref);
  if (!i) return scPInvoices(false);
  const at = STATUS_FLOW.indexOf(i.status);
  const bad = ['REJECTED','VALIDATION_FAILED','RFI'].includes(i.status);
  const tl = FLOW_LABEL.map((l, n) => ({
    k: at >= 0 && n < at ? 'ok' : at === n ? 'now' : '',
    when: n === 0 ? i.submittedOn : n === 4 ? (i.bookedOn || 'Pending') : n === 5 ? (i.matchedOn || 'Month end') : '—',
    what: l,
    who: n === 4 && i.erpDoc ? i.erpDoc : n === 5 && i.urn ? i.urn : ''
  }));

  return pPage('/p/invoices', `${crumb([['My invoices','/p/invoices'],[i.ref]])}
    <div class="split"><div>
      <h4 class="mb-15">${esc(i.invNo)}</h4>
      <p class="mb-40">${pill(i.status)} ${i.rush?'<span class="pill pill-rush">Rush</span>':''}
        <span class="fs-14 color-grey ml-15">${esc(i.ref)}</span></p>

      ${bad ? `<div class="np-panel" style="border-color:#e40000">
        <div class="np-panel-head"><p class="np-eyebrow" style="color:#e40000">
          ${i.status === 'RFI' ? 'Information requested' : 'What failed'}</p></div>
        ${i.fails ? `<ul class="checks">${i.fails.map(f =>
          `<li><span class="ck ck-fail">${icon('cross')}</span><span class="ck-body"><p>${esc(f)}</p></span></li>`).join('')}</ul>`
          : `<p class="color-grey">${esc(i.note || 'Airtel has asked for more information on this invoice.')}</p>`}
        <div class="mt-30"><button class="btn btn-sm" onclick="toast('Mockup — correction flow not wired.')">Correct and resubmit</button>
          <a href="#" class="ml-30 color-grey" onclick="toast('Mockup — message thread not wired.');return false">Message the AP team</a></div>
      </div>` : ''}

      ${i.status === 'OCR' ? `<div class="note note-amber mb-30">OCR needs one field confirmed before this invoice can continue.
        <a href="#/p/ocr/${esc(i.ref)}" class="link-red">Review now</a>.</div>` : ''}

      <div class="np-panel"><div class="np-panel-head"><p class="np-eyebrow">Invoice</p></div>
        ${dl([
          ['Invoice number', esc(i.invNo)],
          ['Invoice date', esc(i.invDate)],
          ['Category', esc((M_.cat[i.category]||{}).name) + ' · ' + esc((M_.cat[i.category]||{}).mod) + ' module'],
          ['Service period', i.serviceFrom ? `${esc(i.serviceFrom)} to ${esc(i.serviceTo)}` : '<span class="color-red">Not supplied — FIFO applies</span>'],
          ['Booked at BU', esc(i.bookedBU)],
          ['Base amount', `<span class="num">${inr(i.amount)}</span>`],
          ['GST', `<span class="num">${inr(i.gst)}</span>`],
          ['Total', `<span class="num">${inr(i.amount + i.gst)}</span>`],
          ['ERP document', esc(i.erpDoc || 'Not yet booked')],
          ['Batch', i.batch ? `<a href="#/p/batch/${esc(i.batch)}" class="link-red">${esc(i.batch)}</a>` : '—'],
          ['Airtel reference', i.urn ? urn(i.urn) : '<span class="color-grey">To be derived by Airtel</span>']
        ])}</div>
    </div><div class="split-r">
      <p class="np-eyebrow mb-25">Progress</p>
      ${timeline(bad
        ? [{ k:'ok', when:i.submittedOn, what:'Submitted', who:i.batch || '' },
           { k:'bad', when:i.submittedOn, what: i.status === 'RFI' ? 'Information requested' : 'Validation failed',
             who:'Waiting on you' }]
        : tl)}
      <hr class="hr">
      <p class="np-eyebrow mb-15">Service level</p>
      ${dl([['Category SLA', esc((M_.cat[i.category]||{}).sla)],
            ['Submitted', esc(i.submittedOn)],
            ['Booked', esc(i.bookedOn || 'Pending')],
            ['Escalation', 'L1 AP team · L2 manager · L3 finance head']])}
      ${i.rush ? `<div class="note note-red mt-25">Rush — ${esc(i.rushReason || 'reason on file')}. Escalation fires automatically if the SLA is breached.</div>` : ''}
    </div></div>`);
}
