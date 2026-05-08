const LanguageCard = ({ country }) => {
  if (!country) return null;

  const languages = Object.values(country.languages || {});

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🗣️</span>
        <h3 className="text-lg font-semibold text-white/90">Languages</h3>
      </div>
      {languages.length > 0 ? (
        <ul className="space-y-3">
          {languages.map((lang, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-violet-400 shrink-0" />
              <span className={i === 0 ? 'font-semibold' : 'text-white/70'}>{lang}</span>
              {i === 0 && <span className="text-[10px] bg-violet-500/30 text-violet-300 px-2 py-0.5 rounded-full">Primary</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-white/50">No language data available</p>
      )}
    </div>
  );
};

export default LanguageCard;