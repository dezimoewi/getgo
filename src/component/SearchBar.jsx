
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
    <form
      onSubmit={handleSearch}
      className="
        flex flex-col 
        gap-3 
        w-full 
        max-w-md 
        mx-auto 
        px-4
        sm:flex-row
      "
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destination (e.g. Limbe)"
        className="
          w-full
          border border-gray-300 
          rounded-md 
          px-3 
          py-2 
          text-sm
          focus:outline-none 
          focus:ring-1 
          focus:ring-blue-500
        "
      />

      <button
        className="
          w-full
          sm:w-auto
          bg-blue-600 
          hover:bg-blue-700 
          text-white 
          px-4 
          py-2 
          text-sm 
          rounded-md 
          transition
        "
      >
        Search
      </button>
    </form>
  );
}
