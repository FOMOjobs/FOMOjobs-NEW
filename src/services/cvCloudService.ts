/**
 * CV Cloud Service - Multi-CV Management with Cloud Sync
 *
 * This service handles CRUD operations for multiple CVs.
 * Currently uses mock data (localStorage) - flip USE_MOCK_API to false when backend is ready.
 */

import { CVData } from '@/types/cv';

// Toggle this when backend is ready
const USE_MOCK_API = true;

export interface SavedCV {
  id: string;
  name: string;
  cvData: CVData;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string; // Base64 image preview (optional)
}

// Mock localStorage key
const STORAGE_KEY = 'fomojobs_saved_cvs';

// ==========================================
// MOCK API (localStorage-based)
// ==========================================

class MockCVAPI {
  private getCVs(): SavedCV[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveCVs(cvs: SavedCV[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvs));
  }

  async listCVs(): Promise<SavedCV[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.getCVs();
  }

  async getCV(id: string): Promise<SavedCV | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const cvs = this.getCVs();
    return cvs.find(cv => cv.id === id) || null;
  }

  async createCV(name: string, cvData: CVData): Promise<SavedCV> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const newCV: SavedCV = {
      id: `cv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      cvData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const cvs = this.getCVs();
    cvs.unshift(newCV); // Add to beginning
    this.saveCVs(cvs);

    return newCV;
  }

  async updateCV(id: string, updates: Partial<SavedCV>): Promise<SavedCV> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const cvs = this.getCVs();
    const index = cvs.findIndex(cv => cv.id === id);

    if (index === -1) {
      throw new Error('CV not found');
    }

    cvs[index] = {
      ...cvs[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.saveCVs(cvs);
    return cvs[index];
  }

  async deleteCV(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const cvs = this.getCVs();
    const filtered = cvs.filter(cv => cv.id !== id);
    this.saveCVs(filtered);
  }

  async duplicateCV(id: string): Promise<SavedCV> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const cvs = this.getCVs();
    const original = cvs.find(cv => cv.id === id);

    if (!original) {
      throw new Error('CV not found');
    }

    const duplicate: SavedCV = {
      id: `cv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${original.name} (kopia)`,
      cvData: { ...original.cvData },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    cvs.unshift(duplicate);
    this.saveCVs(cvs);

    return duplicate;
  }
}

// ==========================================
// REAL API (Supabase/Backend)
// ==========================================

class RealCVAPI {
  private baseUrl = '/api/cvs'; // Update with your backend URL

  async listCVs(): Promise<SavedCV[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Failed to fetch CVs');
    return response.json();
  }

  async getCV(id: string): Promise<SavedCV | null> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Failed to fetch CV');
    return response.json();
  }

  async createCV(name: string, cvData: CVData): Promise<SavedCV> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, cvData }),
    });
    if (!response.ok) throw new Error('Failed to create CV');
    return response.json();
  }

  async updateCV(id: string, updates: Partial<SavedCV>): Promise<SavedCV> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update CV');
    return response.json();
  }

  async deleteCV(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete CV');
  }

  async duplicateCV(id: string): Promise<SavedCV> {
    const response = await fetch(`${this.baseUrl}/${id}/duplicate`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to duplicate CV');
    return response.json();
  }
}

// ==========================================
// EXPORT UNIFIED API
// ==========================================

export const cvCloudService = USE_MOCK_API ? new MockCVAPI() : new RealCVAPI();
