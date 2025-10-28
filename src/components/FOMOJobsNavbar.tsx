import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BarChart,
  BarChart2,
  Bell,
  BookOpen,
  ChevronDown,
  FileText,
  HelpCircle,
  Home,
  Menu,
  MessageSquare,
  Sparkles,
  User,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const FOMOJobsNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const navigate = useNavigate();

  // Delay closing to allow moving cursor from trigger to menu (Stripe-like)
  const closeToolsTimer = useRef<number | undefined>(undefined);
  const closeAboutTimer = useRef<number | undefined>(undefined);

  const scheduleToolsClose = () => {
    if (closeToolsTimer.current) window.clearTimeout(closeToolsTimer.current);
    closeToolsTimer.current = window.setTimeout(() => {
      setIsToolsOpen(false);
    }, 300);
  };
  const cancelToolsClose = () => {
    if (closeToolsTimer.current) {
      window.clearTimeout(closeToolsTimer.current);
      closeToolsTimer.current = undefined;
    }
  };

  const scheduleAboutClose = () => {
    if (closeAboutTimer.current) window.clearTimeout(closeAboutTimer.current);
    closeAboutTimer.current = window.setTimeout(() => {
      setIsAboutOpen(false);
    }, 300);
  };
  const cancelAboutClose = () => {
    if (closeAboutTimer.current) {
      window.clearTimeout(closeAboutTimer.current);
      closeAboutTimer.current = undefined;
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

  const aboutMenuItems = [
    {
      to: '/#about',
      icon: Sparkles,
      label: 'Poznaj FOMOjobs',
      description: 'Dowiedz się jak działamy i dlaczego jesteśmy inni',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      to: '/blog',
      icon: BookOpen,
      label: 'Blog',
      description: 'Porady, trendy i inspiracje do szukania pracy',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      to: '/faq',
      icon: HelpCircle,
      label: 'FAQ',
      description: 'Odpowiedzi na najczęściej zadawane pytania',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const toolsMenuItems = [
    {
      to: '/cvs',
      icon: FileText,
      label: 'FOMO.cvcreator',
      description: 'Kreator CV z AI',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      to: '/job-tracker',
      icon: BarChart,
      label: 'FOMO.jobstracker',
      description: 'Śledź swoje aplikacje',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      to: '/alerts',
      icon: Bell,
      label: 'FOMO.alerts',
      description: 'Zarządzaj alertami pracy',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      to: '/b2b/analytics',
      icon: BarChart2,
      label: 'FOMO.analytics',
      description: 'Analiza rynku pracy dla HR',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      to: '/recruiter',
      icon: User,
      label: 'FOMO.recruiter',
      description: 'Portal dla rekruterów',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      to: '/interview-coach',
      icon: MessageSquare,
      label: 'FOMO.coach',
      description: 'Trening rozmów kwalifikacyjnych',
      gradient: 'from-green-500 to-green-600'
    },
    {
      to: '/job-prompts',
      icon: BookOpen,
      label: 'FOMO.jobprompts',
      description: 'Prompty AI do poszukiwania pracy',
      gradient: 'from-cyan-500 to-cyan-600'
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
                <img
                  src="/fomo-bell-logo.png"
                  alt="FOMO Jobs"
                  className="w-8 h-8 contrast-more:brightness-0 dark:contrast-more:brightness-100"
                />
                <span className={cn(
                  "ml-2 text-xl font-bold",
                  isScrolled ? "text-foreground contrast-more:text-black dark:contrast-more:text-white" : "text-primary-foreground contrast-more:text-black dark:contrast-more:text-white"
                )}>
                  FOMO<span className={cn(
                    isScrolled ? "text-secondary contrast-more:text-black dark:contrast-more:text-white" : "text-secondary contrast-more:text-black dark:contrast-more:text-white"
                  )}>jobs</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* O Platformie Dropdown - Hover trigger like Narzędzia */}
            <div
              className="relative"
              onMouseEnter={cancelAboutClose}
              onMouseLeave={scheduleAboutClose}
            >
              <button
                className={cn(
                  "flex items-center gap-1 transition-colors font-medium",
                  isAboutOpen && "text-secondary",
                  isScrolled
                    ? "text-foreground hover:text-secondary"
                    : "text-primary-foreground hover:text-secondary"
                )}
                aria-expanded={isAboutOpen}
                onMouseEnter={() => { cancelAboutClose(); setIsAboutOpen(true); }}
                onClick={() => setIsAboutOpen(!isAboutOpen)}
              >
                O platformie
                <ChevronDown className="w-4 h-4" />
              </button>

              {isAboutOpen && (
                <div
                  className="dropdown-smooth absolute top-full left-0 mt-2 w-80 bg-card rounded-lg shadow-glow border border-border py-2 z-50"
                  onMouseEnter={cancelAboutClose}
                  onMouseLeave={scheduleAboutClose}
                >
                  {aboutMenuItems.map((item) => {
                    const isScrollLink = item.to.startsWith('/#');

                    if (isScrollLink) {
                      return (
                        <button
                          key={item.to}
                          onClick={() => {
                            scrollToSection('about');
                            setIsAboutOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary/5 transition-all duration-300 w-full text-left"
                        >
                          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br", item.gradient)}>
                            <item.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{item.label}</div>
                            <div className="text-xs text-muted-foreground leading-snug">{item.description}</div>
                          </div>
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary/5 transition-all duration-300"
                        onClick={() => setIsAboutOpen(false)}
                      >
                        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br", item.gradient)}>
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{item.label}</div>
                          <div className="text-xs text-muted-foreground leading-snug">{item.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              className={cn(
                "hover:text-secondary transition-colors font-medium",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )}
              onClick={() => scrollToSection('oferty-pracy')}
            >
              Oferty Pracy
            </button>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={cancelToolsClose}
              onMouseLeave={scheduleToolsClose}
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
                onMouseEnter={() => { cancelToolsClose(); setIsToolsOpen(true); }}
                onClick={() => setIsToolsOpen(!isToolsOpen)}
              >
                Narzędzia
                <ChevronDown className="w-4 h-4" />
              </button>

              {isToolsOpen && (
                <div
                  className="dropdown-smooth absolute top-full right-0 mt-2 w-80 bg-card rounded-lg shadow-glow border border-border py-2 z-50"
                  onMouseEnter={cancelToolsClose}
                  onMouseLeave={scheduleToolsClose}
                >
                  {toolsMenuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary/5 transition-all duration-300"
                      onClick={() => setIsToolsOpen(false)}
                    >
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br", item.gradient)}>
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-muted-foreground leading-snug">{item.description}</div>
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
              onClick={() => scrollToSection('pricing')}
            >
              Plany
            </button>

            <Link to="/alerts/create">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
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

            {/* Mobile O Platformie Dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full text-foreground hover:text-primary py-2 text-lg font-medium"
                onClick={() => setIsAboutOpen(!isAboutOpen)}
              >
                O platformie
                <ChevronDown className={cn("w-4 h-4 transition-transform", isAboutOpen && "rotate-180")} />
              </button>

              {isAboutOpen && (
                <div className="ml-4 space-y-1 border-l-2 border-secondary pl-4 mt-2">
                  <button
                    className="flex items-center gap-2 text-foreground hover:text-primary py-2 text-base w-full text-left"
                    onClick={() => {
                      scrollToSection('about');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Poznaj FOMOjobs
                  </button>
                  <Link
                    to="/blog"
                    className="flex items-center gap-2 text-foreground hover:text-primary py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    Blog
                  </Link>
                  <Link
                    to="/faq"
                    className="flex items-center gap-2 text-foreground hover:text-primary py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HelpCircle className="w-4 h-4" />
                    FAQ
                  </Link>
                </div>
              )}
            </div>

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
                <div className="ml-4 space-y-2 border-l-2 border-secondary pl-4 mt-2">
                  {toolsMenuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center gap-3 text-foreground hover:text-primary py-2 text-base"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br", item.gradient)}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              className="flex items-center gap-2 text-foreground hover:text-primary py-2 text-lg font-medium w-full text-left"
              onClick={() => {
                scrollToSection('pricing');
                setIsMenuOpen(false);
              }}
            >
              Plany
            </button>

            <Link to="/alerts/create" onClick={() => setIsMenuOpen(false)}>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold mt-4"
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
