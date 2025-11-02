/**
 * ATS Compatibility Analyzer
 *
 * Tests CV against common ATS (Applicant Tracking Systems) requirements.
 * Provides score and actionable recommendations.
 *
 * TESTED AGAINST:
 * - Taleo (Oracle)
 * - Workday
 * - Greenhouse
 * - Lever
 * - iCIMS
 * - BambooHR
 *
 * ATS REQUIREMENTS:
 * - Standard fonts (Arial, Helvetica, Calibri, Times New Roman)
 * - No images, charts, or graphics in content
 * - Standard section headers
 * - Contact info in body (not header/footer)
 * - No tables or columns
 * - .docx or .pdf format
 * - Bullet points (not special characters)
 * - Standard date formats
 * - Keywords from job description
 */

import type { CVData } from '@/types/cv';

export interface ATSIssue {
  severity: 'critical' | 'warning' | 'suggestion';
  category: 'format' | 'content' | 'structure' | 'keywords' | 'legal' | 'polish-market';
  title: string;
  description: string;
  recommendation: string;
  deduction: number; // Points deducted (0-10)
  aiSuggestion?: string; // Optional AI-generated improvement
}

export interface ATSTestResult {
  score: number; // 0-100
  grade: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  issues: ATSIssue[];
  strengths: string[];
  summary: string;
  totalDeductions?: number; // Sum of all deductions
  categoryBreakdown?: Record<string, number>; // Deductions per category
}

/**
 * Test CV for ATS compatibility
 */
export const testATSCompatibility = (cvData: CVData, templateId?: string): ATSTestResult => {
  const issues: ATSIssue[] = [];
  const strengths: string[] = [];
  let score = 100;

  // 0. TEST: Polish market requirements (RODO, dates, phone)
  const rodoIssues = checkRODOCompliance(cvData);
  if (rodoIssues.length > 0) {
    issues.push(...rodoIssues);
    score -= rodoIssues.reduce((sum, issue) => sum + issue.deduction, 0);
  }

  const dateFormatIssues = checkPolishDateFormat(cvData);
  if (dateFormatIssues.length > 0) {
    issues.push(...dateFormatIssues);
    score -= dateFormatIssues.reduce((sum, issue) => sum + issue.deduction, 0);
  }

  const phoneFormatIssues = checkPhoneFormat(cvData);
  if (phoneFormatIssues.length > 0) {
    issues.push(...phoneFormatIssues);
    score -= phoneFormatIssues.reduce((sum, issue) => sum + issue.deduction, 0);
  } else if (cvData.personal?.phone) {
    strengths.push('Telefon w międzynarodowym formacie');
  }

  // 1. TEST: Template compatibility
  if (templateId && templateId !== 'ats') {
    // ATSTemplate is always 100% compatible
    // Other templates may have issues
    const templateIssues = checkTemplateCompatibility(templateId);
    if (templateIssues.length > 0) {
      issues.push(...templateIssues);
      score -= templateIssues.reduce((sum, issue) => sum + issue.deduction, 0);
    } else {
      strengths.push('Szablon zgodny z ATS');
    }
  } else {
    strengths.push('Używasz szablonu zoptymalizowanego pod ATS');
  }

  // 2. TEST: Contact information completeness
  const contactIssues = checkContactInfo(cvData);
  if (contactIssues.length > 0) {
    issues.push(...contactIssues);
    score -= contactIssues.reduce((sum, issue) => sum + issue.deduction, 0);
  } else {
    strengths.push('Kompletne dane kontaktowe');
  }

  // 3. TEST: Professional summary
  const summaryIssues = checkSummary(cvData);
  if (summaryIssues.length > 0) {
    issues.push(...summaryIssues);
    score -= summaryIssues.reduce((sum, issue) => sum + issue.deduction, 0);
  } else {
    strengths.push('Dobrze napisane podsumowanie');
  }

  // 4. TEST: Experience section
  const experienceIssues = checkExperience(cvData);
  if (experienceIssues.length > 0) {
    issues.push(...experienceIssues);
    score -= experienceIssues.reduce((sum, issue) => sum + issue.deduction, 0);
  } else {
    strengths.push('Doświadczenie zawodowe dobrze opisane');
  }

  // 5. TEST: Education section
  const educationIssues = checkEducation(cvData);
  if (educationIssues.length > 0) {
    issues.push(...educationIssues);
    score -= educationIssues.reduce((sum, issue) => sum + issue.deduction, 0);
  } else {
    strengths.push('Wykształcenie poprawnie uzupełnione');
  }

  // 6. TEST: Skills and keywords
  const skillsIssues = checkSkills(cvData);
  if (skillsIssues.length > 0) {
    issues.push(...skillsIssues);
    score -= skillsIssues.reduce((sum, issue) => sum + issue.deduction, 0);
  } else {
    strengths.push('Umiejętności dobrze zdefiniowane');
  }

  // 7. TEST: File format and structure
  const structureIssues = checkStructure(cvData);
  if (structureIssues.length > 0) {
    issues.push(...structureIssues);
    score -= structureIssues.reduce((sum, issue) => sum + issue.deduction, 0);
  } else {
    strengths.push('Prawidłowa struktura CV');
  }

  // 8. TEST: Length and readability
  const lengthIssues = checkLength(cvData);
  if (lengthIssues.length > 0) {
    issues.push(...lengthIssues);
    score -= lengthIssues.reduce((sum, issue) => sum + issue.deduction, 0);
  } else {
    strengths.push('Odpowiednia długość CV');
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score));

  // Determine grade
  const grade = getGrade(score);

  // Generate summary
  const summary = generateSummary(score, issues.length, strengths.length);

  // Calculate total deductions
  const totalDeductions = issues.reduce((sum, issue) => sum + issue.deduction, 0);

  // Group deductions by category
  const categoryBreakdown = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + issue.deduction;
    return acc;
  }, {} as Record<string, number>);

  return {
    score,
    grade,
    issues: issues.sort((a, b) => {
      const severityOrder = { critical: 0, warning: 1, suggestion: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    }),
    strengths,
    summary,
    totalDeductions,
    categoryBreakdown,
  };
};

