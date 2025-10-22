/**
 * API Types - dopasowane do Laravel backend z FOMOjobs-OLD
 * Based on analysis from FOMOjobs-OLD-ANALYSIS.md
 */

// ============================================================================
// USER & AUTH
// ============================================================================

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ============================================================================
// ALERTS
// ============================================================================

export interface Alert {
  id: number;
  user_id: number;
  keywords?: string;              // "php, laravel, senior"
  excluded_keywords?: string;     // "junior, staz"
  excluded_languages?: string[];  // ["en", "de"]
  frequency: 'instant' | 'daily' | 'weekly';
  positions: Position[];
  companies: Company[];
  levels: Level[];
  created_at: string;
  updated_at: string;
}

export interface CreateAlertRequest {
  keywords?: string;
  excluded_keywords?: string;
  excluded_languages?: string[];
  frequency: 'instant' | 'daily' | 'weekly';
  position_ids: number[];
  company_ids: number[];
  level_ids: number[];
}

export interface UpdateAlertRequest extends Partial<CreateAlertRequest> {}

// ============================================================================
// OFFERS (Job Listings)
// ============================================================================

export interface Offer {
  id: number;
  title: string;
  company_id: number;
  company: Company;
  position_id: number;
  position: Position;
  level_id: number | null;
  level: Level | null;
  url: string;
  description?: string;
  salary_min?: number;
  salary_max?: number;
  location?: string;
  remote: boolean;
  contract_type?: string;
  published_at: string;
  scraped_at: string;
  status: 'active' | 'inactive' | 'expired';
  created_at: string;
  updated_at: string;
}

export interface OffersListResponse {
  data: Offer[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

// ============================================================================
// COMPANIES
// ============================================================================

export interface Company {
  id: number;
  name: string;
  url: string;
  logo_url?: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// POSITIONS
// ============================================================================

export interface Position {
  id: number;
  name: string;
  slug: string;
  group_id: number | null;
  group?: Group;
  created_at: string;
  updated_at: string;
}

export interface Group {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// LEVELS (Seniority)
// ============================================================================

export interface Level {
  id: number;
  name: string;
  slug: string;
  order: number;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
