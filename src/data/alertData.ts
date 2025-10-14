// Alert System - Constants for Companies, Levels, and Categories

export interface Company {
  id: string;
  name: string;
  tooltip: string;
}

export interface ExperienceLevel {
  id: string;
  name: string;
  description: string;
}

export interface JobPosition {
  id: string;
  name: string;
}

export interface JobCategoryGroup {
  id: string;
  name: string;
  positions: JobPosition[];
}

// 20 Companies from B2B Analytics
export const COMPANIES: Company[] = [
  { id: 'google-poland', name: 'Google Poland', tooltip: 'IT Services - Enterprise - Warszawa' },
  { id: 'microsoft-poland', name: 'Microsoft Poland', tooltip: 'IT Services - Enterprise - Warszawa' },
  { id: 'meta-poland', name: 'Meta Poland', tooltip: 'IT Services - Large - Warszawa' },
  { id: 'amazon-poland', name: 'Amazon Poland', tooltip: 'E-commerce/Tech - Enterprise - Warszawa' },
  { id: 'ibm-poland', name: 'IBM Poland', tooltip: 'IT Services - Enterprise - Kraków' },
  { id: 'accenture-poland', name: 'Accenture Poland', tooltip: 'Consulting/IT - Enterprise - Warszawa' },
  { id: 'deloitte-poland', name: 'Deloitte Poland', tooltip: 'Consulting - Enterprise - Warszawa' },
  { id: 'pwc-poland', name: 'PwC Poland', tooltip: 'Consulting - Enterprise - Warszawa' },
  { id: 'kpmg-poland', name: 'KPMG Poland', tooltip: 'Consulting - Enterprise - Warszawa' },
  { id: 'ey-poland', name: 'EY Poland', tooltip: 'Consulting - Enterprise - Warszawa' },
  { id: 'luxmed', name: 'Luxmed', tooltip: 'Healthcare - Large - Warszawa' },
  { id: 'medicover', name: 'Medicover', tooltip: 'Healthcare - Large - Warszawa' },
  { id: 'allegro', name: 'Allegro', tooltip: 'E-commerce - Large - Poznań' },
  { id: 'inpost', name: 'InPost', tooltip: 'Logistics - Large - Kraków' },
  { id: 'cd-projekt-red', name: 'CD Projekt Red', tooltip: 'Gaming - Medium - Warszawa' },
  { id: 'revolut', name: 'Revolut', tooltip: 'FinTech - Large - Kraków' },
  { id: 'n26', name: 'N26', tooltip: 'FinTech - Large - Warszawa' },
  { id: 'wise', name: 'Wise', tooltip: 'FinTech - Large - Warszawa' },
  { id: 'wolt', name: 'Wolt', tooltip: 'Food Delivery - Medium - Warszawa' },
  { id: 'bolt', name: 'Bolt', tooltip: 'Mobility - Large - Warszawa' },
];

// 7 Experience Levels
export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  {
    id: 'stazysta-praktykant',
    name: 'Stażysta/Praktykant',
    description: 'Brak doświadczenia lub pierwsze praktyki zawodowe. Idealnie dla studentów.',
  },
  {
    id: 'junior',
    name: 'Junior',
    description: '0-2 lata doświadczenia. Praca pod nadzorem, rozwój fundamentalnych umiejętności.',
  },
  {
    id: 'mid-regular',
    name: 'Mid/Regular',
    description: '2-5 lat doświadczenia. Samodzielne realizowanie projektów, średnia złożoność.',
  },
  {
    id: 'senior',
    name: 'Senior',
    description: '5-8 lat doświadczenia. Ekspert techniczny, mentor, złożone problemy biznesowe.',
  },
  {
    id: 'lead-principal',
    name: 'Lead/Principal',
    description: '8+ lat doświadczenia. Lider techniczny, kluczowe decyzje architektoniczne.',
  },
  {
    id: 'manager-head',
    name: 'Manager/Head',
    description: 'Zarządzanie zespołami (5-20 osób), strategia działu, budżety.',
  },
  {
    id: 'director-vp-c-level',
    name: 'Director/VP/C-level',
    description: 'Top management - strategia firmy, wielooddziałowe zarządzanie, wyniki biznesowe.',
  },
];