/**
 * Check RODO compliance (Polish legal requirement)
 * RODO = GDPR in Poland - mandatory consent clause
 */
const checkRODOCompliance = (cvData: CVData): ATSIssue[] => {
  const issues: ATSIssue[] = [];

  // Check if any text field contains RODO keywords
  const allText = JSON.stringify(cvData).toLowerCase();
  const rodoKeywords = [
    'wyrażam zgodę',
    'przetwarzanie danych',
    'rodo',
    'ochrona danych osobowych',
    'zgodnie z ustawą',
    'rozporządzeniem parlamentu europejskiego',
  ];

  const hasRODO = rodoKeywords.some(keyword => allText.includes(keyword));

  if (!hasRODO) {
    issues.push({
      severity: 'critical',
      category: 'legal',
      title: 'Brak klauzuli RODO (wymagane w Polsce)',
      description: 'Systemy rekrutacyjne w Polsce wymagają zgody na przetwarzanie danych osobowych zgodnie z RODO',
      recommendation: 'Dodaj na końcu CV: "Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w mojej ofercie pracy dla potrzeb niezbędnych do realizacji procesu rekrutacji (zgodnie z ustawą z dnia 10 maja 2018 roku o ochronie danych osobowych oraz zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. - RODO)."',
      deduction: 10,
    });
  }

  return issues;
};

/**
 * Check Polish date format standards
 * Preferred formats: MM.YYYY, Marzec 2020, Mar 2020
 */
const checkPolishDateFormat = (cvData: CVData): ATSIssue[] => {
  const issues: ATSIssue[] = [];
  const { experience } = cvData;

  // Polish standard formats
  const validFormats = [
    /^\d{2}\.\d{4}$/,                           // 03.2020
    /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+ \d{4}$/,   // Marzec 2020
    /^[A-Z][a-z]{2} \d{4}$/,                   // Mar 2020
    /^\d{4}-\d{2}$/,                           // 2020-03 (acceptable)
  ];

  const invalidDates: Array<{ position: string; date: string }> = [];

  experience.forEach((exp) => {
    const dates = [
      { value: exp.startDate, label: 'data rozpoczęcia' },
      { value: exp.endDate, label: 'data zakończenia' },
    ];

    dates.forEach(({ value, label }) => {
      if (value && !validFormats.some(regex => regex.test(value))) {
        invalidDates.push({ position: exp.position, date: value });
      }
    });
  });

  if (invalidDates.length > 0) {
    // Group all date issues into one
    const examples = invalidDates.slice(0, 2).map(d => `"${d.date}"`).join(', ');
    issues.push({
      severity: 'suggestion',
      category: 'polish-market',
      title: 'Niestandardowy format daty',
      description: `Znaleziono ${invalidDates.length} dat w nietypowym formacie (np. ${examples})`,
      recommendation: 'Użyj jednego z formatów: "03.2020", "Marzec 2020" lub "Mar 2020" dla lepszej kompatybilności z polskimi ATS',
      deduction: Math.min(5, invalidDates.length * 2), // max 5 points
    });
  }

  return issues;
};

