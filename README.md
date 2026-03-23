// ============================================================
//  TrackWise — Auth + Per-User Database
//  All data is stored in localStorage, isolated per user email.
//
//  Storage layout:
//    tw_users              → { [email]: userObject }
//    tw_session            → current logged-in user (sessionStorage)
//    tw_tx_{email}         → array of that user's transactions
// ============================================================

const AUTH = {
  SESSION_KEY: 'tw_session',
  USERS_KEY:   'tw_users',

  // ── Helpers ──────────────────────────────────────────────────
  _txKey(email) { return 'tw_tx_' + email.toLowerCase().trim(); },

  _read(key, storage, fallback) {
    try { const v = storage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  _write(key, val, storage) {
    try { storage.setItem(key, JSON.stringify(val)); return true; }
    catch(e) { console.error('TrackWise storage error:', e); return false; }
  },

  // ── User store ────────────────────────────────────────────────
  getUsers()      { return this._read(this.USERS_KEY, localStorage, {}); },
  saveUsers(u)    { this._write(this.USERS_KEY, u, localStorage); },

  // ── Session ───────────────────────────────────────────────────
  getSession()    { return this._read(this.SESSION_KEY, sessionStorage, null); },
  setSession(u)   { this._write(this.SESSION_KEY, u, sessionStorage); },
  clearSession()  { sessionStorage.removeItem(this.SESSION_KEY); },

  // ── Per-user transaction database ────────────────────────────
  // Every add / delete / update calls saveTx so data is always persisted.

  loadTx(email) {
    return this._read(this._txKey(email), localStorage, []);
  },

  saveTx(email, txArray) {
    return this._write(this._txKey(email), txArray, localStorage);
  },

  addTx(email, tx) {
    const txs = this.loadTx(email);
    txs.unshift(tx);           // newest first
    this.saveTx(email, txs);
    return txs;
  },

  updateTx(email, id, patch) {
    const txs = this.loadTx(email).map(t => t.id === id ? { ...t, ...patch } : t);
    this.saveTx(email, txs);
    return txs;
  },

  deleteTx(email, id) {
    const txs = this.loadTx(email).filter(t => t.id !== id);
    this.saveTx(email, txs);
    return txs;
  },

  clearTx(email) {
    this.saveTx(email, []);
    return [];
  },

  // ── Password hash (demo-grade, not cryptographic) ─────────────
  hash(s) {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
    return (h >>> 0).toString(36);
  },

  // ── Sign Up ───────────────────────────────────────────────────
  signUp(name, email, password, threshold) {
    if (!name.trim())         return { ok:false, msg:'Full name is required.' };
    if (!email.includes('@')) return { ok:false, msg:'Enter a valid email address.' };
    if (password.length < 6)  return { ok:false, msg:'Password needs at least 6 characters.' };
    if (+threshold < 500)     return { ok:false, msg:'Monthly budget must be at least ₹500.' };

    const users = this.getUsers();
    const key   = email.toLowerCase().trim();
    if (users[key]) return { ok:false, msg:'An account already exists for this email. Sign in instead.' };

    const user = {
      name:      name.trim(),
      email:     key,
      password:  this.hash(password),
      threshold: parseInt(threshold),
      initials:  name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2),
      createdAt: Date.now(),
    };
    users[key] = user;
    this.saveUsers(users);
    this.setSession(user);
    // Initialise empty transaction store for this user
    if (!localStorage.getItem(this._txKey(key))) this.saveTx(key, []);
    return { ok:true, user };
  },

  // ── Sign In ───────────────────────────────────────────────────
  signIn(email, password) {
    const users = this.getUsers();
    const key   = email.toLowerCase().trim();
    const user  = users[key];
    if (!user)                              return { ok:false, msg:'No account found for that email.' };
    if (user.password !== this.hash(password)) return { ok:false, msg:'Incorrect password. Try again.' };
    this.setSession(user);
    return { ok:true, user };
  },

  // ── Update profile (threshold, name etc.) ────────────────────
  updateProfile(email, patch) {
    const users = this.getUsers();
    const key   = email.toLowerCase().trim();
    if (!users[key]) return false;
    users[key] = { ...users[key], ...patch };
    this.saveUsers(users);
    this.setSession(users[key]);   // refresh session
    return true;
  },

  // ── Logout ────────────────────────────────────────────────────
  logout() { this.clearSession(); window.location.replace('login.html'); },

  // ── Guard: call at top of every protected page ────────────────
  requireAuth() {
    const s = this.getSession();
    if (!s) { window.location.replace('login.html'); return null; }
    return s;
  },

  // ── Redirect already-logged-in users from login page ─────────
  redirectIfLoggedIn() {
    if (this.getSession()) window.location.replace('index.html');
  },
};
