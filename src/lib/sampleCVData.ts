/**
 * Sample CV Data for Template Previews
 *
 * Used to show realistic previews of templates in the gallery
 */

import type { CVData } from '@/types/cv';

export const sampleCVData: CVData = {
  personal: {
    fullName: 'Anna Kowalska',
    email: 'anna.kowalska@email.com',
    phone: '+48 123 456 789',
    address: 'Warszawa, Polska',
    linkedIn: 'linkedin.com/in/anna-kowalska',
    portfolio: 'annakowalska.dev',
    photo: '', // No photo in preview to keep it clean
    summary: 'Doświadczona specjalistka w obszarze marketingu cyfrowego z 5+ latami praktycznej wiedzy. Specjalizuję się w strategiach content marketingu, SEO oraz kampaniach w mediach społecznościowych. Osiągnęłam wzrost organicznego ruchu o 300% i zarządzałam budżetami reklamowymi przekraczającymi 500k PLN.',
  },

  experience: [
    {
      id: '1',
      position: 'Senior Marketing Manager',
      company: 'TechStart sp. z o.o.',
      location: 'Warszawa',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: 'Zarządzanie zespołem 5 specjalistów, planowanie i realizacja strategii marketingowej.',
      achievements: [
        'Zwiększyłam organiczny ruch na stronie o 300% w ciągu 12 miesięcy',
        'Zarządzałam budżetem reklamowym 500k PLN z ROI 450%',
        'Wdrożyłam automation marketing, oszczędzając 20h tygodniowo',
      ],
    },
    {
      id: '2',
      position: 'Marketing Specialist',
      company: 'Digital Agency',
      location: 'Kraków',
      startDate: '2019-01',
      endDate: '2021-02',
      current: false,
      description: 'Tworzenie strategii content marketingu dla klientów B2B i B2C.',
      achievements: [
        'Prowadziłam 15+ kampanii dla klientów z różnych branż',
        'Zbudowałam społeczność 50k followers na LinkedIn',
      ],
    },
  ],

  education: [
    {
      id: '1',
      school: 'Uniwersytet Warszawski',
      degree: 'Magister',
      fieldOfStudy: 'Marketing i Zarządzanie',
      location: 'Warszawa',
      startDate: '2015-10',
      endDate: '2019-06',
      current: false,
      gpa: '4.8/5.0',
      description: '',
      achievements: [
        'Stypendium Rektora za wybitne osiągnięcia naukowe',
        'Praca magisterska oceniona na 5.0',
      ],
    },
  ],

  skills: [
    { id: '1', name: 'Google Analytics', level: 'advanced', category: 'technical' },
    { id: '2', name: 'SEO / SEM', level: 'advanced', category: 'technical' },
    { id: '3', name: 'Content Marketing', level: 'expert', category: 'technical' },
    { id: '4', name: 'Social Media Marketing', level: 'advanced', category: 'technical' },
    { id: '5', name: 'Marketing Automation', level: 'intermediate', category: 'technical' },
    { id: '6', name: 'Strategia marketingowa', level: 'advanced', category: 'soft' },
    { id: '7', name: 'Zarządzanie zespołem', level: 'advanced', category: 'soft' },
    { id: '8', name: 'Analiza danych', level: 'advanced', category: 'soft' },
  ],

  languages: [
    { id: '1', name: 'Polski', level: 'native', certification: '' },
    { id: '2', name: 'Angielski', level: 'C1', certification: 'CAE - Cambridge' },
    { id: '3', name: 'Niemiecki', level: 'B1', certification: '' },
  ],

  customization: {
    template: 'modern',
    primaryColor: '#8B5CF6',
    secondaryColor: '#F4D03F',
    language: 'pl',
    includeRodo: true,
  },
};

/**
 * Get sample data with specific template applied
 */
export const getSampleDataForTemplate = (templateId: string): CVData => {
  return {
    ...sampleCVData,
    customization: {
      ...sampleCVData.customization,
      template: templateId,
    },
  };
};
