import Image from "next/image";
import type { ServiceIconName, ProcessIconName, SocialName } from "@/lib/data";

const GOLD = "#E0A65A";

// Full "Thrive Clip Production" wordmark (trimmed of transparent padding).
// Intrinsic ratio ≈ 6.53:1 — keep width in sync with the source file.
const BRAND_LOGO_RATIO = 6.53;
export function BrandLogo({ height = 34 }: { height?: number }) {
  return (
    <Image
      src="/logo/thriveclip-logo.png"
      alt="Thrive Clip Production"
      height={height}
      width={Math.round(height * BRAND_LOGO_RATIO)}
      priority
      style={{ height, width: "auto", objectFit: "contain", display: "block" }}
    />
  );
}

export function PlayIcon({
  size = 11,
  fill = "#F4EFE7",
}: {
  size?: number;
  fill?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <span
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size * 0.26,
        background: "linear-gradient(140deg,#E0A65A,#8a6a2f)",
        boxShadow: "0 6px 20px rgba(224,166,90,.32)",
        flexShrink: 0,
      }}
    >
      <PlayIcon size={size * 0.47} fill="#0A0908" />
    </span>
  );
}

const strokeProps = {
  fill: "none",
  stroke: GOLD,
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SERVICE_PATHS: Record<ServiceIconName, React.ReactNode> = {
  "social-media": (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="1" />
    </>
  ),
  "meta-ads": (
    <>
      <path d="M3 17l5-5 4 3 6-8" />
      <path d="M18 7h3v3" />
    </>
  ),
  reels: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M10 9l5 3-5 3z" fill={GOLD} stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l5 3-5 3z" fill={GOLD} stroke="none" />
    </>
  ),
  thumbnails: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2.5" />
      <path d="M7 20h10" />
      <path d="M7 8h5" />
    </>
  ),
  "ad-campaign": (
    <>
      <path d="M12 3v18" />
      <path d="M5 8l7-5 7 5" />
      <circle cx="12" cy="15" r="3.5" />
    </>
  ),
};

const PROCESS_PATHS: Record<ProcessIconName, React.ReactNode> = {
  discovery: (
    <path d="M4 5a2 2 0 012-2h2l2 4-2 1a11 11 0 005 5l1-2 4 2v2a2 2 0 01-2 2A16 16 0 014 5z" />
  ),
  strategy: (
    <>
      <path d="M4 6h16M4 12h10M4 18h7" />
      <circle cx="18" cy="15" r="3" />
    </>
  ),
  production: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M9 9l5 3-5 3z" fill={GOLD} stroke="none" />
    </>
  ),
  growth: (
    <>
      <path d="M3 17l5-5 4 3 6-8" />
      <path d="M18 7h3v3" />
    </>
  ),
};

export function ServiceIcon({
  name,
  size = 22,
}: {
  name: ServiceIconName;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps}>
      {SERVICE_PATHS[name]}
    </svg>
  );
}

export function ProcessIcon({
  name,
  size = 22,
}: {
  name: ProcessIconName;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps}>
      {PROCESS_PATHS[name]}
    </svg>
  );
}

const SOCIAL_PATHS: Record<SocialName, string> = {
  Instagram:
    "M12 2c2.7 0 3 0 4.1.1 1 0 1.7.2 2.3.5.6.2 1 .5 1.5 1s.8.9 1 1.5c.3.6.4 1.3.5 2.3.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.7-.5 2.3a4 4 0 01-1 1.5 4 4 0 01-1.5 1c-.6.3-1.3.4-2.3.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.7-.2-2.3-.5a4 4 0 01-1.5-1 4 4 0 01-1-1.5c-.3-.6-.4-1.3-.5-2.3C2 15 2 14.7 2 12s0-3 .1-4.1c0-1 .2-1.7.5-2.3a4 4 0 011-1.5 4 4 0 011.5-1c.6-.3 1.3-.4 2.3-.5C9 2 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-2.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z",
  WhatsApp:
    "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 012.37 5.72c0 4.47-3.64 8.11-8.11 8.11a8.1 8.1 0 01-4.13-1.13l-.3-.18-3.06.8.82-3-.19-.31a8.05 8.05 0 01-1.24-4.29c0-4.47 3.64-8.11 8.12-8.11zm-3.02 4.32c-.15 0-.4.06-.61.29-.21.23-.8.78-.8 1.91 0 1.13.82 2.22.94 2.37.15.18 1.62 2.48 3.94 3.48.55.24.98.38 1.31.49.55.17 1.06.15 1.46.09.44-.07 1.37-.56 1.56-1.1.19-.54.19-1 .13-1.1-.06-.09-.21-.15-.44-.26-.23-.12-1.37-.68-1.58-.75-.21-.08-.37-.12-.52.11-.15.23-.6.75-.73.9-.14.15-.27.17-.5.06-.23-.12-.98-.36-1.86-1.15-.69-.61-1.15-1.37-1.29-1.6-.13-.23-.01-.35.1-.47.11-.11.23-.27.34-.41.12-.14.15-.23.23-.38.08-.15.04-.29-.02-.41-.06-.11-.52-1.26-.72-1.72-.19-.45-.38-.39-.52-.4h-.44z",
  LinkedIn:
    "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z",
};

export function SocialIcon({
  name,
  size = 18,
  fill = "rgba(244,239,231,.8)",
}: {
  name: SocialName;
  size?: number;
  fill?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d={SOCIAL_PATHS[name]} />
    </svg>
  );
}

export function CheckIcon({
  size = 22,
  color = "#5FD08A",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size * 0.64}
      height={size * 0.64}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.2}
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ClockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...strokeProps}
      strokeWidth={1.8}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}
