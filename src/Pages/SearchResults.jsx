import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Map from "../component/Map";
import WeatherCard from "../component/WeatherCard";
import AirportInfo from "../component/AirportInfo";
import CurrencyCard from "../component/CurrencyCard";
import LanguageCard from "../component/LanguageCard";
import ActivitiesList from "../component/ActivitiesList";
import { fetchAttractions } from "../hooks/geoapify";

// Attractions list component
function AttractionsList({ lat, lon, limit = 10 }) {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lon) return;

    let isMounted = true;

    async function getAttractions() {
      try {
        const data = await fetchAttractions(lat, lon, limit);
        if (isMounted) setAttractions(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    getAttractions();

    return () => {
      isMounted = false;
    };
  }, [lat, lon, limit]);

  if (loading) return <p className="loading-text">Loading attractions...</p>;
  if (!attractions.length) return <p>No attractions found.</p>;

  return (
    <div className="card attractions-list">
      <h3>Popular Attractions</h3>
      <ul>
        {attractions.map((poi) => (
          <li key={poi.properties.place_id}>
            {poi.properties.name || "Unnamed place"}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main SearchResults component
export default function SearchResults() {
  const { state } = useLocation();
  const { lat, lon, country, city, countryCode: passedCode } = state || {};

  const [countryCode, setCountryCode] = useState(passedCode || null);
  const [loadingCode, setLoadingCode] = useState(!passedCode);

  useEffect(() => {
    if (countryCode || !country) return;

    let isMounted = true;

    async function fetchCountryCode() {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${country}?fullText=true`
        );
        const data = await res.json();
        if (isMounted) setCountryCode(data?.[0]?.cca2 || null);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoadingCode(false);
      }
    }

    fetchCountryCode();

    return () => {
      isMounted = false;
    };
  }, [country, countryCode]);

  if (!lat || !lon) return <Navigate to="/" />;

  return (
    <div className="results-page">
      <div className="results-container">

        <div className="card">
          <h1 className="card-title">
            {city}
            <span className="sub">
              {country && `(${country})`}
            </span>
          </h1>
        </div>

        <div className="map-wrapper">
          <Map lat={lat} lon={lon} />
        </div>

        <div className="grid-2">
          <div className="card">
            <WeatherCard lat={lat} lon={lon} />
          </div>

          {loadingCode ? (
            <div className="card">
              <p className="loading-text">Loading currency...</p>
            </div>
          ) : countryCode ? (
            <div className="card">
              <CurrencyCard countryCode={countryCode} />
            </div>
          ) : null}
        </div>

        {countryCode && (
          <div className="card">
            <LanguageCard countryCode={countryCode} />
          </div>
        )}

        <div className="grid-2">
          <AttractionsList lat={lat} lon={lon} />
          <ActivitiesList lat={lat} lon={lon} />
        </div>

        <div className="card">
          <AirportInfo lat={lat} lon={lon} country={country} />
        </div>
      </div>
    </div>
  );
}
