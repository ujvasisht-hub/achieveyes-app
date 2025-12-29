# DNS Setup Guide: app.achieveyes.com
## How to Get CNAME Value from Vercel and Add to GoDaddy

---

## Step 1: Save Domain in Vercel First

1. In the Vercel dashboard, you should see `app.achieveyes.com` with "Invalid Configuration"
2. Make sure:
   - **Domain**: `app.achieveyes.com` (should already be filled)
   - **Connect to an environment**: "Production" (should be selected)
3. Click **"Save"** button (bottom right of the expanded domain section)

---

## Step 2: View DNS Records After Saving

After clicking "Save", Vercel will show you the DNS records you need to add.

**Where to find it:**
1. After saving, the domain section will update
2. You should see a section that says something like:
   - "To configure this domain, add the following DNS record:"
   - Or "DNS Configuration"
   - Or it might show directly in the domain card

3. Look for a **CNAME record** with:
   - **Name/Host**: `app` (or `app.achieveyes.com`)
   - **Value/Target**: Something like `cname.vercel-dns.com` or `76b8c8c8-1234-5678-90ab-cdef12345678.vercel-dns.com`
   - **Type**: CNAME

**If you don't see it immediately:**
- Click on the domain name `app.achieveyes.com` to expand it
- Or refresh the page
- Or check if there's a "View DNS Records" or "DNS Configuration" link

---

## Step 3: Alternative - Check Vercel Domain Settings

If you still don't see the CNAME value:

1. Click on the domain `app.achieveyes.com` (if it's collapsed, click to expand)
2. Look for a section that says:
   - "DNS Configuration"
   - "Add this DNS record"
   - "Configure DNS"
3. You should see instructions like:
   ```
   Add a CNAME record:
   Name: app
   Value: cname.vercel-dns.com
   ```

---

## Step 4: Add CNAME Record in GoDaddy

Once you have the CNAME value from Vercel:

1. **Go to GoDaddy**
   - Login to your GoDaddy account
   - Go to: https://dcc.godaddy.com/manage/achieveyes.com/dns

2. **Add CNAME Record**
   - Click **"Add"** button (or "Add Record")
   - Select **Type**: `CNAME`
   - **Name/Host**: `app` (just "app", not "app.achieveyes.com")
   - **Value/Target**: Paste the CNAME value from Vercel
   - **TTL**: 600 (or leave default)
   - Click **"Save"**

3. **Wait for DNS Propagation**
   - DNS changes take 5-60 minutes
   - Vercel will automatically detect when DNS is configured
   - Status will change from "Invalid Configuration" to "Valid Configuration"

---

## What the CNAME Value Looks Like

The CNAME value from Vercel will look like one of these:
- `cname.vercel-dns.com`
- `76b8c8c8-1234-5678-90ab-cdef12345678.vercel-dns.com` (with your unique ID)
- Or a similar vercel-dns.com domain

---

## Troubleshooting

### Can't Find CNAME Value in Vercel?

1. **Make sure you clicked "Save"** after adding the domain
2. **Refresh the page** - sometimes it takes a moment to appear
3. **Click on the domain** to expand/collapse - it might be hidden
4. **Check the domain card** - look for any text that mentions "DNS" or "CNAME"
5. **Try removing and re-adding** the domain

### Still Can't See It?

**Alternative Method:**
1. In Vercel, go to your **Project Settings** (not domain settings)
2. Go to **Domains** tab
3. Click on `app.achieveyes.com`
4. There should be a section showing DNS records

**Or:**
- Vercel might show it in a notification/alert
- Check the top of the page for any messages
- Look for a "Configure DNS" button or link

---

## Quick Checklist

- [ ] Domain `app.achieveyes.com` added in Vercel
- [ ] Clicked "Save" in Vercel
- [ ] Found CNAME value from Vercel
- [ ] Added CNAME record in GoDaddy DNS
- [ ] Waited 5-60 minutes for DNS propagation
- [ ] Vercel shows "Valid Configuration"
- [ ] Test `app.achieveyes.com` in browser

---

**Next Step:** After you save the domain in Vercel, it should show you the CNAME value. If you still can't find it, let me know and I'll help you locate it!

