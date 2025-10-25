/**
 * Category Stats Component - Carousel Version
 * Przewijane kategorie z liczbą ofert (prawdziwe kategorie FOMOjobs)
 */

import { useEffect, useState } from 'react';
import { Briefcase, Users, Code, Calculator, FileText, Target, Megaphone, Phone, Truck, Wrench, GraduationCap, Scale, Home, ShieldCheck, HeartPulse, HardHat, ChevronLeft, ChevronRight } from 'lucide-react';

// Prawdziwe kategorie FOMOjobs
interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  icon: any;
  gradient: string;
}

const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'IT',
    slug: 'it',
    count: 1847,
    icon: Code,
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 2,
    name: 'HR',
    slug: 'hr',
    count: 423,
    icon: Users,
    gradient: 'from-teal-500 to-teal-600'
  },
  {
    id: 3,
    name: 'Finanse, księgowość, rachunkowość',
    slug: 'finance',
    count: 892,
    icon: Calculator,
    gradient: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 4,
    name: 'Administracja i biuro',
    slug: 'admin',
    count: 567,
    icon: FileText,
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 5,
    name: 'Project Management i strategia',
    slug: 'project-management',
    count: 634,
    icon: Target,
    gradient: 'from-green-500 to-green-600'
  },
  {
    id: 6,
    name: 'Marketing i komunikacja',
    slug: 'marketing',
    count: 478,
    icon: Megaphone,
    gradient: 'from-red-500 to-red-600'
  },
  {
    id: 7,
    name: 'Obsługa klienta i sprzedaż',
    slug: 'sales',
    count: 756,
    icon: Phone,
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    id: 8,
    name: 'Logistyka i łańcuch dostaw',
    slug: 'logistics',
    count: 389,
    icon: Truck,
    gradient: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 9,
    name: 'Inżynieria i produkcja',
    slug: 'engineering',
    count: 512,
    icon: Wrench,
    gradient: 'from-gray-500 to-gray-600'
  },
  {
    id: 10,
    name: 'Edukacja i rozwój',
    slug: 'education',
    count: 234,
    icon: GraduationCap,
    gradient: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 11,
    name: 'Prawo',
    slug: 'legal',
    count: 178,
    icon: Scale,
    gradient: 'from-slate-500 to-slate-600'
  },
  {
    id: 12,
    name: 'Nieruchomości',
    slug: 'real-estate',
    count: 267,
    icon: Home,
    gradient: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 13,
    name: 'Ubezpieczenia',
    slug: 'insurance',
    count: 145,
    icon: ShieldCheck,
    gradient: 'from-sky-500 to-sky-600'
  },
  {
    id: 14,
    name: 'Zdrowie i lifestyle',
    slug: 'health',
    count: 198,
    icon: HeartPulse,
    gradient: 'from-pink-500 to-pink-600'
  },
  {
    id: 15,
    name: 'Praca fizyczna i techniczna',
    slug: 'physical-work',
    count: 423,
    icon: HardHat,
    gradient: 'from-amber-500 to-amber-600'
  },
];

export function CategoryStats() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll co 3 sekundy (pauzuje na hover)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CATEGORIES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % CATEGORIES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + CATEGORIES.length) % CATEGORIES.length);
  };

  const totalOffers = CATEGORIES.reduce((sum, cat) => sum + cat.count, 0);

  // Pokazuj 3 karty naraz (current, prev, next)
  const getVisibleCategories = () => {
    const prev = CATEGORIES[(currentIndex - 1 + CATEGORIES.length) % CATEGORIES.length];
    const current = CATEGORIES[currentIndex];
    const next = CATEGORIES[(currentIndex + 1) % CATEGORIES.length];
    return [prev, current, next];
  };

  const visibleCategories = getVisibleCategories();
  const maxCount = Math.max(...CATEGORIES.map(c => c.count));

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white via-purple-50/20 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Oferty w naszej bazie
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Ponad <span className="font-bold text-purple-600">{totalOffers.toLocaleString('pl-PL')}</span> aktywnych ofert w {CATEGORIES.length} kategoriach
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 -ml-4 md:-ml-6 hover:scale-110"
            aria-label="Poprzednia kategoria"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 -mr-4 md:-mr-6 hover:scale-110"
            aria-label="Następna kategoria"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>

          {/* Cards Container */}
          <div className="flex items-center justify-center gap-4 md:gap-6 px-12 md:px-16">
            {visibleCategories.map((category, idx) => {
              const Icon = category.icon;
              const isCenter = idx === 1;

              return (
                <div
                  key={`${category.id}-${idx}`}
                  className={`
                    transition-all duration-500 ease-out
                    ${isCenter
                      ? 'scale-100 md:scale-110 opacity-100 z-10'
                      : 'scale-75 md:scale-90 opacity-30 md:opacity-40 hover:opacity-70'
                    }
                  `}
                  style={{
                    minWidth: '240px',
                    maxWidth: '320px',
                  }}
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-100">
                    {/* Icon with Gradient */}
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 md:mb-6 shadow-lg`}>
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>

                    {/* Category Name */}
                    <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 min-h-[3rem] md:min-h-[4rem] line-clamp-2">
                      {category.name}
                    </h3>

                    {/* Offer Count */}
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl md:text-5xl font-bold bg-gradient-to-br ${category.gradient} bg-clip-text text-transparent`}>
                        {category.count.toLocaleString('pl-PL')}
                      </span>
                      <span className="text-gray-500 text-base md:text-lg font-medium">
                        ofert
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 md:mt-6 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${category.gradient} rounded-full transition-all duration-1000`}
                        style={{ width: `${(category.count / maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {CATEGORIES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${currentIndex === idx
                    ? 'w-8 bg-gradient-to-r from-purple-600 to-pink-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }
                `}
                aria-label={`Przejdź do kategorii ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg px-4">
            Nie przegap żadnej oferty z interesującej Cię kategorii. <br className="hidden md:block" />
            <span className="font-semibold text-purple-600">Ustaw spersonalizowany alert i oszczędź czas!</span>
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            Stwórz darmowy alert →
          </button>
        </div>
      </div>
    </section>
  );
}
