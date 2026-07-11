import { Reveal } from "@/components/reveal";
import { VALUES } from "@/lib/data";
import type { SiteSettings } from "@/lib/sanity-types";

export default function AboutHero({ settings }: { settings: SiteSettings }) {
  const bio =
    settings.bio ??
    "ThriveClip Productions helps businesses and creators grow faster using high-performance video content systems — not one-off edits. We handle strategy, production, and optimization so you can stay in your zone of genius.";

  return (
    <header
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1320,
        margin: "0 auto",
        padding: "170px clamp(18px,5vw,52px) 60px",
      }}
    >
      <Reveal
        distance={24}
        style={{
          fontSize: 12.5,
          letterSpacing: ".2em",
          textTransform: "uppercase",
          color: "#E0A65A",
          marginBottom: 18,
        }}
      >
        / Who we are
      </Reveal>
      <Reveal delay={60} distance={24}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(40px,7vw,84px)",
            lineHeight: 1.03,
            margin: 0,
            maxWidth: "18ch",
          }}
        >
          A studio built to make growth{" "}
          <span style={{ fontStyle: "italic", color: "#E0A65A" }}>repeatable</span>
        </h1>
      </Reveal>
      <Reveal delay={120} distance={24}>
        <p
          style={{
            margin: "26px 0 0",
            maxWidth: "60ch",
            fontSize: "clamp(15px,1.3vw,18px)",
            lineHeight: 1.7,
            color: "rgba(244,239,231,.6)",
            fontWeight: 300,
          }}
        >
          {bio}
        </p>
      </Reveal>
      {settings.resumeUrl && (
        <Reveal delay={150} distance={24} style={{ marginTop: 22 }}>
          <a
            href={settings.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="lg"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#E0A65A",
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            View resume →
          </a>
        </Reveal>
      )}
      <Reveal
        delay={180}
        distance={24}
        style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}
      >
        {VALUES.map((v) => (
          <span
            key={v}
            style={{
              padding: "9px 16px",
              borderRadius: 100,
              background: "rgba(244,239,231,.05)",
              border: "1px solid rgba(244,239,231,.12)",
              fontSize: 13,
              color: "rgba(244,239,231,.8)",
            }}
          >
            {v}
          </span>
        ))}
      </Reveal>
    </header>
  );
}
