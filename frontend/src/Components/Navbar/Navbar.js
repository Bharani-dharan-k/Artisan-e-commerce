import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css"; // Ensure the CSS file path is correct

const Navbar = () => {
  // Adding the Google Translate Script dynamically
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.onload = () => {
          console.log("Google Translate script loaded successfully.");
        };
        script.onerror = () => {
          console.error("Google Translate script failed to load.");
        };
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = function () {
      if (document.getElementById("google_translate_element")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,ta,hi", // Add more languages if needed
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        RuralArtisans
      </Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login-selection" className="login-btn">Login</Link></li>
      </ul>
      <div id="google_translate_element" className="google-translate-dropdown"></div>
    </nav>
  );
};

export default Navbar;
