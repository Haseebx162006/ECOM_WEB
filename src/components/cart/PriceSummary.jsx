import './PriceSummary.css';

function PriceSummary({ items, discountAmount = 0, promoCode = '' }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shippingCost = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shippingCost - discountAmount;

  return (
    <div className="price-summary">
      <h3>Order Summary</h3>

      <div className="summary-item">
        <span>Subtotal</span>
        <span className="amount">${subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-item">
        <span>Tax (10%)</span>
        <span className="amount">${tax.toFixed(2)}</span>
      </div>

      <div className="summary-item">
        <span>Shipping</span>
        <span className="amount">
          {shippingCost === 0 ? (
            <span className="free-shipping">FREE</span>
          ) : (
            `$${shippingCost.toFixed(2)}`
          )}
        </span>
      </div>

      {subtotal <= 50 && (
        <p className="shipping-info">🎉 Free shipping on orders over $50!</p>
      )}

      {discountAmount > 0 && (
        <div className="summary-item discount">
          <span>Promo Code ({promoCode})</span>
          <span className="amount discount-amount">-${discountAmount.toFixed(2)}</span>
        </div>
      )}

      <div className="summary-divider"></div>

      <div className="summary-total">
        <span>Total</span>
        <span className="total-amount">${total.toFixed(2)}</span>
      </div>

      {items.length > 0 && (
        <p className="summary-footer">
          {items.length} item{items.length > 1 ? 's' : ''} in cart
        </p>
      )}
    </div>
  );
}

export default PriceSummary;
