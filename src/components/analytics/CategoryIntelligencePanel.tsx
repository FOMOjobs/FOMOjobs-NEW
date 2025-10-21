import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Target,
  TrendingUp,
  Send,
  BarChart3,
  DollarSign,
  Users,
  MapPin,
  Briefcase,
} from 'lucide-react';

interface CategoryCompany {
  name: string;
  jobCount: number;
  trend: number;
  opportunityLevel: 'high' | 'medium' | 'low';
  avgSalary: number;
}

interface CategoryIntelligence {
  category: string;
  totalJobs: number;
  monthChange: number;
  avgSalary: number;
  companies: CategoryCompany[];
  seniorityBreakdown: Record<string, number>;
  workModeBreakdown: Record<string, number>;
}

const JOB_CATEGORIES = [
  'IT / Software Development',
  'Księgowość / Finanse',
  'Marketing / PR',
  'HR / Rekrutacja',
  'Sales / Sprzedaż',
  'AI / Machine Learning',
  'Data Science / Analytics',
  'DevOps / Cloud',
  'Design / UX',
  'Project Management',
];

// Mock data for category intelligence
const MOCK_CATEGORY_DATA: Record<string, CategoryIntelligence> = {
  'Księgowość / Finanse': {
    category: 'Księgowość / Finanse',
    totalJobs: 312,
    monthChange: 42,
    avgSalary: 8500,
    companies: [
      {
        name: 'Deloitte',
        jobCount: 45,
        trend: 12,
        opportunityLevel: 'high',
        avgSalary: 9500,
      },
      {
        name: 'PwC',
        jobCount: 38,
        trend: 8,
        opportunityLevel: 'high',
        avgSalary: 9200,
      },
      {
        name: 'KPMG',
        jobCount: 32,
        trend: 6,
        opportunityLevel: 'medium',
        avgSalary: 8800,
      },
      {
        name: 'EY',
        jobCount: 28,
        trend: 5,
        opportunityLevel: 'medium',
        avgSalary: 8600,
      },
      {
        name: 'Grant Thornton',
        jobCount: 22,
        trend: 3,
        opportunityLevel: 'medium',
        avgSalary: 7900,
      },
    ],
    seniorityBreakdown: {
      'Junior': 25,
      'Mid': 45,
      'Senior': 30,
    },
    workModeBreakdown: {
      'Remote': 40,
      'Hybrid': 45,
      'Office': 15,
    },
  },
  'IT / Software Development': {
    category: 'IT / Software Development',
    totalJobs: 1247,
    monthChange: 156,
    avgSalary: 15200,
    companies: [
      {
        name: 'Google',
        jobCount: 145,
        trend: 45,
        opportunityLevel: 'high',
        avgSalary: 22000,
      },
      {
        name: 'Microsoft',
        jobCount: 132,
        trend: 38,
        opportunityLevel: 'high',
        avgSalary: 20500,
      },
      {
        name: 'Amazon',
        jobCount: 118,
        trend: 32,
        opportunityLevel: 'high',
        avgSalary: 19800,
      },
      {
        name: 'Meta',
        jobCount: 85,
        trend: -12,
        opportunityLevel: 'medium',
        avgSalary: 21500,
      },
      {
        name: 'Capgemini',
        jobCount: 76,
        trend: 18,
        opportunityLevel: 'high',
        avgSalary: 14500,
      },
    ],
    seniorityBreakdown: {
      'Junior': 20,
      'Mid': 40,
      'Senior': 30,
      'Lead': 10,
    },
    workModeBreakdown: {
      'Remote': 60,
      'Hybrid': 30,
      'Office': 10,
    },
  },
  'AI / Machine Learning': {
    category: 'AI / Machine Learning',
    totalJobs: 487,
    monthChange: 112,
    avgSalary: 18500,
    companies: [
      {
        name: 'Google',
        jobCount: 50,
        trend: 25,
        opportunityLevel: 'high',
        avgSalary: 24000,
      },
      {
        name: 'Microsoft',
        jobCount: 45,
        trend: 20,
        opportunityLevel: 'high',
        avgSalary: 22500,
      },
      {
        name: 'Amazon',
        jobCount: 38,
        trend: 18,
        opportunityLevel: 'high',
        avgSalary: 21000,
      },
      {
        name: 'NVIDIA',
        jobCount: 32,
        trend: 15,
        opportunityLevel: 'high',
        avgSalary: 25000,
      },
      {
        name: 'OpenAI',
        jobCount: 28,
        trend: 28,
        opportunityLevel: 'high',
        avgSalary: 28000,
      },
    ],
    seniorityBreakdown: {
      'Mid': 25,
      'Senior': 45,
      'Lead': 20,
      'Principal': 10,
    },
    workModeBreakdown: {
      'Remote': 70,
      'Hybrid': 25,
      'Office': 5,
    },
  },
  'Marketing / PR': {
    category: 'Marketing / PR',
    totalJobs: 245,
    monthChange: 28,
    avgSalary: 7200,
    companies: [
      {
        name: 'Publicis Groupe',
        jobCount: 32,
        trend: 8,
        opportunityLevel: 'medium',
        avgSalary: 8500,
      },
      {
        name: 'WPP',
        jobCount: 28,
        trend: 6,
        opportunityLevel: 'medium',
        avgSalary: 8200,
      },
      {
        name: 'Dentsu',
        jobCount: 24,
        trend: 5,
        opportunityLevel: 'medium',
        avgSalary: 7800,
      },
      {
        name: 'Omnicom',
        jobCount: 20,
        trend: 4,
        opportunityLevel: 'low',
        avgSalary: 7500,
      },
      {
        name: 'Havas',
        jobCount: 18,
        trend: 3,
        opportunityLevel: 'low',
        avgSalary: 7200,
      },
    ],
    seniorityBreakdown: {
      'Junior': 35,
      'Mid': 40,
      'Senior': 25,
    },
    workModeBreakdown: {
      'Remote': 35,
      'Hybrid': 50,
      'Office': 15,
    },
  },
};

