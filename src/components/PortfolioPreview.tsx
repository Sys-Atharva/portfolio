import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BentoCard } from "@/components/BentoCard";

const projects = [
  { title: "Web Dashboard", category: "Web Applications", image: "https://placehold.co/800x600/141414/DC2626?text=Dashboard", featured: true },
  { title: "Signal Processor", category: "Embedded Systems & IoT", image: "https://placehold.co/800x600/141414/DC2626?text=FPGA" },
  { title: "Mobile App", category: "Mobile & Cross-Platform", image: "https://placehold.co/800x600/141414/DC2626?text=Mobile" },
  { title: "Circuit Simulator", category: "Web Applications", image: "https://placehold.co/800x600/141414/DC2626?text=Circuit" },
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
              className={p.featured ? "md:col-span-2 md:row-span-2" : ""}
            >
              <BentoCard
                title={p.title}
                category={p.category}
                image={p.image}
              />
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
