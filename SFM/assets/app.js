/* Shared lightweight interaction helpers for the SFM demo */

function showView(viewId, navSelector) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');

  document.querySelectorAll(navSelector || '.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.view === viewId);
  });

  window.scrollTo({ top: 0, behavior: 'instant' });
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}

document.addEventListener('click', e => {
  if (e.target.classList && e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

function setAttendancePill(btn) {
  const row = btn.closest('.att-row, .att-card');
  if (!row) return;
  row.querySelectorAll('.att-pill').forEach(p => {
    p.classList.remove('active-present','active-late','active-absent');
  });
  const state = btn.dataset.state;
  if (state === 'present') btn.classList.add('active-present');
  if (state === 'late')    btn.classList.add('active-late');
  if (state === 'absent')  btn.classList.add('active-absent');
}

function switchTab(tabEl, group) {
  const bar = tabEl.closest('.tab-bar');
  if (bar) bar.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tabEl.classList.add('active');

  if (group && tabEl.dataset.target) {
    document.querySelectorAll(`[data-tab-group="${group}"]`).forEach(panel => {
      panel.style.display = panel.id === tabEl.dataset.target ? '' : 'none';
    });
  }
}

function selectChild(el) {
  document.querySelectorAll('.child-tab').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

function selectChip(el) {
  const row = el.closest('.chip-row');
  if (!row) return;
  if (row.dataset.multi !== "true") {
    row.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  }
  el.classList.toggle('active');
}

/* Working filter — flips chip active state AND hides/shows rows by data attribute */
function filterByChip(chipEl, listSelector, attrName) {
  const row = chipEl.closest('.chip-row');
  if (!row) return;
  row.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  chipEl.classList.add('active');
  const value = chipEl.dataset.value;
  document.querySelectorAll(listSelector).forEach(item => {
    if (!value || value === 'all') {
      item.style.display = '';
    } else {
      const itemVal = (item.dataset[attrName] || '').toString();
      item.style.display = itemVal === value ? '' : 'none';
    }
  });
}

/* Toggle filter (multi-select). Returns array of active values */
function toggleFilterChip(chipEl, listSelector, attrName) {
  const row = chipEl.closest('.chip-row');
  if (!row) return;
  // "All" chip resets others
  if (chipEl.dataset.value === 'all') {
    row.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chipEl.classList.add('active');
  } else {
    row.querySelector('.chip[data-value="all"]')?.classList.remove('active');
    chipEl.classList.toggle('active');
    if (!row.querySelector('.chip.active')) row.querySelector('.chip[data-value="all"]')?.classList.add('active');
  }
  const activeValues = Array.from(row.querySelectorAll('.chip.active')).map(c => c.dataset.value);
  document.querySelectorAll(listSelector).forEach(item => {
    if (activeValues.includes('all') || activeValues.length === 0) {
      item.style.display = '';
    } else {
      const itemVal = (item.dataset[attrName] || '').toString();
      item.style.display = activeValues.includes(itemVal) ? '' : 'none';
    }
  });
}

/* Free-text search within a list */
function searchList(inputEl, listSelector, attrNames) {
  const q = inputEl.value.toLowerCase().trim();
  document.querySelectorAll(listSelector).forEach(item => {
    if (!q) { item.style.display = ''; return; }
    const haystack = attrNames.map(a => (item.dataset[a] || '').toString().toLowerCase()).join(' ');
    item.style.display = haystack.includes(q) ? '' : 'none';
  });
}

/* Multi-step modal navigation (use modal-scoped IDs) */
const WIZARD_STATE = {};
function gotoStep(modalId, n) {
  const total = parseInt(document.getElementById(modalId).dataset.totalSteps || '4', 10);
  WIZARD_STATE[modalId] = n;
  for (let i = 1; i <= total; i++) {
    const stepEl = document.getElementById(`${modalId}-step-${i}`);
    const tabEl  = document.getElementById(`${modalId}-tab-${i}`);
    if (stepEl) stepEl.classList.toggle('active', i === n);
    if (tabEl) {
      tabEl.classList.toggle('active', i === n);
      tabEl.classList.toggle('done', i < n);
    }
  }
  const backBtn = document.getElementById(`${modalId}-back`);
  const nextBtn = document.getElementById(`${modalId}-next`);
  const saveBtn = document.getElementById(`${modalId}-save`);
  if (backBtn) backBtn.style.display = n === 1 ? 'none' : '';
  if (nextBtn) nextBtn.style.display = n === total ? 'none' : '';
  if (saveBtn) saveBtn.style.display = n === total ? '' : 'none';
}
function wizardNext(modalId) {
  const current = WIZARD_STATE[modalId] || 1;
  const total = parseInt(document.getElementById(modalId).dataset.totalSteps || '4', 10);
  if (current < total) gotoStep(modalId, current + 1);
}
function wizardPrev(modalId) {
  const current = WIZARD_STATE[modalId] || 1;
  if (current > 1) gotoStep(modalId, current - 1);
}
function resetWizard(modalId) { gotoStep(modalId, 1); }

/* Drill-in view navigation with back-history per main view */
const VIEW_HISTORY = [];
function showDetailView(targetId, fromId) {
  if (fromId) VIEW_HISTORY.push(fromId);
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(targetId);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function goBackView(fallback) {
  const prev = VIEW_HISTORY.pop() || fallback;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(prev);
  if (target) target.classList.add('active');
  // Reflect in sidebar if it's a main view
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.view === prev);
  });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* Toggle collapse on attendance team cards */
function toggleCollapse(headerEl) {
  const card = headerEl.closest('.att-team-card');
  if (card) card.classList.toggle('collapsed');
}

/* Toggle a toggle-switch */
function flipToggle(el) { el.classList.toggle('off'); }

/* Open the full-page Add Swimmer wizard — preserves the current view as the back target */
function openAddSwimmer() {
  const currentView = document.querySelector('.view.active');
  const fromId = currentView ? currentView.id : 'view-members';
  showDetailView('view-add-swimmer', fromId);
  resetWizard('view-add-swimmer');
}
