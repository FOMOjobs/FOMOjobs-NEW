/**
 * Authentication API
 * Handles login, register, logout
 */

import { apiClient } from './client';
import type { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest,
  User,
  ApiResponse 
} from '../types/api';

export const authAPI = {
  /**
   * Login user
   * POST /api/login
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/login', credentials);
    
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    
    return response.data;
  },

  /**
   * Register new user
   * POST /api/register
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/register', data);
    
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    
    return response.data;
  },

  /**
   * Logout user
   * POST /api/logout
   */
  async logout(): Promise<void> {
    await apiClient.post('/logout');
    localStorage.removeItem('auth_token');
  },

  /**
   * Get current user
   * GET /api/user
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/user');
    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * Get auth token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },
};