export default function CategoryIntelligencePanel() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Księgowość / Finanse');

  const categoryData = useMemo(() => {
    return MOCK_CATEGORY_DATA[selectedCategory] || MOCK_CATEGORY_DATA['IT / Software Development'];
  }, [selectedCategory]);

  const getOpportunityBadge = (level: 'high' | 'medium' | 'low') => {
    const config = {
      high: { text: 'Actively hiring', color: 'bg-green-100 text-green-700 border-green-300' },
      medium: { text: 'Moderate activity', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      low: { text: 'Low activity', color: 'bg-red-100 text-red-700 border-red-300' },
    };
    return config[level];
  };

  const getOpportunityIndicator = (level: 'high' | 'medium' | 'low') => {
    const emoji = { high: '🟢', medium: '🟡', low: '🔴' };
    return emoji[level];
  };

  return (
    <div className="space-y-6">
      {/* Header with category selector */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Target className="w-7 h-7 text-purple-600" />
              Category Intelligence
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Deep insights into hiring trends per job category
            </p>
          </div>

          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Select category
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[280px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {JOB_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Category summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Jobs</p>
              <p className="text-3xl font-bold mt-1">{categoryData.totalJobs}</p>
            </div>
            <Briefcase className="w-8 h-8 text-purple-200" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-100 text-sm">Month Change</p>
              <p className="text-3xl font-bold mt-1">
                +{categoryData.monthChange}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm">Avg Salary</p>
              <p className="text-3xl font-bold mt-1">
                {(categoryData.avgSalary / 1000).toFixed(1)}k
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-500 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Companies</p>
              <p className="text-3xl font-bold mt-1">{categoryData.companies.length}</p>
            </div>
            <Users className="w-8 h-8 text-yellow-200" />
          </div>
        </Card>
      </div>

      {/* Top hiring companies */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Top Hiring Companies
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="space-y-4">
            {categoryData.companies.map((company, index) => (
              <Card
                key={index}
                className="p-5 bg-gradient-to-r from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 border border-purple-200 dark:border-purple-800"
              >
                <div className="space-y-3">
                  {/* Company header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {company.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className={getOpportunityBadge(company.opportunityLevel).color}
                          >
                            {getOpportunityIndicator(company.opportunityLevel)}{' '}
                            {getOpportunityBadge(company.opportunityLevel).text}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-purple-600">
                          {company.jobCount}
                        </span>
                        <span className="text-sm text-gray-500">roles</span>
                      </div>
                      <div
                        className={`text-sm font-semibold ${
                          company.trend > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {company.trend > 0 ? '↗️' : '↘️'} {company.trend > 0 ? '+' : ''}
                        {company.trend}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2.5 rounded-full transition-all"
                        style={{
                          width: `${Math.min((company.jobCount / 150) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>Avg salary: </span>
                      <span className="font-semibold text-green-600">
                        {(company.avgSalary / 1000).toFixed(1)}k PLN
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-2 border-t border-purple-100 dark:border-purple-900">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Candidate
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seniority breakdown */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Seniority Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-3">
              {Object.entries(categoryData.seniorityBreakdown).map(([level, percentage]) => (
                <div key={level}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {level}
                    </span>
                    <span className="text-sm font-semibold text-purple-600">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Work mode breakdown */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Work Mode Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-3">
              {Object.entries(categoryData.workModeBreakdown).map(([mode, percentage]) => (
                <div key={mode}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {mode}
                    </span>
                    <span className="text-sm font-semibold text-purple-600">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
