/**
 * Alerts API
 * Manages job alerts for users
 */

import { apiClient } from './client';
import type { 
  Alert, 
  CreateAlertRequest, 
  UpdateAlertRequest,
  ApiResponse 
} from '../types/api';

// Mock data fallback for development
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const alertsAPI = {
  /**
   * Get all alerts for current user
   * GET /api/alerts
   */
  async getAll(): Promise<Alert[]> {
    if (USE_MOCKS) {
      const { mockAlerts } = await import('../mocks/alerts.mock');
      return mockAlerts;
    }
    
    const response = await apiClient.get<ApiResponse<Alert[]>>('/alerts');
    return response.data;
  },

  /**
   * Get single alert by ID
   * GET /api/alerts/{id}
   */
  async getById(id: number): Promise<Alert> {
    if (USE_MOCKS) {
      const { mockAlerts } = await import('../mocks/alerts.mock');
      const alert = mockAlerts.find(a => a.id === id);
      if (!alert) throw new Error('Alert not found');
      return alert;
    }
    
    const response = await apiClient.get<ApiResponse<Alert>>(`/alerts/${id}`);
    return response.data;
  },

  /**
   * Create new alert
   * POST /api/alerts
   */
  async create(data: CreateAlertRequest): Promise<Alert> {
    const response = await apiClient.post<ApiResponse<Alert>>('/alerts', data);
    return response.data;
  },

  /**
   * Update existing alert
   * PUT /api/alerts/{id}
   */
  async update(id: number, data: UpdateAlertRequest): Promise<Alert> {
    const response = await apiClient.put<ApiResponse<Alert>>(`/alerts/${id}`, data);
    return response.data;
  },

  /**
   * Delete alert
   * DELETE /api/alerts/{id}
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/alerts/${id}`);
  },
};
