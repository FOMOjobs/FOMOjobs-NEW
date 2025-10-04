import { useState } from 'react';
import { UserCheck, Search, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FlashcardsSection = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const steps = [
    {
      number: 1,
      icon: UserCheck,
      title: "Zarejestruj się",
      subtitle: "Stwórz darmowe konto w 2 minuty",
      details: [
        { emoji: "📝", text: "Wypełnij prosty formularz" },
        { emoji: "✉️", text: "Potwierdź email" },
        { emoji: "🎉", text: "Gotowe - możesz zacząć!" }
      ],
      color: "hsl(var(--primary))"
    },
    {
      number: 2,
      icon: Search,
      iconSecondary: MapPin,
      title: "Znajdź wolontariat",
      subtitle: "Przeglądaj oferty na mapie lub liście",
      details: [
        { emoji: "🗺️", text: "Użyj mapy lub wyszukiwarki" },
        { emoji: "🎯", text: "Filtruj po kategorii i lokalizacji" },
        { emoji: "📅", text: "Sprawdź kalendarz wydarzeń" }
      ],
      color: "hsl(var(--secondary))"
    },
    {
      number: 3,
      icon: Sparkles,
      title: "Aplikuj i działaj!",
      subtitle: "Jedno kliknięcie i jesteś wolontariuszem",
      details: [
        { emoji: "👆", text: "Kliknij 'Aplikuj teraz'" },
        { emoji: "💬", text: "Czatuj z organizacją" },
        { emoji: "🎖️", text: "Zbieraj odznaki i zaświadczenia" }
      ],
      color: "hsl(142, 47%, 54%)"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3 text-foreground">
            Jak to działa?
          </h2>
          <p className="text-lg text-muted-foreground">
            Zacznij pomagać w trzech prostych krokach
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative h-80 cursor-pointer perspective-1000"
              onMouseEnter={() => setFlippedCard(index)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                  flippedCard === index ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT SIDE */}
                <div className="absolute inset-0 backface-hidden bg-card rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center border-2 border-border">
                  {/* Number Badge */}
                  <div
                    className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <step.icon
                      className="w-12 h-12"
                      style={{ color: step.color }}
                      strokeWidth={2}
                    />
                    {step.iconSecondary && (
                      <step.iconSecondary
                        className="w-6 h-6 absolute -bottom-1 -right-1"
                        style={{ color: step.color }}
                        strokeWidth={2}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <h3 className="text-2xl font-bold mb-3 text-foreground text-center">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {step.subtitle}
                  </p>

                  {/* Hover hint */}
                  <p className="absolute bottom-6 text-sm text-muted-foreground">
                    Najedź aby zobaczyć więcej
                  </p>
                </div>

                {/* BACK SIDE */}
                <div
                  className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl shadow-xl p-8 flex flex-col justify-center text-white"
                  style={{ backgroundColor: step.color }}
                >
                  <h4 className="text-xl font-bold mb-6 text-center">
                    {step.title}
                  </h4>
                  <ul className="space-y-4">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">
                          {detail.emoji}
                        </span>
                        <span className="text-lg">
                          {detail.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/auth"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            Zacznij już teraz! 🚀
          </Link>
        </div>
      </div>
    </section>
  );
};
