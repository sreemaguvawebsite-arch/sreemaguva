# Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

Your site is now ready for Vercel deployment with:
- ✅ Scroll to top on route changes
- ✅ 404 error handling with custom page
- ✅ Vercel configuration (`vercel.json`)
- ✅ Security headers
- ✅ Asset caching optimization

## Deployment Steps

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard (Recommended)

#### Step 1: Push to Git
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

#### Step 2: Import to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Vercel will auto-detect Vite configuration

#### Step 3: Configure Environment Variables
In the Vercel dashboard, add these environment variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Where to find these:**
- Go to your Supabase project → Settings → API
- Copy "Project URL" for `VITE_SUPABASE_URL`
- Copy "anon public" key for `VITE_SUPABASE_ANON_KEY`

#### Step 4: Deploy
- Click "Deploy"
- Vercel will build and deploy automatically
- You'll get a live URL (e.g., `your-site.vercel.app`)

### 3. Deploy via CLI (Alternative)

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## What's Configured

### `vercel.json` Features:

#### 1. **SPA Routing**
```json
"rewrites": [
  { "source": "/(.*)", "destination": "/index.html" }
]
```
- All routes redirect to index.html
- React Router handles client-side routing
- No 404 errors for `/service/123` or other routes

#### 2. **Security Headers**
```json
"X-Content-Type-Options": "nosniff"
"X-Frame-Options": "DENY"
"X-XSS-Protection": "1; mode=block"
```
- Prevents MIME-type sniffing attacks
- Blocks iframe embedding (clickjacking protection)
- Enables XSS filter in browsers

#### 3. **Asset Caching**
```json
"Cache-Control": "public, max-age=31536000, immutable"
```
- Static assets cached for 1 year
- Reduces bandwidth and improves load times
- Vite's hash-based filenames prevent stale cache

## Post-Deployment

### Update WhatsApp Number
1. Edit `src/components/SocialFloatingButtons.jsx`
2. Change `const whatsappNumber = '+919876543210'` to your real number
3. Commit and redeploy

### Custom Domain (Optional)
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `sreemaguva.com`)
3. Follow Vercel's DNS configuration instructions
4. SSL certificate auto-generated

### Testing Checklist

After deployment, test:
- ✅ Homepage loads
- ✅ Click service "View Details" → loads correct page
- ✅ Navigate back → scrolls to top
- ✅ Try invalid URL (e.g., `/random-page`) → shows 404 page
- ✅ WhatsApp button opens chat
- ✅ Instagram button opens profile
- ✅ Admin login works
- ✅ All sections scroll smoothly

## Monitoring & Analytics

### Add Vercel Analytics (Optional)
```bash
npm install @vercel/analytics
```

Then add to `App.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  )
}
```

### Vercel Dashboard Features
- Real-time deployment logs
- Performance metrics
- Error tracking
- Traffic analytics

## Troubleshooting

### Issue: Environment variables not working
**Solution:** Rebuild the project after adding env vars in Vercel dashboard

### Issue: 404 on refresh
**Solution:** Already handled by `vercel.json` rewrites

### Issue: Supabase connection fails
**Solution:** 
1. Check env vars are set correctly in Vercel
2. Verify Supabase URL doesn't have trailing slash
3. Check Supabase project is not paused

### Issue: Old version still showing
**Solution:** 
1. Hard refresh browser (Ctrl+Shift+R)
2. Check deployment succeeded in Vercel dashboard
3. Clear browser cache

## Build Commands

Vercel automatically detects:
- **Build Command:** `npm run build` or `vite build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

No need to configure manually unless customizing.

## Performance Tips

1. **Enable Vercel Speed Insights** (free on Pro plan)
2. **Use Vercel Image Optimization** for gallery images
3. **Enable Edge Functions** for faster API responses
4. **Use CDN** (automatically enabled on Vercel)

## Cost

- **Hobby Plan:** Free
  - Unlimited deployments
  - 100GB bandwidth/month
  - Custom domains
  - SSL certificates

- **Pro Plan:** $20/month (if needed)
  - 1TB bandwidth
  - Advanced analytics
  - Team collaboration

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

---

**Your site is production-ready! 🚀**

Deploy to Vercel and share your beautiful beauty salon website with the world!
