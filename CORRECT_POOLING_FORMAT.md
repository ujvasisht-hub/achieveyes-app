# Correct Connection Pooling Format

## The Issue: "Tenant or user not found"

The username for Supabase connection pooling **must include the project reference**.

---

## Correct Format

For Supabase connection pooling, the username should be:
```
postgres.[PROJECT-REF]
```

NOT just `postgres`

---

## Try This in Vercel

Update your `DATABASE_URL` in Vercel to:

```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Key difference:** Username is `postgres.zxkzuesqlyivhtkuchwa` (with project reference), not just `postgres`.

---

## Alternative: Get Exact Format from Supabase

1. **Go to Supabase Dashboard**
   - https://app.supabase.com
   - Select project: `zxkzuesqlyivhtkuchwa`

2. **Settings → Database**
   - Click "Settings" (gear icon) in left sidebar
   - Click "Database" under CONFIGURATION

3. **Connection Pooling Section**
   - Scroll to "Connection Pooling"
   - Look for **"Session mode"** connection string
   - It should show the exact format with username like `postgres.zxkzuesqlyivhtkuchwa`
   - Copy that exact format
   - Replace `[YOUR-PASSWORD]` with: `Dreams%40PankajMalarujjwal%401`

4. **Use that exact string in Vercel**

---

## Quick Fix: Try This Now

**In Vercel Environment Variables, update `DATABASE_URL` to:**

```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

Then **redeploy** and test sign-up again.

---

## If That Still Doesn't Work

The region might be wrong. Try these alternative regions:

### US East (N. Virginia)
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### US West (Oregon)
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

### EU West (Ireland)
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
```

---

## Most Reliable: Get It From Supabase UI

The Supabase dashboard will show you the **exact format** with the correct:
- Username format
- Host format
- Region

**That's the most reliable way to get it right.**

