import { Reveal } from "@/components/reveal";

export default function PortfolioHero() {
  return (
    <header
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1320,
        margin: "0 auto",
        padding: "170px clamp(18px,5vw,52px) 30px",
        textAlign: "center",
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
        / Portfolio
      </Reveal>
      <Reveal delay={60} distance={24}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(40px,7vw,84px)",
            lineHeight: 1.02,
            margin: "0 auto",
            maxWidth: "20ch",
          }}
        >
          Work that moved the numbers
        </h1>
      </Reveal>
      <Reveal delay={120} distance={24}>
        <p
          style={{
            margin: "26px auto 0",
            maxWidth: "56ch",
            fontSize: 15.5,
            lineHeight: 1.65,
            color: "rgba(244,239,231,.6)",
            fontWeight: 300,
          }}
        >
          A sample of recent client work across short-form, YouTube, paid ads, and motion design.
        </p>
      </Reveal>
    </header>
  );
}
