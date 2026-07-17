import { motion, useReducedMotion } from "framer-motion";
import { KineticHeading } from "@/components/ui/KineticHeading";

const testimonials = [
  { name: "Client One", role: "Startup Founder", text: "Delivered a performant full-stack dashboard ahead of schedule. Technical depth in both frontend and infrastructure was impressive." },
  { name: "Client Two", role: "Product Manager", text: "Strong systems thinking — understood the hardware constraints and built software that worked within them seamlessly." },
  { name: "Client Three", role: "Engineering Lead", text: "Clean code, clear communication. The Firebase integration was production-ready from day one." },
];

const Testimonials = () => {
  const reduce = useReducedMotion();

  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-crimson font-mono text-sm tracking-widest uppercase mb-4 block">Feedback</span>
          <KineticHeading delay={0.1}>What People Say</KineticHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="border border-border rounded-lg bg-slate-900/40 p-6 transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)]"
            >
              <p className="text-slate-400 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="font-display font-semibold text-white text-sm">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
