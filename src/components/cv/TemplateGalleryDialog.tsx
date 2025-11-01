import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllTemplates, getTemplateMetadata, type TemplateMetadata } from '@/lib/templateMetadata';
import { Check, Eye, Sparkles, Shield, Zap, Star } from 'lucide-react';
import { toast } from 'sonner';

interface TemplateGalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export const TemplateGalleryDialog: React.FC<TemplateGalleryDialogProps> = ({
  open,
  onOpenChange,
  currentTemplate,
  onSelectTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'professional' | 'creative' | 'modern' | 'classic' | 'technical'>('all');
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const allTemplates = getAllTemplates();
  const filteredTemplates = selectedCategory === 'all'
    ? allTemplates
    : allTemplates.filter(t => t.category === selectedCategory);

  const handleSelectTemplate = (templateId: string) => {
    onSelectTemplate(templateId);
    const template = getTemplateMetadata(templateId);
    toast.success('Szablon zmieniony!', {
      description: `Zastosowano szablon: ${template?.name}`,
    });
    onOpenChange(false);
  };

  const getATSBadgeColor = (score: string) => {
    switch (score) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'poor':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Zap className="w-3 h-3" />;
      case 'medium':
        return <Star className="w-3 h-3" />;
      case 'advanced':
        return <Sparkles className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-purple-600" />
            Galeria szablonów CV
          </DialogTitle>
          <DialogDescription>
            Wybierz szablon, który najlepiej pasuje do Twojej branży i stylu
          </DialogDescription>
        </DialogHeader>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)}>
          <TabsList className="grid grid-cols-6 w-full mb-6">
            <TabsTrigger value="all">
              Wszystkie ({allTemplates.length})
            </TabsTrigger>
            <TabsTrigger value="professional">
              Profesjonalne
            </TabsTrigger>
            <TabsTrigger value="creative">
              Kreatywne
            </TabsTrigger>
            <TabsTrigger value="modern">
              Nowoczesne
            </TabsTrigger>
            <TabsTrigger value="classic">
              Klasyczne
            </TabsTrigger>
            <TabsTrigger value="technical">
              Techniczne
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`relative group rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    currentTemplate === template.id
                      ? 'border-purple-500 shadow-lg ring-2 ring-purple-200'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  {/* Template Preview */}
                  <div
                    className="h-32 rounded-t-lg relative overflow-hidden"
                    style={{
                      background: template.preview.startsWith('linear-gradient')
                        ? template.preview
                        : template.preview,
                    }}
                  >
                    {/* Current template indicator */}
                    {currentTemplate === template.id && (
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-lg">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                    )}

                    {/* Hover overlay */}
                    {hoveredTemplate === template.id && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Button
                          size="sm"
                          className="bg-white text-purple-600 hover:bg-purple-50"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Wybierz szablon
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="p-4 space-y-3">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-lg">{template.name}</h3>
                        <Badge
                          className={`${getATSBadgeColor(template.atsScore)} text-xs border flex items-center gap-1`}
                        >
                          <Shield className="w-3 h-3" />
                          ATS: {template.atsScore}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {template.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs px-2 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs px-2 py-0 text-gray-500"
                        >
                          +{template.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Best For */}
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-700 mb-1">
                        Najlepszy dla:
                      </p>
                      <ul className="text-xs text-gray-600 space-y-0.5">
                        {template.bestFor.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-purple-600">•</span>
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                        {template.bestFor.length > 2 && (
                          <li className="text-gray-500 italic">
                            +{template.bestFor.length - 2} więcej...
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Difficulty */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        {getDifficultyIcon(template.difficulty)}
                        <span className="capitalize">{template.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>Brak szablonów w tej kategorii</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* ATS Info Banner */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-blue-900 mb-1">
                Wskazówka: Zgodność z ATS
              </p>
              <p className="text-blue-800">
                Szablony z oceną ATS "excellent" lub "good" mają największe szanse na przejście
                przez automatyczne systemy rekrutacyjne. Szablon "ATS-Friendly" jest zoptymalizowany
                pod kątem maksymalnej kompatybilności.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
