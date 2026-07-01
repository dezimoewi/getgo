import React, { useEffect, useState } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import Map from "../component/Map";
import WeatherCard from "../component/WeatherCard";
import AirportInfo from "../component/AirportInfo";
import CurrencyCard from "../component/CurrencyCard";
import LanguageCard from "../component/LanguageCard";
import ActivitiesList from "../component/ActivitiesList";
import { fetchAttractions } from "../hooks/geoapify";
import { getCurrencyForCountry, getLanguagesForCountry } from "../utils/countryCurrency";

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
      <div className="section-header">
        <span className="section-icon attractions">🏛️</span>
        <h3>Popular Attractions</h3>
      </div>
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

export default function SearchResults() {
  const { state } = useLocation();

  // Extract the ISO 3166-1 alpha-2 code from router state (passedCode / geocode.countryCode)
  // so we never need restcountries.com.
  const {
    lat,
    lon,
    country,
    city,
    countryCode: passedCode,
    country_code,
    geocode,
  } = state || {};

  const extractedCode =
    passedCode ||
    country_code ||
    geocode?.countryCode ||
    geocode?.country_code ||
    null;

  const countryCode = extractedCode ? String(extractedCode).toUpperCase() : null;

  const currency = countryCode ? getCurrencyForCountry(countryCode) : null;
  const languages = countryCode ? getLanguagesForCountry(countryCode) : [];

  if (!lat || !lon) return <Navigate to="/" />;

  return (
    <div className="results-page">
      {/* Sticky Navigation */}
      <nav className="results-nav">
        <Link to="/" className="results-nav-brand">
          Get<span>Go</span>
        </Link>
        <Link to="/" className="results-nav-back">
          ← New Search
        </Link>
      </nav>

      <div className="results-container">
        {/* Page Header */}
        <div className="results-header">
          <h1>{city || "Destination"}</h1>
          {country && <p className="location-sub">{country}</p>}
        </div>

        {/* Map */}
        <Map lat={lat} lon={lon} city={city} country={country} />

        {/* Weather & Currency Row */}
        <div className="grid-2">
          <div className="card">
            <div className="section-header">
              <span className="section-icon weather">🌤️</span>
              <h3>Weather</h3>
            </div>
            <WeatherCard lat={lat} lon={lon} />
          </div>

          {countryCode && (
            <div className="card">
              <CurrencyCard currency={currency} />
            </div>
          )}
        </div>

        {/* Language */}
        {countryCode && (
          <div className="card">
            <div className="section-header">
              <span className="section-icon language">🗣️</span>
              <h3>Languages Spoken</h3>
            </div>
            <LanguageCard languages={languages} />
          </div>
        )}

        {/* Attractions & Activities */}
        <div className="grid-2">
          <AttractionsList lat={lat} lon={lon} />
          <div className="card">
            <ActivitiesList lat={lat} lon={lon} city={city} country={country} />
          </div>
        </div>

        {/* Airport */}
        <div className="card">
          <div className="section-header">
            <span className="section-icon airport">✈️</span>
            <h3>Nearby Airports</h3>
          </div>
          <AirportInfo lat={lat} lon={lon} country={country} />
        </div>
      </div>
    </div>
  );
}

