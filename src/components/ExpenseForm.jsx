import { useState, useEffect } from "react";

const inputStyle = {
  width: "100%",
  background: "var(--bg-input)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  padding: "10px 14px",
  color: "var(--fg-primary)",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle = {
  fontFamily: "var(--font-display)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "var(--fg-muted)",
  marginBottom: "6px",
  display: "block",
};

export default function ExpenseForm({
  addExpense,
  editingExpense,
  updateExpense,
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (editingExpense) {
      setName(editingExpense.name);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
    } else {
      setName("");
      setAmount("");
      setCategory("Food");
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      name,
      amount: Number(amount),
      category,
    };
    if (editingExpense) {
      updateExpense(newExpense);
    } else {
      addExpense(newExpense);
    }
    setName("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      {editingExpense && (
        <div
          style={{
            background: "var(--accent-dim)",
            border: "1px solid var(--accent-border)",
            borderRadius: "var(--radius-sm)",
            padding: "8px 12px",
            fontSize: "12px",
            color: "var(--accent)",
            fontWeight: 600,
          }}
        >
          ✎ Editing: {editingExpense.name}
        </div>
      )}

      <div>
        <label style={labelStyle}>Name</label>
        <input
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          onFocus={() => setFocusedField("name")}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            borderColor:
              focusedField === "name" ? "var(--accent)" : "var(--border)",
          }}
        />
      </div>

      <div>
        <label style={labelStyle}>Amount</label>
        <input
          placeholder="0.00"
          value={amount}
          type="number"
          step="0.01"
          min="0.01"
          onChange={(e) => setAmount(e.target.value)}
          required
          onFocus={() => setFocusedField("amount")}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            borderColor:
              focusedField === "amount" ? "var(--accent)" : "var(--border)",
          }}
        />
      </div>

      <div>
        <label style={labelStyle}>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onFocus={() => setFocusedField("category")}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            borderColor:
              focusedField === "category" ? "var(--accent)" : "var(--border)",
            cursor: "pointer",
          }}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Marketing</option>
          <option>Utilities</option>
          <option>Others</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          background: "var(--accent)",
          color: "#ffffff",
          border: "none",
          borderRadius: "var(--radius-sm)",
          padding: "12px 20px",
          fontFamily: "var(--font-display)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.05em",
          cursor: "pointer",
          transition: "opacity 0.2s, transform 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}
