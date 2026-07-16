import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 text-sm font-body">
          © {new Date().getFullYear()} Atharva Purvat. Built with precision.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Sys-Atharva"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-[#10B981] transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/atharva-purvat-86030b305/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-[#10B981] transition-colors duration-200"
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
