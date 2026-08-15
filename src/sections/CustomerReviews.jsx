import { useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import ReviewsDisplay from '../components/ReviewsDisplay'
import CustomerReviewForm from '../components/CustomerReviewForm'
import Button from '../components/Button'
import './CustomerReviews.css'

const CustomerReviews = () => {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [hasFeaturedReviews, setHasFeaturedReviews] = useState(false)

  const handleSubmitSuccess = () => {
    setReviewSubmitted(true)
    setShowReviewForm(false)
    
    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setReviewSubmitted(false)
    }, 5000)
  }

  const handleSubmitError = (error) => {
    console.error('Review submission error:', error)
  }

  const handleFeaturedReviewsLoaded = (hasReviews) => {
    setHasFeaturedReviews(hasReviews)
  }

  return (
    <section id="reviews" className="customer-reviews-section section">
      <div className="container">
        <SectionTitle 
          small="CUSTOMER FEEDBACK"
          title="What Our Clients Say"
          subtitle="Real experiences from our valued customers"
        />

        {/* Success notification */}
        {reviewSubmitted && (
          <div className="success-notification">
            <div className="success-content">
              <span className="success-icon">✅</span>
              <p>Thank you! Your review has been submitted for approval.</p>
            </div>
          </div>
        )}

        {/* Reviews Display */}
        <div className="reviews-container">
          <ReviewsDisplay 
            showHeader={true}
            maxReviews={6}
            showFeaturedOnly={false}
            className="homepage-reviews"
          />
        </div>

        {/* Call to Action */}
        <div className="reviews-cta">
          {!showReviewForm ? (
            <div className="cta-content">
              <h3>Share Your Experience</h3>
              <p>Help other customers by sharing your experience with our services</p>
              <Button
                variant="primary"
                size="large"
                onClick={() => setShowReviewForm(true)}
                className="write-review-btn"
              >
                Write a Review
              </Button>
            </div>
          ) : (
            <div className="review-form-container">
              <div className="form-header-actions">
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => setShowReviewForm(false)}
                  className="cancel-review-btn"
                >
                  Cancel
                </Button>
              </div>
              
              <CustomerReviewForm
                onSubmitSuccess={handleSubmitSuccess}
                onSubmitError={handleSubmitError}
                className="homepage-review-form"
              />
            </div>
          )}
        </div>

        {/* Featured Reviews Highlight - Only show if there are featured reviews */}
        {hasFeaturedReviews && (
          <div className="featured-reviews-section">
            <h3>Featured Customer Stories</h3>
            <ReviewsDisplay 
              showHeader={false}
              maxReviews={3}
              showFeaturedOnly={true}
              className="featured-reviews-grid"
              onReviewsLoaded={handleFeaturedReviewsLoaded}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default CustomerReviews
