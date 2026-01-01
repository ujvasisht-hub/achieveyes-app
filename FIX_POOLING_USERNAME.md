# Fix: Tenant or User Not Found Error

## Error: "Tenant or user not found"

This means the username format in the pooling URL is incorrect. The format I gave you might be wrong.

---

## Correct Format for Connection Pooling

The username format for pooling is different. Let's get it from Supabase directly.

---

## Step 1: Get Exact Connection String from Supabase

1. Go to Supabase Dashboard
2. **Settings** → **Database** (click "Database" in left sidebar under CONFIGURATION)
3. Scroll down to **"Connection Pooling"** section
4. You should see different connection modes
5. Look for **"Session mode"** or **"Transaction mode"**
6. **Copy the exact connection string** shown there
7. It will have `[YOUR-PASSWORD]` placeholder - replace it with your encoded password: `Dreams%40PankajMalarujjwal%401`

---

## Step 2: Alternative - Try Different Username Format

The username might need to be just `postgres` instead of `postgres.zxkzuesqlyivhtkuchwa`.

Try this format:
```
postgresql://postgres:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**OR** with project reference in host:
```
postgresql://postgres:Dreams%40PankajMalarujjwal%401@zxkzuesqlyivhtkuchwa.pooler.supabase.com:6543/postgres
```

---

## Step 3: Check Supabase Connection Pooling Page

1. In Supabase: **Settings** → **Database**
2. Scroll to **"Connection Pooling"**
3. You should see connection strings displayed
4. The format shown there is the correct one
5. Copy it exactly and just replace the password

---

## Most Likely Fix

The username should probably be just `postgres`, not `postgres.zxkzuesqlyivhtkuchwa`.

Try this in Vercel:
```
postgresql://postgres:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## If That Doesn't Work

Go to Supabase → Settings → Database → Connection Pooling and copy the exact format shown there. The UI will show you the correct format.

