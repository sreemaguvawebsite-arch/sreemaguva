import { useState, useEffect } from 'react'
import { supabase, TABLES } from '../lib/supabase'
import StarRating from './StarRating'
import './ReviewsDisplay.css'

const ReviewsDisplay = ({ 
  showHeader = true,
  maxReviews = 10,
  filterByCategory,
  showFeaturedOnly = false,
  className = '',
  onReviewsLoaded
}) => {
  const [reviews, setReviews] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    fetchReviews()
    if (showHeader) {
      fetchStats()
    }
  }, [selectedCategory, sortBy, maxReviews, filterByCategory, showFeaturedOnly])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      
      let query = supabase
        .from(TABLES.CUSTOMER_REVIEWS)
        .select('id, customer_name, rating, review_text, service_category, created_at, is_featured')
        .eq('status', 'approved')
      
      // Apply filters
      if (filterByCategory) {
        query = query.eq('service_category', filterByCategory)
      } else if (selectedCategory !== 'all') {
        query = query.eq('service_category', selectedCategory)
      }
      
      if (showFeaturedOnly) {
        query = query.eq('is_featured', true)
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false })
          break
        case 'oldest':
          query = query.order('created_at', { ascending: true })
          break
        case 'highest_rating':
          query = query.order('rating', { ascending: false }).order('created_at', { ascending: false })
          break
        case 'lowest_rating':
          query = query.order('rating', { ascending: true }).order('created_at', { ascending: false })
          break
      }
      
      query = query.limit(maxReviews)
      
      const { data, error } = await query
      
      if (error) throw error
      
      setReviews(data || [])
      
      // Notify parent component if callback is provided
      if (onReviewsLoaded) {
        onReviewsLoaded(data && data.length > 0)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
      if (onReviewsLoaded) {
        onReviewsLoaded(false)
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('review_statistics')
        .select('*')
        .single()
      
      if (error) throw error
      
      setStats(data)
    } catch (error) {
      console.error('Error fetching review stats:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getServiceCategories = () => {
    const categories = [...new Set(reviews.map(r => r.service_category).filter(Boolean))]
    return ['all', ...categories]
  }

  if (loading) {
    return (
      <div className={`reviews-loading ${className}`}>
        <div className="loading-spinner"></div>
        <p>Loading reviews...</p>
      </div>
    )
  }

  return (
    <div className={`reviews-display ${className}`}>
      {showHeader && stats && (
        <div className="reviews-header">
          <div className="reviews-summary">
            <div className="overall-rating">
              <div className="rating-display">
                <span className="rating-number">{stats.average_rating}</span>
                <StarRating rating={Math.round(stats.average_rating)} readonly size="large" />
              </div>
              <p className="rating-text">
                Based on {stats.total_reviews} customer review{stats.total_reviews !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="rating-breakdown">
              {[5, 4, 3, 2, 1].map(star => {
                const countKey = ['', 'one', 'two', 'three', 'four', 'five'][star] + '_star_count'
                const count = stats[countKey] || 0
                const percentage = stats.total_reviews > 0 ? (count / stats.total_reviews) * 100 : 0
                
                return (
                  <div key={star} className="rating-bar">
                    <span className="star-label">{star}★</span>
                    <div className="bar-container">
                      <div 
                        className="bar-fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="count-label">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Filters and Sort - Only show if there are reviews */}
      {!filterByCategory && reviews.length > 0 && (
        <div className="reviews-controls">
          <div className="filter-group">
            <label htmlFor="category-filter">Filter by service:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Services</option>
              {getServiceCategories().slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="sort-group">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest_rating">Highest Rating</option>
              <option value="lowest_rating">Lowest Rating</option>
            </select>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div 
              key={review.id} 
              className={`review-item ${review.is_featured ? 'featured' : ''}`}
            >
              {review.is_featured && (
                <div className="featured-badge">⭐ Featured Review</div>
              )}
              
              <div className="review-header">
                <div className="review-rating">
                  <StarRating rating={review.rating} readonly />
                </div>
                <div className="review-meta">
                  <span className="reviewer-name">
                    {review.customer_name || 'Anonymous Customer'}
                  </span>
                  <span className="review-date">
                    {formatDate(review.created_at)}
                  </span>
                  {review.service_category && (
                    <span className="service-category">
                      • {review.service_category}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="review-content">
                <p className="review-text">{review.review_text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ReviewsDisplay
