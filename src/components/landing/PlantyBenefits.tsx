import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Heart, TrendingUp } from "lucide-react";

const PlantyBenefits = () => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const flippingCards = [
    {
      id: 'skills',
      front: {
        title: "Rozwijaj Umiejętności",
        description: "Zdobądź praktyczne doświadczenie w różnych dziedzinach - od organizacji eventów po pracę z ludźmi.",
        icon: TrendingUp
      },
      back: {
        quote: "Dzięki wolontariatowi nauczyłam się organizować wydarzenia i pracować w zespole. To doświadczenie pomogło mi znaleźć pracę!",
        author: "Anna K., 22 lata"
      }
    },
    {
      id: 'network',
      front: {
        title: "Poznaj Nowych Ludzi",
        description: "Buduj wartościowe relacje z pasjonatami działającymi na rzecz lokalnej społeczności.",
        icon: Heart
      },
      back: {
        quote: "Podczas wolontariatu poznałam wspaniałych ludzi, z którymi do dziś się przyjaźnię. To bezcenne!",
        author: "Michał P., 24 lata"
      }
    },
    {
      id: 'impact',
      front: {
        title: "Twórz Realną Zmianę",
        description: "Każda godzina wolontariatu ma znaczenie. Zobacz bezpośredni wpływ Twojego zaangażowania na społeczność.",
        icon: Sparkles
      },
      back: {
        quote: "Widzieć uśmiech na twarzach dzieci, którym pomagamy - to najlepsza nagroda za wolontariat!",
        author: "Kasia W., 21 lat"
      }
    }
  ];

  const handleCardClick = (cardId: string) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Dlaczego warto?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Wolontariat to nie tylko pomoc innym - to inwestycja w siebie
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {flippingCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="perspective-1000 h-80"
              onClick={() => handleCardClick(card.id)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${
                  flippedCard === card.id ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-glow transition-all duration-300 p-8 flex flex-col justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-primary">
                    <card.front.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                    {card.front.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    {card.front.description}
                  </p>
                  <div className="mt-6 text-center">
                    <span className="text-sm text-primary font-medium">
                      Kliknij, aby zobaczyć opinię 👆
                    </span>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-primary rounded-2xl p-8 flex flex-col justify-center items-center text-primary-foreground rotate-y-180 shadow-glow">
                  <div className="mb-6">
                    <Heart className="w-12 h-12 text-secondary mx-auto" />
                  </div>
                  <p className="text-lg italic mb-6 leading-relaxed text-center">
                    "{card.back.quote}"
                  </p>
                  <p className="font-semibold text-secondary text-lg">
                    {card.back.author}
                  </p>
                  <div className="mt-8 text-center">
                    <span className="text-sm text-primary-foreground/80">
                      Kliknij ponownie, aby wrócić 👆
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom styles for 3D flip */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default PlantyBenefits;
