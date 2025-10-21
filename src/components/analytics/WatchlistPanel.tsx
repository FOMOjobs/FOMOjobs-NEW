import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Star, ExternalLink, Flame, ChartBar, AlertTriangle, Sparkles } from 'lucide-react';

interface CompanyTrend {
  id: string;
  company: string;
  currentJobs: number;
  previousJobs: number;
  percentageChange: number;
  trend: 'growth' | 'decline' | 'stable';
  topCategories: Array<{ category: string; count: number }>;
  totalAIJobs?: number;
}

interface Alert {
  type: 'fire' | 'growth' | 'decline' | 'new' | 'urgent';
  icon: string;
  message: string;
  color: string;
}

interface WatchlistPanelProps {
  watchlist: Set<string>;
  onRemoveFromWatchlist: (companyId: string) => void;
}

// Mock data matching CompanyTrendsPanel
const MOCK_COMPANY_TRENDS: CompanyTrend[] = [
  {
    id: 'capgemini',
    company: 'Capgemini',
    currentJobs: 200,
    previousJobs: 100,
    percentageChange: 100,
    trend: 'growth',
    topCategories: [
      { category: 'IT', count: 80 },
      { category: 'Consulting', count: 60 },
      { category: 'Project Management', count: 40 },
    ],
    totalAIJobs: 15,
  },
  {
    id: 'google',
    company: 'Google',
    currentJobs: 145,
    previousJobs: 100,
    percentageChange: 45,
    trend: 'growth',
    topCategories: [
      { category: 'Software Engineering', count: 70 },
      { category: 'AI/ML', count: 35 },
      { category: 'Product Management', count: 25 },
    ],
    totalAIJobs: 35,
  },
  {
    id: 'microsoft',
    company: 'Microsoft',
    currentJobs: 105,
    previousJobs: 100,
    percentageChange: 5,
    trend: 'stable',
    topCategories: [
      { category: 'Cloud Engineering', count: 45 },
      { category: 'Software Development', count: 35 },
      { category: 'DevOps', count: 15 },
    ],
    totalAIJobs: 12,
  },
  {
    id: 'amazon',
    company: 'Amazon',
    currentJobs: 180,
    previousJobs: 150,
    percentageChange: 20,
    trend: 'growth',
    topCategories: [
      { category: 'Operations', count: 65 },
      { category: 'Software Engineering', count: 55 },
      { category: 'Logistics', count: 40 },
    ],
    totalAIJobs: 8,
  },
  {
    id: 'deloitte',
    company: 'Deloitte',
    currentJobs: 160,
    previousJobs: 140,
    percentageChange: 14,
    trend: 'growth',
    topCategories: [
      { category: 'Consulting', count: 70 },
      { category: 'Finance', count: 45 },
      { category: 'Technology', count: 30 },
    ],
    totalAIJobs: 5,
  },
  {
    id: 'accenture',
    company: 'Accenture',
    currentJobs: 90,
    previousJobs: 120,
    percentageChange: -25,
    trend: 'decline',
    topCategories: [
      { category: 'Consulting', count: 40 },
      { category: 'IT Services', count: 30 },
      { category: 'Digital', count: 15 },
    ],
    totalAIJobs: 3,
  },
  {
    id: 'meta',
    company: 'Meta',
    currentJobs: 85,
    previousJobs: 110,
    percentageChange: -23,
    trend: 'decline',
    topCategories: [
      { category: 'Software Engineering', count: 40 },
      { category: 'Product', count: 25 },
      { category: 'Data Science', count: 15 },
    ],
    totalAIJobs: 18,
  },
  {
    id: 'pwc',
    company: 'PwC',
    currentJobs: 130,
    previousJobs: 125,
    percentageChange: 4,
    trend: 'stable',
    topCategories: [
      { category: 'Audit', count: 50 },
      { category: 'Tax', count: 40 },
      { category: 'Advisory', count: 30 },
    ],
    totalAIJobs: 2,
  },
  {
    id: 'netflix',
    company: 'Netflix',
    currentJobs: 115,
    previousJobs: 95,
    percentageChange: 21,
    trend: 'growth',
    topCategories: [
      { category: 'Content', count: 45 },
      { category: 'Engineering', count: 40 },
      { category: 'Product', count: 20 },
    ],
    totalAIJobs: 10,
  },
  {
    id: 'salesforce',
    company: 'Salesforce',
    currentJobs: 125,
    previousJobs: 120,
    percentageChange: 4,
    trend: 'stable',
    topCategories: [
      { category: 'Sales', count: 50 },
      { category: 'Engineering', count: 40 },
      { category: 'Customer Success', count: 25 },
    ],
    totalAIJobs: 7,
  },
];

