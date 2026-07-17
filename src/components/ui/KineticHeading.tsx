import { motion, useReducedMotion } from 'framer-motion';

interface KineticHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function KineticHeading({ children, className = '', delay = 0 }: KineticHeadingProps) {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden">
      <motion.h2
        className={`font-display text-3xl md:text-5xl font-bold tracking-tight ${className}`}
        initial={{
          y: reduce ? 0 : '100%',
          color: reduce ? '#FAFAFA' : '#525252',
        }}
        whileInView={{
          y: 0,
          color: '#FAFAFA',
        }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.8,
          delay: reduce ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.h2>
    </div>
  );
}
