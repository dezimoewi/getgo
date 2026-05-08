const ActivitiesGrid = ({ pois }) => {
  if (!pois?.length) return null;

  const activities = pois.slice(0, 8);

  return (
    <div className="glass rounded-3xl p-10 glass-hover mt-8">
      <h3 className="text-3xl font-bold mb-8">Things to Do & Experiences 🎡</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((poi, i) => (
          <div
            key={i}
            className="bg-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition"
          >
            <div className="text-5xl mb-4">
              {i % 4 === 0 ? '🏛️' : i % 4 === 1 ? '🗼' : i % 4 === 2 ? '🎨' : '🌳'}
            </div>
            <h4 className="text-xl font-semibold">{poi.properties.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesGrid;