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
import {
  sanitizeInput,
  validateAndSanitizeEmail,
  validateAndSanitizePhone,
  validateAndSanitizeName,
  validateAndSanitizeURL
} from '@/utils/validation';
import { toast } from 'sonner';
import { getRemainingRequests } from '@/utils/aiRateLimiter';

const PersonalInfoForm: React.FC = memo(() => {
  const { cvData, updatePersonalInfo } = useCVStore();
  const { personal, experience, education, skills, customization } = cvData;

  // AI Generation (NEW: simpler rate limiting)
  const { generateSummary, isLoading } = useAIGeneration();
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

  // Validated input handlers
  const handleNameChange = (value: string) => {
    const result = validateAndSanitizeName(value);
    if (result.isValid || value.length === 0) {
      updatePersonalInfo({ fullName: result.value });
    } else if (value.length > 0) {
      toast.error(result.error);
    }
  };

  const handleEmailChange = (value: string) => {
    // Allow typing, but show error on blur if invalid
    const sanitized = sanitizeInput(value, 254);
    updatePersonalInfo({ email: sanitized });
  };

  const handleEmailBlur = () => {
    if (!personal.email) return; // Empty is OK (will be caught by required check)

    const result = validateAndSanitizeEmail(personal.email);
    if (!result.isValid) {
      toast.error(result.error);
    }
  };

  const handlePhoneChange = (value: string) => {
    const sanitized = sanitizeInput(value, 20);
    updatePersonalInfo({ phone: sanitized });
  };

  const handlePhoneBlur = () => {
    if (!personal.phone) return;

    const result = validateAndSanitizePhone(personal.phone);
    if (!result.isValid) {
      toast.error(result.error);
    }
  };

  const handleAddressChange = (value: string) => {
    const sanitized = sanitizeInput(value, 200);
    updatePersonalInfo({ address: sanitized });
  };

  const handleLinkedInChange = (value: string) => {
    const sanitized = sanitizeInput(value, 2048);
    updatePersonalInfo({ linkedIn: sanitized });
  };

  const handleLinkedInBlur = () => {
    if (!personal.linkedIn) return; // Empty is OK (optional field)

    const result = validateAndSanitizeURL(personal.linkedIn);
    if (!result.isValid) {
      toast.error(result.error);
      updatePersonalInfo({ linkedIn: '' }); // Clear invalid URL
    }
  };

  const handlePortfolioChange = (value: string) => {
    const sanitized = sanitizeInput(value, 2048);
    updatePersonalInfo({ portfolio: sanitized });
  };

  const handlePortfolioBlur = () => {
    if (!personal.portfolio) return;

    const result = validateAndSanitizeURL(personal.portfolio);
    if (!result.isValid) {
      toast.error(result.error);
      updatePersonalInfo({ portfolio: '' });
    }
  };

  const handleSummaryChange = (value: string) => {
    const sanitized = sanitizeInput(value, 800);
    updatePersonalInfo({ summary: sanitized });
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
            onChange={(e) => handleNameChange(e.target.value)}
            maxLength={100}
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
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
              maxLength={254}
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
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={handlePhoneBlur}
              maxLength={20}
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
              onChange={(e) => handleAddressChange(e.target.value)}
              maxLength={200}
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
              onChange={(e) => handleLinkedInChange(e.target.value)}
              onBlur={handleLinkedInBlur}
              maxLength={2048}
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
              onChange={(e) => handlePortfolioChange(e.target.value)}
              onBlur={handlePortfolioBlur}
              maxLength={2048}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">O mnie *</Label>
          <Textarea
            id="summary"
            placeholder="Wygeneruj podsumowanie AI lub napisz własne..."
            className="min-h-[120px]"
            value={personal.summary}
            onChange={(e) => handleSummaryChange(e.target.value)}
            maxLength={800}
          />
          <div className="flex justify-end">
            <span className="text-xs text-muted-foreground">
              {personal.summary?.length || 0}/800 znaków
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
              disabled={isLoading || getRemainingRequests() === 0}
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
                  Generuj AI ({getRemainingRequests()}/4)
                </>
              )}
            </Button>

            {/* Usage Indicator */}
            <AIUsageIndicator />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default PersonalInfoForm;
