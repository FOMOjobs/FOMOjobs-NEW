import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { parseLinkedInProfile, LinkedInParseResult } from '@/utils/linkedInParser';
import { Linkedin, Upload, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface LinkedInImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (data: LinkedInParseResult) => void;
}

export const LinkedInImportDialog: React.FC<LinkedInImportDialogProps> = ({
  open,
  onOpenChange,
  onImport,
}) => {
  const [profileText, setProfileText] = useState('');
  const [parsedData, setParsedData] = useState<LinkedInParseResult | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const handleParse = () => {
    if (!profileText.trim()) {
      toast.error('Proszę wkleić tekst profilu LinkedIn');
      return;
    }

    try {
      const result = parseLinkedInProfile(profileText);
      setParsedData(result);
      setIsPreview(true);
    } catch (error) {
      toast.error('Błąd parsowania profilu', {
        description: 'Sprawdź, czy skopiowano cały profil LinkedIn'
      });
    }
  };

  const handleImport = () => {
    if (!parsedData) return;

    onImport(parsedData);
    toast.success('Dane zaimportowane!', {
      description: 'Możesz teraz edytować i dostosować swoje CV'
    });
    handleClose();
  };

  const handleClose = () => {
    setProfileText('');
    setParsedData(null);
    setIsPreview(false);
    onOpenChange(false);
  };

  const handleBack = () => {
    setIsPreview(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Linkedin className="w-6 h-6 text-blue-600" />
            {isPreview ? 'Podgląd importu LinkedIn' : 'Import profilu LinkedIn'}
          </DialogTitle>
          <DialogDescription>
            {isPreview
              ? 'Sprawdź zaimportowane dane przed dodaniem do CV'
              : 'Skopiuj i wklej tekst swojego profilu LinkedIn aby automatycznie wypełnić CV'}
          </DialogDescription>
        </DialogHeader>

        {!isPreview ? (
          <div className="space-y-4">
            {/* Instructions */}
            <Alert className="bg-blue-50 border-blue-200">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-sm">
                <strong>Jak to zrobić:</strong>
                <ol className="mt-2 space-y-1 list-decimal list-inside">
                  <li>Otwórz swój profil LinkedIn w przeglądarce</li>
                  <li>Zaznacz całą stronę (Ctrl+A / Cmd+A)</li>
                  <li>Skopiuj tekst (Ctrl+C / Cmd+C)</li>
                  <li>Wklej poniżej (Ctrl+V / Cmd+V)</li>
                </ol>
              </AlertDescription>
            </Alert>

            {/* Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tekst profilu LinkedIn</label>
              <Textarea
                placeholder="Wklej tutaj skopiowany tekst swojego profilu LinkedIn...&#10;&#10;Przykład:&#10;Jan Kowalski&#10;Senior Software Engineer at Google&#10;Warszawa, Polska&#10;&#10;Experience&#10;Senior Developer · ABC Company · 2020 - Present&#10;..."
                value={profileText}
                onChange={(e) => setProfileText(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                {profileText.length} znaków
              </p>
            </div>

            {/* Warning */}
            {profileText.length < 100 && profileText.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Tekst wydaje się zbyt krótki. Upewnij się, że skopiowano cały profil.
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Preview */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto p-4 bg-muted/30 rounded-lg">
              {/* Personal Info */}
              {parsedData?.personal.fullName && (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Dane osobowe</p>
                    <p className="text-sm text-muted-foreground">
                      {parsedData.personal.fullName}
                      {parsedData.personal.location && ` • ${parsedData.personal.location}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Experience */}
              {parsedData?.experience && parsedData.experience.length > 0 && (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Doświadczenie zawodowe</p>
                    <p className="text-sm text-muted-foreground">
                      {parsedData.experience.length} {parsedData.experience.length === 1 ? 'stanowisko' : 'stanowisk'}
                    </p>
                    <ul className="mt-1 space-y-1 text-xs">
                      {parsedData.experience.slice(0, 3).map((exp, idx) => (
                        <li key={idx}>• {exp.position} @ {exp.company}</li>
                      ))}
                      {parsedData.experience.length > 3 && (
                        <li className="text-muted-foreground">... i {parsedData.experience.length - 3} więcej</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Education */}
              {parsedData?.education && parsedData.education.length > 0 && (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Wykształcenie</p>
                    <p className="text-sm text-muted-foreground">
                      {parsedData.education.length} {parsedData.education.length === 1 ? 'uczelnia' : 'uczelni'}
                    </p>
                    <ul className="mt-1 space-y-1 text-xs">
                      {parsedData.education.map((edu, idx) => (
                        <li key={idx}>• {edu.degree} - {edu.school}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Skills */}
              {parsedData?.skills && parsedData.skills.length > 0 && (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Umiejętności</p>
                    <p className="text-sm text-muted-foreground">
                      {parsedData.skills.length} {parsedData.skills.length === 1 ? 'umiejętność' : 'umiejętności'}
                    </p>
                  </div>
                </div>
              )}

              {/* No data warning */}
              {(!parsedData?.personal.fullName &&
                parsedData?.experience.length === 0 &&
                parsedData?.education.length === 0) && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Nie udało się wykryć żadnych danych. Sprawdź czy skopiowano pełny profil LinkedIn.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Info */}
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-sm">
                <strong>Uwaga:</strong> Zaimportowane dane mogą wymagać ręcznej korekty.
                Sprawdź wszystkie pola przed zapisaniem CV.
              </AlertDescription>
            </Alert>
          </div>
        )}

        <DialogFooter className="gap-2">
          {isPreview ? (
            <>
              <Button variant="outline" onClick={handleBack}>
                Wstecz
              </Button>
              <Button
                onClick={handleImport}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                disabled={!parsedData?.personal.fullName}
              >
                <Upload className="w-4 h-4 mr-2" />
                Importuj dane
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleClose}>
                Anuluj
              </Button>
              <Button
                onClick={handleParse}
                disabled={profileText.length < 50}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Analizuj profil
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
