import { useState, useRef } from 'react';
import './ImageGallery.css';

function ImageGallery({ images = [], productName = 'Product' }) {
  const [mainImage, setMainImage] = useState(images[0] || '/placeholder.jpg');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const mainImageRef = useRef(null);
  const thumbnailContainerRef = useRef(null);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  // Handle thumbnail carousel scroll
  const scrollThumbnails = (direction) => {
    const container = thumbnailContainerRef.current;
    const scrollAmount = 100;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="image-gallery">
      {/* Main Image with Zoom */}
      <div 
        className="main-image-container"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={mainImageRef}
          src={mainImage}
          alt={productName}
          className={`main-image ${isZoomed ? 'zoomed' : ''}`}
          style={isZoomed ? {
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            transform: 'scale(2)'
          } : {}}
        />
        {isZoomed && <div className="zoom-indicator">Zoom</div>}
      </div>

      {/* Thumbnail Carousel */}
      <div className="thumbnail-section">
        <button 
          className="scroll-btn scroll-left"
          onClick={() => scrollThumbnails('left')}
          aria-label="Scroll thumbnails left"
        >
          ‹
        </button>

        <div className="thumbnail-container" ref={thumbnailContainerRef}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${mainImage === image ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(image)}
            >
              <img src={image} alt={`${productName} view ${index + 1}`} />
            </div>
          ))}
        </div>

        <button 
          className="scroll-btn scroll-right"
          onClick={() => scrollThumbnails('right')}
          aria-label="Scroll thumbnails right"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default ImageGallery;
