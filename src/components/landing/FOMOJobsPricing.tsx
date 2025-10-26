import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Sparkles, Bell, Crown, Heart, Building2 } from "lucide-react";

const FOMOJobsPricing = () => {
  // Główne plany - 3 obok siebie
  const mainPlans = [
    {
      name: "Start",
      price: "0 PLN",
      period: "na zawsze",
      description: "Podstawowy dostęp do narzędzi kariery",
      icon: Sparkles,
      features: [
        "Alerty do 5 pracodawców",
      ],
      cta: "Rozpocznij za darmo",
      highlight: false
    },
    {
      name: "Alerts",
      price: "15 PLN",
      period: "miesięcznie",
      description: "Alerty o nowych ofertach pracy",
      icon: Bell,
      features: [
        "Alerty do wszystkich pracodawców",
        "Dostęp do narzędzia FOMO.alert",
        "Zaawansowane filtry alertów",
      ],
      cta: "Wybierz plan",
      highlight: false
    },
    {
      name: "Pro",
      price: "29 PLN",
      period: "miesięcznie",
      description: "Kompletny pakiet dla szukających pracy",
      icon: Crown,
      features: [
        "Wszystko z planu Alerts",
        "Priorytetowe powiadomienia",
        "Unlimited CV exports",
        "AI-powered CV improvements",
        "Dostęp do wszystkich FOMO narzędzi dla szukających pracy",
      ],
      cta: "Wybierz Pro",
      highlight: true
    }
  ];

  // Specjalne plany - 2 większe na dole
  const specialPlans = [
    {
      name: "Open (#opentowork)",
      price: "0 PLN",
      period: "na zawsze",
      description: "Pełny dostęp dla osób szukających pracy",
      icon: Heart,
      badge: "Program społeczny",
      badgeColor: "bg-green-500",
      cardColor: "border-green-500 bg-green-50 dark:bg-green-950/20",
      features: [
        "Wszystkie funkcje z planu Pro",
        "Dla osób z #opentowork na LinkedIn",
        "Wymagana weryfikacja statusu",
        "Po znalezieniu pracy - przejście na plan Start"
      ],
      cta: "Aplikuj o darmowy dostęp",
      ctaVariant: "default" as const
    },
    {
      name: "Insights",
      price: "249 PLN",
      period: "miesięcznie",
      description: "Dla pracodawców i agencji rekrutacyjnych",
      icon: Building2,
      badge: "Dla firm",
      badgeColor: "bg-purple-500",
      cardColor: "border-purple-500 bg-purple-50 dark:bg-purple-950/20",
      features: [
        "Dostęp do analityki rynku pracy",
        "Monitoring konkurencji",
      ],
      cta: "Skontaktuj się",
      ctaVariant: "default" as const
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground contrast-more:text-black dark:contrast-more:text-white mb-4">
            Plany subskrypcyjne FOMOjobs (2025)
          </h2>
          <p className="text-lg text-muted-foreground contrast-more:text-black dark:contrast-more:text-white max-w-2xl mx-auto">
            Wybierz plan dopasowany do Twoich potrzeb
          </p>
        </motion.div>

        {/* GŁÓWNE PLANY - 3 obok siebie */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8"
        >
          {mainPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.highlight ? 'border-primary shadow-xl scale-105 ring-2 ring-primary' : ''
                }`}
              >
                {plan.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    <Star className="inline w-3 h-3 mr-1" />
                    Najpopularniejszy
                  </Badge>
                )}

                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-6 w-6 text-primary contrast-more:text-black dark:contrast-more:text-white" />
                    <CardTitle className="text-xl contrast-more:text-black dark:contrast-more:text-white">
                      {plan.name}
                    </CardTitle>
                  </div>

                  <div className="space-y-1">
                    <div className="text-4xl font-bold text-primary contrast-more:text-black dark:contrast-more:text-white">
                      {plan.price}
                    </div>
                    <div className="text-sm text-muted-foreground contrast-more:text-gray-700 dark:contrast-more:text-gray-300">
                      {plan.period}
                    </div>
                  </div>

                  <CardDescription className="text-sm contrast-more:text-gray-700 dark:contrast-more:text-gray-300 mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3 min-h-[180px]">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 contrast-more:text-black dark:contrast-more:text-white mt-0.5 flex-shrink-0" />
                        <span className="contrast-more:text-black dark:contrast-more:text-white">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.highlight ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* SPECJALNE PLANY - 2 większe obok siebie na dole */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12"
        >
          {specialPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative ${plan.cardColor} border-2`}
              >
                <Badge className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.badgeColor} text-white`}>
                  {plan.badge}
                </Badge>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${plan.badgeColor} bg-opacity-20`}>
                      <Icon className="h-7 w-7 contrast-more:text-black dark:contrast-more:text-white" />
                    </div>
                    <CardTitle className="text-2xl contrast-more:text-black dark:contrast-more:text-white">
                      {plan.name}
                    </CardTitle>
                  </div>

                  <div className="space-y-1">
                    <div className="text-5xl font-bold contrast-more:text-black dark:contrast-more:text-white">
                      {plan.price}
                    </div>
                    <div className="text-base text-muted-foreground contrast-more:text-gray-700 dark:contrast-more:text-gray-300">
                      {plan.period}
                    </div>
                  </div>

                  <CardDescription className="text-base mt-2 contrast-more:text-gray-700 dark:contrast-more:text-gray-300">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400 contrast-more:text-black dark:contrast-more:text-white mt-0.5 flex-shrink-0" />
                        <span className="contrast-more:text-black dark:contrast-more:text-white">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.ctaVariant}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground contrast-more:text-black dark:contrast-more:text-white">
            Wszystkie plany można anulować w dowolnym momencie. Brak ukrytych opłat.
          </p>
          <p className="text-sm text-muted-foreground contrast-more:text-black dark:contrast-more:text-white mt-2">
            <span className="font-semibold">#opentowork:</span> Wymagana weryfikacja statusu poprzez LinkedIn. Po znalezieniu pracy automatyczne przejście na plan Start.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FOMOJobsPricing;
