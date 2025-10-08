/**
 * AI Suggestions for CV Creator
 *
 * FAZA 2: Add OpenAI API key to .env file to enable AI features:
 * VITE_OPENAI_API_KEY=your_key_here
 *
 * Uncomment and implement when ready!
 */

// import OpenAI from 'openai';
// import { CVData, ExperienceItem, EducationItem } from '@/types/cv';

// const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// let openai: OpenAI | null = null;

// if (API_KEY) {
//   openai = new OpenAI({
//     apiKey: API_KEY,
//     dangerouslyAllowBrowser: true // Only for demo! Use backend in production
//   });
// }

/**
 * Check if AI is available
 */
export const isAIAvailable = (): boolean => {
  return false; // Change to: return !!API_KEY;
};

/**
 * Generate professional summary based on experience and education
 */
export const generateSummary = async (
  cvData: any // CVData when uncommented
): Promise<string> => {
  throw new Error('AI features coming soon! Add OpenAI API key to enable.');

  // if (!openai) throw new Error('OpenAI API key not configured');

  // const experienceSummary = cvData.experience
  //   .map((exp: any) => `${exp.position} at ${exp.company}`)
  //   .join(', ');

  // const educationSummary = cvData.education
  //   .map((edu: any) => `${edu.degree} in ${edu.fieldOfStudy}`)
  //   .join(', ');

  // const prompt = `Write a professional CV summary (2-3 sentences) for someone with:
  // Experience: ${experienceSummary}
  // Education: ${educationSummary}

  // Make it concise, impactful, and tailored for job applications.`;

  // const completion = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   messages: [{ role: 'user', content: prompt }],
  //   max_tokens: 150,
  //   temperature: 0.7,
  // });

  // return completion.choices[0]?.message?.content || '';
};

/**
 * Improve job description with action verbs and achievements
 */
export const improveDescription = async (
  description: string,
  position: string
): Promise<string> => {
  throw new Error('AI features coming soon! Add OpenAI API key to enable.');

  // if (!openai) throw new Error('OpenAI API key not configured');

  // const prompt = `Improve this job description for a ${position} role. Make it more professional, add action verbs, and quantify achievements where possible:

  // "${description}"

  // Return only the improved version, no explanations.`;

  // const completion = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   messages: [{ role: 'user', content: prompt }],
  //   max_tokens: 200,
  //   temperature: 0.7,
  // });

  // return completion.choices[0]?.message?.content || description;
};

/**
 * Generate achievement bullet points from description
 */
export const generateAchievements = async (
  description: string,
  position: string
): Promise<string[]> => {
  throw new Error('AI features coming soon! Add OpenAI API key to enable.');

  // if (!openai) throw new Error('OpenAI API key not configured');

  // const prompt = `Based on this job description for a ${position}, generate 3-4 achievement bullet points that:
  // - Start with action verbs
  // - Quantify results when possible
  // - Follow the STAR method (Situation, Task, Action, Result)

  // Description: "${description}"

  // Return only bullet points, one per line.`;

  // const completion = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   messages: [{ role: 'user', content: prompt }],
  //   max_tokens: 250,
  //   temperature: 0.7,
  // });

  // const content = completion.choices[0]?.message?.content || '';
  // return content
  //   .split('\n')
  //   .filter(line => line.trim())
  //   .map(line => line.replace(/^[-•*]\s*/, ''));
};

/**
 * Suggest relevant skills based on job position
 */
export const suggestSkills = async (
  position: string,
  existingSkills: string[]
): Promise<string[]> => {
  throw new Error('AI features coming soon! Add OpenAI API key to enable.');

  // if (!openai) throw new Error('OpenAI API key not configured');

  // const prompt = `Suggest 5 relevant professional skills for a ${position} role.
  // Existing skills: ${existingSkills.join(', ')}

  // Suggest skills that are:
  // - Not already listed
  // - Highly relevant to the role
  // - In-demand in the job market

  // Return only skill names, one per line.`;

  // const completion = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   messages: [{ role: 'user', content: prompt }],
  //   max_tokens: 100,
  //   temperature: 0.7,
  // });

  // const content = completion.choices[0]?.message?.content || '';
  // return content
  //   .split('\n')
  //   .filter(line => line.trim())
  //   .map(line => line.replace(/^[-•*]\s*/, ''));
};

/**
 * Check CV for ATS optimization and provide suggestions
 */
export const analyzeForATS = async (cvData: any): Promise<{
  score: number;
  suggestions: string[];
}> => {
  throw new Error('AI features coming soon! Add OpenAI API key to enable.');

  // if (!openai) throw new Error('OpenAI API key not configured');

  // const cvText = JSON.stringify(cvData, null, 2);

  // const prompt = `Analyze this CV for ATS (Applicant Tracking System) compatibility and provide:
  // 1. A score out of 100
  // 2. Specific suggestions for improvement

  // CV Data: ${cvText}

  // Return in format:
  // SCORE: [number]
  // SUGGESTIONS:
  // - [suggestion 1]
  // - [suggestion 2]
  // ...`;

  // const completion = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   messages: [{ role: 'user', content: prompt }],
  //   max_tokens: 400,
  //   temperature: 0.7,
  // });

  // const content = completion.choices[0]?.message?.content || '';
  // const scoreMatch = content.match(/SCORE:\s*(\d+)/);
  // const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;

  // const suggestionsMatch = content.match(/SUGGESTIONS:\s*([\s\S]*)/);
  // const suggestionsText = suggestionsMatch ? suggestionsMatch[1] : '';
  // const suggestions = suggestionsText
  //   .split('\n')
  //   .filter(line => line.trim().startsWith('-'))
  //   .map(line => line.replace(/^[-•*]\s*/, ''));

  // return { score, suggestions };
};

export default {
  isAIAvailable,
  generateSummary,
  improveDescription,
  generateAchievements,
  suggestSkills,
  analyzeForATS,
};
