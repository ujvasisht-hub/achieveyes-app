# Supabase Setup Checklist

## ✅ What You Need to Do

### Step 1: Get Your Supabase Connection String (5 minutes)

1. **Go to Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Log in with your account

2. **Select or Create a Project**
   - If you have a project, select it
   - If not, click "New Project"
     - Choose your organization
     - Enter project name (e.g., "dreams-app")
     - Enter database password (⚠️ **SAVE THIS PASSWORD** - you'll need it!)
     - Choose a region (closest to you)
     - Click "Create new project"
     - Wait 2-3 minutes for setup to complete

3. **Get Connection String**
   - In your project dashboard, go to **Settings** (gear icon in left sidebar)
   - Click **Database** in the settings menu
   - Scroll down to **Connection string** section
   - Select **URI** tab (not "JDBC" or "Golang")
   - You'll see something like:
     ```
     postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
     ```
   - **Copy this entire string** (it includes your password)

### Step 2: Create `.env.local` File (2 minutes)

1. **Create the file**
   - In your project root (`/Users/ujjwalvasisht/Desktop/dreams/`)
   - Create a new file named `.env.local`
   - (If it already exists, open it)

2. **Add your configuration**
   ```env
   # Database - Supabase PostgreSQL
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
   
   # NextAuth Configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-a-random-secret-here"
   
   # Google OAuth (Optional - leave empty if not using)
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   ```

3. **Replace the values:**
   - `[YOUR-PASSWORD]` → Your Supabase database password
   - `[YOUR-PROJECT-REF]` → Your project reference (the xxxxx part in the connection string)
   - `generate-a-random-secret-here` → Generate a secure secret (see below)

4. **Generate NEXTAUTH_SECRET**
   - Open terminal and run:
     ```bash
     openssl rand -base64 32
     ```
   - Copy the output and paste it as your `NEXTAUTH_SECRET` value

### Step 3: Run Database Migrations (1 minute)

Once your `.env.local` is set up, run:

```bash
npm run prisma:migrate
```

This will:
- Create all necessary tables in your Supabase database
- Set up the schema for users, goals, habits, check-ins, etc.

**If you see any errors**, check:
- Is your `DATABASE_URL` correct?
- Is your Supabase project active?
- Did you copy the entire connection string?

### Step 4: Start the Development Server (1 minute)

```bash
npm run dev
```

Then open: http://localhost:3000

## ✅ Quick Checklist

- [ ] Created/selected Supabase project
- [ ] Got connection string from Supabase Dashboard → Settings → Database
- [ ] Created `.env.local` file in project root
- [ ] Added `DATABASE_URL` with your Supabase connection string
- [ ] Generated and added `NEXTAUTH_SECRET` (using `openssl rand -base64 32`)
- [ ] Ran `npm run prisma:migrate` successfully
- [ ] Started dev server with `npm run dev`
- [ ] Opened http://localhost:3000 and can see the app

## 🔍 Example `.env.local` File

Here's what your file should look like (with your actual values):

```env
DATABASE_URL="postgresql://postgres:MySecurePassword123@db.abcdefghijklmnop.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="aB3dE5fG7hI9jK1lM3nO5pQ7rS9tU1vW3xY5zA7bC9dE1fG3hI5jK7lM9nO1p="
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

## ⚠️ Important Notes

1. **Never commit `.env.local` to Git** - It contains sensitive information
2. **Save your database password** - You'll need it for the connection string
3. **The connection string includes your password** - Keep it secure
4. **Use `pgbouncer=true`** - This enables connection pooling (important for Supabase)

## 🆘 Troubleshooting

### "Connection refused" or "Authentication failed"
- Check your database password is correct
- Make sure you copied the entire connection string
- Verify your Supabase project is active

### "Migration failed"
- Ensure your `.env.local` file is in the project root
- Check that `DATABASE_URL` is set correctly
- Try running `npm run prisma:generate` first, then `npm run prisma:migrate`

### "Module not found" errors
- Run `npm install` to ensure all dependencies are installed
- Make sure you're in the project directory

## 🎉 Once Everything Works

You should be able to:
1. Visit http://localhost:3000
2. See the sign-in page
3. Create an account
4. Start creating goals!

Let me know once you've completed these steps and we can test everything together!