// 16 Job Category Groups with 77 Positions Total
export const JOB_CATEGORIES: JobCategoryGroup[] = [
  {
    id: 'it-software-engineering',
    name: '🖥️ IT - Software Engineering',
    positions: [
      { id: 'frontend-developer', name: 'Frontend Developer' },
      { id: 'backend-developer', name: 'Backend Developer' },
      { id: 'fullstack-developer', name: 'Full Stack Developer' },
      { id: 'software-engineer', name: 'Software Engineer' },
      { id: 'mobile-developer', name: 'Mobile Developer (iOS/Android)' },
      { id: 'game-developer', name: 'Game Developer' },
    ],
  },
  {
    id: 'it-devops-cloud',
    name: '☁️ IT - DevOps & Cloud',
    positions: [
      { id: 'devops-engineer', name: 'DevOps Engineer' },
      { id: 'cloud-engineer', name: 'Cloud Engineer (AWS/Azure/GCP)' },
      { id: 'site-reliability-engineer', name: 'Site Reliability Engineer (SRE)' },
      { id: 'infrastructure-engineer', name: 'Infrastructure Engineer' },
    ],
  },
  {
    id: 'it-data-ai',
    name: '🤖 IT - Data & AI',
    positions: [
      { id: 'data-engineer', name: 'Data Engineer' },
      { id: 'data-scientist', name: 'Data Scientist' },
      { id: 'data-analyst', name: 'Data Analyst' },
      { id: 'machine-learning-engineer', name: 'Machine Learning Engineer' },
      { id: 'ai-engineer', name: 'AI Engineer' },
      { id: 'bi-analyst', name: 'BI Analyst' },
    ],
  },
  {
    id: 'it-qa-testing',
    name: '🧪 IT - QA & Testing',
    positions: [
      { id: 'qa-engineer', name: 'QA Engineer' },
      { id: 'qa-automation-engineer', name: 'QA Automation Engineer' },
      { id: 'manual-tester', name: 'Manual Tester' },
      { id: 'performance-tester', name: 'Performance Tester' },
    ],
  },
  {
    id: 'it-security',
    name: '🔒 IT - Security',
    positions: [
      { id: 'security-engineer', name: 'Security Engineer' },
      { id: 'cybersecurity-analyst', name: 'Cybersecurity Analyst' },
      { id: 'penetration-tester', name: 'Penetration Tester' },
      { id: 'security-architect', name: 'Security Architect' },
    ],
  },
  {
    id: 'it-product-project',
    name: '📋 IT - Product & Project Management',
    positions: [
      { id: 'product-manager', name: 'Product Manager' },
      { id: 'product-owner', name: 'Product Owner' },
      { id: 'project-manager', name: 'Project Manager' },
      { id: 'scrum-master', name: 'Scrum Master' },
      { id: 'business-analyst', name: 'Business Analyst' },
    ],
  },
  {
    id: 'it-design',
    name: '🎨 IT - Design',
    positions: [
      { id: 'ux-ui-designer', name: 'UX/UI Designer' },
      { id: 'product-designer', name: 'Product Designer' },
      { id: 'graphic-designer', name: 'Graphic Designer' },
      { id: 'ux-researcher', name: 'UX Researcher' },
    ],
  },
  {
    id: 'hr-recruitment',
    name: '👥 HR & Recruitment',
    positions: [
      { id: 'hr-specialist', name: 'HR Specialist' },
      { id: 'recruiter', name: 'Recruiter' },
      { id: 'talent-acquisition-specialist', name: 'Talent Acquisition Specialist' },
      { id: 'hr-business-partner', name: 'HR Business Partner' },
      { id: 'hr-manager', name: 'HR Manager' },
    ],
  },
  {
    id: 'finance-accounting',
    name: '💰 Finance & Accounting',
    positions: [
      { id: 'accountant', name: 'Accountant' },
      { id: 'financial-analyst', name: 'Financial Analyst' },
      { id: 'finance-controller', name: 'Finance Controller' },
      { id: 'cfo', name: 'CFO (Chief Financial Officer)' },
      { id: 'bookkeeper', name: 'Bookkeeper' },
    ],
  },
  {
    id: 'sales-business-development',
    name: '📈 Sales & Business Development',
    positions: [
      { id: 'sales-manager', name: 'Sales Manager' },
      { id: 'account-manager', name: 'Account Manager' },
      { id: 'business-development-manager', name: 'Business Development Manager' },
      { id: 'sales-representative', name: 'Sales Representative' },
      { id: 'key-account-manager', name: 'Key Account Manager' },
    ],
  },
  {
    id: 'marketing',
    name: '📣 Marketing',
    positions: [
      { id: 'marketing-manager', name: 'Marketing Manager' },
      { id: 'digital-marketing-specialist', name: 'Digital Marketing Specialist' },
      { id: 'content-marketing-specialist', name: 'Content Marketing Specialist' },
      { id: 'seo-sem-specialist', name: 'SEO/SEM Specialist' },
      { id: 'social-media-manager', name: 'Social Media Manager' },
      { id: 'growth-hacker', name: 'Growth Hacker' },
    ],
  },
  {
    id: 'customer-success',
    name: '🤝 Customer Success & Support',
    positions: [
      { id: 'customer-success-manager', name: 'Customer Success Manager' },
      { id: 'customer-support-specialist', name: 'Customer Support Specialist' },
      { id: 'technical-support-specialist', name: 'Technical Support Specialist' },
      { id: 'account-executive', name: 'Account Executive' },
    ],
  },
  {
    id: 'operations-logistics',
    name: '🚚 Operations & Logistics',
    positions: [
      { id: 'operations-manager', name: 'Operations Manager' },
      { id: 'supply-chain-manager', name: 'Supply Chain Manager' },
      { id: 'logistics-coordinator', name: 'Logistics Coordinator' },
      { id: 'warehouse-manager', name: 'Warehouse Manager' },
    ],
  },
  {
    id: 'legal',
    name: '⚖️ Legal',
    positions: [
      { id: 'legal-counsel', name: 'Legal Counsel' },
      { id: 'corporate-lawyer', name: 'Corporate Lawyer' },
      { id: 'compliance-officer', name: 'Compliance Officer' },
    ],
  },
  {
    id: 'consulting',
    name: '💼 Consulting',
    positions: [
      { id: 'management-consultant', name: 'Management Consultant' },
      { id: 'strategy-consultant', name: 'Strategy Consultant' },
      { id: 'it-consultant', name: 'IT Consultant' },
      { id: 'business-consultant', name: 'Business Consultant' },
    ],
  },
  {
    id: 'other',
    name: '🔧 Other',
    positions: [
      { id: 'office-manager', name: 'Office Manager' },
      { id: 'executive-assistant', name: 'Executive Assistant' },
      { id: 'administrative-assistant', name: 'Administrative Assistant' },
      { id: 'receptionist', name: 'Receptionist' },
    ],
  },
];
