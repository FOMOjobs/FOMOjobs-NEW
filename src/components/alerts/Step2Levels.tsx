// Step 2: Experience Level Selection - Improved design with tooltips
// Allows users to select experience levels for job alerts

import { useAlertStore } from '@/stores/alertStore';
import { EXPERIENCE_LEVELS } from '@/data/alertData';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Step2Levels = () => {
  const { selectedLevels, toggleLevel } = useAlertStore();

  const handleToggle = (id: number) => {
    toggleLevel(id.toString());
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        2. Wybierz poziomy doświadczenia, które chcesz śledzić:
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
        <TooltipProvider delayDuration={200}>
          {EXPERIENCE_LEVELS.map(level => (
            <Tooltip key={level.id}>
              <TooltipTrigger asChild>
                <label className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer p-2 rounded hover:bg-gray-50">
                  <Checkbox
                    checked={selectedLevels.includes(level.id.toString())}
                    onCheckedChange={() => handleToggle(level.id)}
                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <span className="flex-1">{level.name}</span>
                </label>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-xs bg-purple-600 text-white"
              >
                <p className="text-sm">{level.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      {selectedLevels.length === 0 && (
        <p className="text-sm text-red-600">
          ⚠️ Wybierz przynajmniej jeden poziom doświadczenia
        </p>
      )}
    </div>
  );
};

export default Step2Levels;
