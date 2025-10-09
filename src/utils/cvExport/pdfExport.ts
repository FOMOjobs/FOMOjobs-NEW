import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CVData } from '@/types/cv';

/**
 * Helper function to convert hex color to RGB
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : { r: 139, g: 92, b: 246 }; // Default purple
};

/**
 * Export CV to PDF with template support
 */
export const exportToPDF = (cvData: CVData) => {
  const template = cvData.customization.template;

  // Route to appropriate template exporter
  switch (template) {
    case 'ats':
      return exportATSTemplateToPDF(cvData);
    case 'executive':
      return exportExecutiveTemplateToPDF(cvData);
    default:
      return exportDefaultTemplateToPDF(cvData);
  }
};

/**
 * ATS-Friendly PDF Export
 * - Arial font only
 * - Black text on white background
 * - NO colors, graphics, or fancy formatting
 * - Maximum ATS compatibility
 */
const exportATSTemplateToPDF = (cvData: CVData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;

  // Helper: Add plain text section
  const addSection = (title: string, content: () => number) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(title.toUpperCase(), 14, yPos);

    // Simple underline
    doc.setLineWidth(0.5);
    doc.line(14, yPos + 1, pageWidth - 14, yPos + 1);

    yPos += 8;
    doc.setFont('helvetica', 'normal');
    return content();
  };

  // Contact Information (in body, NOT header)
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(cvData.personal.fullName || 'YOUR FULL NAME', 14, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  if (cvData.personal.email) {
    doc.text(cvData.personal.email, 14, yPos);
    yPos += 5;
  }
  if (cvData.personal.phone) {
    doc.text(cvData.personal.phone, 14, yPos);
    yPos += 5;
  }
  if (cvData.personal.address) {
    doc.text(cvData.personal.address, 14, yPos);
    yPos += 5;
  }
  yPos += 5;

  // Professional Summary
  if (cvData.personal.summary) {
    addSection('PROFESSIONAL SUMMARY', () => {
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(cvData.personal.summary, pageWidth - 28);
      doc.text(lines, 14, yPos);
      yPos += lines.length * 5 + 5;
      return yPos;
    });
  }

  // Core Skills
  if (cvData.skills.length > 0) {
    addSection('CORE SKILLS', () => {
      doc.setFontSize(11);
      const skillsText = cvData.skills.map(s => `${s.name} (${s.level})`).join(', ');
      const lines = doc.splitTextToSize(skillsText, pageWidth - 28);
      doc.text(lines, 14, yPos);
      yPos += lines.length * 5 + 5;
      return yPos;
    });
  }

  // Professional Experience
  if (cvData.experience.length > 0) {
    addSection('PROFESSIONAL EXPERIENCE', () => {
      doc.setFontSize(11);
      cvData.experience.forEach((exp) => {
        // Position | Company
        doc.setFont('helvetica', 'bold');
        doc.text(`${exp.position} | ${exp.company}`, 14, yPos);
        yPos += 5;

        // Location and dates
        doc.setFont('helvetica', 'normal');
        const dates = `${exp.location || ''} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
        doc.text(dates, 14, yPos);
        yPos += 5;

        // Achievements
        if (exp.achievements && exp.achievements.length > 0) {
          exp.achievements.forEach((achievement) => {
            const lines = doc.splitTextToSize(`• ${achievement}`, pageWidth - 28);
            doc.text(lines, 14, yPos);
            yPos += lines.length * 5;
          });
        }
        yPos += 5;

        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
      });
      return yPos;
    });
  }

  // Education
  if (cvData.education.length > 0) {
    addSection('EDUCATION', () => {
      doc.setFontSize(11);
      cvData.education.forEach((edu) => {
        doc.setFont('helvetica', 'bold');
        doc.text(`${edu.degree} in ${edu.fieldOfStudy}`, 14, yPos);
        yPos += 5;

        doc.setFont('helvetica', 'normal');
        doc.text(edu.school, 14, yPos);
        yPos += 5;

        if (edu.gpa) {
          doc.text(`GPA: ${edu.gpa}`, 14, yPos);
          yPos += 5;
        }
        yPos += 3;
      });
      return yPos;
    });
  }

  // Languages
  if (cvData.languages.length > 0) {
    addSection('LANGUAGES', () => {
      doc.setFontSize(11);
      cvData.languages.forEach((lang) => {
        doc.text(`${lang.name}: ${lang.level}${lang.certification ? ` (${lang.certification})` : ''}`, 14, yPos);
        yPos += 5;
      });
      return yPos;
    });
  }

  const fileName = `${cvData.personal.fullName || 'CV'}_ATS.pdf`;
  doc.save(fileName);
};

/**
 * Executive Template PDF Export
 * - Navy blue accents
 * - Elegant serif fonts for headers
 * - Professional styling
 */
const exportExecutiveTemplateToPDF = (cvData: CVData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;

  const primaryColor = cvData.customization.primaryColor || '#1e3a8a';
  const rgbPrimary = hexToRgb(primaryColor);

  // Header
  doc.setFontSize(24);
  doc.setFont('times', 'bold'); // Serif font
  doc.setTextColor(rgbPrimary.r, rgbPrimary.g, rgbPrimary.b);
  doc.text(cvData.personal.fullName || 'Your Name', 14, yPos);
  yPos += 10;

  // Contact info
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  const contactLine = [
    cvData.personal.email,
    cvData.personal.phone,
    cvData.personal.address
  ].filter(Boolean).join(' | ');
  doc.text(contactLine, 14, yPos);
  yPos += 8;

  // Line separator
  doc.setDrawColor(rgbPrimary.r, rgbPrimary.g, rgbPrimary.b);
  doc.setLineWidth(1.5);
  doc.line(14, yPos, pageWidth - 14, yPos);
  yPos += 8;

  // Helper function
  const addSection = (title: string, content: () => number) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(rgbPrimary.r, rgbPrimary.g, rgbPrimary.b);
    doc.text(title.toUpperCase(), 14, yPos);

    doc.setDrawColor(rgbPrimary.r, rgbPrimary.g, rgbPrimary.b);
    doc.setLineWidth(0.5);
    doc.line(14, yPos + 1, pageWidth - 14, yPos + 1);

    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    return content();
  };

  // Summary
  if (cvData.personal.summary) {
    addSection('Professional Summary', () => {
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(cvData.personal.summary, pageWidth - 28);
      doc.text(lines, 14, yPos);
      yPos += lines.length * 5 + 5;
      return yPos;
    });
  }

  // Core Competencies
  if (cvData.skills.length > 0) {
    addSection('Core Competencies', () => {
      doc.setFontSize(10);
      cvData.skills.forEach((skill) => {
        doc.text(`• ${skill.name}`, 14, yPos);
        yPos += 5;
      });
      yPos += 3;
      return yPos;
    });
  }

  // Experience (rest similar to default)
  if (cvData.experience.length > 0) {
    addSection('Professional Experience', () => {
      doc.setFontSize(10);
      cvData.experience.forEach((exp) => {
        doc.setFont('helvetica', 'bold');
        doc.text(exp.position, 14, yPos);
        yPos += 5;

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(`${exp.company} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, 14, yPos);
        yPos += 5;
        doc.setTextColor(0, 0, 0);

        if (exp.achievements && exp.achievements.length > 0) {
          exp.achievements.forEach((achievement) => {
            const lines = doc.splitTextToSize(`▸ ${achievement}`, pageWidth - 28);
            doc.text(lines, 14, yPos);
            yPos += lines.length * 5;
          });
        }
        yPos += 5;
      });
      return yPos;
    });
  }

  const fileName = `${cvData.personal.fullName || 'CV'}_Executive.pdf`;
  doc.save(fileName);
};

