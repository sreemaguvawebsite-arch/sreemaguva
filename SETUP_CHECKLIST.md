# ✅ Setup Checklist - Supabase Admin System

Follow these steps in order to get your admin system running:

---

## Step 1: Supabase Project Setup

- [ ] Create Supabase account at https://supabase.com
- [ ] Create new project (name: `sreemaguva-admin`)
- [ ] Wait for project to finish setting up (~2 minutes)

---

## Step 2: Get API Keys

- [ ] Go to **Settings** → **API** in Supabase dashboard
- [ ] Copy **Project URL** (starts with `https://`)
- [ ] Copy **anon public** key (long string starting with `eyJ`)

---

## Step 3: Update Environment Variables

- [ ] Open `.env` file in your project
- [ ] Paste your **Project URL** to replace `your_supabase_project_url_here`
- [ ] Paste your **anon key** to replace `your_supabase_anon_key_here`
- [ ] Save the file

**Your .env should look like:**
```env
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJz...
VITE_ADMIN_EMAIL=jaanu@gmail.com
```

---

## Step 4: Create Database Tables

- [ ] In Supabase, go to **SQL Editor**
- [ ] Click **New Query**
- [ ] Open file: `database/supabase_schema.sql`
- [ ] Copy ALL the SQL code from that file
- [ ] Paste into Supabase SQL Editor
- [ ] Click **Run** button
- [ ] Wait for success message

**This creates:**
- ✅ 4 database tables
- ✅ All security policies
- ✅ Storage bucket for files
- ✅ Sample data

---

## Step 5: Create Admin User

- [ ] In Supabase, go to **Authentication** → **Users**
- [ ] Click **Add User** button
- [ ] Select **Create New User**
- [ ] Enter email: `jaanu@gmail.com`
- [ ] Enter password: `Jaanu@2025`
- [ ] ✅ CHECK the box: **Auto Confirm User**
- [ ] Click **Create User**
- [ ] Verify user appears in the users list

---

## Step 6: Verify Storage Bucket

- [ ] In Supabase, go to **Storage**
- [ ] Verify bucket named `gallery` exists
- [ ] Click on `gallery` bucket
- [ ] Click **Policies** tab
- [ ] Verify you see upload/delete policies

**If bucket doesn't exist:** Run the SQL schema again.

---

## Step 7: Start Development Server

- [ ] Open terminal in project folder
- [ ] Run: `npm run dev`
- [ ] Wait for "Local: http://localhost:5173/"
- [ ] Keep this terminal running

---

## Step 8: Test Admin Login

- [ ] Open browser
- [ ] Go to: `http://localhost:5173/admin/login`
- [ ] Enter email: `jaanu@gmail.com`
- [ ] Enter password: `Jaanu@2025`
- [ ] Click **Sign In**
- [ ] Should redirect to Admin Dashboard

---

## Step 9: Test Gallery Manager

- [ ] Click **Gallery Manager** card
- [ ] Try uploading an image (drag & drop or click)
- [ ] Verify image appears in grid
- [ ] Try editing the alt text
- [ ] Try deleting the image
- [ ] Check Supabase Storage → gallery bucket to verify files

---

## Step 10: Test Academy Manager

- [ ] Go back to Dashboard
- [ ] Click **Academy Courses** card
- [ ] Click **Add Course** button
- [ ] Fill in course details
- [ ] Click **Create Course**
- [ ] Verify course appears in the list
- [ ] Switch to **Schedules** tab
- [ ] Try adding a schedule

---

## Step 11: Test Services Manager

- [ ] Go back to Dashboard
- [ ] Click **Services** card
- [ ] Click **Add New Service** button
- [ ] Fill in service details
- [ ] Click **Create Service**
- [ ] Verify service appears in the list
- [ ] Try editing and deleting

---

## Step 12: Verify Data in Supabase

- [ ] Go to Supabase **Table Editor**
- [ ] Check `gallery_items` table has your uploaded images
- [ ] Check `academy_courses` table has your test course
- [ ] Check `services` table has your test service
- [ ] All data should match what you entered

---

## ✅ Setup Complete!

If all checkboxes are checked, your admin system is fully working!

---

## 🚨 Troubleshooting

### ❌ Can't login
**Problem:** Invalid credentials error
**Solution:**
1. Verify admin user exists in Supabase Auth → Users
2. Email must be exactly: `jaanu@gmail.com`
3. Try creating the user again
4. Check browser console for errors

### ❌ Upload fails
**Problem:** Error uploading files
**Solution:**
1. Check storage bucket `gallery` exists
2. Run SQL schema again to create storage policies
3. Verify file size is under limits (10MB images, 100MB videos)
4. Check file type is supported

### ❌ Database errors
**Problem:** Can't create/edit/delete items
**Solution:**
1. Run the SQL schema in Supabase SQL Editor
2. Check Row Level Security is enabled on all tables
3. Verify policies are set for jaanu@gmail.com
4. Check browser console for specific error

### ❌ Environment variables error
**Problem:** "Missing Supabase environment variables"
**Solution:**
1. Check `.env` file exists in project root
2. Verify all three variables are set
3. Restart the dev server: Stop (Ctrl+C) and run `npm run dev` again

---

## 📞 Need Help?

1. Check browser console (F12 → Console tab)
2. Check Supabase logs (Dashboard → Logs)
3. Read detailed guide: `SUPABASE_SETUP.md`
4. Verify all steps in this checklist

---

## 🎉 Success Message

When everything works, you should be able to:
- ✅ Login to admin dashboard
- ✅ See stats on dashboard
- ✅ Upload and manage gallery items
- ✅ Create and edit courses
- ✅ Add and manage services
- ✅ All changes reflected in Supabase database

**You're ready to manage your website! 🚀**
