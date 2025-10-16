import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import FOMOJobsFooter from '@/components/landing/FOMOJobsFooter';
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
  Euro,
  Send,
  Phone,
  Video,
  Building,
  XCircle,
  History,
  BarChart3,
  Bell,
  TrendingUp,
  TrendingDown,
  Zap
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Status types with icons and colors
type ApplicationStatus =
  | 'planned'           // Zaplanowano
  | 'applied'           // Zaaplikowano
  | 'phone_interview'   // Rozmowa telefoniczna
  | 'online_interview'  // Rozmowa online
  | 'onsite_interview'  // Rozmowa stacjonarna
  | 'offer'             // Oferta
  | 'rejected'          // Odrzucono
  | 'no_response';      // Brak odpowiedzi

interface StatusHistory {
  status: ApplicationStatus;
  date: string;
  note?: string;
}

interface JobApplication {
  id: number;
  position: string;
  company: string;
  applicationDate: string;
  status: ApplicationStatus;
  statusDate: string;
  expectedSalary: string;
  offeredSalary: string;
  workMode: string;
  contractType: string;
  contact: string;
  jobLink: string;
  notes: string;
  history: StatusHistory[];
  interviewDate?: string; // For upcoming interview reminders
}

// FEATURE 13 - Note Templates
const NOTE_TEMPLATES = [
  {
    id: 'interview-notes',
    label: '📝 Notatka z rozmowy',
    template: `Data: ${new Date().toLocaleDateString('pl-PL')}
Rozmówca: [DO UZUPEŁNIENIA]

Pytania zadane:
-

Moje wrażenia:
-

Next steps:
- `
  },
  {
    id: 'followup',
    label: '📧 Follow-up plan',
    template: `Kiedy wysłać: [DATA]
Kanał: [Email/LinkedIn/Phone]

Co napisać:
- Podziękowanie za rozmowę
- Przypomnienie o moich kwalifikacjach
- Pytanie o dalsze kroki

Załączniki: `
  },
  {
    id: 'preparation',
    label: '📚 Przygotowanie do rozmowy',
    template: `RESEARCH FIRMY:
- Produkty/usługi:
- Kultura organizacyjna:
- Recent news:

PYTANIA DO ZADANIA:
1.
2.
3.

MOJE MOCNE STRONY DLA TEJ ROLI:
- `
  },
  {
    id: 'offer-analysis',
    label: '💼 Analiza oferty',
    template: `PLUSY:
✅

MINUSY:
❌

PYTANIA DO WYJAŚNIENIA:
❓

WARUNKI DO NEGOCJACJI:
💰

OSTATECZNA DECYZJA: [ ] TAK  [ ] NIE  [ ] NEGOCJACJA`
  }
];

