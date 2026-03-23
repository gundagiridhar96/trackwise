<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TrackWise — Sign In</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
<script src="auth.js"></script><!-- load auth FIRST so redirectIfLoggedIn runs -->
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0a0b;--surface:#111113;--surface2:#18181c;
  --border:#222228;--border2:#2e2e38;
  --text:#f0eff5;--muted:#6b6a7a;--muted2:#9998aa;
  --accent:#c8ff57;--accent2:#57c8ff;--accent3:#ff5787;--accent4:#ffb857;
  --accent-dim:rgba(200,255,87,0.1);
  --font:'Syne',sans-serif;--mono:'DM Mono',monospace;
}
html,body{height:100%}
body{
  background:var(--bg);color:var(--text);
  font-family:var(--font);
  display:flex;align-items:center;justify-content:center;
  min-height:100vh;overflow:hidden;
}

/* ── Background ── */
body::before{
  content:'';position:fixed;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 700px 500px at 10% 20%,rgba(200,255,87,0.05) 0%,transparent 60%),
    radial-gradient(ellipse 600px 500px at 90% 80%,rgba(87,200,255,0.04) 0%,transparent 60%);
}
body::after{
  content:'';position:fixed;inset:0;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  opacity:0.5;
}

/* ── Grid deco ── */
.grid-bg{
  position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;
}
.grid-bg::before{
  content:'';position:absolute;inset:0;
  background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);
  background-size:60px 60px;opacity:0.25;
  mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent);
}

/* ── Floating stats ── */
.float-stat{
  position:fixed;background:rgba(17,17,19,0.9);border:1px solid var(--border2);
  border-radius:12px;padding:12px 16px;z-index:0;pointer-events:none;
  backdrop-filter:blur(8px);animation:floatAnim 7s ease-in-out infinite;
}
.float-stat:nth-child(1){top:12%;left:3%;animation-delay:0s}
.float-stat:nth-child(2){top:28%;right:3%;animation-delay:2s}
.float-stat:nth-child(3){bottom:22%;left:3%;animation-delay:4s}
.float-stat:nth-child(4){bottom:32%;right:3%;animation-delay:1s}
@keyframes floatAnim{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.fs-lbl{font-family:var(--mono);font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
.fs-val{font-size:18px;font-weight:800;color:var(--accent)}
.fs-sub{font-family:var(--mono);font-size:10px;color:var(--muted2);margin-top:2px}

/* ── Wrapper ── */
.auth-wrap{
  position:relative;z-index:1;width:100%;max-width:440px;padding:20px;
  animation:slideUp 0.4s cubic-bezier(.34,1.56,.64,1);
}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

/* ── Brand ── */
.brand{display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:28px}
.logo-mark{
  width:36px;height:36px;background:var(--accent);border-radius:9px;
  display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;
}
.logo-mark::after{
  content:'';position:absolute;width:14px;height:14px;
  background:var(--bg);border-radius:50%;bottom:-4px;right:-4px;
}
.logo-mark svg{position:relative;z-index:1}
.brand-name{font-size:22px;font-weight:800;letter-spacing:-.5px}
.brand-tag{font-family:var(--mono);font-size:11px;color:var(--muted);text-align:center;margin-top:-22px;margin-bottom:28px;letter-spacing:.5px}

/* ── Card ── */
.card{
  background:var(--surface);border:1px solid var(--border2);
  border-radius:20px;padding:30px;
  box-shadow:0 24px 64px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.02);
  position:relative;overflow:hidden;
}
.card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--accent),var(--accent2),var(--accent3));
}

/* ── Tabs ── */
.tabs{
  display:flex;gap:4px;background:var(--surface2);
  border:1px solid var(--border);border-radius:10px;padding:4px;margin-bottom:26px;
}
.tab{
  flex:1;padding:8px;border-radius:7px;border:none;
  font-family:var(--font);font-size:14px;font-weight:600;
  cursor:pointer;transition:all .2s;background:none;color:var(--muted2);
}
.tab.active{background:var(--bg);color:var(--text);box-shadow:0 2px 8px rgba(0,0,0,.4)}

