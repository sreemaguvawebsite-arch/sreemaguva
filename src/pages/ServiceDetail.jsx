import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase, TABLES } from '../lib/supabase'
import { siteInfo } from '../data/siteData'
import { openWhatsApp, generateGeneralEnquiryMessage } from '../utils/whatsapp'
import Button from '../components/Button'
import './ServiceDetail.css'

const ServiceDetail = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchService()
  }, [serviceId])

  const fetchService = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.SERVICES)
        .select('*')
        .eq('id', serviceId)
        .eq('status', 'active')
        .single()

      if (error) throw error

      setService(data)
    } catch (error) {
      console.error('Error fetching service:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="service-loading">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Loading service details...</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="service-not-found">
        <div className="container">
          <h1>Service Not Found</h1>
          <p>The requested service could not be found or is no longer available.</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    )
  }

  const handleBooking = () => {
    const message = generateGeneralEnquiryMessage(service.name)
    openWhatsApp(siteInfo.contact.whatsapp, message)
  }

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <div className="service-detail">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <div className="service-hero-overlay"></div>
        </div>
        
        <div className="container">
          <div className="service-hero-content">
            <button className="back-btn" onClick={handleGoBack}>
              ← Back to Services
            </button>
            
            <div className="service-header">
              {service.popular && <span className="popular-tag">Most Popular</span>}
              <h1 className="service-title">{service.name}</h1>
              <div className="service-meta">
                <span className="service-price">{service.price_range}</span>
                <span className="service-duration">Duration: {service.duration}</span>
                <span className="service-category">Category: {service.category}</span>
              </div>
            </div>
            
            <p className="service-description">{service.description}</p>
            
            <div className="service-actions">
              <Button variant="primary" size="large" onClick={handleBooking}>
                Book Now
              </Button>
              <Button variant="outline" size="large" href="#details">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section id="details" className="service-details section">
        <div className="container">
          <div className="details-grid">
            
            {/* Features */}
            <div className="detail-card">
              <h3>What's Included</h3>
              <ul className="benefits-list">
                {service.features && service.features.length > 0 ? (
                  service.features.map((feature, index) => (
                    <li key={index}>
                      <span className="benefit-icon">✓</span>
                      {feature}
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="benefit-icon">✓</span>
                    Professional service by experienced staff
                  </li>
                )}
              </ul>
            </div>

            {/* Service Info */}
            <div className="detail-card">
              <h3>Service Information</h3>
              <div className="service-info">
                <div className="info-item">
                  <strong>Duration:</strong> {service.duration}
                </div>
                <div className="info-item">
                  <strong>Price Range:</strong> {service.price_range}
                </div>
                <div className="info-item">
                  <strong>Category:</strong> {service.category}
                </div>
                {service.popular && (
                  <div className="info-item">
                    <strong>⭐ Most Popular Service</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Description Card */}
            <div className="detail-card full-width">
              <h3>About This Service</h3>
              <p>{service.description}</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Book {service.name}?</h2>
            <p>Contact us now to schedule your appointment and get the perfect look you deserve.</p>
            <div className="cta-buttons">
              <Button variant="primary" size="large" onClick={handleBooking}>
                Book {service.name}
              </Button>
              <Button variant="secondary" size="large" onClick={handleGoBack}>
                Explore Other Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail