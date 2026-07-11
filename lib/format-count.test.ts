import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatCount } from "./format-count.ts";

describe("formatCount", () => {
  it("formats whole numbers with locale separators and suffix", () => {
    assert.equal(formatCount(500, 0, "+"), "500+");
    assert.equal(formatCount(120, 0, "M+"), "120M+");
  });

  it("formats decimal values to the requested precision", () => {
    assert.equal(formatCount(4.9, 1, ""), "4.9");
    assert.equal(formatCount(0, 1, ""), "0.0");
  });

  it("rounds intermediate animation values when decimals is 0", () => {
    assert.equal(formatCount(249.6, 0, "+"), "250+");
  });
});
