# Detailed Supabase Setup Guide - Step by Step

## Step 1: Access Supabase Dashboard

1. **Open your browser** and go to: https://app.supabase.com
2. **Log in** with your Supabase account credentials
3. You should see your **Projects** dashboard

---

## Step 2: Select or Create a Project

### If you already have a project:
- Click on your project name in the list

### If you need to create a new project:
1. Click the **"New Project"** button (usually green, top right)
2. Fill in the details:
   - **Name**: e.g., "dreams-app" or "goals-tracker"
   - **Database Password**: 
     - ⚠️ **IMPORTANT**: Create a strong password and **SAVE IT SOMEWHERE SAFE**
     - You'll need this password for the connection string
     - Example: `MySecurePass123!@#`
   - **Region**: Choose the region closest to you (e.g., "US East", "EU West")
3. Click **"Create new project"**
4. **Wait 2-3 minutes** for the project to be set up (you'll see a progress indicator)

---

## Step 3: Find the Connection String (DETAILED)

Once your project is ready, follow these exact steps:

### Method 1: From Settings (Recommended)

1. **Look at the left sidebar** - you should see a menu with icons
2. **Click on the "Settings" icon** (it looks like a gear/cog ⚙️)
   - It's usually at the bottom of the sidebar
   - Or look for "Settings" text in the menu
3. **In the Settings menu**, you'll see several options:
   - API
   - Database
   - Auth
   - Storage
   - etc.
4. **Click on "Database"** (it should be the second or third option)
5. **Scroll down** on the Database settings page
6. You'll see a section called **"Connection string"** or **"Connection pooling"**
7. **Look for tabs** - you should see:
   - **URI** (this is what you need!)
   - JDBC
   - Golang
   - etc.
8. **Click on the "URI" tab**
9. You'll see a connection string that looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijklmnop.supabase.co:5432/postgres
   ```
10. **Click the "Copy" button** next to it (or manually select and copy the entire string)

### Method 2: From Project Settings (Alternative)

1. Click on your **project name** at the top left
2. Select **"Project Settings"** from the dropdown
3. Go to **"Database"** in the left menu
4. Scroll to **"Connection string"**
5. Select **"URI"** tab
6. Copy the connection string

### Method 3: From API Settings (Another way)

1. Click **Settings** (gear icon) in left sidebar
2. Click **"API"** (first option usually)
3. Scroll down to find **"Database"** section
4. Look for connection string or database URL

---

## Step 4: Understanding the Connection String

Your connection string will look like this:
```
postgresql://postgres:YOUR_PASSWORD_HERE@db.abcdefghijklmnop.supabase.co:5432/postgres
```

**Breakdown:**
- `postgresql://` - Protocol
- `postgres` - Username (this is standard, don't change it)
- `YOUR_PASSWORD_HERE` - Your database password (replace this)
- `db.abcdefghijklmnop.supabase.co` - Your project hostname
- `5432` - Port (standard PostgreSQL port)
- `postgres` - Database name (standard, don't change)

**What you need to note:**
- The password (the part after `postgres:` and before `@`)
- The project reference (the part between `db.` and `.supabase.co`)

---

## Step 5: Create `.env.local` File

1. **Open your project folder** in your code editor (VS Code, Cursor, etc.)
2. **In the root directory** (`/Users/ujjwalvasisht/Desktop/dreams/`), create a new file
3. **Name it exactly**: `.env.local` (with the dot at the beginning)
4. **Copy and paste this template** into the file:

```env
# Database - Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD_HERE@db.YOUR_PROJECT_REF.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="PASTE_GENERATED_SECRET_HERE"

# Google OAuth (Optional - leave empty for now)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

5. **Replace the values:**
   - `YOUR_PASSWORD_HERE` → Your actual Supabase database password
   - `YOUR_PROJECT_REF` → The part between `db.` and `.supabase.co` in your connection string
   - `PASTE_GENERATED_SECRET_HERE` → Generate this (see Step 6)

**Example:**
If your connection string is:
```
postgresql://postgres:MyPass123@db.abcdefghijklmnop.supabase.co:5432/postgres
```

Your `.env.local` should have:
```env
DATABASE_URL="postgresql://postgres:MyPass123@db.abcdefghijklmnop.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
```

---

## Step 6: Generate NEXTAUTH_SECRET

1. **Open Terminal** (or Command Prompt on Windows)
2. **Navigate to your project directory:**
   ```bash
   cd /Users/ujjwalvasisht/Desktop/dreams
   ```
3. **Run this command:**
   ```bash
   openssl rand -base64 32
   ```
4. **Copy the output** (it will be a long random string)
5. **Paste it** as the value for `NEXTAUTH_SECRET` in your `.env.local` file

**Example output:**
```
aB3dE5fG7hI9jK1lM3nO5pQ7rS9tU1vW3xY5zA7bC9dE1fG3hI5jK7lM9nO1p=
```

---

## Step 7: Verify Your `.env.local` File

Your final `.env.local` should look something like this:

```env
DATABASE_URL="postgresql://postgres:MySecurePassword123@db.abcdefghijklmnop.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="aB3dE5fG7hI9jK1lM3nO5pQ7rS9tU1vW3xY5zA7bC9dE1fG3hI5jK7lM9nO1p="
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

**Important checks:**
- ✅ Connection string has `?pgbouncer=true&connection_limit=1` at the end
- ✅ Password is correct (no extra spaces)
- ✅ NEXTAUTH_SECRET is a long random string
- ✅ File is named exactly `.env.local` (with the dot)

---

## Step 8: Run Database Migrations

1. **Open Terminal** in your project directory
2. **Run this command:**
   ```bash
   npm run prisma:migrate
   ```
3. **You'll be prompted to name the migration** - type something like:
   ```
   init
   ```
   Then press Enter
4. **Wait for it to complete** - it should say:
   ```
   ✔ Migration applied successfully
   ```

**If you see errors:**
- Check that your `.env.local` file exists and is in the root directory
- Verify your `DATABASE_URL` is correct
- Make sure your Supabase project is active (not paused)

---

## Step 9: Start the Development Server

1. **In the same terminal**, run:
   ```bash
   npm run dev
   ```
2. **Wait for it to start** - you should see:
   ```
   ▲ Next.js 16.1.1
   - Local:        http://localhost:3000
   ```
3. **Open your browser** and go to: http://localhost:3000
4. **You should see** the sign-in page of your Dreams app!

---

## Step 10: Test the Setup

1. **Click "Sign Up"** or the sign-up link
2. **Create a test account:**
   - Enter an email
   - Enter a password
   - Enter your name
3. **Click "Sign Up"**
4. **You should be redirected** to the dashboard
5. **Try creating a goal** to test everything works

---

## 🆘 Troubleshooting

### "Can't find Connection String"
- Make sure you're in **Settings → Database** (not API or Auth)
- Scroll down - it's usually at the bottom of the Database settings page
- Look for tabs: **URI**, JDBC, Golang - click on **URI**

### "Connection refused" error
- Check your password is correct (no extra spaces)
- Verify your project is active (not paused in Supabase)
- Make sure you copied the entire connection string

### "Migration failed"
- Ensure `.env.local` is in the project root directory
- Check that `DATABASE_URL` starts with `postgresql://`
- Verify the connection string has the password included

### "Module not found"
- Run `npm install` first
- Make sure you're in the correct directory

---

## ✅ Final Checklist

Before running migrations, verify:
- [ ] I have my Supabase connection string
- [ ] I know my database password
- [ ] I created `.env.local` file in the project root
- [ ] I replaced `YOUR_PASSWORD_HERE` with my actual password
- [ ] I replaced `YOUR_PROJECT_REF` with my project reference
- [ ] I generated and added `NEXTAUTH_SECRET`
- [ ] The connection string ends with `?pgbouncer=true&connection_limit=1`

---

## 📸 Visual Guide (What to Look For)

When you're in **Settings → Database**, you should see:

```
┌─────────────────────────────────────┐
│ Database Settings                   │
├─────────────────────────────────────┤
│ Connection string                   │
│ ┌─────────────────────────────────┐ │
│ │ [URI] [JDBC] [Golang] [Node.js] │ │ ← Click URI tab
│ ├─────────────────────────────────┤ │
│ │ postgresql://postgres:...       │ │ ← This is what you need
│ │ [Copy] button                    │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## Need More Help?

If you're still stuck:
1. **Take a screenshot** of your Supabase Settings → Database page
2. **Describe exactly** what you see (or don't see)
3. I can help you locate it!

The connection string is definitely there - it's just sometimes in a different location depending on your Supabase dashboard version.



