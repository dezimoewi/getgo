const AttractionsGrid = ({ pois }) => {
  if (!pois?.length) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-white/50">No attractions found nearby</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white/90 mb-5">Nearby Attractions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {pois.slice(0, 6).map((poi, i) => {
          const p = poi.properties;
          return (
            <div
              key={i}
              className="flex items-start gap-3 bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-200 cursor-default"
            >
              <div className="min-w-0">
                <h4 className="font-medium text-sm leading-tight">{p.name}</h4>
                {p.wikipedia_extracts?.text && (
                  <p className="text-xs text-white/40 mt-1 line-clamp-2">{p.wikipedia_extracts.text}</p>
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