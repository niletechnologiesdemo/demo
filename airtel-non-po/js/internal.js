/* ==========================================================================
   Non-PO Automation Platform — internal screens (GPA / ACE / CFR).
   ========================================================================== */

const MON = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
/* '01 Jun 2026' -> 'JUN26'. Service period, never invoice date — BRD TOCO §3. */
function monthKey(d) {
  if (!d) return null;
  const p = d.split(' ');
  return p[1].toUpperCase() + p[2].slice(2);
}
/* A reversing provision is flipped by Oracle on day one of the FOLLOWING period. */
function nextMonthLabel(m) {
  const i = MON.indexOf(m.slice(0, 3)), yy = +m.slice(3);
  const n = (i + 1) % 12, y = i === 11 ? yy + 1 : yy;
  return MON[n][0] + MON[n].slice(1).toLowerCase() + ' ' + (2000 + y);
}
/* Category bounds what an invoice may match. An LL_EB invoice is electricity
   and can never match a rent provision, however close the other parts look. */
const CAT_ITEM = {
  'PM-LLEB':['ELEC-AOR','DSL-AOR'], 'PM-CTOCO':['RENT-AOR'], 'PM-LTOCO':['RENT-AOR'],
  'PM-RSD':['RENT-AOR'], 'AP-LLGST':['RENT-AOR'], 'PM-BWD':[], 'PM-BWI':[]
};

const openProv    = () => S.provisions.filter(p => ['OPEN','PARTIAL'].includes(p.status));
const pendingProv = () => S.provisions.filter(p => p.status === 'PENDING');
const failedProv  = () => S.provisions.filter(p => p.status === 'FAILED');
const toMatch     = () => S.invoices.filter(i => ['UNMATCHED','RFI'].includes(i.status));
const remaining   = p => p.amount - (p.consumed || 0);

function iGroups(active) {
  return [
    { t:'Provisioning', items:[
      { l:'Provision overview', r:'/i/dashboard', c:S.provisions.length },
      { l:'Create provision',   r:'/i/new' },
      { l:'Bulk upload',        r:'/i/bulk' },
      { l:'Approval inbox',     r:'/i/approvals', c:pendingProv().length } ]},
    { t:'Actualization', items:[
      { l:'Actualization',      r:'/i/actualization' },
      { l:'Match worklist',     r:'/i/match', c:toMatch().length },
      { l:'Prepaid & deferment',r:'/i/prepaid' } ]},
    { t:'Controls', items:[
      { l:'Ageing & reversal',  r:'/i/ageing' },
      { l:'Oracle posting',     r:'/i/posting', c:failedProv().length },
      { l:'TB / FSG flash',     r:'/i/flash' } ]},
    { t:'Configuration', items:[
      { l:'Scenario router',    r:'/i/scenarios' },
      { l:'Masters & rules',    r:'/i/admin' },
      { l:'Reports',            r:'/i/reports' } ]}
  ];
}
const iPage = (active, body, sub) => page({
  groups: iGroups(active), active, persona:'i',
  who:'Prem Sharma', sub: sub || 'GPA · Bharti Airtel Ltd · Sep 2026 open',
  body });

/* ======================================================================== */
/* 1. Provision overview                                                     */
/* ======================================================================== */
function scDashboard() {
  const P = S.provisions;
  const val = st => P.filter(p => st.includes(p.status)).reduce((a, p) => a + remaining(p), 0);
  const k = kpis([
    { n:P.length, l:'Total provisions', s:inrShort(P.reduce((a,p)=>a+p.amount,0)) },
    { n:P.filter(p=>p.status==='OPEN').length,    l:'Open',              s:inrShort(val(['OPEN'])) },
    { n:P.filter(p=>p.status==='PARTIAL').length, l:'Partially actualized', s:inrShort(val(['PARTIAL'])) },
    { n:P.filter(p=>p.status==='CLOSED').length,  l:'Closed', s:'Fully actualized' },
    { n:pendingProv().length, l:'Pending approval', go:'/i/approvals', s:'DOA queue' },
    { n:P.filter(p=>['REVERSED','HOLD','FAILED'].includes(p.status)).length, l:'Reversed / held / failed', go:'/i/ageing' }
  ]);

  const rows = P.map(p => ({
    __href:'/i/provision/' + p.id,
    urn: urn(p.urn),
    st: pill(p.status) + (p.rpt ? ' <span class="pill pill-rpt">RPT</span>' : ''),
    bu: `${esc(p.bu)}<br><span class="fs-12 color-grey">${esc(bName(p.bu))}</span>`,
    ven:`${esc(vName(p.vendor))}<br><span class="fs-12 color-grey">${esc(p.vendor)}</span>`,
    it: `${esc(p.item)}<br><span class="fs-12 color-grey">${esc(iName(p.item))}</span>`,
    mo: esc(p.month),
    amt:`<span class="num">${inr(p.amount)}</span>`,
    con:`<span class="num">${p.consumed ? inr(p.consumed) : '—'}</span>`,
    rem:`<span class="num">${remaining(p) ? inr(remaining(p)) : '—'}</span>`,
    age:`${p.age} d`,
    rev:p.reversal ? '<span class="pill pill-reversed">Reversal</span>' : '<span class="pill">Standing</span>'
  }));

  return iPage('/i/dashboard', `
    <h4 class="mb-10">Provision overview</h4>
    <p class="color-grey mb-40">Every Non-PO provision across business units and legal entities, with its URN and how much of it an invoice has consumed.</p>
    ${k}
    <div class="filters">
      <div class="fl"><label class="field-title">Business unit</label>
        <div class="select"><select><option>All business units</option>${M.bus.map(b=>`<option>${b.code} — ${esc(b.name)}</option>`).join('')}</select></div></div>
      <div class="fl"><label class="field-title">Status</label>
        <div class="select"><select><option>All statuses</option><option>Open</option><option>Partial</option><option>Closed</option><option>Pending approval</option></select></div></div>
      <div class="fl"><label class="field-title">Item / nature</label>
        <div class="select"><select><option>All items</option>${M.items.map(i=>`<option>${i.code}</option>`).join('')}</select></div></div>
      <div class="fl"><label class="field-title">Input month</label>
        <div class="select"><select><option>All months</option><option>AUG26</option><option>JUL26</option><option>JUN26</option></select></div></div>
      <div class="fl"><label class="field-title">Search URN</label><input type="text" placeholder="e.g. 111-412885"></div>
      <div class="fl"><button class="btn btn-sm" onclick="go('/i/new')">Create provision</button></div>
    </div>
    ${table([
      {h:'URN',k:'urn'},{h:'Status',k:'st'},{h:'BU',k:'bu'},{h:'Vendor',k:'ven'},{h:'Item',k:'it'},
      {h:'Month',k:'mo'},{h:'Provisioned',k:'amt',cls:'tr'},{h:'Actualized',k:'con',cls:'tr'},
      {h:'Remaining',k:'rem',cls:'tr'},{h:'Age',k:'age'},{h:'Mode',k:'rev'}
    ], rows)}`);
}

/* ======================================================================== */
/* 2. Create provision — three steps                                         */
/* ======================================================================== */
const NEW = { step:0, bu:'111', vendor:'412885', item:'ELEC-AOR', month:'AUG26',
              amount:23100, from:'01 Aug 2026', to:'31 Aug 2026', basis:'Metabase meter reading feed',
              qty:1, rate:23100, remarks:'' };

