import { useState, useEffect } from 'react'
import { supabase, TABLES } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import StarRating from '../StarRating'
import Button from '../Button'
import './ReviewManager.css'

const ReviewManager = () => {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  const [activeTab, setActiveTab] = useState('pending')
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(null)
  const [selectedReviews, setSelectedReviews] = useState([])

  useEffect(() => {
    fetchReviews()
  }, [activeTab])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.CUSTOMER_REVIEWS)
        .select('*')
        .eq('status', activeTab)
        .order('created_at', { ascending: false })

      if (error) throw error

      setReviews(data || [])
      setSelectedReviews([])
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReviewAction = async (reviewId, action) => {
    if (!user?.email) return

    try {
      setProcessing(reviewId)

      let updateData = {}

      switch (action) {
        case 'approve':
          updateData = {
            status: 'approved',
            approved_at: new Date().toISOString(),
            approved_by: user.email
          }
          break
        case 'reject':
          updateData = {
            status: 'rejected'
          }
          break
        case 'toggle_featured':
          const review = reviews.find(r => r.id === reviewId)
          updateData = {
            is_featured: !review?.is_featured
          }
          break
      }

      const { error } = await supabase
        .from(TABLES.CUSTOMER_REVIEWS)
        .update(updateData)
        .eq('id', reviewId)

      if (error) throw error

      // Refresh the current tab data
      await fetchReviews()

    } catch (error) {
      console.error(`Error ${action}ing review:`, error)
      alert(`Failed to ${action} review. Please try again.`)
    } finally {
      setProcessing(null)
    }
  }

  const handleBulkAction = async (action) => {
    if (!user?.email || selectedReviews.length === 0) return

    if (!confirm(`Are you sure you want to ${action} ${selectedReviews.length} review(s)?`)) {
      return
    }

    try {
      setLoading(true)

      const updateData = action === 'approve' 
        ? {
            status: 'approved',
            approved_at: new Date().toISOString(),
            approved_by: user.email
          }
        : { status: 'rejected' }

      const { error } = await supabase
        .from(TABLES.CUSTOMER_REVIEWS)
        .update(updateData)
        .in('id', selectedReviews)

      if (error) throw error

      await fetchReviews()
    } catch (error) {
      console.error(`Error bulk ${action}ing reviews:`, error)
      alert(`Failed to ${action} reviews. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const deleteReview = async (reviewId) => {
    if (!confirm('Are you sure you want to permanently delete this review?')) return

    try {
      setProcessing(reviewId)

      const { error } = await supabase
        .from(TABLES.CUSTOMER_REVIEWS)
        .delete()
        .eq('id', reviewId)

      if (error) throw error

      await fetchReviews()
    } catch (error) {
      console.error('Error deleting review:', error)
      alert('Failed to delete review. Please try again.')
    } finally {
      setProcessing(null)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const toggleSelectReview = (reviewId) => {
    setSelectedReviews(prev =>
      prev.includes(reviewId)
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedReviews.length === reviews.length) {
      setSelectedReviews([])
    } else {
      setSelectedReviews(reviews.map(r => r.id))
    }
  }

  const pendingCount = reviews.filter(r => r.status === 'pending').length

  return (
    <div className="review-manager">
      <div className="manager-header">
        <h2>Review Management</h2>
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending {activeTab === 'pending' && reviews.length > 0 && `(${reviews.length})`}
          </button>
          <button 
            className={`tab-button ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Approved
          </button>
          <button 
            className={`tab-button ${activeTab === 'rejected' ? 'active' : ''}`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading reviews...</p>
        </div>
      ) : (
        <div className="reviews-content">
          {reviews.length === 0 ? (
            <div className="empty-state">
              <p>No {activeTab} reviews.</p>
            </div>
          ) : (
            <>
              {activeTab === 'pending' && (
                <div className="bulk-actions">
                  <label className="select-all-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedReviews.length === reviews.length}
                      onChange={toggleSelectAll}
                    />
                    <span>Select All ({reviews.length})</span>
                  </label>
                  {selectedReviews.length > 0 && (
                    <div className="bulk-action-buttons">
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => handleBulkAction('approve')}
                      >
                        Approve Selected ({selectedReviews.length})
                      </Button>
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => handleBulkAction('reject')}
                      >
                        Reject Selected ({selectedReviews.length})
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <div className="reviews-list">
                {reviews.map(review => (
                  <div key={review.id} className={`review-card ${activeTab} ${review.is_featured ? 'featured' : ''}`}>
                    {activeTab === 'pending' && (
                      <label className="review-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedReviews.includes(review.id)}
                          onChange={() => toggleSelectReview(review.id)}
                        />
                      </label>
                    )}

                    <div className="review-card-header">
                      <div className="reviewer-info">
                        <strong>{review.customer_name || 'Anonymous'}</strong>
                        {review.email && (
                          <span className="email">({review.email})</span>
                        )}
                        <span className="date">{formatDate(review.created_at)}</span>
                        {activeTab === 'approved' && review.approved_at && (
                          <span className="approved-info">
                            Approved by {review.approved_by} on {formatDate(review.approved_at)}
                          </span>
                        )}
                      </div>
                      <StarRating rating={review.rating} readonly />
                    </div>

                    <div className="review-card-content">
                      <p className="review-text">{review.review_text}</p>
                      {review.service_category && (
                        <span className="service-tag">{review.service_category}</span>
                      )}
                    </div>

                    {review.user_agent && (
                      <div className="review-meta">
                        <small title={review.user_agent}>
                          Device: {review.user_agent.substring(0, 60)}...
                        </small>
                      </div>
                    )}

                    <div className="review-actions">
                      {activeTab === 'pending' && (
                        <>
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => handleReviewAction(review.id, 'approve')}
                            disabled={processing === review.id}
                          >
                            {processing === review.id ? 'Processing...' : 'Approve'}
                          </Button>
                          <Button
                            variant="outline"
                            size="small"
                            onClick={() => handleReviewAction(review.id, 'reject')}
                            disabled={processing === review.id}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      
                      {activeTab === 'approved' && (
                        <>
                          <Button
                            variant={review.is_featured ? 'primary' : 'outline'}
                            size="small"
                            onClick={() => handleReviewAction(review.id, 'toggle_featured')}
                            disabled={processing === review.id}
                          >
                            {review.is_featured ? '⭐ Featured' : 'Set as Featured'}
                          </Button>
                          <Button
                            variant="outline"
                            size="small"
                            onClick={() => handleReviewAction(review.id, 'reject')}
                            disabled={processing === review.id}
                          >
                            Reject
                          </Button>
                        </>
                      )}

                      {activeTab === 'rejected' && (
                        <Button
                          variant="primary"
                          size="small"
                          onClick={() => handleReviewAction(review.id, 'approve')}
                          disabled={processing === review.id}
                        >
                          Approve
                        </Button>
                      )}
                      
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => deleteReview(review.id)}
                        disabled={processing === review.id}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ReviewManager
