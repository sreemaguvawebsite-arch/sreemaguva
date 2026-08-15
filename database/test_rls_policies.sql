-- Test script to verify RLS policies for customer_reviews table
-- Run this in Supabase SQL Editor to test RLS functionality

-- Test 1: Insert sample data (should work - public can insert)
INSERT INTO customer_reviews (
    customer_name,
    email, 
    rating,
    review_text,
    service_category,
    status
) VALUES 
('Test Customer 1', 'test1@example.com', 5, 'Amazing service! Very professional and skilled.', 'bridal', 'pending'),
('Anonymous User', NULL, 4, 'Great experience with the makeup artist. Highly recommend!', 'makeup', 'pending'),
('Test Customer 2', 'test2@example.com', 5, 'Excellent hair styling service. Will definitely come back!', 'hair', 'approved'),
('Featured Review', 'test3@example.com', 5, 'Outstanding bridal makeup service. Made my wedding day perfect!', 'bridal', 'approved');

-- Update one review to be featured (admin action simulation)
UPDATE customer_reviews 
SET is_featured = true, approved_at = NOW(), approved_by = 'jaanu@gmail.com'
WHERE review_text LIKE '%Outstanding bridal makeup%';

-- Test 2: Check what public can see (should only see approved reviews)
SELECT 'Public can see these reviews:' as test_description;
SELECT id, customer_name, rating, review_text, service_category, status, is_featured, created_at
FROM customer_reviews;

-- Test 3: Check RLS policy constraints
-- This query will help verify the policies work correctly:

-- Count total reviews by status 
SELECT status, COUNT(*) as count
FROM customer_reviews
GROUP BY status;

-- Check what would be visible to public (only approved)
SELECT 'Reviews visible to public:' as info;
SELECT customer_name, rating, review_text, service_category, is_featured
FROM customer_reviews
WHERE status = 'approved'
ORDER BY created_at DESC;

-- Test 4: Verify admin would see all reviews
-- (This would need to be tested by authenticating as jaanu@gmail.com)
SELECT 'All reviews (admin view):' as info;
SELECT customer_name, email, rating, review_text, status, is_featured, created_at
FROM customer_reviews
ORDER BY created_at DESC;

-- Test 5: Verify indexes exist and are being used
SELECT 'Existing indexes on customer_reviews:' as info;
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'customer_reviews';

-- Test 6: Review statistics view test
SELECT 'Review statistics:' as info;
SELECT * FROM review_statistics;

-- Clean up test data (optional - comment out if you want to keep test data)
-- DELETE FROM customer_reviews WHERE email LIKE 'test%@example.com' OR customer_name = 'Anonymous User';