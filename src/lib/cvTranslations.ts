export type CVLanguage = 'pl' | 'en';

export interface CVTranslations {
  // Section headers
  about: string;
  professionalSummary: string;
  experience: string;
  professionalExperience: string;
  education: string;
  skills: string;
  languages: string;

  // Date labels
  present: string;

  // Skill levels
  beginner: string;
  intermediate: string;
  advanced: string;
  expert: string;

  // Language levels
  elementary: string;
  preIntermediate: string;
  upperIntermediate: string;
  proficient: string;
  native: string;
  basic: string;
  upperInt: string;
}

const translations: Record<CVLanguage, CVTranslations> = {
  pl: {
    about: 'O mnie',
    professionalSummary: 'Podsumowanie Zawodowe',
    experience: 'Doświadczenie',
    professionalExperience: 'Doświadczenie Zawodowe',
    education: 'Edukacja',
    skills: 'Umiejętności',
    languages: 'Języki',
    present: 'Obecnie',
    beginner: 'Początkujący',
    intermediate: 'Średniozaawansowany',
    advanced: 'Zaawansowany',
    expert: 'Ekspert',
    elementary: 'Podstawowy',
    preIntermediate: 'Niższy Średni',
    upperIntermediate: 'Wyższy Średni',
    proficient: 'Biegły',
    native: 'Ojczysty',
    basic: 'Podstawowy',
    upperInt: 'Wyższy Średni'
  },
  en: {
    about: 'About Me',
    professionalSummary: 'Professional Summary',
    experience: 'Experience',
    professionalExperience: 'Professional Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    present: 'Present',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert',
    elementary: 'Elementary',
    preIntermediate: 'Pre-Intermediate',
    upperIntermediate: 'Upper-Intermediate',
    proficient: 'Proficient',
    native: 'Native',
    basic: 'Basic',
    upperInt: 'Upper-Int.'
  }
};

export const getCVTranslations = (language: CVLanguage): CVTranslations => {
  return translations[language];
};

export const formatCVDate = (dateStr: string, language: CVLanguage): string => {
  if (dateStr === 'current' || dateStr === 'Present') {
    return language === 'pl' ? 'Obecnie' : 'Present';
  }
  if (!dateStr) return '';

  const [year, month] = dateStr.split('-');
  if (month && year) {
    const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthsPl = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
    const months = language === 'pl' ? monthsPl : monthsEn;
    const monthName = months[parseInt(month) - 1] || month;
    return `${monthName} ${year}`;
  }
  return dateStr;
};

export const getCVSkillLevel = (level: string, language: CVLanguage, style: 'text' | 'dots' = 'text'): string => {
  if (style === 'dots') {
    const levels: Record<string, string> = {
      'beginner': '●○○○',
      'intermediate': '●●○○',
      'advanced': '●●●○',
      'expert': '●●●●'
    };
    return levels[level] || level;
  }

  const t = getCVTranslations(language);
  const levels: Record<string, string> = {
    'beginner': t.beginner,
    'intermediate': t.intermediate,
    'advanced': t.advanced,
    'expert': t.expert
  };
  return levels[level] || level;
};

export const getCVLanguageLevel = (level: string, language: CVLanguage, variant: 'full' | 'short' = 'full'): string => {
  const t = getCVTranslations(language);

  const levels: Record<string, { full: string; short: string }> = {
    'A1': { full: t.basic, short: t.basic },
    'A2': { full: t.elementary, short: t.elementary },
    'B1': { full: t.intermediate, short: t.intermediate },
    'B2': { full: t.upperIntermediate, short: t.upperInt },
    'C1': { full: t.advanced, short: t.advanced },
    'C2': { full: t.proficient, short: t.proficient },
    'native': { full: t.native, short: t.native }
  };

  return levels[level]?.[variant] || level;
};
