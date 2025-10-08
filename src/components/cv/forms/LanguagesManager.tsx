import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Globe, Plus, X, Award } from 'lucide-react';
import { useCVStore } from '@/stores/cvStore';
import { LanguageItem } from '@/types/cv';
import { toast } from 'sonner';

const LanguagesManager: React.FC = () => {
  const { cvData, addLanguage, deleteLanguage } = useCVStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<LanguageItem, 'id'>>({
    name: '',
    level: 'B2',
    certification: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      level: 'B2',
      certification: ''
    });
  };

  const handleSave = () => {
    if (!formData.name) {
      toast.error('Podaj nazwę języka');
      return;
    }

    addLanguage(formData);
    toast.success('Język dodany!');
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteLanguage(id);
    toast.success('Język usunięty');
  };

  const getLevelDescription = (level: string) => {
    const descriptions: Record<string, string> = {
      A1: 'Początkujący',
      A2: 'Podstawowy',
      B1: 'Średnio zaawansowany',
      B2: 'Zaawansowany',
      C1: 'Bardzo zaawansowany',
      C2: 'Biegły',
      native: 'Ojczysty'
    };
    return descriptions[level] || level;
  };

  return (
    <Card className="shadow-card border-0 bg-gradient-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            Języki obce
          </CardTitle>
          <Button onClick={() => setIsDialogOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Dodaj
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvData.languages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Globe className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Brak języków</p>
            <p className="text-xs">Kliknij "Dodaj" aby rozpocząć</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cvData.languages.map((lang) => (
              <Card key={lang.id} className="border relative">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{lang.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {lang.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {getLevelDescription(lang.level)}
                      </p>
                      {lang.certification && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                          <Award className="h-3 w-3" />
                          {lang.certification}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(lang.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Dialog for adding language */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj język</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="languageName">Nazwa języka *</Label>
                <Input
                  id="languageName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="np. Angielski, Hiszpański"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Poziom zaawansowania</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value: any) => setFormData({ ...formData, level: value })}
                >
                  <SelectTrigger id="level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A1">A1 - Początkujący</SelectItem>
                    <SelectItem value="A2">A2 - Podstawowy</SelectItem>
                    <SelectItem value="B1">B1 - Średnio zaawansowany</SelectItem>
                    <SelectItem value="B2">B2 - Zaawansowany</SelectItem>
                    <SelectItem value="C1">C1 - Bardzo zaawansowany</SelectItem>
                    <SelectItem value="C2">C2 - Biegły</SelectItem>
                    <SelectItem value="native">Ojczysty</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certification">Certyfikat (opcjonalnie)</Label>
                <Input
                  id="certification"
                  value={formData.certification || ''}
                  onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                  placeholder="np. TOEFL 110, Cambridge CAE"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Anuluj
              </Button>
              <Button onClick={handleSave}>Dodaj język</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default LanguagesManager;
