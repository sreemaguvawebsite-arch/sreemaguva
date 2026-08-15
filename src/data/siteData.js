// Site Configuration Data - Easy to edit

export const siteInfo = {
  brandName: "Sree Maguva",
  tagline: "Adding Care to Your Beauty",
  category: "Beauty, Cosmetic & Personal Care",
  secondaryTagline: "Modern Beauty & Aesthetic Academy",
  established: 2006,
  totalClients: 1000,
  yearsExperience: 20,
  contact: {
    phone: "9059955529",
    email: "SreeMaguva@gmail.com",
    address: "D.No 1-159, Upstairs of Srimantha Medicals, Beside KFC, Midhilapuri VUDA Colony Road, Madhurawada, Visakhapatnam – 530048",
    whatsapp: "919059955529", // Country code + number
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.8!2d83.3!3d17.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ4JzAwLjAiTiA4M8KwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
  }
}

export const services = [
  {
    id: 1,
    name: "BASIC BEAUTY PACKAGE",
    features: ["Facial", "Clean-up", "Threading", "Hair care"],
    price: "₹999",
    popular: false
  },
  {
    id: 2,
    name: "GLOW PACKAGE",
    features: ["Premium Facial", "Clean-up", "Threading", "Hair Spa", "Hair Styling"],
    price: "₹1,999",
    popular: true
  },
  {
    id: 3,
    name: "BRIDAL / PREMIUM PACKAGE",
    features: ["Bridal Makeup", "Hair Styling", "Skin Preparation", "Draping", "Personalized Beauty Consultation"],
    price: "₹4,999+",
    popular: false,
    enquiry: true
  }
]

export const serviceCategories = [
  { id: 1, name: "Hair", icon: "💇‍♀️" },
  { id: 2, name: "Skin Care", icon: "✨" },
  { id: 3, name: "Facial", icon: "🌸" },
  { id: 4, name: "Makeup", icon: "💄" },
  { id: 5, name: "Threading", icon: "🎀" },
  { id: 6, name: "Bridal Makeup", icon: "👰" },
  { id: 7, name: "Hair Styling", icon: "💅" },
  { id: 8, name: "Beauty Treatments", icon: "🌺" }
]

export const academyCourses = [
  { id: 1, name: "Basic Beauty Course", duration: "3 Months" },
  { id: 2, name: "Advanced Beauty Course", duration: "6 Months" },
  { id: 3, name: "Makeup Training", duration: "2 Months" },
  { id: 4, name: "Hair Styling", duration: "2 Months" },
  { id: 5, name: "Skin Care", duration: "1 Month" },
  { id: 6, name: "Bridal Makeup", duration: "1 Month" }
]

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    feedback: "Absolutely loved the service. The team was very professional and made me feel so comfortable. Highly recommend Sree Maguva!",
    avatar: "PS"
  },
  {
    id: 2,
    name: "Anjali Reddy",
    rating: 5,
    feedback: "Beautiful experience from start to finish. The bridal makeup was stunning and lasted all day. Thank you so much!",
    avatar: "AR"
  },
  {
    id: 3,
    name: "Kavya Rao",
    rating: 5,
    feedback: "The service and attention to detail were amazing. I will definitely be coming back for more treatments.",
    avatar: "KR"
  },
  {
    id: 4,
    name: "Sneha Patel",
    rating: 5,
    feedback: "Best beauty parlour in Visakhapatnam! The staff is friendly, the ambience is great, and the results are always perfect.",
    avatar: "SP"
  }
]

export const galleryImages = [
  // Placeholder images - replace with actual photos
  { id: 1, category: "Makeup", url: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&q=80", alt: "Professional makeup" },
  { id: 2, category: "Bridal", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Bridal makeup" },
  { id: 3, category: "Hair", url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80", alt: "Hair styling" },
  { id: 4, category: "Skin Care", url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80", alt: "Facial treatment" },
  { id: 5, category: "Makeup", url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80", alt: "Eye makeup" },
  { id: 6, category: "Salon", url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80", alt: "Salon interior" },
  { id: 7, category: "Bridal", url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80", alt: "Bridal look" },
  { id: 8, category: "Hair", url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80", alt: "Hair care" },
  { id: 9, category: "Academy", url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80", alt: "Beauty training" }
]

export const stats = [
  { id: 1, label: "Established", value: 2006, suffix: "" },
  { id: 2, label: "Happy Clients", value: 1000, suffix: "+" },
  { id: 3, label: "Years Experience", value: 20, suffix: "+" },
  { id: 4, label: "Personalized Care", value: 100, suffix: "%" }
]

export const navLinks = [
  { id: 1, name: "Home", href: "#home" },
  { id: 2, name: "About", href: "#about" },
  { id: 3, name: "Services", href: "#services" },
  { id: 4, name: "Academy", href: "#academy" },
  { id: 5, name: "Our Work", href: "#gallery" },
  { id: 6, name: "Reviews", href: "#testimonials" },
  { id: 7, name: "Contact", href: "#contact" }
]
