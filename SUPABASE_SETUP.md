# Supabase Admin System Setup Guide

## Complete Backend Implementation Guide

This guide will help you set up the complete Supabase backend for your admin system.

## Prerequisites

- Supabase account (sign up at https://supabase.com)
- Your API keys ready

---

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in the details:
   - **Project Name**: sreemaguva-admin
   - **Database Password**: Create a strong password (save it securely)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for setup to complete

---

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: A long string starting with `eyJ...`

3. Update your `.env` file:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_EMAIL=jaanu@gmail.com
```

---

## Step 3: Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents from `database/supabase_schema.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the script

This will create:
- ✅ 4 database tables (gallery_items, academy_courses, course_schedules, services)
- ✅ All necessary indexes
- ✅ Row-level security policies
- ✅ Storage bucket for gallery files
- ✅ Sample data (optional)

---

## Step 4: Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click "Add User" → "Create New User"
3. Enter:
   - **Email**: `jaanu@gmail.com`
   - **Password**: `Jaanu@2025`
   - **Auto Confirm User**: Check this box
4. Click "Create User"

---

## Step 5: Configure Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. You should see a bucket named `gallery` (created by the SQL script)
3. Click on the `gallery` bucket
4. Click on "Policies" tab to verify upload/delete policies are set

---

## Step 6: Test the Setup

1. Start your development server:
```bash
npm run dev
```

2. Open your browser and go to:
```
http://localhost:5173/admin/login
```

3. Login with:
   - **Email**: jaanu@gmail.com
   - **Password**: Jaanu@2025

4. You should see the Admin Dashboard with stats

---

## Database Tables Structure

### 1. gallery_items
Stores uploaded images and videos
- `id` (UUID) - Primary key
- `url` (TEXT) - Supabase Storage URL
- `alt` (TEXT) - Alt text for accessibility
- `category` (TEXT) - Category (hair, makeup, skincare, bridal, special)
- `type` (TEXT) - Type (image or video)
- `file_name` (TEXT) - Original filename
- `file_size` (INTEGER) - File size in bytes
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

### 2. academy_courses
Stores academy course information
- `id` (UUID) - Primary key
- `name` (TEXT) - Course name
- `description` (TEXT) - Course description
- `duration` (TEXT) - Course duration
- `price` (DECIMAL) - Course price
- `features` (TEXT[]) - Array of course features
- `status` (TEXT) - Status (active, inactive)
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

### 3. course_schedules
Stores course scheduling information
- `id` (UUID) - Primary key
- `course_id` (UUID) - Foreign key to academy_courses
- `start_date` (DATE) - Schedule start date
- `end_date` (DATE) - Schedule end date
- `time_slot` (TEXT) - Time slot (e.g., "10:00-12:00")
- `max_students` (INTEGER) - Maximum student capacity
- `enrolled_count` (INTEGER) - Current enrollment count
- `status` (TEXT) - Status (scheduled, ongoing, completed)
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

### 4. services
Stores service offerings
- `id` (UUID) - Primary key
- `name` (TEXT) - Service name
- `description` (TEXT) - Service description
- `price_range` (TEXT) - Price range (e.g., "₹1500-₹3000")
- `duration` (TEXT) - Service duration
- `category` (TEXT) - Category (hair, makeup, skincare, bridal, special, spa)
- `features` (TEXT[]) - Array of service features
- `popular` (BOOLEAN) - Popular service flag
- `status` (TEXT) - Status (active, inactive)
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

---

## Admin Routes

### Public Routes
- `/` - Home page
- `/service/:serviceId` - Service detail page

### Admin Routes (Protected)
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (overview stats)
- `/admin/gallery` - Gallery manager (upload/delete images & videos)
- `/admin/academy` - Academy manager (courses & schedules)
- `/admin/services` - Services manager (services & pricing)

---

## Features Implemented

### ✅ Authentication System
- Secure admin login with email/password
- Session management with auto-persistence
- Protected routes that require authentication
- Admin-only access control

### ✅ Gallery Management
- Drag & drop file upload
- Support for images and videos
- File validation (size & type)
- Category filtering
- Search functionality
- Edit metadata (alt text, category)
- Delete with storage cleanup
- Progress indicators

### ✅ Academy Management
- Create/edit/delete courses
- Manage course pricing and features
- Schedule management with dates
- Student enrollment tracking
- Status management (active/inactive)
- Validation for dates and capacity

### ✅ Services Management
- Create/edit/delete services
- Manage pricing and duration
- Category organization
- Popular service flagging
- Feature lists
- Status management (active/inactive)

### ✅ Security Features
- Row-level security (RLS) policies
- Admin-only database access
- Secure file uploads
- File type validation
- File size limits (10MB images, 100MB videos)
- XSS protection with input sanitization

---

## Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution**: Make sure your `.env` file has all required variables and restart the dev server.

### Issue: "Invalid admin credentials"
**Solution**: Verify the admin user is created in Supabase Auth with email `jaanu@gmail.com`.

### Issue: "Storage bucket not found"
**Solution**: Run the SQL schema again to create the storage bucket, or create it manually in Storage settings.

### Issue: "Permission denied" when uploading files
**Solution**: Check that storage policies are correctly set for the admin user email.

### Issue: Database operations failing
**Solution**: Verify RLS policies are set correctly and the admin user email matches in the policies.

---

## Next Steps

1. **Test all features**:
   - Upload images/videos in Gallery Manager
   - Create courses and schedules in Academy Manager
   - Add services in Services Manager

2. **Customize as needed**:
   - Add more categories
   - Adjust file size limits
   - Modify table schemas if needed

3. **Production deployment**:
   - Update environment variables for production
   - Consider adding email verification
   - Set up backup schedules in Supabase

---

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check Supabase logs in the dashboard
3. Verify all environment variables are set correctly
4. Ensure the SQL schema ran successfully

---

## Security Notes

- Never commit `.env` file to version control
- The `.env` file is already in `.gitignore`
- Rotate your API keys periodically
- Use strong passwords for admin accounts
- Enable 2FA on your Supabase account
- Monitor usage in Supabase dashboard

---

## File Structure

```
sreemaguva-site/
├── database/
│   └── supabase_schema.sql          # Database schema
├── src/
│   ├── components/
│   │   └── admin/
│   │       ├── AdminDashboard.jsx   # Dashboard overview
│   │       ├── AdminLogin.jsx       # Login page
│   │       ├── GalleryManager.jsx   # Gallery CRUD
│   │       ├── AcademyManager.jsx   # Academy CRUD
│   │       ├── ServicesManager.jsx  # Services CRUD
│   │       └── ProtectedRoute.jsx   # Route protection
│   ├── contexts/
│   │   └── AuthContext.jsx          # Authentication context
│   ├── lib/
│   │   └── supabase.js              # Supabase client
│   └── utils/
│       └── fileValidation.js        # File validation utilities
├── .env                              # Environment variables
└── SUPABASE_SETUP.md                # This file
```

---

## Congratulations! 🎉

Your Supabase admin system is now fully set up and ready to use!

Access your admin panel at: `http://localhost:5173/admin/login`
