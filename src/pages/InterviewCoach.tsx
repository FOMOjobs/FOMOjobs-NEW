import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  FileText,
  Mic,
  MicOff,
  PlayCircle,
  Sparkles,
  Target,
  Upload,
  Volume2,
  Zap,
} from 'lucide-react'
import { toast } from 'sonner'

import FOMOJobsNavbar from '@/components/FOMOJobsNavbar'
import { GradientHeader } from '@/components/shared/GradientHeader'
import FOMOJobsFooter from '@/components/landing/FOMOJobsFooter'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { loadCVFromStorage } from '@/lib/cvStorage'

const InterviewCoach = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [cvFileName, setCvFileName] = useState('');
  const [cvSource, setCvSource] = useState<'upload' | 'fomojobs'>('upload');
  const [jobDescription, setJobDescription] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);

  const MOCK_QUESTIONS = [
    "Opowiedz mi o sobie i swoim doświadczeniu zawodowym.",
    "Dlaczego chcesz pracować w naszej firmie?",
    "Jakie są twoje największe mocne strony?",
    "Opisz sytuację, w której musiałeś rozwiązać trudny problem.",
    "Gdzie widzisz siebie za 5 lat?"
  ];

  const FEATURES = [
    {
      icon: Mic,
      title: "Trening głosowy",
      description: "Ćwicz swoje odpowiedzi z analizą mowy w czasie rzeczywistym"
    },
    {
      icon: Target,
      title: "Spersonalizowane pytania",
      description: "Pytania dopasowane do Twojego CV i opisu stanowiska"
    },
    {
      icon: Volume2,
      title: "Feedback w czasie rzeczywistym",
      description: "Natychmiastowe wskazówki dotyczące jakości odpowiedzi"
    },
    {
      icon: Zap,
      title: "Wyzwania",
      description: "Trudne scenariusze i pytania stresowe do przećwiczenia"
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFileName(file.name);
      setCvUploaded(true);
      toast.success(`CV "${file.name}" zostało przesłane!`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setCvFileName(file.name);
      setCvUploaded(true);
      toast.success(`CV "${file.name}" zostało przesłane!`);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info('Nagrywanie rozpoczęte...');
    } else {
      toast.success('Nagrywanie zakończone!');
    }
  };

  const handleLoadFOMOJobsCV = () => {
    const cvData = loadCVFromStorage();
    if (!cvData) {
      toast.error('Nie znaleziono CV w FOMO.cvcreator');
      return;
    }

    const cvName = cvData.personal.fullName || 'Twoje CV';
    setCvFileName(`${cvName} (FOMO.cvcreator)`);
    setCvUploaded(true);
    toast.success(`CV "${cvName}" załadowane z FOMO.cvcreator!`);
  };

  const startSession = () => {
    if (!cvUploaded) {
      toast.error('Proszę najpierw przesłać CV lub załadować z FOMO.cvcreator');
      return;
    }
    if (!jobDescription.trim()) {
      toast.error('Proszę wpisać opis stanowiska');
      return;
    }
    setSessionStarted(true);
    setCurrentQuestion(0);
    toast.success('Sesja treningowa rozpoczęta!');
  };

  const nextQuestion = () => {
    if (currentQuestion < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setIsRecording(false);
    } else {
      toast.success('Gratulacje! Ukończyłeś wszystkie pytania!');
      setSessionStarted(false);
      setCurrentQuestion(0);
    }
  };

  return (
    <>
      <Helmet>
        <title>FOMO.coach - Trener rozmów kwalifikacyjnych z AI | FOMOjobs</title>
        <meta
          name="description"
          content="Przygotuj się do rozmowy kwalifikacyjnej z AI. Ćwicz odpowiedzi, otrzymuj feedback i zwiększ swoje szanse na sukces."
        />
        <meta name="keywords" content="rozmowa kwalifikacyjna, trening, AI coach, przygotowanie, CV, kariera" />
      </Helmet>

      <FOMOJobsNavbar />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-16">
        <GradientHeader
          title="✨ FOMO.coach"
          subtitle="Twój osobisty trener rozmów kwalifikacyjnych napędzany sztuczną inteligencją"
          showBackButton
        />

        <div className="container mx-auto px-4 py-12">
          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {FEATURES.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </motion.div>

          {!sessionStarted ? (
            /* Setup Phase */
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Step 1: Upload CV */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Prześlij swoje CV</CardTitle>
                        <CardDescription className="text-base">
                          Pomożemy Ci przygotować odpowiedzi dopasowane do Twojego doświadczenia
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Wybór źródła CV */}
                    <RadioGroup value={cvSource} onValueChange={(v) => setCvSource(v as 'upload' | 'fomojobs')}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upload" id="upload" />
                        <Label htmlFor="upload" className="cursor-pointer">Wgraj plik (PDF/DOCX)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fomojobs" id="fomojobs" />
                        <Label htmlFor="fomojobs" className="cursor-pointer">Wybierz z FOMO.cvcreator</Label>
                      </div>
                    </RadioGroup>

                    {/* Upload pliku */}
                    {cvSource === 'upload' && (
                      <div
                        className="border-2 border-dashed border-primary/30 rounded-xl p-12 text-center hover:border-primary/60 transition-colors cursor-pointer bg-muted/30"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <Input
                          id="cv-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        <Label htmlFor="cv-upload" className="cursor-pointer">
                          {cvUploaded ? (
                            <div className="flex flex-col items-center gap-4">
                              <CheckCircle className="w-16 h-16 text-green-500" />
                              <div>
                                <p className="text-lg font-semibold text-foreground">CV przesłane pomyślnie!</p>
                                <p className="text-sm text-muted-foreground mt-2">{cvFileName}</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Zmień plik
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-4">
                              <Upload className="w-16 h-16 text-primary" />
                              <div>
                                <p className="text-lg font-semibold text-foreground">Przeciągnij plik CV tutaj</p>
                                <p className="text-sm text-muted-foreground mt-2">lub kliknij, aby wybrać plik (PDF, DOC, DOCX)</p>
                              </div>
                            </div>
                          )}
                        </Label>
                      </div>
                    )}

                    {/* Wybór CV z FOMOjobs */}
                    {cvSource === 'fomojobs' && (
                      <div className="space-y-4">
                        {!loadCVFromStorage() ? (
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              Nie masz jeszcze CV w FOMO.cvcreator.{' '}
                              <Link to="/cv-creator" className="underline font-semibold">
                                Stwórz swoje pierwsze CV
                              </Link>
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <div className="border-2 border-primary/30 rounded-xl p-8 bg-muted/30">
                            {cvUploaded ? (
                              <div className="flex flex-col items-center gap-4">
                                <CheckCircle className="w-16 h-16 text-green-500" />
                                <div className="text-center">
                                  <p className="text-lg font-semibold text-foreground">CV załadowane pomyślnie!</p>
                                  <p className="text-sm text-muted-foreground mt-2">{cvFileName}</p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setCvUploaded(false);
                                    setCvFileName('');
                                  }}
                                >
                                  Zmień CV
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-4">
                                <FileText className="w-16 h-16 text-primary" />
                                <div className="text-center">
                                  <p className="text-lg font-semibold text-foreground">Załaduj CV z FOMO.cvcreator</p>
                                  <p className="text-sm text-muted-foreground mt-2">
                                    Użyj CV stworzonego w naszym kreatorze
                                  </p>
                                </div>
                                <Button
                                  onClick={handleLoadFOMOJobsCV}
                                  className="bg-gradient-to-r from-primary to-secondary"
                                >
                                  <FileText className="w-4 h-4 mr-2" />
                                  Załaduj CV
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Step 2: Job Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Wklej opis stanowiska</CardTitle>
                        <CardDescription className="text-base">
                          Dopasujemy pytania do konkretnej oferty pracy
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Wklej tutaj opis stanowiska z ogłoszenia o pracę..."
                      className="min-h-[200px] text-base"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Step 3: Start Session */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="border-0 shadow-card bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Rozpocznij sesję treningową</CardTitle>
                        <CardDescription className="text-base">
                          Czas przećwiczyć rozmowę kwalifikacyjną!
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      size="lg"
                      className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                      onClick={startSession}
                    >
                      <PlayCircle className="mr-2 h-6 w-6" />
                      Zacznij trening
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ) : (
            /* Practice Session Phase */
            <div className="max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Progress */}
                <Card className="border-0 shadow-card mb-8">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Pytanie {currentQuestion + 1} z {MOCK_QUESTIONS.length}
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {Math.round(((currentQuestion + 1) / MOCK_QUESTIONS.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${((currentQuestion + 1) / MOCK_QUESTIONS.length) * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Current Question */}
                <Card className="border-0 shadow-card bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">
                      {MOCK_QUESTIONS[currentQuestion]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Recording Interface */}
                    <div className="flex flex-col items-center gap-6 py-8">
                      <Button
                        size="lg"
                        onClick={toggleRecording}
                        className={`w-32 h-32 rounded-full ${
                          isRecording
                            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                            : 'bg-gradient-to-br from-primary to-secondary hover:opacity-90'
                        } transition-all`}
                      >
                        {isRecording ? (
                          <MicOff className="w-16 h-16" />
                        ) : (
                          <Mic className="w-16 h-16" />
                        )}
                      </Button>
                      <p className="text-lg font-semibold">
                        {isRecording ? 'Nagrywanie... Kliknij, aby zatrzymać' : 'Kliknij, aby rozpocząć odpowiedź'}
                      </p>
                    </div>

                    {/* Live Feedback */}
                    {isRecording && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-xl p-6 border-2 border-primary/20"
                      >
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-primary" />
                          Analiza na żywo
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Tempo mowy: Optymalne
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Pewność głosu: Dobra
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Struktura odpowiedzi: Klarowna
                          </li>
                        </ul>
                      </motion.div>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setSessionStarted(false)}
                        className="flex-1"
                      >
                        Zakończ sesję
                      </Button>
                      <Button
                        size="lg"
                        onClick={nextQuestion}
                        className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      >
                        {currentQuestion < MOCK_QUESTIONS.length - 1 ? (
                          <>
                            Następne pytanie
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        ) : (
                          <>
                            Zakończ trening
                            <CheckCircle className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Tips */}
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Wskazówki AI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        Strukturyzuj odpowiedź według metody STAR (Sytuacja, Task, Akcja, Rezultat)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        Używaj konkretnych przykładów z Twojego doświadczenia
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        Utrzymuj kontakt wzrokowy i pewny ton głosu
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <FOMOJobsFooter />
    </>
  );
};

export default InterviewCoach;
