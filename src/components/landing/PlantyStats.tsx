import { motion } from "framer-motion";
import { Users, MapPin, Award } from "lucide-react";
import { useEffect, useState } from "react";

const AnimatedCounter = ({
  end,
  decimals = 0,
  suffix = "",
  duration = 2000
}: {
  end: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentCount = end * easeOutQuart;

      setCount(currentCount);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
};

const PlantyStats = () => {
  return (
    <section id="stats" className="py-20 bg-gradient-card dark:bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Wolontariat w liczbach
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Zobacz jak wiele możesz zyskać angażując się w wolontariat w Krakowie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8 rounded-xl text-center hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-primary">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-foreground text-3xl lg:text-4xl font-bold mb-3">
              <AnimatedCounter end={200} suffix="+" />
            </h3>
            <p className="text-muted-foreground">
              Aktywnych wolontariuszy w programie
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8 rounded-xl text-center hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center mx-auto mb-4 shadow-secondary">
              <MapPin className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h3 className="text-foreground text-3xl lg:text-4xl font-bold mb-3">
              <AnimatedCounter end={50} suffix="+" />
            </h3>
            <p className="text-muted-foreground">
              Aktywnych projektów wolontariatu
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8 rounded-xl text-center hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-primary">
              <Award className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-foreground text-3xl lg:text-4xl font-bold mb-3">
              <AnimatedCounter end={500} suffix="+" />
            </h3>
            <p className="text-muted-foreground">
              Certyfikatów wydanych wolontariuszom
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlantyStats;
