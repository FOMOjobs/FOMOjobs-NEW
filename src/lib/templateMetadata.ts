/**
 * Template Metadata
 *
 * Comprehensive information about all available CV templates.
 * Used for template gallery, selection, and recommendations.
 */

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: 'professional' | 'creative' | 'modern' | 'classic' | 'technical';
  features: string[];
  bestFor: string[];
  atsScore: 'excellent' | 'good' | 'fair' | 'poor';
  difficulty: 'easy' | 'medium' | 'advanced';
  tags: string[];
  preview: string; // Color scheme preview
}

export const templateMetadata: Record<string, TemplateMetadata> = {
  ats: {
    id: 'ats',
    name: 'ATS-Friendly',
    description: 'Maksymalna zgodność z systemami ATS. Prosty, czytelny format bez grafik i ozdobników.',
    category: 'professional',
    features: [
      'Bez tabel i kolumn',
      'Standardowe czcionki',
      'Brak grafik i ikon',
      'Prosta struktura',
      'Czarny tekst na białym tle',
    ],
    bestFor: [
      'Aplikacje do dużych korporacji',
      'Branża finansowa i prawnicza',
      'Stanowiska rządowe',
      'Firmy z ATS (Taleo, Workday)',
    ],
    atsScore: 'excellent',
    difficulty: 'easy',
    tags: ['ATS', 'prosty', 'bezpieczny', 'korporacje', 'tradycyjny'],
    preview: '#000000', // Black
  },

  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'Tradycyjny, konserwatywny szablon CV. Idealne dla formalnych branż.',
    category: 'classic',
    features: [
      'Czcionka serif (Georgia)',
      'Pojedyncza kolumna',
      'Eleganckie podkreślenia',
      'Stonowane kolory',
      'Profesjonalne zdjęcie (opcjonalne)',
    ],
    bestFor: [
      'Prawo i finanse',
      'Administracja publiczna',
      'Stanowiska kierownicze',
      'Konserwatywne branże',
    ],
    atsScore: 'good',
    difficulty: 'easy',
    tags: ['klasyczny', 'elegancki', 'formalny', 'tradycyjny', 'konserwatywny'],
    preview: '#1e3a8a', // Navy Blue
  },

  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Nowoczesny profesjonalizm. Równowaga między estetyką a funkcjonalnością.',
    category: 'professional',
    features: [
      'Dwie kolumny (content + sidebar)',
      'Kolorowe akcenty',
      'Ikony sekcji',
      'Pogrubienia i hierarchia',
      'Sidebar z umiejętnościami',
    ],
    bestFor: [
      'Większość stanowisk biurowych',
      'IT i technologia',
      'Marketing i sprzedaż',
      'Stanowiska menedżerskie',
    ],
    atsScore: 'good',
    difficulty: 'medium',
    tags: ['profesjonalny', 'nowoczesny', 'uniwersalny', 'kolorowy', 'sidebar'],
    preview: '#6366f1', // Indigo
  },

  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Świeże, współczesne podejście. Wyróżnij się stylem i designem.',
    category: 'modern',
    features: [
      'Gradienty i cienie',
      'Nowoczesna typografia',
      'Okrągłe zdjęcie profilowe',
      'Kolumny i sekcje',
      'Wykresy umiejętności',
    ],
    bestFor: [
      'Startupy i tech',
      'Kreatywne stanowiska',
      'Młodsze firmy',
      'Stanowiska junior/mid',
    ],
    atsScore: 'fair',
    difficulty: 'medium',
    tags: ['nowoczesny', 'świeży', 'startup', 'tech', 'gradienty'],
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },

  minimalist: {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Mniej znaczy więcej. Czysta, minimalistyczna elegancja.',
    category: 'modern',
    features: [
      'Dużo białej przestrzeni',
      'Minimalistyczne ikony',
      'Subtelne linie',
      'Jedna kolumna',
      'Fokus na treści',
    ],
    bestFor: [
      'Design i UX',
      'Architektura',
      'Stanowiska kreatywne',
      'Portfolio osobiste',
    ],
    atsScore: 'good',
    difficulty: 'medium',
    tags: ['minimalistyczny', 'czysty', 'elegancki', 'design', 'przestrzeń'],
    preview: '#000000', // Black minimalist
  },

  creative: {
    id: 'creative',
    name: 'Creative',
    description: 'Dla prawdziwych kreatorów. Śmiałe kolory, nietypowy układ.',
    category: 'creative',
    features: [
      'Asymetryczny layout',
      'Żywe kolory',
      'Graficzne elementy',
      'Nietypowe sekcje',
      'Osobowość w designie',
    ],
    bestFor: [
      'Graficy i designerzy',
      'Marketing kreatywny',
      'Agencje reklamowe',
      'Freelancerzy',
    ],
    atsScore: 'poor',
    difficulty: 'advanced',
    tags: ['kreatywny', 'kolorowy', 'artystyczny', 'nietypowy', 'grafika'],
    preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },

  tech: {
    id: 'tech',
    name: 'Tech',
    description: 'Dla inżynierów i programistów. Techniczny, precyzyjny, czytelny.',
    category: 'technical',
    features: [
      'Monospace dla kodu',
      'Techniczne ikony',
      'GitHub/Stack Overflow linki',
      'Projekty i tech stack',
      'Certyfikaty techniczne',
    ],
    bestFor: [
      'Programiści',
      'DevOps i SysAdmin',
      'Data Scientists',
      'Inżynierowie oprogramowania',
    ],
    atsScore: 'good',
    difficulty: 'medium',
    tags: ['techniczny', 'IT', 'programowanie', 'inżynieria', 'kod'],
    preview: '#10b981', // Green (code theme)
  },

  executive: {
    id: 'executive',
    name: 'Executive',
    description: 'Dla liderów i menedżerów. Autorytet, doświadczenie, prestiż.',
    category: 'professional',
    features: [
      'Podkreślone osiągnięcia',
      'Leadership focus',
      'Timeline doświadczenia',
      'Metryki i wyniki',
      'Elegancka typografia',
    ],
    bestFor: [
      'C-level executives',
      'Senior management',
      'Dyrektorzy',
      'Liderzy zespołów',
    ],
    atsScore: 'good',
    difficulty: 'advanced',
    tags: ['executive', 'menedżer', 'lider', 'senior', 'autorytet'],
    preview: '#1f2937', // Dark gray (executive)
  },

  academic: {
    id: 'academic',
    name: 'Academic',
    description: 'CV akademickie. Publikacje, badania, konferencje, granty.',
    category: 'classic',
    features: [
      'Sekcja publikacji',
      'Bibliografia naukowa',
      'Konferencje i wykłady',
      'Granty i nagrody',
      'Afiliacje akademickie',
    ],
    bestFor: [
      'Naukowcy i badacze',
      'Doktoranci',
      'Pracownicy uczelni',
      'Aplikacje na granty',
    ],
    atsScore: 'good',
    difficulty: 'advanced',
    tags: ['akademicki', 'naukowy', 'publikacje', 'badania', 'uczelnia'],
    preview: '#7c3aed', // Purple (academic)
  },
};

