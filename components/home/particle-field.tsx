"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let parts: Particle[] = [];
    let raf = 0;

    const setup = (reason = "init") => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      if (w === 0 || h === 0) {
        // #region agent log
        fetch("http://127.0.0.1:7717/ingest/d94b2140-3ee8-4a9e-b93f-176ed3646a97", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "d48b32",
          },
          body: JSON.stringify({
            sessionId: "d48b32",
            runId: "post-fix",
            hypothesisId: "B",
            location: "particle-field.tsx:setup",
            message: "canvas setup skipped zero size",
            data: { reason, w, h, dpr },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion
        return;
      }
      const allocW = Math.floor(w * dpr);
      const allocH = Math.floor(h * dpr);
      cv.width = allocW;
      cv.height = allocH;
      const allocOk = cv.width === allocW && cv.height === allocH;
      // #region agent log
      fetch("http://127.0.0.1:7717/ingest/d94b2140-3ee8-4a9e-b93f-176ed3646a97", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "d48b32",
        },
        body: JSON.stringify({
          sessionId: "d48b32",
          runId: "post-fix",
          hypothesisId: "B",
          location: "particle-field.tsx:setup",
          message: "canvas setup allocation",
          data: {
            reason,
            innerW: window.innerWidth,
            innerH: window.innerHeight,
            clientW: cv.clientWidth,
            clientH: cv.clientHeight,
            dpr,
            allocW,
            allocH,
            actualW: cv.width,
            actualH: cv.height,
            allocOk,
            pixels: cv.width * cv.height,
            clientMatchesViewport:
              Math.abs(cv.clientWidth - window.innerWidth) <= 1 &&
              Math.abs(cv.clientHeight - window.innerHeight) <= 1,
            noRunawayGrowth: cv.clientWidth <= window.innerWidth + 1,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(80, Math.floor((w * h) / 16000));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
      }));
    };
    setup("init");
    let resizeTimer = 0;
    const onResize = () => {
      // #region agent log
      fetch("http://127.0.0.1:7717/ingest/d94b2140-3ee8-4a9e-b93f-176ed3646a97", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "d48b32",
        },
        body: JSON.stringify({
          sessionId: "d48b32",
          runId: "post-fix",
          hypothesisId: "B",
          location: "particle-field.tsx:onResize",
          message: "canvas size during live resize",
          data: {
            innerW: window.innerWidth,
            innerH: window.innerHeight,
            clientW: cv.clientWidth,
            clientH: cv.clientHeight,
            bitmapW: cv.width,
            bitmapH: cv.height,
            clientMatchesViewport:
              Math.abs(cv.clientWidth - window.innerWidth) <= 1 &&
              Math.abs(cv.clientHeight - window.innerHeight) <= 1,
            noRunawayGrowth: cv.clientWidth <= window.innerWidth + 1,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => setup("resize"), 150);
    };
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = "rgba(224,166,90,.5)";
        ctx.fill();
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = dx * dx + dy * dy;
          if (d < 12000) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(224,166,90,${0.12 * (1 - d / 12000)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.55,
      }}
    />
  );
}
