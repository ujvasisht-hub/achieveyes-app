# Troubleshoot Database Connection Issue

## You've Added DATABASE_URL to Vercel, But Still Getting Error

Let's check these common issues:

---

## Issue 1: Not Redeployed After Adding Environment Variable

**Fix:**
1. Go to Vercel Dashboard → Your Project
2. Go to **Deployments** tab
3. Find your latest deployment
4. Click **three dots** (⋯) → **Redeploy**
5. Wait 2-3 minutes for deployment to complete
6. Try signing up again

**OR** trigger a new deployment:
```bash
cd /Users/ujjwalvasisht/Desktop/dreams
git commit --allow-empty -m "Redeploy with database URL"
git push
```

---

## Issue 2: Supabase Project is Paused

**Check:**
1. Go to: https://app.supabase.com
2. Check if your project shows as **"Active"** (green) or **"Paused"** (gray)
3. If paused, click **"Restore"** to activate it
4. Wait 1-2 minutes for it to fully activate

---

## Issue 3: Direct Connection (Port 5432) Not Working with Serverless

**Solution: Use Connection Pooling Instead**

Direct connections (port 5432) can have issues with Vercel/serverless. Use connection pooling:

1. Go to Supabase: **Settings** → **Database**
2. Scroll to **"Connection Pooling"**
3. Select **"Session mode"**
4. Copy the connection string (port will be **6543**)

It will look like:
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

5. Update `DATABASE_URL` in Vercel with this pooling URL
6. Redeploy

---

## Issue 4: Password Encoding Issue

Your password: `Dreams@PankajMalarujjwal@1`
Encoded: `Dreams%40PankajMalarujjwal%401`

**Verify:**
- `@` should be `%40` ✓ (you have this)
- Make sure there are no extra spaces
- Make sure the entire string is on one line

---

## Issue 5: Check Vercel Logs

1. Go to Vercel Dashboard → Your Project
2. Go to **Deployments** tab
3. Click on your latest deployment
4. Click **"Functions"** tab
5. Look for any error messages
6. Check the logs for database connection errors

---

## Issue 6: Environment Variable Not Applied

**Verify:**
1. In Vercel: **Settings** → **Environment Variables**
2. Make sure `DATABASE_URL` shows the correct value
3. Make sure all environments are checked (Production, Preview, Development)
4. If you just added it, you MUST redeploy for it to take effect

---

## Quick Test: Try Connection Pooling

Since you're using Vercel (serverless), connection pooling is more reliable:

1. **Get Pooling URL from Supabase:**
   - Settings → Database → Connection Pooling
   - Session mode
   - Copy the connection string

2. **Update in Vercel:**
   - Replace `DATABASE_URL` with the pooling URL
   - Make sure password is still encoded: `Dreams%40PankajMalarujjwal%401`

3. **Redeploy**

---

## Most Likely Fix

**Try Connection Pooling** - This is the most common solution for Vercel/serverless:

1. Get pooling URL from Supabase (port 6543)
2. Update `DATABASE_URL` in Vercel
3. Redeploy
4. Test sign-up

---

## Still Not Working?

Check these:
- [ ] Supabase project is Active (not paused)
- [ ] DATABASE_URL is set in Vercel
- [ ] Redeployed after adding/updating DATABASE_URL
- [ ] Using connection pooling (port 6543) instead of direct (port 5432)
- [ ] Password is correctly URL-encoded
- [ ] Checked Vercel logs for specific error messages

