# Connection Pooling URL for Vercel

## Your Connection Pooling URL

Since direct connection (port 5432) isn't working with Vercel, use connection pooling (port 6543).

**Your pooling connection string:**

```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Note**: Replace `us-east-1` with your actual region if different.

---

## Find Your Region

1. Go to Supabase Dashboard
2. Click your **project name** (top left)
3. Go to **Project Settings**
4. Check **"Region"** - it will show your region

**Common regions:**
- `us-east-1` (US East - Virginia)
- `us-west-1` (US West - California)
- `ap-south-1` (Asia Pacific - Mumbai)
- `ap-southeast-1` (Asia Pacific - Singapore)
- `eu-west-1` (Europe - Ireland)
- `eu-central-1` (Europe - Frankfurt)

---

## Update Vercel

1. Go to: https://vercel.com/dashboard
2. Your **achieveyes-app** project
3. **Settings** → **Environment Variables**
4. Find `DATABASE_URL`
5. **Delete the old one** (with port 5432)
6. **Add new one**:

**Name**: `DATABASE_URL`
**Value**: 
```
postgresql://postgres.zxkzuesqlyivhtkuchwa:Dreams%40PankajMalarujjwal%401@aws-0-[YOUR-REGION].pooler.supabase.com:6543/postgres
```

Replace `[YOUR-REGION]` with your actual region.

7. **Environments**: All (Production, Preview, Development)
8. **Save**

---

## Key Differences

| Direct Connection (5432) | Pooling Connection (6543) |
|-------------------------|--------------------------|
| `postgres` | `postgres.zxkzuesqlyivhtkuchwa` |
| `db.zxkzuesqlyivhtkuchwa.supabase.co` | `aws-0-[REGION].pooler.supabase.com` |
| Port `5432` | Port `6543` |
| Can fail with serverless | Works better with serverless |

---

## After Updating

1. **Redeploy** in Vercel
2. Wait 2-3 minutes
3. Try signing up again

---

**This should fix the connection issue!**

