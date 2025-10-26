import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Sparkles } from 'lucide-react';
import { getRemainingRequests, getResetTime, getMaxRequestsPerHour } from '@/utils/aiRateLimiter';

interface AIUsageIndicatorProps {
  compact?: boolean;
}

/**
 * AI Usage Indicator Component (Redesigned)
 *
 * Displays AI generation limits in a professional, simple way:
 * - Single counter: X/4 remaining generations
 * - Reset countdown (e.g., "42 min")
 * - Warning when limit reached or almost reached
 * - Refreshes every minute
 *
 * Usage:
 * ```tsx
 * <AIUsageIndicator />
 * ```
 */
const AIUsageIndicator: React.FC<AIUsageIndicatorProps> = ({ compact = false }) => {
  const [remaining, setRemaining] = useState(getRemainingRequests());
  const [resetTime, setResetTime] = useState(getResetTime());

  // Refresh every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getRemainingRequests());
      setResetTime(getResetTime());
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);

  const maxRequests = getMaxRequestsPerHour();

  // Compact version (inline)
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Sparkles className="w-3.5 h-3.5" />
        <span>
          <span className="font-semibold">{remaining}</span>/{maxRequests} generacji
        </span>
        <span className="text-xs">• Reset za: {resetTime}</span>
      </div>
    );
  }

  // Full version (card)
  return (
    <Card className="bg-muted/50 border-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Pozostałe generacje AI</p>
            <p className="text-xs text-muted-foreground">
              Reset za: {resetTime}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={remaining > 0 ? "default" : "destructive"} className="text-sm px-3 py-1">
              {remaining}/{maxRequests}
            </Badge>
          </div>
        </div>

        {/* Warning when limit exceeded */}
        {remaining === 0 && (
          <Alert className="mt-3" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Wykorzystano wszystkie generacje w tej godzinie.
              Możesz edytować podsumowanie ręcznie lub poczekać {resetTime}.
            </AlertDescription>
          </Alert>
        )}

        {/* Warning when only 1 left */}
        {remaining === 1 && (
          <Alert className="mt-3 border-yellow-500 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Pozostała ostatnia generacja w tej godzinie.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default AIUsageIndicator;