/**
 * Check international phone format
 * Polish market best practice: +48 XXX XXX XXX
 */
const checkPhoneFormat = (cvData: CVData): ATSIssue[] => {
  const issues: ATSIssue[] = [];
  const phone = cvData.personal?.phone || '';

  if (!phone) return issues; // Already handled by checkContactInfo

  // International format with country code
  const internationalFormat = /^\+\d{1,3}\s?\d{3}\s?\d{3}\s?\d{3}$/;
  const polishFormat = /^\+48\s?\d{3}\s?\d{3}\s?\d{3}$/;

  const hasCountryCode = phone.startsWith('+');
  const isInternational = internationalFormat.test(phone);

  if (!hasCountryCode) {
    issues.push({
      severity: 'warning',
      category: 'polish-market',
      title: 'Telefon bez kodu kraju',
      description: 'Dla aplikacji międzynarodowych zalecany jest format z kodem kraju',
      recommendation: 'Zmień format na: +48 XXX XXX XXX (dla Polski) lub +XX dla innych krajów',
      deduction: 3,
    });
  } else if (!isInternational) {
    issues.push({
      severity: 'suggestion',
      category: 'polish-market',
      title: 'Niestandardowy format telefonu',
      description: 'Format telefonu może nie być rozpoznany przez niektóre systemy ATS',
      recommendation: 'Użyj standardowego formatu: +48 123 456 789 (z odstępami)',
      deduction: 2,
    });
  }

  return issues;
};

/**
 * Check template ATS compatibility
 */
const checkTemplateCompatibility = (templateId: string): ATSIssue[] => {
  const issues: ATSIssue[] = [];

  // Templates with potential ATS issues
  const problematicTemplates: Record<string, string> = {
    creative: 'Szablon kreatywny może zawierać grafiki i nietypową strukturę',
    modern: 'Szablon nowoczesny może używać niestandardowych czcionek',
  };

  if (problematicTemplates[templateId]) {
    issues.push({
      severity: 'warning',
      category: 'format',
      title: 'Szablon może mieć problemy z ATS',
      description: problematicTemplates[templateId],
      recommendation: 'Rozważ użycie szablonu "ATS-Friendly" dla maksymalnej kompatybilności',
      deduction: 5,
    });
  }

  return issues;
};

/**
 * Check contact information
 */
const checkContactInfo = (cvData: CVData): ATSIssue[] => {
  const issues: ATSIssue[] = [];
  const { personal } = cvData;

  if (!personal.fullName || personal.fullName.trim().length < 3) {
    issues.push({
      severity: 'critical',
      category: 'content',
      title: 'Brak imienia i nazwiska',
      description: 'ATS wymaga pełnego imienia i nazwiska',
      recommendation: 'Uzupełnij pole "Imię i nazwisko"',
      deduction: 10,
    });
  }

  if (!personal.email || !personal.email.includes('@')) {
    issues.push({
      severity: 'critical',
      category: 'content',
      title: 'Brak adresu email',
      description: 'Email jest wymagany przez wszystkie systemy ATS',
      recommendation: 'Dodaj poprawny adres email',
      deduction: 10,
    });
  }

  if (!personal.phone || personal.phone.length < 9) {
    issues.push({
      severity: 'warning',
      category: 'content',
      title: 'Brak numeru telefonu',
      description: 'Większość rekruterów oczekuje numeru telefonu',
      recommendation: 'Dodaj numer telefonu kontaktowy',
      deduction: 5,
    });
  }

  if (!personal.address || personal.address.length < 5) {
    issues.push({
      severity: 'warning',
      category: 'content',
      title: 'Brak lokalizacji',
      description: 'Lokalizacja pomaga ATS w dopasowaniu do ofert w Twojej okolicy',
      recommendation: 'Dodaj miasto i kraj (np. "Warszawa, Polska")',
      deduction: 5,
    });
  }

  return issues;
};

/**
 * Check professional summary
 */
