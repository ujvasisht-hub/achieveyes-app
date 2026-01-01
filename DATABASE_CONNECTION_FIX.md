# Fix Database Connection Error

## Error
```
Can't reach database server at `db.zxkzuesqlyivhtkuchwa.supabase.co:5432`
```

## Solution: Check Vercel Environment Variables

The database connection is failing because the `DATABASE_URL` in Vercel is either:
1. Not set
2. Incorrect
3. Using wrong format

---

## Step 1: Get Your Supabase Connection String

1. Go to: https://app.supabase.com
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll down to **Connection string**
5. Select **URI** tab
6. Copy the connection string

It should look like:
```
postgresql://postgres:[YOUR-PASSWORD]@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres
```

---

## Step 2: Update Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Find your **achieveyes-app** project
3. Go to **Settings** → **Environment Variables**
4. Find `DATABASE_URL`
5. Click **Edit** (or delete and recreate)

### For Production:
- **Name**: `DATABASE_URL`
- **Value**: Your Supabase connection string
- **Format**: 
  ```
  postgresql://postgres:[PASSWORD]@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
  ```
- **Important**: Replace `[PASSWORD]` with your actual database password
- **Environments**: Check all (Production, Preview, Development)

6. Click **Save**

---

## Step 3: Important Notes

### Password Encoding
If your password has special characters, they need to be URL-encoded:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- `&` becomes `%26`
- `+` becomes `%2B`
- `=` becomes `%3D`

### Connection Pooling
For Vercel/serverless, use the **Connection Pooling** URL:
- Go to Supabase → Settings → Database
- Use the **Connection Pooling** section
- Port should be **6543** (not 5432)
- Format: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`

---

## Step 4: Redeploy

After updating the environment variable:

1. Go to Vercel Dashboard
2. Find your latest deployment
3. Click **Redeploy** (or it will auto-redeploy on next push)

---

## Step 5: Verify Database is Running

1. Go to Supabase Dashboard
2. Check if your project is **Active**
3. If paused, click **Restore** to activate it

---

## Alternative: Direct Connection (If Pooling Doesn't Work)

If connection pooling doesn't work, try direct connection:

```
postgresql://postgres:[PASSWORD]@db.zxkzuesqlyivhtkuchwa.supabase.co:5432/postgres
```

**Note**: Direct connections may have rate limits on free tier.

---

## Quick Checklist

- [ ] Supabase project is active
- [ ] DATABASE_URL is set in Vercel
- [ ] Password is correct (and URL-encoded if needed)
- [ ] Connection string format is correct
- [ ] All environments are selected (Production, Preview, Development)
- [ ] Redeployed after updating environment variable

---

## Still Not Working?

1. **Check Supabase Status**: Make sure your project isn't paused
2. **Verify Password**: Try resetting your database password in Supabase
3. **Check IP Restrictions**: Supabase Pro should allow all IPs, but verify in Settings
4. **Test Connection**: Try connecting with a database client to verify credentials

---

**Most Common Issue**: The `DATABASE_URL` in Vercel doesn't match your Supabase connection string, or the password is incorrect.

