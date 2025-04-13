import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import userImg from "../../assets/user.png";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
    window.location.reload(); // Refresh page to apply navbar change
  };

  return (
    <nav className="admin-navbar">
      <h1>Admin Dashboard</h1>
      <div className="admin-actions">
        <img src={userImg} alt="Admin Profile" className="admin-profile-pic" />
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
