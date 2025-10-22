# FOMOjobs API Contract

**Frontend → Backend Integration Guide**

Ten dokument definiuje jakie endpointy backend (Laravel) musi zaimplementować, żeby frontend (React) działał poprawnie.

---

## 🔐 Authentication

### POST `/api/register`
Rejestracja nowego użytkownika.

**Request:**
```json
{
  "name": "Jan Kowalski",
  "email": "jan@example.com",
  "password": "haslo123",
  "password_confirmation": "haslo123"
}
```

**Response 201:**
```json
{
  "data": {
    "user": {
      "id": 1,
      "name": "Jan Kowalski",
      "email": "jan@example.com",
      "email_verified_at": null,
      "created_at": "2025-10-22T10:00:00Z",
      "updated_at": "2025-10-22T10:00:00Z"
    },
    "token": "1|abc123xyz..."
  }
}
```

---

### POST `/api/login`
Logowanie użytkownika.

**Request:**
```json
{
  "email": "jan@example.com",
  "password": "haslo123"
}
```

**Response 200:**
```json
{
  "data": {
    "user": { ... },
    "token": "2|def456uvw..."
  }
}
```

---

### POST `/api/logout`
Wylogowanie (wymaga tokenu w header).

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "message": "Logged out successfully"
}
```

---

### GET `/api/user`
Pobierz aktualnie zalogowanego użytkownika.

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "data": {
    "id": 1,
    "name": "Jan Kowalski",
    "email": "jan@example.com",
    ...
  }
}
```

---

## 🔔 Alerts

### GET `/api/alerts`
Lista wszystkich alertów zalogowanego użytkownika.

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "keywords": "php, laravel, senior",
      "excluded_keywords": "junior, staz",
      "excluded_languages": ["en"],
      "frequency": "daily",
      "positions": [
        { "id": 1, "name": "Backend Developer", ... }
      ],
      "companies": [
        { "id": 1, "name": "Google", "url": "...", ... }
      ],
      "levels": [
        { "id": 3, "name": "Senior", ... }
      ],
      "created_at": "2025-10-20T10:00:00Z",
      "updated_at": "2025-10-20T10:00:00Z"
    }
  ]
}
```

---

### GET `/api/alerts/{id}`
Szczegóły pojedynczego alertu.

**Response 200:** (jak wyżej, ale pojedynczy obiekt)

---

### POST `/api/alerts`
Stwórz nowy alert.

**Request:**
```json
{
  "keywords": "react, typescript",
  "excluded_keywords": "junior",
  "excluded_languages": ["de"],
  "frequency": "daily",
  "position_ids": [1, 2, 3],
  "company_ids": [5, 10],
  "level_ids": [2, 3]
}
```

**Response 201:**
```json
{
  "data": {
    "id": 2,
    "user_id": 1,
    ...
  }
}
```

---

### PUT `/api/alerts/{id}`
Edytuj istniejący alert.

**Request:** (jak POST, ale pola opcjonalne)

**Response 200:** (zaktualizowany alert)

---

### DELETE `/api/alerts/{id}`
Usuń alert.

**Response 204:** (no content)

---

## 💼 Offers (Job Listings)

### GET `/api/offers?page=1&per_page=20`
Lista ofert (paginacja).

**Query params:**
- `page` (int, default: 1)
- `per_page` (int, default: 20)

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Senior PHP Developer",
      "company": {
        "id": 1,
        "name": "Google",
        "url": "...",
        "logo_url": "...",
        ...
      },
      "position": {
        "id": 1,
        "name": "Backend Developer",
        ...
      },
      "level": {
        "id": 3,
        "name": "Senior",
        ...
      },
      "url": "https://google.com/careers/jobs/123",
      "description": "...",
      "salary_min": 15000,
      "salary_max": 25000,
      "location": "Kraków",
      "remote": true,
      "contract_type": "B2B",
      "published_at": "2025-10-22T08:00:00Z",
      "scraped_at": "2025-10-22T09:00:00Z",
      "status": "active",
      ...
    }
  ],
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 5,
    "per_page": 20,
    "to": 20,
    "total": 100
  }
}
```

---

### GET `/api/offers/{id}`
Szczegóły pojedynczej oferty.

**Response 200:** (jak wyżej, ale pojedynczy obiekt)

---

### GET `/api/offers/matched`
Oferty dopasowane do alertów użytkownika.

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "data": [
    { ... oferta ... },
    { ... oferta ... }
  ]
}
```

---

### GET `/api/offers/latest`
Najnowsze oferty (z dzisiejszego scrapingu).

**Response 200:** (lista ofert)

---

### GET `/api/offers/search?q=php&location=Kraków`
Wyszukiwanie ofert.

**Query params:**
- `q` (string) - wyszukiwana fraza
- `location` (string, optional)
- `position_id` (int, optional)
- `company_id` (int, optional)
- `level_id` (int, optional)
- `remote` (boolean, optional)

**Response 200:** (lista ofert)

---

## 📚 Reference Data

### GET `/api/companies`
Lista wszystkich firm.

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Google",
      "url": "https://google.com/careers",
      "logo_url": "https://logo.clearbit.com/google.com",
      "is_active": true,
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

---

### GET `/api/positions`
Lista wszystkich stanowisk.

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Backend Developer",
      "slug": "backend-developer",
      "group_id": 1,
      "group": {
        "id": 1,
        "name": "Software Development",
        ...
      },
      ...
    }
  ]
}
```

---

### GET `/api/levels`
Lista poziomów (seniority).

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Junior",
      "slug": "junior",
      "order": 1,
      ...
    },
    {
      "id": 2,
      "name": "Mid",
      "slug": "mid",
      "order": 2,
      ...
    }
  ]
}
```

---

### GET `/api/groups`
Lista grup stanowisk (kategorie).

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Software Development",
      "slug": "software-development",
      ...
    }
  ]
}
```

---

## 🔒 Authentication Headers

Wszystkie endpointy wymagające autoryzacji muszą mieć header:
```
Authorization: Bearer {token}
```

Token zwracany jest przy `/api/login` i `/api/register`.

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["Email is required"],
    "password": ["Password must be at least 8 characters"]
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthenticated"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## ✅ Implementation Checklist dla Andrzeja

### Priority 1 (MVP):
- [ ] POST `/api/register`
- [ ] POST `/api/login`
- [ ] POST `/api/logout`
- [ ] GET `/api/user`
- [ ] GET `/api/alerts`
- [ ] POST `/api/alerts`
- [ ] DELETE `/api/alerts/{id}`
- [ ] GET `/api/offers`
- [ ] GET `/api/offers/matched`
- [ ] GET `/api/companies`
- [ ] GET `/api/positions`
- [ ] GET `/api/levels`

### Priority 2:
- [ ] PUT `/api/alerts/{id}`
- [ ] GET `/api/alerts/{id}`
- [ ] GET `/api/offers/{id}`
- [ ] GET `/api/offers/latest`
- [ ] GET `/api/offers/search`
- [ ] GET `/api/groups`

---

## 📝 Notes dla Andrzeja

1. **CORS:** Pamiętaj włączyć CORS w Laravel dla `http://localhost:5173` (Vite dev server)
2. **Token:** Używaj Laravel Sanctum do generowania tokenów
3. **Pagination:** Laravel domyślnie zwraca `meta` - wykorzystaj to
4. **Eager Loading:** Zawsze `->with(['company', 'position', 'level'])` dla ofert
5. **Validation:** Frontend oczekuje `errors` jako obiekt z array'ami
6. **Timestamps:** ISO 8601 format (`2025-10-22T10:00:00Z`)
