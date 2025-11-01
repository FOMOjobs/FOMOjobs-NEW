import React from 'react';
import { CVData, RODO_CLAUSE_PL, RODO_CLAUSE_EN } from '@/types/cv';
import { getCVTranslations, formatCVDate, getCVSkillLevel, getCVLanguageLevel } from '@/lib/cvTranslations';

interface TechTemplateProps {
  data: CVData;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Tech Template
 *
 * Developer-friendly CV design inspired by terminal/code editors
 * Perfect for software engineers, DevOps, data scientists, and tech professionals
 *
 * KEY FEATURES:
 * - Monospace font (Consolas, Monaco, 'Courier New') for code aesthetic
 * - Dark terminal theme with Matrix green accents (#00ff00)
 * - ASCII-style section headers (comment syntax: // SECTION_NAME)
 * - Code block-style containers (bordered with subtle shadows)
 * - Syntax highlighting colors (variables, functions, strings)
 * - Compact two-column layout (maximize screen real estate)
 * - Tech-friendly icons replaced with symbols (>, $, #, etc.)
 * - Skills displayed as "import" statements
 * - Experience formatted like commit messages
 *
 * DESIGN PHILOSOPHY:
 * - Speaks the language of developers
 * - Clean, readable, and familiar to tech recruiters
 * - Shows personality while maintaining professionalism
 * - Optimized for GitHub/GitLab style portfolios
 */

const TechTemplate: React.FC<TechTemplateProps> = ({
  data,
  primaryColor = '#00ff00', // Matrix Green
  secondaryColor = '#00d4ff'  // Cyan
}) => {
  const { personal, experience, education, skills, languages, customization } = data;
  const lang = customization.language;
  const t = getCVTranslations(lang);

  // Terminal colors
  const terminalBg = '#0d1117';
  const terminalText = '#c9d1d9';
  const commentGray = '#8b949e';

  return (
    <div
      className="max-w-[21cm] mx-auto"
      style={{
        fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
        fontSize: '9pt',
        lineHeight: '1.5',
        color: terminalText,
        background: terminalBg,
        padding: '1.5cm'
      }}
    >
      {/* HEADER - Terminal Style */}
      <div
        className="mb-4 p-4"
        style={{
          border: `1px solid ${primaryColor}`,
          borderRadius: '4px',
          background: 'rgba(0, 255, 0, 0.05)'
        }}
      >
        <div style={{ color: commentGray, fontSize: '8pt', marginBottom: '0.5em' }}>
          {'// '}─────────────────────────────────────────────────────────────
        </div>

        <div className="flex items-center gap-4">
          {/* Profile Photo - Terminal Window Style */}
          {personal.photo && (
            <div
              className="flex-shrink-0"
              style={{
                width: '90px',
                height: '90px',
                border: `2px solid ${primaryColor}`,
                borderRadius: '2px',
                overflow: 'hidden',
                boxShadow: `0 0 10px ${primaryColor}40`
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
                  filter: 'contrast(1.1) brightness(0.95)'
                }}
              />
            </div>
          )}

          <div className="flex-1">
            <div style={{ color: commentGray, fontSize: '8pt' }}>{'// '}{t.about}</div>
            <h1
              style={{
                fontSize: '16pt',
                fontWeight: '700',
                color: primaryColor,
                marginBottom: '0.3em',
                letterSpacing: '1px'
              }}
            >
              {'> '}
              <span style={{ color: secondaryColor }}>const</span>{' '}
              <span style={{ color: '#ffa657' }}>developer</span> = {'"'}
              {personal.fullName || 'Your Name'}
              {'"'}
            </h1>

            {/* Contact - Variable Declaration Style */}
            <div style={{ fontSize: '8.5pt', lineHeight: '1.6' }}>
              {personal.email && (
                <div>
                  <span style={{ color: secondaryColor }}>let</span>{' '}
                  <span style={{ color: '#ffa657' }}>email</span> ={' '}
                  <span style={{ color: '#a5d6ff' }}>"{personal.email}"</span>;
                </div>
              )}
              {personal.phone && (
                <div>
                  <span style={{ color: secondaryColor }}>let</span>{' '}
                  <span style={{ color: '#ffa657' }}>phone</span> ={' '}
                  <span style={{ color: '#a5d6ff' }}>"{personal.phone}"</span>;
                </div>
              )}
              {personal.address && (
                <div>
                  <span style={{ color: secondaryColor }}>let</span>{' '}
                  <span style={{ color: '#ffa657' }}>location</span> ={' '}
                  <span style={{ color: '#a5d6ff' }}>"{personal.address}"</span>;
                </div>
              )}
            </div>

            {/* Links */}
            <div style={{ marginTop: '0.5em', fontSize: '8.5pt' }}>
              {personal.linkedIn && (
                <div style={{ color: secondaryColor }}>
                  $ curl {personal.linkedIn}
                </div>
              )}
              {personal.portfolio && (
                <div style={{ color: secondaryColor }}>
                  $ git clone {personal.portfolio}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ color: commentGray, fontSize: '8pt', marginTop: '0.5em' }}>
          {'// '}─────────────────────────────────────────────────────────────
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div className="flex gap-4">
        {/* LEFT COLUMN - Main Content */}
        <div className="flex-1">
          {/* PROFESSIONAL SUMMARY */}
          {personal.summary && (
            <div className="mb-4">
              <h2
                style={{
                  fontSize: '10pt',
                  fontWeight: '700',
                  color: primaryColor,
                  marginBottom: '0.5em'
                }}
              >
                {'// '}{t.professionalSummary.toUpperCase()}
              </h2>
              <div
                className="p-3"
                style={{
                  border: `1px solid ${commentGray}`,
                  borderRadius: '3px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  fontSize: '9pt',
                  lineHeight: '1.6'
                }}
              >
                <span style={{ color: commentGray }}>{'/* '}</span>
                {personal.summary}
                <span style={{ color: commentGray }}>{' */'}</span>
              </div>
            </div>
          )}

          {/* EXPERIENCE - Commit Log Style */}
          {experience.length > 0 && (
            <div className="mb-4">
              <h2
                style={{
                  fontSize: '10pt',
                  fontWeight: '700',
                  color: primaryColor,
                  marginBottom: '0.5em'
                }}
              >
                {'// '}{t.experience.toUpperCase()}
              </h2>
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="mb-3 p-3"
                  style={{
                    border: `1px solid ${commentGray}`,
                    borderRadius: '3px',
                    background: 'rgba(255, 255, 255, 0.03)'
                  }}
                >
                  <div style={{ color: secondaryColor, fontSize: '8pt', marginBottom: '0.3em' }}>
                    $ git log --author="{personal.fullName}"
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3
                        style={{
                          fontSize: '10pt',
                          fontWeight: '700',
                          color: '#ffa657'
                        }}
                      >
                        {'> '}{exp.position}
                      </h3>
                      <div style={{ color: secondaryColor, fontSize: '9pt' }}>
                        @ {exp.company}
                        {exp.location && ` [${exp.location}]`}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: '8pt',
                        color: commentGray,
                        whiteSpace: 'nowrap',
                        marginLeft: '1em'
                      }}
                    >
                      {formatCVDate(exp.startDate, lang)} - {exp.current ? t.present : formatCVDate(exp.endDate, lang)}
                    </div>
                  </div>

                  {exp.description && (
                    <p style={{ fontSize: '8.5pt', marginBottom: '0.5em', color: terminalText }}>
                      {exp.description}
                    </p>
                  )}

                  {exp.achievements && exp.achievements.length > 0 && (
                    <div style={{ fontSize: '8.5pt' }}>
                      {exp.achievements.map((achievement, idx) => (
                        <div key={idx} style={{ marginBottom: '0.3em' }}>
                          <span style={{ color: primaryColor }}>{'• '}</span>
                          {achievement}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <div className="mb-4">
              <h2
                style={{
                  fontSize: '10pt',
                  fontWeight: '700',
                  color: primaryColor,
                  marginBottom: '0.5em'
                }}
              >
                {'// '}{t.education.toUpperCase()}
              </h2>
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="mb-3 p-3"
                  style={{
                    border: `1px solid ${commentGray}`,
                    borderRadius: '3px',
                    background: 'rgba(255, 255, 255, 0.03)'
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3
                        style={{
                          fontSize: '10pt',
                          fontWeight: '700',
                          color: '#ffa657'
                        }}
                      >
                        {'# '}{edu.degree}
                      </h3>
                      <div style={{ color: secondaryColor, fontSize: '9pt' }}>
                        @ {edu.school}
                        {edu.location && ` [${edu.location}]`}
                      </div>
                      <div style={{ color: commentGray, fontSize: '8.5pt' }}>
                        {edu.fieldOfStudy}
                        {edu.gpa && ` | GPA: ${edu.gpa}`}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: '8pt',
                        color: commentGray,
                        whiteSpace: 'nowrap',
                        marginLeft: '1em'
                      }}
                    >
                      {formatCVDate(edu.startDate, lang)} - {edu.current ? t.present : formatCVDate(edu.endDate, lang)}
                    </div>
                  </div>

                  {edu.description && (
                    <p style={{ fontSize: '8.5pt', marginTop: '0.5em', color: terminalText }}>
                      {edu.description}
                    </p>
                  )}

                  {edu.achievements && edu.achievements.length > 0 && (
                    <div style={{ fontSize: '8.5pt', marginTop: '0.5em' }}>
                      {edu.achievements.map((achievement, idx) => (
                        <div key={idx} style={{ marginBottom: '0.3em' }}>
                          <span style={{ color: primaryColor }}>{'• '}</span>
                          {achievement}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - Sidebar */}
        <div style={{ width: '38%' }}>
          {/* SKILLS - Import Style */}
          {skills.length > 0 && (
            <div className="mb-4">
              <h2
                style={{
                  fontSize: '10pt',
                  fontWeight: '700',
                  color: primaryColor,
                  marginBottom: '0.5em'
                }}
              >
                {'// '}{t.skills.toUpperCase()}
              </h2>
              <div
                className="p-3"
                style={{
                  border: `1px solid ${commentGray}`,
                  borderRadius: '3px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  fontSize: '8.5pt'
                }}
              >
                {skills.map((skill) => (
                  <div key={skill.id} style={{ marginBottom: '0.4em' }}>
                    <span style={{ color: secondaryColor }}>import</span>{' '}
                    <span style={{ color: '#ffa657' }}>{skill.name}</span>{' '}
                    <span style={{ color: commentGray }}>
                      // {getCVSkillLevel(skill.level, lang)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LANGUAGES */}
          {languages.length > 0 && (
            <div className="mb-4">
              <h2
                style={{
                  fontSize: '10pt',
                  fontWeight: '700',
                  color: primaryColor,
                  marginBottom: '0.5em'
                }}
              >
                {'// '}{t.languages.toUpperCase()}
              </h2>
              <div
                className="p-3"
                style={{
                  border: `1px solid ${commentGray}`,
                  borderRadius: '3px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  fontSize: '8.5pt'
                }}
              >
                {languages.map((language) => (
                  <div
                    key={language.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span style={{ color: '#ffa657' }}>
                      {'{ '}{language.name}{' }'}
                    </span>
                    <span style={{ color: commentGray, fontSize: '8pt' }}>
                      {getCVLanguageLevel(language.level, lang, 'short')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terminal Info Box */}
          <div
            className="p-3 mt-6"
            style={{
              border: `1px solid ${primaryColor}`,
              borderRadius: '3px',
              background: 'rgba(0, 255, 0, 0.05)',
              fontSize: '7.5pt',
              color: commentGray
            }}
          >
            <div style={{ color: primaryColor, marginBottom: '0.3em' }}>
              $ whoami
            </div>
            <div style={{ marginBottom: '0.5em' }}>
              {personal.fullName}
            </div>
            <div style={{ color: primaryColor, marginBottom: '0.3em' }}>
              $ uptime
            </div>
            <div>
              {experience.length > 0 && (
                <>
                  {new Date().getFullYear() - new Date(experience[0].startDate).getFullYear()}+ years in tech
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RODO CLAUSE (required in Poland) */}
      {(customization.includeRodo !== false) && (
        <div
          style={{
            marginTop: '2em',
            paddingTop: '1em',
            borderTop: `1px solid ${commentGray}`
          }}
        >
          <p style={{ fontSize: '7pt', lineHeight: '1.3', color: commentGray }}>
            <span style={{ color: primaryColor }}>{'// '}</span>
            {lang === 'pl' ? RODO_CLAUSE_PL : RODO_CLAUSE_EN}
          </p>
        </div>
      )}

      {/* FOOTER */}
      <div
        style={{
          marginTop: '2em',
          paddingTop: '1em',
          borderTop: `1px solid ${commentGray}`,
          fontSize: '7pt',
          color: commentGray,
          textAlign: 'center'
        }}
      >
        {'// '}Built with ❤️ using FOMOjobs CV Creator {'// '}
        <span style={{ color: primaryColor }}>EOF</span>
      </div>
    </div>
  );
};

export default TechTemplate;
