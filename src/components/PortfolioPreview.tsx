import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SpotlightCard } from "@/components/SpotlightCard";

const projects = [
  { title: "Web Dashboard", category: "Software", desc: "Full-stack analytics dashboard with real-time data." },
  { title: "Signal Processor", category: "Hardware", desc: "FPGA-based digital signal processing pipeline." },
  { title: "Mobile App", category: "Software", desc: "Cross-platform mobile application with Firebase." },
  { title: "Circuit Simulator", category: "Hardware", desc: "Interactive circuit analysis and simulation tool." },
];

const PortfolioPreview = () => {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggleFlip = (i: number) => setFlipped((prev) => ({ ...prev, [i]: !prev[i] }));

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
            <SpotlightCard
              key={p.title}
              variant={p.category === "Software" ? "emerald" : "teal"}
              className="rounded-lg"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="relative [perspective:1200px]"
              >
                <motion.div
                  className="relative w-full [transform-style:preserve-3d] transition-transform duration-500"
                  style={{ transform: flipped[i] ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  <a
                    href="https://github.com/Sys-Atharva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border border-slate-800 bg-slate-900/40 p-6 transition-colors duration-300 hover:border-[#10B981] will-change-transform [backface-visibility:hidden]"
                  >
                    <span className={`text-xs font-body font-medium tracking-wider uppercase ${
                      p.category === "Software" ? "text-[#10B981]" : "text-[#06B6D4]"
                    }`}>
                      {p.category}
                    </span>
                    <h3 className="font-display text-lg font-semibold mt-2 mb-1">{p.title}</h3>
                    <p className="text-slate-400 text-sm font-body">{p.desc}</p>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 mt-3 transition-colors group-hover:text-[#10B981]" />
                    <button
                      onClick={(e) => { e.preventDefault(); toggleFlip(i); }}
                      className="absolute bottom-3 right-3 text-[10px] text-slate-600 hover:text-white uppercase tracking-widest transition-colors"
                    >
                      Details
                    </button>
                  </a>

                  <div className="absolute inset-0 rounded-lg border border-slate-800 bg-slate-900/40 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between">
                    <div>
                      <span className={`text-xs font-body font-medium tracking-wider uppercase mb-3 block ${
                        p.category === "Software" ? "text-[#10B981]" : "text-[#06B6D4]"
                      }`}>
                        Tech Stack
                      </span>
                      <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {(p.category === "Software"
                          ? ["React", "TypeScript", "Node.js", "Firebase"]
                          : ["Verilog", "FPGA", "C", "Signal Processing"]
                        ).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400 border border-slate-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFlip(i)}
                      className="self-end text-[10px] text-slate-600 hover:text-white uppercase tracking-widest transition-colors mt-4"
                    >
                      Back
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </SpotlightCard>
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
