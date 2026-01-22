import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { path: "/", label: "Practice" },
    { path: "/history", label: "History" },
    // Add more tabs here in the future:
    // { path: '/tips', label: 'Tips' },
    // { path: '/settings', label: 'Settings' },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/practice";
    }
    return location.pathname === path;
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-logo">MENTAL MATH</h1>

        {/* Desktop Navigation */}
        <div className="navbar-tabs desktop-only">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`nav-tab ${isActive(tab.path) ? "active" : ""}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hamburger-menu"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`mobile-nav-tab ${isActive(tab.path) ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
