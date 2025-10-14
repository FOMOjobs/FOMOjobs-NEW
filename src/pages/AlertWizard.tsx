import { useState } from 'react';
import FOMOJobsPageLayout from '@/components/FOMOJobsPageLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AlertStep1Companies } from '@/components/alert-wizard/AlertStep1Companies';
import { AlertStep2Levels } from '@/components/alert-wizard/AlertStep2Levels';
import { AlertStep3Categories } from '@/components/alert-wizard/AlertStep3Categories';
import { AlertStep4Time } from '@/components/alert-wizard/AlertStep4Time';

const AlertWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const steps = [
    { number: 1, title: 'Wybierz firmy' },
    { number: 2, title: 'Poziomy' },
    { number: 3, title: 'Kategorie' },
    { number: 4, title: 'Alert' }
  ];

  const canGoNext = () => {
    if (currentStep === 1) return selectedCompanies.length > 0;
    if (currentStep === 2) return selectedLevels.length > 0;
    if (currentStep === 3) return selectedCategories.length > 0;
    return true;
  };

  return (
    <FOMOJobsPageLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-gradient">
            Stwórz Nowy Alert Pracy
          </h1>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep === step.number
                      ? 'bg-primary text-white border-2 border-primary'
                      : currentStep > step.number
                      ? 'bg-green-500 text-white border-2 border-green-500'
                      : 'bg-white text-muted-foreground border-2 border-input'
                  }`}
                >
                  {step.number}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-0.5 w-16 mx-2 ${
                      currentStep > step.number ? 'bg-primary' : 'bg-input'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="p-8">
            {currentStep === 1 && (
              <AlertStep1Companies
                selected={selectedCompanies}
                onChange={setSelectedCompanies}
              />
            )}
            {currentStep === 2 && (
              <AlertStep2Levels
                selected={selectedLevels}
                onChange={setSelectedLevels}
              />
            )}
            {currentStep === 3 && (
              <AlertStep3Categories
                selected={selectedCategories}
                onChange={setSelectedCategories}
              />
            )}
            {currentStep === 4 && <AlertStep4Time />}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Wstecz
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                disabled={!canGoNext() || currentStep === 4}
              >
                Dalej
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </FOMOJobsPageLayout>
  );
};

export default AlertWizard;
