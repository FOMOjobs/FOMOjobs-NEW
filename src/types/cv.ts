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

export type CVTemplate = 'modern' | 'classic' | 'minimal' | 'creative' | 'tech' | 'academic' | 'executive' | 'ats' | 'professional';

export type CVSpacing = 'compact' | 'normal' | 'spacious';

export interface CVCustomization {
  template: CVTemplate;
  primaryColor: string;
  secondaryColor: string;
  font: string;
  spacing: CVSpacing;
  language: 'pl' | 'en';
  includeRodo?: boolean; // RODO clause (required in Poland) - default: true
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

// RODO Clause - Standard Polish legal text (required for job applications in Poland)
export const RODO_CLAUSE_PL = `Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w niniejszym dokumencie do realizacji procesu rekrutacji zgodnie z ustawą z dnia 10 maja 2018 roku o ochronie danych osobowych (Dz. Ustaw z 2018, poz. 1000) oraz zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).`;

export const RODO_CLAUSE_EN = `I hereby give consent for my personal data included in my application to be processed for the purposes of the recruitment process in accordance with the Personal Data Protection Act of 10 May 2018 (Journal of Laws 2018, item 1000) and in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (GDPR).`;
