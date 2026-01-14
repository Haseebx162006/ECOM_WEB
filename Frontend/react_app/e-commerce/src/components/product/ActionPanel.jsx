import { useState } from 'react';
import './ActionPanel.css';

function ActionPanel({ 
  product = {}, 
  onAddToCart = () => {},
  onBuyNow = () => {},
  onWishlist = () => {},
  isInWishlist = false
}) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleQuantityChange = (type) => {
    if (type === 'increase' && quantity < (product.stock || 10)) {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    onAddToCart(quantity);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const totalPrice = (product.price || 0) * quantity;

  return (
    <div className="action-panel">
      {/* Quantity Selector */}
      <div className="quantity-section">
        <label htmlFor="quantity">Quantity:</label>
        <div className="quantity-selector">
          <button 
            className="qty-btn"
            onClick={() => handleQuantityChange('decrease')}
            disabled={quantity <= 1}
          >
            −
          </button>
          <input 
            id="quantity"
            type="number" 
            value={quantity} 
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              if (val > 0 && val <= (product.stock || 10)) {
                setQuantity(val);
              }
            }}
            min="1"
            max={product.stock || 10}
          />
          <button 
            className="qty-btn"
            onClick={() => handleQuantityChange('increase')}
            disabled={quantity >= (product.stock || 10)}
          >
            +
          </button>
        </div>
        <span className="total-price">
          Total: <strong>${totalPrice.toFixed(2)}</strong>
        </span>
      </div>

      {/* Add to Cart Button */}
      <button 
        className={`action-btn add-to-cart ${isAddingToCart ? 'success' : ''}`}
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
      >
        {isAddingToCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
      </button>

      {/* Buy Now Button */}
      <button 
        className="action-btn buy-now"
        onClick={() => onBuyNow(quantity)}
        disabled={product.stock <= 0}
      >
        💳 Buy Now
      </button>

      {/* Wishlist Button */}
      <button 
        className={`action-btn wishlist-btn ${isInWishlist ? 'active' : ''}`}
        onClick={onWishlist}
      >
        {isInWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
      </button>

      {/* Info Message */}
      {product.stock <= 0 && (
        <div className="info-message out-of-stock-msg">
          ⚠️ This item is currently out of stock
        </div>
      )}

      {product.stock && product.stock < 5 && (
        <div className="info-message low-stock-msg">
          ⚡ Only {product.stock} items left in stock!
        </div>
      )}

      {/* Shipping Info */}
      <div className="shipping-info">
        <div className="shipping-item">
          <span className="icon">📦</span>
          <span className="text">Free Shipping on Orders over $50</span>
        </div>
        <div className="shipping-item">
          <span className="icon">🔄</span>
          <span className="text">30-Day Returns</span>
        </div>
        <div className="shipping-item">
          <span className="icon">🛡️</span>
          <span className="text">2-Year Warranty</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="trust-badges">
        <span className="badge">🔒 Secure Payment</span>
        <span className="badge">✓ Verified Seller</span>
      </div>
    </div>
  );
}

export default ActionPanel;
