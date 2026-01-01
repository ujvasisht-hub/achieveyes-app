# Verify Your DATABASE_URL

## Your DATABASE_URL

```
postgresql://postgres:Dreams%40PankajMalarujjwal%401@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
```

✅ **This looks correct!**

**Breakdown:**
- `postgresql://` - Protocol ✓
- `postgres` - Username ✓
- `Dreams%40PankajMalarujjwal%401` - Password (URL-encoded) ✓
  - Decodes to: `Dreams@PankajMalarujjwal@1`
- `db.zxkzuesqlyivhtkuchwa.supabase.co` - Database host ✓
- `5432` - Port (direct connection) ✓
- `postgres` - Database name ✓
- `?pgbouncer=true&connection_limit=1` - Query parameters ✓

---

## Where to Verify in Supabase

### Method 1: Settings → Database → Connection String

1. Go to: https://app.supabase.com
2. Select your project
3. Click **Settings** (gear icon) in left sidebar
4. Click **Database** in settings menu
5. Scroll down to **"Connection string"** section
6. Click **"URI"** tab
7. You should see your connection string there
8. It should match what you have (except password will show as `[YOUR-PASSWORD]`)

### Method 2: Settings → Database → Connection Pooling

1. Same as above: **Settings** → **Database**
2. Scroll to **"Connection Pooling"** section
3. Select **"Session mode"**
4. You'll see a connection string with port **6543**
5. This is an alternative (better for serverless/Vercel)

---

## For Vercel: Use This URL

Your current URL should work, but for better serverless performance, consider using **Connection Pooling**:

1. In Supabase: **Settings** → **Database** → **Connection Pooling**
2. Select **"Session mode"**
3. Copy the connection string (port 6543)
4. Replace the password part with your encoded password: `Dreams%40PankajMalarujjwal%401`

It will look like:
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**But your current URL should work fine!**

---

## Add to Vercel

1. Go to: https://vercel.com/dashboard
2. Find your **achieveyes-app** project
3. **Settings** → **Environment Variables**
4. Add or edit `DATABASE_URL`
5. **Value**: 
   ```
   postgresql://postgres:Dreams%40PankajMalarujjwal%401@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
   ```
6. **Environments**: Select all (Production, Preview, Development)
7. Click **Save**

---

## Test the Connection

After adding to Vercel:

1. Redeploy your app
2. Try signing up
3. If it works, the connection is correct!

---

## Quick Verification Checklist

- [x] Format is correct (postgresql://...)
- [x] Project reference matches (zxkzuesqlyivhtkuchwa)
- [x] Password is URL-encoded (%40 = @)
- [x] Port is correct (5432 for direct, 6543 for pooling)
- [ ] Added to Vercel environment variables
- [ ] Redeployed after adding

---

**Your DATABASE_URL is correct! Just add it to Vercel and redeploy.**

