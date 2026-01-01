# Correct Connection Pooling String

## The Exact Format from Supabase

```
postgresql://postgres.zxkzuesqlyivhtkuchwa:[YOUR-PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

**This is correct!** Notice:
- ✅ Username: `postgres.zxkzuesqlyivhtkuchwa` (with project reference)
- ✅ Host: `aws-1-ap-south-1.pooler.supabase.com` (pooling host)
- ✅ Port: `5432` (Supabase might use this for pooling in your region)
- ✅ Database: `postgres`

---

## Step 1: Replace Password

Replace `[YOUR-PASSWORD]` with your URL-encoded password:

**Your password:** `Dreams@PankajMalarujjwal@1`
**URL-encoded:** `Dreams%40PankajMalarujjwal%401`

---

## Step 2: Final Connection String

```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```

---

## Step 3: Update Vercel

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard
   - Select your project: `achieveyes-app`

2. **Settings → Environment Variables**
   - Find `DATABASE_URL`
   - Click to edit

3. **Paste the connection string:**
   ```
   postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
   ```

4. **Select all environments:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. **Save**

6. **Redeploy**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"
   - OR push a new commit to trigger redeploy

---

## Step 4: Test

After redeploy:
1. Go to `https://app.achieveyes.com/auth/signin`
2. Try signing up with a new account
3. It should work now!

---

## Notes

- **Region:** Your database is in `ap-south-1` (Asia Pacific - Mumbai)
- **Port 5432:** Even though it's pooling, Supabase might use 5432 for your specific configuration
- **Pooling host:** The `pooler.supabase.com` host confirms this is connection pooling

---

## If It Still Doesn't Work

1. **Double-check the password encoding:**
   - `@` becomes `%40`
   - So `Dreams@PankajMalarujjwal@1` → `Dreams%40PankajMalarujjwal%401`

2. **Verify in Supabase:**
   - Make sure the database is still active
   - Check if there are any IP restrictions

3. **Check Vercel logs:**
   - Go to Vercel → Your Project → Deployments → Latest → Functions
   - Look for any connection errors