/* ── Form elements ── */
.form-title{font-size:20px;font-weight:800;letter-spacing:-.5px;margin-bottom:4px}
.form-sub{font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:22px}
.fg{margin-bottom:14px}
.lbl{
  display:block;font-family:var(--mono);font-size:10px;color:var(--muted);
  text-transform:uppercase;letter-spacing:1.2px;margin-bottom:6px;
}
.inp{
  width:100%;background:var(--surface2);border:1px solid var(--border2);
  border-radius:10px;padding:11px 14px;color:var(--text);
  font-family:var(--font);font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s;
}
.inp:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(200,255,87,.1)}
.inp.has-r{padding-right:44px}
.inp::placeholder{color:var(--muted)}
.inp-wrap{position:relative}
.pw-btn{
  position:absolute;right:12px;top:50%;transform:translateY(-50%);
  background:none;border:none;color:var(--muted);cursor:pointer;padding:4px;
  transition:color .15s;line-height:1;
}
.pw-btn:hover{color:var(--text)}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.hint{font-family:var(--mono);font-size:10px;color:var(--muted);margin-top:5px}
.prefix{
  position:absolute;left:12px;top:50%;transform:translateY(-50%);
  font-family:var(--mono);font-size:14px;color:var(--muted);pointer-events:none;
}
.inp.prefixed{padding-left:26px}

/* Salary / threshold slider */
.slider{
  width:100%;height:4px;-webkit-appearance:none;
  background:var(--border2);border-radius:100px;outline:none;cursor:pointer;margin-top:8px;
}
.slider::-webkit-slider-thumb{
  -webkit-appearance:none;width:16px;height:16px;border-radius:50%;
  background:var(--accent);cursor:pointer;box-shadow:0 0 0 3px rgba(200,255,87,.2);
}
.slider-labels{display:flex;justify-content:space-between;font-family:var(--mono);font-size:9px;color:var(--muted);margin-top:4px}

/* Strength bar */
.str-track{height:3px;background:var(--border2);border-radius:100px;overflow:hidden;margin-top:7px}
.str-fill{height:100%;border-radius:100px;transition:width .3s,background .3s;width:0}
.str-lbl{font-family:var(--mono);font-size:10px;color:var(--muted);margin-top:4px}

/* Error / success */
.msg{font-family:var(--mono);font-size:12px;padding:10px 14px;border-radius:8px;margin-bottom:10px;display:none}
.msg.show{display:block}
.msg.err{background:rgba(255,87,135,.1);border:1px solid rgba(255,87,135,.25);color:var(--accent3)}
.msg.ok{background:rgba(200,255,87,.1);border:1px solid rgba(200,255,87,.25);color:var(--accent)}

/* Submit button */
.submit-btn{
  width:100%;padding:13px;border-radius:10px;border:none;
  background:var(--accent);color:#000;
  font-family:var(--font);font-size:15px;font-weight:800;
  cursor:pointer;transition:all .2s;margin-top:6px;
  display:flex;align-items:center;justify-content:center;gap:8px;
}
.submit-btn:hover{background:#d4ff6a;transform:translateY(-1px);box-shadow:0 8px 20px rgba(200,255,87,.25)}
.submit-btn:active{transform:translateY(0)}
.submit-btn:disabled{opacity:.6;pointer-events:none}
.spinner{
  display:none;width:16px;height:16px;border:2px solid rgba(0,0,0,.3);
  border-top-color:#000;border-radius:50%;animation:spin .6s linear infinite;
}
@keyframes spin{to{transform:rotate(360deg)}}

.divider{display:flex;align-items:center;gap:10px;margin:18px 0;font-family:var(--mono);font-size:11px;color:var(--muted)}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--border)}

/* Demo button */
.demo-btn{
  width:100%;padding:10px;border-radius:10px;
  border:1px solid var(--border2);background:var(--surface2);
  color:var(--muted2);font-family:var(--font);font-size:13px;font-weight:600;
  cursor:pointer;transition:all .15s;
}
.demo-btn:hover{border-color:var(--border2);color:var(--text);background:var(--bg)}

