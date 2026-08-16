import { useState, useEffect } from 'react'
import SectionTitle from '../components/SectionTitle'
import './Gallery.css'

const Gallery = () => {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // All gallery images
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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.open) return
      
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigate('prev')
      if (e.key === 'ArrowRight') navigate('next')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightbox.open, lightbox.index])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightbox.open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [lightbox.open])

  const openLightbox = (index) => {
    setLightbox({ open: true, index })
  }

  const closeLightbox = () => {
    setLightbox({ open: false, index: 0 })
  }

  const navigate = (direction) => {
    const newIndex = direction === 'next'
      ? (lightbox.index + 1) % galleryImages.length
      : (lightbox.index - 1 + galleryImages.length) % galleryImages.length
    setLightbox({ ...lightbox, index: newIndex })
  }

  // Touch/swipe handlers for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const minSwipeDistance = 50
    
    if (distance > minSwipeDistance) {
      navigate('next')
    } else if (distance < -minSwipeDistance) {
      navigate('prev')
    }
    
    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <SectionTitle 
          small="PORTFOLIO"
          title="Our Works"
          subtitle="Explore our beautiful transformations and satisfied clients 💖"
        />

        {/* Horizontal Auto-Scrolling Carousel */}
        <div className="gallery-carousel-wrapper">
          <div className="gallery-carousel">
            {/* Duplicate images for seamless infinite scroll */}
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <div 
                className="gallery-carousel-item" 
                key={`${image.id}-${index}`}
                onClick={() => openLightbox(index % galleryImages.length)}
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
                <div className="gallery-carousel-overlay">
                  <span className="gallery-icon">🔍</span>
                  <span className="gallery-category">{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div 
          className="lightbox" 
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
              src={galleryImages[lightbox.index].url} 
              alt={galleryImages[lightbox.index].alt}
            />
            <p className="lightbox-caption">
              {galleryImages[lightbox.index].alt}
            </p>
            <p className="lightbox-counter">
              {lightbox.index + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
