import { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";

const titleLines = ["ATHARVA", "PURVAT"];

const charItem = {
  hidden: { opacity: 0, y: "40%", rotateX: -30 },
  show: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const HeroTelemetry = ({ speed }: { speed: MotionValue<number> }) => {
  const crimson = "#DC2626";
  const crimsonLight = "#F87171";
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
      <g stroke={crimsonLight} strokeWidth={1}>
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
        stroke={crimson} strokeWidth={1.5}
      />
      <motion.line
        style={{ strokeDashoffset: dashOffset2 }}
        className="telemetry-dash"
        x1={320} y1={460} x2={520} y2={500}
        stroke={crimson} strokeWidth={1.5}
      />
      {nodes.map(([x, y, pulse], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={pulse ? 4 : 2.5}
          fill={pulse ? crimson : crimsonLight}
          className={pulse ? "animate-pulse" : undefined}
        />
      ))}
    </svg>
  );
};

const SplitRevealSection = () => {
  const reduce = useReducedMotion();

  const charContainer = useMemo(() => ({
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.03 } },
  }), [reduce]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const dashSpeed = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  // Split animation (0 → 0.5): panels slide apart
  const leftX = useTransform(scrollYProgress, [0, 0.5], reduce ? ["0%", "0%"] : ["0%", "-25vw"]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], reduce ? ["0%", "0%"] : ["0%", "25vw"]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);
  const panelScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Center "About Me" reveal (0.2 → 0.6)
  const centerOpacity = useTransform(scrollYProgress, [0.2, 0.6], reduce ? [1, 1] : [0, 1]);
  const centerScale = useTransform(scrollYProgress, [0.2, 0.6], reduce ? [1, 1] : [0.9, 1]);
  const centerY = useTransform(scrollYProgress, [0.2, 0.6], reduce ? [0, 0] : [40, 0]);

  // Dimming overlay
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.95]);

  return (
    <div ref={containerRef} id="home" className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Dimming overlay — bg only, no backdrop-blur for perf */}
        <motion.div
          className="absolute inset-0 bg-background z-0"
          style={{ opacity: overlayOpacity }}
        />

        {/* Telemetry background */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ willChange: "transform" }}
        >
          <HeroTelemetry speed={dashSpeed} />
        </motion.div>

        {/* Split panels container — absolute fills viewport, flex centers content vertically */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Left panel — text content */}
          <motion.div
            className="w-full lg:w-1/2 space-y-8"
            style={{ x: leftX, opacity: panelOpacity, scale: panelScale, willChange: "transform" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-crimson text-xs font-semibold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson" />
              </span>
              Available for select projects
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-[0.9] [perspective:1000px] [transform-style:preserve-3d]">
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
                      className="inline-block will-change-[transform] bg-gradient-to-r from-crimson to-crimson-light bg-clip-text text-transparent"
                    >
                      {ch}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </h1>

            <SplitText
              text="Electronics Engineer & Full-Stack Developer creating robust, low-latency digital systems at the intersection of hardware and high-performance software."
              className="max-w-xl text-xl md:text-2xl text-slate-400 font-light leading-relaxed"
              delay={0.4}
            />

            <div className="flex flex-wrap gap-4 pt-4">
              <MagneticButton
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 text-xs uppercase tracking-widest font-bold"
              >
                View Works
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <Link
                to="/inquiry"
                className="inline-flex items-center justify-center border border-slate-800 hover:border-slate-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors duration-300"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>

          {/* Right panel — portrait placeholder */}
          <motion.div
            className="hidden lg:flex w-1/2 items-center justify-center"
            style={{ x: rightX, opacity: panelOpacity, scale: panelScale, willChange: "transform" }}
          >
            <div className="relative w-80 h-80 rounded-2xl border border-border bg-muted/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-crimson/10 via-transparent to-crimson-light/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-crimson/10 border border-crimson/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-display font-bold text-crimson">AP</span>
                  </div>
                  <p className="text-sm text-slate-500 font-mono">Portrait</p>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </div>

        {/* Center "About Me" reveal — z-20, above panels, flex-centered in viewport */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: centerOpacity, scale: centerScale, y: centerY }}
        >
          <div className="relative w-full max-w-lg text-center pointer-events-auto">
            <div className="absolute inset-0 bg-crimson/20 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10 p-8 md:p-10 rounded-2xl border border-crimson/20 bg-surface">
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-crimson uppercase mb-5 border border-crimson/30 rounded-full bg-crimson/10">
                About Me
              </span>

              <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed mb-4">
                I build at the intersection of <span className="text-crimson">hardware and software</span> — from <span className="text-crimson">FPGA design</span> to <span className="text-crimson">full-stack architecture</span>.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Electronics &amp; Telecommunications engineer with a passion for performance-critical systems. I craft interfaces that feel instant and architectures that scale.
              </p>

              <div className="flex justify-center gap-6 mb-6 text-center">
                <div>
                  <p className="text-xl font-bold text-foreground">3+</p>
                  <p className="text-xs text-muted-foreground">Years Coding</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-xl font-bold text-foreground">15+</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="text-xl font-bold text-crimson">E&amp;T</p>
                  <p className="text-xs text-muted-foreground">Engineer</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {["React", "TypeScript", "Node.js", "FPGA", "VHDL", "Firebase"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs rounded-md bg-muted border border-border text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-muted-foreground/50 tracking-wider uppercase">Scroll to explore ↓</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SplitRevealSection;
