import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, MapPin, Globe, Link as LinkIcon } from 'lucide-react';
import { useCVStore } from '@/stores/cvStore';
import AISuggestionButton from '@/components/cv/AISuggestionButton';
import { PhotoUpload } from '@/components/cv/PhotoUpload';

const PersonalInfoForm: React.FC = memo(() => {
  const { cvData, updatePersonalInfo } = useCVStore();
  const { personal } = cvData;

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
          <div className="flex items-center justify-between">
            <Label htmlFor="summary">O mnie *</Label>
            <AISuggestionButton
              label="Generuj podsumowanie"
              onClick={() => {
                // Will be enabled when AI is configured
              }}
            />
          </div>
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
        </div>
      </CardContent>
    </Card>
  );
});

export default PersonalInfoForm;
