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

  if (status === "loading") return <div className="loading-text">Loading languages…</div>;
  if (status === "error") return <div className="error-text">Language info unavailable</div>;
  if (!languages.length) return null;

  return (
    <div>
      <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Languages Spoken</h3>
      <ul className="language-list">
        {languages.map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
    </div>
  );
}
