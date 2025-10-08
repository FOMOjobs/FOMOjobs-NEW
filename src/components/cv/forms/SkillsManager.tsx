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
import { Zap, Plus, X } from 'lucide-react';
import { useCVStore } from '@/stores/cvStore';
import { SkillItem } from '@/types/cv';
import { toast } from 'sonner';

const SkillsManager: React.FC = () => {
  const { cvData, addSkill, deleteSkill } = useCVStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<SkillItem, 'id'>>({
    name: '',
    level: 'intermediate',
    category: 'technical'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      level: 'intermediate',
      category: 'technical'
    });
  };

  const handleSave = () => {
    if (!formData.name) {
      toast.error('Podaj nazwę umiejętności');
      return;
    }

    addSkill(formData);
    toast.success('Umiejętność dodana!');
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteSkill(id);
    toast.success('Umiejętność usunięta');
  };

  const getLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      beginner: 'Początkujący',
      intermediate: 'Średniozaawansowany',
      advanced: 'Zaawansowany',
      expert: 'Ekspert'
    };
    return labels[level] || level;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      technical: 'Techniczne',
      soft: 'Miękkie',
      language: 'Językowe',
      other: 'Inne'
    };
    return labels[category] || category;
  };

  const groupedSkills = cvData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillItem[]>);

  return (
    <Card className="shadow-card border-0 bg-gradient-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Umiejętności
          </CardTitle>
          <Button onClick={() => setIsDialogOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Dodaj
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {cvData.skills.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Zap className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Brak umiejętności</p>
            <p className="text-xs">Kliknij "Dodaj" aby rozpocząć</p>
          </div>
        ) : (
          Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase">
                {getCategoryLabel(category)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="secondary"
                    className="pl-3 pr-2 py-2 text-sm flex items-center gap-2"
                  >
                    <span>{skill.name}</span>
                    <span className="text-xs opacity-70">({getLevelLabel(skill.level)})</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleDelete(skill.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Dialog for adding skill */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj umiejętność</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="skillName">Nazwa umiejętności *</Label>
                <Input
                  id="skillName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="np. JavaScript, Zarządzanie projektami"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Techniczne</SelectItem>
                    <SelectItem value="soft">Miękkie</SelectItem>
                    <SelectItem value="language">Językowe</SelectItem>
                    <SelectItem value="other">Inne</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="beginner">Początkujący</SelectItem>
                    <SelectItem value="intermediate">Średniozaawansowany</SelectItem>
                    <SelectItem value="advanced">Zaawansowany</SelectItem>
                    <SelectItem value="expert">Ekspert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Anuluj
              </Button>
              <Button onClick={handleSave}>Dodaj umiejętność</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SkillsManager;
