# GetGo ✈️

A modern travel exploration web app that lets you search any city and instantly discover weather, attractions, nearby airports, currency exchange rates, and local language info — all in one place.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-99%25-yellow?logo=javascript)

## Features

- **City Search** — Search any destination worldwide with geocoding powered by Geoapify
- **Live Weather** — Real-time weather conditions for any location via WeatherAPI
- **Tourist Attractions** — Discover nearby points of interest, landmarks, and hidden gems
- **Nearby Airports** — Find the closest airports with distance and IATA codes
- **Currency Exchange** — Live exchange rates for the destination's currency
- **Language Info** — See what languages are spoken at your destination
- **Interactive Map** — Visualize locations on a Leaflet-powered map
- **Activities** — Browse suggested activities for the area

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Bundler | Vite 7 |
| Routing | React Router v7 |
| Data Fetching | TanStack React Query |
| Maps | Leaflet |
| Styling | CSS |
| APIs | WeatherAPI, Geoapify, ExchangeRate API, REST Countries |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/dezimoewi/getgo.git
cd getgo
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following keys:

```env
VITE_GEOAPIFY_KEY=your_geoapify_api_key
VITE_WEATHER_API_KEY=your_weatherapi_key
VITE_EXCHANGERATE_KEY=your_exchangerate_api_key
```

You can obtain free API keys from:

| API | Purpose | Link |
|-----|---------|------|
| Geoapify | Geocoding, attractions, airports | [geoapify.com](https://www.geoapify.com/) |
| WeatherAPI | Real-time weather data | [weatherapi.com](https://www.weatherapi.com/) |
| ExchangeRate API | Currency conversion rates | [exchangerate-api.com](https://www.exchangerate-api.com/) |
| REST Countries | Country info (languages, currencies) | [restcountries.com](https://restcountries.com/) — no key needed |

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/              # API utilities (exchange rates)
├── assets/           # Static assets
├── component/        # Page-level UI components (Map, WeatherCard, AirportInfo, etc.)
├── components/       # Reusable card & grid components
├── hooks/            # Custom hooks & API fetchers (geoapify, weather, airports)
├── Pages/            # Route pages (Home, SearchResults)
└── utils/            # Shared utility functions
```

## How It Works

1. User searches for a city from the home page
2. The app geocodes the query to coordinates using Geoapify
3. The results page displays all travel info for that location:
   - Current weather conditions
   - Interactive map centered on the destination
   - Nearby tourist attractions
   - Closest airports with distance
   - Local currency with live exchange rates
   - Languages spoken in the country
   - Suggested activities

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Contributors

- https://github.com/dezimoewi/getgo

## License

MIT
