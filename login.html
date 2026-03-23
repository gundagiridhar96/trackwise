// ================================================================
//  TrackWise — App Engine (clean rewrite, no duplicate declarations)
// ================================================================

const fmt = (n) => APP_CONFIG.currency + Math.abs(n).toLocaleString(APP_CONFIG.locale);

// ── Current user & DB key ─────────────────────────────────────
// _user is injected by index.html <script> before this file loads
const _me    = (typeof _user !== 'undefined' && _user) ? _user : AUTH.getSession();
const _email = _me ? _me.email : null;

// ── Per-user DB helpers ───────────────────────────────────────
function dbLoad()          { return _email ? AUTH.loadTx(_email) : []; }
function dbSave()          { if (_email) AUTH.saveTx(_email, state.transactions); }
function dbAdd(tx)         { state.transactions.unshift(tx); dbSave(); }
function dbDelete(id)      { state.transactions = state.transactions.filter(t => t.id !== id); dbSave(); }
function dbUpdate(id, p)   { state.transactions = state.transactions.map(t => t.id === id ? {...t, ...p} : t); dbSave(); }
function dbClear()         { state.transactions = []; dbSave(); }

// ── App State ─────────────────────────────────────────────────
const state = {
  period:       '30D',
  activeCat:    'all',
  searchQuery:  '',
  txFilter:     'all',
  activeView:   'dashboard',
  transactions: [],
};

// ── Date helpers ──────────────────────────────────────────────
const TODAY = new Date();

function cutoff(period) {
  const d = new Date(TODAY);
  if (period === '7D')   { d.setDate(d.getDate() - 7);   return d; }
  if (period === '30D')  { d.setDate(d.getDate() - 30);  return d; }
  if (period === '90D')  { d.setDate(d.getDate() - 90);  return d; }
  if (period === 'YTD')  { return new Date(TODAY.getFullYear(), 0, 1); }
  if (period === 'LAST') { return new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, 1); }
  return new Date(0);
}

function toDate(tx) {
  if (tx.dateObj) {
    const d = new Date(tx.dateObj);
    return isNaN(d) ? new Date() : d;
  }
  const months = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
  const p = (tx.date || '').split(' ');
  if (p.length === 2 && months[p[0]] !== undefined) {
    return new Date(TODAY.getFullYear(), months[p[0]], parseInt(p[1]));
  }
  return new Date();
}

function getFilteredTx() {
  if (state.period === 'LAST') return LAST_MONTH_TRANSACTIONS;
  const c = cutoff(state.period);
  return state.transactions.filter(t => toDate(t) >= c);
}

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  state.transactions = dbLoad();
  initUserBadge();
  initKPIs();
  initChart();
  initCategoryDonut();
  initTransactions();
  initRelationGraph();
  initInsights();
  initTagCloud();
  initHeatmap();
  initSidebar();
  initSearch();
  initBudgetBar();
  checkThreshold();
});

// ── User Badge & Menu ─────────────────────────────────────────
function initUserBadge() {
  const el = document.getElementById('userInitials');
  if (el) el.textContent = APP_CONFIG.userInitials || 'U';
  const nm = document.getElementById('menuName');
  const bm = document.getElementById('menuBudget');
  if (nm) nm.textContent = APP_CONFIG.userName || 'User';
  if (bm) bm.textContent = 'Budget: ' + fmt(APP_CONFIG.monthlyBudget);
}

function toggleUserMenu() {
  const m = document.getElementById('userMenu');
  if (m) m.style.display = (m.style.display === 'none' || !m.style.display) ? 'block' : 'none';
}

document.addEventListener('click', e => {
  const menu = document.getElementById('userMenu');
  const av   = document.getElementById('userInitials');
  if (menu && av && !av.contains(e.target) && !menu.contains(e.target))
    menu.style.display = 'none';
});

// ── KPI Cards ─────────────────────────────────────────────────
function initKPIs() {
  const txs      = getFilteredTx();
  const spent    = txs.reduce((a,t) => a + (t.amount < 0 ? Math.abs(t.amount) : 0), 0);
  const rels     = txs.filter(t => t.tags && t.tags.length).reduce((a,t) => a + t.tags.length, 0);
  const flags    = txs.filter(t => t.status === 'flagged').length;
  const daysMap  = {'7D':7,'30D':30,'90D':90,'YTD':Math.ceil((TODAY - new Date(TODAY.getFullYear(),0,1))/86400000),'LAST':28};
  const days     = daysMap[state.period] || 30;
  const avgDaily = txs.length ? Math.round(spent / days) : 0;

  const lmSpent  = LAST_MONTH_TRANSACTIONS.reduce((a,t) => a + (t.amount < 0 ? Math.abs(t.amount) : 0), 0);
  const delta    = lmSpent > 0 ? ((spent - lmSpent) / lmSpent * 100).toFixed(1) : 0;
  const dir      = spent <= lmSpent ? 'down' : 'up';
  const deltaStr = (dir === 'down' ? '▼ ' : '▲ ') + Math.abs(delta) + '%';

  [
    { id:'kpi-spent',     val: fmt(spent),    d: deltaStr,                                      dn: dir,   note:'vs last month' },
    { id:'kpi-relations', val: rels,           d: rels > 0 ? '▲ '+rels : '─ 0',                dn:'up',   note:'tag links'     },
    { id:'kpi-anomalies', val: flags,          d: flags > 0 ? '⚠ '+flags : '✓ 0',              dn: flags ? 'up':'down', note:'flagged' },
    { id:'kpi-daily',     val: fmt(avgDaily),  d: '─',                                          dn:'down', note:state.period   },
  ].forEach(k => {
    const el = document.getElementById(k.id);
    if (!el) return;
    el.querySelector('.kpi-value').textContent = k.val;
    el.querySelector('.kpi-delta').innerHTML = `<span class="delta-${k.dn}">${k.d}</span><span>${k.note}</span>`;
    const pl = el.querySelector('.kpi-sparkline polyline');
    if (pl) pl.setAttribute('points', SPARKLINES[k.id.replace('kpi-','')] || '');
  });
}

