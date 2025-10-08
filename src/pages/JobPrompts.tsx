import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, CheckCircle, Sparkles, FileText, Mail, MessageSquare, TrendingUp, DollarSign, User } from 'lucide-react';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import FOMOJobsFooter from '@/components/landing/FOMOJobsFooter';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';

const JobPrompts = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const promptCards = [
    {
      icon: FileText,
      title: "Prompt do CV / LinkedIn",
      color: "from-purple-500 to-purple-600",
      items: [
        "Tworzenie CV dopasowanego do stanowiska lub branży.",
        "Optymalizacja pod ATS (systemy śledzenia aplikacji).",
        "Pisanie atrakcyjnych opisów doświadczenia."
      ],
      prompt: `Jesteś ekspertem HR i tworzysz profesjonalne CV. Pomóż mi stworzyć CV dopasowane do stanowiska [STANOWISKO] w branży [BRANŻA].

Uwzględnij:
- Optymalizację pod ATS
- Konkretne osiągnięcia (nie obowiązki)
- Słowa kluczowe z ogłoszenia
- Format czytelny dla rekrutera

Moje doświadczenie: [WKLEJ SWOJE DOŚWIADCZENIE]`
    },
    {
      icon: Mail,
      title: "Prompt do listu motywacyjnego",
      color: "from-yellow-500 to-yellow-600",
      items: [
        "Szybkie generowanie spersonalizowanych listów.",
        "Transformacja ogólnych tekstów w angażujące wiadomości.",
        "Pisanie e-maili do rekrutera."
      ],
      prompt: `Napisz profesjonalny i angażujący list motywacyjny do stanowiska [STANOWISKO] w firmie [FIRMA].

Uwzględnij:
- Dlaczego jestem idealnym kandydatem
- Co wiem o firmie i jej kulturze
- Konkretne przykłady z mojego doświadczenia
- Call to action

Opis stanowiska: [WKLEJ OPIS]
Moje CV: [STRESZCZENIE]`
    },
    {
      icon: MessageSquare,
      title: "Przygotowanie do rozmowy",
      color: "from-purple-500 to-yellow-500",
      items: [
        "Generowanie realistycznych pytań do roli.",
        "Tworzenie scenariuszy trudnych pytań.",
        "Praktyczne odpowiedzi i porady."
      ],
      prompt: `Jesteś doświadczonym rekruterem. Przygotuj mnie do rozmowy kwalifikacyjnej na stanowisko [STANOWISKO].

Wygeneruj:
- 10 najpopularniejszych pytań rekrutacyjnych
- 5 trudnych pytań behawioralnych
- Przykładowe odpowiedzi metodą STAR
- Red flags, których unikać

Branża: [BRANŻA]
Level: [JUNIOR/MID/SENIOR]`
    },
    {
      icon: TrendingUp,
      title: "Research firmy / rynku pracy",
      color: "from-blue-500 to-purple-500",
      items: [
        "Zbieranie informacji o firmie i kulturze organizacyjnej.",
        "Analiza ofert i trendów w danej branży.",
        "Przygotowanie do rozmowy z menedżerem."
      ],
      prompt: `Przeanalizuj firmę [NAZWA FIRMY] i pomóż mi przygotować się do rozmowy.

Zbierz informacje o:
- Misja, wizja, wartości firmy
- Główne produkty/usługi
- Kultura organizacyjna (Glassdoor, LinkedIn)
- Ostatnie newsy/osiągnięcia
- Konkurencja i pozycja na rynku

Zasugeruj 5 inteligentnych pytań do zadania rekruterowi.`
    },
    {
      icon: DollarSign,
      title: "Negocjacje wynagrodzenia",
      color: "from-green-500 to-yellow-500",
      items: [
        "Sugerowanie argumentów na bazie doświadczenia i rynku.",
        "Generowanie strategii negocjacyjnych.",
        "Porady dotyczące negocjowania benefitów."
      ],
      prompt: `Pomóż mi przygotować się do negocjacji wynagrodzenia na stanowisko [STANOWISKO].

Uwzględnij:
- Średnie wynagrodzenie w branży [BRANŻA] dla [LEVEL]
- Moje doświadczenie: [LATA DOŚWIADCZENIA]
- Lokalizacja: [MIASTO]
- Argumenty za wyższą stawką
- Jak negocjować benefity (praca zdalna, urlop, szkolenia)

Stwórz strategię negocjacyjną krok po kroku.`
    },
    {
      icon: User,
      title: "Autoprezentacja / storytelling",
      color: "from-pink-500 to-purple-500",
      items: [
        "Pomoc w tworzeniu spójnych historii zawodowych.",
        "Formułowanie odpowiedzi STAR (Situation, Task, Action, Result).",
        "Budowanie pewności siebie."
      ],
      prompt: `Pomóż mi stworzyć przekonującą autoprezentację na rozmowę kwalifikacyjną.

Stwórz odpowiedź na "Opowiedz mi o sobie" uwzględniając:
- Metodę storytelling (Beginning, Middle, End)
- Moje kluczowe osiągnięcia
- Dlaczego aplikuję właśnie teraz
- Co mogę wnieść do firmy

Moje dane: [DOŚWIADCZENIE, WYKSZTAŁCENIE, CELE]

Format: 2-3 minuty mówienia.`
    }
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Prompt skopiowany do schowka!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <Helmet>
        <title>FOMO.jobprompts - Gotowe prompty AI do poszukiwania pracy | FOMOjobs</title>
        <meta
          name="description"
          content="Kolekcja profesjonalnych promptów AI do tworzenia CV, listów motywacyjnych, przygotowania do rozmów kwalifikacyjnych i negocjacji."
        />
        <meta name="keywords" content="prompty AI, CV, list motywacyjny, rozmowa kwalifikacyjna, rekrutacja, ChatGPT, AI" />
      </Helmet>

      <FOMOJobsNavbar />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient-x text-primary-foreground">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-12 h-12" />
                <h1 className="text-4xl md:text-6xl font-bold">
                  <span className="text-white">FOMO</span>.<span className="text-secondary drop-shadow-lg">jobprompts</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
                Oszczędź czas i zwiększ swoją skuteczność dzięki gotowym promptom AI
              </p>
              <p className="text-lg opacity-80 max-w-3xl mx-auto">
                Profesjonalne prompty do ChatGPT, Claude i innych AI. Pomożemy Ci w CV, liście motywacyjnym, przygotowaniu do rozmowy i negocjacjach.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promptCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                    <CardDescription className="text-base">
                      <ul className="space-y-2 mt-4">
                        {card.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                      onClick={() => copyToClipboard(card.prompt, index)}
                    >
                      {copiedIndex === index ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Skopiowano!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Kopiuj prompt
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* How to use section */}
          <motion.div
            className="mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="border-0 shadow-card bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Jak używać tych promptów?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Skopiuj prompt</h4>
                    <p className="text-muted-foreground">Kliknij przycisk "Kopiuj prompt" przy wybranej kategorii</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Uzupełnij placeholdery</h4>
                    <p className="text-muted-foreground">Zastąp [STANOWISKO], [BRANŻA] itd. swoimi danymi</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Wklej do ChatGPT/Claude</h4>
                    <p className="text-muted-foreground">Użyj w swoim ulubionym AI i dostosuj wynik do swoich potrzeb</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <FOMOJobsFooter />
    </>
  );
};

export default JobPrompts;