function scNew() {
  const steps = ['Input','Validation','Accounting & submit'];
  const v = M_.ven[NEW.vendor] || {}, it = M_.item[NEW.item] || {}, bu = M_.bu[NEW.bu] || {};
  let body;

  if (NEW.step === 0) {
    body = `${legend()}
      <div class="np-grid g3">
        <div>
          ${field('auto','Business unit', `${esc(NEW.bu)} — ${esc(bu.name)}`)}
          ${field('auto','Legal entity', esc(bu.entity))}
          ${field('manual','Vendor code', NEW.vendor, { select:M.vendors.map(x=>x.code), on:'setNew("vendor",this.value)' })}
          ${field('auto','Vendor name', esc(v.name))}
          ${field('auto','Group / Non Group', esc(v.group))}
          ${field('auto','RPT classification', v.rpt
            ? '<span class="pill pill-rpt">Related party</span>' : '<span class="pill">Non-RPT</span>',
            { hint:'Derived from the vendor master. Drives journal category and pre-migration segregation.' })}
        </div>
        <div>
          ${field('manual','Item code', NEW.item, { select:M.items.map(x=>x.code), on:'setNew("item",this.value)' })}
          ${field('auto','Item description', esc(it.desc))}
          ${field('auto','Expense GL', esc(it.expGL))}
          ${field('auto','Liability GL', esc(it.liabGL))}
          ${field('manual','Input month', NEW.month, { select:['AUG26','SEP26','JUL26'], on:'setNew("month",this.value)' })}
          ${field('manual','Provision basis', NEW.basis, { on:'setNew("basis",this.value)' })}
        </div>
        <div>
          ${field('manual','Quantity', NEW.qty, { on:'setNew("qty",this.value)' })}
          ${field('manual','Rate', NEW.rate, { on:'setNew("rate",this.value)' })}
          ${field('manual','Amount (INR)', NEW.amount, { on:'setNew("amount",this.value)' })}
          ${field('manual','Period from', NEW.from, { on:'setNew("from",this.value)' })}
          ${field('manual','Period to', NEW.to, { on:'setNew("to",this.value)' })}
          ${field('auto','Department / manager', 'Network Operations · Vipin Aggarwal')}
        </div>
      </div>
      <div class="np-grid g2 mt-20">
        ${field('system','URN — generated on submission',
          `<span class="color-grey">${esc(NEW.bu)}-${esc(NEW.vendor)}-${esc(NEW.item.replace('-',''))}-${esc(NEW.month)}</span>`,
          { hint:'No sequence number. The combination itself must be unique, so a second provision for the same key is a duplicate.' })}
        ${field('manual','Attachment', '', { type:'file' })}
      </div>
      <div class="drop mt-30" onclick="toast('Mockup — file picker not wired.')">
        ${icon('upload')}<div><p class="d-t">Attach the working, agreement or template this provision is based on</p>
        <p class="d-s">PDF, XLSX, PNG — max 10 MB. Mandatory where provision basis is a manual working.</p></div></div>
      <div class="mt-60 text-right"><a href="#/i/dashboard" class="mr-40">Cancel</a>
        <button class="btn btn-lg" onclick="NEW.step=1;render()">Run validation</button></div>`;
  }

  if (NEW.step === 1) {
    const dupe = S.provisions.find(p => p.bu===NEW.bu && p.vendor===NEW.vendor && p.item===NEW.item && p.month===NEW.month);
    body = `<div class="split"><div>
      ${checks([
        { s:'pass', t:'Master data resolves', d:`Business unit ${esc(NEW.bu)}, vendor ${esc(NEW.vendor)} and item ${esc(NEW.item)} all found. Expense GL ${esc(it.expGL)} / liability GL ${esc(it.liabGL)} mapped from the item master.` },
        { s:v.rpt?'warn':'pass', t:'RPT identification', d: v.rpt
            ? 'Vendor is flagged Related Party. Journal category will be set to Related Party and the IUT segment is mandatory on both legs.'
            : 'Vendor is Non-RPT. Standard Provisional journal category applies.' },
        { s:dupe?'fail':'pass', t:'Duplicate check', d: dupe
            ? `A provision already exists on this key — <a href="#/i/provision/${dupe.id}">${esc(dupe.urn)}</a>, ${inr(dupe.amount)}, raised ${esc(dupe.createdOn)}. Exact duplicates are blocked.`
            : 'No existing provision on this BU, vendor, item and month combination.' },
        { s:'warn', t:'Recurring provision suggestion', d:'This cost has been provisioned in 11 of the last 12 months, averaging ₹21,940. The amount entered is 5.3% above that average.' },
        { s:'pass', t:'GL period open', d:`Period ${esc(NEW.month)} is open for posting in Oracle GL. PBR window is ${M.config.pbrMonths} months.` },
        { s:'skip', t:'PO duplication check', d:'No purchase order found against this vendor and item. Where a PO is raised later the provision must be reversed and routed through the PO process.' }
      ])}
      <div class="mt-40 text-right"><a href="#" onclick="NEW.step=0;render();return false" class="mr-40">Back to input</a>
        ${dupe ? `<button class="btn btn-lg btn-ghost" onclick="overrideDupe()">Request override</button>`
               : `<button class="btn btn-lg" onclick="NEW.step=2;render()">Continue</button>`}</div>
    </div><div class="split-r">
      <p class="np-eyebrow mb-20">Validation engine</p>
      <p class="fs-14 color-grey line-height-20">Every check here runs before the provision can reach the approval queue. A hard failure blocks submission; a warning is recorded on the audit trail and passed to the approver.</p>
      <hr class="hr">
      <p class="np-eyebrow mb-15">Override authority</p>
      <p class="fs-14 color-grey line-height-20">Exact duplicates cannot be overridden by the maker. An override request routes to the GPA lead and is written to the audit trail with the reason given.</p>
      <div class="note note-amber mt-30">Clarification Q7 — beyond the URN key itself, the BRD also lists amount and reference document as duplicate criteria, then adds “other configurable parameters”. Those are not yet defined.</div>
    </div></div>`;
  }

  if (NEW.step === 2) {
    const rpt = v.rpt;
    body = `<div class="np-grid g-2-1">
      <div>
        <div class="np-panel"><div class="np-panel-head"><p class="np-eyebrow">Journal the accounting engine will build</p></div>
          ${jv([
            { dr:+NEW.amount, bu:NEW.bu, acct:it.expGL, iut: rpt?'61102':null, desc:`${it.desc} — ${NEW.month}` },
            { cr:+NEW.amount, bu:NEW.bu, acct:it.liabGL, iut: rpt?'61102':null, desc:'Provision for expenses' }
          ], `Category: ${rpt?'Related Party':'Provisional'} · Mode: ${it.reversal?'Reversal':'Standing'} · Source: NONPO_PORTAL`)}
          <div class="note note-blue mt-30">Only the third segment differs between the legs — ${esc(it.expGL)} expense against ${esc(it.liabGL)} liability. Every other segment is identical, which is the pattern the journal builder implements.</div>
        </div>
        <div class="np-panel"><div class="np-panel-head"><p class="np-eyebrow">Approval routing — DOA</p></div>
          ${dl([
            ['Maker','Prem Sharma · GPA SPOC'],
            ['Checker', `Shilpi Goyal · GPA Lead <span class="fs-12 color-grey">(resolved from HRMS on value ${inr(NEW.amount)})</span>`],
            ['Segregation of duties','Self-approval blocked — maker and checker must differ'],
            ['Posting','GPA Manager posts the journal in Oracle once approved']
          ])}</div>
      </div>
      <div>
        <div class="np-panel"><p class="np-eyebrow mb-20">URN to be generated</p>
          ${urn(`${NEW.bu}-${NEW.vendor}-${NEW.item.replace('-','')}-${NEW.month}`, true)}
          ${urnKey(`${NEW.bu}-${NEW.vendor}-${NEW.item.replace('-','')}-${NEW.month}`)}
          <p class="fs-13 color-grey mt-25 line-height-20">Stamped on the Oracle journal in a descriptive flexfield, so the ledger entry can be traced back to this provision and forward to the invoice that settles it.</p>
        </div>
        ${it.reversal ? `<div class="note note-amber">Reversal mode — Oracle flips this entry on day one of ${esc(MON[(MON.indexOf(NEW.month.slice(0,3))+1)%12])}. The portal keeps the URN open until an invoice arrives, so the ledger and the portal will legitimately disagree on open balance.</div>`
          : `<div class="note note-green">Standing provision — the liability remains on the books until an actualization knock-off journal clears it.</div>`}
      </div></div>
      <div class="mt-50 text-right"><a href="#" onclick="NEW.step=1;render();return false" class="mr-40">Back</a>
        <button class="btn btn-lg" onclick="submitProvision()">Submit for approval</button></div>`;
  }

  return iPage('/i/new', `${crumb([['Provision overview','/i/dashboard'],['Create provision']])}
    <h4 class="mb-10">Create provision</h4>
    <p class="color-grey mb-40">Single entry against the Non-PO input template. Fields are colour-coded by how they are populated.</p>
    ${hsteps(steps, NEW.step)}${body}`);
}
function setNew(k, v) { NEW[k] = v; render(); }
function overrideDupe() {
  modal('Request duplicate override', `
    <p class="color-grey mb-30">An exact duplicate is blocked. An override routes to the GPA lead and is written to the audit trail against both provisions.</p>
    <div class="f f-manual"><label class="field-title">Reason for override</label>
      <input type="text" placeholder="e.g. genuine second provision — different site under the same item code"></div>
    <div class="note note-amber mt-20">If two provisions genuinely belong apart and collide on this key, the item master is not granular enough. That is a master data fix, not an override.</div>
    <div class="mt-40 text-right"><a href="#" onclick="closeModal();return false" class="mr-30">Cancel</a>
      <button class="btn btn-sm" onclick="closeModal();toast('Override request sent to Shilpi Goyal — GPA Lead.',true)">Send request</button></div>`);
}
function submitProvision() {
  const it = M_.item[NEW.item];
  const id = 'P-' + String(9000 + S.provisions.length).slice(-4);
  S.provisions.unshift({
    id, urn:`${NEW.bu}-${NEW.vendor}-${NEW.item.replace('-','')}-${NEW.month}`, bu:NEW.bu,
    vendor:NEW.vendor, item:NEW.item, month:NEW.month, amount:+NEW.amount, consumed:0,
    status:'PENDING', reversal:it.reversal, rpt:(M_.ven[NEW.vendor]||{}).rpt, scenario:'STD',
    periodFrom:NEW.from, periodTo:NEW.to, dept:'Network Operations', manager:'Vipin Aggarwal',
    basis:NEW.basis, source:'Non-PO Portal', createdBy:'Prem Sharma', createdOn:'07 Sep 2026',
    postedOn:null, jv:null, age:0, hold:false, locator:null, isNew:true
  });
  NEW.step = 0;
  toast('Provision submitted. URN reserved and routed to Shilpi Goyal for approval.', true);
  go('/i/approvals');
}

