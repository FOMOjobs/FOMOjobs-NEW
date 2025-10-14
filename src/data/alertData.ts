// Alert System - Constants for Companies, Levels, and Categories
// EXACT DATA matching production requirements

export interface Company {
  id: number;
  name: string;
  tooltip: string;
}

export interface ExperienceLevel {
  id: number;
  name: string;
  tooltip: string;
}

export interface JobPosition {
  id: number;
  name: string;
  count: number;
}

export interface JobCategoryGroup {
  groupId: string;
  groupName: string;
  positions: JobPosition[];
}

// 20 Real Companies from Kraków with exact names and tooltips
export const COMPANIES: Company[] = [
  {
    id: 6,
    name: 'Capgemini Polska',
    tooltip: 'Outsourcing IT i procesów biznesowych, konsulting'
  },
  {
    id: 7,
    name: 'Comarch S.A.',
    tooltip: 'Oprogramowanie i systemy IT, ERP'
  },
  {
    id: 8,
    name: 'HSBC',
    tooltip: 'Bankowość międzynarodowa, finanse'
  },
  {
    id: 9,
    name: 'Shell Business Operations',
    tooltip: 'Globalne operacje biznesowe, energia'
  },
  {
    id: 10,
    name: 'UBS',
    tooltip: 'Bankowość inwestycyjna, zarządzanie majątkiem'
  },
  {
    id: 11,
    name: 'State Street',
    tooltip: 'Usługi finansowe, zarządzanie aktywami'
  },
  {
    id: 12,
    name: 'IBM',
    tooltip: 'Technologie IT, usługi konsultingowe'
  },
  {
    id: 13,
    name: 'Aptiv',
    tooltip: 'Technologie motoryzacyjne, pojazdy autonomiczne'
  },
  {
    id: 14,
    name: 'Motorola Solutions',
    tooltip: 'Komunikacja radiowa, bezpieczeństwo publiczne'
  },
  {
    id: 15,
    name: 'Biuletyn Informacji Publicznej - Praca Kraków',
    tooltip: 'Praca w Urzędzie Miasta Krakowa'
  },
  {
    id: 16,
    name: 'InPost',
    tooltip: 'Logistyka, paczkomaty, e-commerce'
  },
  {
    id: 17,
    name: 'Philip Morris International',
    tooltip: 'Produkcja wyrobów tytoniowych, FMCG'
  },
  {
    id: 18,
    name: 'EPAM Systems',
    tooltip: 'Rozwój oprogramowania, outsourcing IT'
  },
  {
    id: 19,
    name: 'Sabre Corporation',
    tooltip: 'Technologie dla turystyki i lotnictwa'
  },
  {
    id: 20,
    name: 'HCLTech',
    tooltip: 'IT, outsourcing, transformacja cyfrowa'
  },
  {
    id: 21,
    name: 'Brown Brothers Harriman',
    tooltip: 'Usługi finansowe, bankowość prywatna'
  },
  {
    id: 22,
    name: 'PepsiCo Global Business Services',
    tooltip: 'Shared services, finanse, HR'
  },
  {
    id: 23,
    name: 'ASSA ABLOY',
    tooltip: 'Technologie bezpieczeństwa, kontrola dostępu'
  },
  {
    id: 24,
    name: 'PZU SA',
    tooltip: 'Ubezpieczenia, finanse'
  },
  {
    id: 26,
    name: 'Nokia',
    tooltip: 'Telekomunikacja, infrastruktura sieciowa'
  }
];

// 7 Experience Levels with examples in tooltips
export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  {
    id: 1,
    name: 'Entry level / Stażysta(ka)',
    tooltip: 'np. Stażysta(ka) ds. marketingu internetowego, Stażysta(ka) ds. księgowości'
  },
  {
    id: 2,
    name: 'Junior / Młodszy(a)...',
    tooltip: 'np. Junior Java Developer, Młodsza Specjalistka ds. SEO'
  },
  {
    id: 3,
    name: 'Mid level / Specjalista(ka)',
    tooltip: 'np. Specjalistka ds. Social Media, Analityk BI'
  },
  {
    id: 4,
    name: 'Senior / Starszy(a)...',
    tooltip: 'np. Starsza Programistka Python, Senior Data Engineer'
  },
  {
    id: 5,
    name: 'Team Leader / Lider(ka)',
    tooltip: 'np. Team Lead frontend, Liderka zespołu Customer Success'
  },
  {
    id: 6,
    name: 'Manager / Menedżer(ka)',
    tooltip: 'np. Product Manager, HR Managerka'
  },
  {
    id: 7,
    name: 'Director / Dyrektor(ka)',
    tooltip: 'np. Marketing Director, Dyrektorka Operacyjna (COO)'
  }
];

