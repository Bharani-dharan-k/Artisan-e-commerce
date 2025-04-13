import React from "react";
import "./Product.css"; // Import the CSS file
import basketImage from "../../assets/Handwoven Basket.jpg";  // Importing the image directly
import potteryImage from "../../assets/Clay_Pottery_Set.jpg"; // Add actual images
import cushionImage from "../../assets/Embroidered_Cushion.jpg";
import carvingImage from "../../assets/Wooden_Carving.jpg";

const Products = () => {
  // Sample product data with correct image paths
  const products = [
    { id: 1, name: "Handwoven Basket", price: "₹500", image: basketImage },
    { id: 2, name: "Clay Pottery Set", price: "₹750", image: potteryImage },
    { id: 3, name: "Embroidered Cushion", price: "₹450", image: cushionImage },
    { id: 4, name: "Wooden Carving", price: "₹1,200", image: carvingImage }
  ];

  return (
    <div className="products-container">
      <h1>Our Handmade Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
