import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, User, Calendar, Award, MessageSquare, Briefcase, Home, FileText, BarChart, BookOpen, BarChart2, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FOMOJobsNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const navigate = useNavigate();

  // Delay closing to allow moving cursor from trigger to menu (Stripe-like)
  const closeTimer = useRef<number | undefined>(undefined);
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setIsToolsOpen(false);
    }, 300);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = undefined;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Navigate to home first if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const toolsMenuItems = [
    {
      to: '/cv-creator',
      icon: FileText,
      label: 'FOMO.cvcreator',
      description: 'Kreator CV z AI'
    },
    {
      to: '/job-tracker',
      icon: BarChart,
      label: 'FOMO.jobstracker',
      description: 'Śledź swoje aplikacje'
    },
    {
      to: '/alerts',
      icon: Bell,
      label: 'FOMO.alerts',
      description: 'Zarządzaj alertami pracy'
    },
    {
      to: '/b2b/analytics',
      icon: BarChart2,
      label: 'FOMO.analytics',
      description: 'Analiza rynku pracy dla HR'
    },
    {
      to: '/recruiter',
      icon: User,
      label: 'FOMO.recruiter',
      description: 'Portal dla rekruterów'
    },
    {
      to: '/interview-coach',
      icon: MessageSquare,
      label: 'FOMO.coach',
      description: 'Trening rozmów kwalifikacyjnych'
    },
    {
      to: '/job-prompts',
      icon: BookOpen,
      label: 'FOMO.jobprompts',
      description: 'Prompty AI do poszukiwania pracy'
    }
  ];

  return (
    <motion.nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-gradient-to-r from-primary via-accent to-primary/90 backdrop-blur-sm"
      )}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center">
                <img src="/fomo-bell-logo.png" alt="FOMO Jobs" className="w-8 h-8" />
                <span className={cn(
                  "ml-2 text-xl font-bold",
                  isScrolled ? "text-foreground" : "text-primary-foreground"
                )}>
                  FOMO<span className="text-secondary">jobs</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              className={cn(
                "hover:text-secondary transition-colors font-medium",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )}
              onClick={() => scrollToSection('about')}
            >
              O Platformie
            </button>

            <button
              className={cn(
                "hover:text-secondary transition-colors font-medium",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )}
              onClick={() => scrollToSection('oferty-pracy')}
            >
              Oferty Pracy
            </button>

            <Link
              to="/alert-wizard"
              className={cn(
                "hover:text-secondary transition-colors font-medium",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              Ustaw alert
            </Link>

            <Link
              to="/profile"
              className={cn(
                "hover:text-secondary transition-colors font-medium",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              Mój profil
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <button
                className={cn(
                  "flex items-center gap-1 transition-colors font-medium",
                  isToolsOpen && "text-secondary",
                  isScrolled
                    ? "text-foreground hover:text-secondary"
                    : "text-primary-foreground hover:text-secondary"
                )}
                aria-expanded={isToolsOpen}
                onMouseEnter={() => { cancelClose(); setIsToolsOpen(true); }}
                onClick={() => setIsToolsOpen(!isToolsOpen)}
              >
                Narzędzia
                <ChevronDown className="w-4 h-4" />
              </button>

              {isToolsOpen && (
                <div
                  className="dropdown-smooth absolute top-full right-0 mt-2 w-64 bg-card rounded-lg shadow-glow border border-border py-2 z-50"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  {toolsMenuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center gap-3 px-4 py-3 text-foreground border-l-4 border-transparent hover:border-secondary hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary/5 transition-all duration-300"
                      onClick={() => setIsToolsOpen(false)}
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              className={cn(
                "hover:text-secondary transition-colors font-medium",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )}
              onClick={() => scrollToSection('faq')}
            >
              FAQ
            </button>

            <Link to="/alerts/create">
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "font-semibold shadow-md hover:shadow-lg transition-all border-2",
                  isScrolled
                    ? "border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    : "border-white text-white hover:bg-white/10"
                )}
              >
                <Bell className="w-4 h-4 mr-2" />
                Ustaw alert
              </Button>
            </Link>

            <Link to="/auth">
              <Button
                size="sm"
                className={cn(
                  "font-semibold shadow-md hover:shadow-lg transition-all",
                  isScrolled
                    ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                )}
              >
                Zaloguj się
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "p-2",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={cn(
          "md:hidden absolute top-full left-0 w-full bg-card border-t-2 border-primary shadow-xl transition-all duration-300 max-h-[70vh] overflow-y-auto",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}>
          <div className="px-4 py-4 space-y-2 border-l-4 border-secondary bg-gradient-to-r from-card to-muted/30">
            <Link
              to="/"
              className="flex items-center gap-2 text-foreground hover:text-primary py-2 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              Strona Główna
            </Link>

            <button
              className="flex items-center gap-2 text-foreground hover:text-primary py-2 text-lg font-medium w-full text-left"
              onClick={() => {
                scrollToSection('about');
                setIsMenuOpen(false);
              }}
            >
              O Platformie
            </button>

            <button
              className="flex items-center gap-2 text-foreground hover:text-primary py-2 text-lg font-medium w-full text-left"
              onClick={() => {
                scrollToSection('oferty-pracy');
                setIsMenuOpen(false);
              }}
            >
              Oferty Pracy
            </button>

            {/* Mobile Tools */}
            <div>
              <button
                className="flex items-center justify-between w-full text-foreground hover:text-primary py-2 text-lg font-medium"
                onClick={() => setIsToolsOpen(!isToolsOpen)}
              >
                Narzędzia
                <ChevronDown className={cn("w-4 h-4 transition-transform", isToolsOpen && "rotate-180")} />
              </button>

              {isToolsOpen && (
                <div className="ml-4 space-y-1 border-l-2 border-secondary pl-4 mt-2">
                  {toolsMenuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center gap-2 text-foreground hover:text-primary py-2 text-base"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              className="flex items-center gap-2 text-foreground hover:text-primary py-2 text-lg font-medium w-full text-left"
              onClick={() => {
                scrollToSection('faq');
                setIsMenuOpen(false);
              }}
            >
              FAQ
            </button>

            <Link to="/alerts/create" onClick={() => setIsMenuOpen(false)}>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 mt-4 font-semibold"
              >
                <Bell className="w-4 h-4 mr-2" />
                Ustaw alert
              </Button>
            </Link>

            <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
              <Button
                size="sm"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground mt-2 font-semibold"
              >
                Zaloguj się
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dropdown animation styles */}
      <style>{`
        .dropdown-smooth {
          animation: dropdownFadeIn 0.2s ease-out;
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default FOMOJobsNavbar;
