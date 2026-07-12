"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BOOK_HREF, NAV_LINKS } from "@/lib/data";
import { BrandLogo } from "@/components/icons";

type NavKey = (typeof NAV_LINKS)[number]["key"];

export default function NavBar({ current }: { current: NavKey | "blog" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current)
        bgRef.current.style.opacity = window.scrollY > 40 ? "1" : "0";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Chrome/macOS sometimes leaves the compositor showing a stale, washed-out
    // frame after a live window resize (most visible with backdrop-filter blur
    // stacked over fixed layers). Nudging a style forces a full repaint.
    let timeout: ReturnType<typeof setTimeout>;
    const forceRepaint = () => {
      document.body.style.opacity = "0.999";
      requestAnimationFrame(() => {
        document.body.style.opacity = "";
      });
    };
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(forceRepaint, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 clamp(18px,4vw,52px)",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          transition: "opacity .45s ease",
          background: "rgba(12,11,9,.72)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(244,239,231,.08)",
          transform: "translateZ(0)",
          willChange: "opacity",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1280,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 78,
        }}
      >
        <Link
          href="/"
          data-cursor="lg"
          className="tc-nav-logo"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#F4EFE7",
            minWidth: 0,
          }}
          aria-label="Thrive Clip Production — home"
        >
          <BrandLogo height={32} />
        </Link>

        <div
          style={{ display: "flex", alignItems: "center", gap: 34 }}
          data-desktop-nav="1"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              data-cursor="lg"
              style={{
                textDecoration: "none",
                fontSize: 14,
                fontWeight: current === link.key ? 600 : 400,
                letterSpacing: ".01em",
                color:
                  current === link.key ? "#E0A65A" : "rgba(244,239,231,.72)",
                transition: "color .25s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link
            href={BOOK_HREF}
            data-cursor="lg"
            className="tc-nav-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              borderRadius: 100,
              background: "linear-gradient(135deg,#E0A65A,#F0D3A0)",
              color: "#0A0908",
              fontSize: 13.5,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: ".01em",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 30px rgba(224,166,90,.28)",
              transition:
                "transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s ease",
            }}
          >
            Book a Call<span style={{ fontSize: 15 }}>→</span>
          </Link>
          <button
            data-mobile-toggle="1"
            data-cursor="lg"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              width: 42,
              height: 42,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 11,
              background: "rgba(244,239,231,.06)",
              border: "1px solid rgba(244,239,231,.14)",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F4EFE7"
              strokeWidth={2}
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="M5 5l14 14M19 5L5 19" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          inset: 0,
          top: 78,
          zIndex: 895,
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "rgba(10,9,8,.98)",
          backdropFilter: "blur(20px)",
        }}
      >
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.key}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            data-cursor="lg"
            style={{
              textDecoration: "none",
              color: "#F4EFE7",
              fontFamily: "var(--font-display)",
              fontSize: 30,
              opacity: 0,
              animation: `tcRise .5s ${i * 40}ms both`,
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={BOOK_HREF}
          onClick={() => setMenuOpen(false)}
          data-cursor="lg"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
            padding: "15px 30px",
            borderRadius: 100,
            background: "linear-gradient(135deg,#E0A65A,#F0D3A0)",
            color: "#0A0908",
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
            opacity: 0,
            animation: `tcRise .5s ${NAV_LINKS.length * 40}ms both`,
          }}
        >
          Book a Call<span style={{ fontSize: 16 }}>→</span>
        </Link>
      </div>
    </nav>
  );
}
