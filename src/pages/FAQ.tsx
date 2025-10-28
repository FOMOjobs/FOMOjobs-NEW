// src/pages/FAQ.tsx

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function FAQ() {
  const faqSections = [
    {
      title: "🎯 Podstawy",
      questions: [
        {
          q: "Czym jest FOMOjobs?",
          a: "FOMOjobs to Twój osobisty asystent do szukania pracy. Zamiast Ciebie codziennie przeglądać dziesiątki stron karier, my to robimy automatycznie. Ty dostajesz tylko te oferty, które naprawdę do Ciebie pasują. Jeden mail dziennie, zero spamu, zero FOMO."
        },
        {
          q: "Jak to działa?",
          a: "1. Ty ustawiasz czego szukasz (stanowisko, lokalizacja, branża)\n2. My codziennie przeszukujemy strony karier firm w Polsce\n3. Ty dostajesz mail z dopasowanymi ofertami rano (nigdy w nocy!)\n\nProste? Proste."
        },
        {
          q: "Dlaczego FOMOjobs, a nie Pracuj.pl czy LinkedIn?",
          a: "Bo my szukamy za Ciebie. Na innych portalach musisz sam/sama:\n• Codziennie odwiedzać kilkanaście stron\n• Pamiętać które oferty już widziałeś/aś\n• Klikać w setki ogłoszeń (z czego 90% to spam)\n\nU nas: jeden mail, konkretne oferty, zero zbędnej pracy."
        },
        {
          q: "Skąd macie oferty?",
          a: "Przeszukujemy strony karier firm za pomocą naszego systemu 'smart job discovery'. To jak gdybyś Ty sam/sama codziennie odwiedzał/a 100 stron - tylko robimy to szybciej i sprytniej.\n\nCzy to legalne? Tak. Robimy to tak samo jak Ty - przeglądamy publicznie dostępne strony. Tylko zamiast klikać ręcznie, używamy automatyzacji."
        },
      ]
    },
    {
      title: "💰 Plany i ceny",
      questions: [
        {
          q: "Jakie są plany subskrypcyjne?",
          a: (
            <div className="space-y-6">
              <div>
                <strong className="text-lg">Plan Start - 0 PLN (na zawsze)</strong>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Alerty z 5 wybranych firm</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Dla kogo: osoby które chcą spróbować lub szukają u konkretnych pracodawców
                </p>
              </div>

              <div>
                <strong className="text-lg">Plan Alerts - 15 PLN/miesiąc</strong>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Alerty ze wszystkich firm w bazie</li>
                  <li>Pełna wersja FOMO.alerts</li>
                  <li>Zaawansowane filtry (wykluczanie słów, języków, itp.)</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Dla kogo: aktywnie szukających pracy, którzy chcą więcej opcji
                </p>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <strong className="text-lg">⭐ Plan Pro - 29 PLN/miesiąc (Najpopularniejszy)</strong>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Wszystko z planu Alerts</li>
                  <li>Priorytetowe powiadomienia (dostajesz oferty jako pierwszy!)</li>
                  <li>Nielimitowany eksport CV</li>
                  <li>AI pomaga poprawić Twoje CV</li>
                  <li>Dostęp do wszystkich narzędzi FOMO (CV creator, job tracker, coach, prompts)</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Dla kogo: osoby które traktują szukanie pracy poważnie i chcą maksymalną przewagę
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <strong className="text-lg text-green-700 dark:text-green-300">💚 Plan Open (#opentowork) - 0 PLN (na zawsze)</strong>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li><strong>Wszystko z planu Pro za darmo!</strong></li>
                  <li>Pełny dostęp do wszystkich narzędzi</li>
                </ul>
                <p className="text-sm mt-3"><strong>Warunki:</strong></p>
                <ul className="list-disc ml-6 mt-1 space-y-1 text-sm">
                  <li>Masz status #opentowork na LinkedIn</li>
                  <li>Weryfikujemy Twój profil (prosimy o screen)</li>
                  <li>Po znalezieniu pracy - przechodzisz na plan Start lub płatny</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Dla kogo: osoby które są bez pracy i aktywnie szukają. Wiemy, że to stresujący moment - nie dokładamy Ci kosztów.
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                <strong className="text-lg text-purple-700 dark:text-purple-300">🏢 Plan Insights - 249 PLN/miesiąc</strong>
                <p className="mt-2">Dla firm i agencji rekrutacyjnych:</p>
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Analityka rynku pracy</li>
                  <li>Monitoring konkurencji</li>
                </ul>
              </div>
            </div>
          )
        },
        {
          q: "Czy mogę anulować subskrypcję?",
          a: "Tak, w każdej chwili.\n• Kliknij 'Anuluj' w ustawieniach\n• Zero dzwonienia, zero maili\n• Dostęp do końca opłaconego miesiąca\n• Potem wracasz na plan Start\n\nZero kombinowania, zero kar."
        },
        {
          q: "Czy mogę zmienić plan?",
          a: "Oczywiście:\n• Upgrade (niższy → wyższy): od razu\n• Downgrade (wyższy → niższy): z końcem miesiąca\n\nElastycznie, bez umów na X miesięcy."
        },
      ]
    },
    {
      title: "🔔 Alerty i powiadomienia",
      questions: [
        {
          q: "Kiedy dostanę alerty?",
          a: "• O godzinie którą sam/sama ustawisz\n• Tylko między 7:00 a 21:00\n• Jeden raz dziennie (albo częściej, zależnie od planu)\n\nNie budzimy Cię w nocy. Serio."
        },
        {
          q: "Dlaczego oferta z alertu pokazuje błąd 404?",
          a: "Dwa powody:\n\n1. Oferta była 'wewnętrzna'\nFirma musiała ją opublikować (wymóg procesu), ale i tak wezmą kogoś z firmy. Kandydaci zewnętrzni nie mają szans od początku.\n\n2. Przerwa techniczna\nFirma aktualizuje system (często w weekendy). Komunikat typu 'Workday maintenance' = spróbuj za kilka godzin.\n\nCo robić? Nie przejmuj się. Po prostu sprawdź kolejne oferty z alertu."
        },
      ]
    },
    {
      title: "⚙️ Konto i ustawienia",
      questions: [
        {
          q: "Czy muszę mieć konto?",
          a: "Tak. Bez konta nie możemy:\n• Dopasować ofert do Twojego doświadczenia\n• Wysłać Ci alertów\n• Zapamiętać co już widziałeś/aś\n\nAle rejestracja to dosłownie minuta. Nie musisz od razu wgrywać CV."
        },
      ]
    },
    {
      title: "🔒 Bezpieczeństwo i prywatność",
      questions: [
        {
          q: "Czy moje dane są bezpieczne?",
          a: "Tak.\n• Używamy ich tylko do dopasowania ofert\n• Zero sprzedawania 'partnerom'\n• Zero reklam\n• Pełna zgodność z RODO\n\nSzczegóły w Regulaminie na stronie."
        },
      ]
    },
    {
      title: "🤔 Program #opentowork",
      questions: [
        {
          q: "Jak działa weryfikacja #opentowork?",
          a: "Ręcznie - prosimy o screen profilu LinkedIn ze statusem #opentowork.\n\nChodzi nam o uczciwość - plan jest dla osób które serio szukają teraz pracy."
        },
        {
          q: "Co się stanie po znalezieniu pracy?",
          a: "Twoje konto nie znika! Ale:\n• Przechodzisz na plan Start (5 firm) lub wybierasz płatny\n• Dalej możesz korzystać z FOMOjobs\n\nGratulujemy nowej pracy! 🎉"
        },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Gradient Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 via-orange-500 to-yellow-400 py-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white hover:underline mb-6 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Powrót do strony głównej
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">
            ❓ FAQ – czyli pytania, które pewnie chcesz zadać
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Proste odpowiedzi na wszystkie pytania o FOMOjobs
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {faqSections.map((section, idx) => (
            <Card key={idx} className="p-6">
              <h2 className="text-2xl font-bold mb-4 contrast-more:text-black dark:contrast-more:text-white">
                {section.title}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((item, qIdx) => (
                  <AccordionItem key={qIdx} value={`${idx}-${qIdx}`}>
                    <AccordionTrigger className="text-left contrast-more:text-black dark:contrast-more:text-white">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground contrast-more:text-black dark:contrast-more:text-white whitespace-pre-wrap">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ))}

          {/* CTA Section */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold contrast-more:text-black dark:contrast-more:text-white">
                Nie znalazłeś odpowiedzi?
              </h3>
              <p className="text-muted-foreground contrast-more:text-black dark:contrast-more:text-white">
                Skontaktuj się z nami - chętnie pomożemy!
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/">
                  <Button size="lg">
                    Wróć do strony głównej
                  </Button>
                </Link>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:kontakt@fomojobs.pl">
                    ✉️ kontakt@fomojobs.pl
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
