import { useState } from 'react';
import './ReviewsSection.css';

function ReviewsSection({ 
  reviews = [], 
  rating = 0, 
  reviewCount = 0, 
  productId = null 
}) {
  const [sortBy, setSortBy] = useState('newest');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userReview, setUserReview] = useState({
    rating: 5,
    comment: '',
    userName: ''
  });

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else if (sortBy === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('Review submitted:', {
      productId,
      ...userReview
    });
    setUserReview({ rating: 5, comment: '', userName: '' });
    setShowReviewForm(false);
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map(rate => ({
    rating: rate,
    count: Math.floor(reviewCount * (6 - rate) / 15),
    percentage: ((6 - rate) * 20)
  }));

  return (
    <div className="reviews-section">
      <h2>Customer Reviews</h2>

      <div className="reviews-container">
        {/* Left: Rating Summary */}
        <div className="rating-summary">
          <div className="average-rating">
            <div className="rating-number">{rating.toFixed(1)}</div>
            <div className="rating-stars">
              {'★'.repeat(Math.floor(rating))}
              {'☆'.repeat(5 - Math.floor(rating))}
            </div>
            <div className="total-reviews">
              Based on {reviewCount} reviews
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="rating-distribution">
            {ratingDistribution.map(({ rating: rate, percentage }) => (
              <div key={rate} className="distribution-row">
                <span className="distribution-label">{rate} ★</span>
                <div className="distribution-bar">
                  <div 
                    className="distribution-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Write Review Button */}
          <button 
            className="write-review-btn"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? '✕ Cancel' : '✎ Write a Review'}
          </button>
        </div>

        {/* Right: Reviews List */}
        <div className="reviews-list">
          {/* Review Form */}
          {showReviewForm && (
            <form className="review-form" onSubmit={handleSubmitReview}>
              <h3>Share Your Review</h3>
              
              <div className="form-group">
                <label>Rating</label>
                <div className="star-rating-input">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`star ${star <= userReview.rating ? 'active' : ''}`}
                      onClick={() => setUserReview({...userReview, rating: star})}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="userName">Your Name</label>
                <input
                  id="userName"
                  type="text"
                  placeholder="Enter your name"
                  value={userReview.userName}
                  onChange={(e) => setUserReview({...userReview, userName: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="comment">Your Review</label>
                <textarea
                  id="comment"
                  placeholder="Share your experience with this product..."
                  value={userReview.comment}
                  onChange={(e) => setUserReview({...userReview, comment: e.target.value})}
                  rows="4"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Submit Review
              </button>
            </form>
          )}

          {/* Sort Options */}
          <div className="sort-controls">
            <label htmlFor="sort">Sort by:</label>
            <select 
              id="sort"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>

          {/* Reviews List */}
          <div className="reviews-list-items">
            {sortedReviews.length > 0 ? (
              sortedReviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <span className="reviewer-name">{review.user}</span>
                      {review.verified && (
                        <span className="verified-badge">✓ Verified Purchase</span>
                      )}
                    </div>
                    <span className="review-date">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="review-rating">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>

                  <p className="review-comment">{review.comment}</p>

                  <div className="review-actions">
                    <button className="helpful-btn">👍 Helpful</button>
                    <button className="unhelpful-btn">👎 Not Helpful</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-reviews">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsSection;
