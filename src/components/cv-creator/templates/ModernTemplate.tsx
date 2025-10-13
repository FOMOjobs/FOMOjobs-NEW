import React from 'react';
import { CVData } from '@/types/cv';
import { getCVTranslations, formatCVDate, getCVSkillLevel, getCVLanguageLevel } from '@/lib/cvTranslations';

interface ModernTemplateProps {
  data: CVData;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Modern Template
 *
 * Fresh, dynamic design with gradient accents
 * Perfect for creative professionals and tech industry
 *
 * KEY FEATURES:
 * - Gradient header with purple/yellow theme
 * - Circular profile photo with gradient border
 * - Two-column layout
 * - Modern sans-serif fonts
 * - Icon-friendly design
 * - Clean section separators
 */

const ModernTemplate: React.FC<ModernTemplateProps> = ({
  data,
  primaryColor = '#8B5CF6', // Purple
  secondaryColor = '#F4D03F'  // Yellow
}) => {
  const { personal, experience, education, skills, languages, customization } = data;
  const lang = customization.language;
  const t = getCVTranslations(lang);

  return (
    <div
      className="bg-white max-w-[21cm] mx-auto"
      style={{
        fontFamily: "'Inter', 'Poppins', sans-serif",
        fontSize: '10pt',
        lineHeight: '1.5',
        color: '#1a1a1a'
      }}
    >
      {/* HEADER with gradient */}
      <div
        className="p-8 pb-6"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          color: 'white'
        }}
      >
        <div className="flex items-start gap-6">
          {/* Profile Photo */}
          {personal.photo && (
            <div
              className="flex-shrink-0"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: `3px solid white`,
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                padding: '3px',
                overflow: 'hidden'
              }}
            >
              <img
                src={personal.photo}
                alt={personal.fullName}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          )}

          {/* Name and Contact */}
          <div className="flex-1">
            <h1
              className="mb-2"
              style={{
                fontSize: '32pt',
                fontWeight: '700',
                letterSpacing: '-0.5px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {personal.fullName || 'Your Name'}
            </h1>

            {/* Contact Information */}
            <div
              className="flex flex-wrap gap-x-4 gap-y-1 mb-3"
              style={{
                fontSize: '9pt',
                opacity: 0.95
              }}
            >
              {personal.email && <span>✉ {personal.email}</span>}
              {personal.phone && <span>📞 {personal.phone}</span>}
              {personal.address && <span>📍 {personal.address}</span>}
            </div>

            {personal.linkedIn && (
              <div style={{ fontSize: '9pt', opacity: 0.95 }}>
                🔗 {personal.linkedIn}
              </div>
            )}
            {personal.portfolio && (
              <div style={{ fontSize: '9pt', opacity: 0.95 }}>
                🌐 {personal.portfolio}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT - Two Column Layout */}
      <div className="flex gap-6 p-8">
        {/* LEFT COLUMN */}
        <div className="flex-1">
          {/* PROFESSIONAL SUMMARY */}
          {personal.summary && (
            <div className="mb-6">
              <h2
                className="uppercase mb-2 pb-1"
                style={{
                  fontSize: '12pt',
                  fontWeight: '700',
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`
                }}
              >
                {t.about}
              </h2>
              <p style={{ fontSize: '9.5pt', lineHeight: '1.6' }}>
                {personal.summary}
              </p>
            </div>
          )}

          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2
                className="uppercase mb-3 pb-1"
                style={{
                  fontSize: '12pt',
                  fontWeight: '700',
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`
                }}
              >
                {t.experience}
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 style={{ fontSize: '11pt', fontWeight: '600' }}>
                      {exp.position}
                    </h3>
                    <span
                      style={{
                        fontSize: '9pt',
                        color: '#666',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {formatCVDate(exp.startDate, lang)} - {exp.current ? t.present : formatCVDate(exp.endDate, lang)}
                    </span>
                  </div>
                  <div
                    className="mb-1"
                    style={{
                      fontSize: '10pt',
                      color: primaryColor,
                      fontWeight: '500'
                    }}
                  >
                    {exp.company}
                    {exp.location && ` • ${exp.location}`}
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: '9pt', marginBottom: '0.5em', color: '#444' }}>
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul
                      style={{
                        fontSize: '9pt',
                        paddingLeft: '1.2em',
                        margin: 0,
                        color: '#444'
                      }}
                    >
                      {exp.achievements.map((achievement, idx) => (
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

          {/* EDUCATION */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2
                className="uppercase mb-3 pb-1"
                style={{
                  fontSize: '12pt',
                  fontWeight: '700',
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`
                }}
              >
                {t.education}
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 style={{ fontSize: '11pt', fontWeight: '600' }}>
                      {edu.degree}
                    </h3>
                    <span
                      style={{
                        fontSize: '9pt',
                        color: '#666',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {formatCVDate(edu.startDate, lang)} - {edu.current ? t.present : formatCVDate(edu.endDate, lang)}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '10pt',
                      color: primaryColor,
                      fontWeight: '500'
                    }}
                  >
                    {edu.school}
                    {edu.location && ` • ${edu.location}`}
                  </div>
                  <div style={{ fontSize: '9pt', color: '#666' }}>
                    {edu.fieldOfStudy}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </div>
                  {edu.description && (
                    <p style={{ fontSize: '9pt', marginTop: '0.3em', color: '#444' }}>
                      {edu.description}
                    </p>
                  )}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul
                      style={{
                        fontSize: '9pt',
                        paddingLeft: '1.2em',
                        marginTop: '0.3em',
                        color: '#444'
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

        {/* RIGHT COLUMN */}
        <div style={{ width: '35%' }}>
          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2
                className="uppercase mb-3 pb-1"
                style={{
                  fontSize: '11pt',
                  fontWeight: '700',
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`
                }}
              >
                {t.skills}
              </h2>
              <div style={{ fontSize: '9pt' }}>
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span style={{ fontWeight: '500' }}>{skill.name}</span>
                    <span
                      style={{
                        color: primaryColor,
                        fontSize: '8pt',
                        letterSpacing: '1px'
                      }}
                    >
                      {getCVSkillLevel(skill.level, lang, 'dots')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LANGUAGES */}
          {languages.length > 0 && (
            <div className="mb-6">
              <h2
                className="uppercase mb-3 pb-1"
                style={{
                  fontSize: '11pt',
                  fontWeight: '700',
                  color: primaryColor,
                  borderBottom: `2px solid ${primaryColor}`
                }}
              >
                {t.languages}
              </h2>
              <div style={{ fontSize: '9pt' }}>
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span style={{ fontWeight: '500' }}>{lang.name}</span>
                    <span style={{ color: '#666', fontSize: '9pt' }}>
                      {getCVLanguageLevel(lang.level, customization.language)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