/**
 * Get template by ID
 */
export const getTemplateMetadata = (id: string): TemplateMetadata | undefined => {
  return templateMetadata[id];
};

/**
 * Get all templates
 */
export const getAllTemplates = (): TemplateMetadata[] => {
  return Object.values(templateMetadata);
};

/**
 * Get templates by category
 */
export const getTemplatesByCategory = (category: TemplateMetadata['category']): TemplateMetadata[] => {
  return Object.values(templateMetadata).filter(t => t.category === category);
};

/**
 * Get recommended templates based on user data
 */
export const getRecommendedTemplates = (
  industry?: string,
  experienceLevel?: 'junior' | 'mid' | 'senior' | 'executive'
): TemplateMetadata[] => {
  const all = getAllTemplates();

  // Simple recommendation logic
  if (experienceLevel === 'executive') {
    return all.filter(t => ['executive', 'professional', 'classic'].includes(t.id));
  }

  if (industry?.toLowerCase().includes('tech') || industry?.toLowerCase().includes('it')) {
    return all.filter(t => ['tech', 'modern', 'professional', 'ats'].includes(t.id));
  }

  if (industry?.toLowerCase().includes('creative') || industry?.toLowerCase().includes('design')) {
    return all.filter(t => ['creative', 'modern', 'minimalist'].includes(t.id));
  }

  if (industry?.toLowerCase().includes('finance') || industry?.toLowerCase().includes('law')) {
    return all.filter(t => ['classic', 'professional', 'ats'].includes(t.id));
  }

  // Default recommendations
  return all.filter(t => ['professional', 'modern', 'ats'].includes(t.id));
};

/**
 * Get ATS-friendly templates
 */
export const getATSFriendlyTemplates = (): TemplateMetadata[] => {
  return getAllTemplates().filter(t =>
    t.atsScore === 'excellent' || t.atsScore === 'good'
  );
};
