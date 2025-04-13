import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ✅ Fetch products for the logged-in seller
export const fetchSellerProducts = async (sellerId) => {
  try {
    console.log(`Fetching products for sellerId: ${sellerId}`);
    
    const response = await axios.get(`${API_URL}/products?sellerId=${sellerId}`);

    console.log("Fetched products:", response.data.products); // ✅ Debugging
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// ✅ Add product with image upload
export const addProduct = async (formData) => {
  try {
    console.log("Sending product data to server...");

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.post(`${API_URL}/products/add-product`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error.response?.data || error.message);
    throw error;
  }
};
