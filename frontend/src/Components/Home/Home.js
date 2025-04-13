import React from "react";
import "../../styles/Home.css";  // Ensure this is imported to use the CSS styles
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Empowering Rural Artisans</h1>
        <p>Discover and support handmade products from skilled artisans.</p>
        <Link to="/products" className="btn">Explore Products</Link>
      </header>

      <section className="features">
        <h2 className="section-title">Our Features</h2>
        <div className="feature">
          <h3>Fair Pricing</h3>
          <p>We ensure artisans receive a fair price for their products.</p>
        </div>
        <div className="feature">
          <h3>Global Reach</h3>
          <p>Expand the market for rural handmade crafts worldwide.</p>
        </div>
        <div className="feature">
          <h3>Secure Payments</h3>
          <p>Multiple payment options for a seamless buying experience.</p>
        </div>
      </section>

      <section id="products" className="product-list">
        <h2 className="section-title">Featured Products</h2>
        <div className="product">
          <img src={require("../../assets/image1.jpg")} alt="Product 1" />
          <h3>Handcrafted Pottery</h3>
          <p>₹30</p>
          <button>Add to Cart</button>
        </div>
        <div className="product">
          <img src={require("../../assets/image2.jpeg")} alt="Product 2" />
          <h3>Woven Baskets</h3>
          <p>₹20</p>
          <button>Add to Cart</button>
        </div>
      </section>

      <section className="reviews">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="review">
          <p>"Absolutely love the craftsmanship! The quality is amazing, and I feel great supporting local artisans."</p>
          <h4>- Priya S.</h4>
        </div>
        <div className="review">
          <p>"These products have a unique touch that you don't find in mass-produced items. Will shop again!"</p>
          <h4>- Rahul M.</h4>
        </div>
      </section>

      <section className="blog">
        <h2 className="section-title">Latest from Our Blog</h2>
        <div className="blog-post">
          <h3>The Art of Hand Weaving</h3>
          <p>Discover how traditional weavers create stunning handmade textiles that stand the test of time.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
