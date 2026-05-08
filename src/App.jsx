import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import AttractionsGrid from './components/AttractionsGrid';
import CurrencyCard from './components/CurrencyCard';
import LanguageCard from './components/LanguageCard';
import Loader from './components/Loader';
import { fetchWeather, fetchPois, fetchCountryData, fetchExchangeRates } from './utils/api';

function App() {
  const [place, setPlace] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!place) return;

    const loadData = async () => {
      setLoading(true);
      setError('');
      try {
        const [weather, pois, country, rates] = await Promise.all([
          fetchWeather(place.lat, place.lng),
          fetchPois(place.lat, place.lng),
          fetchCountryData(place.country),
          fetchExchangeRates(),
        ]);

        setData({ weather, pois: pois.features?.slice(0, 6) || [], country, rates });
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Unable to load some information – try again!');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [place]);

  const handleSearch = (selectedPlace) => setPlace(selectedPlace);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(120,80,255,0.15),transparent_60%)]" />
        <div className="max-w-3xl mx-auto px-6 pt-20 pb-14 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Get<span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Go</span>
          </h1>
          <p className="text-lg md:text-xl mt-4 mb-10 text-white/60">Discover your next adventure</p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {loading && <Loader />}
      {error && <p className="text-center text-rose-400 mt-8">{error}</p>}

      {place && !loading && (
        <div className="max-w-5xl mx-auto px-6 pb-20 bg-white text-slate-800 rounded-t-3xl -mt-4 pt-10 min-h-screen">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-slate-700">
            Exploring <span className="text-violet-600 font-bold">{place.name}</span>
          </h2>

          {/* Info cards — 3 compact columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
              <WeatherCard data={data.weather} />
            </div>
            <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
              <CurrencyCard rates={data.rates} country={data.country} />
            </div>
            <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
              <LanguageCard country={data.country} />
            </div>
          </div>

          {/* Attractions */}
          <AttractionsGrid pois={data.pois} />
        </div>
      )}

      {!place && !loading && (
        <div className="text-center mt-24 px-6">
          <p className="text-xl text-white/40">Search for a city to begin your journey...</p>
        </div>
      )}
    </div>
  );
}

export default App;