# 🔌 FAZA 4: Backend Integration & API Connection

**Status:** ✅ API Infrastructure Ready - Integration in Progress
**Started:** 2025-10-26
**Goal:** Connect React frontend to Laravel backend API

---

## 📊 Current Status

### ✅ What's Already Done

1. **API Client Setup** (`src/api/client.ts`)
   - Fetch-based API client
   - Bearer token authentication
   - Error handling
   - Type-safe responses

2. **API Modules** (`src/api/`)
   - ✅ `alerts.ts` - Full CRUD for job alerts
   - ✅ `offers.ts` - Job listings API
   - ✅ `reference.ts` - Companies, Positions, Levels
   - ✅ `auth.ts` - Authentication

3. **Mock Data Fallback**
   - `VITE_USE_MOCKS` flag support
   - Mock data in `src/mocks/`
   - Seamless dev/prod switching

4. **Laravel API Integration**
   - `useAlerts` hook → MIGRATED TO LARAVEL API ✅
   - API base in `src/lib/api.ts` (axios-based)

### ⏳ What Needs Integration

| Component | Current State | Target | Priority |
|-----------|---------------|--------|----------|
| **Alerts Page** | useAlerts (Lara vel) | ✅ Connected | HIGH |
| **Dashboard** | Mock data | Connect to `/api/dashboard/stats` | HIGH |
| **Job Tracker** | localStorage | Connect to `/api/applications` | MEDIUM |
| **Landing Page** | Mock stats | Connect to `/api/stats/public` | LOW |
| **B2BAnalytics** | Mock data | Connect to `/api/analytics` | LOW |

---

## 🎯 FAZA 4 Implementation Plan

### Phase 1: Core API Connections (Week 1)

#### 1.1 Dashboard Integration
**File:** `src/pages/Dashboard.tsx`

**Current:** Uses mock data
```typescript
const stats = {
  applications: mockApplications.length,
  responses: mockApplications.filter(a => a.status === 'response').length,
  // ...
};
```

**Target:** Connect to Laravel API
```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api';

const { data: stats, isLoading } = useQuery({
  queryKey: ['dashboard-stats'],
  queryFn: async () => {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  },
});
```

**Backend Endpoint Needed:**
```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
});

// DashboardController.php
public function stats() {
    $user = auth()->user();

    return [
        'data' => [
            'alerts_count' => $user->alerts()->count(),
            'matched_offers_count' => Offer::matchingUserAlerts($user)->count(),
            'new_offers_today' => Offer::whereDate('created_at', today())->count(),
            'companies_watching' => $user->alerts()->with('companies')->get()
                ->flatMap->companies->unique()->count(),
        ]
    ];
}
```

---

#### 1.2 Alerts Page Integration
**File:** `src/pages/Alerts.tsx`

**Status:** ✅ ALREADY INTEGRATED via `useAlerts` hook

**Verification Needed:**
- [ ] Test creating new alert
- [ ] Test editing alert
- [ ] Test deleting alert
- [ ] Test toggling alert on/off

---

#### 1.3 Job Offers Integration
**File:** `src/pages/Dashboard.tsx` (Featured Jobs section)

**Current:** No job offers shown
**Target:** Show latest matched offers

```typescript
import { offersAPI } from '@/api';

const { data: matchedOffers, isLoading } = useQuery({
  queryKey: ['matched-offers'],
  queryFn: () => offersAPI.getMatched(),
});
```

---

### Phase 2: Advanced Features (Week 2)

#### 2.1 Job Tracker Backend Integration
**File:** `src/pages/JobTracker.tsx`

**Current:** Uses localStorage
```typescript
const [applications, setApplications] = useState<Application[]>(() => {
  const saved = localStorage.getItem('job-applications');
  return saved ? JSON.parse(saved) : [];
});
```

**Target:** Save to Laravel backend
```typescript
// Create new API module: src/api/applications.ts
export const applicationsAPI = {
  async getAll(): Promise<Application[]> {
    const response = await apiClient.get('/applications');
    return response.data;
  },

  async create(data: CreateApplicationRequest): Promise<Application> {
    const response = await apiClient.post('/applications', data);
    return response.data;
  },

  async update(id: number, data: UpdateApplicationRequest): Promise<Application> {
    const response = await apiClient.put(`/applications/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/applications/${id}`);
  },
};

// Use in component
const { data: applications, isLoading } = useQuery({
  queryKey: ['applications'],
  queryFn: () => applicationsAPI.getAll(),
});

const createMutation = useMutation({
  mutationFn: (data: CreateApplicationRequest) => applicationsAPI.create(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['applications'] });
    toast.success('Application added!');
  },
});
```

