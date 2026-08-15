-- Index Verification Script
-- Run this in your Supabase SQL Editor to verify all indexes are created

-- Check if all customer_reviews indexes exist
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'customer_reviews'
ORDER BY indexname;

-- Expected indexes:
-- 1. customer_reviews_pkey (PRIMARY KEY)
-- 2. idx_customer_reviews_approved_at
-- 3. idx_customer_reviews_approved_category
-- 4. idx_customer_reviews_created_at  
-- 5. idx_customer_reviews_featured
-- 6. idx_customer_reviews_featured_display
-- 7. idx_customer_reviews_rating
-- 8. idx_customer_reviews_service_category
-- 9. idx_customer_reviews_stats
-- 10. idx_customer_reviews_status
-- 11. idx_customer_reviews_status_created_at
-- 12. idx_customer_reviews_status_rating
-- 13. unique_email_per_day (EXCLUDE constraint index)

-- Check index usage statistics (run after some queries)
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as "Times Used",
    idx_tup_read as "Tuples Read",
    idx_tup_fetch as "Tuples Fetched"
FROM pg_stat_user_indexes 
WHERE tablename = 'customer_reviews'
ORDER BY idx_scan DESC;

-- Check index sizes
SELECT 
    indexname,
    pg_size_pretty(pg_relation_size(indexrelid)) as "Index Size"
FROM pg_stat_user_indexes 
WHERE tablename = 'customer_reviews'
ORDER BY pg_relation_size(indexrelid) DESC;