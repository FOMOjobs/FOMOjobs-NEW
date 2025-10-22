/**
 * Offers API
 * Job listings and matching
 */

import { apiClient } from './client';
import type { 
  Offer, 
  OffersListResponse,
  ApiResponse 
} from '../types/api';

// Mock data fallback for development
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const offersAPI = {
  /**
   * Get all offers (paginated)
   * GET /api/offers?page=1&per_page=20
   */
  async getAll(page = 1, perPage = 20): Promise<OffersListResponse> {
    if (USE_MOCKS) {
      const { mockOffers } = await import('../mocks/offers.mock');
      return {
        data: mockOffers,
        meta: {
          current_page: 1,
          from: 1,
          last_page: 1,
          per_page: perPage,
          to: mockOffers.length,
          total: mockOffers.length,
        },
      };
    }
    
    return apiClient.get<OffersListResponse>(`/offers?page=${page}&per_page=${perPage}`);
  },

  /**
   * Get single offer by ID
   * GET /api/offers/{id}
   */
  async getById(id: number): Promise<Offer> {
    if (USE_MOCKS) {
      const { mockOffers } = await import('../mocks/offers.mock');
      const offer = mockOffers.find(o => o.id === id);
      if (!offer) throw new Error('Offer not found');
      return offer;
    }
    
    const response = await apiClient.get<ApiResponse<Offer>>(`/offers/${id}`);
    return response.data;
  },

  /**
   * Get offers matched to user's alerts
   * GET /api/offers/matched
   */
  async getMatched(): Promise<Offer[]> {
    if (USE_MOCKS) {
      const { mockOffers } = await import('../mocks/offers.mock');
      return mockOffers.slice(0, 5); // Return first 5 as "matched"
    }
    
    const response = await apiClient.get<ApiResponse<Offer[]>>('/offers/matched');
    return response.data;
  },

  /**
   * Search offers
   * GET /api/offers/search?q=php&location=Kraków
   */
  async search(query: string, filters?: {
    location?: string;
    position_id?: number;
    company_id?: number;
    level_id?: number;
    remote?: boolean;
  }): Promise<Offer[]> {
    const params = new URLSearchParams({ q: query });
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }
    
    const response = await apiClient.get<ApiResponse<Offer[]>>(`/offers/search?${params}`);
    return response.data;
  },

  /**
   * Get latest offers (today's scraping results)
   * GET /api/offers/latest
   */
  async getLatest(): Promise<Offer[]> {
    if (USE_MOCKS) {
      const { mockOffers } = await import('../mocks/offers.mock');
      return mockOffers.slice(0, 10);
    }
    
    const response = await apiClient.get<ApiResponse<Offer[]>>('/offers/latest');
    return response.data;
  },
};
