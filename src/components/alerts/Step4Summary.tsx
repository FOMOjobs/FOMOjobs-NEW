// Step 4: Summary & Save - Alert Name, Time Selection, Summary, Save
// Final step where user names the alert, sets notification time, reviews, and saves

import { useState } from 'react';
import { useAlertStore } from '@/stores/alertStore';
import { COMPANIES, EXPERIENCE_LEVELS, JOB_CATEGORIES } from '@/data/alertData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, ChevronLeft, Save, Building2, GraduationCap, Briefcase, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const NOTIFICATION_TIMES = [
  { value: '07:00', label: '07:00 - Rano' },
  { value: '09:00', label: '09:00 - Początek dnia' },
  { value: '12:00', label: '12:00 - Południe' },
  { value: '15:00', label: '15:00 - Popołudnie' },
  { value: '18:00', label: '18:00 - Wieczór' },
  { value: '20:00', label: '20:00 - Późny wieczór' },
];

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
    prevStep,
    resetAlert,
  } = useAlertStore();

  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  // Get display names
  const selectedCompanyNames = COMPANIES.filter((c) =>
    selectedCompanies.includes(c.id)
  ).map((c) => c.name);

  const selectedLevelNames = EXPERIENCE_LEVELS.filter((l) =>
    selectedLevels.includes(l.id)
  ).map((l) => l.name);

  const selectedCategoryNames = JOB_CATEGORIES.flatMap((group) =>
    group.positions.filter((p) => selectedCategories.includes(p.id))
  ).map((p) => p.name);

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

      const alertData = {
        user_id: user.id,
        alert_name: alertName.trim(),
        notification_time: notificationTime,
        selected_companies: selectedCompanies,
        selected_levels: selectedLevels,
        selected_categories: selectedCategories,
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
        result = await supabase
          .from('user_alerts' as any)
          .insert(alertData);
      }

      if (result.error) {
        console.error('Error saving alert:', result.error);
        toast.error('Nie udało się zapisać alertu. Spróbuj ponownie.');
        return;
      }

      // Success
      toast.success(
        editMode ? 'Alert zaktualizowany pomyślnie! 🎉' : 'Alert utworzony pomyślnie! 🎉',
        {
          description: `"${alertName}" został pomyślnie ${editMode ? 'zaktualizowany' : 'utworzony'}`,
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
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Bell className="w-6 h-6 text-purple-500" />
          Podsumowanie i zapis alertu
        </h2>
        <p className="text-muted-foreground mt-2">
          Nazwij swój alert, ustaw godzinę powiadomień i zapisz
        </p>
      </div>

      {/* Alert Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alert Name */}
        <div className="space-y-2">
          <Label htmlFor="alert-name" className="text-base font-semibold">
            Nazwa alertu *
          </Label>
          <Input
            id="alert-name"
            type="text"
            placeholder="np. Senior Frontend - Top IT Companies"
            value={alertName}
            onChange={(e) => setAlertName(e.target.value)}
            minLength={3}
            maxLength={100}
            className="text-base"
          />
          <p className="text-xs text-muted-foreground">
            Min. 3 znaki ({alertName.length}/100)
          </p>
        </div>

        {/* Notification Time */}
        <div className="space-y-2">
          <Label htmlFor="notification-time" className="text-base font-semibold">
            Godzina powiadomień *
          </Label>
          <Select value={notificationTime} onValueChange={setNotificationTime}>
            <SelectTrigger id="notification-time" className="text-base">
              <SelectValue placeholder="Wybierz godzinę" />
            </SelectTrigger>
            <SelectContent>
              {NOTIFICATION_TIMES.map((time) => (
                <SelectItem key={time.value} value={time.value}>
                  {time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Otrzymasz email o {notificationTime} z nowymi ofertami
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Companies Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-500" />
              Firmy ({selectedCompanyNames.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-48 overflow-y-auto">
            {selectedCompanyNames.map((name, idx) => (
              <Badge key={idx} variant="outline" className="mr-1 mb-1">
                {name}
              </Badge>
            ))}
          </CardContent>
        </Card>

        {/* Levels Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-500" />
              Poziomy doświadczenia ({selectedLevelNames.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedLevelNames.map((name, idx) => (
              <Badge key={idx} variant="outline" className="mr-1 mb-1">
                {name}
              </Badge>
            ))}
          </CardContent>
        </Card>

        {/* Categories Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-500" />
              Stanowiska ({selectedCategoryNames.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-48 overflow-y-auto">
            {selectedCategoryNames.slice(0, 10).map((name, idx) => (
              <Badge key={idx} variant="outline" className="mr-1 mb-1 text-xs">
                {name}
              </Badge>
            ))}
            {selectedCategoryNames.length > 10 && (
              <p className="text-xs text-muted-foreground mt-2">
                +{selectedCategoryNames.length - 10} więcej...
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={prevStep}
          variant="outline"
          size="lg"
          className="font-semibold"
          disabled={isSaving}
        >
          <ChevronLeft className="mr-2 w-5 h-5" />
          Wstecz
        </Button>

        <Button
          onClick={handleSave}
          disabled={!canSave || isSaving}
          size="lg"
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Zapisywanie...
            </>
          ) : (
            <>
              <Save className="mr-2 w-5 h-5" />
              Zapisz alert
            </>
          )}
        </Button>
      </div>

      {/* Helper text */}
      {!canSave && !isSaving && (
        <p className="text-sm text-red-500 text-center">
          Uzupełnij nazwę alertu (min. 3 znaki) oraz wszystkie wymagane pola
        </p>
      )}
    </div>
  );
};

export default Step4Summary;
