import { useEffect, useRef } from 'react';

const POOL_SIZE = 200;
const SPAWN_PER_FRAME = 3;

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number;
}

function spawn(x: number, y: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 0.8 + 0.2;
  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 0.3,
    life: 1,
    maxLife: Math.random() * 25 + 15,
    size: Math.random() * 6 + 3,
  };
}

export default function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const particles: Particle[] = Array.from({ length: POOL_SIZE }, () => spawn(-200, -200));

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn
      for (let i = 0; i < SPAWN_PER_FRAME; i++) {
        const dead = particles.find(p => p.life <= 0);
        if (dead) Object.assign(dead, spawn(mouseRef.current.x, mouseRef.current.y));
      }

      // Draw particles — soft radial gradients, no trail
      for (const p of particles) {
        if (p.life <= 0) continue;

        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.008;
        p.vx *= 0.995;
        p.life -= 1 / p.maxLife;

        const a = Math.max(0, p.life) * 0.35;
        if (a <= 0.005) continue;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `rgba(220,38,38,${a})`);
        grad.addColorStop(1, `rgba(220,38,38,0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99999 }}
    />
  );
}
