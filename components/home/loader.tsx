"use client";

import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/icons";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0908",
        transition: "opacity .8s ease, visibility .8s ease",
        opacity: loading ? 1 : 0,
        visibility: loading ? "visible" : "hidden",
        pointerEvents: loading ? "auto" : "none",
      }}
    >
      <div style={{ textAlign: "center", transform: "translateY(-6px)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 18,
            animation: "tcRise .8s both",
          }}
        >
          {/* <BrandLogo height={40} /> */}
          Thrive Clip
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(38px,6vw,64px)",
            lineHeight: 1,
            color: "#F4EFE7",
            animation: "tcRise .9s .05s both",
          }}
        >
          Productions
        </div>
        <div
          style={{
            width: "min(260px,60vw)",
            height: 2,
            margin: "34px auto 0",
            background: "rgba(244,239,231,.12)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg,#E0A65A,#F0D3A0)",
              animation: "tcLoaderBar 2.2s cubic-bezier(.7,0,.2,1) forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
}
