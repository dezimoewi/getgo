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
    <div className="airport-grid">
      {airports.map((airport) => (
        <div key={airport.id} className="airport-item">
          <div className="airport-item-info">
            <span className="airport-iata">{airport.iata || "—"}</span>
            <span className="airport-name">{airport.name}</span>
          </div>
          <span className="airport-distance">
            {(airport.distance / 1000).toFixed(1)} km
          </span>
        </div>
      ))}
    </div>
  );
}
