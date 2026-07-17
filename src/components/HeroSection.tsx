import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Cpu, Globe, Zap, Lightbulb } from "lucide-react";

const titleLines = ["ATHARVA", "PURVAT"];

const coreValues = [
  { title: "Hardware-Software Bridge", desc: "Seamlessly integrating embedded systems with modern web architectures.", icon: Cpu, pos: "top-left" as const },
  { title: "Scalable Architecture", desc: "Building robust, full-stack applications designed for growth and reliability.", icon: Globe, pos: "top-right" as const },
  { title: "Performance First", desc: "Obsessive optimization for 60fps animations and sub-second load times.", icon: Zap, pos: "bottom-left" as const },
  { title: "Creative Engineering", desc: "Transforming complex technical constraints into elegant, intuitive UI.", icon: Lightbulb, pos: "bottom-right" as const },
];

const posClasses = {
  "top-left": "top-4 left-4 md:top-12 md:left-12",
  "top-right": "top-4 right-4 md:top-12 md:right-12",
  "bottom-left": "bottom-4 left-4 md:bottom-12 md:left-12",
  "bottom-right": "bottom-4 right-4 md:bottom-12 md:right-12",
} as const;

function FlyingCard({
  value,
  progress,
  reduce,
}: {
  value: typeof coreValues[number];
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const isLeft = value.pos.includes("left");
  const isTop = value.pos.includes("top");

  const startX = isLeft ? "-50vw" : "50vw";
  const startY = isTop ? "-30vh" : "30vh";

  const x = useTransform(progress, [0, 0.6], reduce ? ["0px", "0px"] : [startX, "0px"]);
  const y = useTransform(progress, [0, 0.6], reduce ? ["0px", "0px"] : [startY, "0px"]);

  return (
    <motion.div
      className={`absolute w-64 md:w-72 pointer-events-auto ${posClasses[value.pos]}`}
      style={{ x, y }}
    >
      <SpotlightCard variant="crimson" className="h-full">
        <div className="flex flex-col gap-3">
          <div className="p-2 bg-crimson/10 rounded-lg w-fit border border-crimson/20">
            <value.icon className="w-6 h-6 text-crimson" />
          </div>
          <h3 className="text-lg font-bold text-foreground">{value.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

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
  const reduce = useReducedMotion();
  const charContainer = useMemo(() => ({
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.03 } },
  }), [reduce]);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const dashSpeed = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const svgRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const assemblyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: assemblyProgress } = useScroll({
    target: assemblyRef,
    offset: ["start start", "end start"],
  });
  const bgOpacity = useTransform(assemblyProgress, [0, 0.8, 1], [0, 0.6, 0.8]);
  const centerScale = useTransform(assemblyProgress, [0, 0.8, 1], [1, 0.95, 0.9]);
  const centerOpacity = useTransform(assemblyProgress, [0, 0.8, 1], [1, 0.8, 0.7]);

  return (
    <>
      <section ref={heroRef} id="home" className="relative min-h-screen flex items-center px-8 bg-background overflow-hidden">
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
            className="lg:col-span-7 space-y-8"
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ y: portraitY, willChange: "transform" }}
            className="lg:col-span-5 hidden lg:flex items-center justify-center"
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
      </section>

      <div ref={assemblyRef} className="relative h-[200vh] bg-background">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-background/90 backdrop-blur-md z-0"
            style={{ opacity: bgOpacity }}
          />

          <motion.div
            className="relative z-10 text-center px-4 max-w-2xl"
            style={{ scale: centerScale, opacity: centerOpacity }}
          >
            <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-crimson to-crimson/50 flex items-center justify-center text-4xl md:text-6xl font-bold text-white shadow-2xl shadow-crimson/20">
              AP
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4 font-display">
              Engineering the Future
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
              Bridging the gap between physical systems and digital experiences.
            </p>
          </motion.div>

          <div className="absolute inset-0 z-20 p-4 md:p-12 pointer-events-none hidden md:block">
            {coreValues.map((value, index) => (
              <FlyingCard
                key={index}
                value={value}
                progress={assemblyProgress}
                reduce={reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