// 15 Job Category Groups with 77 total positions (each showing count: 0)
export const JOB_CATEGORIES: JobCategoryGroup[] = [
  {
    groupId: 'hr',
    groupName: 'HR',
    positions: [
      { id: 1, name: 'Rekrutacja', count: 0 },
      { id: 2, name: 'HR Business Partner', count: 0 },
      { id: 3, name: 'Administracja / Szkolenia / Delivery', count: 0 },
      { id: 4, name: 'Płace (Payroll)', count: 0 },
      { id: 5, name: 'Employer branding', count: 0 },
      { id: 69, name: 'Benefity / Total Rewards', count: 0 },
      { id: 73, name: 'Zarządzanie zmianą / Change Management', count: 0 }
    ]
  },
  {
    groupId: 'it',
    groupName: 'IT',
    positions: [
      { id: 6, name: 'IT support / helpdesk', count: 0 },
      { id: 7, name: 'Administracja systemami / siecią', count: 0 },
      { id: 8, name: 'Programowanie Python', count: 0 },
      { id: 9, name: 'Programowanie C', count: 0 },
      { id: 10, name: 'Programowanie C++', count: 0 },
      { id: 11, name: 'Programowanie Java', count: 0 },
      { id: 12, name: 'Programowanie C#', count: 0 },
      { id: 13, name: 'Inne języki programowania (JavaScript, iOS, itd.)', count: 0 },
      { id: 14, name: 'Testowanie / QA', count: 0 },
      { id: 15, name: 'Architektura IT (DevOps & automatyzacja)', count: 0 },
      { id: 16, name: 'Architektura IT (Cloud, AWS, Azure)', count: 0 },
      { id: 17, name: 'Cyberbezpieczeństwo i compliance', count: 0 },
      { id: 18, name: 'Analityka danych / Data Science / AI', count: 0 }
    ]
  },
  {
    groupId: 'finance',
    groupName: 'Finanse, księgowość, rachunkowość',
    positions: [
      { id: 19, name: 'Księgowość AP / AR', count: 0 },
      { id: 20, name: 'Księgowość operacyjna', count: 0 },
      { id: 21, name: 'Rachunkowość GL', count: 0 },
      { id: 22, name: 'Sprawozdawczość Finansowa', count: 0 },
      { id: 23, name: 'Audyt', count: 0 },
      { id: 24, name: 'Controlling', count: 0 },
      { id: 25, name: 'Analityka', count: 0 },
      { id: 26, name: 'Doradztwo finansowe i podatkowe', count: 0 },
      { id: 71, name: 'Procurement / Zakupy', count: 0 },
      { id: 72, name: 'Zarządzanie kontraktami / Contract Management', count: 0 }
    ]
  },
  {
    groupId: 'admin',
    groupName: 'Administracja i biuro',
    positions: [
      { id: 27, name: 'Admin / wsparcie biura', count: 0 },
      { id: 28, name: 'Recepcja / sekretariat', count: 0 },
      { id: 29, name: 'Asystent/ka zarządu', count: 0 },
      { id: 68, name: 'Tłumaczenia i wsparcie językowe', count: 0 },
      { id: 70, name: 'Organizacja wydarzeń', count: 0 }
    ]
  },
  {
    groupId: 'pm',
    groupName: 'Project Management i strategia',
    positions: [
      { id: 30, name: 'Project manager / koordynator', count: 0 },
      { id: 31, name: 'Product owner / Scrum master', count: 0 },
      { id: 32, name: 'Strategia i rozwój', count: 0 }
    ]
  },
  {
    groupId: 'marketing',
    groupName: 'Marketing i komunikacja',
    positions: [
      { id: 33, name: 'Marketing digitalowy', count: 0 },
      { id: 34, name: 'Kampanie i komunikacja', count: 0 },
      { id: 35, name: 'PR i relacje z mediami', count: 0 },
      { id: 36, name: 'Content marketing, social media', count: 0 }
    ]
  },
  {
    groupId: 'sales',
    groupName: 'Obsługa klienta i sprzedaż',
    positions: [
      { id: 37, name: 'Call center, helpdesk', count: 0 },
      { id: 38, name: 'Sprzedaż B2B / B2C', count: 0 },
      { id: 39, name: 'Rozwój biznesu', count: 0 },
      { id: 40, name: 'Account management', count: 0 },
      { id: 41, name: 'SaaS / Customer Success', count: 0 }
    ]
  },
  {
    groupId: 'logistics',
    groupName: 'Logistyka i łańcuch dostaw',
    positions: [
      { id: 42, name: 'Planowanie i zakupy', count: 0 },
      { id: 43, name: 'Zarządzanie dostawami i transportem', count: 0 },
      { id: 44, name: 'Magazynowanie i optymalizacja', count: 0 },
      { id: 45, name: 'Systemy SAP / ERP / MRP', count: 0 },
      { id: 46, name: 'E-commerce logistics', count: 0 }
    ]
  },
  {
    groupId: 'engineering',
    groupName: 'Inżynieria i produkcja',
    positions: [
      { id: 47, name: 'Badania i rozwój (R&D)', count: 0 },
      { id: 48, name: 'Projektowanie techniczne (CAD, CAM, CAE)', count: 0 },
      { id: 49, name: 'Produkcja, jakość i optymalizacja procesów', count: 0 }
    ]
  },
  {
    groupId: 'education',
    groupName: 'Edukacja i rozwój',
    positions: [
      { id: 50, name: 'Szkolenia', count: 0 },
      { id: 51, name: 'Rozwój osobisty', count: 0 },
      { id: 52, name: 'E-learning', count: 0 },
      { id: 53, name: 'Mentoring, coaching', count: 0 },
      { id: 54, name: 'Nauka języków', count: 0 }
    ]
  },
  {
    groupId: 'legal',
    groupName: 'Prawo',
    positions: [
      { id: 55, name: 'Doradztwo prawne i obsługa klienta', count: 0 },
      { id: 56, name: 'Specjalizacja (np. prawo pracy, cywilne, handlowe)', count: 0 },
      { id: 57, name: 'Windykacja i egzekucja należności', count: 0 }
    ]
  },
  {
    groupId: 'realestate',
    groupName: 'Nieruchomości',
    positions: [
      { id: 58, name: 'Zarządzanie nieruchomościami', count: 0 },
      { id: 59, name: 'Obsługa klienta i administracja', count: 0 },
      { id: 60, name: 'Wyceny i analizy rynkowe', count: 0 },
      { id: 61, name: 'Sprzedaż i wynajem', count: 0 }
    ]
  },
  {
    groupId: 'insurance',
    groupName: 'Ubezpieczenia',
    positions: [
      { id: 62, name: 'Obsługa polis i likwidacja szkód', count: 0 },
      { id: 63, name: 'Sprzedaż i doradztwo ubezpieczeniowe', count: 0 },
      { id: 64, name: 'Analityka i zarządzanie ryzykiem', count: 0 }
    ]
  },
  {
    groupId: 'health',
    groupName: 'Zdrowie i lifestyle',
    positions: [
      { id: 65, name: 'Dietetyka', count: 0 },
      { id: 66, name: 'Zdrowie psychiczne', count: 0 },
      { id: 67, name: 'Wellbeing i profilaktyka', count: 0 },
      { id: 74, name: 'Zdrowie ogólne', count: 0 }
    ]
  },
  {
    groupId: 'manual',
    groupName: 'Praca fizyczna i techniczna',
    positions: [
      { id: 75, name: 'Elektryka, instalacje', count: 0 },
      { id: 76, name: 'Magazynowanie', count: 0 },
      { id: 77, name: 'Dostawy, kurierka', count: 0 }
    ]
  }
];
