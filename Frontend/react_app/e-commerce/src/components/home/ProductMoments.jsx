import React, { useState, useRef, useEffect } from 'react';
import './ProductMoments.css';

function ProductMoments() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);

  const [moments, setMoments] = useState([]);

  useEffect(() => {
    const fetchMoments = async () => {
      try {
        const categories = await import('../../services/api').then(m => m.api.getCategories());
        // Transform categories to moments format
        const dynamicMoments = categories.slice(0, 5).map(cat => ({
          id: cat.id,
          image: cat.icon || '📦',
          title: cat.name,
          tagline: `Explore our ${cat.name} collection`
        }));
        setMoments(dynamicMoments);
      } catch (error) {
        console.error('Failed to load moments:', error);
      }
    };
    fetchMoments();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? moments.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === moments.length - 1 ? 0 : prev + 1));
  };

  // Touch/Mouse drag handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type === 'mousedown' ? e.pageX : e.touches[0].pageX);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Auto-scroll to current index
  useEffect(() => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth / 1.5;
      sliderRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <section className="product-moments">
      <div className="moments-header">
        <h2 className="moments-title">Product Moments</h2>
        <p className="moments-subtitle">Discover our featured collection</p>
      </div>

      <div className="moments-container">
        {/* Navigation Arrows */}
        <button
          className="moment-arrow moment-arrow-left"
          onClick={handlePrevious}
          aria-label="Previous moment"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Slider */}
        <div
          className="moments-slider"
          ref={sliderRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {moments.map((moment, index) => (
            <div
              key={moment.id}
              className={`moment-card ${index === currentIndex ? 'active' : ''}`}
            >
              <div className="moment-image">
                <span className="moment-emoji">{moment.image}</span>
                <div className="moment-overlay"></div>
              </div>
              <div className="moment-content">
                <h3 className="moment-card-title">{moment.title}</h3>
                <p className="moment-tagline">{moment.tagline}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="moment-arrow moment-arrow-right"
          onClick={handleNext}
          aria-label="Next moment"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="moments-indicators">
        {moments.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to moment ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductMoments;
