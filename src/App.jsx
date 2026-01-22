import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Practice from "./components/Practice/Practice";
import History from "./components/History/History";
import "./App.css";

// Add Vercel Analytics
import { inject } from "@vercel/analytics";
inject();

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user prefers dark mode
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  // Update theme-color meta tag for iOS Safari browser chrome
  useEffect(() => {
    const themeColor = darkMode ? "#111827" : "#fafafa";
    const textColor = darkMode ? "#f3f4f6" : "#1a1a1a";

    // Update meta tag for Safari browser chrome
    let metaTag = document.querySelector('meta[name="theme-color"]');

    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = "theme-color";
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute("content", themeColor);

    // Update html and body background to fill iOS safe areas (notch/home indicator)
    document.documentElement.style.background = themeColor;
    document.documentElement.style.color = textColor;
    document.body.style.background = themeColor;
    document.body.style.color = textColor;
  }, [darkMode]);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/practice" element={<Practice darkMode={darkMode} />} />
          <Route path="/history" element={<History darkMode={darkMode} />} />
        </Routes>
      </div>
    </div>
  );
}
