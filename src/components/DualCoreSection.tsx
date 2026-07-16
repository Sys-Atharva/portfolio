import { motion } from "framer-motion";
import { Code2, FileCode2, Coffee, Cpu, Smartphone, PlusCircle } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const skills = [
  { name: "React", category: "Frontend", accent: "text-[#10B981] bg-[#10B981]/10", icon: Code2, desc: "Building responsive SPAs with hooks, state management, and performance-optimized rendering." },
  { name: "TypeScript", category: "Standards", accent: "text-[#06B6D4] bg-[#06B6D4]/10", icon: FileCode2, desc: "Static typing and generics for robust, self-documenting codebases that scale." },
  { name: "Java", category: "Backend", accent: "text-slate-300 bg-slate-800", icon: Coffee, desc: "Object-oriented application development and data-structure-driven problem solving." },
  { name: "C / C++", category: "Systems", accent: "text-[#10B981] bg-[#10B981]/10", icon: Cpu, desc: "Low-level programming and efficient hardware-aware logic for embedded contexts." },
  { name: "Android Studio", category: "Mobile", accent: "text-[#06B6D4] bg-[#06B6D4]/10", icon: Smartphone, desc: "Native mobile experiences backed by Firebase for real-time, connected apps." },
];

const DualCoreSection = () => {
  return (
    <section id="skills" className="bg-[#0B0F19] px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-[#10B981] font-mono text-sm tracking-widest uppercase mb-4 block">Core Competencies</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[0.9]">
            Technical<br />Proficiency
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((s) => (
            <motion.div
              key={s.name}
              variants={item}
              className="group border border-slate-800 p-8 rounded-lg bg-slate-900/40 hover:border-[#10B981]/50 transition-colors duration-300 flex flex-col will-change-transform"
            >
              <s.icon className="w-8 h-8 text-[#10B981] mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit mb-6 ${s.accent}`}>
                {s.category}
              </span>
              <h3 className="text-2xl font-bold mb-4 tracking-tight text-white">{s.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}

          <motion.div
            variants={item}
            className="group border border-dashed border-slate-800 p-8 rounded-lg flex items-center justify-center text-center hover:border-slate-700 transition-colors duration-300"
          >
            <div>
              <PlusCircle className="w-8 h-8 text-slate-700 mx-auto mb-4" />
              <h3 className="text-slate-600 font-semibold uppercase tracking-widest text-xs">Continuous Expansion</h3>
              <p className="text-slate-700 text-xs mt-2">Embedded Systems &amp; more in progress</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DualCoreSection;
