import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Layers, Briefcase, Mail, Menu, X, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: User, label: "About", path: "/#about" },
  { icon: Layers, label: "Skills", path: "/#skills" },
  { icon: Briefcase, label: "Portfolio", path: "/projects" },
  { icon: Mail, label: "Contact", path: "/#contact" },
];

const FloatingNav = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleClick = (path: string) => {
    setMobileOpen(false);
    if (path.startsWith("/#")) {
      const id = path.slice(2);
      if (location.pathname !== "/") {
        window.location.href = path;
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    if (!path.startsWith("/#")) return location.pathname === path;
    return false;
  };

  return (
    <>
      {/* Desktop / Tablet floating capsule */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="nav-capsule flex items-center gap-1 px-3 py-2 rounded-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 pr-4 mr-2 border-r border-border">
            <span className="font-mono text-xs tracking-tight text-primary font-semibold">SA</span>
            <span className="font-mono text-xs tracking-tight text-muted-foreground">//</span>
            <span className="font-mono text-xs tracking-tight text-foreground">Sys-Atharva</span>
          </Link>

          {/* Links */}
          <ul className="flex items-center gap-0.5">
            {navItems.map(({ label, path }) => {
              const active = isActive(path);
              const isLink = !path.startsWith("/#");

              const content = (
                <span className={`nav-link-item relative px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 block ${
                  active
                    ? "text-foreground bg-muted/60"
                    : "text-muted-foreground hover:text-foreground"
                }`}>
                  {label}
                  <span className="nav-link-glow" aria-hidden="true" />
                </span>
              );

              return (
                <li key={label}>
                  {isLink ? (
                    <Link to={path}>{content}</Link>
                  ) : (
                    <button onClick={() => handleClick(path)}>{content}</button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile hamburger trigger */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-4 right-4 z-[60] md:hidden"
      >
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="nav-capsule p-3 rounded-2xl"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
        </button>
      </motion.div>

      {/* Mobile logo */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-4 left-4 z-[60] md:hidden"
      >
        <Link to="/" className="nav-capsule flex items-center gap-1.5 px-4 py-3 rounded-2xl">
          <span className="font-mono text-xs tracking-tight text-primary font-semibold">SA</span>
          <span className="font-mono text-xs tracking-tight text-muted-foreground">//</span>
          <span className="font-mono text-xs tracking-tight text-foreground">Sys-Atharva</span>
        </Link>
      </motion.div>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] md:hidden nav-mobile-overlay flex items-center justify-center"
          >
            <motion.ul
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="flex flex-col items-center gap-3"
            >
              {navItems.map(({ icon: Icon, label, path }, i) => {
                const active = isActive(path);
                const isLink = !path.startsWith("/#");

                const content = (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-display font-semibold transition-all duration-200 ${
                      active
                        ? "text-foreground bg-muted/40"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </motion.div>
                );

                return (
                  <li key={label}>
                    {isLink ? (
                      <Link to={path} onClick={() => setMobileOpen(false)}>{content}</Link>
                    ) : (
                      <button onClick={() => handleClick(path)}>{content}</button>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;