/* ======================================================================== */
/* 3. Bulk provision upload                                                  */
/* ======================================================================== */
function scBulk() {
  const ok = BULK_ROWS.filter(r => r.ok).length;
  const rows = BULK_ROWS.map(r => ({
    r:r.r, st:r.ok ? '<span class="pill pill-closed">Accepted</span>' : '<span class="pill pill-rejected">Rejected</span>',
    bu:esc(r.bu), ven:esc(vName(r.vendor)), it:esc(r.item), mo:esc(r.month),
    amt:`<span class="num">${inr(r.amount)}</span>`,
    msg:`<span class="${r.ok?'color-grey':'color-red'}">${esc(r.msg)}</span>`
  }));
  return iPage('/i/bulk', `${crumb([['Provision overview','/i/dashboard'],['Bulk upload']])}
    <h4 class="mb-10">Bulk provision upload</h4>
    <p class="color-grey mb-40">Rows are accepted individually. A failure on one line does not reject the file — partial acceptance is the default.</p>
    <div class="np-grid g2 mb-40">
      <div class="download-document" style="padding:36px 30px">
        ${icon('download','fs-40 pull-left mr-20 color-grey')}
        <div class="pull-left file-name"><p class="fs-16">Download provision template</p>
          <p class="fs-12 color-grey mt-5">Includes masters, validation rules and standard headers</p></div>
        <div class="pull-right mt-10"><a href="#" class="fs-14" onclick="toast('Mockup — template download not wired.');return false">DOWNLOAD</a></div>
      </div>
      <div class="upload-document uploaded" style="padding:36px 30px">
        <div class="pull-left file-name"><p class="fs-16">provisions_aug26_infra.xlsx</p>
          <p class="fs-12 color-grey mt-5">8 rows · uploaded 07 Sep 2026 10:22 · validated</p></div>
        <div class="pull-right mt-10"><a href="#" class="fs-14" onclick="toast('Mockup — re-upload not wired.');return false">REPLACE</a></div>
      </div></div>
    ${kpis([
      { n:BULK_ROWS.length, l:'Rows in file' },
      { n:ok, l:'Accepted', s:'Queued for approval' },
      { n:BULK_ROWS.length - ok, l:'Rejected', s:'Correct and re-upload' },
      { n:inrShort(BULK_ROWS.filter(r=>r.ok).reduce((a,r)=>a+r.amount,0)), l:'Value accepted' }
    ])}
    ${table([{h:'Row',k:'r'},{h:'Result',k:'st'},{h:'BU',k:'bu'},{h:'Vendor',k:'ven'},{h:'Item',k:'it'},
      {h:'Month',k:'mo'},{h:'Amount',k:'amt',cls:'tr'},{h:'Message',k:'msg',cls:'wrap'}], rows, { tight:true })}
    <div class="mt-50 text-right"><a href="#" class="mr-40" onclick="toast('Mockup — error file download not wired.');return false">Download rejected rows</a>
      <button class="btn btn-lg" onclick="go('/i/approvals')">Send ${ok} accepted rows for approval</button></div>`);
}

/* ======================================================================== */
/* 4. Approval inbox                                                         */
/* ======================================================================== */
function scApprovals() {
  const q = pendingProv();
  const rows = q.map(p => ({
    __href:'/i/provision/' + p.id,
    urn:urn(p.urn), ven:esc(vName(p.vendor)), it:esc(p.item),
    amt:`<span class="num">${inr(p.amount)}</span>`,
    basis:`<span class="fs-13 color-grey">${esc(p.basis)}</span>`,
    maker:esc(p.createdBy), age:`${p.age} d`,
    act:`<a href="#" onclick="event.stopPropagation();approve('${p.id}');return false" class="link-red">Approve</a>
         &nbsp;·&nbsp; <a href="#" onclick="event.stopPropagation();rejectProv('${p.id}');return false" class="color-grey">Return</a>`
  }));
  return iPage('/i/approvals', `<h4 class="mb-10">Approval inbox</h4>
    <p class="color-grey mb-40">Maker-checker queue resolved through the HRMS DOA hierarchy. Self-approval is blocked.</p>
    ${kpis([
      { n:q.length, l:'Awaiting your approval' },
      { n:inrShort(q.reduce((a,p)=>a+p.amount,0)), l:'Value in queue' },
      { n:q.filter(p=>p.age>5).length, l:'Beyond SLA', s:'5 working days' },
      { n:'Shilpi Goyal', l:'Approving as', s:'GPA Lead · delegate not set' }
    ])}
    ${table([{h:'URN',k:'urn'},{h:'Vendor',k:'ven'},{h:'Item',k:'it'},{h:'Amount',k:'amt',cls:'tr'},
      {h:'Provision basis',k:'basis',cls:'wrap'},{h:'Maker',k:'maker'},{h:'Waiting',k:'age'},{h:'Action',k:'act',cls:'fixed-last-col'}],
      rows, { empty:'Nothing awaiting approval.' })}`);
}
function approve(id) {
  const p = S.provisions.find(x => x.id === id);
  p.status = 'OPEN'; p.postedOn = '07 Sep 2026'; p.jv = 'JV-2026-09-' + (94000 + S.provisions.length);
  toast(`${p.urn} approved and queued for Oracle posting.`, true); render();
}
function rejectProv(id) {
  const p = S.provisions.find(x => x.id === id);
  modal('Return to maker', `<p class="color-grey mb-30">Returning ${esc(p.urn)} to ${esc(p.createdBy)}. The reason is recorded on the audit trail and notified by email.</p>
    <div class="f f-manual"><label class="field-title">Reason</label><input type="text" placeholder="What needs correcting"></div>
    <div class="mt-40 text-right"><a href="#" onclick="closeModal();return false" class="mr-30">Cancel</a>
      <button class="btn btn-sm" onclick="closeModal();toast('Returned to ${esc(p.createdBy)}.')">Return</button></div>`);
}

