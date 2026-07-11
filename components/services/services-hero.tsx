import { Reveal } from "@/components/reveal";

export default function ServicesHero() {
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
        / Services
      </Reveal>
      <Reveal delay={60} distance={24}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(40px,7vw,88px)",
            lineHeight: 1.02,
            margin: 0,
            maxWidth: "18ch",
          }}
        >
          Everything your content engine needs,{" "}
          <span style={{ fontStyle: "italic", color: "#E0A65A" }}>under one roof</span>
        </h1>
      </Reveal>
      <Reveal delay={120} distance={24}>
        <p
          style={{
            margin: "26px 0 0",
            maxWidth: "58ch",
            fontSize: "clamp(15px,1.3vw,18px)",
            lineHeight: 1.65,
            color: "rgba(244,239,231,.6)",
            fontWeight: 300,
          }}
        >
          From strategy to publish-ready assets — social content, paid media, editing, and motion
          graphics, run by one accountable team.
        </p>
      </Reveal>
    </header>
  );
}
