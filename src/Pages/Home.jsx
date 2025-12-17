import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../component/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition">
          <Link to="/">GetGo</Link>
        </div>
        <div className="space-x-6 hidden md:flex text-gray-600 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link to="/search" className="hover:text-indigo-600 transition">Search</Link>
          <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-center px-6 py-28 rounded-b-3xl shadow-lg transform transition duration-700 hover:scale-[1.01]">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fadeIn">
          Embark on global adventures with <span className="text-indigo-600">GetGo</span>
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-8 animate-fadeIn delay-150">
          Discover accurate weather, attractions, and nearby airports for your next trip. Plan smarter, travel easier.
        </p>
        <SearchBar />
      </header>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-100 to-indigo-50 py-16 px-6 text-center rounded-xl shadow-lg mx-6 md:mx-20 my-12 transform transition hover:scale-[1.02]">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 animate-fadeIn">Ready to Plan Your Trip?</h2>
        <p className="text-gray-700 mb-6 animate-fadeIn delay-150">
          GetGo gives you all the tools to discover destinations, check the weather, and plan smarter routes.
        </p>
        <Link
          to="/search#search-bar"
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-500 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
        >
          Begin Exploring
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-8 text-center mt-auto shadow-inner">
        <p>© 2025 GetGo. All rights reserved.</p>
        <p className="mt-2 text-gray-500 text-sm">Designed for seamless travel planning</p>
      </footer>

      {/* Animations */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 1s ease forwards;
          }
          .delay-150 {
            animation-delay: 0.15s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
