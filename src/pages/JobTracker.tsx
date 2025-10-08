import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import PlantyNavbar from '@/components/PlantyNavbar';
import PlantyFooter from '@/components/landing/PlantyFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Filter,
  ExternalLink,
  Edit,
  Trash2,
  Target,
  Calendar,
  MessageCircle,
  CheckCircle,
  X,
  Clock,
  Smile,
  BookOpen,
  Eye,
  Activity,
  Briefcase,
  Building2,
  MapPin,
  Euro
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface JobApplication {
  id: number;
  position: string;
  company: string;
  applicationDate: string;
  status: 'applied' | 'interview' | 'rejected' | 'accepted' | 'pending';
  statusDate: string;
  expectedSalary: string;
  offeredSalary: string;
  workMode: string;
  contractType: string;
  contact: string;
  jobLink: string;
  notes: string;
}

const JobTracker = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);

  // Mock data
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 1,
      position: 'Senior Frontend Developer',
      company: 'Tech Startup Kraków',
      applicationDate: '2025-10-01',
      status: 'interview',
      statusDate: '2025-10-05',
      expectedSalary: '15,000 PLN',
      offeredSalary: '-',
      workMode: 'Hybrid',
      contractType: 'B2B',
      contact: 'hr@techstartup.pl',
      jobLink: 'https://example.com/job1',
      notes: 'Pierwsza rozmowa za tydzień'
    },
    {
      id: 2,
      position: 'Product Manager',
      company: 'E-commerce Giant',
      applicationDate: '2025-09-28',
      status: 'applied',
      statusDate: '2025-09-28',
      expectedSalary: '12,000 PLN',
      offeredSalary: '-',
      workMode: 'Remote',
      contractType: 'UoP',
      contact: 'jobs@ecommerce.com',
      jobLink: 'https://example.com/job2',
      notes: ''
    },
    {
      id: 3,
      position: 'UX Designer',
      company: 'Design Studio',
      applicationDate: '2025-09-25',
      status: 'rejected',
      statusDate: '2025-09-30',
      expectedSalary: '10,000 PLN',
      offeredSalary: '-',
      workMode: 'Stacjonarny',
      contractType: 'UoP',
      contact: '',
      jobLink: 'https://example.com/job3',
      notes: 'Brak doświadczenia w projekcie X'
    },
  ]);

  const statusCards = [
    { title: 'Zaaplikowane', count: applications.filter(a => a.status === 'applied').length, color: 'bg-blue-500', icon: Smile, textColor: 'text-white' },
    { title: 'W trakcie rozmów', count: applications.filter(a => a.status === 'interview').length, color: 'bg-gradient-primary', icon: MessageCircle, textColor: 'text-white' },
    { title: 'Oferty', count: applications.filter(a => a.status === 'accepted').length, color: 'bg-green-500', icon: Target, textColor: 'text-white' },
    { title: 'Odrzucone', count: applications.filter(a => a.status === 'rejected').length, color: 'bg-destructive', icon: X, textColor: 'text-white' },
    { title: 'Oczekujące', count: applications.filter(a => a.status === 'pending').length, color: 'bg-slate-400', icon: Clock, textColor: 'text-white' },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      applied: { label: 'Wysłane', class: 'bg-blue-500 text-white' },
      interview: { label: 'Rozmowa', class: 'bg-gradient-primary text-white' },
      rejected: { label: 'Odrzucone', class: 'bg-destructive text-white' },
      accepted: { label: 'Oferta', class: 'bg-green-500 text-white' },
      pending: { label: 'Oczekujące', class: 'bg-slate-400 text-white' },
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.applied;
  };

  const handleDeleteApplication = (id: number) => {
    if (confirm('Czy na pewno chcesz usunąć tę aplikację?')) {
      setApplications(prev => prev.filter(app => app.id !== id));
    }
  };

  const filteredApplications = applications.filter(app => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return app.status === 'applied' || app.status === 'interview' || app.status === 'pending';
    if (activeFilter === 'finished') return app.status === 'accepted' || app.status === 'rejected';
    return true;
  });

  return (
    <>
      <SEO
        title="Job Tracker - FOMOjobs"
        description="Śledź swoje aplikacje o pracę, organizuj rozmowy i nie przegap żadnej okazji."
      />

      <PlantyNavbar />

      <div className="min-h-screen bg-background pt-16">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-accent to-primary dark:from-primary/80 dark:via-accent/80 dark:to-primary/70 text-primary-foreground">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md">
                FOMO.<span className="text-secondary">jobstracker</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto drop-shadow">
                Śledź swoje aplikacje, organizuj rozmowy i nie przegap żadnej okazji.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 shadow-xl">
                      <Plus className="mr-2 h-5 w-5" />
                      Dodaj aplikację
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Dodaj nową aplikację</DialogTitle>
                      <DialogDescription>
                        Wypełnij dane aplikacji o pracę
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="position">Stanowisko *</Label>
                          <Input id="position" placeholder="np. Frontend Developer" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Firma *</Label>
                          <Input id="company" placeholder="np. Google Poland" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="applicationDate">Data aplikacji</Label>
                          <Input id="applicationDate" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Wybierz status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="applied">Wysłane</SelectItem>
                              <SelectItem value="interview">Rozmowa</SelectItem>
                              <SelectItem value="accepted">Oferta</SelectItem>
                              <SelectItem value="rejected">Odrzucone</SelectItem>
                              <SelectItem value="pending">Oczekujące</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expectedSalary">Oczekiwane wynagrodzenie</Label>
                          <Input id="expectedSalary" placeholder="np. 15,000 PLN" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="workMode">Tryb pracy</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Wybierz tryb" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="remote">Remote</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="onsite">Stacjonarny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobLink">Link do oferty</Label>
                        <Input id="jobLink" type="url" placeholder="https://..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notatki</Label>
                        <Textarea id="notes" placeholder="Dodatkowe informacje..." rows={4} />
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Anuluj
                      </Button>
                      <Button className="bg-gradient-primary text-white" onClick={() => setIsDialogOpen(false)}>
                        Zapisz
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Sidebar */}
            <div className="xl:w-64 space-y-6">
              <Card className="shadow-card border-0 bg-gradient-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Twoje aplikacje</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={activeFilter === 'all' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('all')}
                  >
                    Wszystkie ({applications.length})
                  </Button>
                  <Button
                    variant={activeFilter === 'active' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('active')}
                  >
                    Aktywne ({applications.filter(a => ['applied', 'interview', 'pending'].includes(a.status)).length})
                  </Button>
                  <Button
                    variant={activeFilter === 'finished' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('finished')}
                  >
                    Zakończone ({applications.filter(a => ['accepted', 'rejected'].includes(a.status)).length})
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Status Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
              >
                {statusCards.map((card, index) => {
                  const IconComponent = card.icon;
                  return (
                    <Card key={index} className="text-center hover-lift shadow-card border-0 bg-gradient-card cursor-pointer">
                      <CardContent className="p-4">
                        <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                          <IconComponent className={`w-6 h-6 ${card.textColor}`} />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 text-sm">{card.title}</h3>
                        <p className="text-2xl font-bold text-primary">{card.count}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>

              {/* Applications List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">
                    Aplikacje ({filteredApplications.length})
                  </h2>
                </div>

                {filteredApplications.length === 0 ? (
                  <Card className="shadow-card border-0 bg-gradient-card">
                    <CardContent className="py-16 text-center">
                      <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Brak aplikacji</h3>
                      <p className="text-muted-foreground mb-6">
                        Dodaj swoją pierwszą aplikację o pracę
                      </p>
                      <Button className="bg-gradient-primary text-white" onClick={() => setIsDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Dodaj aplikację
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {filteredApplications.map((app, index) => {
                      const statusConfig = getStatusBadge(app.status);
                      return (
                        <motion.div
                          key={app.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                          <Card className="hover-lift shadow-card border-0 bg-gradient-card">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <CardTitle className="text-xl">{app.position}</CardTitle>
                                    <Badge className={statusConfig.class}>
                                      {statusConfig.label}
                                    </Badge>
                                  </div>
                                  <CardDescription className="flex items-center gap-4 text-base">
                                    <span className="flex items-center gap-1">
                                      <Building2 className="w-4 h-4" />
                                      {app.company}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      {new Date(app.applicationDate).toLocaleDateString('pl-PL')}
                                    </span>
                                  </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDeleteApplication(app.id)}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground mb-1">Oczekiwane</p>
                                  <p className="font-semibold flex items-center gap-1">
                                    <Euro className="w-3 h-3" />
                                    {app.expectedSalary}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground mb-1">Tryb pracy</p>
                                  <p className="font-semibold">{app.workMode}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground mb-1">Kontrakt</p>
                                  <p className="font-semibold">{app.contractType}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground mb-1">Link</p>
                                  {app.jobLink && (
                                    <a
                                      href={app.jobLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:text-primary/80 flex items-center gap-1"
                                    >
                                      Otwórz
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                              {app.notes && (
                                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                  <p className="text-sm text-muted-foreground">
                                    <strong>Notatki:</strong> {app.notes}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <PlantyFooter />
    </>
  );
};

export default JobTracker;
