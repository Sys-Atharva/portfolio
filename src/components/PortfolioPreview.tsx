import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  { title: "Web Dashboard", category: "Software", desc: "Full-stack analytics dashboard with real-time data." },
  { title: "Signal Processor", category: "Hardware", desc: "FPGA-based digital signal processing pipeline." },
  { title: "Mobile App", category: "Software", desc: "Cross-platform mobile application with Firebase." },
  { title: "Circuit Simulator", category: "Hardware", desc: "Interactive circuit analysis and simulation tool." },
];

const PortfolioPreview = () => {
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
            className="hidden sm:flex items-center gap-1 text-[#10B981] text-sm font-medium hover:underline"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
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
              whileHover={{ scale: 1.015, y: -4 }}
              className="group rounded-lg border border-slate-800 bg-slate-900/40 p-6 transition-colors duration-300 hover:border-[#10B981]/50 will-change-transform"
            >
              <span className={`text-xs font-body font-medium tracking-wider uppercase ${
                p.category === "Software" ? "text-[#10B981]" : "text-[#06B6D4]"
              }`}>
                {p.category}
              </span>
              <h3 className="font-display text-lg font-semibold mt-2 mb-1">{p.title}</h3>
              <p className="text-slate-400 text-sm font-body">{p.desc}</p>
              <ArrowUpRight className="w-4 h-4 text-slate-500 mt-3 transition-colors group-hover:text-[#10B981]" />
            </motion.a>
          ))}
        </div>

        <Link
          to="/projects"
          className="sm:hidden flex items-center justify-center gap-1 text-[#10B981] text-sm font-medium mt-6 hover:underline"
        >
          View All <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default PortfolioPreview;
