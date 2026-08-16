import { useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import './Gallery.css'

const Gallery = () => {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })

  // Static gallery images that will always display
  const galleryImages = [
    { 
      id: 1, 
      category: 'Bridal', 
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', 
      alt: 'Beautiful bridal makeup transformation' 
    },
    { 
      id: 2, 
      category: 'Hair', 
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', 
      alt: 'Hair styling and coloring showcase' 
    },
    { 
      id: 3, 
      category: 'Makeup', 
      url: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&q=80', 
      alt: 'Professional makeup artistry' 
    },
    { 
      id: 4, 
      category: 'Skin Care', 
      url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80', 
      alt: 'Luxurious facial treatment' 
    },
    { 
      id: 5, 
      category: 'Hair', 
      url: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80', 
      alt: 'Hair spa and deep conditioning' 
    },
    { 
      id: 6, 
      category: 'Bridal', 
      url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80', 
      alt: 'Elegant bridal hairstyling' 
    },
    { 
      id: 7, 
      category: 'Makeup', 
      url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80', 
      alt: 'Stunning eye makeup design' 
    },
    { 
      id: 8, 
      category: 'Nails', 
      url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', 
      alt: 'Beautiful manicure and nail art' 
    },
    { 
      id: 9, 
      category: 'Skin Care', 
      url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80', 
      alt: 'Rejuvenating facial skin treatment' 
    },
    { 
      id: 10, 
      category: 'Hair', 
      url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80', 
      alt: 'Professional hair color treatment' 
    },
    { 
      id: 11, 
      category: 'Bridal', 
      url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', 
      alt: 'Bridal beauty perfection' 
    },
    { 
      id: 12, 
      category: 'Makeup', 
      url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80', 
      alt: 'Glamorous makeup look' 
    }
  ]

  const categories = ['All', 'Bridal', 'Hair', 'Makeup', 'Skin Care', 'Nails']

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
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div 
              className="gallery-item" 
              key={image.id}
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image.url} 
                alt={image.alt}
                loading="lazy"
                onError={(e) => {
                  e.target.style.backgroundColor = '#f0f0f0'
                  e.target.alt = 'Image not available'
                }}
              />
              <div className="gallery-overlay">
                <span className="gallery-icon">🔍</span>
                <span className="gallery-category">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
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
