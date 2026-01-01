# How to Find Connection Pooling String in Supabase

## The String You Have is NOT Pooling

The string you have:
```
postgresql://postgres:%40PankajMalarujjwal%401@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres
```

**Issues:**
- ❌ Port `5432` = Direct connection (NOT pooling)
- ❌ Password incomplete (missing "Dreams")
- ❌ Host format is for direct connection

**Pooling should have:**
- ✅ Port `6543`
- ✅ Host like `aws-0-[REGION].pooler.supabase.com` or `[PROJECT].pooler.supabase.com`

---

## Step-by-Step: Find Connection Pooling String

### Method 1: From Database Settings (Recommended)

1. **In Supabase Dashboard**
   - Click **"Settings"** (gear icon) in the left sidebar
   - Click **"Database"** under CONFIGURATION section

2. **Scroll Down to "Connection Pooling"**
   - You should see a section called **"Connection Pooling"**
   - It will show different modes: **Session mode**, **Transaction mode**

3. **Look for Connection String**
   - Under each mode, you should see a connection string
   - It might be labeled as **"Connection string"**, **"URI"**, or **"Connection info"**
   - The format should be:
     ```
     postgresql://postgres.zxkzuesqlyivhtkuchwa:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
     ```
   - **Notice:** Port is `6543` (not 5432)

4. **Copy That Exact Format**
   - Replace `[YOUR-PASSWORD]` with: `Dreams%40PankajMalarujjwal%401`
   - Use that in Vercel

---

### Method 2: From Connection Info Tab

1. In **Settings → Database**
2. Look for tabs at the top: **"Connection info"**, **"Connection pooling"**, etc.
3. Click on **"Connection pooling"** tab
4. You should see the pooling connection strings there

---

### Method 3: Check if Pooling is Enabled

1. In **Settings → Database → Connection Pooling**
2. Make sure connection pooling is **enabled** for your project
3. Some projects might need to enable it first

---

## What the Pooling String Should Look Like

**Correct format examples:**

### Format 1: With region
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Format 2: With project reference in host
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@zxkzuesqlyivhtkuchwa.pooler.supabase.com:6543/postgres
```

**Key differences from direct connection:**
- ✅ Port: `6543` (not 5432)
- ✅ Host: `pooler.supabase.com` (not `db.xxx.supabase.co`)
- ✅ Username might be: `postgres.zxkzuesqlyivhtkuchwa` (with project reference)

---

## If You Can't Find Pooling String

1. **Check if pooling is enabled:**
   - Go to Settings → Database
   - Look for "Connection Pooling" section
   - If it's not there, your project might not have pooling enabled

2. **Alternative: Use Transaction Mode**
   - Some projects show "Transaction mode" instead of "Session mode"
   - Try that connection string

3. **Contact Supabase Support:**
   - If pooling isn't available, you might need to enable it
   - Or check your Supabase plan (pooling might be a paid feature)

---

## Quick Action

1. Go to **Settings → Database** in Supabase
2. Scroll to **"Connection Pooling"** section
3. Find the connection string with port **6543**
4. Copy it and replace password with: `Dreams%40PankajMalarujjwal%401`
5. Use that in Vercel

---

## Important Notes

- **Port 5432** = Direct connection (often blocked by IP restrictions)
- **Port 6543** = Connection pooling (designed for serverless/Vercel)
- **Password must be URL-encoded:** `Dreams%40PankajMalarujjwal%401`
- **Pooling host format:** `pooler.supabase.com` (not `db.xxx.supabase.co`)

