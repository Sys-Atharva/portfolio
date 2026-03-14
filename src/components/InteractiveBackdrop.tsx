import { useEffect, useRef } from "react";

const InteractiveBackdrop = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      container.style.transform = `perspective(1000px) rotateX(${y * -2}deg) rotateY(${x * 2}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        ref={containerRef}
        className="absolute inset-[-20%] perspective-grid transition-transform duration-700 ease-out"
        style={{ transformOrigin: "center center" }}
      />
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: "hsl(199 89% 60%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[120px]"
        style={{ background: "hsl(27 97% 61%)" }} />
    </div>
  );
};

export default InteractiveBackdrop;
