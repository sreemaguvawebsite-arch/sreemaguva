import { useEffect, useRef } from 'react'
import { siteInfo } from '../data/siteData'
import { smoothScroll } from '../utils/animations'
import Button from '../components/Button'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    if (hero) {
      hero.classList.add('animate-in')
    }

    // Ensure video plays on mobile
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {
        // Fallback if autoplay fails
        console.log('Video autoplay prevented')
      })
    }
  }, [])

  const handleCTAClick = (e, target) => {
    e.preventDefault()
    smoothScroll(target)
  }

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-bg">
        <div className="hero-overlay"></div>
        
        {/* Video Background */}
        <video 
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/hero-video.webm" type="video/webm" />
          {/* Fallback image if video doesn't load */}
        </video>
        
        {/* Fallback Image */}
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80" 
          alt="Sree Maguva Beauty Parlour"
          className="hero-image hero-fallback"
        />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-label">WELCOME TO {siteInfo.brandName.toUpperCase()}</span>
          
          <h1 className="hero-title">
            {siteInfo.tagline}
          </h1>

          <p className="hero-secondary">
            Modern Beauty, Personal Care & Aesthetic Excellence
          </p>

          <p className="hero-description">
            Enhancing your natural beauty with professional care, premium services 
            and a personalized experience.
          </p>

          <div className="hero-buttons">
            <Button 
              variant="primary" 
              size="large"
              onClick={(e) => handleCTAClick(e, '#booking')}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              }
            >
              Book an Appointment
            </Button>

            <Button 
              variant="outline" 
              size="large"
              onClick={(e) => handleCTAClick(e, '#services')}
            >
              Explore Our Services
            </Button>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <span className="trust-icon">✨</span>
              <span>Established {siteInfo.established}</span>
            </div>
            <div className="trust-divider">•</div>
            <div className="trust-item">
              <span className="trust-icon">💝</span>
              <span>{siteInfo.totalClients}+ Happy Clients</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse"></div>
      </div>
    </section>
  )
}

export default Hero
