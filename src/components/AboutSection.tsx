import { motion } from "framer-motion";
import { Cpu, Layers } from "lucide-react";

const aboutStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const aboutItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const AboutSection = () => {
  return (
    <section id="about" className="bg-[#0B0F19] px-8 py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        <motion.div
          variants={aboutStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="lg:col-span-4 lg:sticky lg:top-32"
        >
          <motion.div variants={aboutItem}>
            <h2 className="text-5xl font-extrabold text-white tracking-tight leading-none mb-6">About Me</h2>
            <div className="w-12 h-1 bg-[#10B981]" />
            <p className="mt-8 text-slate-400 font-medium text-lg leading-relaxed">
              Bridging the gap between physical silicon and scalable digital architectures.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={aboutStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-slate-800 pt-12 lg:pt-0 lg:pl-24"
        >
          <div className="space-y-10 text-slate-300 leading-relaxed text-lg">
            <motion.p variants={aboutItem}>
              I'm <span className="text-white font-semibold">Atharva Purvat</span>, a developer and engineer who thrives at the intersection of software and hardware. With a diploma in IT and currently pursuing a B.E. in Electronics &amp; Telecommunications, I bring a unique dual perspective to every project.
            </motion.p>
            <motion.p variants={aboutItem}>
              From building <span className="text-[#10B981] font-semibold">full-stack web applications</span> and mobile apps to designing digital systems and analyzing circuits, I architect solutions that bridge the gap between logic and physics.
            </motion.p>
            <div className="border-b border-slate-800 w-full py-4" />
            <motion.p variants={aboutItem}>
              My mission is to build systems where elegant code and precise engineering converge, using tools like{" "}
              <span className="text-[#06B6D4] font-semibold">React &amp; Firebase</span> to create technology that's as robust in hardware as it is refined in software.
            </motion.p>

            <motion.div variants={aboutItem} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
              <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-[#10B981] transition-colors">
                <Cpu className="w-6 h-6 text-[#10B981] mb-4" />
                <h3 className="text-white font-bold mb-2">Systems Engineering</h3>
                <p className="text-sm text-slate-400">Digital system design, circuit analysis, signals &amp; systems.</p>
              </div>
              <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-[#06B6D4] transition-colors">
                <Layers className="w-6 h-6 text-[#06B6D4] mb-4" />
                <h3 className="text-white font-bold mb-2">Web Scalability</h3>
                <p className="text-sm text-slate-400">Full-stack web, TypeScript, mobile apps &amp; cloud (Firebase).</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
