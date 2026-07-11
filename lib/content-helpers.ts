type SocialPlatform = "Instagram" | "YouTube" | "LinkedIn";

interface Social {
  name: SocialPlatform;
  href: string;
}

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

interface ProjectLike {
  techStack?: string[];
}

const DEFAULT_SOCIALS: Social[] = [
  { name: "Instagram", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function socialLinksToSocials(links: SocialLink[] | undefined): Social[] {
  if (!links || links.length === 0) {
    return [...DEFAULT_SOCIALS];
  }

  return links.map((link) => ({
    name: link.platform,
    href: link.url,
  }));
}

export function projectCategories(projects: ProjectLike[]): string[] {
  const categories = new Set<string>();
  for (const project of projects) {
    for (const tag of project.techStack ?? []) {
      if (tag.trim()) {
        categories.add(tag.trim());
      }
    }
  }
  return ["All", ...Array.from(categories).sort((a, b) => a.localeCompare(b))];
}

export function projectCardHeight(index: number): number {
  const heights = [300, 230, 340, 250, 310, 230, 330, 250, 290];
  return heights[index % heights.length] ?? 280;
}

export function projectCardBackground(index: number): string {
  const gradients = [
    "linear-gradient(160deg,#3a2d55,#1a1526)",
    "linear-gradient(160deg,#5a3a2a,#231712)",
    "linear-gradient(160deg,#26414a,#111d22)",
    "linear-gradient(160deg,#4a2f45,#1e1420)",
    "linear-gradient(160deg,#42472a,#1c1e12)",
    "linear-gradient(160deg,#2c3b55,#131a26)",
    "linear-gradient(160deg,#553a2c,#241813)",
    "linear-gradient(160deg,#354a3d,#151f19)",
    "linear-gradient(160deg,#453055,#1c1524)",
  ];
  return gradients[index % gradients.length] ?? gradients[0];
}

const LEADERSHIP_ROLE_RANK: Record<string, number> = {
  Founder: 0,
  "Co-Founder": 1,
};

export function isLeadershipRole(role: string | undefined): boolean {
  return role === "Founder" || role === "Co-Founder";
}

export function sortTeamByHierarchy<
  T extends { role?: string; fullName: string },
>(members: T[]): T[] {
  return [...members].sort((a, b) => {
    const rankA = LEADERSHIP_ROLE_RANK[a.role ?? ""] ?? 100;
    const rankB = LEADERSHIP_ROLE_RANK[b.role ?? ""] ?? 100;
    if (rankA !== rankB) {
      return rankA - rankB;
    }
    return a.fullName.localeCompare(b.fullName);
  });
}

export function partitionTeamByHierarchy<
  T extends { role?: string; fullName: string },
>(members: T[]): { leaders: T[]; members: T[] } {
  const sorted = sortTeamByHierarchy(members);
  const leaders: T[] = [];
  const rest: T[] = [];

  for (const member of sorted) {
    if (isLeadershipRole(member.role)) {
      leaders.push(member);
    } else {
      rest.push(member);
    }
  }

  return { leaders, members: rest };
}

export function teamMemberInitials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
