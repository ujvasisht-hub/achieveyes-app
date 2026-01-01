# Fix: Can't Reach Database Server

## Error: "Can't reach database server"

This means Vercel can't connect to your Supabase database. Common causes:

1. **Database is paused** (most common on free tier)
2. **IP restrictions** blocking Vercel
3. **Connection string format** issue
4. **Database needs to be restarted**

---

## Step 1: Check if Database is Active

1. **Go to Supabase Dashboard**
   - https://app.supabase.com
   - Select project: `zxkzuesqlyivhtkuchwa`

2. **Check Project Status**
   - Look at the top of the dashboard
   - Does it say **"Active"** or **"Paused"**?
   - If it says **"Paused"**, click **"Resume"** or **"Restore"** button

3. **If Database is Paused:**
   - Free tier projects pause after inactivity
   - Click **"Resume"** or **"Restore"** to wake it up
   - Wait 1-2 minutes for it to fully start
   - Then try again

---

## Step 2: Check IP Restrictions

1. **In Supabase Dashboard**
   - Go to **Settings** → **Database**
   - Scroll to **"Connection Pooling"** or **"Network Restrictions"**

2. **Check IP Allowlist**
   - Look for **"IP Allowlist"** or **"Network Access"**
   - For Vercel, you typically need to:
     - **Allow all IPs** (0.0.0.0/0) OR
     - **Disable IP restrictions** for connection pooling

3. **For Connection Pooling:**
   - Pooling (port 6543) usually doesn't require IP allowlist
   - Direct connections (port 5432) often do

---

## Step 3: Use Connection Pooling (Recommended for Vercel)

**Direct connections (port 5432) often don't work with Vercel** due to IP restrictions. **Connection pooling (port 6543) is designed for serverless environments like Vercel.**

### Get the Exact Pooling Connection String:

1. **In Supabase Dashboard**
   - Go to **Settings** → **Database**
   - Scroll to **"Connection Pooling"** section

2. **Find "Session mode"**
   - Look for **"Connection string"** or **"URI"**
   - It should show something like:
     ```
     postgresql://postgres.zxkzuesqlyivhtkuchwa:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
     ```

3. **Copy the exact format**
   - Replace `[YOUR-PASSWORD]` with: `Dreams%40PankajMalarujjwal%401`
   - Use that in Vercel

---

## Step 4: Alternative - Try Transaction Mode

If Session mode doesn't work, try **Transaction mode**:

1. In **Connection Pooling** section
2. Look for **"Transaction mode"** connection string
3. Copy that format
4. Replace password
5. Use in Vercel

---

## Step 5: Verify Connection String Format

Make sure the connection string has:
- ✅ Correct password encoding: `Dreams%40PankajMalarujjwal%401`
- ✅ Correct port: `6543` for pooling, `5432` for direct
- ✅ Correct host format
- ✅ No extra spaces or characters

---

## Step 6: Restart Database (If Needed)

If the database is paused:

1. **In Supabase Dashboard**
   - Click on your project
   - Look for **"Paused"** status
   - Click **"Resume"** or **"Restore"**
   - Wait 1-2 minutes

2. **Then try connection again**

---

## Recommended Solution

**Use Connection Pooling (port 6543)** - it's designed for Vercel/serverless:

1. Get the exact pooling connection string from Supabase UI
2. Update Vercel with that string
3. This should work even if direct connection doesn't

---

## Quick Action Items

1. ✅ **Check if database is paused** - Resume if needed
2. ✅ **Get pooling connection string** from Supabase UI
3. ✅ **Update Vercel** with pooling string (port 6543)
4. ✅ **Redeploy and test**

---

## If Database is Paused

**Free tier Supabase projects pause after 7 days of inactivity.**

To resume:
1. Go to Supabase Dashboard
2. Click on your project
3. Click **"Resume"** or **"Restore"**
4. Wait 1-2 minutes
5. Try connection again

