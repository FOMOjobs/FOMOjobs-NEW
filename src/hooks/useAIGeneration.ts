import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import * as mockAI from '@/lib/mockAI';
// import api from '@/lib/api'; // TODO: Uncomment when backend ready

/**
 * Feature flag to switch between mock and real API
 * Set to false when Andrzej completes the backend
 */
const USE_MOCK_API = true;

export interface AIGenerationHook {
  // State
  limits: mockAI.AILimits | null;
  isLoading: boolean;

  // Functions
  canUseAI: () => Promise<boolean>;
  generateSummary: (params: mockAI.GenerateSummaryParams) => Promise<string | null>;
  improveDescription: (params: mockAI.ImproveDescriptionParams) => Promise<string[] | null>;
  suggestKeywords: (params: mockAI.SuggestKeywordsParams) => Promise<string[] | null>;
  fetchLimits: () => Promise<void>;
}

/**
 * React hook for AI-powered CV generation features
 *
 * Features:
 * - Generate professional CV summaries
 * - Improve job descriptions with achievements
 * - Suggest ATS keywords
 * - Track usage limits (hourly/daily)
 *
 * Usage:
 * ```tsx
 * const { generateSummary, limits, isLoading } = useAIGeneration();
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
  const [limits, setLimits] = useState<mockAI.AILimits | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetch current usage limits
   */
  const fetchLimits = useCallback(async () => {
    try {
      if (USE_MOCK_API) {
        const limitsData = await mockAI.getLimits();
        setLimits(limitsData);
      } else {
        // TODO: Uncomment when backend ready
        // const { data } = await api.get('/api/ai/limits');
        // setLimits(data);
      }
    } catch (error) {
      console.error('Failed to fetch AI limits:', error);
    }
  }, []);

  /**
   * Load limits on mount
   */
  useEffect(() => {
    fetchLimits();
  }, [fetchLimits]);

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
        toast.success('✅ Podsumowanie wygenerowane!', {
          description: `Użyto ${result.tokensUsed || 0} tokenów`
        });

        // Refresh limits after successful generation
        await fetchLimits();

        return result.data;
      } else {
        toast.error('⚠️ Błąd generowania', {
          description: result.error || 'Nieznany błąd'
        });
        return null;
      }
    } catch (error) {
      console.error('Generate summary error:', error);
      toast.error('⚠️ Błąd połączenia', {
        description: 'Nie udało się połączyć z serwerem'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [canUseAI, fetchLimits]);

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
        toast.success('✅ Opis ulepszony!', {
          description: `Dodano ${result.data.length} osiągnięć`
        });

        // Refresh limits after successful generation
        await fetchLimits();

        return result.data;
      } else {
        toast.error('⚠️ Błąd ulepszania', {
          description: result.error || 'Nieznany błąd'
        });
        return null;
      }
    } catch (error) {
      console.error('Improve description error:', error);
      toast.error('⚠️ Błąd połączenia', {
        description: 'Nie udało się połączyć z serwerem'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [canUseAI, fetchLimits]);

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
        toast.success('✅ Słowa kluczowe wygenerowane!', {
          description: `Znaleziono ${result.data.length} słów kluczowych`
        });

        // Refresh limits after successful generation
        await fetchLimits();

        return result.data;
      } else {
        toast.error('⚠️ Błąd generowania słów kluczowych', {
          description: result.error || 'Nieznany błąd'
        });
        return null;
      }
    } catch (error) {
      console.error('Suggest keywords error:', error);
      toast.error('⚠️ Błąd połączenia', {
        description: 'Nie udało się połączyć z serwerem'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [canUseAI, fetchLimits]);

  return {
    limits,
    isLoading,
    canUseAI,
    generateSummary,
    improveDescription,
    suggestKeywords,
    fetchLimits
  };
};
