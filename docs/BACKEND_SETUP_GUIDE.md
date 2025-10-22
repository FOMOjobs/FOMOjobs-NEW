# Backend Setup Guide dla Andrzeja

**Jak podłączyć Laravel backend do React frontendu**

---

## 🎯 Cel

Frontend (React + TypeScript) jest **gotowy** i czeka na backend.
Ten guide pokaże Ci jak szybko podłączyć swój Laravel do działającego UI.

---

## ✅ Co już jest gotowe (frontend)

- ✅ API client layer (`src/api/`)
- ✅ TypeScript types (`src/types/api.ts`)
- ✅ Mock data dla development (`src/mocks/`)
- ✅ Wszystkie komponenty UI
- ✅ Routing i navigation
- ✅ Dokumentacja API (`docs/API_CONTRACT.md`)

---

## 🚀 Quick Start (30 minut)

### Krok 1: Sklonuj kod z FOMOjobs-OLD
```bash
# Skopiuj kluczowe pliki z OLD do FOMOjobs-NEW/backend/

cd /path/to/FOMOjobs-OLD

# Modele
cp app/Models/User.php /path/to/FOMOjobs-NEW/backend/app/Models/
cp app/Models/Alert.php /path/to/FOMOjobs-NEW/backend/app/Models/
cp app/Models/Offer.php /path/to/FOMOjobs-NEW/backend/app/Models/
cp app/Models/Company.php /path/to/FOMOjobs-NEW/backend/app/Models/
cp app/Models/Position.php /path/to/FOMOjobs-NEW/backend/app/Models/
cp app/Models/Level.php /path/to/FOMOjobs-NEW/backend/app/Models/

# Migracje (wybierz kluczowe)
cp database/migrations/*_create_users_table.php /path/to/FOMOjobs-NEW/backend/database/migrations/
cp database/migrations/*_create_alerts_table.php /path/to/FOMOjobs-NEW/backend/database/migrations/
cp database/migrations/*_create_offers_table.php /path/to/FOMOjobs-NEW/backend/database/migrations/
cp database/migrations/*_create_companies_table.php /path/to/FOMOjobs-NEW/backend/database/migrations/
cp database/migrations/*_create_positions_table.php /path/to/FOMOjobs-NEW/backend/database/migrations/
cp database/migrations/*_create_levels_table.php /path/to/FOMOjobs-NEW/backend/database/migrations/
```

---

### Krok 2: Stwórz API Controllers
```bash
cd /path/to/FOMOjobs-NEW/backend

php artisan make:controller Api/AuthController
php artisan make:controller Api/AlertController
php artisan make:controller Api/OfferController
php artisan make:controller Api/ReferenceController
```

Wypełnij je zgodnie z `docs/API_CONTRACT.md`

---

### Krok 3: Routing (`routes/api.php`)
```php
<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AlertController;
use App\Http\Controllers\Api\OfferController;
use App\Http\Controllers\Api\ReferenceController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Alerts
    Route::apiResource('alerts', AlertController::class);

    // Offers
    Route::get('/offers', [OfferController::class, 'index']);
    Route::get('/offers/{id}', [OfferController::class, 'show']);
    Route::get('/offers/matched', [OfferController::class, 'matched']);
    Route::get('/offers/latest', [OfferController::class, 'latest']);
    Route::get('/offers/search', [OfferController::class, 'search']);
});

// Reference data (public)
Route::get('/companies', [ReferenceController::class, 'companies']);
Route::get('/positions', [ReferenceController::class, 'positions']);
Route::get('/levels', [ReferenceController::class, 'levels']);
Route::get('/groups', [ReferenceController::class, 'groups']);
```

---

### Krok 4: CORS Configuration
```bash
# config/cors.php

'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:5173'], // Vite dev server
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

---

### Krok 5: Sanctum Setup
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# config/sanctum.php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,localhost:5173')),
```

---

### Krok 6: Database Migration
```bash
php artisan migrate
```

---

### Krok 7: Start Backend
```bash
php artisan serve
# Backend działa na http://localhost:8000
```

---

### Krok 8: Połącz Frontend
```bash
cd /path/to/FOMOjobs-NEW

# Edytuj .env
echo "VITE_USE_MOCKS=false" > .env
echo "VITE_API_URL=http://localhost:8000/api" >> .env

# Start frontend
npm run dev
# Frontend działa na http://localhost:5173
```

---

## 🧪 Test Integracji

1. Otwórz `http://localhost:5173`
2. Zarejestruj nowego użytkownika
3. Stwórz alert
4. Sprawdź czy dane zapisują się w bazie

---

## 📋 Implementation Checklist

### Week 1: Core API (12h)
- [ ] AuthController (login, register, logout) - 3h
- [ ] AlertController (CRUD) - 4h
- [ ] OfferController (index, show) - 3h
- [ ] ReferenceController (companies, positions, levels) - 2h

### Week 2: Advanced Features (8h)
- [ ] Offer matching algorithm - 4h
- [ ] Search functionality - 2h
- [ ] Pagination - 1h
- [ ] Error handling - 1h

### Week 3: Testing & Deploy (6h)
- [ ] API tests - 3h
- [ ] Frontend integration tests - 2h
- [ ] Deploy to staging - 1h

---

## 🐛 Common Issues

### Issue: CORS errors
**Fix:** Sprawdź `config/cors.php` i dodaj `http://localhost:5173` do `allowed_origins`

### Issue: Unauthorized (401)
**Fix:** Sprawdź czy token jest w `localStorage` i czy Sanctum jest poprawnie skonfigurowany

### Issue: Validation errors nie pokazują się
**Fix:** Backend musi zwracać `errors` jako obiekt:
```php
return response()->json([
    'message' => 'Validation failed',
    'errors' => $validator->errors()
], 422);
```

---

## 📞 Potrzebujesz pomocy?

Sprawdź:
1. `docs/API_CONTRACT.md` - szczegóły każdego endpointu
2. `FOMOjobs-NEW-SETUP-GUIDE-FOR-ANDRZEJ.md` - pełny migration guide
3. `src/api/` - zobacz jak frontend wywołuje API
