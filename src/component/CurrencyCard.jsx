


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
    return <div className="bg-white rounded-xl shadow p-5">Loading currency…</div>;

  if (status === "error")
    return (
      <div className="bg-rose-50 text-rose-700 rounded-xl shadow p-5">
        Currency data unavailable
      </div>
    );

  if (!currency || !rates) return null;

  const sortedRates = [
    ...COMMON_CURRENCIES.filter(c => c in rates),
    ...Object.keys(rates).filter(c => !COMMON_CURRENCIES.includes(c)),
  ];

  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">💱 Currency</h3>
        <span className="text-sm text-slate-500">{currency}</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {COMMON_CURRENCIES.filter(c => c in rates).map(code => {
          const value = rates[code];
          return (
            <div
              key={code}
              className="flex justify-between bg-slate-50 rounded-lg px-3 py-2 text-sm"
            >
              <span className="font-medium">{code}</span>
              <span className="text-slate-600">
                {value < 0.01 ? value.toFixed(4) : value.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-center items-center gap-2 text-sm font-medium
                   bg-slate-100 hover:bg-slate-200 transition rounded-lg py-2"
      >
        {open ? "Hide exchange rates ▲" : "Show all exchange rates ▼"}
      </button>

      {open && (
        <div className="border-t pt-4 max-h-72 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {sortedRates.map(code => {
              const value = rates[code];
              return (
                <div
                  key={code}
                  className="flex justify-between bg-slate-50 rounded-lg px-3 py-2 text-sm"
                >
                  <span className="font-medium">{code}</span>
                  <span className="text-slate-600">
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
