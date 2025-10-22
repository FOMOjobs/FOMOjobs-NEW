📊 FOMOjobs – Podsumowanie Strategiczne
🎯 Czym Jest FOMOjobs
Osobisty asystent dla kandydatów, nie kolejny job board. Platforma agregująca oferty pracy ze stron karier firm, wysyłająca spersonalizowane alerty emailowe — oszczędzająca czas, eliminująca FOMO, automatyczna.

🚀 Tech Stack (Wnioskowanie Techniczne)
Na podstawie opisu funkcjonalności zakładam:

Frontend: React/Vue + Tailwind CSS (proste, responsywne alerty emailowe)
Backend: Node.js/Python (agregacja danych, scraping, scheduling alertów)
Baza danych: PostgreSQL lub MongoDB (profile użytkowników, alerty, history ofert)
Email infrastructure: SendGrid/Brevo (masowe wysyłki, deliverability)
(USUNIĘTE) Highly confidential magic technology
State Management: Redux/Zustand (tracking alertów, preferencji, dopasowań)
Hosting: AWS/Google Cloud (skalowanie dla wzrostu użytkowników)

Kluczowe wyzwanie techniczne: Scraping musi być niezawodny, bo nawet 5% opuszczonych ofert = user churn.

🏗️ Struktura Projektu
src/
├── components/           # UI alertów, dashboard alertów, settings
├── pages/               # Landing, Dashboard, Settings, Pricing
├── services/            # Job scraping, email dispatch, algorithm matching
├── stores/              # User preferences, alert states, billing
├── hooks/               # Custom hooks dla alert management
├── lib/                 # Semantic matching algorithm, filtering logic
└── assets/              # Brand assets (casual, young tone)

💼 Brand Identity

Nazwa: FOMOjobs (Fear Of Missing Out + Jobs)
Ton: Młody, lekko żartobliwy, przyjazny, anty-korpo
Positioning: "Twój osobisty asystent w job search" — nie portal
Przewaga: Scraping bezpośrednio ze stron firm (prawdziwe oferty) vs. płatne wrzutki konkurencji
Model: Zarabiamy na kandydatach (freemium subskrypcja), nie pracodawcach
