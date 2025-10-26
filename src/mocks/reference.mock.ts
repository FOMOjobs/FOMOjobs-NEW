/**
 * Mock Reference Data
 * Companies, positions, levels, and groups for development
 */

import type { Company, Position, Level, Group } from '../types/api';

const mockTimestamp = '2024-01-01T00:00:00.000000Z';

export const mockCompanies: Company[] = [
  { id: 1, name: 'Comarch', url: 'https://comarch.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 2, name: 'IBM', url: 'https://ibm.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 3, name: 'HSBC', url: 'https://hsbc.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 4, name: 'Sabre', url: 'https://sabre.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 5, name: 'State Street', url: 'https://statestreet.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 6, name: 'Goldman Sachs', url: 'https://goldmansachs.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 7, name: 'UBS', url: 'https://ubs.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 8, name: 'Shell', url: 'https://shell.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 9, name: 'Motorola', url: 'https://motorola.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 10, name: 'Nokia', url: 'https://nokia.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 11, name: 'Google', url: 'https://google.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 12, name: 'Meta', url: 'https://meta.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 13, name: 'Microsoft', url: 'https://microsoft.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 14, name: 'Amazon', url: 'https://amazon.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 15, name: 'Samsung', url: 'https://samsung.com', is_active: true, created_at: mockTimestamp, updated_at: mockTimestamp },
];

export const mockPositions: Position[] = [
  { id: 1, name: 'Backend Developer', slug: 'backend-developer', group_id: 1, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 2, name: 'Frontend Developer', slug: 'frontend-developer', group_id: 1, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 3, name: 'Full Stack Developer', slug: 'full-stack-developer', group_id: 1, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 4, name: 'DevOps Engineer', slug: 'devops-engineer', group_id: 1, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 5, name: 'QA Engineer', slug: 'qa-engineer', group_id: 1, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 6, name: 'Data Engineer', slug: 'data-engineer', group_id: 2, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 7, name: 'Data Scientist', slug: 'data-scientist', group_id: 2, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 8, name: 'ML Engineer', slug: 'ml-engineer', group_id: 2, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 9, name: 'Product Manager', slug: 'product-manager', group_id: 3, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 10, name: 'Project Manager', slug: 'project-manager', group_id: 3, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 11, name: 'Scrum Master', slug: 'scrum-master', group_id: 3, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 12, name: 'UX Designer', slug: 'ux-designer', group_id: 4, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 13, name: 'UI Designer', slug: 'ui-designer', group_id: 4, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 14, name: 'Graphic Designer', slug: 'graphic-designer', group_id: 4, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 15, name: 'Security Engineer', slug: 'security-engineer', group_id: 5, created_at: mockTimestamp, updated_at: mockTimestamp },
];

export const mockLevels: Level[] = [
  { id: 1, name: 'Junior', slug: 'junior', order: 1, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 2, name: 'Mid', slug: 'mid', order: 2, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 3, name: 'Senior', slug: 'senior', order: 3, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 4, name: 'Lead', slug: 'lead', order: 4, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 5, name: 'Principal', slug: 'principal', order: 5, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 6, name: 'Manager', slug: 'manager', order: 6, created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 7, name: 'Director', slug: 'director', order: 7, created_at: mockTimestamp, updated_at: mockTimestamp },
];

export const mockGroups: Group[] = [
  { id: 1, name: 'Development', slug: 'development', created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 2, name: 'Data & Analytics', slug: 'data-analytics', created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 3, name: 'Management', slug: 'management', created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 4, name: 'Design', slug: 'design', created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 5, name: 'Security', slug: 'security', created_at: mockTimestamp, updated_at: mockTimestamp },
  { id: 6, name: 'Infrastructure', slug: 'infrastructure', created_at: mockTimestamp, updated_at: mockTimestamp },
];
