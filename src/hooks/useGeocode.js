////usegeoapi

import { useState } from "react";

export function useGeocode() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function searchCity(city) {
    setStatus("loading");
    try {
      const API = import.meta.env.VITE_GEOAPIFY_KEY;
      const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        city
      )}&format=json&apiKey=${API}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch city");

      const json = await res.json();
      if (!json.results || json.results.length === 0)
        throw new Error("City not found");

      setData(json.results[0]);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  }

  return { status, data, error, searchCity };
}
