import ImageGallery from '../../components/product/ImageGallery';
import ProductInfo from '../../components/product/ProductInfo';
import ActionPanel from '../../components/product/ActionPanel';
import DescriptionSection from '../../components/product/DescriptionSection';
import ReviewsSection from '../../components/product/ReviewsSection';
import RelatedProducts from '../../components/product/RelatedProducts';

function ProductDetailLayout({ product, wishlist, onToggleWishlist, onAddToCart, onBuyNow, onShare }) {
  if (!product) return null;

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <ImageGallery images={product.images} productName={product.name} />

        <div className="product-detail-right">
          <ProductInfo product={product} onShare={onShare} />

          <ActionPanel
            product={product}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
            onWishlist={onToggleWishlist}
            isInWishlist={wishlist}
          />
        </div>
      </div>

      <div className="product-sections-wrapper">
        <DescriptionSection
          description={product.description}
          features={product.features}
          specifications={product.specifications}
          shipping={product.shipping}
        />

        <ReviewsSection
          reviews={product.reviews}
          rating={product.rating}
          reviewCount={product.reviewCount}
          productId={product.id}
        />

        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </div>
  );
}

export default ProductDetailLayout;
