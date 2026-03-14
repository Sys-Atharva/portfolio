import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import InteractiveBackdrop from "@/components/InteractiveBackdrop";
import FloatingNav from "@/components/FloatingNav";
import SpotlightCard from "@/components/SpotlightCard";
import Footer from "@/components/Footer";

const allProjects = [
  { title: "Web Dashboard", category: "Software", desc: "Full-stack analytics dashboard with real-time data visualization." },
  { title: "Mobile App", category: "Software", desc: "Cross-platform mobile application powered by Firebase." },
  { title: "API Gateway", category: "Software", desc: "RESTful API design with authentication and rate limiting." },
  { title: "Signal Processor", category: "Hardware", desc: "FPGA-based digital signal processing pipeline." },
  { title: "Circuit Simulator", category: "Hardware", desc: "Interactive circuit analysis and simulation tool." },
  { title: "Embedded Controller", category: "Hardware", desc: "Microcontroller-based automation system with sensor integration." },
];

const filters = ["All", "Software", "Hardware"] as const;

const Projects = () => {
  const [active, setActive] = useState<typeof filters[number]>("All");
  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <div className="relative min-h-screen">
      <InteractiveBackdrop />
      <FloatingNav />
      <main className="relative z-10 pt-20 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors">
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

          <div className="flex gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all duration-200 ${
                  active === f
                    ? "bg-primary/10 text-primary border border-primary/25"
                    : "text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                layout
              >
                <SpotlightCard href="https://github.com/Sys-Atharva">
                  <span className={`text-xs font-body font-medium tracking-wider uppercase ${
                    p.category === "Software" ? "text-primary" : "text-secondary"
                  }`}>
                    {p.category}
                  </span>
                  <h3 className="font-display text-lg font-semibold mt-2 mb-1">{p.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{p.desc}</p>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground mt-3" />
                </SpotlightCard>
              </motion.div>
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
