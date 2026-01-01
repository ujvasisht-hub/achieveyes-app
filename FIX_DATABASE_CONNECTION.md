# Fix Database Connection - Step by Step

## Still Getting Connection Error? Let's Fix It

The error means Vercel can't reach your Supabase database. Let's troubleshoot systematically.

---

## Step 1: Verify Supabase Project is Active

1. Go to: https://app.supabase.com
2. Check your project status
3. **Is it "Active" (green) or "Paused" (gray)?**
4. If paused, click **"Restore"** and wait 2-3 minutes

---

## Step 2: Get Connection Pooling URL (Recommended)

Direct connections (port 5432) often fail with Vercel/serverless. Use pooling:

### Option A: Find in Supabase UI

1. **Settings** → **Database**
2. Scroll to **"Connection Pooling"** section
3. You should see connection strings for different modes
4. Look for **"Session mode"** connection string
5. Copy it

### Option B: Construct Manually

Based on your project (`zxkzuesqlyivhtkuchwa`), the pooling URL should be:

```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**To find your region:**
- Go to Supabase → Your Project → Project Settings
- Check "Region" (might be `us-east-1`, `ap-south-1`, `eu-west-1`, etc.)
- Replace `us-east-1` with your actual region

**Common regions:**
- `us-east-1` (US East)
- `ap-south-1` (Asia Pacific - Mumbai)
- `eu-west-1` (Europe - Ireland)

---

## Step 3: Update Vercel Environment Variable

1. Go to: https://vercel.com/dashboard
2. Your **achieveyes-app** project
3. **Settings** → **Environment Variables**
4. Find `DATABASE_URL`
5. **Delete the old one** (if using direct connection)
6. **Add new one** with pooling URL:

**Name**: `DATABASE_URL`
**Value**: 
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-[YOUR-REGION].pooler.supabase.com:6543/postgres
```

Replace `[YOUR-REGION]` with your actual region.

7. **Environments**: Select all (Production, Preview, Development)
8. **Save**

---

## Step 4: Verify Environment Variable

1. In Vercel: **Settings** → **Environment Variables**
2. Make sure `DATABASE_URL` shows the correct value
3. Make sure it's for all environments
4. **Important**: Check if there are any spaces or line breaks

---

## Step 5: Force Redeploy

1. Go to **Deployments** tab
2. Click **three dots** (⋯) on latest deployment
3. Click **Redeploy**
4. **OR** make a small code change and push:
   ```bash
   cd /Users/ujjwalvasisht/Desktop/dreams
   git commit --allow-empty -m "Force redeploy with pooling connection"
   git push
   ```
5. Wait 3-5 minutes for deployment

---

## Step 6: Check Vercel Logs

After redeploying:

1. Go to **Deployments** → Latest deployment
2. Click **Functions** tab
3. Try signing up
4. Check the logs for any errors
5. Look for database connection messages

---

## Alternative: Test Connection Locally First

1. Update your `.env.local` file:
   ```env
   DATABASE_URL="postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
   ```

2. Run locally:
   ```bash
   npm run dev
   ```

3. Try signing up locally
4. If it works locally, the connection string is correct - issue is Vercel config
5. If it doesn't work locally, check Supabase project status

---

## Most Common Issues

1. **Not redeployed** - Environment variables only apply after redeploy
2. **Using direct connection** - Should use pooling (port 6543) for serverless
3. **Project paused** - Check Supabase dashboard
4. **Wrong region** - Make sure you use correct region in pooling URL
5. **Password encoding** - Make sure `@` is encoded as `%40`

---

## Quick Test

Try this pooling URL (replace region if needed):

```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

Add to Vercel, redeploy, and test!

