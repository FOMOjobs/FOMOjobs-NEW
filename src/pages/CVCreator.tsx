import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Plus, Download, Eye, Save, RotateCcw, FileText, FileDown } from "lucide-react";
import { useCVStore } from '@/stores/cvStore';
import { autoSaveCVData, loadAutoSavedCVData } from '@/lib/cvStorage';
import CVSectionNavigation from '@/components/cv/CVSectionNavigation';
import PersonalInfoForm from '@/components/cv/forms/PersonalInfoForm';
import ExperienceSection from '@/components/cv/forms/ExperienceSection';
import EducationSection from '@/components/cv/forms/EducationSection';
import SkillsManager from '@/components/cv/forms/SkillsManager';
import LanguagesManager from '@/components/cv/forms/LanguagesManager';
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

const CVCreator = () => {
  const { activeSection, cvData, isDirty, setDirty, loadCVData, resetCV } = useCVStore();
  const [isExporting, setIsExporting] = useState(false);

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

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-16">
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
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                Profesjonalne narzędzie do tworzenia CV dopasowane do polskiego rynku pracy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="lg"
                      className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      disabled={isExporting}
                    >
                      <Download className="mr-2 h-5 w-5" />
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
                  className="text-lg px-8 py-6"
                  onClick={handleReset}
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Nowe CV
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar - CV Sections */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CVSectionNavigation />
            </motion.div>

            {/* Main Content - CV Editor */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="space-y-4">
                {/* Save Status */}
                <div className="flex items-center justify-between bg-card/50 backdrop-blur-sm p-3 rounded-lg shadow-card border-0">
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
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Zapisz teraz
                  </Button>
                </div>

                {/* Active Section Content */}
                {renderActiveSection()}
              </div>
            </motion.div>

            {/* Right Sidebar - Preview & Customization */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CustomizationPanel />
              <CVPreview />
            </motion.div>
          </div>
        </div>
      </div>

      <FOMOJobsFooter />
    </>
  );
};

export default CVCreator;
