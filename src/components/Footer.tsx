import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const watermarkX = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <footer ref={ref} className="relative border-t border-border py-12 px-6 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ x: reduce ? 0 : watermarkX, willChange: "transform" }}
      >
        <span className="text-[12rem] md:text-[18rem] font-display font-bold text-foreground/[0.03] leading-none">
          ATHARVA
        </span>
      </motion.div>

      <div className="relative max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 text-sm font-body">
          © {new Date().getFullYear()} Atharva Purvat. Built with precision.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Sys-Atharva"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-crimson transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/atharva-purvat-86030b305/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-crimson transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
