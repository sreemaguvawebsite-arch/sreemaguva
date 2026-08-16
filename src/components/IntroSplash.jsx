import { useState, useEffect } from 'react'
import { siteInfo } from '../data/siteData'
import './IntroSplash.css'

const IntroSplash = ({ onComplete }) => {
  const [step, setStep] = useState(0) // 0: brand, 1: stats, 2: fade out
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Lock body scroll when splash screen is visible
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100%'

    // Step 1: Show brand name
    const brandTimer = setTimeout(() => {
      setStep(1) // Show stats after 2 seconds
    }, 2000)

    // Step 2: Start fade out after 7 seconds total
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
      // Remove component and unlock scroll after animation
      setTimeout(() => {
        document.body.style.overflow = 'unset'
        document.body.style.position = 'unset'
        document.body.style.width = 'auto'
        document.body.style.height = 'auto'
        onComplete()
      }, 1000)
    }, 7000)

    return () => {
      clearTimeout(brandTimer)
      clearTimeout(fadeTimer)
      // Cleanup: unlock scroll if component unmounts early
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'auto'
      document.body.style.height = 'auto'
    }
  }, [onComplete])

  return (
    <div className={`intro-splash ${fadeOut ? 'fade-out' : ''}`}>
      <div className="intro-content">
        {/* Sparkles */}
        <div className="sparkle sparkle-1">✨</div>
        <div className="sparkle sparkle-2">✨</div>
        <div className="sparkle sparkle-3">💫</div>
        <div className="sparkle sparkle-4">⭐</div>

        {/* Brand Name - Always visible */}
        <div className={`intro-brand ${step >= 0 ? 'show' : ''}`}>
          <h1 className="intro-brand-name">{siteInfo.brandName}</h1>
        </div>

        {/* Divider Line */}
        <div className={`intro-divider ${step >= 1 ? 'show' : ''}`}></div>

        {/* Stats - Appear after brand */}
        <div className={`intro-stats ${step >= 1 ? 'show' : ''}`}>
          <div className="intro-stat">
            <span className="intro-stat-number">{siteInfo.totalClients}+</span>
            <span className="intro-stat-label">Clients Satisfied</span>
          </div>
        </div>

        {/* Loading bar */}
        <div className={`intro-progress ${step >= 1 ? 'show' : ''}`}>
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  )
}

export default IntroSplash
