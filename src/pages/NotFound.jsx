import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import './NotFound.css'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-icon">404</div>
          <h1>Page Not Found</h1>
          <p className="not-found-message">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-actions">
            <Button 
              variant="primary" 
              size="large"
              onClick={() => navigate('/')}
            >
              Go to Homepage
            </Button>
            <Button 
              variant="outline" 
              size="large"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
