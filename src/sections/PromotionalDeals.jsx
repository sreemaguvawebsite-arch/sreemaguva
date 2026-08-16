import { smoothScroll } from '../utils/animations'
import './PromotionalDeals.css'

const PromotionalDeals = () => {
  const handleShopDeals = (e) => {
    e.preventDefault()
    smoothScroll('#services')
  }

  return (
    <section className="promotional-deals">
      <div className="container">
        <div className="deals-content">
          <h2 className="deals-title">
            We have exclusive deals for everyone! 💗
          </h2>
          
          <p className="deals-description">
            Brighten your glow with Sree Maguva's best and exclusive deals. We gotchu! 🤩
          </p>

          <button 
            className="deals-button"
            onClick={handleShopDeals}
          >
            SHOP ALL DEALS
          </button>
        </div>
      </div>
    </section>
  )
}

export default PromotionalDeals
