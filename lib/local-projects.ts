import type { Project } from "@/lib/sanity-types";

// Portfolio videos that exceed Sanity's upload limit live in `public/videos/`
// and are served statically. Paths are URL-encoded because several filenames
// contain spaces. `getProjectVideoUrl` resolves these by project slug.
export const LOCAL_PROJECT_VIDEOS: Record<string, string> = {
  "sarodha-city-pushkar": "/videos/sarodha-city-pushkar.mp4",
  "2nd-final": "/videos/2nd-final.mp4",
  "certification-invitation": "/videos/Certification%20Invitation.mp4",
  "dr-mahendra-kumar-sharma": "/videos/Dr.%20Mahendra%20Kumar%20Sharma.mp4",
  "sital-ji": "/videos/sital%20ji%20final.mp4",
  "june-seminar": "/videos/15%20june%20seminar%20%203%20final.mp4",
  "raksha-bandhan": "/videos/Raksha%20Bandhan%20final.mp4",
  "leadership-is-bleeding": "/videos/Leadership%20is%20bleeding.mp4",
  "the-innovation-drain": "/videos/The%20Innovation%20Drain.mp4",
  "what-if-leadership": "/videos/What%20if%20leadership.mp4",
  "he-and-she-1": "/videos/he%20and%20she%201_1.mp4",
  "he-and-she-2": "/videos/he%20and%20she%202.mp4",
  "model-feature": "/videos/model%20video%201k.mp4",
  "thirty-second-spot": "/videos/30%20sec%201st%20final.mp4",
  "content-reel-01": "/videos/10%20july.mp4",
  "content-reel-02": "/videos/12%20july.final.mp4",
  "content-reel-03": "/videos/2.mp4",
  "content-reel-04": "/videos/new%20one.mp4",
};

