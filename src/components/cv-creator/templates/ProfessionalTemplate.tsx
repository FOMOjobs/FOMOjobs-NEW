import React, { memo } from 'react';
import { CVData } from '@/types/cv';

interface ProfessionalTemplateProps {
  data: CVData;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Professional Template
 *
 * Classic corporate design for traditional industries
 * Perfect for finance, consulting, legal, and corporate roles
 *
 * KEY FEATURES:
 * - Two-column layout with sidebar
 * - Navy blue and gray color scheme
 * - Serif font for headings (Georgia/Times)
 * - Circular photo in top-right corner
 * - Clean, conservative design
 * - Professional whitespace management
 * - Traditional section hierarchy
 */

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = memo(({
  data,
  primaryColor = '#1e3a8a', // Navy blue
  secondaryColor = '#64748b'  // Slate gray
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

  // Get skill level display
  const getSkillLevel = (level: string): string => {
    const levels: Record<string, string> = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced',
      'expert': 'Expert'
    };
    return levels[level] || level;
  };

  // Get language level display
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
      className="bg-white p-10 max-w-[21cm] mx-auto"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: '10pt',
        lineHeight: '1.5',
        color: '#1a1a1a'
      }}
    >
      {/* HEADER with Photo */}
      <div className="relative mb-6 pb-4" style={{ borderBottom: `3px solid ${primaryColor}` }}>
        {/* Photo - Top Right Corner */}
        {personal.photo && (
          <div
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '2px solid #6b7280',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
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
        )}

