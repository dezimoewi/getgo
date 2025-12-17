
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">GetGo</Link>
        </div>

        <div className="space-x-4 hidden md:flex">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/search" className="hover:underline">Search</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </div>
      </nav>

      <header className="bg-blue-100 flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
          Explore the world with <span className="text-blue-600">GetGo</span>
        </h1>

        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-8">
          Discover weather, attractions, and nearby airports for any destination in the world.
        </p>

        <Link
          to="/search#search-bar"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Start Exploring
        </Link>
      </header>

      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-2">Attractions</h3>
            <p className="text-gray-600">
              Find popular tourist spots and activities near your destination.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-2">Weather</h3>
            <p className="text-gray-600">
              Get real-time weather updates before you travel.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-2">Airports</h3>
            <p className="text-gray-600">
              Locate the nearest airports and plan smarter routes.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6 text-center mt-auto">
        <p>© 2025 GetGo. All rights reserved.</p>
      </footer>
    </div>
  );
}
