//geaoapi
const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export async function fetchAttractions(lat, lon, limit = 10) {
  try {
    const url = `https://api.geoapify.com/v2/places?categories=tourism,entertainment,accommodation,catering&filter=circle:${lon},${lat},5000&limit=${limit}&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.features || [];
  } catch (err) {
    console.error("Geoapify error (POIs):", err);
    return [];
  }
}


export async function fetchNearestAirport(lat, lon, countryCode = null) {
  const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;
  const categories = [
    "airport.international",
    "airport.private",
    "airport.military",
    "airport.airfield",
    "airport.gliding",
  ].join(",");

  let radius = 50000;
  const maxRadius = 1500000; 
  const step = 50000;
  try {
    while (radius <= maxRadius) {
      let url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&limit=10&apiKey=${API_KEY}`;
      
      if (countryCode && typeof countryCode === "string") {
        url += `&filter=countrycode:${countryCode.toUpperCase()}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        console.error("Geoapify error:", await res.text());
        return [];
      }

      const data = await res.json();
      if (data.features && data.features.length > 0) {
        return data.features.map((a) => {
          const props = a.properties;
          return {
            id: props.place_id,
            name: props.name || "Unnamed Airport",
            type: props.subclass || "Unknown Type",
            iata: props.iata || "",
            icao: props.icao || "",
            lat: props.lat,
            lon: props.lon,
            distance: Math.round(props.distance || 0),
          };
        });
      }

      console.log(`No airports found within ${radius / 1000} km, expanding search...`);
      radius += step;
    }

    console.log(`No airports found within ${maxRadius / 1000} km.`);
    return [];
  } catch (error) {
    console.error("Airport fetch failed:", error);
    return [];
  }
}



export async function fetchGeocode(query) {
  try {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&limit=1&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.features?.length) return null;
    const p = data.features[0].properties;
    return {
      lat: p.lat,
      lon: p.lon,
      city: p.city || p.name || query,
      country: p.country,
      countryCode: p.country_code,
    };
  } catch (err) {
    console.error("Geocode error:", err);
    return null;
  }
}
