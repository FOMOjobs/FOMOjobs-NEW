import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Bot,
  TrendingUp,
  Briefcase,
  MapPin,
  DollarSign,
  Sparkles,
  Brain,
  Cpu,
  Eye,
} from 'lucide-react';

// AI job types data
const AI_JOB_TYPES = [
  'Machine Learning Engineer',
  'AI Researcher',
  'Data Scientist',
  'NLP Specialist',
  'Computer Vision Engineer',
  'MLOps Engineer',
  'Prompt Engineer',
  'AI Safety Researcher',
  'Deep Learning Engineer',
  'Robotics Engineer',
];

// Mock data for AI jobs
const AI_SUMMARY_STATS = {
  totalJobs: 487,
  monthChange: 23,
  newThisWeek: 56,
  avgSalary: 18500,
};

const AI_HIRING_COMPANIES = [
  {
    name: 'Google DeepMind',
    totalAIJobs: 65,
    types: [
      { role: 'ML Engineer', count: 28 },
      { role: 'AI Researcher', count: 22 },
      { role: 'Data Scientist', count: 15 },
    ],
    avgSalary: 28000,
  },
  {
    name: 'Microsoft Research',
    totalAIJobs: 52,
    types: [
      { role: 'AI Engineer', count: 24 },
      { role: 'NLP Specialist', count: 16 },
      { role: 'MLOps', count: 12 },
    ],
    avgSalary: 25000,
  },
  {
    name: 'OpenAI',
    totalAIJobs: 45,
    types: [
      { role: 'AI Researcher', count: 20 },
      { role: 'Prompt Engineer', count: 15 },
      { role: 'Safety Researcher', count: 10 },
    ],
    avgSalary: 32000,
  },
  {
    name: 'NVIDIA',
    totalAIJobs: 42,
    types: [
      { role: 'ML Engineer', count: 18 },
      { role: 'Computer Vision', count: 14 },
      { role: 'Deep Learning', count: 10 },
    ],
    avgSalary: 27000,
  },
  {
    name: 'Meta AI (FAIR)',
    totalAIJobs: 38,
    types: [
      { role: 'AI Researcher', count: 16 },
      { role: 'ML Engineer', count: 14 },
      { role: 'NLP Specialist', count: 8 },
    ],
    avgSalary: 26500,
  },
  {
    name: 'Amazon (AWS AI)',
    totalAIJobs: 35,
    types: [
      { role: 'ML Engineer', count: 16 },
      { role: 'MLOps Engineer', count: 12 },
      { role: 'Data Scientist', count: 7 },
    ],
    avgSalary: 22000,
  },
];

const GEOGRAPHIC_DISTRIBUTION = [
  { city: 'Warszawa', count: 180, percentage: 37, color: '#8B5CF6' },
  { city: 'Remote', count: 150, percentage: 31, color: '#F4D03F' },
  { city: 'Kraków', count: 95, percentage: 19, color: '#3B82F6' },
  { city: 'Wrocław', count: 40, percentage: 8, color: '#10B981' },
  { city: 'Gdańsk', count: 22, percentage: 5, color: '#F97316' },
];

const EMERGING_AI_ROLES = [
  { role: 'Prompt Engineer', growth: 156, description: 'New', avgSalary: 22000 },
  { role: 'AI Safety Researcher', growth: 89, description: 'Hot', avgSalary: 28000 },
  { role: 'MLOps Engineer', growth: 67, description: 'Growing', avgSalary: 20000 },
  { role: 'LLM Engineer', growth: 124, description: 'New', avgSalary: 24000 },
  { role: 'Computer Vision Lead', growth: 54, description: 'Growing', avgSalary: 26000 },
];

const AI_HIRING_TREND = [
  { month: 'Aug', jobs: 245 },
  { month: 'Sep', jobs: 298 },
  { month: 'Oct', jobs: 356 },
  { month: 'Nov', jobs: 412 },
  { month: 'Dec', jobs: 458 },
  { month: 'Jan', jobs: 487 },
];

const CHART_COLORS = ['#8B5CF6', '#F4D03F', '#3B82F6', '#10B981', '#F97316', '#EC4899'];

