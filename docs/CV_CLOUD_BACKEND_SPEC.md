# CV Cloud Sync - Backend API Specification

## Overview

This document specifies the backend API endpoints needed to support **Multi-CV Management** with cloud sync for FOMOjobs CV Creator.

**Frontend Status:** ✅ Complete (using mock localStorage API)
**Backend Status:** 🔨 To be implemented
**Toggle:** Set `USE_MOCK_API = false` in `src/services/cvCloudService.ts` when ready

---

## Database Schema

### Table: `saved_cvs`

```sql
CREATE TABLE saved_cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  cv_data JSONB NOT NULL,
  thumbnail TEXT, -- Base64 or URL to preview image (optional)
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Indexes
  INDEX idx_user_id (user_id),
  INDEX idx_updated_at (updated_at DESC)
);

-- Row Level Security (RLS)
ALTER TABLE saved_cvs ENABLE ROW LEVEL SECURITY;

-- Users can only see their own CVs
CREATE POLICY "Users can view their own CVs"
  ON saved_cvs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own CVs"
  ON saved_cvs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own CVs"
  ON saved_cvs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own CVs"
  ON saved_cvs FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_saved_cvs_updated_at
  BEFORE UPDATE ON saved_cvs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## API Endpoints

Base URL: `/api/cvs`

### 1. List User's CVs

**GET** `/api/cvs`

**Description:** Fetch all CVs for the authenticated user.

**Authentication:** Required (JWT in Authorization header)

**Query Parameters:**
- `limit` (optional): Number of CVs to return (default: 50)
- `offset` (optional): Pagination offset (default: 0)
- `order_by` (optional): Sort field - `updated_at` or `created_at` (default: `updated_at`)
- `order` (optional): Sort direction - `desc` or `asc` (default: `desc`)

**Response (200 OK):**
```json
{
  "cvs": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Frontend Developer - 2024",
      "cvData": { /* Full CVData object */ },
      "thumbnail": "data:image/png;base64,...",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-20T14:45:00Z"
    }
  ],
  "total": 15,
  "limit": 50,
  "offset": 0
}
```

**Error Responses:**
- `401 Unauthorized`: User not authenticated
- `500 Internal Server Error`: Database error

---

### 2. Get Single CV

**GET** `/api/cvs/:id`

**Description:** Fetch a specific CV by ID.

**Authentication:** Required

**Path Parameters:**
- `id`: UUID of the CV

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Frontend Developer - 2024",
  "cvData": { /* Full CVData object */ },
  "thumbnail": null,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-20T14:45:00Z"
}
```

**Error Responses:**
- `401 Unauthorized`: User not authenticated
- `403 Forbidden`: CV belongs to another user
- `404 Not Found`: CV not found
- `500 Internal Server Error`: Database error

---

### 3. Create CV

**POST** `/api/cvs`

**Description:** Create a new CV for the authenticated user.

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Backend Developer CV",
  "cvData": {
    "personalInfo": { /* ... */ },
    "experience": [ /* ... */ ],
    "education": [ /* ... */ ],
    "skills": [ /* ... */ ],
    "languages": [ /* ... */ ],
    "settings": { /* ... */ }
  },
  "thumbnail": "data:image/png;base64,..." // optional
}
```

**Response (201 Created):**
```json
{
  "id": "650e8400-e29b-41d4-a716-446655440001",
  "name": "Backend Developer CV",
  "cvData": { /* echoed back */ },
  "thumbnail": "data:image/png;base64,...",
  "createdAt": "2024-01-25T09:15:00Z",
  "updatedAt": "2024-01-25T09:15:00Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid request body (missing name or cvData)
- `401 Unauthorized`: User not authenticated
- `500 Internal Server Error`: Database error

---

### 4. Update CV

**PATCH** `/api/cvs/:id`

**Description:** Update an existing CV (partial update).

**Authentication:** Required

**Path Parameters:**
- `id`: UUID of the CV

**Request Body** (all fields optional):
```json
{
  "name": "Updated CV Name",
  "cvData": { /* Full or partial CVData object */ },
  "thumbnail": "data:image/png;base64,..."
}
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Updated CV Name",
  "cvData": { /* Full updated CVData */ },
  "thumbnail": "data:image/png;base64,...",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-25T11:20:00Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid request body
- `401 Unauthorized`: User not authenticated
- `403 Forbidden`: CV belongs to another user
- `404 Not Found`: CV not found
- `500 Internal Server Error`: Database error

---

### 5. Delete CV

**DELETE** `/api/cvs/:id`

**Description:** Delete a CV permanently.

**Authentication:** Required

**Path Parameters:**
- `id`: UUID of the CV

**Response (204 No Content):**
(Empty body)

**Error Responses:**
- `401 Unauthorized`: User not authenticated
- `403 Forbidden`: CV belongs to another user
- `404 Not Found`: CV not found
- `500 Internal Server Error`: Database error

---

### 6. Duplicate CV

**POST** `/api/cvs/:id/duplicate`

**Description:** Create a copy of an existing CV.

**Authentication:** Required

**Path Parameters:**
- `id`: UUID of the CV to duplicate

**Request Body** (optional):
```json
{
  "name": "Custom Copy Name" // If not provided, defaults to "{original_name} (kopia)"
}
```

**Response (201 Created):**
```json
{
  "id": "750e8400-e29b-41d4-a716-446655440002",
  "name": "Frontend Developer - 2024 (kopia)",
  "cvData": { /* Copied from original */ },
  "thumbnail": "data:image/png;base64,...",
  "createdAt": "2024-01-25T12:00:00Z",
  "updatedAt": "2024-01-25T12:00:00Z"
}
```

**Error Responses:**
- `401 Unauthorized`: User not authenticated
- `403 Forbidden`: Original CV belongs to another user
- `404 Not Found`: Original CV not found
- `500 Internal Server Error`: Database error

---

## CVData Type Definition

The `cv_data` field in the database is a JSONB column with the following TypeScript structure:

```typescript
interface CVData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    jobTitle: string;
    summary: string;
    linkedin?: string;
    github?: string;
    website?: string;
    photo?: string; // Base64 image
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: 'Podstawowy' | 'Średniozaawansowany' | 'Zaawansowany' | 'Ekspert';
  }>;
  languages: Array<{
    id: string;
    name: string;
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Ojczysty';
  }>;
  settings: {
    template: 'modern' | 'classic' | 'professional';
    colorScheme: 'purple' | 'blue' | 'green' | 'red' | 'orange';
    fontSize: 'small' | 'medium' | 'large';
    language: 'pl' | 'en';
  };
}
```

---

## Authentication

All endpoints require JWT authentication via Supabase Auth.

**Authorization Header:**
```
Authorization: Bearer <jwt_token>
```

**User ID Extraction:**
```typescript
// Supabase example
const { data: { user } } = await supabase.auth.getUser();
const userId = user?.id;
```

---

## Implementation Notes

### 1. Supabase Edge Functions (Recommended)

Create edge function at `supabase/functions/cvs/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  )

  // Authenticate user
  const authHeader = req.headers.get('Authorization')!
  const token = authHeader.replace('Bearer ', '')
  const { data: { user } } = await supabase.auth.getUser(token)

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  // Route handlers
  const url = new URL(req.url)
  const path = url.pathname
  const method = req.method

  // ... implement routing logic
})
```

### 2. Alternative: Node.js/Express Backend

```typescript
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// Auth middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  req.user = user;
  next();
});

// List CVs
app.get('/api/cvs', async (req, res) => {
  const { data, error } = await supabase
    .from('saved_cvs')
    .select('*')
    .eq('user_id', req.user.id)
    .order('updated_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ cvs: data });
});

// ... implement other endpoints
```

### 3. Data Validation

Use Zod for request validation:

```typescript
import { z } from 'zod';

const CVDataSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    // ... rest of schema
  }),
  // ... rest of validation
});

const CreateCVSchema = z.object({
  name: z.string().min(1).max(255),
  cvData: CVDataSchema,
  thumbnail: z.string().optional(),
});
```

---

## Frontend Integration

Once backend is ready:

1. **Update service toggle:**
   ```typescript
   // src/services/cvCloudService.ts
   const USE_MOCK_API = false; // Flip to use real backend
   ```

2. **Update base URL:**
   ```typescript
   class RealCVAPI {
     private baseUrl = process.env.VITE_API_URL + '/api/cvs';
     // or directly: 'https://your-project.supabase.co/functions/v1/cvs'
   }
   ```

3. **Add environment variable:**
   ```bash
   # .env
   VITE_API_URL=https://your-backend.com
   ```

---

## Testing Checklist

- [ ] User can list their CVs
- [ ] User can create a new CV
- [ ] User can update an existing CV
- [ ] User can rename a CV
- [ ] User can duplicate a CV
- [ ] User can delete a CV
- [ ] User cannot access other users' CVs (403 Forbidden)
- [ ] Pagination works correctly
- [ ] Sorting works correctly
- [ ] `updated_at` is automatically updated on CV changes
- [ ] RLS policies prevent unauthorized access
- [ ] Edge cases: empty CV data, missing fields, large CVs (>1MB)

---

## Migration Plan

1. ✅ Frontend complete with mock API
2. 🔨 Andrzej implements backend (this spec)
3. 🧪 Test backend endpoints with Postman/curl
4. 🔄 Flip `USE_MOCK_API = false` in frontend
5. 🧪 E2E testing
6. 🚀 Deploy to production

---

## Questions?

Contact Michal (Frontend) or Andrzej (Backend) for clarifications.
