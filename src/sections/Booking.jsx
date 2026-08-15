import { useState } from 'react'
import { siteInfo } from '../data/siteData'
import { openWhatsApp, generateBookingMessage } from '../utils/whatsapp'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import './Booking.css'

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number'
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service'
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date'
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      const message = generateBookingMessage(formData)
      openWhatsApp(siteInfo.contact.whatsapp, message)

      // Reset form
      setFormData({
        name: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      })
    }
  }

  return (
    <section id="booking" className="booking section">
      <div className="container">
        <SectionTitle 
          small="BOOK YOUR APPOINTMENT"
          title="Book Your Beauty Experience"
          subtitle="Ready to look and feel your best? Book your appointment today"
        />

        <div className="booking-grid">
          {/* Form */}
          <div className="booking-form-wrap">
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your name"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="service">Select Service *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={errors.service ? 'error' : ''}
                >
                  <option value="">Choose a service</option>
                  <option value="Basic Beauty Package">Basic Beauty Package</option>
                  <option value="Glow Package">Glow Package</option>
                  <option value="Bridal Package">Bridal / Premium Package</option>
                  <option value="Hair Styling">Hair Styling</option>
                  <option value="Facial">Facial</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Other">Other</option>
                </select>
                {errors.service && <span className="error-text">{errors.service}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Preferred Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={errors.date ? 'error' : ''}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.date && <span className="error-text">{errors.date}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="time">Preferred Time *</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={errors.time ? 'error' : ''}
                  />
                  {errors.time && <span className="error-text">{errors.time}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any special requests or questions?"
                />
              </div>

              <Button 
                type="submit"
                variant="primary" 
                size="large"
                className="submit-btn"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.533 5.854L0 24l6.335-1.521A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.666-.523-5.176-1.432l-.371-.22-3.762.903.957-3.667-.242-.387A9.97 9.97 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                }
              >
                Book Appointment on WhatsApp
              </Button>
            </form>
          </div>

          {/* Info */}
          <div className="booking-info">
            <div className="info-card">
              <h3>Why Book With Us?</h3>
              <ul>
                <li>
                  <span className="info-icon">✨</span>
                  <div>
                    <strong>Professional Service</strong>
                    <p>Experienced beauty experts</p>
                  </div>
                </li>
                <li>
                  <span className="info-icon">⏰</span>
                  <div>
                    <strong>Flexible Timing</strong>
                    <p>Choose your convenient slot</p>
                  </div>
                </li>
                <li>
                  <span className="info-icon">💝</span>
                  <div>
                    <strong>Personalized Care</strong>
                    <p>Tailored to your needs</p>
                  </div>
                </li>
                <li>
                  <span className="info-icon">🏆</span>
                  <div>
                    <strong>Premium Products</strong>
                    <p>Quality beauty brands</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="info-card contact-card">
              <h3>Contact Us</h3>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div>
                  <strong>Phone / WhatsApp</strong>
                  <p>+91 {siteInfo.contact.phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>{siteInfo.contact.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Booking
