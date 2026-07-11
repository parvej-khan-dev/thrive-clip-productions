import { SocialIcon } from "@/components/icons";
import type { Social } from "@/lib/data";

export default function SocialFabBar({ socials }: { socials: Social[] }) {
  if (socials.length === 0) {
    return null;
  }

  return (
    <div style={{ position: "fixed", right: 20, bottom: 24, zIndex: 800, display: "flex", flexDirection: "column", gap: 10 }}>
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
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "rgba(12,11,9,.7)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(244,239,231,.14)",
          }}
        >
          <SocialIcon name={s.name} />
        </a>
      ))}
    </div>
  );
}
