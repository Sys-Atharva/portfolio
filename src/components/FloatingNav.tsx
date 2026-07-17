import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
const navItems = [
  { name: "Home", to: "/#home" },
  { name: "Work", to: "/#portfolio" },
  { name: "Projects", to: "/projects" },
  { name: "Contact", to: "/inquiry" },
];

const FloatingNav = () => {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut", delay: reduce ? 0 : 0.2 }}
      className="fixed inset-x-0 top-0 z-50 pointer-events-none"
    >
      <nav className="pointer-events-auto w-full transition-colors duration-300 hover:bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/#home" className="group flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-crimson shadow-[0_0_12px_rgba(220,38,38,0.6)] transition-transform duration-300 group-hover:scale-125" />
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              Atharva
            </span>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="group relative rounded-lg px-3 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                <span className="absolute inset-0 rounded-lg bg-crimson/10 border border-crimson/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1.5 text-foreground hover:bg-white/5 rounded-lg md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="pointer-events-auto absolute left-0 right-0 top-[52px] z-50 flex flex-col gap-1 border-b border-border bg-background p-4 md:hidden"
          >
            {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="group relative rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white overflow-hidden"
                >
                  <span className="absolute inset-0 rounded-lg bg-crimson/10 border border-crimson/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default FloatingNav;
