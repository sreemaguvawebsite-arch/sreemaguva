import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './admin.css'

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="admin-layout" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem' }}></div>
          <p style={{ 
            color: '#FFFFFF', 
            fontSize: '1.125rem', 
            fontWeight: '500',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Loading admin panel...
          </p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute