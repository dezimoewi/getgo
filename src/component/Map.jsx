import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ lat, lon, places = [], city, country }) {
  useEffect(() => {
    if (lat == null || lon == null) return;

    const map = L.map("map", { zoomControl: true }).setView([lat, lon], 12);

    L.tileLayer(
      `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`,
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    // Main marker
    L.marker([lat, lon]).addTo(map).bindPopup(`${city || "Selected Location"}, ${country || ""}`);

    // Additional places
    places.forEach((place) => {
      const { lat: pLat, lon: pLon, name } = place.properties || {};
      if (pLat != null && pLon != null) {
        L.marker([pLat, pLon]).addTo(map).bindPopup(name || "Unnamed place");
      }
    });

    return () => map.remove();
  }, [lat, lon, places, city, country]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Map Header */}
      {(city || country) && (
        <div className="bg-gray-100 px-4 py-2 border-b text-gray-800 font-medium">
          {city && <span>{city}</span>}
          {city && country && <span>, </span>}
          {country && <span>{country}</span>}
        </div>
      )}
      {/* Map */}
      <div
        id="map"
        style={{ width: "100%", height: "450px" }}
        className="rounded-b-xl"
      ></div>
    </div>
  );
}
