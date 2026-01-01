# How to Get Your DATABASE_URL
## It's Different from Project URL!

**Project URL** (what you have): `https://zxkzuesqlyivhtkuchwa.supabase.co`
- This is for the web dashboard
- NOT the same as DATABASE_URL

**DATABASE_URL** (what you need): `postgresql://postgres:PASSWORD@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres`
- This is a PostgreSQL connection string
- Used by your app to connect to the database

---

## Step-by-Step: Get Your DATABASE_URL

### Step 1: Go to Supabase Dashboard

1. Visit: https://app.supabase.com
2. Log in to your account
3. Select your project (the one with reference: `zxkzuesqlyivhtkuchwa`)

### Step 2: Navigate to Database Settings

1. In the left sidebar, click **Settings** (gear icon)
2. Click **Database** in the settings menu

### Step 3: Find Connection String

1. Scroll down to find **"Connection string"** section
2. You'll see tabs: **URI**, **JDBC**, **Golang**, etc.
3. Click on **"URI"** tab
4. You'll see a connection string that looks like:

```
postgresql://postgres:[YOUR-PASSWORD]@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres
```

### Step 4: Copy the Connection String

1. Click the **"Copy"** button next to the connection string
2. **OR** manually select and copy the entire string
3. **Important**: The string includes `[YOUR-PASSWORD]` - you need to replace this with your actual database password!

---

## What Your DATABASE_URL Should Look Like

Based on your project reference (`zxkzuesqlyivhtkuchwa`), your DATABASE_URL will be:

```
postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres
```

**Replace `YOUR_ACTUAL_PASSWORD`** with the password you set when creating the Supabase project.

---

## If You Don't Remember Your Password

1. Go to Supabase Dashboard
2. **Settings** → **Database**
3. Scroll to **Database Password** section
4. Click **"Reset Database Password"**
5. Enter a new password (save it!)
6. Wait for password reset to complete
7. Get the new connection string and replace `[YOUR-PASSWORD]` with your new password

---

## For Vercel (Recommended: Use Connection Pooling)

Instead of direct connection, use **Connection Pooling** for better serverless performance:

1. In Supabase: **Settings** → **Database**
2. Scroll to **"Connection Pooling"** section
3. Select **"Session mode"**
4. Copy the connection string (it will have port **6543** instead of 5432)

It will look like:
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**This is better for Vercel/serverless!**

---

## Quick Reference

| What | Value |
|------|-------|
| **Project URL** | `https://zxkzuesqlyivhtkuchwa.supabase.co` |
| **Project Reference** | `zxkzuesqlyivhtkuchwa` |
| **Database Host** | `db.zxkzuesqlyivhtkuchwa.supabase.co` |
| **Direct Port** | `5432` |
| **Pooling Port** | `6543` (recommended) |

---

## Next Steps

1. Get your connection string from Supabase
2. Replace `[YOUR-PASSWORD]` with your actual password
3. If password has special characters, URL-encode them
4. Add to Vercel as `DATABASE_URL` environment variable
5. Redeploy

---

**The key difference**: Project URL is for the web interface, DATABASE_URL is a PostgreSQL connection string that includes your password!

