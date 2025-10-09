export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  linkedIn?: string;
  portfolio?: string;
  photo?: string | null; // Base64 or URL
  photoPosition?: 'left' | 'right' | 'top';
}

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location?: string;
  startDate: string; // YYYY-MM format
  endDate: string;   // YYYY-MM format or "current"
  current: boolean;
  description: string;
  achievements: string[]; // Lista osiągnięć
}

export interface EducationItem {
  id: string;
  degree: string;
  fieldOfStudy: string;
  school: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description?: string;
  achievements: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'technical' | 'soft' | 'language' | 'other';
}

export interface LanguageItem {
  id: string;
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'native';
  certification?: string;
}

export type CVTemplate = 'modern' | 'classic' | 'minimal' | 'creative' | 'tech' | 'academic' | 'executive' | 'ats';

export type CVSpacing = 'compact' | 'normal' | 'spacious';

export interface CVCustomization {
  template: CVTemplate;
  primaryColor: string;
  secondaryColor: string;
  font: string;
  spacing: CVSpacing;
  showSections: {
    personal: boolean;
    summary: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    languages: boolean;
  };
}

export interface CVData {
  id: string;
  personal: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  customization: CVCustomization;
  createdAt: string;
  updatedAt: string;
}

export type CVSection = 'personal' | 'experience' | 'education' | 'skills' | 'languages' | 'settings';

export interface CVFormErrors {
  [key: string]: string | undefined;
}
