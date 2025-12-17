///AirportSearch.jsx

import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY;

export default function AirportSearch() {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAirportsAround = async () => {
    setLoading(true);

    try {
      const lat = 4.0511;
      const lon = 9.7679;

      const res = await fetch(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=50000&lon=${lon}&lat=${lat}&kinds=airports&apikey=${API_KEY}`
      );

      const data = await res.json();
      setAirports(data.features || []);
    } catch (error) {
      console.error("Airport Fetch Error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getAirportsAround();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Nearby Airports</h2>

      {loading && <p>Loading airports...</p>}

      {!loading && airports.length === 0 && (
        <p>No airports found in this area.</p>
      )}

      <ul className="list-disc pl-5">
        {airports.map((airport) => (
          <li key={airport.id}>
            {airport.properties.name || "Unnamed Airport"}
          </li>
        ))}
      </ul>
    </div>
  );
}
