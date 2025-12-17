import React from "react";
import useWeather from "../hooks/useWeather";

export default function WeatherCard({ lat, lon }) {
  const { status, data, error } = useWeather(lat, lon);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error?.message}</div>;

  const current = data.current; 

  return (
    <div>
      <div>{Math.round(current.temp_c)}°C</div>
      <div>{current.condition.text}</div>
      <img src={current.condition.icon} alt="Weather icon" />
    </div>
  );
}
