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
 * Helper: Extract years of experience from work history
 */
const calculateYearsOfExperience = (experience: GenerateSummaryParams['experience']): number => {
  if (experience.length === 0) return 0;

  // Simple heuristic: count total positions and estimate
  // In real API, we would parse startDate/endDate
  return Math.max(2, Math.min(15, experience.length * 2));
};

/**
 * Helper: Detect industry/specialization from job titles
 */
const detectIndustry = (experience: GenerateSummaryParams['experience'], lang: AILanguage): string => {
  const titles = experience.map(e => e.position.toLowerCase()).join(' ');

  const industries: Record<string, { pl: string; en: string }> = {
    'software|developer|engineer|programmer|tech|frontend|backend': { pl: 'technologii IT', en: 'technology' },
    'manager|zarząd|dyrektor|kierownik': { pl: 'zarządzania', en: 'management' },
    'designer|ux|ui|graphic': { pl: 'projektowania UX/UI', en: 'design' },
    'marketing|seo|content|social media': { pl: 'marketingu', en: 'marketing' },
    'data|analyt|scientist': { pl: 'analizy danych', en: 'data analytics' },
    'sales|sprzedaż|handl': { pl: 'sprzedaży', en: 'sales' },
    'hr|rekrut|human': { pl: 'HR', en: 'human resources' },
    'finance|finans|księg': { pl: 'finansów', en: 'finance' }
  };

  for (const [pattern, labels] of Object.entries(industries)) {
    if (new RegExp(pattern, 'i').test(titles)) {
      return labels[lang];
    }
  }

  return lang === 'pl' ? 'swojej branży' : 'their field';
};

/**
 * Helper: Get top skills (max 5)
 */
const getTopSkills = (skills: GenerateSummaryParams['skills']): string[] => {
  return skills
    .slice(0, 5)
    .map(s => s.name);
};

/**
 * Generate professional CV summary based on experience, education, and skills
 * NOW: Actually uses user data to create personalized summary!
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

    const { tone, language, experience, education, skills } = params;

    // Extract context from user data
    const yearsExp = calculateYearsOfExperience(experience);
    const industry = detectIndustry(experience, language);
    const topSkills = getTopSkills(skills);
    const latestRole = experience[0]?.position || (language === 'pl' ? 'Specjalista' : 'Professional');
    const hasHigherEd = education.length > 0;
    const degree = education[0]?.degree || '';

    // Build personalized summary based on tone
    let summary = '';

    if (language === 'pl') {
      if (tone === 'formal') {
        summary = `Doświadczony specjalista w obszarze ${industry} z ${yearsExp}+ latami praktycznej wiedzy. `;

        if (experience.length > 0) {
          summary += `Obecnie pełnię funkcję ${latestRole}, gdzie odpowiadam za ${experience[0].description?.slice(0, 80) || 'kluczowe projekty i inicjatywy'}. `;
        }

        if (topSkills.length > 0) {
          summary += `Specjalizuję się w: ${topSkills.slice(0, 3).join(', ')}. `;
        }

        if (hasHigherEd) {
          summary += `Posiadam wykształcenie ${degree}, które stanowi solidną podstawę do realizacji złożonych projektów. `;
        }

        summary += 'Charakteryzuję się analitycznym podejściem do problemów, silnymi umiejętnościami komunikacyjnymi oraz dążeniem do ciągłego rozwoju kompetencji zawodowych.';
      }
      else if (tone === 'friendly') {
        summary = `Jestem pasjonatem ${industry} z ${yearsExp}+ latami doświadczenia w tworzeniu świetnych rozwiązań! `;

        if (topSkills.length > 0) {
          summary += `Uwielbiam pracować z: ${topSkills.slice(0, 3).join(', ')}. `;
        }

        if (experience.length > 0) {
          summary += `Ostatnio pracowałem jako ${latestRole}, gdzie mogłem rozwijać swoje umiejętności i pomagać zespołowi osiągać cele. `;
        }

        summary += 'Uwielbiam wyzwania, dzielenie się wiedzą i ciągły rozwój. Każdy projekt to dla mnie szansa na naukę czegoś nowego! Szukam miejsca, gdzie będę mógł wykorzystać swoje doświadczenie i jednocześnie rozwijać się w inspirującym środowisku.';
      }
      else { // technical
        summary = `${latestRole} z ${yearsExp}+ latami doświadczenia w ${industry}. `;

        if (topSkills.length > 0) {
          summary += `Stack technologiczny: ${topSkills.join(', ')}. `;
        }

        if (experience.length > 0) {
          summary += `Track record: ${experience.length} projektów komercyjnych. `;
        }

        if (hasHigherEd) {
          summary += `Wykształcenie: ${degree}. `;
        }

        summary += 'Specjalizacja w architekturze systemów, optymalizacji wydajności oraz code review. Doświadczenie w metodykach Agile/Scrum, CI/CD oraz mentoringu zespołów.';
      }
    } else { // English
      if (tone === 'formal') {
        summary = `Experienced ${industry} professional with ${yearsExp}+ years of practical knowledge. `;

        if (experience.length > 0) {
          summary += `Currently serving as ${latestRole}, where I am responsible for ${experience[0].description?.slice(0, 80) || 'key projects and initiatives'}. `;
        }

        if (topSkills.length > 0) {
          summary += `Specializing in: ${topSkills.slice(0, 3).join(', ')}. `;
        }

        if (hasHigherEd) {
          summary += `Hold ${degree} degree, providing a solid foundation for executing complex projects. `;
        }

        summary += 'Characterized by analytical approach to problem-solving, strong communication skills, and commitment to continuous professional development.';
      }
      else if (tone === 'friendly') {
        summary = `I'm a ${industry} enthusiast with ${yearsExp}+ years of experience creating great solutions! `;

        if (topSkills.length > 0) {
          summary += `Love working with: ${topSkills.slice(0, 3).join(', ')}. `;
        }

        if (experience.length > 0) {
          summary += `Recently worked as ${latestRole}, where I could develop my skills and help the team achieve goals. `;
        }

        summary += "I love challenges, knowledge sharing, and continuous growth. Every project is an opportunity to learn something new! I'm looking for a place where I can use my experience while growing in an inspiring environment.";
      }
      else { // technical
        summary = `${latestRole} with ${yearsExp}+ years of experience in ${industry}. `;

        if (topSkills.length > 0) {
          summary += `Tech stack: ${topSkills.join(', ')}. `;
        }

        if (experience.length > 0) {
          summary += `Track record: ${experience.length} commercial projects. `;
        }

        if (hasHigherEd) {
          summary += `Education: ${degree}. `;
        }

        summary += 'Specialization in system architecture, performance optimization, and code review. Experience in Agile/Scrum methodologies, CI/CD, and team mentoring.';
      }
    }

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

