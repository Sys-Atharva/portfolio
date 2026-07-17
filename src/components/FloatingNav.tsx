import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NavDepth } from "@/components/NavDepth";

const navItems = [
  { name: "Home", to: "/#home" },
  { name: "About", to: "/#about" },
  { name: "Projects", to: "/projects" },
  { name: "Contact", to: "/#contact" },
];

const FloatingNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none"
    >
      <NavDepth className="pointer-events-auto w-full max-w-3xl">
        <nav className="flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-[#0B0F19]/90 px-5 py-3 backdrop-blur-md">
        <Link to="/#home" className="group flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.6)] transition-transform duration-300 group-hover:scale-125" />
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Atharva
          </span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="cyl-link rounded-lg px-3 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              <span className="cyl-link__inner">
                <span className="cyl-link__face">{item.name}</span>
                <span className="cyl-link__face" aria-hidden="true">{item.name}</span>
              </span>
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
      </nav>
      </NavDepth>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto absolute left-4 right-4 top-20 z-50 flex flex-col gap-2 rounded-2xl border border-slate-800 bg-[#0B0F19]/95 p-4 backdrop-blur-md md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default FloatingNav;
