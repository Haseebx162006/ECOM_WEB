import './ProductInfo.css';

function ProductInfo({ product = {}, onShare = () => {} }) {
  const discountPercent = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="product-info">
      {/* Category & Brand */}
      <div className="product-meta">
        <span className="category">{product.category || 'Electronics'}</span>
        {product.badge && <span className="badge">{product.badge}</span>}
      </div>

      {/* Product Name */}
      <h1 className="product-name">{product.name}</h1>

      {/* Rating Section */}
      <div className="rating-section">
        <div className="stars">
          {'★'.repeat(Math.floor(product.rating || 0))}
          {'☆'.repeat(5 - Math.floor(product.rating || 0))}
        </div>
        <span className="rating-value">{product.rating || 0}</span>
        <span className="review-count">({product.reviewCount || 0} reviews)</span>
      </div>

      {/* Price Section */}
      <div className="price-section">
        <div className="price-display">
          <span className="current-price">${product.price || 0}</span>
          {product.originalPrice && (
            <>
              <span className="original-price">${product.originalPrice}</span>
              <span className="discount-badge">{discountPercent}% OFF</span>
            </>
          )}
        </div>
      </div>

      {/* Stock Status */}
      <div className="stock-status">
        {product.stock > 0 ? (
          <span className="in-stock">
            ✓ In Stock ({product.stock} available)
          </span>
        ) : (
          <span className="out-of-stock">
            Out of Stock
          </span>
        )}
      </div>

      {/* SKU & Details */}
      <div className="product-details">
        <div className="detail-item">
          <span className="label">SKU:</span>
          <span className="value">{product.sku || 'N/A'}</span>
        </div>
      </div>

      {/* Highlight Features */}
      {product.features && product.features.length > 0 && (
        <div className="features-list">
          <h3>Key Features</h3>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>
                <span className="feature-icon">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Share Button */}
      <button className="share-btn" onClick={onShare}>
        <span className="share-icon">🔗</span>
        Share Product
      </button>
    </div>
  );
}

export default ProductInfo;
