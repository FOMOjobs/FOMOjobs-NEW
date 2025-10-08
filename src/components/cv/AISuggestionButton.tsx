import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Sparkles } from 'lucide-react';
import { isAIAvailable } from '@/utils/aiSuggestions';

interface AISuggestionButtonProps {
  onClick?: () => void;
  label?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  className?: string;
}

export const AISuggestionButton = ({
  onClick,
  label = 'AI Suggestion',
  size = 'sm',
  variant = 'outline',
  className = '',
}: AISuggestionButtonProps) => {
  const aiEnabled = isAIAvailable();

  const button = (
    <Button
      type="button"
      size={size}
      variant={variant}
      disabled={!aiEnabled}
      onClick={onClick}
      className={`${className} ${
        !aiEnabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <Sparkles className="h-4 w-4 mr-2" />
      {label}
    </Button>
  );

  if (!aiEnabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">
              <strong>Coming Soon!</strong>
              <br />
              Add OpenAI API key to .env file to enable AI features.
              <br />
              <code className="text-xs mt-1 block">
                VITE_OPENAI_API_KEY=your_key_here
              </code>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
};

export default AISuggestionButton;
