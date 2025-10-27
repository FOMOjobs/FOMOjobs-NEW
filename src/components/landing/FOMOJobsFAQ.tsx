import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FOMOJobsFAQ = () => {
  const faqItems = [
    {
      category: "O platformie",
      question: "Po co powstało FOMOjobs?",
      answer: "Żebyś nie musiał(a) scrollować przez cały dzień przez ogłoszenia na stronach karier różnych firm. Pomagamy ludziom #opentowork i tym, którzy mniej aktywnie szukają pracy – podsuwamy konkretne oferty, dopasowane do doświadczenia i sektora."
    },
    {
      category: "O platformie",
      question: "Skąd macie oferty pracy?",
      answer: "Przeszukujemy strony karier za pomocą autorskiego systemu ekstrakcji danych. Filtrujemy i wybieramy tylko te oferty, które naprawdę mają sens – bez spamu i bez bezmyślnego kopiowania."
    },
    {
      category: "Plany i subskrypcje",
      question: "Jakie macie plany?",
      answer: "Freemium (0 PLN), Plan 15 PLN, Plan 29 PLN oraz specjalny plan dla osób z statusem #opentowork na LinkedIn. Szczegóły znajdziesz na dedykowanej stronie FAQ."
    },
    {
      category: "Plany i subskrypcje",
      question: "Czy mogę zrezygnować z subskrypcji?",
      answer: "Tak. Wystarczy kliknąć \"Anuluj subskrypcję\" w ustawieniach. Do końca miesiąca masz jeszcze dostęp, potem wracasz na Freemium. Zero kombinowania."
    },
    {
      category: "Alerty i powiadomienia",
      question: "Kiedy dostanę alerty?",
      answer: "Tylko o godzinie, którą ustawisz – i tylko w sensownych godzinach (naprawdę nie wysyłamy nic o 3:00 w nocy). Ilość alertów zależy od planu."
    },
    {
      category: "Bezpieczeństwo",
      question: "Czy moje dane są bezpieczne?",
      answer: "Tak. Trzymamy je tylko dla siebie – żeby dopasować oferty i wysyłać alerty. Zero reklam, zero przekazywania \"partnerom\". Pełna ochrona."
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
            Najważniejsze informacje o FOMOjobs
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
                    <span className="flex-1">{item.question}</span>
                    {item.category === "O platformie" && index === 0 && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full ml-2">
                        {item.category}
                      </span>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pl-12">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/faq">
              <Button size="lg" className="gap-2 shadow-primary hover:shadow-glow">
                Zobacz wszystkie pytania i odpowiedzi
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FOMOJobsFAQ;
