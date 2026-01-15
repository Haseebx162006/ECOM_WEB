import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ProductCard from '../components/common/ProductCard';
import ProductMoments from '../components/home/ProductMoments';
import Footer from '../components/layout/Footer';
import { api } from '../services/api';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        // Take first 4 products as featured
        setFeaturedProducts(productsData.slice(0, 4));
        // Take first 4 categories as popular
        setCategories(categoriesData.slice(0, 4));
      } catch (error) {
        console.error('Failed to load home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
            <Link to="/products" className="hero-button">
              <span>View All Products</span>
              <span className="button-arrow">→</span>
            </Link>

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

      {/* Product Moments - Animated Slider */}
      <ProductMoments />

      {/* Popular Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Popular Categories</h2>
          <Link to="/products" className="view-all-link">View All →</Link>
        </div>
        <div className="categories-grid">
          {loading ? (
            <p>Loading categories...</p>
          ) : (
            categories.map((category, index) => (
              <Link key={category.id || index} to={`/products?category=${category.name || category}`} className="category-card">
                <div className="category-icon">📦</div>
                <h3>{category.name || category}</h3>
                <p>Explore →</p>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all-link">View All →</Link>
        </div>
        <div className="products-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
