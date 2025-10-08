import { motion } from "framer-motion";
import { Search, Heart, Calendar, Award, Clock, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const FOMOJobsFeatures = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const timelineSteps = [
    {
      number: "01",
      title: "Przeglądaj Oferty",
      description: "Znajdź wolontariaty dopasowane do Twoich zainteresowań - ekologia, edukacja, sport, kultura i więcej.",
      icon: Search,
      duration: 1
    },
    {
      number: "02",
      title: "Wybierz i Aplikuj",
      description: "Aplikuj jednym kliknięciem. Śledź swoje aplikacje w przejrzystym panelu.",
      icon: Heart,
      duration: 1
    },
    {
      number: "03",
      title: "Zaplanuj Udział",
      description: "Dodaj wybrane wolontariaty do kalendarza i otrzymuj przypomnienia.",
      icon: Calendar,
      duration: 1.5
    },
    {
      number: "04",
      title: "Zdobywaj Osiągnięcia",
      description: "Zbieraj punkty, odznaki i certyfikaty potwierdzające Twoje zaangażowanie.",
      icon: Award,
      duration: 1.5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 0.5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalDuration = timelineSteps.reduce((acc, step) => acc + step.duration, 0);
    const currentProgress = (progress / 100) * totalDuration;
    let accumulated = 0;

    for (let i = 0; i < timelineSteps.length; i++) {
      accumulated += timelineSteps[i].duration;
      if (currentProgress <= accumulated) {
        setCurrentStep(i);
        break;
      }
    }
  }, [progress]);

  return (
    <section className="py-16 bg-gradient-card dark:bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-secondary" />
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">
              Jak to działa?
            </h2>
            <Sparkles className="w-8 h-8 text-secondary" />
          </div>
          <p className="text-xl md:text-2xl text-foreground font-semibold mb-4 flex items-center justify-center gap-3">
            <Clock size={28} className="text-primary" />
            Tylko 4 kroki dzielą Cię od wolontariatu!
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="relative mb-12">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-muted rounded-full transform -translate-y-1/2"></div>
            <div
              className="absolute top-1/2 left-0 h-1 bg-gradient-primary rounded-full transform -translate-y-1/2 transition-all duration-300 ease-linear shadow-primary"
              style={{ width: `${progress}%` }}
            ></div>

            {/* Step indicators */}
            <div className="relative flex justify-between">
              {timelineSteps.map((step, index) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      index <= currentStep
                        ? 'bg-secondary border-secondary text-secondary-foreground shadow-secondary'
                        : 'bg-card border-border text-muted-foreground'
                    }`}
                  >
                    {step.number}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Steps Details */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: index <= currentStep ? 1 : 0.5,
                  y: 0,
                  scale: index === currentStep ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
                className={`bg-card rounded-xl p-4 lg:p-6 shadow-card hover:shadow-glow transition-all duration-300 border border-border ${
                  index === currentStep ? 'ring-2 ring-secondary shadow-secondary' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-br flex items-center justify-center mb-3 lg:mb-4 ${
                    index <= currentStep
                      ? 'from-primary to-accent text-primary-foreground'
                      : 'from-muted to-muted text-muted-foreground'
                  }`}
                >
                  <step.icon size={20} className="lg:w-6 lg:h-6" />
                </div>

                <h3 className="text-base lg:text-lg font-bold text-foreground mb-2 lg:mb-3">
                  {step.title}
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FOMOJobsFeatures;
