import { useState, useEffect } from 'react'
import './IntroSplash.css'

const IntroSplash = ({ onComplete }) => {
  const [showLine, setShowLine] = useState(false)
  const [showBrand, setShowBrand] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [clientCount, setClientCount] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100%'

    // Step 1: Show line (immediately)
    setTimeout(() => setShowLine(true), 100)
    
    // Step 2: Show brand name (after line appears)
    setTimeout(() => setShowBrand(true), 800)
    
    // Step 3: Show stats and start counting (after brand appears)
    setTimeout(() => {
      setShowStats(true)
      // Count from 0 to 1000
      let count = 0
      const target = 1000
      const duration = 2000 // 2 seconds
      const increment = target / (duration / 16) // 60fps
      
      const counter = setInterval(() => {
        count += increment
        if (count >= target) {
          setClientCount(target)
          clearInterval(counter)
        } else {
          setClientCount(Math.floor(count))
        }
      }, 16)
    }, 1500)

    // Step 4: Fade out after 7 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        document.body.style.overflow = 'unset'
        document.body.style.position = 'unset'
        document.body.style.width = 'auto'
        document.body.style.height = 'auto'
        onComplete()
      }, 1000)
    }, 7000)

    return () => {
      clearTimeout(fadeTimer)
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
        <div className="sparkle sparkle-2">💫</div>
        <div className="sparkle sparkle-3">⭐</div>
        <div className="sparkle sparkle-4">✨</div>

        {/* Brand Name - Appears ABOVE the line */}
        <div className={`intro-brand ${showBrand ? 'show' : ''}`}>
          <h1 className="intro-brand-name">SREE MAGUVA</h1>
        </div>

        {/* Horizontal Line - Below the name */}
        <div className={`intro-line ${showLine ? 'show' : ''}`}></div>

        {/* Stats with counting animation - Below the line */}
        <div className={`intro-stats ${showStats ? 'show' : ''}`}>
          <div className="intro-stat">
            <span className="intro-stat-number">{clientCount}+</span>
            <span className="intro-stat-label">SATISFIED CLIENTS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroSplash
