import { Link } from 'react-router-dom';
import './CartItem.css';

function CartItem({ item, onQuantityChange, onRemove }) {
  const { id, name, price, image, quantity, stock } = item;
  const subtotal = price * quantity;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= stock) {
      onQuantityChange(id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      {/* Product Image */}
      <Link to={`/product/${id}`} className="cart-item-image">
        <img src={image || '/placeholder.jpg'} alt={name} />
      </Link>

      {/* Product Details */}
      <div className="cart-item-details">
        <Link to={`/product/${id}`} className="cart-item-name">
          {name}
        </Link>
        <p className="cart-item-sku">SKU: {`SKU-${id}`}</p>
        <p className="cart-item-price">${price.toFixed(2)}</p>
      </div>

      {/* Quantity Selector */}
      <div className="cart-item-quantity">
        <button
          className="qty-btn"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input
          type="number"
          min="1"
          max={stock}
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          className="qty-input"
          aria-label="Quantity"
        />
        <button
          className="qty-btn"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={quantity >= stock}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Stock Status */}
      <div className="cart-item-stock">
        {stock > 0 ? (
          <span className="in-stock">In Stock ({stock})</span>
        ) : (
          <span className="out-of-stock">Out of Stock</span>
        )}
      </div>

      {/* Subtotal */}
      <div className="cart-item-subtotal">
        <p>${subtotal.toFixed(2)}</p>
      </div>

      {/* Remove Button */}
      <button
        className="cart-item-remove"
        onClick={() => onRemove(id)}
        aria-label="Remove item from cart"
        title="Remove from cart"
      >
        ✕
      </button>
    </div>
  );
}

export default CartItem;
