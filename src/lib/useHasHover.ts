import { useEffect, useRef } from "react";

export const useHasHover = () => {
  const ref = useRef(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    ref.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => (ref.current = e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return () => ref.current;
};
