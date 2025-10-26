/**
 * Mock AI Service
 *
 * Simulates OpenAI API responses for CV generation features.
 * This allows frontend development without backend dependency.
 * When Andrzej completes the backend, simply switch USE_MOCK_API flag in useAIGeneration.ts
 *
 * NEW RATE LIMITING:
 * - Simple: 4 requests per hour (was 10/hour + 50k tokens/day)
 * - Managed by src/utils/aiRateLimiter.ts
 * - No token tracking (simplified)
 */

import {
  canUseAI as checkRateLimit,
  incrementAIUsage,
  getRemainingRequests,
  getResetTime
} from '@/utils/aiRateLimiter';

export type AITone = 'formal' | 'friendly' | 'technical';
export type AILanguage = 'pl' | 'en';

export interface GenerateSummaryParams {
  experience: Array<{
    position: string;
    company: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
  }>;
  skills: Array<{
    name: string;
    level: string;
  }>;
  tone: AITone;
  language: AILanguage;
}

export interface ImproveDescriptionParams {
  jobTitle: string;
  currentDescription: string;
  language: AILanguage;
}

export interface SuggestKeywordsParams {
  jobTitle: string;
  industry?: string;
  language: AILanguage;
}

export interface AIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Check if user can make AI request (using new rate limiter)
 */
export const canUseAI = async (): Promise<{ allowed: boolean; reason?: string }> => {
  const remaining = getRemainingRequests();

  if (remaining <= 0) {
    return {
      allowed: false,
      reason: `Limit generacji wykorzystany. Reset za: ${getResetTime()}`
    };
  }

  return { allowed: true };
};

/**
 * Generate professional CV summary based on experience, education, and skills
 */
export const generateSummary = async (
  params: GenerateSummaryParams
): Promise<AIResponse<string>> => {
  try {
    // Check limits
    const check = await canUseAI();
    if (!check.allowed) {
      return {
        success: false,
        error: check.reason
      };
    }

    // Simulate realistic API delay (2-3 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

    const { tone, language } = params;

    // Mock responses based on tone and language
    const summaries: Record<AILanguage, Record<AITone, string>> = {
      pl: {
        formal: 'Doświadczony specjalista z wieloletnim doświadczeniem w branży technologicznej. Posiadam udokumentowane osiągnięcia w zakresie zarządzania projektami oraz wdrażania innowacyjnych rozwiązań. Charakteryzuję się analitycznym podejściem do problemów oraz silnymi umiejętnościami komunikacyjnymi. Dążę do ciągłego rozwoju kompetencji zawodowych i poszerzania wiedzy w dynamicznie zmieniającym się środowisku biznesowym.',
        friendly: 'Jestem pasjonatem technologii z wieloletnim doświadczeniem w tworzeniu świetnych produktów. Uwielbiam pracować w zespole i dzielić się wiedzą z innymi. Moje motto to ciągły rozwój i wychodzenie poza strefę komfortu! Każdy dzień to nowa szansa na naukę czegoś nowego i realizację ambitnych celów. Szukam miejsca, gdzie będę mógł wykorzystać swoje umiejętności i jednocześnie rozwijać się w inspirującym środowisku.',
        technical: 'Software Engineer z 5+ latami doświadczenia w full-stack development. Specjalizacja: React, TypeScript, Node.js, PostgreSQL. Doświadczenie w architekturze mikroserwisów, CI/CD, oraz metodykach Agile/Scrum. Track record: 20+ projektów produkcyjnych, 99.9% uptime. Ekspert w optymalizacji wydajności, code review, oraz mentoringu junior developers. Aktywny contributor w projektach open source.'
      },
      en: {
        formal: 'Experienced professional with extensive background in the technology sector. Demonstrated achievements in project management and implementation of innovative solutions. Characterized by an analytical approach to problem-solving and strong communication skills. Committed to continuous professional development and expanding knowledge in a dynamically changing business environment.',
        friendly: "I'm a technology enthusiast with years of experience creating amazing products. I love working in teams and sharing knowledge with others. My motto is continuous growth and stepping outside the comfort zone! Every day is a new opportunity to learn something new and achieve ambitious goals. I'm looking for a place where I can utilize my skills while growing in an inspiring environment.",
        technical: 'Software Engineer with 5+ years of experience in full-stack development. Specialization: React, TypeScript, Node.js, PostgreSQL. Experience in microservices architecture, CI/CD, and Agile/Scrum methodologies. Track record: 20+ production projects, 99.9% uptime. Expert in performance optimization, code review, and mentoring junior developers. Active contributor to open source projects.'
      }
    };

    const summary = summaries[language][tone];

    // Increment usage (new rate limiter)
    incrementAIUsage();

    return {
      success: true,
      data: summary
    };
  } catch (error) {
    return {
      success: false,
      error: 'Wystąpił błąd podczas generowania podsumowania. Spróbuj ponownie.'
    };
  }
};

/**
 * Improve job description by converting it into achievement-focused bullet points
 */
