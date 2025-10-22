/**
 * Reference Data API
 * Static data for dropdowns and filters
 */

import { apiClient } from './client';
import type { 
  Company, 
  Position, 
  Level,
  Group,
  ApiResponse 
} from '../types/api';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const referenceAPI = {
  /**
   * Get all companies
   * GET /api/companies
   */
  async getCompanies(): Promise<Company[]> {
    if (USE_MOCKS) {
      const { mockCompanies } = await import('../mocks/reference.mock');
      return mockCompanies;
    }
    
    const response = await apiClient.get<ApiResponse<Company[]>>('/companies');
    return response.data;
  },

  /**
   * Get all positions
   * GET /api/positions
   */
  async getPositions(): Promise<Position[]> {
    if (USE_MOCKS) {
      const { mockPositions } = await import('../mocks/reference.mock');
      return mockPositions;
    }
    
    const response = await apiClient.get<ApiResponse<Position[]>>('/positions');
    return response.data;
  },

  /**
   * Get all levels (seniority)
   * GET /api/levels
   */
  async getLevels(): Promise<Level[]> {
    if (USE_MOCKS) {
      const { mockLevels } = await import('../mocks/reference.mock');
      return mockLevels;
    }
    
    const response = await apiClient.get<ApiResponse<Level[]>>('/levels');
    return response.data;
  },

  /**
   * Get all groups (position categories)
   * GET /api/groups
   */
  async getGroups(): Promise<Group[]> {
    if (USE_MOCKS) {
      const { mockGroups } = await import('../mocks/reference.mock');
      return mockGroups;
    }
    
    const response = await apiClient.get<ApiResponse<Group[]>>('/groups');
    return response.data;
  },
};
