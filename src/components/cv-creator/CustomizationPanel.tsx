import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Palette, ChevronDown } from 'lucide-react';
import { useCVStore } from '@/stores/cvStore';
import { toast } from 'sonner';

interface ColorPreset {
  name: string;
  primary: string;
  secondary: string;
  icon: string;
}

const colorPresets: ColorPreset[] = [
  {
    name: 'Purple & Yellow',
    primary: '#8B5CF6',
    secondary: '#F4D03F',
    icon: '🟣'
  },
  {
    name: 'Blue & Orange',
    primary: '#3B82F6',
    secondary: '#F97316',
    icon: '🔵'
  },
  {
    name: 'Green & Pink',
    primary: '#10B981',
    secondary: '#EC4899',
    icon: '🟢'
  },
  {
    name: 'Red & Teal',
    primary: '#EF4444',
    secondary: '#14B8A6',
    icon: '🔴'
  },
  {
    name: 'Navy & Gold',
    primary: '#1e3a8a',
    secondary: '#fbbf24',
    icon: '⚫'
  }
];

const CustomizationPanel: React.FC = () => {
  const { cvData, setColors } = useCVStore();
  const { primaryColor, secondaryColor, template } = cvData.customization;

  const [isOpen, setIsOpen] = React.useState(false);

  const handlePresetClick = (preset: ColorPreset) => {
    setColors(preset.primary, preset.secondary);
    toast.success(`Kolory zmienione na: ${preset.name}`);
  };

  const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColors(e.target.value, secondaryColor);
  };

  const handleSecondaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColors(primaryColor, e.target.value);
  };

  // Disable color customization for ATS template
  const isATS = template === 'ats';

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="shadow-card border-0 bg-gradient-card">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-primary/5 transition-colors rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Palette className="h-5 w-5" />
                🎨 Personalizacja
              </CardTitle>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6 pt-4">
            {isATS && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                <p className="font-semibold text-yellow-800 mb-1">⚠️ Szablon ATS-Friendly</p>
                <p className="text-yellow-700 text-xs">
                  Personalizacja kolorów jest wyłączona dla szablonu ATS. Systemy ATS wymagają czarno-białego formatu.
                </p>
              </div>
            )}

            {/* Color Presets */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Gotowe palety kolorów
              </Label>
              <div className="grid grid-cols-1 gap-2">
                {colorPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant={
                      primaryColor === preset.primary && secondaryColor === preset.secondary
                        ? 'default'
                        : 'outline'
                    }
                    className="w-full justify-start h-auto py-3"
                    onClick={() => handlePresetClick(preset)}
                    disabled={isATS}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <span className="text-xl">{preset.icon}</span>
                      <span className="flex-1 text-left">{preset.name}</span>
                      <div className="flex gap-1">
                        <div
                          className="w-6 h-6 rounded border border-gray-300"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div
                          className="w-6 h-6 rounded border border-gray-300"
                          style={{ backgroundColor: preset.secondary }}
                        />
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="space-y-4">
              <Label className="text-sm font-medium block">
                Lub wybierz własne kolory
              </Label>

              {/* Primary Color */}
              <div className="space-y-2">
                <Label htmlFor="primary-color" className="text-xs text-muted-foreground">
                  Kolor podstawowy
                </Label>
                <div className="flex gap-2 items-center">
                  <input
                    id="primary-color"
                    type="color"
                    value={primaryColor}
                    onChange={handlePrimaryColorChange}
                    disabled={isATS}
                    className="w-16 h-10 rounded border border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setColors(e.target.value, secondaryColor)}
                    disabled={isATS}
                    className="flex-1 px-3 py-2 border rounded text-sm font-mono uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="#8B5CF6"
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div className="space-y-2">
                <Label htmlFor="secondary-color" className="text-xs text-muted-foreground">
                  Kolor dodatkowy
                </Label>
                <div className="flex gap-2 items-center">
                  <input
                    id="secondary-color"
                    type="color"
                    value={secondaryColor}
                    onChange={handleSecondaryColorChange}
                    disabled={isATS}
                    className="w-16 h-10 rounded border border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setColors(primaryColor, e.target.value)}
                    disabled={isATS}
                    className="flex-1 px-3 py-2 border rounded text-sm font-mono uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="#F4D03F"
                  />
                </div>
              </div>
            </div>

            {/* Color Preview */}
            {!isATS && (
              <div className="border rounded-lg p-4 bg-white">
                <Label className="text-xs text-muted-foreground mb-2 block">
                  Podgląd kolorów
                </Label>
                <div className="flex gap-2">
                  <div
                    className="flex-1 h-12 rounded border"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div
                    className="flex-1 h-12 rounded border"
                    style={{ backgroundColor: secondaryColor }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default CustomizationPanel;