        {/* Name and Title */}
        <div style={{ paddingRight: personal.photo ? '120px' : '0' }}>
          <h1
            className="mb-2"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: '26pt',
              fontWeight: '700',
              color: primaryColor,
              letterSpacing: '0.5px'
            }}
          >
            {personal.fullName || 'Your Name'}
          </h1>

          {/* Professional Summary First Line */}
          {personal.summary && (
            <p
              className="mb-3"
              style={{
                fontSize: '11pt',
                color: secondaryColor,
                fontWeight: '500',
                fontFamily: "'Arial', sans-serif"
              }}
            >
              {personal.summary.split('.')[0]}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div
          className="flex flex-wrap gap-x-4 gap-y-1 mt-3"
          style={{
            fontSize: '9pt',
            color: secondaryColor,
            fontFamily: "'Arial', sans-serif"
          }}
        >
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>☎ {personal.phone}</span>}
          {personal.address && <span>⌂ {personal.address}</span>}
          {personal.linkedIn && <span>in/ {personal.linkedIn.replace('https://linkedin.com/in/', '')}</span>}
          {personal.portfolio && <span>🌐 {personal.portfolio}</span>}
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div className="flex gap-6">
        {/* MAIN COLUMN (70%) */}
        <div style={{ width: '70%' }}>
          {/* PROFESSIONAL SUMMARY */}
          {personal.summary && (
            <div className="mb-5">
              <h2
                className="mb-2"
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: '13pt',
                  fontWeight: '700',
                  color: primaryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: '4px'
                }}
              >
                Professional Summary
              </h2>
              <p
                style={{
                  fontSize: '9.5pt',
                  lineHeight: '1.6',
                  fontFamily: "'Arial', sans-serif",
                  textAlign: 'justify'
                }}
              >
                {personal.summary}
              </p>
            </div>
          )}

          {/* PROFESSIONAL EXPERIENCE */}
          {experience.length > 0 && (
            <div className="mb-5">
              <h2
                className="mb-3"
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: '13pt',
                  fontWeight: '700',
                  color: primaryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: '4px'
                }}
              >
                Professional Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3
                      style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        fontSize: '11pt',
                        fontWeight: '700',
                        color: primaryColor
                      }}
                    >
                      {exp.position}
                    </h3>
                    <span
                      style={{
                        fontSize: '9pt',
                        color: secondaryColor,
                        whiteSpace: 'nowrap',
                        fontFamily: "'Arial', sans-serif"
                      }}
                    >
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div
                    className="mb-1"
                    style={{
                      fontSize: '10pt',
                      fontWeight: '600',
                      fontFamily: "'Arial', sans-serif"
                    }}
                  >
                    {exp.company}
                    {exp.location && (
                      <span style={{ color: secondaryColor, fontWeight: '400' }}>
                        {' • '}{exp.location}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <p
                      style={{
                        fontSize: '9pt',
                        marginBottom: '0.5em',
                        fontFamily: "'Arial', sans-serif",
                        textAlign: 'justify'
                      }}
                    >
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul
                      style={{
                        fontSize: '9pt',
                        paddingLeft: '1.5em',
                        margin: 0,
                        fontFamily: "'Arial', sans-serif"
                      }}
                    >
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} style={{ marginBottom: '0.3em' }}>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <div className="mb-5">
              <h2
                className="mb-3"
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: '13pt',
                  fontWeight: '700',
                  color: primaryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: '4px'
                }}
              >
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3
                      style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        fontSize: '11pt',
                        fontWeight: '700',
                        color: primaryColor
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <span
                      style={{
                        fontSize: '9pt',
                        color: secondaryColor,
                        whiteSpace: 'nowrap',
                        fontFamily: "'Arial', sans-serif"
                      }}
                    >
                      {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '10pt',
                      fontWeight: '600',
                      fontFamily: "'Arial', sans-serif"
                    }}
                  >
                    {edu.school}
                    {edu.location && (
                      <span style={{ color: secondaryColor, fontWeight: '400' }}>
                        {' • '}{edu.location}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '9pt', color: secondaryColor, fontFamily: "'Arial', sans-serif" }}>
                    {edu.fieldOfStudy}
                    {edu.gpa && <span> • GPA: {edu.gpa}</span>}
                  </div>
                  {edu.description && (
                    <p
                      style={{
                        fontSize: '9pt',
                        marginTop: '0.3em',
                        fontFamily: "'Arial', sans-serif"
                      }}
                    >
                      {edu.description}
                    </p>
                  )}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul
                      style={{
                        fontSize: '9pt',
                        paddingLeft: '1.5em',
                        marginTop: '0.3em',
                        fontFamily: "'Arial', sans-serif"
                      }}
                    >
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} style={{ marginBottom: '0.2em' }}>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SIDEBAR (30%) */}
        <div
          style={{
            width: '30%',
            backgroundColor: '#f8fafc',
            padding: '16px',
            borderRadius: '4px'
          }}
        >
          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="mb-5">
              <h2
                className="mb-3"
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: '11pt',
                  fontWeight: '700',
                  color: primaryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: '4px'
                }}
              >
                Skills
              </h2>
              <div style={{ fontSize: '9pt', fontFamily: "'Arial', sans-serif" }}>
                {skills.map((skill) => (
                  <div key={skill.id} className="mb-2">
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                      {skill.name}
                    </div>
                    <div style={{ color: secondaryColor, fontSize: '8.5pt' }}>
                      {getSkillLevel(skill.level)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LANGUAGES */}
          {languages.length > 0 && (
            <div className="mb-5">
              <h2
                className="mb-3"
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: '11pt',
                  fontWeight: '700',
                  color: primaryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderBottom: `2px solid ${primaryColor}`,
                  paddingBottom: '4px'
                }}
              >
                Languages
              </h2>
              <div style={{ fontSize: '9pt', fontFamily: "'Arial', sans-serif" }}>
                {languages.map((lang) => (
                  <div key={lang.id} className="mb-2">
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                      {lang.name}
                    </div>
                    <div style={{ color: secondaryColor, fontSize: '8.5pt' }}>
                      {getLanguageLevel(lang.level)}
                      {lang.certification && ` • ${lang.certification}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProfessionalTemplate;
