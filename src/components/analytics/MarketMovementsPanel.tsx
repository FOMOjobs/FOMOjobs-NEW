import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Flame,
  Sparkles,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
} from 'lucide-react';

interface MarketMovement {
  category: string;
  change: number;
  trend: 'growth' | 'decline';
  topCompanies: Array<{ name: string; change: number }>;
  insight?: string;
}

interface NewJobTitle {
  title: string;
  companiesHiring: number;
  description: string;
  avgSalary?: number;
}

// Mock data for market movements
const MOCK_MARKET_DATA: Record<string, {
  growth: MarketMovement[];
  decline: MarketMovement[];
  newTitles: NewJobTitle[];
}> = {
  '7d': {
    growth: [
      {
        category: 'AI/Machine Learning',
        change: 45,
        trend: 'growth',
        topCompanies: [
          { name: 'OpenAI', change: 12 },
          { name: 'Google', change: 10 },
          { name: 'Microsoft', change: 8 },
        ],
        insight: 'Boom after GPT-5 announcement and new AI regulations',
      },
      {
        category: 'Cybersecurity',
        change: 32,
        trend: 'growth',
        topCompanies: [
          { name: 'CrowdStrike', change: 8 },
          { name: 'Palo Alto', change: 7 },
          { name: 'Cisco', change: 6 },
        ],
        insight: 'Increased hiring due to recent security breaches',
      },
      {
        category: 'Cloud/DevOps',
        change: 28,
        trend: 'growth',
        topCompanies: [
          { name: 'AWS', change: 9 },
          { name: 'Azure', change: 7 },
          { name: 'GCP', change: 5 },
        ],
        insight: 'Cloud migration projects accelerating across industries',
      },
    ],
    decline: [
      {
        category: 'Junior Positions',
        change: -22,
        trend: 'decline',
        topCompanies: [
          { name: 'Meta', change: -8 },
          { name: 'Amazon', change: -6 },
          { name: 'Salesforce', change: -5 },
        ],
        insight: 'Companies focusing on senior hires in economic uncertainty',
      },
      {
        category: 'Marketing Specialists',
        change: -18,
        trend: 'decline',
        topCompanies: [
          { name: 'Publicis', change: -5 },
          { name: 'WPP', change: -4 },
          { name: 'Dentsu', change: -3 },
        ],
        insight: 'Budget cuts in advertising sector',
      },
    ],
    newTitles: [
      {
        title: 'Prompt Engineer',
        companiesHiring: 18,
        description: 'Specialized in crafting AI prompts and fine-tuning LLMs',
        avgSalary: 22000,
      },
      {
        title: 'AI Safety Researcher',
        companiesHiring: 12,
        description: 'Focus on AI alignment and safety protocols',
        avgSalary: 28000,
      },
      {
        title: 'MLOps Platform Engineer',
        companiesHiring: 15,
        description: 'Building and maintaining ML infrastructure at scale',
        avgSalary: 20000,
      },
    ],
  },
  '30d': {
    growth: [
      {
        category: 'AI/Machine Learning',
        change: 156,
        trend: 'growth',
        topCompanies: [
          { name: 'Google', change: 40 },
          { name: 'Microsoft', change: 35 },
          { name: 'OpenAI', change: 30 },
        ],
        insight: 'Boom after GPT-5 announcement and enterprise AI adoption',
      },
      {
        category: 'DevOps/Cloud',
        change: 89,
        trend: 'growth',
        topCompanies: [
          { name: 'AWS', change: 30 },
          { name: 'Azure', change: 25 },
          { name: 'GCP', change: 20 },
        ],
        insight: 'Cloud-native transformation driving massive hiring',
      },
      {
        category: 'Data Engineering',
        change: 67,
        trend: 'growth',
        topCompanies: [
          { name: 'Snowflake', change: 22 },
          { name: 'Databricks', change: 18 },
          { name: 'Confluent', change: 15 },
        ],
        insight: 'Real-time data platforms becoming critical',
      },
    ],
    decline: [
      {
        category: 'Frontend Development',
        change: -45,
        trend: 'decline',
        topCompanies: [
          { name: 'Meta', change: -15 },
          { name: 'Twitter', change: -12 },
          { name: 'Snap', change: -10 },
        ],
        insight: 'Seasonal rotation and Q4 hiring freeze',
      },
      {
        category: 'Junior Positions',
        change: -38,
        trend: 'decline',
        topCompanies: [
          { name: 'Amazon', change: -12 },
          { name: 'Google', change: -10 },
          { name: 'Meta', change: -8 },
        ],
        insight: 'Companies hiring seniors in economic downturn',
      },
    ],
    newTitles: [
      {
        title: 'Prompt Engineer',
        companiesHiring: 45,
        description: 'Designing and optimizing prompts for LLMs',
        avgSalary: 22000,
      },
      {
        title: 'AI Safety Researcher',
        companiesHiring: 28,
        description: 'Ensuring AI systems are safe and aligned',
        avgSalary: 28000,
      },
      {
        title: 'Web3 Community Manager',
        companiesHiring: 32,
        description: 'Building and engaging crypto/NFT communities',
        avgSalary: 15000,
      },
      {
        title: 'Climate Tech Engineer',
        companiesHiring: 24,
        description: 'Developing sustainable technology solutions',
        avgSalary: 18000,
      },
    ],
  },
  '90d': {
    growth: [
      {
        category: 'AI/Machine Learning',
        change: 287,
        trend: 'growth',
        topCompanies: [
          { name: 'Google', change: 85 },
          { name: 'Microsoft', change: 72 },
          { name: 'Amazon', change: 55 },
        ],
        insight: 'AI revolution driving unprecedented hiring across sectors',
      },
      {
        category: 'Cybersecurity',
        change: 156,
        trend: 'growth',
        topCompanies: [
          { name: 'CrowdStrike', change: 45 },
          { name: 'Palo Alto', change: 38 },
          { name: 'Fortinet', change: 32 },
        ],
        insight: 'Global security threats increasing demand',
      },
      {
        category: 'Green Tech',
        change: 134,
        trend: 'growth',
        topCompanies: [
          { name: 'Tesla', change: 42 },
          { name: 'Vestas', change: 35 },
          { name: 'Ørsted', change: 28 },
        ],
        insight: 'Climate initiatives and regulations driving growth',
      },
    ],
    decline: [
      {
        category: 'Crypto/Web3',
        change: -112,
        trend: 'decline',
        topCompanies: [
          { name: 'Coinbase', change: -38 },
          { name: 'Binance', change: -32 },
          { name: 'FTX', change: -25 },
        ],
        insight: 'Crypto winter and regulatory uncertainty',
      },
      {
        category: 'E-commerce',
        change: -89,
        trend: 'decline',
        topCompanies: [
          { name: 'Shopify', change: -28 },
          { name: 'Etsy', change: -22 },
          { name: 'eBay', change: -18 },
        ],
        insight: 'Post-pandemic normalization of shopping patterns',
      },
    ],
    newTitles: [
      {
        title: 'Generative AI Engineer',
        companiesHiring: 89,
        description: 'Building applications with GPT, Stable Diffusion, etc.',
        avgSalary: 25000,
      },
      {
        title: 'Sustainability Data Analyst',
        companiesHiring: 56,
        description: 'Tracking and optimizing carbon footprint',
        avgSalary: 16000,
      },
      {
        title: 'Quantum Computing Researcher',
        companiesHiring: 23,
        description: 'Developing quantum algorithms and applications',
        avgSalary: 32000,
      },
    ],
  },
};

