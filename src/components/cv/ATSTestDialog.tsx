import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { testATSCompatibility, getATSRecommendations, ATSTestResult } from '@/utils/atsAnalyzer';
import type { CVData } from '@/types/cv';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Sparkles,
  Target,
  TrendingUp,
  FileSearch,
} from 'lucide-react';

interface ATSTestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cvData: CVData;
  currentTemplate?: string;
}

export const ATSTestDialog: React.FC<ATSTestDialogProps> = ({
  open,
  onOpenChange,
  cvData,
  currentTemplate = 'modern',
}) => {
  const [testResult, setTestResult] = useState<ATSTestResult | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleRunTest = () => {
    setIsTesting(true);

    // Simulate realistic test delay
    setTimeout(() => {
      const result = testATSCompatibility(cvData, currentTemplate);
      setTestResult(result);
      setIsTesting(false);
    }, 1500);
  };

  const handleClose = () => {
    setTestResult(null);
    onOpenChange(false);
  };

  const getSeverityIcon = (severity: 'critical' | 'warning' | 'suggestion') => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'suggestion':
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity: 'critical' | 'warning' | 'suggestion') => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 border-red-300 text-red-900';
      case 'warning':
        return 'bg-yellow-100 border-yellow-300 text-yellow-900';
      case 'suggestion':
        return 'bg-blue-100 border-blue-300 text-blue-900';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Excellent':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Good':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Fair':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Poor':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const gradeLabels: Record<string, string> = {
    'Excellent': 'Doskonałe',
    'Good': 'Dobre',
    'Fair': 'Poprawne',
    'Poor': 'Wymaga poprawy',
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSearch className="w-6 h-6 text-purple-600" />
            Test kompatybilności z ATS
          </DialogTitle>
          <DialogDescription>
            Sprawdź, jak Twoje CV będzie oceniane przez systemy śledzenia aplikacji (ATS)
          </DialogDescription>
        </DialogHeader>

        {!testResult ? (
          <div className="space-y-6 py-6">
            {/* Info about ATS */}
            <Alert className="bg-purple-50 border-purple-200">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-sm">
                <strong>Czym jest ATS?</strong>
                <p className="mt-2">
                  ATS (Applicant Tracking System) to oprogramowanie używane przez ~90% firm do
                  automatycznego filtrowania aplikacji. Systemy ATS skanują CV pod kątem słów
                  kluczowych, formatowania i kompletności danych.
                </p>
              </AlertDescription>
            </Alert>

            {/* What will be tested */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Co zostanie przetestowane:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Kompletność danych kontaktowych
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Jakość podsumowania zawodowego
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Opis doświadczenia i osiągnięć
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Sekcja wykształcenia
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Umiejętności i słowa kluczowe
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Struktura i formatowanie
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Zgodność z szablonem
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Długość i czytelność
                </li>
              </ul>
            </div>

            {/* Run test button */}
            <Button
              onClick={handleRunTest}
              disabled={isTesting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6"
              size="lg"
            >
              {isTesting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Analizowanie CV...
                </>
              ) : (
                <>
                  <FileSearch className="w-5 h-5 mr-2" />
                  Rozpocznij test ATS
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Score Display */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Wynik testu ATS</h3>
                  <p className="text-sm text-gray-600 mt-1">{testResult.summary}</p>
                </div>
                <div className="text-right">
                  <div className={`text-5xl font-bold ${getScoreColor(testResult.score)}`}>
                    {testResult.score}
                  </div>
                  <div className="text-sm text-gray-600">na 100</div>
                </div>
              </div>

              <Progress value={testResult.score} className="h-3 mb-3" />

              <div className="flex items-center justify-between">
                <Badge
                  className={`${getGradeColor(testResult.grade)} px-4 py-1 text-sm font-semibold border`}
                >
                  {gradeLabels[testResult.grade] || testResult.grade}
                </Badge>

                <div className="text-sm text-gray-600">
                  {testResult.strengths.length} mocnych stron • {testResult.issues.length} do poprawy
                </div>
              </div>
            </div>

            {/* Strengths */}
            {testResult.strengths.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="w-5 h-5" />
                  Mocne strony ({testResult.strengths.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {testResult.strengths.map((strength, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg p-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-900">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Issues */}
            {testResult.issues.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-orange-700">
                  <TrendingUp className="w-5 h-5" />
                  Obszary do poprawy ({testResult.issues.length})
                </h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {testResult.issues.map((issue, idx) => (
                    <Alert
                      key={idx}
                      className={`${getSeverityColor(issue.severity)} border`}
                    >
                      <div className="flex gap-3">
                        {getSeverityIcon(issue.severity)}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-sm">{issue.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {issue.category}
                            </Badge>
                          </div>
                          <p className="text-sm">{issue.description}</p>
                          <div className="mt-2 pt-2 border-t border-current/20">
                            <p className="text-sm font-medium">
                              ✓ Zalecenie: {issue.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Alert>
                  ))}
                </div>
              </div>
            )}

            {/* General Recommendations */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2 text-purple-700">
                <Sparkles className="w-5 h-5" />
                Ogólne wskazówki ATS
              </h3>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <ul className="space-y-2 text-sm">
                  {getATSRecommendations().slice(0, 5).map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setTestResult(null)}
                className="flex-1"
              >
                Uruchom ponownie
              </Button>
              <Button
                onClick={handleClose}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Zamknij
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