// ── Budget Threshold Warning ──────────────────────────────────
function checkThreshold() {
  const src    = state.period === 'LAST' ? LAST_MONTH_TRANSACTIONS : state.transactions;
  const spent  = src.reduce((a,t) => a + (t.amount < 0 ? Math.abs(t.amount) : 0), 0);
  const pct    = APP_CONFIG.monthlyBudget > 0 ? (spent / APP_CONFIG.monthlyBudget * 100) : 0;
  const banner = document.getElementById('thresholdBanner');
  const msg    = document.getElementById('thresholdMsg');
  if (!banner || !msg) return;

  if (pct >= 100) {
    msg.innerHTML = `🚨 <strong>Budget Exceeded!</strong> Spent ${fmt(spent)} — ${fmt(spent - APP_CONFIG.monthlyBudget)} over your ${fmt(APP_CONFIG.monthlyBudget)} limit.`;
    banner.className = 'threshold-banner danger';
    banner.style.display = 'flex';
  } else if (pct >= 80) {
    msg.innerHTML = `⚠️ <strong>Warning:</strong> ${Math.round(pct)}% used (${fmt(spent)} of ${fmt(APP_CONFIG.monthlyBudget)}).`;
    banner.className = 'threshold-banner warning';
    banner.style.display = 'flex';
  } else if (pct >= 60) {
    msg.innerHTML = `💡 <strong>Heads up:</strong> ${Math.round(pct)}% of budget used · ${fmt(APP_CONFIG.monthlyBudget - spent)} remaining.`;
    banner.className = 'threshold-banner info';
    banner.style.display = 'flex';
  } else {
    banner.style.display = 'none';
  }
}

// ── Chart ─────────────────────────────────────────────────────
let chartSvg = null;
let activeLines = { actual: true, forecast: false, budget: false };

function initChart() {
  chartSvg = document.getElementById('chartSvg');
  if (!chartSvg) return;
  renderChart();
  document.querySelectorAll('.chart-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      activeLines[btn.dataset.mode] = btn.classList.contains('active');
      renderChart();
    });
  });
}

function buildChartData() {
  const isLast = state.period === 'LAST';
  const src    = isLast ? LAST_MONTH_TRANSACTIONS : getFilteredTx();
  const nDays  = {LAST:28,'7D':7,'30D':30,'90D':90,'YTD':Math.ceil((TODAY-new Date(TODAY.getFullYear(),0,1))/86400000)}[state.period]||30;

  const actual = Array(nDays).fill(0);
  src.forEach(t => {
    if (t.amount >= 0) return;
    const d = toDate(t);
    let idx;
    if (isLast) {
      idx = Math.min(Math.max(d.getDate() - 1, 0), nDays - 1);
    } else {
      const diff = Math.floor((TODAY - d) / 86400000);
      idx = nDays - 1 - diff;
    }
    if (idx >= 0 && idx < nDays) actual[idx] += Math.abs(t.amount);
  });

  const prev = Array(nDays).fill(0);
  LAST_MONTH_TRANSACTIONS.forEach(t => {
    if (t.amount >= 0) return;
    const d   = toDate(t);
    const idx = Math.min(Math.floor((d.getDate() / 28) * nDays), nDays - 1);
    prev[idx] += Math.abs(t.amount);
  });

  const bpd = APP_CONFIG.monthlyBudget / 30;
  return { actual, prev, budget: Array(nDays).fill(Math.round(bpd)), nDays };
}

