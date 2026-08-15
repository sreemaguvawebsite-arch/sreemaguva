import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './admin.css'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user, isAdmin, signIn, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Pre-fill admin email
    setEmail('jaanu@gmail.com')
  }, [])

  // Redirect if already authenticated as admin
  if (!loading && user && isAdmin) {
    const from = location.state?.from?.pathname || '/admin/dashboard'
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const { error } = await signIn(email, password)
      
      if (error) {
        setError(error.message || 'Login failed')
        return
      }

      // Navigation will be handled by the auth state change
      const from = location.state?.from?.pathname || '/admin/dashboard'
      navigate(from, { replace: true })
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Login error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="admin-layout">
      <div style={{ 
        minHeight: '100vh',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '3rem 1rem',
        background: 'linear-gradient(135deg, var(--royal-pink) 0%, var(--royal-pink-dark) 100%)'
      }}>
        <div style={{ maxWidth: '28rem', width: '100%' }}>
          <div className="admin-card" style={{ padding: '2.5rem', animation: 'fadeInUp 0.5s ease-out' }}>
            {/* Logo/Icon */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div className="stat-icon stat-icon-purple" style={{ 
                width: '4rem', 
                height: '4rem',
                margin: '0 auto',
                boxShadow: '0 8px 32px rgba(196, 30, 58, 0.3)'
              }}>
                <svg style={{ width: '2.5rem', height: '2.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.5rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, var(--royal-pink) 0%, var(--royal-pink-dark) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginTop: '1.5rem',
                marginBottom: '0.5rem'
              }}>
                Admin Login
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                Sign in to manage your website
              </p>
            </div>

            {/* Login Form */}
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
              {error && (
                <div style={{ 
                  background: '#FEF2F2', 
                  border: '2px solid #FECACA', 
                  color: '#991B1B', 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'start', 
                  gap: '0.75rem',
                  animation: 'fadeIn 0.3s ease'
                }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', marginTop: '0.125rem', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{error}</span>
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    Email address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ 
                      position: 'absolute', 
                      top: '0', 
                      left: '0', 
                      bottom: '0',
                      width: '3rem',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      pointerEvents: 'none'
                    }}>
                      <svg style={{ width: '1.25rem', height: '1.25rem', color: '#9CA3AF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="admin-input"
                      style={{ paddingLeft: '3rem', height: '3rem' }}
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ 
                      position: 'absolute', 
                      top: '0', 
                      left: '0', 
                      bottom: '0',
                      width: '3rem',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      pointerEvents: 'none'
                    }}>
                      <svg style={{ width: '1.25rem', height: '1.25rem', color: '#9CA3AF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="admin-input"
                      style={{ paddingLeft: '3rem', height: '3rem' }}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="btn-primary"
                  style={{ 
                    width: '100%', 
                    height: '3rem', 
                    fontSize: '1rem', 
                    fontWeight: '600',
                    opacity: (isSubmitting || loading) ? '0.5' : '1',
                    cursor: (isSubmitting || loading) ? 'not-allowed' : 'pointer',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.5rem'
                  }}
                >
                  {isSubmitting || loading ? (
                    <>
                      <div className="spinner" style={{ width: '1.25rem', height: '1.25rem', borderWidth: '2px' }}></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                Secure admin access only
              </p>
            </div>
          </div>
          
          {/* Brand Footer */}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', fontWeight: '500' }}>
              Sree Maguva Beauty Admin Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin