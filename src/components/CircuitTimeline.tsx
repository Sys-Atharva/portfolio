import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { KineticHeading } from '@/components/ui/KineticHeading';

const milestones = [
  { year: '2023 — Present', role: 'Full-Stack Developer', desc: 'Architecting scalable web applications and IoT dashboards with React, TypeScript, and Firebase.' },
  { year: '2021 — Present', role: 'E&T Engineering Student', desc: 'Bridging the gap between hardware systems and software logic through Electronics & Telecommunications.' },
  { year: '2020 — 2021', role: 'IT Diploma', desc: 'Built foundational expertise in networking, system architecture, and software development.' },
];

export function CircuitTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const finalPathLength = reduce ? 1 : pathLength;

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <KineticHeading delay={0.1}>Experience</KineticHeading>
        </motion.div>

        <div ref={containerRef} className="relative">
          <svg className="absolute left-4 md:left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 overflow-visible" viewBox="0 0 16 800" preserveAspectRatio="none">
            <path
              d="M 8 0 L 8 800"
              fill="none"
              stroke="#262626"
              strokeWidth="2"
            />
            <motion.path
              d="M 8 0 L 8 800"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2"
              style={{ pathLength: finalPathLength }}
              filter="drop-shadow(0 0 4px rgba(220, 38, 38, 0.8))"
            />
          </svg>

          <div className="space-y-16">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col md:flex-row gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-crimson rounded-full -translate-x-1/2 mt-1.5 ring-4 ring-background z-10" />

                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                  <motion.span
                    className="inline-block px-3 py-1 text-xs font-bold text-crimson bg-crimson/10 rounded-full mb-3 border border-crimson/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.year}
                  </motion.span>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.role}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
