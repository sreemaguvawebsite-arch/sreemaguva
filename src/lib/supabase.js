import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create supabase client only if credentials are available
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database table names
export const TABLES = {
  GALLERY_ITEMS: 'gallery_items',
  ACADEMY_COURSES: 'academy_courses',
  COURSE_SCHEDULES: 'course_schedules', 
  SERVICES: 'services',
  CUSTOMER_REVIEWS: 'customer_reviews'
}

// Storage bucket names
export const BUCKETS = {
  GALLERY: 'gallery'
}