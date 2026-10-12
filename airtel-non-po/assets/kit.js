/* UI kit for the Non-PO Portal wireframes.
   Every function returns an HTML string. Screens build pages from these calls only
   (no raw styles), so the look lives in tokens.css / components.css.
   Any element that carries requirements gets an `eid`; the runtime stamps data-req
   onto it from the screen's spec, so requirement IDs are never typed into screens. */
(function (G) {
  'use strict';

  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); }
  function cls() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function join(a) { return (a || []).filter(function (x) { return x != null && x !== false; }).join(''); }
  function arr(x) { return x == null ? [] : Array.isArray(x) ? x : [x]; }

  // rendering context, set by the runtime before each screen render
  var ctx = { screen: '', persona: '', eids: [] };

  function E(eid) {
    if (!eid) return '';
    ctx.eids.push(eid);
    return ' data-eid="' + esc(eid) + '"';
  }
  // behaviour attributes understood by the runtime's event delegation
  function B(o) {
    if (!o) return '';
    var s = '';
    if (o.go) s += ' data-go="' + esc(o.go) + '"';
    if (o.modal) s += ' data-modal="' + esc(o.modal) + '"';
    if (o.close) s += ' data-close="' + esc(o.close === true ? '' : o.close) + '"';
    if (o.drawer) s += ' data-drawer="' + esc(o.drawer) + '"';
    if (o.state) s += ' data-state="' + esc(o.state) + '"';
    if (o.tip) s += ' data-tip="' + esc(o.tip) + '"';
    if (o.toast) s += ' data-toast="' + esc(o.toast) + '"';
    if (o.title) s += ' title="' + esc(o.title) + '"';
    return s;
  }

  /* ------------------------------------------------------------ icons */
  var P = {
    back: 'M20 12H5M11 18l-6-6 6-6',
    info: '@c12,12,9|M12 16v-5M12 8h.01',
    search: '@c11,11,7|M20 20l-4-4',
    filter: 'M3 5h18l-7 8v6l-4 2v-8z',
    download: 'M12 3v12M7 10l5 5 5-5M4 20h16',
    upload: 'M12 16V4M7 9l5-5 5 5M4 20h16',
    share: 'M14 6l6 6-6 6|M20 12H11a7 7 0 0 0-7 7',
    doc: 'M14 3H6v18h12V7z M14 3v4h4 M9 12h6 M9 16h6',
    trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
    edit: 'M4 20h4L19 9l-4-4L4 16z M13 7l4 4',
    eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z|@c12,12,3',
    bell: 'M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z M10 21a2 2 0 0 0 4 0',
    user: '@c12,8,4|M4 21c0-4 4-6 8-6s8 2 8 6',
    users: '@c9,8,3.5|M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5 M16 4.5a3.5 3.5 0 0 1 0 7 M18 14.5c2.5.5 4 2.3 4 5.5',
    logout: '@c12,13,8|M12 3v8',
    chat: 'M4 5h16v11H9l-5 4z',
    plus: 'M12 5v14M5 12h14',
    minus: 'M5 12h14',
    check: 'M5 12l5 5 9-10',
    x: 'M6 6l12 12M18 6L6 18',
    alert: 'M12 3L2 20h20z M12 10v4 M12 17h.01',
    clock: '@c12,12,9|M12 7v5l3 2',
    calendar: 'M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4',
    refresh: 'M20 11a8 8 0 1 0-2.3 5.7 M20 4v7h-7',
    chevDown: 'M6 9l6 6 6-6',
    chevRight: 'M9 6l6 6-6 6',
    chevLeft: 'M15 6l-6 6 6 6',
    arrowRight: 'M5 12h14 M13 6l6 6-6 6',
    attach: 'M20 11l-8 8a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8',
    settings: '@c12,12,3|M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1',
    home: 'M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-6h4v6',
    invoice: 'M6 2h12v20l-3-2-3 2-3-2-3 2z M9 7h6 M9 11h6 M9 15h4',
    layers: 'M12 3l9 5-9 5-9-5z M3 13l9 5 9-5',
    match: 'M4 7h4l8 10h4 M4 17h4l2-2.5 M14 9.5L16 7h4 M18 4l3 3-3 3 M18 14l3 3-3 3',
    approve: 'M4 4h16v16H4z M8 12l3 3 5-6',
    chart: 'M4 20V10 M10 20V4 M16 20v-7 M3 20h18',
    report: 'M6 2h9l5 5v15H6z M14 2v6h6 M9 17v-3 M12 17v-6 M15 17v-4',
    lock: 'M6 11h12v10H6z M8 11V7a4 4 0 0 1 8 0v4',
    mobile: 'M7 2h10v20H7z M11 18h2',
    mail: 'M3 5h18v14H3z M3 6l9 7 9-7',
    db: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    send: 'M22 2L11 13 M22 2l-7 20-4-9-9-4z',
    pause: 'M8 5v14 M16 5v14',
    flag: 'M5 21V4 M5 4h12l-2 4 2 4H5',
    list: 'M9 6h12 M9 12h12 M9 18h12 M4 6h.01 M4 12h.01 M4 18h.01',
    copy: 'M9 9h11v11H9z M5 15H4V4h11v1',
    map: 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z M9 3v15 M15 6v15',
    grid: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z',
    building: 'M4 21V3h10v18 M14 9h6v12 M2 21h20 M7 7h4 M7 11h4 M7 15h4',
    rupee: 'M7 4h11 M7 9h11 M9 4a5 5 0 0 1 0 10H7l8 7',
    link: 'M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1 M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1',
    qr: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h3v3h-3z M18 18h3v3h-3z',
    history: 'M3 12a9 9 0 1 0 3-6.7 M3 4v5h5 M12 7v5l3 2',
    scan: 'M3 8V3h5 M16 3h5v5 M21 16v5h-5 M8 21H3v-5 M7 12h10',
    play: 'M7 4l13 8-13 8z',
    key: '@c8,15,4|M11 12l9-9 M17 6l3 3',
    shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
    more: 'M5 12h.01M12 12h.01M19 12h.01',
    sync: 'M4 12a8 8 0 0 1 14-5.3 M20 4v5h-5 M20 12a8 8 0 0 1-14 5.3 M4 20v-5h5',
    hourglass: 'M7 3h10 M7 21h10 M8 3c0 5 8 5 8 9s-8 4-8 9 M16 3c0 5-8 5-8 9s8 4 8 9',
    split: 'M12 3v18 M8 7l-4 5 4 5 M16 7l4 5-4 5',
    percent: 'M19 5L5 19 @c7,7,2.5|@c17,17,2.5',
    target: '@c12,12,9|@c12,12,5|@c12,12,1',
    phone: 'M5 3h4l2 5-3 2a11 11 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z',
    zoomIn: '@c11,11,7|M20 20l-4-4 M11 8v6 M8 11h6',
    rotate: 'M4 11a8 8 0 1 1 2.3 5.7 M4 18v-7h7',
    print: 'M6 9V3h12v6 M6 17H4v-7h16v7h-2 M7 14h10v7H7z',
    menu: 'M4 6h16 M4 12h16 M4 18h16',
    star: 'M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.4 6.5 20.3l1-6.2L3 9.7l6.2-.9z',
    template: 'M4 4h16v5H4z M4 13h7v7H4z M15 13h5 M15 17h5',
    bank: 'M3 10l9-6 9 6 M5 10v8 M9 10v8 M15 10v8 M19 10v8 M3 21h18',
    gavel: 'M13 4l7 7 M10 7l7 7 M11.5 5.5l-6 6 M4 21h9 M8 14l-5 5',
    tower: 'M12 7v14 M8 21l4-14 4 14 M9 16h6 M7 5a7 7 0 0 1 10 0 M4.5 2.5a11 11 0 0 1 15 0',
    zap: 'M13 2L4 14h7l-1 8 9-12h-7z',
    folder: 'M3 6h6l2 2h10v12H3z',
    columns: 'M4 4h16v16H4z M10 4v16 M16 4v16',
    hold: '@c12,12,9|M10 8.5v7 M14 8.5v7'
  };
  // Airtel icon font glyphs (fonts/icons/airtel-icons), used wherever Airtel has an equivalent; SVG otherwise
  var AI = {
    bell: 'f109', user: 'f10a', logout: 'f192', download: 'f102', doc: 'f107', search: 'f13f',
    edit: 'f188', trash: 'f165', settings: 'f16e', refresh: 'f14f', sync: 'f168', plus: 'f14c', minus: 'f143',
    check: 'f128', x: 'f130', alert: 'f15d', info: 'f12c', clock: 'f12d', chevDown: 'f129', arrowRight: 'f10e',
    chevLeft: 'f10d', chevRight: 'f10e', list: 'f13c', print: 'f103', mail: 'f104', phone: 'f105', chat: 'f108',
    users: 'f139', attach: 'f141', filter: 'f1a8', eye: 'f1a7', report: 'f1af', tower: 'f161',
    star: 'f19c', zoomIn: 'f140', invoice: 'f182', rupee: 'f11b', history: 'f168', flag: 'f15d', grid: 'f106',
    send: 'f147', link: 'f189', shield: 'f152', home: 'f156', building: 'f1c7', chart: 'f1bd'
  };
  function icon(name, size, extra) {
    if (AI[name] && !(extra && extra.indexOf('svg') >= 0)) return '<i class="' + cls('k-ic', 'ai', size, extra) + '" aria-hidden="true">&#x' + AI[name] + ';</i>';
    var d = P[name] || P.doc, s = '';
    d.split('|').forEach(function (part) {
      part.split(' @').forEach(function (seg, i) {
        seg = (i ? '@' : '') + seg;
        if (seg.charAt(0) === '@') {
          var m = seg.slice(2).split(',');
          s += '<circle cx="' + m[0] + '" cy="' + m[1] + '" r="' + m[2] + '"/>';
        } else if (seg.trim()) {
          s += '<path d="' + seg.trim() + '"/>';
        }
      });
    });
    return '<svg class="' + cls('k-ic', size, extra) + '" viewBox="0 0 24 24" aria-hidden="true">' + s + '</svg>';
  }

  /* ------------------------------------------------------------ number & date formatting */
  function inr(n, dec) {
    if (n == null || n === '') return '';
    if (typeof n === 'string') return n;
    var d = dec == null ? 2 : dec, neg = n < 0, x = Math.abs(n).toFixed(d);
    var parts = x.split('.'), i = parts[0], last3 = i.slice(-3), rest = i.slice(0, -3);
    if (rest) last3 = ',' + last3;
    var out = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + last3 + (d ? '.' + parts[1] : '');
    return (neg ? '-' : '') + out;
  }
  function rs(n, dec) { return n == null || n === '' ? '' : (typeof n === 'string' ? n : 'Rs ' + inr(n, dec)); }
  function compact(n) {
    var a = Math.abs(n);
    if (a >= 1e7) return (n / 1e7).toFixed(a >= 1e8 ? 0 : 1).replace(/\.0$/, '') + ' Cr';
    if (a >= 1e5) return (n / 1e5).toFixed(a >= 1e6 ? 0 : 1).replace(/\.0$/, '') + ' L';
    if (a >= 1e3) return inr(n, 0);
    return String(n);
  }

  /* ------------------------------------------------------------ text & layout */
  function p(text, o) { o = o || {}; return '<p class="' + cls(o.muted && 'k-muted', o.small && 'k-small') + '"' + E(o.eid) + '>' + text + '</p>'; }
  function subhead(text, eid) { return '<h4 class="k-subhead"' + E(eid) + '>' + text + '</h4>'; }
  function divider() { return '<hr class="k-divider">'; }
  function row(items, o) { o = o || {}; return '<div class="' + cls('k-row', o.top && 'top') + '"' + E(o.eid) + '>' + join(items) + '</div>'; }
  function stack(items, o) { o = o || {}; return '<div class="k-stack"' + E(o.eid) + '>' + join(items) + '</div>'; }
  function grow(html) { return '<div class="k-grow">' + html + '</div>'; }
  function cols(ratio, a, b, o) {
    o = o || {};
    var c = ratio === '2:1' ? 'w21' : ratio === '1:2' ? 'w12' : '';
    return '<div class="' + cls('k-cols', c) + '"' + E(o.eid) + '><div>' + join(arr(a)) + '</div><div>' + join(arr(b)) + '</div></div>';
  }
  function grid(n, items, o) {
    o = o || {};
    var c = n === 1 ? 'c1' : n === 2 ? 'c2' : n === 4 ? 'c4' : '';
    return '<div class="' + cls('k-grid', c) + '"' + E(o.eid) + '>' + (items || []).filter(Boolean).map(function (it) {
      if (it && typeof it === 'object') return '<div class="span' + (it.span || 1) + '">' + it.html + '</div>';
      return '<div>' + it + '</div>';
    }).join('') + '</div>';
  }

  /* ------------------------------------------------------------ page */
  function page(o) {
    o = o || {};
    return '<div class="k-page-head"' + E(o.eid) + '><div>' +
      (o.crumb ? '<div class="k-crumb">' + o.crumb + '</div>' : '') +
      '<h1 class="k-title">' + esc(o.title) + (o.accent ? ' <em>' + esc(o.accent) + '</em>' : '') +
      (o.info ? ' <span data-tip="' + esc(o.info) + '">' + icon('info') + '</span>' : '') + '</h1>' +
      (o.sub ? '<div class="k-sub">' + o.sub + '</div>' : '') +
      '</div><div class="k-head-sp"></div>' + (o.actions ? '<div class="k-btnrow">' + join(o.actions) + '</div>' : '') + '</div>';
  }

  function section(o) {
    o = o || {};
    var tog = o.collapsible ? '<span class="k-sec-toggle" data-sec-toggle>' + (o.collapsed ? '+' : '&minus;') + '</span>' : '';
    return '<section class="' + cls('k-sec', o.collapsed && 'is-collapsed') + '"' + E(o.eid) + '>' +
      (o.title ? '<div class="k-sec-head"><h3 class="k-sec-title">' + esc(o.title) + '</h3>' +
        (o.sub ? '<span class="k-sec-sub">' + o.sub + '</span>' : '') +
        (o.actions ? '<div class="k-head-sp"></div><div class="k-btnrow">' + join(o.actions) + '</div>' : '') + tog + '</div>' : '') +
      '<div class="k-sec-body">' + join(arr(o.body)) + '</div></section>';
  }

  function box(o) {
    o = o || {};
    return '<div class="' + cls('k-card-box', o.notice && 'notice') + '"' + E(o.eid) + B(o) + '>' +
      (o.title ? '<h3>' + o.title + (o.actions ? '<span class="k-head-sp"></span>' + join(o.actions) : '') + '</h3>' : '') +
      join(arr(o.body)) + '</div>';
  }

  /* ------------------------------------------------------------ fields */
  function field(o) {
    o = o || {};
    var t = o.type || 'text';
    var st = o.error ? 'is-error' : o.state === 'focus' ? 'is-focus' : o.state === 'disabled' ? 'is-disabled' : (o.state === 'readonly' || t === 'readonly') ? 'is-readonly' : '';
    var v = o.value != null && o.value !== '' ? '<span class="val">' + o.value + '</span>' :
      '<span class="val ph">' + esc(o.placeholder || (t === 'select' ? 'Select' : t === 'date' ? 'dd/mm/yyyy' : 'Enter value')) + '</span>';
    var trail = t === 'select' ? icon('chevDown') : t === 'date' ? icon('calendar') : t === 'search' ? icon('search') :
      t === 'file' ? icon('attach') : t === 'lookup' ? icon('search') : o.icon ? icon(o.icon) : '';
    // field source marker, coloured as the P&A BRD legend (section 9): green auto-populated, grey manual entry, blue system-generated
    var SRC = { user: ['grey', 'Manual entry'], master: ['green', 'Auto-populated from master data'], system: ['blue', 'Generated or calculated by the system'] }[o.src];
    var src = SRC ? '<i class="k-src ' + SRC[0] + '" data-tip="' + SRC[1] + '"></i>' : '';
    return '<div class="k-field"' + E(o.eid) + '>' +
      (o.label != null ? '<label class="k-flabel">' + src + esc(o.label) + (o.required ? '<span class="k-req">*</span>' : '') +
        (o.info ? ' <span data-tip="' + esc(o.info) + '">' + icon('info') + '</span>' : '') + '</label>' : '') +
      '<div class="' + cls('k-input', st, t === 'area' && 'area', o.wrap && 'wrap') + '">' + (o.prefix ? '<span class="k-muted">' + o.prefix + '</span>' : '') + v + trail + '</div>' +
      (o.error ? '<div class="k-ferr">' + icon('alert') + '<span>' + o.error + '</span></div>' : '') +
      (o.ok ? '<div class="k-fok">' + o.ok + '</div>' : '') +
      (o.hint ? '<div class="k-fhint">' + o.hint + '</div>' : '') + '</div>';
  }
  function check(o) {
    o = o || {};
    return '<span class="' + cls('k-check', o.radio && 'radio', o.on && 'is-on') + '"' + E(o.eid) + ' data-check' + (o.radio ? '="radio"' : '') + B(o) + '><i></i>' + (o.label || '') + '</span>';
  }
  function options(o) {
    o = o || {};
    return '<div class="k-field"' + E(o.eid) + '>' + (o.label ? '<label class="k-flabel">' + esc(o.label) + (o.required ? '<span class="k-req">*</span>' : '') + '</label>' : '') +
      '<div class="k-options">' + (o.items || []).map(function (it) {
        it = typeof it === 'string' ? { label: it } : it;
        return check({ label: it.label, on: it.on, radio: o.type !== 'check', eid: it.eid, go: it.go, state: it.state });
      }).join('') + '</div>' + (o.hint ? '<div class="k-fhint">' + o.hint + '</div>' : '') + '</div>';
  }

  /* ------------------------------------------------------------ buttons & links */
  function button(o) {
    o = typeof o === 'string' ? { label: o } : (o || {});
    var v = o.variant || 'secondary';
    return '<button type="button" class="' + cls('k-btn', v !== 'secondary' && v, o.size, o.wide && 'wide') + '"' + E(o.eid) + B(o) +
      (v === 'disabled' ? ' aria-disabled="true"' : '') + '>' +
      (o.icon ? icon(o.icon) : '') + esc(o.label) + (o.iconRight ? icon(o.iconRight) : '') + '</button>';
  }
  function btns(list, o) { o = o || {}; return '<div class="' + cls('k-btnrow', o.end && 'end') + '"' + E(o.eid) + '>' + join(list) + '</div>'; }
  function textlink(o) {
    o = typeof o === 'string' ? { label: o } : (o || {});
    return '<a class="k-textlink"' + E(o.eid) + B(o) + '>' + (o.iconLeft ? icon(o.iconLeft) : '') + esc(o.label) + (o.icon ? icon(o.icon) : '') + '</a>';
  }
  function link(label, go, eid) { return '<a class="k-link"' + E(eid) + (go ? ' data-go="' + esc(go) + '"' : '') + '>' + label + '</a>'; }
  function sticky(o) {
    o = o || {};
    return '<div class="k-sticky"' + E(o.eid) + '>' + join(o.left) +
      (o.totals ? '<div class="k-totals">' + o.totals.map(function (t) { return '<span' + E(t[2]) + '>' + esc(t[0]) + ':<b>' + t[1] + '</b></span>'; }).join('') + '</div>' : '<div class="k-head-sp"></div>') +
      '<div class="k-sticky-acts">' + join(o.right) + '</div></div>';
  }

  /* ------------------------------------------------------------ status marks */
  var TONES = { ok: 't-ok', warn: 't-warn', info: 't-info', grey: 't-grey', red: 't-red', outline: 't-outline' };
  function status(text, tone, eid) { return '<span class="' + cls('k-status', TONES[tone]) + '"' + E(eid) + '>' + esc(text) + '</span>'; }
  function chip(text, tone, eid, o) { return '<span class="' + cls('k-chip', TONES[tone]) + '"' + E(eid) + B(o) + '>' + text + '</span>'; }
  function badge(n) { return '<span class="k-badge">' + esc(n) + '</span>'; }
  function tbc(text, eid) { return '<span class="k-tbc"' + E(eid) + ' data-tip="Open point - to be confirmed with Airtel">' + icon('flag') + esc(text || 'To be confirmed') + '</span>'; }
  function dot(tone) { return '<i class="' + cls('k-dot', TONES[tone]) + '"></i>'; }

  /* ------------------------------------------------------------ filters & tables */
  function filters(o) {
    o = o || {};
    return '<div class="k-filters"' + E(o.eid) + '>' +
      (o.show !== false ? '<div class="k-field">' + '<label class="k-flabel">Show</label><div class="k-input"><span class="val">' + (o.rows || 10) + ' rows per page</span>' + icon('chevDown') + '</div></div>' : '') +
      join(o.items) + (o.search !== false ? '<span class="k-searchbtn" data-toast="Filters applied">' + icon('search', 'lg') + '</span>' : '') +
      (o.actions ? '<div class="k-head-sp"></div>' + join(o.actions) : '') + '</div>';
  }

  function table(o) {
    o = o || {};
    var colsDef = o.columns || [];
    var head = '<tr>' + (o.select ? '<th style="width:34px">' + check({}) + '</th>' : '') + colsDef.map(function (c) {
      return '<th class="' + cls(c.num && 'num') + '"' + E(c.eid) + (c.tip ? ' data-tip="' + esc(c.tip) + '"' : '') + '>' + esc(c.label) + '</th>';
    }).join('') + '</tr>';
    var body = (o.rows || []).map(function (r) {
      return '<tr class="' + cls(r._sel && 'is-sel', r._flag && 'is-flag') + '"' + E(r._eid) + (r._go ? ' data-go="' + esc(r._go) + '" style="cursor:pointer"' : '') + '>' +
        (o.select ? '<td>' + check({ on: r._checked }) + '</td>' : '') +
        colsDef.map(function (c) {
          var v = r[c.key];
          if (c.key === '_acts') v = '<span class="k-rowacts">' + (v || []).map(function (a) {
            a = typeof a === 'string' ? { icon: a } : a;
            return '<span' + B(a) + E(a.eid) + (a.tip ? '' : ' data-tip="' + esc(a.label || a.icon) + '"') + '>' + icon(a.icon) + '</span>';
          }).join('') + '</span>';
          else if (c.money && typeof v === 'number') v = inr(v);
          return '<td class="' + cls(c.num && 'num', c.nowrap && 'nowrap') + '">' + (v == null ? '' : v) + '</td>';
        }).join('') + '</tr>';
    }).join('');
    if (!(o.rows || []).length) body = '<tr><td colspan="' + (colsDef.length + (o.select ? 1 : 0)) + '"><div class="k-empty">' + esc(o.empty || 'No records found') + '</div></td></tr>';
    var foot = o.foot ? '<tfoot><tr>' + (o.select ? '<td></td>' : '') + colsDef.map(function (c) { var v = o.foot[c.key]; return '<td class="' + cls(c.num && 'num') + '">' + (v == null ? '' : (c.money && typeof v === 'number' ? inr(v) : v)) + '</td>'; }).join('') + '</tr></tfoot>' : '';
    var pager = o.pager !== false ? '<div class="k-tablefoot">' + (o.footLeft ? join(o.footLeft) : '') +
      '<div class="k-pager">' + icon('chevLeft') + '<b>1</b><span>2</span><span>3</span>' + icon('chevRight') +
      (o.total ? '<span>&middot; ' + esc(o.total) + '</span>' : '') + '</div>' +
      (o.export !== false ? textlink({ label: 'Download Excel', icon: 'download', toast: 'Excel download started', eid: o.exportEid }) : '') + '</div>' : '';
    return '<div' + E(o.eid) + '><div class="k-tablewrap"><table class="' + cls('k-table', o.dense && 'dense') + '">' + '<thead>' + head + '</thead><tbody>' + body + '</tbody>' + foot + '</table></div>' + pager + '</div>';
  }

  /* ------------------------------------------------------------ tabs */
  var tabSeq = 0;
  function tabs(o) {
    o = o || {};
    var id = o.id || ('t' + (++tabSeq)), active = o.active || (o.tabs[0] && o.tabs[0].id);
    var bar = o.bar === false ? '' : '<div class="k-tabs"' + E(o.eid) + '>' + o.tabs.map(function (t) {
      return '<span class="' + cls('k-tab', t.id === active && 'is-active') + '" data-tab="' + esc(id + ':' + t.id) + '"' + E(t.eid) + '>' + esc(t.label) + (t.count != null ? '<span class="k-count">(' + esc(t.count) + ')</span>' : '') + '</span>';
    }).join('') + '</div>';
    var panels = o.tabs.map(function (t) {
      return '<div class="k-panel" data-panel="' + esc(id + ':' + t.id) + '"' + (t.id === active ? '' : ' hidden') + '>' + join(arr(t.body)) + '</div>';
    }).join('');
    return bar + panels;
  }

  /* ------------------------------------------------------------ selection cards & KPI tiles */
  function cards(o) {
    o = o || {};
    var c = o.cols === 4 ? 'c4' : o.cols === 2 ? 'c2' : '';
    return '<div class="' + cls('k-cards', c) + '"' + E(o.eid) + '>' + (o.items || []).map(function (it) {
      return '<div class="' + cls('k-card', it.active && 'is-active', it.left && 'left') + '"' + E(it.eid) + B(it) + '>' +
        (it.icon ? icon(it.icon, 'xl') : '') + '<div class="k-card-title">' + esc(it.title) + '</div>' +
        (it.text ? '<div class="k-card-text">' + it.text + '</div>' : '') +
        (it.meta ? '<div class="k-card-meta">' + join(arr(it.meta)) + '</div>' : '') + '</div>';
    }).join('') + '</div>';
  }
  function kpis(o) {
    o = o || {};
    var c = { 3: 'c3', 5: 'c5', 6: 'c6', 8: 'c8' }[o.cols] || '';
    return '<div class="' + cls('k-kpis', c) + '"' + E(o.eid) + '>' + (o.items || []).map(function (it) {
      return '<div class="' + cls('k-kpi', it.go && 'go', it.active && 'is-active') + '"' + E(it.eid) + B(it) + (it.tab ? ' data-tab="' + esc(it.tab) + '"' : '') + '><b>' + it.value + '</b><span>' + esc(it.label) + '</span>' +
        (it.sub ? '<small>' + it.sub + '</small>' : '') + '</div>';
    }).join('') + '</div>';
  }

  /* ------------------------------------------------------------ messages */
  var ALERT_ICON = { red: 'alert', warn: 'alert', ok: 'check', info: 'info' };
  function alert(o) {
    o = typeof o === 'string' ? { text: o } : (o || {});
    return '<div class="' + cls('k-alert', TONES[o.tone || 'info']) + '"' + E(o.eid) + '>' + icon(o.icon || ALERT_ICON[o.tone || 'info'] || 'info') +
      '<div>' + (o.title ? '<b>' + o.title + '</b> ' : '') + (o.text || '') + '</div>' + (o.actions ? btns(o.actions) : '') + '</div>';
  }
  // A behaviour note shown only while requirement tags are on - explains what the system does off-screen.
  function note(o) { o = typeof o === 'string' ? { text: o } : (o || {}); return '<div class="' + cls('k-note', o.shown && 'is-shown') + '"' + E(o.eid) + '><b>System behaviour.</b> ' + o.text + '</div>'; }
  function reqChip(n) { return '<span class="ov-chip static">' + esc(n) + '</span>'; }

  function modal(o) {
    o = o || {};
    if (o.layout === 'panel') {
      return '<div class="k-modal-back panel" data-modal-id="' + esc(o.id) + '"' + (o.open ? '' : ' hidden') + '>' +
        '<div class="k-modal panel"' + E(o.eid) + '>' +
        '<div class="k-modal-side"><h2 class="k-modal-title">' + esc(o.title || '') + (o.accent ? ' <em>' + esc(o.accent) + '</em>' : '') + '</h2></div>' +
        '<div class="k-modal-main">' + join(arr(o.body)) + (o.foot ? '<div class="k-modal-foot">' + join(o.foot) + '</div>' : '') + '</div></div></div>';
    }
    return '<div class="k-modal-back" data-modal-id="' + esc(o.id) + '"' + (o.open ? '' : ' hidden') + '>' +
      '<div class="' + cls('k-modal', o.size) + '"' + E(o.eid) + '><span class="k-modal-x" data-close>&times;</span>' +
      '<h2 class="k-modal-title">' + esc(o.title || '') + (o.accent ? ' <em>' + esc(o.accent) + '</em>' : '') + '</h2>' +
      join(arr(o.body)) + (o.foot ? '<div class="k-modal-foot">' + join(o.foot) + '</div>' : '') + '</div></div>';
  }
  function drawer(o) {
    o = o || {};
    return '<aside class="k-drawer" data-drawer-id="' + esc(o.id) + '"' + E(o.eid) + (o.open ? '' : ' hidden') + '>' +
      '<span class="k-modal-x" data-close>&times;</span><h2 class="k-modal-title">' + esc(o.title || '') + (o.accent ? ' <em>' + esc(o.accent) + '</em>' : '') + '</h2>' + join(arr(o.body)) + '</aside>';
  }

  /* ------------------------------------------------------------ split review view & document viewer */
  function split(o) {
    o = o || {};
    return '<div class="k-split"' + E(o.eid) + '><div class="k-split-left">' + join(arr(o.left)) + '</div><div class="k-split-right">' + join(arr(o.right)) + '</div></div>';
  }
  function pdf(o) {
    o = o || {};
    var docs = o.docs || ['Invoice PDF'];
    return '<div class="k-pdf-head"' + E(o.eid) + '>' + field({ label: 'Select document to view', type: 'select', value: o.selected ? esc(o.selected) : '', placeholder: 'Select document', eid: o.selectEid }) +
      (o.count ? '<span class="k-muted k-small">' + esc(o.count) + '</span>' : '') + '</div>' +
      '<div class="k-pdf-body">' + (o.doc ? o.doc : '<div class="k-pdf-empty">Please select document from drop down to view</div>') + '</div>' +
      '<div class="k-pdf-foot">' + join(o.foot || [textlink({ label: 'Download PDF', icon: 'download', toast: 'PDF download started' })]) + '</div>';
  }
  // A mock tax invoice rendered inside the viewer (sample data only)
  function docMock(d) {
    d = d || {};
    var lines = d.lines || [];
    return '<div class="k-doc">' + (d.qr ? '<span class="qr"></span>' : '') + '<h4>' + esc(d.title || 'TAX INVOICE') + '</h4>' +
      '<div class="dl">' + (d.fields || []).map(function (f) { return '<span><b>' + esc(f[0]) + ':</b> ' + esc(f[1]) + '</span>'; }).join('') + '</div>' +
      (lines.length ? '<table><tr><th>#</th><th>Description</th><th>HSN/SAC</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>' +
        lines.map(function (l, i) { return '<tr><td>' + (i + 1) + '</td><td>' + esc(l[0]) + '</td><td>' + esc(l[1]) + '</td><td>' + esc(l[2]) + '</td><td>' + esc(l[3]) + '</td><td>' + esc(l[4]) + '</td></tr>'; }).join('') + '</table>' : '') +
      (d.totals ? '<div class="dl" style="margin-top:8px">' + d.totals.map(function (f) { return '<span><b>' + esc(f[0]) + ':</b> ' + esc(f[1]) + '</span>'; }).join('') + '</div>' : '') +
      (d.stamp ? '<span class="stamp">' + esc(d.stamp) + '</span>' : '') + '</div>';
  }

  /* ------------------------------------------------------------ status history, steps, process strip */
  function timeline(o) {
    o = o || {};
    var c = o.columns || ['Status', 'Action date', 'Action', 'Hold / rejection reason'];
    return '<table class="k-tl"' + E(o.eid) + '><thead><tr>' + c.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      (o.rows || []).map(function (r) {
        var st = r.state || 'pending';
        return '<tr class="' + cls(st === 'current' && 'is-current') + '"' + E(r.eid) + '><td><span class="' + cls('st', st) + '"><i></i>' + esc(r.status) + '</span>' +
          (r.info ? ' <span data-tip="' + esc(r.info) + '">' + icon('info') + '</span>' : '') + '</td><td>' + esc(r.date || '') + '</td><td>' + (r.action || '') + '</td><td>' + (r.reason || '') + '</td></tr>';
      }).join('') + '</tbody></table>';
  }
  function steps(o) {
    o = o || {};
    return '<ol class="k-steps"' + E(o.eid) + '>' + (o.items || []).map(function (s, i) {
      return '<li class="' + cls(s.state) + '"' + E(s.eid) + '><i>' + (s.state === 'done' ? '&#10003;' : i + 1) + '</i><div>' + esc(s.label) + (s.sub ? '<small>' + s.sub + '</small>' : '') + '</div></li>';
    }).join('') + '</ol>';
  }
  function flow(o) {
    o = o || {};
    return '<div class="k-flow"' + E(o.eid) + '>' + (o.items || []).map(function (s) {
      return '<div class="' + cls(s.state) + '"' + E(s.eid) + '><b>' + esc(s.label) + '</b>' + (s.text || '') + '</div>';
    }).join('') + '</div>';
  }

  /* ------------------------------------------------------------ upload, checklist, key-value, list */
  function upload(o) {
    o = o || {};
    return '<div class="k-field"' + E(o.eid) + '>' + (o.label ? '<label class="k-flabel">' + esc(o.label) + (o.required ? '<span class="k-req">*</span>' : '') + '</label>' : '') +
      '<div class="k-drop" data-toast="File picker opens here">' + icon('upload', 'lg') + '<div>Drag and drop files here or <b>browse</b></div>' +
      (o.hint ? '<div class="k-small k-drop-hint">' + o.hint + '</div>' : '') + '</div>' +
      (o.files && o.files.length ? '<ul class="k-files">' + o.files.map(function (f) {
        return '<li' + E(f.eid) + '>' + icon(f.icon || 'doc') + '<span class="k-grow">' + esc(f.name) + (f.meta ? ' <span class="k-muted k-small">' + f.meta + '</span>' : '') + '</span>' +
          (f.status || '') + '<span class="k-rowacts">' + icon('trash') + '</span></li>';
      }).join('') + '</ul>' : '') + '</div>';
  }
  var RES = { pass: ['check', 'Passed'], fail: ['x', 'Failed'], manual: ['eye', 'Manual check'], na: ['minus', 'Not applicable'], warn: ['alert', 'Warning'] };
  function result(r, text) { var m = RES[r] || RES.na; return '<span class="' + cls('k-res', r === 'warn' ? 'manual' : r) + '">' + icon(m[0]) + esc(text || m[1]) + '</span>'; }
  function checklist(o) {
    o = o || {};
    var c = o.columns || ['#', 'Check', 'Compared against', 'Result', 'Detail'];
    return '<table class="k-chk"' + E(o.eid) + '><thead><tr>' + c.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      (o.rows || []).map(function (r, i) {
        return '<tr' + E(r.eid) + '><td>' + (r.no || i + 1) + '</td><td>' + r.check + '</td><td class="k-muted">' + (r.source || '') + '</td><td>' + result(r.result, r.resultText) + '</td><td>' + (r.detail || '') + '</td></tr>';
      }).join('') + '</tbody></table>';
  }
  function kv(o) {
    o = o || {};
    var c = o.cols === 2 ? 'c2' : o.cols === 4 ? 'c4' : '';
    return '<div class="' + cls('k-kv', c) + '"' + E(o.eid) + '>' + (o.items || []).filter(Boolean).map(function (it) {
      return '<div' + E(it[2]) + '><span>' + esc(it[0]) + '</span><b>' + (it[1] == null || it[1] === '' ? '&ndash;' : it[1]) + '</b></div>';
    }).join('') + '</div>';
  }
  function list(o) {
    o = o || {};
    if (!(o.items || []).length) return '<div class="k-empty"' + E(o.eid) + '>' + esc(o.empty || 'Nothing here') + '</div>';
    return '<ul class="k-list"' + E(o.eid) + '>' + o.items.map(function (it) {
      return '<li class="' + cls(it.unread && 'unread') + '"' + E(it.eid) + B(it) + '>' + (it.icon ? '<span class="k-muted">' + icon(it.icon, 'lg') + '</span>' : '') +
        '<div class="k-grow"><div>' + it.title + '</div>' + (it.text ? '<div class="k-muted">' + it.text + '</div>' : '') + '</div>' +
        (it.meta ? '<span class="k-muted k-small">' + it.meta + '</span>' : '') + (it.right ? join(arr(it.right)) : '') + '</li>';
    }).join('') + '</ul>';
  }

  /* ------------------------------------------------------------ charts (inline SVG)
     Marks carry series colour; text uses ink tokens. Legend when 2+ series. Every chart
     has a table view. Bars are <=24px thick with a 4px rounded data end. */
  var SLOTS = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)', 'var(--s5)', 'var(--s6)'];
  // round-number axis: step is 1, 2 or 5 x 10^k, about `target` steps, max = a whole number of steps
  function niceScale(v, target) {
    target = target || 4;
    if (!(v > 0)) return { max: 1, step: 0.25, n: 4 };
    var raw = v / target, e = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / e;
    var step = (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * e;
    var n = Math.ceil(v / step - 1e-9);
    return { max: step * n, step: step, n: n };
  }
  function niceMax(v) { return niceScale(v).max; }
  function barPath(x, y, w, h, r, horiz) {
    r = Math.min(r, horiz ? h / 2 : w / 2, horiz ? w : h);
    if (h <= 0 || w <= 0) return '';
    if (horiz) return 'M' + x + ',' + y + 'h' + (w - r) + 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + r + 'v' + (h - 2 * r) + 'a' + r + ',' + r + ' 0 0 1 -' + r + ',' + r + 'h-' + (w - r) + 'z';
    return 'M' + x + ',' + (y + h) + 'v-' + (h - r) + 'a' + r + ',' + r + ' 0 0 1 ' + r + ',-' + r + 'h' + (w - 2 * r) + 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + r + 'v' + (h - r) + 'z';
  }
  var chartSeq = 0;
  function chart(o) {
    o = o || {};
    var id = 'ch' + (++chartSeq), type = o.type || 'column', cats = o.categories || [], series = o.series || [];
    var fmt = o.fmt || function (v) { return compact(v); };
    var W = o.width || 560, H = o.height || 230, padL = type === 'bar' ? (o.labelWidth || 130) : 44, padR = type === 'bar' ? 60 : 16, padT = 18, padB = 34;
    var iw = W - padL - padR, ih = H - padT - padB, svg = '';
    var colour = function (s, i) { return SLOTS[(s.slot != null ? s.slot : i) % SLOTS.length]; };
    var tipOf = function (c, s, v) { return c + (series.length > 1 ? ' - ' + s.name : '') + ': ' + fmt(v) + (o.unit ? ' ' + o.unit : ''); };
    if (type === 'bar') {
      var s0 = series[0] || { data: [] }, mx = niceMax(Math.max.apply(null, s0.data.concat([0]))), band = ih / Math.max(cats.length, 1), bh = Math.min(20, band * 0.6);
      cats.forEach(function (c, i) {
        var v = s0.data[i] || 0, y = padT + i * band + (band - bh) / 2, w = iw * v / mx;
        svg += '<text x="' + (padL - 8) + '" y="' + (y + bh / 2 + 4) + '" text-anchor="end">' + esc(c) + '</text>';
        svg += '<path class="mark" d="' + barPath(padL, y, Math.max(w, 1), bh, 4, true) + '" fill="' + colour(s0, 0) + '" data-tip="' + esc(tipOf(c, s0, v)) + '"/>';
        svg += '<text class="val" x="' + (padL + w + 6) + '" y="' + (y + bh / 2 + 4) + '">' + esc(fmt(v)) + '</text>';
      });
      svg += '<line class="axis" x1="' + padL + '" x2="' + padL + '" y1="' + padT + '" y2="' + (padT + ih) + '"/>';
    } else {
      var stacked = type === 'stacked', totals = cats.map(function (_, i) { return series.reduce(function (a, s) { return a + (s.data[i] || 0); }, 0); });
      var vmax = stacked ? Math.max.apply(null, totals.concat([0])) : Math.max.apply(null, series.reduce(function (a, s) { return a.concat(s.data); }, [0]));
      var sc = niceScale(vmax), mxv = sc.max, band2 = iw / Math.max(cats.length, 1);
      for (var g = 0; g <= sc.n; g++) {
        var gy = padT + ih - ih * g / sc.n;
        svg += '<line class="' + (g ? 'grid' : 'axis') + '" x1="' + padL + '" x2="' + (padL + iw) + '" y1="' + gy + '" y2="' + gy + '"/>';
        svg += '<text x="' + (padL - 6) + '" y="' + (gy + 4) + '" text-anchor="end">' + esc(fmt(sc.step * g)) + '</text>';
      }
      cats.forEach(function (c, i) {
        svg += '<text x="' + (padL + band2 * i + band2 / 2) + '" y="' + (H - 12) + '" text-anchor="middle">' + esc(c) + '</text>';
      });
      if (type === 'line') {
        var ends = [];
        series.forEach(function (s, si) {
          var pts = s.data.map(function (v, i) { return [padL + band2 * i + band2 / 2, padT + ih - ih * v / mxv]; });
          svg += '<path d="M' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join('L') + '" fill="none" stroke="' + colour(s, si) + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>';
          pts.forEach(function (p, i) {
            svg += '<circle class="mark" cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i === pts.length - 1 ? 4 : 3) + '" fill="' + colour(s, si) + '" stroke="#fff" stroke-width="2" data-tip="' + esc(tipOf(cats[i], s, s.data[i])) + '"/>';
          });
          var lp = pts[pts.length - 1];
          if (lp) ends.push({ x: lp[0], y: lp[1], t: fmt(s.data[s.data.length - 1]) });
        });
        // end labels only when they do not collide; otherwise the legend and tooltips carry identity
        var clash = ends.some(function (a, i) { return ends.some(function (b, j) { return i !== j && Math.abs(a.y - b.y) < 13; }); });
        if (!clash && ends.length <= 4) ends.forEach(function (e) { svg += '<text class="val" x="' + (e.x + 8) + '" y="' + (e.y + 4) + '">' + esc(e.t) + '</text>'; });
      } else {
        var n = stacked ? 1 : series.length, bw = Math.min(24, (band2 * 0.7) / n);
        cats.forEach(function (c, i) {
          var x0 = padL + band2 * i + (band2 - bw * n - (n - 1) * 2) / 2, base = padT + ih;
          series.forEach(function (s, si) {
            var v = s.data[i] || 0, h = ih * v / mxv;
            if (stacked) {
              var top = si === series.length - 1 || series.slice(si + 1).every(function (t) { return !(t.data[i] > 0); });
              var gap = si > 0 ? 2 : 0;
              if (h > gap) svg += '<path class="mark" d="' + (top ? barPath(x0, base - h + gap, bw, h - gap, 4) : 'M' + x0 + ',' + (base - h + gap) + 'h' + bw + 'v' + (h - gap) + 'h-' + bw + 'z') + '" fill="' + colour(s, si) + '" data-tip="' + esc(tipOf(c, s, v)) + '"/>';
              base -= h;
            } else {
              var x = x0 + si * (bw + 2);
              svg += '<path class="mark" d="' + barPath(x, base - h, bw, Math.max(h, 1), 4) + '" fill="' + colour(s, si) + '" data-tip="' + esc(tipOf(c, s, v)) + '"/>';
              if (n === 1) svg += '<text class="val" x="' + (x + bw / 2) + '" y="' + (base - h - 5) + '" text-anchor="middle">' + esc(fmt(v)) + '</text>';
            }
          });
          if (stacked) svg += '<text class="val" x="' + (x0 + bw / 2) + '" y="' + (base - 5) + '" text-anchor="middle">' + esc(fmt(totals[i])) + '</text>';
        });
      }
    }
    var legend = series.length > 1 ? '<div class="k-legend">' + series.map(function (s, i) { return '<span><i style="background:' + colour(s, i) + '"></i>' + esc(s.name) + '</span>'; }).join('') + '</div>' : '';
    var tbl = '<table class="k-table"><thead><tr><th></th>' + series.map(function (s) { return '<th class="num">' + esc(s.name) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      cats.map(function (c, i) { return '<tr><td>' + esc(c) + '</td>' + series.map(function (s) { var v = s.data[i] || 0; return '<td class="num">' + esc(inr(v, v % 1 ? 2 : 0)) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
    return '<div class="k-chart"' + E(o.eid) + '><div class="k-chart-head"><span class="k-chart-title">' + esc(o.title || '') + (o.unit ? ' <span class="k-muted k-small">(' + esc(o.unit) + ')</span>' : '') + '</span>' + legend +
      '<a class="k-textlink" data-chart-table="' + id + '">' + icon('list') + 'Table view</a></div>' +
      '<div data-chart-view="' + id + '"><svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.title || 'chart') + '">' + svg + '</svg></div>' +
      '<div data-chart-tbl="' + id + '" hidden>' + tbl + '</div></div>';
  }

  /* ------------------------------------------------------------ sign-in pieces */
  function otp(o) { o = o || {}; var v = String(o.value || ''); var s = ''; for (var i = 0; i < (o.length || 6); i++) s += '<span>' + esc(v.charAt(i) || '') + '</span>'; return '<div class="k-field"' + E(o.eid) + '>' + (o.label ? '<label class="k-flabel">' + esc(o.label) + '</label>' : '') + '<div class="k-otp">' + s + '</div>' + (o.hint ? '<div class="k-fhint">' + o.hint + '</div>' : '') + (o.error ? '<div class="k-ferr">' + icon('alert') + '<span>' + o.error + '</span></div>' : '') + '</div>'; }
  function msButton(o) {
    o = o || {};
    return '<span class="k-ms"' + E(o.eid) + B(o) + '><i><b style="background:#F25022"></b><b style="background:#7FBA00"></b><b style="background:#00A4EF"></b><b style="background:#FFB900"></b></i>' + esc(o.label || 'Sign in with Microsoft') + '</span>';
  }
  function or(text) { return '<div class="k-or">' + esc(text || 'or') + '</div>'; }

  /* ------------------------------------------------------------ shells */
  function footer() {
    return '<footer class="sh-footer"><span>Help Center</span><span>Visit airtel.in</span><span class="sh-topsp"></span><small>Airtel India &middot; All Rights Reserved</small></footer>';
  }
  function topbar(o) {
    return '<div class="sh-top"' + E('shell.top') + '><span class="sh-hi">Hi, ' + esc(o.user || '') + '</span>' + (o.role ? '<span class="sh-role">' + esc(o.role) + '</span>' : '') +
      '<span class="sh-topsp"></span>' + join((o.icons || []).map(function (t) {
        return '<span class="sh-topicon"' + E(t.eid) + B(t) + '>' + icon(t.icon, 'lg') + (t.badge ? badge(t.badge) : '') + '<span>' + esc(t.label) + '</span></span>';
      })) + '</div>';
  }
  function railTitle(r) {
    return '<div class="sh-railtitle"' + E('shell.railtitle') + '>' + (r.back ? '<span class="sh-back" data-go="' + esc(r.back) + '" data-tip="Back"><svg viewBox="0 0 44 26" aria-hidden="true"><path d="M43 13H2M11 4l-9 9 9 9"/></svg></span>' : '') +
      '<h1>' + esc(r.title || '') + (r.accent ? '<em>' + esc(r.accent) + '</em>' : '') + '</h1>' + (r.text ? '<p>' + r.text + '</p>' : '') + (r.extra || '') + '</div>';
  }
  // Partner layout: rail with invoice overview counts and red action links (PO Partner Portal pattern)
  function shellPartner(o) {
    var r = o.rail || {};
    var rail = r.mode === 'form' ? railTitle(r) :
      '<div class="sh-railsec"' + E('shell.overview') + '>Invoice overview <span data-tip="Counts of your non-PO invoices by status">' + icon('info') + '</span></div>' +
      (o.stats || []).map(function (s) {
        return '<a class="' + cls('sh-stat', s.active && 'is-active') + '"' + E(s.eid) + ' data-go="' + esc(s.go) + '"><b>' + esc(s.value) + '</b><span>' + esc(s.label) + '</span></a>';
      }).join('') +
      '<div class="sh-links"' + E('shell.links') + '>' + (o.links || []).map(function (l) {
        return '<a' + E(l.eid) + ' data-go="' + esc(l.go) + '"' + (l.active ? ' class="is-active"' : '') + '>' + esc(l.label) + '</a>';
      }).join('') + '</div>';
    return frame(o, rail);
  }
  function frame(o, rail) {
    var form = (o.rail || {}).mode === 'form';
    return '<div class="sh"><aside class="sh-rail">' + (form ? '' : '<a class="sh-logo" data-go="' + esc(o.home) + '"><img src="' + o.logo + '" alt="airtel partners"></a>') + rail + '</aside>' +
      '<div class="sh-main">' + (form ? '' : topbar(o)) + '<main class="sh-content">' + o.content + '</main>' + (form ? '' : footer()) + '</div></div>';
  }
  // Internal layout: rail with grouped menu (PO Portal internal pattern)
  function shellInternal(o) {
    var r = o.rail || {};
    var rail = r.mode === 'form' ? railTitle(r) : (o.menu || []).map(function (g) {
      return (g.group ? '<div class="sh-group">' + esc(g.group) + '</div>' : '') + g.items.map(function (it) {
        return '<a class="' + cls('sh-item', it.active && 'is-active') + '"' + E(it.eid) + ' data-go="' + esc(it.go) + '">' + (it.icon ? icon(it.icon) : '') + '<span>' + esc(it.label) + '</span>' + (it.badge ? badge(it.badge) : '') + '</a>';
      }).join('');
    }).join('');
    return frame(o, rail);
  }
  function shellPlain(o) { return '<div class="sh-plain">' + o.content + '</div>'; }

  G.UI = {
    ctx: ctx, esc: esc, cls: cls, join: join, icon: icon, icons: Object.keys(P),
    inr: inr, rs: rs, compact: compact,
    p: p, subhead: subhead, divider: divider, row: row, stack: stack, grow: grow, cols: cols, grid: grid,
    page: page, section: section, box: box,
    field: field, check: check, options: options,
    button: button, btns: btns, textlink: textlink, link: link, sticky: sticky,
    status: status, chip: chip, badge: badge, tbc: tbc, dot: dot, result: result,
    filters: filters, table: table, tabs: tabs, cards: cards, kpis: kpis,
    alert: alert, note: note, reqChip: reqChip, modal: modal, drawer: drawer,
    split: split, pdf: pdf, docMock: docMock,
    timeline: timeline, steps: steps, flow: flow,
    upload: upload, checklist: checklist, kv: kv, list: list, chart: chart,
    otp: otp, msButton: msButton, or: or,
    footer: footer,
    shell: { partner: shellPartner, internal: shellInternal, plain: shellPlain }
  };
})(window);