/* Footer */
.footer{text-align:center;margin-top:18px;font-family:var(--mono);font-size:11px;color:var(--muted)}
.footer a{color:var(--accent);cursor:pointer}

/* Responsive */
@media(max-width:600px){.float-stat{display:none}.auth-wrap{padding:12px}.card{padding:22px 18px}}
</style>
</head>
<body>

<div class="grid-bg"></div>

<!-- Floating stats -->
<div class="float-stat"><div class="fs-lbl">This Month</div><div class="fs-val">₹0</div><div class="fs-sub">Start tracking today</div></div>
<div class="float-stat"><div class="fs-lbl">Relations</div><div class="fs-val">─</div><div class="fs-sub">add expenses to discover</div></div>
<div class="float-stat"><div class="fs-lbl">Budget Used</div><div class="fs-val">0%</div><div class="fs-sub">set your threshold</div></div>
<div class="float-stat"><div class="fs-lbl">Anomalies</div><div class="fs-val" style="color:var(--accent2)">0</div><div class="fs-sub">all clear</div></div>

<div class="auth-wrap">

  <!-- Brand -->
  <div class="brand">
    <div class="logo-mark">
      <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
        <path d="M3 13L8 3L13 13M5.5 9h5" stroke="#000" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="brand-name">TrackWise</div>
  </div>
  <div class="brand-tag">Relational Expense Analytics</div>

  <div class="card">

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab active" id="tab-in"  onclick="switchTab('in')">Sign In</button>
      <button class="tab"        id="tab-up"  onclick="switchTab('up')">Sign Up</button>
    </div>

    <!-- ── SIGN IN ── -->
    <div id="panel-in">
      <div class="form-title">Welcome back</div>
      <div class="form-sub">Sign in to your account</div>

      <div class="msg err" id="err-in"></div>
      <div class="msg ok"  id="ok-in"></div>

      <div class="fg">
        <label class="lbl">Email</label>
        <input class="inp" id="in-email" type="email" placeholder="you@example.com" autocomplete="email">
      </div>
      <div class="fg">
        <label class="lbl">Password</label>
        <div class="inp-wrap">
          <input class="inp has-r" id="in-pw" type="password" placeholder="Your password" autocomplete="current-password">
          <button class="pw-btn" onclick="togglePw('in-pw',this)" type="button">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>

      <button class="submit-btn" id="btn-in" onclick="doSignIn()">
        <span id="btn-in-txt">Sign In →</span>
        <span class="spinner" id="spin-in"></span>
      </button>

      <div class="divider">or</div>
      <button class="demo-btn" onclick="fillDemo()">🚀 Use Demo Account</button>
    </div>

    <!-- ── SIGN UP ── -->
    <div id="panel-up" style="display:none">
      <div class="form-title">Create account</div>
      <div class="form-sub">Takes 30 seconds · free forever</div>

      <div class="msg err" id="err-up"></div>
      <div class="msg ok"  id="ok-up"></div>

      <div class="row2">
        <div class="fg" style="margin-bottom:0">
          <label class="lbl">Full Name *</label>
          <input class="inp" id="up-name" type="text" placeholder="Arjun Sharma" autocomplete="name">
        </div>
        <div class="fg" style="margin-bottom:0">
          <label class="lbl">Email *</label>
          <input class="inp" id="up-email" type="email" placeholder="you@example.com" autocomplete="email">
        </div>
      </div>

      <div class="fg" style="margin-top:14px">
        <label class="lbl">Password * (min 6 chars)</label>
        <div class="inp-wrap">
          <input class="inp has-r" id="up-pw" type="password" placeholder="Choose a strong password" autocomplete="new-password" oninput="checkStrength(this.value)">
          <button class="pw-btn" onclick="togglePw('up-pw',this)" type="button">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
        <div class="str-track"><div class="str-fill" id="str-fill"></div></div>
        <div class="str-lbl" id="str-lbl">Enter a password</div>
      </div>

      <!-- Monthly Salary -->
      <div class="fg">
        <label class="lbl">Monthly Salary (₹) *</label>
        <div class="inp-wrap">
          <span class="prefix">₹</span>
          <input class="inp prefixed" id="up-salary" type="number" min="1000" placeholder="50000" oninput="autoThreshold()">
        </div>
        <div class="hint">We'll auto-suggest your budget as 50% of salary.</div>
      </div>

      <!-- Spending Threshold -->
      <div class="fg">
        <label class="lbl" style="display:flex;justify-content:space-between">
          <span>Monthly Budget Limit (₹) *</span>
          <span id="thresh-display" style="color:var(--accent);font-weight:700">₹25,000</span>
        </label>
        <div class="inp-wrap">
          <span class="prefix">₹</span>
          <input class="inp prefixed" id="up-threshold" type="number" min="500" value="25000" oninput="syncThreshold(this.value)">
        </div>
        <input type="range" class="slider" id="thresh-slider" min="1000" max="300000" step="1000" value="25000" oninput="syncSlider(this.value)">
        <div class="slider-labels"><span>₹1k</span><span>₹75k</span><span>₹1.5L</span><span>₹3L</span></div>
        <div class="hint">Warnings fire at 60%, 80%, and 100% of this limit.</div>
      </div>

      <button class="submit-btn" id="btn-up" onclick="doSignUp()">
        <span id="btn-up-txt">Create Account →</span>
        <span class="spinner" id="spin-up"></span>
      </button>
    </div>

  </div><!-- /.card -->

  <div class="footer">100% local · no server · <a onclick="alert('Your data stays in your browser only.')">privacy info</a></div>

