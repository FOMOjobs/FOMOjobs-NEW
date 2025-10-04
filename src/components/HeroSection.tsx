import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, MapPin, Camera, Map, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoCarousel } from './hero/PhotoCarousel';
import { MiniMapView } from './hero/MiniMapView';
import { CalendarView } from './hero/CalendarView';

type ViewType = 'photo' | 'map' | 'calendar';

export const HeroSection = () => {
  const [activeView, setActiveView] = useState<ViewType>('photo');
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotation through views
  useEffect(() => {
    if (!autoRotate) return;
    
    const views: ViewType[] = ['photo', 'map', 'calendar'];
    const interval = setInterval(() => {
      setActiveView(current => {
        const currentIndex = views.indexOf(current);
        return views[(currentIndex + 1) % 3];
      });
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [autoRotate]);

  // Stop auto-rotation when user clicks a tab
  const handleTabClick = (view: ViewType) => {
    setAutoRotate(false);
    setActiveView(view);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Krakowskie{' '}
              <span className="inline-block bg-gradient-to-r from-secondary to-secondary-glow bg-clip-text text-transparent">
                Cyfrowe
              </span>{' '}
              Centrum Wolontariatu
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
              Łączymy młodych wolontariuszy z organizacjami w Krakowie. 
              Znajdź swoją pasję i zmień świat razem z nami!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl hover-lift group font-semibold"
              >
                Znajdź wolontariat
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                className="bg-white/15 backdrop-blur-sm border-2 border-white text-white hover:bg-white/25 hover:border-white hover-bounce font-semibold"
              >
                Dodaj organizację
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-8 w-8 text-white animate-pulse" />
                </div>
                <div className="text-2xl font-bold text-white">40+</div>
                <div className="text-white/80">Inicjatyw</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-white animate-float" />
                </div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-white/80">Wolontariuszy</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="h-8 w-8 text-white animate-pulse" />
                </div>
                <div className="text-2xl font-bold text-white">Kraków</div>
                <div className="text-white/80">Cały miasto</div>
              </div>
            </div>
          </div>
          
          {/* Interactive Carousel */}
          <div className="relative animate-slide-in">
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handleTabClick('photo')}
                className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                  activeView === 'photo'
                    ? 'bg-secondary text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Camera className="w-5 h-5" />
                Zdjęcia
              </button>
              <button
                onClick={() => handleTabClick('map')}
                className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                  activeView === 'map'
                    ? 'bg-secondary text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Map className="w-5 h-5" />
                Mapa
              </button>
              <button
                onClick={() => handleTabClick('calendar')}
                className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                  activeView === 'calendar'
                    ? 'bg-secondary text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <CalendarIcon className="w-5 h-5" />
                Kalendarz
              </button>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-glow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {activeView === 'photo' && <PhotoCarousel />}
                  {activeView === 'map' && <MiniMapView />}
                  {activeView === 'calendar' && <CalendarView />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full animate-float blur-sm" />
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-float animation-delay-1000 blur-sm" />
    </section>
  );
};