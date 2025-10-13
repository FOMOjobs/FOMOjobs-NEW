import React, { memo } from 'react';
import { CVData } from '@/types/cv';

interface MinimalistTemplateProps {
  data: CVData;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Minimalist Template
 *
 * Clean Scandinavian design with maximum whitespace
 * Perfect for designers, architects, and creative professionals
 * who want understated elegance
 *
 * KEY FEATURES:
 * - Centered single-column layout
 * - Small centered circular photo at top
 * - Generous whitespace (breathing room)
 * - Minimal colors: black and gray only
 * - Simple sans-serif font (Inter/Helvetica)
 * - Subtle section dividers
 * - Focus on content, not decoration
 */

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = memo(({
  data,
  primaryColor = '#000000', // Black
  secondaryColor = '#6b7280'  // Gray
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

  // Get skill level display (minimalist style)
  const getSkillLevel = (level: string): string => {
    const levels: Record<string, string> = {
      'beginner': '·',
      'intermediate': '··',
      'advanced': '···',
      'expert': '····'
    };
    return levels[level] || level;
  };

  // Get language level display
  const getLanguageLevel = (level: string): string => {
    const levels: Record<string, string> = {
      'A1': 'Basic',
      'A2': 'Elementary',
      'B1': 'Intermediate',
      'B2': 'Upper-Int.',
      'C1': 'Advanced',
      'C2': 'Proficient',
      'native': 'Native'
    };
    return levels[level] || level;
  };

  return (
    <div
      className="bg-white p-16 max-w-[21cm] mx-auto"
      style={{
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        fontSize: '10pt',
        lineHeight: '1.7',
        color: '#1a1a1a'
      }}
    >
      {/* CENTERED HEADER */}
      <div className="text-center mb-12">
        {/* Small Centered Photo */}
        {personal.photo && (
          <div className="mb-6 flex justify-center">
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid #e5e7eb'
              }}
            >
              <img
                src={personal.photo}
                alt={personal.fullName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        )}

        {/* Name - Large and centered */}
        <h1
          className="mb-3"
          style={{
            fontSize: '28pt',
            fontWeight: '300',
            letterSpacing: '2px',
            color: primaryColor
          }}
        >
          {personal.fullName || 'Your Name'}
        </h1>

        {/* Contact Information - Minimal, centered */}
        <div
          className="flex flex-wrap justify-center gap-x-6 gap-y-1 mb-6"
          style={{
            fontSize: '9pt',
            color: secondaryColor,
            letterSpacing: '0.5px'
          }}
        >
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
        </div>

        {personal.linkedIn && (
          <div style={{ fontSize: '9pt', color: secondaryColor, marginBottom: '4px' }}>
            {personal.linkedIn}
          </div>
        )}
        {personal.portfolio && (
          <div style={{ fontSize: '9pt', color: secondaryColor }}>
            {personal.portfolio}
          </div>
        )}
      </div>

      {/* SINGLE COLUMN CONTENT */}
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* PROFESSIONAL SUMMARY */}
        {personal.summary && (
          <div className="mb-10">
            <h2
              className="mb-4 text-center"
              style={{
                fontSize: '10pt',
                fontWeight: '400',
                color: secondaryColor,
                textTransform: 'uppercase',
                letterSpacing: '3px'
              }}
            >
              About
            </h2>
            <p
              style={{
                fontSize: '10pt',
                lineHeight: '1.8',
                textAlign: 'center',
                color: '#374151'
              }}
            >
              {personal.summary}
            </p>
          </div>
        )}

        {/* Subtle divider */}
        <div
          style={{
            height: '1px',
            background: '#e5e7eb',
            margin: '48px auto',
            width: '100px'
          }}
        />

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <div className="mb-10">
            <h2
              className="mb-6 text-center"
              style={{
                fontSize: '10pt',
                fontWeight: '400',
                color: secondaryColor,
                textTransform: 'uppercase',
                letterSpacing: '3px'
              }}
            >
              Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={exp.id} className="mb-8">
                <div className="text-center mb-2">
                  <h3
                    style={{
                      fontSize: '12pt',
                      fontWeight: '500',
                      color: primaryColor,
                      marginBottom: '4px'
                    }}
                  >
                    {exp.position}
                  </h3>
                  <div
                    style={{
                      fontSize: '10pt',
                      color: secondaryColor,
                      marginBottom: '4px'
                    }}
                  >
                    {exp.company}
                    {exp.location && ` · ${exp.location}`}
                  </div>
                  <div
                    style={{
                      fontSize: '9pt',
                      color: secondaryColor,
                      fontStyle: 'italic'
                    }}
                  >
                    {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p
                    style={{
                      fontSize: '9.5pt',
                      marginTop: '8px',
                      textAlign: 'center',
                      color: '#374151',
                      lineHeight: '1.7'
                    }}
                  >
                    {exp.description}
                  </p>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul
                    style={{
                      fontSize: '9.5pt',
                      paddingLeft: '0',
                      marginTop: '8px',
                      listStyle: 'none',
                      textAlign: 'center',
                      color: '#374151'
                    }}
                  >
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>
                        · {achievement}
                      </li>
                    ))}
                  </ul>
                )}
                {index < experience.length - 1 && (
                  <div
                    style={{
                      height: '1px',
                      background: '#f3f4f6',
                      margin: '32px auto 0',
                      width: '60px'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Subtle divider */}
        {education.length > 0 && (
          <div
            style={{
              height: '1px',
              background: '#e5e7eb',
              margin: '48px auto',
              width: '100px'
            }}
          />
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <div className="mb-10">
            <h2
              className="mb-6 text-center"
              style={{
                fontSize: '10pt',
                fontWeight: '400',
                color: secondaryColor,
                textTransform: 'uppercase',
                letterSpacing: '3px'
              }}
            >
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={edu.id} className="mb-8">
                <div className="text-center mb-2">
                  <h3
                    style={{
                      fontSize: '12pt',
                      fontWeight: '500',
                      color: primaryColor,
                      marginBottom: '4px'
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <div
                    style={{
                      fontSize: '10pt',
                      color: secondaryColor,
                      marginBottom: '4px'
                    }}
                  >
                    {edu.school}
                    {edu.location && ` · ${edu.location}`}
                  </div>
                  <div
                    style={{
                      fontSize: '9pt',
                      color: secondaryColor
                    }}
                  >
                    {edu.fieldOfStudy}
                  </div>
                  <div
                    style={{
                      fontSize: '9pt',
                      color: secondaryColor,
                      fontStyle: 'italic',
                      marginTop: '4px'
                    }}
                  >
                    {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate)}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </div>
                </div>
                {edu.description && (
                  <p
                    style={{
                      fontSize: '9.5pt',
                      marginTop: '8px',
                      textAlign: 'center',
                      color: '#374151'
                    }}
                  >
                    {edu.description}
                  </p>
                )}
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul
                    style={{
                      fontSize: '9.5pt',
                      paddingLeft: '0',
                      marginTop: '8px',
                      listStyle: 'none',
                      textAlign: 'center',
                      color: '#374151'
                    }}
                  >
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>
                        · {achievement}
                      </li>
                    ))}
                  </ul>
                )}
                {index < education.length - 1 && (
                  <div
                    style={{
                      height: '1px',
                      background: '#f3f4f6',
                      margin: '32px auto 0',
                      width: '60px'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Subtle divider */}
        {(skills.length > 0 || languages.length > 0) && (
          <div
            style={{
              height: '1px',
              background: '#e5e7eb',
              margin: '48px auto',
              width: '100px'
            }}
          />
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="mb-10">
            <h2
              className="mb-6 text-center"
              style={{
                fontSize: '10pt',
                fontWeight: '400',
                color: secondaryColor,
                textTransform: 'uppercase',
                letterSpacing: '3px'
              }}
            >
              Skills
            </h2>
            <div
              className="flex flex-wrap justify-center gap-x-8 gap-y-3"
              style={{ fontSize: '9.5pt' }}
            >
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="text-center"
                  style={{ minWidth: '120px' }}
                >
                  <div style={{ fontWeight: '400', color: primaryColor }}>
                    {skill.name}
                  </div>
                  <div
                    style={{
                      color: secondaryColor,
                      fontSize: '8pt',
                      marginTop: '2px',
                      letterSpacing: '2px'
                    }}
                  >
                    {getSkillLevel(skill.level)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LANGUAGES */}
        {languages.length > 0 && (
          <div className="mb-10">
            <h2
              className="mb-6 text-center"
              style={{
                fontSize: '10pt',
                fontWeight: '400',
                color: secondaryColor,
                textTransform: 'uppercase',
                letterSpacing: '3px'
              }}
            >
              Languages
            </h2>
            <div
              className="flex flex-wrap justify-center gap-x-8 gap-y-3"
              style={{ fontSize: '9.5pt' }}
            >
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  className="text-center"
                  style={{ minWidth: '120px' }}
                >
                  <div style={{ fontWeight: '400', color: primaryColor }}>
                    {lang.name}
                  </div>
                  <div
                    style={{
                      color: secondaryColor,
                      fontSize: '8.5pt',
                      marginTop: '2px'
                    }}
                  >
                    {getLanguageLevel(lang.level)}
                    {lang.certification && (
                      <div style={{ fontSize: '8pt', marginTop: '2px' }}>
                        {lang.certification}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default MinimalistTemplate;
