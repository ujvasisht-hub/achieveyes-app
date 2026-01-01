# Comprehensive Connection String Fix

## Current Error: "Tenant or user not found"

This error means the connection string format is still incorrect. Let's fix this step by step.

---

## Step 1: Test Direct Connection First (Temporary)

Let's first verify the database is accessible using a direct connection. This will help us isolate if it's a pooling format issue or a database access issue.

### In Vercel, temporarily update `DATABASE_URL` to:

```
postgresql://postgres:Dreams%40PankajMalarujjwal%401@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres
```

**This is the direct connection (port 5432), not pooling.**

1. Update in Vercel → Settings → Environment Variables
2. Redeploy
3. Try signing up

**If this works:** The database is accessible, and the issue is specifically with the pooling format.
**If this doesn't work:** There's a more fundamental connection issue (password, project status, etc.)

---

## Step 2: Get Exact Pooling Format from Supabase

### Method A: From Connection Pooling Settings

1. **Go to Supabase Dashboard**
   - https://app.supabase.com
   - Select project: `zxkzuesqlyivhtkuchwa`

2. **Settings → Database**
   - Click "Settings" (gear icon) in left sidebar
   - Click "Database" under CONFIGURATION

3. **Scroll to "Connection Pooling"**
   - You should see different modes: **Session mode**, **Transaction mode**
   - Look for **"Connection string"** or **"URI"** under each mode
   - **Copy the exact format shown**

4. **The format should look like:**
   ```
   postgresql://postgres.zxkzuesqlyivhtkuchwa:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
   OR
   ```
   postgresql://postgres.zxkzuesqlyivhtkuchwa:[YOUR-PASSWORD]@[PROJECT-REF].pooler.supabase.com:6543/postgres
   ```

5. **Replace `[YOUR-PASSWORD]`** with: `Dreams%40PankajMalarujjwal%401`

6. **Use that exact string in Vercel**

---

### Method B: From Connection Info Tab

1. In **Settings → Database**
2. Look for **"Connection info"** tab (at the top of the Database settings page)
3. You might see connection strings there
4. Look for pooling connection string

---

## Step 3: Alternative Pooling Formats to Try

If you can't find the exact format, try these variations:

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

### Format 4: Transaction mode (if Session mode doesn't work)
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

---

## Step 4: Verify Supabase Project Status

1. **Check if project is active**
   - In Supabase dashboard, check if project shows as "Active" (not paused)
   - Paused projects won't accept connections

2. **Check database password**
   - In Settings → Database
   - Verify the password is: `Dreams@PankajMalarujjwal@1`
   - If unsure, you can reset it (but then update all connection strings)

---

## Step 5: Check Connection Pooling is Enabled

1. In **Settings → Database → Connection Pooling**
2. Make sure connection pooling is **enabled** for your project
3. Some projects might not have pooling enabled

---

## Recommended Action Plan

1. **First:** Try the direct connection (Step 1) to verify database access
2. **Then:** Get the exact pooling format from Supabase UI (Step 2)
3. **If that doesn't work:** Try the alternative formats (Step 3)
4. **Verify:** Project status and pooling settings (Steps 4-5)

---

## Quick Test: What's Currently in Vercel?

Can you check what `DATABASE_URL` is currently set to in Vercel? That will help me see what format you're using.

---

## Most Important

**The Supabase dashboard will show you the exact connection string format.** That's the most reliable way to get it right. Go to Settings → Database → Connection Pooling and copy the exact format shown there.

