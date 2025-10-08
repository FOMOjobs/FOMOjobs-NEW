import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Search,
  Bell,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Award,
  Code,
  Briefcase,
  MapPin,
  Clock,
  Filter,
  Target,
  Play,
  Download,
  Eye,
  EyeOff,
  Zap,
  Heart,
  Sparkles
} from 'lucide-react';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import FOMOJobsFooter from '@/components/landing/FOMOJobsFooter';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/lib/utils';

interface CandidateProfile {
  id: number;
  anonymousId: string;
  fitScore: number;
  skills: string[];
  experience: string;
  location: string;
  preferences: {
    salary: string;
    workMode: string;
    availability: string;
  };
  skillSnapshots: {
    type: 'project' | 'quiz' | 'pitch';
    title: string;
    url?: string;
    score?: number;
  }[];
  isActive: boolean;
  lastSeen: string;
  quickFeedback?: {
    positive: boolean;
    comment: string;
    date: string;
  };
}

const Recruiter = () => {
  const [showAnonymous, setShowAnonymous] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [candidates] = useState<CandidateProfile[]>([
    {
      id: 1,
      anonymousId: 'ANON_001_FE',
      fitScore: 95,
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
      experience: '3-5 lat',
      location: 'Warszawa/Remote',
      preferences: {
        salary: '15k - 18k PLN',
        workMode: 'Hybrid/Remote',
        availability: 'Natychmiast'
      },
      skillSnapshots: [
        { type: 'project', title: 'E-commerce Dashboard', url: '#' },
        { type: 'quiz', title: 'React Advanced Quiz', score: 92 },
        { type: 'pitch', title: '60s Elevator Pitch' }
      ],
      isActive: true,
      lastSeen: '5 min temu',
      quickFeedback: {
        positive: true,
        comment: 'Świetne portfolio, dopasowanie do roli Senior FE',
        date: '2025-01-08'
      }
    },
    {
      id: 2,
      anonymousId: 'ANON_002_BE',
      fitScore: 87,
      skills: ['Node.js', 'PostgreSQL', 'Docker', 'AWS'],
      experience: '5+ lat',
      location: 'Kraków',
      preferences: {
        salary: '20k - 25k PLN',
        workMode: 'Stacjonarny',
        availability: '2 tygodnie'
      },
      skillSnapshots: [
        { type: 'project', title: 'Microservices API' },
        { type: 'quiz', title: 'Backend Architecture', score: 88 }
      ],
      isActive: true,
      lastSeen: '15 min temu'
    },
    {
      id: 3,
      anonymousId: 'ANON_003_FS',
      fitScore: 78,
      skills: ['Vue.js', 'Python', 'Django', 'MongoDB'],
      experience: '2-3 lata',
      location: 'Gdańsk/Remote',
      preferences: {
        salary: '12k - 15k PLN',
        workMode: 'Remote only',
        availability: '1 miesiąc'
      },
      skillSnapshots: [
        { type: 'pitch', title: 'Prezentacja projektów' },
        { type: 'project', title: 'Social Media App' }
      ],
      isActive: false,
      lastSeen: '2 godz. temu'
    }
  ]);

  const [subscriptions] = useState([
    { id: 1, role: 'Frontend Developer', count: 12, newToday: 3 },
    { id: 2, role: 'Backend Developer', count: 8, newToday: 1 },
    { id: 3, role: 'Full Stack Developer', count: 15, newToday: 5 },
    { id: 4, role: 'DevOps Engineer', count: 6, newToday: 2 }
  ]);

  const handleQuickFeedback = (candidateId: number, positive: boolean, comment: string) => {
    console.log('Feedback for candidate:', candidateId, { positive, comment });
  };

  const getSkillSnapshotIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Code className="w-4 h-4" />;
      case 'quiz':
        return <Award className="w-4 h-4" />;
      case 'pitch':
        return <Play className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>FOMO.rekruter - Znajdź idealnych kandydatów | FOMOjobs</title>
        <meta
          name="description"
          content="Innowacyjna platforma rekrutacyjna z anonimowymi profilami, fit score i skill snapshots. Znajdź talenty szybciej i efektywniej."
        />
        <meta name="keywords" content="rekrutacja, kandydaci, HR, fit score, skill snapshots, anonimowe profile" />
      </Helmet>

      <FOMOJobsNavbar />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient-x text-primary-foreground">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-12 h-12" />
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="text-white">FOMO</span>.<span className="text-secondary drop-shadow-lg">rekruter</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                Odkryj talenty przez pryzmat umiejętności, nie CV
              </p>
              <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
                Anonimowe profile, AI fit score, skill snapshots - wszystko w jednym miejscu
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6 bg-white/90 hover:bg-white text-primary font-semibold">
                  <Search className="mr-2 h-5 w-5" />
                  Znajdź kandydatów
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
                  <Bell className="mr-2 h-5 w-5" />
                  Ustaw alerty
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Controls & Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Search & Filters */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary" />
                    Szukaj talentów
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Umiejętności, technologie..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                    <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tryb anonimowy</span>
                    <Switch
                      checked={showAnonymous}
                      onCheckedChange={setShowAnonymous}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Talent Subscriptions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Subskrypcje talentów
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {subscriptions.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <span className="text-sm font-medium">{sub.role}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{sub.count}</Badge>
                          {sub.newToday > 0 && (
                            <Badge className="bg-green-500 hover:bg-green-600">
                              +{sub.newToday} nowych
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className={cn(
                  'transition-all duration-300 hover:shadow-xl border-0 shadow-card hover:-translate-y-1',
                  candidate.isActive && 'ring-2 ring-green-500/20'
                )}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12 bg-gradient-to-br from-primary to-secondary">
                            <AvatarFallback className="text-white font-bold">
                              {showAnonymous
                                ? candidate.anonymousId.split('_')[1]
                                : candidate.anonymousId.charAt(0)
                              }
                            </AvatarFallback>
                          </Avatar>
                          {candidate.isActive && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {showAnonymous ? candidate.anonymousId : 'Jan K.'}
                          </h3>
                          <p className="text-sm text-muted-foreground">{candidate.experience}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Target className="w-4 h-4 text-primary" />
                          <span className="font-bold text-lg text-primary">{candidate.fitScore}%</span>
                        </div>
                        <Badge variant={candidate.isActive ? 'default' : 'secondary'} className="text-xs">
                          {candidate.isActive ? 'Aktywny' : 'Offline'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Skills */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Umiejętności</h4>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.preferences.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.preferences.availability}</span>
                      </div>
                    </div>

                    {/* Skill Snapshots */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Skill Snapshots</h4>
                      <div className="space-y-2">
                        {candidate.skillSnapshots.map((snapshot, snapshotIndex) => (
                          <div key={snapshotIndex} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2">
                              {getSkillSnapshotIcon(snapshot.type)}
                              <span className="text-sm">{snapshot.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {snapshot.score && (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">
                                  {snapshot.score}%
                                </Badge>
                              )}
                              <Button size="sm" variant="ghost" className="p-1">
                                {snapshot.type === 'pitch' ? <Play className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Feedback */}
                    {candidate.quickFeedback ? (
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-start gap-2">
                          <ThumbsUp className="w-4 h-4 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-green-800 dark:text-green-300">{candidate.quickFeedback.comment}</p>
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">{candidate.quickFeedback.date}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleQuickFeedback(candidate.id, true, 'Pozytywny feedback')}
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          ✅
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleQuickFeedback(candidate.id, false, 'Nie pasuje')}
                        >
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          ❌
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {/* Last seen */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-2">
                      <span>Ostatnio: {candidate.lastSeen}</span>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Features Showcase */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="text-center border-0 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <EyeOff className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Anonimowe profile</h3>
                <p className="text-sm text-muted-foreground">Oceniaj na podstawie umiejętności, nie przedsądów</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Fit Score AI</h3>
                <p className="text-sm text-muted-foreground">Automatyczne dopasowanie do wymagań stanowiska</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Skill Snapshots</h3>
                <p className="text-sm text-muted-foreground">Mini-projekty, quizy i prezentacje umiejętności</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Feedback Loop</h3>
                <p className="text-sm text-muted-foreground">Szybki feedback motywuje kandydatów</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <FOMOJobsFooter />
    </>
  );
};

export default Recruiter;
