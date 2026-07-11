import { createClient, type QueryParams } from "next-sanity";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { sanityFetchOptions } from "@/lib/sanity-fetch-options";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-01-01";
export const revalidateSeconds = 60;

export const isSanityConfigured = Boolean(projectId);

const isDev = process.env.NODE_ENV === "development";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: !isDev,
});

const builder = createImageUrlBuilder({
  projectId: projectId || "placeholder",
  dataset,
});

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  tags: string[] = ["sanity"],
): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await client.fetch<T>(
      query,
      params,
      sanityFetchOptions(isDev, revalidateSeconds, tags),
    );
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}
