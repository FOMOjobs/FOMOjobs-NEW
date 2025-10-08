import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, FileText, Palette } from 'lucide-react';
import { useCVStore } from '@/stores/cvStore';
import { toast } from 'sonner';

const CVPreviewPlaceholder: React.FC = () => {
  const { cvData } = useCVStore();

  const getPreviewData = () => {
    const { personal, experience, education, skills, languages } = cvData;
    const sections = [];

    if (personal.fullName) sections.push('Dane osobowe');
    if (experience.length > 0) sections.push(`Doświadczenie (${experience.length})`);
    if (education.length > 0) sections.push(`Wykształcenie (${education.length})`);
    if (skills.length > 0) sections.push(`Umiejętności (${skills.length})`);
    if (languages.length > 0) sections.push(`Języki (${languages.length})`);

    return {
      sections,
      totalSections: sections.length,
      completeness: Math.round((sections.length / 5) * 100)
    };
  };

  const { sections, totalSections, completeness } = getPreviewData();

  const handleDownload = () => {
    if (completeness < 60) {
      toast.error('Ukończ co najmniej 60% CV przed pobraniem');
      return;
    }
    toast.info('Export do PDF będzie dostępny wkrótce!');
  };

  return (
    <div className="space-y-6">
      {/* CV Preview */}
      <Card className="sticky top-4 shadow-card border-0 bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Podgląd CV
            </CardTitle>
            <Badge variant={completeness >= 60 ? "default" : "secondary"}>
              {completeness}% gotowe
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Preview Container */}
          <div className="aspect-[3/4] bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-lg border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-4">
            {cvData.personal.fullName ? (
              <div className="text-center space-y-4 w-full">
                <div className="space-y-2">
                  <FileText className="h-8 w-8 mx-auto text-primary" />
                  <h3 className="font-semibold text-lg text-foreground">
                    {cvData.personal.fullName}
                  </h3>
                  {cvData.personal.email && (
                    <p className="text-sm text-muted-foreground">
                      {cvData.personal.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Sekcje w CV:
                  </h4>
                  <div className="space-y-1">
                    {sections.map((section, index) => (
                      <div key={index} className="text-xs bg-primary/10 rounded px-2 py-1">
                        {section}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground space-y-2">
                <FileText className="h-12 w-12 mx-auto opacity-50" />
                <p className="text-sm">Wypełnij dane osobowe</p>
                <p className="text-xs">aby zobaczyć podgląd</p>
              </div>
            )}
          </div>

          {/* Download Button */}
          <Button
            className="w-full"
            variant={completeness >= 60 ? "default" : "outline"}
            disabled={completeness < 20}
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            {completeness >= 60 ? 'Pobierz PDF' : `Ukończ CV (${completeness}%)`}
          </Button>

          {/* Progress Info */}
          <div className="text-center text-xs text-muted-foreground space-y-1">
            <p>Sekcje wypełnione: {totalSections}/5</p>
            <p>Minimalne wymaganie: 60% ukończenia</p>
          </div>
        </CardContent>
      </Card>

      {/* Template Selector Placeholder */}
      <Card className="shadow-card border-0 bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Szablony
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { id: 'modern', name: 'Nowoczesny', color: 'from-primary to-secondary' },
            { id: 'classic', name: 'Klasyczny', color: 'from-gray-600 to-gray-700' },
            { id: 'creative', name: 'Kreatywny', color: 'from-purple-500 to-pink-500' },
            { id: 'minimal', name: 'Minimalistyczny', color: 'from-green-500 to-teal-500' }
          ].map((template) => (
            <div
              key={template.id}
              className="cursor-pointer p-3 rounded-lg border hover:border-primary/50 transition-colors group"
              onClick={() => toast.info(`Szablon "${template.name}" będzie dostępny wkrótce!`)}
            >
              <div className={`w-full h-12 rounded bg-gradient-to-r ${template.color} mb-2 group-hover:shadow-md transition-shadow`}></div>
              <p className="text-sm font-medium text-center">{template.name}</p>
            </div>
          ))}

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Więcej szablonów wkrótce...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVPreviewPlaceholder;
