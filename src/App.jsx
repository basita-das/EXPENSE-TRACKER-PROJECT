import "./App.css";
import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryPanel from "./components/SummaryPanel";
import CurrencyConverter from "./components/CurrencyConverter";

function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === "dark";
  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div
        className="toggle-track"
        style={{ background: isDark ? "var(--accent)" : "var(--bg-input)" }}
      >
        <div
          className="toggle-thumb"
          style={{
            left: isDark ? "18px" : "2px",
            background: isDark ? "#0a0a0a" : "#888",
          }}
        />
      </div>
      <span className="toggle-label">{isDark ? "🌙 Dark" : "☀️ Light"}</span>
    </button>
  );
}

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const addExpense = (expense) => setExpenses([...expenses, expense]);
  const updateExpense = (updated) => {
    setExpenses(expenses.map((e) => (e.id === updated.id ? updated : e)));
    setEditingExpense(null);
  };
  const deleteExpense = (id) =>
    setExpenses(expenses.filter((e) => e.id !== id));
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="app-wrapper">
      {/* Fixed bottom-right theme toggle */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      {/* Header */}
      <header className="app-header">
        <div className="header-badge">
          <span className="header-badge-dot" />
          <span className="header-badge-text">Finance Dashboard</span>
        </div>
        <h1>
          Expense <span>Tracker</span>
        </h1>
      </header>

      {/* Responsive grid */}
      <main className="app-grid">
        {/* Left — Entry + Currency */}
        <section className="col-left">
          <div className="card">
            <h2 className="card-heading">Entry</h2>
            <ExpenseForm
              addExpense={addExpense}
              editingExpense={editingExpense}
              updateExpense={updateExpense}
            />
          </div>
          <div className="card">
            <h2 className="card-heading">Currency Converter</h2>
            <CurrencyConverter total={total} />
          </div>
        </section>

        {/* Middle — Expense List */}
        <section className="col-middle card">
          <h2 className="card-heading">Expense List</h2>
          <ExpenseList
            expenses={expenses}
            deleteExpense={deleteExpense}
            setEditingExpense={setEditingExpense}
          />
        </section>

        {/* Right — Summary */}
        <section className="col-right card">
          <h2 className="card-heading">Summary</h2>
          <SummaryPanel expenses={expenses} />
        </section>
      </main>
    </div>
  );
}

export default App;
