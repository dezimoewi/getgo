///useweather


import { useState, useEffect } from "react";

export default function useWeather(lat, lon) {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    async function fetchWeather() {
      try {
        setStatus("loading");

        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch weather");

        const json = await res.json();
        setData(json); 
        setStatus("success");
      } catch (err) {
        setError(err);
        setStatus("error");
      }
    }

    fetchWeather();
  }, [lat, lon]);

  return { status, data, error };
}
