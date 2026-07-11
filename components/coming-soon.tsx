import Link from "next/link";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { BOOK_HREF, SOCIALS } from "@/lib/data";

export default function ComingSoon({
  current,
  eyebrow,
  title,
  description,
}: {
  current: "services" | "portfolio" | "about";
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div style={{ position: "relative", background: "#0A0908", color: "#F4EFE7", minHeight: "100vh" }}>
      <NavBar current={current} />
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: 900,
          margin: "0 auto",
          padding: "170px clamp(18px,5vw,52px) 100px",
        }}
      >
        <div style={{ fontSize: 12.5, letterSpacing: ".2em", textTransform: "uppercase", color: "#E0A65A", marginBottom: 16 }}>
          {eyebrow}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(38px,6vw,72px)",
            lineHeight: 1.04,
            margin: "0 0 22px",
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "rgba(244,239,231,.6)", fontWeight: 300, margin: "0 0 34px", maxWidth: "56ch" }}>
          {description}
        </p>
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
      </section>
      <Footer socials={[...SOCIALS]} />
    </div>
  );
}
