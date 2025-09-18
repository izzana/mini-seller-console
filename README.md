# Mini Seller Console (React + TypeScript + Vite + Tailwind)

A lightweight, responsive console to **triage Leads** and **convert them into Opportunities**.  
Focuses on clean architecture, solid UX states, and testability.

https://github.com/your-org/mini-seller-console *(replace with your repo)*

---

## ✨ Features

- **Leads List**
  - Load from local JSON (`public/leads.json`)
  - Fields: `id`, `name`, `company`, `email`, `source`, `score`, `status`
  - **Search** (name/company), **Filter** (status), **Sort** (score desc/asc)
- **Lead Detail Panel**
  - Slide-over (full-screen on mobile, 28rem on desktop)
  - Inline edit **email** (validation) & **status**
  - Save / Cancel with basic error handling
  - **Convert to Opportunity**
- **Opportunities**
  - Simple table + mobile cards
  - Fields: `id`, `name`, `stage`, `amount?`, `accountName`
- **UX States**
  - Loading, empty, and simple error states
  - Smooth with ~100 leads
- **Nice-to-haves implemented**
  - ✅ Persist search/filter/sort in `localStorage`
  - ✅ Fully responsive (mobile ↔ desktop)
  - (Optional spot for) Optimistic updates + rollback

---

## 🧱 Tech Stack

- **Vite** (React + TS)
- **Tailwind CSS 3.x**
- **React Testing Library + Vitest** (unit tests)
- No backend — **static JSON + `setTimeout`** to simulate latency

---

## 📁 Project Structure

```
mini-seller-console/
├─ public/
│  └─ leads.json                # data source (~100 records)
├─ src/
│  ├─ components/
│  │  ├─ LeadsTable.tsx         # search/filter/sort + responsive table/cards
│  │  ├─ LeadDetail.tsx         # slide-over + edit + convert
│  │  └─ Opportunities.tsx      # simple table/cards
│  ├─ hooks/
│  │  └─ useLocalStorage.ts     # state persisted to localStorage
│  ├─ test/
│  │  ├─ fixtures/leads.ts      # test data
│  │  ├─ utils/{dom.ts,testids.ts}
│  │  ├─ LeadsTable.test.tsx
│  │  ├─ LeadDetail.test.tsx
│  │  ├─ Opportunities.test.tsx
│  │  └─ setup.ts
│  ├─ types/index.ts            # Lead/Opportunity types
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css                 # Tailwind entry
├─ index.html
├─ tailwind.config.js (or .cjs)
├─ postcss.config.js (or .cjs)
├─ vite.config.ts
└─ vitest.config.ts
```

---

## 🚀 Getting Started

### 1) Install
```bash
npm install
```

### 2) Dev
```bash
npm run dev
```
Open the URL printed in your terminal.

### 3) Build & Preview
```bash
npm run build
npm run preview
```

---

## 🗂️ Data Source (`public/leads.json`)

Example (trim as needed to ~100 rows):

```json
[
  {
    "id": "1",
    "name": "Alice",
    "company": "Innovate",
    "email": "alice@innovate.com",
    "source": "Web",
    "score": 90,
    "status": "New"
  },
  {
    "id": "2",
    "name": "Bob",
    "company": "Global",
    "email": "bob@global.com",
    "source": "Referral",
    "score": 80,
    "status": "Qualified"
  }
]
```

---

## 🧪 Testing

### Run tests (Vitest)
```bash
npm run test
# or watch mode:
npx vitest -w
```

### Testing Notes
- DOM queries use **`data-testid`** to scope mobile/desktop variants:
  - `leads-desktop`, `leads-mobile`
  - `opps-desktop`, `opps-mobile`, `opps-empty`
- Jest-DOM matchers enabled via `@testing-library/jest-dom/vitest`
- `globals: true` set in `vitest.config.ts`

---

## 🎨 Tailwind Setup (3.x)

**Files live in the project root**:

**`tailwind.config.js`**
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

**`postcss.config.js`**
```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
}
```

**`src/index.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body { @apply bg-gray-50 text-gray-900; }
```

**Tip:** If using `"type": "module"` in `package.json`, keep configs as `.js` with `export default`.  
If you prefer CommonJS, use `.cjs` + `module.exports = {}`.

---

## 🧭 UX & Behavior

- **Search** matches `name` OR `company` (case-insensitive).
- **Filter** by exact `status`.
- **Sort** toggles score `desc` → `asc`.
- **Persisted state** (search/filter/sort) via `useLocalStorage`.
- **LeadDetail**
  - Email validation: basic regex; error message shown inline.
  - Save resets editing state; Cancel restores values.
  - Convert creates an Opportunity (`Prospecting` stage by default).
- **Responsive**
  - Mobile: list as **cards**; panel is **full-screen**.
  - Desktop: **table** view; panel width ≈ 28rem.

---

## 🧩 Accessibility

- Semantic roles for tables & cells
- Buttons have `aria-label` where needed
- Slide-over focusable controls & clear close action

---

## 📝 License

MIT © Izzana — feel free to use, learn, and adapt.
