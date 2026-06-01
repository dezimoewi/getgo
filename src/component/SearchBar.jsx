import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGeocode } from "../hooks/geoapify";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    const result = await fetchGeocode(query);
    setLoading(false);

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
      <div className="search-input-wrapper">
        <span className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any destination..."
          className="search-input"
        />
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? "..." : "Explore"}
        </button>
      </div>
    </form>
  );
}
