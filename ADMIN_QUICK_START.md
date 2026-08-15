# Admin System Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Add Your Supabase API Keys

Open the `.env` file and replace the placeholder values with your actual Supabase keys:

```env
VITE_SUPABASE_URL=your_actual_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key_here
VITE_ADMIN_EMAIL=jaanu@gmail.com
```

**Where to find these:**
1. Go to your Supabase project dashboard
2. Click **Settings** → **API**
3. Copy **Project URL** and **anon public key**

---

### 2. Run the Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Open the file: `database/supabase_schema.sql`
3. Copy all the SQL code
4. Paste into SQL Editor and click **Run**

This creates all tables, policies, and storage buckets automatically.

---

### 3. Create Admin User

1. In Supabase, go to **Authentication** → **Users**
2. Click **Add User** → **Create New User**
3. Enter:
   - Email: `jaanu@gmail.com`
   - Password: `Jaanu@2025`
   - ✅ Check "Auto Confirm User"
4. Click **Create User**

---

### 4. Start & Test

```bash
npm run dev
```

Go to: **http://localhost:5173/admin/login**

Login with:
- Email: `jaanu@gmail.com`
- Password: `Jaanu@2025`

---

## 📱 Admin Features

### Gallery Manager (`/admin/gallery`)
- ✅ Drag & drop upload for images and videos
- ✅ Edit metadata (alt text, category)
- ✅ Delete files (removes from storage too)
- ✅ Filter by category
- ✅ Search functionality

### Academy Manager (`/admin/academy`)
- ✅ Create/edit courses with pricing
- ✅ Schedule courses with dates and time slots
- ✅ Track student enrollments
- ✅ Manage course status

### Services Manager (`/admin/services`)
- ✅ Create/edit services
- ✅ Set pricing and duration
- ✅ Mark popular services
- ✅ Category organization
- ✅ Add feature lists

---

## 🔐 Security

- Admin email is hardcoded: `jaanu@gmail.com`
- Only this email can access admin routes
- Row-level security enabled on all tables
- File uploads are validated (size & type)
- Protected routes redirect to login

---

## 📊 Database Tables

1. **gallery_items** - Images and videos
2. **academy_courses** - Course information
3. **course_schedules** - Course scheduling
4. **services** - Service offerings

All tables have automatic timestamps and are protected by RLS policies.

---

## 🛠️ File Limits

- **Images**: Max 10MB (JPEG, PNG, GIF, WebP)
- **Videos**: Max 100MB (MP4, AVI, MOV, WMV)

---

## ⚠️ Troubleshooting

**Can't login?**
- Check admin user exists in Supabase Auth
- Verify email matches exactly: `jaanu@gmail.com`

**Upload failing?**
- Check storage bucket `gallery` exists
- Verify storage policies are set (run SQL schema again)

**Database errors?**
- Run the SQL schema in Supabase SQL Editor
- Check RLS policies are enabled

---

## 📁 Project Structure

```
src/
├── components/admin/          # All admin components
│   ├── AdminLogin.jsx         # Login page
│   ├── AdminDashboard.jsx     # Dashboard with stats
│   ├── GalleryManager.jsx     # Gallery CRUD
│   ├── AcademyManager.jsx     # Academy CRUD
│   ├── ServicesManager.jsx    # Services CRUD
│   └── ProtectedRoute.jsx     # Route protection
├── contexts/
│   └── AuthContext.jsx        # Auth state management
├── lib/
│   └── supabase.js            # Supabase client
└── utils/
    └── fileValidation.js      # File validation
```

---

## 🎯 Next Steps

1. ✅ Test login at `/admin/login`
2. ✅ Upload some test images in Gallery Manager
3. ✅ Create a course in Academy Manager
4. ✅ Add services in Services Manager
5. ✅ Verify data appears in Supabase dashboard

---

## 💡 Tips

- Use the **Dashboard** to see stats overview
- **Gallery uploads** support drag & drop
- **Search** works across all managers
- **Filters** help organize content by category
- All changes are **real-time** in Supabase

---

## 📞 Need Help?

Check the detailed guide: **SUPABASE_SETUP.md**

Happy managing! 🎉
