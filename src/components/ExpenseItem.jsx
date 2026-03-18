const CATEGORY_COLORS = {
  Food: {
    bg: "rgba(90,153,0,0.1)",
    text: "#3d6e00",
    border: "rgba(90,153,0,0.25)",
  },
  Travel: {
    bg: "rgba(37,99,235,0.1)",
    text: "#1d4ed8",
    border: "rgba(37,99,235,0.25)",
  },
  Marketing: {
    bg: "rgba(194,65,12,0.1)",
    text: "#c2410c",
    border: "rgba(194,65,12,0.25)",
  },
  Utilities: {
    bg: "rgba(109,40,217,0.1)",
    text: "#6d28d9",
    border: "rgba(109,40,217,0.25)",
  },
  Others: {
    bg: "rgba(75,85,99,0.1)",
    text: "#374151",
    border: "rgba(75,85,99,0.25)",
  },
};

export default function ExpenseItem({
  expense,
  setEditingExpense,
  deleteExpense,
}) {
  const color = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Others;

  return (
    <div className="expense-item">
      {/* Info */}
      <div className="expense-item-info">
        <div className="expense-item-title-row">
          <h3 className="expense-item-name">{expense.name}</h3>
          <span
            style={{
              flexShrink: 0,
              fontSize: "11px",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: "100px",
              background: color.bg,
              color: color.text,
              border: `1px solid ${color.border}`,
              fontFamily: "var(--font-body)",
            }}
          >
            {expense.category}
          </span>
        </div>
        <p className="expense-item-amount">${expense.amount.toFixed(2)}</p>
      </div>

      {/* Actions */}
      <div className="expense-item-actions">
        <button className="btn-edit" onClick={() => setEditingExpense(expense)}>
          Edit
        </button>
        <button
          className="btn-delete"
          onClick={() => deleteExpense(expense.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
