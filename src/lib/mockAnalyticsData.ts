// Mock data for Analytics dashboard - temporary until Laravel API is ready
// This allows frontend development and preview without backend dependency

export const mockAnalyticsData = {
  total_jobs: 847,
  jobs_growth: 12.5,
  alert_subscribers: 342,
  hiring_velocity: 28,

  // New KPI data
  top_hiring_company: {
    name: 'Capgemini Polska',
    job_count: 156
  },
  top_position: {
    name: 'Senior Java Developer',
    count: 89
  },

  // Competitor cards data
  competitors: [
    {
      id: 1,
      name: 'Capgemini Polska',
      total_jobs: 156,
      active_jobs: 142,
      hiring_velocity: 12,
      alert_subscribers: 89,
      logo_url: null
    },
    {
      id: 2,
      name: 'Comarch S.A.',
      total_jobs: 98,
      active_jobs: 87,
      hiring_velocity: 8,
      alert_subscribers: 67,
      logo_url: null
    },
    {
      id: 3,
      name: 'GlobalLogic Poland',
      total_jobs: 124,
      active_jobs: 115,
      hiring_velocity: 10,
      alert_subscribers: 72,
      logo_url: null
    },
    {
      id: 4,
      name: 'Motorola Solutions',
      total_jobs: 76,
      active_jobs: 68,
      hiring_velocity: 6,
      alert_subscribers: 54,
      logo_url: null
    },
    {
      id: 5,
      name: 'Sabre Polska',
      total_jobs: 82,
      active_jobs: 74,
      hiring_velocity: 7,
      alert_subscribers: 48,
      logo_url: null
    },
    {
      id: 6,
      name: 'State Street',
      total_jobs: 91,
      active_jobs: 83,
      hiring_velocity: 8,
      alert_subscribers: 61,
      logo_url: null
    }
  ],

  // Trending roles
  trending_roles: [
    {
      role: 'Senior Java Developer',
      count: 89,
      growth: 67,
      avg_salary: 16500,
      companies: ['Capgemini Polska', 'Comarch S.A.', 'GlobalLogic Poland', 'Motorola Solutions']
    },
    {
      role: 'Frontend Developer (React)',
      count: 76,
      growth: 54,
      avg_salary: 14000,
      companies: ['GlobalLogic Poland', 'Sabre Polska', 'State Street']
    },
    {
      role: 'DevOps Engineer',
      count: 62,
      growth: 89,
      avg_salary: 17200,
      companies: ['Capgemini Polska', 'Motorola Solutions', 'Sabre Polska']
    },
    {
      role: 'Product Manager',
      count: 45,
      growth: 43,
      avg_salary: 18500,
      companies: ['GlobalLogic Poland', 'State Street', 'Motorola Solutions']
    },
    {
      role: 'QA Engineer',
      count: 54,
      growth: 32,
      avg_salary: 11000,
      companies: ['Comarch S.A.', 'Sabre Polska', 'Capgemini Polska']
    },
    {
      role: 'Data Engineer',
      count: 38,
      growth: 78,
      avg_salary: 16800,
      companies: ['State Street', 'GlobalLogic Poland', 'Capgemini Polska']
    }
  ],

  // Hiring timeline data
  hiring_timeline: [
    { date: '2025-01-01', company: 'Capgemini Polska', jobs_posted: 12 },
    { date: '2025-01-01', company: 'Comarch S.A.', jobs_posted: 8 },
    { date: '2025-01-01', company: 'GlobalLogic Poland', jobs_posted: 10 },
    { date: '2025-01-08', company: 'Capgemini Polska', jobs_posted: 15 },
    { date: '2025-01-08', company: 'Motorola Solutions', jobs_posted: 6 },
    { date: '2025-01-08', company: 'Sabre Polska', jobs_posted: 7 },
    { date: '2025-01-15', company: 'GlobalLogic Poland', jobs_posted: 13 },
    { date: '2025-01-15', company: 'State Street', jobs_posted: 9 },
    { date: '2025-01-15', company: 'Comarch S.A.', jobs_posted: 11 },
  ],

  // Category breakdown
  category_breakdown: [
    { category: 'IT / Development', count: 342, percentage: 40.4 },
    { category: 'Engineering', count: 178, percentage: 21.0 },
    { category: 'Product & Design', count: 127, percentage: 15.0 },
    { category: 'Sales & Marketing', count: 93, percentage: 11.0 },
    { category: 'HR', count: 64, percentage: 7.6 },
    { category: 'Finance', count: 43, percentage: 5.0 }
  ],

  // Salary comparison data
  salary_data: [
    {
      company: 'Motorola Solutions',
      min_salary: 12000,
      max_salary: 20000,
      avg_salary: 16000,
      median_salary: 15500
    },
    {
      company: 'GlobalLogic Poland',
      min_salary: 11000,
      max_salary: 19500,
      avg_salary: 15200,
      median_salary: 14800
    },
    {
      company: 'Capgemini Polska',
      min_salary: 10000,
      max_salary: 18000,
      avg_salary: 14500,
      median_salary: 14200
    },
    {
      company: 'State Street',
      min_salary: 10500,
      max_salary: 17500,
      avg_salary: 14200,
      median_salary: 13800
    },
    {
      company: 'Sabre Polska',
      min_salary: 9500,
      max_salary: 16500,
      avg_salary: 13500,
      median_salary: 13000
    },
    {
      company: 'Comarch S.A.',
      min_salary: 9000,
      max_salary: 16000,
      avg_salary: 12800,
      median_salary: 12500
    }
  ],

  // Location data
  location_data: [
    {
      city: 'Kraków',
      job_count: 487,
      companies: ['Capgemini Polska', 'Comarch S.A.', 'GlobalLogic Poland', 'Motorola Solutions', 'Sabre Polska', 'State Street'],
      growth: 15
    },
    {
      city: 'Warszawa',
      job_count: 234,
      companies: ['Capgemini Polska', 'GlobalLogic Poland', 'State Street'],
      growth: 22
    },
    {
      city: 'Wrocław',
      job_count: 89,
      companies: ['Capgemini Polska', 'Motorola Solutions'],
      growth: 8
    },
    {
      city: 'Remote / Hybrid',
      job_count: 312,
      companies: ['GlobalLogic Poland', 'Sabre Polska', 'State Street', 'Comarch S.A.'],
      growth: 45
    },
    {
      city: 'Katowice',
      job_count: 67,
      companies: ['Capgemini Polska', 'Comarch S.A.'],
      growth: 12
    },
    {
      city: 'Poznań',
      job_count: 54,
      companies: ['Motorola Solutions', 'Capgemini Polska'],
      growth: 18
    }
  ],

  // Alert insights
  alert_insights: {
    total_alerts: 856,
    active_alerts: 734,
    most_tracked_companies: [
      { company: 'Capgemini Polska', subscribers: 89 },
      { company: 'GlobalLogic Poland', subscribers: 72 },
      { company: 'Comarch S.A.', subscribers: 67 },
      { company: 'State Street', subscribers: 61 },
      { company: 'Motorola Solutions', subscribers: 54 },
      { company: 'Sabre Polska', subscribers: 48 }
    ],
    most_tracked_positions: [
      { position: 'Senior Java Developer', alerts_count: 124 },
      { position: 'Frontend Developer (React)', alerts_count: 98 },
      { position: 'DevOps Engineer', alerts_count: 87 },
      { position: 'Product Manager', alerts_count: 76 },
      { position: 'Data Engineer', alerts_count: 65 },
      { position: 'QA Engineer', alerts_count: 54 }
    ]
  }
};

// Mock companies list
export const mockCompanies = [
  { id: 1, name: 'Capgemini Polska' },
  { id: 2, name: 'Comarch S.A.' },
  { id: 3, name: 'GlobalLogic Poland' },
  { id: 4, name: 'Motorola Solutions' },
  { id: 5, name: 'Sabre Polska' },
  { id: 6, name: 'State Street' },
  { id: 7, name: 'Luxoft Poland' },
  { id: 8, name: 'Future Processing' },
  { id: 9, name: 'EPAM Systems' },
  { id: 10, name: 'SoftServe Poland' }
];
