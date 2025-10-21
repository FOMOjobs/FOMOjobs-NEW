import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import SEO from '@/components/SEO';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  Users,
  Building2,
  MapPin,
  Calendar,
  Filter,
  Download,
  RefreshCcw,
  Award,
  Sparkles,
  Target,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import CompanyTrendsPanel from '@/components/analytics/CompanyTrendsPanel';
import CategoryIntelligencePanel from '@/components/analytics/CategoryIntelligencePanel';
import MarketMovementsPanel from '@/components/analytics/MarketMovementsPanel';
// Lazy load chart-heavy component to reduce initial bundle size
const AIJobsTrackerPanel = lazy(() => import('@/components/analytics/AIJobsTrackerPanel'));
import HeadhunterBoardPanel from '@/components/analytics/HeadhunterBoardPanel';
import WatchlistPanel from '@/components/analytics/WatchlistPanel';
import TopWatchedCompanies from '@/components/analytics/TopWatchedCompanies';
import TopPopularPositions from '@/components/analytics/TopPopularPositions';

// Types
interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  city: string;
  is_monitored: boolean;
}

interface JobListing {
  id: string;
  company_id: string;
  title: string;
  level: string;
  category: string;
  location: string;
  work_mode: string;
  contract_type: string;
  salary_min: number | null;
  salary_max: number | null;
  technologies: string[];
  benefits: string[];
  posted_at: string;
  is_active: boolean;
}

interface DailyStats {
  date: string;
  company_id: string;
  total_active: number;
  new_listings: number;
  closed_listings: number;
  by_level: Record<string, number>;
  by_category: Record<string, number>;
}

const SENIORITY_LEVELS = [
  'Stażysta/Praktykant',
  'Junior',
  'Mid/Regular',
  'Senior',
  'Lead/Principal',
  'Manager/Head',
  'Director/VP',
  'C-level',
];

const INDUSTRIES = [
  'IT Services',
  'Consulting',
  'FinTech',
  'E-commerce',
  'Healthcare',
  'Gaming',
  'Logistics',
  'Food Delivery',
  'Mobility',
];

const WORK_MODES = ['Remote', 'Hybrid', 'Office'];

const LOCATIONS = ['Warszawa', 'Kraków', 'Wrocław', 'Gdańsk', 'Poznań', 'Remote'];

const CONTRACT_TYPES = ['B2B', 'Umowa o pracę', 'Umowa zlecenie'];

const CHART_COLORS = {
  purple: '#8B5CF6',
  yellow: '#F4D03F',
  blue: '#3B82F6',
  green: '#10B981',
  red: '#EF4444',
  orange: '#F97316',
  pink: '#EC4899',
  indigo: '#6366F1',
};

const PIE_COLORS = [
  CHART_COLORS.purple,
  CHART_COLORS.yellow,
  CHART_COLORS.blue,
  CHART_COLORS.green,
  CHART_COLORS.orange,
  CHART_COLORS.pink,
  CHART_COLORS.indigo,
  CHART_COLORS.red,
];

