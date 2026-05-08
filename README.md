# GetGo

A travel discovery web app that lets you search for any city in the world and instantly view useful travel information — weather, currency exchange rates, local languages, and nearby attractions.

## Features

- **City Search** — Autocomplete-powered search using OpenStreetMap Nominatim (free, no API key required)
- **Weather** — Current temperature, conditions, and a 4-day forecast via Open-Meteo
- **Currency Converter** — Live USD exchange rates with an interactive converter (Open Exchange Rates API)
- **Languages** — Official languages spoken in the destination country (REST Countries API)
- **Nearby Attractions** — Points of interest fetched from OpenStreetMap via the Overpass API

## Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS v4** (with the `@tailwindcss/vite` plugin)
- **Axios** for HTTP requests
- **React Icons** for weather icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## APIs Used

| API | Purpose | Key Required |
|-----|---------|:------------:|
| [Nominatim](https://nominatim.openstreetmap.org/) | City geocoding & search | No |
| [Open-Meteo](https://open-meteo.com/) | Weather data | No |
| [Overpass API](https://overpass-api.de/) | Nearby attractions (OSM) | No |
| [REST Countries](https://restcountries.com/) | Languages & currencies | No |
| [Open Exchange Rates](https://open.er-api.com/) | Currency conversion | No |

All APIs are free and require no authentication.

## Project Structure

```
src/
├── App.jsx              # Main app layout and data fetching
├── index.css            # Tailwind imports and custom utilities
├── components/
│   ├── SearchBar.jsx    # City search with autocomplete dropdown
│   ├── WeatherCard.jsx  # Current weather + forecast
│   ├── CurrencyCard.jsx # Currency converter
│   ├── LanguageCard.jsx # Languages spoken
│   ├── AttractionsGrid.jsx # Nearby points of interest
│   └── Loader.jsx       # Loading spinner overlay
└── utils/
    └── api.js           # All API fetch functions
```

## License

MIT
