import React, { useState } from "react";
import "../../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusMessage("❌ Please fill in all fields.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatusMessage("❌ Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setLoading(false);

      setStatusMessage(
        response.ok && result.success
          ? "✅ Message sent successfully!"
          : `❌ Failed to send message: ${result.message || "Unknown error"}`
      );

      if (response.ok && result.success) setFormData({ name: "", email: "", message: "" });
    } catch {
      setLoading(false);
      setStatusMessage("❌ Error: Unable to send message. Check your internet connection.");
    }
  };

  return (
    <div className="contact-container">
      {/* Left Side - Contact Form */}
      <div className="contact-form-container">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-text">
          Have questions or need assistance? Reach out to us, and we’ll be happy to help!
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        {statusMessage && (
          <p className={`status-message ${statusMessage.includes("✅") ? "success" : "error"}`}>
            {statusMessage}
          </p>
        )}
      </div>

      {/* Right Side - Contact Info */}
      <div className="contact-info-container">
        <div className="contact-info">
          <h3>Contact Details</h3>
          <p><i className="fas fa-map-marker-alt"></i> 123 Artisan Street, Handloom City, India</p>
          <p><i className="fas fa-phone-alt"></i> +91 98765 43210</p>
          <p><i className="fas fa-envelope"></i> support@handmadetreasures.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
