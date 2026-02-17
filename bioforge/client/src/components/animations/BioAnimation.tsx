import React, { useEffect, useRef } from "react";

export const BioAnimation: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;
      angle: number;
    }

    const particles: Particle[] = [];
    let time = 0;

    // Create particles dynamically
    const addParticle = () => {
      if (particles.length < 40) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5,
          life: 0,
          maxLife: 200 + Math.random() * 200,
          color: `hsl(${200 + Math.random() * 40}, ${70 + Math.random() * 20}%, 60%)`,
          angle: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = () => {
      time++;

      // Clear with fade
      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Add new particles occasionally
      if (time % 8 === 0) {
        addParticle();
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.angle += 0.02;

        // Wrap edges
        if (p.x < -p.size) p.x = canvas.offsetWidth + p.size;
        if (p.x > canvas.offsetWidth + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.offsetHeight + p.size;
        if (p.y > canvas.offsetHeight + p.size) p.y = -p.size;

        // Fade
        const progress = Math.min(1, p.life / p.maxLife);
        const alpha = Math.sin(progress * Math.PI) * 0.4;

        // Draw soft glow
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 4,
        );
        gradient.addColorStop(0, p.color.replace("60%", `${60 + alpha * 40}%`));
        gradient.addColorStop(1, p.color.replace("60%", "20%"));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle core
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Remove dead particles
        if (p.life > p.maxLife) {
          particles.splice(i, 1);
        }
      }

      // Draw subtle grid
      ctx.strokeStyle = "rgba(79, 70, 229, 0.02)";
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < canvas.offsetWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.offsetHeight);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.offsetHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.offsetWidth, y);
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
