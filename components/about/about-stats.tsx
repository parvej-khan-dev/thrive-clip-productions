"use client";

import { useEffect, useState } from "react";
import { revealStyle, useReveal } from "@/components/reveal";
import { STATS, type Stat } from "@/lib/data";
import { formatCount } from "@/lib/format-count";

function StatCard({ value, suffix, decimals, label, delay }: Stat) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [display, setDisplay] = useState(() => formatCount(0, decimals, suffix));

  useEffect(() => {
    if (!visible) return;
    const dur = 1500;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(formatCount(value * e, decimals, suffix));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, value, decimals, suffix]);

  return (
    <div
      ref={ref}
      style={{
        ...revealStyle(visible, delay, 26),
        padding: "30px 26px",
        borderRadius: 20,
        background: "linear-gradient(180deg,rgba(244,239,231,.05),rgba(244,239,231,.015))",
        border: "1px solid rgba(244,239,231,.09)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(38px,4.5vw,52px)",
          lineHeight: 1,
          color: "#F4EFE7",
        }}
      >
        {display}
      </div>
      <div style={{ fontSize: 13, color: "rgba(244,239,231,.55)", marginTop: 10 }}>{label}</div>
    </div>
  );
}

export default function AboutStats() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1320,
        margin: "0 auto",
        padding: "20px clamp(18px,5vw,52px) 100px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 16,
        }}
      >
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
