import { CVData } from '@/types/cv';

export const CV_STORAGE_KEY = 'fomojobs-cv-data';
export const CV_AUTOSAVE_KEY = 'fomojobs-cv-autosave';

export const saveCVToStorage = (cvData: CVData): void => {
  try {
    const serializedData = JSON.stringify(cvData);
    localStorage.setItem(CV_STORAGE_KEY, serializedData);
    console.log('CV data saved to localStorage');
  } catch (error) {
    console.error('Failed to save CV data to localStorage:', error);
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

export const autoSaveCVData = (cvData: CVData): void => {
  try {
    const updatedData = {
      ...cvData,
      updatedAt: new Date().toISOString()
    };
    const serializedData = JSON.stringify(updatedData);
    localStorage.setItem(CV_AUTOSAVE_KEY, serializedData);
  } catch (error) {
    console.error('Failed to auto-save CV data:', error);
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

export const createEmptyCVData = (): CVData => ({
  id: crypto.randomUUID(),
  personal: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    linkedIn: '',
    portfolio: ''
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
