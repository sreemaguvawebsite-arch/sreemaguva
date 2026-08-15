import { useState } from 'react'
import './StarRating.css'

const StarRating = ({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = 'medium',
  showValue = false,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState(0)
  
  const handleStarClick = (starRating) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating)
    }
  }
  
  const handleStarHover = (starRating) => {
    if (!readonly) {
      setHoverRating(starRating)
    }
  }
  
  const handleStarLeave = () => {
    if (!readonly) {
      setHoverRating(0)
    }
  }
  
  const displayRating = hoverRating || rating
  
  return (
    <div className={`star-rating ${size} ${readonly ? 'readonly' : ''} ${className}`}>
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${star <= displayRating ? 'active' : ''}`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleStarLeave}
            disabled={readonly}
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </button>
        ))}
      </div>
      
      {showValue && (
        <span className="rating-value">
          {displayRating}/5
        </span>
      )}
    </div>
  )
}

export default StarRating
