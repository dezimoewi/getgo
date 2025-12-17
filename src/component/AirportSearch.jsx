import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY;

export default function AirportSearch() {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchAirports() {
      try {
        const lat = 4.0511;
        const lon = 9.7679;

        const res = await fetch(
          `https://api.opentripmap.com/0.1/en/places/radius?radius=50000&lon=${lon}&lat=${lat}&kinds=airports&apikey=${API_KEY}`
        );

        const data = await res.json();

        if (isMounted) {
          setAirports(data.features || []);
        }
      } catch (error) {
        console.errors("Airport Fetch Error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchAirports();

    return () => {
      isMounted = false;
    };
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
