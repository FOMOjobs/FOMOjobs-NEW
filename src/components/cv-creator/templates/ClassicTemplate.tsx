import React from 'react';
import { CVData } from '@/types/cv';
import { getCVTranslations, formatCVDate, getCVSkillLevel, getCVLanguageLevel } from '@/lib/cvTranslations';

interface ClassicTemplateProps {
  data: CVData;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Classic Template
 *
 * Traditional, conservative CV design for formal industries
 * Perfect for law, finance, government, and corporate environments
 *
 * KEY FEATURES:
 * - Single column layout (traditional format)
 * - Serif font (Georgia, Times New Roman) for professionalism
 * - Navy blue accent color (conservative, trustworthy)
 * - NO gradients or modern effects
 * - Formal section headers with simple underlines
 * - Dense information layout (maximize content)
 * - Photo positioned top-left (optional, professional square frame)
 * - Contact information in header
 * - Clear visual hierarchy
 *
 * DESIGN PHILOSOPHY:
 * - Timeless and universally acceptable
 * - Emphasizes experience and credentials over aesthetics
 * - Suitable for conservative industries (banking, legal, government)
 * - Clean, readable, and printable
 */

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({
  data,
  primaryColor = '#1e3a8a', // Navy Blue
  secondaryColor = '#334155'  // Slate Gray
}) => {
  const { personal, experience, education, skills, languages, customization } = data;
  const lang = customization.language;
  const t = getCVTranslations(lang);

  return (
    <div
      className="bg-white max-w-[21cm] mx-auto"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: '10.5pt',
        lineHeight: '1.4',
        color: '#1a1a1a',
        padding: '2cm 2.5cm'
      }}
    >
      {/* HEADER - Name and Contact */}
      <div className="mb-6" style={{ borderBottom: `3px solid ${primaryColor}`, paddingBottom: '1em' }}>
        <div className="flex items-start gap-4">
          {/* Profile Photo - Professional Square */}
          {personal.photo && (
            <div
              className="flex-shrink-0"
              style={{
                width: '100px',
                height: '130px',
                border: `2px solid ${primaryColor}`,
                overflow: 'hidden',
                marginRight: '1em'
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

          {/* Name and Contact Info */}
          <div className="flex-1">
            <h1
              className="mb-1"
              style={{
                fontSize: '22pt',
                fontWeight: '700',
                color: primaryColor,
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
            >
              {personal.fullName || 'Your Name'}
            </h1>

            {/* Contact Information - Compact */}
            <div
              style={{
                fontSize: '9.5pt',
                color: secondaryColor,
                lineHeight: '1.6'
              }}
            >
              {personal.address && <div>{personal.address}</div>}
              <div className="flex flex-wrap gap-x-3">
                {personal.phone && <span>{personal.phone}</span>}
                {personal.email && <span>{personal.email}</span>}
              </div>
              {personal.linkedIn && (
                <div style={{ fontSize: '9pt' }}>{personal.linkedIn}</div>
              )}
              {personal.portfolio && (
                <div style={{ fontSize: '9pt' }}>{personal.portfolio}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PROFESSIONAL SUMMARY */}
      {personal.summary && (
        <div className="mb-5">
          <h2
            className="uppercase mb-2"
            style={{
              fontSize: '13pt',
              fontWeight: '700',
              color: primaryColor,
              borderBottom: `2px solid ${primaryColor}`,
              paddingBottom: '0.3em',
              letterSpacing: '1px'
            }}
          >
            {t.professionalSummary}
          </h2>
          <p style={{ fontSize: '10pt', lineHeight: '1.5', textAlign: 'justify' }}>
            {personal.summary}
          </p>
        </div>
      )}

      {/* PROFESSIONAL EXPERIENCE */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2
            className="uppercase mb-3"
            style={{
              fontSize: '13pt',
              fontWeight: '700',
              color: primaryColor,
              borderBottom: `2px solid ${primaryColor}`,
              paddingBottom: '0.3em',
              letterSpacing: '1px'
            }}
          >
            {t.professionalExperience}
          </h2>
          {experience.map((exp, index) => (
            <div key={exp.id} className="mb-4" style={{ pageBreakInside: 'avoid' }}>
              {/* Position and Company */}
              <div className="flex justify-between items-baseline mb-1">
                <div>
                  <h3 style={{ fontSize: '11.5pt', fontWeight: '700', marginBottom: '0.2em' }}>
                    {exp.position}
                  </h3>
                  <div
                    style={{
                      fontSize: '10.5pt',
                      fontStyle: 'italic',
                      color: secondaryColor
                    }}
                  >
                    {exp.company}
                    {exp.location && ` – ${exp.location}`}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '9.5pt',
                    color: '#555',
                    whiteSpace: 'nowrap',
                    marginLeft: '1em',
                    textAlign: 'right'
                  }}
                >
                  {formatCVDate(exp.startDate, lang)} – {exp.current ? t.present : formatCVDate(exp.endDate, lang)}
                </div>
              </div>

              {/* Description */}
              {exp.description && (
                <p style={{ fontSize: '10pt', marginBottom: '0.5em', lineHeight: '1.4' }}>
                  {exp.description}
                </p>
              )}

              {/* Achievements */}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul
                  style={{
                    fontSize: '10pt',
                    paddingLeft: '1.5em',
                    margin: '0.3em 0 0 0',
                    lineHeight: '1.4'
                  }}
                >
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25em' }}>
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
            className="uppercase mb-3"
            style={{
              fontSize: '13pt',
              fontWeight: '700',
              color: primaryColor,
              borderBottom: `2px solid ${primaryColor}`,
              paddingBottom: '0.3em',
              letterSpacing: '1px'
            }}
          >
            {t.education}
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3" style={{ pageBreakInside: 'avoid' }}>
              {/* Degree and Dates */}
              <div className="flex justify-between items-baseline mb-1">
                <div>
                  <h3 style={{ fontSize: '11.5pt', fontWeight: '700', marginBottom: '0.2em' }}>
                    {edu.degree}
                    {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                  </h3>
                  <div
                    style={{
                      fontSize: '10.5pt',
                      fontStyle: 'italic',
                      color: secondaryColor
                    }}
                  >
                    {edu.school}
                    {edu.location && ` – ${edu.location}`}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '9.5pt',
                    color: '#555',
                    whiteSpace: 'nowrap',
                    marginLeft: '1em',
                    textAlign: 'right'
                  }}
                >
                  {formatCVDate(edu.startDate, lang)} – {edu.current ? t.present : formatCVDate(edu.endDate, lang)}
                </div>
              </div>

              {/* GPA and Description */}
              {edu.gpa && (
                <div style={{ fontSize: '10pt', color: '#555', marginBottom: '0.3em' }}>
                  GPA: {edu.gpa}
                </div>
              )}
              {edu.description && (
                <p style={{ fontSize: '10pt', marginBottom: '0.3em', lineHeight: '1.4' }}>
                  {edu.description}
                </p>
              )}

              {/* Achievements */}
              {edu.achievements && edu.achievements.length > 0 && (
                <ul
                  style={{
                    fontSize: '10pt',
                    paddingLeft: '1.5em',
                    margin: '0.3em 0 0 0',
                    lineHeight: '1.4'
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

      {/* SKILLS & LANGUAGES - Side by Side */}
      <div className="flex gap-8">
        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="flex-1 mb-4">
            <h2
              className="uppercase mb-3"
              style={{
                fontSize: '13pt',
                fontWeight: '700',
                color: primaryColor,
                borderBottom: `2px solid ${primaryColor}`,
                paddingBottom: '0.3em',
                letterSpacing: '1px'
              }}
            >
              {t.skills}
            </h2>
            <div style={{ fontSize: '10pt', lineHeight: '1.6' }}>
              {/* Group by category */}
              {['technical', 'soft', 'other'].map(category => {
                const categorySkills = skills.filter(s => s.category === category);
                if (categorySkills.length === 0) return null;

                return (
                  <div key={category} className="mb-2">
                    <span style={{ fontWeight: '700', textTransform: 'capitalize' }}>
                      {category === 'other' ? 'Additional' : category}:
                    </span>{' '}
                    {categorySkills.map((skill, idx) => (
                      <span key={skill.id}>
                        {skill.name}
                        {idx < categorySkills.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LANGUAGES */}
        {languages.length > 0 && (
          <div style={{ width: '35%', minWidth: '200px' }} className="mb-4">
            <h2
              className="uppercase mb-3"
              style={{
                fontSize: '13pt',
                fontWeight: '700',
                color: primaryColor,
                borderBottom: `2px solid ${primaryColor}`,
                paddingBottom: '0.3em',
                letterSpacing: '1px'
              }}
            >
              {t.languages}
            </h2>
            <div style={{ fontSize: '10pt', lineHeight: '1.6' }}>
              {languages.map((language) => (
                <div key={language.id} className="mb-1">
                  <span style={{ fontWeight: '600' }}>{language.name}:</span>{' '}
                  <span style={{ color: secondaryColor }}>
                    {getCVLanguageLevel(language.level, lang)}
                  </span>
                  {language.certification && (
                    <span style={{ fontSize: '9pt', color: '#666', display: 'block', marginLeft: '0.5em' }}>
                      {language.certification}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;
