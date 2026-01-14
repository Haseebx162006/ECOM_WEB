import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ImageGallery from '../components/product/ImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import ActionPanel from '../components/product/ActionPanel';
import DescriptionSection from '../components/product/DescriptionSection';
import ReviewsSection from '../components/product/ReviewsSection';
import RelatedProducts from '../components/product/RelatedProducts';
import { apiService } from '../services/api';
import { featuredProducts } from '../data/mockData';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState(false);

  // Fetch product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // For now using mock data, replace with API when backend is ready
        // const data = await apiService.getProductById(id);
        
        const product = featuredProducts.find(p => p.id === parseInt(id));
        if (!product) {
          setError('Product not found');
          return;
        }
        
        // Enhance product with additional details
        const enrichedProduct = {
          ...product,
          description: `Premium quality ${product.name} designed for modern users. Features cutting-edge technology and sleek design.`,
          category: 'Electronics',
          stock: 15,
          sku: `SKU-${product.id}`,
          specifications: [
            { label: 'Color', value: 'Black' },
            { label: 'Weight', value: '250g' },
            { label: 'Warranty', value: '2 Years' },
            { label: 'Material', value: 'Premium Aluminum' }
          ],
          images: [
            product.image || '/placeholder.jpg',
            product.image || '/placeholder.jpg',
            product.image || '/placeholder.jpg',
            product.image || '/placeholder.jpg'
          ],
          features: [
            'High Quality Audio',
            'Comfortable Fit',
            'Long Battery Life',
            'Wireless Connectivity'
          ],
          reviews: [
            {
              id: 1,
              user: 'John Doe',
              rating: 5,
              comment: 'Amazing product! Highly recommended.',
              date: '2025-01-10',
              verified: true
            },
            {
              id: 2,
              user: 'Jane Smith',
              rating: 4,
              comment: 'Great quality, shipping was fast.',
              date: '2025-01-08',
              verified: true
            }
          ]
        };
        
        setProduct(enrichedProduct);
        setError(null);
      } catch (err) {
        setError('Failed to load product');
        console.error('Product fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (quantity) => {
    // TODO: Integrate with cart context/state
    console.log(`Added ${quantity} of product ${product?.id} to cart`);
  };

  const handleBuyNow = (quantity) => {
    // TODO: Redirect to checkout with product
    console.log(`Buy now: ${quantity} of product ${product?.id}`);
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
    // TODO: Integrate with wishlist API
    console.log(`Wishlist toggled for product ${product?.id}`);
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
      <>
        <Navbar />
        <div className="product-detail-loader">
          <div className="skeleton-loader"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <h2>Oops! {error || 'Product not found'}</h2>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail-wrapper">
          {/* Image Gallery */}
          <ImageGallery images={product.images} productName={product.name} />

          {/* Product Info & Actions */}
          <div className="product-detail-right">
            <ProductInfo 
              product={product}
              onShare={handleShare}
            />
            
            <ActionPanel
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onWishlist={toggleWishlist}
              isInWishlist={wishlist}
            />
          </div>
        </div>

        {/* Description & Specifications */}
        <DescriptionSection 
          description={product.description}
          features={product.features}
          specifications={product.specifications}
          shipping={product.shipping || 'Free shipping on orders over $50'}
        />

        {/* Reviews Section */}
        <ReviewsSection 
          reviews={product.reviews}
          rating={product.rating}
          reviewCount={product.reviewCount}
          productId={product.id}
        />

        {/* Related Products */}
        <RelatedProducts 
          currentProductId={product.id}
          category={product.category}
        />
      </div>
      <Footer />
    </>
  );
}

export default ProductDetailPage;
