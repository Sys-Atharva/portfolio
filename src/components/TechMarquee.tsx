const technologies = [
  'React', 'TypeScript', 'Firebase', 'FPGA', 'C/C++', 'Java', 'Node.js', 'Python', 'Tailwind CSS', 'Framer Motion'
];

export function TechMarquee() {
  return (
    <section className="relative w-full overflow-hidden py-8 bg-background/50 backdrop-blur-sm border-y border-border">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap">
        {[...technologies, ...technologies, ...technologies].map((tech, index) => (
          <span
            key={index}
            className="mx-8 text-xl font-semibold text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-crimson cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}

export default TechMarquee;
