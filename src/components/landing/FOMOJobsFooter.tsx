import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

const FOMOJobsFooter = () => {
  const [email, setEmail] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Dziękujemy za zapisanie się do newslettera!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground py-16 dark:from-primary/90 dark:via-accent/90 dark:to-primary/90">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-secondary drop-shadow-lg">
                FOMO<span className="text-white">jobs</span>
              </span>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed">
              Portal pracy nowej generacji. Nigdy więcej nie przegap idealnej oferty pracy dzięki codziennym alertom dopasowanym do Twoich preferencji.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10 transition-all"
                asChild
              >
                <a href="https://facebook.com/mlodykrakow" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10 transition-all"
                asChild
              >
                <a href="https://instagram.com/mlodykrakow" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Team */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">Zespół</h3>
            <ul className="space-y-2">
              <li>
                <div className="text-primary-foreground/90 font-medium">Andrzej Górecki</div>
                <div className="text-primary-foreground/70 text-sm">Co-Founder - Tech Ninja</div>
              </li>
              <li className="mt-3">
                <div className="text-primary-foreground/90 font-medium">Michał Baruch</div>
                <div className="text-primary-foreground/70 text-sm">Co-Founder - Product & Vision Hacker</div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">Szybkie linki</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  O Platformie
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('wolontariaty')}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Wolontariaty
                </button>
              </li>
              <li>
                <Link to="/auth" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Zaloguj się
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <Link to="/profile" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Mój Profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">Funkcje</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/job-tracker" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Job Tracker
                </Link>
              </li>
              <li>
                <Link to="/cv-creator" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  CV Creator
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4" id="contact">
            <h3 className="text-lg font-semibold text-secondary">Bądź na bieżąco</h3>
            <p className="text-primary-foreground/90 text-sm">
              Zapisz się do newslettera, aby otrzymywać alerty o najlepszych ofertach pracy.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Twój adres email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60 focus:border-secondary"
                required
              />
              <Button
                type="submit"
                size="sm"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Zapisz się
              </Button>
            </form>
            <div className="space-y-2 text-sm text-primary-foreground/90">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-secondary" />
                <span>kontakt@mlodykrakow.pl</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-secondary" />
                <span>+48 12 123 45 67</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-secondary" />
                <span>Kraków, Polska</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/70 text-sm">
              © 2024 FOMOjobs - Portal pracy nowej generacji. Wszelkie prawa zastrzeżone.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                Polityka Prywatności
              </Link>
              <Link to="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                Regulamin
              </Link>
              <Link to="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                Polityka Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FOMOJobsFooter;
