import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userImg from "../../assets/user.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../styles/Navbar.css";

const SellerNavbar = ({ seller = {} }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        RuralArtisans
      </Link>

      {/* Navbar Links (Without Shop) */}
      <ul className="navbar-links">
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Profile & Logout Section */}
      <div className="profile-section">
        <img
          src={seller.profileImage || userImg}
          alt="Seller"
          className="profile-img"
        />
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default SellerNavbar;
