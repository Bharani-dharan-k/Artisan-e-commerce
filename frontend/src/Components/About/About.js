import React from "react";
import "./About.css"; // Make sure this path is correct

const About = () => {
  return (
    <div className="about-container">
      <header className="bg-primary text-white text-center py-5">
        <h1>About Artisan Marketplace</h1>
        <p>Empowering rural artisans by bringing their handmade products to a global audience.</p>
      </header>

      <div className="container my-5">
        <section id="mission-vision">
          <h2>Our Mission & Vision</h2>
          <p><strong>Mission:</strong> Our mission is to support rural artisans by providing a fair-trade online marketplace that showcases their exceptional handmade products.</p>
          <p><strong>Vision:</strong> We envision a world where traditional craftsmanship is preserved and celebrated, and where artisans can thrive economically.</p>
        </section>

        <section id="story-background" className="my-4">
          <h2>Our Story</h2>
          <p>Artisan Marketplace was founded in [Year] by [Founder's Name(s)], who recognized the challenges faced by rural artisans in accessing broader markets. Our platform was created to bridge this gap, providing artisans with the tools and support they need to succeed.</p>
        </section>

        <section id="impact" className="my-4">
          <h2>Our Impact</h2>
          <ul>
            <li><strong>Fair Wages:</strong> We ensure that artisans receive fair compensation for their work.</li>
            <li><strong>Skill Development:</strong> We offer training and workshops to help artisans enhance their skills.</li>
            <li><strong>Eco-Friendly Production:</strong> We promote sustainable practices, encouraging artisans to use local materials.</li>
          </ul>
        </section>

        <section id="get-involved" className="my-4">
          <h2>Get Involved</h2>
          <p>Join us in supporting rural artisans! Whether you choose to shop, share our mission, or collaborate with us, your involvement makes a difference.</p>
        </section>
      </div>

      <footer className="bg-dark text-white text-center py-4">
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:support@artisanmarket.com" className="text-white">support@artisanmarket.com</a></p>
        
      </footer>
    </div>
  );
};

export default About;
