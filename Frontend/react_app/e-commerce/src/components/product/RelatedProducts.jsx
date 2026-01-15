import { useRef, useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';
import { api } from '../../services/api';
import './RelatedProducts.css';

function RelatedProducts({ currentProductId = null, category = '' }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!currentProductId) return;
      try {
        const related = await api.getRelatedProducts(currentProductId);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Failed to load related products:', error);
      }
    };
    fetchRelated();
  }, [currentProductId]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? 0 : newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, relatedProducts.length - 4);
      const newIndex = prev + 1;
      return newIndex > maxIndex ? maxIndex : newIndex;
    });
  };

  // Auto-scroll on index change
  useEffect(() => {
    if (sliderRef.current) {
      const scrollAmount = currentIndex * 310; // Product card width + gap
      sliderRef.current.scrollLeft = scrollAmount;
    }
  }, [currentIndex]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="related-products">
      <div className="related-header">
        <h2>You Might Also Like</h2>
        <p className="subtitle">Related products in this category</p>
      </div>

      <div className="related-slider-container">
        {relatedProducts.length > 4 && (
          <button
            className="slider-nav prev"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Previous products"
          >
            ‹
          </button>
        )}

        <div className="related-slider" ref={sliderRef}>
          {relatedProducts.map((product) => (
            <div key={product.id} className="related-product-item">
              <ProductCard product={product} variant="compact" />
            </div>
          ))}
        </div>

        {relatedProducts.length > 4 && (
          <button
            className="slider-nav next"
            onClick={handleNext}
            disabled={currentIndex >= relatedProducts.length - 4}
            aria-label="Next products"
          >
            ›
          </button>
        )}
      </div>

      {/* Dot Indicators */}
      {relatedProducts.length > 4 && (
        <div className="slider-dots">
          {[...Array(Math.ceil(relatedProducts.length / 4))].map((_, index) => (
            <button
              key={index}
              className={`dot ${currentIndex === index * 4 ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index * 4)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RelatedProducts;
