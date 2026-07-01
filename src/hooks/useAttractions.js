export async function fetchAttractions(lat, lon) {
  const API = import.meta.env.VITE_GEOAPIFY_KEY;

  const url = `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${lon},${lat},5000&apiKey=${API}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.features;
}
