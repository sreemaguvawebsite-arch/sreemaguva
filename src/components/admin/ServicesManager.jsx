import React, { useState, useEffect } from 'react'
import { supabase, TABLES } from '../../lib/supabase'
import './admin.css'

const ServicesManager = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['hair', 'makeup', 'skincare', 'bridal', 'special', 'spa']

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.SERVICES)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
      alert('Error fetching services: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const saveService = async (serviceData) => {
    try {
      if (editingService) {
        // Update existing service
        const { data, error } = await supabase
          .from(TABLES.SERVICES)
          .update({ ...serviceData, updated_at: new Date().toISOString() })
          .eq('id', editingService.id)
          .select()

        if (error) throw error
        setServices(prev => prev.map(s => s.id === editingService.id ? data[0] : s))
      } else {
        // Create new service
        const { data, error } = await supabase
          .from(TABLES.SERVICES)
          .insert([{
            ...serviceData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
          .select()

        if (error) throw error
        setServices(prev => [data[0], ...prev])
      }

      setShowForm(false)
      setEditingService(null)
      alert('Service saved successfully')
    } catch (error) {
      console.error('Save error:', error)
      alert('Save failed: ' + error.message)
    }
  }

  const deleteService = async (service) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const { error } = await supabase
        .from(TABLES.SERVICES)
        .delete()
        .eq('id', service.id)

      if (error) throw error

      setServices(prev => prev.filter(s => s.id !== service.id))
      alert('Service deleted successfully')
    } catch (error) {
      console.error('Delete error:', error)
      alert('Delete failed: ' + error.message)
    }
  }

  const filteredServices = services.filter(service => {
    const matchesFilter = filter === 'all' || service.category === filter
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="admin-layout">
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
                Services Manager
              </h1>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                Manage services and pricing ({services.length} services)
              </p>
            </div>
            <a
              href="/admin/dashboard"
              className="btn-secondary"
              style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="admin-content">
        {/* Actions */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 className="section-header" style={{ marginBottom: 0 }}>Services Management</h2>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Service
            </button>
          </div>

          {/* Filters */}
          <div className="admin-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="admin-input"
                />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setFilter('all')}
                  className={filter === 'all' ? 'btn-primary' : 'btn-secondary'}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={filter === category ? 'btn-primary' : 'btn-secondary'}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Service Form */}
        {showForm && (
          <div style={{ marginBottom: '3rem' }} className="fade-in-up">
            <ServiceForm
              service={editingService}
              categories={categories}
              onSave={saveService}
              onCancel={() => {
                setShowForm(false)
                setEditingService(null)
              }}
            />
          </div>
        )}

        {/* Services List */}
        <div>
          <h2 className="section-header">Services Overview</h2>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div className="spinner"></div>
                <p style={{ fontSize: '0.9375rem', color: '#64748B', fontWeight: '500' }}>
                  Loading services...
                </p>
              </div>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="admin-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div className="stat-icon stat-icon-blue" style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem' }}>
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#0F172A',
                marginBottom: '0.5rem'
              }}>
                No services found
              </h3>
              <p style={{ fontSize: '0.9375rem', color: '#64748B', marginBottom: '2rem' }}>
                Create your first service offering to get started
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Create First Service
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
              {filteredServices.map((service, index) => (
                <div key={service.id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ServiceCard
                    service={service}
                    onEdit={() => {
                      setEditingService(service)
                      setShowForm(true)
                    }}
                    onDelete={() => deleteService(service)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const ServiceForm = ({ service, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    price_range: service?.price_range || '',
    duration: service?.duration || '',
    category: service?.category || categories[0],
    features: service?.features?.join('\n') || '',
    popular: service?.popular || false,
    status: service?.status || 'active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      features: formData.features.split('\n').filter(f => f.trim())
    })
  }

  return (
    <div className="admin-card">
      <h3 style={{ 
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.5rem', 
        fontWeight: '700', 
        color: '#0F172A',
        marginBottom: '1.5rem'
      }}>
        {service ? 'Edit Service' : 'Add New Service'}
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Service Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="admin-input"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="admin-select"
            >
              {categories.map(category => (
                <option key={category} value={category} style={{ textTransform: 'capitalize' }}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Price Range *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., ₹1500 or ₹1000-₹3000"
              value={formData.price_range}
              onChange={(e) => setFormData(prev => ({ ...prev, price_range: e.target.value }))}
              className="admin-input"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Duration *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., 2 hours, 3-4 hours"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="admin-input"
            />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Description *
          </label>
          <textarea
            required
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="admin-textarea"
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Features (one per line)
          </label>
          <textarea
            rows="4"
            placeholder="Professional styling&#10;Premium products&#10;Consultation included"
            value={formData.features}
            onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
            className="admin-textarea"
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.popular}
                onChange={(e) => setFormData(prev => ({ ...prev, popular: e.target.checked }))}
                style={{ 
                  width: '1.125rem', 
                  height: '1.125rem',
                  accentColor: 'var(--royal-pink)'
                }}
              />
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                Popular Service
              </span>
            </label>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="admin-select"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
          <button
            type="submit"
            className="btn-primary"
            style={{ flex: 1 }}
          >
            {service ? 'Update Service' : 'Create Service'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            style={{ flex: 1 }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

const ServiceCard = ({ service, onEdit, onDelete }) => {
  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h3 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.375rem', 
              fontWeight: '700', 
              color: '#0F172A',
              margin: 0 
            }}>
              {service.name}
            </h3>
            {service.popular && (
              <span className="badge badge-gold">
                Popular
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.875rem', color: '#64748B', margin: '0 0 0.5rem 0', fontWeight: '500', textTransform: 'capitalize' }}>
            {service.category} • {service.duration} • {service.price_range}
          </p>
        </div>
        <span className={`badge ${
          service.status === 'active' ? 'badge-success' : 'badge-gray'
        }`}>
          {service.status}
        </span>
      </div>
      
      <p style={{ fontSize: '0.9375rem', color: '#475569', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        {service.description}
      </p>
      
      {service.features && service.features.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0F172A', marginBottom: '0.75rem' }}>
            Features:
          </h4>
          <ul style={{ fontSize: '0.875rem', color: '#475569', listStyleType: 'disc', listStylePosition: 'inside', margin: 0, padding: 0 }}>
            {service.features.map((feature, index) => (
              <li key={index} style={{ marginBottom: '0.25rem' }}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <button
          onClick={onEdit}
          className="btn-secondary"
          style={{ flex: 1, fontSize: '0.875rem', padding: '0.625rem 1rem' }}
        >
          <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button
          onClick={onDelete}
          className="btn-danger"
          style={{ flex: 1, fontSize: '0.875rem', padding: '0.625rem 1rem' }}
        >
          <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
      
      <div style={{ 
        fontSize: '0.75rem', 
        color: '#94A3B8',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--gray-100)'
      }}>
        Created: {new Date(service.created_at).toLocaleDateString()}
        {service.updated_at !== service.created_at && (
          <span> • Updated: {new Date(service.updated_at).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  )
}

export default ServicesManager