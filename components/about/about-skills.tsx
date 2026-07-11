import { Reveal } from "@/components/reveal";
import EmptyState from "@/components/sanity/empty-state";
import type { Skill } from "@/lib/sanity-types";

export default function AboutSkills({ skills }: { skills: Skill[] }) {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1320,
        margin: "0 auto",
        padding: "20px clamp(18px,5vw,52px) 80px",
      }}
    >
      <Reveal style={{ marginBottom: 36 }}>
        <div
          style={{
            fontSize: 12.5,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#E0A65A",
            marginBottom: 14,
          }}
        >
          / Skills
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(32px,4.5vw,52px)",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          Capabilities we bring to every brief
        </h2>
      </Reveal>

      {skills.length === 0 ? (
        <EmptyState
          title="Skills coming soon"
          message="Add Skill documents in Sanity Studio to list capabilities here."
        />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 16,
          }}
        >
          {skills.map((skill, index) => (
            <Reveal key={skill._id} delay={index * 40} distance={18}>
              <div
                style={{
                  padding: "22px 20px",
                  borderRadius: 16,
                  border: "1px solid rgba(244,239,231,.1)",
                  background: "rgba(244,239,231,.03)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 17, color: "#F4EFE7" }}>{skill.name}</div>
                    {skill.category && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "rgba(244,239,231,.45)",
                          marginTop: 2,
                          letterSpacing: ".04em",
                        }}
                      >
                        {skill.category}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
