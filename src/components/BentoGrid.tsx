import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useHasHover } from '@/lib/useHasHover';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { KineticHeading } from '@/components/ui/KineticHeading';

const projects = [
  { id: 1, title: 'IoT Dashboard', category: 'Embedded + Web', col: 'md:col-span-2', row: 'md:row-span-2', image: 'https://placehold.co/800x600/141414/DC2626?text=Dashboard', tech: ['React', 'TypeScript', 'Firebase', 'Node.js'], link: 'https://github.com/Sys-Atharva' },
  { id: 2, title: 'Signal Processor', category: 'Embedded Systems', col: 'md:col-span-1', row: 'md:row-span-1', image: 'https://placehold.co/800x600/141414/DC2626?text=FPGA', tech: ['Verilog', 'FPGA', 'C'], link: 'https://github.com/Sys-Atharva' },
  { id: 3, title: 'Creative Portfolio', category: 'Frontend', col: 'md:col-span-1', row: 'md:row-span-1', image: 'https://placehold.co/800x600/141414/DC2626?text=Portfolio', tech: ['React', 'TypeScript', 'Tailwind'], link: 'https://github.com/Sys-Atharva' },
  { id: 4, title: 'Mobile PWA', category: 'Mobile', col: 'md:col-span-2', row: 'md:row-span-1', image: 'https://placehold.co/800x600/141414/DC2626?text=Mobile', tech: ['React', 'TypeScript', 'Firebase'], link: 'https://github.com/Sys-Atharva' },
];

export function BentoGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const hasHover = useHasHover();

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <KineticHeading delay={0.1}>Selected Work</KineticHeading>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
          {projects.map((project) => {
            const isHovered = hoveredId === project.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-2xl border border-border bg-surface cursor-pointer block ${project.col} ${project.row}`}
                onMouseEnter={() => hasHover && setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                animate={{
                  opacity: isDimmed ? (reduce ? 1 : 0.4) : 1,
                  scale: isDimmed ? (reduce ? 1 : 0.96) : 1,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                data-cursor="hover"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-crimson bg-crimson/10 rounded-md mb-2 border border-crimson/20">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>

                  <motion.div
                    className="flex gap-2 flex-wrap overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                        transition={{ delay: isHovered ? i * 0.05 : 0, duration: 0.3 }}
                        className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.a>
            );
          })}
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
}
