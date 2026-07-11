import { Reveal } from "@/components/reveal";
import { ProcessIcon } from "@/components/icons";
import { PROCESS } from "@/lib/data";

export default function AboutProcess() {
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
      <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
        <div
          style={{
            fontSize: 12.5,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#E0A65A",
            marginBottom: 16,
          }}
        >
          / How we work
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(34px,5vw,60px)",
            lineHeight: 1.02,
            margin: 0,
          }}
        >
          Four steps to a content system
        </h2>
      </Reveal>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 20,
        }}
      >
        {PROCESS.map((step) => (
          <Reveal key={step.num} delay={step.delay} distance={26}>
            <div
              style={{
                position: "relative",
                padding: "32px 26px",
                borderRadius: 20,
                background: "linear-gradient(180deg,rgba(244,239,231,.045),rgba(244,239,231,.012))",
                border: "1px solid rgba(244,239,231,.09)",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 56,
                  lineHeight: 1,
                  color: "rgba(224,166,90,.35)",
                  marginBottom: 20,
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  width: 44,
                  height: 44,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                  background: "rgba(224,166,90,.12)",
                  border: "1px solid rgba(224,166,90,.25)",
                  marginBottom: 18,
                }}
              >
                <ProcessIcon name={step.icon} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 23,
                  margin: "0 0 10px",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "rgba(244,239,231,.55)",
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
