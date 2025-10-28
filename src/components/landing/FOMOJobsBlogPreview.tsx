import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'

const blogPosts = [
  {
    title: "Dlaczego 80% ofert pracy nigdy nie trafia na portale?",
    description: "o ukrytym rynku pracy, poleceniach i jak złapać robotę zanim pojawi się na Pracuj.pl. (Tu świetnie pasuje FOMOjobs – bo łapie oferty szybciej i dopasowuje alerty).",
    category: "Rynek pracy",
    readTime: "5 min",
    slug: "ukryty-rynek-pracy"
  },
  {
    title: "Jak rozpoznać dobre ogłoszenie od ściemy?",
    description: 'analiza: widełki vs. brak widełek, "dynamiczny zespół" vs. realne benefity, 17 punktów w wymaganiach vs. 2 faktyczne must-have.',
    category: "Porady",
    readTime: "7 min",
    slug: "dobre-ogloszenie-vs-sciema"
  },
  {
    title: "Pokrewne stanowiska – czyli jak nie zamykać sobie drzwi",
    description: "wyjaśnienie, że HR Admin ≠ tylko HR Admin, ale też HR Generalist, People Specialist, Talent Coordinator itd. (Dokładnie to, co robi FOMOjobs – uczy myśleć szerzej).",
    category: "Kariera",
    readTime: "6 min",
    slug: "pokrewne-stanowiska"
  },
  {
    title: "Czy AI zabierze Ci CV?",
    description: 'ATS-y, automatyczna selekcja CV, jak napisać aplikację, żeby przeszła pierwsze sito. (Tu można wpleść mema: "Nie, Janusz, AI nie ukradło Ci roboty, tylko Twoje CV było w Comic Sans").',
    category: "Technologia",
    readTime: "8 min",
    slug: "ai-zabierze-cv"
  },
  {
    title: "Plan B, C i D – jak szukać pracy bez wypalenia",
    description: "strategie, żeby się nie zajechać: ustalanie limitu aplikacji dziennie, networking zamiast tylko scrollowania, traktowanie szukania pracy jak mini-projektu.",
    category: "Wellbeing",
    readTime: "10 min",
    slug: "szukanie-pracy-bez-wypalenia"
  }
];

const FOMOJobsBlogPreview = () => {
  return (
    <section id="blog" className="py-20 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen size={24} className="text-primary" />
            <span className="text-primary font-semibold">Nasz Blog</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Przydatne porady o poszukiwaniu pracy
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Odkryj najważniejsze trendy, strategie i praktyczne wskazówki, które pomogą Ci znaleźć idealną pracę
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.slice(0, 6).map((post, index) => (
            <Link
              key={index}
              to={`/blog/${post.slug}`}
              className="block"
            >
              <article className="bg-card rounded-xl p-6 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group h-full border-0">
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-4 bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                    <BookOpen className="w-16 h-16 text-primary/40" />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  👉 {post.description}
                </p>

                <div className="flex items-center text-primary font-semibold text-sm group-hover:text-secondary transition-colors">
                  <span>Czytaj więcej</span>
                  <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold group"
            >
              Zobacz wszystkie artykuły
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FOMOJobsBlogPreview;
