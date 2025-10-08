export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentSection[];
  date: string;
  author: string;
  category: string;
  imageUrl?: string;
  readTime: string;
}

export interface ContentSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'quote' | 'table' | 'stats' | 'chart' | 'icon-list';
  content?: string;
  items?: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  statsData?: {
    value: string;
    label: string;
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Dlaczego 80% ofert pracy nigdy nie trafia na portale?',
    slug: 'ukryty-rynek-pracy',
    excerpt: 'o ukrytym rynku pracy, poleceniach i jak złapać robotę zanim pojawi się na Pracuj.pl. (Tu świetnie pasuje FOMOjobs – bo łapie oferty szybciej i dopasowuje alerty).',
    category: 'Rynek pracy',
    readTime: '5 min',
    date: '2025-01-15',
    author: 'FOMOjobs Team',
    content: [
      {
        type: 'paragraph',
        content: 'Czy wiedziałeś, że 80% ofert pracy nigdy nie trafia na popularne portale jak Pracuj.pl czy LinkedIn? To zjawisko nazywane jest "ukrytym rynkiem pracy" i jest głównym powodem, dla którego wielu świetnych kandydatów mija się z wymarzonymi ofertami.'
      },
      {
        type: 'stats',
        statsData: [
          { value: '80%', label: 'Ofert nigdy nie trafia na portale' },
          { value: '70%', label: 'Stanowisk obsadzanych przez polecenia' },
          { value: '48h', label: 'Średni czas reakcji na świeżą ofertę' }
        ]
      },
      {
        type: 'heading',
        content: 'Ukryty rynek pracy – co to właściwie jest?'
      },
      {
        type: 'paragraph',
        content: 'Ukryty rynek pracy to wszystkie te oferty, które nigdy nie są publicznie ogłaszane. Firmy preferują rekrutację wewnętrzną, polecenia pracowników lub bezpośredni kontakt z kandydatami. Dlaczego? Bo to szybsze, tańsze i często skuteczniejsze.'
      },
      {
        type: 'subheading',
        content: 'Dlaczego firmy unikają publicznych ogłoszeń?'
      },
      {
        type: 'list',
        items: [
          'Oszczędność czasu – rekruter nie musi przebrnąć przez setki CV',
          'Wyższa jakość kandydatów – polecenia często trafiają',
          'Niższe koszty – brak opłat za ogłoszenie',
          'Dyskrecja – czasem firma nie chce, żeby konkurencja wiedziała o nowym projekcie'
        ]
      },
      {
        type: 'heading',
        content: 'Jak złapać robotę zanim trafi na Pracuj.pl?'
      },
      {
        type: 'icon-list',
        items: [
          'Buduj sieć kontaktów – LinkedIn to must-have',
          'Bądź aktywny w branżowych grupach i eventach',
          'Obserwuj firmy, które Cię interesują',
          'Aplikuj proaktywnie – nie czekaj na ogłoszenie',
          'Użyj FOMOjobs – łapiemy oferty szybciej niż portale!'
        ]
      },
      {
        type: 'heading',
        content: 'FOMOjobs – Twoja przewaga na rynku pracy'
      },
      {
        type: 'paragraph',
        content: 'FOMOjobs to platforma stworzona właśnie po to, żebyś nie przegapił świeżych ofert. Nasze inteligentne alerty monitorują rynek 24/7 i informują Cię o nowych okazjach, zanim trafią na główne portale.'
      },
      {
        type: 'quote',
        content: 'Nie czekaj, aż oferta trafi na Pracuj.pl. Z FOMOjobs jesteś pierwszy w kolejce.'
      },
      {
        type: 'table',
        tableData: {
          headers: ['Metoda', 'Czas reakcji', 'Skuteczność'],
          rows: [
            ['Tradycyjne portale', '3-7 dni', 'Niska (duża konkurencja)'],
            ['Polecenia', 'Natychmiastowa', 'Wysoka'],
            ['FOMOjobs', '0-24h', 'Bardzo wysoka']
          ]
        }
      }
    ]
  },
  {
    id: '2',
    title: 'Jak rozpoznać dobre ogłoszenie od ściemy?',
    slug: 'dobre-ogloszenie-vs-sciema',
    excerpt: 'analiza: widełki vs. brak widełek, "dynamiczny zespół" vs. realne benefity, 17 punktów w wymaganiach vs. 2 faktyczne must-have.',
    category: 'Porady',
    readTime: '7 min',
    date: '2025-01-10',
    author: 'FOMOjobs Team',
    content: [
      {
        type: 'paragraph',
        content: 'Scrollujesz ogłoszenia i widzisz: "Szukamy rockstara do dynamicznego zespołu! Oferujemy owoce i kawę!" Red flag czy może normalna oferta? Nauczmy się rozpoznawać dobre ogłoszenia od ściemy.'
      },
      {
        type: 'heading',
        content: 'Widełki wynagrodzenia – litmus test poważności'
      },
      {
        type: 'paragraph',
        content: 'Jeśli w ogłoszeniu nie ma widełek, to znaczy jedno z dwóch: albo firma nie wie, ile chce płacić (słaby sign), albo chce płacić jak najmniej (jeszcze gorszy sign).'
      },
      {
        type: 'table',
        tableData: {
          headers: ['Czerwona flaga', 'Zielona flaga'],
          rows: [
            ['Brak widełek', 'Konkretne widełki (8k-12k PLN)'],
            ['"Wynagrodzenie do uzgodnienia"', 'Transparentne zakresy'],
            ['"Atrakcyjne wynagrodzenie"', 'Bonusy i benefity opisane szczegółowo']
          ]
        }
      },
      {
        type: 'heading',
        content: '"Dynamiczny zespół" vs. realne benefity'
      },
      {
        type: 'subheading',
        content: 'Buzzwordy, które nic nie znaczą:'
      },
      {
        type: 'list',
        items: [
          '"Dynamiczny zespół" – co to w ogóle znaczy?',
          '"Młody, energiczny team" – czyli nadgodziny bez zapłaty?',
          '"Startup atmosphere" – czyli chaos organizacyjny?',
          '"Pracujemy ciężko, bawimy się jeszcze ciężej" – czyli wypalenie zawodowe?'
        ]
      },
      {
        type: 'subheading',
        content: 'Realne benefity, na które warto zwrócić uwagę:'
      },
      {
        type: 'icon-list',
        items: [
          'Prywatna opieka medyczna (z pakietem rodzinnym)',
          'Karta sportowa lub dofinansowanie sportu',
          'Budżet szkoleniowy (konkretna kwota)',
          'Praca zdalna / hybrid (ile dni?)',
          'Elastyczne godziny pracy',
          'Płatne dni wolne na urodziny, itd.'
        ]
      },
      {
        type: 'heading',
        content: '17 punktów wymagań vs. 2 must-have'
      },
      {
        type: 'paragraph',
        content: 'Widziałeś kiedyś ogłoszenie na Junior Dev z wymaganiami jak na Seniora? To klasyka. Firmy często wrzucają "wishlistę" zamiast realnych wymagań.'
      },
      {
        type: 'quote',
        content: 'Jeśli ogłoszenie ma 15+ wymagań, aplikuj jeśli spełniasz 60%. Firmy często szukają jednorożców, a kończą na normalnych ludziach (i to dobrze!).'
      },
      {
        type: 'heading',
        content: 'Jak rozpoznać dobre ogłoszenie?'
      },
      {
        type: 'icon-list',
        items: [
          'Konkretne widełki wynagrodzenia',
          'Realne benefity (nie tylko owoce)',
          'Jasne wymagania (2-5 must-have)',
          'Opis firmy i projektu (nie tylko buzzwordy)',
          'Informacja o procesie rekrutacji (ile etapów?)'
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Pokrewne stanowiska – czyli jak nie zamykać sobie drzwi',
    slug: 'pokrewne-stanowiska',
    excerpt: 'wyjaśnienie, że HR Admin ≠ tylko HR Admin, ale też HR Generalist, People Specialist, Talent Coordinator itd. (Dokładnie to, co robi FOMOjobs – uczy myśleć szerzej).',
    category: 'Kariera',
    readTime: '6 min',
    date: '2025-01-05',
    author: 'FOMOjobs Team',
    content: [
      {
        type: 'paragraph',
        content: 'Szukasz pracy jako "HR Admin", ale nie znajdujesz nic ciekawego? Problem może nie leżeć w braku ofert, ale w tym, że szukasz zbyt wąsko. HR Admin to nie tylko HR Admin – to także HR Generalist, People Specialist, Talent Coordinator i kilkanaście innych nazw!'
      },
      {
        type: 'heading',
        content: 'Dlaczego jedno stanowisko ma 10 nazw?'
      },
      {
        type: 'paragraph',
        content: 'Firmy uwielbiają wymyślać własne nazwy stanowisk. To samo stanowisko może się nazywać: HR Admin, HR Generalist, People Operations Specialist, Talent Coordinator, lub nawet "Happiness Manager" (serio!).'
      },
      {
        type: 'stats',
        statsData: [
          { value: '73%', label: 'Firm używa własnych nazw stanowisk' },
          { value: '5x', label: 'Więcej ofert znajdziesz szukając szerzej' },
          { value: '12', label: 'Średnia liczba synonimów na stanowisko' }
        ]
      },
      {
        type: 'heading',
        content: 'Przykłady pokrewnych stanowisk'
      },
      {
        type: 'table',
        tableData: {
          headers: ['Szukasz...', 'Sprawdź też...'],
          rows: [
            ['HR Admin', 'HR Generalist, People Specialist, Talent Coordinator, HR Operations'],
            ['Frontend Dev', 'UI Developer, JavaScript Developer, React Developer, Web Developer'],
            ['Marketing Specialist', 'Digital Marketer, Growth Hacker, Marketing Coordinator, Brand Specialist'],
            ['Project Manager', 'Product Owner, Scrum Master, Delivery Manager, Program Manager']
          ]
        }
      },
      {
        type: 'heading',
        content: 'FOMOjobs – automatycznie znajduje pokrewne stanowiska'
      },
      {
        type: 'paragraph',
        content: 'Nie musisz ręcznie szukać wszystkich synonimów. FOMOjobs automatycznie znajduje pokrewne stanowiska i sugeruje Ci oferty, których byś sam nie znalazł.'
      },
      {
        type: 'icon-list',
        items: [
          'Inteligentne dopasowanie – nie tylko dokładna nazwa',
          'Automatyczne alerty na pokrewne stanowiska',
          'Analiza opisu stanowiska (nie tylko tytułu)',
          'Sugestie stanowisk, o których nie pomyślałeś'
        ]
      },
      {
        type: 'quote',
        content: 'Nie zamykaj się w jednej nazwie stanowiska. Myśl szeroko, aplikuj odważnie. FOMOjobs pomoże Ci znaleźć oferty, których inni nie widzą.'
      }
    ]
  },
  {
    id: '4',
    title: 'Czy AI zabierze Ci CV?',
    slug: 'ai-zabierze-cv',
    excerpt: 'ATS-y, automatyczna selekcja CV, jak napisać aplikację, żeby przeszła pierwsze sito. (Tu można wpleść mema: "Nie, Janusz, AI nie ukradło Ci roboty, tylko Twoje CV było w Comic Sans").',
    category: 'Technologia',
    readTime: '8 min',
    date: '2024-12-28',
    author: 'FOMOjobs Team',
    content: [
      {
        type: 'paragraph',
        content: 'Wysłałeś 50 CV i ani jedno echo? Spokojnie, nie jesteś sam. Problem często nie leży w Twoich kompetencjach, ale w tym, że Twoje CV nie przeszło przez ATS (Applicant Tracking System) – robota, który czyta CV zanim dotrze do człowieka.'
      },
      {
        type: 'heading',
        content: 'Co to jest ATS i dlaczego odrzuca Twoje CV?'
      },
      {
        type: 'paragraph',
        content: 'ATS to system, który automatycznie skanuje CV i szuka słów kluczowych z ogłoszenia. Jeśli ich nie ma – ląduje w koszu. Nie ma znaczenia, że jesteś świetnym specjalistą. ATS tego nie widzi.'
      },
      {
        type: 'stats',
        statsData: [
          { value: '75%', label: 'CV odrzucanych przez ATS' },
          { value: '6 sek', label: 'Średni czas przeglądu CV przez rekrutera' },
          { value: '98%', label: 'Fortune 500 firm używa ATS' }
        ]
      },
      {
        type: 'heading',
        content: 'Jak napisać CV, żeby przeszło przez ATS?'
      },
      {
        type: 'icon-list',
        items: [
          'Używaj słów kluczowych z ogłoszenia (dosłownie kopiuj!)',
          'Unikaj tabel, grafik i fancy fontów',
          'Nazywaj sekcje standardowo (Doświadczenie, nie "Moja Droga Zawodowa")',
          'Zapisz CV jako .docx lub .pdf (NIE jako obrazek)',
          'Nie używaj nagłówków/stopek – ATS ich nie czyta'
        ]
      },
      {
        type: 'heading',
        content: 'Najczęstsze błędy, które zabijają CV w ATS'
      },
      {
        type: 'table',
        tableData: {
          headers: ['Błąd', 'Dlaczego to źle?', 'Co zrobić?'],
          rows: [
            ['CV w Comic Sans', 'ATS nie czyta fontów dekoracyjnych', 'Arial, Calibri, Times New Roman'],
            ['Brak słów kluczowych', 'ATS nie wie, że pasujesz', 'Kopiuj słowa z ogłoszenia'],
            ['CV jako obrazek', 'ATS nie skanuje obrazków', 'Tylko .docx lub .pdf z tekstem'],
            ['Fancy layout', 'ATS gubi się w tabellach', 'Prosty, jednopolowy layout']
          ]
        }
      },
      {
        type: 'heading',
        content: 'FOMOjobs – CV Creator dopasowane do ATS'
      },
      {
        type: 'paragraph',
        content: 'Nie musisz być ekspertem od ATS. FOMOjobs ma wbudowany CV Creator, który automatycznie optymalizuje Twoje CV pod ATS. Wystarczy, że wypełnisz pola – resztę zrobi za Ciebie.'
      },
      {
        type: 'quote',
        content: 'Nie, Janusz, AI nie ukradło Ci roboty. Twoje CV było w Comic Sans i lądowało w koszu zanim ktokolwiek je zobaczył.'
      }
    ]
  },
  {
    id: '5',
    title: 'Plan B, C i D – jak szukać pracy bez wypalenia',
    slug: 'szukanie-pracy-bez-wypalenia',
    excerpt: 'strategie, żeby się nie zajechać: ustalanie limitu aplikacji dziennie, networking zamiast tylko scrollowania, traktowanie szukania pracy jak mini-projektu.',
    category: 'Wellbeing',
    readTime: '10 min',
    date: '2024-12-20',
    author: 'FOMOjobs Team',
    content: [
      {
        type: 'paragraph',
        content: 'Szukanie pracy to maraton, nie sprint. Jeśli wysyłasz po 20 CV dziennie i dostajesz same odmowy, to normalka. Ale jeśli robisz to przez miesiące bez przerwy – to prosta droga do wypalenia. Czas na Plan B, C i D.'
      },
      {
        type: 'heading',
        content: 'Dlaczego wypalenie w poszukiwaniu pracy to realny problem?'
      },
      {
        type: 'paragraph',
        content: 'Szukanie pracy to emocjonalna huśtawka: nadzieja przy wysyłaniu CV, stres przy oczekiwaniu na odpowiedź, rozczarowanie przy odrzuceniu. Powtórz to 100 razy i masz przepis na wypalenie.'
      },
      {
        type: 'stats',
        statsData: [
          { value: '68%', label: 'Osób zgłasza stres podczas poszukiwania pracy' },
          { value: '52%', label: 'Czuje się wypalonych po 3 miesiącach szukania' },
          { value: '3 mies.', label: 'Średni czas znalezienia pracy w Polsce' }
        ]
      },
      {
        type: 'heading',
        content: 'Strategia 1: Ustal limit aplikacji dziennie'
      },
      {
        type: 'paragraph',
        content: 'Nie wysyłaj 50 CV dziennie. Wyślij 5 dobrych. Lepiej poświęcić czas na personalizację CV i listu motywacyjnego niż masowo spamować rekruterów.'
      },
      {
        type: 'icon-list',
        items: [
          '5 aplikacji dziennie = 100 miesięcznie (to więcej niż wystarczy)',
          'Personalizuj każde CV pod ogłoszenie',
          'Śledź swoje aplikacje w Job Trackerze',
          'Ustal dni bez aplikacji (np. weekendy)'
        ]
      },
      {
        type: 'heading',
        content: 'Strategia 2: Networking zamiast tylko scrollowania'
      },
      {
        type: 'paragraph',
        content: 'Większość ofert nie trafia na portale. Networking to klucz do ukrytego rynku pracy. Ale networking ≠ spamowanie ludzi na LinkedIn.'
      },
      {
        type: 'table',
        tableData: {
          headers: ['Źle', 'Dobrze'],
          rows: [
            ['Masowe wiadomości "Cześć, szukam pracy"', 'Personalizowana wiadomość o konkretnym temacie'],
            ['Proszenie o pracę przy pierwszym kontakcie', 'Budowanie relacji → pytanie o branżę → networking'],
            ['Dodawanie rekruterów bez kontekstu', 'Dodawanie po wspólnym wydarzeniu/webinarze']
          ]
        }
      },
      {
        type: 'heading',
        content: 'Strategia 3: Traktuj szukanie pracy jak mini-projekt'
      },
      {
        type: 'paragraph',
        content: 'Ustaw cele, śledź postępy, celebruj małe wygrane. FOMOjobs ma wbudowany Job Tracker, który pomaga Ci organizować aplikacje i widzieć progress.'
      },
      {
        type: 'icon-list',
        items: [
          'Kanban board: Zainteresowane → Aplikacja → Rozmowa → Oferta',
          'Śledź statystyki (ile aplikacji, ile rozmów, conversion rate)',
          'Celebruj milestone\'y (np. 10 wysłanych CV = nagroda)',
          'Refleksja co tydzień: co działa, co nie?'
        ]
      },
      {
        type: 'quote',
        content: 'Szukanie pracy to maraton. Nie sprintujesz przez cały dystans. Ustal tempo, dbaj o siebie i pamiętaj – jedno dobre dopasowanie jest lepsze niż 100 przypadkowych aplikacji.'
      }
    ]
  }
];
