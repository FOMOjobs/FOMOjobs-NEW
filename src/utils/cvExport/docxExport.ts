import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType, convertInchesToTwip } from 'docx';
import { saveAs } from 'file-saver';
import { Packer } from 'docx';
import { CVData } from '@/types/cv';

export const exportToDOCX = async (cvData: CVData) => {
  const sections: Paragraph[] = [];

  // Helper: Create section heading
  const createSectionHeading = (text: string): Paragraph => {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      spacing: {
        before: 240,
        after: 120,
      },
      border: {
        bottom: {
          color: '8B5CF6',
          space: 1,
          style: 'single',
          size: 6,
        },
      },
    });
  };

  // Helper: Create normal paragraph
  const createParagraph = (text: string, options?: {
    bold?: boolean;
    spacing?: { before?: number; after?: number };
    alignment?: typeof AlignmentType[keyof typeof AlignmentType];
  }): Paragraph => {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          bold: options?.bold,
        }),
      ],
      spacing: options?.spacing,
      alignment: options?.alignment,
    });
  };

  // Helper: Create bullet point
  const createBullet = (text: string): Paragraph => {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0,
      },
      spacing: {
        before: 60,
        after: 60,
      },
    });
  };

  // PERSONAL INFO - Name
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: cvData.personal.fullName || 'Imię Nazwisko',
          bold: true,
          size: 32,
          color: '8B5CF6',
        }),
      ],
      spacing: {
        after: 120,
      },
      alignment: AlignmentType.CENTER,
    })
  );

  // PERSONAL INFO - Contact
  const contactLines: string[] = [];
  if (cvData.personal.email) contactLines.push(`📧 ${cvData.personal.email}`);
  if (cvData.personal.phone) contactLines.push(`📱 ${cvData.personal.phone}`);
  if (cvData.personal.address) contactLines.push(`📍 ${cvData.personal.address}`);
  if (cvData.personal.linkedIn) contactLines.push(`🔗 ${cvData.personal.linkedIn}`);
  if (cvData.personal.portfolio) contactLines.push(`🌐 ${cvData.personal.portfolio}`);

  sections.push(
    new Paragraph({
      children: contactLines.map(
        (line) =>
          new TextRun({
            text: line + (line === contactLines[contactLines.length - 1] ? '' : ' | '),
            size: 20,
          })
      ),
      spacing: {
        after: 240,
      },
      alignment: AlignmentType.CENTER,
    })
  );

  // SUMMARY
  if (cvData.personal.summary) {
    sections.push(createSectionHeading('Podsumowanie'));
    sections.push(
      createParagraph(cvData.personal.summary, {
        spacing: { after: 240 },
      })
    );
  }

  // EXPERIENCE
  if (cvData.experience.length > 0) {
    sections.push(createSectionHeading('Doświadczenie zawodowe'));

    cvData.experience.forEach((exp) => {
      // Position
      sections.push(
        createParagraph(exp.position, {
          bold: true,
          spacing: { before: 120, after: 60 },
        })
      );

      // Company and location
      sections.push(
        createParagraph(
          `${exp.company}${exp.location ? ` • ${exp.location}` : ''}`,
          {
            spacing: { after: 60 },
          }
        )
      );

      // Dates
      const dates = exp.current
        ? `${exp.startDate} - Obecnie`
        : `${exp.startDate} - ${exp.endDate}`;
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: dates,
              italics: true,
              color: '666666',
              size: 20,
            }),
          ],
          spacing: {
            after: 120,
          },
        })
      );

      // Description
      if (exp.description) {
        sections.push(
          createParagraph(exp.description, {
            spacing: { after: 120 },
          })
        );
      }

      // Achievements
      if (exp.achievements && exp.achievements.length > 0) {
        exp.achievements.forEach((achievement) => {
          if (achievement.trim()) {
            sections.push(createBullet(achievement));
          }
        });
      }
    });
  }

  // EDUCATION
  if (cvData.education.length > 0) {
    sections.push(createSectionHeading('Wykształcenie'));

    cvData.education.forEach((edu) => {
      // Degree and Field
      sections.push(
        createParagraph(
          `${edu.degree}${edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ''}`,
          {
            bold: true,
            spacing: { before: 120, after: 60 },
          }
        )
      );

      // School and location
      sections.push(
        createParagraph(
          `${edu.school}${edu.location ? ` • ${edu.location}` : ''}`,
          {
            spacing: { after: 60 },
          }
        )
      );

      // Dates and GPA
      const dates = edu.current
        ? `${edu.startDate} - Obecnie`
        : `${edu.startDate} - ${edu.endDate}`;
      const dateText = edu.gpa ? `${dates} • GPA: ${edu.gpa}` : dates;

      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: dateText,
              italics: true,
              color: '666666',
              size: 20,
            }),
          ],
          spacing: {
            after: 120,
          },
        })
      );

      // Description
      if (edu.description) {
        sections.push(
          createParagraph(edu.description, {
            spacing: { after: 120 },
          })
        );
      }

      // Achievements
      if (edu.achievements && edu.achievements.length > 0) {
        edu.achievements.forEach((achievement) => {
          if (achievement.trim()) {
            sections.push(createBullet(achievement));
          }
        });
      }
    });
  }

  // SKILLS
  if (cvData.skills.length > 0) {
    sections.push(createSectionHeading('Umiejętności'));

    const skillsByCategory = cvData.skills.reduce((acc, skill) => {
      const category = skill.category || 'other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    }, {} as Record<string, typeof cvData.skills>);

    const categoryNames: Record<string, string> = {
      technical: 'Techniczne',
      soft: 'Miękkie',
      language: 'Językowe',
      other: 'Inne',
    };

    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      const categoryName = categoryNames[category] || category;
      const skillsText = skills.map((s) => `${s.name} (${s.level})`).join(' • ');

      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${categoryName}: `,
              bold: true,
            }),
            new TextRun({
              text: skillsText,
            }),
          ],
          spacing: {
            before: 120,
            after: 60,
          },
        })
      );
    });
  }

  // LANGUAGES
  if (cvData.languages.length > 0) {
    sections.push(createSectionHeading('Języki obce'));

    const languagesText = cvData.languages
      .map(
        (lang) =>
          `${lang.name} - ${lang.level}${lang.certification ? ` (${lang.certification})` : ''}`
      )
      .join(' • ');

    sections.push(
      createParagraph(languagesText, {
        spacing: { after: 120 },
      })
    );
  }

  // Footer
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `\nWygenerowano przez FOMO.cvcreator - ${new Date().toLocaleDateString('pl-PL')}`,
          size: 16,
          color: '999999',
          italics: true,
        }),
      ],
      spacing: {
        before: 480,
      },
      alignment: AlignmentType.CENTER,
    })
  );

  // Create document
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.75),
              right: convertInchesToTwip(0.75),
              bottom: convertInchesToTwip(0.75),
              left: convertInchesToTwip(0.75),
            },
          },
        },
        children: sections,
      },
    ],
  });

  // Generate and save
  const blob = await Packer.toBlob(doc);
  const fileName = cvData.personal.fullName
    ? `CV_${cvData.personal.fullName.replace(/\s+/g, '_')}.docx`
    : 'CV.docx';

  saveAs(blob, fileName);
};
