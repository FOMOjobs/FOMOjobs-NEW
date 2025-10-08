import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Briefcase,
  GraduationCap,
  Zap,
  Globe,
  CheckCircle,
  AlertCircle,
  Circle
} from 'lucide-react';
import { useCVStore } from '@/stores/cvStore';
import { CVSection } from '@/types/cv';

const CVSectionNavigation: React.FC = () => {
  const { activeSection, setActiveSection, cvData } = useCVStore();

  const sectionConfig = [
    {
      id: 'personal' as CVSection,
      icon: User,
      title: 'Dane osobowe',
      description: 'Podstawowe informacje'
    },
    {
      id: 'experience' as CVSection,
      icon: Briefcase,
      title: 'Doświadczenie',
      description: 'Historia zawodowa'
    },
    {
      id: 'education' as CVSection,
      icon: GraduationCap,
      title: 'Wykształcenie',
      description: 'Edukacja i kursy'
    },
    {
      id: 'skills' as CVSection,
      icon: Zap,
      title: 'Umiejętności',
      description: 'Twoje kompetencje'
    },
    {
      id: 'languages' as CVSection,
      icon: Globe,
      title: 'Języki',
      description: 'Znajomość języków'
    }
  ];

  // Calculate completion for each section
  const calculateSectionCompletion = (sectionId: CVSection): number => {
    switch (sectionId) {
      case 'personal':
        const { personal } = cvData;
        const requiredFields = ['fullName', 'email', 'phone', 'address', 'summary'];
        const completed = requiredFields.filter(field => personal[field as keyof typeof personal]).length;
        return Math.round((completed / requiredFields.length) * 100);

      case 'experience':
        return cvData.experience.length > 0 ? 100 : 0;

      case 'education':
        return cvData.education.length > 0 ? 100 : 0;

      case 'skills':
        return cvData.skills.length > 0 ? 100 : 0;

      case 'languages':
        return cvData.languages.length > 0 ? 100 : 0;

      default:
        return 0;
    }
  };

  const getValidationStatus = (sectionId: CVSection): 'valid' | 'warning' | 'incomplete' => {
    const completion = calculateSectionCompletion(sectionId);

    if (completion >= 80) return 'valid';
    if (completion >= 40) return 'warning';
    return 'incomplete';
  };

  const getStatusIcon = (status: 'valid' | 'warning' | 'incomplete') => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (completion: number) => {
    if (completion >= 80) {
      return <Badge variant="default" className="bg-green-500 text-xs">Gotowe</Badge>;
    }
    if (completion >= 40) {
      return <Badge variant="secondary" className="text-xs">W trakcie</Badge>;
    }
    if (completion > 0) {
      return <Badge variant="outline" className="text-xs">Rozpoczęte</Badge>;
    }
    return <Badge variant="outline" className="text-xs">Nowe</Badge>;
  };

  // Calculate overall completion
  const overallCompletion = Math.round(
    sectionConfig.reduce((sum, section) => {
      return sum + calculateSectionCompletion(section.id);
    }, 0) / sectionConfig.length
  );

  return (
    <Card className="sticky top-4 h-fit shadow-card border-0 bg-gradient-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Postęp CV</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Ukończono</span>
            <span className="text-sm font-medium">{overallCompletion}%</span>
          </div>
          <Progress value={overallCompletion} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {sectionConfig.map((section) => {
          const Icon = section.icon;
          const completion = calculateSectionCompletion(section.id);
          const status = getValidationStatus(section.id);
          const isActive = activeSection === section.id;

          return (
            <Button
              key={section.id}
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start h-auto p-3 flex-col items-start gap-2"
              onClick={() => setActiveSection(section.id)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium text-sm">{section.title}</div>
                    <div className="text-xs text-muted-foreground opacity-75">
                      {section.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(status)}
                  {getStatusBadge(completion)}
                </div>
              </div>

              {completion > 0 && (
                <div className="w-full">
                  <Progress value={completion} className="h-1" />
                </div>
              )}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CVSectionNavigation;
