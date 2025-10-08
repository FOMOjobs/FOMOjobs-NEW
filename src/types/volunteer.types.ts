// Legacy volunteer types - kept for backward compatibility with Calendar page
// TODO: Migrate Calendar.tsx to job-related events instead of volunteering

export type VolunteerCategory =
  | 'edukacja'
  | 'ekologia'
  | 'sport'
  | 'kultura'
  | 'zdrowie'
  | 'pomoc_spoleczna';

export interface VolunteerOpportunity {
  id: string;
  title: string;
  organization: string;
  category: VolunteerCategory;
  description: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  spots: number;
  spotsLeft: number;
  image: string;
  requiredAge: number;
  difficulty: 'łatwy' | 'średni' | 'trudny';
  benefits: string[];
  requirements: string[];
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}
