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
  YouTube:
    "M23 12s0-3.3-.4-4.8a2.5 2.5 0 00-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.4A2.5 2.5 0 001.4 7.2C1 8.7 1 12 1 12s0 3.3.4 4.8a2.5 2.5 0 001.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.4a2.5 2.5 0 001.8-1.8C23 15.3 23 12 23 12zM10 15V9l5 3z",
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
