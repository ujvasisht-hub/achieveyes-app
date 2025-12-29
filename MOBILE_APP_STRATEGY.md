# Mobile App Strategy
## How Android & iOS Apps Will Sync with Web App

---

## 🎯 **The Plan**

Your web app already has a **REST API** that mobile apps can consume. Here's how it works:

---

## 📱 **Architecture Overview**

```
┌─────────────────┐
│   Web App       │
│ (Next.js)       │──┐
│ achieveyes.com  │  │
└─────────────────┘  │
                     │
┌─────────────────┐  │    ┌──────────────────┐
│  Android App    │──┼───▶│  API Endpoints   │
│  (Future)       │  │    │  /app/api/*      │
└─────────────────┘  │    │  achieveyes.com  │
                     │    └──────────────────┘
┌─────────────────┐  │              │
│   iOS App       │──┘              │
│  (Future)       │                 │
└─────────────────┘                 │
                                    ▼
                            ┌──────────────┐
                            │   Supabase   │
                            │  Database    │
                            └──────────────┘
```

---

## 🔌 **Your Current API Endpoints**

Your Next.js app already exposes these REST endpoints:

### Authentication
- `POST /app/api/auth/register` - User registration
- `POST /app/api/auth/[...nextauth]` - NextAuth endpoints
- `GET /app/api/auth/session` - Get current session

### Goals
- `GET /app/api/goals` - List all goals
- `POST /app/api/goals` - Create new goal
- `GET /app/api/goals/[id]` - Get single goal
- `POST /app/api/goals/[id]/setup` - Setup process/habit goals

### Check-ins
- `POST /app/api/checkins` - Submit check-in

### Badges
- `GET /app/api/badges` - Get user badges

**All of these work perfectly for mobile apps!**

---

## 📲 **Mobile App Implementation**

### Option 1: React Native (Recommended)

**Why React Native?**
- ✅ Single codebase for Android + iOS
- ✅ Can share some business logic with web
- ✅ Easy API integration
- ✅ Large community and ecosystem

**Example Code:**
```typescript
// Mobile app API service
const API_BASE = 'https://achieveyes.com/app/api';

export const apiService = {
  async getGoals(token: string) {
    const response = await fetch(`${API_BASE}/goals`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  async createGoal(token: string, goalData: any) {
    const response = await fetch(`${API_BASE}/goals`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goalData)
    });
    return response.json();
  },

  async submitCheckIn(token: string, checkInData: any) {
    const response = await fetch(`${API_BASE}/checkins`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkInData)
    });
    return response.json();
  }
};
```

### Option 2: Flutter

**Why Flutter?**
- ✅ Single codebase for Android + iOS
- ✅ Great performance
- ✅ Good API integration
- ✅ Growing ecosystem

**Example Code:**
```dart
// Mobile app API service
class ApiService {
  static const String baseUrl = 'https://achieveyes.com/app/api';

  Future<List<Goal>> getGoals(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/goals'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
    );
    return parseGoals(response.body);
  }
}
```

### Option 3: Native (Swift + Kotlin)

**Why Native?**
- ✅ Best performance
- ✅ Platform-specific features
- ❌ More development effort (two codebases)

---

## 🔐 **Authentication for Mobile**

### Current Setup (NextAuth)

Your web app uses NextAuth. For mobile, you have two options:

**Option A: Use NextAuth API (Recommended)**
- Mobile apps call NextAuth endpoints
- Same authentication flow
- Same tokens

**Option B: Direct Supabase Auth (Alternative)**
- Use Supabase Auth directly in mobile apps
- Simpler for mobile
- Still works with same database

**Recommendation:** Start with NextAuth API, switch to Supabase Auth if needed.

---

## 🔄 **How Sync Works**

### Automatic Sync via Shared Database

1. **User creates goal on web** → Saved to Supabase
2. **User opens mobile app** → Fetches from same Supabase database
3. **User updates on mobile** → Saved to Supabase
4. **User opens web app** → Sees updated data

**No complex sync logic needed!** The database handles it.

### Real-Time Updates (Future Enhancement)

Supabase supports real-time subscriptions:

```typescript
// Mobile app - real-time goal updates
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Listen for goal changes
supabase
  .channel('goals')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'Goal' },
    (payload) => {
      // Update UI when goal changes
      updateGoalsInUI(payload.new);
    }
  )
  .subscribe();
```

---

## 📁 **Repository Structure for Mobile**

### Recommended Structure:

```
GitHub:
├── achieveyes-landing
│   └── Landing page
│
├── achieveyes-app
│   └── Web app + API
│
└── achieveyes-mobile
    ├── src/
    │   ├── api/          # API service layer
    │   ├── screens/       # App screens
    │   ├── components/    # Reusable components
    │   └── auth/          # Authentication
    ├── android/           # Android native code
    ├── ios/               # iOS native code
    └── package.json
```

---

## 🚀 **Development Workflow**

### Phase 1: Web App (Current)
- ✅ Web app deployed at `achieveyes.com/app`
- ✅ API endpoints working
- ✅ Database set up

### Phase 2: Mobile App Development
1. Create `achieveyes-mobile` repository
2. Set up React Native or Flutter project
3. Create API service layer (calls web app API)
4. Implement authentication
5. Build UI screens
6. Test sync with web app

### Phase 3: Deployment
- Android: Google Play Store
- iOS: Apple App Store
- Both use same API and database

---

## ✅ **Benefits of This Approach**

1. **Single Source of Truth**
   - One database (Supabase)
   - One API (Next.js routes)
   - All platforms stay in sync

2. **Independent Development**
   - Web app can be updated independently
   - Mobile apps can be updated independently
   - No conflicts

3. **Easy Maintenance**
   - API changes affect all platforms
   - Database schema changes sync automatically
   - Clear separation of concerns

4. **Scalability**
   - Can add more platforms easily
   - API can be optimized separately
   - Database can scale independently

---

## 🎯 **Next Steps for Mobile**

When you're ready to build mobile apps:

1. **Choose Framework**
   - React Native (recommended)
   - Flutter
   - Native (Swift + Kotlin)

2. **Set Up Project**
   - Create new repository
   - Initialize mobile framework
   - Set up API service layer

3. **Implement Features**
   - Authentication
   - Goal management
   - Check-ins
   - Progress tracking

4. **Test Sync**
   - Create goal on web → see on mobile
   - Update on mobile → see on web
   - Verify real-time updates

5. **Deploy**
   - Android: Google Play
   - iOS: App Store

---

## 📚 **Resources**

- **React Native**: https://reactnative.dev/
- **Flutter**: https://flutter.dev/
- **Supabase Mobile**: https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native
- **NextAuth Mobile**: https://next-auth.js.org/tutorials/refresh-token-rotation

---

**Your current web app is already perfectly set up for mobile!** The API is REST-based, the database is shared, and authentication is ready. You just need to build the mobile UI that calls the same endpoints.

