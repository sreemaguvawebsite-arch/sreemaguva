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
          <h1 className="hero-title">
            {siteInfo.brandName}
          </h1>

          <p className="hero-subtitle">
            Beauty & Wellness, Made Just for You ✨
          </p>

          <div className="hero-buttons">
            <Button 
              variant="primary" 
              size="large"
              onClick={(e) => handleCTAClick(e, '#booking')}
            >
              Book Appointment
            </Button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{siteInfo.yearsExperience}+</span>
              <span className="stat-label">Years</span>
            </div>
            <div className="stat-divider">•</div>
            <div className="stat-item">
              <span className="stat-number">{siteInfo.totalClients}+</span>
              <span className="stat-label">Clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
