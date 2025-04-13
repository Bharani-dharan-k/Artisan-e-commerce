import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar"; // Home Navbar
import SellerNavbar from "./Components/Seller/SellerNavbar"; // Seller Dashboard Navbar
import AdminNavbar from "./Components/Admin/AdminNavbar"; // Admin Dashboard Navbar
import Footer from "./Components/Footer/Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [isSeller, setIsSeller] = useState(!!localStorage.getItem("token"));

  // Check and update admin/seller login state whenever route changes
  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
    setIsSeller(!!localStorage.getItem("token"));
  }, [location.pathname]); // Updates when route changes

  return (
    <div>
      {/* ✅ Only show the relevant navbar based on login status */}
      {isAdmin ? (
        <AdminNavbar />
      ) : isSeller ? (
        <SellerNavbar />
      ) : location.pathname !== "/admin-dashboard" ? (
        <Navbar />
      ) : null}

      <div className="content-wrap">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
