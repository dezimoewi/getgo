///opentrip

const KEY = import.meta.env.VITE_OPENTRIPMAP_KEY;
const BASE = "https://api.opentripmap.com/0.1/en/places";

export async function findPlacesByRadius(lat, lon, radius = 5000, limit = 20, offset = 0) {
  if (!KEY) throw new Error("Missing OpenTripMap key");
  const url = `${BASE}/radius?radius=${radius}&lon=${lon}&lat=${lat}&limit=${limit}&offset=${offset}&apikey=${KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("OpenTripMap radius fetch failed");
  return res.json();
}

export async function getPlaceDetails(xid) {
  const url = `${BASE}/xid/${xid}?apikey=${KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("OpenTripMap details fetch failed");
  return res.json();
}
