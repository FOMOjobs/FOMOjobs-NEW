# 🚀 FOMOjobs-NEW - Przewodnik Setup dla Andrzeja

**Data:** 2025-10-22
**Autor:** Claude Analysis
**Cel:** Minimalizacja pracy przy setupie nowej wersji FOMOjobs

---

## 📋 Executive Summary

### 🎯 Główne Odkrycia

**FOMOjobs-OLD i FOMOjobs-NEW to KOMPLETNIE RÓŻNE APLIKACJE:**

| Aspekt | OLD | NEW | Status |
|--------|-----|-----|--------|
| **Cel aplikacji** | Job aggregation platform | Event management platform | ❌ Rozbieżne |
| **Frontend** | Blade templates | React + TypeScript | ✅ Upgrade |
| **Backend** | Laravel 10 (pełny) | Laravel 10 (minimalistyczny) | ⚠️ Częściowe |
| **Modele** | 25 (Offer, Alert, Company, etc.) | 4 (User, Event, Category) | ❌ Brakuje 21 |
| **Scrapers** | 19 firm | 0 | ❌ Brakuje wszystkich |
| **Filament Resources** | 23 admin panels | 4 (Events, Users) | ❌ Brakuje 19 |
| **Migracje** | 71 | 9 | ❌ Brakuje 62 |

### 🔴 Brutalna Prawda

**NEW NIE MA NIC z funkcjonalności OLD.**

NEW to:
- ✅ Świeży Laravel skeleton
- ✅ React frontend (dobrze zrobiony)
- ✅ Podstawowy Filament
- ❌ **Zero** job scraping
- ❌ **Zero** alert system
- ❌ **Zero** AI integration

### 💡 Decyzja Strategiczna

**Masz 2 opcje:**

#### **Opcja A: Full Migration** (Rekomendowana dla długoterminowego sukcesu)
- Przenieś CAŁĄ logikę biznesową z OLD do NEW
- Zachowaj React frontend
- Dodaj API endpoints łączące React ↔ Laravel
- **Czas:** 3-4 miesiące full-time
- **Rezultat:** Nowoczesna, skalowalna aplikacja

#### **Opcja B: Quick Win (Hybrid)**
- Wystaw OLD backend jako API
- Podłącz React frontend z NEW do OLD API
- Stopniowo migruj komponenty
- **Czas:** 2-4 tygodnie na MVP
- **Rezultat:** Działa szybko, ale tech debt

---

## 1. 📊 Obecna Struktura NEW

### 1.1 Co Jest w Repo

```
FOMOjobs-NEW/
├── backend/                    # Laravel 10 API
│   ├── app/
│   │   ├── Models/            # 4 modele (User, Event, Category, EventRegistration)
│   │   ├── Filament/          # 4 resources (Events, Categories, Users, Registrations)
│   │   ├── Http/Controllers/  # 1 controller (StatsController)
│   │   └── Console/           # ❌ BRAK Commands/
│   ├── database/
│   │   └── migrations/        # 9 migracji (tylko events system)
│   ├── routes/
│   │   ├── api.php            # 3 endpointy (/stats/*)
│   │   └── web.php            # 1 route (welcome)
│   └── composer.json          # Laravel 10 + Filament 3 + l5-swagger
│
├── src/                        # React Frontend
│   ├── components/
│   │   ├── landing/           # FOMOJobsHero, Features, Pricing, etc.
│   │   ├── cv/                # CV Creator components
│   │   └── ui/                # shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx          # Landing page
│   │   ├── Dashboard.tsx      # User dashboard
│   │   ├── CVCreator.tsx      # CV generator
│   │   ├── JobTracker.tsx     # Kanban job tracking
│   │   ├── InterviewCoach.tsx # AI interview practice
│   │   └── Auth.tsx           # Login/Register
│   ├── stores/
│   │   └── cvStore.ts         # Zustand state management
│   └── types/
│       └── cv.ts              # TypeScript types
│
├── public/                     # Static assets
├── supabase/                   # Supabase migrations (⚠️ konflikty?)
├── package.json                # React dependencies
├── vite.config.ts              # Vite build
├── tailwind.config.ts          # Tailwind CSS
├── .env.example                # Supabase config
│
└── DOCUMENTATION/
    ├── ANALYSIS_REPORT.md      # 818 linii
    ├── MIGRATION_STATUS.md     # 339 linii
    ├── SECURITY_FIXES_SUMMARY.md # 318 linii
    └── PERFORMANCE_ANALYSIS.md # 618 linii
```

### 1.2 Tech Stack

#### Backend (Laravel)
```json
{
  "php": "^8.1",
  "laravel/framework": "^10.10",
  "filament/filament": "^3.0",
  "laravel/sanctum": "^3.3",
  "guzzlehttp/guzzle": "^7.2",
  "darkaonline/l5-swagger": "^8.6"  // ← API documentation
}
```

**Brakuje** (vs OLD):
- ❌ `bytexr/filament-queueable-bulk-actions`
- ❌ `croustibat/filament-jobs-monitor`
- ❌ `filament/spatie-laravel-settings-plugin`
- ❌ `openai-php/laravel` (Azure OpenAI)
- ❌ `symfony/mailgun-mailer`
- ❌ `vormkracht10/filament-mails`

#### Frontend (React)
```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "typescript": "^5.5.3",
  "vite": "^5.4.1",
  "@tanstack/react-query": "^5.90.1",
  "@supabase/supabase-js": "^2.58.0",  // ← Supabase integration
  "zustand": "^5.0.8",                  // ← State management
  "tailwindcss": "^3.4.11",
  "@radix-ui/*": "^1.x",                // ← UI components (30+ packages)
  "framer-motion": "^12.23.22",
  "recharts": "^2.12.7",
  "zod": "^4.1.11"                      // ← Validation
}
```

### 1.3 Co Działa w NEW

✅ **Frontend (React):**
- Landing page z hero, features, pricing, FAQ
- Dashboard z Recharts
- CV Creator z live preview
- Job Tracker (Kanban board)
- Interview Coach (mock interviews)
- Auth system (Login/Register UI)
- Dark mode (pełne wsparcie)
- Responsive design
- SEO (React Helmet)

✅ **Backend (Minimalistyczny):**
- Laravel 10 installed
- Filament 3 admin panel
- Sanctum API auth
- CORS middleware
- Swagger API documentation
- Events management (demo system)

