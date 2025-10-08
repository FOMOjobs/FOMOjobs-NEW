import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const isDevelopment = import.meta.env.DEV;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-background to-red-50 dark:from-red-950/20 dark:via-background dark:to-red-950/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-card rounded-2xl shadow-card border border-border p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-6"
        >
          <AlertTriangle className="w-16 h-16 text-destructive mx-auto" />
        </motion.div>

        <h1 className="text-3xl font-bold text-foreground mb-4">
          Ups! Coś poszło nie tak
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          Wystąpił nieoczekiwany błąd. Przepraszamy za niedogodności.
        </p>

        {isDevelopment && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-destructive mb-2">Szczegóły błędu (tryb deweloperski):</h3>
            <code className="text-sm text-destructive/90 block whitespace-pre-wrap break-all">
              {error.message}
            </code>
            {error.stack && (
              <details className="mt-2">
                <summary className="cursor-pointer text-destructive font-medium hover:text-destructive/80">
                  Stack trace
                </summary>
                <pre className="text-xs text-destructive/80 mt-2 overflow-auto max-h-40 p-2 bg-background rounded">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={resetErrorBoundary}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Spróbuj ponownie
          </Button>

          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Powrót do strony głównej
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Jeśli problem będzie się powtarzał, skontaktuj się z naszym zespołem wsparcia.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback = ErrorFallback,
  onError
}) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to monitoring service in production
    console.error('Error caught by boundary:', error, errorInfo);

    // Call custom error handler if provided
    onError?.(error, errorInfo);

    // In production, send to monitoring service
    if (import.meta.env.PROD) {
      // Example: Send to monitoring service
      // monitoringService.captureException(error, { extra: errorInfo });
    }
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={fallback}
      onError={handleError}
      onReset={() => {
        // Clear any cached data or reset state if needed
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;

// Hook for manual error reporting
export const useErrorHandler = () => {
  const handleError = React.useCallback((error: Error, context?: string) => {
    console.error(`Error in ${context}:`, error);

    // In production, send to monitoring service
    if (import.meta.env.PROD) {
      // monitoringService.captureException(error, { tags: { context } });
    }
  }, []);

  return { handleError };
};
