import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import './ProductCard.css';

function ProductCard({ product, variant = 'default' }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingCart, setIsAddingCart] = useState(false);
  const [message, setMessage] = useState('');
  
  const {
    id,
    name = 'Sneakers',
    price = 84.00,
    originalPrice,
    rating = 4.7,
    reviewCount = 89,
    image,
    badge
  } = product || {};

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingCart(true);
    setMessage('');

    try {
      const result = await mockAPI.addToCart(id, 1);
      setMessage('✓ Added!');
      
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('❌ Failed');
      console.error('Add to cart error:', error);
    } finally {
      setIsAddingCart(false);
    }
  };

  return (
    <div className="product-card-modern">
      <Link to={`/product/${id}`} className="product-image-wrapper">
        {image ? (
          <img src={image} alt={name} className="product-img" />
        ) : (
          <div className="product-placeholder-modern">
            <span className="placeholder-icon">👟</span>
          </div>
        )}
        
        <button 
          className={`wishlist-heart ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label="Add to wishlist"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
              fill={isWishlisted ? '#ff4444' : 'none'}
              stroke={isWishlisted ? '#ff4444' : '#999'}
              strokeWidth="2"
            />
          </svg>
        </button>

        {badge && <span className={`badge-modern ${badge.toLowerCase()}`}>{badge}</span>}
      </Link>

      <div className="product-details">
        <Link to={`/product/${id}`} className="product-title-link">
          <h3 className="product-title">{name}</h3>
        </Link>
        
        <div className="price-section">
          <span className="price-current">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="price-original">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="card-footer">
          <div className="rating-display">
            <span className="star-icon">⭐</span>
            <span className="rating-text">{rating} ({reviewCount})</span>
          </div>
          
          <div className="card-action">
            {variant === 'compact' ? (
              <button 
                className="quick-add-btn" 
                onClick={handleAddToCart}
                disabled={isAddingCart}
                aria-label="Quick add to cart"
                title={message || 'Add to cart'}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            ) : (
              <button 
                className={`add-cart-btn ${message ? 'show-message' : ''}`}
                onClick={handleAddToCart}
                disabled={isAddingCart}
              >
                {isAddingCart ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
                      <path d="M10 2C5.58 2 2 5.58 2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="30" strokeDashoffset="0"/>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {message || 'Add to cart'}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
