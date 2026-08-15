import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { supabase, TABLES, BUCKETS } from '../../lib/supabase'
import './admin.css'

const GalleryManager = () => {
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['hair', 'makeup', 'skincare', 'bridal', 'special']

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.GALLERY_ITEMS)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setGalleryItems(data || [])
    } catch (error) {
      console.error('Error fetching gallery items:', error)
      alert('Error fetching gallery items: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const uploadFile = async (file, metadata) => {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKETS.GALLERY)
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(BUCKETS.GALLERY)
        .getPublicUrl(fileName)

      // Save metadata to database
      const galleryItem = {
        url: urlData.publicUrl,
        alt: metadata.alt,
        category: metadata.category,
        type: metadata.type,
        file_name: file.name,
        file_size: file.size,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data: dbData, error: dbError } = await supabase
        .from(TABLES.GALLERY_ITEMS)
        .insert([galleryItem])
        .select()

      if (dbError) {
        // Cleanup uploaded file on database error
        await supabase.storage
          .from(BUCKETS.GALLERY)
          .remove([fileName])
        throw dbError
      }

      return dbData[0]
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return

    setUploading(true)
    try {
      const uploads = acceptedFiles.map(async (file) => {
        const fileType = file.type.startsWith('image/') ? 'image' : 'video'
        const metadata = {
          alt: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          category: 'hair', // Default category
          type: fileType
        }
        return uploadFile(file, metadata)
      })

      const uploadedItems = await Promise.all(uploads)
      setGalleryItems(prev => [...uploadedItems, ...prev])
      alert(`Successfully uploaded ${uploadedItems.length} files`)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed: ' + error.message)
    } finally {
      setUploading(false)
    }
  }, [])

  const deleteItem = async (item) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      // Extract filename from URL
      const fileName = item.url.split('/').pop()

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from(BUCKETS.GALLERY)
        .remove([fileName])

      if (storageError) throw storageError

      // Delete from database
      const { error: dbError } = await supabase
        .from(TABLES.GALLERY_ITEMS)
        .delete()
        .eq('id', item.id)

      if (dbError) throw dbError

      setGalleryItems(prev => prev.filter(i => i.id !== item.id))
      alert('Item deleted successfully')
    } catch (error) {
      console.error('Delete error:', error)
      alert('Delete failed: ' + error.message)
    }
  }

  const updateItem = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.GALLERY_ITEMS)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (error) throw error

      setGalleryItems(prev => prev.map(item => 
        item.id === id ? data[0] : item
      ))
      alert('Item updated successfully')
    } catch (error) {
      console.error('Update error:', error)
      alert('Update failed: ' + error.message)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv']
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    disabled: uploading
  })

  const filteredItems = galleryItems.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter
    const matchesSearch = item.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
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
                Gallery Manager
              </h1>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                Manage images and videos ({galleryItems.length} items)
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
        {/* Upload Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="section-header">Upload Media</h2>
          <div
            {...getRootProps()}
            className={`upload-zone ${
              isDragActive ? 'dragging' : ''
            } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div className="stat-icon stat-icon-purple" style={{ width: '72px', height: '72px' }}>
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#0F172A',
                  marginBottom: '0.5rem'
                }}>
                  {uploading ? 'Uploading...' : 'Drop files here or click to browse'}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0 }}>
                  Images and videos up to 100MB
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="section-header">Filter & Search</h2>
          <div className="admin-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Search gallery items..."
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

        {/* Gallery Grid */}
        <div>
          <h2 className="section-header">Gallery Items</h2>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div className="spinner"></div>
                <p style={{ fontSize: '0.9375rem', color: '#64748B', fontWeight: '500' }}>
                  Loading gallery items...
                </p>
              </div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="admin-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div className="stat-icon stat-icon-purple" style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem' }}>
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#0F172A',
                marginBottom: '0.5rem'
              }}>
                No items found
              </h3>
              <p style={{ fontSize: '0.9375rem', color: '#64748B' }}>
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {filteredItems.map((item, index) => (
                <div key={item.id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <GalleryItemCard
                    item={item}
                    categories={categories}
                    onDelete={() => deleteItem(item)}
                    onUpdate={(updates) => updateItem(item.id, updates)}
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

const GalleryItemCard = ({ item, categories, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    alt: item.alt,
    category: item.category
  })

  const handleSave = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  return (
    <div className="admin-card">
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        {item.type === 'image' ? (
          <img
            src={item.url}
            alt={item.alt}
            style={{ 
              width: '100%', 
              height: '200px', 
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        ) : (
          <video
            src={item.url}
            style={{ 
              width: '100%', 
              height: '200px', 
              objectFit: 'cover',
              borderRadius: '12px'
            }}
            controls
          />
        )}
        <div style={{ 
          position: 'absolute', 
          top: '0.75rem', 
          right: '0.75rem'
        }}>
          <span className={`badge ${item.type === 'image' ? 'badge-info' : 'badge-gold'}`}>
            {item.type}
          </span>
        </div>
      </div>
      
      {isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            value={editData.alt}
            onChange={(e) => setEditData(prev => ({ ...prev, alt: e.target.value }))}
            className="admin-input"
            placeholder="Alt text"
          />
          <select
            value={editData.category}
            onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
            className="admin-select"
          >
            {categories.map(category => (
              <option key={category} value={category} style={{ textTransform: 'capitalize' }}>
                {category}
              </option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleSave}
              className="btn-primary"
              style={{ flex: 1, fontSize: '0.875rem', padding: '0.625rem 1rem' }}
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn-secondary"
              style={{ flex: 1, fontSize: '0.875rem', padding: '0.625rem 1rem' }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.125rem', 
              fontWeight: '600', 
              color: '#0F172A',
              marginBottom: '0.25rem',
              wordWrap: 'break-word'
            }}>
              {item.alt}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-gray" style={{ textTransform: 'capitalize' }}>
                {item.category}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
              {(item.file_size / 1024 / 1024).toFixed(1)} MB
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setIsEditing(true)}
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
        </div>
      )}
    </div>
  )
}

export default GalleryManager