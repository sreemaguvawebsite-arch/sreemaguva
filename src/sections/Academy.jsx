import { academyCourses, siteInfo } from '../data/siteData'
import { openWhatsApp, generateAcademyEnquiryMessage } from '../utils/whatsapp'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import './Academy.css'

const Academy = () => {
  const handleEnquiry = () => {
    const message = generateAcademyEnquiryMessage()
    openWhatsApp(siteInfo.contact.whatsapp, message)
  }

  return (
    <section id="academy" className="academy section">
      <div className="container">
        <SectionTitle 
          small="SREE MAGUVA BEAUTY & AESTHETIC ACADEMY"
          title="Turn Your Passion for Beauty Into a Profession"
          subtitle="Learn professional beauty techniques with practical guidance and industry-focused training"
        />

        <div className="academy-content">
          <div className="academy-image">
            <img 
              src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80" 
              alt="Beauty Academy Training"
            />
          </div>

          <div className="academy-info">
            <h3 className="academy-subtitle">Why Choose Our Academy?</h3>
            
            <ul className="academy-features">
              <li>
                <span className="feature-icon">🎓</span>
                <div>
                  <strong>Professional Certification</strong>
                  <p>Recognized certification upon course completion</p>
                </div>
              </li>
              <li>
                <span className="feature-icon">👩‍🏫</span>
                <div>
                  <strong>Expert Trainers</strong>
                  <p>Learn from experienced beauty professionals</p>
                </div>
              </li>
              <li>
                <span className="feature-icon">💼</span>
                <div>
                  <strong>Practical Training</strong>
                  <p>Hands-on experience with real clients</p>
                </div>
              </li>
              <li>
                <span className="feature-icon">⭐</span>
                <div>
                  <strong>Career Guidance</strong>
                  <p>Support for starting your beauty career</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Courses */}
        <div className="courses-grid">
          {academyCourses.map(course => (
            <div className="course-card" key={course.id}>
              <div className="course-icon">🎓</div>
              <h4 className="course-name">{course.name}</h4>
              <p className="course-duration">Duration: {course.duration}</p>
            </div>
          ))}
        </div>

        <div className="academy-cta">
          <p className="academy-cta-text">
            Join our academy and start your beauty career today
          </p>
          <div className="academy-buttons">
            <Button 
              variant="primary" 
              size="large"
              onClick={handleEnquiry}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.533 5.854L0 24l6.335-1.521A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.666-.523-5.176-1.432l-.371-.22-3.762.903.957-3.667-.242-.387A9.97 9.97 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              }
            >
              Enquire on WhatsApp
            </Button>
            <Button 
              variant="secondary" 
              size="large"
              onClick={handleEnquiry}
            >
              Join Academy
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Academy
