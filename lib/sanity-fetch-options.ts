export type SanityFetchCacheOptions =
  | { cache: "no-store" }
  | { next: { revalidate: number; tags: string[] } };

export function sanityFetchOptions(
  isDev: boolean,
  revalidateSeconds: number,
  tags: string[] = ["sanity"],
): SanityFetchCacheOptions {
  if (isDev) {
    return { cache: "no-store" };
  }

  return {
    next: {
      revalidate: revalidateSeconds,
      tags,
    },
  };
}