/**
 * Default Template PDF Export (fallback for Modern, Classic, etc.)
 */
const exportDefaultTemplateToPDF = (cvData: CVData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;

  // Helper function to add section
  const addSection = (title: string, content: () => number) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Section title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(139, 92, 246); // Purple color
    doc.text(title, 14, yPos);

    // Underline
    doc.setDrawColor(139, 92, 246);
    doc.setLineWidth(0.5);
    doc.line(14, yPos + 1, pageWidth - 14, yPos + 1);

    yPos += 8;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    return content();
  };

  // PERSONAL INFO
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(cvData.personal.fullName || 'Imię Nazwisko', 14, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const contactInfo: string[] = [];
  if (cvData.personal.email) contactInfo.push(`📧 ${cvData.personal.email}`);
  if (cvData.personal.phone) contactInfo.push(`📱 ${cvData.personal.phone}`);
  if (cvData.personal.address) contactInfo.push(`📍 ${cvData.personal.address}`);
  if (cvData.personal.linkedIn) contactInfo.push(`🔗 ${cvData.personal.linkedIn}`);
  if (cvData.personal.portfolio) contactInfo.push(`🌐 ${cvData.personal.portfolio}`);

  contactInfo.forEach((info) => {
    doc.text(info, 14, yPos);
    yPos += 5;
  });

  yPos += 5;

  // SUMMARY
  if (cvData.personal.summary) {
    yPos = addSection('Podsumowanie', () => {
      const splitSummary = doc.splitTextToSize(cvData.personal.summary, pageWidth - 28);
      doc.setFontSize(10);
      doc.text(splitSummary, 14, yPos);
      return yPos + (splitSummary.length * 5) + 5;
    });
  }

  // EXPERIENCE
  if (cvData.experience.length > 0) {
    yPos = addSection('Doświadczenie zawodowe', () => {
      cvData.experience.forEach((exp, index) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }

        // Position and Company
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(exp.position, 14, yPos);
        yPos += 5;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`${exp.company}${exp.location ? ` • ${exp.location}` : ''}`, 14, yPos);
        yPos += 5;

        // Dates
        const dates = exp.current ? `${exp.startDate} - Obecnie` : `${exp.startDate} - ${exp.endDate}`;
        doc.setTextColor(100, 100, 100);
        doc.text(dates, 14, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;

        // Description
        if (exp.description) {
          const splitDesc = doc.splitTextToSize(exp.description, pageWidth - 28);
          doc.text(splitDesc, 14, yPos);
          yPos += splitDesc.length * 5;
        }

        // Achievements
        if (exp.achievements && exp.achievements.length > 0) {
          exp.achievements.forEach((achievement) => {
            if (achievement.trim()) {
              const splitAchievement = doc.splitTextToSize(`• ${achievement}`, pageWidth - 32);
              doc.text(splitAchievement, 18, yPos);
              yPos += splitAchievement.length * 5;
            }
          });
        }

        yPos += 5;
      });
      return yPos;
    });
  }

  // EDUCATION
  if (cvData.education.length > 0) {
    yPos = addSection('Wykształcenie', () => {
      cvData.education.forEach((edu) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }

        // Degree and Field
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(`${edu.degree}${edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ''}`, 14, yPos);
        yPos += 5;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`${edu.school}${edu.location ? ` • ${edu.location}` : ''}`, 14, yPos);
        yPos += 5;

        // Dates
        const dates = edu.current ? `${edu.startDate} - Obecnie` : `${edu.startDate} - ${edu.endDate}`;
        doc.setTextColor(100, 100, 100);
        doc.text(dates, 14, yPos);
        if (edu.gpa) {
          doc.text(`• GPA: ${edu.gpa}`, pageWidth / 2, yPos);
        }
        doc.setTextColor(0, 0, 0);
        yPos += 5;

        // Description
        if (edu.description) {
          const splitDesc = doc.splitTextToSize(edu.description, pageWidth - 28);
          doc.text(splitDesc, 14, yPos);
          yPos += splitDesc.length * 5;
        }

        // Achievements
        if (edu.achievements && edu.achievements.length > 0) {
          edu.achievements.forEach((achievement) => {
            if (achievement.trim()) {
              const splitAchievement = doc.splitTextToSize(`• ${achievement}`, pageWidth - 32);
              doc.text(splitAchievement, 18, yPos);
              yPos += splitAchievement.length * 5;
            }
          });
        }

        yPos += 5;
      });
      return yPos;
    });
  }

  // SKILLS
  if (cvData.skills.length > 0) {
    yPos = addSection('Umiejętności', () => {
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
        other: 'Inne'
      };

      Object.entries(skillsByCategory).forEach(([category, skills]) => {
        if (yPos > 260) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFont('helvetica', 'bold');
        doc.text(`${categoryNames[category] || category}:`, 14, yPos);
        yPos += 5;

        doc.setFont('helvetica', 'normal');
        const skillsText = skills.map(s => `${s.name} (${s.level})`).join(' • ');
        const splitSkills = doc.splitTextToSize(skillsText, pageWidth - 28);
        doc.text(splitSkills, 14, yPos);
        yPos += splitSkills.length * 5 + 3;
      });

      return yPos;
    });
  }

  // LANGUAGES
  if (cvData.languages.length > 0) {
    yPos = addSection('Języki obce', () => {
      const languagesText = cvData.languages
        .map(lang => `${lang.name} - ${lang.level}${lang.certification ? ` (${lang.certification})` : ''}`)
        .join(' • ');

      const splitLangs = doc.splitTextToSize(languagesText, pageWidth - 28);
      doc.text(splitLangs, 14, yPos);
      return yPos + splitLangs.length * 5;
    });
  }

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  const footerText = `Wygenerowano przez FOMO.cvcreator - ${new Date().toLocaleDateString('pl-PL')}`;
  doc.text(footerText, 14, doc.internal.pageSize.height - 10);

  // Save
  const fileName = cvData.personal.fullName
    ? `CV_${cvData.personal.fullName.replace(/\s+/g, '_')}.pdf`
    : 'CV.pdf';

  doc.save(fileName);
};
