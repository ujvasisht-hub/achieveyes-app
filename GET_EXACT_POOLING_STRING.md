# Get Exact Connection Pooling String from Supabase

## The Error: "Tenant or user not found"

This means the connection string format is still incorrect. We need to get the **exact format** from Supabase's dashboard.

---

## Step-by-Step: Get Exact Connection String

### Method 1: From Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - https://supabase.com/dashboard
   - Select your project: `zxkzuesqlyivhtkuchwa`

2. **Navigate to Database Settings**
   - Click **"Settings"** (gear icon) in left sidebar
   - Click **"Database"** under CONFIGURATION section

3. **Find Connection Pooling Section**
   - Scroll down to **"Connection Pooling"** section
   - You should see different connection modes:
     - **Session mode**
     - **Transaction mode**

4. **Copy the Connection String**
   - Look for **"Connection string"** or **"URI"**
   - It will show something like:
     ```
     postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
     ```
   - **Copy this exact format**

5. **Replace the Password**
   - The string will have `[YOUR-PASSWORD]` or `[YOUR-PASSWORD-PLACEHOLDER]`
   - Replace it with your URL-encoded password: `Dreams%40PankajMalarujjwal%401`
   - **Keep the exact format from Supabase**

6. **Use This in Vercel**
   - Go to Vercel → Settings → Environment Variables
   - Update `DATABASE_URL` with the exact string you got from Supabase
   - Redeploy

---

## Method 2: Try Alternative Username Formats

The username might need the project reference. Try these formats:

### Format 1: With project reference in username
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Format 2: With project reference in host
```
postgresql://postgres:Dreams%40PankajMalarujjwal%401@zxkzuesqlyivhtkuchwa.pooler.supabase.com:6543/postgres
```

### Format 3: Direct pooler URL
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@db.zxkzuesqlyivhtkuchwa.supabase.co:6543/postgres
```

---

## Method 3: Check Connection Info Tab

1. In Supabase Dashboard
2. Go to **Settings** → **Database**
3. Look for **"Connection info"** tab (not just Connection Pooling)
4. There might be a **"Connection string"** section there
5. Copy the exact format shown

---

## Most Important: Get It From Supabase UI

**The Supabase dashboard will show you the exact format.** That's the most reliable way.

The format might be:
- `postgres.[PROJECT-REF]` as username
- Or just `postgres` as username
- Or a different host format

**Supabase will show you the correct one.**

---

## Quick Test: Try Direct Connection in Vercel

If pooling keeps failing, temporarily try the direct connection in Vercel (not recommended long-term, but to test):

```
postgresql://postgres:Dreams%40PankajMalarujjwal%401@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres
```

If this works, the issue is specifically with the pooling format, and we need the exact format from Supabase.

---

## Action Items

1. **Go to Supabase Dashboard** → Settings → Database → Connection Pooling
2. **Copy the exact connection string format** shown there
3. **Replace password** with `Dreams%40PankajMalarujjwal%401`
4. **Update Vercel** with that exact string
5. **Redeploy**

The Supabase UI will show you the correct format!

