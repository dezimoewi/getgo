
//fectpois

export async function fetchPOIs(lat, lon, radius = 5000) {

  try {
    const url = `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch POIs");

    const data = await res.json();
    return data.features || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}