**Backend Migration Needed:**
```bash
php artisan make:migration create_applications_table
php artisan make:model Application
php artisan make:controller Api/ApplicationController
```

**Migration Schema:**
```php
Schema::create('applications', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('offer_id')->nullable()->constrained()->onDelete('set null');
    $table->string('company_name');
    $table->string('position');
    $table->enum('status', ['wishlist', 'applied', 'interview', 'offer', 'rejected']);
    $table->date('applied_date')->nullable();
    $table->text('notes')->nullable();
    $table->decimal('salary_min', 10, 2)->nullable();
    $table->decimal('salary_max', 10, 2)->nullable();
    $table->string('url')->nullable();
    $table->timestamps();
});
```

---

#### 2.2 CV Cloud Storage Integration
**File:** `src/services/cvCloudService.ts`

**Current:** Has service structure but needs backend

**Backend Endpoint Needed:**
```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cvs', [CVController::class, 'index']);
    Route::post('/cvs', [CVController::class, 'store']);
    Route::get('/cvs/{id}', [CVController::class, 'show']);
    Route::put('/cvs/{id}', [CVController::class, 'update']);
    Route::delete('/cvs/{id}', [CVController::class, 'destroy']);
});
```

---

### Phase 3: Polish & Testing (Week 3)

#### 3.1 Loading States
Add loading states to all API calls:

```typescript
// Example pattern
function DashboardPage() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => apiClient.get('/dashboard/stats'),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-lg font-semibold">Failed to load dashboard</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return <div>...</div>;
}
```

---

#### 3.2 Error Handling
Add global error interceptor:

```typescript
// src/api/client.ts - Update handleResponse
private async handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = await response.json();

    // Handle auth errors
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/auth';
    }

    // Handle validation errors
    if (response.status === 422 && error.errors) {
      const messages = Object.values(error.errors).flat().join(', ');
      throw new Error(messages);
    }

    throw new Error(error.message || 'API Error');
  }

  return response.json();
}
```

---

#### 3.3 Retry Logic
Add automatic retry for failed requests:

```typescript
// Configure React Query with retries
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
```

---

## 📝 Backend Endpoints Checklist

### ✅ Already Implemented in Laravel

```
GET  /api/alerts              → List user's alerts
POST /api/alerts              → Create alert
PUT  /api/alerts/{id}         → Update alert
DELETE /api/alerts/{id}       → Delete alert

GET  /api/companies           → List all companies
GET  /api/positions           → List all positions
GET  /api/levels              → List all levels
GET  /api/groups              → List all position groups
```

### ⏳ Need to Implement

```
# Dashboard
GET  /api/dashboard/stats     → User dashboard statistics
GET  /api/dashboard/activity  → Recent activity feed

# Offers
GET  /api/offers              → List all offers (paginated)
GET  /api/offers/{id}         → Single offer details
GET  /api/offers/matched      → Offers matching user's alerts
GET  /api/offers/latest       → Latest offers (today)
GET  /api/offers/search       → Search offers

# Applications (Job Tracker)
GET  /api/applications        → List user's applications
POST /api/applications        → Create application
PUT  /api/applications/{id}   → Update application
DELETE /api/applications/{id} → Delete application

# CV Storage
GET  /api/cvs                 → List user's CVs
POST /api/cvs                 → Save new CV
GET  /api/cvs/{id}            → Get CV by ID
PUT  /api/cvs/{id}            → Update CV
DELETE /api/cvs/{id}          → Delete CV

# Analytics (B2B)
GET  /api/analytics/market-trends    → Market movement data
GET  /api/analytics/top-companies    → Most active companies
GET  /api/analytics/top-positions    → Most demanded positions
GET  /api/analytics/category-intel   → Category insights

# Public Stats (for landing page)
GET  /api/stats/public        → Public statistics (total offers, companies, etc.)
```

---

## 🧪 Testing Plan

### Manual Testing Checklist

