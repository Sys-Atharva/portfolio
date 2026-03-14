import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SpotlightCard className="glass-card-blue p-10 text-center">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Let's Connect</h2>
              <p className="text-muted-foreground font-body mb-8">
                Have a project idea or just want to chat? Reach out.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/your-form-id/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide hover:brightness-110 transition-all duration-200"
              >
                Get In Touch
              </a>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