❌ **Co NIE działa:**
- Job scraping (0/19 firm)
- Alert system (brak)
- AI classification (brak)
- Email notifications (brak)
- Cron jobs (brak)
- Queue system (brak)

---

## 2. 🔄 Backend Status - Szczegółowa Analiza

### 2.1 Porównanie Modeli

| Model (OLD) | W NEW? | Priorytet | Zależności |
|-------------|---------|-----------|------------|
| **User** | ✅ Partial | CRITICAL | - |
| **Offer** | ❌ Missing | CRITICAL | Company, Position, Level |
| **Company** | ❌ Missing | CRITICAL | - |
| **Position** | ❌ Missing | CRITICAL | Group |
| **Level** | ❌ Missing | CRITICAL | - |
| **Group** | ❌ Missing | HIGH | - |
| **Alert** | ❌ Missing | CRITICAL | User, AlertPosition, AlertCompany, AlertLevel |
| **AlertPosition** | ❌ Missing | CRITICAL | Alert, Position |
| **AlertCompany** | ❌ Missing | CRITICAL | Alert, Company |
| **AlertLevel** | ❌ Missing | CRITICAL | Alert, Level |
| **SpiderLog** | ❌ Missing | HIGH | Company |
| **AiLogs** | ❌ Missing | HIGH | Offer |
| **ScheduledRun** | ❌ Missing | MEDIUM | - |
| **UserQueue** | ❌ Missing | LOW | - |
| **Tester** | ❌ Missing | LOW | - |
| **Capgemini** | ❌ Missing | HIGH | 10x company models |
| **Comarch** | ❌ Missing | HIGH | |
| **IBM** | ❌ Missing | HIGH | |
| *...+7 more* | ❌ Missing | HIGH | |

**NEW ma tylko:**
- Event
- EventRegistration
- Category
- User (podstawowy, bez pól z OLD: `is_admin`, `is_verified`, `is_newsletter`, `verification_code`, etc.)

### 2.2 Porównanie Migracji

#### OLD (71 migracji):
```
Phase 1: Core (May 2025)
- create_capgeminis_table
- create_comarches_table
- create_hsbcs_table
- create_ibms_table
- create_motorolas_table
- create_statestreets_table
- create_ubs_table
- create_aptivs_table
- create_bip_krakows_table
- create_shells_table
- create_spider_logs_table
- create_scheduled_runs_table

Phase 2: Normalization (June 2025)
- create_companies_table
- create_offers_table
- create_positions_table
- create_groups_table
- create_levels_table
- create_alerts_table
- create_alert_positions_table
- create_alert_companies_table
- create_alert_levels_table

Phase 3: AI & Features (June-July 2025)
- create_ai_logs_table
- add_aistatus_to_offers
- add_level_id_to_offers
- create_jobs_table (Queue)
- create_bulk_actions_table
- create_mails_table (tracking)
```

#### NEW (9 migracji):
```
2014_10_12_000000_create_users_table
2014_10_12_100000_create_password_reset_tokens_table
2019_08_19_000000_create_failed_jobs_table
2019_12_14_000001_create_personal_access_tokens_table
2025_10_04_210025_add_dob_to_users_table
2025_10_04_214303_create_events_table
2025_10_04_214308_create_categories_table
2025_10_04_215027_add_cate_id_to_events
2025_10_04_222004_create_event_registrations_table
```

**Gap: 62 migracje**

### 2.3 Porównanie Console Commands

#### OLD (24 commands):
```
Scrapers (19):
- Aptiv_Spider.php
- AssaAbloy_Spider.php
- BipKrakow_Spider.php
- BrownBrothers_Spider.php
- CapGemini_Spider.php
- Cathay_Spider.php (incomplete)
- Comarch_Spider.php
- Euroclear_Spider.php (incomplete)
- Hsbc_Spider.php
- IBM_Spider.php
- Inpost_Spider.php
- Motorola_Spider.php
- Nokia_Spider.php
- PepsiCo_Spider.php
- Pmi_Spider.php
- Pzu_Spider.php
- Sabre_Spider.php
- Shell_Spider.php
- Statestreet_Spider.php
- Ubs_Spider.php

Support Commands (4):
- AlertNotifier.php (wysyła alerty emailem)
- SetStatusOffer.php (filtruje Kraków)
- StatsNotifier.php (monitoring via ntfy.sh)
- Test.php
```

#### NEW:
```
❌ BRAK app/Console/Commands/ directory!
```

### 2.4 Porównanie Filament Resources

#### OLD (23 resources):
```
Core:
- OfferResource (główne oferty)
- CompanyResource
- PositionResource
- GroupResource
- LevelResource
- AlertResource
- UserResource
- UserQueueResource
- TesterResource

Company-Specific (10):
- CapgeminiResource
- ComarchResource
- IbmResource
- HsbcResource
- MotorolaResource
- UbsResource
- ShellResource
- StatestreetResource
- AptivResource
- BipKrakowResource

System:
- AiLogsResource
- SpiderLogResource
- ScheduledrunResource
```

#### NEW (4 resources):
```
- UserResource (basic)
- EventResource
- CategoryResource
- EventRegistrationResource
```

**Gap: 19 resources**

### 2.5 Porównanie Controllers

#### OLD:
```php
app/Http/Controllers/
├── AlertController.php      // CRUD alertów
├── EpamAPIController.php    // API dla Tampermonkey
├── FomoAuthController.php   // Custom auth
├── RegistrationController.php
├── PreviewController.php
└── Controller.php
```

#### NEW:
```php
app/Http/Controllers/
├── StatsController.php      // Tylko stats
└── Controller.php
```

### 2.6 Porównanie Routes

#### OLD routes/web.php (30+ routes):
```php
/ → underconstruction
/home → welcome
/login, /register, /logout
/alert → home (authenticated)
/alerts → list (AlertController)
/dashboard → redirect to /alert
/offer/{id} → redirect to external link
/preview → preview email
/password/reset → reset form
/verify-account/{code} → verification
/opentowork → beta signup
```

#### OLD routes/api.php:
```php
POST /api/external/offers/{id}  // ⚠️ Public, no auth
GET  /api/user [auth:sanctum]
```

#### NEW routes/web.php:
```php
/ → welcome view
```

#### NEW routes/api.php:
```php
GET /api/stats/events
GET /api/stats/users
GET /api/user [auth:sanctum]
```

**Gap:** Brakuje wszystkich routes do alertów, ofert, preview, etc.

---

## 3. 🎨 Frontend Status - React App

### 3.1 Co Jest Gotowe

NEW ma **bardzo dobry** React frontend:

#### ✅ Zaimplementowane Strony:

1. **Landing Page (`/`)**
   - FOMOJobsHero - gradient hero section
   - FOMOJobsStats - statistics
   - FOMOJobsFeatures - key features
   - FOMOJobsAbout - about platform
   - FOMOJobsBenefits - user benefits
   - FeaturedJobs - job listings preview
   - FOMOJobsPricing - 3 tiers + #opentowork
   - FOMOJobsBlogPreview - blog articles
   - FOMOJobsFAQ - accordion FAQ
   - FOMOJobsFooter - team info

2. **Dashboard (`/dashboard`)**
   - User stats cards
   - Recharts graphs (applications, responses, offers)
   - Recent activity timeline
   - Quick actions cards
   - Full dark mode

3. **CV Creator (`/cv-creator`)**
   - Personal Info form
   - Experience section (multiple entries)
   - Education section
   - Skills manager
   - Languages manager
   - Live preview placeholder
   - Auto-save to localStorage
   - Zustand state management

4. **Job Tracker (`/job-tracker`)**
   - Kanban board (4 columns)
   - Drag & drop between stages
   - Add/Edit applications modal
   - Stats overview
   - Dark mode

5. **Interview Coach (`/interview-coach`)**
   - 3-step setup: Upload CV → Job description → Start
   - Practice interface with voice recording
   - Mock questions (5 training questions)
   - STAR method guidance
   - Progress tracking

6. **Auth (`/auth`)**
   - Login form
   - Register form
   - Social login buttons (Google, LinkedIn, GitHub)
   - Gradient background

#### ⏳ W Trakcie/Placeholder:

7. **Blog** (`/blog`, `/blog/:slug`) - ❌ Not implemented
8. **Job Prompts** (`/job-prompts`) - ❌ Not implemented
9. **Recruiter** (`/recruiter`) - ❌ Not implemented
10. **Profile** (`/profile`) - ⏳ Route exists, no component
11. **Calendar** (`/calendar`) - ⏳ Route exists, no component
12. **Chat** (`/chat`) - ⏳ Route exists, no component
13. **Admin** (`/admin`) - ⏳ Route exists, no component
14. **Achievements** (`/achievements`) - ⏳ Route exists, no component

### 3.2 Design System

**Kolory:**
- Primary: Purple `#8B5CF6` (hsl(258, 90%, 66%))
- Secondary: Yellow `#F4D03F` (hsl(45, 93%, 58%))
- Dark mode: CSS variables z `.dark` class

**Komponenty UI:**
- shadcn/ui (pełna biblioteka)
- Radix UI (30+ components)
- Framer Motion (animations)
- Recharts (charts)

**Gradienty:**
```css
bg-gradient-to-r from-primary via-secondary to-primary
animate-gradient-x (8s)
animate-gradient-shift (15s)
```

### 3.3 State Management

- ✅ Zustand dla CV Creator (`cvStore.ts`)
- ⚠️ useState dla Job Tracker (powinno być Zustand/React Query)
- ⚠️ Context dla Auth (powinno być Zustand/React Query)

### 3.4 API Integration

**Status:** ⚠️ Brak integracji z backendem

```typescript
// Current approach (src/integrations/supabase/):
// NEW używa Supabase jako backend!

// .env.example:
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**Problem:** React frontend używa Supabase, a mamy Laravel backend!

**Rozwiązanie:** Potrzeba:
1. Stworzyć Laravel API endpoints
2. Zamienić Supabase client na Axios/Fetch do Laravel API
3. Lub: Użyć Laravel jako proxy do Supabase

---

## 4. ⚙️ Konfiguracja

### 4.1 Environment Variables

#### OLD (.env - BRAK .env.example!)
```env
# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=fomojobs
DB_USERNAME=root
DB_PASSWORD=

# Mail
MAIL_MAILER=mailgun
MAILGUN_DOMAIN=fomojobs.pl
MAILGUN_SECRET=key-xxxxx

# Azure OpenAI
AZURE_OPENAI_KEY=xxxxx
AZURE_OPENAI_ENDPOINT=https://gad-nonprod-chatbot-openai.openai.azure.com

# App
APP_URL=https://fomojobs.pl
```

#### NEW (.env.example - ✅ EXISTS!)
```env
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI (Optional)
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Feature Flags
VITE_ENABLE_AI_FEATURES=false
```

**Problem:** NEW używa Supabase, OLD używa MySQL + Mailgun + Azure OpenAI

### 4.2 Composer Dependencies Gap

Potrzeba dodać do NEW:
```bash
composer require bytexr/filament-queueable-bulk-actions:^0.3.3
composer require croustibat/filament-jobs-monitor:^2.6
composer require filament/spatie-laravel-settings-plugin:^3.2
composer require openai-php/laravel:^0.11.0
composer require symfony/mailgun-mailer:^6.4
composer require vormkracht10/filament-mails:^2.3
```

### 4.3 NPM Dependencies Gap

NEW ma **więcej** dependencies niż OLD (nowoczesny frontend).

Brakuje w NEW (backend):
```bash
# W OLD było:
npm install axios laravel-vite-plugin vite
```

NEW ma to + 80 dodatkowych pakietów (React ekosystem).

---

## 5. 🔌 API i Integracje

### 5.1 Current API Endpoints (NEW)

```
GET  /api/stats/events  → StatsController@eventsCount
GET  /api/stats/users   → StatsController@usersCount
GET  /api/user          → [auth:sanctum] Current user
```

### 5.2 Missing Endpoints (from OLD)

Potrzebne dla React frontendu:

```
# Job Offers
GET    /api/offers              → List offers (with filters)
GET    /api/offers/{id}         → Single offer
GET    /api/companies           → List companies
GET    /api/positions           → List positions
GET    /api/levels              → List levels

# Alerts
GET    /api/alerts              → User's alerts
POST   /api/alerts              → Create alert
PUT    /api/alerts/{id}         → Update alert
DELETE /api/alerts/{id}         → Delete alert
POST   /api/alerts/{id}/toggle  → Enable/disable

# User Profile
GET    /api/user/profile        → Full profile
PUT    /api/user/profile        → Update profile
POST   /api/user/avatar         → Upload avatar

# Dashboard Stats
GET    /api/dashboard/stats     → Overview stats
GET    /api/dashboard/activity  → Recent activity
GET    /api/dashboard/charts    → Chart data

# Admin (Filament exposed)
# Filament ma własne API, ale można dodać:
GET    /api/admin/scrapers      → Scraper status
POST   /api/admin/scrapers/{id}/run → Trigger scraper
```

### 5.3 Integracje Zewnętrzne

#### OLD używa:
1. **Azure OpenAI API**
   - Endpoint: `https://gad-nonprod-chatbot-openai.openai.azure.com`
   - Purpose: Job classification (position, level)
   - ⚠️ **Hardcoded API key** w ComarchResource, CapgeminiResource

2. **Mailgun**
   - Purpose: Alert emails
   - Domain: `fomojobs.pl`
   - Templates: AlertMail, VerifyEmail, PasswordReset

3. **ntfy.sh**
   - Purpose: Push notifications dla monitoring
   - Topic: `fomojobs_c9f4e2a1b7d3f58c4a6b1d9e7f0c2a3b`

4. **Tampermonkey (EPAM)**
   - Browser script dla EPAM scraping
   - POST to `/api/external/offers/epam`

#### NEW używa:
1. **Supabase**
   - Purpose: Authentication, Database, Storage
   - ⚠️ **Konflikt** z Laravel backend!

2. **OpenAI** (opcjonalnie)
   - Via `VITE_OPENAI_API_KEY`
   - Purpose: CV Creator AI features

---

## 6. 📊 Gap Analysis vs OLD

### 6.1 Missing Critical Components

| Component | OLD | NEW | Gap | Effort |
|-----------|-----|-----|-----|--------|
| **Scrapers** | 19 firm | 0 | -19 | 12h |
| **Modele** | 25 | 4 | -21 | 10h |
| **Migracje** | 71 | 9 | -62 | 8h |
| **Filament Resources** | 23 | 4 | -19 | 10h |
| **Console Commands** | 24 | 0 | -24 | 8h |
| **Controllers** | 6 | 1 | -5 | 6h |
| **API Endpoints** | 30+ | 3 | -27 | 12h |
| **Email Templates** | 4 | 0 | -4 | 4h |
| **Cron Jobs** | Dynamic | None | -∞ | 4h |
| **Queue Jobs** | 2 (AI) | 0 | -2 | 3h |
| **Middleware** | 2 custom | 1 custom | -1 | 2h |

**Total Backend Effort:** 79 hours

### 6.2 What NEW Has (that OLD doesn't)

✅ **Advantages:**

1. **Modern React Frontend**
   - TypeScript
   - Vite (fast builds)
   - shadcn/ui components
   - Dark mode support
   - Responsive design
   - **Value:** 60+ hours of work

2. **Better API Structure**
   - l5-swagger documentation
   - Clean CORS setup
   - Sanctum ready
   - **Value:** 8 hours

3. **Existing Documentation**
   - ANALYSIS_REPORT.md (818 lines)
   - MIGRATION_STATUS.md (339 lines)
   - SECURITY_FIXES_SUMMARY.md (318 lines)
   - PERFORMANCE_ANALYSIS.md (618 lines)
   - **Value:** 20 hours

4. **Modern Dependencies**
   - Up-to-date packages
   - Security patches applied
   - **Value:** 10 hours

**Total Frontend Value:** ~100 hours of work already done!

### 6.3 Architecture Mismatch

**Problem:** NEW frontend expects Supabase, but mamy Laravel backend z OLD.

**Current Architecture (NEW):**
```
React Frontend (Vite)
    ↓ Supabase Client
Supabase Backend (PostgreSQL + Auth + Storage)
```

**Target Architecture (what we need):**
```
React Frontend (Vite)
    ↓ Axios/Fetch
Laravel Backend API (MySQL + Sanctum + Filament)
    ↓
Background Services:
  - Scrapers (19 firms)
  - Alert System (Mailgun)
  - AI Classification (Azure OpenAI)
  - Cron Jobs (dynamic scheduling)
```

---

## 7. 🎯 Action Items dla Andrzeja

### Priority 1: CRITICAL (Must Have dla MVP)

#### 7.1.1 Database Setup (8 hours)

**Co skopiować z OLD do NEW:**

```bash
# Z /tmp/FOMOjobs-OLD/ do /tmp/FOMOjobs-NEW/backend/

# Core migrations (12 files):
cp database/migrations/2025_06_01_001547_create_companies_table.php backend/database/migrations/
cp database/migrations/2025_06_01_002000_create_offers_table.php backend/database/migrations/
cp database/migrations/2025_05_25_185415_create_positions_table.php backend/database/migrations/
cp database/migrations/2025_05_25_203117_create_groups_table.php backend/database/migrations/
cp database/migrations/2025_06_12_161629_create_levels_table.php backend/database/migrations/

# Alert system (4 files):
cp database/migrations/2025_06_05_124455_create_alerts_table.php backend/database/migrations/
cp database/migrations/2025_06_05_124519_create_alert_positions_table.php backend/database/migrations/
cp database/migrations/2025_06_05_124524_create_alert_companies_table.php backend/database/migrations/
cp database/migrations/2025_06_27_085123_create_alert_levels_table.php backend/database/migrations/

# Logging (2 files):
cp database/migrations/2025_05_22_101657_create_spider_logs_table.php backend/database/migrations/
cp database/migrations/2025_06_03_092941_create_ai_logs_table.php backend/database/migrations/

# Cron jobs:
cp database/migrations/2025_05_22_160757_create_scheduled_runs_table.php backend/database/migrations/
```

**Modyfikacje:**
```php
// Każda migracja: zmień daty na 2025_10_23_XXXXXX aby były nowsze niż obecne
```

**Run:**
```bash
cd backend
php artisan migrate
```

#### 7.1.2 Core Models (10 hours)

**Co skopiować:**

```bash
# Core models (5):
cp app/Models/Company.php backend/app/Models/
cp app/Models/Offer.php backend/app/Models/
cp app/Models/Position.php backend/app/Models/
cp app/Models/Level.php backend/app/Models/
cp app/Models/Group.php backend/app/Models/

# Alert system (4):
cp app/Models/Alert.php backend/app/Models/
cp app/Models/AlertPosition.php backend/app/Models/
cp app/Models/AlertCompany.php backend/app/Models/
cp app/Models/AlertLevel.php backend/app/Models/

# Logging (2):
cp app/Models/SpiderLog.php backend/app/Models/
cp app/Models/AiLogs.php backend/app/Models/

# System (1):
cp app/Models/ScheduledRun.php backend/app/Models/
```

**Modyfikacje:**
```php
// User.php - merge z istniejącym NEW User model
// Dodaj pola: is_admin, is_verified, is_newsletter, verification_code, etc.
```

#### 7.1.3 API Endpoints dla React (12 hours)

**Stwórz nowe kontrolery:**

```bash
php artisan make:controller Api/OfferController
php artisan make:controller Api/AlertController
php artisan make:controller Api/CompanyController
php artisan make:controller Api/DashboardController
```

**Implementuj endpointy:**

```php
// routes/api.php

Route::middleware('auth:sanctum')->group(function () {
    // Offers
    Route::get('/offers', [OfferController::class, 'index']);
    Route::get('/offers/{id}', [OfferController::class, 'show']);

    // Alerts
    Route::apiResource('alerts', AlertController::class);

    // Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/activity', [DashboardController::class, 'activity']);

    // Taxonomies
    Route::get('/companies', [CompanyController::class, 'index']);
    Route::get('/positions', [PositionController::class, 'index']);
    Route::get('/levels', [LevelController::class, 'index']);
});
```

**Przykładowa implementacja:**

```php
// app/Http/Controllers/Api/OfferController.php
namespace App\Http\Controllers\Api;

use App\Models\Offer;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function index(Request $request)
    {
        $query = Offer::with(['company', 'position', 'level'])
            ->where('status', 1); // Only Krakow

        // Filters
        if ($request->company_ids) {
            $query->whereIn('company_id', explode(',', $request->company_ids));
        }

        if ($request->position_ids) {
            $query->whereIn('position_id', explode(',', $request->position_ids));
        }

        if ($request->level_ids) {
            $query->whereIn('level_id', explode(',', $request->level_ids));
        }

        // Pagination
        return $query->latest()->paginate(20);
    }

    public function show($id)
    {
        return Offer::with(['company', 'position', 'level'])->findOrFail($id);
    }
}
```

#### 7.1.4 Scrapers (12 hours) - OPCJONALNIE dla MVP

**Co skopiować:**

```bash
# Najpierw stwórz directory:
mkdir -p backend/app/Console/Commands

# Top 5 priority scrapers:
cp app/Console/Commands/Comarch_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/CapGemini_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/IBM_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/Motorola_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/Hsbc_Spider.php backend/app/Console/Commands/

# Support commands:
cp app/Console/Commands/AlertNotifier.php backend/app/Console/Commands/
cp app/Console/Commands/SetStatusOffer.php backend/app/Console/Commands/
```

**Kernel.php:**
```bash
cp app/Console/Kernel.php backend/app/Console/Kernel.php
```

**Modyfikacje:**
```php
// Każdy scraper: sprawdź czy dependencies są zainstalowane
// Najpierw tylko odkomentuj używane scrapers
```

**Test:**
```bash
php artisan app:comarch-spider
```

---

### Priority 2: HIGH (Needed Soon)

#### 7.2.1 Alert System Backend (8 hours)

**Co skopiować:**

```bash
# Controller:
cp app/Http/Controllers/AlertController.php backend/app/Http/Controllers/

# Mailable:
mkdir -p backend/app/Mail
cp app/Mail/AlertMail.php backend/app/Mail/

# Email views:
mkdir -p backend/resources/views/emails
cp -r resources/views/emails/ backend/resources/views/
```

**Routes:**
```php
// routes/web.php
Route::post('/alert', [AlertController::class, 'saveAlert']);
Route::get('/alerts', [AlertController::class, 'showList'])->middleware('auth');
Route::get('/alerts/{id}/remove', [AlertController::class, 'removeAlert']);
```

**Mailgun setup:**
```bash
composer require symfony/mailgun-mailer
```

**.env:**
```env
MAIL_MAILER=mailgun
MAILGUN_DOMAIN=fomojobs.pl
MAILGUN_SECRET=key-xxxxx
MAIL_FROM_ADDRESS=noreply@fomojobs.pl
```

#### 7.2.2 Filament Admin (10 hours)

**Co skopiować:**

```bash
# Top priority resources (5):
cp -r app/Filament/Resources/OfferResource.php backend/app/Filament/Resources/
cp -r app/Filament/Resources/OfferResource/ backend/app/Filament/Resources/

cp -r app/Filament/Resources/CompanyResource.php backend/app/Filament/Resources/
cp -r app/Filament/Resources/CompanyResource/ backend/app/Filament/Resources/

cp -r app/Filament/Resources/AlertResource.php backend/app/Filament/Resources/
cp -r app/Filament/Resources/AlertResource/ backend/app/Filament/Resources/

cp -r app/Filament/Resources/SpiderLogResource.php backend/app/Filament/Resources/
cp -r app/Filament/Resources/SpiderLogResource/ backend/app/Filament/Resources/

cp -r app/Filament/Resources/ScheduledrunResource.php backend/app/Filament/Resources/
cp -r app/Filament/Resources/ScheduledrunResource/ backend/app/Filament/Resources/

# Widgets:
cp -r app/Filament/Widgets/ backend/app/Filament/
```

**Dependencies:**
```bash
composer require bytexr/filament-queueable-bulk-actions
composer require croustibat/filament-jobs-monitor
composer require filament/spatie-laravel-settings-plugin
```

#### 7.2.3 Connect React to Laravel (6 hours)

**Update Vite config:**

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Laravel backend
        changeOrigin: true,
      },
    },
  },
});
```

**Remove Supabase:**

```bash
npm uninstall @supabase/supabase-js

# Remove src/integrations/supabase/ folder
rm -rf src/integrations/supabase
```

**Create Laravel API client:**

```typescript
// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // For Sanctum
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

**Update components:**

```typescript
// Example: src/pages/Dashboard.tsx

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/stats');
      return data;
    },
  });

  // ...
}
```

**.env update:**
```env
# Remove Supabase
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...

# Add Laravel API
VITE_API_URL=http://localhost:8000/api
```

---

### Priority 3: MEDIUM (Can Wait)

#### 7.3.1 AI Integration (8 hours)

**Dependencies:**
```bash
composer require openai-php/laravel
```

**Co skopiować:**

```bash
# Jobs:
mkdir -p backend/app/Jobs
cp app/Jobs/GenericPositionJob.php backend/app/Jobs/
cp app/Jobs/GenericLevelJob.php backend/app/Jobs/

# Settings page:
cp -r app/Filament/Pages/AiSettings.php backend/app/Filament/Pages/

# Settings class:
mkdir -p backend/app/Settings
cp app/Settings/AISetting.php backend/app/Settings/
```

