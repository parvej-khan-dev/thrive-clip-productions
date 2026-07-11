import Link from "next/link";
import { BrandLogo, SocialIcon } from "@/components/icons";
import { NAV_LINKS, CONTACT, BOOK_HREF, type Social } from "@/lib/data";

export default function Footer({ socials }: { socials: Social[] }) {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid rgba(244,239,231,.08)",
        padding: "clamp(50px,6vw,80px) clamp(18px,5vw,52px) 40px",
        color: "#F4EFE7",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 40,
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
          >
            <BrandLogo height={30} />
          </div>
          <p
            style={{
              fontSize: 14,
              color: "rgba(244,239,231,.5)",
              lineHeight: 1.6,
              maxWidth: "34ch",
              margin: 0,
            }}
          >
            Premium video &amp; content production that helps brands and
            creators grow faster.
          </p>
        </div>

        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "rgba(244,239,231,.4)",
              marginBottom: 16,
            }}
          >
            Explore
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                data-cursor="lg"
                className="footer-link"
                style={{
                  textDecoration: "none",
                  color: "rgba(244,239,231,.62)",
                  fontSize: 14,
                  transition: "color .25s ease",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "rgba(244,239,231,.4)",
              marginBottom: 16,
            }}
          >
            Get started
          </div>
          <Link
            href={BOOK_HREF}
            data-cursor="lg"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 22px",
              borderRadius: 100,
              background: "linear-gradient(135deg,#E0A65A,#F0D3A0)",
              color: "#0A0908",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Book Strategy Call →
          </Link>
          <div
            style={{
              marginTop: 18,
              fontSize: 14,
              color: "rgba(244,239,231,.5)",
            }}
          >
            {CONTACT.email}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                data-cursor="lg"
                title={s.name}
                className="social-fab"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  width: 38,
                  height: 38,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "rgba(244,239,231,.05)",
                  border: "1px solid rgba(244,239,231,.12)",
                  transition:
                    "transform .3s ease,border-color .3s ease,background .3s ease",
                }}
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1320,
          margin: "50px auto 0",
          paddingTop: 26,
          borderTop: "1px solid rgba(244,239,231,.07)",
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          justifyContent: "space-between",
          fontSize: 12.5,
          color: "rgba(244,239,231,.4)",
        }}
      >
        <span>© 2026 ThriveClip Productions. All rights reserved.</span>
        <span>{CONTACT.address.join(" ")}</span>
      </div>
    </footer>
  );
}
