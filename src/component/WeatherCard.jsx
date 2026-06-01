import React from "react";
import useWeather from "../hooks/useWeather";

export default function WeatherCard({ lat, lon }) {
  const { status, data, error } = useWeather(lat, lon);

  if (status === "loading") return <div className="loading-text">Loading weather...</div>;
  if (status === "error") return <div className="error-text">Error: {error?.message}</div>;

  const current = data.current;

  return (
    <div>
      <div className="weather-content">
        <div className="weather-main">
          <p className="weather-temp">{Math.round(current.temp_c)}°</p>
          <p className="weather-condition">{current.condition.text}</p>
        </div>
        <img className="weather-icon" src={current.condition.icon} alt={current.condition.text} />
      </div>
      <div className="weather-details">
        <div className="weather-detail">
          <p className="weather-detail-label">Humidity</p>
          <p className="weather-detail-value">{current.humidity}%</p>
        </div>
        <div className="weather-detail">
          <p className="weather-detail-label">Wind</p>
          <p className="weather-detail-value">{current.wind_kph} km/h</p>
        </div>
        <div className="weather-detail">
          <p className="weather-detail-label">Feels like</p>
          <p className="weather-detail-value">{Math.round(current.feelslike_c)}°</p>
        </div>
      </div>
    </div>
  );
}
