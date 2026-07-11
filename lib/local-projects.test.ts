import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getLocalProjectBySlug,
  getLocalProjectVideoUrl,
  LOCAL_PROJECTS,
  LOCAL_PROJECT_VIDEOS,
} from "./local-projects.ts";

describe("local projects", () => {
  it("maps known slugs to public video paths", () => {
    assert.equal(
      getLocalProjectVideoUrl("sarodha-city-pushkar"),
      "/videos/sarodha-city-pushkar.mp4",
    );
    assert.equal(getLocalProjectVideoUrl("missing"), null);
    assert.equal(getLocalProjectVideoUrl(undefined), null);
  });

  it("exposes fallback projects for each local video", () => {
    assert.ok(LOCAL_PROJECTS.length >= 2);
    for (const project of LOCAL_PROJECTS) {
      const slug = project.slug.current;
      assert.ok(slug in LOCAL_PROJECT_VIDEOS);
      assert.equal(getLocalProjectBySlug(slug)?._id, project._id);
    }
  });
});
