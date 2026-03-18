import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({
  expenses,
  setEditingExpense,
  deleteExpense,
}) {
  return (
    <div className="expense-list-scroll">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              deleteExpense={deleteExpense}
              setEditingExpense={setEditingExpense}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 20px",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "32px", opacity: 0.3 }}>📭</span>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--fg-muted)",
                fontSize: "14px",
                fontStyle: "italic",
              }}
            >
              No expenses recorded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