</div><!-- /.auth-wrap -->

<script>
// ── Redirect already-logged-in users straight to dashboard ──
AUTH.redirectIfLoggedIn();   // safe: only redirects if session exists

// ── Tab switch ───────────────────────────────────────────────
function switchTab(t) {
  document.getElementById('tab-in').classList.toggle('active', t==='in');
  document.getElementById('tab-up').classList.toggle('active', t==='up');
  document.getElementById('panel-in').style.display = t==='in' ? '' : 'none';
  document.getElementById('panel-up').style.display = t==='up' ? '' : 'none';
}

// ── Password toggle ──────────────────────────────────────────
function togglePw(id, btn) {
  const inp = document.getElementById(id);
  inp.type  = inp.type === 'password' ? 'text' : 'password';
  btn.style.opacity = inp.type === 'text' ? '1' : '0.5';
}

// ── Password strength ────────────────────────────────────────
function checkStrength(pw) {
  const fill = document.getElementById('str-fill');
  const lbl  = document.getElementById('str-lbl');
  if (!pw) { fill.style.width='0%'; lbl.textContent='Enter a password'; lbl.style.color='var(--muted)'; return; }
  let s = 0;
  if (pw.length >= 6)  s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const lvls = [
    {w:'20%',bg:'var(--accent3)',t:'Very weak'},
    {w:'40%',bg:'var(--accent4)',t:'Weak'},
    {w:'60%',bg:'var(--accent4)',t:'Fair'},
    {w:'80%',bg:'var(--accent2)',t:'Strong'},
    {w:'100%',bg:'var(--accent)',t:'Very strong ✓'},
  ];
  const l = lvls[Math.min(s,4)];
  fill.style.width=l.w; fill.style.background=l.bg;
  lbl.textContent=l.t; lbl.style.color=l.bg;
}

// ── Threshold auto / sync ────────────────────────────────────
function autoThreshold() {
  const sal = parseInt(document.getElementById('up-salary').value)||0;
  if (sal > 0) {
    const t = Math.round(sal*0.5/1000)*1000;
    document.getElementById('up-threshold').value = t;
    syncThreshold(t);
  }
}
function syncThreshold(v) {
  document.getElementById('thresh-display').textContent = '₹'+(parseInt(v)||0).toLocaleString('en-IN');
  document.getElementById('thresh-slider').value = Math.min(parseInt(v)||0, 300000);
}
function syncSlider(v) {
  document.getElementById('up-threshold').value = v;
  syncThreshold(v);
}

