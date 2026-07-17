import { motion, useReducedMotion } from 'framer-motion';

const experiences = [
  { year: 'Present', role: 'Full-Stack Developer', desc: 'Building scalable web applications with React, TypeScript, and Firebase.' },
  { year: 'Ongoing', role: 'E&T Engineering Student', desc: 'Bridging hardware and software systems through Electronics & Telecommunications.' },
  { year: 'Completed', role: 'IT Diploma', desc: 'Foundation in computer science, networking, and system administration.' },
];

const ExperienceTimeline = () => {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="text-crimson font-mono text-sm tracking-widest uppercase mb-4 block">Journey</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Experience</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-crimson"
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col md:flex-row gap-4 md:gap-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-crimson rounded-full -translate-x-1/2 mt-1.5 ring-4 ring-background" />

                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                  <span className="inline-block px-3 py-1 text-xs font-bold text-crimson bg-crimson/10 rounded-full mb-2">
                    {exp.year}
                  </span>
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-muted-foreground mt-1">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
