////useaieport

export async function fetchNearestAirport(lat, lon, countryCode, limit = 5, radius = 150000) {
  try {
    if (!lat || !lon) return [];

    const safeLimit = Math.min(limit, 500);
    

    let filter = `circle:${lon},${lat},${radius}`;
    if (countryCode) {
      filter += `|countrycode:${countryCode.toUpperCase()}`;
    }

    const url = `https://api.geoapify.com/v2/places?categories=transport.airport&filter=${filter}&limit=${safeLimit}&apiKey=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Geoapify error: ${res.status} ${text}`);
    }

    const data = await res.json();

    return (data.features || []).map((a) => {
      const p = a.properties;
      return {
        id: p.place_id,
        name: p.name || "Unnamed Airport",
        iata: p.iata || "N/A",
        icao: p.icao || "N/A",
        lat: p.lat,
        lon: p.lon,
        distance: Math.round(p.distance || 0),
      };
    });
  } catch (err) {
    console.error("Airport fetch failed:", err);
    return [];
  }
}
