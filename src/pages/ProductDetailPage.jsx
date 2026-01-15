import { useParams, useNavigate } from 'react-router-dom';
import ProductDetailLayout from '../containers/ProductDetail/ProductDetailLayout';
import { useProductDetail } from '../hooks/useProductDetail';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error, wishlist, toggleWishlist } = useProductDetail(id);

  const handleAddToCart = (quantity) => {
    console.log(`Added ${quantity} of product ${product?.id} to cart`);
  };

  const handleBuyNow = (quantity) => {
    console.log(`Buy now: ${quantity} of product ${product?.id}`);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        url: url
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Product link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loader">
        <div className="skeleton-loader"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>Oops! {error || 'Product not found'}</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <ProductDetailLayout
      product={product}
      wishlist={wishlist}
      onToggleWishlist={toggleWishlist}
      onAddToCart={handleAddToCart}
      onBuyNow={handleBuyNow}
      onShare={handleShare}
    />
  );
}

export default ProductDetailPage;
