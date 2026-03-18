import { useEffect, useState } from "react";

export default function CurrencyConverter({ total }) {
  const [currency, setCurrency] = useState("USD");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [focused, setFocused] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (!apiKey) {
      setError("API key missing");
      setLoading(false);
      return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.result === "error") {
          throw new Error(data["error-type"] || "API error");
        }
        if (data.conversion_rates) {
          setRate(data.conversion_rates[currency]);
        } else {
          throw new Error("Invalid response from API");
        }
      })
      .catch((err) => {
        setError("Couldn't fetch exchange rates. Please try again later.");
        console.error("Currency API error:", err);
      })
      .finally(() => setLoading(false));
  }, [currency, apiKey]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Currency selector */}
      <div style={{ position: "relative" }}>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: "var(--bg-input)",
            border: `1px solid ${focused ? "var(--accent)" : "var(--border)"}`,
            borderRadius: "var(--radius-sm)",
            padding: "10px 14px",
            color: "var(--fg-primary)",
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            fontWeight: 600,
            outline: "none",
            cursor: "pointer",
            transition: "border-color 0.2s",
            appearance: "none",
          }}
        >
          <option value="USD">🇺🇸 USD — US Dollar</option>
          <option value="EUR">🇪🇺 EUR — Euro</option>
          <option value="GBP">🇬🇧 GBP — British Pound</option>
          <option value="INR">🇮🇳 INR — Indian Rupee</option>
          <option value="AED">🇦🇪 AED — UAE Dirham</option>
          <option value="SGD">🇸🇬 SGD — Singapore Dollar</option>
        </select>
        {/* Dropdown arrow */}
        <span
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--fg-muted)",
            pointerEvents: "none",
            fontSize: "12px",
          }}
        >
          ▾
        </span>
      </div>

      {/* Loading state */}
      {loading && (
        <div
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "var(--fg-muted)",
              fontSize: "13px",
              fontStyle: "italic",
              fontFamily: "var(--font-body)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          >
            ⏳ Fetching exchange rates...
          </p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div
          style={{
            background: "var(--danger-dim)",
            border: "1px solid rgba(255,77,77,0.25)",
            borderRadius: "var(--radius-sm)",
            padding: "14px 16px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span>
          <p
            style={{
              color: "var(--danger)",
              fontSize: "13px",
              fontFamily: "var(--font-body)",
              lineHeight: 1.5,
            }}
          >
            {error}
          </p>
        </div>
      )}

      {/* Success state */}
      {!loading && !error && rate !== null && (
        <div
          style={{
            background: "var(--accent-dim)",
            border: "1px solid var(--accent-border)",
            borderRadius: "var(--radius-sm)",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "6px",
              opacity: 0.75,
            }}
          >
            Converted Total
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.7rem",
              fontWeight: 800,
              color: "var(--accent)",
              letterSpacing: "-0.02em",
            }}
          >
            {(total * rate).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            <span style={{ fontSize: "0.9rem", fontWeight: 600, opacity: 0.7 }}>
              {currency}
            </span>
          </p>
          <p
            style={{
              marginTop: "8px",
              fontSize: "11px",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            1 USD = {rate.toFixed(4)} {currency}
          </p>
        </div>
      )}
    </div>
  );
}
