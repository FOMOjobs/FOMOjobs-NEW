import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Briefcase, Plus, Pencil, Trash2, MapPin, Calendar, Sparkles, Loader2, X } from 'lucide-react';
import { useCVStore } from '@/stores/cvStore';
import { ExperienceItem } from '@/types/cv';
import { toast } from 'sonner';
import { useAIGeneration } from '@/hooks/useAIGeneration';
import {
  sanitizeInput,
  validateDateFormat,
  validateDateNotFuture,
  validateDateRange
} from '@/utils/validation';

const ExperienceSection: React.FC = () => {
  const { cvData, addExperience, updateExperience, deleteExperience } = useCVStore();
  const { improveDescription, isLoading: isAILoading } = useAIGeneration();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAchievement, setNewAchievement] = useState('');
  const [formData, setFormData] = useState<Omit<ExperienceItem, 'id'>>({
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: []
  });

  const resetForm = () => {
    setFormData({
      position: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    });
    setEditingId(null);
    setNewAchievement('');
  };

  const handleOpenDialog = (experience?: ExperienceItem) => {
    if (experience) {
      setFormData(experience);
      setEditingId(experience.id);
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    // Basic field validation
    if (!formData.position || !formData.company) {
      toast.error('Wypełnij wymagane pola (stanowisko i firma)');
      return;
    }

    // Validate start date
    if (formData.startDate) {
      if (!validateDateFormat(formData.startDate)) {
        toast.error('Nieprawidłowy format daty rozpoczęcia (YYYY-MM)');
        return;
      }

      if (!validateDateNotFuture(formData.startDate)) {
        toast.error('Data rozpoczęcia nie może być w przyszłości');
        return;
      }
    }

    // Validate end date (if not current job)
    if (!formData.current && formData.endDate) {
      if (!validateDateFormat(formData.endDate)) {
        toast.error('Nieprawidłowy format daty zakończenia (YYYY-MM)');
        return;
      }

      if (!validateDateNotFuture(formData.endDate)) {
        toast.error('Data zakończenia nie może być w przyszłości');
        return;
      }

      // Check date range
      if (formData.startDate && !validateDateRange(formData.startDate, formData.endDate)) {
        toast.error('Data zakończenia nie może być przed datą rozpoczęcia');
        return;
      }
    }

    // Sanitize text inputs
    const sanitizedData = {
      ...formData,
      position: sanitizeInput(formData.position, 100),
      company: sanitizeInput(formData.company, 100),
      location: sanitizeInput(formData.location || '', 100),
      description: sanitizeInput(formData.description, 2000),
      achievements: formData.achievements.map(a => sanitizeInput(a, 500))
    };

    if (editingId) {
      updateExperience(editingId, sanitizedData);
      toast.success('Doświadczenie zaktualizowane!');
    } else {
      addExperience(sanitizedData);
      toast.success('Doświadczenie dodane!');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteExperience(id);
    toast.success('Doświadczenie usunięte');
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    return `${month}.${year}`;
  };

  /**
   * Handle AI description improvement
   * Converts job description into achievement-focused bullet points
   */
  const handleImproveDescription = async () => {
    if (!formData.position || !formData.description) {
      toast.error('Najpierw wypełnij stanowisko i opis');
      return;
    }

    const achievements = await improveDescription({
      jobTitle: formData.position,
      currentDescription: formData.description,
      language: cvData.customization.language
    });

    if (achievements) {
      // Append AI-generated achievements to existing ones
      setFormData({
        ...formData,
        achievements: [...formData.achievements, ...achievements]
      });
    }
  };

  /**
   * Add new achievement to the list
   */
  const handleAddAchievement = () => {
    if (!newAchievement.trim()) {
      toast.error('Wpisz osiągnięcie');
      return;
    }

    const sanitized = sanitizeInput(newAchievement, 500);
    setFormData({
      ...formData,
      achievements: [...formData.achievements, sanitized]
    });
    setNewAchievement('');
    toast.success('Osiągnięcie dodane');
  };

  /**
   * Remove achievement from the list
   */
  const handleRemoveAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index)
    });
    toast.success('Osiągnięcie usunięte');
  };

  return (
    <Card className="shadow-card border-0 bg-gradient-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            Doświadczenie zawodowe
          </CardTitle>
          <Button onClick={() => handleOpenDialog()} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Dodaj
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvData.experience.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Brak doświadczenia zawodowego</p>
            <p className="text-xs">Kliknij "Dodaj" aby rozpocząć</p>
          </div>
        ) : (
          cvData.experience.map((exp) => (
            <Card key={exp.id} className="border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{exp.position}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(exp.startDate)} - {exp.current ? 'obecnie' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="mt-3 text-sm text-muted-foreground">{exp.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(exp)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(exp.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {/* Dialog for adding/editing */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edytuj doświadczenie' : 'Dodaj doświadczenie'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Stanowisko *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="np. Senior Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Firma *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="np. Google"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Lokalizacja</Label>
                <Input
                  id="location"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="np. Warszawa, Polska"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data rozpoczęcia</Label>
                  <Input
                    id="startDate"
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data zakończenia</Label>
                  <Input
                    id="endDate"
                    type="month"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={formData.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="current"
                  checked={formData.current}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, current: checked as boolean, endDate: checked ? '' : formData.endDate })
                  }
                />
                <Label htmlFor="current" className="cursor-pointer">
                  Obecnie pracuję na tym stanowisku
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Opis stanowiska</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Opisz swoje obowiązki i osiągnięcia..."
                  className="min-h-[100px]"
                />

                {/* AI Improve Description Button */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleImproveDescription}
                  disabled={isAILoading || !formData.position || !formData.description}
                  className="w-full border-purple-200 hover:bg-purple-50"
                >
                  {isAILoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Ulepszanie...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                      Ulepsz opis AI
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-500">
                  AI wygeneruje osiągnięcia na podstawie opisu i doda je do listy poniżej
                </p>
              </div>

              {/* Achievements Section */}
              <div className="space-y-2 pt-4 border-t">
                <Label>Osiągnięcia i obowiązki</Label>
                <p className="text-xs text-muted-foreground">
                  Dodaj konkretne osiągnięcia, metryki i rezultaty z tego stanowiska
                </p>

                {/* Lista achievements */}
                {formData.achievements.length > 0 && (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {formData.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-3 bg-muted rounded-lg border hover:border-primary/50 transition-colors group"
                      >
                        <span className="text-sm flex-1 leading-relaxed">
                          • {achievement}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAchievement(idx)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new achievement */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="np. Zwiększyłem wydajność zespołu o 30% przez wdrożenie nowych procesów"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAddAchievement();
                      }
                    }}
                    maxLength={500}
                    className="flex-1 min-h-[80px]"
                  />
                  <Button
                    type="button"
                    onClick={handleAddAchievement}
                    disabled={!newAchievement.trim()}
                    className="self-end"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formData.achievements.length} osiągnięć dodanych • Enter aby dodać
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Anuluj
              </Button>
              <Button onClick={handleSave}>
                {editingId ? 'Zapisz zmiany' : 'Dodaj doświadczenie'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
