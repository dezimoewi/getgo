

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SearchResults from "./Pages/SearchResults";
import SearchBar from "./component/SearchBar";
import "leaflet/dist/leaflet.css";
import "./index.css";


export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white shadow p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <h1 className="font-bold text-xl">GetGo</h1>
          <SearchBar />
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
    </div>
  );
}
