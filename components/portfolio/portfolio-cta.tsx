import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { BOOK_HREF } from "@/lib/data";

export default function PortfolioCta() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1320,
        margin: "0 auto",
        padding: "0 clamp(18px,5vw,52px) 120px",
      }}
    >
      <Reveal distance={26}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 28,
            border: "1px solid rgba(224,166,90,.22)",
            background: "linear-gradient(140deg,rgba(224,166,90,.1),rgba(244,239,231,.02) 50%)",
            padding: "clamp(40px,6vw,70px)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(30px,4.2vw,50px)",
              margin: "0 0 18px",
            }}
          >
            Want results like these?
          </h2>
          <p
            style={{
              fontSize: 15.5,
              color: "rgba(244,239,231,.6)",
              fontWeight: 300,
              margin: "0 auto 30px",
              maxWidth: "52ch",
            }}
          >
            Tell us about your brand and we&rsquo;ll show you the exact plan to get there.
          </p>
          <Link
            href={BOOK_HREF}
            data-cursor="lg"
            className="tc-cta-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "17px 32px",
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
        </div>
      </Reveal>
    </section>
  );
}
