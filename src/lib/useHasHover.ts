import { useState, useEffect } from 'react';

export function useHasHover() {
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setHasHover(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return hasHover;
}
