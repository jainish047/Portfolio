/* components/RadiationCanvas.tsx */
"use client";

import { div } from "framer-motion/client";
import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

interface RadiationCanvasProps {
  active: boolean;
  origins: { x: number; y: number }[];
}

const colors = [
  "rgba(0, 255, 255, ALPHA)",
  "rgba(160, 32, 240, ALPHA)",
  "rgba(255, 102, 255, ALPHA)",
  "rgba(255, 255, 255, ALPHA)",
];

export const RadiationCanvas: React.FC<RadiationCanvasProps> = ({
  active,
  origins,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;

    const emitParticle = (
      origin: { x: number; y: number },
      index: number
    ): Particle => {
      let angleDeg: number;

      if (index === 0) {
        // Top origin → emit upward
        angleDeg = 85 + Math.random() * 10; // 85–95 degrees
      } else {
        // Bottom origin → emit downward
        angleDeg = 265 + Math.random() * 10; // 265–275 degrees
      }

      const angle = (angleDeg * Math.PI) / 180;
      const speed = 2 + Math.random() * 1.5;

      const baseSize = 1;
      const size = baseSize * (0.8 + Math.random() * 0.4);

      return {
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (active) {
        origins.forEach((origin, index) => {
          // emit 3 particles per origin per frame
          for (let i = 0; i < 3; i++) {
            particlesRef.current.push(emitParticle(origin, index));
          }
        });
      }

      // update + draw
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          alpha: p.alpha - 0.01,
        }))
        .filter((p) => p.alpha > 0);

      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fillStyle = colors[
          Math.floor(Math.random() * colors.length)
        ].replace("ALPHA", p.alpha.toFixed(2));

        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [active, origins]);

  return (
    // <div className="border-3 border-pink-600">
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
    />
    // </div>
  );
};