const checkSummary = (cvData: CVData): ATSIssue[] => {
  const issues: ATSIssue[] = [];
  const summary = cvData.personal.summary || '';

  if (!summary || summary.trim().length === 0) {
    issues.push({
      severity: 'warning',
      category: 'content',
      title: 'Brak podsumowania zawodowego',
      description: 'ATS często priorytetyzuje CV z podsumowaniem',
      recommendation: 'Dodaj krótkie podsumowanie (2-4 zdania) opisujące Twoje doświadczenie',
      deduction: 8,
    });
  } else if (summary.length < 100) {
    issues.push({
      severity: 'suggestion',
      category: 'content',
      title: 'Podsumowanie zbyt krótkie',
      description: 'Krótkie podsumowanie może nie zawierać kluczowych słów',
      recommendation: 'Rozszerz podsumowanie do 150-300 znaków, dodając kluczowe umiejętności',
      deduction: 3,
    });
  } else if (summary.length > 600) {
    issues.push({
      severity: 'suggestion',
      category: 'content',
      title: 'Podsumowanie zbyt długie',
      description: 'ATS może obciąć zbyt długie podsumowania',
      recommendation: 'Skróć podsumowanie do maksymalnie 400 znaków',
      deduction: 3,
    });
  }

  return issues;
};

/**
 * Check experience section
 */
const checkExperience = (cvData: CVData): ATSIssue[] => {
  const issues: ATSIssue[] = [];
  const { experience } = cvData;

  if (experience.length === 0) {
    issues.push({
      severity: 'critical',
      category: 'content',
      title: 'Brak doświadczenia zawodowego',
      description: 'Sekcja doświadczenia jest kluczowa dla ATS',
      recommendation: 'Dodaj przynajmniej jedno doświadczenie zawodowe',
      deduction: 10,
    });
    return issues;
  }

  // Check for missing dates
  experience.forEach((exp, idx) => {
    if (!exp.startDate) {
      issues.push({
        severity: 'warning',
        category: 'content',
        title: `Brak daty rozpoczęcia w pozycji "${exp.position}"`,
        description: 'ATS wymaga dat do sortowania chronologicznego',
        recommendation: 'Dodaj datę rozpoczęcia (format: YYYY-MM)',
        deduction: 6,
      });
    }

    if (!exp.current && !exp.endDate) {
      issues.push({
        severity: 'warning',
        category: 'content',
        title: `Brak daty zakończenia w pozycji "${exp.position}"`,
        description: 'Jeśli nie pracujesz już na tym stanowisku, dodaj datę zakończenia',
        recommendation: 'Dodaj datę zakończenia lub zaznacz "Obecnie"',
        deduction: 5,
      });
    }

    if (!exp.description || exp.description.length < 50) {
      issues.push({
        severity: 'suggestion',
        category: 'content',
        title: `Zbyt krótki opis dla "${exp.position}"`,
        description: 'Krótkie opisy nie zawierają słów kluczowych',
        recommendation: 'Rozszerz opis do 100-300 znaków, dodając kluczowe osiągnięcia',
        deduction: 3,
      });
    }

    if (exp.achievements.length === 0) {
      issues.push({
        severity: 'suggestion',
        category: 'content',
        title: `Brak osiągnięć dla "${exp.position}"`,
        description: 'Osiągnięcia zwiększają szanse na wysoką ocenę ATS',
        recommendation: 'Dodaj 2-4 punkty z konkretnymi osiągnięciami i metrykami',
        deduction: 3,
      });
    }
  });

  return issues;
};

/**
 * Check education section
 */
const checkEducation = (cvData: CVData): ATSIssue[] => {
  const issues: ATSIssue[] = [];
  const { education } = cvData;

  if (education.length === 0) {
    issues.push({
      severity: 'warning',
      category: 'content',
      title: 'Brak wykształcenia',
      description: 'Większość ofert pracy wymaga informacji o wykształceniu',
      recommendation: 'Dodaj przynajmniej jeden wpis z wykształceniem',
      deduction: 7,
    });
    return issues;
  }

  education.forEach((edu) => {
    if (!edu.degree || edu.degree.length < 3) {
      issues.push({
        severity: 'warning',
        category: 'content',
        title: 'Brak tytułu/stopnia naukowego',
        description: 'ATS wymaga pełnej nazwy stopnia (np. "Magister", "Licencjat")',
        recommendation: 'Podaj pełną nazwę stopnia (nie skrót)',
        deduction: 5,
      });
    }

    if (!edu.fieldOfStudy || edu.fieldOfStudy.length < 3) {
      issues.push({
        severity: 'suggestion',
        category: 'content',
        title: 'Brak kierunku studiów',
        description: 'Kierunek studiów pomaga ATS w dopasowaniu do oferty',
        recommendation: 'Dodaj kierunek studiów (np. "Informatyka", "Marketing")',
        deduction: 3,
      });
    }
  });

  return issues;
};

