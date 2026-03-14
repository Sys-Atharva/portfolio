import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-muted-foreground font-body text-sm tracking-[0.3em] uppercase mb-6"
        >
          Full-Stack Developer · ENTC Engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          Atharva{" "}
          <span className="text-gradient-blue">Purvat</span>
          <span className="text-primary">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-muted-foreground font-body text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Architecting the space between{" "}
          <span className="text-primary font-medium">Software Logic</span> and{" "}
          <span className="text-secondary font-medium">Signal Physics</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide hover:brightness-110 transition-all duration-200 flex items-center gap-2"
          >
            View Work
            <ArrowDown className="w-4 h-4" />
          </button>
          <a
            href="https://github.com/Sys-Atharva"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl glass-card border-border font-display font-semibold text-sm tracking-wide text-foreground hover:bg-muted/30 transition-all duration-200 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
