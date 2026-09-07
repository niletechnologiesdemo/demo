/* ==========================================================================
   Non-PO Automation Platform — state, router and boot.
   ========================================================================== */

const S = { provisions: PROVISIONS, invoices: INVOICES, batches: BATCHES };

/* ---------- landing ----------------------------------------------------- */
function scLanding() {
  const tour = [
    ['A provision is raised', 'Electricity for June, estimated from the Metabase meter feed. Validation, duplicate check, DOA approval, then a journal into Oracle.', '/i/new'],
    ['It gets a URN', 'BU, vendor code, item code and month. No sequence — the combination itself is the uniqueness rule.', '/i/provision/P-0001'],
    ['The partner submits the invoice', 'Two months later, against the row Airtel seeded in their template.', '/p/expected'],
    ['Airtel rebuilds the fingerprint', 'Locator 11106 rolls up to parent 111; the month comes from the service period, not the invoice date.', '/i/match'],
    ['Nearest match, then a person decides', 'Exact matching is hard in practice, so candidates are ranked and a force match is recorded.', '/i/match/NONPO-2026-0013355'],
    ['Six months, one invoice', 'Three provisioned months actualize; three future months go to prepaid and unwind monthly.', '/i/prepaid'],
    ['What never clears', 'The escalation ladder, the thirteen-month auto reversal, holds and force closure.', '/i/ageing']
  ];
  return `<div style="max-width:1180px;margin:0 auto;padding:70px 40px 90px 40px">
    <div class="mb-60"><img src="images/airtel-logo_opt.svg" width="150" alt="Airtel"></div>
    <p class="np-eyebrow mb-20">Finance Transformation Program · interactive mockup</p>
    <h3 class="fs-48 mb-25">Non-PO<br><span class="color-red">Automation Platform</span></h3>
    <p class="fs-20 color-grey mb-60" style="max-width:760px;line-height:32px">
      Two portals solving opposite ends of one problem. One declares an expected cost; the other satisfies it.
      They meet at the URN.</p>

    <div class="np-grid g2 mb-70">
      <div class="tile" style="min-height:auto;padding:44px 40px" onclick="go('/i/dashboard')">
        <p class="np-eyebrow mb-15">Internal</p>
        <h5 class="fs-30 mb-15" style="line-height:36px">Provisioning &amp; Actualization</h5>
        <p class="fs-15 color-grey" style="line-height:24px">For GPA, ACE and CFR. Provision intake and bulk upload, validation and DOA approval,
          URN generation, Oracle posting, matching and actualization, ageing and reversal, the real-time flash.</p>
        <p class="tile-meta">14 screens &nbsp;·&nbsp; 587 PD / 26.7 MM in the effort plan</p>
      </div>
      <div class="tile" style="min-height:auto;padding:44px 40px" onclick="go('/p/dashboard')">
        <p class="np-eyebrow mb-15">External</p>
        <h5 class="fs-30 mb-15" style="line-height:36px">Partner Portal</h5>
        <p class="fs-15 color-grey" style="line-height:24px">For vendors and partners. Category selection across PM and AP, single and bulk submission,
          OCR and IRN review, the validation checklist, rejection and correction, live status tracking.</p>
        <p class="tile-meta">8 screens &nbsp;·&nbsp; 624 PD / 28.4 MM in the effort plan</p>
      </div>
    </div>

    <h4 class="mb-15">Follow one cost through both halves</h4>
    <p class="color-grey mb-40" style="max-width:760px">The mockup holds live state — approve a provision and it appears in the register; match an invoice and the URN closes.</p>
    <div class="tour">${tour.map((t, n) => `<a href="#${t[2]}">
      <span class="n">${n + 1}</span>
      <span class="h">${esc(t[0])}</span>
      <span class="d">${esc(t[1])}</span>
      <span class="go">${icon('arrow-right')}</span></a>`).join('')}</div>

    <div class="np-grid g3 mt-70">
      <div><p class="np-eyebrow mb-12">Built on</p>
        <p class="fs-14 color-grey line-height-22">The Airtel Partner Portal design system — Tondo, the airtel-icons set and the existing
          stylesheets, unchanged. Only components the PO portal never needed were added.</p></div>
      <div><p class="np-eyebrow mb-12">Sourced from</p>
        <p class="fs-14 color-grey line-height-22">BRD Non-PO 25 Aug 26, the Partner Portal spec v2, the consolidated process flows,
          both effort plans and the GPA Input Tracking Sheet for April 2026.</p></div>
      <div><p class="np-eyebrow mb-12">Open questions are marked</p>
        <p class="fs-14 color-grey line-height-22">Where the documents leave something undecided the screen says so, referencing the
          question number in the Clarification Register rather than inventing an answer.</p></div>
    </div>
  </div>`;
}

/* ---------- router ------------------------------------------------------ */
const ROUTES = [
  [/^\/?$/,                     () => scLanding()],
  /* internal */
  [/^\/i\/dashboard$/,          () => scDashboard()],
  [/^\/i\/new$/,                () => scNew()],
  [/^\/i\/bulk$/,               () => scBulk()],
  [/^\/i\/approvals$/,          () => scApprovals()],
  [/^\/i\/provision\/(.+)$/,    m  => scProvision(m[1])],
  [/^\/i\/posting$/,            () => scPosting()],
  [/^\/i\/actualization$/,      () => scActualization()],
  [/^\/i\/match$/,              () => scMatchList()],
  [/^\/i\/match\/(.+)$/,        m  => scMatch(m[1])],
  [/^\/i\/prepaid$/,            () => scPrepaid()],
  [/^\/i\/ageing$/,             () => scAgeing()],
  [/^\/i\/flash$/,              () => scFlash()],
  [/^\/i\/scenarios$/,          () => scScenarios()],
  [/^\/i\/reports$/,            () => scReports()],
  [/^\/i\/admin$/,              () => scAdmin()],
  /* partner */
  [/^\/p\/dashboard$/,          () => scPDashboard()],
  [/^\/p\/expected$/,           () => scExpected()],
  [/^\/p\/category$/,           () => scCategory()],
  [/^\/p\/submit$/,             (m, q) => scSubmit(q)],
  [/^\/p\/bulk$/,               () => scPBulk()],
  [/^\/p\/batches$/,            () => scBatches()],
  [/^\/p\/batch\/(.+)$/,        m  => scBatch(m[1])],
  [/^\/p\/invoices$/,           () => scPInvoices(false)],
  [/^\/p\/attention$/,          () => scPInvoices(true)],
  [/^\/p\/ocr\/(.+)$/,          m  => scOcr(m[1])],
  [/^\/p\/invoice\/(.+)$/,      m  => scPInvoice(m[1])]
];

function render() {
  const raw = (location.hash || '#/').slice(1);
  const [path, qs] = raw.split('?');
  const q = Object.fromEntries(new URLSearchParams(qs || ''));
  for (const [re, fn] of ROUTES) {
    const m = path.match(re);
    if (m) {
      document.getElementById('app').innerHTML = fn(m, q);
      return;
    }
  }
  document.getElementById('app').innerHTML = scLanding();
}

window.addEventListener('hashchange', () => { closeModal(); window.scrollTo(0, 0); render(); });
window.addEventListener('DOMContentLoaded', () => { idx(); render(); });
