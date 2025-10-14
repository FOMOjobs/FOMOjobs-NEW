// Step 2: Experience Level Selection - Card-based Selection
// Allows users to select experience levels for job alerts

import { useAlertStore } from '@/stores/alertStore';
import { EXPERIENCE_LEVELS } from '@/data/alertData';
import { Button } from '@/components/ui/button';
import { GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Step2Levels = () => {
  const { selectedLevels, toggleLevel, setLevels, prevStep, nextStep } = useAlertStore();

  const handleSelectAll = () => {
    if (selectedLevels.length === EXPERIENCE_LEVELS.length) {
      setLevels([]);
    } else {
      setLevels(EXPERIENCE_LEVELS.map((l) => l.id.toString()));
    }
  };

  const canProceed = selectedLevels.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-purple-500" />
          Wybierz poziomy doświadczenia
        </h2>
        <p className="text-muted-foreground mt-2">
          Zaznacz poziomy doświadczenia, które Cię interesują ({selectedLevels.length}/
          {EXPERIENCE_LEVELS.length} wybranych)
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
          {selectedLevels.length === EXPERIENCE_LEVELS.length
            ? 'Odznacz wszystkie'
            : 'Zaznacz wszystkie'}
        </Button>
      </div>

      {/* Experience Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXPERIENCE_LEVELS.map((level) => {
          const isSelected = selectedLevels.includes(level.id.toString());

          return (
            <div
              key={level.id}
              onClick={() => toggleLevel(level.id.toString())}
              className={cn(
                'p-5 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg',
                isSelected
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 bg-card'
              )}
            >
              {/* Level Name */}
              <h3 className={cn(
                'font-bold text-lg mb-2',
                isSelected ? 'text-purple-700 dark:text-purple-300' : 'text-foreground'
              )}>
                {level.name}
              </h3>

              {/* Tooltip */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {level.tooltip}
              </p>

              {/* Selected Indicator */}
              {isSelected && (
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  Wybrano
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={prevStep}
          variant="outline"
          size="lg"
          className="font-semibold"
        >
          <ChevronLeft className="mr-2 w-5 h-5" />
          Wstecz
        </Button>

        <Button
          onClick={nextStep}
          disabled={!canProceed}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold shadow-lg disabled:opacity-50"
        >
          Dalej: Kategorie stanowisk
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>

      {/* Helper text */}
      {!canProceed && (
        <p className="text-sm text-red-500 text-center">
          Wybierz przynajmniej jeden poziom doświadczenia, aby kontynuować
        </p>
      )}
    </div>
  );
};

export default Step2Levels;
