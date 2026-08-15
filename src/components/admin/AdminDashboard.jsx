import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase, TABLES } from '../../lib/supabase'
import './admin.css'

const AdminDashboard = () => {
  const { user, signOut } = useAuth()
  const [stats, setStats] = useState({
    totalGalleryItems: 0,
    totalCourses: 0,
    totalServices: 0,
    totalReviews: 0,
    lastUpdated: new Date().toISOString()
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)

      const [galleryResult, coursesResult, servicesResult, reviewsResult] = await Promise.all([
        supabase.from(TABLES.GALLERY_ITEMS).select('id', { count: 'exact', head: true }),
        supabase.from(TABLES.ACADEMY_COURSES).select('id', { count: 'exact', head: true }),
        supabase.from(TABLES.SERVICES).select('id', { count: 'exact', head: true }),
        supabase.from(TABLES.CUSTOMER_REVIEWS).select('id', { count: 'exact', head: true }).eq('status', 'pending')
      ])

      setStats({
        totalGalleryItems: galleryResult.count || 0,
        totalCourses: coursesResult.count || 0,
        totalServices: servicesResult.count || 0,
        totalReviews: reviewsResult.count || 0,
        lastUpdated: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const menuItems = [
    {
      name: 'Gallery Manager',
      description: 'Manage images and videos',
      href: '/admin/gallery',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      count: stats.totalGalleryItems,
      color: 'blue'
    },
    {
      name: 'Academy Courses',
      description: 'Manage courses and schedules',
      href: '/admin/academy',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      count: stats.totalCourses,
      color: 'green'
    },
    {
      name: 'Services',
      description: 'Manage services and pricing',
      href: '/admin/services',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      ),
      count: stats.totalServices,
      color: 'purple'
    },
    {
      name: 'Customer Reviews',
      description: 'Moderate customer feedback',
      href: '/admin/reviews',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      count: stats.totalReviews || 0,
      color: 'gold'
    }
  ]

  return (
    <div className="admin-layout">
      {/* Header */}
      <header className="admin-header">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.25rem', 
                fontWeight: '800', 
                color: '#FFFFFF',
                marginBottom: '0.5rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Admin Dashboard
              </h1>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                Welcome, {user?.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="btn-secondary"
              style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="admin-content">
        {/* Stats Overview */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="section-header">Overview Statistics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="stat-card fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="stat-value">
                    {loading ? '...' : stats.totalGalleryItems}
                  </div>
                  <div className="stat-label">Gallery Items</div>
                </div>
                <div className="stat-icon stat-icon-purple">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="stat-card fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="stat-value">
                    {loading ? '...' : stats.totalCourses}
                  </div>
                  <div className="stat-label">Academy Courses</div>
                </div>
                <div className="stat-icon stat-icon-gold">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="stat-card fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="stat-value">
                    {loading ? '...' : stats.totalServices}
                  </div>
                  <div className="stat-label">Services</div>
                </div>
                <div className="stat-icon stat-icon-blue">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div>
          <h2 className="section-header">Management Panels</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {menuItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="admin-card fade-in-up"
                style={{ 
                  textDecoration: 'none', 
                  display: 'block',
                  animationDelay: `${0.4 + index * 0.1}s`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'start', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div className={`stat-icon stat-icon-${item.color}`}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ 
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.375rem', 
                        fontWeight: '700', 
                        color: '#0F172A',
                        margin: 0 
                      }}>
                        {item.name}
                      </h3>
                      <span className="badge badge-gold">{item.count}</span>
                    </div>
                    <p style={{ fontSize: '0.9375rem', color: '#64748B', margin: 0, lineHeight: '1.6' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: '#C41E3A', 
                  fontSize: '0.9375rem', 
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Manage
                  <svg className="h-5 w-5" style={{ marginLeft: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div style={{ 
          marginTop: '3rem', 
          padding: '1.5rem', 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,248,240,0.9) 100%)',
          border: '2px solid var(--gold)',
          borderRadius: '16px', 
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#475569', 
            margin: 0,
            fontWeight: '500'
          }}>
            🕒 Last updated: {new Date(stats.lastUpdated).toLocaleString()}
          </p>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard