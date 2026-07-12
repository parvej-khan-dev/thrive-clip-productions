// Shared content for the ThriveClip Productions site.

export const NAV_LINKS = [
  { label: "Home", href: "/", key: "home" },
  { label: "Services", href: "/services", key: "services" },
  { label: "Portfolio", href: "/portfolio", key: "portfolio" },
  // { label: "Blog", href: "/blog", key: "blog" },
  { label: "About", href: "/about", key: "about" },
  { label: "Contact", href: "/#contact", key: "contact" },
] as const;

export const BOOK_HREF = "/#booking";

export const LOGO_ROW = [
  "LUMEN",
  "Vertex",
  "Northwind",
  "Halcyon",
  "BloomKit",
  "Orbit Media",
  "Cascade",
  "Everline",
  "Nomad&Co",
  "Studio Ora",
  "Kindred",
  "Aperture",
];

export type ServiceIconName =
  | "social-media"
  | "meta-ads"
  | "reels"
  | "youtube"
  | "thumbnails"
  | "ad-campaign";

export interface Service {
  num: string;
  title: string;
  desc: string;
  bullets: string[];
  icon: ServiceIconName;
  delay: number;
}

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Social Media Content",
    desc: "Scroll-stopping posts, stories, and campaigns engineered for reach and saves.",
    bullets: [
      "Platform-native post design",
      "Story & carousel systems",
      "Monthly content calendar",
    ],
    icon: "social-media",
    delay: 0,
  },
  {
    num: "02",
    title: "Meta & Facebook Ads",
    desc: "Full-funnel paid social that turns attention into pipeline and revenue.",
    bullets: [
      "Funnel & audience strategy",
      "Creative testing at scale",
      "Weekly spend optimization",
    ],
    icon: "meta-ads",
    delay: 70,
  },
  {
    num: "03",
    title: "Reels & Short-Form Editing",
    desc: "Punchy vertical edits tuned for retention, shares, and follower growth.",
    bullets: [
      "Hook-first pacing",
      "Caption & sound design",
      "A/B thumbnail variants",
    ],
    icon: "reels",
    delay: 140,
  },
  {
    num: "04",
    title: "YouTube Video Editing",
    desc: "Long-form storytelling and pacing that keeps viewers watching to the end.",
    bullets: [
      "Narrative structure & pacing",
      "Color grade & sound mix",
      "Chapter markers & SEO copy",
    ],
    icon: "youtube",
    delay: 0,
  },
  {
    num: "05",
    title: "Thumbnails, Subtitles & Motion",
    desc: "Click-worthy packaging and kinetic graphics that lift every metric.",
    bullets: [
      "Custom thumbnail design",
      "Animated captions",
      "Kinetic typography & lower-thirds",
    ],
    icon: "thumbnails",
    delay: 70,
  },
  {
    num: "06",
    title: "Ad Campaign Management",
    desc: "Testing, scaling, and optimizing spend for the best possible ROAS.",
    bullets: [
      "Cross-platform media buying",
      "Creative + copy testing",
      "Reporting & ROAS reviews",
    ],
    icon: "ad-campaign",
    delay: 140,
  },
];

const grad = (a: string, b: string) => `linear-gradient(160deg,${a},${b})`;

export const FILTER_LIST = [
  "All",
  "Short Form",
  "YouTube",
  "Commercial Ads",
  "Motion Graphics",
  "Social Campaigns",
];

export interface WorkItem {
  title: string;
  cat: string;
  client: string;
  metric: string;
  metricLabel: string;
  bg: string;
  h: number;
}

export const WORK: WorkItem[] = [
  {
    title: "Founder Reels Series",
    cat: "Short Form",
    client: "BloomKit",
    metric: "+412%",
    metricLabel: "reach",
    bg: grad("#3a2d55", "#1a1526"),
    h: 300,
  },
  {
    title: "SaaS Launch Ad",
    cat: "Commercial Ads",
    client: "Vertex",
    metric: "3.8x",
    metricLabel: "ROAS",
    bg: grad("#5a3a2a", "#231712"),
    h: 230,
  },
  {
    title: "Channel Rebuild",
    cat: "YouTube",
    client: "Northwind",
    metric: "+60k",
    metricLabel: "subs",
    bg: grad("#26414a", "#111d22"),
    h: 340,
  },
  {
    title: "Kinetic Brand Loop",
    cat: "Motion Graphics",
    client: "Halcyon",
    metric: "2.1M",
    metricLabel: "plays",
    bg: grad("#4a2f45", "#1e1420"),
    h: 250,
  },
  {
    title: "DTC Campaign Q4",
    cat: "Social Campaigns",
    client: "Cascade",
    metric: "+28%",
    metricLabel: "CVR",
    bg: grad("#42472a", "#1c1e12"),
    h: 310,
  },
  {
    title: "Podcast Clips Engine",
    cat: "Short Form",
    client: "Kindred",
    metric: "9.4M",
    metricLabel: "views",
    bg: grad("#2c3b55", "#131a26"),
    h: 230,
  },
  {
    title: "Product Film",
    cat: "Commercial Ads",
    client: "Everline",
    metric: "+190%",
    metricLabel: "CTR",
    bg: grad("#553a2c", "#241813"),
    h: 330,
  },
  {
    title: "Explainer Motion Set",
    cat: "Motion Graphics",
    client: "Aperture",
    metric: "1.6M",
    metricLabel: "reach",
    bg: grad("#354a3d", "#151f19"),
    h: 250,
  },
  {
    title: "Creator Growth Sprint",
    cat: "Social Campaigns",
    client: "Studio Ora",
    metric: "+85%",
    metricLabel: "engagement",
    bg: grad("#453055", "#1c1524"),
    h: 290,
  },
];

export type ProcessIconName =
  "discovery" | "strategy" | "production" | "growth";

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  icon: ProcessIconName;
  delay: number;
}

export const PROCESS: ProcessStep[] = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We learn your goals, audience, and voice — then map where video can move the needle.",
    icon: "discovery",
    delay: 0,
  },
  {
    num: "02",
    title: "Content Strategy",
    desc: "A tailored content system: formats, hooks, cadence, and a 30-day production plan.",
    icon: "strategy",
    delay: 90,
  },
  {
    num: "03",
    title: "Production & Editing",
    desc: "Our team produces and edits premium video — thumbnails, captions, and motion included.",
    icon: "production",
    delay: 180,
  },
  {
    num: "04",
    title: "Growth & Optimization",
    desc: "We track performance and iterate on what works — compounding your results every month.",
    icon: "growth",
    delay: 270,
  },
];

export const VALUES = [
  "Premium quality",
  "On-time, always",
  "Data-driven",
  "Creator-first",
];

export interface Stat {
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  delay: number;
}

export const STATS: Stat[] = [
  { value: 500, suffix: "+", decimals: 0, label: "Videos delivered", delay: 0 },
  {
    value: 120,
    suffix: "M+",
    decimals: 0,
    label: "Views generated",
    delay: 90,
  },
  { value: 60, suffix: "+", decimals: 0, label: "Brands scaled", delay: 180 },
  {
    value: 4.9,
    suffix: "",
    decimals: 1,
    label: "Avg client rating",
    delay: 270,
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  result: string;
  resultLabel: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They turned our founder into a recognizable voice — leads now come in warm.",
    name: "Aria Mehta",
    role: "CEO, BloomKit",
    result: "+412%",
    resultLabel: "reach",
    avatar: grad("#E0A65A", "#8a6a2f"),
  },
  {
    quote:
      "The most reliable creative partner we've had. Premium output, zero babysitting.",
    name: "Daniel Cole",
    role: "Head of Growth, Vertex",
    result: "3.8x",
    resultLabel: "ROAS",
    avatar: grad("#6a5acd", "#2a2350"),
  },
  {
    quote:
      "We shipped 4x more content in half the time. Our channel finally took off.",
    name: "Priya Rao",
    role: "Creator, 480k subs",
    result: "+60k",
    resultLabel: "subs",
    avatar: grad("#3aa88a", "#155040"),
  },
  {
    quote:
      "Every deliverable felt handcrafted. The motion graphics are next level.",
    name: "Marcus Lang",
    role: "CMO, Northwind",
    result: "2.1M",
    resultLabel: "plays",
    avatar: grad("#c85a6a", "#5a2030"),
  },
];

export const BOOKING_PERKS = [
  "Free 30-minute strategy session",
  "A custom content growth roadmap",
  "No pressure, no obligation",
];

// Real availability + booking is powered by the Cal.com v2 API — see lib/cal.ts
// and components/home/booking.tsx. The former hardcoded BOOKING_DAYS/BOOKING_SLOTS
// mock data was removed when the live integration landed.

export type SocialName = "Instagram" | "WhatsApp" | "LinkedIn";

export interface Social {
  name: SocialName;
  href: string;
}

export const SOCIALS: Social[] = [
  { name: "Instagram", href: "https://www.instagram.com/thrive_clip_productions/" },
  {
    name: "WhatsApp",
    href: "https://wa.me/918239081636?text=Hi%2C%20I%27m%20interested%20in%20TCP%20services.%20Can%20you%20share%20more%20details%3F",
  },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/thrive-clip-productions" },
];

export const CONTACT = {
  phones: ["+91 82390 81636", "+91 97839 46464"],
  email: "thriveclipproductions@gmail.com",
  address: ["Jhotwara, Jaipur,", "Rajasthan 302012"],
  mapUrl: "https://maps.app.goo.gl/YN2HaqugW9mpBzAj7",
};
