import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useHasHover } from "@/lib/useHasHover";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "emerald" | "teal";
};

const gradients = {
  emerald: "radial-gradient(600px circle at var(--x) var(--y), rgba(16,185,129,0.08), transparent 40%)",
  teal: "radial-gradient(600px circle at var(--x) var(--y), rgba(6,182,212,0.08), transparent 40%)",
};

export function SpotlightCard({ children, className, variant = "emerald" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 200, damping: 30 });
  const sy = useSpring(my, { stiffness: 200, damping: 30 });
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 30 });
  const sry = useSpring(ry, { stiffness: 200, damping: 30 });
  const bg = useMotionTemplate`${gradients[variant]}`;
  const hasHover = useHasHover();

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (!hasHover()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    ry.set((px - 0.5) * 16);
    rx.set((0.5 - py) * 16);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: bg, ["--x" as string]: sx, ["--y" as string]: sy, willChange: "transform" }}
      />
      <motion.div
        className="relative"
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", willChange: "transform" }}
        whileHover={hasHover() ? { transform: "translate3d(0,0,20px)" } : undefined}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
