/**
 * LinkedIn Profile Parser
 *
 * Parses copy-pasted LinkedIn profile text and extracts structured CV data.
 *
 * USAGE:
 * 1. User copies their entire LinkedIn profile page text
 * 2. Paste into import dialog
 * 3. Parser extracts: name, headline, location, experience, education, skills
 *
 * LIMITATIONS:
 * - Works best with English/Polish LinkedIn profiles
 * - Requires clean copy-paste (no extra formatting)
 * - Some fields may require manual adjustment
 */

import type { Experience, Education, Skill } from '@/types/cv';

export interface LinkedInParseResult {
  personal: {
    fullName: string;
    headline?: string;
    location?: string;
    email?: string;
    linkedIn?: string;
  };
  experience: Omit<Experience, 'id'>[];
  education: Omit<Education, 'id'>[];
  skills: Omit<Skill, 'id'>[];
  summary?: string;
}

/**
 * Extract name from LinkedIn profile text
 * Usually appears at the very top, often in all caps or title case
 */
const extractName = (text: string): string => {
  // Look for patterns like "Jan Kowalski" or "JOHN DOE" at the start
  const namePatterns = [
    /^([A-ZŻŹĆĄŚĘŁÓŃ][a-zżźćąśęłóń]+(?:\s+[A-ZŻŹĆĄŚĘŁÓŃ][a-zżźćąśęłóń]+)+)/m,
    /^([A-ZŻŹĆĄŚĘŁÓŃ\s]{3,50})\n/m,
  ];

  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return '';
};

/**
 * Extract headline/tagline (appears after name)
 * e.g., "Senior Software Engineer at Google"
 */
const extractHeadline = (text: string): string => {
  // Look for common headline patterns
  const patterns = [
    /(?:^|\n)([^\n]{10,150}(?:at|w|@|•)[^\n]{5,100})(?:\n|$)/i,
    /(?:^|\n)([^\n]{20,150}(?:Engineer|Developer|Manager|Designer|Specialist|Analyst)[^\n]{0,50})(?:\n|$)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return '';
};

/**
 * Extract location
 * Common formats: "Warsaw, Poland", "Warszawa, Polska", "New York, NY"
 */
const extractLocation = (text: string): string => {
  const patterns = [
    /(?:Location|Lokalizacja|Address|Adres)[:\s]+([^\n]{5,80})/i,
    /([A-ZŻŹĆĄŚĘŁÓŃ][a-zżźćąśęłóń]+,\s*[A-ZŻŹĆĄŚĘŁÓŃ][a-zżźćąśęłóń]+)/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return '';
};

/**
 * Extract email if present
 */
const extractEmail = (text: string): string => {
  const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  const match = text.match(emailPattern);
  return match ? match[1] : '';
};

/**
 * Extract LinkedIn URL
 */
const extractLinkedInURL = (text: string): string => {
  const patterns = [
    /(https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+)/,
    /linkedin\.com\/in\/([a-zA-Z0-9-]+)/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0].startsWith('http') ? match[0] : `https://linkedin.com/in/${match[1]}`;
    }
  }

  return '';
};

/**
 * Extract experience entries
 * Looks for job titles, companies, dates, and descriptions
 */
const extractExperience = (text: string): Omit<Experience, 'id'>[] => {
  const experiences: Omit<Experience, 'id'>[] = [];

  // Split text into sections by common delimiters
  const experienceSection = text.match(/Experience|Doświadczenie([\s\S]*?)(?=Education|Edukacja|Skills|Umiejętności|$)/i);
  if (!experienceSection) return experiences;

  const section = experienceSection[1];

  // Pattern to match experience entries
  // Format: Position · Company · Dates · Location
  const entryPattern = /([^\n·]+)·\s*([^\n·]+)·\s*([^\n·]+)(?:·\s*([^\n]+))?\n([\s\S]*?)(?=\n[A-ZŻŹĆĄŚĘŁÓŃ][^\n]*·|$)/g;

  let match;
  while ((match = entryPattern.exec(section)) !== null) {
    const [, position, company, dates, location, description] = match;

    // Parse dates
    const dateMatch = dates.match(/(\w+\s+\d{4})\s*[-–]\s*(\w+\s+\d{4}|Present|Obecnie)/i);
    const startDate = dateMatch?.[1] || '';
    const endDate = dateMatch?.[2] || '';
    const isCurrent = /present|obecnie/i.test(endDate);

    experiences.push({
      position: position.trim(),
      company: company.trim(),
      location: location?.trim() || '',
      startDate: formatDate(startDate),
      endDate: isCurrent ? '' : formatDate(endDate),
      current: isCurrent,
      description: description.trim().slice(0, 500),
      achievements: []
    });
  }

  return experiences;
};

/**
 * Extract education entries
 */
