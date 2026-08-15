import './SectionTitle.css'

const SectionTitle = ({ small, title, subtitle, center = true }) => {
  return (
    <div className={`section-title ${center ? 'center' : ''}`}>
      {small && <span className="section-small">{small}</span>}
      <h2 className="section-heading">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}

export default SectionTitle
