# TrackWise — Relational Expense Analytics Platform

A dynamic, fully client-side expense analytics dashboard with Indian Rupee (₹) support, login/signup, and relational transaction intelligence.

---

## 📁 File Structure

```
trackwise/
├── login.html    ← START HERE — Sign In / Sign Up page
├── index.html    ← Main dashboard (redirects to login if not signed in)
├── style.css     ← All visual styles
├── data.js       ← Default transaction data & config
└── app.js        ← All dynamic rendering logic
```

---

## 🚀 How to Run

### Option 1 — Direct (simplest)
1. Unzip `trackwise.zip` into any folder
2. Double-click **`login.html`** to open in your browser
3. Sign up with your name, email, password, salary & spending threshold
4. You'll be redirected to the dashboard automatically

> **Tip:** Works best in Chrome, Firefox, or Edge.

### Option 2 — Local Server (recommended)
```bash
cd trackwise
python3 -m http.server 5500
```
Then open: **http://localhost:5500/login.html**

---

## 👤 Login / Sign Up Features

| Feature | Details |
|---|---|
| **Sign Up** | Name, username, email, password, monthly salary, spending threshold |
| **Password strength** | Live strength meter (weak → very strong) |
| **Username check** | Real-time availability indicator |
| **Threshold slider** | Set your monthly limit with a drag slider |
| **Auto-suggest** | Threshold auto-fills to 50% of your salary |
| **Sign In** | Username or email + password |
| **Quick access** | Chips for previously registered users |
| **Remember me** | Keeps username on next visit |
| **Session guard** | Dashboard redirects to login if not signed in |
| **Sign Out** | Available from avatar menu in top-right |

> All data is stored in browser `localStorage` — nothing is sent to any server.

---

## ✏️ How to Customise

Edit **`data.js`** to change default transactions, categories, and accounts.

---

## 🎛️ Dashboard Features
- Add / delete expenses live
- Filter by category, status, search
- Analytics & Relations views
- Budget threshold warnings
- Spending trend chart, donut chart, relation graph
- CSV export


---

## 📁 File Structure

```
trackwise/
├── index.html    ← Main page (open this in your browser)
├── style.css     ← All visual styles
├── data.js       ← Your data: transactions, accounts, config
└── app.js        ← All dynamic rendering logic
```

---

## 🚀 How to Run

### Option 1 — Direct (simplest)
1. Unzip `trackwise.zip` into any folder
2. Double-click `index.html` to open it in your browser
3. That's it! No server, no install needed.

> **Tip:** Works best in Chrome, Firefox, or Edge. Requires internet for Google Fonts (optional — fonts fall back gracefully offline).

### Option 2 — Local Server (recommended for best experience)
If you have Python installed:
```bash
cd trackwise
python3 -m http.server 5500
```
Then open: **http://localhost:5500**

Or with Node.js:
```bash
npx serve .
```

---

## ✏️ How to Customise

All your data lives in **`data.js`** — edit it in any text editor.

### Change your name / currency / budget:
```js
const APP_CONFIG = {
  currency: '₹',          // change to '$', '€', etc.
  locale: 'en-IN',        // affects number formatting
  monthlyBudget: 50000,   // your monthly limit
  userName: 'Arjun',
  userInitials: 'AJ',
};
```

### Add a transaction (in TRANSACTIONS array):
```js
{
  id: 16,
  icon: '🍕',
  name: 'Pizza Hut',
  relation: 'friday dinner',
  date: 'Mar 23',
  cat: 'Food',           // Food | Travel | Shopping | Health | Entertainment | Utilities
  amount: -450,          // negative = expense, positive = income
  status: 'cleared',     // cleared | pending | flagged
  tags: ['weekend', 'food-delivery'],
}
```

### Add an account (in ACCOUNTS array):
```js
{ id: 'icici', name: 'ICICI Credit Card', icon: '💳', balance: -8400, type: 'credit' }
```

---

## 🎛️ Features

| Feature | Description |
|---|---|
| **+ Add Expense** | Click top-right button to add transactions live |
| **Search** | Type in the search bar to filter transactions instantly |
| **Filter tabs** | All / Cleared / Pending / Flagged tabs on the table |
| **Relation Graph** | Click any node to highlight related transactions |
| **Tag Cloud** | Click a tag to filter transactions by that tag |
| **Export CSV** | Downloads all transactions as a spreadsheet |
| **Spending Chart** | Toggle Actual / Last Month / Budget lines |
| **Heatmap** | Hover cells to see daily spend estimates |
| **Transaction Detail** | Click any row for full details + flag resolution |

---

## 🛠️ Tech Stack
- Vanilla HTML + CSS + JavaScript (zero dependencies)
- Google Fonts: Syne + DM Mono
- SVG for charts and graphs (no chart library needed)
