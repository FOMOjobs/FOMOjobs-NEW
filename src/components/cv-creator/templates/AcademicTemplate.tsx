import React from 'react';
import { CVData, RODO_CLAUSE_PL, RODO_CLAUSE_EN } from '@/types/cv';
import { getCVTranslations, formatCVDate, getCVSkillLevel, getCVLanguageLevel } from '@/lib/cvTranslations';

interface AcademicTemplateProps {
  data: CVData;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Academic Template
 *
 * Research-focused CV design for scholars, professors, and researchers
 * Perfect for academic positions, research roles, and PhD applications
 *
 * KEY FEATURES:
 * - Dense, information-rich layout (maximize content per page)
 * - Single column format (traditional academic standard)
 * - Academic blue color scheme (#1e40af) - trustworthy and intellectual
 * - Serif font (Georgia, Garamond) for academic tradition
 * - Emphasis on education (appears before experience)
 * - Publication-ready formatting
 * - Clear section headers with horizontal rules
 * - Small photo (or no photo) - focus on credentials
 * - Detailed achievement lists
 * - Professional tone throughout
 *
 * DESIGN PHILOSOPHY:
 * - Content over aesthetics
 * - Follows academic CV conventions (education first, detailed lists)
 * - Suitable for university applications
 * - International academic standards
 * - Easy to scan for credentials and qualifications
 * - Print-friendly (high readability)
 */

const AcademicTemplate: React.FC<AcademicTemplateProps> = ({
  data,
  primaryColor = '#1e40af', // Academic Blue
  secondaryColor = '#475569'  // Slate
}) => {
  const { personal, experience, education, skills, languages, customization } = data;
  const lang = customization.language;
  const t = getCVTranslations(lang);

  return (
    <div
      className="bg-white max-w-[21cm] mx-auto"
      style={{
        fontFamily: "'Georgia', 'Garamond', 'Times New Roman', serif",
        fontSize: '10pt',
        lineHeight: '1.45',
        color: '#1a1a1a',
        padding: '2cm 2.5cm'
      }}
    >
      {/* HEADER - Academic Format */}
      <div
        className="mb-5"
        style={{
          textAlign: 'center',
          borderBottom: `2px solid ${primaryColor}`,
          paddingBottom: '1.2em'
        }}
      >
        <h1
          style={{
            fontSize: '20pt',
            fontWeight: '700',
            color: primaryColor,
            marginBottom: '0.5em',
            letterSpacing: '0.5px'
          }}
        >
          {personal.fullName || 'Your Full Name'}
        </h1>

        {/* Contact Information - Centered */}
        <div
          style={{
            fontSize: '9.5pt',
            color: secondaryColor,
            lineHeight: '1.6'
          }}
        >
          <div className="flex justify-center gap-x-4 flex-wrap">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>•</span>}
            {personal.phone && <span>{personal.phone}</span>}
          </div>
          {personal.address && (
            <div style={{ marginTop: '0.3em' }}>{personal.address}</div>
          )}
          {(personal.linkedIn || personal.portfolio) && (
            <div style={{ marginTop: '0.3em', fontSize: '9pt' }}>
              {personal.linkedIn && <span>{personal.linkedIn}</span>}
              {personal.linkedIn && personal.portfolio && <span> • </span>}
              {personal.portfolio && <span>{personal.portfolio}</span>}
            </div>
          )}
        </div>

        {/* Small Professional Photo (optional) */}
        {personal.photo && (
          <div className="flex justify-center mt-4">
            <div
              style={{
                width: '80px',
                height: '100px',
                border: `2px solid ${primaryColor}`,
                overflow: 'hidden'
              }}
            >
              <img
                src={personal.photo}
                alt={personal.fullName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'grayscale(10%)'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* PROFESSIONAL SUMMARY / RESEARCH INTERESTS */}
      {personal.summary && (
        <div className="mb-4">
          <h2
            style={{
              fontSize: '12pt',
              fontWeight: '700',
              color: primaryColor,
              marginBottom: '0.5em',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: `1px solid ${primaryColor}`,
              paddingBottom: '0.3em'
            }}
          >
            {lang === 'en' ? 'Research Interests' : 'Zainteresowania Badawcze'}
          </h2>
          <p
            style={{
              fontSize: '10pt',
              lineHeight: '1.5',
              textAlign: 'justify',
              color: '#2d3436'
            }}
          >
            {personal.summary}
          </p>
        </div>
      )}

      {/* EDUCATION - Appears FIRST in academic CVs */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2
            style={{
              fontSize: '12pt',
              fontWeight: '700',
              color: primaryColor,
              marginBottom: '0.6em',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: `1px solid ${primaryColor}`,
              paddingBottom: '0.3em'
            }}
          >
            {t.education}
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between items-baseline">
                <h3
                  style={{
                    fontSize: '11pt',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '0.2em'
                  }}
                >
                  {edu.degree}
                  {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
                </h3>
                <span
                  style={{
                    fontSize: '9pt',
                    color: secondaryColor,
                    whiteSpace: 'nowrap',
                    marginLeft: '1em'
                  }}
                >
                  {formatCVDate(edu.startDate, lang)} – {edu.current ? t.present : formatCVDate(edu.endDate, lang)}
                </span>
              </div>

              <div
                style={{
                  fontSize: '10pt',
                  fontStyle: 'italic',
                  color: secondaryColor,
                  marginBottom: '0.3em'
                }}
              >
                {edu.school}
                {edu.location && `, ${edu.location}`}
              </div>

              {edu.gpa && (
                <div
                  style={{
                    fontSize: '9.5pt',
                    color: '#555',
                    marginBottom: '0.3em'
                  }}
                >
                  <strong>GPA:</strong> {edu.gpa}
                </div>
              )}

              {edu.description && (
                <p
                  style={{
                    fontSize: '9.5pt',
                    marginBottom: '0.3em',
                    lineHeight: '1.5',
                    textAlign: 'justify'
                  }}
                >
                  {edu.description}
                </p>
              )}

              {edu.achievements && edu.achievements.length > 0 && (
                <ul
                  style={{
                    fontSize: '9.5pt',
                    paddingLeft: '1.5em',
                    margin: '0.3em 0 0 0',
                    lineHeight: '1.4'
                  }}
                >
                  {edu.achievements.map((achievement, idx) => (
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

      {/* PROFESSIONAL EXPERIENCE / RESEARCH EXPERIENCE */}
      {experience.length > 0 && (
        <div className="mb-4">
          <h2
            style={{
              fontSize: '12pt',
              fontWeight: '700',
              color: primaryColor,
              marginBottom: '0.6em',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: `1px solid ${primaryColor}`,
              paddingBottom: '0.3em'
            }}
          >
            {lang === 'en' ? 'Academic & Professional Experience' : 'Doświadczenie Akademickie i Zawodowe'}
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between items-baseline">
                <h3
                  style={{
                    fontSize: '11pt',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '0.2em'
                  }}
                >
                  {exp.position}
                </h3>
                <span
                  style={{
                    fontSize: '9pt',
                    color: secondaryColor,
                    whiteSpace: 'nowrap',
                    marginLeft: '1em'
                  }}
                >
                  {formatCVDate(exp.startDate, lang)} – {exp.current ? t.present : formatCVDate(exp.endDate, lang)}
                </span>
              </div>

              <div
                style={{
                  fontSize: '10pt',
                  fontStyle: 'italic',
                  color: secondaryColor,
                  marginBottom: '0.3em'
                }}
              >
                {exp.company}
                {exp.location && `, ${exp.location}`}
              </div>

              {exp.description && (
                <p
                  style={{
                    fontSize: '9.5pt',
                    marginBottom: '0.3em',
                    lineHeight: '1.5',
                    textAlign: 'justify'
                  }}
                >
                  {exp.description}
                </p>
              )}

              {exp.achievements && exp.achievements.length > 0 && (
                <ul
                  style={{
                    fontSize: '9.5pt',
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

      {/* SKILLS & COMPETENCIES */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2
            style={{
              fontSize: '12pt',
              fontWeight: '700',
              color: primaryColor,
              marginBottom: '0.6em',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: `1px solid ${primaryColor}`,
              paddingBottom: '0.3em'
            }}
          >
            {lang === 'en' ? 'Skills & Competencies' : 'Umiejętności i Kompetencje'}
          </h2>

          <div style={{ fontSize: '9.5pt', lineHeight: '1.6' }}>
            {/* Group by category - Academic style */}
            {['technical', 'soft', 'other'].map(category => {
              const categorySkills = skills.filter(s => s.category === category);
              if (categorySkills.length === 0) return null;

              const categoryLabel =
                category === 'technical'
                  ? lang === 'en' ? 'Technical Skills' : 'Umiejętności Techniczne'
                  : category === 'soft'
                  ? lang === 'en' ? 'Professional Skills' : 'Umiejętności Zawodowe'
                  : lang === 'en' ? 'Additional Competencies' : 'Dodatkowe Kompetencje';

              return (
                <div key={category} className="mb-2">
                  <span style={{ fontWeight: '700' }}>{categoryLabel}:</span>{' '}
                  {categorySkills.map((skill, idx) => (
                    <span key={skill.id}>
                      {skill.name}
                      <span style={{ fontSize: '8.5pt', color: secondaryColor }}>
                        {' '}({getCVSkillLevel(skill.level, lang)})
                      </span>
                      {idx < categorySkills.length - 1 ? '; ' : ''}
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
        <div className="mb-4">
          <h2
            style={{
              fontSize: '12pt',
              fontWeight: '700',
              color: primaryColor,
              marginBottom: '0.6em',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: `1px solid ${primaryColor}`,
              paddingBottom: '0.3em'
            }}
          >
            {t.languages}
          </h2>

          <div style={{ fontSize: '9.5pt', lineHeight: '1.6' }}>
            {languages.map((language, idx) => (
              <span key={language.id}>
                <span style={{ fontWeight: '600' }}>{language.name}</span>
                <span style={{ color: secondaryColor }}>
                  {' '}({getCVLanguageLevel(language.level, lang)})
                </span>
                {language.certification && (
                  <span style={{ fontSize: '9pt', color: '#666' }}>
                    {' '}[{language.certification}]
                  </span>
                )}
                {idx < languages.length - 1 ? '; ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* PUBLICATIONS SECTION - Placeholder for future enhancement */}
      <div className="mb-4">
        <h2
          style={{
            fontSize: '12pt',
            fontWeight: '700',
            color: primaryColor,
            marginBottom: '0.6em',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: `1px solid ${primaryColor}`,
            paddingBottom: '0.3em'
          }}
        >
          {lang === 'en' ? 'Publications' : 'Publikacje'}
        </h2>
        <p
          style={{
            fontSize: '9pt',
            fontStyle: 'italic',
            color: secondaryColor
          }}
        >
          {lang === 'en'
            ? 'Publications can be added in the achievements section of your experience or education entries.'
            : 'Publikacje można dodać w sekcji osiągnięć w doświadczeniu lub edukacji.'}
        </p>
      </div>

      {/* REFERENCES */}
      <div className="mt-5 pt-3" style={{ borderTop: `1px solid ${secondaryColor}40` }}>
        <p
          style={{
            fontSize: '9pt',
            fontStyle: 'italic',
            color: secondaryColor,
            textAlign: 'center'
          }}
        >
          {lang === 'en'
            ? 'References available upon request'
            : 'Referencje dostępne na życzenie'}
        </p>
      </div>

      {/* RODO CLAUSE (required in Poland) */}
      {(customization.includeRodo !== false) && (
        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>
          <p style={{ fontSize: '7pt', lineHeight: '1.3', color: '#666' }}>
            {lang === 'pl' ? RODO_CLAUSE_PL : RODO_CLAUSE_EN}
          </p>
        </div>
      )}

      {/* FOOTER - Page number placeholder */}
      <div
        style={{
          marginTop: '2em',
          fontSize: '8pt',
          color: secondaryColor,
          textAlign: 'center',
          opacity: 0.6
        }}
      >
        {personal.fullName} – Curriculum Vitae
      </div>
    </div>
  );
};

export default AcademicTemplate;
