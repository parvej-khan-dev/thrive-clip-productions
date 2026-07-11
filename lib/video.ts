import { getLocalProjectVideoUrl } from "./local-projects.ts";

export type VideoEmbedKind = "youtube" | "html5";

export interface VideoEmbedInfo {
  kind: VideoEmbedKind;
  src: string;
}

interface ProjectVideoSource {
  video?: {
    asset?: {
      url?: string;
    };
  };
  videoUrl?: string;
  slug?: {
    current?: string;
  };
}

export function getProjectVideoUrl(
  project: ProjectVideoSource,
): string | null {
  const uploaded = project.video?.asset?.url?.trim();
  if (uploaded) {
    return uploaded;
  }

  const external = project.videoUrl?.trim();
  if (external) {
    return external;
  }

  return getLocalProjectVideoUrl(project.slug?.current);
}

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
]);

export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!YOUTUBE_HOSTS.has(parsed.hostname)) {
      return null;
    }

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }

    const fromQuery = parsed.searchParams.get("v");
    if (fromQuery) {
      return fromQuery;
    }

    const embedMatch = parsed.pathname.match(/\/embed\/([^/]+)/);
    if (embedMatch?.[1]) {
      return embedMatch[1];
    }

    const shortsMatch = parsed.pathname.match(/\/shorts\/([^/]+)/);
    if (shortsMatch?.[1]) {
      return shortsMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

export function isYouTubeUrl(url: string): boolean {
  return getYouTubeVideoId(url) !== null;
}

export function getVideoEmbedInfo(url: string): VideoEmbedInfo | null {
  if (!url.trim()) {
    return null;
  }

  const youtubeId = getYouTubeVideoId(url);
  if (youtubeId) {
    return {
      kind: "youtube",
      src: `https://www.youtube.com/embed/${youtubeId}`,
    };
  }

  return { kind: "html5", src: url };
}

export function isVerticalVideoUrl(url: string): boolean {
  if (!url.trim()) {
    return false;
  }

  try {
    const parsed = new URL(url, "https://thriveclip.local");
    if (parsed.pathname.includes("/shorts/")) {
      return true;
    }
  } catch {
    return true;
  }

  return !isYouTubeUrl(url);
}

export function getVideoAspectRatio(url: string): "9 / 16" | "16 / 9" {
  return isVerticalVideoUrl(url) ? "9 / 16" : "16 / 9";
}
