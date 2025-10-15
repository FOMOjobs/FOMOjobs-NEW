// Alert Creation Progress Bar - Enhanced visibility version
// Shows 4-step progress: Green for completed, Purple for active, Gray for inactive

import { Check } from 'lucide-react';

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, label: 'Firmy' },
    { number: 2, label: 'Poziomy' },
    { number: 3, label: 'Kategorie' },
    { number: 4, label: 'Podsumowanie' }
  ];

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10" />

        {/* Progress line */}
        <div
          className="absolute top-6 left-0 h-1 bg-purple-600 -z-10 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;

          return (
            <div key={step.number} className="flex flex-col items-center">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                transition-all duration-300 relative z-10
                ${isCompleted
                  ? 'bg-green-500 text-white shadow-lg ring-4 ring-green-100'
                  : isActive
                  ? 'bg-purple-600 text-white shadow-xl ring-4 ring-purple-200 scale-110'
                  : 'bg-white text-gray-400 border-2 border-gray-300'
                }
              `}>
                {isCompleted ? <Check className="w-6 h-6" /> : step.number}
              </div>
              <span className={`mt-3 text-xs font-medium text-center
                ${isActive ? 'text-purple-600 font-semibold'
                  : isCompleted ? 'text-green-600'
                  : 'text-gray-400'
                }
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
