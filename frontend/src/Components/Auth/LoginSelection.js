import React from "react";
import { Link } from "react-router-dom";
import "../../styles/UserSelection.css";  // Ensure the correct CSS file is imported

const LoginSelection = () => {
  return (
    <div className="selection-container">
      <h2>Select Your Login Type</h2>
      <div className="role-options">
        
        {/* ✅ Admin Login */}
        <Link to="/login-admin" className="role-card">
          <i className="fas fa-user-shield"></i>
          <h3>Admin</h3>
          <p>Manage users and monitor sales.</p>
        </Link>

        {/* ✅ Seller Login */}
        <Link to="/login-seller" className="role-card">
          <i className="fas fa-store"></i>
          <h3>Seller</h3>
          <p>Manage and sell your products.</p>
        </Link>

        {/* ✅ User Login */}
        <Link to="/login-user" className="role-card">
          <i className="fas fa-user"></i>
          <h3>User</h3>
          <p>Buy products and explore the store.</p>
        </Link>

      </div>
    </div>
  );
};

export default LoginSelection;
