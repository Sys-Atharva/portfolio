import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useHasHover } from '@/lib/useHasHover';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'crimson' | 'neutral';
}

export function SpotlightCard({ children, className = '', variant = 'crimson' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasHover = useHasHover();
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = reduce ? { stiffness: 9999, damping: 9999 } : { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    const centerX = width / 2;
    const centerY = height / 2;

    const rotateXValue = ((mouseYPos - centerY) / centerY) * -8;
    const rotateYValue = ((mouseXPos - centerX) / centerX) * 8;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const gradientColor = variant === 'crimson'
    ? 'rgba(220, 38, 38, 0.15)'
    : 'rgba(255, 255, 255, 0.1)';

  const background = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors hover:border-crimson/50 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px)',
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
