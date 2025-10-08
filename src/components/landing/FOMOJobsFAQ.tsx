import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FOMOJobsFAQ = () => {
  const faqItems = [
    {
      question: "Jak mogę zacząć wolontariat?",
      answer: "Wystarczy zarejestrować się na platformie, przeglądnąć dostępne oferty i aplikować jednym kliknięciem. Po zaakceptowaniu aplikacji otrzymasz wszystkie szczegóły dotyczące wolontariatu."
    },
    {
      question: "Czy muszę mieć doświadczenie?",
      answer: "Nie! Wiele projektów jest skierowanych do osób bez doświadczenia. Każda oferta zawiera informację o poziomie trudności i wymaganiach, dzięki czemu łatwo znajdziesz coś dla siebie."
    },
    {
      question: "Czy otrzymam certyfikat?",
      answer: "Tak! Po ukończeniu wolontariatu otrzymasz oficjalny certyfikat potwierdzający Twoje zaangażowanie. Certyfikat możesz dodać do swojego CV i profilu na LinkedIn."
    },
    {
      question: "Ile czasu muszę poświęcić?",
      answer: "To zależy od projektu! Mamy zarówno jednorazowe akcje (np. 2-3 godziny), jak i długoterminowe projekty. Każda oferta zawiera informację o wymaganym czasie zaangażowania."
    },
    {
      question: "Czy mogę wolontariować z przyjaciółmi?",
      answer: "Oczywiście! Wiele projektów jest idealnych do wykonania w grupie. Możesz aplikować razem z przyjaciółmi lub poznać nowych ludzi podczas wolontariatu."
    },
    {
      question: "Jak działa system osiągnięć?",
      answer: "Za każdą ukończoną aktywność zdobywasz punkty i odznaki. System motywuje do regularnego uczestnictwa i pozwala śledzić swój rozwój oraz porównywać osiągnięcia z innymi wolontariuszami."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-card dark:bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-10 h-10 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Często zadawane pytania
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Znajdź odpowiedzi na najczęstsze pytania o wolontariat
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border-2 border-border rounded-xl px-6 shadow-sm hover:shadow-glow hover:border-primary/30 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary py-6 hover:no-underline">
                  <span className="flex items-center w-full">
                    <span className="w-8 h-8 bg-gradient-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 shadow-primary">
                      {index + 1}
                    </span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pl-12">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FOMOJobsFAQ;
