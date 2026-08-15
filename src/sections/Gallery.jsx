import { useState, useEffect } from 'react'
import { supabase, TABLES } from '../lib/supabase'
import SectionTitle from '../components/SectionTitle'
import './Gallery.css'

const Gallery = () => {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  const fetchGalleryImages = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.GALLERY_ITEMS)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform data to match expected format
      const formattedImages = (data || []).map(item => ({
        id: item.id,
        url: item.url,
        alt: item.alt,
        category: item.category
      }))

      setGalleryImages(formattedImages)
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', ...new Set(galleryImages.map(img => img.category))]

  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter)

  const openLightbox = (index) => {
    setLightbox({ open: true, index })
  }

  const closeLightbox = () => {
    setLightbox({ open: false, index: 0 })
  }

  const navigate = (direction) => {
    const newIndex = direction === 'next'
      ? (lightbox.index + 1) % filteredImages.length
      : (lightbox.index - 1 + filteredImages.length) % filteredImages.length
    setLightbox({ ...lightbox, index: newIndex })
  }

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <SectionTitle 
          small="OUR WORK"
          title="Beauty That Speaks for Itself"
          subtitle="Explore our portfolio of transformations and satisfied clients"
        />

        {/* Filter */}
        <div className="gallery-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div className="spinner" style={{ display: 'inline-block' }}></div>
            <p style={{ marginTop: '1rem', color: '#64748b' }}>Loading gallery...</p>
          </div>
        ) : galleryImages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ color: '#64748b' }}>No images in the gallery yet.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <div 
                className="gallery-item" 
                key={image.id}
                onClick={() => openLightbox(index)}
              >
                <img src={image.url} alt={image.alt} />
                <div className="gallery-overlay">
                  <span className="gallery-icon">🔍</span>
                  <span className="gallery-category">{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div className="lightbox" onClick={closeLightbox}>
          <button 
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>

          <button 
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
            aria-label="Previous"
          >
            ‹
          </button>

          <button 
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); navigate('next'); }}
            aria-label="Next"
          >
            ›
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={filteredImages[lightbox.index].url} 
              alt={filteredImages[lightbox.index].alt}
            />
            <p className="lightbox-caption">
              {filteredImages[lightbox.index].alt}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