export const LOCAL_PROJECTS: Project[] = [
  {
    _id: "local-sarodha-city-pushkar",
    _type: "project",
    title: "Sarodha City Pushkar",
    slug: { _type: "slug", current: "sarodha-city-pushkar" },
    description:
      "Cinematic destination film for Sarodha City Pushkar — premium visuals built for social and paid placements.",
    techStack: ["Commercial Ads", "Social Campaigns"],
    featured: true,
    order: 1,
  },
  {
    _id: "local-2nd-final",
    _type: "project",
    title: "Pushkar Project",
    slug: { _type: "slug", current: "2nd-final" },
    description:
      "High-impact short-form edit engineered for reach, retention, and brand recall.",
    techStack: ["Short Form", "Reels"],
    featured: true,
    order: 2,
  },
  {
    _id: "local-model-feature",
    _type: "project",
    title: "Model Feature",
    slug: { _type: "slug", current: "model-feature" },
    description:
      "Polished model feature spot with clean grading and rhythm cut for premium brand placement.",
    liveUrl:
      "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/model+video+1k.mp4",
    techStack: ["Commercial Ads", "Reels"],
    featured: true,
    order: 3,
  },
  {
    _id: "local-thirty-second-spot",
    _type: "project",
    title: "30-Second Spot",
    slug: { _type: "slug", current: "thirty-second-spot" },
    description:
      "Punchy 30-second commercial cut built to hook fast and convert on paid feeds.",
    techStack: ["Commercial Ads", "Short Form"],
    liveUrl:
      "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/30+sec+1st+final.mp4",
    featured: true,
    order: 4,
  },
  {
    _id: "local-raksha-bandhan",
    _type: "project",
    title: "Raksha Bandhan",
    slug: { _type: "slug", current: "raksha-bandhan" },
    description:
      "Festive Raksha Bandhan campaign piece crafted for emotional pull and social sharing.",
    techStack: ["Social Campaigns", "Reels"],
    liveUrl:
      "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/Raksha+Bandhan+final.mp4",
    featured: true,
    order: 5,
  },
  {
    _id: "local-certification-invitation",
    _type: "project",
    title: "Certification Invitation",
    slug: { _type: "slug", current: "certification-invitation" },
    description:
      "Event invitation film for a certification ceremony — clean motion and confident pacing.",
    techStack: ["Event Films", "Social Campaigns"],
    liveUrl:
      "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/Certification+Invitation.mp4",
    featured: true,
    order: 6,
  },
  {
    _id: "local-june-seminar",
    _type: "project",
    title: "June Seminar",
    slug: { _type: "slug", current: "june-seminar" },
    description:
      "Seminar highlight film capturing the energy of a live event in a shareable recap.",
    liveUrl:
      "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/15+june+seminar++3+final.mp4",
    techStack: ["Event Films", "Short Form"],
    order: 7,
  },
  {
    _id: "local-dr-mahendra-kumar-sharma",
    _type: "project",
    title: "Dr. Mahendra Kumar Sharma",
    slug: { _type: "slug", current: "dr-mahendra-kumar-sharma" },
    description:
      "Personal-brand talking-head edit with captions and B-roll built for authority.",
    liveUrl:
      "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/Dr.+Mahendra+Kumar+Sharma.mp4",
    techStack: ["Personal Brand", "Short Form"],
    order: 8,
  },
  {
    _id: "local-sital-ji",
    _type: "project",
    title: "Sital Ji",
    slug: { _type: "slug", current: "sital-ji" },
    description:
      "Talking-head personal-brand piece cut for clarity, retention, and a strong message.",
    liveUrl:
      "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/sital+ji+final.mp4",
    techStack: ["Personal Brand", "Short Form"],
    order: 9,
  },
  {
    _id: "local-leadership-is-bleeding",
    _type: "project",
    title: "Leadership Is Bleeding",
    slug: { _type: "slug", current: "leadership-is-bleeding" },
    description:
      "Thought-leadership short-form video with a hook-first structure for reach and retention.",
    liveUrl:
      "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/Leadership+is+bleeding.mp4",
    techStack: ["Short Form", "Reels"],
    order: 10,
  },
  {
    _id: "local-the-innovation-drain",
    _type: "project",
    title: "The Innovation Drain",
    slug: { _type: "slug", current: "the-innovation-drain" },
    description:
      "Narrative short-form edit that turns a business idea into a scroll-stopping story.",
    techStack: ["Short Form", "Reels"],
    liveUrl:
      "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/The+Innovation+Drain.mp4",
    order: 11,
  },
  {
    _id: "local-what-if-leadership",
    _type: "project",
    title: "What If Leadership",
    slug: { _type: "slug", current: "what-if-leadership" },
    description:
      "Concept-driven leadership reel engineered around a single strong hook.",
    liveUrl:
      "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/What+if+leadership.mp4",
    techStack: ["Short Form", "Reels"],
    order: 12,
  },
  {
    _id: "local-he-and-she-1",
    _type: "project",
    title: "He & She",
    slug: { _type: "slug", current: "he-and-she-1" },
    description:
      "Relationship-themed short-form piece with tight pacing built for social feeds.",
    liveUrl:
      "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/he+and+she+1_1.mp4",
    techStack: ["Short Form", "Reels"],
    order: 13,
  },
  {
    _id: "local-he-and-she-2",
    _type: "project",
    title: "He & She II",
    slug: { _type: "slug", current: "he-and-she-2" },
    description:
      "Follow-up cut in the He & She series — same voice, fresh hook.",
    liveUrl:
      "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/he+and+she+2.mp4",
    techStack: ["Short Form", "Reels"],
    order: 14,
  },
  {
    _id: "local-content-reel-01",
    _type: "project",
    title: "Content Reel 01",
    slug: { _type: "slug", current: "content-reel-01" },
    description:
      "Short-form social edit built for consistent posting and audience growth.",
    techStack: ["Short Form", "Reels"],
    order: 15,
  },
  {
    _id: "local-content-reel-02",
    _type: "project",
    title: "Content Reel 02",
    slug: { _type: "slug", current: "content-reel-02" },
    description:
      "Short-form social edit built for consistent posting and audience growth.",
    techStack: ["Short Form", "Reels"],
    order: 16,
  },
  {
    _id: "local-content-reel-03",
    _type: "project",
    title: "Content Reel 03",
    slug: { _type: "slug", current: "content-reel-03" },
    description:
      "Short-form social edit built for consistent posting and audience growth.",
    techStack: ["Short Form", "Reels"],
    order: 17,
  },
  {
    _id: "local-content-reel-04",
    _type: "project",
    title: "Content Reel 04",
    slug: { _type: "slug", current: "content-reel-04" },
    description:
      "Short-form social edit built for consistent posting and audience growth.",
    liveUrl: "https://tcp-portfolio.s3.ap-south-1.amazonaws.com/new+one.mp4",
    techStack: ["Short Form", "Reels"],
    order: 18,
  },
];

const exportToSanity = LOCAL_PROJECTS.filter((project) => project.liveUrl);

export function getLocalProjectVideoUrl(
  slug: string | undefined,
): string | null {
  if (!slug) {
    return null;
  }
  return LOCAL_PROJECT_VIDEOS[slug] ?? null;
}

export function getLocalProjectBySlug(slug: string): Project | null {
  return (
    LOCAL_PROJECTS.find((project) => project.slug.current === slug) ?? null
  );
}
