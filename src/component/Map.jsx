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
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    L.marker([lat, lon]).addTo(map).bindPopup(`${city || "Selected Location"}, ${country || ""}`);

    places.forEach((place) => {
      const { lat: pLat, lon: pLon, name } = place.properties || {};
      if (pLat != null && pLon != null) {
        L.marker([pLat, pLon]).addTo(map).bindPopup(name || "Unnamed place");
      }
    });

    return () => map.remove();
  }, [lat, lon, places, city, country]);

  return (
    <div className="map-wrapper">
      {(city || country) && (
        <div className="map-header">
          {city && <span>{city}</span>}
          {city && country && <span>, </span>}
          {country && <span>{country}</span>}
        </div>
      )}
      <div id="map"></div>
    </div>
  );
}
