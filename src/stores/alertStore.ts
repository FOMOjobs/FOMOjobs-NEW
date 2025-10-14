// Alert Creation Store - Zustand State Management
// Manages 4-step wizard state for alert creation

import { create } from 'zustand';

export interface AlertState {
  // Step 1: Companies
  selectedCompanies: string[];

  // Step 2: Experience Levels
  selectedLevels: string[];

  // Step 3: Job Categories
  selectedCategories: string[];

  // Step 4: Summary
  alertName: string;
  notificationTime: string;

  // Current step (1-4)
  currentStep: number;
}

export interface AlertActions {
  // Step 1 actions
  toggleCompany: (companyId: string) => void;
  setCompanies: (companyIds: string[]) => void;

  // Step 2 actions
  toggleLevel: (levelId: string) => void;
  setLevels: (levelIds: string[]) => void;

  // Step 3 actions
  toggleCategory: (categoryId: string) => void;
  setCategories: (categoryIds: string[]) => void;

  // Step 4 actions
  setAlertName: (name: string) => void;
  setNotificationTime: (time: string) => void;

  // Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;

  // Reset
  resetAlert: () => void;
}

export type AlertStore = AlertState & AlertActions;

const initialState: AlertState = {
  selectedCompanies: [],
  selectedLevels: [],
  selectedCategories: [],
  alertName: '',
  notificationTime: '09:00',
  currentStep: 1,
};

export const useAlertStore = create<AlertStore>((set) => ({
  ...initialState,

  // Step 1: Companies
  toggleCompany: (companyId) =>
    set((state) => ({
      selectedCompanies: state.selectedCompanies.includes(companyId)
        ? state.selectedCompanies.filter((id) => id !== companyId)
        : [...state.selectedCompanies, companyId],
    })),

  setCompanies: (companyIds) =>
    set({ selectedCompanies: companyIds }),

  // Step 2: Experience Levels
  toggleLevel: (levelId) =>
    set((state) => ({
      selectedLevels: state.selectedLevels.includes(levelId)
        ? state.selectedLevels.filter((id) => id !== levelId)
        : [...state.selectedLevels, levelId],
    })),

  setLevels: (levelIds) =>
    set({ selectedLevels: levelIds }),

  // Step 3: Job Categories
  toggleCategory: (categoryId) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(categoryId)
        ? state.selectedCategories.filter((id) => id !== categoryId)
        : [...state.selectedCategories, categoryId],
    })),

  setCategories: (categoryIds) =>
    set({ selectedCategories: categoryIds }),

  // Step 4: Summary
  setAlertName: (name) =>
    set({ alertName: name }),

  setNotificationTime: (time) =>
    set({ notificationTime: time }),

  // Navigation
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 4),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  goToStep: (step) =>
    set({ currentStep: Math.max(1, Math.min(step, 4)) }),

  // Reset
  resetAlert: () =>
    set(initialState),
}));
