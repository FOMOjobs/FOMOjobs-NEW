// Step 4: Summary & Save - Match original design
// Final step where user names the alert, sets notification time, reviews, and saves

import { useState } from 'react';
import { useAlertStore } from '@/stores/alertStore';
import { COMPANIES, EXPERIENCE_LEVELS, JOB_CATEGORIES } from '@/data/alertData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Step4SummaryProps {
  editMode?: boolean;
  alertId?: string;
}

const Step4Summary = ({ editMode = false, alertId }: Step4SummaryProps) => {
  const {
    selectedCompanies,
    selectedLevels,
    selectedCategories,
    alertName,
    notificationTime,
    setAlertName,
    setNotificationTime,
    resetAlert,
  } = useAlertStore();

  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  // Generate time options (07:00 - 21:00)
  const timeOptions = Array.from({ length: 15 }, (_, i) => {
    const hour = (7 + i).toString().padStart(2, '0');
    return `${hour}:00`;
  });

  // Get names for summary
  const getCompanyNames = () =>
    COMPANIES
      .filter((c) => selectedCompanies.includes(c.id.toString()))
      .map((c) => c.name)
      .join(', ');

  const getLevelNames = () =>
    EXPERIENCE_LEVELS
      .filter((l) => selectedLevels.includes(l.id.toString()))
      .map((l) => l.name)
      .join(', ');

  const getCategoryNames = () => {
    const allPositions = JOB_CATEGORIES.flatMap((g) => g.positions);
    return allPositions
      .filter((p) => selectedCategories.includes(p.id.toString()))
      .map((p) => p.name)
      .join(', ');
  };

  const canSave =
    alertName.trim().length >= 3 &&
    selectedCompanies.length > 0 &&
    selectedLevels.length > 0 &&
    selectedCategories.length > 0;

  const handleSave = async () => {
    if (!canSave) return;

    setIsSaving(true);

    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error('Musisz być zalogowany, aby utworzyć alert');
        navigate('/auth');
        return;
      }

      // Convert IDs to names for storage
      const companyNames = COMPANIES
        .filter((c) => selectedCompanies.includes(c.id.toString()))
        .map((c) => c.name);

      const levelNames = EXPERIENCE_LEVELS
        .filter((l) => selectedLevels.includes(l.id.toString()))
        .map((l) => l.name);

      const allPositions = JOB_CATEGORIES.flatMap((g) => g.positions);
      const categoryNames = allPositions
        .filter((p) => selectedCategories.includes(p.id.toString()))
        .map((p) => p.name);

      const alertData = {
        user_id: user.id,
        alert_name: alertName.trim(),
        notification_time: notificationTime,
        selected_companies: companyNames,
        selected_levels: levelNames,
        selected_categories: categoryNames,
        is_active: true,
      };

      let result;
      if (editMode && alertId) {
        // UPDATE existing alert
        result = await supabase
          .from('user_alerts' as any)
          .update(alertData)
          .eq('id', alertId);
      } else {
        // INSERT new alert
        result = await supabase.from('user_alerts' as any).insert(alertData);
      }

      if (result.error) {
        console.error('Error saving alert:', result.error);
        toast.error('Nie udało się zapisać alertu. Spróbuj ponownie.');
        return;
      }

      // Success
      toast.success(
        editMode
          ? 'Alert zaktualizowany pomyślnie! 🎉'
          : 'Alert utworzony pomyślnie! 🎉',
        {
          description: `"${alertName}" został pomyślnie ${
            editMode ? 'zaktualizowany' : 'utworzony'
          }`,
        }
      );
      resetAlert();
      navigate('/alerts');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Wystąpił nieoczekiwany błąd');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        4. Nazwij alert i wybierz godzinę powiadomienia:
      </h2>

      {/* Alert Name */}
      <div>
        <Label
          htmlFor="alertName"
          className="text-sm font-medium text-gray-900 mb-1"
        >
          Nazwa Alertu
        </Label>
        <Input
          id="alertName"
          type="text"
          value={alertName}
          onChange={(e) => setAlertName(e.target.value)}
          placeholder="np. HR Kraków, Manager IT Warszawa"
          className="mt-1 focus:ring-purple-600 focus:border-purple-600"
        />
        <p className="mt-1 text-xs text-gray-600">
          Ta nazwa pomoże Ci zidentyfikować alert na liście.
        </p>
      </div>

      {/* Alert Time */}
      <div>
        <Label
          htmlFor="alertTime"
          className="text-sm font-medium text-gray-900 mb-1"
        >
          Godzina Codziennego Alertu
        </Label>
        <Select value={notificationTime} onValueChange={setNotificationTime}>
          <SelectTrigger className="mt-1 w-full sm:w-1/2 md:w-1/3 focus:ring-purple-600 focus:border-purple-600">
            <SelectValue placeholder="Wybierz godzinę" />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="mt-1 text-xs text-gray-600">
          O tej godzinie otrzymasz e-mail z zestawieniem nowych ofert.
        </p>
      </div>

      {/* Summary Box */}
      {(alertName ||
        selectedCompanies.length > 0 ||
        selectedLevels.length > 0 ||
        selectedCategories.length > 0) && (
        <div className="p-4 bg-gray-50 rounded-md border border-gray-200 text-sm space-y-2">
          <h4 className="font-semibold text-gray-900">
            Podsumowanie Twojego Alertu:
          </h4>

          <p>
            <strong className="text-purple-600">Nazwa:</strong>{' '}
            {alertName || 'Nie podano'}
          </p>

          <p>
            <strong className="text-purple-600">Firmy:</strong>{' '}
            {selectedCompanies.length > 0
              ? getCompanyNames()
              : 'Nie wybrano firm'}
          </p>

          <p>
            <strong className="text-purple-600">Poziomy doświadczenia:</strong>{' '}
            {selectedLevels.length > 0 ? getLevelNames() : 'Nie wybrano'}
          </p>

          <p>
            <strong className="text-purple-600">Kategorie stanowisk:</strong>{' '}
            {selectedCategories.length > 0
              ? getCategoryNames()
              : 'Nie wybrano kategorii'}
          </p>

          <p>
            <strong className="text-purple-600">Godzina wysyłki:</strong>{' '}
            {notificationTime}
          </p>
        </div>
      )}

      {/* Validation Message */}
      {!canSave && (
        <p className="text-sm text-red-600">
          ⚠️ Uzupełnij wszystkie pola, aby zapisać alert
        </p>
      )}
    </div>
  );
};

export default Step4Summary;