/* ======================================================================== */
/* 5. Provision detail                                                       */
/* ======================================================================== */
function scProvision(id) {
  const p = S.provisions.find(x => x.id === id);
  if (!p) return iPage('/i/dashboard', '<h4>Provision not found.</h4>');
  const it = M_.item[p.item], v = M_.ven[p.vendor];
  const matched = S.invoices.filter(i => i.urn === p.urn);

  const tl = [
    { k:'ok', when:p.createdOn, what:'Provision raised', who:`${p.createdBy} · ${p.source}` },
    { k:'ok', when:p.createdOn, what:'Validation passed — master data, duplicate, RPT, GL period', who:'Validation engine' },
    p.status !== 'PENDING' ? { k:'ok', when:p.createdOn, what:'Approved under DOA', who:'Shilpi Goyal · GPA Lead' } : null,
    p.jv ? { k:'ok', when:p.postedOn, what:`Journal ${p.jv} posted to Oracle GL`, who:'GPA Manager' } : null,
    p.status === 'FAILED' ? { k:'bad', when:'31 Aug 2026', what:'Oracle journal import rejected', who:p.failure } : null,
    p.reversal && p.jv ? { k:'ok', when:'01 ' + nextMonthLabel(p.month) + ' (next period)',
      what:'Oracle auto-reversed the entry', who:'Posted in reversal mode' } : null,
    ...matched.map(i => ({ k:'ok', when:i.matchedOn || i.bookedOn, what:`Invoice ${i.invNo} matched — ${inr(i.amount)}`, who:`${i.ref} · booked at BU ${i.bookedBU}` })),
    p.status === 'REVERSED' ? { k:'bad', when:p.reversedOn, what:'Auto reversal posted', who:p.reversedWhy } : null,
    p.status === 'HOLD' ? { k:'now', when:'12 Feb 2026', what:'Placed on hold', who:p.holdReason } : null,
    ['OPEN','PARTIAL'].includes(p.status) ? { k:'now', when:'Now', what:`${pill(p.status)} — ${inr(remaining(p))} still expected`, who:`${p.age} days old` } : null
  ].filter(Boolean);

  return iPage('/i/dashboard', `${crumb([['Provision overview','/i/dashboard'],[p.urn]])}
    <div class="np-grid g-2-1">
      <div>
        <h4 class="mb-15">${urn(p.urn, true)}</h4>
        <p class="mb-40">${pill(p.status)} ${p.rpt?'<span class="pill pill-rpt">Related party</span>':''}
          ${p.reversal?'<span class="pill pill-reversed">Reversal mode</span>':'<span class="pill">Standing</span>'}
          ${p.hold?'<span class="pill pill-hold">Hold</span>':''}</p>
        ${urnKey(p.urn)}
        <div class="np-panel mt-40"><div class="np-panel-head"><p class="np-eyebrow">Provision</p></div>
          ${dl([
            ['Business unit', `${esc(p.bu)} — ${esc(bName(p.bu))}`],
            ['Legal entity', esc((M_.bu[p.bu]||{}).entity)],
            ['Vendor', `${esc(v.name)} · ${esc(p.vendor)} · ${esc(v.group)}`],
            ['Item', `${esc(p.item)} — ${esc(it.desc)}`],
            ['GL mapping', `Expense ${esc(it.expGL)} / Liability ${esc(it.liabGL)}`],
            ['Activity period', `${esc(p.periodFrom)} to ${esc(p.periodTo)}`],
            ['Provision basis', esc(p.basis)],
            ['Source', esc(p.source)],
            ['Department / manager', `${esc(p.dept)} · ${esc(p.manager)}`],
            ['Scenario', esc((M.scenarios.find(s=>s.id===p.scenario)||{}).name)]
          ])}</div>
        ${p.jv ? `<div class="np-panel"><div class="np-panel-head"><p class="np-eyebrow">Journal ${esc(p.jv)}</p></div>
          ${jv([{ dr:p.amount, bu:p.bu, acct:it.expGL, iut:p.rpt?'61102':null, desc:`${it.desc} — ${p.month}` },
                { cr:p.amount, bu:p.bu, acct:it.liabGL, iut:p.rpt?'61102':null, desc:'Provision for expenses' }],
              `Category: ${p.rpt?'Related Party':'Provisional'} · Mode: ${p.reversal?'Reversal':'Standing'} · URN on ATTRIBUTE1`)}
          </div>` : ''}
        ${p.status === 'FAILED' ? `<div class="np-panel"><div class="np-panel-head"><p class="np-eyebrow">Oracle rejection</p></div>
          <div class="note note-red">${esc(p.failure)}</div>
          <div class="mt-30"><button class="btn btn-sm btn-ghost" onclick="go('/i/posting')">Open posting queue</button></div></div>` : ''}
        ${matched.length ? `<div class="np-panel np-panel-flush"><div class="np-panel-head"><p class="np-eyebrow">Actualization</p></div>
          <div class="np-panel-body">${table([{h:'Invoice',k:'a'},{h:'Reference',k:'b'},{h:'Service period',k:'c'},
            {h:'Booked BU',k:'d'},{h:'Amount',k:'e',cls:'tr'},{h:'Outcome',k:'f'}],
            matched.map(i => ({ a:esc(i.invNo), b:esc(i.ref), c:`${esc(i.serviceFrom)} – ${esc(i.serviceTo)}`,
              d:esc(i.bookedBU), e:`<span class="num">${inr(i.amount)}</span>`,
              f:i.amount >= p.amount ? '<span class="pill pill-closed">Full</span>' : '<span class="pill pill-partial">Partial</span>' })),
            { tight:true })}</div></div>` : ''}
      </div>
      <div>
        <div class="np-panel">
          <p class="np-eyebrow mb-20">Balance</p>
          <p class="fs-30 mb-5 num">${inr(p.amount)}</p><p class="np-eyebrow mb-25">Provisioned</p>
          <div class="bar b-green"><i style="width:${Math.min(100,(p.consumed/p.amount)*100)}%"></i></div>
          <div class="mt-25">${dl([
            ['Actualized', `<span class="num">${inr(p.consumed||0)}</span>`],
            ['Remaining', `<span class="num">${inr(remaining(p))}</span>`],
            ['Age', `${p.age} days`],
            ['Auto reversal', `${M.config.autoReverseMonths} months — ${p.age > 395 ? '<span class="color-red">breached</span>' : `${Math.max(0, 395 - p.age)} days away`}`]
          ])}</div>
          <div class="mt-30">
            ${['OPEN','PARTIAL'].includes(p.status) ? `
              <button class="btn btn-sm width-100 mb-15" onclick="go('/i/match')">Find matching invoice</button>
              <button class="btn btn-sm btn-ghost width-100 mb-15" onclick="holdProv('${p.id}')">${p.hold?'Release hold':'Place on hold'}</button>
              <button class="btn btn-sm btn-ghost width-100" onclick="forceClose('${p.id}')">Force closure</button>` : ''}
          </div>
        </div>
        <div class="np-panel"><p class="np-eyebrow mb-25">Audit trail</p>${timeline(tl)}</div>
        ${p.reversal ? `<div class="note note-amber">Ledger and portal disagree by design. Oracle relieved this liability at period start; the portal keeps the URN open because no invoice has arrived. Reports must say which figure they are quoting.</div>` : ''}
      </div></div>`);
}
function holdProv(id) {
  const p = S.provisions.find(x => x.id === id);
  p.hold = !p.hold; p.status = p.hold ? 'HOLD' : 'OPEN';
  toast(p.hold ? 'Provision placed on hold — auto reversal suspended.' : 'Hold released.', !p.hold); render();
}
function forceClose(id) {
  const p = S.provisions.find(x => x.id === id);
  modal('Force closure', `
    <p class="color-grey mb-30">Force closure takes the cost back out of the profit and loss. It posts the same entry the thirteen-month reversal would, made deliberately and earlier — so it needs CFR approval.</p>
    ${jv([{ dr:remaining(p), bu:p.bu, acct:M_.item[p.item].liabGL, desc:'Provision for expenses — reversal' },
          { cr:remaining(p), bu:p.bu, acct:M_.item[p.item].expGL, desc:`${M_.item[p.item].desc} — write back` }])}
    <div class="f f-manual mt-30"><label class="field-title">Reason for force closure</label>
      <input type="text" placeholder="e.g. service was never rendered — contract cancelled"></div>
    <div class="note note-amber mt-20">A rising force-closure rate is an estimating problem upstream, not a matching problem. It belongs on the dashboard, not in an audit report.</div>
    <div class="mt-40 text-right"><a href="#" onclick="closeModal();return false" class="mr-30">Cancel</a>
      <button class="btn btn-sm" onclick="closeModal();doForceClose('${id}')">Send for CFR approval</button></div>`);
}
function doForceClose(id) {
  const p = S.provisions.find(x => x.id === id);
  p.status = 'REVERSED'; p.reversedOn = '07 Sep 2026'; p.reversedWhy = 'Force closure — CFR approved';
  toast('Force closure sent to CFR and applied in the mockup.', true); render();
}

/* ======================================================================== */
/* 6. Oracle posting queue                                                   */
/* ======================================================================== */
function scPosting() {
  const q = S.provisions.filter(p => p.jv || p.status === 'FAILED');
  const rows = q.map(p => ({
    __href:'/i/provision/' + p.id,
    jv:p.jv ? esc(p.jv) : '<span class="color-grey">— not created —</span>',
    urn:urn(p.urn), grp:'NONPO_' + p.month,
    st:p.status === 'FAILED' ? '<span class="pill pill-failed">Import rejected</span>' : '<span class="pill pill-posted">Posted</span>',
    amt:`<span class="num">${inr(p.amount)}</span>`,
    cat:p.rpt ? 'Related Party' : 'Provisional',
    mode:p.reversal ? 'Reversal' : 'Standing',
    when:esc(p.postedOn || '—'),
    act:p.status === 'FAILED' ? `<a href="#" class="link-red" onclick="event.stopPropagation();retryPost('${p.id}');return false">Retry</a>` : ''
  }));
  return iPage('/i/posting', `<h4 class="mb-10">Oracle posting queue</h4>
    <p class="color-grey mb-40">The platform writes to staging tables in a schema we own. A package there validates, inserts into GL_INTERFACE, writes the control row and submits Journal Import.</p>
    ${kpis([
      { n:q.filter(p=>p.jv).length, l:'Posted this period' },
      { n:failedProv().length, l:'Import rejected', s:'Needs correction and retry' },
      { n:'GL_INTERFACE', l:'Target', s:'via XXNONPO staging' },
      { n:'ATTRIBUTE1', l:'URN flexfield', s:'Q41 — column to be confirmed' }
    ])}
    <div class="np-grid g-2-1">
      <div>${table([{h:'Journal',k:'jv'},{h:'URN',k:'urn'},{h:'Group ID',k:'grp'},{h:'Status',k:'st'},
        {h:'Amount',k:'amt',cls:'tr'},{h:'Category',k:'cat'},{h:'Mode',k:'mode'},{h:'Posted',k:'when'},{h:'',k:'act',cls:'fixed-last-col'}],
        rows, { tight:true })}</div>
      <div><div class="np-panel"><p class="np-eyebrow mb-20">Interface handshake</p>
        ${timeline([
          { k:'ok', when:'Step 1', what:'Portal writes to XXNONPO staging', who:'Rows tagged with GROUP_ID' },
          { k:'ok', when:'Step 2', what:'Package validates and inserts into GL_INTERFACE', who:'Flexfield, period and balance checks' },
          { k:'ok', when:'Step 3', what:'Control row written', who:'The classic thing to forget — Journal Import reads it to decide what to pick up' },
          { k:'ok', when:'Step 4', what:'Concurrent request submitted', who:'Needs an EBS user, responsibility and application id' },
          { k:'now', when:'Step 5', what:'Poller reads back status', who:'Q61 — day end or month end is still open' }
        ])}</div>
        <div class="note note-amber">Masters travel the other way through the same layer. Item codes and the BU hierarchy live in the ERP, so the platform reads and caches rather than owning them.</div>
      </div></div>`);
}
function retryPost(id) {
  const p = S.provisions.find(x => x.id === id);
  modal('Correct and retry', `
    <p class="color-grey mb-25">${esc(p.failure)}</p>
    <div class="f f-manual"><label class="field-title">IUT segment (segment 6)</label>
      <input type="text" value="61102" placeholder="Inter-unit code"></div>
    <div class="note note-blue mt-20">Related Party entries carry the IUT code on both legs. A mapping table from business unit to IUT code is needed rather than user entry — Clarification Q31.</div>
    <div class="mt-40 text-right"><a href="#" onclick="closeModal();return false" class="mr-30">Cancel</a>
      <button class="btn btn-sm" onclick="closeModal();doRetry('${id}')">Resubmit to Journal Import</button></div>`);
}
function doRetry(id) {
  const p = S.provisions.find(x => x.id === id);
  p.status = 'OPEN'; p.jv = 'JV-2026-09-94120'; p.postedOn = '07 Sep 2026';
  toast('Journal accepted by Oracle on retry.', true); render();
}

