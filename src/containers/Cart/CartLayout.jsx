import { Link } from 'react-router-dom';
import CartItem from '../../components/cart/CartItem';
import PriceSummary from '../../components/cart/PriceSummary';

function CartLayout({
  cartItems,
  promoCode,
  setPromoCode,
  discountAmount,
  promoMessage,
  appliedPromo,
  handleQuantityChange,
  handleRemoveItem,
  handleClearCart,
  handleApplyPromo,
  handleRemovePromo,
}) {
  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1>Shopping Cart</h1>
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items yet</p>
            <Link to="/" className="continue-shopping-btn">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        <div className="cart-layout">
          {/* Left Side - Cart Items */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <p>{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in cart</p>
              <button className="clear-cart-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            <Link to="/products" className="continue-shopping-link">
              ← Continue Shopping
            </Link>
          </div>

          {/* Right Side - Order Summary */}
          <div className="cart-summary-section">
            {/* Promo Code Section */}
            <div className="promo-section">
              <h3>Promo Code</h3>
              {appliedPromo ? (
                <div className="promo-applied">
                  <p>
                    ✓ Code applied: <strong>{appliedPromo}</strong>
                  </p>
                  <button className="remove-promo-btn" onClick={handleRemovePromo}>
                    Remove
                  </button>
                </div>
              ) : (
                <div className="promo-input-group">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-input"
                    onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                  />
                  <button className="apply-promo-btn" onClick={handleApplyPromo}>
                    Apply
                  </button>
                </div>
              )}
              {promoMessage && (
                <p
                  className={`promo-message ${
                    promoMessage.includes('successfully') ? 'success' : 'error'
                  }`}
                >
                  {promoMessage}
                </p>
              )}
              <p className="promo-hint">Try: SAVE10, SAVE20, or FREESHIP</p>
            </div>

            {/* Price Summary */}
            <PriceSummary
              items={cartItems}
              discountAmount={discountAmount}
              promoCode={appliedPromo}
            />

            {/* Checkout Actions */}
            <div className="checkout-actions">
              <button className="checkout-btn">Proceed to Checkout</button>
              <Link to="/products" className="continue-shopping-btn-alt">
                Continue Shopping
              </Link>
            </div>

            {/* Security Info */}
            <div className="security-info">
              <p>🔒 Your payment information is secure and encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartLayout;