export default function B2BAnalytics() {
  // State
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedContractTypes, setSelectedContractTypes] = useState<string[]>([]);
  const [salaryMin, setSalaryMin] = useState<number>(0);
  const [salaryMax, setSalaryMax] = useState<number>(100000);

  // Watchlist state
  const [watchlist, setWatchlist] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('company-watchlist');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const handleRemoveFromWatchlist = (companyId: string) => {
    const newWatchlist = new Set(watchlist);
    newWatchlist.delete(companyId);
    setWatchlist(newWatchlist);
    localStorage.setItem('company-watchlist', JSON.stringify([...newWatchlist]));
  };

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch companies
      const { data: companiesData, error: companiesError } = await supabase
        .from('companies' as any)
        .select('*')
        .eq('is_monitored', true)
        .order('name');

      if (companiesError) throw companiesError;
      setCompanies((companiesData as any) || []);

      // Fetch job listings
      const daysAgo = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      const { data: jobsData, error: jobsError } = await supabase
        .from('job_listings' as any)
        .select('*')
        .gte('posted_at', startDate.toISOString().split('T')[0])
        .order('posted_at', { ascending: false });

      if (jobsError) throw jobsError;
      setJobListings((jobsData as any) || []);

      // Fetch daily stats
      const { data: statsData, error: statsError } = await supabase
        .from('daily_stats' as any)
        .select('*')
        .gte('date', startDate.toISOString().split('T')[0])
        .order('date');

      if (statsError) throw statsError;
      setDailyStats((statsData as any) || []);

      toast.success('Dane załadowane pomyślnie');
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Błąd podczas ładowania danych');
    } finally {
      setLoading(false);
    }
  };

  // Filtered data based on selected filters
  const filteredJobListings = useMemo(() => {
    let filtered = jobListings;

    // Filter by industry
    if (selectedIndustries.length > 0) {
      const companyIdsInSelectedIndustries = companies
        .filter((c) => selectedIndustries.includes(c.industry))
        .map((c) => c.id);
      filtered = filtered.filter((job) =>
        companyIdsInSelectedIndustries.includes(job.company_id)
      );
    }

    // Filter by company
    if (selectedCompanies.length > 0) {
      filtered = filtered.filter((job) =>
        selectedCompanies.includes(job.company_id)
      );
    }

    // Filter by work mode
    if (selectedWorkModes.length > 0) {
      filtered = filtered.filter((job) =>
        selectedWorkModes.includes(job.work_mode)
      );
    }

    // Filter by location
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((job) =>
        selectedLocations.includes(job.location)
      );
    }

    // Filter by seniority level
    if (selectedLevels.length > 0) {
      filtered = filtered.filter((job) =>
        selectedLevels.includes(job.level)
      );
    }

    // Filter by contract type
    if (selectedContractTypes.length > 0) {
      filtered = filtered.filter((job) =>
        selectedContractTypes.includes(job.contract_type)
      );
    }

    // Filter by salary range
    if (salaryMin > 0 || salaryMax < 100000) {
      filtered = filtered.filter((job) => {
        if (!job.salary_min || !job.salary_max) return false;
        const avgSalary = (job.salary_min + job.salary_max) / 2;
        return avgSalary >= salaryMin && avgSalary <= salaryMax;
      });
    }

    return filtered;
  }, [
    jobListings,
    selectedIndustries,
    selectedCompanies,
    companies,
    selectedWorkModes,
    selectedLocations,
    selectedLevels,
    selectedContractTypes,
    salaryMin,
    salaryMax,
  ]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredJobListings.length;
    const active = filteredJobListings.filter((j) => j.is_active).length;

    // New this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newThisWeek = filteredJobListings.filter(
      (j) => new Date(j.posted_at) >= oneWeekAgo
    ).length;

    // Average salary
    const jobsWithSalary = filteredJobListings.filter(
      (j) => j.salary_min && j.salary_max
    );
    const avgSalary =
      jobsWithSalary.length > 0
        ? Math.round(
            jobsWithSalary.reduce(
              (sum, j) => sum + ((j.salary_min || 0) + (j.salary_max || 0)) / 2,
              0
            ) / jobsWithSalary.length
          )
        : 0;

    // Remote percentage
    const remoteCount = filteredJobListings.filter(
      (j) => j.work_mode === 'Remote'
    ).length;
    const remotePercentage =
      total > 0 ? Math.round((remoteCount / total) * 100) : 0;

    // Top hiring companies
    const companyCounts: Record<string, number> = {};
    filteredJobListings.forEach((job) => {
      companyCounts[job.company_id] = (companyCounts[job.company_id] || 0) + 1;
    });
    const topCompanies = Object.entries(companyCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([companyId, count]) => ({
        company: companies.find((c) => c.id === companyId)?.name || 'Unknown',
        count,
      }));

    // Top hiring company (for card)
    const topHiringCompany = topCompanies.length > 0 ? topCompanies[0] : null;

    // Most in-demand role
    const titleCounts: Record<string, number> = {};
    filteredJobListings.forEach((job) => {
      titleCounts[job.title] = (titleCounts[job.title] || 0) + 1;
    });
    const mostInDemandRole = Object.entries(titleCounts)
      .sort(([, a], [, b]) => b - a)[0] || ['N/A', 0];

    // Salary growth (compare current period vs previous period)
    const currentPeriodDays = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
    const previousPeriodStart = new Date();
    previousPeriodStart.setDate(previousPeriodStart.getDate() - (currentPeriodDays * 2));
    const previousPeriodEnd = new Date();
    previousPeriodEnd.setDate(previousPeriodEnd.getDate() - currentPeriodDays);

    const previousPeriodJobs = jobListings.filter((j) => {
      const jobDate = new Date(j.posted_at);
      return jobDate >= previousPeriodStart && jobDate < previousPeriodEnd && j.salary_min && j.salary_max;
    });

    const prevAvgSalary = previousPeriodJobs.length > 0
      ? Math.round(
          previousPeriodJobs.reduce(
            (sum, j) => sum + ((j.salary_min || 0) + (j.salary_max || 0)) / 2,
            0
          ) / previousPeriodJobs.length
        )
      : 0;

    const salaryGrowth = prevAvgSalary > 0
      ? Math.round(((avgSalary - prevAvgSalary) / prevAvgSalary) * 100)
      : 0;

    // Competitive index (avg jobs per company / market avg)
    const activeCompanies = new Set(filteredJobListings.map(j => j.company_id)).size;
    const avgJobsPerCompany = activeCompanies > 0 ? total / activeCompanies : 0;
    const marketAvg = 15; // Baseline: assume market avg is 15 jobs per company
    const competitiveIndex = marketAvg > 0
      ? Math.round((avgJobsPerCompany / marketAvg) * 100)
      : 100;

    return {
      total,
      active,
      newThisWeek,
      avgSalary,
      remotePercentage,
      topCompanies,
      topHiringCompany,
      mostInDemandRole,
      salaryGrowth,
      competitiveIndex,
    };
  }, [filteredJobListings, companies, jobListings, dateRange]);

  // Chart data: Job Postings Over Time
  const timeSeriesData = useMemo(() => {
    const dateMap: Record<string, number> = {};

    filteredJobListings.forEach((job) => {
      const date = job.posted_at;
      dateMap[date] = (dateMap[date] || 0) + 1;
    });

    return Object.entries(dateMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({
        date: new Date(date).toLocaleDateString('pl-PL', {
          month: 'short',
          day: 'numeric',
        }),
        count,
      }));
  }, [filteredJobListings]);

  // Chart data: Top Hiring Companies
  const topCompaniesData = useMemo(() => {
    return stats.topCompanies.map((item) => ({
      name: item.company.split(' ')[0], // Shorten name for chart
      value: item.count,
    }));
  }, [stats.topCompanies]);

  // Chart data: Jobs by Seniority Level
  const seniorityData = useMemo(() => {
    const levelCounts: Record<string, number> = {};

    filteredJobListings.forEach((job) => {
      levelCounts[job.level] = (levelCounts[job.level] || 0) + 1;
    });

    return SENIORITY_LEVELS.filter((level) => levelCounts[level] > 0).map(
      (level) => ({
        name: level,
        value: levelCounts[level] || 0,
      })
    );
  }, [filteredJobListings]);

  // Chart data: Top Technologies
  const technologiesData = useMemo(() => {
    const techCounts: Record<string, number> = {};

    filteredJobListings.forEach((job) => {
      if (job.technologies && Array.isArray(job.technologies)) {
        job.technologies.forEach((tech) => {
          techCounts[tech] = (techCounts[tech] || 0) + 1;
        });
      }
    });

    const total = filteredJobListings.length;

    return Object.entries(techCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([tech, count]) => ({
        name: tech,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }));
  }, [filteredJobListings]);

  // Chart data: Top Benefits
  const benefitsData = useMemo(() => {
    const benefitCounts: Record<string, number> = {};

    filteredJobListings.forEach((job) => {
      if (job.benefits && Array.isArray(job.benefits)) {
        job.benefits.forEach((benefit) => {
          benefitCounts[benefit] = (benefitCounts[benefit] || 0) + 1;
        });
      }
    });

    const total = filteredJobListings.length;

    return Object.entries(benefitCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15)
      .map(([benefit, count]) => ({
        name: benefit.length > 30 ? benefit.substring(0, 30) + '...' : benefit,
        fullName: benefit,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }));
  }, [filteredJobListings]);

  if (loading) {
    return (
      <>
        <SEO
          title="FOMO.analytics - FOMOjobs"
          description="Inteligentna analiza rynku pracy dla HR i rekruterów. Śledź konkurencję, trendy wynagrodzeń i najpopularniejsze oferty pracy w Polsce."
        />
        <FOMOJobsNavbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden pt-16 px-4 flex items-center justify-center">
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 dark:bg-teal-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300 dark:bg-cyan-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />
          </div>

          <div className="relative z-10 text-center">
            <RefreshCcw className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Ładowanie danych...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="FOMO.analytics - FOMOjobs"
        description="Inteligentna analiza rynku pracy dla HR i rekruterów. Śledź konkurencję, trendy wynagrodzeń i najpopularniejsze oferty pracy w Polsce."
      />
      <FOMOJobsNavbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden pt-16 px-4 pb-8">
        {/* Animated gradient orbs - Analytics colors (Blue + Teal) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 dark:bg-teal-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300 dark:bg-cyan-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />
        </div>

        {/* Content - positioned above animated background */}
        <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
            FOMO.analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Inteligentna analiza rynku pracy - śledź konkurencję i wyróżnij się w rekrutacji
          </p>
        </div>

        {/* Tabbed Navigation */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 mb-8 h-auto gap-2 bg-transparent p-0">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white min-h-[60px] flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-gray-200 data-[state=active]:border-purple-600 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-xl">📊</span>
              <span className="font-semibold text-sm">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger
              value="company-trends"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white min-h-[60px] flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-gray-200 data-[state=active]:border-blue-600 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-xl">🏢</span>
              <span className="font-semibold text-sm">Company Trends</span>
            </TabsTrigger>
            <TabsTrigger
              value="category"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white min-h-[60px] flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-gray-200 data-[state=active]:border-yellow-600 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-xl">🎯</span>
              <span className="font-semibold text-sm">Category Intel</span>
            </TabsTrigger>
            <TabsTrigger
              value="movements"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white min-h-[60px] flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-gray-200 data-[state=active]:border-orange-600 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-xl">🔥</span>
              <span className="font-semibold text-sm">Market Moves</span>
            </TabsTrigger>
            <TabsTrigger
              value="ai-jobs"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white min-h-[60px] flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-gray-200 data-[state=active]:border-green-600 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-xl">🤖</span>
              <span className="font-semibold text-sm">AI Jobs</span>
            </TabsTrigger>
            <TabsTrigger
              value="headhunter"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white min-h-[60px] flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-gray-200 data-[state=active]:border-indigo-600 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-xl">💼</span>
              <span className="font-semibold text-sm">Headhunter</span>
            </TabsTrigger>
            <TabsTrigger
              value="watchlist"
              className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-pink-600 data-[state=active]:text-white min-h-[60px] flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-gray-200 data-[state=active]:border-pink-600 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-xl">⭐</span>
              <span className="font-semibold text-sm">Obserwowane</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab - Existing Content */}
          <TabsContent value="dashboard" className="space-y-8">
        {/* Filters */}
        <Card className="p-6 mb-8 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold">Filtry</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Range */}
            <div>
              <Label className="mb-2 block">
                <Calendar className="w-4 h-4 inline mr-2" />
                Okres czasu
              </Label>
              <Select
                value={dateRange}
                onValueChange={(value: '7d' | '30d' | '90d') => {
                  setDateRange(value);
                  fetchData();
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Ostatnie 7 dni</SelectItem>
                  <SelectItem value="30d">Ostatnie 30 dni</SelectItem>
                  <SelectItem value="90d">Ostatnie 90 dni</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Industry Filter */}
            <div>
              <Label className="mb-2 block">
                <Building2 className="w-4 h-4 inline mr-2" />
                Branża
              </Label>
              <Select
                value={selectedIndustries[0] || 'all'}
                onValueChange={(value) =>
                  setSelectedIndustries(value === 'all' ? [] : [value])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wszystkie branże" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie branże</SelectItem>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Company Filter */}
            <div>
              <Label className="mb-2 block">
                <Users className="w-4 h-4 inline mr-2" />
                Firma
              </Label>
              <Select
                value={selectedCompanies[0] || 'all'}
                onValueChange={(value) =>
                  setSelectedCompanies(value === 'all' ? [] : [value])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wszystkie firmy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie firmy</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Filters Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* Work Mode Filter */}
            <div>
              <Label className="mb-2 block">
                <MapPin className="w-4 h-4 inline mr-2" />
                Tryb pracy
              </Label>
              <Select
                value={selectedWorkModes[0] || 'all'}
                onValueChange={(value) =>
                  setSelectedWorkModes(value === 'all' ? [] : [value])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wszystkie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  {WORK_MODES.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div>
              <Label className="mb-2 block">
                <Building2 className="w-4 h-4 inline mr-2" />
                Lokalizacja
              </Label>
              <Select
                value={selectedLocations[0] || 'all'}
                onValueChange={(value) =>
                  setSelectedLocations(value === 'all' ? [] : [value])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wszystkie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  {LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Seniority Level Filter */}
            <div>
              <Label className="mb-2 block">
                <Users className="w-4 h-4 inline mr-2" />
                Poziom doświadczenia
              </Label>
              <Select
                value={selectedLevels[0] || 'all'}
                onValueChange={(value) =>
                  setSelectedLevels(value === 'all' ? [] : [value])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wszystkie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  {SENIORITY_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Contract Type Filter */}
            <div>
              <Label className="mb-2 block">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Typ umowy
              </Label>
              <Select
                value={selectedContractTypes[0] || 'all'}
                onValueChange={(value) =>
                  setSelectedContractTypes(value === 'all' ? [] : [value])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wszystkie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  {CONTRACT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Salary Range Filter Row 3 */}
          <div className="mt-4 p-4 bg-purple-50 dark:bg-gray-900 rounded-lg">
            <Label className="mb-3 block font-semibold">
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Zakres wynagrodzenia (PLN/miesiąc)
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block text-sm text-gray-600 dark:text-gray-400">
                  Min
                </Label>
                <Input
                  type="number"
                  min={0}
                  max={100000}
                  step={1000}
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                  placeholder="0"
                  className="w-full"
                />
              </div>
              <div>
                <Label className="mb-2 block text-sm text-gray-600 dark:text-gray-400">
                  Max
                </Label>
                <Input
                  type="number"
                  min={0}
                  max={100000}
                  step={1000}
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                  placeholder="100000"
                  className="w-full"
                />
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <Badge variant="outline" className="text-xs">
                {salaryMin > 0 ? `${(salaryMin / 1000).toFixed(0)}k` : '0'} PLN
              </Badge>
              <span className="text-gray-400">-</span>
              <Badge variant="outline" className="text-xs">
                {salaryMax < 100000 ? `${(salaryMax / 1000).toFixed(0)}k` : '100k+'} PLN
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedIndustries([]);
                setSelectedCompanies([]);
                setSelectedWorkModes([]);
                setSelectedLocations([]);
                setSelectedLevels([]);
                setSelectedContractTypes([]);
                setSalaryMin(0);
                setSalaryMax(100000);
                setDateRange('30d');
                fetchData();
              }}
            >
              Wyczyść wszystkie filtry
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              className="ml-auto"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Odśwież dane
            </Button>
          </div>
        </Card>

        {/* Stats Cards - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Active Job Postings */}
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">📊 Total Active Job Postings</p>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-purple-100 text-xs mt-2 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% vs last month
                </p>
              </div>
              <Briefcase className="w-12 h-12 text-purple-200" />
            </div>
          </Card>

          {/* Active Companies Hiring */}
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">🏢 Active Companies Hiring</p>
                <p className="text-3xl font-bold">156</p>
                <p className="text-blue-100 text-xs mt-2">
                  +8 new companies
                </p>
              </div>
              <Building2 className="w-12 h-12 text-blue-200" />
            </div>
          </Card>

          {/* Market Growth */}
          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-green-100 text-sm mb-1">📈 Market Growth</p>
                <p className="text-3xl font-bold">+18.5%</p>
                <p className="text-green-100 text-xs mt-2">
                  Overall hiring growth
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-200" />
            </div>
          </Card>

          {/* New Positions This Week */}
          <Card className="p-6 bg-gradient-to-br from-yellow-400 to-yellow-500 text-white border-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-yellow-100 text-sm mb-1">🆕 New Positions This Week</p>
                <p className="text-3xl font-bold">{stats.newThisWeek}</p>
                <p className="text-yellow-100 text-xs mt-2">
                  Fresh opportunities
                </p>
              </div>
              <Calendar className="w-12 h-12 text-yellow-200" />
            </div>
          </Card>
        </div>

        {/* Stats Cards - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* User Alerts Active */}
          <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-orange-100 text-sm mb-1">🔔 User Alerts Active</p>
                <p className="text-3xl font-bold">2,341</p>
                <p className="text-orange-100 text-xs mt-2">
                  Total alerts set by users
                </p>
              </div>
              <Target className="w-12 h-12 text-orange-200" />
            </div>
          </Card>

          {/* Most Watched Companies */}
          <Card className="p-6 bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-pink-100 text-sm mb-1">⭐ Most Watched</p>
                <p className="text-2xl font-bold">Capgemini</p>
                <p className="text-pink-100 text-xs mt-2">
                  89 subscribers leading
                </p>
              </div>
              <Award className="w-12 h-12 text-pink-200" />
            </div>
          </Card>

          {/* AI/ML Jobs */}
          <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-indigo-100 text-sm mb-1">🤖 AI/ML Jobs</p>
                <p className="text-3xl font-bold">487</p>
                <p className="text-indigo-100 text-xs mt-2 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +23% growth
                </p>
              </div>
              <Sparkles className="w-12 h-12 text-indigo-200" />
            </div>
          </Card>

          {/* Remote Positions */}
          <Card className="p-6 bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-teal-100 text-sm mb-1">🌍 Remote Positions</p>
                <p className="text-3xl font-bold">{stats.remotePercentage}%</p>
                <p className="text-teal-100 text-xs mt-2">
                  Of all job postings
                </p>
              </div>
              <MapPin className="w-12 h-12 text-teal-200" />
            </div>
          </Card>
        </div>

        {/* Top Watched Companies & Popular Positions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TopWatchedCompanies />
          <TopPopularPositions />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Job Postings Over Time */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
              Oferty w czasie
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={CHART_COLORS.purple}
                  strokeWidth={2}
                  name="Liczba ofert"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Hiring Companies */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-purple-600" />
              Top 5 firm rekrutujących
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCompaniesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={CHART_COLORS.yellow} name="Ofert" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Jobs by Seniority Level */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            Oferty według poziomu doświadczenia
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={seniorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {seniorityData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Technologies & Benefits Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Technologies */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-purple-600" />
              Najpopularniejsze technologie (Top 20)
            </h3>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={technologiesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-gray-800 border border-purple-200 p-3 rounded shadow-lg">
                          <p className="font-semibold">{payload[0].payload.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {payload[0].value} ofert ({payload[0].payload.percentage}%)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" fill={CHART_COLORS.purple} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Benefits */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              Najczęstsze benefity (Top 15)
            </h3>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={benefitsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={120}
                  style={{ fontSize: '11px' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-gray-800 border border-purple-200 p-3 rounded shadow-lg max-w-xs">
                          <p className="font-semibold text-sm">{payload[0].payload.fullName}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {payload[0].value} ofert ({payload[0].payload.percentage}%)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" fill={CHART_COLORS.yellow} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
          </TabsContent>

          {/* Company Trends Tab */}
          <TabsContent value="company-trends">
            <CompanyTrendsPanel />
          </TabsContent>

          {/* Category Intelligence Tab */}
          <TabsContent value="category">
            <CategoryIntelligencePanel />
          </TabsContent>

          {/* Market Movements Tab */}
          <TabsContent value="movements">
            <MarketMovementsPanel />
          </TabsContent>

          {/* AI Jobs Tab */}
          <TabsContent value="ai-jobs">
            <Suspense fallback={
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent" />
              </div>
            }>
              <AIJobsTrackerPanel />
            </Suspense>
          </TabsContent>

          {/* Headhunter Board Tab */}
          <TabsContent value="headhunter">
            <HeadhunterBoardPanel />
          </TabsContent>

          {/* Watchlist Tab */}
          <TabsContent value="watchlist">
            <WatchlistPanel watchlist={watchlist} onRemoveFromWatchlist={handleRemoveFromWatchlist} />
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </>
  );
}
