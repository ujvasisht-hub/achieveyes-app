# Step-by-Step: Separate Repository & Deployment
## AchieveYes App → achieveyes.com/app

Follow these steps in order. Each step has clear instructions.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] GitHub account
- [ ] Vercel account (free tier works)
- [ ] Supabase database set up (already done)
- [ ] Access to achieveyes.com domain (in Vercel)

---

## STEP 1: Prepare Your Code

### 1.1 Check Current State

Your app is in: `/Users/ujjwalvasisht/Desktop/dreams/`

Make sure you have:
- ✅ All branding changed to "AchieveYes"
- ✅ `basePath: '/app'` in `next.config.js`
- ✅ All code is working locally

### 1.2 Clean Up (Optional)

Remove any unnecessary files:
- Documentation files (we'll keep them, but you can remove if you want)
- `.next` folder (will be regenerated)
- `node_modules` (will be reinstalled)

---

## STEP 2: Initialize Git Repository

### 2.1 Check if Git is Already Initialized

```bash
cd /Users/ujjwalvasisht/Desktop/dreams
ls -la | grep .git
```

If `.git` folder exists, skip to Step 3.

### 2.2 Initialize Git (if not already done)

```bash
cd /Users/ujjwalvasisht/Desktop/dreams
git init
```

### 2.3 Create/Update .gitignore

Make sure `.gitignore` includes:
```
node_modules
.next
.env.local
.env*.local
.DS_Store
*.log
```

### 2.4 Stage and Commit Files

```bash
git add .
git commit -m "Initial commit: AchieveYes app ready for deployment"
```

---

## STEP 3: Create GitHub Repository

### 3.1 Create New Repository on GitHub

1. Go to: https://github.com/new
2. **Repository name**: `achieveyes-app` (or your preferred name)
3. **Description**: "AchieveYes Goal Tracking App - Web app for achieveyes.com/app"
4. **Visibility**: Private (recommended) or Public
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### 3.2 Copy Repository URL

After creating, GitHub will show you the repository URL. It will look like:
```
https://github.com/yourusername/achieveyes-app.git
```

**Copy this URL** - you'll need it in the next step.

---

## STEP 4: Connect Local Repository to GitHub

### 4.1 Add Remote Origin

```bash
cd /Users/ujjwalvasisht/Desktop/dreams
git remote add origin https://github.com/yourusername/achieveyes-app.git
```

**Replace `yourusername` with your GitHub username!**

### 4.2 Verify Remote

```bash
git remote -v
```

You should see:
```
origin  https://github.com/yourusername/achieveyes-app.git (fetch)
origin  https://github.com/yourusername/achieveyes-app.git (push)
```

### 4.3 Push to GitHub

```bash
git branch -M main
git push -u origin main
```

You'll be prompted for GitHub credentials. Use:
- **Username**: Your GitHub username
- **Password**: Your GitHub Personal Access Token (not your password)

**Don't have a token?** See "GitHub Personal Access Token" section below.

---

## STEP 5: Deploy to Vercel

### 5.1 Create New Vercel Project

1. Go to: https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Find and select your `achieveyes-app` repository
5. Click **"Import"**

### 5.2 Configure Project Settings

**Project Name**: `achieveyes-app` (or your choice)

**Framework Preset**: Next.js (should auto-detect)

**Root Directory**: `./` (leave as default)

**Build Command**: `npm run build` (should auto-detect)

**Output Directory**: `.next` (should auto-detect)

**Install Command**: `npm install` (should auto-detect)

### 5.3 Add Environment Variables

Click **"Environment Variables"** and add:

```
DATABASE_URL
```
Value: Your Supabase connection string
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
```

```
NEXTAUTH_URL
```
Value: `https://achieveyes.com/app`
⚠️ **Important**: Must include `/app` path!

```
NEXTAUTH_SECRET
```
Value: Generate with: `openssl rand -base64 32`
Or use an existing secret if you have one.

```
GOOGLE_CLIENT_ID
```
Value: Your Google OAuth Client ID (if using Google sign-in)

```
GOOGLE_CLIENT_SECRET
```
Value: Your Google OAuth Client Secret (if using Google sign-in)

**For each variable:**
- Select **"Production"**, **"Preview"**, and **"Development"** environments
- Click **"Add"**

### 5.4 Deploy

Click **"Deploy"**

Vercel will:
1. Install dependencies
2. Build your app
3. Deploy to a URL like: `achieveyes-app.vercel.app`

**Wait for deployment to complete** (2-3 minutes)

---

## STEP 6: Configure Domain Routing

### 6.1 Get Your App's Vercel URL

After deployment, note your app's Vercel URL:
```
https://achieveyes-app.vercel.app
```

### 6.2 Configure Landing Page Project

1. Go to Vercel Dashboard
2. Find your **landing page project** (the one for achieveyes.com)
3. Go to **Settings** → **Domains**
4. Make sure `achieveyes.com` is connected

### 6.3 Add Rewrite Rule

1. In your **landing page project**, go to **Settings** → **Rewrites and Redirects**
2. Click **"Add Rewrite"**
3. Configure:
   - **Source**: `/app/:path*`
   - **Destination**: `https://achieveyes-app.vercel.app/app/:path*`
   - **Status Code**: 200
4. Click **"Save"**

**Alternative**: If you want to use a subdomain instead:
- Add `app.achieveyes.com` as a domain to your app project
- No rewrite needed

---

## STEP 7: Update Google OAuth (If Using)

### 7.1 Update Google Cloud Console

1. Go to: https://console.cloud.google.com/
2. Navigate to **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client ID
4. Click **Edit**
5. Under **Authorized redirect URIs**, add:
   ```
   https://achieveyes.com/app/api/auth/callback/google
   ```
6. Click **Save**

---

## STEP 8: Test Everything

### 8.1 Test Landing Page

- [ ] Visit `https://achieveyes.com` - Should show landing page

### 8.2 Test App Routes

- [ ] Visit `https://achieveyes.com/app` - Should redirect to login
- [ ] Visit `https://achieveyes.com/app/auth/signin` - Should show login page
- [ ] Test sign-up
- [ ] Test sign-in
- [ ] Test Google OAuth (if enabled)
- [ ] Create a goal
- [ ] Navigate through app

### 8.3 Test API Endpoints

- [ ] Check browser console for errors
- [ ] Verify database connections work
- [ ] Test creating goals
- [ ] Test check-ins

---

## 🔧 Troubleshooting

### Issue: Git Push Fails

**Error**: "Authentication failed"

**Solution**: Use GitHub Personal Access Token instead of password:
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name: "Vercel Deployment"
4. Select scopes: `repo` (full control)
5. Generate and copy token
6. Use this token as password when pushing

### Issue: Vercel Build Fails

**Error**: "Module not found" or build errors

**Solution**:
1. Check build logs in Vercel
2. Make sure all dependencies are in `package.json`
3. Try running `npm run build` locally first
4. Check that `next.config.js` is correct

### Issue: Routes Return 404

**Error**: Can't access `/app/*` routes

**Solution**:
1. Verify `basePath: '/app'` in `next.config.js`
2. Check rewrite rule in landing page Vercel project
3. Make sure app is deployed successfully

### Issue: Database Connection Fails

**Error**: "Database connection error"

**Solution**:
1. Check `DATABASE_URL` in Vercel environment variables
2. Verify Supabase project is active
3. Check connection string format
4. Make sure password is URL-encoded if it has special characters

### Issue: OAuth Redirect Fails

**Error**: "Redirect URI mismatch"

**Solution**:
1. Check `NEXTAUTH_URL` includes `/app`
2. Verify Google OAuth callback URL is correct
3. Make sure callback URL matches exactly in Google Console

---

## ✅ Final Checklist

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

## 🎉 Success!

If all checkboxes are checked, you're done! Your app is live at:
- **Landing Page**: `https://achieveyes.com`
- **App**: `https://achieveyes.com/app`
- **Login**: `https://achieveyes.com/app/auth/signin`

---

## 📝 Next Steps

1. **Monitor**: Check Vercel dashboard for any errors
2. **Update**: Make changes locally, push to GitHub, Vercel auto-deploys
3. **Mobile**: When ready, create mobile app repo that calls same API

---

## 🆘 Need Help?

If you get stuck at any step:
1. Check the error message
2. Review the troubleshooting section
3. Check Vercel build logs
4. Verify all environment variables are set

---

**Ready to start?** Let's begin with Step 1!

