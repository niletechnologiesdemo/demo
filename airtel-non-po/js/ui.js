/* ==========================================================================
   Non-PO Automation Platform — UI kit.
   Thin helpers over the Airtel classes so the screens stay declarative.
   ========================================================================== */

/* ---------- formatting -------------------------------------------------- */
const esc = s => String(s == null ? '' : s)
  .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

/* Indian digit grouping — 12,34,567 not 1,234,567. */
function inr(n, opts = {}) {
  if (n == null || isNaN(n)) return '—';
  const neg = n < 0; let s = Math.round(Math.abs(n)).toString();
  let last3 = s.slice(-3), rest = s.slice(0, -3);
  if (rest) last3 = ',' + last3;
  rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  const out = (opts.bare ? '' : '₹') + rest + last3;
  return neg ? '(' + out + ')' : out;
}
/* Compact for KPI tiles — ₹1.85 Cr / ₹4.2 L. */
function inrShort(n) {
  const a = Math.abs(n);
  if (a >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
  if (a >= 1e5) return '₹' + (n / 1e5).toFixed(2) + ' L';
  return inr(n);
}

const M_ = {};                       // master lookups, filled on boot
function idx() {
  M_.bu   = Object.fromEntries(M.bus.map(b => [b.code, b]));
  M_.ven  = Object.fromEntries(M.vendors.map(v => [v.code, v]));
  M_.item = Object.fromEntries(M.items.map(i => [i.code, i]));
  M_.cat  = Object.fromEntries(M.categories.map(c => [c.id, c]));
}
const vName = c => (M_.ven[c] || {}).name || c;
const iName = c => (M_.item[c] || {}).desc || c;
const bName = c => (M_.bu[c]  || {}).name || c;
/* Invoices are punched at locator level; matching rolls up to the parent. */
const parentBU = c => (M_.bu[c] || {}).parent || c;

/* ---------- atoms ------------------------------------------------------- */
const PILL = {
  OPEN:'pill-open', PARTIAL:'pill-partial', CLOSED:'pill-closed', PENDING:'pill-pending',
  REVERSED:'pill-reversed', HOLD:'pill-hold', FAILED:'pill-failed', DRAFT:'pill-draft',
  MATCHED:'pill-closed', UNMATCHED:'pill-open', MULTI:'pill-closed', BOOKED:'pill-posted',
  SUBMITTED:'pill-open', OCR:'pill-pending', UNDER_VALIDATION:'pill-pending',
  VALIDATION_FAILED:'pill-rejected', RFI:'pill-partial', REJECTED:'pill-rejected',
  APPROVED:'pill-closed', PROCESSING:'pill-pending', COMPLETE:'pill-closed'
};
const LABEL = {
  UNDER_VALIDATION:'Under validation', VALIDATION_FAILED:'Validation failed',
  RFI:'RFI raised', MULTI:'Multi-URN matched', UNMATCHED:'Awaiting match',
  PENDING:'Pending approval', FAILED:'Posting failed', HOLD:'On hold', OCR:'OCR in progress'
};
const pill = s => `<span class="pill ${PILL[s]||''}">${esc(LABEL[s] || s.toLowerCase())}</span>`;
const icon = (n, cls = '') => `<i class="np-i np-i-${n} ${cls}"></i>`;

/* URN rendered as its component parts, which is the whole point of it. */
function urn(u, big) {
  if (!u) return '<span class="color-grey">— not tagged —</span>';
  const p = u.split('-');
  return `<span class="urn ${big ? 'urn-big' : ''}">` +
    p.map(x => `<span class="urn-seg">${esc(x)}</span>`).join('<span class="urn-sep">·</span>') +
    '</span>';
}
function urnKey(u) {
  const p = u.split('-');
  const names = ['Business unit','Vendor code','Item code','Month','Locator'];
  return `<div class="matchbits">` + p.map((x, i) =>
    `<span class="urn-key"><span class="np-eyebrow" style="display:block">${esc(names[i]||'')}</span>${esc(x)}</span>`
  ).join('') + `</div>`;
}

/* ---------- composites -------------------------------------------------- */
function table(cols, rows, opts = {}) {
  if (!rows.length) return `<div class="np-panel"><p class="color-grey">${esc(opts.empty||'Nothing here.')}</p></div>`;
  return `<div class="dataTables_wrapper ${opts.wrap||''}">
    <table class="display nowrap ${opts.tight ? 'tight' : ''}">
      <thead><tr>${cols.map(c => `<th class="${c.cls||''}">${esc(c.h)}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(r => `<tr ${r.__href ? `onclick="go('${r.__href}')"` : 'class="norow"'}>` +
        cols.map(c => `<td class="${c.cls||''}">${r[c.k] == null ? '' : r[c.k]}</td>`).join('') +
        `</tr>`).join('')}</tbody>
    </table></div>`;
}

function kpis(items, activeIdx) {
  return `<div class="np-kpis">` + items.map((k, i) =>
    `<div class="np-kpi ${i === activeIdx ? 'active' : ''}" ${k.go ? `onclick="go('${k.go}')"` : ''}>
       <span class="np-kpi-n">${k.n}</span>
       <span class="np-eyebrow">${esc(k.l)}</span>
       ${k.s ? `<span class="np-kpi-sub">${esc(k.s)}</span>` : ''}
     </div>`).join('') + `</div>`;
}

const dl = rows => `<dl class="dl">` + rows.filter(Boolean).map(([k, v]) =>
  `<div class="dl-row"><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join('') + `</dl>`;

function checks(list) {
  const mark = { pass:'checkmark', fail:'cross', warn:'warning', skip:'minus' };
  return `<ul class="checks">` + list.map(c =>
    `<li><span class="ck ck-${c.s}">${icon(mark[c.s])}</span>
      <span class="ck-body"><p>${esc(c.t)}</p>${c.d ? `<p class="detail">${c.d}</p>` : ''}</span></li>`
  ).join('') + `</ul>`;
}

function hsteps(list, now) {
  return `<div class="hsteps">` + list.map((s, i) =>
    `<div class="hstep ${i < now ? 'done' : i === now ? 'now' : ''}"><b>${i < now ? '✓' : i + 1}</b>${esc(s)}</div>`
  ).join('') + `</div>`;
}

const timeline = list => `<ul class="tl">` + list.map(t =>
  `<li class="${t.k||''}"><p class="t-when">${esc(t.when)}</p><p class="t-what">${t.what}</p>
   ${t.who ? `<p class="t-who">${esc(t.who)}</p>` : ''}</li>`).join('') + `</ul>`;

/* Nine segment accounting flexfield — only the account segment differs
   between the legs, which is the pattern the journal builder implements. */
function ccid(bu, acct, iut) {
  return `<span class="ccid">${esc(bu)}-0000000-<b>${esc(acct)}</b>-000-00-${esc(iut||'00000')}-000-0000-00000</span>`;
}
function jv(lines, meta) {
  const dr = lines.reduce((a, l) => a + (l.dr || 0), 0);
  const cr = lines.reduce((a, l) => a + (l.cr || 0), 0);
  return `<table class="jv">
    <thead><tr><th class="drcr"></th><th>Account</th><th>Description</th>
      <th class="amt">Debit</th><th class="amt">Credit</th></tr></thead>
    <tbody>${lines.map(l => `<tr>
      <td class="drcr">${l.dr ? 'Dr' : 'Cr'}</td>
      <td>${ccid(l.bu, l.acct, l.iut)}</td>
      <td>${esc(l.desc)}</td>
      <td class="amt num">${l.dr ? inr(l.dr) : '—'}</td>
      <td class="amt num">${l.cr ? inr(l.cr) : '—'}</td></tr>`).join('')}</tbody>
    <tfoot><tr><td></td><td colspan="2">${meta ? esc(meta) : ''}</td>
      <td class="amt num">${inr(dr)}</td><td class="amt num">${inr(cr)}</td></tr></tfoot>
  </table>`;
}

/* Form fields, colour-coded the way the BRD's input template legend is. */
function field(kind, label, value, opts = {}) {
  const tag = { auto:'Auto', system:'System', manual:'' }[kind];
  const body = opts.select
    ? `<div class="select"><select ${opts.on ? `onchange="${opts.on}"` : ''}>${opts.select.map(o =>
        `<option ${o === value ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></div>`
    : kind === 'manual'
      ? `<input type="${opts.type||'text'}" value="${esc(value||'')}" placeholder="${esc(opts.ph||'')}"
           ${opts.on ? `oninput="${opts.on}"` : ''} ${opts.id ? `id="${opts.id}"` : ''}>`
      : `<p class="f-readonly">${value == null || value === '' ? '<span class="color-grey">—</span>' : value}</p>`;
  return `<div class="f f-${kind}">
    <label class="field-title">${esc(label)}</label>${body}
    ${tag ? `<span class="f-tag">${tag}</span>` : ''}
    ${opts.hint ? `<p class="detail fs-12 color-grey mt-5">${esc(opts.hint)}</p>` : ''}
  </div>`;
}
const legend = () => `<div class="legend">
  <span><i style="background:#96ba3a"></i>Auto-populated from masters</span>
  <span><i style="background:#9f9f9f"></i>Manual entry</span>
  <span><i style="background:#1f6fb2"></i>System generated</span></div>`;

/* ---------- chrome ------------------------------------------------------ */
function modal(title, html, wide) {
  document.getElementById('np-modal').innerHTML =
    `<div class="np-modal-bg" onclick="closeModal()"></div>
     <div class="np-modal-box ${wide ? 'wide' : ''}">
       <span class="np-modal-x" onclick="closeModal()">${icon('cross')}</span>
       <h4 class="mb-30">${esc(title)}</h4>${html}</div>`;
  document.getElementById('np-modal').classList.add('on');
}
const closeModal = () => document.getElementById('np-modal').classList.remove('on');

let toastT;
function toast(msg, ok) {
  const t = document.getElementById('np-toast');
  t.textContent = msg; t.className = 'np-toast on' + (ok ? ' ok' : '');
  clearTimeout(toastT); toastT = setTimeout(() => t.className = 'np-toast' + (ok ? ' ok' : ''), 3600);
}

function rail(groups, active) {
  return `<aside class="np-rail">
    <div class="np-rail-logo"><a href="#/"><img src="images/airtel-logo_opt.svg" width="140" alt="Airtel"></a>
      <p class="np-eyebrow mt-15">Non-PO Automation</p></div>
    <div class="np-rail-scroll">${groups.map(g => `
      <div class="np-rail-group"><p class="np-eyebrow">${esc(g.t)}</p></div>
      <ul class="np-nav">${g.items.map(it => `<li class="${it.r === active ? 'active' : ''}">
        <a href="#${it.r}">${esc(it.l)}${it.c != null ? `<span class="np-nav-count">${it.c}</span>` : ''}</a></li>`).join('')}</ul>
    `).join('')}<div style="height:40px"></div></div>
  </aside>`;
}

function head(who, sub, persona) {
  return `<div class="np-head"><div class="np-head-in">
    <p class="np-head-who">${esc(who)}<span>${esc(sub)}</span></p>
    <div class="np-head-actions">
      <span class="persona">
        <a href="#/i/dashboard" class="${persona === 'i' ? 'on' : ''}">GPA / Finance</a>
        <a href="#/p/dashboard" class="${persona === 'p' ? 'on' : ''}">Partner</a>
      </span>
      <a href="#/" class="np-head-ico">${icon('user')}<span>Profile</span></a>
      <a href="#/" class="np-head-ico">${icon('logout')}<span>Exit</span></a>
    </div>
  </div></div>`;
}

/* Every screen is rendered through here so the shell stays in one place. */
function page({ groups, active, who, sub, persona, body, wash }) {
  return rail(groups, active) +
    `<div class="np-body">${head(who, sub, persona)}
       <main class="np-main ${wash ? 'wash' : ''}">${body}</main></div>`;
}

const crumb = parts => `<p class="crumb">${parts.map((p, i) =>
  p[1] ? `<a href="#${p[1]}">${esc(p[0])}</a>` : esc(p[0])).join(' &nbsp;›&nbsp; ')}</p>`;

const go = h => { location.hash = h; };
const back = () => history.back();
