import React from 'react';
import { CVData } from '@/types/cv';

interface ATSTemplateProps {
  data: CVData;
}

/**
 * ATS-Friendly Template
 *
 * CRITICAL: 90% of companies use Applicant Tracking Systems (ATS)
 * This template maximizes parsing success by ATS bots
 *
 * KEY FEATURES:
 * - Single column layout (NO sidebars, NO tables)
 * - System fonts only (Arial/Helvetica)
 * - Black text on white background
 * - NO graphics, icons, charts, photos
 * - Plain text priority
 * - Standard section headers (UPPERCASE + underline)
 * - Contact info in body (NOT header/footer - ATS can't read those)
 * - Full words (Master of Science, NOT M.Sc.)
 * - Standard date format (MM/YYYY)
 */

const ATSTemplate: React.FC<ATSTemplateProps> = ({ data }) => {
  const { personal, experience, education, skills, languages } = data;

  // Format date to MM/YYYY (ATS standard)
  const formatDate = (dateStr: string): string => {
    if (dateStr === 'current' || dateStr === 'Present') return 'Present';
    if (!dateStr) return '';

    const [year, month] = dateStr.split('-');
    if (month && year) {
      return `${month}/${year}`;
    }
    return dateStr;
  };

  // Get skill level in plain text
  const getSkillLevel = (level: string): string => {
    const levels: Record<string, string> = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced',
      'expert': 'Expert'
    };
    return levels[level] || level;
  };

  // Get language level in full words
  const getLanguageLevel = (level: string): string => {
    const levels: Record<string, string> = {
      'A1': 'Elementary (A1)',
      'A2': 'Pre-Intermediate (A2)',
      'B1': 'Intermediate (B1)',
      'B2': 'Upper-Intermediate (B2)',
      'C1': 'Advanced (C1)',
      'C2': 'Proficient (C2)',
      'native': 'Native Speaker'
    };
    return levels[level] || level;
  };

  return (
    <div
      className="bg-white text-black p-[2.5cm] max-w-[21cm] mx-auto"
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '11pt',
        lineHeight: '1.4',
        color: '#000000'
      }}
    >
      {/* CONTACT INFORMATION - Must be in body, NOT header (ATS requirement) */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold mb-2 uppercase"
          style={{ fontSize: '18pt', fontWeight: 'bold' }}
        >
          {personal.fullName || 'YOUR FULL NAME'}
        </h1>

        <div className="text-sm" style={{ fontSize: '10pt' }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.address && <div>{personal.address}</div>}
          {personal.linkedIn && <div>LinkedIn: {personal.linkedIn}</div>}
          {personal.portfolio && <div>Portfolio: {personal.portfolio}</div>}
        </div>
      </div>

      {/* PROFESSIONAL SUMMARY */}
      {personal.summary && (
        <div className="mb-6">
          <h2
            className="text-base font-bold uppercase mb-2 pb-1"
            style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              borderBottom: '1px solid #000000'
            }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm" style={{ fontSize: '11pt' }}>
            {personal.summary}
          </p>
        </div>
      )}

      {/* CORE SKILLS */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-base font-bold uppercase mb-2 pb-1"
            style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              borderBottom: '1px solid #000000'
            }}
          >
            CORE SKILLS
          </h2>
          <div className="text-sm" style={{ fontSize: '11pt' }}>
            {/* Group skills by category */}
            {['technical', 'soft', 'language', 'other'].map(category => {
              const categorySkills = skills.filter(s => s.category === category);
              if (categorySkills.length === 0) return null;

              return (
                <div key={category} className="mb-2">
                  <span className="font-bold capitalize">{category === 'other' ? 'Additional' : category} Skills: </span>
                  {categorySkills.map((skill, idx) => (
                    <span key={skill.id}>
                      <span className="font-semibold">{skill.name}</span>
                      {' (' + getSkillLevel(skill.level) + ')'}
                      {idx < categorySkills.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PROFESSIONAL EXPERIENCE */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-base font-bold uppercase mb-2 pb-1"
            style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              borderBottom: '1px solid #000000'
            }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="text-sm" style={{ fontSize: '11pt' }}>
                {/* Position and Company */}
                <div className="font-bold uppercase mb-1">
                  {exp.position} | {exp.company}
                </div>

                {/* Location and Dates */}
                <div className="mb-2">
                  {exp.location && <span>{exp.location} | </span>}
                  <span>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>

                {/* Description */}
                {exp.description && (
                  <p className="mb-2">{exp.description}</p>
                )}

                {/* Achievements - bullet points */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-none pl-0 space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="pl-4" style={{ textIndent: '-1em', marginLeft: '1em' }}>
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-base font-bold uppercase mb-2 pb-1"
            style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              borderBottom: '1px solid #000000'
            }}
          >
            EDUCATION
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="text-sm" style={{ fontSize: '11pt' }}>
                {/* Degree - Full words, NO abbreviations */}
                <div className="font-bold">
                  {edu.degree} in {edu.fieldOfStudy}
                </div>

                {/* School */}
                <div>
                  {edu.school}
                  {edu.location && `, ${edu.location}`}
                </div>

                {/* Dates */}
                <div>
                  {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                </div>

                {/* GPA if available */}
                {edu.gpa && (
                  <div>GPA: {edu.gpa}</div>
                )}

                {/* Achievements */}
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="list-none pl-0 mt-1 space-y-1">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="pl-4" style={{ textIndent: '-1em', marginLeft: '1em' }}>
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LANGUAGES */}
      {languages.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-base font-bold uppercase mb-2 pb-1"
            style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              borderBottom: '1px solid #000000'
            }}
          >
            LANGUAGES
          </h2>
          <div className="text-sm" style={{ fontSize: '11pt' }}>
            {languages.map((lang, idx) => (
              <div key={lang.id}>
                <span className="font-semibold">{lang.name}</span>
                {': ' + getLanguageLevel(lang.level)}
                {lang.certification && ` (${lang.certification})`}
                {idx < languages.length - 1 ? ', ' : ''}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer note - ATS optimization info (remove before sending) */}
      <div
        className="mt-8 pt-4 text-xs text-gray-400"
        style={{
          fontSize: '8pt',
          borderTop: '1px solid #e5e5e5',
          color: '#999999'
        }}
      >
        ATS-Optimized Resume | Machine-Readable Format
      </div>
    </div>
  );
};

export default ATSTemplate;
