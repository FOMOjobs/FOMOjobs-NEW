import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import * as mockAI from '@/lib/mockAI';
import { getRemainingRequests, getResetTime, decrementAIUsage } from '@/utils/aiRateLimiter';
// import api from '@/lib/api'; // TODO: Uncomment when backend ready

/**
 * Feature flag to switch between mock and real API
 * Set to false when Andrzej completes the backend
 */
const USE_MOCK_API = true;

export interface AIGenerationHook {
  // State
  isLoading: boolean;

  // Functions
  canUseAI: () => Promise<boolean>;
  generateSummary: (params: mockAI.GenerateSummaryParams) => Promise<string | null>;
  improveDescription: (params: mockAI.ImproveDescriptionParams) => Promise<string[] | null>;
  suggestKeywords: (params: mockAI.SuggestKeywordsParams) => Promise<string[] | null>;
}

/**
 * React hook for AI-powered CV generation features
 *
 * NEW RATE LIMITING:
 * - Simple: 4 requests/hour (no token tracking)
 * - Managed by src/utils/aiRateLimiter.ts
 * - Professional error messages
 *
 * Features:
 * - Generate professional CV summaries
 * - Improve job descriptions with achievements
 * - Suggest ATS keywords
 *
 * Usage:
 * ```tsx
 * const { generateSummary, isLoading } = useAIGeneration();
 *
 * const handleGenerate = async () => {
 *   const summary = await generateSummary({ ...params });
 *   if (summary) {
 *     updatePersonalInfo({ summary });
 *   }
 * };
 * ```
 */
export const useAIGeneration = (): AIGenerationHook => {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Check if user can make AI request
   * Validates against hourly and daily limits
   */
  const canUseAI = useCallback(async (): Promise<boolean> => {
    try {
      if (USE_MOCK_API) {
        const check = await mockAI.canUseAI();
        if (!check.allowed) {
          toast.error('⏰ Limit wyczerpany', {
            description: check.reason
          });
          return false;
        }
        return true;
      } else {
        // TODO: Uncomment when backend ready
        // const { data } = await api.get('/api/ai/can-use');
        // if (!data.allowed) {
        //   toast.error('⏰ Limit wyczerpany', {
        //     description: data.reason
        //   });
        //   return false;
        // }
        // return true;
        return true;
      }
    } catch (error) {
      toast.error('⚠️ Błąd sprawdzania limitów');
      return false;
    }
  }, []);

  /**
   * Generate professional CV summary
   *
   * @param params - Experience, education, skills, tone, and language
   * @returns Generated summary text or null if failed
   */
  const generateSummary = useCallback(async (
    params: mockAI.GenerateSummaryParams
  ): Promise<string | null> => {
    // Validate can use AI
    const allowed = await canUseAI();
    if (!allowed) return null;

    setIsLoading(true);

    try {
      let result: mockAI.AIResponse<string>;

      if (USE_MOCK_API) {
        result = await mockAI.generateSummary(params);
      } else {
        // TODO: Uncomment when backend ready
        // const { data } = await api.post('/api/ai/generate-summary', params);
        // result = {
        //   success: data.success,
        //   data: data.summary,
        //   tokensUsed: data.tokensUsed,
        //   error: data.error
        // };
        result = { success: false, error: 'Backend not implemented' };
      }

      if (result.success && result.data) {
        const remaining = getRemainingRequests();
        toast.success('Podsumowanie wygenerowane!', {
          description: `Pozostało ${remaining}/4 generacji. Reset za: ${getResetTime()}`
        });

        return result.data;
      } else {
        // If generation failed, give back the request
        decrementAIUsage();

        toast.error('Nie udało się wygenerować podsumowania', {
          description: result.error || 'Spróbuj ponownie lub napisz własne podsumowanie'
        });
        return null;
      }
    } catch (error) {
      // If error, give back the request
      decrementAIUsage();

      console.error('Generate summary error:', error);
      toast.error('Nie udało się wygenerować podsumowania', {
        description: 'Spróbuj ponownie lub napisz własne podsumowanie'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [canUseAI]);

  /**
   * Improve job description by converting to achievement-focused bullet points
   *
   * @param params - Job title, current description, and language
   * @returns Array of achievement bullet points or null if failed
   */
  const improveDescription = useCallback(async (
    params: mockAI.ImproveDescriptionParams
  ): Promise<string[] | null> => {
    // Validate can use AI
    const allowed = await canUseAI();
    if (!allowed) return null;

    setIsLoading(true);

    try {
      let result: mockAI.AIResponse<string[]>;

      if (USE_MOCK_API) {
        result = await mockAI.improveDescription(params);
      } else {
        // TODO: Uncomment when backend ready
        // const { data } = await api.post('/api/ai/improve-description', params);
        // result = {
        //   success: data.success,
        //   data: data.achievements,
        //   tokensUsed: data.tokensUsed,
        //   error: data.error
        // };
        result = { success: false, error: 'Backend not implemented' };
      }

      if (result.success && result.data) {
        const remaining = getRemainingRequests();
        toast.success('Opis ulepszony!', {
          description: `Dodano ${result.data.length} osiągnięć. Pozostało ${remaining}/4 generacji.`
        });

        return result.data;
      } else {
        // If generation failed, give back the request
        decrementAIUsage();

        toast.error('Nie udało się ulepszyć opisu', {
          description: result.error || 'Spróbuj ponownie'
        });
        return null;
      }
    } catch (error) {
      // If error, give back the request
      decrementAIUsage();

      console.error('Improve description error:', error);
      toast.error('Nie udało się ulepszyć opisu', {
        description: 'Spróbuj ponownie'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [canUseAI]);

  /**
   * Suggest relevant keywords for ATS optimization
   *
   * @param params - Job title, industry, and language
   * @returns Array of keyword suggestions or null if failed
   */
  const suggestKeywords = useCallback(async (
    params: mockAI.SuggestKeywordsParams
  ): Promise<string[] | null> => {
    // Validate can use AI
    const allowed = await canUseAI();
    if (!allowed) return null;

    setIsLoading(true);

    try {
      let result: mockAI.AIResponse<string[]>;

      if (USE_MOCK_API) {
        result = await mockAI.suggestKeywords(params);
      } else {
        // TODO: Uncomment when backend ready
        // const { data } = await api.post('/api/ai/suggest-keywords', params);
        // result = {
        //   success: data.success,
        //   data: data.keywords,
        //   tokensUsed: data.tokensUsed,
        //   error: data.error
        // };
        result = { success: false, error: 'Backend not implemented' };
      }

      if (result.success && result.data) {
        const remaining = getRemainingRequests();
        toast.success('Słowa kluczowe wygenerowane!', {
          description: `Znaleziono ${result.data.length} słów. Pozostało ${remaining}/4 generacji.`
        });

        return result.data;
      } else {
        // If generation failed, give back the request
        decrementAIUsage();

        toast.error('Nie udało się wygenerować słów kluczowych', {
          description: result.error || 'Spróbuj ponownie'
        });
        return null;
      }
    } catch (error) {
      // If error, give back the request
      decrementAIUsage();

      console.error('Suggest keywords error:', error);
      toast.error('Nie udało się wygenerować słów kluczowych', {
        description: 'Spróbuj ponownie'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [canUseAI]);

  return {
    isLoading,
    canUseAI,
    generateSummary,
    improveDescription,
    suggestKeywords
  };
};
