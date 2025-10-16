import React from 'react';
import { CVData } from '@/types/cv';
import { getCVTranslations, formatCVDate, getCVSkillLevel, getCVLanguageLevel } from '@/lib/cvTranslations';

interface CreativeTemplateProps {
  data: CVData;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Creative Template
 *
 * Bold, asymmetric design for creative professionals
 * Perfect for designers, artists, marketers, and creative directors
 *
 * KEY FEATURES:
 * - Asymmetric layout (breaks traditional CV rules intentionally)
 * - Large, expressive typography (headlines steal the show)
 * - Color blocks and geometric shapes
 * - Coral (#ff6b6b) and Turquoise (#4ecdc4) color scheme
 * - Generous white space (breathable design)
 * - Sidebar with accent background color
 * - Circular photo with offset positioning
 * - Creative section dividers (thick colored bars)
 * - Skills displayed as colorful tags/pills
 * - Modern sans-serif fonts (DM Sans, Inter)
 *
 * DESIGN PHILOSOPHY:
 * - Stand out from the crowd
 * - Show personality and design thinking
 * - Not suitable for conservative industries
 * - Perfect for portfolio-heavy roles
 * - Demonstrates visual hierarchy understanding
 */

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({
  data,
  primaryColor = '#ff6b6b', // Coral
  secondaryColor = '#4ecdc4'  // Turquoise
}) => {
  const { personal, experience, education, skills, languages, customization } = data;
  const lang = customization.language;
  const t = getCVTranslations(lang);

  return (
    <div
      className="bg-white max-w-[21cm] mx-auto overflow-hidden"
      style={{
        fontFamily: "'DM Sans', 'Inter', sans-serif",
        fontSize: '10pt',
        lineHeight: '1.5',
        color: '#2d3436'
      }}
    >
      {/* HEADER - Bold Asymmetric */}
      <div className="relative">
        {/* Large Color Block Background */}
        <div
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
            height: '200px',
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)'
          }}
        />

