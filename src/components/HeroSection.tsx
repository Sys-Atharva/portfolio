import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Magnetic } from "@/components/Magnetic";

const titleLines = ["ATHARVA", "AKASH"];

const HeroTelemetry = ({ speed }: { speed: MotionValue<number> }) => {
  const emerald = "#10B981";
  const teal = "#06B6D4";
  const dashOffset1 = useTransform(speed, [0.3, 1], [0, -28]);
  const dashOffset2 = useTransform(speed, [0.3, 1], [0, -28]);
  const nodes: [number, number, boolean][] = [
    [80, 120, false], [240, 80, true], [400, 160, false], [560, 100, true],
    [160, 300, false], [360, 280, true], [600, 320, false], [740, 240, false],
    [120, 480, true], [320, 460, false], [520, 500, true], [700, 440, false],
  ];
  return (
    <svg
      aria-hidden
      className="absolute inset-0 -z-10 h-full w-full opacity-20 pointer-events-none"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <g stroke={teal} strokeWidth={1}>
        <line x1={80} y1={120} x2={240} y2={80} />
        <line x1={240} y1={80} x2={400} y2={160} />
        <line x1={400} y1={160} x2={560} y2={100} />
        <line x1={160} y1={300} x2={360} y2={280} />
        <line x1={360} y1={280} x2={600} y2={320} />
        <line x1={120} y1={480} x2={320} y2={460} />
        <line x1={320} y1={460} x2={520} y2={500} />
      </g>
      <motion.line
        style={{ strokeDashoffset: dashOffset1 }}
        className="telemetry-dash"
        x1={160} y1={300} x2={360} y2={280}
        stroke={emerald} strokeWidth={1.5}
      />
      <motion.line
        style={{ strokeDashoffset: dashOffset2 }}
        className="telemetry-dash"
        x1={320} y1={460} x2={520} y2={500}
        stroke={emerald} strokeWidth={1.5}
      />
      {/* nodes */}
      {nodes.map(([x, y, pulse], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={pulse ? 4 : 2.5}
          fill={pulse ? emerald : teal}
          className={pulse ? "animate-pulse" : undefined}
        />
      ))}
    </svg>
  );
};

const charContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.02 } },
};

const charItem = {
  hidden: { opacity: 0, y: "40%", rotateX: -30 },
  show: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const dashSpeed = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const svgRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center px-8 bg-[#0B0F19] overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ rotate: svgRotate, willChange: "transform" }}
      >
        <HeroTelemetry speed={dashSpeed} />
      </motion.div>

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

          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-[0.9] [perspective:1000px] [transform-style:preserve-3d]"
          >
            {titleLines.map((line) => (
              <motion.span
                key={line}
                variants={charContainer}
                initial="hidden"
                animate="show"
                className="block [transform-style:preserve-3d]"
              >
                {line.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    variants={charItem}
                    className="inline-block will-change-[transform]"
                  >
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
            <Magnetic as="button"
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-[#10B981] hover:bg-[#0da673] text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-colors duration-300 flex items-center gap-2"
            >
              View Works
              <ArrowRight className="w-4 h-4" />
            </Magnetic>
            <Magnetic className="inline-block">
              <Link
                to="/inquiry"
                className="inline-block border border-slate-800 hover:border-slate-600 text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-colors duration-300"
              >
                Contact Me
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
