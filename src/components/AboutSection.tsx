import { motion } from "framer-motion";
import { User, Code2, Cpu, Rocket } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-display text-3xl sm:text-4xl font-bold text-center mb-16"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="md:col-span-2"
          >
            <SpotlightCard className="p-8 h-full">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">Who I Am</h3>
                </div>
                <p className="text-muted-foreground font-body leading-relaxed mb-4">
                  I'm <span className="text-foreground font-medium">Atharva Purvat</span>, a developer and engineer who thrives at the intersection of software and hardware. With a diploma in IT and currently pursuing B.E. in Electronics & Telecommunications, I bring a unique dual perspective to every project.
                </p>
                <p className="text-muted-foreground font-body leading-relaxed">
                  From building full-stack web applications and mobile apps to designing digital systems and analyzing circuits — I architect solutions that bridge the gap between logic and physics.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <SpotlightCard className="glass-card-blue p-6">
                <div className="relative z-10">
                  <Code2 className="w-5 h-5 text-primary mb-3" />
                  <p className="font-display text-2xl font-bold text-foreground">IT Diploma</p>
                  <p className="text-muted-foreground text-sm font-body mt-1">Programming, databases & systems</p>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <SpotlightCard className="glass-card-orange p-6">
                <div className="relative z-10">
                  <Cpu className="w-5 h-5 text-secondary mb-3" />
                  <p className="font-display text-2xl font-bold text-foreground">B.E. ENTC</p>
                  <p className="text-muted-foreground text-sm font-body mt-1">Currently pursuing</p>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6"
        >
          <SpotlightCard className="p-6">
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Rocket className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                <span className="text-foreground font-medium">Mission:</span> To build systems where elegant code and precise engineering converge — creating technology that's as robust in hardware as it is refined in software.
              </p>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
