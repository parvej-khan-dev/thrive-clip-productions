import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sanityFetchOptions } from "./sanity-fetch-options.ts";

describe("sanityFetchOptions", () => {
  it("disables caching in development so Studio publishes show immediately", () => {
    assert.deepEqual(sanityFetchOptions(true, 60), { cache: "no-store" });
  });

  it("uses ISR tags in production", () => {
    assert.deepEqual(sanityFetchOptions(false, 60, ["sanity", "skills"]), {
      next: { revalidate: 60, tags: ["sanity", "skills"] },
    });
  });
});
