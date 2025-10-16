import React, { memo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, MapPin, Globe, Link as LinkIcon, Sparkles, Loader2 } from 'lucide-react';
import { useCVStore } from '@/stores/cvStore';
import { PhotoUpload } from '@/components/cv/PhotoUpload';
import { useAIGeneration } from '@/hooks/useAIGeneration';
import AIUsageIndicator from '@/components/cv-creator/AIUsageIndicator';
import type { AITone } from '@/lib/mockAI';

const PersonalInfoForm: React.FC = memo(() => {
  const { cvData, updatePersonalInfo } = useCVStore();
  const { personal, experience, education, skills, customization } = cvData;

  // AI Generation
  const { generateSummary, limits, isLoading } = useAIGeneration();
  const [selectedTone, setSelectedTone] = useState<AITone>('friendly');

  /**
   * Handle AI summary generation
   * Collects user's experience, education, and skills to generate personalized summary
   */
  const handleGenerateSummary = async () => {
    const summary = await generateSummary({
      experience: experience.map(exp => ({
        position: exp.position,
        company: exp.company,
        description: exp.description
      })),
      education: education.map(edu => ({
        degree: edu.degree,
        school: edu.school
      })),
      skills: skills.map(skill => ({
        name: skill.name,
        level: skill.level
      })),
      tone: selectedTone,
      language: customization.language
    });

    if (summary) {
      updatePersonalInfo({ summary });
    }
  };

  return (
    <Card className="shadow-card border-0 bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-6 w-6" />
          Dane osobowe
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Imię i nazwisko *
          </Label>
          <Input
            id="fullName"
            placeholder="Jan Kowalski"
            value={personal.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Zdjęcie profilowe</Label>
          <PhotoUpload
            value={personal.photo || undefined}
            onChange={(photo) => updatePersonalInfo({ photo })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jan.kowalski@email.com"
              value={personal.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Telefon *
            </Label>
            <Input
              id="phone"
              placeholder="+48 123 456 789"
              value={personal.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Adres *
            </Label>
            <Input
              id="address"
              placeholder="Warszawa, Polska"
              value={personal.address}
              onChange={(e) => updatePersonalInfo({ address: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedIn" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              LinkedIn (opcjonalne)
            </Label>
            <Input
              id="linkedIn"
              type="url"
              placeholder="https://linkedin.com/in/jan-kowalski"
              value={personal.linkedIn || ''}
              onChange={(e) => updatePersonalInfo({ linkedIn: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Portfolio (opcjonalne)
            </Label>
            <Input
              id="portfolio"
              type="url"
              placeholder="https://jankowalski.dev"
              value={personal.portfolio || ''}
              onChange={(e) => updatePersonalInfo({ portfolio: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">O mnie *</Label>
          <Textarea
            id="summary"
            placeholder="Krótkie podsumowanie Twoich kwalifikacji i celów zawodowych..."
            className="min-h-[120px]"
            value={personal.summary}
            onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          />
          <div className="flex justify-end">
            <span className="text-xs text-muted-foreground">
              {personal.summary?.length || 0}/500 znaków
            </span>
          </div>

          {/* AI Summary Generator */}
          <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-yellow-50 rounded-lg border border-purple-200 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h4 className="text-sm font-semibold text-gray-800">Generator AI podsumowania</h4>
            </div>

            {/* Tone Selector */}
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-xs">Styl podsumowania</Label>
              <Select value={selectedTone} onValueChange={(value) => setSelectedTone(value as AITone)}>
                <SelectTrigger id="tone" className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">
                    <div className="flex flex-col">
                      <span className="font-medium">Formalny</span>
                      <span className="text-xs text-gray-500">Profesjonalny i poważny ton</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="friendly">
                    <div className="flex flex-col">
                      <span className="font-medium">Przyjazny</span>
                      <span className="text-xs text-gray-500">Ciepły i osobisty ton</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="technical">
                    <div className="flex flex-col">
                      <span className="font-medium">Techniczny</span>
                      <span className="text-xs text-gray-500">Konkretny, z danymi i metrykami</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button
              type="button"
              onClick={handleGenerateSummary}
              disabled={isLoading || (limits?.hourly.used ?? 0) >= (limits?.hourly.limit ?? 10)}
              className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generowanie...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generuj AI
                </>
              )}
            </Button>

            {/* Usage Indicator */}
            <AIUsageIndicator limits={limits} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default PersonalInfoForm;
