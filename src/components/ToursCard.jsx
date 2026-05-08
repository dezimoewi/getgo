const ToursCard = ({ pois }) => {
  if (!pois?.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Things to Do</h2>
      <ul className="space-y-3">
        {pois.slice(0, 6).map((poi, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <span className="font-medium">{poi.properties.name}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-500 mt-4">Explore local experiences and activities</p>
    </div>
  );
};

export default ToursCard;