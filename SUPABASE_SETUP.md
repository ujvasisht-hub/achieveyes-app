# Supabase Setup Instructions

## Step 1: Get Your Supabase Connection String

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project (or create a new one)
3. Go to **Settings** → **Database**
4. Scroll down to **Connection string**
5. Select **URI** format
6. Copy the connection string (it will look like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```

## Step 2: Update Your .env.local File

1. Create or update `.env.local` in the root of your project
2. Add your Supabase connection string:
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
   ```
   
   **Important:** Replace `[YOUR-PASSWORD]` with your actual database password and `[YOUR-PROJECT-REF]` with your project reference.

3. Add your NextAuth configuration:
   ```env
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
   ```

   **Generate a secure NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

4. (Optional) Add Google OAuth credentials if you want Google sign-in

## Step 3: Run Database Migrations

After setting up your `.env.local` file:

```bash
npm run prisma:migrate
```

This will:
- Create all the necessary tables in your Supabase database
- Set up the schema for users, goals, habits, check-ins, etc.

## Step 4: Start the Development Server

```bash
npm run dev
```

## Troubleshooting

### Connection Issues
- Make sure your Supabase project is active
- Verify your database password is correct
- Check that your IP is allowed (Supabase Pro should allow all IPs, but check Settings → Database → Connection pooling)

### Migration Issues
- Make sure your `.env.local` file has the correct `DATABASE_URL`
- Try running `npm run prisma:generate` first, then `npm run prisma:migrate`

## Benefits of Using Supabase

✅ **Production Ready**: PostgreSQL is battle-tested and scalable
✅ **No TypeScript Issues**: Avoids the Prisma 7 + Next.js compilation problems
✅ **Real-time Features**: Can add real-time subscriptions later if needed
✅ **Backup & Security**: Supabase handles backups and security
✅ **Easy Scaling**: Supabase Pro account gives you better performance