export const improveDescription = async (
  params: ImproveDescriptionParams
): Promise<AIResponse<string[]>> => {
  try {
    // Check limits
    const check = await canUseAI();
    if (!check.allowed) {
      return {
        success: false,
        error: check.reason
      };
    }

    // Simulate realistic API delay
    await new Promise(resolve => setTimeout(resolve, 2500 + Math.random() * 500));

    const { language } = params;

    // Mock achievement-focused bullet points
    const achievements: Record<AILanguage, string[]> = {
      pl: [
        'Zwiększyłem wydajność aplikacji o 40% poprzez optymalizację zapytań do bazy danych i implementację cachingu',
        'Wdrożyłem system CI/CD, skracając czas deploymentu z 2 godzin do 15 minut i eliminując 90% błędów wdrożeniowych',
        'Zbudowałem i zarządzałem zespołem 5 programistów, prowadząc rekrutację, onboarding oraz mentoring juniorów',
        'Zredukowałem liczbę bugów produkcyjnych o 60% poprzez wprowadzenie testów automatycznych i code review',
        'Przeprowadziłem migrację legacy systemu na nowoczesną architekturę mikroserwisów, poprawiając skalowalność o 300%'
      ],
      en: [
        'Increased application performance by 40% through database query optimization and caching implementation',
        'Implemented CI/CD system, reducing deployment time from 2 hours to 15 minutes and eliminating 90% of deployment errors',
        'Built and managed a team of 5 developers, conducting recruitment, onboarding, and junior mentoring',
        'Reduced production bugs by 60% through introduction of automated testing and code review processes',
        'Migrated legacy system to modern microservices architecture, improving scalability by 300%'
      ]
    };

    // Return 4-5 random achievements
    const allAchievements = achievements[language];
    const selectedAchievements = allAchievements
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    // Increment usage (new rate limiter)
    incrementAIUsage();

    return {
      success: true,
      data: selectedAchievements
    };
  } catch (error) {
    return {
      success: false,
      error: 'Wystąpił błąd podczas poprawiania opisu. Spróbuj ponownie.'
    };
  }
};

/**
 * Suggest relevant keywords for ATS optimization based on job title
 */
export const suggestKeywords = async (
  params: SuggestKeywordsParams
): Promise<AIResponse<string[]>> => {
  try {
    // Check limits
    const check = await canUseAI();
    if (!check.allowed) {
      return {
        success: false,
        error: check.reason
      };
    }

    // Simulate realistic API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 500));

    const { jobTitle } = params;

    // Mock keywords based on job title patterns
    const keywordSets: Record<string, string[]> = {
      'software engineer': ['React', 'TypeScript', 'Node.js', 'Git', 'Agile', 'REST API', 'SQL', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Microservices', 'GraphQL', 'Kubernetes', 'MongoDB'],
      'frontend': ['React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Webpack', 'Redux', 'Responsive Design', 'Accessibility', 'Performance Optimization', 'Figma', 'Git', 'SASS'],
      'backend': ['Node.js', 'Python', 'Java', 'SQL', 'PostgreSQL', 'MongoDB', 'REST API', 'GraphQL', 'Docker', 'Kubernetes', 'AWS', 'Redis', 'Microservices', 'RabbitMQ', 'OAuth'],
      'project manager': ['Scrum', 'Agile', 'JIRA', 'Stakeholder Management', 'Budget Planning', 'Risk Management', 'Team Leadership', 'KPI', 'Roadmap', 'Sprint Planning', 'Confluence', 'Resource Allocation', 'Change Management', 'Reporting', 'Communication'],
      'ux designer': ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Design Systems', 'Responsive Design', 'A/B Testing', 'Accessibility', 'Sketch', 'Adobe XD', 'User Flows', 'Information Architecture', 'Visual Design', 'Interaction Design'],
      'data scientist': ['Python', 'R', 'Machine Learning', 'TensorFlow', 'PyTorch', 'SQL', 'Statistics', 'Data Visualization', 'Pandas', 'NumPy', 'Scikit-learn', 'Deep Learning', 'NLP', 'Big Data', 'Jupyter'],
      'devops': ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Jenkins', 'Terraform', 'Ansible', 'Git', 'Linux', 'Monitoring', 'Prometheus', 'Grafana', 'Shell Scripting', 'Infrastructure as Code'],
      'product manager': ['Product Strategy', 'Roadmap Planning', 'User Stories', 'Market Research', 'A/B Testing', 'Analytics', 'Stakeholder Management', 'Agile', 'Feature Prioritization', 'Go-to-Market', 'Product Lifecycle', 'OKRs', 'Competitive Analysis', 'User Research', 'Data-Driven']
    };

    // Find matching keyword set (case insensitive partial match)
    const jobTitleLower = jobTitle.toLowerCase();
    let keywords = keywordSets['software engineer']; // default

    for (const [key, value] of Object.entries(keywordSets)) {
      if (jobTitleLower.includes(key)) {
        keywords = value;
        break;
      }
    }

    // Return 10-12 random keywords
    const selectedKeywords = keywords
      .sort(() => Math.random() - 0.5)
      .slice(0, 10 + Math.floor(Math.random() * 3));

    // Increment usage (new rate limiter)
    incrementAIUsage();

    return {
      success: true,
      data: selectedKeywords
    };
  } catch (error) {
    return {
      success: false,
      error: 'Wystąpił błąd podczas generowania słów kluczowych. Spróbuj ponownie.'
    };
  }
};

