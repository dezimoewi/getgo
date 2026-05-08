const AttractionsGrid = ({ pois }) => {
  if (!pois?.length) {
    return (
      <div className="rounded-2xl p-8 text-center bg-slate-50 border border-slate-200">
        <p className="text-slate-400">No attractions found nearby</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-5">Nearby Attractions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {pois.slice(0, 6).map((poi, i) => {
          const p = poi.properties;
          return (
            <div
              key={i}
              className="flex items-start gap-3 bg-white hover:bg-slate-100 rounded-xl p-4 transition-all duration-200 cursor-default border border-slate-100"
            >
              <div className="min-w-0">
                <h4 className="font-medium text-sm leading-tight text-slate-700">{p.name}</h4>
                {p.wikipedia_extracts?.text && (
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.wikipedia_extracts.text}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttractionsGrid;