/* Shared sidebar + topbar injection for LayBys.com Merchant App */
(function(){
  const ICONS = {
    dashboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>',
    products:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    laybys:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="8" cy="15" r="1.5" fill="currentColor"/><line x1="13" y1="15" x2="18" y2="15"/></svg>',
    payouts:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    exceptions:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    customers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    help:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
  };

  const NAV = [
    { section: 'OVERVIEW', items: [
      { id:'dashboard', label:'Dashboard', href:'dashboard.html', icon:'dashboard' }
    ]},
    { section: 'SELL', items: [
      { id:'products', label:'Products', href:'products.html', icon:'products' },
      { id:'laybys', label:'Orders & Lay-Bys', href:'laybys.html', icon:'laybys', badge:'47' }
    ]},
    { section: 'MONEY', items: [
      { id:'payouts', label:'Payouts', href:'payouts.html', icon:'payouts' },
      { id:'exceptions', label:'Exceptions', href:'exceptions.html', icon:'exceptions', badge:'3' }
    ]},
    { section: 'CUSTOMERS', items: [
      { id:'customers', label:'Customers', href:'customers.html', icon:'customers' }
    ]},
    { section: 'ACCOUNT', items: [
      { id:'settings', label:'Settings', href:'settings.html', icon:'settings' }
    ]}
  ];

  function renderSidebar(active){
    const sections = NAV.map(sec => {
      const items = sec.items.map(it => {
        const cls = 'sidebar-link' + (it.id===active ? ' active' : '');
        const badge = it.badge ? `<span class="badge">${it.badge}</span>` : '';
        return `<a class="${cls}" href="${it.href}">${ICONS[it.icon]}<span>${it.label}</span>${badge}</a>`;
      }).join('');
      return `<div class="sidebar-section"><div class="sidebar-section-title">${sec.section}</div>${items}</div>`;
    }).join('');

    return `
      <div class="sidebar-brand">
        <svg class="sidebar-brand-logo" viewBox="0 0 132 38" xmlns="http://www.w3.org/2000/svg" aria-label="LayBys">
          <defs>
            <linearGradient id="lb-bys" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stop-color="#5fa6ff"/>
              <stop offset="1" stop-color="#8fc8ff"/>
            </linearGradient>
          </defs>
          <text x="0" y="29" font-family="'Inter','Segoe UI',-apple-system,Roboto,sans-serif" font-weight="800" font-size="30" letter-spacing="-1.4">
            <tspan fill="#ffffff">Lay</tspan><tspan fill="url(#lb-bys)">Bys</tspan><tspan fill="#f0bf41">.</tspan>
          </text>
        </svg>
        <div class="sidebar-brand-text"><small>TechZone Australia</small><span class="sidebar-app-tag">Merchant</span></div>
      </div>
      <nav class="sidebar-nav">${sections}</nav>
      <div class="sidebar-foot">
        <div class="sidebar-foot-avatar">MT</div>
        <div style="flex:1;min-width:0">
          <div class="sidebar-foot-name">Marcus Tanaka</div>
          <div class="sidebar-foot-role">Operations Director</div>
        </div>
      </div>
    `;
  }

  function renderTopbar(title, sub){
    return `
      <div class="topbar-title">${title}${sub ? `<small>${sub}</small>` : ''}</div>
      <div class="topbar-spacer"></div>
      <div class="topbar-search">
        ${ICONS.search}
        <input placeholder="Search products, customers, lay-bys…" />
      </div>
      <button class="topbar-icon-btn" title="Help">${ICONS.help}</button>
      <button class="topbar-icon-btn" title="Notifications"><span class="dot"></span>${ICONS.bell}</button>
    `;
  }

  window.LBMerchant = {
    mount(active, title, sub){
      const sb = document.getElementById('sidebar');
      const tb = document.getElementById('topbar');
      if (sb) sb.innerHTML = renderSidebar(active);
      if (tb) tb.innerHTML = renderTopbar(title || '', sub || '');
    }
  };
})();
