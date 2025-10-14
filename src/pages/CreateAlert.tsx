// CreateAlert Page - 4-Step Wizard for Alert Creation & Editing
// Orchestrates the entire alert creation/edit flow with progress tracking

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlertStore } from '@/stores/alertStore';
import { COMPANIES, EXPERIENCE_LEVELS, JOB_CATEGORIES } from '@/data/alertData';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import ProgressBar from '@/components/alerts/ProgressBar';
import Step1Companies from '@/components/alerts/Step1Companies';
import Step2Levels from '@/components/alerts/Step2Levels';
import Step3Categories from '@/components/alerts/Step3Categories';
import Step4Summary from '@/components/alerts/Step4Summary';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const STEPS = [
  { number: 1, label: 'Firmy' },
  { number: 2, label: 'Doświadczenie' },
  { number: 3, label: 'Stanowiska' },
  { number: 4, label: 'Podsumowanie' },
];

const CreateAlert = () => {
  const { alertId } = useParams<{ alertId: string }>();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentStep,
    setCompanies,
    setLevels,
    setCategories,
    setAlertName,
    setNotificationTime,
    resetAlert,
  } = useAlertStore();

  useEffect(() => {
    if (alertId) {
      loadAlertForEdit(alertId);
    } else {
      // Reset form for new alert creation
      resetAlert();
    }
  }, [alertId]);

  const loadAlertForEdit = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_alerts' as any)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      const alert = data as any;

      // Set edit mode
      setIsEditMode(true);

      // Pre-fill form with alert data
      setAlertName(alert.alert_name);
      setNotificationTime(alert.notification_time.substring(0, 5)); // HH:mm

      // Convert company names back to IDs (reverse lookup)
      const companyIds = (alert.selected_companies || [])
        .map((name: string) => COMPANIES.find((c) => c.name === name)?.id)
        .filter(Boolean);
      setCompanies(companyIds);

      // Convert level names back to IDs
      const levelIds = (alert.selected_levels || [])
        .map((name: string) => EXPERIENCE_LEVELS.find((l) => l.name === name)?.id)
        .filter(Boolean);
      setLevels(levelIds);

      // Convert category names back to position IDs
      const allPositions = JOB_CATEGORIES.flatMap((group) => group.positions);
      const categoryIds = (alert.selected_categories || [])
        .map((name: string) => allPositions.find((p) => p.name === name)?.id)
        .filter(Boolean);
      setCategories(categoryIds);

      toast.success('Alert wczytany do edycji');
    } catch (err: any) {
      console.error('Error loading alert:', err);
      toast.error('Błąd', {
        description: 'Nie udało się wczytać alertu do edycji',
      });
      navigate('/alerts');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{isEditMode ? 'Edytuj Alert' : 'Utwórz Alert'} - FOMOjobs</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEditMode ? 'Edytuj Alert' : 'Utwórz Alert'} - FOMOjobs</title>
        <meta
          name="description"
          content="Stwórz spersonalizowany alert ofert pracy. Wybierz firmy, poziom doświadczenia i kategorie stanowisk."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <FOMOJobsNavbar />

        {/* Hero Section */}
        <div className="pt-24 pb-8 bg-gradient-to-r from-purple-600 via-purple-500 to-yellow-400">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {isEditMode ? '✏️ Edytuj Alert' : '📬 Utwórz Alert Ofert Pracy'}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {isEditMode
                ? 'Zaktualizuj swój alert, aby lepiej dopasować powiadomienia'
                : 'Skonfiguruj spersonalizowany alert i otrzymuj powiadomienia o nowych ofertach dopasowanych do Twoich preferencji'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="container mx-auto px-4 -mt-4">
          <ProgressBar currentStep={currentStep} steps={STEPS} />
        </div>

        {/* Step Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10">
            {currentStep === 1 && <Step1Companies />}
            {currentStep === 2 && <Step2Levels />}
            {currentStep === 3 && <Step3Categories />}
            {currentStep === 4 && <Step4Summary editMode={isEditMode} alertId={alertId} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAlert;
