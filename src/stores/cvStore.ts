import { create } from 'zustand';
import { CVData, ExperienceItem, EducationItem, SkillItem, LanguageItem, PersonalInfo, CVTemplate, CVCustomization } from '@/types/cv';
import { createEmptyCVData } from '@/lib/cvStorage';

interface CVStore {
  // State
  cvData: CVData;
  activeSection: string;
  isDirty: boolean;
  isLoading: boolean;

  // Personal Info Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  // Customization Actions
  updateCustomization: (customization: Partial<CVCustomization>) => void;
  setTemplate: (template: CVTemplate) => void;
  setColors: (primaryColor: string, secondaryColor: string) => void;

  // Experience Actions
  addExperience: (experience: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, updates: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;

  // Education Actions
  addEducation: (education: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, updates: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  reorderEducation: (fromIndex: number, toIndex: number) => void;

  // Skills Actions
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, updates: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;

  // Languages Actions
  addLanguage: (language: Omit<LanguageItem, 'id'>) => void;
  updateLanguage: (id: string, updates: Partial<LanguageItem>) => void;
  deleteLanguage: (id: string) => void;

  // General Actions
  setActiveSection: (section: string) => void;
  loadCVData: (data: CVData) => void;
  resetCV: () => void;
  setDirty: (dirty: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useCVStore = create<CVStore>((set, get) => ({
  // Initial state
  cvData: createEmptyCVData(),
  activeSection: 'personal',
  isDirty: false,
  isLoading: false,

  // Personal Info Actions
  updatePersonalInfo: (info) => {
    set((state) => ({
      cvData: {
        ...state.cvData,
        personal: { ...state.cvData.personal, ...info },
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  // Customization Actions
  updateCustomization: (customization) => {
    set((state) => ({
      cvData: {
        ...state.cvData,
        customization: { ...state.cvData.customization, ...customization },
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  setTemplate: (template) => {
    set((state) => ({
      cvData: {
        ...state.cvData,
        customization: { ...state.cvData.customization, template },
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  setColors: (primaryColor, secondaryColor) => {
    set((state) => ({
      cvData: {
        ...state.cvData,
        customization: {
          ...state.cvData.customization,
          primaryColor,
          secondaryColor
        },
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  // Experience Actions
  addExperience: (experience) => {
    const newExperience: ExperienceItem = {
      ...experience,
      id: crypto.randomUUID()
    };
    set((state) => ({
      cvData: {
        ...state.cvData,
        experience: [...state.cvData.experience, newExperience],
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  updateExperience: (id, updates) => {
    set((state) => ({
      cvData: {
        ...state.cvData,
        experience: state.cvData.experience.map(exp =>
          exp.id === id ? { ...exp, ...updates } : exp
        ),
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  deleteExperience: (id) => {
    set((state) => ({
      cvData: {
        ...state.cvData,
        experience: state.cvData.experience.filter(exp => exp.id !== id),
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  reorderExperience: (fromIndex, toIndex) => {
    set((state) => {
      const newExperience = [...state.cvData.experience];
      const [moved] = newExperience.splice(fromIndex, 1);
      newExperience.splice(toIndex, 0, moved);

      return {
        cvData: {
          ...state.cvData,
          experience: newExperience,
          updatedAt: new Date().toISOString()
        },
        isDirty: true
      };
    });
  },

  // Education Actions
  addEducation: (education) => {
    const newEducation: EducationItem = {
      ...education,
      id: crypto.randomUUID()
    };
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: [...state.cvData.education, newEducation],
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  updateEducation: (id, updates) => {
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education.map(edu =>
          edu.id === id ? { ...edu, ...updates } : edu
        ),
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  deleteEducation: (id) => {
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education.filter(edu => edu.id !== id),
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  reorderEducation: (fromIndex, toIndex) => {
    set((state) => {
      const newEducation = [...state.cvData.education];
      const [moved] = newEducation.splice(fromIndex, 1);
      newEducation.splice(toIndex, 0, moved);

      return {
        cvData: {
          ...state.cvData,
          education: newEducation,
          updatedAt: new Date().toISOString()
        },
        isDirty: true
      };
    });
  },

  // Skills Actions
  addSkill: (skill) => {
    const newSkill: SkillItem = {
      ...skill,
      id: crypto.randomUUID()
    };
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: [...state.cvData.skills, newSkill],
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  updateSkill: (id, updates) => {
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: state.cvData.skills.map(skill =>
          skill.id === id ? { ...skill, ...updates } : skill
        ),
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  deleteSkill: (id) => {
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: state.cvData.skills.filter(skill => skill.id !== id),
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  // Languages Actions
  addLanguage: (language) => {
    const newLanguage: LanguageItem = {
      ...language,
      id: crypto.randomUUID()
    };
    set((state) => ({
      cvData: {
        ...state.cvData,
        languages: [...state.cvData.languages, newLanguage],
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  updateLanguage: (id, updates) => {
    set((state) => ({
      cvData: {
        ...state.cvData,
        languages: state.cvData.languages.map(lang =>
          lang.id === id ? { ...lang, ...updates } : lang
        ),
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  deleteLanguage: (id) => {
    set((state) => ({
      cvData: {
        ...state.cvData,
        languages: state.cvData.languages.filter(lang => lang.id !== id),
        updatedAt: new Date().toISOString()
      },
      isDirty: true
    }));
  },

  // General Actions
  setActiveSection: (section) => {
    set({ activeSection: section });
  },

  loadCVData: (data) => {
    set({
      cvData: data,
      isDirty: false,
      isLoading: false
    });
  },

  resetCV: () => {
    set({
      cvData: createEmptyCVData(),
      isDirty: false,
      activeSection: 'personal'
    });
  },

  setDirty: (dirty) => {
    set({ isDirty: dirty });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  }
}));
