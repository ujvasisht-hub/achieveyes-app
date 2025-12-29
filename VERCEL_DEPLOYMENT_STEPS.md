# Vercel Deployment Steps
## Deploy AchieveYes App to Vercel

Your code is now on GitHub! ✅
Repository: https://github.com/ujvasisht-hub/achieveyes-app

---

## Step 1: Create Vercel Project

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in (or create account if needed)

2. **Create New Project**
   - Click **"Add New..."** button (top right)
   - Select **"Project"**

3. **Import Repository**
   - You'll see a list of your GitHub repositories
   - Find **"ujvasisht-hub/achieveyes-app"**
   - Click **"Import"** next to it

---

## Step 2: Configure Project Settings

Vercel should auto-detect Next.js, but verify these settings:

**Project Name**: `achieveyes-app` (or keep default)

**Framework Preset**: `Next.js` (should be auto-detected)

**Root Directory**: `./` (leave as default)

**Build Command**: `npm run build` (should be auto-detected)

**Output Directory**: `.next` (should be auto-detected)

**Install Command**: `npm install` (should be auto-detected)

**Click "Deploy"** - but wait! We need to add environment variables first.

---

## Step 3: Add Environment Variables

**BEFORE clicking Deploy**, click on **"Environment Variables"** section.

Add these variables one by one:

### Variable 1: DATABASE_URL

1. Click **"Add New"**
2. **Name**: `DATABASE_URL`
3. **Value**: Your Supabase connection string
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
   ```
   Replace:
   - `[YOUR-PASSWORD]` with your Supabase database password
   - `[YOUR-PROJECT-REF]` with your Supabase project reference
4. **Environments**: Check all three boxes:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **"Add"**

### Variable 2: NEXTAUTH_URL

1. Click **"Add New"**
2. **Name**: `NEXTAUTH_URL`
3. **Value**: `https://achieveyes.com/app`
   ⚠️ **Important**: Must include `/app` path!
4. **Environments**: Check all three boxes
5. Click **"Add"**

### Variable 3: NEXTAUTH_SECRET

1. Click **"Add New"**
2. **Name**: `NEXTAUTH_SECRET`
3. **Value**: Generate a secret (see below)
4. **Environments**: Check all three boxes
5. Click **"Add"**

**To generate NEXTAUTH_SECRET:**
- Open terminal and run: `openssl rand -base64 32`
- Copy the output and paste as the value

### Variable 4: GOOGLE_CLIENT_ID (If using Google OAuth)

1. Click **"Add New"**
2. **Name**: `GOOGLE_CLIENT_ID`
3. **Value**: Your Google OAuth Client ID
4. **Environments**: Check all three boxes
5. Click **"Add"**

### Variable 5: GOOGLE_CLIENT_SECRET (If using Google OAuth)

1. Click **"Add New"**
2. **Name**: `GOOGLE_CLIENT_SECRET`
3. **Value**: Your Google OAuth Client Secret
4. **Environments**: Check all three boxes
5. Click **"Add"**

---

## Step 4: Deploy

1. After adding all environment variables, click **"Deploy"**
2. Vercel will:
   - Install dependencies
   - Build your app
   - Deploy to a URL like: `achieveyes-app.vercel.app`
3. **Wait 2-3 minutes** for deployment to complete

---

## Step 5: Note Your Deployment URL

After deployment completes, you'll see:
- **Deployment URL**: `https://achieveyes-app-[random].vercel.app`
- Or: `https://achieveyes-app.vercel.app`

**Copy this URL** - you'll need it for domain routing!

---

## Step 6: Configure Domain Routing

Now we need to route `/app/*` from your landing page to this app.

### Option A: Rewrite Rule (Recommended)

1. **Go to your landing page Vercel project**
   - In Vercel Dashboard, find your landing page project
   - (The one that serves `achieveyes.com`)

2. **Add Rewrite Rule**
   - Go to **Settings** → **Rewrites and Redirects**
   - Click **"Add Rewrite"**
   - Configure:
     - **Source**: `/app/:path*`
     - **Destination**: `https://achieveyes-app.vercel.app/app/:path*`
       (Replace with your actual deployment URL)
     - **Status Code**: `200`
   - Click **"Save"**

### Option B: Add Subdomain (Alternative)

1. In your **app project** (achieveyes-app)
2. Go to **Settings** → **Domains**
3. Add domain: `app.achieveyes.com`
4. Follow DNS configuration instructions

---

## Step 7: Update Google OAuth (If Using)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Navigate to **APIs & Services** → **Credentials**

2. **Edit OAuth Client**
   - Find your OAuth 2.0 Client ID
   - Click **Edit** (pencil icon)

3. **Add Authorized Redirect URI**
   - Under **Authorized redirect URIs**, click **"Add URI"**
   - Add: `https://achieveyes.com/app/api/auth/callback/google`
   - Click **"Save"**

---

## Step 8: Test Everything

### Test Landing Page
- [ ] Visit `https://achieveyes.com` - Should show landing page

### Test App Routes
- [ ] Visit `https://achieveyes.com/app` - Should redirect to login
- [ ] Visit `https://achieveyes.com/app/auth/signin` - Should show login page
- [ ] Test sign-up with email/password
- [ ] Test sign-in
- [ ] Test Google OAuth (if enabled)
- [ ] Create a new goal
- [ ] Navigate through app pages

### Check for Errors
- [ ] Open browser console (F12) - No errors?
- [ ] Check Vercel deployment logs - Any errors?

---

## Troubleshooting

### Build Fails

**Check Vercel Build Logs:**
1. Go to your project in Vercel
2. Click on the failed deployment
3. Check the build logs for errors

**Common Issues:**
- Missing environment variables → Add them
- Build command error → Check `package.json` scripts
- TypeScript errors → Fix in code

### Routes Return 404

**Solution:**
1. Verify `basePath: '/app'` in `next.config.js`
2. Check rewrite rule in landing page project
3. Make sure app is deployed successfully

### Database Connection Fails

**Solution:**
1. Check `DATABASE_URL` in Vercel environment variables
2. Verify Supabase project is active
3. Check connection string format
4. Make sure password is URL-encoded if it has special characters

### OAuth Redirect Fails

**Solution:**
1. Check `NEXTAUTH_URL` includes `/app`
2. Verify Google OAuth callback URL is correct
3. Make sure callback URL matches exactly in Google Console

---

## ✅ Success Checklist

- [ ] Code pushed to GitHub
- [ ] App deployed to Vercel
- [ ] Environment variables set
- [ ] Domain routing configured
- [ ] Google OAuth updated (if using)
- [ ] Landing page still works
- [ ] App accessible at `achieveyes.com/app`
- [ ] Login works
- [ ] Can create goals
- [ ] Database connections work

---

## 🎉 You're Done!

Your app should now be live at:
- **Landing Page**: `https://achieveyes.com`
- **App**: `https://achieveyes.com/app`
- **Login**: `https://achieveyes.com/app/auth/signin`

---

## 📝 Future Updates

To update your app:
1. Make changes locally
2. Commit: `git add . && git commit -m "Your message"`
3. Push: `git push`
4. Vercel automatically deploys! 🚀

---

**Ready?** Start with Step 1 above!

