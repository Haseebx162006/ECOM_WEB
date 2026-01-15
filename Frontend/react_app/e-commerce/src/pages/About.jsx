import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

function About() {
  return (
    <>
      <div className="about-page">
        <div className="about-container">
          <h1>About Us</h1>
          <p>Welcome to our e-commerce store. This is a simple page to test navigation.</p>
          
          <div className="nav-links">
            <Link to="/" className="nav-link">Go to Home</Link>
            <Link to="/cart" className="nav-link">Go to Cart</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
