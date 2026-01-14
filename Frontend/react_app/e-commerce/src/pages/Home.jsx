import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-tag">🎵 Music is Classic</span>
            <h1 className="hero-title">
              Discover Amazing
              <br />
              Products.
            </h1>
            <div className="hero-subtitle">
              <span className="hero-number">01</span>
              <div className="hero-description">
                <h3>Premium Quality</h3>
                <p>Making your shopping experience come true with amazing deals!</p>
              </div>
            </div>
            <button className="hero-button">
              <span>View All Products</span>
              <span className="button-arrow">→</span>
            </button>
            
            <div className="social-links">
              <span>Follow us on:</span>
              <a href="#" className="social-icon">🐦</a>
              <a href="#" className="social-icon">🎵</a>
              <a href="#" className="social-icon">📷</a>
              <a href="#" className="social-icon">💼</a>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="hero-image-container">
              <div className="hero-image-circle">
                <span className="hero-emoji">🎧</span>
              </div>
              <div className="floating-dot dot-1"></div>
              <div className="floating-dot dot-2"></div>
              <div className="floating-dot dot-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Popular Categories</h2>
          <a href="#" className="view-all-link">View All →</a>
        </div>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">💻</div>
            <h3>Electronics</h3>
            <p>250+ items</p>
          </div>
          <div className="category-card">
            <div className="category-icon">👔</div>
            <h3>Fashion</h3>
            <p>180+ items</p>
          </div>
          <div className="category-card">
            <div className="category-icon">🏠</div>
            <h3>Home & Garden</h3>
            <p>320+ items</p>
          </div>
          <div className="category-card">
            <div className="category-icon">⚽</div>
            <h3>Sports</h3>
            <p>145+ items</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <a href="#" className="view-all-link">View All →</a>
        </div>
        <div className="products-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="product-card">
              <div className="product-image">
                <span className="product-placeholder">📦</span>
                <button className="wishlist-btn">❤️</button>
              </div>
              <div className="product-info">
                <h3>Product Name {item}</h3>
                <div className="product-rating">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span className="rating-count">(45)</span>
                </div>
                <div className="product-price">
                  <span className="current-price">$99.99</span>
                  <span className="original-price">$129.99</span>
                </div>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
