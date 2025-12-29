# Solution: Use Subdomain Instead
## app.achieveyes.com (No Rewrites Needed!)

Since rewrites aren't available on your Vercel plan, let's use a subdomain instead. This is actually **simpler and better**!

---

## ✅ Solution: app.achieveyes.com

Instead of `achieveyes.com/app`, we'll use `app.achieveyes.com`

**Benefits:**
- ✅ Works on free tier
- ✅ Simpler setup
- ✅ No rewrites needed
- ✅ Cleaner URLs
- ✅ Better for mobile apps later

---

## Step-by-Step Setup

### Step 1: Add Domain to App Project

1. In Vercel Dashboard, go to your **achieveyes-app** project
2. Click **Settings** (gear icon)
3. Click **"Domains"** in the left sidebar
4. Click **"Add Domain"** button
5. Enter: `app.achieveyes.com`
6. Click **"Add"**

### Step 2: Configure DNS (In GoDaddy)

Vercel will show you DNS records to add. You need to add a **CNAME record**:

1. Go to your **GoDaddy account**
2. Go to **DNS Management** for `achieveyes.com`
3. Add a new **CNAME record**:
   - **Name**: `app`
   - **Value**: `cname.vercel-dns.com` (or what Vercel shows you)
   - **TTL**: 3600 (or default)
4. **Save** the DNS record

**Note**: Vercel will show you the exact CNAME value to use. Copy it from Vercel.

### Step 3: Update Environment Variables

1. In your **achieveyes-app** Vercel project
2. Go to **Settings** → **Environment Variables**
3. Find `NEXTAUTH_URL`
4. Click **Edit**
5. Change value from `https://achieveyes.com/app` to: `https://app.achieveyes.com`
6. **Important**: Remove `/app` from the URL!
7. Click **"Save"**

### Step 4: Update next.config.js

We need to remove the `basePath` since we're using a subdomain now.

1. Update `next.config.js` to remove `basePath: '/app'`
2. Push changes to GitHub
3. Vercel will auto-redeploy

### Step 5: Wait for DNS Propagation

- DNS changes can take 5-60 minutes to propagate
- Vercel will show "Validating" status until DNS is ready
- Once validated, your app will be live!

### Step 6: Update Google OAuth (If Using)

1. Go to Google Cloud Console
2. Edit your OAuth Client
3. Update callback URL to: `https://app.achieveyes.com/api/auth/callback/google`
4. Save

---

## Alternative: Keep /app Path (If You Really Want It)

If you really want to keep `achieveyes.com/app`, you have these options:

### Option A: Upgrade Vercel Plan
- Upgrade to Pro plan ($20/month)
- Rewrites will be available

### Option B: Use Next.js Middleware
- Create middleware to handle routing
- More complex but works on free tier

### Option C: Deploy Both in Monorepo
- Combine both apps in one Vercel project
- Use Next.js routing to handle `/app/*`

---

## Recommendation: Use Subdomain

**I recommend using `app.achieveyes.com`** because:
- ✅ Works on free tier
- ✅ Simpler setup
- ✅ Cleaner URLs
- ✅ Better for mobile apps
- ✅ No configuration complexity

Your URLs will be:
- Landing: `https://achieveyes.com`
- App: `https://app.achieveyes.com`
- Login: `https://app.achieveyes.com/auth/signin`

---

## What to Do Now

1. **Add domain** `app.achieveyes.com` to your app project in Vercel
2. **Add CNAME record** in GoDaddy DNS
3. **Update `NEXTAUTH_URL`** to `https://app.achieveyes.com`
4. **Remove `basePath`** from `next.config.js`
5. **Wait for DNS** to propagate
6. **Test** at `app.achieveyes.com`

---

**Ready?** Let's start with Step 1!

