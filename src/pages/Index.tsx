import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Badge as BadgeIcon,
  Bell,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Euro,
  Filter,
  MapPin,
  Search,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

import FOMOJobsPageLayout from '@/components/FOMOJobsPageLayout'
import SEO from '@/components/SEO'
import { IndustryStatsCarousel } from '@/components/landing/IndustryStatsCarousel'
import FOMOJobsBlogPreview from '@/components/landing/FOMOJobsBlogPreview'
import FOMOJobsPricing from '@/components/landing/FOMOJobsPricing'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Index = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6 pb-2 overflow-visible contrast-more:text-black dark:contrast-more:text-white">
                Poznaj FOMOjobs
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground contrast-more:text-black dark:contrast-more:text-white">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="contrast-more:text-black dark:contrast-more:text-white"
              >
                Rynek pracy się zmienił. Pracodawcy coraz częściej publikują oferty na własnych, mniej widocznych stronach, zamiast na dużych portalach.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="contrast-more:text-black dark:contrast-more:text-white"
              >
                <span className="text-primary font-bold text-xl contrast-more:text-black dark:contrast-more:text-white">FOMOjobs</span> to Twój osobisty radar, który dzięki technologii wyszukuje i filtruje te ukryte oferty. Otrzymujesz od nas jeden alert dziennie z precyzyjnie dobranymi propozycjami, dopasowanymi do Twoich preferencji i szans.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-foreground font-semibold text-xl contrast-more:text-black dark:contrast-more:text-white"
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
              <p className="text-xl text-muted-foreground contrast-more:text-black dark:contrast-more:text-white">
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
                      <p className="text-muted-foreground contrast-more:text-black dark:contrast-more:text-white">{feature.description}</p>
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
                      <p className="text-muted-foreground leading-relaxed contrast-more:text-black dark:contrast-more:text-white">{benefit.description}</p>
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

        {/* INDUSTRY STATS CAROUSEL SECTION */}
        <div id="oferty-pracy">
          <IndustryStatsCarousel />
        </div>

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
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto contrast-more:text-black dark:contrast-more:text-white">
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
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-11 pb-6 contrast-more:text-black dark:contrast-more:text-white">
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
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-11 pb-6 contrast-more:text-black dark:contrast-more:text-white">
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
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-11 pb-6 contrast-more:text-black dark:contrast-more:text-white">
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
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-11 pb-6 contrast-more:text-black dark:contrast-more:text-white">
                    Plan #opentowork jest dedykowany osobom, które aktualnie poszukują pracy i mają odpowiedni status na LinkedIn. Po weryfikacji statusu, otrzymujesz pełny dostęp do wszystkich funkcji FOMOjobs za darmo.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-card border-0 rounded-xl shadow-card px-6 overflow-hidden">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-center gap-3 text-lg font-semibold">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold shadow-primary flex-shrink-0 text-sm">
                        5
                      </div>
                      Gdzie znajdę więcej odpowiedzi?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pl-11 pb-6 contrast-more:text-black dark:contrast-more:text-white">
                    Przygotowaliśmy obszerny dokument FAQ ze wszystkimi szczegółami.{' '}
                    <Link
                      to="/faq"
                      className="text-primary underline font-semibold hover:text-primary/80 transition contrast-more:text-black dark:contrast-more:text-white"
                    >
                      Przejdź do pełnej listy FAQ →
                    </Link>
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
