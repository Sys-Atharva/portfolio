import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Layers, Zap, Target } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

const props = [
  {
    icon: Cpu,
    title: "Hardware-Software Convergence",
    desc: "Bridging physical silicon with scalable digital architectures for low-latency, high-reliability systems.",
  },
  {
    icon: Layers,
    title: "Full-Stack Precision",
    desc: "End-to-end ownership from React frontends to Firebase backends, with TypeScript enforcing type safety throughout.",
  },
  {
    icon: Zap,
    title: "Performance First",
    desc: "GPU-accelerated animations, optimized rendering pipelines, and efficient resource management across every project.",
  },
  {
    icon: Target,
    title: "Systems Thinking",
    desc: "Architecting solutions that consider the full stack — from circuit-level constraints to cloud-scale distribution.",
  },
];

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const ValueProps = () => {
  const reduce = useReducedMotion();
  const container = useMemo(() => ({
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  }), [reduce]);

  return (
    <section id="value-props" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <span className="text-crimson font-mono text-sm tracking-widest uppercase mb-4 block">What I Bring</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Core Value
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {props.map((p) => (
            <SpotlightCard key={p.title} variant="crimson" className="rounded-lg">
              <motion.div
                variants={item}
                className="border-l-2 border-l-crimson rounded-lg bg-slate-900/40 p-6 h-full"
              >
                <p.icon className="w-6 h-6 text-crimson mb-4 opacity-60" />
                <h3 className="font-display text-lg font-semibold mb-2 text-white">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProps;
