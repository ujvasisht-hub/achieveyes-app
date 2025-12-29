# Quick Deployment Checklist
## AchieveYes App → achieveyes.com/app

### ✅ Pre-Deployment

- [x] Branding changed from "Dreams" to "AchieveYes"
- [x] `basePath: '/app'` configured in `next.config.js`
- [x] All routes updated (automatic with basePath)
- [ ] Environment variables prepared
- [ ] Google OAuth callback URLs updated (if using Google sign-in)

---

### 🚀 Deployment Steps

#### Step 1: Prepare Repository
- [ ] Create GitHub repository for the app (or use monorepo)
- [ ] Push code to GitHub
- [ ] Verify all files are committed

#### Step 2: Deploy to Vercel
- [ ] Create new Vercel project
- [ ] Import GitHub repository
- [ ] Set build settings:
  - Framework: Next.js
  - Build Command: `npm run build`
  - Output Directory: `.next`
- [ ] Add environment variables (see below)

#### Step 3: Configure Domain Routing
- [ ] In landing page Vercel project, add rewrite:
  - Source: `/app/:path*`
  - Destination: `https://[your-app-url].vercel.app/app/:path*`
- [ ] OR configure subdomain routing

#### Step 4: Update Google OAuth (if using)
- [ ] Go to Google Cloud Console
- [ ] Add callback URL: `https://achieveyes.com/app/api/auth/callback/google`
- [ ] Save changes

---

### 🔐 Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
NEXTAUTH_URL=https://achieveyes.com/app
NEXTAUTH_SECRET=[generate-with-openssl-rand-base64-32]
GOOGLE_CLIENT_ID=[your-client-id]
GOOGLE_CLIENT_SECRET=[your-client-secret]
```

---

### ✅ Post-Deployment Testing

- [ ] Visit `achieveyes.com/app` - should show login page
- [ ] Test email/password sign-up
- [ ] Test email/password sign-in
- [ ] Test Google OAuth (if enabled)
- [ ] Create a new goal
- [ ] Navigate through all app routes
- [ ] Verify database connections work
- [ ] Check that landing page still works at `achieveyes.com`

---

### 🐛 Common Issues

**404 on all routes**
→ Check `next.config.js` has `basePath: '/app'`

**OAuth redirect fails**
→ Verify `NEXTAUTH_URL` includes `/app` and Google callback URLs are correct

**Database connection fails**
→ Check `DATABASE_URL` in Vercel environment variables

**Assets not loading**
→ Clear `.next` folder, rebuild, and redeploy

---

### 📞 Quick Commands

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Test locally with base path
NEXTAUTH_URL=http://localhost:3000/app npm run dev

# Build for production
npm run build
```

---

**Ready?** Follow the detailed `DEPLOYMENT_GUIDE.md` for step-by-step instructions!

