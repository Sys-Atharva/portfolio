import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useHasHover } from "@/lib/useHasHover";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  max?: number;
  as?: "button" | "div";
  [key: string]: unknown;
};

export function Magnetic({ children, className, max = 10, as = "div", ...rest }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const hasHover = useHasHover();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: reduce ? 9999 : 150, damping: reduce ? 9999 : 15 });
  const sy = useSpring(y, { stiffness: reduce ? 9999 : 150, damping: reduce ? 9999 : 15 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || !hasHover) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 2 * max);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, willChange: "transform" }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}