**.env:**
```env
OPENAI_API_KEY=sk-xxxxx
# Lub Azure:
AZURE_OPENAI_KEY=xxxxx
AZURE_OPENAI_ENDPOINT=https://...
```

**⚠️ Security Fix:**
```php
// ComarchResource.php, CapgeminiResource.php
// OLD:
'api-key' => 'hardcoded_key_here'

// NEW:
'api-key' => config('services.azure_openai.key')
```

**config/services.php:**
```php
'azure_openai' => [
    'key' => env('AZURE_OPENAI_KEY'),
    'endpoint' => env('AZURE_OPENAI_ENDPOINT'),
],
```

#### 7.3.2 Remaining Scrapers (8 hours)

**Co skopiować (14 remaining):**

```bash
# Priority 2 scrapers (5):
cp app/Console/Commands/Statestreet_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/Ubs_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/Shell_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/Aptiv_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/BipKrakow_Spider.php backend/app/Console/Commands/

# Priority 3 scrapers (9):
cp app/Console/Commands/Inpost_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/Nokia_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/PepsiCo_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/Pmi_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/Pzu_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/AssaAbloy_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/BrownBrothers_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/Sabre_Spider.php backend/app/Console/Commands/
cp app/Console/Commands/StatsNotifier.php backend/app/Console/Commands/
```

**Company models:**
```bash
# Stwórz migrations dla company-specific tables
# Skopiuj modele
cp app/Models/Capgemini.php backend/app/Models/
cp app/Models/Comarch.php backend/app/Models/
cp app/Models/IBM.php backend/app/Models/
# ... +7 more
```

#### 7.3.3 Email System (4 hours)

**Dependencies:**
```bash
composer require symfony/mailgun-mailer
composer require vormkracht10/filament-mails
```

**Co skopiować:**

```bash
# All mailables:
cp app/Mail/VerifyEmail.php backend/app/Mail/
cp app/Mail/PasswordReset.php backend/app/Mail/
cp app/Mail/TestEmail.php backend/app/Mail/

# Email views:
cp -r resources/views/emails/ backend/resources/views/
```

**Mailgun config:**
```php
// config/services.php
'mailgun' => [
    'domain' => env('MAILGUN_DOMAIN'),
    'secret' => env('MAILGUN_SECRET'),
    'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
],
```

---

### Priority 4: LOW (Optional/Later)

#### 7.4.1 Remaining Filament Resources (6 hours)

```bash
# Company-specific resources (10):
cp -r app/Filament/Resources/ComarchResource* backend/app/Filament/Resources/
cp -r app/Filament/Resources/CapgeminiResource* backend/app/Filament/Resources/
# ... +8 more

# System resources (3):
cp -r app/Filament/Resources/AiLogsResource* backend/app/Filament/Resources/
cp -r app/Filament/Resources/PositionResource* backend/app/Filament/Resources/
cp -r app/Filament/Resources/LevelResource* backend/app/Filament/Resources/
```

#### 7.4.2 Additional Features (10 hours)

- Queue monitoring (Filament Jobs Monitor)
- Email tracking (Filament Mails)
- Settings pages (Spatie Settings Plugin)
- Bulk actions (Queueable Bulk Actions)

---

## 8. ⚠️ Potencjalne Problemy

### 8.1 Architecture Conflicts

**Problem 1: Supabase vs Laravel**

NEW frontend jest zbudowany pod Supabase:
```typescript
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

**Rozwiązanie:**
- Option A: Wyrzuć Supabase, użyj Laravel API (rekomendowane)
- Option B: Laravel jako proxy do Supabase
- Option C: Dual backend (Laravel dla scraperów, Supabase dla frontu)

**Effort:** 6-10 hours

---

**Problem 2: Auth Flow**

OLD używa custom auth:
```php
FomoAuthController::class
RegistrationController::class
```

NEW używa Supabase Auth.

**Rozwiązanie:**
```bash
# Backend: Use Laravel Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\ServiceProvider"

# Frontend: Switch to Sanctum
// Login
const { data } = await api.post('/login', { email, password });
localStorage.setItem('auth_token', data.token);

// Logout
await api.post('/logout');
localStorage.removeItem('auth_token');
```

**Effort:** 4 hours

---

**Problem 3: Database Conflicts**

NEW ma własne migracje dla `users`, `events`, etc.

OLD ma 71 migracje z różnymi timestamps.

**Rozwiązanie:**
1. Rename NEW migrations (prefix with `2025_10_23`)
2. Run OLD migrations with later dates
3. Merge `users` table fields:
   ```sql
   ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
   ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;
   ALTER TABLE users ADD COLUMN verification_code VARCHAR(255);
   # ... +5 more fields
   ```

**Effort:** 3 hours

---

### 8.2 Security Issues (from OLD)

**Problem 1: Hardcoded API Keys**

```php
// ComarchResource.php, CapgeminiResource.php
'api-key' => 'xxxxxxxxxxxxx'  // ← CRITICAL
```

**Fix:**
```php
'api-key' => config('services.azure_openai.key')
```

**Effort:** 30 minutes

---

**Problem 2: Public API Endpoint**

```php
// routes/api.php
Route::post('/external/offers/{id}', [EpamAPIController::class, 'processData']);
// NO AUTH!
```

**Fix:**
```php
Route::middleware('auth:sanctum')->post('/external/offers/{id}', ...);
// Or use API token
```

**Effort:** 15 minutes

---

**Problem 3: Hardcoded Session Tokens**

```php
// UBS_Spider.php, Motorola_Spider.php, etc.
$cookie = 'hardcoded_session_value';
$csrf = 'hardcoded_csrf_token';
```

**Fix:**
```php
// Fetch dynamically
private function getCsrfToken() {
    $response = Http::get($loginPage);
    preg_match('/csrf-token" content="([^"]+)"/', $response->body(), $matches);
    return $matches[1] ?? null;
}
```

**Effort:** 2 hours (for all scrapers)

---

### 8.3 Performance Issues (from OLD)

**Problem 1: SetStatusOffer processes ALL offers**

```php
foreach (\App\Models\Offer::all() as $offer) {  // ← BAD
    // ...
}
```

**Fix:**
```php
Offer::whereDate('created_at', today())->chunk(100, function ($offers) {
    foreach ($offers as $offer) {
        // ...
    }
});
```

**Effort:** 30 minutes

---

**Problem 2: N+1 Queries in AlertController**

```php
$alerts = Alert::where('user_id', auth()->id())->get();
foreach ($alerts as $alert) {
    $alert->positions = $alert->positions()->get();  // N+1
}
```

**Fix:**
```php
$alerts = Alert::with(['positions', 'companies', 'levels'])
    ->where('user_id', auth()->id())
    ->get();
