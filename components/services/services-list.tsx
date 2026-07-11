import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/icons";
import { BOOK_HREF, SERVICES } from "@/lib/data";

export default function ServicesList() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1320,
        margin: "0 auto",
        padding: "20px clamp(18px,5vw,52px) 100px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {SERVICES.map((svc) => (
        <Reveal key={svc.num} delay={svc.delay} distance={26}>
          <div
            className="tc-service-detail"
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 22,
              background: "linear-gradient(180deg,rgba(244,239,231,.045),rgba(244,239,231,.015))",
              border: "1px solid rgba(244,239,231,.09)",
              padding: "clamp(28px,4vw,44px)",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "clamp(20px,3vw,40px)",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                width: 64,
                height: 64,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
                background: "rgba(224,166,90,.12)",
                border: "1px solid rgba(224,166,90,.25)",
                flexShrink: 0,
              }}
            >
              <ServiceIcon name={svc.icon} size={26} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(224,166,90,.9)",
                  letterSpacing: ".06em",
                  marginBottom: 8,
                }}
              >
                {svc.num}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(24px,2.6vw,30px)",
                  margin: "0 0 10px",
                }}
              >
                {svc.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "rgba(244,239,231,.55)",
                  fontWeight: 300,
                  margin: "0 0 16px",
                  maxWidth: "60ch",
                }}
              >
                {svc.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {svc.bullets.map((bullet) => (
                  <span
                    key={bullet}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "8px 14px",
                      borderRadius: 100,
                      background: "rgba(244,239,231,.04)",
                      border: "1px solid rgba(244,239,231,.1)",
                      fontSize: 12.5,
                      color: "rgba(244,239,231,.72)",
                    }}
                  >
                    <span style={{ color: "#5FD08A" }}>✓</span>
                    {bullet}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={BOOK_HREF}
              data-cursor="lg"
              className="tc-service-start"
              style={{
                justifySelf: "end",
                alignSelf: "center",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 22px",
                borderRadius: 100,
                background: "rgba(244,239,231,.05)",
                border: "1px solid rgba(244,239,231,.16)",
                color: "#F4EFE7",
                fontSize: 13.5,
                fontWeight: 500,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Get started<span>→</span>
            </Link>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
