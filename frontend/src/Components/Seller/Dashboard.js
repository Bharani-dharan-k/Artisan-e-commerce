import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSellerProducts } from "../../services/api";
import "./Dashboard.css";

const Dashboard = ({ seller }) => {
  const [products, setProducts] = useState([]);
  const [sellerId, setSellerId] = useState(null);
  const [error, setError] = useState("");
  const [totalEarnings, setTotalEarnings] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSellerId = localStorage.getItem("sellerId");
    if (seller && seller.id) {
      setSellerId(seller.id);
    } else if (storedSellerId) {
      setSellerId(storedSellerId);
    } else {
      console.error("Seller ID is missing.");
    }
  }, [seller]);

  useEffect(() => {
    if (sellerId) {
      console.log("Fetching products for sellerId:", sellerId);

      fetchSellerProducts(sellerId)
        .then((data) => {
          console.log("Fetched products:", data);
          setProducts(data);
          const earnings = data.reduce((acc, product) => acc + product.price * product.sold, 0);
          setTotalEarnings(earnings);
        })
        .catch((err) => {
          console.error("Failed to fetch products:", err);
          setError("Failed to load products. Please try again.");
        });
    }
  }, [sellerId]);

  return (
    <div className="dashboard-container">
      <h2>Seller Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Your Products</h3>
      {products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => {
            const imageUrl = `http://localhost:5000/uploads/${product.image}`;
            console.log("Product Image URL:", imageUrl); // ✅ Debugging

            return (
              <li key={product._id} className="product-item">
                <img 
                  src={imageUrl} 
                  alt={product.name} 
                  className="product-image" 
                  onError={(e) => { e.target.src = "/default-image.jpg"; }} 
                />
                <h4>{product.name}</h4>
                <p>₹{product.price} (Sold: {product.sold})</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No products found.</p>
      )}

      <h3 className="total-earnings">Total Earnings: ₹{totalEarnings}</h3>

      <button className="new-product-btn" onClick={() => navigate("/add-product")}>
        + New Product
      </button>
    </div>
  );
};

export default Dashboard;
