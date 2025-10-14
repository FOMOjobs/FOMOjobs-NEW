// Alert Creation Progress Bar - Exact match with original design
// Shows 4-step progress: Green for completed, Purple for active, Gray for inactive

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="flex items-center mb-10">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1">
          {/* Circle */}
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center font-semibold text-base
              transition-all duration-300
              ${
                step < currentStep
                  ? 'bg-green-400 text-white border-2 border-green-400' // Completed
                  : step === currentStep
                  ? 'bg-purple-600 text-white border-2 border-purple-600' // Active
                  : 'bg-white text-gray-400 border-2 border-gray-300' // Inactive
              }
            `}
          >
            {step}
          </div>

          {/* Line (not after last step) */}
          {index < steps.length - 1 && (
            <div
              className={`
                h-0.5 flex-1 transition-all duration-300
                ${step < currentStep ? 'bg-purple-600' : 'bg-gray-300'}
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}
