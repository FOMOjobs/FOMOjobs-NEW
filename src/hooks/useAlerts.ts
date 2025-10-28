// Custom hook for alerts management
// Handles fetching, creating, updating, toggling, and deleting user alerts
// MIGRATED TO LARAVEL API

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';

export interface UserAlert {
  id: number;
  user_id: number;
  alert_name: string;
  alert_time: string;
  companies: string[];
  experience_levels: string[];
  job_categories: string[];
  is_active: boolean;
  last_sent_at?: string | null;
  created_at: string;
  updated_at: string;
}

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<UserAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Fetch all user alerts
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get('/alerts');
      setAlerts(data.data || data);
    } catch (err: unknown) {
      console.error('Error fetching alerts:', err);
      const errorMessage = err instanceof Error && 'response' in err
        ? ((err as any).response?.data?.message || 'Nie udało się pobrać alertów')
        : 'Nie udało się pobrać alertów';
      setError(errorMessage);

      toast.error('Błąd', {
        description: 'Nie udało się wczytać alertów',
      });
    } finally {
      setLoading(false);
    }
  };

  // Create new alert
  const createAlert = async (alertData: Omit<UserAlert, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data } = await api.post('/alerts', alertData);
      setAlerts([...alerts, data.data]);

      toast.success('Alert utworzony pomyślnie! 🎉', {
        description: `Alert "${alertData.alert_name}" został zapisany.`,
      });

      return data.data;
    } catch (err: unknown) {
      console.error('Error creating alert:', err);

      const errorMessage = err instanceof Error && 'response' in err
        ? ((err as any).response?.data?.message || 'Nie udało się utworzyć alertu')
        : 'Nie udało się utworzyć alertu';

      toast.error('Błąd', {
        description: errorMessage,
      });

      throw err;
    }
  };

  // Update alert
  const updateAlert = async (id: number, alertData: Partial<UserAlert>) => {
    try {
      const { data } = await api.put(`/alerts/${id}`, alertData);
      setAlerts(alerts.map(a => a.id === id ? data.data : a));

      toast.success('Alert zaktualizowany pomyślnie! 🎉', {
        description: 'Zmiany zostały zapisane.',
      });

      return data.data;
    } catch (err: unknown) {
      console.error('Error updating alert:', err);

      const errorMessage = err instanceof Error && 'response' in err
        ? ((err as any).response?.data?.message || 'Nie udało się zaktualizować alertu')
        : 'Nie udało się zaktualizować alertu';

      toast.error('Błąd', {
        description: errorMessage,
      });

      throw err;
    }
  };

  // Toggle alert status
  const toggleAlertStatus = async (id: number) => {
    try {
      const alert = alerts.find(a => a.id === id);
      if (!alert) return;

      const { data } = await api.patch(`/alerts/${id}/toggle`);
      setAlerts(alerts.map(a => a.id === id ? data.data : a));

      toast.success(
        data.data.is_active ? '✅ Alert aktywowany' : '⏸️ Alert wstrzymany',
        {
          description: data.data.is_active
            ? 'Będziesz otrzymywać powiadomienia'
            : 'Powiadomienia zostały wstrzymane'
        }
      );
    } catch (err: unknown) {
      console.error('Error toggling alert status:', err);

      toast.error('Błąd', {
        description: 'Nie udało się zmienić statusu alertu',
      });
    }
  };

  // Delete alert
  const deleteAlert = async (id: number) => {
    try {
      await api.delete(`/alerts/${id}`);
      setAlerts(alerts.filter(a => a.id !== id));

      toast.success('🗑️ Alert usunięty', {
        description: 'Alert został pomyślnie usunięty'
      });
    } catch (err: unknown) {
      console.error('Error deleting alert:', err);

      toast.error('Błąd', {
        description: 'Nie udało się usunąć alertu',
      });
    }
  };

  // Get alert by ID
  const getAlertById = async (id: number): Promise<UserAlert | null> => {
    try {
      const { data } = await api.get(`/alerts/${id}`);
      return data.data || data;
    } catch (err: unknown) {
      console.error('Error fetching alert:', err);

      toast.error('Błąd', {
        description: 'Nie udało się wczytać alertu',
      });

      return null;
    }
  };

  return {
    alerts,
    loading,
    error,
    fetchAlerts,
    createAlert,
    updateAlert,
    toggleAlertStatus,
    deleteAlert,
    getAlertById,
  };
};
