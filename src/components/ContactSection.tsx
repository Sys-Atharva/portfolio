import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { KineticHeading } from "@/components/ui/KineticHeading";

const contactItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const ContactSection = () => {
  const reduce = useReducedMotion();
  const contactStagger = useMemo(() => ({
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  }), [reduce]);

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={contactStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-border bg-card p-10 text-center"
        >
          <motion.div variants={contactItem}>
            <div className="w-12 h-12 rounded-2xl bg-crimson/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-6 h-6 text-crimson" />
            </div>
            <KineticHeading delay={0.1} className="text-2xl sm:text-3xl mb-3">Let's Connect</KineticHeading>
            <p className="text-slate-400 font-body mb-8">
              Have a project idea or just want to chat? Reach out.
            </p>
          </motion.div>
          <motion.div variants={contactItem}>
            <Link
              to="/inquiry"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-crimson text-white font-display font-semibold text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-crimson/20"
            >
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