        {/* Content Over Background */}
        <div className="absolute top-0 left-0 right-0 p-8">
          <div className="flex items-start gap-6">
            {/* Name - Large and Bold */}
            <div className="flex-1">
              <div
                style={{
                  fontSize: '11pt',
                  fontWeight: '500',
                  color: 'white',
                  opacity: 0.9,
                  marginBottom: '0.5em',
                  textTransform: 'uppercase',
                  letterSpacing: '3px'
                }}
              >
                {t.about}
              </div>
              <h1
                style={{
                  fontSize: '38pt',
                  fontWeight: '800',
                  color: 'white',
                  lineHeight: '1',
                  marginBottom: '0.5em',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                {personal.fullName || 'Your Name'}
              </h1>

              {/* Contact - Clean White Text */}
              <div
                style={{
                  fontSize: '9.5pt',
                  color: 'white',
                  lineHeight: '1.8',
                  opacity: 0.95
                }}
              >
                {personal.email && <div>{personal.email}</div>}
                {personal.phone && <div>{personal.phone}</div>}
                {personal.address && <div>{personal.address}</div>}
              </div>
            </div>

            {/* Profile Photo - Circular with Offset */}
            {personal.photo && (
              <div
                className="flex-shrink-0"
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  border: `5px solid white`,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  marginTop: '2em'
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
          </div>

          {/* Links - Positioned Below */}
          {(personal.linkedIn || personal.portfolio) && (
            <div
              style={{
                marginTop: '1em',
                fontSize: '9pt',
                color: 'white',
                opacity: 0.9
              }}
            >
              {personal.linkedIn && <div>🔗 {personal.linkedIn}</div>}
              {personal.portfolio && <div>🌐 {personal.portfolio}</div>}
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT - Asymmetric Two-Column */}
      <div className="flex" style={{ minHeight: '400px' }}>
        {/* LEFT SIDEBAR - Colored Background */}
        <div
          style={{
            width: '35%',
            background: `linear-gradient(180deg, ${secondaryColor}15 0%, ${primaryColor}15 100%)`,
            padding: '2em 1.5em'
          }}
        >
          {/* PROFESSIONAL SUMMARY */}
          {personal.summary && (
            <div className="mb-6">
              <h2
                style={{
                  fontSize: '14pt',
                  fontWeight: '800',
                  color: primaryColor,
                  marginBottom: '0.8em',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {t.about}
              </h2>
              <p
                style={{
                  fontSize: '9.5pt',
                  lineHeight: '1.7',
                  color: '#2d3436'
                }}
              >
                {personal.summary}
              </p>
            </div>
          )}

          {/* SKILLS - Colorful Pills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2
                style={{
                  fontSize: '14pt',
                  fontWeight: '800',
                  color: primaryColor,
                  marginBottom: '0.8em',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {t.skills}
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <div
                    key={skill.id}
                    style={{
                      background: idx % 2 === 0 ? primaryColor : secondaryColor,
                      color: 'white',
                      padding: '0.4em 0.8em',
                      borderRadius: '20px',
                      fontSize: '8.5pt',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LANGUAGES */}
          {languages.length > 0 && (
            <div className="mb-6">
              <h2
                style={{
                  fontSize: '14pt',
                  fontWeight: '800',
                  color: primaryColor,
                  marginBottom: '0.8em',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {t.languages}
              </h2>
              {languages.map((language) => (
                <div
                  key={language.id}
                  className="mb-3"
                  style={{
                    borderLeft: `4px solid ${secondaryColor}`,
                    paddingLeft: '0.8em'
                  }}
                >
                  <div
                    style={{
                      fontSize: '10pt',
                      fontWeight: '700',
                      color: '#2d3436'
                    }}
                  >
                    {language.name}
                  </div>
                  <div
                    style={{
                      fontSize: '9pt',
                      color: '#636e72'
                    }}
                  >
                    {getCVLanguageLevel(language.level, lang)}
                  </div>
                  {language.certification && (
                    <div
                      style={{
                        fontSize: '8pt',
                        color: '#b2bec3',
                        marginTop: '0.2em'
                      }}
                    >
                      {language.certification}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="flex-1 p-8">
          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  style={{
                    width: '6px',
                    height: '40px',
                    background: `linear-gradient(180deg, ${primaryColor}, ${secondaryColor})`
                  }}
                />
                <h2
                  style={{
                    fontSize: '18pt',
                    fontWeight: '800',
                    color: primaryColor,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {t.experience}
                </h2>
              </div>

              {experience.map((exp) => (
                <div key={exp.id} className="mb-5" style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3
                      style={{
                        fontSize: '12pt',
                        fontWeight: '700',
                        color: '#2d3436'
                      }}
                    >
                      {exp.position}
                    </h3>
                    <span
                      style={{
                        fontSize: '8.5pt',
                        color: primaryColor,
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        marginLeft: '1em'
                      }}
                    >
                      {formatCVDate(exp.startDate, lang)} → {exp.current ? t.present : formatCVDate(exp.endDate, lang)}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '10.5pt',
                      fontWeight: '600',
                      color: secondaryColor,
                      marginBottom: '0.5em'
                    }}
                  >
                    {exp.company}
                    {exp.location && ` • ${exp.location}`}
                  </div>

                  {exp.description && (
                    <p
                      style={{
                        fontSize: '9.5pt',
                        marginBottom: '0.5em',
                        lineHeight: '1.6',
                        color: '#636e72'
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
                        margin: 0,
                        listStyle: 'none',
                        color: '#636e72'
                      }}
                    >
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} style={{ marginBottom: '0.3em', paddingLeft: '1.2em', position: 'relative' }}>
                          <span
                            style={{
                              position: 'absolute',
                              left: 0,
                              color: idx % 2 === 0 ? primaryColor : secondaryColor,
                              fontWeight: '700'
                            }}
                          >
                            ▸
                          </span>
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
              <div className="flex items-center gap-3 mb-4">
                <div
                  style={{
                    width: '6px',
                    height: '40px',
                    background: `linear-gradient(180deg, ${secondaryColor}, ${primaryColor})`
                  }}
                />
                <h2
                  style={{
                    fontSize: '18pt',
                    fontWeight: '800',
                    color: secondaryColor,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {t.education}
                </h2>
              </div>

              {education.map((edu) => (
                <div key={edu.id} className="mb-4" style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3
                      style={{
                        fontSize: '12pt',
                        fontWeight: '700',
                        color: '#2d3436'
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <span
                      style={{
                        fontSize: '8.5pt',
                        color: secondaryColor,
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        marginLeft: '1em'
                      }}
                    >
                      {formatCVDate(edu.startDate, lang)} → {edu.current ? t.present : formatCVDate(edu.endDate, lang)}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '10.5pt',
                      fontWeight: '600',
                      color: primaryColor,
                      marginBottom: '0.3em'
                    }}
                  >
                    {edu.school}
                    {edu.location && ` • ${edu.location}`}
                  </div>

                  <div
                    style={{
                      fontSize: '9pt',
                      color: '#636e72',
                      marginBottom: '0.3em'
                    }}
                  >
                    {edu.fieldOfStudy}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </div>

                  {edu.description && (
                    <p
                      style={{
                        fontSize: '9.5pt',
                        marginTop: '0.3em',
                        lineHeight: '1.6',
                        color: '#636e72'
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
                        margin: '0.3em 0 0 0',
                        listStyle: 'none',
                        color: '#636e72'
                      }}
                    >
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} style={{ marginBottom: '0.3em', paddingLeft: '1.2em', position: 'relative' }}>
                          <span
                            style={{
                              position: 'absolute',
                              left: 0,
                              color: idx % 2 === 0 ? secondaryColor : primaryColor,
                              fontWeight: '700'
                            }}
                          >
                            ▸
                          </span>
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
      </div>

      {/* FOOTER - Decorative */}
      <div
        style={{
          height: '12px',
          background: `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${primaryColor} 100%)`
        }}
      />
    </div>
  );
};

export default CreativeTemplate;
