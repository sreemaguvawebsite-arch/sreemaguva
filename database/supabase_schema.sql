-- Supabase Database Schema for Sree Maguva Admin System
-- Run these commands in your Supabase SQL Editor

-- Enable Row Level Security (RLS) on all tables
-- Create necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Gallery Items Table
CREATE TABLE IF NOT EXISTS gallery_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    url TEXT NOT NULL,
    alt TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('hair', 'makeup', 'skincare', 'bridal', 'special')),
    type TEXT NOT NULL CHECK (type IN ('image', 'video')),
    file_name TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Academy Courses Table
CREATE TABLE IF NOT EXISTS academy_courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    duration TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    features TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course Schedules Table
CREATE TABLE IF NOT EXISTS course_schedules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID NOT NULL REFERENCES academy_courses(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    max_students INTEGER NOT NULL CHECK (max_students > 0),
    enrolled_count INTEGER NOT NULL DEFAULT 0 CHECK (enrolled_count >= 0),
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure enrolled count doesn't exceed max students
    CONSTRAINT check_enrollment CHECK (enrolled_count <= max_students),
    -- Ensure end date is after start date
    CONSTRAINT check_dates CHECK (end_date >= start_date)
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price_range TEXT NOT NULL,
    duration TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('hair', 'makeup', 'skincare', 'bridal', 'special', 'spa')),
    features TEXT[] NOT NULL DEFAULT '{}',
    popular BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique service names within same category
    CONSTRAINT unique_service_per_category UNIQUE (name, category)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_gallery_items_type ON gallery_items(type);
CREATE INDEX IF NOT EXISTS idx_gallery_items_created_at ON gallery_items(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_academy_courses_status ON academy_courses(status);
CREATE INDEX IF NOT EXISTS idx_academy_courses_created_at ON academy_courses(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_course_schedules_course_id ON course_schedules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_schedules_start_date ON course_schedules(start_date);
CREATE INDEX IF NOT EXISTS idx_course_schedules_status ON course_schedules(status);

CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_popular ON services(popular);
CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);
CREATE INDEX IF NOT EXISTS idx_services_created_at ON services(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
-- Note: Replace 'jaanu@gmail.com' with your actual admin email if different

-- Gallery Items Policies
CREATE POLICY "Allow public read access to gallery_items" ON gallery_items
    FOR SELECT USING (true);

CREATE POLICY "Allow admin full access to gallery_items" ON gallery_items
    FOR ALL USING (auth.jwt() ->> 'email' = 'jaanu@gmail.com');

-- Academy Courses Policies
CREATE POLICY "Allow public read access to academy_courses" ON academy_courses
    FOR SELECT USING (status = 'active');

CREATE POLICY "Allow admin full access to academy_courses" ON academy_courses
    FOR ALL USING (auth.jwt() ->> 'email' = 'jaanu@gmail.com');

-- Course Schedules Policies
CREATE POLICY "Allow public read access to course_schedules" ON course_schedules
    FOR SELECT USING (true);

CREATE POLICY "Allow admin full access to course_schedules" ON course_schedules
    FOR ALL USING (auth.jwt() ->> 'email' = 'jaanu@gmail.com');

-- Services Policies
CREATE POLICY "Allow public read access to services" ON services
    FOR SELECT USING (status = 'active');

CREATE POLICY "Allow admin full access to services" ON services
    FOR ALL USING (auth.jwt() ->> 'email' = 'jaanu@gmail.com');

-- Create Storage Bucket for Gallery
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for gallery bucket
CREATE POLICY "Allow public access to gallery bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Allow admin upload to gallery bucket" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'gallery' AND 
        auth.jwt() ->> 'email' = 'jaanu@gmail.com'
    );

CREATE POLICY "Allow admin update gallery bucket" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'gallery' AND 
        auth.jwt() ->> 'email' = 'jaanu@gmail.com'
    );

CREATE POLICY "Allow admin delete from gallery bucket" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'gallery' AND 
        auth.jwt() ->> 'email' = 'jaanu@gmail.com'
    );

-- Functions to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON gallery_items 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_academy_courses_updated_at BEFORE UPDATE ON academy_courses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_schedules_updated_at BEFORE UPDATE ON course_schedules 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
-- Sample Academy Courses
INSERT INTO academy_courses (name, description, duration, price, features, status) VALUES
('Basic Makeup Course', 'Learn fundamental makeup techniques for everyday looks', '4 weeks', 15000.00, '{"Professional kit included", "Certificate provided", "Hands-on practice", "Theory and practical sessions"}', 'active'),
('Bridal Makeup Mastery', 'Comprehensive bridal makeup course with advanced techniques', '8 weeks', 35000.00, '{"HD makeup techniques", "Bridal styling", "Business setup guidance", "Advanced product knowledge"}', 'active'),
('Hair Styling Basics', 'Learn basic to intermediate hair styling techniques', '6 weeks', 20000.00, '{"Blow drying techniques", "Curling and straightening", "Basic updos", "Hair care knowledge"}', 'active');

