import { useState, useEffect } from 'react'
import { serviceCategories, siteInfo } from '../data/siteData'
import { supabase, TABLES } from '../lib/supabase'
import { openWhatsApp, generateGeneralEnquiryMessage } from '../utils/whatsapp'
import { smoothScroll } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import './Services.css'

const Services = () => {
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.SERVICES)
        .select('*')
        .eq('status', 'active')
        .order('popular', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform data to match expected format
      const formattedServices = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        price: item.price_range,
        features: item.features || [],
        popular: item.popular,
        enquiry: false
      }))

      setServices(formattedServices)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = (service) => {
    if (service.enquiry) {
      const message = generateGeneralEnquiryMessage(service.name)
      openWhatsApp(siteInfo.contact.whatsapp, message)
    } else {
      smoothScroll('#booking')
    }
  }

  const handleViewDetails = (serviceId) => {
    navigate(`/service/${serviceId}`)
  }

  return (
    <section id="services" className="services section">
      <div className="container">
        <SectionTitle 
          small="OUR SERVICES"
          title="Beauty packages designed for your special moments"
          subtitle="Choose from our carefully curated packages or customize your own beauty experience"
        />

        {/* Service Packages */}
        <div className="services-grid">
          {services.map(service => (
            <div 
              className={`service-card ${service.popular ? 'popular' : ''}`}
              key={service.id}
            >
              {service.popular && (
                <div className="popular-badge">Most Popular</div>
              )}

              <h3 className="service-name">{service.name}</h3>
              
              <div className="service-price">{service.price}</div>
              
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="service-buttons">
                <Button 
                  variant={service.popular ? 'primary' : 'secondary'}
                  size="medium"
                  onClick={() => handleBooking(service)}
                  className="service-btn"
                >
                  {service.enquiry ? 'Enquire Now' : 'Book Now'}
                </Button>
                
                <Button 
                  variant="outline"
                  size="medium"
                  onClick={() => handleViewDetails(service.id)}
                  className="service-btn-secondary"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Service Categories */}
        <div className="service-categories">
          <h3 className="categories-title">Our Specialties</h3>
          <div className="categories-grid">
            {serviceCategories.map(category => (
              <div 
                className="category-item" 
                key={category.id}
                onClick={() => smoothScroll('#services')}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
