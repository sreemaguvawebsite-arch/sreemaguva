import { useNavigate } from 'react-router-dom'
import './DreamDeals.css'

const DreamDeals = () => {
  const navigate = useNavigate()

  // Static services that will always display
  const services = [
    {
      id: 'service-1',
      name: 'Bob Cut',
      category: 'Short Cuts',
      display_price: 559,
      original_price: 899,
      discount_percent: 38,
      image_url: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80',
      description: 'Professional bob haircut with styling'
    },
    {
      id: 'service-2',
      name: 'Cara Bob Cut',
      category: 'Short Cuts',
      display_price: 599,
      original_price: 899,
      discount_percent: 33,
      image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
      description: 'Modern cara bob with layered styling'
    },
    {
      id: 'service-3',
      name: 'Hair Spa',
      category: 'Hair Care',
      display_price: 649,
      original_price: 1398,
      discount_percent: 54,
      image_url: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=600&q=80',
      description: 'Luxury hair spa treatment'
    },
    {
      id: 'service-4',
      name: 'Root Touch Up',
      category: 'Hair Color',
      display_price: 850,
      original_price: 1700,
      discount_percent: 50,
      image_url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80',
      description: 'Professional root touch up service'
    },
    {
      id: 'service-5',
      name: 'Bridal Makeup',
      category: 'Makeup',
      display_price: 2499,
      original_price: 4999,
      discount_percent: 50,
      image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
      description: 'Complete bridal makeup package'
    },
    {
      id: 'service-6',
      name: 'Facial Treatment',
      category: 'Skin Care',
      display_price: 799,
      original_price: 1299,
      discount_percent: 38,
      image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
      description: 'Deep cleansing facial treatment'
    },
    {
      id: 'service-7',
      name: 'Nail Art',
      category: 'Nails',
      display_price: 499,
      original_price: 799,
      discount_percent: 38,
      image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
      description: 'Beautiful nail art designs'
    },
    {
      id: 'service-8',
      name: 'Hair Coloring',
      category: 'Hair Color',
      display_price: 1499,
      original_price: 2999,
      discount_percent: 50,
      image_url: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&q=80',
      description: 'Full hair coloring service'
    }
  ]

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`)
  }

  const handleBookNow = (e, serviceId) => {
    e.stopPropagation()
    // Navigate to booking section
    navigate('/')
    setTimeout(() => {
      const bookingSection = document.getElementById('booking')
      bookingSection?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <section id="services" className="dream-deals">
      <div className="container">
        <div className="deals-header">
          <div className="deals-icon">💇‍♀️</div>
          <h2 className="deals-heading">Our Services</h2>
          <p className="deals-subheading">This is your sign to try these Dream deals ✨</p>
        </div>

        <div className="deals-grid">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="deal-card"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="deal-image-wrapper">
                {service.discount_percent > 0 && (
                  <div className="discount-badge">{service.discount_percent}% OFF</div>
                )}
                <img 
                  src={service.image_url} 
                  alt={service.name}
                  className="deal-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.backgroundColor = '#f0f0f0'
                    e.target.alt = 'Image not available'
                  }}
                />
              </div>
              
              <div className="deal-content">
                <h3 className="deal-title">
                  {service.name}
                  {service.category && <span className="deal-category"> ({service.category})</span>}
                </h3>
                
                <div className="deal-pricing">
                  <span className="deal-price">₹ {service.display_price}</span>
                  {service.original_price && service.discount_percent > 0 && (
                    <span className="deal-original-price">₹ {service.original_price}</span>
                  )}
                </div>

                <button 
                  className="deal-book-button"
                  onClick={(e) => handleBookNow(e, service.id)}
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DreamDeals
