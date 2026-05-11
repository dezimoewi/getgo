
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGeocode } from "../hooks/geoapify";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    const result = await fetchGeocode(query);

    if (!result) {
      alert("Location not found");
      return;
    }

    navigate("/search", {
      state: {
        lat: result.lat,
        lon: result.lon,
        country: result.country,
        city: result.city,
      },
    });
  }

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destination (e.g. Limbe)"
        className="search-input"
      />
      <button className="search-btn">Search</button>
    </form>
  );
}
