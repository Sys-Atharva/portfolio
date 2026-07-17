import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { KineticHeading } from "@/components/ui/KineticHeading";

const VideoSection = () => {
  const reduce = useReducedMotion();

  return (
    <section id="video" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="text-crimson font-mono text-sm tracking-widest uppercase mb-4 block">Showcase</span>
          <KineticHeading delay={0.1}>In Motion</KineticHeading>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative aspect-video rounded-2xl border border-border bg-muted/30 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 via-transparent to-crimson-light/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              className="relative w-20 h-20 rounded-full bg-crimson/90 hover:bg-crimson flex items-center justify-center transition-transform duration-200 hover:scale-105"
              aria-label="Play video"
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-crimson/50"
                animate={reduce ? {} : { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
