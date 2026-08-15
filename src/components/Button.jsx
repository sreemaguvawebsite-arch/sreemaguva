import './Button.css'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  href, 
  className = '',
  icon,
  ...props 
}) => {
  const classes = `btn btn-${variant} btn-${size} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...props}>
        {children}
        {icon && <span className="btn-icon">{icon}</span>}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
      {icon && <span className="btn-icon">{icon}</span>}
    </button>
  )
}

export default Button
