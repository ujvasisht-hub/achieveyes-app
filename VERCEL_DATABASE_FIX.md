# Fix Database Connection in Vercel
## Error: Can't reach database server

This error means Vercel can't connect to your Supabase database. Here's how to fix it:

---

## Step 1: Verify Supabase Project is Active

1. Go to: https://app.supabase.com
2. Check if your project shows as **"Active"** (not paused)
3. If paused, click **"Restore"** to activate it
4. Wait 1-2 minutes for it to fully activate

---

## Step 2: Get Correct Connection String

### Option A: Direct Connection (Try This First)

1. Go to Supabase Dashboard → Your Project
2. **Settings** → **Database**
3. Scroll to **Connection string**
4. Select **URI** tab
5. Copy the connection string

It will look like:
```
postgresql://postgres:YOUR_PASSWORD@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres
```

### Option B: Connection Pooling (Recommended for Vercel)

1. Go to Supabase Dashboard → Your Project
2. **Settings** → **Database**
3. Scroll to **Connection Pooling**
4. Select **Session mode**
5. Copy the connection string (port will be **6543**, not 5432)

It will look like:
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Note**: Connection pooling is better for serverless/Vercel because it handles connection limits better.

---

## Step 3: URL Encode Password (If Needed)

If your password has special characters, encode them:

- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`
- `/` → `%2F`
- `?` → `%3F`
- `:` → `%3A`

**Example:**
- Password: `My@Pass#123`
- Encoded: `My%40Pass%23123`

---

## Step 4: Update Vercel Environment Variable

1. Go to: https://vercel.com/dashboard
2. Find your **achieveyes-app** project
3. Click **Settings** (gear icon)
4. Click **Environment Variables** (left sidebar)
5. Find `DATABASE_URL`:
   - If it exists: Click **Edit** (pencil icon)
   - If it doesn't exist: Click **Add New**

6. **Set the value:**
   - **Name**: `DATABASE_URL`
   - **Value**: Paste your connection string (from Step 2)
   - **For direct connection**, add query params:
     ```
     postgresql://postgres:YOUR_PASSWORD@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
     ```
   - **For pooling** (recommended), use as-is:
     ```
     postgresql://postgres.zxkzuesqlyivhtkuchwa:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
     ```

7. **Select Environments:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

8. Click **Save**

---

## Step 5: Redeploy

After updating the environment variable:

1. Go to **Deployments** tab in Vercel
2. Find your latest deployment
3. Click the **three dots** (⋯) menu
4. Click **Redeploy**
5. Wait for deployment to complete (2-3 minutes)

**OR** just push a new commit to trigger auto-deployment:
```bash
cd /Users/ujjwalvasisht/Desktop/dreams
git commit --allow-empty -m "Trigger redeploy for database fix"
git push
```

---

## Step 6: Verify Connection

After redeploying:

1. Try signing up again
2. If it still fails, check Vercel logs:
   - Go to your deployment
   - Click **Functions** tab
   - Check for any error messages

---

## Troubleshooting

### Still Not Working?

1. **Check Supabase Project Status**
   - Make sure project is **Active**
   - Check if there are any warnings in Supabase dashboard

2. **Verify Password**
   - Try resetting your database password in Supabase
   - Go to **Settings** → **Database** → **Reset Database Password**
   - Update Vercel with new password

3. **Test Connection Locally**
   - Update `.env.local` with the same connection string
   - Run `npm run dev` locally
   - Try signing up - if it works locally, the issue is Vercel config

4. **Check IP Restrictions**
   - Supabase Pro should allow all IPs
   - But verify in **Settings** → **Database** → **Network Restrictions**

5. **Use Connection Pooling**
   - Direct connections (port 5432) can have issues with serverless
   - Switch to connection pooling (port 6543) - it's more reliable

---

## Quick Test

To verify your connection string is correct, you can test it:

1. Copy your connection string
2. Try connecting with a database client (like pgAdmin, DBeaver, or TablePlus)
3. If it connects, the string is correct
4. If it doesn't, check password and project status

---

## Most Likely Issues

1. **Password not set in Vercel** - Most common
2. **Password needs URL encoding** - If it has special characters
3. **Using wrong connection string** - Direct vs Pooling
4. **Project is paused** - Check Supabase dashboard
5. **Environment variable not saved** - Make sure you clicked Save

---

**After updating DATABASE_URL in Vercel and redeploying, the connection should work!**

