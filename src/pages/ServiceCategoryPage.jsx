import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Button from '../components/Button'
import './ServiceCategoryPage.css'

const ServiceCategoryPage = () => {
  const { categoryName } = useParams()
  const navigate = useNavigate()
  const [selectedService, setSelectedService] = useState(null)

  // Comprehensive service data for each category
  const categoryData = {
    'facial': {
      name: 'Facial Treatments',
      icon: '✨',
      hero: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80',
      description: 'Experience the ultimate in facial care with our luxurious treatments designed to rejuvenate, cleanse, and nourish your skin.',
      benefits: [
        'Deep cleansing and exfoliation',
        'Improved skin texture and tone',
        'Reduced fine lines and wrinkles',
        'Hydration and nourishment',
        'Relaxation and stress relief'
      ],
      services: [
        {
          id: 'f1',
          name: 'Classic Gold Facial',
          price: '₹1,299',
          originalPrice: '₹1,999',
          duration: '60 mins',
          description: 'A luxurious gold-infused facial that brightens and firms your skin',
          features: ['Gold dust application', 'Deep cleansing', 'Face massage', 'Hydrating mask']
        },
        {
          id: 'f2',
          name: 'Diamond Facial',
          price: '₹1,899',
          originalPrice: '₹2,999',
          duration: '75 mins',
          description: 'Premium diamond facial for instant glow and radiance',
          features: ['Diamond scrub', 'Steam therapy', 'Extraction', 'Luxury mask']
        },
        {
          id: 'f3',
          name: 'Fruit Facial',
          price: '₹999',
          originalPrice: '₹1,499',
          duration: '45 mins',
          description: 'Natural fruit extracts for fresh and glowing skin',
          features: ['Fruit pulp application', 'Vitamin enrichment', 'Gentle exfoliation', 'Moisturizing']
        },
        {
          id: 'f4',
          name: 'Anti-Aging Facial',
          price: '₹2,499',
          originalPrice: '₹3,999',
          duration: '90 mins',
          description: 'Advanced treatment to reduce signs of aging',
          features: ['Collagen boost', 'Wrinkle reduction', 'Firming treatment', 'Age-defying serum']
        }
      ]
    },
    'clean-up': {
      name: 'Clean Up Services',
      icon: '🌿',
      hero: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=1200&q=80',
      description: 'Quick and effective clean-up treatments to refresh and revitalize your skin instantly.',
      benefits: [
        'Instant freshness and glow',
        'Removes dirt and impurities',
        'Perfect before events',
        'Quick 30-minute treatment',
        'Suitable for all skin types'
      ],
      services: [
        {
          id: 'c1',
          name: 'Express Clean Up',
          price: '₹599',
          originalPrice: '₹899',
          duration: '30 mins',
          description: 'Quick refresh for instant glow',
          features: ['Cleansing', 'Scrubbing', 'Face pack', 'Moisturizing']
        },
        {
          id: 'c2',
          name: 'Bridal Clean Up',
          price: '₹899',
          originalPrice: '₹1,299',
          duration: '45 mins',
          description: 'Special pre-wedding clean-up treatment',
          features: ['Deep cleansing', 'Bleach', 'Glow pack', 'Makeup base prep']
        }
      ]
    },
    'bleach': {
      name: 'Bleach & Brightening',
      icon: '💫',
      hero: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200&q=80',
      description: 'Professional bleaching treatments for fair, bright, and even-toned skin.',
      benefits: [
        'Lightens skin tone',
        'Reduces tan and pigmentation',
        'Brightens complexion',
        'Evens out skin tone',
        'Instant glow'
      ],
      services: [
        {
          id: 'b1',
          name: 'Face & Neck Bleach',
          price: '₹499',
          originalPrice: '₹799',
          duration: '30 mins',
          description: 'Professional bleach for face and neck',
          features: ['Skin test', 'Professional application', 'Soothing cream', 'Sun protection advice']
        },
        {
          id: 'b2',
          name: 'Full Body Bleach',
          price: '₹1,999',
          originalPrice: '₹2,999',
          duration: '90 mins',
          description: 'Complete body bleaching treatment',
          features: ['Full body coverage', 'Premium products', 'Moisturizing', 'Glow enhancement']
        }
      ]
    },
    'de-tan': {
      name: 'De-Tan Treatments',
      icon: '☀️',
      hero: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=80',
      description: 'Remove stubborn tan and restore your natural skin tone with our specialized de-tan treatments.',
      benefits: [
        'Removes sun tan effectively',
        'Restores natural skin color',
        'Soothes sun-damaged skin',
        'Hydrates and nourishes',
        'Long-lasting results'
      ],
      services: [
        {
          id: 'd1',
          name: 'Face De-Tan',
          price: '₹699',
          originalPrice: '₹1,099',
          duration: '40 mins',
          description: 'Remove facial tan and restore glow',
          features: ['Tan removal pack', 'Vitamin C treatment', 'Brightening', 'Sun protection']
        },
        {
          id: 'd2',
          name: 'Full Body De-Tan',
          price: '₹2,499',
          originalPrice: '₹3,999',
          duration: '120 mins',
          description: 'Complete body de-tan treatment',
          features: ['Full body scrub', 'De-tan pack', 'Moisturizing', 'Skin repair']
        }
      ]
    },
    'waxing': {
      name: 'Waxing Services',
      icon: '💅',
      hero: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1200&q=80',
      description: 'Smooth, hair-free skin with our professional waxing services using premium products.',
      benefits: [
        'Smooth skin for weeks',
        'Removes hair from root',
        'Reduces hair growth over time',
        'Hygienic and safe',
        'Minimal pain with expert technique'
      ],
      services: [
        {
          id: 'w1',
          name: 'Full Arms Waxing',
          price: '₹299',
          originalPrice: '₹499',
          duration: '20 mins',
          description: 'Complete arm hair removal',
          features: ['Pre-wax treatment', 'Quality wax', 'Post-wax soothing', 'Clean finish']
        },
        {
          id: 'w2',
          name: 'Full Legs Waxing',
          price: '₹499',
          originalPrice: '₹799',
          duration: '30 mins',
          description: 'Smooth legs waxing service',
          features: ['Both legs', 'Premium wax', 'Gentle technique', 'Moisturizing']
        },
        {
          id: 'w3',
          name: 'Full Body Waxing',
          price: '₹1,799',
          originalPrice: '₹2,999',
          duration: '90 mins',
          description: 'Complete body hair removal',
          features: ['Arms, legs, back', 'Underarms included', 'Premium products', 'After-care']
        }
      ]
    },
    'mani-pedi': {
      name: 'Manicure & Pedicure',
      icon: '💖',
      hero: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80',
      description: 'Pamper your hands and feet with our luxurious manicure and pedicure services.',
      benefits: [
        'Soft and smooth hands & feet',
        'Healthy nails',
        'Improved circulation',
        'Stress relief and relaxation',
        'Beautiful nail polish finish'
      ],
      services: [
        {
          id: 'm1',
          name: 'Classic Manicure',
          price: '₹499',
          originalPrice: '₹799',
          duration: '45 mins',
          description: 'Traditional hand care treatment',
          features: ['Nail shaping', 'Cuticle care', 'Hand massage', 'Polish application']
        },
        {
          id: 'm2',
          name: 'Classic Pedicure',
          price: '₹599',
          originalPrice: '₹999',
          duration: '60 mins',
          description: 'Complete foot care treatment',
          features: ['Foot soak', 'Scrubbing', 'Foot massage', 'Polish application']
        },
        {
          id: 'm3',
          name: 'Spa Manicure & Pedicure',
          price: '₹1,499',
          originalPrice: '₹2,499',
          duration: '120 mins',
          description: 'Luxury spa treatment for hands and feet',
          features: ['Premium products', 'Extended massage', 'Paraffin treatment', 'Nail art option']
        }
      ]
    },
    'hair-care': {
      name: 'Hair Care Services',
      icon: '💇‍♀️',
      hero: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80',
      description: 'Transform your hair with our professional hair care treatments and styling services.',
      benefits: [
        'Healthy and shiny hair',
        'Damage repair',
        'Volume and bounce',
        'Scalp health improvement',
        'Expert styling'
      ],
      services: [
        {
          id: 'h1',
          name: 'Hair Spa',
          price: '₹999',
          originalPrice: '₹1,599',
          duration: '60 mins',
          description: 'Deep conditioning and relaxation',
          features: ['Steam therapy', 'Hair mask', 'Scalp massage', 'Conditioning']
        },
        {
          id: 'h2',
          name: 'Keratin Treatment',
          price: '₹4,999',
          originalPrice: '₹7,999',
          duration: '180 mins',
          description: 'Smoothening and straightening',
          features: ['Frizz-free hair', 'Shine enhancement', 'Lasts 3-6 months', 'Professional products']
        },
        {
          id: 'h3',
          name: 'Hair Cut & Style',
          price: '₹599',
          originalPrice: '₹999',
          duration: '45 mins',
          description: 'Professional haircut with styling',
          features: ['Consultation', 'Precision cutting', 'Blow dry', 'Styling']
        },
        {
          id: 'h4',
          name: 'Hair Coloring',
          price: '₹2,499',
          originalPrice: '₹3,999',
          duration: '120 mins',
          description: 'Professional hair color application',
          features: ['Color consultation', 'Premium colors', 'Full coverage', 'After-care advice']
        }
      ]
    },
    'massage': {
      name: 'Massage Therapy',
      icon: '🌸',
      hero: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
      description: 'Relax and rejuvenate with our professional massage therapy services.',
      benefits: [
        'Deep relaxation',
        'Stress relief',
        'Improved blood circulation',
        'Muscle tension release',
        'Overall wellness'
      ],
      services: [
        {
          id: 'ms1',
          name: 'Head & Shoulder Massage',
          price: '₹599',
          originalPrice: '₹899',
          duration: '30 mins',
          description: 'Relaxing head and shoulder massage',
          features: ['Stress relief', 'Tension release', 'Essential oils', 'Pressure point therapy']
        },
        {
          id: 'ms2',
          name: 'Full Body Massage',
          price: '₹1,999',
          originalPrice: '₹2,999',
          duration: '90 mins',
          description: 'Complete body relaxation massage',
          features: ['Full body coverage', 'Aromatherapy', 'Deep tissue', 'Lymphatic drainage']
        }
      ]
    }
  }

  const category = categoryData[categoryName.toLowerCase().replace(/ /g, '-')]

  useEffect(() => {
    if (!category) {
      navigate('/404')
    }
  }, [category, navigate])

  if (!category) {
    return null
  }

  const handleBookService = (service) => {
    setSelectedService(service)
    // Scroll to booking section
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="service-category-page">
      {/* Hero Section */}
      <section className="category-hero" style={{ backgroundImage: `url(${category.hero})` }}>
        <div className="category-hero-overlay">
          <div className="container">
            <div className="category-hero-content">
              <span className="category-hero-icon">{category.icon}</span>
              <h1 className="category-hero-title">{category.name}</h1>
              <p className="category-hero-description">{category.description}</p>
              <Button 
                variant="primary" 
                size="large"
                onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              >
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="category-benefits">
        <div className="container">
          <h2 className="section-heading">Why Choose Our {category.name}?</h2>
          <div className="benefits-grid">
            {category.benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <span className="benefit-icon">✓</span>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="category-services">
        <div className="container">
          <h2 className="section-heading">Our {category.name}</h2>
          <p className="section-subtitle">Choose from our range of professional treatments</p>
          
          <div className="services-grid">
            {category.services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-card-header">
                  <h3 className="service-card-title">{service.name}</h3>
                  <div className="service-card-pricing">
                    <span className="service-price">{service.price}</span>
                    {service.originalPrice && (
                      <span className="service-original-price">{service.originalPrice}</span>
                    )}
                  </div>
                </div>
                
                <p className="service-duration">⏱️ {service.duration}</p>
                <p className="service-description">{service.description}</p>
                
                <div className="service-features">
                  <h4>What's Included:</h4>
                  <ul>
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  variant="primary" 
                  fullWidth
                  onClick={() => handleBookService(service)}
                >
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="category-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Experience Our {category.name}?</h2>
            <p>Book your appointment today and let our experts take care of you!</p>
            <div className="cta-buttons">
              <Button 
                variant="primary" 
                size="large"
                onClick={() => window.open(`https://wa.me/919059955529?text=Hi! I want to book ${category.name}`, '_blank')}
              >
                📱 WhatsApp Us
              </Button>
              <Button 
                variant="secondary" 
                size="large"
                onClick={() => window.location.href = 'tel:+919059955529'}
              >
                📞 Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceCategoryPage
