/**
 * Mock Reference Data
 * Companies, positions, levels, and groups for development
 */

import type { Company, Position, Level, Group } from '../types/api';

export const mockCompanies: Company[] = [
  { id: 1, name: 'Comarch', slug: 'comarch' },
  { id: 2, name: 'IBM', slug: 'ibm' },
  { id: 3, name: 'HSBC', slug: 'hsbc' },
  { id: 4, name: 'Sabre', slug: 'sabre' },
  { id: 5, name: 'State Street', slug: 'state-street' },
  { id: 6, name: 'Goldman Sachs', slug: 'goldman-sachs' },
  { id: 7, name: 'UBS', slug: 'ubs' },
  { id: 8, name: 'Shell', slug: 'shell' },
  { id: 9, name: 'Motorola', slug: 'motorola' },
  { id: 10, name: 'Nokia', slug: 'nokia' },
  { id: 11, name: 'Google', slug: 'google' },
  { id: 12, name: 'Meta', slug: 'meta' },
  { id: 13, name: 'Microsoft', slug: 'microsoft' },
  { id: 14, name: 'Amazon', slug: 'amazon' },
  { id: 15, name: 'Samsung', slug: 'samsung' },
];

export const mockPositions: Position[] = [
  { id: 1, name: 'Backend Developer', slug: 'backend-developer', group_id: 1 },
  { id: 2, name: 'Frontend Developer', slug: 'frontend-developer', group_id: 1 },
  { id: 3, name: 'Full Stack Developer', slug: 'full-stack-developer', group_id: 1 },
  { id: 4, name: 'DevOps Engineer', slug: 'devops-engineer', group_id: 1 },
  { id: 5, name: 'QA Engineer', slug: 'qa-engineer', group_id: 1 },
  { id: 6, name: 'Data Engineer', slug: 'data-engineer', group_id: 2 },
  { id: 7, name: 'Data Scientist', slug: 'data-scientist', group_id: 2 },
  { id: 8, name: 'ML Engineer', slug: 'ml-engineer', group_id: 2 },
  { id: 9, name: 'Product Manager', slug: 'product-manager', group_id: 3 },
  { id: 10, name: 'Project Manager', slug: 'project-manager', group_id: 3 },
  { id: 11, name: 'Scrum Master', slug: 'scrum-master', group_id: 3 },
  { id: 12, name: 'UX Designer', slug: 'ux-designer', group_id: 4 },
  { id: 13, name: 'UI Designer', slug: 'ui-designer', group_id: 4 },
  { id: 14, name: 'Graphic Designer', slug: 'graphic-designer', group_id: 4 },
  { id: 15, name: 'Security Engineer', slug: 'security-engineer', group_id: 5 },
];

export const mockLevels: Level[] = [
  { id: 1, name: 'Junior', slug: 'junior' },
  { id: 2, name: 'Mid', slug: 'mid' },
  { id: 3, name: 'Senior', slug: 'senior' },
  { id: 4, name: 'Lead', slug: 'lead' },
  { id: 5, name: 'Principal', slug: 'principal' },
  { id: 6, name: 'Manager', slug: 'manager' },
  { id: 7, name: 'Director', slug: 'director' },
];

export const mockGroups: Group[] = [
  { id: 1, name: 'Development', slug: 'development' },
  { id: 2, name: 'Data & Analytics', slug: 'data-analytics' },
  { id: 3, name: 'Management', slug: 'management' },
  { id: 4, name: 'Design', slug: 'design' },
  { id: 5, name: 'Security', slug: 'security' },
  { id: 6, name: 'Infrastructure', slug: 'infrastructure' },
];
