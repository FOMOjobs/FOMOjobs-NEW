import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      question: "Po co właściwie powstało FOMOjobs?",
      answer: "Żebyś nie musiał(a) scrollować przez cały dzień przez ogłoszenia na stronach karier różnych firm. Serio. Wiemy, że szukanie pracy to często udręka – dlatego FOMOjobs powstało po to, żeby pomagać ludziom #opentowork, oraz tym, którzy mniej aktywnie szukają pracy. Zamiast zostawiać Cię samemu sobie, podsuwamy konkretne oferty, dopasowane do Twojego doświadczenia, sektora. I robimy to po ludzku – bez budzenia alertem o 3 w nocy."
    },
    {
      question: "Co oznacza hasło \"Nie musisz szukać sam\"?",
      answer: "To proste. Ty jesteś w trybie szukania – my jesteśmy w trybie pomocy. Nasze hasło to nie slogan od agencji, tylko obietnica: chcemy Ci realnie pomóc znaleźć lepszą pracę szybciej. Nie tylko dajemy Ci oferty – filtrujemy, analizujemy, dopasowujemy. Ty dostajesz alerty, które mają sens."
    },
    {
      question: "Skąd macie oferty pracy?",
      answer: "Przeszukujemy strony karier za pomocą naszego autorskiego, inteligentnego systemu ekstrakcji danych — nazwiemy go \"smart job discovery\". Działa on tak, jakbyś Ty lub ja samodzielnie odwiedzili kilka wybranych stron i znaleźli interesujące oferty, tylko robimy to znacznie szybciej i sprytniej. Nasz system nie obciąża stron pracodawców, ponieważ działa bardzo dyskretnie i zgodnie z zasadami — to zupełnie naturalne przeglądanie, ale wspierane przez sztuczną inteligencję i nasze doświadczenie techniczne. Dzięki temu możemy filtrować i wybierać tylko te oferty, które naprawdę mają dla Ciebie sens, bez spamu i bez bezmyślnego kopiowania. To nasze unikalne know-how, które sprawia, że FOMOjobs działa skutecznie i z szacunkiem do źródeł."
    },
    {
      question: "Dla kogo jest darmowy plan #opentowork?",
      answer: "Dla Ciebie, jeśli masz status #opentowork na LinkedIn i serio szukasz pracy. Sprawdzimy Twój profil (ręcznie lub automatycznie), i jeśli wszystko się zgadza – masz dostęp do pełnych alertów i ofert bez płacenia przez miesiąc. Wiemy, że to jeden z najbardziej stresujących momentów zawodowych. Dlatego nie dokładamy Ci kosztów – tylko pomagamy."
    },
    {
      question: "Jakie macie plany subskrypcyjne?",
      answer: (
        <div className="space-y-3">
          <p><strong>Freemium (0 PLN):</strong> Dostęp do ofert od 5 pracodawców, 1 alert dziennie przez miesiąc</p>
          <p><strong>Plan 15 PLN:</strong> Dostęp do ofert od 30 pracodawców, do 3 alertów dziennie przez miesiąc</p>
          <p><strong>Plan 29 PLN:</strong> Nielimitowany dostęp do pracodawców, do 6 alertów dziennie przez miesiąc</p>
          <p><strong>Specjalny Plan 0 PLN dla Osób Aktywnie Szukających Pracy (#opentowork):</strong> Dla tych, którzy mają status #opentowork na LinkedIn. Nielimitowany dostęp + do 6 alertów dziennie przez miesiąc. Weryfikacja ręczna lub automatyczna. Możliwość przejścia na Freemium lub plan płatny po utracie statusu.</p>
        </div>
      )
    },
    {
      question: "Czy mogę zrezygnować z subskrypcji kiedy chcę?",
      answer: "Tak. Wystarczy kliknąć \"Anuluj subskrypcję\" w ustawieniach. Nie trzeba dzwonić ani pisać. Do końca miesiąca masz jeszcze dostęp, potem wracasz na Freemium. Zero kombinowania."
    },
    {
      question: "Kiedy dostanę alerty?",
      answer: "Tylko o tej godzinie o której ustawisz alert. I tylko w sensownych godzinach (naprawdę nie wysyłamy nic o 3:00 w nocy). Ilość alertów zależy od planu subskrypcyjnego."
    },
    {
      question: "Czy moje dane są bezpieczne?",
      answer: "Tak. Trzymamy je tylko dla siebie – żeby dopasować oferty i wysyłać alerty. Zero reklam, zero przekazywania \"partnerom\". Pełna ochrona. Szczegóły znajdziesz w Regulaminie (dostępnym na naszej stronie)."
    },
    {
      question: "Czy mogę zmienić plan subskrypcji w trakcie?",
      answer: "Oczywiście. Możesz wskoczyć na wyższy plan od razu, a jeśli chcesz zejść na niższy – zmiana nastąpi z końcem miesiąca. Elastycznie, bez kar i umów na ileś tam stron."
    },
    {
      question: "Czym różni się FOMOjobs od innych stron gdzie są ogłoszenia o pracę?",
      answer: "Nie jesteśmy tablicą ogłoszeń. U nas nie szukasz ręcznie – to my szukamy za Ciebie. Nasz system czyta strony, analizuje oferty i wybiera tylko te, które mogą mieć sens. Ty dostajesz gotowe alerty – nie listę z 200 zakładkami do przeklikania."
    },
    {
      question: "Czy muszę mieć konto, żeby korzystać z FOMOjobs?",
      answer: "Tak. Konto to podstawa – bez niego nie możemy dopasować ofert i wysyłać alertów. Ale spokojnie, rejestracja to minuta i nie wymagamy CV w PDF na start."
    },
    {
      question: "Jak wygląda weryfikacja #opentowork?",
      answer: "Automatycznie lub ręcznie. Możemy poprosić o screen z profilu LinkedIn, jeśli system nie rozpozna statusu. Chodzi nam o uczciwość – plan #opentowork jest dla tych, którzy serio szukają teraz pracy."
    },
    {
      question: "Co się stanie, jak minie miesiąc darmowego #opentowork?",
      answer: "Możesz przejść na plan Freemium (0 PLN) albo wybrać jeden z planów płatnych. Twoje konto nie zniknie, ale alerty będą wyłączone i musisz je ponownie ustawić na podstawie Twoich preferencji."
    },
    {
      question: "Dlaczego oferta, którą chciałem zobaczyć z alertu, jest niedostępna lub pokazuje błąd 404?",
      answer: "To nie błąd, tylko polityka wewnętrzna firmy. Często firma już ma kandydata – awans wewnętrzny (tzw. Internal). Publikacja powyższej oferty jest wymagana przez proces, gdzie kandydaci zewnętrzni są z góry skazani na odrzucenie nawet jeżeli zaaplikowaliby 5 minut po publikacji oferty. Brzmi trochę surowo? Może, ale nie martw się – to nie Twoja wina. Po prostu sprawdź kolejne oferty! Jeśli natomiast pojawia się komunikat o przerwie technicznej (np. \"Workday maintenance\"), to oznacza, że firma aktualizuje swoje systemy — często dzieje się to w weekendy. W takich momentach dostęp do ofert może być tymczasowo ograniczony. Najlepiej po prostu spróbować ponownie za jakiś czas."
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQ – Najczęściej zadawane pytania | FOMOjobs</title>
        <meta 
          name="description" 
          content="Znajdź odpowiedzi na wszystkie pytania dotyczące FOMOjobs - planów subskrypcyjnych, alertów, bezpieczeństwa danych i statusu #opentowork."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Wróć do strony głównej
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <HelpCircle className="w-12 h-12 text-primary" />
                <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                  FAQ
                </h1>
              </div>
              <p className="text-muted-foreground text-xl">
                Pytania, które pewnie chcesz zadać
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-5xl mx-auto"
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
                        <span className="w-10 h-10 bg-gradient-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 shadow-primary">
                          {index + 1}
                        </span>
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pl-14 text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default FAQ;