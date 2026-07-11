import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getProjectVideoUrl,
  getVideoAspectRatio,
  getVideoEmbedInfo,
  getYouTubeVideoId,
  isVerticalVideoUrl,
  isYouTubeUrl,
} from "./video.ts";

describe("video helpers", () => {
  it("detects YouTube watch URLs", () => {
    const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    assert.equal(isYouTubeUrl(url), true);
    assert.equal(getYouTubeVideoId(url), "dQw4w9WgXcQ");
    assert.deepEqual(getVideoEmbedInfo(url), {
      kind: "youtube",
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    });
  });

  it("detects youtu.be and embed URLs", () => {
    assert.equal(getYouTubeVideoId("https://youtu.be/abc123XYZ"), "abc123XYZ");
    assert.equal(
      getYouTubeVideoId("https://www.youtube.com/embed/abc123XYZ"),
      "abc123XYZ",
    );
  });

  it("treats Cloudinary and other URLs as HTML5 video", () => {
    const url =
      "https://res.cloudinary.com/demo/video/upload/dog.mp4";
    assert.equal(isYouTubeUrl(url), false);
    assert.deepEqual(getVideoEmbedInfo(url), {
      kind: "html5",
      src: url,
    });
  });

  it("returns null for empty URLs", () => {
    assert.equal(getVideoEmbedInfo("   "), null);
  });

  it("prefers uploaded Sanity video over external URL", () => {
    assert.equal(
      getProjectVideoUrl({
        video: { asset: { url: "https://cdn.sanity.io/files/demo/production/clip.mp4" } },
        videoUrl: "https://www.youtube.com/watch?v=abc",
      }),
      "https://cdn.sanity.io/files/demo/production/clip.mp4",
    );
    assert.equal(
      getProjectVideoUrl({ videoUrl: "https://youtu.be/abc" }),
      "https://youtu.be/abc",
    );
    assert.equal(getProjectVideoUrl({}), null);
  });

  it("falls back to local public videos by project slug", () => {
    assert.equal(
      getProjectVideoUrl({ slug: { current: "sarodha-city-pushkar" } }),
      "/videos/sarodha-city-pushkar.mp4",
    );
    assert.equal(
      getProjectVideoUrl({ slug: { current: "2nd-final" } }),
      "/videos/2nd-final.mp4",
    );
    assert.equal(
      getProjectVideoUrl({
        videoUrl: "https://youtu.be/abc",
        slug: { current: "sarodha-city-pushkar" },
      }),
      "https://youtu.be/abc",
    );
  });

  it("uses 9:16 for local and Shorts, 16:9 for YouTube watch", () => {
    assert.equal(isVerticalVideoUrl("/videos/sarodha-city-pushkar.mp4"), true);
    assert.equal(getVideoAspectRatio("/videos/2nd-final.mp4"), "9 / 16");
    assert.equal(
      getVideoAspectRatio("https://www.youtube.com/shorts/abc123"),
      "9 / 16",
    );
    assert.equal(
      getVideoAspectRatio("https://www.youtube.com/watch?v=abc123"),
      "16 / 9",
    );
  });
});


