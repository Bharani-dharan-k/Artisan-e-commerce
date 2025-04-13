import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/Auth.css"; // Ensure the correct path to Auth.css

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Login:", { email, password });
    // Add authentication logic here
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="User Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/signup-user" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginUser;
