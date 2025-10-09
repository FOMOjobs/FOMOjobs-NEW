import React from 'react';
import { CVData } from '@/types/cv';

interface ExecutiveTemplateProps {
  data: CVData;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Executive Template
 *
 * Professional, elegant design for senior-level professionals
 * Inspired by Financial Times executive profiles
 *
 * KEY FEATURES:
 * - Clean single column layout with generous whitespace
 * - Navy blue accents for trust and professionalism
 * - Serif font for name (Georgia/Merriweather)
 * - Sans-serif for body (Inter/Lato)
 * - Elegant thin lines as separators
 * - Optional small professional photo
 * - Focus on impact and metrics
 * - Comfortable spacing - not cramped
 */

const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({
  data,
  primaryColor = '#1e3a8a', // Navy blue
  secondaryColor = '#475569'  // Gray
}) => {
  const { personal, experience, education, skills, languages } = data;

  // Format date to Month Year
  const formatDate = (dateStr: string): string => {
    if (dateStr === 'current' || dateStr === 'Present') return 'Present';
    if (!dateStr) return '';

    const [year, month] = dateStr.split('-');
    if (month && year) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = months[parseInt(month) - 1] || month;
      return `${monthName} ${year}`;
    }
    return dateStr;
  };

  // Get language level in elegant format
  const getLanguageLevel = (level: string): string => {
    const levels: Record<string, string> = {
      'A1': 'Elementary',
      'A2': 'Pre-Intermediate',
      'B1': 'Intermediate',
      'B2': 'Upper-Intermediate',
      'C1': 'Advanced',
      'C2': 'Proficient',
      'native': 'Native'
    };
    return levels[level] || level;
  };

  return (
    <div
      className="bg-white p-12 max-w-[21cm] mx-auto"
      style={{
        fontFamily: "'Inter', 'Lato', sans-serif",
        fontSize: '10pt',
        lineHeight: '1.6',
        color: '#1a1a1a'
      }}
    >
      {/* HEADER */}
      <div className="mb-8 pb-6" style={{ borderBottom: `2px solid ${primaryColor}` }}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* Name - Serif font for elegance */}
            <h1
              className="mb-2"
              style={{
                fontFamily: "'Georgia', 'Merriweather', serif",
                fontSize: '28pt',
                fontWeight: '600',
                color: primaryColor,
                letterSpacing: '-0.5px'
              }}
            >
              {personal.fullName || 'Your Name'}
            </h1>

            {/* Title/Summary first line */}
            {personal.summary && (
              <p
                className="mb-3"
                style={{
                  fontSize: '12pt',
                  color: secondaryColor,
                  fontWeight: '500'
                }}
              >
                {personal.summary.split('.')[0]}
              </p>
            )}
          </div>