function renderChart() {
  if (!chartSvg) return;
  const W = 640, H = 170, pl = 50, pr = 12, pt = 14, pb = 20;
  const iW = W - pl - pr, iH = H - pt - pb;
  const { actual, prev, budget, nDays } = buildChartData();

  let all = [];
  if (activeLines.actual)   all = all.concat(actual);
  if (activeLines.forecast) all = all.concat(prev);
  if (activeLines.budget)   all = all.concat(budget);
  if (!all.length || !all.some(v => v > 0)) all = [5000];
  const maxV = Math.max(...all) * 1.2 || 5000;

  const X = i => (pl + (i / Math.max(nDays - 1, 1)) * iW).toFixed(1);
  const Y = v => (pt + iH - (v / maxV) * iH).toFixed(1);
  const pts  = a => a.map((v,i) => `${X(i)},${Y(v)}`).join(' ');
  const area = a => `M${X(0)},${Y(a[0])}${a.map((v,i)=>`L${X(i)},${Y(v)}`).join('')}L${X(nDays-1)},${pt+iH}L${pl},${pt+iH}Z`;

  let h = `<defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="var(--accent)" stop-opacity=".28"/>
    <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
  </linearGradient></defs>`;

  [.25,.5,.75,1].forEach(f => {
    const y = (pt + iH - f*iH).toFixed(1);
    h += `<line x1="${pl}" y1="${y}" x2="${W-pr}" y2="${y}" stroke="var(--border)" stroke-dasharray="4,4"/>`;
    h += `<text x="${pl-4}" y="${(parseFloat(y)+3).toFixed(1)}" text-anchor="end" font-family="DM Mono" font-size="9" fill="var(--muted)">${fmt(Math.round(maxV*f))}</text>`;
  });

  getXLabels(nDays).forEach(({lbl,i}) => {
    h += `<text x="${X(i)}" y="${H-2}" text-anchor="middle" font-family="DM Mono" font-size="9" fill="var(--muted)">${lbl}</text>`;
  });

  if (activeLines.actual) {
    h += `<path d="${area(actual)}" fill="url(#ag)"/>`;
    h += `<polyline points="${pts(actual)}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    const peak = Math.max(...actual);
    if (peak > 0) {
      const pi = actual.lastIndexOf(peak);
      h += `<circle cx="${X(pi)}" cy="${Y(peak)}" r="4" fill="var(--bg)" stroke="var(--accent)" stroke-width="2"/>`;
      h += `<text x="${X(pi)}" y="${(parseFloat(Y(peak))-7).toFixed(1)}" text-anchor="middle" font-family="DM Mono" font-size="9" fill="var(--accent)">${fmt(peak)}</text>`;
    } else {
      h += `<text x="${W/2}" y="${H/2}" text-anchor="middle" font-family="DM Mono" font-size="12" fill="var(--muted)" opacity=".7">No transactions yet — add one above!</text>`;
    }
  }
  if (activeLines.forecast)
    h += `<polyline points="${pts(prev)}" fill="none" stroke="var(--accent2)" stroke-width="1.5" stroke-dasharray="6,4"/>`;
  if (activeLines.budget)
    h += `<polyline points="${pts(budget)}" fill="none" stroke="var(--accent4)" stroke-width="1.5" stroke-dasharray="3,3"/>`;

  chartSvg.innerHTML = h;
  chartSvg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const sub = document.getElementById('chartSubtitle');
  const lbls = {'7D':'last 7 days','30D':'last 30 days','90D':'last 90 days','YTD':'year to date','LAST':'last month (Feb)'};
  if (sub) sub.textContent = 'Daily volume · ' + (lbls[state.period] || state.period);
}

function getXLabels(n) {
  if (state.period === '7D') {
    return Array.from({length:7},(_,i)=>{const d=new Date(TODAY);d.setDate(d.getDate()-(6-i));return{lbl:d.toLocaleDateString('en-IN',{day:'numeric',month:'short'}),i};});
  }
  if (state.period === '30D') {
    return [0,7,14,21,27,29].map(i=>{const d=new Date(TODAY);d.setDate(d.getDate()-(29-i));return{lbl:d.toLocaleDateString('en-IN',{day:'numeric',month:'short'}),i};});
  }
  if (state.period === '90D') {
    return [0,18,36,54,72,89].map(i=>{const d=new Date(TODAY);d.setDate(d.getDate()-(89-i));return{lbl:d.toLocaleDateString('en-IN',{day:'numeric',month:'short'}),i};});
  }
  if (state.period === 'YTD') {
    const ms=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'];
    const step=Math.floor(n/ms.length);
    return ms.slice(0,Math.ceil(n/step)).map((m,j)=>({lbl:m,i:Math.min(j*step,n-1)}));
  }
  return [0,7,14,21,27].map(i=>({lbl:'Feb '+(i+1),i:Math.min(i,n-1)}));
}

// ── Period buttons ────────────────────────────────────────────
function setPeriod(el, p) {
  state.period = p;
  document.querySelectorAll('.period-btn').forEach(b => {
    b.classList.remove('active');
    b.style.cssText = '';
  });
  el.classList.add('active');
  initKPIs(); renderChart(); renderTransactions();
  initCategoryDonut(); initBudgetBar(); checkThreshold();
  const lbls={'7D':'7 Days','30D':'30 Days','90D':'90 Days','YTD':'Year to Date','LAST':'Last Month'};
  showToast('Period: ' + (lbls[p] || p));
}

// ── Category Donut ────────────────────────────────────────────
function initCategoryDonut() {
  const txs    = getFilteredTx();
  const CAT_COLOR = {Food:'var(--accent)',Travel:'var(--accent2)',Shopping:'var(--accent4)',Health:'#a78bfa',Entertainment:'var(--accent3)',Utilities:'var(--muted2)'};
  const CAT_ICON  = {Food:'🍔',Travel:'✈️',Shopping:'🛒',Health:'💊',Entertainment:'🎮',Utilities:'⚡'};

  const map = {};
  txs.forEach(t => { if (t.amount < 0) map[t.cat] = (map[t.cat]||0) + Math.abs(t.amount); });
  const total = Object.values(map).reduce((a,b) => a+b, 0);
  const cats  = Object.entries(map).sort((a,b) => b[1]-a[1]).map(([n,a]) => ({n, a, pct:total>0?a/total*100:0, color:CAT_COLOR[n]||'var(--muted2)', icon:CAT_ICON[n]||'💸'}));

  const dEl = document.getElementById('donutTotal');
  if (dEl) dEl.textContent = total > 0 ? fmt(total) : '₹0';

  const svg = document.getElementById('donutSvg');
  if (!svg) return;

  if (!cats.length) {
    svg.innerHTML = `<circle cx="80" cy="80" r="60" fill="none" stroke="var(--surface2)" stroke-width="20"/>
      <text x="80" y="80" text-anchor="middle" dominant-baseline="middle" font-family="DM Mono" font-size="11" fill="var(--muted)">empty</text>`;
  } else {
    const R = 60, circ = 2*Math.PI*R;
    let off = 0, h = `<circle cx="80" cy="80" r="${R}" fill="none" stroke="var(--surface2)" stroke-width="20"/>`;
    cats.forEach(c => {
      const d = (c.pct/100)*circ;
      h += `<circle cx="80" cy="80" r="${R}" fill="none" stroke="${c.color}" stroke-width="20"
        stroke-dasharray="${d.toFixed(2)} ${(circ-d).toFixed(2)}"
        stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 80 80)"
        style="cursor:pointer" onclick="filterByCategory('${c.n}')"/>`;
      off += d;
    });
    svg.innerHTML = h;
  }

  const leg = document.getElementById('donutLegend');
  if (!leg) return;
  if (!cats.length) {
    leg.innerHTML = `<div style="font-family:var(--font-mono);font-size:11px;color:var(--muted);text-align:center;padding:8px 0">Add transactions to see breakdown</div>`;
    return;
  }
  const maxA = Math.max(...cats.map(c=>c.a));
  leg.innerHTML = cats.map(c => `
    <div class="donut-legend-item" onclick="filterByCategory('${c.n}')" style="cursor:pointer">
      <div class="donut-legend-name">${c.icon} ${c.n}</div>
      <div class="donut-legend-bar-wrap"><div class="donut-legend-bar" style="width:${(c.a/maxA*100).toFixed(0)}%;background:${c.color}"></div></div>
      <div class="donut-legend-pct" style="color:${c.color}">${fmt(c.a)}</div>
    </div>`).join('');
}

// ── Transactions table ────────────────────────────────────────
function initTransactions() {
  document.querySelectorAll('.tx-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tx-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.txFilter = btn.dataset.filter;
      renderTransactions();
    });
  });
  renderTransactions();
}

function renderTransactions() {
  const tbody = document.getElementById('txTable');
  if (!tbody) return;

  const src  = state.period === 'LAST' ? LAST_MONTH_TRANSACTIONS : getFilteredTx();
  const isLast = state.period === 'LAST';

  const rows = src.filter(t => {
    if (state.txFilter !== 'all' && t.status !== state.txFilter) return false;
    if (state.activeCat !== 'all' && t.cat !== state.activeCat)  return false;
    const q = state.searchQuery.toLowerCase().trim();
    if (q && !t.name.toLowerCase().includes(q) && !t.cat.toLowerCase().includes(q) &&
        !t.relation.toLowerCase().includes(q) && !(t.tags||[]).some(x => x.toLowerCase().includes(q))) return false;
    return true;
  });

  tbody.innerHTML = '';

  if (!rows.length) {
    tbody.innerHTML = `<div style="padding:48px;text-align:center;font-family:var(--font-mono);font-size:13px;color:var(--muted)">
      ${state.transactions.length === 0 && !isLast
        ? `<div style="font-size:32px;margin-bottom:12px">💸</div>No transactions yet.<br>
           <span style="font-size:11px;color:var(--muted2)">Click <strong style="color:var(--accent)">+ Add Expense</strong> to record your first one.</span>`
        : `No transactions match your filters.
           <br><span onclick="clearAllFilters()" style="color:var(--accent);cursor:pointer;display:inline-block;margin-top:8px">Clear filters →</span>`}
    </div>`;
  } else {
    rows.forEach(tx => {
      const row = document.createElement('div');
      row.className = 'table-row' + (isLast ? ' last-month-row' : '');
      row.innerHTML = `
        <div class="tx-merchant">
          <div class="tx-icon" style="background:${catBg(tx.cat)}">${tx.icon}</div>
          <div>
            <div class="tx-name">${tx.name}</div>
            <div class="tx-rel">${tx.relation || ''}</div>
          </div>
        </div>
        <div class="tx-date">${tx.date}</div>
        <div class="tx-cat">${tx.cat}</div>
        <div class="tx-amount ${tx.amount<0?'neg':'pos'}">${tx.amount<0?'−':'+'}${fmt(tx.amount)}</div>
        <div><span class="tx-status ${tx.status}">${
          tx.status==='cleared'?'✓ Cleared':tx.status==='pending'?'⏳ Pending':'⚠ Flagged'
        }</span></div>`;
      if (!isLast) row.addEventListener('click', () => showTxDetail(tx));
      tbody.appendChild(row);
    });
  }

  updateFilterBadge();
  const cnt = document.getElementById('txCount');
  if (cnt) {
    const total = isLast ? LAST_MONTH_TRANSACTIONS.length : state.transactions.length;
    const flagged = (isLast ? LAST_MONTH_TRANSACTIONS : state.transactions).filter(t=>t.status==='flagged').length;
    cnt.textContent = `${rows.length} of ${total} · ${flagged} flagged`;
  }
}

function updateFilterBadge() {
  const badge = document.getElementById('activeCatBadge');
  if (!badge) return;
  const parts = [];
  if (state.activeCat !== 'all')    parts.push(`Category: <strong style="color:var(--accent)">${state.activeCat}</strong>`);
  if (state.txFilter  !== 'all')    parts.push(`Status: <strong style="color:var(--accent2)">${state.txFilter}</strong>`);
  if (state.searchQuery.trim())     parts.push(`Search: <strong style="color:var(--accent4)">"${state.searchQuery}"</strong>`);
  if (parts.length) {
    badge.innerHTML = parts.join(' · ') + ` <span onclick="clearAllFilters()" style="cursor:pointer;margin-left:8px;color:var(--muted2);border:1px solid var(--border2);padding:2px 8px;border-radius:100px;font-size:10px">✕ Clear</span>`;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

function catBg(cat) {
  return {Food:'rgba(200,255,87,.12)',Travel:'rgba(87,200,255,.12)',Shopping:'rgba(255,184,87,.12)',Health:'rgba(150,150,255,.12)',Entertainment:'rgba(255,87,135,.12)',Utilities:'rgba(150,150,150,.12)'}[cat]||'var(--surface2)';
}

function setCatFilter(cat, el) {
  state.activeCat = cat;
  document.querySelectorAll('.cat-nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  renderTransactions();
  if (cat !== 'all') showToast('Showing: ' + cat);
}

function filterByCategory(cat) {
  state.activeCat = cat === state.activeCat ? 'all' : cat;
  document.querySelectorAll('.cat-nav-item').forEach(n => n.classList.toggle('active', n.dataset.cat === state.activeCat));
  renderTransactions();
  document.querySelector('.table-card') && document.querySelector('.table-card').scrollIntoView({behavior:'smooth',block:'nearest'});
  showToast(state.activeCat === 'all' ? 'Filter cleared' : 'Showing: ' + cat);
}

function clearAllFilters() {
  state.activeCat = 'all'; state.txFilter = 'all'; state.searchQuery = '';
  const inp = document.getElementById('globalSearch'); if (inp) inp.value = '';
  document.querySelectorAll('.tx-filter-btn').forEach(b => b.classList.remove('active'));
  const allBtn = document.querySelector('.tx-filter-btn[data-filter="all"]'); if (allBtn) allBtn.classList.add('active');
  document.querySelectorAll('.cat-nav-item').forEach(n => n.classList.toggle('active', n.dataset.cat === 'all'));
  renderTransactions();
  showToast('All filters cleared ✓');
}

// ── Transaction Detail Modal ──────────────────────────────────
function showTxDetail(tx) {
  const title = document.getElementById('txModalTitle');
  const body  = document.getElementById('txModalBody');
  if (!title || !body) return;
  title.textContent = tx.name;
  body.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
      <div class="modal-field"><span class="modal-label">Amount</span>
        <span class="modal-val ${tx.amount<0?'neg':'pos'}" style="font-size:20px;font-weight:800">${tx.amount<0?'−':'+'}${fmt(tx.amount)}</span></div>
      <div class="modal-field"><span class="modal-label">Date</span><span class="modal-val">${tx.date}</span></div>
      <div class="modal-field"><span class="modal-label">Category</span><span class="modal-val">${tx.icon} ${tx.cat}</span></div>
      <div class="modal-field"><span class="modal-label">Status</span>
        <span class="tx-status ${tx.status}">${tx.status==='cleared'?'✓ Cleared':tx.status==='pending'?'⏳ Pending':'⚠ Flagged'}</span></div>
    </div>
    <div class="modal-field" style="margin-bottom:12px">
      <span class="modal-label">Relation</span>
      <div style="color:var(--muted2);margin-top:4px;font-size:13px">${tx.relation||'—'}</div>
    </div>
    <div style="margin-bottom:14px">
      <span class="modal-label">Tags</span>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px">
        ${(tx.tags||[]).length ? tx.tags.map(t=>`<span class="tag">${t}</span>`).join('') : '<span style="color:var(--muted);font-size:12px">None</span>'}
      </div>
    </div>
    ${tx.status==='flagged'?`<div style="padding:12px;background:var(--accent3-dim);border:1px solid rgba(255,87,135,.2);border-radius:8px;font-size:13px;color:var(--accent3);margin-bottom:10px">
      ⚠ Flagged. <strong style="cursor:pointer;text-decoration:underline" onclick="resolveTx(${tx.id},'cleared')">Resolve →</strong></div>`:''}
    ${tx.status==='pending'?`<div style="padding:12px;background:var(--accent4-dim);border:1px solid rgba(255,184,87,.2);border-radius:8px;font-size:13px;color:var(--accent4);margin-bottom:10px">
      ⏳ Pending. <strong style="cursor:pointer;text-decoration:underline" onclick="resolveTx(${tx.id},'cleared')">Mark cleared →</strong></div>`:''}
    <button class="btn danger btn-full" onclick="removeTx(${tx.id})" style="background:rgba(255,87,135,.1);border-color:rgba(255,87,135,.3);color:var(--accent3)">🗑 Delete Transaction</button>`;
  openModal('txModal');
}

