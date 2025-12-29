# AchieveYes App Deployment Guide
## Deploying to achieveyes.com/app

This guide will help you deploy the AchieveYes goal tracking app to `achieveyes.com/app` while keeping your existing landing page at `achieveyes.com` live.

---

## ✅ What's Been Changed

1. **Branding**: All "Dreams" references changed to "AchieveYes"
2. **Base Path**: Configured to work under `/app` subdirectory
3. **Routes**: All routes will automatically work under `achieveyes.com/app/*`

---

## 📋 Prerequisites

- Existing achieveyes.com landing page repository: https://github.com/ujvasisht-hub/achiveyes
- Vercel account (free tier works)
- Supabase database (already set up)
- Google OAuth credentials (if using Google sign-in)

---

## 🏗️ Deployment Options

You have **two main options** for deployment:

### **Option 1: Monorepo Setup (Recommended)**
Deploy both apps from a single repository with separate Vercel projects.

### **Option 2: Separate Repositories**
Keep apps in separate repos and deploy independently.

---

## 🚀 Option 1: Monorepo Setup (Recommended)

### Step 1: Set Up Monorepo Structure

1. **Clone your existing achieveyes.com repo** (if not already):
   ```bash
   cd /Users/ujjwalvasisht/Desktop
   git clone https://github.com/ujvasisht-hub/achiveyes.git achieveyes-main
   cd achieveyes-main
   ```

2. **Copy the app folder into the monorepo**:
   ```bash
   # From the achieveyes-main directory
   cp -r /Users/ujjwalvasisht/Desktop/dreams/app ./app
   cp -r /Users/ujjwalvasisht/Desktop/dreams/prisma ./prisma
   cp /Users/ujjwalvasisht/Desktop/dreams/package.json ./package-app.json
   cp /Users/ujjwalvasisht/Desktop/dreams/next.config.js ./next.config.app.js
   cp /Users/ujjwalvasisht/Desktop/dreams/tsconfig.json ./tsconfig.app.json
   cp /Users/ujjwalvasisht/Desktop/dreams/tailwind.config.js ./tailwind.config.app.js
   cp /Users/ujjwalvasisht/Desktop/dreams/postcss.config.js ./postcss.config.app.js
   ```

3. **Update the monorepo structure**:
   ```
   achieveyes-main/
   ├── app/              # Landing page (existing)
   ├── app-app/          # Goal tracking app (new)
   │   ├── app/
   │   ├── prisma/
   │   └── ...
   ├── package.json      # Landing page dependencies
   ├── package-app.json  # App dependencies
   └── ...
   ```

### Step 2: Configure Vercel for Monorepo

1. **Create two Vercel projects**:
   - **Project 1**: `achieveyes-landing` → Deploys root directory
   - **Project 2**: `achieveyes-app` → Deploys `app-app` directory

2. **For the App Project**:
   - **Root Directory**: `app-app`
   - **Build Command**: `cd app-app && npm install && npm run build`
   - **Output Directory**: `app-app/.next`
   - **Install Command**: `cd app-app && npm install`

### Step 3: Configure Rewrites (Important!)

In your **landing page** Vercel project, add a rewrite rule:

1. Go to Vercel Dashboard → Your Landing Page Project → Settings → Rewrites
2. Add this rewrite:
   ```json
   {
     "source": "/app/:path*",
     "destination": "https://achieveyes-app.vercel.app/app/:path*"
   }
   ```

**OR** use Vercel's proxy feature to route `/app/*` to the app project.

---

## 🚀 Option 2: Separate Repositories (Simpler)

### Step 1: Create Separate Repository for App

1. **Create a new GitHub repository**:
   ```bash
   cd /Users/ujjwalvasisht/Desktop/dreams
   git init
   git add .
   git commit -m "Initial commit: AchieveYes app"
   git remote add origin https://github.com/yourusername/achieveyes-app.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to Vercel Dashboard
   - Click "New Project"
   - Import your `achieveyes-app` repository
   - **Important Settings**:
     - **Framework Preset**: Next.js
     - **Root Directory**: `./` (root)
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`

