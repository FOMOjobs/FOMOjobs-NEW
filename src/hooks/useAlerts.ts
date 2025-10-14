// Custom hook for alerts management
// Handles fetching, toggling, and deleting user alerts

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserAlert {
  id: string;
  user_id: string;
  alert_name: string;
  notification_time: string;
  is_active: boolean;
  selected_companies: string[];
  selected_levels: string[];
  selected_categories: string[];
  created_at: string;
  updated_at: string;
  last_sent_at: string | null;
}

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<UserAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('Not authenticated');
      }

      const { data, error: fetchError } = await supabase
        .from('user_alerts' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setAlerts((data as any) || []);
    } catch (err: any) {
      console.error('Error fetching alerts:', err);
      setError(err.message || 'Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  };

  const toggleAlertStatus = async (alertId: string) => {
    try {
      const alert = alerts.find((a) => a.id === alertId);
      if (!alert) return;

      const { error: updateError } = await supabase
        .from('user_alerts' as any)
        .update({ is_active: !alert.is_active })
        .eq('id', alertId);

      if (updateError) throw updateError;

      // Update local state
      setAlerts(
        alerts.map((a) =>
          a.id === alertId ? { ...a, is_active: !a.is_active } : a
        )
      );

      toast.success(
        !alert.is_active ? 'Alert aktywowany' : 'Alert dezaktywowany',
        {
          description: !alert.is_active
            ? 'Będziesz otrzymywać powiadomienia'
            : 'Powiadomienia zostały wstrzymane',
        }
      );
    } catch (err: any) {
      console.error('Error toggling alert status:', err);
      toast.error('Błąd', {
        description: 'Nie udało się zmienić statusu alertu',
      });
    }
  };

  const deleteAlert = async (alertId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('user_alerts' as any)
        .delete()
        .eq('id', alertId);

      if (deleteError) throw deleteError;

      // Update local state
      setAlerts(alerts.filter((a) => a.id !== alertId));

      toast.success('Alert usunięty', {
        description: 'Alert został pomyślnie usunięty',
      });
    } catch (err: any) {
      console.error('Error deleting alert:', err);
      toast.error('Błąd', {
        description: 'Nie udało się usunąć alertu',
      });
    }
  };

  const getAlertById = async (alertId: string): Promise<UserAlert | null> => {
    try {
      const { data, error } = await supabase
        .from('user_alerts' as any)
        .select('*')
        .eq('id', alertId)
        .single();

      if (error) throw error;

      return (data as any) || null;
    } catch (err: any) {
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
    toggleAlertStatus,
    deleteAlert,
    getAlertById,
  };
};
