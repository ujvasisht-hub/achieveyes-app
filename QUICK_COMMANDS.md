# Quick Commands Reference
## Copy-paste these commands as you go through the setup

---

## ✅ Step 1: DONE
Git initialized and files committed!

---

## Step 2: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `achieveyes-app`
3. Description: "AchieveYes Goal Tracking App"
4. Choose Private or Public
5. **DO NOT** check any boxes (no README, .gitignore, license)
6. Click "Create repository"

**After creating, copy the repository URL** (you'll need it below)

---

## Step 3: Connect to GitHub

**Replace `YOUR_USERNAME` with your GitHub username!**

```bash
cd /Users/ujjwalvasisht/Desktop/dreams
git remote add origin https://github.com/YOUR_USERNAME/achieveyes-app.git
git branch -M main
git push -u origin main
```

**Note**: When prompted for password, use a GitHub Personal Access Token (not your password).

**Don't have a token?** See instructions below.

---

## Step 4: Deploy to Vercel

1. Go to: https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your `achieveyes-app` repository
4. Configure environment variables (see below)
5. Click "Deploy"

---

## Environment Variables for Vercel

Add these in Vercel Dashboard → Your Project → Settings → Environment Variables:

```
DATABASE_URL = postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1

NEXTAUTH_URL = https://achieveyes.com/app

NEXTAUTH_SECRET = [Generate with: openssl rand -base64 32]

GOOGLE_CLIENT_ID = [Your Google Client ID if using]

GOOGLE_CLIENT_SECRET = [Your Google Client Secret if using]
```

**For each variable:**
- Select all environments (Production, Preview, Development)
- Click "Add"

---

## Step 5: Configure Domain Routing

In your **landing page** Vercel project:
1. Settings → Rewrites and Redirects
2. Add Rewrite:
   - Source: `/app/:path*`
   - Destination: `https://achieveyes-app.vercel.app/app/:path*`
   - Status: 200

---

## GitHub Personal Access Token

If git push asks for password:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: "Vercel Deployment"
4. Expiration: 90 days (or your choice)
5. Select scope: `repo` (check the box)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)
8. Use this token as your password when pushing

---

## Test After Deployment

- [ ] `https://achieveyes.com` - Landing page works
- [ ] `https://achieveyes.com/app` - Redirects to login
- [ ] `https://achieveyes.com/app/auth/signin` - Login page works
- [ ] Can sign up
- [ ] Can sign in
- [ ] Can create goals

---

**Ready?** Let's continue with Step 2!

