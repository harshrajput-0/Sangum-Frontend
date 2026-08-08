"use client";

import React, { useEffect, useRef } from "react";

/**
 * Animated particle-drift canvas layer — small twinkling dots that
 * drift freely across the space (no fixed origin, no connecting lines).
 */
const ParticleDriftBackground: React.FC<{ className?: string }> = ({
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLORS = ["#6d5dfe", "#4f8cff", "#39BFBF", "#8b7dff"];
    const COUNT = 80;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
      color: string;
    };

    let w = 0;
    let h = 0;
    let dpr = 1;
    let frameId = 0;
    let particles: Particle[] = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent!.clientWidth;
      h = parent!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeParticle(): Particle {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        baseAlpha: 0.25 + Math.random() * 0.5,
        twinkleSpeed: 0.0008 + Math.random() * 0.0015,
        twinklePhase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: COUNT }, makeParticle);
    }

    function step(time: number) {
      ctx!.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        const twinkle = 0.5 + 0.5 * Math.sin(time * p.twinkleSpeed + p.twinklePhase);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.baseAlpha * twinkle;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      });
      frameId = requestAnimationFrame(step);
    }

    window.addEventListener("resize", resize);
    init();

    if (!reduceMotion) {
      frameId = requestAnimationFrame(step);
    } else {
      step(0);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "absolute inset-0 h-full w-full"}
    />
  );
};

interface GlowDriftBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrap any section/page content in this to get the glow + particle-drift
 * background (purple-to-cyan ambient glow, drifting twinkling particles,
 * and the two soft blobs) behind it.
 *
 * The background layer is `fixed` and rendered as a sibling of the content
 * (not a parent), so it's pinned to the viewport and stays completely
 * still — it does not move, resize its position, or scroll with the page.
 *
 * Usage:
 *   <GlowDriftBackground>
 *     <YourPageContent />
 *   </GlowDriftBackground>
 */
export const GlowDriftBackground: React.FC<GlowDriftBackgroundProps> = ({
  children,
  className,
}) => {
  return (
    <>
      {/* Fixed background layer — pinned to the viewport, ignores scroll */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-dbg">


        {/* Faint ambient glow — purple to cyan, left to right */}
        {/* <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, var(--primary), var(--accent))",
            opacity: 0.14,
            filter: "blur(90px)",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 45%, black 0%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 55% at 50% 45%, black 0%, transparent 72%)",
          }}
        /> */}

        {/* Animated particle-drift background */}
        <ParticleDriftBackground className="absolute inset-0 h-full w-full pointer-events-none" />

        {/* Background glow blobs */}
        {/* <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-120 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-75 h-75 bg-accent/8 rounded-full blur-[100px]" />
        </div> */}
      </div>

      {/* Scrolling page content */}
      <div className={className ?? "relative min-h-screen"}>{children}</div>
    </>
  );
};