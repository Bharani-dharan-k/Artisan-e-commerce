import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";  // Import the improved styles

const AddProduct = () => {
  const [product, setProduct] = useState({ name: "", price: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // ✅ Image preview
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sellerId = localStorage.getItem("sellerId");
  if (!sellerId) {
    return <h3>Seller ID is missing. Please log in again.</h3>;
  }

  // ✅ Handle image selection with preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return alert("No image selected.");
    if (!file.type.startsWith("image/")) return alert("Invalid file type.");

    setImage(file);
    setPreview(URL.createObjectURL(file)); // ✅ Generate preview
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !image) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("sellerId", sellerId);
    formData.append("image", image);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/products/add-product",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("✅ Product added:", response.data);
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error adding product:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
          min="1"
        />

        <div className="file-input-wrapper">
          <label className="file-label">
            Choose Image
            <input type="file" accept="image/*" onChange={handleImageChange} required />
          </label>
        </div>

        {/* ✅ Image Preview */}
        {preview && <img src={preview} alt="Preview" className="image-preview" />}

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
