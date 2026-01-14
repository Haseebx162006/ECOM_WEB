import React, { useState } from 'react';
import './ProductCard.css';

function ProductCard({ product, variant = 'default' }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
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

  return (
    <div className="product-card-modern">
      {/* Product Image */}
      <div className="product-image-wrapper">
        {image ? (
          <img src={image} alt={name} className="product-img" />
        ) : (
          <div className="product-placeholder-modern">
            <span className="placeholder-icon">👟</span>
          </div>
        )}
        
        {/* Wishlist Heart */}
        <button 
          className={`wishlist-heart ${isWishlisted ? 'active' : ''}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
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
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h3 className="product-title">{name}</h3>
        
        {/* Price */}
        <div className="price-section">
          <span className="price-current">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="price-original">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Rating and Action */}
        <div className="card-footer">
          <div className="rating-display">
            <span className="star-icon">⭐</span>
            <span className="rating-text">{rating} ({reviewCount})</span>
          </div>
          
          {variant === 'compact' ? (
            <button className="quick-add-btn" aria-label="Quick add to cart">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          ) : (
            <button className="add-cart-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
