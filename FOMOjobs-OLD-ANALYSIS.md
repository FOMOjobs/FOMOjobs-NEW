# FOMOjobs-OLD - Kompleksowa Analiza Projektu

**Data analizy:** 2025-10-22
**Projekt:** FOMOjobs (Stara Wersja - Andrzej)
**Lokalizacja:** `/tmp/FOMOjobs-OLD`

---

## Spis Treści

1. [Tech Stack & Dependencies](#1-tech-stack--dependencies)
2. [Struktura Bazy Danych](#2-struktura-bazy-danych)
3. [Modele i Logika Biznesowa](#3-modele-i-logika-biznesowa)
4. [Scraper i Automatyzacja](#4-scraper-i-automatyzacja)
5. [System Alertów](#5-system-alertów)
6. [Filament Admin Panel](#6-filament-admin-panel)
7. [API i Integracje](#7-api-i-integracje)
8. [Konfiguracja](#8-konfiguracja)
9. [Routes](#9-routes)
10. [Potencjalne Problemy](#10-potencjalne-problemy)

---

## 1. Tech Stack & Dependencies

### 1.1 Backend (PHP/Laravel)

**Framework & Wersje:**
- **Laravel:** `^10.10` (Laravel 10)
- **PHP:** `^8.1` (minimum PHP 8.1)
- **Filament:** `^3.3` (Filament v3 - admin panel)
- **Livewire:** `^3.0` (real-time interface)

**Główne Packages (composer.json):**

| Package | Wersja | Cel |
|---------|--------|-----|
| `filament/filament` | ^3.3 | Admin panel framework |
| `filament/spatie-laravel-settings-plugin` | ^3.2 | Settings management |
| `laravel/sanctum` | ^3.3 | API authentication |
| `openai-php/laravel` | ^0.11.0 | **OpenAI/Azure AI integration** |
| `guzzlehttp/guzzle` | ^7.2 | HTTP client (web scraping) |
| `symfony/http-client` | ^6.4 | Alternative HTTP client |
| `symfony/mailgun-mailer` | ^6.4 | Email delivery |
| `bytexr/filament-queueable-bulk-actions` | ^0.3.3 | Queued bulk operations |
| `croustibat/filament-jobs-monitor` | ^2.6 | Job queue monitoring |
| `vormkracht10/filament-mails` | ^2.3 | Email management UI |

**Dev Dependencies:**
- `laravel/sail` ^1.18 (Docker development)
- `phpunit/phpunit` ^10.1 (Testing)
- `laravel/pint` ^1.0 (Code formatting)

### 1.2 Frontend (Node.js)

**package.json:**
```json
{
  "devDependencies": {
    "axios": "^1.6.4",
    "laravel-vite-plugin": "^1.0.0",
    "vite": "^5.0.0"
  }
}
```

**Build System:** Vite 5.0
**Scripts:**
- `npm run dev` - Development mode
- `npm run build` - Production build

### 1.3 Narzędzia Zewnętrzne

1. **Azure OpenAI API** - AI classification jobs
2. **Mailgun** - Email delivery service
3. **ntfy.sh** - Push notifications (monitoring)
4. **Tampermonkey** - Browser automation (EPAM scraper)

---

## 2. Struktura Bazy Danych

### 2.1 Główne Tabele Biznesowe

#### **offers** - Centralna tabela ofert pracy
```sql
CREATE TABLE offers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    job_id VARCHAR UNIQUE,                    -- Unikalny ID z source
    company_id BIGINT FOREIGN KEY,            -- → companies.id
    position_id BIGINT FOREIGN KEY NULLABLE,  -- → positions.id
    level_id BIGINT NULLABLE,                 -- → levels.id
    title VARCHAR NULLABLE,
    location VARCHAR NULLABLE,
    link VARCHAR NULLABLE,
    offertext LONGTEXT NULLABLE,              -- Pełny opis oferty
    aistatus BOOLEAN NULLABLE,                -- AI processing status
    status BOOLEAN NULLABLE,                  -- Kraków filter (1=show)
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

**Relacje:**
- `company_id` → `companies.id` (CASCADE DELETE)
- `position_id` → `positions.id` (CASCADE DELETE)
- `level_id` → `levels.id`

#### **companies** - Firmy
```sql
CREATE TABLE companies (
    id BIGINT PRIMARY KEY,
    name VARCHAR,
    icon VARCHAR NULLABLE,        -- Logo firmy
    enabled BOOLEAN DEFAULT 1,     -- Aktywna/nieaktywna
    tooltip VARCHAR NULLABLE,      -- Opis dla UI
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

**Firmy w systemie (19):**
1. Capgemini (ID: 6)
2. Comarch (ID: 7)
3. HSBC (ID: 8)
4. Shell (ID: 9)
5. UBS (ID: 10)
6. State Street (ID: 11)
7. IBM (ID: 12)
8. Aptiv (ID: 13)
9. Motorola (ID: 14)
10. BIP Kraków (ID: 15)
11. InPost (ID: 16)
12. PMI (ID: 17)
13. Sabre (ID: 19)
14. Brown Brothers Harriman (ID: 21)
15. PepsiCo (ID: 22)
16. ASSA ABLOY (ID: 23)
17. PZU (ID: 24)
18. Cathay Pacific (ID: 25)
19. Nokia, Euroclear (IDs: 26, 27)

#### **positions** - Stanowiska pracy
```sql
CREATE TABLE positions (
    id BIGINT PRIMARY KEY,
    name VARCHAR UNIQUE,
    group_id BIGINT FOREIGN KEY,  -- → groups.id
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

**Przykłady:** Developer, QA Engineer, DevOps, Project Manager, Designer

#### **groups** - Grupy stanowisk
```sql
CREATE TABLE groups (
    id BIGINT PRIMARY KEY,
    name VARCHAR UNIQUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

**Przykłady:** Engineering, Marketing, Sales, HR, Finance

#### **levels** - Poziomy doświadczenia
```sql
CREATE TABLE levels (
    id BIGINT PRIMARY KEY,
    name VARCHAR UNIQUE,
    ainame VARCHAR NULLABLE,      -- Nazwa dla AI matching
    tooltip VARCHAR NULLABLE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

**Przykłady:** Junior, Mid, Senior, Lead, Principal

### 2.2 System Alertów

#### **alerts** - Alerty użytkowników
```sql
CREATE TABLE alerts (
    id BIGINT PRIMARY KEY,
    user_id BIGINT FOREIGN KEY,   -- → users.id (CASCADE DELETE)
    title VARCHAR,
    hour TIME,                     -- Godzina wysyłki
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### **alert_positions** - Pivot: Alert ↔ Position
```sql
CREATE TABLE alert_positions (
    id BIGINT PRIMARY KEY,
    alert_id BIGINT FOREIGN KEY,     -- → alerts.id (CASCADE)
    position_id BIGINT FOREIGN KEY,  -- → positions.id (CASCADE)
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### **alert_companies** - Pivot: Alert ↔ Company
```sql
CREATE TABLE alert_companies (
    id BIGINT PRIMARY KEY,
    alert_id BIGINT FOREIGN KEY,     -- → alerts.id (CASCADE)
    company_id BIGINT FOREIGN KEY,   -- → companies.id (CASCADE)
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### **alert_levels** - Pivot: Alert ↔ Level
```sql
CREATE TABLE alert_levels (
    id BIGINT PRIMARY KEY,
    alert_id BIGINT FOREIGN KEY,   -- → alerts.id (CASCADE)
    level_id BIGINT FOREIGN KEY,   -- → levels.id (CASCADE)
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 2.3 Tabele Firm (Staging Data)

Każda firma ma swoją tabelę do przechowywania surowych danych ze scrapingu:

**Wzór:**
```sql
CREATE TABLE {company_name}s (
    id BIGINT PRIMARY KEY,
    job_id VARCHAR UNIQUE,
    title VARCHAR NULLABLE,
    location VARCHAR NULLABLE,
    offertext LONGTEXT NULLABLE,  -- Dodane później
    -- Pola specyficzne dla firmy
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

**Lista tabel firm:**
1. `capgeminis` - 26 pól (AWS ID, brand, contract_type, education_level, etc.)
2. `comarches` - 38 pól (user_id, tree_id, profile_id, modules_id, etc.)
3. `hsbcs` - 7 pól (href, type, contract, category)
4. `ibms` - 10 pól (language, url, area, type, level)
5. `motorolas` - 7 pól (external_path, posted_on, bullet_code)
6. `statestreets` - 15 pól (skills, category, sub_category, industry)
7. `ubs` - 10 pól (jobtitle, department, team, clientid)
8. `aptivs` - 11 pól (primarylocation, jobfamily, jobprofiles)
9. `bip_krakows` - 3 pola (minimalistyczna)
10. `shells` - 6 pól (category, level)

### 2.4 Tabele Systemowe i Logowania

#### **spider_logs** - Logi scraperów
```sql
CREATE TABLE spider_logs (
    id BIGINT PRIMARY KEY,
    name VARCHAR,
    company_id INTEGER NULLABLE,
    fetched INTEGER NULLABLE,     -- Liczba pobranych ofert
    created INTEGER NULLABLE,     -- Liczba nowych ofert
    description LONGTEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### **ai_logs** - Logi AI processing
```sql
CREATE TABLE ai_logs (
    id BIGINT PRIMARY KEY,
    payload LONGTEXT NULLABLE,
    response LONGTEXT NULLABLE,
    tokens INTEGER,               -- Koszt API call
    status INTEGER,               -- HTTP status
    offer_id BIGINT NULLABLE,
    positionName VARCHAR NULLABLE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### **scheduled_runs** - Konfiguracja cron jobs
```sql
CREATE TABLE scheduled_runs (
    id BIGINT PRIMARY KEY,
    name VARCHAR,
    command VARCHAR,              -- Artisan command
    expression VARCHAR,           -- Cron expression
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### **users** - Użytkownicy
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    name VARCHAR,
    email VARCHAR UNIQUE,
    password VARCHAR,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_newsletter BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    verification_code VARCHAR NULLABLE,
    password_reset_token VARCHAR NULLABLE,
    firstmail BOOLEAN DEFAULT 0,
    email_verified_at TIMESTAMP NULLABLE,
    remember_token VARCHAR NULLABLE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 2.5 Diagram Relacji

```
users (1) ──────► (M) alerts (M) ◄──────► (M) positions
                    ▲                           ▲
                    │                           │
                    ├── (M) alert_companies (M)─┤
                    │                           │
                    └── (M) alert_levels (M)────┘

                                    companies (1) ──► (M) offers
                                                           ▲
                                                           │
                                    positions (1) ─────────┤
                                                           │
                                    levels (1) ────────────┘

                    offers (1) ◄────── (*) ai_logs
```

---

## 3. Modele i Logika Biznesowa

### 3.1 Główne Modele

#### **Offer** (`app/Models/Offer.php`)
**Cel:** Znormalizowane oferty pracy ze wszystkich źródeł

**Fillable:**
- `job_id`, `title`, `link`, `location`
- `company_id`, `position_id`, `level_id`
- `status`, `aistatus`, `offertext`

**Relationships:**
```php
public function company(): BelongsTo
public function position(): BelongsTo
public function level(): BelongsTo
```

#### **Alert** (`app/Models/Alert.php`)
**Cel:** Alerty użytkowników z kryteriami wyszukiwania

**Relationships:**
```php
public function user(): BelongsTo
public function positions(): BelongsToMany
public function companies(): BelongsToMany
public function levels(): BelongsToMany
public function alertPositions(): HasMany
public function alertCompanies(): HasMany
public function alertLevels(): HasMany
```

**Logika:** Alert może mieć wiele pozycji, firm i poziomów (OR logic)

#### **Company** (`app/Models/Company.php`)
**Cel:** Katalog firm z których pochodzą oferty

**Inverse Relations:**
- Referenced by `Offer::company()`
- Referenced by `AlertCompany::company()`

#### **Position** (`app/Models/Position.php`)
**Relationships:**
```php
public function group(): BelongsTo
```

#### **User** (`app/Models/User.php`)
**Extends:** `Illuminate\Foundation\Auth\User`

**Traits:**
- `HasApiTokens` (Sanctum)
- `HasFactory`
- `Notifiable`

**Fillable:**
- `name`, `email`, `password`
- `is_admin`, `is_newsletter`, `is_active`, `is_verified`
- `verification_code`

**Casts:**
```php
'email_verified_at' => 'datetime',
'password' => 'hashed'
```

### 3.2 Modele Firm (10x)

Wszystkie modele firm (`Capgemini`, `Comarch`, `IBM`, `HSBC`, `Motorola`, `UBS`, `Shell`, `Statestreet`, `Aptiv`, `BipKrakow`):

**Wspólne cechy:**
- Używają `HasFactory` trait
- Brak defined relationships
- Brak custom methods
- Służą jako staging tables

**Przepływ danych:**
```
Company API/Website → Scraper → Company Model → Normalization → Offer Model
```

### 3.3 Modele Logowania

#### **SpiderLog** (`app/Models/SpiderLog.php`)
Trackuje uruchomienia scraperów:
- Nazwa scrapera
- Company ID
- Liczba pobranych/utworzonych ofert
- Opis z timestampem

#### **AiLogs** (`app/Models/AiLogs.php`)
Loguje interakcje z AI:
```php
public function offer(): BelongsTo
```
- Payload (request)
- Response
- Tokens consumed
- Status code
- Offer ID, Position name

---

## 4. Scraper i Automatyzacja

### 4.1 Architektura Scraperów

**Lokalizacja:** `app/Console/Commands/*_Spider.php`

**Liczba scraperów:** 24 (19 działających, 2 incomplete)

**Wzór implementacji:**
```php
class CompanyName_Spider extends Command
{
    protected $signature = 'app:company-spider';

    public function handle() {
        \Log::info('Spider started');
        $pages = $this->calculatePages();

        $cnt = 1;
        while ($cnt <= $pages) {
            $data = $this->get_data($cnt);
            $this->processData($data);
            $this->logResults($cnt);
            $cnt++;
        }
    }

    private function get_data($pageNo) {
        $response = Http::get($url, ['page' => $pageNo]);
        return $response->json();
    }
}
```

### 4.2 Firmy i Metody Scrapingu

| Firma | Metoda | Endpoint Type | Paginacja |
|-------|--------|---------------|-----------|
| **Aptiv** | POST JSON | HawkSearch API | PageNo (dynamic) |
| **ASSA ABLOY** | GET JSON | REST API | Single page |
| **CapGemini** | GET JSON | Azure microservice | Page-based (11/page) |
| **Comarch** | GET JSON | Custom API | Page-based |
| **IBM** | POST JSON | Elasticsearch-like | 30/page, offset |
| **Motorola** | POST JSON | Workday API | 20/page + cookies |
| **Nokia** | GET JSON | Oracle HCM Cloud | 10/page |
| **PepsiCo** | GET JSON | Jobs API | 10/page |
| **PZU** | GET AJAX | Component API | 100/page + cookies |
| **Brown Brothers** | POST JSON | Workday | CSRF token required |
| **Sabre** | POST JSON | Workday | Similar pattern |
| **BIP Kraków** | HTML Parsing | Gov website | DOMXPath, `<ol><li>` |
| **HSBC** | HTML Parsing | Career page | XPath + regex |
| **Shell** | JSON w/ HTML | Search API | HTML in JSON response |
| **InPost** | Dynamic JS | Multi-step | Regex extraction |
| **PMI** | JS Extraction | Career page | `phApp.ddo` object |
| **State Street** | JS Extraction | Career page | Same as PMI |
| **UBS** | Session-based | Ajax endpoint | Session from DOM |
| **Cathay** | ❌ Incomplete | - | Contains `die()` |
| **Euroclear** | ❌ Incomplete | - | Contains `die()` |

### 4.3 Dane Zbierane

**Standardowe pola (wszystkie):**
```php
$ndata = [
    'job_id' => "{prefix}-{unique_id}",
    'title' => $title,
    'link' => $url,
    'location' => $location,
    'company_id' => $company_id,
    'offertext' => $description  // jeśli dostępne
];
```

**Dodatkowe pola (selektywne):**
- Job family/category
- Contract type
- Education/experience level
- Department
- Posted date
- Custom company fields

### 4.4 Storage Mechanism

**Metoda 1 (większość):**
```php
Offer::firstOrCreate(['job_id' => $ndata['job_id']], $ndata);
```
- Tworzy nową jeśli nie istnieje
- **NIE aktualizuje** istniejących

**Metoda 2 (ASSA ABLOY, InPost):**
```php
Offer::updateOrCreate(['job_id' => $ndata['job_id']], $ndata);
```
- Aktualizuje jeśli się zmieniło

**Logging:**
```php
SpiderLog::create([
    'name' => 'CompanyName',
    'company_id' => 13,
    'fetched' => $fetched,
    'created' => $created,
    'description' => "Fetched: {$fetched}, created: {$created}, from page: {$cnt}"
]);
```

### 4.5 Scheduled Tasks (Kernel.php)

**Lokalizacja:** `app/Console/Kernel.php`

**Mechanizm:**
```php
protected function schedule(Schedule $schedule): void
{
    ScheduledRun::where('enabled', true)->get()->each(function ($task) use ($schedule) {
        $schedule->command($task->command)->cron($task->expression);
    });
}
```

**Dynamiczne cron jobs z bazy danych!**

Przykładowe zadania:
- `app:aptiv-spider` - cron: `0 */6 * * *` (co 6h)
- `app:cap-gemini-spider` - cron: `0 8 * * *` (8:00)
- `app:alert-notifier` - cron: `0 * * * *` (co godzinę)
- `app:set-status-offer` - cron: `30 */6 * * *` (po scraperach)
- `app:stats-notifier` - cron: `0 23 * * *` (23:00)

### 4.6 Supporting Commands

#### **AlertNotifier** (`app:alert-notifier`)

**Funkcja:** Wysyła maile z ofertami dopasowanymi do alertów

**Flow:**
```php
1. Pobierz current hour (np. 8)
2. Find alerts where hour = '08:00:00'
3. For each alert:
   a. Get user preferences (positions, companies, levels)
   b. Query today's offers matching criteria
   c. Query week's offers matching criteria
   d. Group by position group
   e. Send email via AlertMail mailable
   f. Mark user as firstmail = 1
```

**Query:**
```php
Offer::whereDate('created_at', '=', $day)
     ->whereIn('position_id', $alertPositions)
     ->where('status', '=', 1)  // Only Krakow
     ->whereIn('company_id', $alertCompanies)
     ->whereIn('level_id', $alertLevels)
     ->get()
```

#### **SetStatusOffer** (`app:set-status-offer`)

**Funkcja:** Filtruje oferty tylko dla Krakowa

**Logika:**
```php
foreach (Offer::all() as $offer) {
    $status = false;

    if (stripos($offer->location, 'krakow') !== false) $status = true;
    if (stripos($offer->location, 'kraków') !== false) $status = true;

    // Special: HSBC, UBS with "Poland" = Krakow
    if (in_array($offer->company_id, [8, 10]) && $offer->location == 'Poland') {
        $status = true;
    }

    $offer->status = $status;
    $offer->save();
}
```

**Problem:** Przetwarza WSZYSTKIE oferty każdorazowo (nieoptymalne)

#### **StatsNotifier** (`app:stats-notifier`)

**Funkcja:** Monitoruje health scraperów i wysyła notyfikacje

**Sprawdza:**
1. **Spider execution:**
```sql
SELECT a.id, a.name,
       (SELECT SUM(fetched) FROM spider_logs
        WHERE company_id = a.id AND DATE(created_at) = DATE(NOW())) as fetched_today
FROM companies a
WHERE a.enabled = 1
HAVING fetched_today = 0 OR fetched_today IS NULL
```

2. **Data quality:**
```sql
SELECT * FROM offers
WHERE status = 1
  AND (position_id IS NULL OR level_id IS NULL)
  AND DATE(created_at) = DATE(NOW())
```

**Notyfikacja:**
- Service: ntfy.sh
- URL: `https://ntfy.sh/fomojobs_c9f4e2a1b7d3f58c4a6b1d9e7f0c2a3b`
- Format: `"UWAGA! Nie dziala pajak dla : {names}, brak pozycji..."`

---

## 5. System Alertów

### 5.1 Architektura

**Komponenty:**
1. **AlertController** - CRUD alertów
2. **AlertNotifier Command** - Wysyłka maili
3. **AlertMail Mailable** - Email template
4. **Alert Model** - Many-to-many relations

### 5.2 AlertController (`app/Http/Controllers/AlertController.php`)

**Routes:**
- `GET /alerts` - Lista alertów
- `POST /alert` - Tworzenie alertu
- `GET /alerts/{id}/remove` - Usuwanie

**saveAlert() Method:**
```php
public function saveAlert(Request $request) {
    $validated = $request->validate([
        'alertName' => 'required|string|max:255',
        'alertTime' => 'required|string|max:5',      // HH:MM
        'companies' => 'array',
        'companies.*' => 'integer|exists:companies,id',
        'jobTags' => 'array',                        // positions
        'jobTags.*' => 'integer|exists:positions,id',
        'levels' => 'array',
        'levels.*' => 'integer|exists:levels,id'
    ]);

    $alert = Alert::create([...]);

    // Pivot records creation
    foreach ($validated['jobTags'] as $positionId) {
        AlertPosition::create(['alert_id' => $alert->id, 'position_id' => $positionId]);
    }
    // Similar for companies and levels

    return response()->json(['success' => true]);
}
```

**removeAlert() Method:**
```php
public function removeAlert($id) {
    $alert = Alert::find($id);

    if (!$alert) return redirect()->back()->with('error', 'Alert not found.');
    if ($alert->user_id !== auth()->user()->id) {
        return redirect()->back()->with('error', 'Unauthorized');
    }

    $alert->delete();  // CASCADE deletes pivot records
    return redirect()->back()->with('success', 'Alert removed');
}
```

### 5.3 AlertMail (`app/Mail/AlertMail.php`)

**Constructor:**
```php
public function __construct(
    public User $user,
    public Alert $alert,
    public Collection $offers,           // Today
    public Collection $offersWeekAgo,    // Past 7 days
    public Collection $groups
)
```

**Subject Generation:**
```php
$date = Carbon::parse(date('Y-m-d'));
$dayName = $date->locale('pl')->translatedFormat('l');  // "poniedziałek"

$daysGenitive = [
    'poniedziałek' => 'poniedziałkowe',
    'wtorek' => 'wtorkowe',
    // ...
];

$subject = $this->offers->count() > 0
    ? "FOMOjobs: Nowe {$dayGenitive} oferty ({$dayShort}) 🚀"
    : "FOMOjobs: {ucfirst($dayGenitive)} oferty ({$dayShort}) 🚀";
```

**Views:**
- HTML: `resources/views/emails/alert_html.blade.php`
- Text: `resources/views/emails/alert_text.blade.php`

### 5.4 Alert Matching Logic

**Kryteria:**
```php
$alertPositions = $alert->alertPositions()->pluck('position_id')->toArray();
$alertCompanies = $alert->alertCompanies()->pluck('company_id')->toArray();
$alertLevels = $alert->alertLevels()->pluck('level_id')->toArray();

$offers = Offer::whereDate('created_at', '=', today())
    ->whereIn('position_id', $alertPositions)   // OR within positions
    ->where('status', '=', 1)                    // Only Krakow
    ->whereIn('company_id', $alertCompanies)    // OR within companies
    ->whereIn('level_id', $alertLevels)         // OR within levels
    ->get();
```

**Logika:**
- AND między kategoriami (position AND company AND level)
- OR wewnątrz kategorii (Dev OR QA, Google OR Meta)

### 5.5 Email Delivery

**Mail Service:** Mailgun (configured in `config/mail.php`)

**Environment Variables:**
```
MAIL_MAILER=mailgun
MAIL_FROM_ADDRESS=noreply@fomojobs.pl
MAIL_FROM_NAME=FOMOjobs
MAILGUN_DOMAIN=...
MAILGUN_SECRET=...
```

**Wysyłka:**
```php
Mail::to($alert->user->email)->send(new AlertMail(
    $alert->user,
    $alert,
    $offers,
    $offersWeekAgo,
    $groups
));
```

---

## 6. Filament Admin Panel

### 6.1 Struktura Nawigacji

**Grupy:**
1. **Offers**
   - OfferResource ✓
   - CompanyResource ✓
   - (Hidden: 10x company-specific resources)

2. **Users**
   - UserResource
   - UserQueueResource
   - TesterResource

3. **Alerts**
   - AlertResource

4. **Search Settings**
   - AiSettings (Page)
   - PositionResource
   - GroupResource
   - LevelResource
   - AiLogsResource

5. **Spiders**
   - SpiderLogResource
   - ScheduledrunResource

### 6.2 Główne Resources

#### **OfferResource** (`app/Filament/Resources/OfferResource.php`)

**Navigation Badge:** Count gdzie `status = true`

**Form Schema:**
```php
TextInput::make('job_id')->required()->disabled(),
Select::make('company_id')->relationship('company', 'name')->disabled(),
TextInput::make('link')->disabled(),
Select::make('position_id')->relationship('position', 'name')->searchable(),
TextInput::make('title'),
TextInput::make('location'),
Textarea::make('offertext')->rows(10)
```

**Table Columns:**
- ID
- Job ID (copyable)
- Position (searchable, sortable)
- Level (searchable, sortable)
- AI Status icon ("AIG")
- Description indicator
- Title (HTML decoded, wrapped)
- Location
- Company icon (clickable → link)
- Company name (toggleable, hidden default)
- Created at (human-readable + tooltip)

**Filters:**
- Status (Ternary): Krakow / Inne / All
- AI Status (Ternary): Success / Fail / All
- Company (Select, searchable)

**Bulk Actions:**
1. **Assign Generic Position**
   - Type: QueueableBulkAction
   - Job: `GenericPositionJob`
   - Icon: heroicon-o-cpu-chip

2. **Assign Level**
   - Type: QueueableBulkAction
   - Job: `GenericLevelJob`
   - Icon: heroicon-o-light-bulb

3. **Clear Generic Position**
   - Updates: `aistatus = null, position_id = null`
   - Requires confirmation

4. **Delete** (standard)

#### **CompanyResource**

**Form:**
- `enabled` (Toggle, default true)
- `name` (Required)
- `tooltip`
- `icon` (FileUpload, stored in `public/icons`)

**Table:**
- Enabled (boolean icons)
- Name
- Icon (ImageColumn, 30px)

#### **PositionResource**

**Form:**
- `group_id` (Relationship select, searchable, preloaded)
- `name` (Required)

**Table:**
- Group name
- Position name

#### **LevelResource**

**Form:**
- `name` (Required)
- `ainame` (Required - nazwa dla AI)
- `tooltip` (Required)

**Table:**
- name
- ainame (sortable, searchable)

#### **AlertResource**

**Table Only:**
- ID
- Created at
- User name (searchable)
- Title (sortable, searchable)
- Hour
- Alert Positions (comma-separated, wrapped)
- Alert Companies (comma-separated, wrapped)

**Bulk Actions:** Delete

#### **UserResource**

**Form:**
- name, email
- is_active (Toggle "Aktywny")
- is_verified (Toggle "Zweryfikowany")
- is_newsletter (Toggle "Newsletter")
- is_admin (Toggle "Administrator")

**Table:**
- Created at
- Is admin (icon)
- Name (searchable)
- Email (searchable)
- Email verified (icon)
- Newsletter (icon)

### 6.3 Company-Specific Resources

**Pattern (wszystkie):**
- `protected static bool $shouldRegisterNavigation = false;` (ukryte)
- Global search enabled
- Stats widgets
- Minimal forms
- Custom bulk actions (niektóre)

**ComarchResource:**
- 40+ form fields
- Bulk Action: "Wygeneruj stanowiska" (AI direct)
- Filter: Empty offertext
- Custom page: AIComarch
- Widget: ComarchStatsOverview

**CapgeminiResource:**
- Similar AI bulk action
- Session-based filtering (with/without generic_name)
- Header actions toggle
- Widgets: CapgeminiStatsOverview, CapGeminiLinkWidget

**IbmResource, MotorolaResource, StatestreetResource:**
- Company-specific widgets
- Standard table/form

### 6.4 Custom Pages

#### **AiSettings** (`app/Filament/Pages/AiSettings.php`)

**Type:** Settings Page (Spatie Laravel Settings)

**Navigation:** Search Settings → AI Settings

**Fields:**
```php
Textarea::make('system_prompt')->rows(10),
Textarea::make('level_system_prompt')->rows(10),
Textarea::make('user_prompt')->rows(10),
Textarea::make('level_user_prompt')->rows(10),
TextInput::make('temperature')->numeric()->step(0.05),
TextInput::make('level_temperature')->numeric()->step(0.05)
```

**Cel:** Konfiguracja promptów i parametrów dla AI classification

#### **OfferReportPreview** (`app/Filament/Resources/OfferResource/Pages/OfferReportPreview.php`)

**Type:** Custom page with table
**Route:** `/preview`
**Features:**
- Same table as OfferResource
- Bulk actions enabled
- Custom route name: `filament.resources.offers.preview`

#### **AIComarch** (`app/Filament/Resources/ComarchResource/Pages/AIComarch.php`)

**Type:** ViewRecord page
**Route:** `/{record}/details`
**View:** `filament.pages.ai-comarch`
**Data:** `$positions` (all position names as `\n` separated string)

### 6.5 Widgets

#### **Dashboard Widgets:**

**TodaysOffersChart:**
- Type: Bar Chart
- Heading: "Offers from today"
- Data: Offers created today, grouped by company
- Colors: 100 pastel HSL colors

**OfferChartWidget:**
- Type: Bar Chart
- Heading: "All offers"
- Data: All active offers (status=1), grouped by company
- Same color scheme

#### **Stats Widgets (per company):**

**ComarchStatsOverview:**
```php
Stat::make('Job offers', Comarch::count())
    ->color('info')
    ->icon('heroicon-o-document-check'),

Stat::make('Offers posted today', Comarch::whereDate('created_at', today())->count())
    ->color('success')
    ->icon('heroicon-o-plus')
```

**Podobnie:**
- CapgeminiStatsOverview
- IBMWidget
- MotorolaWidget
- StateStreetWidget

### 6.6 AI Integration w Filamencie

**Locations:**
1. **AiSettings Page** - Configuration
2. **OfferResource Bulk Actions** - Queued jobs
3. **ComarchResource Bulk Action** - Direct API call
4. **CapgeminiResource Bulk Action** - Direct API call

**ComarchResource AI Implementation:**
```php
BulkAction::make('wygeneruj')
    ->label('Wygeneruj stanowiska')
    ->requiresConfirmation()
    ->action(function (Collection $records) {
        $positions = Position::pluck('name')->toArray();

        foreach ($records as $record) {
            $response = Http::withHeaders([
                'api-key' => 'HARDCODED_KEY',  // ⚠️ Security issue
                'Content-Type' => 'application/json'
            ])->post('https://gad-nonprod-chatbot-openai.openai.azure.com/...', [
                'messages' => [
                    ['role' => 'system', 'content' => 'You are AI expert...'],
                    ['role' => 'user', 'content' => "Positions:\n" . implode("\n", $positions)
                        . "\n\nJob: {$record->title}\n{$record->body}"]
                ],
                'temperature' => 0.7,
                'max_tokens' => 100
            ]);

            $record->update(['generic_name' => $response['choices'][0]['message']['content']]);
        }
    })
```

**CapgeminiResource:** Similar, ale `temperature: 0.3`

### 6.7 Advanced Features

**Copyable Fields:**
```php
TextColumn::make('job_id')
    ->copyable(fn($record) => $record->job_id)
    ->copyMessage('Job Id copied to clipboard')
    ->copyMessageDuration(1500)
```

**Clickable Icons:**
```php
ImageColumn::make('company.icon')
    ->url(fn($record) => $record->link)
    ->openUrlInNewTab()
    ->tooltip('Open page')
```

**Human-Readable Timestamps:**
```php
TextColumn::make('created_at')
    ->formatStateUsing(fn($state) => Carbon::parse($state)->diffForHumans())
    ->tooltip(fn($state) => Carbon::parse($state)->translatedFormat('d.m.Y H:i'))
```

**Navigation Badges:**
```php
public static function getNavigationBadge(): ?string {
    return static::getModel()::where('status', true)->count();
}

public static function getNavigationBadgeColor(): ?string {
    return static::getModel()::whereDate('created_at', today())->count() > 0
        ? 'success'
        : 'primary';
}
```

---

## 7. API i Integracje

### 7.1 EpamAPIController (`app/Http/Controllers/EpamAPIController.php`)

**Endpoint:** `POST /api/external/offers/{id}`

**Funkcja:** Przyjmuje oferty EPAM z Tampermonkey scriptu

**Implementation:**
```php
public function processData(Request $request, $id) {
    $data = $request->json()->all();
    $fetched = count($data);
    $created = 0;

    foreach ($data as $value) {
        $ndata = [
            'title' => $value['name'],
            'link' => $value['link'],
            'company_id' => $id,
            'offertext' => $value['description'],
            'location' => $value['location'],
            'job_id' => $value['job_id']
        ];

        $job = Offer::firstOrCreate(['job_id' => $ndata['job_id']], $ndata);
        if ($job->wasRecentlyCreated) $created++;
    }

    SpiderLog::create([
        'name' => Company::find($id)->name,
        'company_id' => $id,
        'fetched' => $fetched,
        'created' => $created,
        'description' => "Fetched: {$fetched}, created: {$created}, from page: 1"
    ]);

    return response()->json(['status' => 'success']);
}
```

**Security:** No authentication! Publiczny endpoint.

### 7.2 Tampermonkey Script (`tampermonkey/epam.js`)

**Purpose:** Browser automation dla EPAM career page

**Flow:**
```javascript
1. Wait for .search-result__item to load
2. Click "View More" button until gone (load all jobs)
3. Extract from each item:
   - name (.search-result__item-name)
   - location (.search-result__location)
   - link (.search-result__item-apply href)
4. For each job:
   - Fetch job page
   - Extract description (.vacancy_content)
   - Parse job_id from URL (epamgdo_{ID}_en-us)
5. Group by job_id (deduplicate locations)
6. POST to https://fomojobs.pl/api/external/epam
7. Show banner "Zakończone - Wysłane do serwera"
```

**Key Functions:**
```javascript
async function pobierzOpisAsync(url) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(response) {
                const doc = new DOMParser().parseFromString(response.responseText, "text/html");
                const content = doc.querySelector(".vacancy_content")?.textContent.trim();
                resolve(content);
            }
        });
    });
}

async function clickViewMoreUntilGone(selector = '.search-result__view-more', delay = 1000) {
    while (true) {
        const btn = document.querySelector(selector);
        if (!btn || btn.offsetParent === null) break;
        btn.click();
        await new Promise(r => setTimeout(r, delay));
    }
}
```

**Installation:**
- @match: `https://careers.epam-poland.pl/careers/job-listings*`
- @grant: GM_xmlhttpRequest
- @connect: careers.epam-poland.pl, fomojobs.pl
- @require: pako.min.js (compression, unused)

### 7.3 Azure OpenAI Integration

**Service:** Azure Cognitive Services OpenAI
**Deployment:** Chatbot-NP-OAI
**API Version:** 2024-02-01

**Endpoint:**
```
https://gad-nonprod-chatbot-openai.openai.azure.com/openai/deployments/Chatbot-NP-OAI/chat/completions?api-version=2024-02-01
```

**Use Cases:**
1. **Position Classification** (ComarchResource, CapgeminiResource)
2. **Level Classification** (OfferResource via jobs)

**Example Request:**
```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are an AI expert in HR and job position classification..."
    },
    {
      "role": "user",
      "content": "Available positions:\nDeveloper\nQA Engineer\nDevOps\n...\n\nJob Title: Senior Software Engineer\nDescription: ..."
    }
  ],
  "temperature": 0.7,
  "max_tokens": 100
}
```

**Response Processing:**
```php
$response = Http::withHeaders([
    'api-key' => env('AZURE_OPENAI_KEY'),
    'Content-Type' => 'application/json'
])->post($endpoint, $payload);

$aiResponse = $response['choices'][0]['message']['content'];
$record->update(['generic_name' => $aiResponse]);
```

**Logging:**
```php
AiLogs::create([
    'payload' => json_encode($payload),
    'response' => json_encode($response),
    'tokens' => $response['usage']['total_tokens'],
    'status' => $response->status(),
    'offer_id' => $offer->id
]);
```

### 7.4 ntfy.sh Notifications

**Service:** ntfy.sh (push notification service)
**URL:** `https://ntfy.sh/fomojobs_c9f4e2a1b7d3f58c4a6b1d9e7f0c2a3b`

**Usage in StatsNotifier:**
```php
$message = "UWAGA! Nie dziala pajak dla : " . implode(', ', $companyNames)
    . ", brak pozycji lub poziomu dla: " . implode(', ', $offerDetails);

Http::post('https://ntfy.sh/fomojobs_c9f4e2a1b7d3f58c4a6b1d9e7f0c2a3b', [
    'body' => $message
]);
```

**Security Issue:** Publiczny topic ID w kodzie

### 7.5 Email Services

**Primary:** Mailgun
**Config:** `config/mail.php`, `config/services.php`

**Environment Variables:**
```
MAIL_MAILER=mailgun
MAILGUN_DOMAIN=fomojobs.pl
MAILGUN_SECRET=key-...
MAILGUN_ENDPOINT=api.mailgun.net
MAIL_FROM_ADDRESS=noreply@fomojobs.pl
MAIL_FROM_NAME=FOMOjobs
```

**Mailables:**
1. **AlertMail** - Daily job alerts
2. **VerifyEmail** - Email verification
3. **PasswordReset** - Password reset
4. **TestEmail** - Testing

**Mail Tracking:** `vormkracht10/filament-mails` package

---

## 8. Konfiguracja

### 8.1 Brak .env.example

**Problem:** Nie ma pliku `.env.example` w repozytorium

**Implikacje:**
- Trudno odtworzyć środowisko
- Brak dokumentacji wymaganych zmiennych
- Ryzyko błędnej konfiguracji

### 8.2 Wymagane Zmienne Środowiskowe (rekonstrukcja)

**Database:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fomojobs
DB_USERNAME=root
DB_PASSWORD=
```

**Mail (Mailgun):**
```env
MAIL_MAILER=mailgun
MAIL_FROM_ADDRESS=noreply@fomojobs.pl
MAIL_FROM_NAME=FOMOjobs
MAILGUN_DOMAIN=fomojobs.pl
MAILGUN_SECRET=key-xxxxxxxxxxxxx
MAILGUN_WEBHOOK_SIGNING_KEY=xxxxxxxxxxxxx
```

**Azure OpenAI:**
```env
AZURE_OPENAI_KEY=xxxxxxxxxxxxx
AZURE_OPENAI_ENDPOINT=https://gad-nonprod-chatbot-openai.openai.azure.com
```

**Laravel:**
```env
APP_NAME=FOMOjobs
APP_ENV=production
APP_KEY=base64:xxxxxxxxxxxxx
APP_DEBUG=false
APP_URL=https://fomojobs.pl

LOG_CHANNEL=stack
LOG_LEVEL=debug
```

**Queue:**
```env
QUEUE_CONNECTION=database
```

**Session/Cache:**
```env
SESSION_DRIVER=file
CACHE_DRIVER=file
```

### 8.3 Konfiguracje Specjalne

**config/mail.php:**
- Default mailer: `env('MAIL_MAILER', 'smtp')`
- Host: `env('MAIL_HOST', 'smtp.mailgun.org')`
- Port: `env('MAIL_PORT', 587)`
- Encryption: `env('MAIL_ENCRYPTION', 'tls')`

**config/database.php:**
- Default: `env('DB_CONNECTION', 'mysql')`
- MySQL charset: `utf8mb4`
- Collation: `utf8mb4_unicode_ci`

**config/services.php:**
- Mailgun domain/secret/endpoint
- Postmark token (optional)
- AWS SES (optional)

### 8.4 API Keys & Credentials

**Hardcoded (⚠️ SECURITY ISSUE):**
1. **Azure OpenAI API Key** w ComarchResource.php, CapgeminiResource.php
2. **CSRF Tokens** w Motorola_Spider, Sabre_Spider, BrownBrothers_Spider
3. **Session Cookies** w UBS_Spider, PZU_Spider, Shell_Spider
4. **ntfy.sh Topic ID** w StatsNotifier

**Powinny być w .env:**
```env
AZURE_OPENAI_KEY=xxxxx
NTFY_TOPIC_ID=fomojobs_xxxxx
UBS_SESSION_COOKIE=xxxxx
WORKDAY_CSRF_TOKEN=xxxxx
```

---

## 9. Routes

### 9.1 Web Routes (`routes/web.php`)

**Public Routes:**
```php
GET  /                  → underconstruction view
GET  /home              → welcome view
GET  /faq               → faq view
GET  /rtc               → rtc view
GET  /opentowork        → opentowork/sorry view (limit: 25 testers)
```

**Auth Routes:**
```php
GET  /login             → FomoAuthController@showLoginForm
POST /login             → FomoAuthController@login
GET  /logout            → FomoAuthController@logout [auth]
GET  /password/reset    → FomoAuthController@showResetForm
GET  /password/reset/{token} → FomoAuthController@showResetFormWithToken
POST /password/reset    → FomoAuthController@resetPassword
```

**Registration & Verification:**
```php
GET  /register          → RegistrationController@showForm
POST /register          → RegistrationController@register
GET  /verify-account/{code} → RegistrationController@verify
GET  /verified          → RegistrationController@verified
```

**Authenticated Routes:**
```php
GET  /dashboard         → redirect('/alert') [auth]
GET  /alert             → home view [auth, verifiedaccount]
GET  /alerts            → AlertController@showList [auth]
POST /alert             → AlertController@saveAlert
GET  /alerts/{id}/remove → AlertController@removeAlert
GET  /offer/{id}        → redirect to offer.link [auth]
```

**Email Queue (Public):**
```php
POST /email             → Store email in UserQueue
POST /tester/email      → Store tester email
```

**Preview (Public):**
```php
GET  /preview           → preview view
POST /preview           → PreviewController@preview
```

### 9.2 API Routes (`routes/api.php`)

**Authenticated API:**
```php
GET /api/user [auth:sanctum] → Current user
```

**Public API (⚠️ NO AUTH):**
```php
POST /api/external/offers/{id} → EpamAPIController@processData
```

**Route Name:** Brak (można dodać `->name('external.offers.store')`)

### 9.3 Middleware

**Web Group (routes/web.php):**
- `web` - Session, CSRF, Cookie encryption
- `auth` - Require authenticated user
- `verifiedaccount` - Custom: require email verification

**API Group (routes/api.php):**
- `api` - Throttling, JSON responses
- `auth:sanctum` - Token authentication

**Custom Middleware:**
- `EnsureAccountIsVerified` (`app/Http/Middleware/EnsureAccountIsVerified.php`)
  - Sprawdza `is_verified` flag
  - Redirects to verification page if false

### 9.4 Route Protection Issues

**Brak zabezpieczenia:**
1. `/api/external/offers/{id}` - Publiczny endpoint, może być spammowany
2. `/preview` - Brak auth, pokazuje internal data
3. Niektóre web routes nie mają CSRF protection

**Recommended fixes:**
```php
// API route should have auth
Route::post('/external/offers/{id}', [EpamAPIController::class, 'processData'])
    ->middleware('auth:sanctum');

// Preview should require auth
Route::get('/preview', ...)->middleware(['auth', 'is_admin']);
```

---

## 10. Potencjalne Problemy

### 10.1 Security Issues (CRITICAL)

#### **1. Hardcoded API Keys**
**Lokalizacje:**
- `app/Filament/Resources/ComarchResource.php:XXX`
- `app/Filament/Resources/CapgeminiResource.php:XXX`

**Problem:**
```php
'api-key' => 'xxxxxxxxxxxxx'  // Hardcoded Azure OpenAI key
```

**Fix:**
```php
'api-key' => config('services.azure_openai.key')
```

**Impact:** Wycieki klucza = nieautoryzowane użycie API = koszty

---

#### **2. Public API Endpoint bez Auth**
**Endpoint:** `POST /api/external/offers/{id}`

**Problem:** Brak jakiejkolwiek autoryzacji

**Attack Vector:**
- Spam fake job offers
- Corrupt database
- DOS attack

**Fix:**
```php
Route::post('/external/offers/{id}', [EpamAPIController::class, 'processData'])
    ->middleware('auth:sanctum')
    ->middleware('throttle:60,1');
```

---

#### **3. Hardcoded Session Tokens & Cookies**
**Lokalizacje:**
- UBS_Spider: Session value from DOM
- Motorola_Spider, Sabre_Spider: CSRF tokens
- Shell_Spider, PZU_Spider: Cookie strings

**Problem:** Tokens wygasają → scraper przestaje działać

**Fix:** Dynamic token fetching
```php
// Motorola example fix
private function getCsrfToken() {
    $response = Http::get($loginPage);
    preg_match('/csrf-token" content="([^"]+)"/', $response->body(), $matches);
    return $matches[1] ?? null;
}
```

---

#### **4. Exposed ntfy.sh Topic ID**
**Lokalizacja:** `app/Console/Commands/StatsNotifier.php`

```php
Http::post('https://ntfy.sh/fomojobs_c9f4e2a1b7d3f58c4a6b1d9e7f0c2a3b', ...);
```

**Problem:** Anyone can subscribe/spam this topic

**Fix:** Use private notification service or password-protected topic

---

#### **5. SQL Injection Risk (Minor)**
**Lokalizacja:** `StatsNotifier.php` uses raw SQL

```php
$stmt = "SELECT a.id, a.name, (...) AS fetched_today FROM companies a WHERE ...";
$companiesWithoutData = DB::select($stmt);
```

**Fix:** Use Query Builder
```php
$companiesWithoutData = DB::table('companies as a')
    ->select('a.id', 'a.name',
        DB::raw('(SELECT SUM(fetched) FROM spider_logs WHERE company_id = a.id AND DATE(created_at) = DATE(NOW())) as fetched_today')
    )
    ->where('a.enabled', 1)
    ->havingRaw('fetched_today = 0 OR fetched_today IS NULL')
    ->get();
```

---

### 10.2 Performance Issues

#### **1. SetStatusOffer procesuje WSZYSTKIE oferty**
**Lokalizacja:** `app/Console/Commands/SetStatusOffer.php`

```php
foreach (\App\Models\Offer::all() as $offer) {  // ⚠️ BAD
    // Process...
}
```

**Problem:**
- 10,000 offers = 10,000 UPDATE queries
- Runs every 6 hours
- No pagination
- Memory leak risk

**Fix:**
```php
// Only process today's offers
Offer::whereDate('created_at', '=', today())->chunk(100, function ($offers) {
    foreach ($offers as $offer) {
        $status = false;
        // ... logic
        $offer->update(['status' => $status]);
    }
});
```

**Better Fix:** Use query update
```php
Offer::whereDate('created_at', today())
    ->where(function($q) {
        $q->where('location', 'LIKE', '%krakow%')
          ->orWhere('location', 'LIKE', '%kraków%')
          ->orWhere(function($q2) {
              $q2->whereIn('company_id', [8, 10])
                 ->where('location', 'Poland');
          });
    })
    ->update(['status' => 1]);

Offer::whereDate('created_at', today())
    ->where('status', '!=', 1)
    ->update(['status' => 0]);
```

---

#### **2. N+1 Query Problem w AlertController**
**Lokalizacja:** `app/Http/Controllers/AlertController.php:23-34`

```php
$alerts = Alert::where('user_id', auth()->user()->id)->get();
foreach ($alerts as $alert) {
    $alert->positions = $alert->positions()->get();  // ⚠️ N+1
    $alert->companies = $alert->companies()->get();  // ⚠️ N+1
    $alert->levels = $alert->levels()->get();        // ⚠️ N+1
}
```

**Problem:** 1 + (3 × N) queries

**Fix:** Eager loading
```php
$alerts = Alert::where('user_id', auth()->user()->id)
    ->with(['positions', 'companies', 'levels'])
    ->get();
```

---

#### **3. Brak Indeksów na Często Filtrowanych Kolumnach**

**Brakujące indeksy:**
```sql
-- offers table
CREATE INDEX idx_offers_status ON offers(status);
CREATE INDEX idx_offers_aistatus ON offers(aistatus);
CREATE INDEX idx_offers_created_at ON offers(created_at);
CREATE INDEX idx_offers_company_status ON offers(company_id, status);

-- spider_logs table
CREATE INDEX idx_spider_logs_company_date ON spider_logs(company_id, created_at);
```

---

#### **4. Scraper Pagination Off-by-One Errors**

**Lokalizacje:** CapGemini, BrownBrothers, Sabre, Shell

```php
if ($stats['fetched'] > 0) {
    $stats['fetched'] = $stats['fetched'] - 1;  // ⚠️ WHY?
}
```

**Problem:** Unclear logic, possible bug

---

### 10.3 Data Quality Issues

#### **1. firstOrCreate nie aktualizuje istniejących ofert**

**Problem:** Większość scraperów używa:
```php
Offer::firstOrCreate(['job_id' => $ndata['job_id']], $ndata);
```

**Konsekwencje:**
- Zmiany w title/location/description nie są trackowane
- Stare oferty nigdy nie są usuwane
- Brak detection job closings

**Fix:** Use `updateOrCreate`
```php
Offer::updateOrCreate(
    ['job_id' => $ndata['job_id']],
    $ndata + ['last_seen_at' => now()]
);
```

**Better:** Add soft deletes + archiving logic

---

#### **2. Incomplete Scrapers**

**Cathay_Spider.php:**
```php
public function get_data($pageNo)
{
    die();  // Line 34
    // ...
}
```

**Euroclear_Spider.php:**
```php
public function get_data($pageNo)
{
    die();  // Line 94
    // ...
}
```

**Impact:** 2 z 19 firm nie działają

**Fix:** Dokończyć implementację lub usunąć z scheduled_runs

---

#### **3. Brak Job Expiration Logic**

**Problem:** Oferty pozostają w bazie na zawsze

**Recommendation:**
```php
// Add field
Schema::table('offers', function (Blueprint $table) {
    $table->timestamp('last_seen_at')->nullable();
    $table->softDeletes();
});

// Daily cleanup command
class CleanupExpiredOffers extends Command
{
    public function handle() {
        Offer::where('last_seen_at', '<', now()->subDays(30))
              ->delete();
    }
}
```

---

### 10.4 Code Quality Issues

#### **1. Debug Code w Production**

**print_r() locations:**
- Multiple spider files
- Test commands

**die() statements:**
- Cathay_Spider
- Euroclear_Spider

**Fix:** Remove before deployment

---

#### **2. Brak Error Handling w Scraperach**

**Większość scraperów:**
```php
$response = Http::get($url);
$data = $response->json();  // ⚠️ No error check
```

**Problem:**
- Network failure → crash
- Invalid JSON → crash
- API changes → silent failure

**Fix:**
```php
try {
    $response = Http::timeout(30)
        ->retry(3, 1000)
        ->get($url);

    if (!$response->successful()) {
        \Log::error("Spider failed: " . $response->status());
        return;
    }

    $data = $response->json();
} catch (\Exception $e) {
    \Log::error("Spider exception: " . $e->getMessage());
    Notification::send('Spider crashed');
}
```

---

#### **3. Hardcoded Values wszędzie**

**Examples:**
- Company IDs (8, 10 dla HSBC/UBS)
- Page sizes (10, 20, 30, 100)
- Timeouts brak
- Rate limits brak

**Fix:** Extract to config
```php
// config/scrapers.php
return [
    'timeout' => 30,
    'retry_count' => 3,
    'page_size' => [
        'ibm' => 30,
        'capgemini' => 11,
        'comarch' => 10,
    ],
    'krakow_companies' => [8, 10],  // HSBC, UBS
];
```

---

#### **4. Duplicate Code**

**Stats Widgets:** 5 identycznych widgetów z copy-paste

**Fix:** Generic widget
```php
class CompanyStatsWidget extends StatsOverviewWidget
{
    protected static string $model;

    protected function getStats(): array {
        $model = static::$model;
        return [
            Stat::make('Job offers', $model::count()),
            Stat::make('Today', $model::whereDate('created_at', today())->count()),
        ];
    }
}

// Usage
class ComarchStatsWidget extends CompanyStatsWidget {
    protected static string $model = Comarch::class;
}
```

---

### 10.5 Missing Features

#### **1. Brak .env.example**
Trudność w setup dla nowych devs

#### **2. Brak Documentation**
README.md jest defaultowym Laravel

#### **3. Brak Tests**
Żadnych PHPUnit testów

#### **4. Brak Logging Strategy**
Mix `\Log::info()`, `logger()`, `print_r()`

#### **5. Brak Monitoring Dashboard**
StatsNotifier wysyła tylko notifications, brak UI

#### **6. Brak Rate Limiting dla Scraperów**
Ryzyko IP block

#### **7. Brak API Versioning**
`/api/external/offers/{id}` bez wersji

---

### 10.6 Tech Debt Summary

| Priorytet | Problem | Impact | Effort |
|-----------|---------|--------|--------|
| 🔴 CRITICAL | Hardcoded API keys | Security breach | 1h |
| 🔴 CRITICAL | Public API no auth | Data corruption | 2h |
| 🟠 HIGH | SetStatusOffer performance | Memory/CPU | 3h |
| 🟠 HIGH | No error handling scrapers | Silent failures | 1w |
| 🟠 HIGH | Hardcoded tokens expire | Scraper breaks | 2d |
| 🟡 MEDIUM | N+1 queries | Slow UI | 2h |
| 🟡 MEDIUM | Missing indexes | Slow queries | 1h |
| 🟡 MEDIUM | No job expiration | Stale data | 1d |
| 🟢 LOW | Debug code | Clutter | 1h |
| 🟢 LOW | Code duplication | Maintenance | 2d |

**Total Estimated Effort:** 2-3 weeks

---

## Podsumowanie

### Mocne Strony Projektu

1. ✅ **Kompletna implementacja scrapingu** - 19 firm, różne techniki
2. ✅ **Zaawansowany system alertów** - Many-to-many filtering
3. ✅ **AI Integration** - Automated job classification
4. ✅ **Filament Admin** - Professional UI z widgetami
5. ✅ **Dynamic Cron Jobs** - Konfiguracja z UI
6. ✅ **Comprehensive Logging** - Spider logs, AI logs
7. ✅ **Email System** - Mailgun z tracking

### Największe Ryzyka

1. 🔴 **Security vulnerabilities** - Hardcoded keys, public APIs
2. 🔴 **Scraper fragility** - Hardcoded tokens, no error handling
3. 🟠 **Performance bottlenecks** - SetStatusOffer, N+1 queries
4. 🟠 **Data staleness** - No updates, no expiration
5. 🟡 **Missing documentation** - Hard to onboard

### Rekomendacje dla Nowej Wersji

#### Priorytet 1 (Must Have):
1. Przenieść API keys do .env
2. Dodać auth do `/api/external/*`
3. Fix SetStatusOffer performance
4. Add error handling do scraperów
5. Dynamic token fetching (Workday, UBS)

#### Priorytet 2 (Should Have):
1. Implement job expiration/archiving
2. Add database indexes
3. Fix N+1 queries
4. Create .env.example
5. Remove debug code

#### Priorytet 3 (Nice to Have):
1. Monitoring dashboard UI
2. Rate limiting dla scraperów
3. API versioning
4. PHPUnit tests
5. Better documentation

---

**Koniec Raportu**

Data: 2025-10-22
Analizował: Claude (Anthropic)
Projekt: FOMOjobs-OLD (Andrzej)
