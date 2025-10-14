// Alert Creation Progress Bar - Step Indicator Component
// Shows 4-step progress with icons and labels

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  steps: {
    number: number;
    label: string;
  }[];
}

const ProgressBar = ({ currentStep, steps }: ProgressBarProps) => {
  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress line behind steps */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-yellow-400 transition-all duration-500 ease-out"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Step circles */}
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isPending = currentStep < step.number;

            return (
              <div key={step.number} className="flex flex-col items-center relative z-10">
                {/* Circle */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300',
                    isCompleted && 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg scale-110',
                    isCurrent && 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-xl scale-125 ring-4 ring-yellow-200',
                    isPending && 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    'mt-2 text-xs font-medium text-center transition-all duration-300 whitespace-nowrap',
                    (isCompleted || isCurrent) && 'text-foreground font-semibold',
                    isPending && 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
