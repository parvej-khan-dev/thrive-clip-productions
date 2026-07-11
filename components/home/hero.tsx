import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { BOOK_HREF } from "@/lib/data";
import type { SiteSettings } from "@/lib/sanity-types";

function FloatingChip({
  top,
  right,
  animation,
  icon,
  label,
}: {
  top: string;
  right: string;
  animation: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="tc-float"
      style={{ position: "absolute", top, right, animation, pointerEvents: "none" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "11px 15px",
          borderRadius: 14,
          background: "rgba(244,239,231,.05)",
          border: "1px solid rgba(244,239,231,.1)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 18px 40px rgba(0,0,0,.35)",
        }}
      >
        {icon}
        <span style={{ fontSize: 12.5, color: "rgba(244,239,231,.85)" }}>{label}</span>
      </div>
    </div>
  );
}

const STAT_ITEMS = [
  { value: "120M+", label: "Views generated" },
  { value: "500+", label: "Videos delivered" },
  { value: "60+", label: "Brands scaled" },
];

function renderHeroTitle(title: string) {
  const withoutMatch = title.match(/^(.*?)\bwithout\b(.*)$/i);
  if (!withoutMatch) {
    return title;
  }

  return (
    <>
      {withoutMatch[1]}
      <span style={{ fontStyle: "italic", color: "#E0A65A" }}>without</span>
      {withoutMatch[2]}
    </>
  );
}

export default function Hero({ settings }: { settings: SiteSettings }) {
  const title =
    settings.heroTitle ?? "Scale your content without scaling your workload";
  const subtitle =
    settings.heroSubtitle ??
    "We help creators and businesses produce premium social media content that drives growth, saves time, and builds authority.";

  return (
    <header
      id="top"
      style={{
        position: "relative",
        zIndex: 2,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "150px clamp(18px,5vw,52px) 90px",
        maxWidth: 1320,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "6%",
          width: "clamp(120px,16vw,220px)",
          height: "clamp(120px,16vw,220px)",
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, rgba(224,166,90,.5), rgba(224,166,90,0) 60%)",
          filter: "blur(6px)",
          animation: "tcFloatSlow 9s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <FloatingChip
        top="15%"
        right="19%"
        animation="tcFloat 7s ease-in-out infinite"
        label="Video Editing"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E0A65A" strokeWidth={1.7}>
            <rect x="2" y="5" width="14" height="14" rx="2.5" />
            <path d="M16 10l6-3v10l-6-3z" />
          </svg>
        }
      />
      <FloatingChip
        top="70%"
        right="13%"
        animation="tcFloat 8.5s ease-in-out .8s infinite"
        label="+320% Reach"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E0A65A" strokeWidth={1.7}>
            <path d="M3 17l5-5 4 3 6-7" />
            <path d="M17 8h4v4" />
          </svg>
        }
      />
      <FloatingChip
        top="45%"
        right="6%"
        animation="tcFloatSlow 10s ease-in-out .4s infinite"
        label="Saves 20h / week"
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E0A65A" strokeWidth={1.7}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4l3 2" />
          </svg>
        }
      />

      <Reveal
        delay={0}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          alignSelf: "flex-start",
          padding: "8px 16px",
          borderRadius: 100,
          background: "rgba(244,239,231,.04)",
          border: "1px solid rgba(244,239,231,.1)",
          marginBottom: 34,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#5FD08A",
            boxShadow: "0 0 10px #5FD08A",
            animation: "tcPulseGlow 2s infinite",
          }}
        />
        <span style={{ fontSize: 12.5, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(244,239,231,.7)" }}>
          Creative Video &amp; Content Studio
        </span>
      </Reveal>

      <Reveal
        as="h1"
        delay={80}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "clamp(46px,8.2vw,108px)",
          lineHeight: 0.98,
          letterSpacing: "-.01em",
          margin: 0,
          maxWidth: "16ch",
        }}
      >
        {renderHeroTitle(title)}
      </Reveal>

      <Reveal
        as="p"
        delay={160}
        style={{
          margin: "32px 0 0",
          maxWidth: "56ch",
          fontSize: "clamp(16px,1.5vw,19px)",
          lineHeight: 1.65,
          color: "rgba(244,239,231,.62)",
          fontWeight: 300,
        }}
      >
        {subtitle}
      </Reveal>

      <Reveal delay={240} style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 44 }}>
        <Link
          href={BOOK_HREF}
          data-cursor="lg"
          className="tc-cta-primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "17px 30px",
            borderRadius: 100,
            background: "linear-gradient(135deg,#E0A65A,#F0D3A0)",
            color: "#0A0908",
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 12px 40px rgba(224,166,90,.3)",
          }}
        >
          Book Strategy Call<span>→</span>
        </Link>
        <Link
          href="/portfolio"
          data-cursor="lg"
          className="tc-cta-secondary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 11,
            padding: "17px 30px",
            borderRadius: 100,
            background: "rgba(244,239,231,.04)",
            border: "1px solid rgba(244,239,231,.16)",
            color: "#F4EFE7",
            fontSize: 15,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              width: 26,
              height: 26,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "rgba(224,166,90,.18)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#E0A65A">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          View Portfolio
        </Link>
      </Reveal>

      <Reveal
        delay={340}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 38,
          marginTop: 70,
          paddingTop: 34,
          borderTop: "1px solid rgba(244,239,231,.08)",
        }}
      >
        {STAT_ITEMS.map((s) => (
          <div key={s.label}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 34, color: "#F4EFE7" }}>{s.value}</div>
            <div style={{ fontSize: 12.5, color: "rgba(244,239,231,.5)", letterSpacing: ".04em", marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </Reveal>
    </header>
  );
}
