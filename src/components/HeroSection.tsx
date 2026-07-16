import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const titleLines = ["ATHARVA", "AKASH"];

const charContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

const charItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center px-8 bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-9 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-[#10B981] text-xs font-semibold tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            Available for select projects
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-[0.9]">
            {titleLines.map((line) => (
              <motion.span
                key={line}
                variants={charContainer}
                initial="hidden"
                animate="show"
                className="block"
              >
                {line.split("").map((ch, i) => (
                  <motion.span key={i} variants={charItem} className="inline-block will-change-transform">
                    {ch}
                  </motion.span>
                ))}
              </motion.span>
            ))}
          </h1>

          <p className="max-w-xl text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
            Electronics Engineer &amp; Full-Stack Developer creating{" "}
            <span className="text-white">robust, low-latency digital systems</span> at the intersection of hardware and high-performance software.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-[#10B981] hover:bg-[#0da673] text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-colors duration-300 flex items-center gap-2"
            >
              View Works
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/inquiry"
              className="border border-slate-800 hover:border-slate-600 text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-colors duration-300"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