#### Alerts
- [ ] Create new alert → verify in database
- [ ] Edit alert → verify changes saved
- [ ] Delete alert → verify removed
- [ ] Toggle alert on/off → verify status changes

#### Dashboard
- [ ] Load dashboard → verify stats from API
- [ ] Verify loading state shown
- [ ] Verify error handling when API down

#### Job Tracker
- [ ] Add new application → verify saved to backend
- [ ] Drag & drop between stages → verify status update
- [ ] Edit application → verify changes saved
- [ ] Delete application → verify removed

#### CV Creator
- [ ] Save CV to cloud → verify in database
- [ ] Load saved CV → verify data restored
- [ ] Update CV → verify changes saved
- [ ] Delete CV → verify removed

### API Integration Tests

```typescript
// tests/api/alerts.test.ts
describe('Alerts API', () => {
  it('should fetch all alerts', async () => {
    const alerts = await alertsAPI.getAll();
    expect(Array.isArray(alerts)).toBe(true);
  });

  it('should create new alert', async () => {
    const data = {
      alert_name: 'Test Alert',
      frequency: 'daily',
      companies: ['Google', 'Microsoft'],
      positions: ['Backend Developer'],
      levels: ['Senior'],
    };

    const alert = await alertsAPI.create(data);
    expect(alert.id).toBeDefined();
    expect(alert.alert_name).toBe('Test Alert');
  });

  it('should handle validation errors', async () => {
    const invalidData = { alert_name: '' }; // Missing required fields

    await expect(alertsAPI.create(invalidData as any))
      .rejects.toThrow();
  });
});
```

---

## 🚀 Deployment Checklist

### Before Production

- [ ] All API endpoints tested
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Authentication working
- [ ] CORS configured correctly
- [ ] Rate limiting added
- [ ] API documentation updated
- [ ] Monitoring/logging set up

### Environment Variables

**Frontend (.env):**
```env
VITE_API_URL=https://api.fomojobs.pl/api
VITE_USE_MOCKS=false
VITE_ENABLE_AI_FEATURES=true
```

**Backend (.env):**
```env
APP_URL=https://api.fomojobs.pl
SANCTUM_STATEFUL_DOMAINS=fomojobs.pl,www.fomojobs.pl
SESSION_DOMAIN=.fomojobs.pl
```

---

## 📊 Success Metrics

### After FAZA 4 Completion

✅ **Must Have:**
- [ ] 100% of pages use Laravel API (no Supabase)
- [ ] All CRUD operations working
- [ ] Auth flow working (login, logout, protected routes)
- [ ] Error handling on all API calls
- [ ] Loading states on all API calls

⚠️ **Nice to Have:**
- [ ] Optimistic updates
- [ ] Background sync
- [ ] Offline support
- [ ] Request caching
- [ ] API monitoring dashboard

---

## 🎓 Developer Guide

### How to Add New API Endpoint

1. **Create API function** in `src/api/[module].ts`:
```typescript
export const [module]API = {
  async action(): Promise<Type> {
    const response = await apiClient.get<ApiResponse<Type>>('/endpoint');
    return response.data;
  },
};
```

2. **Use in component** with React Query:
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['key'],
  queryFn: () => [module]API.action(),
});
```

3. **Add backend endpoint** in Laravel:
```php
// routes/api.php
Route::get('/endpoint', [Controller::class, 'method']);

// Controller
public function method() {
    return ['data' => Model::all()];
}
```

---

## 📝 Notes for Andrzej

### Current API Architecture

```
React Frontend (Vite)
    ↓ HTTP/JSON
    ↓ src/api/client.ts (Fetch-based)
    ↓
Laravel Backend API
    ↓
MySQL Database
```

### Two API Clients

We currently have **TWO** API clients:

1. **`src/api/client.ts`** (Fetch-based)
   - Used by: `alerts.ts`, `offers.ts`, `reference.ts`
   - Newer, type-safe

2. **`src/lib/api.ts`** (Axios-based)
   - Used by: `useAlerts.ts` hook
   - Older, has interceptors

**Recommendation:** Standardize on one client (prefer Fetch-based for lighter bundle).

### Mock Mode for Development

Frontend can work without backend by setting:
```env
VITE_USE_MOCKS=true
```

This allows frontend development even when backend is not available.

---

**Last Updated:** 2025-10-26
**Next Review:** After Week 1 of implementation
