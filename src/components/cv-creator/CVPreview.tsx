import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, FileText, Palette, ZoomIn, ZoomOut } from 'lucide-react';
import { useCVStore } from '@/stores/cvStore';
import { CVTemplate } from '@/types/cv';
import ATSTemplate from './templates/ATSTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import TechTemplate from './templates/TechTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import { toast } from 'sonner';

const CVPreview: React.FC = memo(() => {
  const { cvData, setTemplate, updateCustomization } = useCVStore();
  const [zoom, setZoom] = useState(1);

  const template = cvData.customization.template;
  const { primaryColor, secondaryColor } = cvData.customization;

  // Calculate completeness
  const getCompleteness = () => {
    const { personal, experience, education, skills, languages } = cvData;
    let sections = 0;

    if (personal.fullName && personal.email) sections++;
    if (experience.length > 0) sections++;
    if (education.length > 0) sections++;
    if (skills.length > 0) sections++;
    if (languages.length > 0) sections++;

    return Math.round((sections / 5) * 100);
  };

  const completeness = getCompleteness();

  const handleTemplateChange = (value: CVTemplate) => {
    setTemplate(value);
    toast.success(`Szablon zmieniony na: ${getTemplateName(value)}`);
  };

  const getTemplateName = (template: CVTemplate): string => {
    const names: Record<CVTemplate, string> = {
      modern: 'Nowoczesny',
      classic: 'Klasyczny',
      minimal: 'Minimalistyczny',
      creative: 'Kreatywny',
      tech: 'Tech',
      academic: 'Akademicki',
      executive: 'Executive',
      ats: 'ATS-Friendly',
      professional: 'Professional'
    };
    return names[template] || template;
  };

  // Render appropriate template
  const renderTemplate = () => {
    switch (template) {
      case 'ats':
        return <ATSTemplate data={cvData} />;
      case 'executive':
        return <ExecutiveTemplate data={cvData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'modern':
        return <ModernTemplate data={cvData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'professional':
        return <ProfessionalTemplate data={cvData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'minimal':
        return <MinimalistTemplate data={cvData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'classic':
        return <ClassicTemplate data={cvData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'tech':
        return <TechTemplate data={cvData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'creative':
        return <CreativeTemplate data={cvData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'academic':
        return <AcademicTemplate data={cvData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      default:
        // Fallback to modern template
        return <ModernTemplate data={cvData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    }
  };

  const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5];

  return (
    <div className="space-y-6">
      {/* Template Selector */}
      <Card className="shadow-card border-0 bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Wybierz szablon
            </CardTitle>
            <Badge variant={completeness >= 60 ? "default" : "secondary"}>
              {completeness}% gotowe
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={template} onValueChange={handleTemplateChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Wybierz szablon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ats">
                🤖 ATS-Friendly - Maksymalne szanse w systemach rekrutacyjnych!
              </SelectItem>
              <SelectItem value="professional">
                💼 Professional - Klasyczny korporacyjny styl
              </SelectItem>
              <SelectItem value="executive">
                👔 Executive - Elegancki, dla doświadczonych profesjonalistów
              </SelectItem>
              <SelectItem value="modern">
                ✨ Nowoczesny - Świeży i dynamiczny z gradientami
              </SelectItem>
              <SelectItem value="classic">
                📋 Klasyczny - Tradycyjny serif, ideał dla finansów i prawa
              </SelectItem>
              <SelectItem value="tech">
                💻 Tech - Motyw terminalowy dla programistów
              </SelectItem>
              <SelectItem value="creative">
                🎨 Kreatywny - Asymetryczny, dla designerów i artystów
              </SelectItem>
              <SelectItem value="academic">
                🎓 Akademicki - Dla naukowców i badaczy
              </SelectItem>
              <SelectItem value="minimal">
                ⚪ Minimalistyczny - Skandynawski, maksimum białej przestrzeni
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Language Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">Język CV / CV Language</label>
            <Select
              value={cvData.customization.language}
              onValueChange={(value: 'pl' | 'en') => {
                updateCustomization({ language: value });
                toast.success(value === 'pl' ? 'Zmieniono na Polski' : 'Changed to English');
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pl">🇵🇱 Polski</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ATS Info Tooltip */}
          {template === 'ats' && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm">
              <p className="font-semibold text-primary mb-1">💡 Dlaczego ATS-Friendly?</p>
              <p className="text-muted-foreground text-xs">
                90% firm używa systemów ATS. Ten szablon zwiększa szanse przejścia przez bota o 300%!
              </p>
            </div>
          )}

          {/* Zoom Controls */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ZoomOut className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Powiększenie</span>
              <ZoomIn className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex gap-2">
              {zoomLevels.map((level) => (
                <Button
                  key={level}
                  variant={zoom === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setZoom(level)}
                  className="flex-1"
                >
                  {level * 100}%
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CV Preview */}
      <Card className="shadow-card border-0 bg-gradient-card overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Podgląd CV
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Preview Container with Zoom */}
          <div className="bg-gray-100 rounded-lg overflow-auto max-h-[800px]">
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease-in-out'
              }}
            >
              {cvData.personal.fullName ? (
                <div className="inline-block min-w-full">
                  {renderTemplate()}
                </div>
              ) : (
                <div className="bg-white p-12 max-w-[21cm] mx-auto">
                  <div className="text-center text-muted-foreground space-y-4 py-20">
                    <FileText className="h-16 w-16 mx-auto opacity-50" />
                    <div>
                      <p className="text-lg font-medium">Wypełnij dane osobowe</p>
                      <p className="text-sm">aby zobaczyć podgląd CV</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress Info */}
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>Minimalne wymaganie do eksportu: 60% ukończenia</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default CVPreview;
