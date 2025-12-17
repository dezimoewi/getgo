import React, { useEffect, useState } from "react";

export default function LanguageCard({ countryCode }) {
  const [languages, setLanguages] = useState([]);
  const [status, setStatus] = useState("idle"); 
  useEffect(() => {
    if (!countryCode) return;

    let cancelled = false;

    async function fetchLanguages() {
      setStatus("loading");
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await res.json();
        if (cancelled) return;

        const langObj = data[0]?.languages || {};
        const langArray = Object.values(langObj);
        setLanguages(langArray);
        setStatus("success");
      } catch (err) {
        console.error("Failed to fetch languages:", err);
        if (!cancelled) setStatus("error");
      }
    }

    fetchLanguages();
    return () => { cancelled = true; };
  }, [countryCode]);

  if (status === "loading") return <div className="p-4 bg-white rounded shadow">Loading languages…</div>;
  if (status === "error") return <div className="p-4 bg-rose-50 rounded text-rose-800">Language info unavailable</div>;
  if (!languages.length) return null;

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="font-semibold mb-2">Languages Spoken</div>
      <ul className="list-disc list-inside text-sm text-slate-700">
        {languages.map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
    </div>
  );
}
