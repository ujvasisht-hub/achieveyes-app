# Dreams - Goal Tracking App

A comprehensive goal tracking application that helps you achieve your dreams through milestone-based progress tracking, habit formation, and daily check-ins.

## Features

### Phase 1 Features (Implemented)

1. **Goal Creation Flow**
   - Write down your initial goal
   - Complete the "5 Whys" exercise to drill down to your real goal
   - Set a deadline for your goal

2. **Process Goals**
   - Automatically calculated based on your goal deadline
   - Includes: 24h, 48h, 7 days, 1 month, and beyond based on timeline
   - Manual override available
   - Track progress for each process goal

3. **Habit Goals**
   - Develop new habits to reach your goal
   - Let go of habits that hold you back
   - 21-day tracking cycle with streak reset on failure
   - Grace period: same-day check-ins don't reset the streak

4. **Daily Check-Ins**
   - Separate check-ins for each process goal and habit goal
   - Mark as accomplished or not accomplished
   - Add notes to track your progress

5. **Automatic Recalibration**
   - When a process goal is missed, automatically adds extra work to next 2-4 check-ins
   - Manual override available
   - Keeps you on track to meet your deadline

6. **Progress Visualization**
   - Progress bar with percentage
   - Line charts for timeline progress
   - Bar charts for process goals and habit streaks
   - Milestone tracking

7. **Celebrations & Badges**
   - Animated celebrations when you achieve milestones
   - Dashboard badges for:
     - Process goal completions
     - Habit streaks (7, 14, 21 days)
     - Milestone achievements
     - Goal completion

8. **User Authentication**
   - Email/password authentication
   - Google OAuth authentication
   - Multi-user support

9. **Dark Mode**
   - Full dark mode support
   - Toggle between light and dark themes

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (with Prisma ORM) - easily migratable to PostgreSQL
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npm run prisma:migrate
```

3. Generate Prisma Client:
```bash
npm run prisma:generate
```

4. Set up environment variables:
Create a `.env.local` file in the root directory:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"

# Optional: Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Sign Up/Login**: Create an account or sign in with Google
2. **Create a Goal**: Click "New Goal" and follow the guided flow:
   - Write your initial goal
   - Answer "Why?" 5 times to find your real goal
   - Set your deadline
3. **Set Up Process & Habit Goals**: Define what you need to do and what habits to build
4. **Daily Check-Ins**: Check in daily on all your process goals and habits
5. **Track Progress**: View your progress through charts and milestones
6. **Celebrate**: Earn badges and see celebrations when you achieve milestones!

## Database Management

- View database: `npm run prisma:studio`
- Create migration: `npm run prisma:migrate`
- Reset database: Delete `dev.db` and run migrations again

## Future Enhancements (AI Features - Phase 2)

- AI-powered goal format suggestions
- AI-generated daily plans
- AI habit recommendations
- Motivational snippets
- Journey graph generation

## Deployment

This app is designed to be easily deployable. For production:

1. Switch to PostgreSQL (update `DATABASE_URL` in `.env.local`)
2. Update `NEXTAUTH_SECRET` to a secure random string
3. Add Google OAuth credentials if using Google sign-in
4. Deploy to Vercel, Railway, or your preferred hosting platform

## License

ISC



