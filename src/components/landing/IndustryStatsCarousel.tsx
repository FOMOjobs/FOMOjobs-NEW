// src/components/landing/IndustryStatsCarousel.tsx

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const INDUSTRY_STATS = [
  {
    icon: "👔",
    name: "HR",
    jobs: 67,
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: "💻",
    name: "IT",
    jobs: 89,
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: "💰",
    name: "Finanse, księgowość, rachunkowość",
    jobs: 54,
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: "📋",
    name: "Administracja i biuro",
    jobs: 43,
    color: "from-gray-500 to-gray-600"
  },
  {
    icon: "📊",
    name: "Project Management i strategia",
    jobs: 51,
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: "📢",
    name: "Marketing i komunikacja",
    jobs: 62,
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: "🤝",
    name: "Obsługa klienta i sprzedaż",
    jobs: 78,
    color: "from-orange-500 to-red-500"
  },
  {
    icon: "🚚",
    name: "Logistyka i łańcuch dostaw",
    jobs: 56,
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: "⚙️",
    name: "Inżynieria i produkcja",
    jobs: 71,
    color: "from-slate-600 to-slate-700"
  },
  {
    icon: "📚",
    name: "Edukacja i rozwój",
    jobs: 48,
    color: "from-teal-500 to-teal-600"
  },
  {
    icon: "⚖️",
    name: "Prawo",
    jobs: 42,
    color: "from-zinc-600 to-zinc-700"
  },
  {
    icon: "🏠",
    name: "Nieruchomości",
    jobs: 39,
    color: "from-lime-600 to-lime-700"
  },
  {
    icon: "🛡️",
    name: "Ubezpieczenia",
    jobs: 45,
    color: "from-sky-500 to-sky-600"
  },
  {
    icon: "💚",
    name: "Zdrowie i lifestyle",
    jobs: 53,
    color: "from-emerald-500 to-green-600"
  },
]

export const IndustryStatsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 5

  const next = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= INDUSTRY_STATS.length ? 0 : prev + itemsPerPage
    )
  }

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? INDUSTRY_STATS.length - itemsPerPage : prev - itemsPerPage
    )
  }

  const visibleStats = INDUSTRY_STATS.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 contrast-more:text-black dark:contrast-more:text-white">
            📈 Aktualne oferty pracy w naszej bazie
          </h2>
          <p className="text-lg text-muted-foreground contrast-more:text-black dark:contrast-more:text-white max-w-2xl mx-auto">
            Zobacz ile ofert czeka na Ciebie w każdej branży — aktualizacja codziennie
          </p>
          <Badge variant="secondary" className="mt-4">
            Aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </Badge>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {visibleStats.map((stat, idx) => (
              <Card
                key={idx}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    {/* Icon with gradient */}
                    <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>

                    {/* Industry name */}
                    <h3 className="font-semibold text-sm contrast-more:text-black dark:contrast-more:text-white min-h-[40px] flex items-center justify-center">
                      {stat.name}
                    </h3>

                    {/* Job count */}
                    <div className="text-3xl font-bold contrast-more:text-black dark:contrast-more:text-white">
                      {stat.jobs}
                    </div>
                    <p className="text-xs text-muted-foreground contrast-more:text-gray-700 dark:contrast-more:text-gray-300">
                      aktywnych ofert
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(INDUSTRY_STATS.length / itemsPerPage) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx * itemsPerPage)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / itemsPerPage) === idx
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/20'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <a href="/register">
                Zacznij dostawać alerty z tych branż
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
