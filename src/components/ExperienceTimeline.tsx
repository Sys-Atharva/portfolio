import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const timeline = [
  { period: "2023 — Present", role: "Full-Stack Developer", org: "Freelance & Contract", desc: "Building full-stack web and mobile applications with React, TypeScript, and Firebase." },
  { period: "2022 — Present", role: "E&T Student", org: "B.E. Electronics & Telecommunications", desc: "Pursuing deep expertise in signal processing, digital systems, and embedded architectures." },
  { period: "2020 — 2023", role: "IT Diploma", org: "Diploma in Information Technology", desc: "Foundation in software development, networking, and system administration." },
];

const ExperienceTimeline = () => {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-card/50 p-8 md:p-12"
        >
          <div className="text-center mb-16">
            <span className="text-crimson font-mono text-sm tracking-widest uppercase mb-4 block">Journey</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Experience</h2>
          </div>

          <div ref={containerRef} className="relative">
            {/* Vertical line — positioned at center, dots sit ON this line */}
            <div className="absolute left-4 md:left-1/2 -translate-x-px top-0 bottom-0 w-px">
              <div className="absolute inset-0 bg-border" />
              <motion.div
                className="absolute inset-0 bg-crimson origin-top"
                style={{ height: lineHeight, willChange: "transform" }}
              />
              <motion.div
                className="absolute inset-0 origin-top"
                style={{
                  height: lineHeight,
                  background: "linear-gradient(to bottom, transparent, rgba(220,38,38,0.3))",
                  filter: "blur(4px)",
                  willChange: "transform",
                }}
              />
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full pointer-events-none"
                style={{
                  top: lineHeight,
                  background: "radial-gradient(circle, rgba(220,38,38,0.5) 0%, transparent 70%)",
                  filter: "blur(10px)",
                  willChange: "transform",
                }}
                animate={reduce ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="space-y-16">
              {timeline.map((t, i) => (
                <TimelineCard key={t.role} item={t} index={i} reduce={reduce} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function TimelineCard({ item, index: i, reduce }: { item: typeof timeline[number]; index: number; reduce: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const cardOpacity = useTransform(cardProgress, [0, 0.3, 0.5, 0.7, 1], [0.4, 0.8, 1, 0.8, 0.4]);
  const cardScale = useTransform(cardProgress, [0, 0.3, 0.5, 0.7, 1], [0.96, 0.99, 1, 0.99, 0.96]);

  const isLeft = i % 2 === 0;

  return (
    <div className={`relative md:w-[calc(50%-2rem)] ${isLeft ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"}`}>
      {/* Dot — sits ON the vertical line, outside the card */}
      <div
        className="absolute top-6 z-10"
        style={
          isLeft
            ? { left: "calc(100% + 1rem)" }
            : { right: "calc(100% + 1rem)" }
        }
      >
        <span className="relative flex h-3.5 w-3.5">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-crimson/40"
            whileInView={reduce ? {} : { scale: [1, 3], opacity: [0.6, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-crimson shadow-[0_0_12px_rgba(220,38,38,0.6)]" />
        </span>
      </div>

      {/* Tick mark from dot to card */}
      <motion.div
        className={`absolute top-[29px] h-px bg-crimson/40 ${
          isLeft
            ? "right-[calc(100%+0.25rem)] w-4 md:w-8 md:origin-right"
            : "left-[calc(100%+0.25rem)] w-4 md:w-8 md:origin-left"
        }`}
        initial={{ scaleX: 0 }}
        whileInView={reduce ? {} : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: i * 0.1 + 0.2, ease: "easeOut" }}
        style={{ willChange: "transform" }}
      />

      {/* Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40, x: isLeft ? -30 : 30 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={reduce ? undefined : { opacity: cardOpacity, scale: cardScale, willChange: "transform" }}
        className="group rounded-xl border border-border bg-card py-6 px-6 shadow-sm transition-colors duration-300 hover:border-crimson/40 hover:shadow-[0_0_24px_rgba(220,38,38,0.08)]"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wider uppercase bg-crimson/10 text-crimson-light border border-crimson/20">
            {item.period}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-crimson-light transition-colors duration-300">
          {item.role}
        </h3>
        <p className="text-sm text-slate-500 mb-3">{item.org}</p>
        <div className="w-8 h-px bg-border group-hover:bg-crimson/40 group-hover:w-12 transition-all duration-300" />
        <p className="text-sm text-slate-400 leading-relaxed mt-3">{item.desc}</p>
      </motion.div>
    </div>
  );
}

export default ExperienceTimeline;
