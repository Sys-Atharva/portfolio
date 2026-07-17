import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";

const allProjects = [
  { title: "Web Dashboard", category: "Web Applications", desc: "Full-stack analytics dashboard with real-time data visualization." },
  { title: "Mobile App", category: "Mobile & Cross-Platform", desc: "Cross-platform mobile application powered by Firebase." },
  { title: "API Gateway", category: "Web Applications", desc: "RESTful API design with authentication and rate limiting." },
  { title: "Signal Processor", category: "Embedded Systems & IoT", desc: "FPGA-based digital signal processing pipeline." },
  { title: "Circuit Simulator", category: "Web Applications", desc: "Interactive circuit analysis and simulation tool." },
  { title: "Embedded Controller", category: "Embedded Systems & IoT", desc: "Microcontroller-based automation system with sensor integration." },
];

const filters = ["All", "Embedded Systems & IoT", "Web Applications", "Creative Development", "Mobile & Cross-Platform"] as const;

const Projects = () => {
  const [active, setActive] = useState<typeof filters[number]>("All");
  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <div className="relative min-h-screen">
      <FloatingNav />
      <main className="relative z-10 pt-20 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display text-4xl sm:text-5xl font-bold mb-4"
          >
            All Projects
          </motion.h1>

          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-colors ${
                  active === f
                    ? "border border-crimson/40 bg-crimson/10 text-crimson"
                    : "border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p, i) => (
              <motion.a
                key={p.title}
                href="https://github.com/Sys-Atharva"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                layout
                className="group rounded-lg border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-slate-700"
              >
                <span className={`text-xs font-body font-medium tracking-wider uppercase ${
                  p.category === "Embedded Systems & IoT" ? "text-crimson-light" : p.category === "Creative Development" ? "text-purple-400" : p.category === "Mobile & Cross-Platform" ? "text-amber-400" : "text-crimson"
                }`}>
                  {p.category}
                </span>
                <h3 className="font-display text-lg font-semibold mt-2 mb-1">{p.title}</h3>
                <p className="text-slate-400 text-sm font-body">{p.desc}</p>
                <ArrowUpRight className="w-4 h-4 text-slate-500 mt-3 transition-colors group-hover:text-crimson" />
              </motion.a>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Projects;
