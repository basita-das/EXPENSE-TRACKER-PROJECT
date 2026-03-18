# 💸 Expense Tracker

A personal expense tracking web app built with React + Vite, themed after [Marketing Mojito](https://marketingmojito.com). Track, categorise, and manage your expenses with live currency conversion powered by ExchangeRate-API.

---

## ✨ Features

- **Add Expenses** — Log expenses with a name, amount, and category
- **Edit & Delete** — Modify or remove any expense entry
- **Running Total** — Live total that updates as you add or remove expenses
- **Category Breakdown** — Visual progress bars + text summary (e.g. `Food: $120 — Travel: $45`)
- **Live Currency Conversion** — Real-time conversion using ExchangeRate-API (USD, EUR, GBP, INR, AED, SGD)
- **Dark / Light Mode** — Toggle between themes, preference saved to localStorage
- **Persistent Storage** — Expenses and theme preference saved in localStorage
- **Fully Responsive** — Works at 1600px (desktop), 1024px (tablet), and 414px (mobile)

---

## 🛠️ Tech Stack

| Technology       | Purpose                      |
| ---------------- | ---------------------------- |
| React 19         | UI framework                 |
| Vite 7           | Build tool & dev server      |
| Tailwind CSS v4  | Styling                      |
| ExchangeRate-API | Live currency conversion     |
| localStorage     | Client-side data persistence |

> No third-party state management libraries. All state managed with `useState` and `useEffect`.

---

## 🗂️ Project Structure

```
src/
├── App.jsx               # Root component, state management, theme toggle
├── App.css               # Global styles, CSS variables, responsive grid
└── components/
    ├── ExpenseForm.jsx    # Add / edit expense form
    ├── ExpenseList.jsx    # Renders list of expense items
    ├── ExpenseItem.jsx    # Individual expense card with edit/delete
    ├── SummaryPanel.jsx   # Total spending + category breakdown
    └── CurrencyConverter.jsx  # Live currency conversion with API
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_API_KEY=your_exchangerate_api_key_here
```

Get a free API key at [exchangerate-api.com](https://www.exchangerate-api.com) — the free tier provides 1,500 requests/month.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

---

## 🌐 Deploying

### Vercel

```bash
npm install -g vercel
vercel
```

Add `VITE_API_KEY` in your Vercel project's Environment Variables settings.

### Netlify

Push to GitHub and connect the repo in Netlify. Add `VITE_API_KEY` under **Site Settings → Environment Variables**.

---

## 📦 Components Overview

### `ExpenseForm`

Handles both adding new expenses and editing existing ones. Controlled inputs with `useState`, pre-populated when `editingExpense` is passed in.

### `ExpenseList`

Renders all expense entries by mapping over the `expenses` array. Shows an empty state when no expenses exist.

### `ExpenseItem`

Individual expense card showing name, category badge, amount, and Edit/Delete action buttons.

### `SummaryPanel`

Displays total spending, a text-based category summary, and animated progress bars per category with percentage breakdown.

### `CurrencyConverter`

Fetches live exchange rates from ExchangeRate-API on mount and whenever the selected currency changes. Handles three UI states — loading, error, and success — without breaking the layout.

---

## 🎨 Theme

Styled to match the [Marketing Mojito](https://marketingmojito.com) brand:

- **Font:** Plus Jakarta Sans
- **Dark accent:** `#b5f23d` (lime green)
- **Light accent:** `#5a9900` (dark green)
- **Dark background:** `#0a0a0a`
- **Light background:** `#f0f0eb`

---

## 📋 Assignment Requirements Checklist

- [x] Add expense with name, amount, and category
- [x] Display expenses as a list/card layout with delete button
- [x] Running total that updates automatically
- [x] Category spending breakdown
- [x] Live currency conversion via public API
- [x] React with Vite
- [x] At least 4 meaningful components
- [x] State managed with `useState` and `useEffect` only
- [x] API loading and error states handled gracefully
- [x] Styled with Tailwind CSS (no pre-built UI kits)
- [x] Responsive at 1600px × 900px
- [x] Responsive at 414px × 749px (mobile)

---

## 🔮 Future Improvements

- Add date field to expenses and filter by date range
- Export expenses as CSV or PDF
- Budget limit per category with overspend warnings
- Client / Campaign field for agency use
- Charts using Recharts for visual spending trends
- Backend + database for multi-device sync

---

## 📄 License

This project was built as a frontend assignment for [Marketing Mojito](https://marketingmojito.com).
