import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CustomizationPanel from '@/components/cv-creator/CustomizationPanel';
import CVPreview from '@/components/cv-creator/CVPreview';
import { Palette, Eye } from 'lucide-react';

const SettingsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-card border-0 bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Personalizacja CV
          </CardTitle>
          <CardDescription>
            Wybierz szablon i dostosuj kolory do swoich preferencji
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Customization Panel */}
      <CustomizationPanel />

      {/* Preview - visible on mobile/tablet when in settings tab */}
      <Card className="lg:hidden shadow-card border-0 bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Podgląd
          </CardTitle>
          <CardDescription>
            Zobacz jak wygląda Twoje CV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CVPreview />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSection;
