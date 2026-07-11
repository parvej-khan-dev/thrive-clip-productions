import { LOGO_ROW } from "@/lib/data";

export default function LogoMarquee() {
  const row = [...LOGO_ROW, ...LOGO_ROW];
  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        padding: "26px 0",
        borderTop: "1px solid rgba(244,239,231,.06)",
        borderBottom: "1px solid rgba(244,239,231,.06)",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", width: "max-content", gap: 70, animation: "tcMarquee 26s linear infinite" }}>
        {row.map((brand, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              color: "rgba(244,239,231,.34)",
              whiteSpace: "nowrap",
              letterSpacing: ".02em",
            }}
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
