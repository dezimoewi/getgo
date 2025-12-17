const KEY = import.meta.env.VITE_EXCHANGERATE_KEY;
const BASE = "https://v6.exchangerate-api.com/v6";

export async function getLatestRates(base = "USD") {
  if (!KEY) throw new Error("Missing ExchangeRate key");
  const url = `${BASE}/${KEY}/latest/${base}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("ExchangeRate fetch failed");
  return res.json();
}
