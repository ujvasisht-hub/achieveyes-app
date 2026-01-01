# Find Region or Use Default Pooling URL

## Region Not Visible? No Problem!

The region might not be shown in General settings. Here are ways to find it or use a default:

---

## Method 1: Check Database Connection String

Your direct connection string already has a clue:
```
db.zxkzuesqlyivhtkuchwa.supabase.co
```

The region is usually in the **pooling URL**, not the direct connection. But we can try common regions.

---

## Method 2: Try Common Regions

Most Supabase projects use these regions. Try them in order:

### Option 1: US East (Most Common)
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Option 2: Asia Pacific - Mumbai
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
```

### Option 3: Europe - Ireland
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
```

---

## Method 3: Check Database Settings

1. In Supabase, go to **Settings** → **Database** (in the left sidebar under CONFIGURATION)
2. Look for **"Connection Pooling"** section
3. The pooling connection string should show the region in the URL
4. It will be in the format: `aws-0-[REGION].pooler.supabase.com`

---

## Method 4: Check Project Creation Email

When you created the Supabase project, the confirmation email might mention the region.

---

## Method 5: Use Direct Connection with Different Format

If pooling doesn't work, try the direct connection with a different format:

```
postgresql://postgres:Dreams%40PankajMalarujjwal%401@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres?sslmode=require
```

---

## Recommended: Try US East First

**Most likely your region is `us-east-1`**. Try this first:

1. Go to Vercel → Settings → Environment Variables
2. Update `DATABASE_URL` to:
   ```
   postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
3. Redeploy
4. Test sign-up

If it doesn't work, try the other regions above.

---

## Alternative: Check Connection Pooling Section

1. In Supabase: **Settings** → **Database** (click "Database" in left sidebar)
2. Scroll down to **"Connection Pooling"** section
3. You should see connection strings there with the region visible

---

**Try US East first - it's the most common region!**

