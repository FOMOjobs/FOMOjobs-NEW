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
import { GraduationCap, Plus, Pencil, Trash2, MapPin, Calendar } from 'lucide-react';
import { useCVStore } from '@/stores/cvStore';
import { EducationItem } from '@/types/cv';
import { toast } from 'sonner';
import {
  sanitizeInput,
  validateDateFormat,
  validateDateNotFuture,
  validateDateRange
} from '@/utils/validation';

const EducationSection: React.FC = () => {
  const { cvData, addEducation, updateEducation, deleteEducation } = useCVStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<EducationItem, 'id'>>({
    degree: '',
    fieldOfStudy: '',
    school: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    description: '',
    achievements: []
  });

  const resetForm = () => {
    setFormData({
      degree: '',
      fieldOfStudy: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: '',
      achievements: []
    });
    setEditingId(null);
  };

  const handleOpenDialog = (education?: EducationItem) => {
    if (education) {
      setFormData(education);
      setEditingId(education.id);
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    // Basic field validation
    if (!formData.degree || !formData.school) {
      toast.error('Wypełnij wymagane pola (stopień i uczelnia)');
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

    // Validate end date (if not current)
    if (!formData.current && formData.endDate) {
      if (!validateDateFormat(formData.endDate)) {
        toast.error('Nieprawidłowy format daty zakończenia (YYYY-MM)');
        return;
      }

      // Allow future dates for education (ongoing programs)
      // But check date range
      if (formData.startDate && !validateDateRange(formData.startDate, formData.endDate)) {
        toast.error('Data zakończenia nie może być przed datą rozpoczęcia');
        return;
      }
    }

    // Sanitize text inputs
    const sanitizedData = {
      ...formData,
      degree: sanitizeInput(formData.degree, 100),
      fieldOfStudy: sanitizeInput(formData.fieldOfStudy, 100),
      school: sanitizeInput(formData.school, 100),
      location: sanitizeInput(formData.location || '', 100),
      gpa: sanitizeInput(formData.gpa || '', 20),
      description: sanitizeInput(formData.description || '', 2000),
      achievements: formData.achievements.map(a => sanitizeInput(a, 500))
    };

    if (editingId) {
      updateEducation(editingId, sanitizedData);
      toast.success('Wykształcenie zaktualizowane!');
    } else {
      addEducation(sanitizedData);
      toast.success('Wykształcenie dodane!');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteEducation(id);
    toast.success('Wykształcenie usunięte');
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    return `${month}.${year}`;
  };

  return (
    <Card className="shadow-card border-0 bg-gradient-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Wykształcenie
          </CardTitle>
          <Button onClick={() => handleOpenDialog()} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Dodaj
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvData.education.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Brak wykształcenia</p>
            <p className="text-xs">Kliknij "Dodaj" aby rozpocząć</p>
          </div>
        ) : (
          cvData.education.map((edu) => (
            <Card key={edu.id} className="border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-primary font-medium">{edu.school}</p>
                    {edu.fieldOfStudy && (
                      <p className="text-sm text-muted-foreground">{edu.fieldOfStudy}</p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                      {edu.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {edu.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(edu.startDate)} - {edu.current ? 'obecnie' : formatDate(edu.endDate)}
                      </span>
                    </div>
                    {edu.gpa && (
                      <p className="mt-2 text-sm">Średnia: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(edu)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(edu.id)}
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
                {editingId ? 'Edytuj wykształcenie' : 'Dodaj wykształcenie'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Stopień *</Label>
                  <Input
                    id="degree"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    placeholder="np. Licencjat, Magister"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy">Kierunek</Label>
                  <Input
                    id="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                    placeholder="np. Informatyka"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="school">Uczelnia *</Label>
                <Input
                  id="school"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  placeholder="np. Uniwersytet Warszawski"
                />
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
                  Obecnie studiuję
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gpa">Średnia (opcjonalne)</Label>
                <Input
                  id="gpa"
                  value={formData.gpa || ''}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  placeholder="np. 4.5/5.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Dodatkowe informacje</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Osiągnięcia, wyróżnienia, prace naukowe..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Anuluj
              </Button>
              <Button onClick={handleSave}>
                {editingId ? 'Zapisz zmiany' : 'Dodaj wykształcenie'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default EducationSection;
