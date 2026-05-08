import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (val.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&addressdetails=1&limit=5&featuretype=city`
        );
        setResults(res.data);
        setShowDropdown(res.data.length > 0);
      } catch {
        setResults([]);
      }
    }, 400);
  };

  const handleSelect = (item) => {
    const country = item.address?.country || '';
    setQuery(item.display_name);
    setShowDropdown(false);
    setResults([]);
    onSearch({
      name: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      country,
    });
  };

  return (
    <div className="max-w-xl mx-auto relative" ref={wrapperRef}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search a city..."
        className="w-full px-8 py-4 text-lg rounded-2xl glass border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-400/50 placeholder-white/30 text-white"
      />
      {showDropdown && (
        <ul className="absolute top-full left-0 right-0 mt-2 glass rounded-xl overflow-hidden z-50">
          {results.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="px-6 py-3 text-sm text-left text-white/80 hover:bg-white/10 cursor-pointer transition border-b border-white/5 last:border-0"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;