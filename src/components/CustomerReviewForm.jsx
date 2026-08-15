import { useState } from 'react'
import { supabase, TABLES } from '../lib/supabase'
import StarRating from './StarRating'
import Button from './Button'
import './CustomerReviewForm.css'

const CustomerReviewForm = ({ 
  onSubmitSuccess, 
  onSubmitError,
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    rating: 0,
    review_text: '',
    service_category: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const serviceCategories = [
    'Bridal Makeup',
    'Party Makeup', 
    'Hair Styling',
    'Skincare Treatment',
    'Academy Course',
    'Other'
  ]

  const validateForm = () => {
    const newErrors = {}

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating'
    }

    if (formData.review_text.trim().length < 10) {
      newErrors.review_text = 'Review must be at least 10 characters long'
    }

    if (formData.review_text.trim().length > 500) {
      newErrors.review_text = 'Review must be less than 500 characters'
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const reviewData = {
        customer_name: formData.customer_name.trim() || null,
        email: formData.email.trim() || null,
        rating: formData.rating,
        review_text: formData.review_text.trim(),
        service_category: formData.service_category || null,
        status: 'pending',
        user_agent: navigator.userAgent
      }

      const { error } = await supabase
        .from(TABLES.CUSTOMER_REVIEWS)
        .insert([reviewData])

      if (error) {
        if (error.code === '23505') {
          throw new Error('You can only submit one review per day. Please try again tomorrow.')
        }
        throw error
      }

      setIsSuccess(true)
      
      // Reset form
      setFormData({
        customer_name: '',
        email: '',
        rating: 0,
        review_text: '',
        service_category: ''
      })

      if (onSubmitSuccess) onSubmitSuccess()

    } catch (error) {
      console.error('Error submitting review:', error)
      const errorMessage = error.message || 'Failed to submit review. Please try again.'
      setErrors({ submit: errorMessage })
      if (onSubmitError) onSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={`review-form-success ${className}`}>
        <div className="success-icon">✅</div>
        <h3>Thank you for your review!</h3>
        <p>Your review has been submitted and is pending approval. It will appear on the website once approved by our team.</p>
        <Button 
          variant="outline" 
          onClick={() => {
            setIsSuccess(false)
            setFormData({
              customer_name: '',
              email: '',
              rating: 0,
              review_text: '',
              service_category: ''
            })
          }}
        >
          Submit Another Review
        </Button>
      </div>
    )
  }

  return (
    <form className={`customer-review-form ${className}`} onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>Share Your Experience</h3>
        <p>Your feedback helps us improve and helps other customers make informed decisions.</p>
      </div>

      {/* Rating */}
      <div className="form-group">
        <label className="form-label">
          Overall Rating <span className="required">*</span>
        </label>
        <StarRating
          rating={formData.rating}
          onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
          size="large"
          showValue
        />
        {errors.rating && <span className="error-message">{errors.rating}</span>}
      </div>

      {/* Service Category */}
      <div className="form-group">
        <label htmlFor="service_category" className="form-label">
          Service Category (Optional)
        </label>
        <select
          id="service_category"
          value={formData.service_category}
          onChange={(e) => setFormData(prev => ({ ...prev, service_category: e.target.value }))}
          className="form-select"
        >
          <option value="">Select a service...</option>
          {serviceCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Review Text */}
      <div className="form-group">
        <label htmlFor="review_text" className="form-label">
          Your Review <span className="required">*</span>
        </label>
        <textarea
          id="review_text"
          value={formData.review_text}
          onChange={(e) => setFormData(prev => ({ ...prev, review_text: e.target.value }))}
          placeholder="Share your experience with us... (minimum 10 characters)"
          className="form-textarea"
          rows={4}
          maxLength={500}
        />
        <div className="character-count">
          {formData.review_text.length}/500 characters
        </div>
        {errors.review_text && <span className="error-message">{errors.review_text}</span>}
      </div>

      {/* Customer Name */}
      <div className="form-group">
        <label htmlFor="customer_name" className="form-label">
          Your Name (Optional)
        </label>
        <input
          type="text"
          id="customer_name"
          value={formData.customer_name}
          onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
          placeholder="Leave blank to review anonymously"
          className="form-input"
          maxLength={100}
        />
        <small className="form-help">Leave blank if you'd prefer to review anonymously</small>
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email (Optional)
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="your@email.com"
          className="form-input"
        />
        <small className="form-help">For follow-up purposes only. Will not be displayed publicly.</small>
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="error-message submit-error">
          {errors.submit}
        </div>
      )}

      {/* Submit Button */}
      <div className="form-actions">
        <Button
          type="submit"
          variant="primary"
          size="large"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span>
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </Button>
      </div>

      <div className="form-footer">
        <small>
          By submitting this review, you confirm that it reflects your genuine experience with our services.
        </small>
      </div>
    </form>
  )
}

export default CustomerReviewForm