// ── Message helpers ───────────────────────────────────────────
function showMsg(id, txt, type='err') {
  const el = document.getElementById(id);
  el.textContent = txt;
  el.className = 'msg show ' + type;
}
function clearMsgs(prefix) {
  ['err','ok'].forEach(t => {
    const el = document.getElementById(t+'-'+prefix);
    if (el) el.className = 'msg';
  });
}

// ── Sign In ───────────────────────────────────────────────────
function doSignIn() {
  clearMsgs('in');
  const email = document.getElementById('in-email').value.trim();
  const pw    = document.getElementById('in-pw').value;
  if (!email || !pw) { showMsg('err-in','Please fill in email and password.'); return; }

  const btn = document.getElementById('btn-in');
  const spin= document.getElementById('spin-in');
  document.getElementById('btn-in-txt').textContent = 'Signing in…';
  spin.style.display = 'block'; btn.disabled = true;

  // Small artificial delay for UX
  setTimeout(() => {
    const res = AUTH.signIn(email, pw);
    if (res.ok) {
      showMsg('ok-in', '✓ Welcome back, ' + res.user.name.split(' ')[0] + '! Loading…', 'ok');
      setTimeout(() => window.location.replace('index.html'), 700);
    } else {
      showMsg('err-in', '✗ ' + res.msg);
      document.getElementById('btn-in-txt').textContent = 'Sign In →';
      spin.style.display = 'none'; btn.disabled = false;
    }
  }, 500);
}

// ── Sign Up ───────────────────────────────────────────────────
function doSignUp() {
  clearMsgs('up');
  const name      = document.getElementById('up-name').value.trim();
  const email     = document.getElementById('up-email').value.trim();
  const pw        = document.getElementById('up-pw').value;
  const threshold = parseInt(document.getElementById('up-threshold').value)||0;

  if (!name)          { showMsg('err-up','Full name is required.'); return; }
  if (!email)         { showMsg('err-up','Email is required.'); return; }
  if (pw.length < 6)  { showMsg('err-up','Password needs at least 6 characters.'); return; }
  if (threshold < 500){ showMsg('err-up','Set a budget of at least ₹500.'); return; }

  const btn = document.getElementById('btn-up');
  const spin= document.getElementById('spin-up');
  document.getElementById('btn-up-txt').textContent = 'Creating account…';
  spin.style.display = 'block'; btn.disabled = true;

  setTimeout(() => {
    const res = AUTH.signUp(name, email, pw, threshold);
    if (res.ok) {
      showMsg('ok-up', '✓ Account created! Welcome, ' + name.split(' ')[0] + '!', 'ok');
      setTimeout(() => window.location.replace('index.html'), 700);
    } else {
      showMsg('err-up', '✗ ' + res.msg);
      document.getElementById('btn-up-txt').textContent = 'Create Account →';
      spin.style.display = 'none'; btn.disabled = false;
    }
  }, 500);
}

// ── Demo account ──────────────────────────────────────────────
function fillDemo() {
  // Create demo account if it doesn't exist
  const users = AUTH.getUsers();
  if (!users['demo@trackwise.in']) {
    AUTH.signUp('Demo User', 'demo@trackwise.in', 'demo123', 50000);
    // signUp sets session; clear it so user signs in normally
    AUTH.clearSession();
  }
  document.getElementById('in-email').value = 'demo@trackwise.in';
  document.getElementById('in-pw').value    = 'demo123';
  showMsg('ok-in', '✓ Demo credentials filled — click Sign In!', 'ok');
}

// ── Enter key ─────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (document.getElementById('panel-in').style.display !== 'none') doSignIn();
  else doSignUp();
});

// ── Init ──────────────────────────────────────────────────────
syncThreshold(25000);
</script>
</body>
</html>