```

**Effort:** 15 minutes

---

### 8.4 Missing Features

**Issue 1: No .env.example in OLD**

Trzeba będzie ręcznie zrekonstruować wszystkie zmienne.

**Solution:** Stwórz `.env.example` dla NEW z pełną listą.

**Effort:** 1 hour

---

**Issue 2: No Tests**

Ani OLD ani NEW nie mają testów PHPUnit.

**Solution:** Opcjonalnie, dodaj testy później.

**Effort:** 20+ hours

---

**Issue 3: No Job Expiration**

Oferty pozostają w bazie na zawsze.

**Solution:**
```bash
php artisan make:command CleanupExpiredOffers

# Logic:
Offer::where('last_seen_at', '<', now()->subDays(30))->delete();
```

**Effort:** 2 hours

---

## 9. 💡 Rekomendacje

### 9.1 Strategia Migracji

**Rekomendacja: Hybrid Approach (Quickest to Production)**

#### Phase 1: MVP (2-3 tygodnie)

**Tygodz 1:**
1. ✅ Setup database (Priority 1.1) - 8h
2. ✅ Copy core models (Priority 1.2) - 10h
3. ✅ Create API endpoints (Priority 1.3) - 12h
4. ✅ Connect React to Laravel (Priority 2.3) - 6h

**Result:** Frontend działa z Laravel API, ale bez scraperów.

**Tygodź 2:**
5. ✅ Copy top 5 scrapers (Priority 1.4) - 12h
6. ✅ Alert system backend (Priority 2.1) - 8h
7. ✅ Filament admin (Priority 2.2) - 10h

**Result:** Core functionality działa (ręczne dodawanie ofert + alerty).

**Tygodź 3:**
8. ✅ Deploy to staging
9. ✅ Testing & bug fixes
10. ✅ Production launch (soft)

**Total:** 66 hours = ~2.5 weeks

---

#### Phase 2: Full Features (4-6 tygodni po MVP)

**Tygodź 4-5:**
1. Remaining scrapers (Priority 3.2) - 8h
2. AI integration (Priority 3.1) - 8h
3. Email system (Priority 3.3) - 4h
4. Company-specific models/tables - 8h

**Tygodź 6-7:**
1. Remaining Filament resources (Priority 4.1) - 6h
2. Queue monitoring - 3h
3. Performance optimizations - 4h
4. Security fixes from OLD - 3h

**Total:** 44 hours = ~1.5 weeks

---

**Grand Total:** 110 hours ≈ **4-5 tygodni** z buforem

---

### 9.2 Architektura Docelowa

```
┌─────────────────────────────────────────────┐
│           React Frontend (NEW)              │
│  - Vite + TypeScript                        │
│  - shadcn/ui + Radix UI                     │
│  - React Query + Zustand                    │
│  - Tailwind CSS                             │
└──────────────────┬──────────────────────────┘
                   │ HTTP/JSON
                   ↓
