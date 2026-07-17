import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useHasHover } from '@/lib/useHasHover';

export function CustomCursor() {
  const hasHover = useHasHover();
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!hasHover) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor="hover"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [hasHover, cursorX, cursorY]);

  if (!hasHover) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-crimson rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 border border-crimson/50 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.5 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
