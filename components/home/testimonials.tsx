"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  const active = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1040,
        margin: "0 auto",
        padding: "clamp(80px,10vw,140px) clamp(18px,5vw,52px)",
        textAlign: "center",
      }}
    >
      <Reveal>
        <div style={{ fontSize: 12.5, letterSpacing: ".2em", textTransform: "uppercase", color: "#E0A65A", marginBottom: 16 }}>
          / Loved by clients
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(36px,5.5vw,68px)",
            lineHeight: 1.02,
            margin: "0 0 50px",
          }}
        >
          Results people talk about
        </h2>
      </Reveal>

      <Reveal
        distance={20}
        style={{
          position: "relative",
          padding: "clamp(34px,5vw,60px)",
          borderRadius: 26,
          background: "linear-gradient(180deg,rgba(244,239,231,.05),rgba(244,239,231,.015))",
          border: "1px solid rgba(244,239,231,.1)",
          minHeight: 300,
        }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: 90, lineHeight: 0.6, color: "rgba(224,166,90,.3)", height: 44 }}>
          &ldquo;
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px,3vw,34px)",
            lineHeight: 1.4,
            margin: "0 auto 34px",
            maxWidth: "24ch",
            color: "#F4EFE7",
            transition: "opacity .4s ease",
          }}
        >
          {active.quote}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 15 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: active.avatar, border: "1px solid rgba(244,239,231,.2)" }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#F4EFE7" }}>{active.name}</div>
            <div style={{ fontSize: 13, color: "rgba(244,239,231,.55)" }}>{active.role}</div>
          </div>
          <div style={{ width: 1, height: 34, background: "rgba(244,239,231,.15)", margin: "0 6px" }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#E0A65A" }}>{active.result}</div>
            <div style={{ fontSize: 13, color: "rgba(244,239,231,.55)" }}>{active.resultLabel}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginTop: 36 }}>
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              data-cursor="lg"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial from ${t.name}`}
              style={{
                width: i === index ? 26 : 8,
                height: 8,
                borderRadius: 100,
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all .35s ease",
                background: i === index ? "#E0A65A" : "rgba(244,239,231,.25)",
              }}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