/* ======================================================================== */
/* 7. Actualization dashboard                                                */
/* ======================================================================== */
function scActualization() {
  const I = S.invoices;
  const matched = I.filter(i => ['MATCHED','MULTI'].includes(i.status));
  const rows = I.filter(i => i.bookedOn).map(i => ({
    __href: ['UNMATCHED','RFI'].includes(i.status) ? '/i/match/' + i.ref : null,
    ref:esc(i.ref), inv:`${esc(i.invNo)}<br><span class="fs-12 color-grey">${esc(vName(i.vendor))}</span>`,
    sp:i.serviceFrom ? `${esc(i.serviceFrom)}<br><span class="fs-12 color-grey">to ${esc(i.serviceTo)}</span>`
       : '<span class="color-red fs-13">Not supplied — FIFO</span>',
    bu:esc(i.bookedBU) + (parentBU(i.bookedBU) !== i.bookedBU ? `<br><span class="fs-12 color-grey">rolls to ${esc(parentBU(i.bookedBU))}</span>` : ''),
    amt:`<span class="num">${inr(i.amount)}</span>`,
    urn:i.urn ? urn(i.urn) : '<span class="color-grey">— derive —</span>',
    st:pill(i.status),
    act:['UNMATCHED','RFI'].includes(i.status) ? '<a href="#/i/match/'+i.ref+'" class="link-red">Match</a>' : ''
  }));
  return iPage('/i/actualization', `<h4 class="mb-10">Actualization</h4>
    <p class="color-grey mb-40">Invoices booked in AP or PM, and the provisions they settle. Service period decides the month — never the invoice date.</p>
    ${kpis([
      { n:matched.length, l:'Matched', s:'Auto and force' },
      { n:toMatch().length, l:'Awaiting match', go:'/i/match', s:'Working queue' },
      { n:I.filter(i=>i.status==='MULTI').length, l:'Multi-URN matches', s:'One invoice, several provisions' },
      { n:'62%', l:'Exact match rate', s:'Q57 — target still to be set' },
      { n:'18%', l:'Force match rate', s:'The true size of the problem' }
    ])}
    ${table([{h:'Reference',k:'ref'},{h:'Invoice',k:'inv'},{h:'Service period',k:'sp'},{h:'Booked BU',k:'bu'},
      {h:'Amount',k:'amt',cls:'tr'},{h:'URN',k:'urn'},{h:'Status',k:'st'},{h:'',k:'act',cls:'fixed-last-col'}], rows)}
    <div class="note note-blue mt-40">A rising force-match rate says the fingerprint needs fixing at source — usually item codes that differ between the provision and invoice sides, or service periods straddling the provision month.</div>`);
}

/* ======================================================================== */
/* 8. Match worklist — nearest match and force match                         */
/* ======================================================================== */
const MATCH = { relax:{ month:false, bu:false, item:false }, sel:null };

function candidates(inv) {
  const tBU = parentBU(inv.bookedBU), tMonth = monthKey(inv.serviceFrom);
  const allowed = CAT_ITEM[inv.category] || [];
  return openProv()
    .filter(p => p.vendor === inv.vendor)                                  // partition — never relaxed
    .filter(p => !allowed.length || allowed.includes(p.item) || MATCH.relax.item)
    .map(p => {
      const bits = { bu: parentBU(p.bu) === tBU, vendor: true,
                     item: !allowed.length || allowed.includes(p.item),
                     month: p.month === tMonth };
      const gap = Math.abs(remaining(p) - inv.amount) / Math.max(remaining(p), inv.amount, 1);
      let score = (bits.bu?20:0) + 30 + (bits.item?25:0) + (bits.month?25:0);
      score = Math.max(0, Math.round(score - gap * 12));
      return { p, bits, score, exact: bits.bu && bits.item && bits.month };
    })
    .filter(c => (c.bits.month || MATCH.relax.month) && (c.bits.bu || MATCH.relax.bu))
    .sort((a, b) => b.score - a.score);
}

function scMatchList() {
  const q = toMatch();
  const rows = q.map(i => ({
    __href:'/i/match/' + i.ref,
    ref:esc(i.ref), inv:esc(i.invNo), ven:esc(vName(i.vendor)),
    cat:esc((M_.cat[i.category]||{}).name),
    sp:i.serviceFrom ? `${esc(i.serviceFrom)} – ${esc(i.serviceTo)}` : '<span class="color-red">Not supplied</span>',
    bu:esc(i.bookedBU), amt:`<span class="num">${inr(i.amount)}</span>`,
    cand:(() => { const c = candidates(i); return c.length
      ? `${c.length} candidate${c.length>1?'s':''} <span class="fs-12 color-grey">best ${c[0].score}%</span>`
      : '<span class="color-red">None</span>'; })(),
    st:pill(i.status)
  }));
  return iPage('/i/match', `<h4 class="mb-10">Match worklist</h4>
    <p class="color-grey mb-40">Invoices whose provision could not be identified automatically. Matching relaxes the fingerprint, ranks what it finds, and puts the choice to a person.</p>
    ${kpis([
      { n:q.length, l:'In the queue' },
      { n:inrShort(q.reduce((a,i)=>a+i.amount,0)), l:'Value awaiting match' },
      { n:q.filter(i=>!i.serviceFrom).length, l:'No service period', s:'FIFO fallback applies' },
      { n:q.filter(i=>i.rush).length, l:'Rush', s:'Same day / T+1 SLA' }
    ])}
    ${table([{h:'Reference',k:'ref'},{h:'Invoice',k:'inv'},{h:'Vendor',k:'ven'},{h:'Category',k:'cat'},
      {h:'Service period',k:'sp'},{h:'Booked BU',k:'bu'},{h:'Amount',k:'amt',cls:'tr'},
      {h:'Candidates',k:'cand'},{h:'Status',k:'st'}], rows, { empty:'The queue is clear.' })}`);
}

function scMatch(ref) {
  const inv = S.invoices.find(i => i.ref === ref);
  if (!inv) return scMatchList();
  const tBU = parentBU(inv.bookedBU), tMonth = monthKey(inv.serviceFrom);
  const cands = candidates(inv);
  const sel = cands.find(c => c.p.id === MATCH.sel) || cands[0];

  const fp = `<div class="matchbits">
    <span class="bit ${'bit-hit'}">BU ${esc(tBU)}${parentBU(inv.bookedBU)!==inv.bookedBU?` ← ${esc(inv.bookedBU)}`:''}</span>
    <span class="bit bit-hit">Vendor ${esc(inv.vendor)}</span>
    <span class="bit ${(CAT_ITEM[inv.category]||[]).length?'bit-hit':'bit-relax'}">Category ${esc((M_.cat[inv.category]||{}).name)}</span>
    <span class="bit ${tMonth?'bit-hit':'bit-miss'}">${tMonth ? 'Month ' + esc(tMonth) : 'No service period'}</span></div>`;

  const outcome = sel ? (
    inv.amount === remaining(sel.p) ? { k:'Exact', c:'closed', t:'Auto actualization — the URN closes.' } :
    inv.amount <  remaining(sel.p) ? { k:'Partial', c:'partial', t:`Provision consumed by ${inr(inv.amount)}. ${inr(remaining(sel.p)-inv.amount)} stays open.` } :
                                     { k:'Excess', c:'rejected', t:`Invoice exceeds the provision by ${inr(inv.amount-remaining(sel.p))}. Routes to finance review or prepaid.` }
  ) : null;

  return iPage('/i/match', `${crumb([['Match worklist','/i/match'],[inv.ref]])}
    <div class="split"><div>
      <h4 class="mb-15">${esc(inv.invNo)} <span class="fs-16 color-grey">· ${esc(vName(inv.vendor))}</span></h4>
      <p class="mb-40">${pill(inv.status)} ${inv.rush?'<span class="pill pill-rush">Rush</span>':''}
        <span class="fs-14 color-grey ml-15">${esc(inv.ref)}</span></p>

      <div class="np-panel"><div class="np-panel-head"><p class="np-eyebrow">Fingerprint rebuilt from the invoice</p></div>
        ${fp}
        <p class="fs-13 color-grey mt-25 line-height-20">The booking BU is rolled up to its parent before matching, and the month comes from the service period rather than the invoice date. Skip either adjustment and nothing ever matches.</p>
        ${!inv.serviceFrom ? `<div class="note note-red mt-25">No activity period on this invoice, so no month can be derived and no URN can be formed. The BRD falls back to FIFO — oldest open provision first. Q19 leaves the scope of “oldest” undefined.</div>` : ''}
      </div>

      <div class="np-panel"><div class="np-panel-head" style="display:flex;justify-content:space-between;align-items:center">
        <p class="np-eyebrow">Relax the fingerprint</p>
        <span class="fs-12 color-grey">Vendor and category are never relaxed</span></div>
        <div style="display:flex;gap:36px;flex-wrap:wrap">
          ${['month','bu','item'].map(k => `<label class="checkcontainer" style="padding-left:30px">
            <input type="checkbox" ${MATCH.relax[k]?'checked':''} onchange="MATCH.relax['${k}']=this.checked;render()">
            <span class="checkmark"></span>
            ${{month:'Adjacent months',bu:'Other business units',item:'Other items in this category'}[k]}</label>`).join('')}
        </div>
        <div class="note note-amber mt-25">Order of relaxation decides what the system proposes. Relaxing the month finds an adjacent period; relaxing the item finds a different cost entirely. Q55 — still to be defined.</div>
      </div>

      <p class="np-eyebrow mb-20 mt-50">Candidates — ${cands.length}</p>
      ${cands.length ? cands.map(c => `<div class="cand ${sel && sel.p.id===c.p.id?'sel':''}" onclick="MATCH.sel='${c.p.id}';render()">
        <div class="cand-top"><div>
          ${urn(c.p.urn)}
          <p class="fs-13 color-grey mt-8">${esc(iName(c.p.item))} · ${esc(c.p.periodFrom)} to ${esc(c.p.periodTo)} · raised ${esc(c.p.createdOn)}</p>
          <div class="matchbits">
            <span class="bit ${c.bits.bu?'bit-hit':'bit-relax'}">BU ${esc(c.p.bu)}</span>
            <span class="bit bit-hit">Vendor</span>
            <span class="bit ${c.bits.item?'bit-hit':'bit-relax'}">Item ${esc(c.p.item)}</span>
            <span class="bit ${c.bits.month?'bit-hit':'bit-relax'}">${esc(c.p.month)}</span>
            ${c.exact?'<span class="bit bit-hit">Exact</span>':'<span class="bit bit-relax">Nearest</span>'}
          </div>
        </div><div class="score">${c.score}%<small>${c.exact?'exact':'nearest'}</small>
          <p class="fs-16 mt-15 num">${inr(remaining(c.p))}</p>
          <small>open balance</small></div></div>
        <div class="bar ${c.score>90?'b-green':'b-amber'}"><i style="width:${c.score}%"></i></div>
      </div>`).join('') : `<div class="np-panel"><p class="color-grey">No open provision for this vendor within the category partition. The cost is unprovisioned — it books straight to expense and shows on the missing-provision report.</p></div>`}

      ${sel ? `<div class="mt-40 text-right">
        <a href="#" class="mr-40 color-grey" onclick="toast('Returned to the vendor for information.');return false">Raise RFI</a>
        <button class="btn btn-lg ${sel.exact?'':'btn-ghost'}" onclick="doMatch('${inv.ref}','${sel.p.id}')">
          ${sel.exact ? 'Actualize' : 'Force match'}</button></div>` : ''}
    </div>
    <div class="split-r">
      <p class="np-eyebrow mb-20">Invoice</p>
      ${dl([
        ['Invoice number', esc(inv.invNo)],
        ['Invoice date', esc(inv.invDate)],
        ['Service period', inv.serviceFrom ? `${esc(inv.serviceFrom)} – ${esc(inv.serviceTo)}` : '<span class="color-red">Not supplied</span>'],
        ['Booked at BU', esc(inv.bookedBU)],
        ['Parent BU', esc(tBU)],
        ['Base amount', `<span class="num">${inr(inv.amount)}</span>`],
        ['GST', `<span class="num">${inr(inv.gst)}</span>`],
        ['ERP document', esc(inv.erpDoc || '—')],
        ['Category', esc((M_.cat[inv.category]||{}).name)]
      ])}
      ${inv.note ? `<div class="note mt-30">${esc(inv.note)}</div>` : ''}
      ${outcome ? `<hr class="hr"><p class="np-eyebrow mb-15">Outcome if confirmed</p>
        <p class="mb-15"><span class="pill pill-${outcome.c}">${esc(outcome.k)} match</span></p>
        <p class="fs-14 color-grey line-height-22">${esc(outcome.t)}</p>
        <hr class="hr"><p class="np-eyebrow mb-15">Journal</p>
        ${sel.p.reversal
          ? `<div class="note note-amber">Nothing posts. This is a reversing provision — Oracle relieved the liability at period start, so a knock-off would relieve it twice. Actualization is a portal event only.</div>`
          : jv([{ dr:Math.min(inv.amount, remaining(sel.p)), bu:sel.p.bu, acct:M_.item[sel.p.item].liabGL, desc:'Provision knock-off' },
                { cr:Math.min(inv.amount, remaining(sel.p)), bu:sel.p.bu, acct:M_.item[sel.p.item].expGL, desc:'Expense relieved' }])}`
        : ''}
      <hr class="hr">
      <p class="np-eyebrow mb-15">Force match is not force closure</p>
      <p class="fs-13 color-grey line-height-20">The invoice is real and so is the cost — what a person decides here is which provision it settles. The total is unchanged, only the attribution. It needs a full audit record, not an approval.</p>
    </div></div>`);
}

