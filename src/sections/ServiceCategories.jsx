import { useNavigate } from 'react-router-dom'
import './ServiceCategories.css'

const ServiceCategories = () => {
  const navigate = useNavigate()

  // Static categories that will always display
  const categories = [
    { id: 1, name: 'Facial', slug: 'facial', image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80' },
    { id: 2, name: 'Clean Up', slug: 'clean-up', image_url: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=400&q=80' },
    { id: 3, name: 'Bleach', slug: 'bleach', image_url: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&q=80' },
    { id: 4, name: 'De-Tan', slug: 'de-tan', image_url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80' },
    { id: 5, name: 'Waxing', slug: 'waxing', image_url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=80' },
    { id: 6, name: 'Mani & Pedi', slug: 'mani-pedi', image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80' },
    { id: 7, name: 'Hair Care', slug: 'hair-care', image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80' },
    { id: 8, name: 'Massage', slug: 'massage', image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80' },
  ]

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`)
  }

  return (
    <section className="service-categories">
      <div className="container">
        <h2 className="categories-title">
          What are you looking for, Beauty? 👀
        </h2>

        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <div className="category-image-wrapper">
                <img 
                  src={category.image_url} 
                  alt={category.name}
                  className="category-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.backgroundColor = '#f0f0f0'
                    e.target.alt = 'Image not available'
                  }}
                />
              </div>
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceCategories
