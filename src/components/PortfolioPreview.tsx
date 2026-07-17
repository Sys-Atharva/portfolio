import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  { title: "Web Dashboard", category: "Web Applications", desc: "Full-stack analytics dashboard with real-time data visualization.", featured: true },
  { title: "Signal Processor", category: "Embedded Systems & IoT", desc: "FPGA-based digital signal processing pipeline." },
  { title: "Mobile App", category: "Mobile & Cross-Platform", desc: "Cross-platform mobile application with Firebase." },
  { title: "Circuit Simulator", category: "Web Applications", desc: "Interactive circuit analysis and simulation tool." },
];

const PortfolioPreview = () => {
  const reduce = useReducedMotion();

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-display text-3xl sm:text-4xl font-bold mb-2"
            >
              Selected Work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-slate-400 font-body"
            >
              Projects spanning software and hardware
            </motion.p>
          </div>
          <Link
            to="/projects"
            className="hidden sm:flex items-center gap-1 text-crimson text-sm font-medium hover:underline"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="https://github.com/Sys-Atharva"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              whileHover={reduce ? undefined : { scale: 1.02 }}
              className={`group relative rounded-lg border border-slate-800 bg-slate-900/40 overflow-hidden transition-colors duration-300 hover:border-crimson will-change-transform ${
                p.featured ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`p-6 ${p.featured ? "md:p-10" : ""}`}>
                <span className={`text-xs font-body font-medium tracking-wider uppercase ${
                  p.category === "Embedded Systems & IoT" ? "text-crimson-light" : "text-crimson"
                }`}>
                  {p.category}
                </span>
                <h3 className={`font-display font-semibold mt-2 mb-1 text-white ${p.featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
                  {p.title}
                </h3>
                <p className="text-slate-400 text-sm font-body">{p.desc}</p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">View Project</span>
                  <ArrowUpRight className="w-4 h-4 text-crimson" />
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-wrap gap-1 justify-end">
                {(p.featured
                  ? ["React", "TypeScript", "Node.js", "Firebase"]
                  : p.category === "Embedded Systems & IoT"
                  ? ["Verilog", "FPGA", "C"]
                  : ["React", "TypeScript"]
                ).map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-slate-300 backdrop-blur-sm">
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        <Link
          to="/projects"
          className="sm:hidden flex items-center justify-center gap-1 text-crimson text-sm font-medium mt-6 hover:underline"
        >
          View All <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default PortfolioPreview;
