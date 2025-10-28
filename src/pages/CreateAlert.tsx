// CreateAlert Page - 4-Step Wizard for Alert Creation & Editing
// Orchestrates the entire alert creation/edit flow with progress tracking

import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import FOMOJobsNavbar from '@/components/FOMOJobsNavbar'
import ProgressBar from '@/components/alerts/ProgressBar'
import Step1Companies from '@/components/alerts/Step1Companies'
import Step2Levels from '@/components/alerts/Step2Levels'
import Step3Categories from '@/components/alerts/Step3Categories'
import Step4Summary from '@/components/alerts/Step4Summary'
import { Button } from '@/components/ui/button'
import { COMPANIES, EXPERIENCE_LEVELS, JOB_CATEGORIES } from '@/data/alertData'
import { useAlerts } from '@/hooks/useAlerts'
import { useAlertStore } from '@/stores/alertStore'

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
  const [isSaving, setIsSaving] = useState(false);

  const { createAlert, updateAlert, getAlertById } = useAlerts();

  const {
    currentStep,
    selectedCompanies,
    selectedLevels,
    selectedCategories,
    alertName,
    notificationTime,
    nextStep,
    prevStep,
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
      const alert = await getAlertById(Number(id));

      if (!alert) {
        throw new Error('Alert not found');
      }

      // Set edit mode
      setIsEditMode(true);

      // Pre-fill form with alert data
      setAlertName(alert.alert_name);
      setNotificationTime(alert.alert_time.substring(0, 5)); // HH:mm

      // Convert company names back to IDs (reverse lookup)
      const companyIds = (alert.companies || [])
        .map((name: string) => COMPANIES.find((c) => c.name === name)?.id.toString())
        .filter(Boolean);
      setCompanies(companyIds);

      // Convert level names back to IDs
      const levelIds = (alert.experience_levels || [])
        .map((name: string) => EXPERIENCE_LEVELS.find((l) => l.name === name)?.id.toString())
        .filter(Boolean);
      setLevels(levelIds);

      // Convert category names back to position IDs
      const allPositions = JOB_CATEGORIES.flatMap((group) => group.positions);
      const categoryIds = (alert.job_categories || [])
        .map((name: string) => allPositions.find((p) => p.name === name)?.id.toString())
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

  const handleSave = async () => {
    setIsSaving(true);

    try {
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
        alert_name: alertName.trim(),
        alert_time: notificationTime,
        companies: companyNames,
        experience_levels: levelNames,
        job_categories: categoryNames,
        is_active: true,
        last_sent_at: null,
      };

      if (isEditMode && alertId) {
        // UPDATE existing alert
        await updateAlert(Number(alertId), alertData);
      } else {
        // CREATE new alert
        await createAlert(alertData);
      }

      // Success - navigate to alerts list
      resetAlert();
      navigate('/alerts');
    } catch (error) {
      console.error('Unexpected error:', error);
      // Error toast already handled in useAlerts hook
    } finally {
      setIsSaving(false);
    }
  };

  // Validation for each step
  const canProceed = () => {
    if (currentStep === 1) return selectedCompanies.length > 0;
    if (currentStep === 2) return selectedLevels.length > 0;
    if (currentStep === 3) return selectedCategories.length > 0;
    if (currentStep === 4)
      return (
        alertName.trim().length >= 3 &&
        selectedCompanies.length > 0 &&
        selectedLevels.length > 0 &&
        selectedCategories.length > 0
      );
    return false;
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

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000" />
        </div>

        {/* Content - positioned above animated background */}
        <div className="relative z-10">
          <FOMOJobsNavbar />

        {/* Hero Section - Only show on step 1 */}
        {currentStep === 1 && (
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
        )}

        {/* Compact header for steps 2-4 */}
        {currentStep > 1 && (
          <div className="pt-24 pb-4">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditMode ? 'Edytuj Alert' : 'Utwórz Alert Ofert Pracy'}
              </h1>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="container mx-auto px-4 -mt-4">
          <ProgressBar currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10">
            {currentStep === 1 && <Step1Companies />}
            {currentStep === 2 && <Step2Levels />}
            {currentStep === 3 && <Step3Categories />}
            {currentStep === 4 && <Step4Summary editMode={isEditMode} alertId={alertId} />}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1 || isSaving}
                variant="outline"
                className="bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
              >
                ← Wstecz
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed() || isSaving}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Dalej →
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  disabled={!canProceed() || isSaving}
                  className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-semibold"
                >
                  {isSaving ? 'Zapisywanie...' : 'Zapisz Alert'}
                </Button>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default CreateAlert;