const extractEducation = (text: string): Omit<Education, 'id'>[] => {
  const educationList: Omit<Education, 'id'>[] = [];

  const educationSection = text.match(/Education|Edukacja([\s\S]*?)(?=Skills|Umiejętności|Languages|Języki|$)/i);
  if (!educationSection) return educationList;

  const section = educationSection[1];

  // Pattern: School · Degree · Dates
  const entryPattern = /([^\n·]+)·\s*([^\n·]+)(?:·\s*([^\n]+))?\n([\s\S]*?)(?=\n[A-ZŻŹĆĄŚĘŁÓŃ][^\n]*·|$)/g;

  let match;
  while ((match = entryPattern.exec(section)) !== null) {
    const [, school, degree, dates] = match;

    const dateMatch = dates?.match(/(\d{4})\s*[-–]\s*(\d{4}|Present|Obecnie)/i);
    const startDate = dateMatch?.[1] || '';
    const endDate = dateMatch?.[2] || '';
    const isCurrent = /present|obecnie/i.test(endDate);

    educationList.push({
      school: school.trim(),
      degree: degree.trim(),
      fieldOfStudy: '',
      location: '',
      startDate: formatDate(startDate),
      endDate: isCurrent ? '' : formatDate(endDate),
      current: isCurrent,
      gpa: '',
      description: '',
      achievements: []
    });
  }

  return educationList;
};

/**
 * Extract skills
 */
const extractSkills = (text: string): Omit<Skill, 'id'>[] => {
  const skills: Omit<Skill, 'id'>[] = [];

  const skillsSection = text.match(/Skills|Umiejętności([\s\S]*?)(?=Languages|Języki|Recommendations|Rekomendacje|$)/i);
  if (!skillsSection) return skills;

  const section = skillsSection[1];

  // Skills are often listed with bullets or commas
  const skillMatches = section.match(/(?:•|,|\n)\s*([A-Za-zżźćąśęłóń\s.+#-]{2,50})(?=•|,|\n|$)/g);

  if (skillMatches) {
    skillMatches.forEach(skill => {
      const cleanSkill = skill.replace(/^[•,\s]+/, '').trim();
      if (cleanSkill.length > 1 && cleanSkill.length < 50) {
        skills.push({
          name: cleanSkill,
          level: 'intermediate', // Default level
          category: detectSkillCategory(cleanSkill)
        });
      }
    });
  }

  // Limit to top 20 skills
  return skills.slice(0, 20);
};

/**
 * Detect skill category based on name
 */
const detectSkillCategory = (skillName: string): 'technical' | 'soft' | 'language' | 'other' => {
  const lower = skillName.toLowerCase();

  // Technical skills
  const techKeywords = ['javascript', 'python', 'java', 'react', 'node', 'sql', 'aws', 'docker', 'git', 'typescript', 'html', 'css', 'api', 'linux', 'cloud', 'database'];
  if (techKeywords.some(kw => lower.includes(kw))) {
    return 'technical';
  }

  // Language skills
  const langKeywords = ['english', 'polish', 'spanish', 'french', 'german', 'angielski', 'polski', 'hiszpański', 'francuski', 'niemiecki'];
  if (langKeywords.some(kw => lower.includes(kw))) {
    return 'language';
  }

  // Soft skills
  const softKeywords = ['leadership', 'communication', 'teamwork', 'management', 'problem solving', 'analytical', 'przywództwo', 'komunikacja', 'zarządzanie'];
  if (softKeywords.some(kw => lower.includes(kw))) {
    return 'soft';
  }

  return 'other';
};

/**
 * Format date to YYYY-MM format
 */
const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';

  // Parse "Month YYYY" format
  const monthMatch = dateStr.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Sty|Lut|Mar|Kwi|Maj|Cze|Lip|Sie|Wrz|Paź|Lis|Gru)\w*\s+(\d{4})/i);
  if (monthMatch) {
    const monthMap: Record<string, string> = {
      'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
      'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12',
      'sty': '01', 'lut': '02', 'kwi': '04', 'maj': '05', 'cze': '06',
      'lip': '07', 'sie': '08', 'wrz': '09', 'paź': '10', 'lis': '11', 'gru': '12'
    };
    const month = monthMap[monthMatch[1].toLowerCase().slice(0, 3)] || '01';
    return `${monthMatch[2]}-${month}`;
  }

  // Parse "YYYY" only
  const yearMatch = dateStr.match(/(\d{4})/);
  if (yearMatch) {
    return `${yearMatch[1]}-01`;
  }

  return '';
};

/**
 * Main parser function
 * Extracts all available data from LinkedIn profile text
 */
export const parseLinkedInProfile = (text: string): LinkedInParseResult => {
  const cleanText = text.trim();

  return {
    personal: {
      fullName: extractName(cleanText),
      headline: extractHeadline(cleanText),
      location: extractLocation(cleanText),
      email: extractEmail(cleanText),
      linkedIn: extractLinkedInURL(cleanText),
    },
    experience: extractExperience(cleanText),
    education: extractEducation(cleanText),
    skills: extractSkills(cleanText),
    summary: extractHeadline(cleanText), // Use headline as initial summary
  };
};
