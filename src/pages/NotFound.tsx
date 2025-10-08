import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import FOMOJobsFooter from '@/components/landing/FOMOJobsFooter';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Strona nie znaleziona | FOMOjobs</title>
        <meta name="description" content="Nie możemy znaleźć strony, której szukasz" />
      </Helmet>

      <FOMOJobsNavbar />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-16 flex items-center justify-center">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-8">
              <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                404
              </h1>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ups! Strona nie znaleziona
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nie możemy znaleźć strony, której szukasz. Może została przeniesiona lub nigdy nie istniała?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8">
                  <Home className="mr-2 h-5 w-5" />
                  Strona główna
                </Button>
              </Link>

              <Link to="/blog">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Search className="mr-2 h-5 w-5" />
                  Przejdź do bloga
                </Button>
              </Link>
            </div>

            <div className="mt-16">
              <p className="text-muted-foreground mb-4">
                Szukasz ofert pracy? Sprawdź nasze narzędzia:
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/job-tracker" className="text-primary hover:underline">Job Tracker</Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/cv-creator" className="text-primary hover:underline">CV Creator</Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/interview-coach" className="text-primary hover:underline">Interview Coach</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <FOMOJobsFooter />
    </>
  );
};

export default NotFound;