const WatchlistPanel: React.FC<WatchlistPanelProps> = ({ watchlist, onRemoveFromWatchlist }) => {
  // Filter companies to show only watched ones
  const watchedCompanies = MOCK_COMPANY_TRENDS.filter((c) => watchlist.has(c.id));

  // Generate alerts for a company
  const getAlerts = (company: CompanyTrend): Alert[] => {
    const alerts: Alert[] = [];

    // Fire alert: Major growth (>50 new jobs)
    const jobsAdded = company.currentJobs - company.previousJobs;
    if (jobsAdded > 50) {
      alerts.push({
        type: 'fire',
        icon: '🔥',
        message: `Wzrost o ${jobsAdded} pozycji!`,
        color: 'text-orange-700 bg-orange-50 border-orange-300',
      });
    }

    // Growth alert: >20% increase
    if (company.percentageChange > 20 && jobsAdded <= 50) {
      alerts.push({
        type: 'growth',
        icon: '📈',
        message: `Duży wzrost: +${company.percentageChange}%`,
        color: 'text-green-700 bg-green-50 border-green-300',
      });
    }

    // Decline alert: <-10% decrease
    if (company.percentageChange < -10) {
      alerts.push({
        type: 'decline',
        icon: '📉',
        message: `Spadek: ${company.percentageChange}%`,
        color: 'text-red-700 bg-red-50 border-red-300',
      });
    }

    // New category alert: High AI jobs
    if (company.totalAIJobs && company.totalAIJobs > 15) {
      alerts.push({
        type: 'new',
        icon: '🆕',
        message: `Dużo ofert AI: ${company.totalAIJobs} pozycji`,
        color: 'text-purple-700 bg-purple-50 border-purple-300',
      });
    }

    // Urgent hiring: Many positions added recently
    if (jobsAdded > 30 && company.percentageChange > 15) {
      alerts.push({
        type: 'urgent',
        icon: '⚡',
        message: 'Pilne rekrutacje - szybkie zatrudnianie!',
        color: 'text-yellow-700 bg-yellow-50 border-yellow-300',
      });
    }

    return alerts;
  };

  // Empty state
  if (watchedCompanies.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <Star className="w-16 h-16 mx-auto mb-4 text-purple-300" />
          <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">
            Nie obserwujesz jeszcze żadnych firm
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Dodaj firmy do obserwowanych, aby otrzymywać:
          </p>
          <div className="space-y-2 mb-6 text-left">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-purple-600 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Alerty o zmianach w rekrutacji</span>
            </div>
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Powiadomienia o nowych kategoriach</span>
            </div>
            <div className="flex items-start gap-2">
              <ChartBar className="w-5 h-5 text-purple-600 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Priorytetowy dostęp do trendów</span>
            </div>
          </div>
          <Button
            onClick={() => {
              // Navigate to Company Trends tab
              const tabTrigger = document.querySelector('[value="company-trends"]') as HTMLElement;
              if (tabTrigger) tabTrigger.click();
            }}
            className="bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600"
          >
            Przeglądaj firmy →
          </Button>
        </div>
      </Card>
    );
  }

  // Count total alerts
  const totalAlerts = watchedCompanies.reduce((sum, company) => {
    return sum + getAlerts(company).length;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Star className="w-6 h-6 text-purple-600" />
            Moje obserwowane firmy ({watchedCompanies.length})
          </h2>
          {totalAlerts > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              🔔 Masz {totalAlerts} {totalAlerts === 1 ? 'alert' : totalAlerts < 5 ? 'alerty' : 'alertów'}
            </p>
          )}
        </div>
      </div>

      {/* Watched companies list */}
      <div className="space-y-4">
        {watchedCompanies.map((company) => {
          const alerts = getAlerts(company);
          const hasAlerts = alerts.length > 0;

          return (
            <Card
              key={company.id}
              className={`p-6 transition-all ${
                hasAlerts
                  ? 'border-2 border-purple-300 shadow-lg bg-gradient-to-r from-purple-50/50 to-yellow-50/50 dark:from-purple-900/10 dark:to-yellow-900/10'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Company header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{company.company}</h3>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                      <Star className="w-3 h-3 mr-1" />
                      OBSERWOWANE
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Current: {company.currentJobs} roles</span>
                    <span>•</span>
                    <span>Previous: {company.previousJobs}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      {company.trend === 'growth' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : company.trend === 'decline' ? (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      ) : null}
                      <span
                        className={
                          company.percentageChange > 0
                            ? 'text-green-600 font-semibold'
                            : company.percentageChange < 0
                            ? 'text-red-600 font-semibold'
                            : 'text-gray-600 font-semibold'
                        }
                      >
                        {company.percentageChange > 0 ? '+' : ''}
                        {company.percentageChange}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts section */}
              {hasAlerts && (
                <div className="space-y-2 mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-200 dark:border-purple-700">
                  {alerts.map((alert, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-sm font-medium p-2 rounded border ${alert.color}`}
                    >
                      <span className="text-lg">{alert.icon}</span>
                      <span>ALERT: {alert.message}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* No alerts message */}
              {!hasAlerts && (
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">
                  Brak alertów - stabilna rekrutacja
                </div>
              )}

              {/* Top categories */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Top kategorie:</p>
                <div className="flex flex-wrap gap-2">
                  {company.topCategories.slice(0, 3).map((cat) => (
                    <Badge key={cat.category} variant="outline" className="text-xs">
                      {cat.category} ({cat.count})
                    </Badge>
                  ))}
                  {company.totalAIJobs && company.totalAIJobs > 0 && (
                    <Badge className="bg-purple-100 text-purple-700 border-purple-300 text-xs">
                      🤖 AI: {company.totalAIJobs}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveFromWatchlist(company.id)}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Przestań obserwować
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  Zobacz szczegóły
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WatchlistPanel;
