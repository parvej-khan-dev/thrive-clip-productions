import {
  blogsQuery,
  blogBySlugQuery,
  featuredProjectsQuery,
  projectsQuery,
  projectBySlugQuery,
  siteSettingsQuery,
  skillsQuery,
  teamQuery,
} from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import type {
  BlogPost,
  Project,
  SiteSettings,
  Skill,
  TeamMember,
} from "@/lib/sanity-types";
import { SOCIALS } from "@/lib/data";
import {
  projectCardBackground,
  projectCardHeight,
  projectCategories,
  socialLinksToSocials,
  sortTeamByHierarchy,
} from "@/lib/content-helpers";
import {
  getLocalProjectBySlug,
  LOCAL_PROJECTS,
} from "@/lib/local-projects";

export {
  projectCardBackground,
  projectCardHeight,
  projectCategories,
  socialLinksToSocials,
  sortTeamByHierarchy,
};

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  heroTitle: "Scale your content without scaling your workload",
  heroSubtitle:
    "We help creators and businesses produce premium social media content that drives growth, saves time, and builds authority.",
  bio: "ThriveClip Productions helps businesses and creators grow faster using high-performance video content systems — not one-off edits. We handle strategy, production, and optimization so you can stay in your zone of genius.",
  socialLinks: SOCIALS.map((s) => ({ platform: s.name, url: s.href })),
};

export async function getProjects(): Promise<Project[]> {
  const data = await sanityFetch<Project[]>(projectsQuery);
  if (data && data.length > 0) {
    return data;
  }
  return LOCAL_PROJECTS;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const featured = await sanityFetch<Project[]>(featuredProjectsQuery);
  if (featured && featured.length > 0) {
    return featured;
  }
  const all = await getProjects();
  return all.slice(0, 6);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = await sanityFetch<Project>(projectBySlugQuery, { slug });
  if (project) {
    return project;
  }
  return getLocalProjectBySlug(slug);
}

export async function getBlogs(): Promise<BlogPost[]> {
  const data = await sanityFetch<BlogPost[]>(blogsQuery);
  return data ?? [];
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  return sanityFetch<BlogPost>(blogBySlugQuery, { slug });
}

export async function getSkills(): Promise<Skill[]> {
  const data = await sanityFetch<Skill[]>(skillsQuery, {}, ["sanity", "skills"]);
  if (data && data.length > 0) {
    return data;
  }
  return [];
}

export async function getTeam(): Promise<TeamMember[]> {
  const data = await sanityFetch<TeamMember[]>(teamQuery, {}, ["sanity", "team"]);
  if (data && data.length > 0) {
    return sortTeamByHierarchy(data);
  }
  return [];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SiteSettings>(siteSettingsQuery);
  if (!data) {
    return DEFAULT_SITE_SETTINGS;
  }

  return {
    ...DEFAULT_SITE_SETTINGS,
    ...data,
    socialLinks:
      data.socialLinks && data.socialLinks.length > 0
        ? data.socialLinks
        : DEFAULT_SITE_SETTINGS.socialLinks,
  };
}
