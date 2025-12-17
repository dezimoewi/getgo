import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchAttractions } from "../hooks/geoapify";


export default function Map({ lat, lon, places = [] }) {
  useEffect(() => {
    if (lat == null || lon == null) return; 
    const map = L.map("map").setView([lat, lon], 12);

    L.tileLayer(
      `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`,
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    L.marker([lat, lon]).addTo(map).bindPopup("Selected Location");

    places.forEach((place) => {
      const { lat: pLat, lon: pLon, name } = place.properties || {};
      if (pLat != null && pLon != null) {
        L.marker([pLat, pLon]).addTo(map).bindPopup(name || "Unnamed place");
      }
    });

    return () => map.remove();
  }, [lat, lon, places]);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "400px", borderRadius: "10px" }}
    ></div>
  );
}
