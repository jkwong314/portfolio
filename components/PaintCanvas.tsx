"use client";

import { useEffect, useRef } from "react";

export default function PaintCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", resize);

    let mouseX = 0;
    let mouseY = 0;
    let prevX = -1;
    let prevY = -1;
    let isDown = false;
    let hue = 220; // start at electric blue
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (prevX < 0) { prevX = mouseX; prevY = mouseY; }
    };
    const onDown = (e: MouseEvent) => {
      isDown = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onUp = () => { isDown = false; };

    // Soft radial dab — feathers to fully transparent at edge
    const dab = (x: number, y: number, radius: number, opacity: number, h: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0,    `hsla(${h}, 100%, 62%, ${opacity})`);
      g.addColorStop(0.25, `hsla(${h}, 100%, 58%, ${opacity * 0.70})`);
      g.addColorStop(0.55, `hsla(${h}, 100%, 54%, ${opacity * 0.22})`);
      g.addColorStop(0.80, `hsla(${h}, 100%, 50%, ${opacity * 0.04})`);
      g.addColorStop(1,    `hsla(${h}, 100%, 50%, 0)`);

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = () => {
      // destination-out gradually removes alpha — paint fades over ~4s at 60fps
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.008)";
      ctx.fillRect(0, 0, w, h);

      const dx = mouseX - prevX;
      const dy = mouseY - prevY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only paint while the mouse button is held (drag to paint)
      if (dist > 1 && isDown) {
        // Hue rotates with movement — fast drags sweep more of the spectrum
        hue = (hue + 0.6 + dist * 0.05) % 360;

        // Interpolate dabs for a smooth stroke
        const steps = Math.max(1, Math.ceil(dist / 4));
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const x = prevX + dx * t;
          const y = prevY + dy * t;
          const h = (hue + i * 1.5) % 360;

          // Outer soft glow layer
          dab(x, y, 110 + Math.random() * 60, 0.20, h);
          // Inner vivid core with shifted hue — creates chromatic mixing
          dab(x, y, 48  + Math.random() * 28, 0.32, (h + 25) % 360);
        }
      }

      if (dist > 0) {
        prevX = mouseX;
        prevY = mouseY;
      }

      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
