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
    return <div className="loading-text">Loading airports…</div>;

  if (error)
    return <div className="error-text">{error}</div>;

  return (
    <div>
      <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Nearby Airports</h3>
      <ul className="airport-list">
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
