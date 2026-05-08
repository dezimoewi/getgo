const LanguageCard = ({ country }) => {
  if (!country) return null;

  const languages = Object.values(country.languages || {});

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Languages</h3>
      </div>
      {languages.length > 0 ? (
        <ul className="space-y-3">
          {languages.map((lang, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-violet-500 shrink-0" />
              <span className={i === 0 ? 'font-semibold text-slate-800' : 'text-slate-600'}>{lang}</span>
              {i === 0 && <span className="text-[10px] bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full">Primary</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-400">No language data available</p>
      )}
    </div>
  );
};

export default LanguageCard;