function doMatch(ref, pid) {
  const inv = S.invoices.find(i => i.ref === ref), p = S.provisions.find(x => x.id === pid);
  const take = Math.min(inv.amount, remaining(p));
  p.consumed = (p.consumed || 0) + take;
  p.status = remaining(p) <= 0 ? 'CLOSED' : 'PARTIAL';
  inv.urn = p.urn; inv.status = 'MATCHED'; inv.matchedOn = '07 Sep 2026';
  MATCH.sel = null;
  toast(`${inv.invNo} matched to ${p.urn}. ${remaining(p) > 0 ? inr(remaining(p)) + ' left open.' : 'URN closed.'}`, true);
  go('/i/actualization');
}

/* ======================================================================== */
/* 9. Prepaid, multi-period split and deferment                              */
/* ======================================================================== */
function scPrepaid() {
  const inv = S.invoices.find(i => i.ref === 'NONPO-2026-0012410');
  const months = [
    { m:'Apr 2026', amt:10000, urn:'111-598210-RENTAOR-APR26', tr:'Actualize, close' },
    { m:'May 2026', amt:10000, urn:'111-598210-RENTAOR-MAY26', tr:'Actualize, close' },
    { m:'Jun 2026', amt:10000, urn:'111-598210-RENTAOR-JUN26', tr:'Actualize, close' },
    { m:'Jul 2026', amt:10000, urn:null, tr:'Prepaid' },
    { m:'Aug 2026', amt:10000, urn:null, tr:'Prepaid' },
    { m:'Sep 2026', amt:10000, urn:null, tr:'Prepaid' }
  ];
  const unwind = [
    { d:'31 Jul 2026', amt:10000, bal:20000 }, { d:'31 Aug 2026', amt:10000, bal:10000 },
    { d:'30 Sep 2026', amt:10000, bal:0 }
  ];
  return iPage('/i/prepaid', `<h4 class="mb-10">Prepaid & deferment</h4>
    <p class="color-grey mb-40">Invoices covering months that were never provisioned. The provisioned half actualizes; the future half is an asset, not an expense.</p>
    ${kpis([
      { n:'₹30,000', l:'Provisioned months', s:'Apr / May / Jun — actualized' },
      { n:'₹30,000', l:'Future months', s:'Jul / Aug / Sep — prepaid' },
      { n:'3', l:'URNs consumed', s:'One invoice, many provisions' },
      { n:'12 mo', l:'Current / non-current line', s:'Recomputed every period' }
    ])}
    <div class="np-grid g-2-1">
      <div>
        <div class="np-panel np-panel-flush"><div class="np-panel-head">
          <p class="np-eyebrow">Step one — split the invoice by period</p>
          <p class="fs-14 color-grey mt-8">${esc(inv.invNo)} · ${esc(vName(inv.vendor))} · ${inr(inv.amount)} for 01 Apr to 30 Sep 2026</p></div>
          <div class="np-panel-body">${table([{h:'Month',k:'m'},{h:'Amount',k:'a',cls:'tr'},{h:'Provision exists',k:'u'},{h:'Treatment',k:'t'}],
            months.map(x => ({ m:esc(x.m), a:`<span class="num">${inr(x.amt)}</span>`,
              u:x.urn ? urn(x.urn) : '<span class="color-grey">None — future period</span>',
              t:x.urn ? '<span class="pill pill-closed">Actualize, close</span>' : '<span class="pill pill-partial">Prepaid</span>' })),
            { tight:true })}
            <div class="note note-blue mt-30">For rent the split is per month; for energy it is per day. Different natures, different denominators — and the divisor may vary by segment.</div>
          </div></div>

        <div class="np-panel"><div class="np-panel-head"><p class="np-eyebrow">Step two — the journal</p></div>
          ${jv([
            { dr:30000, bu:'111', acct:'4271001', desc:'Site rent — Apr / May / Jun 2026' },
            { dr:30000, bu:'111', acct:'1340010', desc:'Prepaid rent — current asset' },
            { cr:60000, bu:'111', acct:'2110001', desc:'Vendor payable — Jones Lang LaSalle' }
          ], 'Booking all ₹60,000 as July expense would overstate July and understate three months after it.')}
        </div>

        <div class="np-panel np-panel-flush"><div class="np-panel-head"><p class="np-eyebrow">Step three — the prepaid unwinds</p></div>
          <div class="np-panel-body">${table([{h:'Month end',k:'d'},{h:'Released to expense',k:'a',cls:'tr'},{h:'Prepaid balance',k:'b',cls:'tr'}],
            unwind.map(u => ({ d:esc(u.d), a:`<span class="num">${inr(u.amt)}</span>`, b:`<span class="num">${inr(u.bal)}</span>` })),
            { tight:true })}
            <div class="note note-amber mt-30">Once prepaid covers a month, the portal must not raise a fresh provision for it. July, August and September are already paid for — re-provisioning them would double-count the cost.</div>
          </div></div>

        <div class="np-panel"><div class="np-panel-head"><p class="np-eyebrow">Beyond twelve months — deferment</p></div>
          ${jv([
            { dr:375, bu:'111', acct:'1340010', desc:'Current GL — consumed within a year' },
            { dr:609, bu:'111', acct:'1540010', desc:'Non-current GL — beyond twelve months' },
            { dr:16,  bu:'111', acct:'4271001', desc:'Stub period to month end — expensed immediately' },
            { cr:1000, bu:'111', acct:'2110001', desc:'Total deferred' }
          ], 'The BRD’s worked example on a total of ₹1,000 — FCU / NCU tenure of five years.')}
          <div class="note note-red mt-30">The twelve-month boundary moves every month. Compute the split once at booking and store it, and the balance sheet drifts wrong for four and a half years. It has to be recomputed each period from the schedule.</div>
        </div>
      </div>
      <div>
        <div class="np-panel"><p class="np-eyebrow mb-25">Deferment configuration</p>
          ${table([{h:'Category',k:'c'},{h:'%',k:'p',cls:'tr'},{h:'Life',k:'l',cls:'tr'}],
            M.config.deferment.map(d => ({ c:esc(d.cat), p:d.pct?d.pct+'%':'—', l:d.life?d.life+' mo':'—' })), { tight:true })}
          <p class="fs-13 color-grey mt-20 line-height-20">Q32 — these look like policy configuration rather than constants, and new categories will be added.</p>
        </div>
        <div class="note note-amber">Q34 — does the portal or Oracle’s Prepaid module own the unwind schedule? If Oracle owns it the portal hands over once and stops tracking. If the portal owns it we build and reconcile a schedule of our own.</div>
        <div class="note note-blue mt-25">Q33 — the worked example expenses an amount “pertaining to 15 days” before the schedule begins. A fixed 15 days and a calendar stub give different numbers for anything not starting mid-month.</div>
      </div></div>`);
}

