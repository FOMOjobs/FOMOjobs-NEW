/**
 * AI Rate Limiter
 *
 * Simple, professional rate limiting for AI generation features.
 * - 4 requests per hour (to prevent bankruptcy from API overuse)
 * - Single counter (no complex token tracking)
 * - Automatic hourly reset
 * - Persistent across page reloads (localStorage)
 */

interface AIRateLimit {
  count: number;
  resetAt: number;
}

const AI_LIMIT_KEY = 'fomojobs_ai_rate_limit';
const MAX_REQUESTS_PER_HOUR = 4;

/**
 * Get current AI rate limit state
 * Automatically resets if hour has passed
 */
export const getAIRateLimit = (): AIRateLimit => {
  const stored = localStorage.getItem(AI_LIMIT_KEY);

  if (!stored) {
    return { count: 0, resetAt: Date.now() + 3600000 }; // 1 hour from now
  }

  const limit: AIRateLimit = JSON.parse(stored);

  // Check if hour has passed - reset counter
  if (Date.now() >= limit.resetAt) {
    return { count: 0, resetAt: Date.now() + 3600000 };
  }

  return limit;
};

/**
 * Attempt to increment AI usage counter
 * @returns true if request allowed, false if limit exceeded
 */
export const incrementAIUsage = (): boolean => {
  const limit = getAIRateLimit();

  // Check if limit exceeded
  if (limit.count >= MAX_REQUESTS_PER_HOUR) {
    return false; // Limit exceeded
  }

  // Increment counter and save
  const newLimit: AIRateLimit = {
    count: limit.count + 1,
    resetAt: limit.resetAt
  };

  localStorage.setItem(AI_LIMIT_KEY, JSON.stringify(newLimit));
  return true;
};

/**
 * Decrement AI usage counter (e.g., when API call fails)
 * Used to give back a request if generation fails
 */
export const decrementAIUsage = (): void => {
  const limit = getAIRateLimit();

  const newLimit: AIRateLimit = {
    count: Math.max(0, limit.count - 1),
    resetAt: limit.resetAt
  };

  localStorage.setItem(AI_LIMIT_KEY, JSON.stringify(newLimit));
};

/**
 * Get number of remaining requests in current hour
 */
export const getRemainingRequests = (): number => {
  const limit = getAIRateLimit();
  return Math.max(0, MAX_REQUESTS_PER_HOUR - limit.count);
};

/**
 * Get human-readable time until reset
 * Examples: "42 min", "1h 15min", "teraz"
 */
export const getResetTime = (): string => {
  const limit = getAIRateLimit();
  const now = Date.now();
  const diff = limit.resetAt - now;

  if (diff <= 0) return 'teraz';

  const minutes = Math.ceil(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${mins}min`;
  }
  return `${mins} min`;
};

/**
 * Get max requests per hour constant
 */
export const getMaxRequestsPerHour = (): number => {
  return MAX_REQUESTS_PER_HOUR;
};

/**
 * Reset AI usage (for testing purposes)
 */
export const resetAIUsage = (): void => {
  localStorage.removeItem(AI_LIMIT_KEY);
};
