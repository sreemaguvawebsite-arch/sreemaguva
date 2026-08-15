import { useState } from 'react'
import { testimonials } from '../data/siteData'
import SectionTitle from '../components/SectionTitle'
import './Testimonials.css'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + testimonials.length) % testimonials.length
    )
  }

  const goTo = (index) => {
    setCurrentIndex(index)
  }

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <SectionTitle 
          small="WHAT OUR CLIENTS SAY"
          title="Real experiences from our beautiful clients"
          subtitle="Don't just take our word for it — hear from those who've experienced our services"
        />

        <div className="testimonials-carousel">
          <button 
            className="carousel-nav carousel-prev"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          <div className="testimonials-wrapper">
            <div 
              className="testimonials-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div className="testimonial-card" key={testimonial.id}>
                  <div className="testimonial-avatar">
                    {testimonial.avatar}
                  </div>

                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>

                  <p className="testimonial-feedback">
                    "{testimonial.feedback}"
                  </p>

                  <div className="testimonial-author">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-label">Verified Client</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-nav carousel-next"
            onClick={next}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
