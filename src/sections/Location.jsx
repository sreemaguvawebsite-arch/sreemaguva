import { siteInfo } from '../data/siteData'
import { openWhatsApp, generateGeneralEnquiryMessage } from '../utils/whatsapp'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import './Location.css'

const Location = () => {
  const handleWhatsApp = () => {
    const message = generateGeneralEnquiryMessage()
    openWhatsApp(siteInfo.contact.whatsapp, message)
  }

  const handleDirections = () => {
    const address = encodeURIComponent(siteInfo.contact.address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
  }

  return (
    <section id="contact" className="location section">
      <div className="container">
        <SectionTitle 
          small="VISIT US"
          title="Find Sree Maguva"
          subtitle="We're located in the heart of Madhurawada, Visakhapatnam"
        />

        <div className="location-grid">
          {/* Map */}
          <div className="location-map">
            <iframe
              src={siteInfo.contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sree Maguva Location"
            />
          </div>

          {/* Contact Info */}
          <div className="location-info">
            <div className="info-item">
              <div className="info-icon-wrap">
                <span className="info-icon">📍</span>
              </div>
              <div className="info-content">
                <h3>Address</h3>
                <p>{siteInfo.contact.address}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrap">
                <span className="info-icon">📱</span>
              </div>
              <div className="info-content">
                <h3>Phone / WhatsApp</h3>
                <p>
                  <a href={`tel:+91${siteInfo.contact.phone}`}>
                    +91 {siteInfo.contact.phone}
                  </a>
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrap">
                <span className="info-icon">📧</span>
              </div>
              <div className="info-content">
                <h3>Email</h3>
                <p>
                  <a href={`mailto:${siteInfo.contact.email}`}>
                    {siteInfo.contact.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon-wrap">
                <span className="info-icon">💼</span>
              </div>
              <div className="info-content">
                <h3>Category</h3>
                <p>{siteInfo.category}</p>
              </div>
            </div>

            <div className="location-actions">
              <Button 
                variant="primary" 
                size="medium"
                onClick={handleDirections}
                className="location-btn"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                }
              >
                Get Directions
              </Button>

              <Button 
                variant="secondary" 
                size="medium"
                onClick={handleWhatsApp}
                className="location-btn"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.533 5.854L0 24l6.335-1.521A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.666-.523-5.176-1.432l-.371-.22-3.762.903.957-3.667-.242-.387A9.97 9.97 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                }
              >
                Chat With Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Location
