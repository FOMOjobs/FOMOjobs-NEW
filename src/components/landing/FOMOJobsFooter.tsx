import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import { toast } from 'sonner'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// Komponent Help Center Dialog
const HelpCenterDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-primary-foreground/80 hover:text-secondary transition-colors">
          Centrum Pomocy
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>❓ Centrum Pomocy FOMOjobs</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* FAQ Sections */}
          <div>
            <h3 className="font-semibold mb-3">Najczęściej zadawane pytania</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Jak działa FOMO.alerts?</AccordionTrigger>
                <AccordionContent>
                  FOMO.alerts automatycznie monitoruje strony karier firm i wysyła Ci powiadomienia
                  o nowych ofertach dopasowanych do Twoich preferencji.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Ile kosztuje subskrypcja?</AccordionTrigger>
                <AccordionContent>
                  Mamy plany od 0 PLN (Start), przez 15 PLN (Alerts), 29 PLN (Pro),
                  do 249 PLN (Insights dla firm). Plan Open dla #opentowork jest darmowy.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Jak aplikować o plan Open (#opentowork)?</AccordionTrigger>
                <AccordionContent>
                  Kliknij "Aplikuj o darmowy dostęp", wypełnij formularz i dołącz link do
                  swojego profilu LinkedIn z #opentowork. Weryfikacja zajmuje do 24h.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Czy mogę anulować subskrypcję?</AccordionTrigger>
                <AccordionContent>
                  Tak! Możesz anulować w dowolnym momencie bez dodatkowych opłat.
                  Dostęp pozostanie aktywny do końca opłaconego okresu.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground contrast-more:text-black dark:contrast-more:text-white">
              Nie znalazłeś odpowiedzi? <strong>Zgłoś problem</strong> lub napisz na:{' '}
              <a href="mailto:pomoc@fomojobs.com" className="text-primary underline">
                pomoc@fomojobs.com
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Komponent Report Problem Dialog
const ReportProblemDialog = () => {
  const [formData, setFormData] = useState({
    type: '',
    email: '',
    subject: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Połącz z backend API do wysyłania zgłoszeń
    console.log('Zgłoszenie:', formData);

    toast.success('Zgłoszenie wysłane!', {
      description: 'Odpowiemy w ciągu 24-48 godzin.'
    });

    // Reset form
    setFormData({ type: '', email: '', subject: '', description: '' });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-primary-foreground/80 hover:text-secondary transition-colors">
          Zgłoś problem
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>🐛 Zgłoś problem lub wyślij feedback</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type">Typ zgłoszenia</Label>
            <Select
              value={formData.type}
              onValueChange={(v) => setFormData({ ...formData, type: v })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Wybierz typ..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">🐛 Błąd techniczny</SelectItem>
                <SelectItem value="feature">💡 Propozycja funkcji</SelectItem>
                <SelectItem value="feedback">💬 Feedback / Opinia</SelectItem>
                <SelectItem value="account">👤 Problem z kontem</SelectItem>
                <SelectItem value="payment">💳 Problem z płatnością</SelectItem>
                <SelectItem value="other">❓ Inne</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="email">Twój email</Label>
            <Input
              id="email"
              type="email"
              placeholder="twoj@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="subject">Temat</Label>
            <Input
              id="subject"
              placeholder="Krótki opis problemu..."
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Opis szczegółowy</Label>
            <Textarea
              id="description"
              placeholder="Opisz problem lub swoją propozycję..."
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground mt-1 contrast-more:text-black dark:contrast-more:text-white">
              Im więcej szczegółów, tym szybciej pomożemy!
            </p>
          </div>

          <Button type="submit" className="w-full">
            Wyślij zgłoszenie
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

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
            <p className="text-primary-foreground/90 leading-relaxed contrast-more:text-black dark:contrast-more:text-white">
              Nigdy więcej nie przegap idealnej oferty pracy dzięki codziennym alertom dopasowanym do Twoich preferencji.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10 transition-all contrast-more:text-black dark:contrast-more:text-white"
                asChild
              >
                <a href="https://linkedin.com/company/fomojobs" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10 transition-all contrast-more:text-black dark:contrast-more:text-white"
                asChild
              >
                <a href="https://youtube.com/@fomojobs" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
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

          {/* Quick Links + Pomoc */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">Pomoc</h3>
            <ul className="space-y-2">
              <li>
                <HelpCenterDialog />
              </li>
              <li>
                <ReportProblemDialog />
              </li>
              <li>
                <Link to="/auth" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Zaloguj się
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Plany
                </button>
              </li>
              <li>
                <Link to="/profile" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Mój Profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">Narzędzia</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cvs" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  FOMO.cvcreator
                </Link>
              </li>
              <li>
                <Link to="/job-tracker" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  FOMO.jobstracker
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  FOMO.alerts
                </Link>
              </li>
              <li>
                <Link to="/b2b/analytics" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  FOMO.analytics
                </Link>
              </li>
              <li>
                <Link to="/recruiter" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  FOMO.recruiter
                </Link>
              </li>
              <li>
                <Link to="/interview-coach" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  FOMO.coach
                </Link>
              </li>
              <li>
                <Link to="/job-prompts" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  FOMO.jobprompts
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4" id="contact">
            <h3 className="text-lg font-semibold text-secondary">Bądź na bieżąco</h3>
            <p className="text-primary-foreground/90 text-sm">
              Zapisz się do newslettera
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Twój adres email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-white focus:border-secondary"
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
                <span>kontakt@fomojobs.pl</span>
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
              © 2025 FOMOjobs - Portal pracy nowej generacji. Wszelkie prawa zastrzeżone.
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
