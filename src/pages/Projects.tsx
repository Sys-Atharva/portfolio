import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";

const allProjects = [
  { title: "Web Dashboard", category: "Web Applications", desc: "Full-stack analytics dashboard with real-time data visualization.", tags: ["React", "TypeScript", "Firebase"], featured: true },
  { title: "Mobile App", category: "Mobile & Cross-Platform", desc: "Cross-platform mobile application powered by Firebase.", tags: ["React Native", "Firebase"] },
  { title: "API Gateway", category: "Web Applications", desc: "RESTful API design with authentication and rate limiting.", tags: ["Node.js", "Express", "JWT"] },
  { title: "Signal Processor", category: "Embedded Systems & IoT", desc: "FPGA-based digital signal processing pipeline.", tags: ["VHDL", "FPGA", "Xilinx"] },
  { title: "Circuit Simulator", category: "Web Applications", desc: "Interactive circuit analysis and simulation tool.", tags: ["React", "Canvas API", "Web Workers"] },
  { title: "Embedded Controller", category: "Embedded Systems & IoT", desc: "Microcontroller-based automation system with sensor integration.", tags: ["C/C++", "Arduino", "RTOS"] },
];

const filters = ["All", "Embedded Systems & IoT", "Web Applications", "Creative Development", "Mobile & Cross-Platform"] as const;

const Projects = () => {
  const [active, setActive] = useState<typeof filters[number]>("All");
  const [hovered, setHovered] = useState<string | null>(null);
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

          {/* Bento grid: featured card spans 2 cols on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                layout
                className={p.featured ? "md:col-span-2 md:row-span-2" : ""}
                onMouseEnter={() => setHovered(p.title)}
                onMouseLeave={() => setHovered(null)}
              >
                <ProjectCard
                  title={p.title}
                  category={p.category}
                  desc={p.desc}
                  tags={p.tags}
                  featured={p.featured}
                  isDimmed={hovered !== null && hovered !== p.title}
                />
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
