import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import FOMOJobsPageLayout from '@/components/FOMOJobsPageLayout';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Polityka Prywatności - FOMOjobs</title>
        <meta name="description" content="Polityka prywatności FOMOjobs - dowiedz się jak chronimy Twoje dane" />
      </Helmet>

      <FOMOJobsPageLayout>
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Powrót do strony głównej
            </Link>

            <h1 className="text-4xl font-bold mb-8">Polityka Prywatności</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">Ostatnia aktualizacja: 08 stycznia 2025</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Wprowadzenie</h2>
              <p className="text-muted-foreground mb-4">
                W FOMOjobs ("my", "nas", "nasz") szanujemy Twoją prywatność i zobowiązujemy się do ochrony Twoich danych osobowych.
                Niniejsza Polityka Prywatności wyjaśnia, jak gromadzimy, wykorzystujemy i chronimy Twoje informacje podczas korzystania
                z naszej strony internetowej lub usług.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Jakie dane zbieramy</h2>
              <p className="text-muted-foreground mb-4">
                Możemy zbierać dane osobowe, które dobrowolnie nam przekazujesz, gdy:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Rejestrujesz konto na FOMOjobs</li>
                <li>Zapisujesz się na alerty o nowych ofertach pracy</li>
                <li>Korzystasz z naszych narzędzi (CV Creator, Job Tracker, Interview Coach)</li>
                <li>Kontaktujesz się z naszym zespołem wsparcia</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Dane mogą obejmować: imię, nazwisko, adres e-mail, numer telefonu, CV, preferowane stanowiska, lokalizację, oraz inne informacje zawodowe.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Jak wykorzystujemy Twoje dane</h2>
              <p className="text-muted-foreground mb-4">
                Wykorzystujemy zebrane dane w następujących celach:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Świadczenie i utrzymanie naszych usług</li>
                <li>Dopasowywanie ofert pracy do Twoich preferencji</li>
                <li>Wysyłanie alertów o nowych ofertach pracy</li>
                <li>Personalizacja doświadczenia użytkownika</li>
                <li>Komunikacja z Tobą dotycząca usług, aktualizacji i wsparcia</li>
                <li>Analiza i ulepszanie naszych usług</li>
                <li>Zapobieganie oszustwom i zapewnienie bezpieczeństwa</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Pliki Cookie</h2>
              <p className="text-muted-foreground mb-4">
                Używamy plików cookie i podobnych technologii śledzących do monitorowania aktywności na naszej stronie.
                Pliki cookie to małe pliki danych przechowywane w przeglądarce. Możesz skonfigurować przeglądarkę,
                aby odrzucała wszystkie pliki cookie lub informowała o ich wysyłaniu.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Udostępnianie danych</h2>
              <p className="text-muted-foreground mb-4">
                Nie sprzedajemy Twoich danych osobowych. Możemy udostępniać dane tylko w następujących przypadkach:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Z Twoją wyraźną zgodą</li>
                <li>Dostawcom usług, którzy pomagają nam świadczyć nasze usługi</li>
                <li>Gdy jest to wymagane przez prawo</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Przechowywanie danych</h2>
              <p className="text-muted-foreground mb-4">
                Przechowujemy Twoje dane osobowe tylko przez okres niezbędny do realizacji celów określonych w niniejszej Polityce Prywatności.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Bezpieczeństwo</h2>
              <p className="text-muted-foreground mb-4">
                Bezpieczeństwo Twoich danych jest dla nas ważne. Stosujemy odpowiednie środki techniczne i organizacyjne
                w celu ochrony Twoich danych osobowych. Jednak żadna metoda transmisji przez Internet lub elektronicznego
                przechowywania nie jest w 100% bezpieczna.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Twoje prawa</h2>
              <p className="text-muted-foreground mb-4">
                Masz prawo do:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Dostępu do swoich danych osobowych</li>
                <li>Poprawiania nieprawidłowych danych</li>
                <li>Usunięcia swoich danych ("prawo do bycia zapomnianym")</li>
                <li>Ograniczenia przetwarzania danych</li>
                <li>Przenoszenia danych</li>
                <li>Sprzeciwu wobec przetwarzania danych</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Zmiany w Polityce Prywatności</h2>
              <p className="text-muted-foreground mb-4">
                Możemy okresowo aktualizować naszą Politykę Prywatności. Powiadomimy Cię o wszelkich zmianach,
                publikując nową Politykę Prywatności na tej stronie.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Kontakt</h2>
              <p className="text-muted-foreground mb-4">
                Jeśli masz pytania dotyczące niniejszej Polityki Prywatności, skontaktuj się z nami pod adresem: kontakt@fomojobs.pl
              </p>
            </div>
          </div>
        </section>
      </FOMOJobsPageLayout>
    </>
  );
};

export default PrivacyPolicy;
