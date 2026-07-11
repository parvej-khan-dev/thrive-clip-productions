"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const hit = target?.closest?.("a,button,[data-cursor],input,textarea");
      if (hit) {
        ring.style.width = "58px";
        ring.style.height = "58px";
        ring.style.margin = "-29px 0 0 -29px";
        ring.style.background = "rgba(224,166,90,.12)";
        ring.style.borderColor = "rgba(224,166,90,.9)";
      } else {
        ring.style.width = "38px";
        ring.style.height = "38px";
        ring.style.margin = "-19px 0 0 -19px";
        ring.style.background = "transparent";
        ring.style.borderColor = "rgba(224,166,90,.7)";
      }
    };
    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 38,
          height: 38,
          margin: "-19px 0 0 -19px",
          border: "1px solid rgba(224,166,90,.7)",
          borderRadius: "50%",
          zIndex: 10000,
          pointerEvents: "none",
          transition: "width .25s ease,height .25s ease,margin .25s ease,background .25s ease,border-color .25s ease",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          margin: "-2.5px 0 0 -2.5px",
          background: "#E0A65A",
          borderRadius: "50%",
          zIndex: 10001,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
