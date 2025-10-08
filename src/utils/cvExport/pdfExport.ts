import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CVData } from '@/types/cv';

export const exportToPDF = (cvData: CVData) => {
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
