import { motion } from 'framer-motion'
import { Heart, Target, Users } from 'lucide-react'

const FOMOJobsAbout = () => {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6 pb-2 overflow-visible">
            Poznaj FOMOjobs
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Łączymy talenty z najlepszymi pracodawcami
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-primary">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Nasza Misja</h3>
                <p className="text-muted-foreground leading-relaxed">
                  <span className="text-primary font-semibold">FOMOjobs</span> to platforma pomagająca znaleźć wymarzoną pracę szybciej niż tradycyjne portale.
                  Agregujemy oferty z wielu źródeł i dostarczamy narzędzia do skutecznego zarządzania procesem rekrutacji.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center flex-shrink-0 shadow-secondary">
                <Users className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Dla Kogo?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Platforma jest skierowana do młodzieży w wieku 13-30 lat, która chce rozwijać swoje umiejętności,
                  poznawać nowych ludzi i tworzyć pozytywne zmiany w Krakowie.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-primary">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Nasz Cel</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Chcemy ułatwić dostęp do możliwości wolontariatu, dostarczając przejrzystą platformę,
                  gdzie każdy może znaleźć projekt dopasowany do swoich zainteresowań i dostępności.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-glow border border-border bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center shadow-glow">
                  <Heart className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Razem Zmieniamy Kraków
                </h3>
                <p className="text-muted-foreground">
                  Dołącz do społeczności ponad 200 aktywnych wolontariuszy
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FOMOJobsAbout;
