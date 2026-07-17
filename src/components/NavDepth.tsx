import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useHasHover } from "@/lib/useHasHover";

type NavDepthProps = {
  children: ReactNode;
  className?: string;
};

export function NavDepth({ children, className }: NavDepthProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasHover = useHasHover();
  const { scrollY } = useScroll();
  const ry = useTransform(scrollY, [0, 800], [6, -6]);
  const sRy = useSpring(ry, { stiffness: 80, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: 1000,
        rotateY: hasHover() ? sRy : 0,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
