import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, MapPin } from 'lucide-react';
import happyVolunteers from '@/assets/happy-volunteers.jpg';

export const HeroSection = () => {
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
              <span className="text-gradient bg-white/20 bg-clip-text text-transparent">
                Cyfrowe
              </span>{' '}
              Centrum Wolontariatu
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
              Łączymy młodych wolontariuszy z organizacjami w Krakowie. 
              Znajdź swoją pasję i zmień świat razem z nami!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 hover-lift group">
                Znajdź wolontariat
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/50 text-white hover:bg-white/20 hover:border-white/70 hover-bounce">
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                    <MapPin className="h-8 w-8 text-white pulse-glow" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">Kraków</div>
                <div className="text-white/80">Cały miasto</div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-slide-in">
            <div className="relative rounded-3xl overflow-hidden shadow-glow hover-lift">
              <img 
                src={happyVolunteers} 
                alt="Szczęśliwi wolontariusze w Krakowie pracujący razem na rzecz społeczności"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">Dołącz do nas!</h3>
                <p className="text-white/90">Zmień świat razem z nami</p>
              </div>
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