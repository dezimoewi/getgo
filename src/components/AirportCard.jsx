const AirportCard = ({ airport }) => {
  if (!airport) {
    return (
      <div className="h-full flex flex-col justify-center text-center">
        <p className="text-2xl opacity-70">Nearest airport info unavailable</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-3xl font-bold mb-8">Nearest Airport 🛫</h3>
      <div className="space-y-4 text-xl">
        <p className="text-3xl font-extrabold">{airport.airport_name || 'Major Airport'}</p>
        <p className="text-2xl text-yellow-300">
          {airport.iata_code ? `(${airport.iata_code})` : ''}
        </p>
        <p className="opacity-90">
          {airport.city && `${airport.city}, `}{airport.country || 'International Hub'}
        </p>
      </div>
      <div className="mt-auto text-center">
        <span className="text-6xl">✈️</span>
      </div>
    </div>
  );
};

export default AirportCard;