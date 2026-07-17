const skills = [
  "React", "TypeScript", "Firebase", "FPGA", "C/C++", "Java", "Node.js", "Python",
];

const TechMarquee = () => {
  return (
    <section className="py-12 border-y border-border bg-muted/20 overflow-hidden">
      <div className="relative">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="text-2xl font-display font-bold text-slate-600 grayscale hover:grayscale-0 hover:text-crimson hover:scale-105 transition-all duration-300 cursor-default select-none"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
