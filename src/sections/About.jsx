import { useEffect, useRef, useState } from 'react'
import { siteInfo, stats } from '../data/siteData'
import { observeElement, animateCounter } from '../utils/animations'
import SectionTitle from '../components/SectionTitle'
import './About.css'

const About = () => {
  const statsRef = useRef(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const statsSection = statsRef.current
    if (!statsSection) return

    const observer = observeElement(statsSection, () => {
      if (!animated) {
        setAnimated(true)
        const statElements = statsSection.querySelectorAll('.stat-value')
        
        statElements.forEach((element, index) => {
          const target = stats[index].value
          const suffix = stats[index].suffix
          animateCounter(element, target, 2000, suffix)
        })
      }
    })

    return () => observer.disconnect()
  }, [animated])

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-grid">
          {/* Image */}
          <div className="about-image-wrap">
            <div className="about-image">
              <img 
                src="/logo.jpg" 
                alt="Sree Maguva Beauty Salon Logo"
              />
              <div className="about-image-accent"></div>
              
              {/* Experience Badge */}
              <div className="experience-badge">
                <div className="badge-content">
                  <span className="badge-number">20+</span>
                  <span className="badge-text">Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <SectionTitle 
              small="ABOUT SREE MAGUVA"
              title="Beauty care with experience, passion & personal attention"
              center={false}
            />

            <p className="about-text">
              {siteInfo.brandName} has been creating beautiful experiences since {siteInfo.established}. 
              With years of experience in beauty and personal care, we focus on making every 
              client feel confident, comfortable and cared for.
            </p>

            <ul className="about-features">
              <li>
                <span className="feature-icon">✨</span>
                <span>Established in {siteInfo.established}</span>
              </li>
              <li>
                <span className="feature-icon">💝</span>
                <span>{siteInfo.totalClients}+ clients served</span>
              </li>
              <li>
                <span className="feature-icon">🎯</span>
                <span>Professional beauty services</span>
              </li>
              <li>
                <span className="feature-icon">🌸</span>
                <span>Personalized care</span>
              </li>
              <li>
                <span className="feature-icon">🏆</span>
                <span>Modern beauty & aesthetic expertise</span>
              </li>
            </ul>

            {/* Stats */}
            <div className="about-stats" ref={statsRef}>
              {stats.map(stat => (
                <div className="stat-item" key={stat.id}>
                  <div className="stat-value" data-target={stat.value}>
                    {stat.value === 100 ? '100%' : '0'}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
