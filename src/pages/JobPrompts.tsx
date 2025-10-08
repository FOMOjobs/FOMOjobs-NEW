import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Copy,
  CheckCircle,
  Sparkles,
  FileText,
  Mail,
  MessageSquare,
  TrendingUp,
  Users,
  Briefcase,
  Linkedin,
  Send,
  Target,
  Award,
  BookOpen,
  Coffee,
  UserPlus,
  DollarSign,
  Calendar,
  MapPin
} from 'lucide-react';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import FOMOJobsFooter from '@/components/landing/FOMOJobsFooter';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';

interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Category {
  id: string;
  title: string;
  icon: any;
  color: string;
  prompts: Prompt[];
}

const JobPrompts = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'cv-linkedin',
      title: 'CV / LinkedIn',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      prompts: [
        {
          id: 'cv-ats',
          title: 'CV pod ATS',
          description: 'Optymalizacja CV pod systemy śledzenia aplikacji',
          level: 'Intermediate',
          prompt: `Jesteś ekspertem w tworzeniu CV zoptymalizowanych pod systemy ATS (Applicant Tracking Systems). Pomóż mi stworzyć CV, które przejdzie przez filtry ATS dla stanowiska [STANOWISKO].

Wymagania:
- Użyj słów kluczowych z ogłoszenia: [WKLEJ OGŁOSZENIE]
- Format: standardowy (bez tabel, grafik, kolumn)
- Sekcje: Dane kontaktowe, Podsumowanie, Doświadczenie, Wykształcenie, Umiejętności
- Konkretne osiągnięcia z liczbami (nie ogólne obowiązki)
- Czasowniki działania na początku każdego punktu

Moje doświadczenie: [WKLEJ DOŚWIADCZENIE]

Wskaż także, które słowa kluczowe są krytyczne dla tego stanowiska.`
        },
        {
          id: 'cv-experience',
          title: 'Opis doświadczenia zawodowego',
          description: 'Przekształć obowiązki w osiągnięcia z metrykami',
          level: 'Beginner',
          prompt: `Pomóż mi przekształcić moje doświadczenie zawodowe w atrakcyjne opisy CV wykorzystując metodę CAR (Challenge-Action-Result).

Dla stanowiska: [NAZWA STANOWISKA]
Okres: [DATY]
Firma: [NAZWA FIRMY]

Moje główne obowiązki/projekty:
[WKLEJ SWOJE OBOWIĄZKI]

Przekształć to w 4-6 bulletpointów zawierających:
- Wyzwanie/sytuację
- Twoje działania
- Konkretne rezultaty (z liczbami, jeśli możliwe: %, wzrost, oszczędności)

Używaj silnych czasowników działania: wdrożyłem, zwiększyłem, zoptymalizowałem, etc.`
        },
        {
          id: 'cv-skills',
          title: 'Sekcja umiejętności',
          description: 'Dopasowane kompetencje twarde i miękkie',
          level: 'Beginner',
          prompt: `Pomóż mi stworzyć sekcję umiejętności w CV dopasowaną do stanowiska [STANOWISKO] w branży [BRANŻA].

Ogłoszenie o pracę (wymagania): [WKLEJ WYMAGANIA Z OGŁOSZENIA]

Moje umiejętności:
- Techniczne: [LISTA]
- Językowe: [LISTA]
- Miękkie: [LISTA]

Stwórz optymalną sekcję Skills zawierającą:
1. Hard skills dopasowane do ogłoszenia (priorytetowe)
2. Certyfikaty/narzędzia istotne dla roli
3. Języki obce z poziomem
4. Kluczowe soft skills (max 3-4)

Uszereguj według ważności dla tego stanowiska.`
        },
        {
          id: 'linkedin-headline',
          title: 'LinkedIn Headline',
          description: 'Przyciągający nagłówek profilu LinkedIn',
          level: 'Beginner',
          prompt: `Stwórz dla mnie przyciągającą uwagę LinkedIn Headline (max 220 znaków).

Moje dane:
- Obecne stanowisko: [STANOWISKO]
- Branża: [BRANŻA]
- Specjalizacja: [CO ROBISZ NAJLEPIEJ]
- Wartość dla pracodawcy: [JAKI PROBLEM ROZWIĄZUJESZ]
- Cel: [POSZUKUJĘ PRACY / OTWARTY NA OFERTY / NETWORKING]

Nagłówek powinien:
- Od razu pokazywać wartość
- Zawierać słowa kluczowe dla rekruterów
- Być konkretny (nie ogólnikowy)
- Zachęcać do kontaktu

Daj 3 warianty: profesjonalny, kreatywny i balanced.`
        },
        {
          id: 'linkedin-about',
          title: 'LinkedIn About Section',
          description: 'Sekcja "O mnie" budująca markę osobistą',
          level: 'Intermediate',
          prompt: `Pomóż mi napisać sekcję "O mnie" (About) na LinkedIn, która przyciągnie rekruterów i zbuduje moją markę osobistą.

Struktura:
1. Hook (pierwsze 2 zdania widoczne bez "zobacz więcej")
2. Moja historia zawodowa (3-4 zdania)
3. Czym się zajmuję i jaka jest moja wartość
4. Kluczowe osiągnięcia/projekty
5. Call to action

Moje dane:
- Stanowisko/rola: [STANOWISKO]
- Lata doświadczenia: [LICZBA]
- Największe osiągnięcie: [OSIĄGNIĘCIE]
- Specjalizacja: [CO ROBISZ]
- Dla kogo: [TWOJA GRUPA DOCELOWA]
- Kontakt: [EMAIL/SPOSÓB KONTAKTU]

Ton: [PROFESJONALNY / PRZYSTĘPNY / DYNAMICZNY]
Długość: około 1300-1500 znaków.`
        },
        {
          id: 'linkedin-recommendations',
          title: 'Rekomendacje LinkedIn',
          description: 'Prośba o rekomendację i draft dla innych',
          level: 'Advanced',
          prompt: `Pomóż mi w dwóch scenariuszach związanych z rekomendacjami LinkedIn:

SCENARIUSZ 1: Prośba o rekomendację
Napisz grzeczną wiadomość LinkedIn do [IMIĘ OSOBY], [ICH ROLA], z prośbą o napisanie rekomendacji.
Pracowaliśmy razem jako: [TWOJA RELACJA]
Przy projekcie: [NAZWA PROJEKTU/OKRES]

SCENARIUSZ 2: Draft rekomendacji dla kogoś
Chcę napisać rekomendację dla [IMIĘ], [ICH STANOWISKO].
Współpracowaliśmy: [KONTEKST]
Ich mocne strony: [LISTA]
Konkretny przykład/projekt: [OPIS]

Dla każdego scenariusza stwórz wiadomość/tekst, która jest:
- Autentyczna (nie przesadzona)
- Konkretna (z przykładami)
- Profesjonalna
- Około 150-200 słów`
        }
      ]
    },
    {
      id: 'cover-letter',
      title: 'List motywacyjny',
      icon: Mail,
      color: 'from-yellow-500 to-yellow-600',
      prompts: [
        {
          id: 'cover-universal',
          title: 'Uniwersalny list motywacyjny',
          description: 'Profesjonalny list do standardowej aplikacji',
          level: 'Beginner',
          prompt: `Napisz profesjonalny list motywacyjny do stanowiska [STANOWISKO] w firmie [NAZWA FIRMY].

Dane wejściowe:
- Ogłoszenie o pracę: [WKLEJ OGŁOSZENIE]
- Moje CV (skrót): [KLUCZOWE DOŚWIADCZENIE]
- Dlaczego ta firma: [CO CIĘ PRZYCIĄGA]
- Dlaczego ty: [TWOJE ATUTY]

Struktura listu:
1. Nagłówek (Twoje dane, dane firmy, data)
2. Wstęp - czym się interesujesz i skąd wiesz o ofercie
3. Body 1 - dlaczego jesteś idealnym kandydatem (dopasowanie do wymagań)
4. Body 2 - konkretne osiągnięcie/przykład
5. Body 3 - dlaczego ta firma (kultura/wartości)
6. Zakończenie - call to action

Ton: profesjonalny, entuzjastyczny, konkretny (bez ogólników).
Długość: max 1 strona A4.`
        },
        {
          id: 'email-recruiter',
          title: 'Email aplikacyjny do rekrutera',
          description: 'Krótki email przy aplikacji online',
          level: 'Beginner',
          prompt: `Napisz krótki, skuteczny email aplikacyjny do rekrutera przy wysyłaniu CV.

Kontekst:
- Stanowisko: [STANOWISKO]
- Firma: [FIRMA]
- Źródło ogłoszenia: [LINKEDIN/STRONA FIRMY/REKOMENDACJA]
- Twoja kluczowa przewaga: [1 ZDANIE]

Email powinien:
- Mieć przyciągający temat (subject line)
- Być krótki (4-6 zdań max)
- Od razu pokazywać wartość
- Zawierać call to action
- Ton: ciepły, profesjonalny, pewny siebie

Dołączam: CV + [PORTFOLIO/LIST MOTYWACYJNY]`
        },
        {
          id: 'follow-up',
          title: 'Follow-up po rozmowie',
          description: 'Email z podziękowaniem po interview',
          level: 'Intermediate',
          prompt: `Napisz follow-up email po rozmowie kwalifikacyjnej.

Szczegóły:
- Data rozmowy: [DATA]
- Stanowisko: [STANOWISKO]
- Rozmówca/y: [IMIONA, ROLE]
- Kluczowe tematy z rozmowy: [CO BYŁ O OMAWIANE]
- Pytanie/temat do rozwinięcia: [OPCJONALNIE]

Email powinien:
1. Podziękować za czas i rozmowę
2. Nawiązać do konkretnego tematu/momentu z rozmowy (pokazuje zaangażowanie)
3. Rozwinąć jeden punkt, który nie został wystarczająco poruszony
4. Potwierdzić zainteresowanie i dopasowanie
5. Zapytać o następne kroki

Ton: ciepły, profesjonalny, entuzjastyczny (ale nie desperacki).
Długość: 150-250 słów.
Czas wysłania: w ciągu 24h po rozmowie.`
        },
        {
          id: 'cold-outreach',
          title: 'Cold outreach do firmy',
          description: 'Inicjatywa aplikacyjna bez ogłoszenia',
          level: 'Advanced',
          prompt: `Stwórz cold outreach email do firmy, w której chcę pracować (bez otwartego ogłoszenia).

Dane:
- Firma docelowa: [NAZWA]
- Osoba docelowa: [IMIĘ, STANOWISKO] (np. Hiring Manager, CTO)
- Dlaczego ta firma: [CO CIĘ FASCYNUJE]
- Twoja rola/wartość: [CO MOŻESZ WNIEŚĆ]
- Twoje doświadczenie: [KLUCZOWE PUNKTY]

Email powinien:
1. Subject line przyciągający uwagę (personalizowany)
2. Hook - dlaczego piszesz (połączenie, obserwacja, inspiracja)
3. Kim jesteś + twoja wartość w 2-3 zdaniach
4. Dlaczego ta firma + konkretna obserwacja (ostatni produkt/news/wartości)
5. Sugestia spotkania/call (nie "czy macie wolne stanowisko")

Ton: pewny siebie, ale pokorny; konkretny, nie ogólnikowy.
Cel: dostać 15-min coffee chat, nie interview.`
        },
        {
          id: 'decline-offer',
          title: 'Rezygnacja z oferty (uprzejmie)',
          description: 'Odmowa oferty z zachowaniem dobrych relacji',
          level: 'Intermediate',
          prompt: `Pomóż mi uprzejmie odmówić przyjęcia oferty pracy, zachowując dobre relacje.

Kontekst:
- Firma: [NAZWA]
- Stanowisko: [STANOWISKO]
- Osoba rekrutująca: [IMIĘ]
- Powód odmowy: [INNA OFERTA / NIE PASUJE / WARUNKI] (bez wchodzenia w szczegóły)
- Czy chcesz zachować kontakt: [TAK/NIE]

Email powinien:
1. Podziękować za ofertę i czas poświęcony na rekrutację
2. Jasno zakomunikować decyzję (bez "może", "prawdopodobnie")
3. Podać ogólny powód (bez szczegółów finansowych/negatywnych)
4. Wyrazić szacunek dla firmy
5. Opcjonalnie - pozostawić otwarte drzwi na przyszłość

Ton: ciepły, wdzięczny, profesjonalny, stanowczy.
Długość: 100-150 słów.
Wysłać: jak najszybciej po podjęciu decyzji.`
        }
      ]
    },
    {
      id: 'interview-prep',
      title: 'Rozmowa kwalifikacyjna',
      icon: MessageSquare,
      color: 'from-purple-500 to-yellow-500',
      prompts: [
        {
          id: 'behavioral-questions',
          title: 'Pytania behawioralne (STAR)',
          description: 'Przygotowanie odpowiedzi metodą STAR',
          level: 'Intermediate',
          prompt: `Przygotuj mnie do pytań behawioralnych na rozmowie kwalifikacyjnej używając metody STAR (Situation, Task, Action, Result).

Stanowisko: [STANOWISKO]
Branża: [BRANŻA]
Level: [JUNIOR/MID/SENIOR]

Wygeneruj:
1. 10 najpopularniejszych pytań behawioralnych dla tej roli
2. Dla każdego pytania: framework odpowiedzi STAR
3. Przykładową odpowiedź dla 3 pytań na bazie mojego doświadczenia: [WKLEJ SKRÓT CV]

Przykładowe pytania do uwzględnienia:
- "Opowiedz o sytuacji, gdy musiałeś rozwiązać trudny problem"
- "Jak radzisz sobie z konfliktem w zespole?"
- "Opisz sytuację, gdy nie udało ci się osiągnąć celu"
- "Przykład, gdy musiałeś przekonać innych do swojego pomysłu"

Dla każdej odpowiedzi wskaż:
✓ Co dobrze pokazuje
✗ Czego unikać (red flags)`
        },
        {
          id: 'technical-questions',
          title: 'Pytania techniczne dla [stanowisko]',
          description: 'Przygotowanie do pytań merytorycznych',
          level: 'Advanced',
          prompt: `Przygotuj mnie do pytań technicznych na rozmowie dla stanowiska [STANOWISKO].

Dane wejściowe:
- Stanowisko: [PEŁNA NAZWA]
- Stack technologiczny z ogłoszenia: [TECHNOLOGIE]
- Moje doświadczenie: [LATA + TECHNOLOGIE]
- Level: [JUNIOR/MID/SENIOR]

Wygeneruj:
1. 15-20 pytań technicznych na różnych poziomach trudności
2. Krótkie odpowiedzi/kluczowe punkty do każdego
3. Pytania follow-up, które rekruter może zadać
4. Białe plamy w mojej wiedzy (czego się doszkolić)

Kategorie pytań:
- Podstawy (fundamentals)
- Scenariusze praktyczne
- System design (jeśli senior)
- Best practices
- Trendy/nowe rozwiązania

Dodatkowo: zasugeruj 2-3 zasoby do szybkiej nauki przed rozmową.`
        },
        {
          id: 'why-us-why-you',
          title: '"Dlaczego my?" i "Dlaczego ty?"',
          description: 'Klasyczne pytania o motywację',
          level: 'Beginner',
          prompt: `Pomóż mi przygotować przekonujące odpowiedzi na dwa kluczowe pytania:

1. "Dlaczego chcesz pracować w naszej firmie?"
2. "Dlaczego powinniśmy wybrać właśnie Ciebie?"

Dane:
- Firma: [NAZWA]
- Stanowisko: [STANOWISKO]
- Co wiem o firmie: [PRODUKTY, KULTURA, WARTOŚCI, NEWSY]
- Moje dopasowanie: [DLACZEGO PASUJESZ]
- Moja unikalna wartość: [CO WYRÓŻNIA CIEBIE]

Dla DLACZEGO MY:
- Unikaj ogólników ("jesteście liderem rynku")
- Połącz wartości firmy z Twoimi wartościami
- Odwołaj się do konkretnego projektu/produktu/inicjatywy
- Pokaż, że zrobiłeś research

Dla DLACZEGO TY:
- Konkretne osiągnięcie dopasowane do potrzeb firmy
- Unikalna kombinacja skillów
- Wartość, którą od pierwszego dnia wniesiesz
- Pasja i motywacja

Każda odpowiedź: 1-2 minuty mówienia (150-250 słów).`
        },
        {
          id: 'questions-to-ask',
          title: 'Twoje pytania do rekrutera',
          description: 'Inteligentne pytania na koniec rozmowy',
          level: 'Intermediate',
          prompt: `Zasugeruj mi 15-20 inteligentnych pytań do zadania rekruterowi/hiring managerowi na końcu rozmowy.

Kontekst:
- Stanowisko: [STANOWISKO]
- Etap procesu: [PIERWSZA ROZMOWA / TECHNICZNA / FINALNA]
- Typ rozmówcy: [HR / HIRING MANAGER / TECHNICAL LEAD]

Kategorie pytań:
1. Rola i oczekiwania (pierwsze dni/miesiące)
2. Zespół i kultura współpracy
3. Rozwój i ścieżka kariery
4. Projekty i wyzwania
5. Procesy i narzędzia
6. Firma i strategia
7. Success metrics (jak mierzony sukces na tym stanowisku)

Każde pytanie powinno:
✓ Pokazywać zaangażowanie i research
✓ Być konkretne (nie ogólne)
✓ Dawać wartościową informację o pracy
✗ Unikać pytań o benefity/urlop na pierwszej rozmowie
✗ Nie pytać o rzeczy, które są na stronie firmy

Oznacz, które pytania są dla [HR / MANAGER / TECHNICAL].`
        },
        {
          id: 'salary-negotiation',
          title: 'Negocjacje wynagrodzenia',
          description: 'Strategia i taktyka negocjacji salary',
          level: 'Advanced',
          prompt: `Przygotuj mnie do negocjacji wynagrodzenia na stanowisko [STANOWISKO].

Moje dane:
- Obecne wynagrodzenie: [KWOTA] (opcjonalnie)
- Oczekiwane wynagrodzenie: [KWOTA/WIDEŁKI]
- Doświadczenie: [LATA]
- Lokalizacja: [MIASTO]
- Level: [JUNIOR/MID/SENIOR]
- Branża: [BRANŻA]

Wygeneruj:
1. Market rate dla tego stanowiska w [LOKALIZACJA] (szacunkowo)
2. Twoja wartość rynkowa na bazie doświadczenia
3. Strategię negocjacyjną krok po kroku:
   - Kiedy podać liczbę (nie za wcześnie!)
   - Jak odpowiedzieć na "jakie są twoje oczekiwania?"
   - Jak uzasadnić żądaną kwotę
   - Co robić gdy oferta jest za niska
4. Argumenty za wyższą stawką (5 konkretnych)
5. Jak negocjować benefity jeśli salary jest fixed (praca zdalna, urlop, szkolenia, sprzęt, bonus)
6. Przykładowe frazy do użycia
7. Red flags (czego nie mówić)

Cel: [KWOTA] albo [BENEFITY], jakie mam szanse?`
        },
        {
          id: 'difficult-interview-sim',
          title: 'Symulacja trudnej rozmowy',
          description: 'Trening stresujących pytań',
          level: 'Advanced',
          prompt: `Zasymuluj trudną rozmowę kwalifikacyjną z "stressful" pytaniami i pomóż mi się przygotować.

Stanowisko: [STANOWISKO]
Mój background: [SKRÓT CV Z LUKAMI/TRUDNOŚCIAMI]

Wygeneruj 10 trudnych/niewygodnych pytań typu:
- "Dlaczego tak długo szukasz pracy?"
- "Widzę lukę w CV od [DATA] do [DATA], co robiłeś?"
- "Dlaczego chcesz zmienić branżę/zrobić krok wstecz?"
- "Twoje doświadczenie nie pasuje idealnie, dlaczego aplikujesz?"
- "Za 3 lata widzisz się na tym stanowisku?" (red flag dla overqualified)
- Pytania o niepowodzenia/zwolnienia
- "Co Twoi poprzedni szefowie powiedzieliby o Tobie?" (złe relacje)

Dla każdego pytania:
1. Dlaczego rekruter to pyta (ukryty motyw)
2. Jak odpowiedzieć szczerze, ale pozytywnie
3. Przykładowa odpowiedź (framework)
4. Czego NIE mówić (red flags)

Dodatkowo: techniki radzenia sobie ze stresem podczas rozmowy.`
        },
        {
          id: 'post-interview-followup',
          title: 'Follow-up po rozmowie',
          description: 'Strategia po interview (email + kolejne kroki)',
          level: 'Intermediate',
          prompt: `Pomóż mi w strategii follow-up po rozmowie kwalifikacyjnej.

Sytuacja:
- Data rozmowy: [DATA]
- Stanowisko: [STANOWISKO]
- Etap: [1. ROZMOWA / 2. / FINALNA]
- Rekruter powiedział: "[CO POWIEDZIELI O NASTĘPNYCH KROKACH]"
- Twoje wrażenia: [JAK POSZŁO]

Wygeneruj plan działania:

1. THANK YOU EMAIL (w ciągu 24h):
   - Subject line
   - Treść (5-7 zdań)
   - Co uwzględnić (nawiązanie do konkretnego tematu z rozmowy)

2. FOLLOW-UP jeśli cisza (po X dniach):
   - Kiedy wysłać (bazując na tym co powiedzieli)
   - Treść delikatnego "checking in" (nie nachalnego)

3. FOLLOW-UP #2 jeśli nadal cisza:
   - Kiedy i jak "zamknąć" proces z klasą

4. Co robić w międzyczasie:
   - Aplikować dalej?
   - Jak długo czekać?
   - Czy dzwonić/pisać na LinkedIn?

5. Jeśli dostaniesz ghost:
   - Jak zareagować profesjonalnie
   - Kiedy uznać za porażkę i iść dalej

Wszystko z zachowaniem profesjonalizmu i dobrych relacji.`
        }
      ]
    },
    {
      id: 'research',
      title: 'Research firmy/rynku',
      icon: TrendingUp,
      color: 'from-blue-500 to-purple-500',
      prompts: [
        {
          id: 'company-culture',
          title: 'Analiza firmy i kultury',
          description: 'Głęboki research przed rozmową',
          level: 'Intermediate',
          prompt: `Pomóż mi przygotować się do rozmowy poprzez analizę firmy [NAZWA FIRMY].

Zbierz i przeanalizuj informacje z:
1. Strona www firmy (About, Careers, Blog)
2. LinkedIn (Company page, posty, pracownicy)
3. Glassdoor/Gowork (opinie pracowników)
4. Google News (ostatnie 6 miesięcy)
5. Social media (Twitter, Facebook, Instagram jeśli relevantne)

Wygeneruj raport zawierający:

📊 PODSTAWY:
- Misja, wizja, wartości
- Główne produkty/usługi
- Model biznesowy
- Wielkość firmy i lokalizacje

💼 KULTURA ORGANIZACYJNA:
- Jak się określają (słowa kluczowe)
- Work-life balance
- Remote/hybrid policy
- Development opportunities
- Red flags z Glassdoor (jeśli są)

📈 AKTUALNOŚCI:
- Ostatnie osiągnięcia/newsy
- Rundy finansowania / wzrost
- Nowe produkty/inicjatywy

🎯 STANOWISKO [NAZWA]:
- Jakie wyzwania może mieć ten team
- Dlaczego rekrutują (wzrost/rotacja/nowy projekt)

💡 PYTANIA DO ZADANIA:
5 inteligentnych pytań bazujących na researchu.`
        },
        {
          id: 'market-position',
          title: 'Konkurencja i pozycja rynkowa',
          description: 'Analiza branżowa i konkurencji',
          level: 'Advanced',
          prompt: `Przeanalizuj pozycję rynkową firmy [NAZWA FIRMY] w kontekście konkurencji.

Branża: [BRANŻA]
Główny produkt/usługa: [OPIS]

Przeanalizuj:

1. KONKURENCJA:
- Kto to jest (5 głównych konkurentów)
- Jak firma wypada na ich tle (strengths/weaknesses)
- Co ją wyróżnia (USP)

2. POZYCJA RYNKOWA:
- Leader/Challenger/Niche/Startup?
- Market share (jeśli dane publiczne)
- Tempo wzrostu (ostatnie 2-3 lata)

3. TRENDY BRANŻOWE:
- Co się zmienia w tej branży
- Największe wyzwania
- Opportunities

4. PRZYSZŁOŚĆ:
- Dokąd zmierza firma (strategia)
- Ryzyka (zagrożenia zewnętrzne)

5. DLA TWOJEJ ROLI:
- Jak te informacje wpływają na stanowisko [STANOWISKO]
- Pytania do zadania na rozmowie bazując na tej analizie

Cel: pokazać na rozmowie, że rozumiesz kontekst biznesowy, nie tylko wykonujesz zadania.`
        },
        {
          id: 'industry-trends',
          title: 'Trendy w branży [nazwa]',
          description: 'Bieżące zmiany w twojej branży',
          level: 'Intermediate',
          prompt: `Przygotuj mnie do rozmowy poprzez analizę trendów w branży [BRANŻA].

Kontekst:
- Stanowisko: [STANOWISKO]
- Firma: [NAZWA]
- Dlaczego to ważne: chcę pokazać na rozmowie, że śledzę rynek

Przeanalizuj:

1. TOP 5 TRENDÓW w tej branży (ostatnie 12 miesięcy):
   - Co się zmienia
   - Dlaczego to ważne
   - Jak wpływa na firmy

2. TECHNOLOGIE/ROZWIĄZANIA:
   - Co nowego (AI, automation, nowe narzędzia)
   - Co wychodzi z użycia
   - Co warto znać/umieć

3. WYZWANIA BRANŻY:
   - Największe problemy do rozwiązania
   - Regulacje/zmiany prawne
   - Zmiany w oczekiwaniach klientów

4. OPPORTUNITIES:
   - Gdzie są szanse na wzrost
   - Czego potrzebują firmy

5. DLA [STANOWISKO]:
   - Jak te trendy wpływają na twoją rolę
   - Jakie umiejętności będą kluczowe
   - 3-4 inteligentne komentarze/pytania do użycia na rozmowie

Źródła do sprawdzenia: [PODAJ BRANŻOWE BLOGI/RAPORTY]`
        },
        {
          id: 'salary-research',
          title: 'Zarobki na stanowisku [nazwa]',
          description: 'Market rate i benchmarking wynagrodzeń',
          level: 'Beginner',
          prompt: `Pomóż mi określić realną wartość rynkową dla stanowiska [STANOWISKO] w [LOKALIZACJA].

Moje dane:
- Doświadczenie: [LATA]
- Branża: [BRANŻA]
- Level: [JUNIOR/MID/SENIOR]
- Kluczowe umiejętności: [TOP 3-5]
- Dodatkowe atuty: [JĘZYKI, CERTYFIKATY, NISZOWE SKILLE]

Przeanalizuj i podaj:

1. ŚREDNIE WYNAGRODZENIE:
   - Dla tego stanowiska w [MIASTO/KRAJ]
   - Podział na junior/mid/senior
   - Widełki (min-max)

2. FAKTORY WPŁYWAJĄCE NA STAWKĘ:
   - Wielkość firmy (startup/corporate)
   - Branża (tech, finance, e-commerce...)
   - Remote vs. office
   - Equity/bonusy

3. TWOJA WYCENA:
   - Bazując na doświadczeniu i skillach
   - Conservative estimate (dolna granica bezpieczna)
   - Optimistic (górna granica realistyczna)
   - Stretch (top 10%)

4. JAK ZNALEŹĆ DANE:
   - Strony/narzędzia (Glassdoor, PayScale, lokalne)
   - Grupy na LinkedIn/Facebook
   - Rozmowy z ludźmi z branży

5. W NEGOCJACJACH:
   - Jaką kwotę podać jako oczekiwania
   - Jak uzasadnić

Cel: iść na rozmowę wiedząc swoją wartość.`
        }
      ]
    },
    {
      id: 'networking',
      title: 'Networking',
      icon: Users,
      color: 'from-green-500 to-teal-500',
      prompts: [
        {
          id: 'linkedin-connection',
          title: 'LinkedIn connection message',
          description: 'Personalizowana wiadomość przy dodawaniu',
          level: 'Beginner',
          prompt: `Napisz personalizowaną wiadomość LinkedIn przy wysyłaniu zaproszenia do połączenia.

Kontekst:
- Osoba: [IMIĘ, STANOWISKO]
- Firma: [GDZIE PRACUJE]
- Dlaczego chcesz się połączyć: [POWÓD: event, wspólna grupa, admirujesz ich pracę, networking w branży, etc.]
- Twój cel: [NETWORKING / JOB SEARCH / NAUKA / WSPÓŁPRACA]

Wiadomość (max 300 znaków!):
- Personalizacja (wspólny wątek)
- Kim jesteś (1 zdanie)
- Dlaczego piszesz
- Sugestia value exchange (nie "daj mi pracę")

Ton: profesjonalny, ciepły, nie nachalny.

Daj 3 warianty:
1. Po spotkaniu na evencie/konferencji
2. Cold outreach (wspólna branża)
3. Nawiązanie przez content (komentowałeś ich post)`
        },
        {
          id: 'coffee-chat',
          title: 'Coffee chat request',
          description: 'Prośba o spotkanie informacyjne',
          level: 'Intermediate',
          prompt: `Napisz wiadomość z prośbą o informational coffee chat (15-30 min rozmowa networkingowa).

Dane:
- Osoba: [IMIĘ, ICH ROLA]
- Skąd znasz: [LINKEDIN / POLECENIE / MUTUAL CONNECTION]
- Dlaczego ta osoba: [CO CIĘ ZAINSPIROWAŁO: ich kariera, firma, expertise]
- Czego chcesz się dowiedzieć: [TEMAT: ich ścieżka kariery, rada, insights o firmie/branży]

Wiadomość powinna:
1. Przedstawić cię (1-2 zdania)
2. Powiedzieć DLACZEGO właśnie oni (specifics!)
3. O co prosisz (konkretnie: 20-min call/kawa/zoom)
4. Zaproponować value exchange (udostępnisz swoje notatki, dasz feedback na coś)
5. Ułatwić odmowę ("rozumiem jeśli nie masz czasu")

Ton: pokorny, entuzjastyczny, szanujący ich czas.
Długość: 150-200 słów.

Channel: [LINKEDIN / EMAIL / INNE]

Załóż, że nie znają cię osobiście - musisz wyróżnić się z dziesiątek podobnych próśb.`
        },
        {
          id: 'reference-request',
          title: 'Prośba o referencje',
          description: 'Jak poprosić o referencje byłego managera/klienta',
          level: 'Intermediate',
          prompt: `Pomóż mi poprosić o referencje od [IMIĘ, ICH ROLA względem Ciebie: manager/klient/współpracownik].

Kontekst:
- Osoba: [IMIĘ]
- Wasza relacja: [JAK WSPÓŁPRACOWALIŚCIE, KIEDY]
- Projekt/osiągnięcie z nimi: [KONKRETNY PRZYKŁAD]
- Jak długo się nie kontaktowaliście: [CZAS]
- Do czego potrzebujesz: [APLIKACJA, LINKEDIN RECOMMENDATION, ROZMOWA REFERENCYJNA]

Wiadomość powinna:
1. Przypomnieć kontekst (jak pracowaliście)
2. Wyjaśnić do czego ci to (stanowisko, firma)
3. Poprosić konkretnie (co mają zrobić)
4. Ułatwić task (zaproponować draft/bulletpoints)
5. Pokazać wdzięczność

Dołącz:
- Subject line (jeśli email)
- Treść wiadomości
- Opcjonalny draft/bullet points dla nich (co podkreślić)

Ton: ciepły, wdzięczny, profesjonalny.

Wskazówki:
- Wysłać prośbę wcześniej (nie na last minute)
- Dać im "out" jeśli czują się niezręcznie
- Follow-up z podziękowaniem`
        },
        {
          id: 'thank-you-note',
          title: 'Thank you note',
          description: 'Podziękowanie po spotkaniu/pomocy',
          level: 'Beginner',
          prompt: `Napisz thank-you note po [KONTEKST: coffee chat / informational interview / pomoc w job search / polecenie].

Szczegóły:
- Osoba: [IMIĘ]
- Co zrobili: [POŚWIĘCILI CZAS / DALI RADĘ / WPROWADZILI DO KOGOŚ / POLECILI CIĘ]
- Konkretna wartość z tego: [CO WYNIOSŁEŚ, JAK CI POMOGŁO]
- Twoja aktualizacja: [CO ZROBIŁEŚ Z ICH RADĄ / UPDATE O PROCESIE]

Note powinno:
1. Podziękować szczerze (specific, nie ogólnie)
2. Powiedzieć JAK użyłeś ich rady/pomocy (pokazuje, że doceniasz)
3. Dać update (zamyka loop)
4. Opcjonalnie: zaproponować rewanż/favor w przyszłości

Ton: ciepły, autentyczny, wdzięczny (ale nie przesadnie).
Długość: 5-8 zdań.
Channel: [EMAIL / LINKEDIN]

Timing: w ciągu 24-48h.

Daj 2 warianty:
1. Po coffee chat/advice
2. Po tym jak cię polecili i dostałeś pracę`
        }
      ]
    },
    {
      id: 'career-dev',
      title: 'Career Development',
      icon: Award,
      color: 'from-orange-500 to-red-500',
      prompts: [
        {
          id: 'career-change',
          title: 'Zmiana branży/kariery',
          description: 'Strategia pivotu zawodowego',
          level: 'Advanced',
          prompt: `Pomóż mi zaplanować zmianę kariery/branży z [OBECNA ROLA/BRANŻA] na [DOCELOWA ROLA/BRANŻA].

Moja sytuacja:
- Obecnie: [STANOWISKO, LATA DOŚWIADCZENIA]
- Chcę przejść do: [NOWA ROLA/BRANŻA]
- Dlaczego zmiana: [MOTYWACJA]
- Transferable skills: [CO MOGĘ PRZENIEŚĆ]
- Luki w umiejętnościach: [CZEGO MI BRAKUJE]
- Timeline: [ILE MAM CZASU NA PRZEJŚCIE]

Stwórz plan zawierający:

1. ANALIZA GAP:
   - Co masz (skills/doświadczenie)
   - Czego potrzeba w nowej roli
   - Luki do wypełnienia

2. PLAN NAUKI (3-6 miesięcy):
   - Kluczowe umiejętności do nauki (priorytet)
   - Kursy/certyfikaty
   - Projekty do portfolio
   - Networking w nowej branży

3. CV & POSITIONING:
   - Jak przedstawić swoją zmianę (nie jako ryzyko, ale asset)
   - Jak przepisać CV (highlight transferable skills)
   - Storytelling: dlaczego ta zmiana ma sens

4. STRATEGIA APLIKOWANIA:
   - Gdzie szukać (firmy otwarte na career changers)
   - Jak omijać ATS (networking > aplikacje online)
   - Jak uzasadnić pivot na rozmowie

5. TIMELINE & MILESTONES:
   - Co zrobić w miesiącu 1, 2, 3...
   - Kiedy zacząć aplikować

Realistyczna ocena: jakie są moje szanse i co może być trudne?`
        },
        {
          id: 'cv-gap-explanation',
          title: 'Gap w CV (wyjaśnienie)',
          description: 'Jak wytłumaczyć przerwę w pracy',
          level: 'Intermediate',
          prompt: `Pomóż mi wytłumaczyć lukę w CV i przygotować odpowiedź na rozmowie.

Moja sytuacja:
- Gap: od [DATA] do [DATA] ([DŁUGOŚĆ])
- Powód: [ZWOLNIENIE / WYPALENIE / CHOROBA / OPIEKA NAD RODZINĄ / POSZUKIWANIE PRACY / INNE]
- Co robiłem w tym czasie: [KURSY, PROJEKTY, FREELANCE, ROZWÓJ, NIC]

Potrzebuję:

1. JAK PRZEDSTAWIĆ W CV:
   - Czy wpisywać (i jak)?
   - Jak sformułować żeby nie było red flaga
   - Format (np. "2023 - Career break - [reason]")

2. ODPOWIEDŹ NA ROZMOWIE:
   Przygotuj odpowiedź na "Widzę przerwę w CV od X do Y, co robiłeś?":
   - Szczera, ale pozytywna
   - Pokazująca co wyniosłeś / czego się nauczyłeś
   - Closing: dlaczego TERAZ jesteś gotowy wrócić

3. RED FLAGS DO UNIKANIA:
   - Czego NIE mówić
   - Jak nie brzmieć defensywnie/negatywnie
   - Jak nie rozwodzić się za długo

4. JAK WYKORZYSTAĆ GAP JAKO ATUT:
   - Świeża perspektywa
   - Nowe umiejętności
   - Refleksja nad karierą

Przykładowe odpowiedzi (3 warianty zależnie od powodu):
- Option A (konstruktywny gap: kursy, rozwój)
- Option B (przymusowy: zwolnienie, sytuacja rodzinna)
- Option C (długi job search)

Ton: pewny siebie, transparentny, forward-looking.`
        },
        {
          id: 'personal-branding',
          title: 'Personal branding',
          description: 'Budowanie marki osobistej online',
          level: 'Advanced',
          prompt: `Pomóż mi zbudować spójną markę osobistą (personal brand) online, szczególnie na LinkedIn.

Moje dane:
- Stanowisko/role: [CO ROBISZ]
- Branża: [BRANŻA]
- Expertise: [W CZYM JESTEŚ DOBRY]
- Cel: [JOB SEARCH / FREELANCE / THOUGHT LEADERSHIP / NETWORKING]
- Target audience: [DLA KOGO: rekruterzy, potencjalni klienci, peers w branży]

Stwórz strategię:

1. POSITIONING:
   - Jak chcesz być postrzegany (1 zdanie: "Jestem [kim] który pomaga [komu] w [czym]")
   - Unique value proposition
   - Słowa kluczowe (5-7 słów definiujących cię)

2. LINKEDIN PROFILE:
   - Headline (220 znaków)
   - About section (struktura: Hook, Story, Value, CTA)
   - Featured section (co pokazać)
   - Recommendations strategy

3. CONTENT STRATEGY:
   - O czym pisać (3-4 pilary tematyczne)
   - Jak często postować
   - Formaty (posty, artykuły, komentarze)
   - Przykłady 5 postów (tematy/hooki)

4. ENGAGEMENT:
   - Jak komentować posty innych (add value)
   - Networking strategy (komu followować, z kim się łączyć)

5. CONSISTENCY:
   - Tone of voice (formalny/casual/ekspert/przystępny)
   - Visual identity (jeśli relevant: zdjęcie, banner, kolory)

6. MIERZENIE SUKCESU:
   - Jakie metryki śledzić
   - Jak długo to trwa (realistic timeline)

BONUS: Quick wins - co zrobić w pierwszy tydzień żeby wystartować.`
        },
        {
          id: 'portfolio-case-study',
          title: 'Portfolio case study',
          description: 'Jak opisać projekt w portfolio',
          level: 'Intermediate',
          prompt: `Pomóż mi stworzyć case study do portfolio dla projektu [NAZWA PROJEKTU].

Szczegóły projektu:
- Typ projektu: [WEB APP / DESIGN / MARKETING CAMPAIGN / DATA ANALYSIS / INNE]
- Twoja rola: [CO ROBIŁEŚ]
- Context: [DLA KOGO, JAKI PROBLEM]
- Timeline: [ILE TRWAŁO]
- Outcome: [REZULTATY - liczby jeśli możliwe]

Struktura case study:

1. OVERVIEW (Hero section):
   - Nazwa projektu + tagline (1 zdanie)
   - Twoja rola
   - Timeline & team size
   - Tech stack/tools (jeśli relevant)
   - Visual: główny screenshot/mockup

2. THE CHALLENGE:
   - Problem do rozwiązania
   - Ograniczenia/constraints
   - Stakeholders

3. THE PROCESS:
   - Research/discovery
   - Kluczowe decyzje
   - Iteracje
   - Visuals: wireframes, sketches, work-in-progress

4. THE SOLUTION:
   - Co stworzyłeś
   - Kluczowe features
   - Visuals: finalne screenshoty/demo

5. THE RESULTS:
   - Konkretne metryki (wzrost konwersji, user satisfaction, performance)
   - Feedback od klienta/usera
   - Co się udało

6. LEARNINGS:
   - Co byś zrobił inaczej
   - Czego się nauczyłeś

Format: [STRONA WWW / BEHANCE / PDF / NOTION]

Dodatkowo:
- Sugestie wizualne (jak to przedstawić)
- Jak unikać NDA issues (jeśli projekt pod NDA)`
        },
        {
          id: 'career-goals',
          title: 'Cele zawodowe (5 lat)',
          description: 'Odpowiedź na "Gdzie widzisz się za 5 lat?"',
          level: 'Intermediate',
          prompt: `Pomóż mi sformułować przekonującą odpowiedź na pytanie "Gdzie widzisz się za 5 lat?" na rozmowie kwalifikacyjnej.

Kontekst:
- Stanowisko, o które aplikujesz: [STANOWISKO]
- Firma: [NAZWA]
- Ścieżka kariery w tej firmie: [MOŻLIWOŚCI ROZWOJU jeśli wiesz]
- Twoje prawdziwe ambicje: [SENIOR ROLE / MANAGEMENT / SPECJALISTA / ZAŁOŻYĆ FIRMĘ / INNE]

Stwórz odpowiedź która:

1. JEST AMBITNA ALE REALISTYCZNA:
   - Pokazuje, że myślisz długoterminowo
   - Nie jest "twoja pozycja" (red flag)
   - Pasuje do ścieżki w tej firmie

2. ZWIĄZANA Z TĄ ROLĄ:
   - Jak ta pozycja jest krokiem do twojego celu
   - Pokazuje commitment (nie "springboard")

3. WIN-WIN:
   - Twój rozwój = wartość dla firmy
   - Nie brzmi jak "wykorzystam was i odejdę"

Struktura odpowiedzi:
1. Krótkoterminowo (1-2 lata): opanować [X], wnieść [Y]
2. Średnio-terminowo (3-4 lata): rozwinąć się w [kierunek], wziąć więcej odpowiedzialności
3. Długoterminowo (5+ lat): [ambicja] ale z elastycznością

Przykłady:
- Dla IC (individual contributor): ścieżka eksperta
- Dla managera: leadership & team building
- Dla career changer: specialist w nowej dziedzinie

Red flags do unikania:
✗ "Nie wiem" / "Na twojej pozycji"
✗ Za konkretne (może się zmienić)
✗ Niezwiązane z firmą

Długość: 1-1.5 minuty mówienia.`
        }
      ]
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('✅ Prompt skopiowany!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'Intermediate':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'Advanced':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20';
    }
  };

  return (
    <>
      <Helmet>
        <title>FOMO.jobprompts - 31 gotowych promptów AI do kariery | FOMOjobs</title>
        <meta
          name="description"
          content="Kompletna biblioteka promptów AI do poszukiwania pracy: CV, LinkedIn, listy motywacyjne, rozmowy kwalifikacyjne, networking i rozwój kariery."
        />
        <meta name="keywords" content="prompty AI, CV, list motywacyjny, rozmowa kwalifikacyjna, LinkedIn, networking, rozwój kariery" />
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
                31 profesjonalnych promptów AI do każdego etapu poszukiwania pracy
              </p>
              <p className="text-lg opacity-80 max-w-3xl mx-auto">
                Od CV i LinkedIn, przez rozmowy kwalifikacyjne, po networking i rozwój kariery. Gotowe do skopiowania i użycia w ChatGPT, Claude lub innym AI.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Categories with Accordion */}
        <div className="container mx-auto px-4 py-12">
          <Accordion type="single" collapsible className="space-y-6">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <AccordionItem
                  value={category.id}
                  className="border-2 border-border rounded-lg bg-card shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                    <div className="flex items-center gap-4 w-full">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.prompts.length} promptów
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid gap-4 mt-4">
                      {category.prompts.map((prompt) => (
                        <Card
                          key={prompt.id}
                          className="border-l-4 border-l-primary/50 hover:border-l-primary transition-all hover:shadow-md"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <CardTitle className="text-lg mb-1">{prompt.title}</CardTitle>
                                <CardDescription>{prompt.description}</CardDescription>
                              </div>
                              <Badge className={`${getLevelColor(prompt.level)} border`}>
                                {prompt.level}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Button
                              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                              onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
                            >
                              {copiedId === prompt.id ? (
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
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

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
                    <h4 className="font-semibold mb-1">Wybierz kategorię i prompt</h4>
                    <p className="text-muted-foreground">Rozwiń kategorię i znajdź prompt dopasowany do twojej sytuacji</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Skopiuj i uzupełnij</h4>
                    <p className="text-muted-foreground">Kliknij "Kopiuj prompt" i zastąp [PLACEHOLDERY] swoimi danymi</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Wklej do AI</h4>
                    <p className="text-muted-foreground">Użyj w ChatGPT, Claude lub innym AI - dostosuj wynik do swoich potrzeb</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Iteruj i personalizuj</h4>
                    <p className="text-muted-foreground">AI może generować różne wersje - eksperymentuj i wybierz najlepszą</p>
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
