import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
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
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  BarChart3,
  Building2,
  Star,
} from 'lucide-react';

interface CompanyTrend {
  id: string;
  company: string;
  currentJobs: number;
  previousJobs: number;
  percentageChange: number;
  trend: 'growth' | 'decline' | 'stable';
  topCategories: Array<{
    category: string;
    count: number;
  }>;
  totalAIJobs?: number;
}

// Mock data for company trends
const MOCK_COMPANY_TRENDS: CompanyTrend[] = [
  {
    id: '1',
    company: 'Capgemini Polska',
    currentJobs: 200,
    previousJobs: 100,
    percentageChange: 100,
    trend: 'growth',
    topCategories: [
      { category: 'IT', count: 80 },
      { category: 'Consulting', count: 60 },
      { category: 'PM', count: 40 },
    ],
    totalAIJobs: 15,
  },
  {
    id: '2',
    company: 'Google Poland',
    currentJobs: 145,
    previousJobs: 100,
    percentageChange: 45,
    trend: 'growth',
    topCategories: [
      { category: 'AI/ML', count: 50 },
      { category: 'Backend', count: 40 },
      { category: 'Data Science', count: 30 },
    ],
    totalAIJobs: 50,
  },
  {
    id: '3',
    company: 'Meta Warsaw',
    currentJobs: 80,
    previousJobs: 100,
    percentageChange: -20,
    trend: 'decline',
    topCategories: [
      { category: 'Frontend', count: 30 },
      { category: 'Mobile', count: 25 },
      { category: 'AR/VR', count: 15 },
    ],
    totalAIJobs: 10,
  },
  {
    id: '4',
    company: 'Microsoft Poland',
    currentJobs: 165,
    previousJobs: 120,
    percentageChange: 37.5,
    trend: 'growth',
    topCategories: [
      { category: 'Cloud', count: 55 },
      { category: 'AI', count: 45 },
      { category: 'DevOps', count: 35 },
    ],
    totalAIJobs: 45,
  },
  {
    id: '5',
    company: 'Amazon Poland',
    currentJobs: 188,
    previousJobs: 150,
    percentageChange: 25.3,
    trend: 'growth',
    topCategories: [
      { category: 'Backend', count: 70 },
      { category: 'Cloud/AWS', count: 60 },
      { category: 'Data', count: 35 },
    ],
    totalAIJobs: 22,
  },
  {
    id: '6',
    company: 'Comarch S.A.',
    currentJobs: 98,
    previousJobs: 95,
    percentageChange: 3.2,
    trend: 'stable',
    topCategories: [
      { category: 'Java', count: 40 },
      { category: 'Frontend', count: 30 },
      { category: 'Testing', count: 18 },
    ],
    totalAIJobs: 5,
  },
  {
    id: '7',
    company: 'IBM Poland',
    currentJobs: 125,
    previousJobs: 140,
    percentageChange: -10.7,
    trend: 'decline',
    topCategories: [
      { category: 'Consulting', count: 50 },
      { category: 'Cloud', count: 40 },
      { category: 'Security', count: 20 },
    ],
    totalAIJobs: 18,
  },
  {
    id: '8',
    company: 'GlobalLogic Poland',
    currentJobs: 156,
    previousJobs: 115,
    percentageChange: 35.7,
    trend: 'growth',
    topCategories: [
      { category: 'Frontend', count: 55 },
      { category: 'Backend', count: 50 },
      { category: 'Mobile', count: 30 },
    ],
    totalAIJobs: 12,
  },
  {
    id: '9',
    company: 'Motorola Solutions',
    currentJobs: 76,
    previousJobs: 82,
    percentageChange: -7.3,
    trend: 'stable',
    topCategories: [
      { category: 'Embedded', count: 30 },
      { category: 'C++', count: 25 },
      { category: 'IoT', count: 15 },
    ],
    totalAIJobs: 4,
  },
  {
    id: '10',
    company: 'State Street',
    currentJobs: 91,
    previousJobs: 88,
    percentageChange: 3.4,
    trend: 'stable',
    topCategories: [
      { category: 'FinTech', count: 35 },
      { category: 'Java', count: 30 },
      { category: 'Data', count: 20 },
    ],
    totalAIJobs: 8,
  },
];

