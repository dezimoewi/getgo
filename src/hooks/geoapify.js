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

  function toRad(deg) {
    return (deg * Math.PI) / 180;
  }

  function haversineMeters(lat1, lon1, lat2, lon2) {
    if (
      [lat1, lon1, lat2, lon2].some((v) => typeof v !== "number" || Number.isNaN(v))
    ) {
      return null;
    }

    const R = 6371e3; // meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

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

          const airportLat = props.lat;
          const airportLon = props.lon;

          // Prefer Geoapify's provided distance (meters). If absent, compute locally.
          const geoapifyDistanceM =
            typeof props.distance === "number" ? props.distance : null;

          const computedDistanceM = haversineMeters(
            lat,
            lon,
            airportLat,
            airportLon
          );

          const distanceM =
            geoapifyDistanceM ?? computedDistanceM ?? 0;

          return {
            id: props.place_id,
            name: props.name || "Unnamed Airport",
            type: props.subclass || "Unknown Type",
            iata: props.iata || "",
            icao: props.icao || "",
            lat: airportLat,
            lon: airportLon,
            distance: Math.round(distanceM),
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
