import axios from 'axios';

const wmoToCondition = (code) => {
  if (code === 0) return { main: 'Clear', description: 'clear sky' };
  if (code <= 3) return { main: 'Clouds', description: 'partly cloudy' };
  if (code <= 48) return { main: 'Clouds', description: 'foggy' };
  if (code <= 57) return { main: 'Rain', description: 'drizzle' };
  if (code <= 67) return { main: 'Rain', description: 'rain' };
  if (code <= 77) return { main: 'Snow', description: 'snow' };
  if (code <= 82) return { main: 'Rain', description: 'rain showers' };
  if (code <= 86) return { main: 'Snow', description: 'snow showers' };
  return { main: 'Thunderstorm', description: 'thunderstorm' };
};

export const fetchWeather = async (lat, lon) => {
  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
  );
  const d = res.data;
  const condition = wmoToCondition(d.current.weather_code);

  return {
    current: {
      temp: d.current.temperature_2m,
      feels_like: d.current.apparent_temperature,
      weather: [condition],
    },
    daily: d.daily.time.map((t, i) => ({
      dt: new Date(t).getTime() / 1000,
      temp: {
        day: Math.round(
          (d.daily.temperature_2m_max[i] + d.daily.temperature_2m_min[i]) / 2
        ),
      },
      weather: [wmoToCondition(d.daily.weather_code[i])],
    })),
  };
};

export const fetchPois = async (lat, lon) => {
  try {
    const query = `
      [out:json][timeout:10];
      (
        node["tourism"~"attraction|museum|viewpoint|artwork"](around:15000,${lat},${lon});
        node["historic"](around:15000,${lat},${lon});
        node["leisure"~"park|garden"](around:15000,${lat},${lon});
      );
      out body 20;
    `;
    const res = await axios.post(
      'https://overpass-api.de/api/interpreter',
      `data=${encodeURIComponent(query)}`,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    const elements = (res.data.elements || []).filter(el => el.tags?.name);
    return {
      features: elements.map(el => ({
        properties: {
          name: el.tags.name,
          kinds: el.tags.tourism || el.tags.historic || el.tags.leisure || '',
          wikipedia_extracts: el.tags.description ? { text: el.tags.description } : null,
          image: el.tags.image || el.tags['wikimedia_commons'] || null,
        }
      }))
    };
  } catch {
    return { features: [] };
  }
};

export const fetchCountryData = async (countryName) => {
  try {
    const res = await axios.get(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=languages,currencies`
    );
    return res.data[0];
  } catch {
    return null;
  }
};

export const fetchExchangeRates = async () => {
  const res = await axios.get('https://open.er-api.com/v6/latest/USD');
  return res.data;
};

export const fetchAirport = async () => {
  return {
    airport_name: "Nearest International Airport",
    iata_code: "N/A",
    city: "City",
    country: "Country"
  };
};