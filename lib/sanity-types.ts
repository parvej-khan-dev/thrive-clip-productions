export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityFileAsset {
  _id?: string;
  url?: string;
  mimeType?: string;
  originalFilename?: string;
}

export interface SanityFile {
  _type?: "file";
  asset?: {
    _ref?: string;
    _type?: "reference";
    url?: string;
    mimeType?: string;
    originalFilename?: string;
  } & SanityFileAsset;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface PortableTextSpan {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: "block";
  _key: string;
  style?: string;
  listItem?: string;
  level?: number;
  children: PortableTextSpan[];
  markDefs?: Array<{
    _type: string;
    _key: string;
    href?: string;
  }>;
}

export interface PortableTextImage {
  _type: "image";
  _key: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export type PortableTextValue = Array<PortableTextBlock | PortableTextImage>;

export interface Project {
  _id: string;
  _type: "project";
  title: string;
  slug: SanitySlug;
  description?: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: SanityImage;
  video?: SanityFile;
  videoUrl?: string;
  featured?: boolean;
  order?: number;
}

export interface BlogPost {
  _id: string;
  _type: "blog";
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  body?: PortableTextValue;
  coverImage?: SanityImage;
  publishedAt?: string;
  tags?: string[];
}

export interface Skill {
  _id: string;
  _type: "skill";
  name: string;
  category?: string;
}

export type TeamRole =
  | "Founder"
  | "Co-Founder"
  | "Sales Manager"
  | "Video Editor"
  | "Graphic Designer"
  | "Social Media Manager";

export interface TeamMember {
  _id: string;
  _type: "team";
  fullName: string;
  role?: TeamRole;
  profileImage?: SanityImage;
  linkedIn?: string;
}

export type SocialPlatform = "Instagram" | "YouTube" | "LinkedIn";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  heroTitle?: string;
  heroSubtitle?: string;
  bio?: string;
  resumeUrl?: string;
  socialLinks?: SocialLink[];
}