type SortOption = 'volume' | 'growth' | 'name';

export default function CompanyTrendsPanel() {
  const [sortBy, setSortBy] = useState<SortOption>('volume');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  // Sort and filter companies
  const sortedCompanies = useMemo(() => {
    let filtered = [...MOCK_COMPANY_TRENDS];

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter((company) =>
        company.topCategories.some((cat) => cat.category === filterCategory)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'volume':
          return b.currentJobs - a.currentJobs;
        case 'growth':
          return b.percentageChange - a.percentageChange;
        case 'name':
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

    return filtered;
  }, [sortBy, filterCategory]);

  const toggleWatchlist = (companyId: string) => {
    const newWatchlist = new Set(watchlist);
    if (newWatchlist.has(companyId)) {
      newWatchlist.delete(companyId);
    } else {
      newWatchlist.add(companyId);
    }
    setWatchlist(newWatchlist);
    // In production, save to localStorage
    localStorage.setItem('company-watchlist', JSON.stringify([...newWatchlist]));
  };

  const getTrendIcon = (trend: string, percentageChange: number) => {
    if (percentageChange > 20) {
      return <TrendingUp className="w-5 h-5 text-green-600" />;
    } else if (percentageChange < -10) {
      return <TrendingDown className="w-5 h-5 text-red-600" />;
    } else {
      return <Minus className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getTrendColor = (percentageChange: number) => {
    if (percentageChange > 20) return 'text-green-600';
    if (percentageChange < -10) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getProgressColor = (percentageChange: number) => {
    if (percentageChange > 20) return 'bg-green-500';
    if (percentageChange < -10) return 'bg-red-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="w-7 h-7 text-purple-600" />
              Company Hiring Trends
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Top 20 companies by hiring volume - current vs previous month
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
                Sort by
              </label>
              <Select value={sortBy} onValueChange={(val: SortOption) => setSortBy(val)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="volume">Hiring Volume</SelectItem>
                  <SelectItem value="growth">Growth %</SelectItem>
                  <SelectItem value="name">Company Name</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
                Filter by category
              </label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Cloud">Cloud</SelectItem>
                  <SelectItem value="Data">Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* Company list */}
      <div className="space-y-4">
        {sortedCompanies.map((company, index) => (
          <Card
            key={company.id}
            className="p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 transition-all hover:shadow-lg"
          >
            <div className="space-y-4">
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800">
                    <span className="text-lg font-bold text-purple-700 dark:text-purple-300">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {company.company}
                      </h3>
                      {watchlist.has(company.id) && (
                        <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                          <Star className="w-3 h-3 mr-1" />
                          OBSERWOWANE
                        </Badge>
                      )}
                    </div>
                    {company.totalAIJobs && company.totalAIJobs > 0 && (
                      <Badge variant="outline" className="mt-1 text-xs bg-purple-50 border-purple-300 text-purple-700">
                        🤖 {company.totalAIJobs} AI jobs
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getTrendIcon(company.trend, company.percentageChange)}
                  <span className={`text-2xl font-bold ${getTrendColor(company.percentageChange)}`}>
                    {company.percentageChange > 0 ? '+' : ''}
                    {company.percentageChange.toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {company.currentJobs} roles
                  </span>
                  <span className="text-xs text-gray-500">
                    Previous: {company.previousJobs} | Change: {company.percentageChange > 0 ? '+' : ''}
                    {company.currentJobs - company.previousJobs} roles
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${getProgressColor(company.percentageChange)} transition-all`}
                    style={{
                      width: `${Math.min((company.currentJobs / 200) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Top categories */}
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Top categories:{' '}
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {company.topCategories.map((cat, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                    >
                      {cat.category} ({cat.count})
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant={watchlist.has(company.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleWatchlist(company.id)}
                  className={`flex items-center gap-2 ${
                    watchlist.has(company.id)
                      ? 'bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600'
                      : ''
                  }`}
                >
                  <Star className="w-4 h-4" />
                  {watchlist.has(company.id) ? '✅ Przestań obserwować' : '⭐ Obserwuj'}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Szczegóły
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {sortedCompanies.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500">No companies match your filter criteria</p>
        </Card>
      )}
    </div>
  );
}
