// Step 1: Company Selection - Improved design with tooltips
// Allows users to select companies to monitor for job alerts

import { useAlertStore } from '@/stores/alertStore';
import { COMPANIES } from '@/data/alertData';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Step1Companies = () => {
  const { selectedCompanies, toggleCompany } = useAlertStore();

  const handleToggle = (id: number) => {
    toggleCompany(id.toString());
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          1. Wybierz firmy, które Cię interesują:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <TooltipProvider delayDuration={200}>
            {COMPANIES.map(company => (
              <Tooltip key={company.id}>
                <TooltipTrigger asChild>
                  <label className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer py-1 px-2 rounded hover:bg-gray-50">
                    <Checkbox
                      checked={selectedCompanies.includes(company.id.toString())}
                      onCheckedChange={() => handleToggle(company.id)}
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <span className="flex-1">{company.name}</span>
                  </label>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-xs bg-purple-600 text-white"
                >
                  <p className="text-sm">{company.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>

      {selectedCompanies.length === 0 && (
        <p className="text-sm text-red-600">
          ⚠️ Wybierz przynajmniej jedną firmę
        </p>
      )}
    </div>
  );
};

export default Step1Companies;
