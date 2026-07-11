import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/icons";
import { SERVICES } from "@/lib/data";

export default function ServicesPreview() {
  return (
    <section
      id="services"
      style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "clamp(80px,10vw,140px) clamp(18px,5vw,52px)" }}
    >
      <Reveal
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          marginBottom: 56,
        }}
      >
        <div>
          <div style={{ fontSize: 12.5, letterSpacing: ".2em", textTransform: "uppercase", color: "#E0A65A", marginBottom: 16 }}>
            / What we do
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(36px,5.5vw,68px)",
              lineHeight: 1.02,
              margin: 0,
              maxWidth: "15ch",
            }}
          >
            A full content engine, handled end to end
          </h2>
        </div>
        <Link
          href="/services"
          data-cursor="lg"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            textDecoration: "none",
            color: "#F4EFE7",
            fontSize: 14.5,
            borderBottom: "1px solid rgba(224,166,90,.5)",
            paddingBottom: 3,
            whiteSpace: "nowrap",
          }}
        >
          Explore all services <span style={{ color: "#E0A65A" }}>→</span>
        </Link>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
        {SERVICES.map((svc) => (
          <Reveal key={svc.num} delay={svc.delay} distance={26}>
            <div
              data-cursor="lg"
              className="tc-service-card"
              style={{
                position: "relative",
                overflow: "hidden",
                padding: "34px 30px 38px",
                borderRadius: 20,
                background: "linear-gradient(180deg,rgba(244,239,231,.045),rgba(244,239,231,.015))",
                border: "1px solid rgba(244,239,231,.09)",
                height: "100%",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: "radial-gradient(circle,rgba(224,166,90,.18),transparent 70%)",
                  opacity: 0.7,
                }}
              />
              <div
                style={{
                  position: "relative",
                  display: "inline-flex",
                  width: 52,
                  height: 52,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 14,
                  background: "rgba(224,166,90,.12)",
                  border: "1px solid rgba(224,166,90,.25)",
                  marginBottom: 24,
                }}
              >
                <ServiceIcon name={svc.icon} />
              </div>
              <div style={{ position: "relative", fontSize: 12, color: "rgba(224,166,90,.9)", letterSpacing: ".06em", marginBottom: 8 }}>
                {svc.num}
              </div>
              <h3 style={{ position: "relative", fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 25, margin: "0 0 12px" }}>
                {svc.title}
              </h3>
              <p style={{ position: "relative", fontSize: 14.5, lineHeight: 1.6, color: "rgba(244,239,231,.55)", fontWeight: 300, margin: 0 }}>
                {svc.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
