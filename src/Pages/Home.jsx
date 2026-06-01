import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../component/SearchBar";

export default function Home() {
  return (
    <div className="home-page">
      {/* Radial glow overlay */}
      <div className="home-glow"></div>

      {/* Navbar */}
      <nav className="home-navbar">
        <Link to="/" className="home-brand">
          Get<span>Go</span>
        </Link>
        <div className="home-nav-links">
          <Link to="/">Home</Link>
          <Link to="/search">Explore</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="home-hero">
        <h1>
          Discover your next<br /><span className="gradient-text">adventure</span>
        </h1>
        <p>
          Search any city to explore weather, attractions, airports and more — all in one beautifully crafted experience.
        </p>
        <SearchBar />
      </header>

      {/* Features */}
      <section className="home-features">
        <div className="feature-card glass">
          <div className="feature-icon">🌤️</div>
          <h3>Live Weather</h3>
          <p>Real-time weather data for any destination worldwide.</p>
        </div>
        <div className="feature-card glass">
          <div className="feature-icon">🗺️</div>
          <h3>Attractions</h3>
          <p>Discover top-rated places, landmarks, and hidden gems.</p>
        </div>
        <div className="feature-card glass">
          <div className="feature-icon">✈️</div>
          <h3>Nearby Airports</h3>
          <p>Find the closest airports and plan your travel route.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta glass">
        <h2>Ready to explore the world?</h2>
        <p>Start planning your dream trip in seconds.</p>
        <Link to="/search" className="cta-btn">Begin Exploring →</Link>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 GetGo. All rights reserved.</p>
        <p className="sub">Designed for seamless travel planning</p>
      </footer>
    </div>
  );
}
