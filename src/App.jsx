import { useState } from 'react'
import './App.css'

function App() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const input = e.target.email
    if (input.value) {
      input.value = ''
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  return (
    <div className="uc-wrapper">

      {/* Decorative petals */}
      <div className="petal petal-1" aria-hidden="true">🌸</div>
      <div className="petal petal-2" aria-hidden="true">🌺</div>
      <div className="petal petal-3" aria-hidden="true">✨</div>
      <div className="petal petal-4" aria-hidden="true">🌸</div>
      <div className="petal petal-5" aria-hidden="true">💄</div>
      <div className="petal petal-6" aria-hidden="true">🌺</div>

      {/* Soft blobs */}
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <div className="blob blob-3" aria-hidden="true" />

      <div className="uc-card">

        {/* Top accent line */}
        <div className="accent-line" />

        {/* Brand */}
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="currentColor"/>
              <path d="M12 6.5c-.83 0-1.5-.67-1.5-1.5S11.17 3.5 12 3.5s1.5.67 1.5 1.5S12.83 6.5 12 6.5z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h1 className="brand-name">Sreemaguva</h1>
            <span className="brand-tagline">Beauty &amp; Wellness Parlour</span>
          </div>
        </div>

        {/* Divider */}
        <div className="divider">
          <span className="divider-line" />
          <span className="divider-icon" aria-hidden="true">✦</span>
          <span className="divider-line" />
        </div>

        {/* Scissors / beauty icon */}
        <div className="beauty-icon-wrap" aria-hidden="true">
          <svg className="scissors" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Scissors SVG */}
            <circle cx="28" cy="30" r="12" stroke="currentColor" strokeWidth="4" fill="none"/>
            <circle cx="28" cy="70" r="12" stroke="currentColor" strokeWidth="4" fill="none"/>
            <line x1="36" y1="36" x2="78" y2="78" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <line x1="36" y1="64" x2="78" y2="22" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          </svg>
          <div className="sparkle s1" aria-hidden="true">✦</div>
          <div className="sparkle s2" aria-hidden="true">✦</div>
          <div className="sparkle s3" aria-hidden="true">✦</div>
        </div>

        {/* Main text */}
        <h2 className="uc-title">Something Beautiful is Coming</h2>
        <p className="uc-subtitle">
          We&rsquo;re putting the finishing touches on our new salon experience.
          Get ready to look and feel your absolute best — opening very soon!
        </p>

        {/* Services preview chips */}
        <div className="services">
          {['Hair Styling', 'Skin Care', 'Bridal Makeup', 'Nail Art', 'Spa & Wellness'].map((s) => (
            <span className="service-chip" key={s}>{s}</span>
          ))}
        </div>

        {/* Progress */}
        <div className="progress-wrap" aria-label="Launch progress">
          <div className="progress-header">
            <span className="progress-text">Preparing our salon…</span>
            <span className="progress-pct">75%</span>
          </div>
          <div className="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-fill" />
          </div>
        </div>

        {/* Notify form */}
        <form className="notify-form" onSubmit={handleSubmit}>
          <div className="input-wrap">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
              <path d="M4 4h16v16H4z" rx="2"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <input
              type="email"
              name="email"
              className="notify-input"
              placeholder="Your email for exclusive launch offers"
              required
              aria-label="Email address"
            />
          </div>
          <button type="submit" className="notify-btn">
            <span>Notify Me</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </form>

        {submitted && (
          <p className="success-msg" role="alert">
            🎉 Thank you! We&rsquo;ll notify you with exclusive launch offers.
          </p>
        )}

        {/* Divider */}
        <div className="divider divider-sm">
          <span className="divider-line" />
          <span className="divider-icon" aria-hidden="true">✦</span>
          <span className="divider-line" />
        </div>

        {/* Contact + Social */}
        <div className="contact-row">
          <a href="tel:+910000000000" className="contact-link" aria-label="Call us">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3.09 4.18 2 2 0 0 1 5.09 2h3a2 2 0 0 1 2 1.72c.13 1 .37 1.97.72 2.9a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.18-1.18a2 2 0 0 1 2.11-.45c.93.35 1.9.59 2.9.72A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call Us
          </a>
          <a href="mailto:hello@sreemaguva.com" className="contact-link" aria-label="Email us">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Email Us
          </a>
        </div>

        <div className="socials">
          <a href="#" aria-label="Facebook" className="social-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="social-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="#" aria-label="WhatsApp" className="social-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.533 5.854L0 24l6.335-1.521A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.666-.523-5.176-1.432l-.371-.22-3.762.903.957-3.667-.242-.387A9.97 9.97 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className="social-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        <p className="footer-text">
          &copy; {new Date().getFullYear()} Sreemaguva Beauty &amp; Wellness. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default App
