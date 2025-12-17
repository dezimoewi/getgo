


import React, { useEffect, useState } from "react";
import Map from "../component/Map";
import { fetchAttractions } from "../hooks/geoapify";
import AirportInfo from "../component/AirportInfo";
import CurrencyCard from "../component/CurrencyCard";
import POIList from "../component/POIList";
import WeatherCard from "../component/WeatherCard";

export default function DestinationPage({ destination }) {
  const { name, lat, lon, country } = destination;
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function loadPlaces() {
      try {
        const data = await fetchAttractions(lat, lon);
        setPlaces(data || []);
      } catch (err) {
        console.error("Failed to fetch places:", err);
        setPlaces([]);
      }
    }
    loadPlaces();
  }, [lat, lon]);

  return (
    <div className="space-y-6 p-4">
      {/* Map at top */}
      <Map lat={lat} lon={lon} places={places} />

      {/* Destination Info */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="text-sm text-slate-600">{country}</div>
      </div>

      {/* Weather, POIs, Currency, Airport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <WeatherCard lat={lat} lon={lon} />
          <POIList lat={lat} lon={lon} />
        </div>

        <aside className="space-y-4">
          <CurrencyCard countryCode={country} />
          <AirportInfo lat={lat} lon={lon} />
        </aside>
      </div>
    </div>
  );
}