/**
 * Check skills section
 */
const checkSkills = (cvData: CVData): ATSIssue[] => {
  const issues: ATSIssue[] = [];
  const { skills } = cvData;

  if (skills.length === 0) {
    issues.push({
      severity: 'critical',
      category: 'keywords',
      title: 'Brak umiejętności',
      description: 'ATS dopasowuje CV na podstawie słów kluczowych z umiejętności',
      recommendation: 'Dodaj przynajmniej 5-10 kluczowych umiejętności',
      deduction: 10,
    });
    return issues;
  }

  if (skills.length < 5) {
    issues.push({
      severity: 'warning',
      category: 'keywords',
      title: 'Za mało umiejętności',
      description: 'Tylko ' + skills.length + ' umiejętności może być niewystarczające',
      recommendation: 'Dodaj więcej umiejętności (zalecane: 10-15)',
      deduction: 6,
    });
  }

  if (skills.length > 30) {
    issues.push({
      severity: 'suggestion',
      category: 'keywords',
      title: 'Zbyt wiele umiejętności',
      description: 'Zbyt długa lista może rozwodnić kluczowe kompetencje',
      recommendation: 'Ogranicz do 15-20 najważniejszych umiejętności',
      deduction: 3,
    });
  }

  // Check for technical skills
  const technicalSkills = skills.filter(s => s.category === 'technical');
  if (technicalSkills.length === 0) {
    issues.push({
      severity: 'suggestion',
      category: 'keywords',
      title: 'Brak umiejętności technicznych',
      description: 'Większość ofert wymaga konkretnych technologii',
      recommendation: 'Dodaj umiejętności techniczne (języki, narzędzia, technologie)',
      deduction: 3,
    });
  }

  return issues;
};

/**
 * Check overall structure
 */
const checkStructure = (cvData: CVData): ATSIssue[] => {
  const issues: ATSIssue[] = [];

  // Check if photo is included (can cause ATS issues)
  if (cvData.personal.photo) {
    issues.push({
      severity: 'warning',
      category: 'format',
      title: 'CV zawiera zdjęcie',
      description: 'Większość systemów ATS (60-70%) nie przetwarza zdjęć - tracisz miejsce na treść',
      recommendation: 'Usuń zdjęcie z CV. Dodaj je opcjonalnie jako osobny załącznik lub na LinkedIn',
      deduction: 5,
      aiSuggestion: 'Zdjęcia profilowe są standardem w LinkedIn, ale w CV (szczególnie dla aplikacji w USA, UK) są nieprofesjonalne i blokują ATS parsing.',
    });
  }

  // Check section order (recommended: personal, summary, experience, education, skills)
  const hasProperOrder =
    cvData.experience.length > 0 &&
    cvData.education.length > 0 &&
    cvData.skills.length > 0;

  if (!hasProperOrder) {
    issues.push({
      severity: 'suggestion',
      category: 'structure',
      title: 'Niepełna struktura CV',
      description: 'Brakuje standardowych sekcji (Doświadczenie, Wykształcenie, Umiejętności)',
      recommendation: 'Uzupełnij wszystkie sekcje dla lepszej oceny ATS',
      deduction: 3,
    });
  }

  return issues;
};

/**
 * Check CV length
 */