          {/* Optional photo placeholder */}
          {personal.photo && (
            <div
              className="ml-6 w-24 h-32 bg-gray-100 rounded"
              style={{
                border: `2px solid ${primaryColor}`,
                overflow: 'hidden'
              }}
            >
              <img
                src={personal.photo}
                alt={personal.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Contact Information - Subtle, small */}
        <div
          className="mt-4 flex flex-wrap gap-x-6 gap-y-1"
          style={{
            fontSize: '9pt',
            color: secondaryColor
          }}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
          {personal.linkedIn && <span>LinkedIn: {personal.linkedIn}</span>}
          {personal.portfolio && <span>Portfolio: {personal.portfolio}</span>}
        </div>
      </div>

      {/* PROFESSIONAL SUMMARY */}
      {personal.summary && (
        <div className="mb-8">
          <h2
            className="uppercase mb-3 pb-2"
            style={{
              fontSize: '11pt',
              fontWeight: '700',
              color: primaryColor,
              borderBottom: `1px solid ${primaryColor}`,
              letterSpacing: '1px'
            }}
          >
            Professional Summary
          </h2>
          <p
            style={{
              fontSize: '10pt',
              lineHeight: '1.7',
              color: '#2a2a2a'
            }}
          >
            {personal.summary}
          </p>
        </div>
      )}

      {/* CORE COMPETENCIES - Two column grid */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2
            className="uppercase mb-3 pb-2"
            style={{
              fontSize: '11pt',
              fontWeight: '700',
              color: primaryColor,
              borderBottom: `1px solid ${primaryColor}`,
              letterSpacing: '1px'
            }}
          >
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center"
                style={{ fontSize: '9.5pt' }}
              >
                <span
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: primaryColor }}
                />
                <span className="font-medium">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROFESSIONAL EXPERIENCE */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2
            className="uppercase mb-4 pb-2"
            style={{
              fontSize: '11pt',
              fontWeight: '700',
              color: primaryColor,
              borderBottom: `1px solid ${primaryColor}`,
              letterSpacing: '1px'
            }}
          >
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                {/* Position and Company */}
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3
                      className="font-semibold"
                      style={{
                        fontSize: '11pt',
                        color: '#1a1a1a',
                        fontWeight: '600'
                      }}
                    >
                      {exp.position}
                    </h3>
                    <p
                      style={{
                        fontSize: '10pt',
                        color: secondaryColor,
                        fontWeight: '500'
                      }}
                    >
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>

                  {/* Dates - Right aligned */}
                  <div
                    className="text-right"
                    style={{
                      fontSize: '9pt',
                      color: secondaryColor,
                      fontStyle: 'italic',
                      minWidth: '140px'
                    }}
                  >
                    {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>

                {/* Description */}
                {exp.description && (
                  <p
                    className="mb-2"
                    style={{
                      fontSize: '9.5pt',
                      color: '#2a2a2a',
                      lineHeight: '1.6'
                    }}
                  >
                    {exp.description}
                  </p>
                )}

                {/* Achievements - Focus on metrics and impact */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-1.5 ml-0 list-none">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start"
                        style={{
                          fontSize: '9.5pt',
                          color: '#2a2a2a',
                          lineHeight: '1.6'
                        }}
                      >
                        <span
                          className="mr-2 mt-1.5"
                          style={{
                            color: primaryColor,
                            fontWeight: 'bold'
                          }}
                        >
                          ▸
                        </span>
                        <span>{achievement}</span>
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
        <div className="mb-8">
          <h2
            className="uppercase mb-4 pb-2"
            style={{
              fontSize: '11pt',
              fontWeight: '700',
              color: primaryColor,
              borderBottom: `1px solid ${primaryColor}`,
              letterSpacing: '1px'
            }}
          >
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3
                      className="font-semibold"
                      style={{
                        fontSize: '10.5pt',
                        color: '#1a1a1a'
                      }}
                    >
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <p
                      style={{
                        fontSize: '9.5pt',
                        color: secondaryColor
                      }}
                    >
                      {edu.school}
                      {edu.location && ` • ${edu.location}`}
                    </p>
                  </div>

                  <div
                    className="text-right"
                    style={{
                      fontSize: '9pt',
                      color: secondaryColor,
                      fontStyle: 'italic'
                    }}
                  >
                    {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </div>
                </div>

                {edu.gpa && (
                  <p
                    className="mt-1"
                    style={{
                      fontSize: '9pt',
                      color: secondaryColor
                    }}
                  >
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LANGUAGES */}
      {languages.length > 0 && (
        <div className="mb-8">
          <h2
            className="uppercase mb-3 pb-2"
            style={{
              fontSize: '11pt',
              fontWeight: '700',
              color: primaryColor,
              borderBottom: `1px solid ${primaryColor}`,
              letterSpacing: '1px'
            }}
          >
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {languages.map((lang) => (
              <div
                key={lang.id}
                style={{ fontSize: '9.5pt' }}
              >
                <span className="font-medium">{lang.name}</span>
                {' • '}
                <span style={{ color: secondaryColor }}>
                  {getLanguageLevel(lang.level)}
                </span>
                {lang.certification && (
                  <span
                    className="block text-xs"
                    style={{
                      fontSize: '8.5pt',
                      color: secondaryColor,
                      marginTop: '2px'
                    }}
                  >
                    {lang.certification}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer - Elegant minimal line */}
      <div
        className="mt-12 pt-4"
        style={{
          borderTop: `1px solid #e5e5e5`
        }}
      />
    </div>
  );
};

export default ExecutiveTemplate;
