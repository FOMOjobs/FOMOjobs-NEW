import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, Target } from 'lucide-react';
import type { AILimits } from '@/lib/mockAI';

interface AIUsageIndicatorProps {
  limits: AILimits | null;
  compact?: boolean;
}

/**
 * AI Usage Indicator Component
 *
 * Displays current AI usage statistics:
 * - Hourly requests (e.g., 3/10)
 * - Daily tokens (e.g., 12,450/50,000)
 * - Progress bar for daily token usage
 *
 * Usage:
 * ```tsx
 * const { limits } = useAIGeneration();
 * <AIUsageIndicator limits={limits} />
 * ```
 */
const AIUsageIndicator: React.FC<AIUsageIndicatorProps> = ({ limits, compact = false }) => {
  if (!limits) {
    return (
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="p-3">
          <div className="text-xs text-gray-500">Ładowanie limitów AI...</div>
        </CardContent>
      </Card>
    );
  }

  const hourlyPercentage = (limits.hourly.used / limits.hourly.limit) * 100;
  const dailyPercentage = (limits.daily.tokens / limits.daily.limit) * 100;

  // Determine color based on usage
  const getHourlyColor = () => {
    if (hourlyPercentage >= 90) return 'text-red-600';
    if (hourlyPercentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getDailyColor = () => {
    if (dailyPercentage >= 90) return 'text-red-600';
    if (dailyPercentage >= 70) return 'text-yellow-600';
    return 'text-purple-600';
  };

  // Format large numbers with thousands separator
  const formatNumber = (num: number): string => {
    return num.toLocaleString('pl-PL');
  };

  if (compact) {
    return (
      <div className="flex items-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <Zap className={`w-3.5 h-3.5 ${getHourlyColor()}`} />
          <span>
            <span className="font-semibold">{limits.hourly.used}</span>/{limits.hourly.limit}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Target className={`w-3.5 h-3.5 ${getDailyColor()}`} />
          <span>
            <span className="font-semibold">{formatNumber(limits.daily.tokens)}</span>/
            {formatNumber(limits.daily.limit)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-yellow-50">
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-700">Limity AI</h4>
          {(hourlyPercentage >= 80 || dailyPercentage >= 80) && (
            <span className="text-xs text-orange-600 font-medium">
              ⚠️ Zbliżasz się do limitu
            </span>
          )}
        </div>

        {/* Hourly Requests */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Zap className={`w-4 h-4 ${getHourlyColor()}`} />
              <span className="text-gray-600">Żądania (godzina)</span>
            </div>
            <span className={`font-semibold ${getHourlyColor()}`}>
              {limits.hourly.used}/{limits.hourly.limit}
            </span>
          </div>
          <Progress
            value={hourlyPercentage}
            className="h-1.5"
          />
        </div>

        {/* Daily Tokens */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Target className={`w-4 h-4 ${getDailyColor()}`} />
              <span className="text-gray-600">Tokeny (dziś)</span>
            </div>
            <span className={`font-semibold ${getDailyColor()}`}>
              {formatNumber(limits.daily.tokens)}/{formatNumber(limits.daily.limit)}
            </span>
          </div>
          <Progress
            value={dailyPercentage}
            className="h-1.5 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:to-yellow-500"
          />
        </div>

        {/* Reset Info */}
        <div className="text-xs text-gray-500 text-center pt-1 border-t border-gray-200">
          Reset za: {new Date(limits.resetTime).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIUsageIndicator;
