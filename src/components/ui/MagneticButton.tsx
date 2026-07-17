import { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useReducedMotion } from 'framer-motion';
import { useHasHover } from '@/lib/useHasHover';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const hasHover = useHasHover();
  const reduce = useReducedMotion();
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = reduce ? { stiffness: 9999, damping: 9999 } : { stiffness: 200, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set((mouseX - centerX) * 0.3);
    y.set((mouseY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const newRipple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
    onClick?.();
  };

  return (
    <motion.button
      ref={ref}
      className={`relative overflow-hidden rounded-full bg-crimson px-6 py-3 font-medium text-white transition-colors hover:bg-crimson/90 active:scale-95 ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-cursor="hover"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
          }}
        />
      ))}
    </motion.button>
  );
}
