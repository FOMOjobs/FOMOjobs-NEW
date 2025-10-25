import FOMOJobsPageLayout from '@/components/FOMOJobsPageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  Target,
  Zap,
  Filter,
  Bell,
  TrendingUp,
  Users,
  Clock,
  MapPin,
  Euro,
  Building2,
  CheckCircle2,
  ArrowRight,
  Search,
  Star,
  ChevronDown
} from 'lucide-react';
import SEO from '@/components/SEO';
import FOMOJobsPricing from '@/components/landing/FOMOJobsPricing';
import FOMOJobsBlogPreview from '@/components/landing/FOMOJobsBlogPreview';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mock job offers data
  const featuredJobs = [
    {
      id: 1,
      title: 'Junior Frontend Developer',
      company: 'Tech Startup Kraków',
      location: 'Kraków',
      salary: '8,000 - 12,000 PLN',
      logo: '💻',
      type: 'Full-time',
      level: 'Junior'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      company: 'E-commerce Giant',
      location: 'Warszawa',
      salary: '10,000 - 15,000 PLN',
      logo: '📈',
      type: 'Full-time',
      level: 'Mid'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'Remote',
      salary: '9,000 - 14,000 PLN',
      logo: '🎨',
      type: 'Remote',
      level: 'Mid'
    },
    {
      id: 4,
      title: 'Backend Developer',
      company: 'FinTech Company',
      location: 'Wrocław',
      salary: '12,000 - 18,000 PLN',
      logo: '⚙️',
      type: 'Full-time',
      level: 'Senior'
    },
    {
      id: 5,
      title: 'Product Manager',
      company: 'SaaS Platform',
      location: 'Gdańsk',
      salary: '11,000 - 16,000 PLN',
      logo: '🚀',
      type: 'Full-time',
      level: 'Senior'
    },
    {
      id: 6,
      title: 'Data Analyst',
      company: 'Analytics Firm',
      location: 'Poznań',
      salary: '7,000 - 11,000 PLN',
      logo: '📊',
      type: 'Full-time',
      level: 'Junior'
    },
    {
      id: 7,
      title: 'DevOps Engineer',
      company: 'Cloud Provider',
      location: 'Remote',
      salary: '13,000 - 19,000 PLN',
      logo: '☁️',
      type: 'Remote',
      level: 'Senior'
    },
    {
      id: 8,
      title: 'Content Writer',
      company: 'Media Agency',
      location: 'Kraków',
      salary: '6,000 - 9,000 PLN',
      logo: '✍️',
      type: 'Full-time',
      level: 'Junior'
    },
    {
      id: 9,
      title: 'QA Engineer',
      company: 'Software House',
      location: 'Katowice',
      salary: '8,500 - 13,000 PLN',
      logo: '🔍',
      type: 'Full-time',
      level: 'Mid'
    },
    {
      id: 10,
      title: 'Sales Manager',
      company: 'B2B Services',
      location: 'Łódź',
      salary: '9,000 - 14,000 PLN',
      logo: '💼',
      type: 'Full-time',
      level: 'Mid'
    },
  ];

  return (
    <>
      <SEO
        title="FOMO Jobs - Nigdy nie przegap idealnej oferty pracy!"
        description="Nie trać czasu na przeszukiwanie stron karier pracodawców. FOMOjobs znajdzie najlepsze oferty pracy dla Ciebie i prześle je w codziennym alercie."
      />
      <FOMOJobsPageLayout>
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated gradient background - Circular, slower */}
          <div className="absolute inset-0 bg-gradient-radial from-primary via-secondary to-primary bg-[length:200%_200%] animate-gradient-shift">
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative">
                {/* Animated glow behind text - also circular and slower */}
                <div className="absolute inset-0 bg-gradient-radial from-primary via-secondary to-primary bg-[length:200%_200%] animate-gradient-shift opacity-30 blur-3xl -z-10" />

                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl">
                  Nigdy więcej nie przegap{' '}
                  <span className="text-secondary drop-shadow-2xl animate-pulse">idealnej oferty pracy!</span>
                </h1>
              </div>

              <p className="text-xl md:text-2xl mb-8 text-white/95 max-w-3xl mx-auto drop-shadow-lg">
                Nie trać czasu na przeszukiwanie stron karier pracodawców, ustaw alerty FOMOjobs,
                a zaoszczędzony czas poświęć na przygotowanie świetnego CV.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 font-semibold shadow-xl"
                  onClick={() => scrollToSection('register-form')}
                >
                  Zarejestruj się za darmo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('about')}
                  className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary px-8 py-6 text-lg font-semibold shadow-xl backdrop-blur-sm"
                >
                  Dowiedz się więcej
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 bg-card dark:bg-card/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6 pb-2 overflow-visible">
                Poznaj FOMOjobs
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Rynek pracy się zmienił. Pracodawcy coraz częściej publikują oferty na własnych, mniej widocznych stronach, zamiast na dużych portalach.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="text-primary font-bold text-xl">FOMOjobs</span> to Twój osobisty radar, który dzięki technologii wyszukuje i filtruje te ukryte oferty. Otrzymujesz od nas jeden alert dziennie z precyzyjnie dobranymi propozycjami, dopasowanymi do Twoich preferencji i szans.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-foreground font-semibold text-xl"
              >
                Skup się na swoim CV i przygotowaniu do rozmowy – my zajmiemy się resztą.
              </motion.p>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION - 4 STEPS */}
        <section className="py-20 bg-gradient-card dark:bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Oszczędzaj godziny scrollowania
              </h2>
              <p className="text-xl text-muted-foreground">
                W czterech prostych krokach do szybszego znalezienia pracy
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Wybierz firmy',
                  description: 'Określ branże i firmy, które Cię interesują',
                  icon: Building2,
                },
                {
                  step: '02',
                  title: 'Określ doświadczenie',
                  description: 'Ustaw poziom doświadczenia i stanowisko',
                  icon: Target,
                },
                {
                  step: '03',
                  title: 'Wybierz kategorie',
                  description: 'Sprecyzuj obszary pracy, które Cię interesują',
                  icon: Filter,
                },
                {
                  step: '04',
                  title: 'Ustaw alert',
                  description: 'Otrzymuj codzienne powiadomienia o nowych ofertach',
                  icon: Bell,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover-lift shadow-card border-0 bg-card dark:bg-card/80">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4 shadow-primary">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-6xl font-bold text-secondary/20 mb-2">{feature.step}</div>
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="py-20 bg-card dark:bg-card/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Dlaczego warto wybrać FOMOjobs?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Szybkość informacji',
                  description: 'Otrzymuj powiadomienia o nowych ofertach jako pierwszy, zanim znajdą je inni kandydaci',
                  icon: Zap,
                },
                {
                  title: 'Wszystko w jednym miejscu',
                  description: 'Zbieramy oferty z różnych źródeł, żebyś nie musiał przeszukiwać dziesiątek stron',
                  icon: Target,
                },
                {
                  title: 'Oszczędność Twojego czasu',
                  description: 'Zamiast scrollować godzinami, poświęć czas na przygotowanie lepszego CV i listu motywacyjnego',
                  icon: Clock,
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover-lift shadow-card border-0 bg-gradient-card">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center mb-4 shadow-primary">
                        <benefit.icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-20 bg-gradient-to-br from-primary via-accent to-primary dark:from-primary/80 dark:via-accent/80 dark:to-primary/70 text-primary-foreground">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
                Dlaczego FOMOjobs to przyszłość poszukiwania pracy?
              </h2>
              <p className="text-xl opacity-95 drop-shadow">
                W świecie, gdzie każdego dnia publikowane są tysiące nowych ofert pracy, potrzebujesz inteligentnego rozwiązania
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  number: '5000+',
                  label: 'Nowych ofert pracy',
                  description: 'Publikowanych codziennie w Polsce - czy jesteś w stanie wszystkie sprawdzić?',
                },
                {
                  number: '8h',
                  label: 'Tygodniowo',
                  description: 'Przeciętny kandydat spędza na przeglądaniu ofert pracy - czas, który możesz wykorzystać lepiej',
                },
                {
                  number: '60%',
                  label: 'Kandydatów',
                  description: 'Przegapi idealne oferty pracy, bo nie sprawdzają wszystkich dostępnych źródeł regularnie',
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-6xl md:text-7xl font-bold mb-2 text-secondary drop-shadow-lg">
                    {stat.number}
                  </div>
                  <div className="text-2xl font-semibold mb-3 drop-shadow">{stat.label}</div>
                  <p className="text-white/90 drop-shadow">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED JOB OFFERS SECTION */}
        <section id="oferty-pracy" className="py-20 bg-card dark:bg-card/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Wyróżnione Oferty Pracy
              </h2>
              <p className="text-xl text-muted-foreground">
                Najnowsze oferty od sprawdzonych pracodawców
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {featuredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover-lift shadow-card border-0 bg-gradient-card cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="text-4xl mb-3">{job.logo}</div>
                      <CardTitle className="text-base leading-tight group-hover:text-primary transition-colors">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium">
                        {job.company}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                        <Euro className="w-3 h-3" />
                        {job.salary}
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {job.type}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {job.level}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button size="lg" className="bg-gradient-primary hover:shadow-primary text-white">
                Zobacz wszystkie oferty
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <FOMOJobsPricing />

        {/* BLOG PREVIEW SECTION */}
        <FOMOJobsBlogPreview />

        {/* FAQ SECTION */}
        <section id="faq" className="py-20 bg-gradient-card dark:bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Często zadawane pytania (FAQ)
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Znajdź odpowiedzi na najczęściej zadawane pytania o FOMOjobs
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="bg-card border-0 rounded-xl shadow-card px-6 overflow-hidden">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-center gap-3 text-lg font-semibold">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold shadow-primary flex-shrink-0 text-sm">
                        1
                      </div>
                      Po co właściwie powstało FOMOjobs?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-11 pb-6">
                    FOMOjobs powstało z potrzeby rozwiązania problemu, z którym sam się zmagałem podczas poszukiwania pracy. Zauważyłem, że wiele świetnych ofert pracy jest publikowanych na stronach firm, a nie na głównych portalach pracy. FOMOjobs automatyzuje ten proces i oszczędza Ci czas.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-card border-0 rounded-xl shadow-card px-6 overflow-hidden">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-center gap-3 text-lg font-semibold">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold shadow-primary flex-shrink-0 text-sm">
                        2
                      </div>
                      Co oznacza hasło "Nie musisz szukać sam"?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-11 pb-6">
                    Zamiast samotnie przeszukiwać internet w poszukiwaniu ofert pracy, FOMOjobs robi to za Ciebie. Nasza technologia monitoruje setki stron firm i dopasowuje oferty do Twoich preferencji.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-card border-0 rounded-xl shadow-card px-6 overflow-hidden">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-center gap-3 text-lg font-semibold">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold shadow-primary flex-shrink-0 text-sm">
                        3
                      </div>
                      Skąd macie oferty pracy?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-11 pb-6">
                    Zbieramy oferty pracy bezpośrednio ze stron karier firm oraz z sprawdzonych portali pracy. Nasz system monitoruje ponad 500 źródeł w Polsce, włączając strony małych i średnich firm.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-card border-0 rounded-xl shadow-card px-6 overflow-hidden">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-center gap-3 text-lg font-semibold">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold shadow-primary flex-shrink-0 text-sm">
                        4
                      </div>
                      Dla kogo jest darmowy plan #opentowork?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-11 pb-6">
                    Plan #opentowork jest dedykowany osobom, które aktualnie poszukują pracy i mają odpowiedni status na LinkedIn. Po weryfikacji statusu, otrzymujesz pełny dostęp do wszystkich funkcji FOMOjobs za darmo.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* REGISTRATION CTA SECTION */}
        <section id="register-form" className="py-20 bg-gradient-to-br from-primary via-accent to-primary dark:from-primary/80 dark:via-accent/80 dark:to-primary/70 text-primary-foreground">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">
                Gotowy, by złapać najlepsze oferty?
              </h2>
              <p className="text-xl mb-8 opacity-95 drop-shadow">
                Dołącz do wielu zadowolonych użytkowników, którzy znaleźli pracę dzięki FOMOjobs. To proste, szybkie i skuteczne!
              </p>
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-xl px-12 py-7 font-bold shadow-2xl"
                onClick={() => window.location.href = '/auth'}
              >
                Zarejestruj się za darmo
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </motion.div>
          </div>
        </section>
      </FOMOJobsPageLayout>
    </>
  );
};

export default Index;
