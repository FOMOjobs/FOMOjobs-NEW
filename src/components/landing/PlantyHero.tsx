import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PlantyHeroProps {
  onNavigate?: (section: string) => void;
}

const PlantyHero = ({ onNavigate }: PlantyHeroProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    onNavigate?.(id);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background - Purple to Yellow */}
      <div
        className="absolute inset-0 animate-slow-slide"
        style={{
          background: 'radial-gradient(circle, hsl(258, 90%, 66%) 0%, hsl(45, 93%, 58%) 40%, hsl(258, 90%, 66%) 81%)',
          backgroundSize: '300% 100%'
        }}
      >
        {/* Subtle overlay for better text readability */}
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Odkryj Swoje{" "}
            <span className="text-secondary drop-shadow-lg">Planty Możliwości</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto drop-shadow-md">
            Znajdź najlepsze możliwości wolontariatu w Krakowie. Rozwijaj swoje umiejętności pomagając innym.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => scrollToSection('wolontariaty')}
            >
              Przeglądaj Oferty
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('about')}
              className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary backdrop-blur-sm px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Dowiedz się Więcej
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Custom animation for gradient */}
      <style>{`
        @keyframes slow-slide {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-slow-slide {
          animation: slow-slide 15s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default PlantyHero;
