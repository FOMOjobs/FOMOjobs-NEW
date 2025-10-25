import { CVData } from '@/types/cv';
import { generateSecureId } from '@/utils/secureId';
import { toast } from 'sonner';

export const CV_STORAGE_KEY = 'fomojobs-cv-data';
export const CV_AUTOSAVE_KEY = 'fomojobs-cv-autosave';

// Storage limit: 4MB (leaving 1MB buffer from typical 5MB localStorage limit)
const STORAGE_LIMIT = 4 * 1024 * 1024;

/**
 * Check if data will fit in localStorage
 */
const checkStorageSize = (data: string): boolean => {
  const sizeInBytes = new Blob([data]).size;
  return sizeInBytes <= STORAGE_LIMIT;
};

/**
 * Save CV to localStorage with overflow protection
 */
export const saveCVToStorage = (cvData: CVData): void => {
  try {
    const serializedData = JSON.stringify(cvData);

    // Check size before saving
    if (!checkStorageSize(serializedData)) {
      // Try to save without photo
      const dataWithoutPhoto = {
        ...cvData,
        personal: { ...cvData.personal, photo: null }
      };
      const serializedWithoutPhoto = JSON.stringify(dataWithoutPhoto);

      if (checkStorageSize(serializedWithoutPhoto)) {
        localStorage.setItem(CV_STORAGE_KEY, serializedWithoutPhoto);
        toast.warning('CV zapisane bez zdjęcia (za duże)', {
          description: 'Zmniejsz rozmiar zdjęcia lub skróć treści'
        });
        return;
      }

      toast.error('CV za duże do zapisu lokalnego', {
        description: 'Skróć treści lub usuń zdjęcie'
      });
      return;
    }

    localStorage.setItem(CV_STORAGE_KEY, serializedData);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      toast.error('Brak miejsca w pamięci przeglądarki', {
        description: 'Wyczyść dane lub zmniejsz rozmiar CV'
      });

      // Try to clear old autosave to free space
      try {
        localStorage.removeItem(CV_AUTOSAVE_KEY);
        // Try again without photo
        const dataWithoutPhoto = {
          ...cvData,
          personal: { ...cvData.personal, photo: null }
        };
        localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(dataWithoutPhoto));
        toast.info('Zapisano bez zdjęcia (brak miejsca)');
      } catch {
        // Still failed
      }
    } else {
      console.error('Failed to save CV data to localStorage:', error);
      toast.error('Błąd zapisu do pamięci lokalnej');
    }
  }
};

export const loadCVFromStorage = (): CVData | null => {
  try {
    const serializedData = localStorage.getItem(CV_STORAGE_KEY);
    if (!serializedData) return null;

    const data = JSON.parse(serializedData);
    return data;
  } catch (error) {
    console.error('Failed to load CV data from localStorage:', error);
    return null;
  }
};

/**
 * Auto-save CV to localStorage with overflow protection
 */
export const autoSaveCVData = (cvData: CVData): void => {
  try {
    const updatedData = {
      ...cvData,
      updatedAt: new Date().toISOString()
    };
    const serializedData = JSON.stringify(updatedData);

    // Check size before saving
    if (!checkStorageSize(serializedData)) {
      // Try to save without photo
      const dataWithoutPhoto = {
        ...updatedData,
        personal: { ...updatedData.personal, photo: null }
      };
      const serializedWithoutPhoto = JSON.stringify(dataWithoutPhoto);

      if (checkStorageSize(serializedWithoutPhoto)) {
        localStorage.setItem(CV_AUTOSAVE_KEY, serializedWithoutPhoto);
        // Silent save - don't spam user with toasts on auto-save
        return;
      }

      // Data too large even without photo - skip auto-save
      return;
    }

    localStorage.setItem(CV_AUTOSAVE_KEY, serializedData);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      // Try to free space by removing old autosave
      try {
        localStorage.removeItem(CV_AUTOSAVE_KEY);
      } catch {
        // Can't do anything
      }
    } else {
      console.error('Failed to auto-save CV data:', error);
    }
  }
};

export const loadAutoSavedCVData = (): CVData | null => {
  try {
    const serializedData = localStorage.getItem(CV_AUTOSAVE_KEY);
    if (!serializedData) return null;

    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Failed to load auto-saved CV data:', error);
    return null;
  }
};

export const clearCVStorage = (): void => {
  localStorage.removeItem(CV_STORAGE_KEY);
  localStorage.removeItem(CV_AUTOSAVE_KEY);
};

/**
 * Create empty CV data with secure ID
 */
export const createEmptyCVData = (): CVData => ({
  id: generateSecureId(), // Use cryptographically secure ID
  personal: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    linkedIn: '',
    portfolio: '',
    photo: null,
    photoPosition: 'left'
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  customization: {
    template: 'modern',
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    font: 'Inter',
    spacing: 'normal',
    language: 'pl',
    showSections: {
      personal: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      languages: true
    }
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});
