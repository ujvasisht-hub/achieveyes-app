# Fix: 404 Error on achieveyes.com/app

The deployment is successful, but you're getting a 404. This is because the domain routing isn't configured yet.

---

## The Problem

Your app is deployed at: `https://achieveyes-app.vercel.app/app`
But you want it at: `https://achieveyes.com/app`

The landing page at `achieveyes.com` doesn't know to route `/app/*` requests to your app project.

---

## Solution: Configure Rewrite Rule

You need to add a rewrite rule in your **landing page** Vercel project.

---

## Step-by-Step Fix

### Step 1: Find Your App's Vercel URL

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Find your **achieveyes-app** project
3. Click on it
4. Note the deployment URL (e.g., `https://achieveyes-app.vercel.app` or `https://achieveyes-app-[hash].vercel.app`)
5. **Copy this URL** - you'll need it

### Step 2: Configure Rewrite in Landing Page Project

1. In Vercel Dashboard, find your **landing page project** (the one that serves `achieveyes.com`)
2. Click on it
3. Go to **Settings** (gear icon in top menu)
4. Click **"Rewrites and Redirects"** in the left sidebar
5. Click **"Add Rewrite"** button
6. Configure the rewrite:
   - **Source**: `/app/:path*`
   - **Destination**: `https://achieveyes-app.vercel.app/app/:path*`
     (Replace with your actual app URL from Step 1)
   - **Status Code**: `200`
7. Click **"Save"**

### Step 3: Verify Domain Configuration

1. Still in your **landing page project**
2. Go to **Settings** → **Domains**
3. Make sure `achieveyes.com` is listed and connected
4. If not, add it:
   - Click **"Add Domain"**
   - Enter: `achieveyes.com`
   - Follow DNS configuration instructions

### Step 4: Test

Wait 1-2 minutes for changes to propagate, then test:
- [ ] `https://achieveyes.com` - Should show landing page
- [ ] `https://achieveyes.com/app` - Should redirect to login or show app
- [ ] `https://achieveyes.com/app/auth/signin` - Should show login page

---

## Alternative Solution: Add Subdomain

If rewrites don't work, you can use a subdomain instead:

### Option A: app.achieveyes.com

1. In your **achieveyes-app** Vercel project
2. Go to **Settings** → **Domains**
3. Click **"Add Domain"**
4. Enter: `app.achieveyes.com`
5. Follow DNS configuration instructions
6. Update `NEXTAUTH_URL` to: `https://app.achieveyes.com`
7. Users access app at: `https://app.achieveyes.com`

### Option B: Keep /app path but use different approach

If you want to keep `/app` path, make sure:
1. Rewrite rule is correctly configured (see Step 2 above)
2. `basePath: '/app'` is in `next.config.js` (already done ✅)
3. `NEXTAUTH_URL` includes `/app` (check environment variables)

---

## Troubleshooting

### Still Getting 404?

1. **Check Rewrite Rule**:
   - Make sure source is: `/app/:path*` (with the colon and asterisk)
   - Make sure destination includes `/app` at the end: `https://your-app.vercel.app/app/:path*`

2. **Check Vercel Project Settings**:
   - In your **app project**, go to **Settings** → **General**
   - Make sure "Framework Preset" is set to "Next.js"
   - Make sure "Root Directory" is `./`

3. **Check Environment Variables**:
   - In your **app project**, go to **Settings** → **Environment Variables**
   - Verify `NEXTAUTH_URL` = `https://achieveyes.com/app`

4. **Clear Cache**:
   - Try accessing in incognito/private browser window
   - Or clear browser cache

5. **Check Deployment**:
   - Make sure your app project has a successful deployment
   - Check deployment logs for any errors

---

## Quick Test

Try accessing your app directly:
- `https://achieveyes-app.vercel.app/app`

If this works, the issue is just the domain routing.
If this doesn't work, there's an issue with the app itself.

---

## Need Help?

If you're still stuck:
1. Share your app's Vercel URL
2. Share a screenshot of your rewrite rule configuration
3. Check if `achieveyes.com` is properly connected to your landing page project

---

**Most Common Issue**: The rewrite rule destination URL is wrong or missing `/app` at the end.

Make sure it's: `https://your-app-url.vercel.app/app/:path*`

