const PoiCard = ({ pois }) => {
  if (!pois?.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Attractions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {pois.map((poi, i) => {
          const props = poi.properties;
          const img = props?.image || props?.preview?.source || 'https://via.placeholder.com/300x200?text=No+Image';

          return (
            <div key={i} className="flex gap-4 bg-gray-50 rounded-lg p-4">
              <img src={img} alt={props.name} className="w-32 h-32 object-cover rounded-lg" />
              <div>
                <h3 className="font-bold">{props.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{props.wikipedia_extracts?.text || 'No description available'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PoiCard;