export default function AIJobsTrackerPanel() {
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

  const toggleWatchlist = (companyName: string) => {
    const newWatchlist = new Set(watchlist);
    if (newWatchlist.has(companyName)) {
      newWatchlist.delete(companyName);
    } else {
      newWatchlist.add(companyName);
    }
    setWatchlist(newWatchlist);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-purple-600 to-indigo-700 text-white border-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">🤖 AI Jobs Tracker</h2>
            <p className="text-purple-100 mt-1">
              Dedicated monitoring for AI/ML opportunities across Poland
            </p>
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total AI Jobs</p>
              <p className="text-4xl font-bold mt-1">{AI_SUMMARY_STATS.totalJobs}</p>
              <p className="text-purple-100 text-xs mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +{AI_SUMMARY_STATS.monthChange}% vs last month
              </p>
            </div>
            <Brain className="w-10 h-10 text-purple-200" />
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-100 text-sm">New This Week</p>
              <p className="text-4xl font-bold mt-1">{AI_SUMMARY_STATS.newThisWeek}</p>
              <p className="text-green-100 text-xs mt-2">Fresh opportunities</p>
            </div>
            <Sparkles className="w-10 h-10 text-green-200" />
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm">Avg Salary</p>
              <p className="text-4xl font-bold mt-1">
                {(AI_SUMMARY_STATS.avgSalary / 1000).toFixed(0)}k
              </p>
              <p className="text-blue-100 text-xs mt-2">PLN / month</p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-200" />
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-yellow-400 to-yellow-500 text-white border-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Remote Jobs</p>
              <p className="text-4xl font-bold mt-1">
                {Math.round((GEOGRAPHIC_DISTRIBUTION.find(d => d.city === 'Remote')?.percentage || 0))}%
              </p>
              <p className="text-yellow-100 text-xs mt-2">Work from anywhere</p>
            </div>
            <Cpu className="w-10 h-10 text-yellow-200" />
          </div>
        </Card>
      </div>

      {/* AI Hiring Trend Chart */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            AI Hiring Trend (6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={AI_HIRING_TREND}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="jobs"
                stroke="#8B5CF6"
                strokeWidth={3}
                name="AI Jobs"
                dot={{ fill: '#8B5CF6', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top AI Hiring Companies */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-600" />
            Top AI Hiring Companies
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="space-y-4">
            {AI_HIRING_COMPANIES.map((company, index) => (
              <Card
                key={index}
                className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg transition-all"
              >
                <div className="space-y-3">
                  {/* Company header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {company.name}
                        </h3>
                        <Badge variant="outline" className="mt-1 bg-purple-100 border-purple-300 text-purple-700">
                          🤖 {company.totalAIJobs} AI roles
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Avg salary</div>
                      <div className="text-xl font-bold text-green-600">
                        {(company.avgSalary / 1000).toFixed(0)}k PLN
                      </div>
                    </div>
                  </div>

                  {/* Job types */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-100 dark:border-purple-900">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">
                      Top AI roles:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {company.types.map((type, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                        >
                          {type.role} ({type.count})
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant={watchlist.has(company.name) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleWatchlist(company.name)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      {watchlist.has(company.name) ? 'Watching' : 'Watch'}
                    </Button>
                    <Button variant="outline" size="sm">
                      View All Roles
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Geographic Distribution & Emerging Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              📍 Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={GEOGRAPHIC_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ city, percentage }) => `${city}: ${percentage}%`}
                  outerRadius={100}
                  dataKey="count"
                >
                  {GEOGRAPHIC_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend with counts */}
            <div className="mt-4 space-y-2">
              {GEOGRAPHIC_DISTRIBUTION.map((location, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: location.color }}
                    />
                    <span className="text-gray-700 dark:text-gray-300">{location.city}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {location.count}
                    </span>
                    <span className="text-gray-500 w-12 text-right">
                      {location.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emerging AI Roles */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              🔥 Emerging AI Roles
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="space-y-3">
              {EMERGING_AI_ROLES.map((role, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-lg border border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {role.role}
                        </h4>
                        <Badge
                          variant="outline"
                          className={
                            role.description === 'New'
                              ? 'bg-green-100 border-green-300 text-green-700'
                              : 'bg-blue-100 border-blue-300 text-blue-700'
                          }
                        >
                          {role.description}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Avg: {(role.avgSalary / 1000).toFixed(0)}k PLN
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">
                        +{role.growth}%
                      </div>
                      <div className="text-xs text-gray-500">growth</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(role.growth, 100)}%` }}
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