const checkLength = (cvData: CVData): ATSIssue[] => {
  const issues: ATSIssue[] = [];

  // Estimate total length
  const summaryLength = cvData.personal.summary?.length || 0;
  const experienceLength = cvData.experience.reduce((total, exp) =>
    total + (exp.description?.length || 0) + exp.achievements.join('').length, 0);
  const totalLength = summaryLength + experienceLength;

  if (totalLength < 300) {
    issues.push({
      severity: 'warning',
      category: 'content',
      title: 'CV zbyt krótkie',
      description: 'Krótkie CV może nie zawierać wystarczających słów kluczowych',
      recommendation: 'Rozszerz opisy doświadczenia i dodaj konkretne osiągnięcia',
      deduction: 6,
    });
  }

  if (totalLength > 5000) {
    issues.push({
      severity: 'suggestion',
      category: 'content',
      title: 'CV bardzo długie',
      description: 'Zbyt długie CV może być trudne do przeanalizowania przez ATS',
      recommendation: 'Skróć opisy, skup się na najważniejszych osiągnięciach',
      deduction: 3,
    });
  }

  // Check experience count
  if (cvData.experience.length > 10) {
    issues.push({
      severity: 'suggestion',
      category: 'structure',
      title: 'Zbyt wiele stanowisk',
      description: 'Ponad 10 stanowisk może wskazywać na częste zmiany pracy',
      recommendation: 'Skup się na ostatnich 10 latach doświadczenia',
      deduction: 3,
    });
  }

  return issues;
};

/**
 * Get letter grade based on score
 */
const getGrade = (score: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' => {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Fair';
  return 'Poor';
};

/**
 * Generate summary text
 */
const generateSummary = (score: number, issuesCount: number, strengthsCount: number): string => {
  if (score >= 90) {
    return `Świetnie! Twoje CV jest bardzo dobrze przygotowane pod kątem ATS. ${strengthsCount > 0 ? `Wykryto ${strengthsCount} mocnych stron.` : ''} ${issuesCount > 0 ? `Możesz jeszcze poprawić ${issuesCount} drobnych szczegółów.` : 'Brak istotnych problemów.'}`;
  }

  if (score >= 75) {
    return `Dobrze! Twoje CV jest w większości zgodne z wymaganiami ATS. Wykryto ${issuesCount} obszarów do poprawy, które zwiększą Twoje szanse na przejście przez filtry ATS.`;
  }

  if (score >= 60) {
    return `Nieźle, ale jest miejsce na poprawę. Wykryto ${issuesCount} problemów, które mogą wpłynąć na widoczność Twojego CV w systemach ATS. Zacznij od krytycznych błędów.`;
  }

  return `Twoje CV wymaga poprawek. Wykryto ${issuesCount} problemów, które mogą uniemożliwić prawidłowe przetworzenie przez ATS. Najpierw usuń krytyczne błędy.`;
};

/**
 * Get recommendations for improving ATS score
 */
export const getATSRecommendations = (): string[] => {
  return [
    'Używaj standardowych nazw sekcji (Doświadczenie, Wykształcenie, Umiejętności)',
    'Dodaj słowa kluczowe z ogłoszenia o pracę',
    'Unikaj tabel, kolumn i nietypowych formatowań',
    'Używaj standardowych czcionek (Arial, Calibri, Times New Roman)',
    'Zapisuj jako .pdf lub .docx (nie .jpg, .png)',
    'Umieść dane kontaktowe w treści CV (nie w nagłówku/stopce)',
    'Używaj pełnych nazw (nie skrótów) dla stopni naukowych i stanowisk',
    'Dodaj konkretne osiągnięcia z metrykami (np. "Zwiększyłem sprzedaż o 30%")',
    'Unikaj grafik, wykresów i zdjęć (mogą nie być odczytane)',
    'Używaj prostych wypunktowań (•) zamiast specjalnych symboli',
  ];
};

// ═════════════════════════════════════════════════════════════
// AI ENHANCEMENT FUNCTIONS (TODO: Phase 2)
// ═════════════════════════════════════════════════════════════

/**
 * TODO: Analyze bullet point quality using AI
 *
 * Will check for:
 * - Weak action verbs ("responsible for" vs "led")
 * - Missing metrics/numbers
 * - STAR method compliance
 * - Generate improved versions
 *
 * @example
 * const analysis = await analyzeBulletQuality([
 *   "Responsible for team management",
 *   "Led 5-person team, increasing productivity by 40%"
 * ]);
 * // Returns scores + improved versions
 */
// export async function analyzeBulletQuality(bullets: string[]): Promise<BulletAnalysis[]>

/**
 * TODO: Match CV with job description using AI
 *
 * Will extract keywords from JD and compare with CV content
 *
 * @example
 * const match = await matchWithJobDescription(cvData, jobDescriptionText);
 * // Returns: { score: 75, missingKeywords: [...], suggestions: [...] }
 */
// export async function matchWithJobDescription(cvData: CVData, jd: string): Promise<JDMatch>
