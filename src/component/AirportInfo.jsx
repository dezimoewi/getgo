///AirportInfo.jsx
import React, { useEffect, useState } from "react";
import { fetchNearestAirport } from "../hooks/geoapify";

export default function AirportInfo({ lat, lon }) {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    async function loadAirports() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchNearestAirport(lat, lon, null, 10); 
        if (data.length === 0) {
          setError("No nearby airports found within 1000 km.");
        } else {
          setAirports(data);
        }
      } catch (err) {
        console.error("Failed to fetch airports:", err);
        setError("Unable to load airports");
      } finally {
        setLoading(false);
      }
    }

    loadAirports();
  }, [lat, lon]);

  if (loading)
    return <div className="bg-white p-4 rounded shadow">Loading airports…</div>;

  if (error)
    return (
      <div className="bg-white p-4 rounded shadow text-red-500">{error}</div>
    );

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="font-bold text-lg">Nearby Airports</h3>
      <ul className="list-disc list-inside">
        {airports.map((airport) => (
          <li key={airport.id}>
            {airport.name} ({airport.iata || "N/A"}) —{" "}
            {(airport.distance / 1000).toFixed(1)} km away
          </li>
        ))}
      </ul>
    </div>
  );
}
