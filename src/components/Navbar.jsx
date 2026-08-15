import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { siteInfo, navLinks } from '../data/siteData'
import { smoothScroll } from '../utils/animations'
import Button from './Button'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    
    // If we're on a service detail page, go home first
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        smoothScroll(href)
      }, 100)
    } else {
      smoothScroll(href)
    }
    
    setMobileMenuOpen(false)
  }

  const handleBrandClick = (e) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      smoothScroll('#home')
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Brand */}
          <a 
            href="#home" 
            className="navbar-brand"
            onClick={handleBrandClick}
          >
            <span className="brand-name">{siteInfo.brandName}</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-links desktop-nav">
            {navLinks.map(link => (
              <li key={link.id}>
                <a 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="nav-link"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="navbar-cta desktop-nav">
            <Button 
              variant="primary" 
              size="small"
              onClick={(e) => handleNavClick(e, '#booking')}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links-mobile">
            {navLinks.map(link => (
              <li key={link.id}>
                <a 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="nav-link-mobile"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <Button 
                variant="primary" 
                size="medium"
                onClick={(e) => handleNavClick(e, '#booking')}
                className="mobile-cta"
              >
                Book Now
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
