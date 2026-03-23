// ============================================================
//  TrackWise — App Data
// ============================================================

const APP_CONFIG = {
  currency: '₹',
  locale: 'en-IN',
  monthlyBudget: 50000,
  userName: 'User',
  userInitials: 'U',
};

// ── Accounts ─────────────────────────────────────────────────
const ACCOUNTS = [
  { id: 'hdfc',    name: 'HDFC Credit Card', icon: '💳', balance: -12400,  type: 'credit'   },
  { id: 'sbi',     name: 'SBI Checking',     icon: '🏦', balance: 84600,   type: 'checking' },
  { id: 'savings', name: 'Savings Account',  icon: '💰', balance: 240000,  type: 'savings'  },
];

// ── Current month transactions (starts empty — add your own!) ─
// Dates use real JS Date objects internally; display uses dd Mon format
const TRANSACTIONS = [];

// ── Last month reference transactions (Feb 2026) ─────────────
// Used for "Last Month" chart line and comparison deltas
const LAST_MONTH_TRANSACTIONS = [
  { id:'lm1',  icon:'🍕', name:"Domino's Pizza",  relation:'last month', date:'Feb 28', dateObj: new Date(2026,1,28), cat:'Food',          amount:-580,  status:'cleared', tags:['food-delivery','weekend'] },
  { id:'lm2',  icon:'✈️', name:'IndiGo Airlines', relation:'last month', date:'Feb 26', dateObj: new Date(2026,1,26), cat:'Travel',         amount:-4200, status:'cleared', tags:['travel','work-expense']   },
  { id:'lm3',  icon:'📺', name:'Netflix',          relation:'last month', date:'Feb 24', dateObj: new Date(2026,1,24), cat:'Entertainment',  amount:-649,  status:'cleared', tags:['subscription','recurring'] },
  { id:'lm4',  icon:'☕', name:'Blue Tokai',       relation:'last month', date:'Feb 22', dateObj: new Date(2026,1,22), cat:'Food',           amount:-185,  status:'cleared', tags:['commute','coffee-chain']  },
  { id:'lm5',  icon:'🛍️', name:'Amazon',           relation:'last month', date:'Feb 20', dateObj: new Date(2026,1,20), cat:'Shopping',       amount:-1499, status:'cleared', tags:['amazon-prime','recurring'] },
  { id:'lm6',  icon:'💊', name:'PharmEasy',        relation:'last month', date:'Feb 18', dateObj: new Date(2026,1,18), cat:'Health',         amount:-340,  status:'cleared', tags:['health','recurring']       },
  { id:'lm7',  icon:'🚕', name:'Ola Cabs',         relation:'last month', date:'Feb 16', dateObj: new Date(2026,1,16), cat:'Travel',         amount:-287,  status:'cleared', tags:['commute','monday']         },
  { id:'lm8',  icon:'🍱', name:'Swiggy',           relation:'last month', date:'Feb 14', dateObj: new Date(2026,1,14), cat:'Food',           amount:-456,  status:'cleared', tags:['food-delivery','work-expense'] },
  { id:'lm9',  icon:'🎬', name:'BookMyShow',       relation:'last month', date:'Feb 12', dateObj: new Date(2026,1,12), cat:'Entertainment',  amount:-780,  status:'cleared', tags:['friday-night','date-night'] },
  { id:'lm10', icon:'🏋️', name:'Cult.fit',         relation:'last month', date:'Feb 10', dateObj: new Date(2026,1,10), cat:'Health',         amount:-2499, status:'cleared', tags:['gym','recurring']          },
  { id:'lm11', icon:'🛒', name:'Blinkit',          relation:'last month', date:'Feb 8',  dateObj: new Date(2026,1,8),  cat:'Shopping',       amount:-1220, status:'cleared', tags:['grocery','weekend']        },
  { id:'lm12', icon:'⚡', name:'BSES Electricity', relation:'last month', date:'Feb 6',  dateObj: new Date(2026,1,6),  cat:'Utilities',      amount:-2800, status:'cleared', tags:['utilities','recurring']    },
  { id:'lm13', icon:'🍜', name:'Zomato',           relation:'last month', date:'Feb 4',  dateObj: new Date(2026,1,4),  cat:'Food',           amount:-1840, status:'cleared', tags:['food-delivery','work-expense'] },
  { id:'lm14', icon:'📱', name:'Airtel Recharge',  relation:'last month', date:'Feb 2',  dateObj: new Date(2026,1,2),  cat:'Utilities',      amount:-599,  status:'cleared', tags:['utilities','recurring']    },
];

// ── AI Insights ──────────────────────────────────────────────
const INSIGHTS = [
  { icon:'💡', bg:'var(--accent-dim)',  text:'<strong>Start fresh!</strong> Add your first expense using the + button above.' },
  { icon:'📊', bg:'var(--accent2-dim)', text:'<strong>Last month</strong> you spent ₹17,134. Switch to "Last Month" view to compare.' },
  { icon:'🎯', bg:'var(--accent4-dim)', text:'<strong>Set your budget</strong> in your profile to get threshold warnings as you spend.' },
  { icon:'🔗', bg:'var(--accent3-dim)', text:'<strong>Relations</strong> appear automatically as you add more transactions with tags.' },
];

// ── Relation Graph Nodes & Edges ─────────────────────────────
const GRAPH_NODES = [
  { id:0, x:450, y:130, label:'Food & Dining', r:28, color:'var(--accent)',  icon:'🍔' },
  { id:1, x:200, y:80,  label:'Travel',         r:22, color:'var(--accent2)', icon:'✈️' },
  { id:2, x:700, y:90,  label:'Shopping',       r:20, color:'var(--accent4)', icon:'🛒' },
  { id:3, x:300, y:190, label:'Commute',         r:18, color:'var(--accent2)', icon:'🚕' },
  { id:4, x:600, y:200, label:'Subscriptions',  r:17, color:'var(--muted2)',  icon:'📺' },
  { id:5, x:120, y:180, label:'Coffee',          r:14, color:'var(--accent)',  icon:'☕' },
  { id:6, x:790, y:160, label:'Health',          r:15, color:'#a78bfa',        icon:'💊' },
  { id:7, x:540, y:55,  label:'Amazon',          r:13, color:'var(--accent4)', icon:'📦' },
  { id:8, x:350, y:50,  label:'Weekend',         r:12, color:'var(--accent3)', icon:'🎉' },
];

const GRAPH_EDGES = [
  { s:0, t:3, type:'strong' }, { s:0, t:1, type:'medium' },
  { s:5, t:3, type:'strong' }, { s:1, t:3, type:'medium' },
  { s:2, t:7, type:'strong' }, { s:4, t:2, type:'medium' },
  { s:0, t:8, type:'medium' }, { s:8, t:1, type:'medium' },
  { s:0, t:4, type:'medium' }, { s:6, t:2, type:'medium' },
  { s:3, t:5, type:'strong' }, { s:7, t:4, type:'medium' },
];

// ── Sparkline points ──────────────────────────────────────────
const SPARKLINES = {
  spent:     '0,35 15,28 25,32 38,12 50,20 62,8 80,15',
  relations: '0,30 15,25 28,22 40,18 52,14 65,10 80,8',
  anomalies: '0,20 15,22 28,18 40,28 52,15 65,32 80,10',
  daily:     '0,15 15,20 28,18 40,25 52,22 65,17 80,20',
};