function resolveTx(id, status) {
  dbUpdate(id, { status });
  closeModal('txModal');
  renderTransactions(); initKPIs(); checkThreshold();
  showToast('Updated ✓');
}

function removeTx(id) {
  dbDelete(id);
  closeModal('txModal');
  renderTransactions(); initKPIs(); initBudgetBar(); initTagCloud();
  initCategoryDonut(); checkThreshold(); renderChart();
  showToast('Deleted');
}

// ── Clear all transactions ────────────────────────────────────
function confirmClearTransactions() { openModal('clearConfirmModal'); }
function doClearTransactions() {
  dbClear();
  closeModal('clearConfirmModal');
  renderTransactions(); initKPIs(); initBudgetBar(); initTagCloud();
  initCategoryDonut(); checkThreshold(); renderChart();
  showToast('All transactions cleared ✓');
}

// ── Add Expense ───────────────────────────────────────────────
function submitAddExpense() {
  const merchant = document.getElementById('inp-merchant').value.trim();
  const amount   = document.getElementById('inp-amount').value.trim();
  const category = document.getElementById('inp-category').value;
  const tags     = document.getElementById('inp-tags').value.trim();
  const dateVal  = document.getElementById('inp-date').value;

  if (!merchant) { showToast('⚠ Enter a merchant name.'); return; }
  if (!amount || isNaN(+amount) || +amount <= 0) { showToast('⚠ Enter a valid amount.'); return; }

  const dObj  = dateVal ? new Date(dateVal + 'T12:00:00') : new Date();
  const dStr  = dObj.toLocaleDateString('en-IN', { day:'numeric', month:'short' });

  const tx = {
    id:       Date.now(),
    icon:     ({Food:'🍕',Travel:'✈️',Shopping:'🛍️',Health:'💊',Entertainment:'🎬',Utilities:'⚡'}[category]||'💸'),
    name:     merchant,
    relation: 'added manually',
    date:     dStr,
    dateObj:  dObj.toISOString(),
    cat:      category,
    amount:   -Math.abs(+amount),
    status:   'cleared',
    tags:     tags ? tags.split(',').map(t=>t.trim()).filter(Boolean) : [],
  };

  dbAdd(tx);
  closeModal('addModal');
  renderTransactions(); initKPIs(); initBudgetBar(); initTagCloud();
  initCategoryDonut(); initHeatmap(); renderChart(); checkThreshold();
  ['inp-merchant','inp-amount','inp-tags'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  document.getElementById('inp-category').value = 'Food';
  const dateInp = document.getElementById('inp-date'); if (dateInp) dateInp.valueAsDate = new Date();
  showToast(`✓ Added: ${tx.name} — ${fmt(tx.amount)}`);
}

// ── Analytics View ────────────────────────────────────────────
function showAnalyticsView() {
  document.getElementById('dashboardContent').style.display = 'none';
  document.getElementById('relationsPanel').style.display   = 'none';
  document.getElementById('analyticsPanel').style.display   = 'block';

  const txs = getFilteredTx();
  const CAT_COLOR = {Food:'var(--accent)',Travel:'var(--accent2)',Shopping:'var(--accent4)',Health:'#a78bfa',Entertainment:'var(--accent3)',Utilities:'var(--muted2)'};
  const CAT_ICON  = {Food:'🍔',Travel:'✈️',Shopping:'🛒',Health:'💊',Entertainment:'🎮',Utilities:'⚡'};
  const totals = {};
  txs.forEach(t => { if(t.amount<0) totals[t.cat]=(totals[t.cat]||0)+Math.abs(t.amount); });
  const grand = Object.values(totals).reduce((a,b)=>a+b,0);
  const sorted = Object.entries(totals).sort((a,b)=>b[1]-a[1]);

  document.getElementById('analyticsBody').innerHTML = `
    <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.5px;margin-bottom:4px">Analytics · ${state.period}</h2>
    <p style="font-family:var(--font-mono);font-size:12px;color:var(--muted);margin-bottom:24px">Click a category to filter the transactions table</p>
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r2);overflow:hidden;margin-bottom:20px">
      <div style="padding:14px 20px;border-bottom:1px solid var(--border);background:var(--surface2);display:flex;justify-content:space-between">
        <span style="font-weight:700">Category Breakdown</span>
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted)">Total: ${fmt(grand)}</span>
      </div>
      ${sorted.length ? sorted.map(([cat,amt])=>`
        <div style="display:grid;grid-template-columns:150px 1fr 80px 70px;align-items:center;padding:14px 20px;border-bottom:1px solid var(--border);gap:14px;cursor:pointer"
          onmouseover="this.style.background='var(--surface2)'" onmouseout="this.style.background=''"
          onclick="filterByCategory('${cat}');showDashboard()">
          <span style="font-size:14px;font-weight:600">${CAT_ICON[cat]||'💸'} ${cat}</span>
          <div style="height:6px;background:var(--surface2);border-radius:100px;overflow:hidden">
            <div style="height:100%;width:${(amt/grand*100).toFixed(1)}%;background:${CAT_COLOR[cat]||'var(--muted)'};border-radius:100px"></div>
          </div>
          <span style="font-family:var(--font-mono);font-size:12px;color:${CAT_COLOR[cat]||'var(--muted)'};text-align:right">${fmt(amt)}</span>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted);text-align:right">${(amt/grand*100).toFixed(1)}%</span>
        </div>`).join('')
      : `<div style="padding:32px;text-align:center;font-family:var(--font-mono);font-size:13px;color:var(--muted)">No transactions yet.</div>`}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r2);padding:20px">
        <div style="font-weight:700;margin-bottom:14px">Top Merchants</div>
        ${txs.length ? [...txs].sort((a,b)=>Math.abs(b.amount)-Math.abs(a.amount)).slice(0,6).map(t=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)">
            <span style="font-size:13px">${t.icon} ${t.name}</span>
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent3)">−${fmt(t.amount)}</span>
          </div>`).join('') : '<div style="font-family:var(--font-mono);font-size:12px;color:var(--muted)">No data yet.</div>'}
      </div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r2);padding:20px">
        <div style="font-weight:700;margin-bottom:14px">Status Summary</div>
        ${['cleared','pending','flagged'].map(s=>{
          const cnt=txs.filter(t=>t.status===s).length;
          const amt=txs.filter(t=>t.status===s).reduce((a,t)=>a+Math.abs(t.amount),0);
          return `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)">
            <span class="tx-status ${s}">${s==='cleared'?'✓':s==='pending'?'⏳':'⚠'} ${s[0].toUpperCase()+s.slice(1)}</span>
            <span style="font-family:var(--font-mono);font-size:12px;color:var(--muted2)">${cnt} · ${fmt(amt)}</span>
          </div>`;}).join('')}
        <div style="margin-top:10px;font-family:var(--font-mono);font-size:11px;color:var(--muted)">Total: ${txs.length} transactions</div>
      </div>
    </div>`;
}

// ── Relations View ────────────────────────────────────────────
function showRelationsView() {
  document.getElementById('dashboardContent').style.display = 'none';
  document.getElementById('analyticsPanel').style.display   = 'none';
  document.getElementById('relationsPanel').style.display   = 'block';

  const txs = getFilteredTx();
  const groups = {};
  txs.forEach(t => (t.tags||[]).forEach(tag => { if(!groups[tag]) groups[tag]=[]; groups[tag].push(t); }));
  const clusters = Object.entries(groups).filter(([,g])=>g.length>1).sort((a,b)=>b[1].length-a[1].length);

  document.getElementById('relationsBody').innerHTML = `
    <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.5px;margin-bottom:4px">Relations · ${state.period}</h2>
    <p style="font-family:var(--font-mono);font-size:12px;color:var(--muted);margin-bottom:24px">${clusters.length} clusters · ${txs.length} transactions</p>
    ${clusters.length
      ? `<div style="display:flex;flex-direction:column;gap:14px">${clusters.map(([tag,grp])=>{
          const total=grp.reduce((a,t)=>a+Math.abs(t.amount),0);
          return `<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r2);overflow:hidden">
            <div style="padding:14px 18px;background:var(--surface2);display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border)">
              <div style="display:flex;align-items:center;gap:8px"><span class="tag hot">${tag}</span>
                <span style="font-family:var(--font-mono);font-size:11px;color:var(--muted)">${grp.length} linked</span></div>
              <span style="font-family:var(--font-mono);font-size:13px;color:var(--accent3)">−${fmt(total)}</span>
            </div>
            ${grp.map(t=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 18px;border-bottom:1px solid var(--border)">
              <div style="display:flex;align-items:center;gap:10px">
                <span style="font-size:16px">${t.icon}</span>
                <div><div style="font-size:13px;font-weight:600">${t.name}</div>
                  <div style="font-family:var(--font-mono);font-size:10px;color:var(--muted)">${t.date} · ${t.cat}</div></div>
              </div>
              <div style="text-align:right">
                <div style="font-family:var(--font-mono);font-size:13px;color:var(--accent3)">−${fmt(t.amount)}</div>
                <span class="tx-status ${t.status}" style="font-size:10px">${t.status}</span>
              </div></div>`).join('')}
          </div>`;}).join('')}</div>`
      : `<div style="padding:64px;text-align:center;font-family:var(--font-mono);font-size:13px;color:var(--muted)">
          No clusters yet.<br><span style="font-size:11px">Add transactions with the same tags to see them grouped here.</span></div>`}`;
}

