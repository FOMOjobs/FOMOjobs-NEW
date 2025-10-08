import { ArrowLeft, CheckCircle, Users, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import FOMOJobsPageLayout from '@/components/FOMOJobsPageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>O nas - FOMOjobs</title>
        <meta name="description" content="Poznaj zespół FOMOjobs i naszą misję - pomagamy znaleźć idealną pracę szybciej niż konkurencja." />
      </Helmet>

      <FOMOJobsPageLayout>
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Powrót do strony głównej
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-6"
            >
              O FOMOjobs
            </motion.h1>

            <div className="prose prose-lg max-w-none">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-12"
              >
                Jesteśmy zespołem pasjonatów technologii i rekrutacji, którzy wierzą, że szukanie pracy nie musi być frustrujące.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold">Nasza Misja</h2>
                  <p className="text-muted-foreground">
                    FOMOjobs powstało z frustracją: dlaczego tak trudno znaleźć oferty pracy, które są świeżo opublikowane?
                    Dlaczego trzeba przeszukiwać dziesiątki portali, żeby znaleźć jedną dobrą ofertę?
                  </p>
                  <p className="text-muted-foreground">
                    Nasza misja jest prosta: pomóc Ci znaleźć idealną pracę szybciej niż konkurencja. Nie przegap oferty,
                    bo nie wiedziałeś, że istnieje.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border-0"
                >
                  <h3 className="text-2xl font-bold mb-4">Nasze Wartości</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Szybkość:</strong> Łapiemy oferty zanim trafią na główne portale.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Dopasowanie:</strong> AI pomaga znaleźć oferty idealnie dopasowane do Twoich umiejętności.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Transparentność:</strong> Widełki wynagrodzenia i realne opisy stanowisk.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Wsparcie:</strong> Narzędzia sukcesu: CV Creator, Interview Coach, Job Tracker.</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-6">Zespół</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="border-0 shadow-card">
                    <CardContent className="p-8 text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Michał Baruch</h3>
                      <p className="text-muted-foreground mb-2">Co-Founder</p>
                      <p className="text-sm text-muted-foreground">Product & Vision Hacker</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-card">
                    <CardContent className="p-8 text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Zap className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Andrzej Górecki</h3>
                      <p className="text-muted-foreground mb-2">Co-Founder</p>
                      <p className="text-sm text-muted-foreground">Tech Ninja</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6">Nasza Historia</h2>
                <Card className="border-0 shadow-card">
                  <CardContent className="p-8">
                    <p className="text-muted-foreground mb-4">
                      FOMOjobs powstało w 2024 roku z prostego powodu: sami przeżywaliśmy frustrację związaną z poszukiwaniem pracy.
                      Scrollowanie dziesiątek portali, przegapianie świeżych ofert, aplikowanie na stanowiska, które już nie istnieją.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Postanowiliśmy to zmienić. Zbudowaliśmy platformę, która monitoruje setki źródeł w czasie rzeczywistym,
                      dopasowuje oferty do Twoich umiejętności i wysyła alerty, zanim oferta trafi na główne portale.
                    </p>
                    <p className="text-muted-foreground">
                      Dziś FOMOjobs pomaga tysiącom ludzi znajdować wymarzone prace szybciej niż kiedykolwiek.
                      I dopiero zaczynamy.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </FOMOJobsPageLayout>
    </>
  );
};

export default About;
