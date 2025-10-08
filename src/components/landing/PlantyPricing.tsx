import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star, Crown } from "lucide-react";

const PlantyPricing = () => {
  const plans = [
    {
      name: "Freemium",
      price: "0",
      currency: "PLN",
      period: "na zawsze",
      description: "Podstawowy dostęp do monitorowania ofert pracy",
      features: [
        "Podstawowe alerty",
        "Ograniczone filtry",
        "Dostęp do FOMO.cvcreator"
      ],
      cta: "Wybierz plan",
      popular: false,
      gradient: "from-gray-50 to-gray-100"
    },
    {
      name: "Standard",
      price: "29",
      currency: "PLN",
      period: "miesięcznie",
      description: "Więcej możliwości dla aktywnie poszukujących",
      features: [
        "Dostęp do wszystkich alertów",
        "Zaawansowane filtry i powiadomienia",
        "Support email"
      ],
      cta: "Wybierz plan",
      popular: true,
      gradient: "from-primary to-primary/80"
    },
    {
      name: "Pro",
      price: "49",
      currency: "PLN",
      period: "miesięcznie",
      description: "Pełny dostęp dla profesjonalistów",
      features: [
        "Dostęp do wszystkich Narzędzi do Sukcesu",
        "Priorytetowe alerty i powiadomienia",
        "Support telefoniczny i priorytetowy"
      ],
      cta: "Wybierz plan",
      popular: false,
      gradient: "from-secondary to-secondary/80"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Wybierz plan idealny dla Ciebie
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dopasuj plan do swoich potrzeb i osiągnij sukces
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-2 md:px-0"
        >
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`pricing-card relative bg-card rounded-2xl shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden min-h-[500px] flex flex-col border-0 ${
                plan.popular ? 'ring-2 ring-primary md:scale-105' :
                plan.name === 'Pro' ? 'ring-2 ring-secondary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-center py-2 text-sm font-semibold">
                  <Star className="inline w-4 h-4 mr-1" />
                  Najpopularniejszy
                </div>
              )}

              <div className={`p-6 md:p-8 ${plan.popular ? 'pt-12 md:pt-16' : ''} flex-1 flex flex-col`}>
                {/* Plan name and icon */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </h3>
                  {plan.name === 'Pro' && <Crown className="w-6 h-6 text-secondary" />}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-primary">
                      {plan.price}
                    </span>
                    <span className="text-xl text-muted-foreground ml-2">
                      {plan.currency} {plan.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button
                    className={`w-full text-base md:text-lg py-4 md:py-6 font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl'
                        : plan.name === 'Pro'
                        ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl'
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Special #opentowork plan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-8 border-4 border-green-500 relative overflow-hidden shadow-card">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">
                  #opentowork
                </h3>
                <p className="text-xl mb-6 text-foreground">
                  Jesteś bez pracy i masz #opentowork na LinkedIn? Otrzymaj pełny dostęp za darmo!
                </p>
                <p className="text-muted-foreground mb-8">
                  * Wymagana weryfikacja statusu. Po znalezieniu pracy przejście na plan Freemium lub płatny.
                </p>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4"
                >
                  Aplikuj o darmowy dostęp
                </Button>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="w-64 h-64 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <span className="text-6xl font-bold text-green-600 dark:text-green-400">#</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlantyPricing;
