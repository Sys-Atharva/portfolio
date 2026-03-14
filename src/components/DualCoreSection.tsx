import { motion } from "framer-motion";
import { Code2, Cpu } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const itSkills = ["C", "C++", "Java", "Full-Stack Web", "Mobile Apps (Firebase)"];
const entcSkills = ["Digital System Design", "Circuit Analysis", "Signals & Systems"];

const SkillPill = ({ label, variant }: { label: string; variant: "blue" | "orange" }) => (
  <span className={`px-4 py-2 rounded-lg text-sm font-body font-medium border ${
    variant === "blue"
      ? "border-primary/20 bg-primary/5 text-primary"
      : "border-secondary/20 bg-secondary/5 text-secondary"
  }`}>
    {label}
  </span>
);

const DualCoreSection = () => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-display text-3xl sm:text-4xl font-bold text-center mb-4"
        >
          Dual-Core Proficiency
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-muted-foreground text-center mb-16 font-body"
        >
          Where code meets circuitry
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <SpotlightCard className="glass-card-blue p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold">Information Technology</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {itSkills.map((s) => (
                  <SkillPill key={s} label={s} variant="blue" />
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <SpotlightCard className="glass-card-orange p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-display text-xl font-semibold">Electronics & Telecom</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {entcSkills.map((s) => (
                  <SkillPill key={s} label={s} variant="orange" />
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DualCoreSection;
