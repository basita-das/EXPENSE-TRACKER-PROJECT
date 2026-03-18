const CATEGORY_COLORS = {
  Food: "#5a9900",
  Travel: "#1d4ed8",
  Marketing: "#c2410c",
  Utilities: "#6d28d9",
  Others: "#374151",
};

export default function SummaryPanel({ expenses }) {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  const categories = {};
  expenses.forEach((item) => {
    categories[item.category] = (categories[item.category] || 0) + item.amount;
  });

  const categoryEntries = Object.entries(categories);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Total spending */}
      <div
        style={{
          background: "var(--bg-input)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "20px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--fg-muted)",
            marginBottom: "6px",
          }}
        >
          Total Spending
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.4rem",
            fontWeight: 800,
            color: "var(--accent)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <p
          style={{
            marginTop: "6px",
            fontSize: "12px",
            color: "var(--fg-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          {expenses.length} {expenses.length === 1 ? "expense" : "expenses"}{" "}
          recorded
        </p>
      </div>

      {/* Category breakdown */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--fg-muted)",
            marginBottom: "14px",
            paddingBottom: "10px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          Category Breakdown
        </p>

        {categoryEntries.length === 0 ? (
          <p
            style={{
              fontSize: "13px",
              color: "var(--fg-subtle)",
              fontStyle: "italic",
              textAlign: "center",
              padding: "20px 0",
              fontFamily: "var(--font-body)",
            }}
          >
            No data yet
          </p>
        ) : (
          <>
            {/* Text summary line — e.g. "Food: $120 — Travel: $45" */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "var(--fg-muted)",
                lineHeight: 1.7,
                marginBottom: "16px",
                padding: "10px 12px",
                background: "var(--bg-input)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
              }}
            >
              {categoryEntries.map(([cat, val], i) => (
                <span key={cat}>
                  <span
                    style={{
                      color: CATEGORY_COLORS[cat] || "#9ca3af",
                      fontWeight: 600,
                    }}
                  >
                    {cat}
                  </span>
                  {": "}
                  <span style={{ color: "var(--fg-primary)", fontWeight: 500 }}>
                    ${val.toFixed(2)}
                  </span>
                  {i < categoryEntries.length - 1 && (
                    <span
                      style={{ color: "var(--fg-subtle)", margin: "0 6px" }}
                    >
                      —
                    </span>
                  )}
                </span>
              ))}
            </p>

            {/* Visual bars */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {categoryEntries.map(([cat, value]) => {
                const barColor = CATEGORY_COLORS[cat] || "#9ca3af";
                const pct = (value / (total || 1)) * 100;
                return (
                  <div key={cat}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          color: "var(--fg-primary)",
                          fontWeight: 500,
                        }}
                      >
                        {cat}
                      </span>
                      <div style={{ textAlign: "right" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "13px",
                            color: "var(--fg-muted)",
                            fontVariantNumeric: "tabular-nums",
                            display: "block",
                          }}
                        >
                          ${value.toFixed(2)}
                        </span>
                        <span
                          style={{
                            fontSize: "11px",
                            color: "var(--fg-subtle)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {pct.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        height: "4px",
                        background: "var(--bg-input)",
                        borderRadius: "100px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: barColor,
                          borderRadius: "100px",
                          transition: "width 0.5s ease",
                          boxShadow: `0 0 8px ${barColor}60`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
