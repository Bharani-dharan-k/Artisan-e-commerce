import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar"; // Home Navbar
import SellerNavbar from "./Components/Seller/SellerNavbar"; // Seller Dashboard Navbar
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Products from "./Components/Product/Product";
import LoginSelection from "./Components/Auth/LoginSelection";
import LoginAdmin from "./Components/Auth/Admin/LoginAdmin";
import LoginSeller from "./Components/Auth/Seller/LoginSeller";
import LoginUser from "./Components/Auth/User/LoginUser";
import SignupSeller from "./Components/Auth/Seller/SignupSeller";
import SignupUser from "./Components/Auth/User/SignupUser";
import SignupAdmin from "./Components/Auth/Admin/SignupAdmin";
import Dashboard from "./Components/Seller/Dashboard";
import AddProduct from "./Components/Seller/AddProduct"; // Import AddProduct component
import Contact from "./Components/About/Contact.js"; 
import AdminDashboard from "./Components/Admin/AdminDashboard"; // Import AdminDashboard component
// Layout Component to conditionally render Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const isSellerLoggedIn = localStorage.getItem("token"); // Check if seller is logged in

  return (
    <div>
      {/* Show Seller Navbar if logged in, otherwise show default Navbar */}
      {isSellerLoggedIn ? <SellerNavbar /> : location.pathname !== "/login-seller" && <Navbar />}
      <div className="content-wrap">{children}</div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login-selection" element={<LoginSelection />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/login-seller" element={<LoginSeller />} />
          <Route path="/login-user" element={<LoginUser />} />
          <Route path="/signup-seller" element={<SignupSeller />} />
          <Route path="/signup-user" element={<SignupUser />} />
          <Route path="/signup-admin" element={<SignupAdmin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} /> {/* AddProduct route */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* AdminDashboard
          route */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