-- Sample Services
INSERT INTO services (name, description, price_range, duration, category, features, popular, status) VALUES
('Bridal Makeup', 'Complete bridal makeup with trial session', '₹8000-₹15000', '3-4 hours', 'bridal', '{"HD makeup", "Trial session included", "Touch-up kit", "Hair styling"}', true, 'active'),
('Party Makeup', 'Glamorous makeup for special occasions', '₹3000-₹5000', '2-3 hours', 'makeup', '{"Event-appropriate look", "Long-lasting formula", "Photo-ready finish"}', true, 'active'),
('Hair Cut & Styling', 'Professional hair cutting and styling', '₹1500-₹3000', '1-2 hours', 'hair', '{"Consultation included", "Styling tips", "Premium products"}', false, 'active'),
('Facial Treatment', 'Deep cleansing and rejuvenating facial', '₹2000-₹4000', '1.5-2 hours', 'skincare', '{"Deep cleansing", "Moisturizing mask", "Face massage", "Skin analysis"}', true, 'active');

-- Sample Gallery Items (you'll need to upload actual files to Supabase Storage)
-- These are placeholder entries - replace URLs with actual Supabase storage URLs after upload
INSERT INTO gallery_items (url, alt, category, type, file_name, file_size) VALUES
('https://placeholder-url.com/image1.jpg', 'Bridal makeup transformation', 'bridal', 'image', 'bridal_makeup_1.jpg', 2048576),
('https://placeholder-url.com/image2.jpg', 'Hair styling showcase', 'hair', 'image', 'hair_styling_1.jpg', 1536576),
('https://placeholder-url.com/image3.jpg', 'Skincare treatment before-after', 'skincare', 'image', 'skincare_treatment_1.jpg', 1824576);

-- Customer Reviews Table
CREATE TABLE IF NOT EXISTS customer_reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_name TEXT,
    email TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL CHECK (char_length(review_text) >= 10 AND char_length(review_text) <= 500),
    service_category TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by TEXT,
    
    -- Prevent spam: one review per email per day (only if email is provided)
    CONSTRAINT unique_email_per_day EXCLUDE (email, DATE(created_at) WITH =) WHERE (email IS NOT NULL)
);

-- Indexes for performance on customer_reviews
CREATE INDEX IF NOT EXISTS idx_customer_reviews_status ON customer_reviews(status);
CREATE INDEX IF NOT EXISTS idx_customer_reviews_rating ON customer_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_customer_reviews_featured ON customer_reviews(is_featured);
CREATE INDEX IF NOT EXISTS idx_customer_reviews_created_at ON customer_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customer_reviews_service_category ON customer_reviews(service_category);
CREATE INDEX IF NOT EXISTS idx_customer_reviews_approved_at ON customer_reviews(approved_at DESC);

-- Composite indexes for common query patterns
-- For admin dashboard filtering (status + created_at for moderation queue)
CREATE INDEX IF NOT EXISTS idx_customer_reviews_status_created_at ON customer_reviews(status, created_at DESC);

-- For public display queries (status + rating for filtering approved reviews by rating)
CREATE INDEX IF NOT EXISTS idx_customer_reviews_status_rating ON customer_reviews(status, rating DESC);

-- For featured reviews display (status + is_featured + created_at)
CREATE INDEX IF NOT EXISTS idx_customer_reviews_featured_display ON customer_reviews(status, is_featured, created_at DESC) 
    WHERE status = 'approved';

-- For service category filtering on approved reviews
CREATE INDEX IF NOT EXISTS idx_customer_reviews_approved_category ON customer_reviews(status, service_category, created_at DESC) 
    WHERE status = 'approved';

-- For admin statistics and reporting (status + rating combination)
CREATE INDEX IF NOT EXISTS idx_customer_reviews_stats ON customer_reviews(status, rating, is_featured) 
    WHERE status = 'approved';

-- Enable RLS on customer_reviews
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;

-- Customer Reviews Policies
CREATE POLICY "Allow public read access to approved reviews" ON customer_reviews
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Allow public insert reviews" ON customer_reviews
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin full access to reviews" ON customer_reviews
    FOR ALL USING (auth.jwt() ->> 'email' = 'jaanu@gmail.com');

-- Auto-update timestamp trigger for customer_reviews
CREATE TRIGGER update_customer_reviews_updated_at BEFORE UPDATE ON customer_reviews 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Review statistics view
CREATE OR REPLACE VIEW review_statistics AS
SELECT 
    COUNT(*) as total_reviews,
    ROUND(AVG(rating), 2) as average_rating,
    COUNT(*) FILTER (WHERE rating = 5) as five_star_count,
    COUNT(*) FILTER (WHERE rating = 4) as four_star_count,
    COUNT(*) FILTER (WHERE rating = 3) as three_star_count,
    COUNT(*) FILTER (WHERE rating = 2) as two_star_count,
    COUNT(*) FILTER (WHERE rating = 1) as one_star_count,
    COUNT(*) FILTER (WHERE is_featured = true) as featured_count
FROM customer_reviews 
WHERE status = 'approved';

-- Create admin user (you'll need to do this through Supabase Auth UI or API)
-- This is just a reminder comment - the actual user creation should be done through:
-- 1. Supabase Dashboard > Authentication > Users > Invite User
-- 2. Use email: jaanu@gmail.com
-- 3. Use password: Jaanu@2025