### Step 2: Configure Domain Routing

In your **landing page** Vercel project:

1. Go to **Settings** → **Domains**
2. Add `achieveyes.com` (if not already added)
3. Go to **Settings** → **Rewrites and Redirects**
4. Add a rewrite rule:
   ```
   Source: /app/:path*
   Destination: https://achieveyes-app.vercel.app/app/:path*
   Status: 200
   ```

### Step 3: Configure App Project Domain

In your **app** Vercel project:

1. Go to **Settings** → **Domains**
2. Add `app.achieveyes.com` as a subdomain (optional, for direct access)
3. **OR** keep it on `achieveyes-app.vercel.app` and use rewrites from main domain

---

## 🔐 Environment Variables Setup

### For the App Project (achieveyes-app)

In Vercel Dashboard → Your App Project → Settings → Environment Variables:

```env
# Database
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"

# NextAuth (IMPORTANT: Include /app in the URL)
NEXTAUTH_URL="https://achieveyes.com/app"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (if using)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### ⚠️ Critical: Google OAuth Callback URLs

Update your Google OAuth settings:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add these **Authorized redirect URIs**:
   ```
   https://achieveyes.com/app/api/auth/callback/google
   https://achieveyes-app.vercel.app/app/api/auth/callback/google
   ```

---

## 🧪 Testing Locally

### Test the App with Base Path

1. **Update `.env.local`**:
   ```env
   DATABASE_URL="your-supabase-url"
   NEXTAUTH_URL="http://localhost:3000/app"
   NEXTAUTH_SECRET="your-secret"
   ```

2. **Run the app**:
   ```bash
   cd /Users/ujjwalvasisht/Desktop/dreams
   npm run dev
   ```

3. **Access the app**:
   - Login: http://localhost:3000/app/auth/signin
   - Dashboard: http://localhost:3000/app

### Test Both Apps Together (Monorepo)

If using monorepo, you'll need to run both apps on different ports:

1. **Landing page**: Port 3000
2. **App**: Port 3001 (update `next.config.js` to use different port)

---

## 📝 Post-Deployment Checklist

- [ ] App accessible at `achieveyes.com/app`
- [ ] Login page works at `achieveyes.com/app/auth/signin`
- [ ] Google OAuth works (if enabled)
- [ ] Email/password authentication works
- [ ] All routes work correctly (`/app/goals`, `/app/goals/new`, etc.)
- [ ] Database connections work
- [ ] Environment variables are set correctly
- [ ] Landing page still works at `achieveyes.com`

---

## 🔧 Troubleshooting

### Issue: Routes return 404

**Solution**: Make sure `basePath: '/app'` is set in `next.config.js`

### Issue: Google OAuth redirect fails

**Solution**: 
1. Check `NEXTAUTH_URL` includes `/app`
2. Verify Google OAuth callback URLs are correct
3. Check Vercel environment variables

### Issue: API routes not working

**Solution**: API routes should work automatically with basePath. If not, check:
- `next.config.js` has `basePath: '/app'`
- Environment variables are set in Vercel
- Database connection string is correct

### Issue: Assets (CSS, JS) not loading

**Solution**: Next.js handles this automatically with basePath. If issues persist:
- Clear `.next` folder and rebuild
- Check Vercel build logs

---

## 🎯 Quick Reference

### URLs After Deployment

- **Landing Page**: `https://achieveyes.com`
- **App Login**: `https://achieveyes.com/app/auth/signin`
- **App Dashboard**: `https://achieveyes.com/app`
- **New Goal**: `https://achieveyes.com/app/goals/new`

### Key Files Modified

- `next.config.js` - Added `basePath: '/app'`
- `app/layout.tsx` - Updated metadata
- `app/components/Dashboard.tsx` - Changed branding
- `app/auth/signin/page.tsx` - Updated welcome text
- `package.json` - Updated name

---

## 📞 Need Help?

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test locally first
4. Check Google OAuth console for callback URLs

---

**Ready to deploy?** Follow Option 2 (Separate Repositories) for the simplest setup, or Option 1 (Monorepo) if you want everything in one place.