/* ======================================================================== */
/* 10. Ageing & reversal                                                     */
/* ======================================================================== */
const AGE = { b: null };
function scAgeing() {
  const P = S.provisions.filter(p => ['OPEN','PARTIAL','HOLD'].includes(p.status));
  const defs = [
    { l:'0 – 90 days',    lo:0,   hi:90,   esc:'No escalation' },
    { l:'90 – 180 days',  lo:90,  hi:180,  esc:'Business user' },
    { l:'180 – 270 days', lo:180, hi:270,  esc:'Manager' },
    { l:'270 – 365 days', lo:270, hi:365,  esc:'CFR' },
    { l:'365 – 395 days', lo:365, hi:395,  esc:'Controller / ACE' },
    { l:'Over 13 months', lo:395, hi:9999, esc:'Auto reversal', crit:true }
  ];
  const inB = d => P.filter(p => p.age >= d.lo && p.age < d.hi);
  const show = AGE.b == null ? P : inB(defs[AGE.b]);

  const rows = show.map(p => ({
    __href:'/i/provision/' + p.id,
    urn:urn(p.urn), ven:esc(vName(p.vendor)), it:esc(p.item),
    rem:`<span class="num">${inr(remaining(p))}</span>`, age:`${p.age} d`,
    bucket:esc((defs.find(d => p.age >= d.lo && p.age < d.hi)||{}).l),
    escal:esc((defs.find(d => p.age >= d.lo && p.age < d.hi)||{}).esc),
    st:pill(p.status) + (p.hold ? ' <span class="pill pill-hold">Hold</span>' : ''),
    act:p.age > 395 && !p.hold
      ? `<a href="#" class="link-red" onclick="event.stopPropagation();forceClose('${p.id}');return false">Reverse</a>`
      : `<a href="#" class="color-grey" onclick="event.stopPropagation();holdProv('${p.id}');return false">${p.hold?'Release':'Hold'}</a>`
  }));

  return iPage('/i/ageing', `<h4 class="mb-10">Ageing & reversal</h4>
    <p class="color-grey mb-40">The failure mode of the whole system is provisions raised and never cleared. Hence the ladder, and the hard stop behind it.</p>
    <div class="buckets">${defs.map((d, i) => {
      const b = inB(d);
      return `<div class="bucket ${AGE.b===i?'active':''} ${d.crit?'crit':''}" onclick="AGE.b=(AGE.b===${i}?null:${i});render()">
        <p class="b-n num">${b.length}</p><p class="np-eyebrow">${esc(d.l)}</p>
        <p class="b-amt num">${inrShort(b.reduce((a,p)=>a+remaining(p),0))}</p>
        <p class="b-esc">${esc(d.esc)}</p></div>`;
    }).join('')}</div>
    <div class="np-grid g-2-1">
      <div>${table([{h:'URN',k:'urn'},{h:'Vendor',k:'ven'},{h:'Item',k:'it'},{h:'Remaining',k:'rem',cls:'tr'},
        {h:'Age',k:'age'},{h:'Bucket',k:'bucket'},{h:'Escalates to',k:'escal'},{h:'Status',k:'st'},{h:'',k:'act',cls:'fixed-last-col'}],
        rows, { tight:true, empty:'No provisions in this bucket.' })}</div>
      <div>
        <div class="np-panel"><p class="np-eyebrow mb-20">Period rules in force</p>
          ${dl([
            ['PBR window', `${M.config.pbrMonths} months — maintained by GPA, effective dated`],
            ['Closing month', 'August 2026'],
            ['PBR catches', 'Liabilities from July 2025 or earlier'],
            ['Excluded from PBR', 'Provisions on hold, and government vendors'],
            ['YEP test', `Service period on or before ${esc(M.config.fyEnd)}`],
            ['Hit', 'Service period outside the PBR window — straight to profit and loss'],
            ['Auto reversal', `${M.config.autoReverseMonths} months, unattended unless held`],
            ['Force reversal', 'Requires CFR approval']
          ])}</div>
        <div class="note note-amber">Q15 — a hold is known to suspend auto reversal. Whether it also drops the provision out of the escalation ladder, whether it is the same flag that excludes it from PBR, and whether it expires are all still open.</div>
        <div class="note note-blue mt-25">Q25 — government vendors are excluded from PBR by policy. The attribute and its system of record still need naming: a vendor master flag, a category, or something set per provision.</div>
      </div></div>`);
}

/* ======================================================================== */
/* 11. TB / FSG real-time flash                                              */
/* ======================================================================== */
function scFlash() {
  const rows = TB.map(t => {
    const live = t.closing + t.mine + t.others;
    return { gl:esc(t.gl), n:esc(t.name),
      c:`<span class="num">${inr(t.closing)}</span>`,
      m:`<span class="num ${t.mine?'color-red':''}">${t.mine?inr(t.mine):'—'}</span>`,
      o:`<span class="num color-grey">${t.others?inr(t.others):'—'}</span>`,
      l:`<span class="num">${inr(live)}</span>`,
      d:`<span class="num fs-13 color-grey">${((t.mine+t.others)/Math.abs(t.closing)*100).toFixed(2)}%</span>` };
  });
  const mine = TB.reduce((a,t)=>a+t.mine,0), others = TB.reduce((a,t)=>a+t.others,0);
  return iPage('/i/flash', `<h4 class="mb-10">Real-time financial flash</h4>
    <p class="color-grey mb-40">The prior month's trial balance replicated daily from Oracle, with your own provisions, reversals and adjustments overlaid — so the impact is visible without waiting for the close.</p>
    ${kpis([
      { n:'31 Aug 2026', l:'Base trial balance', s:'Refreshed 07 Sep 06:00' },
      { n:inrShort(mine), l:'Your entries', s:'Provisions you raised' },
      { n:inrShort(others), l:'Others in your BU', s:'Same segment' },
      { n:'Bharti Airtel Ltd', l:'Set of books', s:'BU 111 · Haryana' }
    ])}
    <div class="np-grid g-2-1">
      <div>${table([{h:'GL',k:'gl'},{h:'Account',k:'n'},{h:'Aug close',k:'c',cls:'tr'},
        {h:'Your entries',k:'m',cls:'tr'},{h:'Others',k:'o',cls:'tr'},{h:'Live flash',k:'l',cls:'tr'},{h:'Impact',k:'d',cls:'tr'}],
        rows, { tight:true })}
        <div class="note note-blue mt-40">This removes the need to wait for month-end close to understand the running impact of manual entries on the profit and loss and the balance sheet — the requirement the BRD states as a real-time flash.</div>
      </div>
      <div><div class="np-panel"><p class="np-eyebrow mb-25">Where your entries land</p>
        <div class="np-chart">${TB.filter(t=>t.mine>0).map(t => {
          const max = Math.max(...TB.map(x=>Math.abs(x.mine)));
          return `<div class="np-col"><div class="stack"><div class="s1" style="height:${Math.abs(t.mine)/max*100}%"></div></div>
            <div class="lbl">${esc(t.gl)}</div></div>`;
        }).join('')}</div></div>
        <div class="note note-amber">Ledger and portal answer different questions. Oracle asks what is on the books right now; the portal asks what bills we are still waiting for. Both figures are correct — Q13 asks which is authoritative for reporting.</div>
      </div></div>`);
}

/* ======================================================================== */
/* 12. Scenario router                                                       */
/* ======================================================================== */
function scScenarios() {
  const std = M.scenarios.find(s => s.straight);
  const rest = M.scenarios.filter(s => !s.straight);
  const restTotal = rest.reduce((a, s) => a + s.count, 0);
  return iPage('/i/scenarios', `<h4 class="mb-10">Scenario router</h4>
    <p class="color-grey mb-40">Every input, whatever channel it arrives on, is normalised into one shape at intake. The router then decides whether any rule applies before the URN is generated.</p>
    ${kpis([
      { n:std.count, l:'Straight through', s:`${Math.round(std.count/(std.count+restTotal)*100)}% of classified inputs` },
      { n:restTotal, l:'Rule driven', s:'Twelve scenarios' },
      { n:'213', l:'Inputs inventoried', s:'GPA tracking sheet, Apr 2026' },
      { n:'194', l:'Discussed', s:'3 pending · 16 not applicable' }
    ])}
    <div class="np-grid g-2-1">
      <div>${table([{h:'Scenario',k:'n',cls:'wrap'},{h:'Inputs',k:'c',cls:'tr'},{h:'Share',k:'b'},{h:'Path',k:'p'}],
        M.scenarios.map(s => ({ n:esc(s.name), c:`<span class="num">${s.count}</span>`,
          b:`<div class="bar ${s.straight?'b-green':'b-amber'}" style="width:160px"><i style="width:${s.count/std.count*100}%"></i></div>`,
          p:s.straight ? '<span class="pill pill-closed">Straight through</span>' : '<span class="pill pill-partial">Rule engine</span>' })),
        { tight:true })}
        <div class="note note-blue mt-40">Both branches converge on the same URN and accounting engine, so the rules only ever change what the numbers are — never how a provision is identified, approved or posted. That containment is what lets rules be added one at a time after go-live.</div>
      </div>
      <div><div class="np-panel"><p class="np-eyebrow mb-20">What this means for sequencing</p>
        <p class="fs-15 color-grey line-height-24">Build the straight-through path completely — intake, validation, approval, URN, journal, Oracle — and you have a working system for the overwhelming majority of inputs. Each rule then plugs into an established router without disturbing anything already live.</p>
        <hr class="hr">
        <p class="np-eyebrow mb-15">One caveat</p>
        <p class="fs-14 color-grey line-height-22">87% is by count of input types, not by transaction volume. A single template-based input might generate tens of thousands of lines a month while a bespoke allocation generates three. Monthly line counts per scenario are still to be confirmed with finance.</p>
      </div>
      <div class="np-panel"><p class="np-eyebrow mb-20">Input providers</p>
        ${dl([['Business Finance','78 inputs'],['ACE RR','56 inputs'],['ACE GPA','33 inputs'],
              ['CFR, Product, Billing, Regulatory','46 inputs across a dozen sources'],
              ['Entities and segments','23'],['GPA specialists','14, under leads and business heads']])}
      </div></div></div>`);
}

