/**
 * Mock Alerts Data
 * For development without backend
 */

import type { Alert } from '../types/api';

export const mockAlerts: Alert[] = [
  {
    id: 1,
    user_id: 1,
    keywords: 'php, laravel, senior',
    excluded_keywords: 'junior, staz',
    excluded_languages: ['en'],
    frequency: 'daily',
    positions: [
      { id: 1, name: 'Backend Developer', slug: 'backend-developer', group_id: 1, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
      { id: 2, name: 'Full Stack Developer', slug: 'full-stack-developer', group_id: 1, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
    ],
    companies: [
      { id: 1, name: 'Google', url: 'https://google.com/careers', is_active: true, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
      { id: 2, name: 'Microsoft', url: 'https://microsoft.com/careers', is_active: true, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
    ],
    levels: [
      { id: 3, name: 'Senior', slug: 'senior', order: 3, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
    ],
    created_at: '2025-10-20T10:00:00Z',
    updated_at: '2025-10-20T10:00:00Z',
  },
  {
    id: 2,
    user_id: 1,
    keywords: 'react, typescript',
    excluded_keywords: '',
    excluded_languages: [],
    frequency: 'instant',
    positions: [
      { id: 3, name: 'Frontend Developer', slug: 'frontend-developer', group_id: 1, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
    ],
    companies: [
      { id: 5, name: 'Amazon', url: 'https://amazon.jobs', is_active: true, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
    ],
    levels: [
      { id: 2, name: 'Mid', slug: 'mid', order: 2, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
      { id: 3, name: 'Senior', slug: 'senior', order: 3, created_at: '2025-01-01T00:00:00Z', updated_at: '2025-01-01T00:00:00Z' },
    ],
    created_at: '2025-10-21T15:30:00Z',
    updated_at: '2025-10-21T15:30:00Z',
  },
];