┌─────────────────────────────────────────────┐
│       Laravel API Backend (Hybrid)          │
│                                             │
│  REST API (/api/*)                          │
│  ├─ /offers                                 │
│  ├─ /alerts                                 │
│  ├─ /companies                              │
│  └─ /dashboard                              │
│                                             │
│  Filament Admin (/admin)                    │
│  ├─ Offers Management                       │
│  ├─ Scrapers Monitoring                     │
│  ├─ Users & Alerts                          │
│  └─ AI Settings                             │
│                                             │
│  Background Services                        │
│  ├─ Scrapers (19 firms) [Cron]             │
│  ├─ Alert Notifier [Cron]                  │
│  ├─ AI Classifier [Queue]                  │
│  └─ Email Sender [Queue]                   │
└──────────────────┬──────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────┐
│            External Services                │
│  - Azure OpenAI (AI classification)         │
│  - Mailgun (email delivery)                 │
│  - ntfy.sh (monitoring alerts)              │
└─────────────────────────────────────────────┘
```

---

### 9.3 Quick Wins (Zrób NAJPIERW)

#### 1. Create `.env.example` dla NEW (30 min)

```env
# App
APP_NAME=FOMOjobs
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fomojobs_new
DB_USERNAME=root
DB_PASSWORD=

# Mail
MAIL_MAILER=mailgun
MAILGUN_DOMAIN=
MAILGUN_SECRET=
MAIL_FROM_ADDRESS=noreply@fomojobs.pl
MAIL_FROM_NAME="${APP_NAME}"

# Azure OpenAI
AZURE_OPENAI_KEY=
AZURE_OPENAI_ENDPOINT=

# Queue
QUEUE_CONNECTION=database

# Monitoring
NTFY_TOPIC_ID=

# Feature Flags
ENABLE_SCRAPERS=true
ENABLE_AI_FEATURES=true
```

---

#### 2. Remove Supabase from React (1 hour)

```bash
# 1. Uninstall
npm uninstall @supabase/supabase-js

# 2. Delete folder
rm -rf src/integrations/supabase/

# 3. Create Laravel API client
# (See Priority 2.3)

# 4. Update .env.example
# Remove VITE_SUPABASE_*
# Add VITE_API_URL
```

---

#### 3. Fix Security Issues (1 hour)

```bash
# 1. Move hardcoded keys to .env
# 2. Add auth to public API
# 3. Dynamic token fetching
# (See Section 8.2)
```

---

#### 4. Setup Local Development (2 hours)

```bash
# Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

# Frontend
npm install
npm run dev

# Access:
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
# Admin: http://localhost:8000/admin
```

---

### 9.4 Czego NIE Robić

❌ **Nie migruj wszystkiego naraz**
- Zacznij od MVP
- Dodawaj scrapers stopniowo

❌ **Nie zostawiaj Supabase**
- Konflikt z Laravel
- Dodatkowe koszty
- Mniej kontroli

❌ **Nie kopiuj blind copy-paste**
- Sprawdź każdy scraper czy działa
- Update hardcoded values
- Test przed deployment

❌ **Nie ignoruj security issues**
- Fix hardcoded keys NAJPIERW
- Add auth to API endpoints
- Update session tokens

❌ **Nie deploy bez testów**
- Test każdy scraper manually
- Test alert emails
- Test API endpoints

---

## 10. 📝 Checklist dla Andrzeja

### Phase 1: MVP Setup (Week 1-3)

#### Week 1: Backend Core

- [ ] **Day 1-2: Database & Models**
  - [ ] Copy 12 core migrations
  - [ ] Run migrations
  - [ ] Copy 12 core models
  - [ ] Test relationships in tinker
  - [ ] Seed basic data (companies, positions, levels)

- [ ] **Day 3-4: API Endpoints**
  - [ ] Create API controllers (4)
  - [ ] Implement endpoints (10)
  - [ ] Test with Postman/Insomnia
  - [ ] Add Sanctum auth
  - [ ] Update CORS config

- [ ] **Day 5: Frontend Integration**
  - [ ] Remove Supabase
  - [ ] Create Laravel API client
  - [ ] Update .env files
  - [ ] Test connection
  - [ ] Fix auth flow

#### Week 2: Features

- [ ] **Day 1-2: Scrapers**
  - [ ] Copy top 5 scrapers
  - [ ] Copy Kernel.php
  - [ ] Copy ScheduledRun model
  - [ ] Test each scraper
  - [ ] Setup cron jobs
  - [ ] Add to Filament

- [ ] **Day 3: Alert System**
  - [ ] Copy AlertController
  - [ ] Copy AlertMail mailable
  - [ ] Copy email views
  - [ ] Setup Mailgun
  - [ ] Test email delivery
  - [ ] Copy AlertNotifier command

- [ ] **Day 4-5: Filament Admin**
  - [ ] Copy 5 priority resources
  - [ ] Copy widgets
  - [ ] Test admin panel
  - [ ] Add user permissions
  - [ ] Test bulk actions

#### Week 3: Polish & Deploy

- [ ] **Day 1: Security Fixes**
  - [ ] Move API keys to .env
  - [ ] Add auth to public endpoints
  - [ ] Dynamic token fetching
  - [ ] Test security

- [ ] **Day 2: Performance Fixes**
  - [ ] Fix SetStatusOffer
  - [ ] Fix N+1 queries
  - [ ] Add indexes
  - [ ] Test query performance

- [ ] **Day 3-4: Testing**
  - [ ] Test all scrapers
  - [ ] Test alert system
  - [ ] Test API endpoints
  - [ ] Test frontend flows
  - [ ] Fix bugs

- [ ] **Day 5: Deploy**
  - [ ] Setup staging environment
  - [ ] Deploy backend
  - [ ] Deploy frontend
  - [ ] Test production
  - [ ] Monitor errors

---

### Phase 2: Full Features (Week 4-7)

#### Week 4: Remaining Scrapers

- [ ] Copy 14 remaining scrapers
- [ ] Copy company models
- [ ] Test each scraper
- [ ] Add to cron schedule
- [ ] Monitor scraping logs

#### Week 5: AI Integration

- [ ] Install OpenAI package
- [ ] Copy AI jobs
- [ ] Copy AI settings page
- [ ] Test AI classification
- [ ] Monitor AI logs

#### Week 6: Email & Monitoring

- [ ] Install email packages
- [ ] Copy remaining mailables
- [ ] Setup email tracking
- [ ] Add ntfy.sh monitoring
- [ ] Test notifications

#### Week 7: Polish & Optimize

- [ ] Add remaining Filament resources
- [ ] Add queue monitoring
- [ ] Performance optimizations
- [ ] Documentation
- [ ] Final testing

---

## 11. 🎯 Success Metrics

### MVP Success (After Week 3)

✅ **Must Have:**
- [ ] React frontend połączony z Laravel API
- [ ] Top 5 scrapers działają
- [ ] Alert system wysyła maile
- [ ] Filament admin działa
- [ ] Users mogą:
  - Przeglądać oferty
  - Tworzyć alerty
  - Otrzymywać emaile
  - Logować się

⚠️ **Nice to Have:**
- [ ] 10+ scrapers działa
- [ ] AI classification włączone
- [ ] Dark mode w Filament
- [ ] Mobile responsive

---

### Full Launch Success (After Week 7)

✅ **Must Have:**
- [ ] Wszystkie 19 scrapers działają
- [ ] AI classification działa
- [ ] Email tracking działa
- [ ] Queue monitoring działa
- [ ] Performance metrics good:
  - FCP < 2s
  - LCP < 2.5s
  - API response < 200ms

✅ **Nice to Have:**
- [ ] Tests coverage > 50%
- [ ] Documentation complete
- [ ] Monitoring dashboards
- [ ] Error tracking (Sentry)

---

## 12. 📚 Resources

### Documentation (Already in NEW)

- `ANALYSIS_REPORT.md` - Performance & UX analysis
- `MIGRATION_STATUS.md` - Frontend migration status
- `SECURITY_FIXES_SUMMARY.md` - Security issues
- `PERFORMANCE_ANALYSIS.md` - Bundle size & optimizations

### External Resources

- Laravel 10 Docs: https://laravel.com/docs/10.x
- Filament 3 Docs: https://filamentphp.com/docs/3.x
- React Query Docs: https://tanstack.com/query/latest
- shadcn/ui Docs: https://ui.shadcn.com/

### Support

- Laravel Discord: https://discord.gg/laravel
- Filament Discord: https://discord.gg/filamentphp
- React Discord: https://discord.gg/react

---

## 13. 🔚 Podsumowanie

### TL;DR dla Andrzeja

**Co masz:**
- ✅ Świetny React frontend (60h pracy)
- ✅ Podstawowy Laravel backend (10h pracy)
- ✅ Dokumentacja (20h pracy)

**Co musisz zrobić:**
- ❌ Przenieść 110h pracy z OLD do NEW
- ⚠️ Wyrzucić Supabase, użyć Laravel API
- ✅ Połączyć React z Laravel
- ✅ Dodać scrapers, alerts, AI

**Ile czasu:**
- MVP: 2-3 tygodnie (66h)
- Full: 4-5 tygodni (110h)

**Najważniejsze:**
1. Zacznij od API endpoints
2. Połącz React z Laravel
3. Dodawaj scrapers stopniowo
4. Deploy MVP szybko, iteruj

**Powodzenia! 🚀**

---

**Koniec Raportu**
**Data:** 2025-10-22
**Przygotował:** Claude Analysis Engine
