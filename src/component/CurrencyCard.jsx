


import React, { useEffect, useState } from "react";

const EXCHANGE_KEY = import.meta.env.VITE_EXCHANGERATE_KEY;
const COMMON_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD"];

export default function CurrencyCard({ countryCode }) {
  const [currency, setCurrency] = useState(null);
  const [rates, setRates] = useState(null);
  const [status, setStatus] = useState("idle");
  const [open, setOpen] = useState(false); 

  useEffect(() => {
    if (!countryCode) return;

    let cancelled = false;

    async function loadCurrencyAndRates() {
      setStatus("loading");

      try {
        const resCountry = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        const countryData = await resCountry.json();
        if (cancelled) return;

        const localCurrency = Object.keys(
          countryData[0].currencies || {}
        )[0];
        setCurrency(localCurrency);

        const resRates = await fetch(
          `https://v6.exchangerate-api.com/v6/${EXCHANGE_KEY}/latest/${localCurrency}`
        );
        const rateData = await resRates.json();
        if (cancelled) return;

        if (rateData.result !== "success") {
          throw new Error("Exchange rate fetch failed");
        }

        setRates(rateData.conversion_rates);
        setStatus("success");
      } catch (err) {
        console.error(err);
        if (!cancelled) setStatus("error");
      }
    }

    loadCurrencyAndRates();
    return () => (cancelled = true);
  }, [countryCode]);

  if (status === "loading")
    return <div className="loading-text">Loading currency…</div>;

  if (status === "error")
    return <div className="error-text">Currency data unavailable</div>;

  if (!currency || !rates) return null;

  const sortedRates = [
    ...COMMON_CURRENCIES.filter(c => c in rates),
    ...Object.keys(rates).filter(c => !COMMON_CURRENCIES.includes(c)),
  ];

  return (
    <div>
      <div className="currency-header">
        <h3>Currency</h3>
        <span>{currency}</span>
      </div>

      <div className="currency-grid">
        {COMMON_CURRENCIES.filter(c => c in rates).map(code => {
          const value = rates[code];
          return (
            <div key={code} className="currency-item">
              <span className="code">{code}</span>
              <span className="value">
                {value < 0.01 ? value.toFixed(4) : value.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      <button onClick={() => setOpen(!open)} className="currency-toggle">
        {open ? "Hide exchange rates ▲" : "Show all exchange rates ▼"}
      </button>

      {open && (
        <div className="currency-expanded">
          <div className="currency-grid">
            {sortedRates.map(code => {
              const value = rates[code];
              return (
                <div key={code} className="currency-item">
                  <span className="code">{code}</span>
                  <span className="value">
                    {value < 0.01 ? value.toFixed(4) : value.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