/* ======================================================================== */
/* 13. Reports                                                               */
/* ======================================================================== */
function scReports() {
  const P = S.provisions;
  const byVendor = {};
  P.forEach(p => { byVendor[p.vendor] = byVendor[p.vendor] || { prov:0, act:0, n:0 };
    byVendor[p.vendor].prov += p.amount; byVendor[p.vendor].act += (p.consumed||0); byVendor[p.vendor].n++; });
  const rows = Object.entries(byVendor).map(([v, x]) => ({
    v:`${esc(vName(v))}<br><span class="fs-12 color-grey">${esc(v)}</span>`,
    n:x.n, p:`<span class="num">${inr(x.prov)}</span>`, a:`<span class="num">${inr(x.act)}</span>`,
    o:`<span class="num">${inr(x.prov - x.act)}</span>`,
    u:`<div class="bar b-green" style="width:120px"><i style="width:${x.prov?x.act/x.prov*100:0}%"></i></div>
       <span class="fs-12 color-grey">${x.prov?Math.round(x.act/x.prov*100):0}% utilised</span>`
  }));
  const cards = [
    ['Open provision report','Every URN still expecting an invoice, by BU, vendor and month'],
    ['Closed provision report','Fully actualized URNs with the invoices that settled them'],
    ['Provision ageing report','90 / 180 / 270 / 365 buckets with escalation history'],
    ['Provision vs actual','The sampling base for audit — filterable by segment'],
    ['Unmatched invoice list','Invoices booked with no provision found'],
    ['Force match & force closure','Both rates, and what each says about a problem elsewhere'],
    ['Missing provision report','Expected from history but not raised this month'],
    ['Exception — infra report','Invoices uploaded but not validated or approved'],
    ['Exception — leases on hold','Scheduled but held in the lease module'],
    ['Audit trail export','Every state change and who made it']
  ];
  return iPage('/i/reports', `<h4 class="mb-10">Reports</h4>
    <p class="color-grey mb-40">Operational reporting for finance, audit sampling and month-end review.</p>
    <div class="tiles mb-50">${cards.map(c => `<div class="tile" onclick="toast('Mockup — ${esc(c[0])} not generated.')">
      <h5>${esc(c[0])}</h5><p>${esc(c[1])}</p>
      <p class="tile-meta">${icon('download')} &nbsp;XLSX · CSV</p></div>`).join('')}</div>
    <h4 class="mb-25">Provision vs actual — by vendor</h4>
    ${table([{h:'Vendor',k:'v'},{h:'URNs',k:'n',cls:'tr'},{h:'Provisioned',k:'p',cls:'tr'},
      {h:'Actualized',k:'a',cls:'tr'},{h:'Open',k:'o',cls:'tr'},{h:'Utilisation',k:'u'}], rows, { tight:true })}`);
}

/* ======================================================================== */
/* 14. Masters & rules                                                       */
/* ======================================================================== */
const ADMIN = { tab:'items' };
function scAdmin() {
  const tabs = [['items','Item master'],['vendors','Vendor master'],['bus','BU hierarchy'],
                ['alloc','Allocation %'],['rules','Period rules']];
  let body = '';
  if (ADMIN.tab === 'items') body = table(
    [{h:'Item code',k:'c'},{h:'Description',k:'d',cls:'wrap'},{h:'Nature',k:'n'},{h:'Expense GL',k:'e'},
     {h:'Liability GL',k:'l'},{h:'Recurring',k:'r'},{h:'Default mode',k:'m'}],
    M.items.map(i => ({ c:esc(i.code), d:esc(i.desc), n:esc(i.nature), e:esc(i.expGL), l:esc(i.liabGL),
      r:i.recurring?'<span class="pill pill-closed">Yes</span>':'<span class="pill">No</span>',
      m:i.reversal?'<span class="pill pill-reversed">Reversal</span>':'<span class="pill">Standing</span>' })), { tight:true });
  if (ADMIN.tab === 'vendors') body = table(
    [{h:'Code',k:'c'},{h:'Name',k:'n'},{h:'Group',k:'g'},{h:'RPT',k:'r'},{h:'Govt',k:'v'},{h:'Site',k:'s'},{h:'GSTIN',k:'t'}],
    M.vendors.map(v => ({ c:esc(v.code), n:esc(v.name), g:esc(v.group),
      r:v.rpt?'<span class="pill pill-rpt">Related party</span>':'<span class="pill">Non-RPT</span>',
      v:v.govt?'<span class="pill pill-hold">Excluded from PBR</span>':'—', s:esc(v.site), t:esc(v.gstin) })), { tight:true });
  if (ADMIN.tab === 'bus') body = table(
    [{h:'BU code',k:'c'},{h:'Name',k:'n'},{h:'Parent',k:'p'},{h:'Legal entity',k:'e'},{h:'Role in matching',k:'r',cls:'wrap'}],
    M.bus.map(b => ({ c:esc(b.code), n:esc(b.name), p:b.parent?esc(b.parent):'<span class="color-grey">—</span>',
      e:esc(b.entity), r:b.parent?'Locator — rolls up before matching':'Parent — provisions are keyed here' })), { tight:true });
  if (ADMIN.tab === 'alloc') body = `${table(
    [{h:'Arrangement',k:'a',cls:'wrap'},{h:'From',k:'f'},{h:'To',k:'t'},{h:'Share',k:'s',cls:'tr'},{h:'Effective from',k:'e'},{h:'Owner',k:'o'}],
    [{ a:'MSC Colo — Nxtra', f:'30105', t:'111', s:'60%', e:'01 Apr 2026', o:'B2B Business Finance' },
     { a:'MSC Colo — Nxtra', f:'30105', t:'115', s:'40%', e:'01 Apr 2026', o:'B2B Business Finance' },
     { a:'Brand cross charge', f:'111', t:'40202', s:'0.5% of FSG revenue', e:'01 Apr 2026', o:'Marketing Finance' },
     { a:'IT / AMC cross charge markup', f:'115', t:'219', s:'11%', e:'01 Apr 2025', o:'IT Shared Services' }]
      .map(r => ({ a:esc(r.a), f:esc(r.f), t:esc(r.t), s:esc(r.s), e:esc(r.e), o:esc(r.o) })), { tight:true })}
    <div class="note note-amber mt-30">Q28 — business teams own these percentages and change them often, which makes effective dating mandatory. Re-running a past month must use the ratios that applied then. Who approves a change before it takes effect is still open.</div>`;
  if (ADMIN.tab === 'rules') body = `<div class="np-grid g2">
    <div class="np-panel"><p class="np-eyebrow mb-20">Period rules</p>${dl([
      ['PBR window', `${M.config.pbrMonths} months`], ['Financial year end', esc(M.config.fyEnd)],
      ['Auto reversal', `${M.config.autoReverseMonths} months`],
      ['Escalation ladder', M.config.escalation.join(' / ') + ' days'],
      ['Cross-charge markup', M.config.crossChargeMarkup + '%'],
      ['Maintained by', 'GPA — effective dated, changes on the audit trail']])}</div>
    <div class="np-panel"><p class="np-eyebrow mb-20">Matching rules</p>${dl([
      ['URN — standard', 'BU + vendor code + item code + month'],
      ['URN — TOCO', 'the above plus locator'],
      ['Sequence number', 'None — the combination is the uniqueness rule'],
      ['Roll-up', 'Locator to parent BU, standard form only'],
      ['Month source', 'Service period, never invoice date'],
      ['Relaxation partition', 'Vendor and category — never relaxed'],
      ['No service period', 'FIFO against the oldest open provision']])}</div></div>`;

  return iPage('/i/admin', `<h4 class="mb-10">Masters & rules</h4>
    <p class="color-grey mb-40">Item codes and the BU hierarchy are synced from the ERP. Allocation percentages and period rules are configuration the business owns.</p>
    <div class="hsteps">${tabs.map(t => `<div class="hstep ${ADMIN.tab===t[0]?'now':''}" style="cursor:pointer"
      onclick="ADMIN.tab='${t[0]}';render()"><b>${ADMIN.tab===t[0]?'●':'○'}</b>${esc(t[1])}</div>`).join('')}</div>
    ${body}`);
}
