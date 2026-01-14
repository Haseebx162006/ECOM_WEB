import React, { useState } from 'react';
import './Footer.css';
import logo from '../../assets/logo.svg';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeMessage('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setSubscribeMessage(''), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Company Info */}
        <div className="footer-section">
          <div className="footer-logo">
            <img src={logo} alt="Company Logo" className="logo-image" />
          </div>
          <p className="footer-description">
            Your one-stop shop for quality products at amazing prices. 
            We deliver excellence with every order.
          </p>
          <div className="social-icons">
            <a href="#" className="social-link" aria-label="Facebook">📘</a>
            <a href="#" className="social-link" aria-label="Twitter">🐦</a>
            <a href="#" className="social-link" aria-label="Instagram">📷</a>
            <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3 className="footer-title">Categories</h3>
          <ul className="footer-links">
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Fashion</a></li>
            <li><a href="#">Home & Garden</a></li>
            <li><a href="#">Sports</a></li>
            <li><a href="#">Books</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-section">
          <h3 className="footer-title">Customer Support</h3>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter-section">
          <h3 className="footer-title">Newsletter</h3>
          <p className="newsletter-text">Subscribe to get updates on new products and exclusive offers!</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
          {subscribeMessage && (
            <p className="subscribe-message">{subscribeMessage}</p>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2026 E-Com. All rights reserved.</p>
          <div className="footer-policies">
            <a href="#">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#">Terms of Service</a>
            <span className="separator">|</span>
            <a href="#">Cookie Policy</a>
          </div>
          <div className="payment-methods">
            <span>💳</span>
            <span>💰</span>
            <span>🏦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
