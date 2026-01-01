# How to Get Connection Pooling String from Supabase

## You're on the Configuration Page - You Need the Connection String Page

The page you're on shows **settings** (pool size, etc.), but you need the **connection string** itself.

---

## Step-by-Step: Get Connection Pooling String

### Step 1: Go Back to Database Settings

1. In Supabase, click **Settings** (gear icon) in the left sidebar
2. Click **Database** in the settings menu
3. You should see multiple sections

### Step 2: Find "Connection Pooling" Section

1. Scroll down past the "Connection string" section
2. Look for **"Connection Pooling"** section
3. You'll see tabs or modes: **"Session mode"**, **"Transaction mode"**, etc.

### Step 3: Select Session Mode

1. Click on **"Session mode"** (or the first option)
2. You should see a connection string appear
3. It will look like:
   ```
   postgresql://postgres.zxkzuesqlyivhtkuchwa:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

### Step 4: Copy the Connection String

1. Click the **"Copy"** button next to the connection string
2. **OR** manually select and copy it
3. **Important**: Replace `[YOUR-PASSWORD]` with your actual password (URL-encoded)

---

## Alternative: If You Don't See Connection String

### Method 1: Check Connection Info Tab

1. In **Settings** → **Database**
2. Look for **"Connection Info"** or **"Connection Details"** section
3. You might see pooling information there

### Method 2: Use the Pattern

If you can't find it, you can construct it manually:

**Format:**
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:YOUR_ENCODED_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Your values:**
- Project reference: `zxkzuesqlyivhtkuchwa`
- Password (encoded): `Dreams%40PankajMalarujjwal%401`
- Region: Usually `us-east-1` (check your project settings)

**Your connection string would be:**
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Note**: Replace `us-east-1` with your actual region if different.

---

## Find Your Region

1. In Supabase Dashboard
2. Click on your **project name** (top left)
3. Go to **Project Settings**
4. Check **"Region"** - it will show your region (e.g., `us-east-1`, `ap-south-1`, etc.)

---

## Quick Reference

| What | Value |
|------|-------|
| **Host Pattern** | `aws-0-[REGION].pooler.supabase.com` |
| **Port** | `6543` (always for pooling) |
| **Username** | `postgres.zxkzuesqlyivhtkuchwa` |
| **Password** | `Dreams%40PankajMalarujjwal%401` (your encoded password) |
| **Database** | `postgres` |

---

## If Still Can't Find It

**Use Direct Connection** (what you already have):
```
postgresql://postgres:Dreams%40PankajMalarujjwal%401@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
```

This should work! The issue might be:
1. Not redeployed after adding to Vercel
2. Supabase project is paused
3. Network/firewall issue

Try redeploying first with your current connection string.

