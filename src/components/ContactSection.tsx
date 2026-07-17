import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const contactStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const contactItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={contactStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-slate-800 bg-slate-900/40 p-10 text-center"
        >
          <motion.div variants={contactItem}>
            <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-6 h-6 text-[#10B981]" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Let's Connect</h2>
            <p className="text-slate-400 font-body mb-8">
              Have a project idea or just want to chat? Reach out.
            </p>
          </motion.div>
          <motion.div variants={contactItem}>
            <Link
              to="/inquiry"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#10B981] text-[#0B0F19] font-display font-semibold text-sm tracking-wide transition-transform duration-200 hover:-translate-y-0.5"
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
