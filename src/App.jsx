import './App.css'

function App() {
  return (
    <div className="uc-wrapper">
      {/* Animated background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="uc-card">
        {/* Logo / Brand */}
        <div className="brand">
          <div className="brand-icon">
            <span>S</span>
          </div>
          <h1 className="brand-name">Sreemaguva</h1>
        </div>

        {/* Gear icon */}
        <div className="gear-wrap" aria-hidden="true">
          <svg className="gear gear-big" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 35a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0-8c-1.4 0-2.8.1-4.1.3l-2.2-6.7-9.4 3.9 1.2 7a23 23 0 0 0-5.8 5.8l-7-1.2-3.9 9.4 6.7 2.2A23 23 0 0 0 25 50c0 1.4.1 2.8.3 4.1l-6.7 2.2 3.9 9.4 7-1.2a23 23 0 0 0 5.8 5.8l-1.2 7 9.4 3.9 2.2-6.7c1.3.2 2.7.3 4.1.3s2.8-.1 4.1-.3l2.2 6.7 9.4-3.9-1.2-7a23 23 0 0 0 5.8-5.8l7 1.2 3.9-9.4-6.7-2.2c.2-1.3.3-2.7.3-4.1s-.1-2.8-.3-4.1l6.7-2.2-3.9-9.4-7 1.2a23 23 0 0 0-5.8-5.8l1.2-7-9.4-3.9-2.2 6.7A23 23 0 0 0 50 27z"
              fill="currentColor"
            />
          </svg>
          <svg className="gear gear-small" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 35a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0-8c-1.4 0-2.8.1-4.1.3l-2.2-6.7-9.4 3.9 1.2 7a23 23 0 0 0-5.8 5.8l-7-1.2-3.9 9.4 6.7 2.2A23 23 0 0 0 25 50c0 1.4.1 2.8.3 4.1l-6.7 2.2 3.9 9.4 7-1.2a23 23 0 0 0 5.8 5.8l-1.2 7 9.4 3.9 2.2-6.7c1.3.2 2.7.3 4.1.3s2.8-.1 4.1-.3l2.2 6.7 9.4-3.9-1.2-7a23 23 0 0 0 5.8-5.8l7 1.2 3.9-9.4-6.7-2.2c.2-1.3.3-2.7.3-4.1s-.1-2.8-.3-4.1l6.7-2.2-3.9-9.4-7 1.2a23 23 0 0 0-5.8-5.8l1.2-7-9.4-3.9-2.2 6.7A23 23 0 0 0 50 27z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Main content */}
        <h2 className="uc-title">We&rsquo;re Building Something Amazing</h2>
        <p className="uc-subtitle">
          Our website is currently under construction. We&rsquo;re working hard
          to bring you an incredible experience. Stay tuned!
        </p>

        {/* Progress bar */}
        <div className="progress-wrap" aria-label="Site progress">
          <div className="progress-bar">
            <div className="progress-fill" />
          </div>
          <span className="progress-label">70% Complete</span>
        </div>

        {/* Notify form */}
        <form
          className="notify-form"
          onSubmit={(e) => {
            e.preventDefault()
            const input = e.target.email
            if (input.value) {
              input.value = ''
              alert('Thank you! We will notify you when we launch.')
            }
          }}
        >
          <input
            type="email"
            name="email"
            className="notify-input"
            placeholder="Enter your email for updates"
            required
            aria-label="Email address"
          />
          <button type="submit" className="notify-btn">
            Notify Me
          </button>
        </form>

        {/* Social links */}
        <div className="socials">
          <a href="#" aria-label="Facebook" className="social-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter / X" className="social-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M4 4l16 16M20 4 4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M2 4h7l11 16H13L2 4z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="social-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        <p className="footer-text">&copy; {new Date().getFullYear()} Sreemaguva. All rights reserved.</p>
      </div>
    </div>
  )
}

export default App
