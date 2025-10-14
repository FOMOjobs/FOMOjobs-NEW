// Step 1: Company Selection - Checkbox Grid with Tooltips
// Allows users to select companies to monitor for job alerts

import { useAlertStore } from '@/stores/alertStore';
import { COMPANIES } from '@/data/alertData';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Building2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Step1Companies = () => {
  const { selectedCompanies, toggleCompany, setCompanies, nextStep } = useAlertStore();

  const handleSelectAll = () => {
    if (selectedCompanies.length === COMPANIES.length) {
      setCompanies([]);
    } else {
      setCompanies(COMPANIES.map((c) => c.id));
    }
  };

  const canProceed = selectedCompanies.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Building2 className="w-6 h-6 text-purple-500" />
          Wybierz firmy do monitorowania
        </h2>
        <p className="text-muted-foreground mt-2">
          Zaznacz firmy, których oferty pracy chcesz śledzić ({selectedCompanies.length}/
          {COMPANIES.length} wybranych)
        </p>
      </div>

      {/* Select All Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSelectAll}
          className="text-xs"
        >
          {selectedCompanies.length === COMPANIES.length
            ? 'Odznacz wszystkie'
            : 'Zaznacz wszystkie'}
        </Button>
      </div>

      {/* Companies Grid */}
      <TooltipProvider>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {COMPANIES.map((company) => {
            const isSelected = selectedCompanies.includes(company.id);

            return (
              <Tooltip key={company.id}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => toggleCompany(company.id)}
                    className={cn(
                      'flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md',
                      isSelected
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-sm'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleCompany(company.id)}
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor={company.id}
                      className="flex-1 cursor-pointer font-medium text-sm leading-tight"
                    >
                      {company.name}
                    </Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-xs">{company.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>

      {/* Navigation */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={nextStep}
          disabled={!canProceed}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold shadow-lg disabled:opacity-50"
        >
          Dalej: Poziom doświadczenia
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>

      {/* Helper text */}
      {!canProceed && (
        <p className="text-sm text-red-500 text-center">
          Wybierz przynajmniej jedną firmę, aby kontynuować
        </p>
      )}
    </div>
  );
};

export default Step1Companies;