function showDashboard() {
  state.activeView = 'dashboard';
  document.getElementById('dashboardContent').style.display = 'block';
  document.getElementById('analyticsPanel').style.display   = 'none';
  document.getElementById('relationsPanel').style.display   = 'none';
  document.querySelectorAll('.nav-item[data-view]').forEach(n => n.classList.remove('active'));
  const db = document.querySelector('.nav-item[data-view="dashboard"]');
  if (db) db.classList.add('active');
}

function navTo(view, el) {
  document.querySelectorAll('.nav-item[data-view]').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  if (view === 'dashboard') showDashboard();
  if (view === 'analytics') showAnalyticsView();
  if (view === 'relations') showRelationsView();
}

// ── Relation Graph ────────────────────────────────────────────
function initRelationGraph() {
  const svg = document.getElementById('graphSvg');
  if (!svg) return;
  let h = '';
  GRAPH_EDGES.forEach(e => {
    const a = GRAPH_NODES[e.s], b = GRAPH_NODES[e.t];
    h += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"
      stroke="${e.type==='strong'?'rgba(200,255,87,.35)':'rgba(87,200,255,.25)'}"
      stroke-width="${e.type==='strong'?2:1.5}" stroke-dasharray="${e.type==='medium'?'6,4':'none'}" fill="none"/>`;
  });
  GRAPH_NODES.forEach(n => {
    h += `<g style="cursor:pointer" onclick="highlightNode(${n.id})">
      <circle cx="${n.x}" cy="${n.y}" r="${n.r+7}" fill="${n.color}" opacity=".07"/>
      <circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="var(--surface2)" stroke="${n.color}" stroke-width="2"/>
      <text x="${n.x}" y="${n.y}" text-anchor="middle" dominant-baseline="central" font-size="${n.r*.9}">${n.icon}</text>
      <text x="${n.x}" y="${n.y+n.r+13}" text-anchor="middle" font-family="DM Mono" font-size="10" fill="var(--muted2)">${n.label}</text>
    </g>`;
  });
  svg.innerHTML = h;
}

function highlightNode(id) {
  const n = GRAPH_NODES[id];
  state.activeCat = 'all'; state.searchQuery = n.label.split(' ')[0].toLowerCase();
  renderTransactions();
  const tc = document.querySelector('.table-card');
  if (tc) tc.scrollIntoView({behavior:'smooth', block:'nearest'});
  showToast('Showing: ' + n.label);
  setTimeout(() => { state.searchQuery = ''; renderTransactions(); }, 3000);
}

// ── Insights ──────────────────────────────────────────────────
function initInsights() {
  const el = document.getElementById('insightList');
  if (!el) return;
  const txs = state.transactions;
  const list = [...INSIGHTS];
  if (txs.length > 0) {
    const spent = txs.reduce((a,t)=>a+(t.amount<0?Math.abs(t.amount):0),0);
    const pct   = Math.round(spent/APP_CONFIG.monthlyBudget*100);
    list[0] = { icon:'📊', bg:'var(--accent-dim)', text:`<strong>${txs.length} transactions</strong> recorded. Total: ${fmt(spent)} (${pct}% of budget).` };
    const flagged = txs.filter(t=>t.status==='flagged');
    if (flagged.length)
      list[1] = { icon:'⚠️', bg:'var(--accent3-dim)', text:`<strong>${flagged.length} flagged</strong>: ${flagged.map(t=>t.name).join(', ')}.` };
  }
  el.innerHTML = list.map(i=>`
    <div class="insight-item">
      <div class="insight-icon" style="background:${i.bg}">${i.icon}</div>
      <div class="insight-text">${i.text}</div>
    </div>`).join('');
}

// ── Tag Cloud ─────────────────────────────────────────────────
function initTagCloud() {
  const freq = {};
  getFilteredTx().forEach(t => (t.tags||[]).forEach(tag => freq[tag]=(freq[tag]||0)+1));
  const el = document.getElementById('tagCloud');
  if (!el) return;
  const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]);
  el.innerHTML = sorted.length
    ? sorted.map(([tag,cnt])=>`<span class="tag ${cnt>=3?'hot':cnt>=2?'warm':''}" onclick="filterByTag('${tag}')">${tag} <span style="opacity:.5;font-size:9px">${cnt}</span></span>`).join('')
    : `<span style="font-family:var(--font-mono);font-size:11px;color:var(--muted)">Tags appear here as you add transactions.</span>`;
}

function filterByTag(tag) {
  state.searchQuery = tag; state.activeCat = 'all';
  renderTransactions();
  const tc = document.querySelector('.table-card'); if (tc) tc.scrollIntoView({behavior:'smooth'});
  showToast('Tag: ' + tag);
  setTimeout(()=>{state.searchQuery='';renderTransactions();},3000);
}

// ── Heatmap ───────────────────────────────────────────────────
function initHeatmap() {
  const el = document.getElementById('heatGrid');
  if (!el) return;
  el.innerHTML = '';
  const now   = new Date();
  const month = now.getMonth();
  const year  = now.getFullYear();
  const days  = new Date(year, month+1, 0).getDate();
  const spend = Array(days).fill(0);
  state.transactions.forEach(t => {
    if (t.amount >= 0) return;
    const d = toDate(t);
    if (d.getMonth()===month && d.getFullYear()===year) {
      const idx = d.getDate()-1;
      if (idx>=0 && idx<days) spend[idx] += Math.abs(t.amount);
    }
  });
  const maxS = Math.max(...spend, 1);
  const dNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  spend.forEach((amt,i) => {
    const cell = document.createElement('div');
    const lvl  = !amt?0:amt<maxS*.25?1:amt<maxS*.5?2:amt<maxS*.75?3:4;
    cell.className = `heat-cell l${lvl}`;
    const d = new Date(year, month, i+1);
    cell.addEventListener('mouseenter', e => showTooltip(e, `${d.toLocaleDateString('en-IN',{day:'numeric',month:'short'})} (${dNames[d.getDay()]}) · ${!amt?'No spend':fmt(amt)}`));
    cell.addEventListener('mouseleave', hideTooltip);
    el.appendChild(cell);
  });
}

// ── Sidebar ───────────────────────────────────────────────────
function initSidebar() {
  const acctEl = document.getElementById('accountList');
  if (acctEl) {
    acctEl.innerHTML = ACCOUNTS.map(a=>`
      <div class="nav-item">
        ${a.icon} ${a.name}
        <span class="nav-count" style="color:${a.balance<0?'var(--accent3)':'var(--accent)'}">${a.balance<0?'−':'+'}${fmt(a.balance)}</span>
      </div>`).join('');
  }
}

function initBudgetBar() {
  const src   = state.period === 'LAST' ? LAST_MONTH_TRANSACTIONS : state.transactions;
  const spent = src.reduce((a,t)=>a+(t.amount<0?Math.abs(t.amount):0),0);
  const pct   = Math.min(100, Math.round(spent/APP_CONFIG.monthlyBudget*100));
  const color = pct>=100?'var(--accent3)':pct>=80?'var(--accent4)':'var(--accent)';
  const fill  = document.getElementById('budgetFill');
  if (fill) { fill.style.width=pct+'%'; fill.style.background=color; }
  const pe = document.getElementById('budgetPct');    if(pe){pe.textContent=pct+'%';pe.style.color=color;}
  const se = document.getElementById('budgetSpent');  if(se) se.textContent=fmt(spent)+' spent';
  const te = document.getElementById('budgetTotal');  if(te) te.textContent='of '+fmt(APP_CONFIG.monthlyBudget);
}

// ── Search ────────────────────────────────────────────────────
function initSearch() {
  const inp = document.getElementById('globalSearch');
  if (inp) inp.addEventListener('input', e => { state.searchQuery = e.target.value; renderTransactions(); });
}

// ── Modals ────────────────────────────────────────────────────
function openModal(id)  { const el=document.getElementById(id); if(el) el.classList.add('open'); }
function closeModal(id) { const el=document.getElementById(id); if(el) el.classList.remove('open'); }

// Close modal clicking outside
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) closeModal(e.target.id);
});

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.remove('show'), 2800);
}

// ── Tooltip ───────────────────────────────────────────────────
function showTooltip(e, txt) {
  const t=document.getElementById('tooltip'); if(!t) return;
  t.textContent=txt; t.style.left=(e.clientX+12)+'px'; t.style.top=(e.clientY-28)+'px'; t.classList.add('show');
}
function hideTooltip() { const t=document.getElementById('tooltip'); if(t) t.classList.remove('show'); }

// ── Export CSV ────────────────────────────────────────────────
function exportCSV() {
  const txs = getFilteredTx();
  if (!txs.length) { showToast('No transactions to export.'); return; }
  const rows = [['Merchant','Date','Category','Amount (INR)','Status','Tags']];
  txs.forEach(t => rows.push([t.name, t.date, t.cat, Math.abs(t.amount), t.status, (t.tags||[]).join(';')]));
  const csv = rows.map(r=>r.map(v=>`"${v}"`).join(',')).join('\n');
  const a   = document.createElement('a');
  a.href    = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csv);
  a.download = `trackwise_${state.period}_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  showToast('CSV exported ✓');
}