export default function MarketMovementsPanel() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const marketData = useMemo(() => {
    return MOCK_MARKET_DATA[timeRange];
  }, [timeRange]);

  return (
    <div className="space-y-6">
      {/* Header with time range selector */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Flame className="w-7 h-7 text-orange-600" />
              Market Movements
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Track biggest growth and decline sectors with AI-powered insights
            </p>
          </div>

          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Time range
            </label>
            <Select value={timeRange} onValueChange={(val: '7d' | '30d' | '90d') => setTimeRange(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Biggest Growth Section */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 border-2 border-green-200 dark:border-green-800">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            🚀 Biggest Growth
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="space-y-4">
            {marketData.growth.map((movement, index) => (
              <Card
                key={index}
                className="p-5 bg-white dark:bg-gray-800 border-2 border-green-300 dark:border-green-700 hover:shadow-lg transition-all"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {movement.category}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                          <span className="text-2xl font-bold text-green-600">
                            +{movement.change}
                          </span>
                          <span className="text-sm text-gray-500">new jobs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top companies */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Top companies:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {movement.topCompanies.map((company, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-white dark:bg-gray-800 border-green-300 dark:border-green-700"
                        >
                          {company.name} (+{company.change})
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* AI Insight */}
                  {movement.insight && (
                    <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-amber-900 dark:text-amber-100 mb-1">
                          💡 AI Insight:
                        </p>
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                          {movement.insight}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Biggest Declines Section */}
      <Card className="p-6 bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-gray-800 border-2 border-red-200 dark:border-red-800">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-red-600" />
            📉 Biggest Declines
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="space-y-4">
            {marketData.decline.map((movement, index) => (
              <Card
                key={index}
                className="p-5 bg-white dark:bg-gray-800 border-2 border-red-300 dark:border-red-700 hover:shadow-lg transition-all"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {movement.category}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                          <span className="text-2xl font-bold text-red-600">
                            {movement.change}
                          </span>
                          <span className="text-sm text-gray-500">jobs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top companies */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Top companies affected:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {movement.topCompanies.map((company, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-white dark:bg-gray-800 border-red-300 dark:border-red-700"
                        >
                          {company.name} ({company.change})
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* AI Insight */}
                  {movement.insight && (
                    <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">
                          💡 AI Insight:
                        </p>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          {movement.insight}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Job Titles Section */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            🆕 Emerging Job Titles
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            New roles that didn't exist or were rare {timeRange === '7d' ? 'last week' : timeRange === '30d' ? 'last month' : 'last quarter'}
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketData.newTitles.map((job, index) => (
              <Card
                key={index}
                className="p-4 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg transition-all"
              >
                <div className="space-y-3">
                  <div>
                    <Badge className="mb-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                      NEW
                    </Badge>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                      {job.title}
                    </h4>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {job.description}
                  </p>

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Companies hiring:</span>
                      <span className="font-semibold text-purple-600">
                        {job.companiesHiring}
                      </span>
                    </div>
                    {job.avgSalary && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Avg salary:</span>
                        <span className="font-semibold text-green-600">
                          {(job.avgSalary / 1000).toFixed(0)}k PLN
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
