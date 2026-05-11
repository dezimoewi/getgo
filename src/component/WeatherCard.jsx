import React from "react";
import useWeather from "../hooks/useWeather";

export default function WeatherCard({ lat, lon }) {
  const { status, data, error } = useWeather(lat, lon);

  if (status === "loading") return <div className="loading-text">Loading...</div>;
  if (status === "error") return <div className="error-text">Error: {error?.message}</div>;

  const current = data.current; 

  return (
    <div>
      <p className="weather-temp">{Math.round(current.temp_c)}°C</p>
      <p className="weather-condition">{current.condition.text}</p>
      <img className="weather-icon" src={current.condition.icon} alt="Weather icon" />
    </div>
  );
}