const JobTracker = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [showHistoryFor, setShowHistoryFor] = useState<number | null>(null);
  const [reminders, setReminders] = useState<Array<{ id: number; message: string; type: string }>>([]);
  const [notes, setNotes] = useState('');

  // Status configuration with icons and colors - FEATURE 1
  const getStatusConfig = (status: ApplicationStatus) => {
    const configs = {
      planned: {
        label: 'Zaplanowano',
        icon: Calendar,
        bgClass: 'bg-gray-100 dark:bg-gray-800',
        textClass: 'text-gray-700 dark:text-gray-300',
        iconBg: 'bg-gray-500'
      },
      applied: {
        label: 'Zaaplikowano',
        icon: Send,
        bgClass: 'bg-blue-100 dark:bg-blue-900/30',
        textClass: 'text-blue-700 dark:text-blue-300',
        iconBg: 'bg-blue-500'
      },
      phone_interview: {
        label: 'Rozmowa telefoniczna',
        icon: Phone,
        bgClass: 'bg-yellow-100 dark:bg-yellow-900/30',
        textClass: 'text-yellow-700 dark:text-yellow-300',
        iconBg: 'bg-yellow-500'
      },
      online_interview: {
        label: 'Rozmowa online',
        icon: Video,
        bgClass: 'bg-yellow-100 dark:bg-yellow-900/30',
        textClass: 'text-yellow-700 dark:text-yellow-300',
        iconBg: 'bg-yellow-500'
      },
      onsite_interview: {
        label: 'Rozmowa stacjonarna',
        icon: Building,
        bgClass: 'bg-yellow-100 dark:bg-yellow-900/30',
        textClass: 'text-yellow-700 dark:text-yellow-300',
        iconBg: 'bg-yellow-500'
      },
      offer: {
        label: 'Oferta',
        icon: CheckCircle,
        bgClass: 'bg-green-100 dark:bg-green-900/30',
        textClass: 'text-green-700 dark:text-green-300',
        iconBg: 'bg-green-500'
      },
      rejected: {
        label: 'Odrzucono',
        icon: XCircle,
        bgClass: 'bg-red-100 dark:bg-red-900/30',
        textClass: 'text-red-700 dark:text-red-300',
        iconBg: 'bg-red-500'
      },
      no_response: {
        label: 'Brak odpowiedzi',
        icon: Clock,
        bgClass: 'bg-orange-100 dark:bg-orange-900/30',
        textClass: 'text-orange-700 dark:text-orange-300',
        iconBg: 'bg-orange-500'
      }
    };
    return configs[status];
  };

  // Mock data with new structure
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 1,
      position: 'Senior Frontend Developer',
      company: 'Tech Startup Kraków',
      applicationDate: '2025-10-01',
      status: 'online_interview',
      statusDate: '2025-10-05',
      expectedSalary: '15,000 PLN',
      offeredSalary: '-',
      workMode: 'Hybrid',
      contractType: 'B2B',
      contact: 'hr@techstartup.pl',
      jobLink: 'https://example.com/job1',
      notes: 'Pierwsza rozmowa za tydzień',
      interviewDate: '2025-10-15',
      history: [
        { status: 'planned', date: '2025-09-28', note: 'Zaplanowano aplikację' },
        { status: 'applied', date: '2025-10-01', note: 'Wysłano CV' },
        { status: 'online_interview', date: '2025-10-05', note: 'Umówiono rozmowę online' }
      ]
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
      notes: '',
      history: [
        { status: 'applied', date: '2025-09-28', note: 'Wysłano aplikację' }
      ]
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
      notes: 'Brak doświadczenia w projekcie X',
      history: [
        { status: 'applied', date: '2025-09-25', note: 'Wysłano aplikację' },
        { status: 'rejected', date: '2025-09-30', note: 'Otrzymano odmowę' }
      ]
    },
    {
      id: 4,
      position: 'Full Stack Developer',
      company: 'FinTech Warszawa',
      applicationDate: '2025-09-20',
      status: 'offer',
      statusDate: '2025-10-10',
      expectedSalary: '18,000 PLN',
      offeredSalary: '17,500 PLN',
      workMode: 'Hybrid',
      contractType: 'B2B',
      contact: 'careers@fintech.pl',
      jobLink: 'https://example.com/job4',
      notes: 'Bardzo dobra oferta!',
      history: [
        { status: 'applied', date: '2025-09-20' },
        { status: 'phone_interview', date: '2025-09-25' },
        { status: 'onsite_interview', date: '2025-10-02' },
        { status: 'offer', date: '2025-10-10', note: 'Oferta: 17,500 PLN' }
      ]
    }
  ]);

  // FEATURE 7 - Statistics calculation
  const statistics = useMemo(() => {
    const sent = applications.length;
    const interviews = applications.filter(a =>
      ['phone_interview', 'online_interview', 'onsite_interview'].includes(a.status)
    ).length;
    const offers = applications.filter(a => a.status === 'offer').length;

    const interviewRate = sent > 0 ? ((interviews / sent) * 100).toFixed(1) : '0';
    const successRate = sent > 0 ? ((offers / sent) * 100).toFixed(1) : '0';

    const offeredSalaries = applications
      .filter(a => a.offeredSalary && a.offeredSalary !== '-')
      .map(a => parseFloat(a.offeredSalary.replace(/[^\d]/g, '')));
    const avgSalary = offeredSalaries.length > 0
      ? (offeredSalaries.reduce((a, b) => a + b, 0) / offeredSalaries.length).toFixed(0)
      : '0';

    const statusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostCommonStatus = Object.entries(statusCounts).sort((a, b) => b[1] - a[1])[0];

    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const thisMonthApps = applications.filter(a => {
      const appDate = new Date(a.applicationDate);
      return appDate.getMonth() === thisMonth && appDate.getFullYear() === thisYear;
    }).length;

    return {
      sent,
      interviews,
      offers,
      interviewRate,
      successRate,
      avgSalary,
      mostCommonStatus: mostCommonStatus ? {
        status: mostCommonStatus[0] as ApplicationStatus,
        count: mostCommonStatus[1]
      } : null,
      thisMonthApps
    };
  }, [applications]);

  // FEATURE 8 - Smart reminders
  useEffect(() => {
    const checkReminders = () => {
      const newReminders: Array<{ id: number; message: string; type: string }> = [];
      const now = new Date();

      applications.forEach(app => {
        // Check for no response after 2 weeks
        if (app.status === 'applied') {
          const appDate = new Date(app.applicationDate);
          const daysSince = Math.floor((now.getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24));
          if (daysSince >= 14) {
            newReminders.push({
              id: app.id,
              message: `${app.position} @ ${app.company}: Brak odpowiedzi od 2 tygodni - wyślij follow-up`,
              type: 'follow_up'
            });
          }
        }

        // Check for upcoming interviews
        if (app.interviewDate) {
          const interviewDate = new Date(app.interviewDate);
          const hoursUntil = (interviewDate.getTime() - now.getTime()) / (1000 * 60 * 60);

          if (hoursUntil > 0 && hoursUntil <= 24) {
            newReminders.push({
              id: app.id,
              message: `${app.position} @ ${app.company}: Rozmowa za ${Math.floor(hoursUntil)} godz. - przygotuj się!`,
              type: 'interview_soon'
            });
          } else if (hoursUntil > 0 && hoursUntil <= 2) {
            newReminders.push({
              id: app.id,
              message: `${app.position} @ ${app.company}: Rozmowa za ${Math.floor(hoursUntil * 60)} min!`,
              type: 'interview_imminent'
            });
          }
        }
      });

      setReminders(newReminders);
    };

    checkReminders();
    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [applications]);

  const statusCards = [
    { title: 'Zaaplikowane', count: applications.filter(a => a.status === 'applied').length, color: 'bg-blue-500', icon: Send, textColor: 'text-white' },
    { title: 'Rozmowy', count: applications.filter(a => ['phone_interview', 'online_interview', 'onsite_interview'].includes(a.status)).length, color: 'bg-yellow-500', icon: MessageCircle, textColor: 'text-white' },
    { title: 'Oferty', count: applications.filter(a => a.status === 'offer').length, color: 'bg-green-500', icon: CheckCircle, textColor: 'text-white' },
    { title: 'Odrzucone', count: applications.filter(a => a.status === 'rejected').length, color: 'bg-red-500', icon: XCircle, textColor: 'text-white' },
    { title: 'Brak odpowiedzi', count: applications.filter(a => a.status === 'no_response').length, color: 'bg-orange-500', icon: Clock, textColor: 'text-white' },
  ];

  // FEATURE 5 - Quick action handlers
  const handleDeleteApplication = (id: number) => {
    if (confirm('Czy na pewno chcesz usunąć tę aplikację?')) {
      setApplications(prev => prev.filter(app => app.id !== id));
    }
  };

  const handleQuickStatusChange = (appId: number, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const newHistory: StatusHistory = {
          status: newStatus,
          date: new Date().toISOString().split('T')[0],
          note: `Status zmieniony na: ${getStatusConfig(newStatus).label}`
        };
        return {
          ...app,
          status: newStatus,
          statusDate: newHistory.date,
          history: [...app.history, newHistory]
        };
      }
      return app;
    }));
  };

  const handleScheduleInterview = (appId: number, date: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          interviewDate: date
        };
      }
      return app;
    }));
  };

  const filteredApplications = applications.filter(app => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') {
      return ['planned', 'applied', 'phone_interview', 'online_interview', 'onsite_interview', 'no_response'].includes(app.status);
    }
    if (activeFilter === 'finished') {
      return ['offer', 'rejected'].includes(app.status);
    }
    return true;
  });

  return (
    <>
      <SEO
        title="Job Tracker - FOMOjobs"
        description="Śledź swoje aplikacje o pracę, organizuj rozmowy i nie przegap żadnej okazji."
      />

      <FOMOJobsNavbar />

      {/* Animated gradient background - same as Job Prompts */}
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden pt-16">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 dark:bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000" />
        </div>

        {/* Content - positioned above animated background */}
        <div className="relative z-10">
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
              {/* FEATURE 8 - Reminders Banner */}
              {reminders.length > 0 && (
                <div className="mb-6 max-w-2xl mx-auto">
                  <AnimatePresence>
                    {reminders.map((reminder) => (
                      <motion.div
                        key={reminder.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-yellow-400/90 text-yellow-900 px-4 py-3 rounded-lg mb-2 flex items-center gap-2 shadow-lg"
                      >
                        <Bell className="w-5 h-5 animate-pulse" />
                        <span className="font-medium">{reminder.message}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* FEATURE 7 - Statistics Button */}
                <Dialog open={isStatsOpen} onOpenChange={setIsStatsOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 shadow-xl backdrop-blur-sm">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      📊 Statystyki
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">📊 Twoje Statystyki Aplikacji</DialogTitle>
                      <DialogDescription>
                        Przegląd Twoich postępów w poszukiwaniu pracy
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-muted-foreground mb-1">Wysłane aplikacje</p>
                          <p className="text-3xl font-bold text-blue-600">{statistics.sent}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-muted-foreground mb-1">Przeprowadzone rozmowy</p>
                          <p className="text-3xl font-bold text-yellow-600">{statistics.interviews}</p>
                          <p className="text-xs text-muted-foreground mt-1">({statistics.interviewRate}% conversion)</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-muted-foreground mb-1">Otrzymane oferty</p>
                          <p className="text-3xl font-bold text-green-600">{statistics.offers}</p>
                          <p className="text-xs text-muted-foreground mt-1">({statistics.successRate}% success rate)</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-muted-foreground mb-1">Średnie wynagrodzenie</p>
                          <p className="text-2xl font-bold text-purple-600">{statistics.avgSalary} PLN</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-muted-foreground mb-1">Najczęstszy status</p>
                          {statistics.mostCommonStatus && (
                            <>
                              <p className="text-xl font-bold">{getStatusConfig(statistics.mostCommonStatus.status).label}</p>
                              <p className="text-xs text-muted-foreground mt-1">({statistics.mostCommonStatus.count} aplikacji)</p>
                            </>
                          )}
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-muted-foreground mb-1">W tym miesiącu</p>
                          <p className="text-3xl font-bold text-indigo-600">{statistics.thisMonthApps}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>

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
                              <SelectItem value="planned">📅 Zaplanowano</SelectItem>
                              <SelectItem value="applied">📧 Zaaplikowano</SelectItem>
                              <SelectItem value="phone_interview">📞 Rozmowa telefoniczna</SelectItem>
                              <SelectItem value="online_interview">💻 Rozmowa online</SelectItem>
                              <SelectItem value="onsite_interview">🏢 Rozmowa stacjonarna</SelectItem>
                              <SelectItem value="offer">✅ Oferta</SelectItem>
                              <SelectItem value="rejected">❌ Odrzucono</SelectItem>
                              <SelectItem value="no_response">⏰ Brak odpowiedzi</SelectItem>
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

                      {/* FEATURE 13 - Note Templates */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="notes">Notatki</Label>
                          {notes && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setNotes('')}
                              className="h-auto py-1 px-2 text-xs"
                            >
                              Wyczyść
                            </Button>
                          )}
                        </div>
                        <Select onValueChange={(templateId) => {
                          const template = NOTE_TEMPLATES.find(t => t.id === templateId);
                          if (template) setNotes(template.template);
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="💡 Użyj szablonu notatki..." />
                          </SelectTrigger>
                          <SelectContent>
                            {NOTE_TEMPLATES.map(t => (
                              <SelectItem key={t.id} value={t.id}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Textarea
                          id="notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Dodatkowe informacje..."
                          rows={8}
                          className="font-mono text-sm"
                        />
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
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Sidebar */}
            <div className="xl:w-64 space-y-6">
              <Card className="shadow-card border-0 bg-white dark:bg-gray-800">
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
                    <Card key={index} className="text-center hover-lift shadow-card border-0 bg-white dark:bg-gray-800 cursor-pointer">
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
                  <Card className="shadow-card border-0 bg-white dark:bg-gray-800">
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
                      const statusConfig = getStatusConfig(app.status);
                      const StatusIcon = statusConfig.icon;
                      return (
                        <motion.div
                          key={app.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                          {/* Option 3 - Gradient Accent Bar + Purple Border */}
                          <Card className="relative border-2 border-purple-300 dark:border-purple-700 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden group bg-white dark:bg-gray-800">
                            {/* Gradient accent bar - left side */}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-600 via-purple-500 to-yellow-500 opacity-80 group-hover:opacity-100 group-hover:w-2 transition-all duration-300" />

                            {/* Card content with left padding to accommodate gradient bar */}
                            <div className="pl-6 pr-4 py-4">
                              {/* Header: Title + Status Badge */}
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-semibold text-foreground">{app.position}</h3>
                                    {/* FEATURE 1 - Status badge with icon */}
                                    <Badge className={`${statusConfig.bgClass} ${statusConfig.textClass} flex items-center gap-1`}>
                                      <StatusIcon className="w-3 h-3" />
                                      {statusConfig.label}
                                    </Badge>
                                  </div>
                                  {/* Company & Date */}
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Building2 className="w-4 h-4" />
                                      {app.company}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      {new Date(app.applicationDate).toLocaleDateString('pl-PL')}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Salary, Work Mode & Contract Info */}
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

                              {/* FEATURE 4 - Timeline/History */}
                              {app.history && app.history.length > 0 && (
                                <div className="mt-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowHistoryFor(showHistoryFor === app.id ? null : app.id)}
                                    className="flex items-center gap-2"
                                  >
                                    <History className="w-4 h-4" />
                                    {showHistoryFor === app.id ? 'Ukryj historię' : 'Pokaż historię'}
                                  </Button>

                                  <AnimatePresence>
                                    {showHistoryFor === app.id && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="mt-3 p-4 bg-muted/30 rounded-lg border border-border"
                                      >
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                          📅 Historia zmian
                                        </h4>
                                        <div className="space-y-2">
                                          {app.history.map((entry, idx) => {
                                            const entryConfig = getStatusConfig(entry.status);
                                            const EntryIcon = entryConfig.icon;
                                            return (
                                              <div key={idx} className="flex items-start gap-3 text-sm">
                                                <div className={`w-8 h-8 rounded-full ${entryConfig.iconBg} flex items-center justify-center flex-shrink-0`}>
                                                  <EntryIcon className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                  <div className="flex items-center gap-2">
                                                    <span className="font-medium">{entryConfig.label}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                      {new Date(entry.date).toLocaleDateString('pl-PL')}
                                                    </span>
                                                  </div>
                                                  {entry.note && (
                                                    <p className="text-xs text-muted-foreground mt-1">{entry.note}</p>
                                                  )}
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )}

                              {/* FEATURE 5 - Quick Actions */}
                              <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingApplication(app)}
                                  className="flex items-center gap-1"
                                >
                                  <Edit className="w-3 h-3" />
                                  Edytuj
                                </Button>
                                <Select onValueChange={(value) => handleQuickStatusChange(app.id, value as ApplicationStatus)}>
                                  <SelectTrigger className="w-auto h-8">
                                    <SelectValue placeholder="✅ Zmień status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="planned">📅 Zaplanowano</SelectItem>
                                    <SelectItem value="applied">📧 Zaaplikowano</SelectItem>
                                    <SelectItem value="phone_interview">📞 Rozmowa telefoniczna</SelectItem>
                                    <SelectItem value="online_interview">💻 Rozmowa online</SelectItem>
                                    <SelectItem value="onsite_interview">🏢 Rozmowa stacjonarna</SelectItem>
                                    <SelectItem value="offer">✅ Oferta</SelectItem>
                                    <SelectItem value="rejected">❌ Odrzucono</SelectItem>
                                    <SelectItem value="no_response">⏰ Brak odpowiedzi</SelectItem>
                                  </SelectContent>
                                </Select>
                                <div className="flex items-center gap-2">
                                  <Label htmlFor={`interview-date-${app.id}`} className="text-xs">📅 Rozmowa:</Label>
                                  <Input
                                    id={`interview-date-${app.id}`}
                                    type="date"
                                    value={app.interviewDate || ''}
                                    onChange={(e) => handleScheduleInterview(app.id, e.target.value)}
                                    className="h-8 w-auto"
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteApplication(app.id)}
                                  className="text-destructive hover:text-destructive flex items-center gap-1"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Usuń
                                </Button>
                              </div>
                            </div>
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

      <FOMOJobsFooter />
    </>
  );
};

export default JobTracker;
