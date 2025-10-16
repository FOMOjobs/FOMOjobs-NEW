import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Download, Eye, Save, RotateCcw, FileText, FileDown, Cloud } from "lucide-react";
import { useCVStore } from '@/stores/cvStore';
import { autoSaveCVData, loadAutoSavedCVData } from '@/lib/cvStorage';
import CVSectionNavigation from '@/components/cv/CVSectionNavigation';
import PersonalInfoForm from '@/components/cv/forms/PersonalInfoForm';
import ExperienceSection from '@/components/cv/forms/ExperienceSection';
import EducationSection from '@/components/cv/forms/EducationSection';
import SkillsManager from '@/components/cv/forms/SkillsManager';
import LanguagesManager from '@/components/cv/forms/LanguagesManager';
import SettingsSection from '@/components/cv/forms/SettingsSection';
import CVPreview from '@/components/cv-creator/CVPreview';
import CustomizationPanel from '@/components/cv-creator/CustomizationPanel';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import FOMOJobsFooter from '@/components/landing/FOMOJobsFooter';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { exportToPDF } from '@/utils/cvExport/pdfExport';
import { exportToDOCX } from '@/utils/cvExport/docxExport';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CVCreator = () => {
  const { activeSection, cvData, isDirty, setDirty, loadCVData, resetCV, saveCurrentCV, currentCVId } = useCVStore();
  const [isExporting, setIsExporting] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [cvName, setCVName] = useState('');

  // Auto-load from localStorage on mount
  useEffect(() => {
    const savedData = loadAutoSavedCVData();
    if (savedData) {
      loadCVData(savedData);
    }
  }, [loadCVData]);

  // Auto-save on changes
  useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        autoSaveCVData(cvData);
        setDirty(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [cvData, isDirty, setDirty]);

  // Keyboard shortcut (Ctrl+S / Cmd+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();

        // Auto-suggest name if not set
        const fullName = cvData.personal?.firstName && cvData.personal?.lastName
          ? `${cvData.personal.firstName} ${cvData.personal.lastName}`
          : '';
        const suggestedName = fullName ? `CV - ${fullName}` : 'Nowe CV';

        if (!cvName) {
          setCVName(suggestedName);
        }

        setSaveDialogOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cvData.personal, cvName]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceSection />;
      case 'education':
        return <EducationSection />;
      case 'skills':
        return <SkillsManager />;
      case 'languages':
        return <LanguagesManager />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <PersonalInfoForm />;
    }
  };

  const handleReset = () => {
    if (confirm('Czy na pewno chcesz zresetować całe CV? Ta operacja jest nieodwracalna.')) {
      resetCV();
      toast.success('CV zostało zresetowane');
    }
  };

  const handleManualSave = () => {
    autoSaveCVData(cvData);
    setDirty(false);
    toast.success('CV zapisane!');
  };

  const handleOpenSaveDialog = () => {
    const fullName = cvData.personal?.firstName && cvData.personal?.lastName
      ? `${cvData.personal.firstName} ${cvData.personal.lastName}`
      : '';
    const suggestedName = fullName ? `CV - ${fullName}` : 'Nowe CV';

    if (!cvName) {
      setCVName(suggestedName);
    }

    setSaveDialogOpen(true);
  };

  const handleCloudSave = async () => {
    if (!cvName.trim()) {
      toast.error('Podaj nazwę CV');
      return;
    }

    try {
      await saveCurrentCV(cvName.trim());
      toast.success('✅ Zapisano w chmurze!', {
        description: `CV "${cvName}" jest teraz dostępne na wszystkich urządzeniach.`
      });
      setSaveDialogOpen(false);
    } catch (error) {
      toast.error('Błąd zapisu', {
        description: 'Nie udało się zapisać CV. Spróbuj ponownie.'
      });
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      await exportToPDF(cvData);
      toast.success('CV wyeksportowane jako PDF!');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Błąd podczas eksportu PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDOCX = async () => {
    try {
      setIsExporting(true);
      await exportToDOCX(cvData);
      toast.success('CV wyeksportowane jako DOCX!');
    } catch (error) {
      console.error('DOCX export error:', error);
      toast.error('Błąd podczas eksportu DOCX');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>FOMO.CVcreator - Stwórz profesjonalne CV w kilka minut | FOMOjobs</title>
        <meta
          name="description"
          content="Inteligentny kreator CV w stylu FOMOjobs. Nowoczesne szablony, łatwa edycja i profesjonalny wygląd."
        />
        <meta name="keywords" content="CV, kreator CV, życiorys, praca, kariera, aplikacje, rekrutacja" />
      </Helmet>

      <FOMOJobsNavbar />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden pt-16">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000" />
        </div>

        {/* Content - positioned above animated background */}
        <div className="relative z-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient-x text-primary-foreground">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-white">FOMO</span>.<span className="text-secondary drop-shadow-lg">cvcreator</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 max-w-3xl mx-auto">
                Profesjonalne narzędzie do tworzenia CV dopasowane do polskiego rynku pracy.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-3xl mx-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="lg"
                        onClick={handleOpenSaveDialog}
                        className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white w-full sm:w-auto"
                      >
                        <Cloud className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        {currentCVId ? 'Zaktualizuj' : 'Zapisz w chmurze'}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Zapisz CV i uzyskaj dostęp z każdego urządzenia</p>
                      <p className="text-xs text-gray-400 mt-1">Skrót: Ctrl+S</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="lg"
                      className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full sm:w-auto"
                      disabled={isExporting}
                    >
                      <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      {isExporting ? 'Eksportowanie...' : 'Pobierz CV'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    <DropdownMenuItem onClick={handleExportPDF}>
                      <FileText className="mr-2 h-4 w-4" />
                      Eksportuj jako PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportDOCX}>
                      <FileDown className="mr-2 h-4 w-4" />
                      Eksportuj jako DOCX
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                  onClick={handleReset}
                >
                  <RotateCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Nowe CV
                </Button>

                {currentCVId && (
                  <div className="flex items-center gap-2 text-sm text-gray-100 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Zapisane
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Sidebar - CV Sections Navigation */}
            <motion.aside
              className="w-full lg:w-80 xl:w-96 shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CVSectionNavigation />
            </motion.aside>

            {/* Main Content - CV Editor */}
            <motion.main
              className="flex-1 min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="space-y-4">
                {/* Save Status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-card/50 backdrop-blur-sm p-3 rounded-lg shadow-card border-0 gap-3 sm:gap-0">
                  <div className="text-sm text-muted-foreground">
                    {isDirty ? (
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                        Zapisywanie...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Wszystkie zmiany zapisane
                      </span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleManualSave}
                    className="w-full sm:w-auto"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Zapisz teraz
                  </Button>
                </div>

                {/* Active Section Content */}
                {renderActiveSection()}
              </div>
            </motion.main>

            {/* Right Sidebar - Preview & Customization (hidden on tablets, visible on lg+) */}
            <motion.aside
              className="hidden lg:block lg:w-80 xl:w-96 shrink-0 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CustomizationPanel />
              <CVPreview />
            </motion.aside>
          </div>
        </div>
        </div>
      </div>

      <FOMOJobsFooter />

      {/* Save to Cloud Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentCVId ? 'Zaktualizuj CV w chmurze' : 'Zapisz CV w chmurze'}
            </DialogTitle>
            <DialogDescription>
              {currentCVId
                ? 'Wszystkie zmiany zostaną zapisane w istniejącym CV.'
                : 'Twoje CV będzie dostępne z każdego urządzenia i przeglądarki.'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="cvName">Nazwa CV</Label>
              <Input
                id="cvName"
                value={cvName}
                onChange={(e) => setCVName(e.target.value)}
                placeholder="np. 'CV - Software Engineer'"
                className="mt-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && cvName.trim()) {
                    handleCloudSave();
                  }
                }}
              />
              <p className="text-xs text-gray-500 mt-2">
                Wybierz nazwę, która pomoże Ci rozróżnić wersje CV
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSaveDialogOpen(false)}
            >
              Anuluj
            </Button>
            <Button
              onClick={handleCloudSave}
              disabled={!cvName.trim()}
              className="bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600"
            >
              <Save className="w-4 h-4 mr-2" />
              {currentCVId ? 'Zaktualizuj' : 'Zapisz'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CVCreator;
