import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Welcome to RedSea Aquariums, your one-stop destination for premium
            aquarium supplies. We provide a wide range of products, from exotic
            fish to high-quality aquarium equipment, all carefully selected to
            ensure the best for your aquatic environment.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><i className="fas fa-map-marker-alt"></i> guntur, A.P, India</p>
          <p><i className="fas fa-phone"></i> +91 9704629569</p>
          <p><i className="fas fa-envelope"></i> redseaaquariums@gmail.com</p>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#"><i className="fab fa-youtube"></i></a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 RedSea Aquarius. All Rights Reserved.</p>
        <ul className="footer-bottom-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
