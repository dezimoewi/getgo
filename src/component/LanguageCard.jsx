import React from "react";

export default function LanguageCard({ languages = [] }) {
  if (!Array.isArray(languages) || languages.length === 0) return null;

  return (
    <div className="language-tags">
      {languages.map((lang, index) => (
        <span key={`${lang}-${index}`} className="language-tag">
          {lang}
        </span>
      ))}
    </div>
  );
}

