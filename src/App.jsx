import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import IntroSplash from './components/IntroSplash'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SocialFloatingButtons from './components/SocialFloatingButtons'
import ScrollToTop from './components/ScrollToTop'
import Hero from './sections/Hero'
import PromotionalDeals from './sections/PromotionalDeals'
import ServiceCategories from './sections/ServiceCategories'
import DreamDeals from './sections/DreamDeals'
import About from './sections/About'
import Academy from './sections/Academy'
import Gallery from './sections/Gallery'
import CustomerReviews from './sections/CustomerReviews'
import Booking from './sections/Booking'
import Location from './sections/Location'
import ServiceDetail from './pages/ServiceDetail'
import ServiceCategoryPage from './pages/ServiceCategoryPage'
import NotFound from './pages/NotFound'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import GalleryManager from './components/admin/GalleryManager'
import AcademyManager from './components/admin/AcademyManager'
import ServicesManager from './components/admin/ServicesManager'
import ReviewManager from './components/admin/ReviewManager'
import ProtectedRoute from './components/admin/ProtectedRoute'
import './App.css'

// Home Page Component
const HomePage = () => (
  <main>
    <Hero />
    <PromotionalDeals />
    <ServiceCategories />
    <DreamDeals />
    <About />
    <Academy />
    <Gallery />
    <CustomerReviews />
    <Booking />
    <Location />
  </main>
)

function App() {
  const [showIntro, setShowIntro] = useState(true)

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  return (
    <AuthProvider>
      {showIntro && <IntroSplash onComplete={handleIntroComplete} />}
      <Router>
        <ScrollToTop />
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/category/:categoryName" element={<ServiceCategoryPage />} />
                    <Route path="/service/:serviceId" element={<ServiceDetail />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                  <SocialFloatingButtons />
                </>
              }
            />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <ProtectedRoute>
                  <GalleryManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/academy"
              element={
                <ProtectedRoute>
                  <AcademyManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services"
              element={
                <ProtectedRoute>
                  <ServicesManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute>
                  <ReviewManager />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
