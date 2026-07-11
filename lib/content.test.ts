import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  isLeadershipRole,
  partitionTeamByHierarchy,
  projectCardBackground,
  projectCardHeight,
  projectCategories,
  socialLinksToSocials,
  sortTeamByHierarchy,
  teamMemberInitials,
} from "./content-helpers.ts";

describe("content helpers", () => {
  it("builds filter categories from project tech stacks", () => {
    const projects = [
      { techStack: ["Short Form", "YouTube"] },
      { techStack: ["YouTube"] },
    ];

    assert.deepEqual(projectCategories(projects), [
      "All",
      "Short Form",
      "YouTube",
    ]);
  });

  it("maps social links and falls back to defaults", () => {
    const mapped = socialLinksToSocials([
      { platform: "Instagram", url: "https://instagram.com/thriveclip" },
    ]);
    assert.equal(mapped.length, 1);
    assert.equal(mapped[0]?.name, "Instagram");
    assert.equal(mapped[0]?.href, "https://instagram.com/thriveclip");

    const fallback = socialLinksToSocials(undefined);
    assert.ok(fallback.length >= 1);
  });

  it("returns stable card presentation helpers", () => {
    assert.equal(typeof projectCardHeight(0), "number");
    assert.match(projectCardBackground(0), /^linear-gradient/);
  });

  it("sorts founder and co-founder above other team roles", () => {
    const sorted = sortTeamByHierarchy([
      { fullName: "Zara Editor", role: "Video Editor" },
      { fullName: "Blake Co", role: "Co-Founder" },
      { fullName: "Alex Founder", role: "Founder" },
      { fullName: "Casey Sales", role: "Sales Manager" },
    ]);

    assert.deepEqual(
      sorted.map((member) => member.fullName),
      ["Alex Founder", "Blake Co", "Casey Sales", "Zara Editor"],
    );
  });

  it("partitions leadership above the rest of the team", () => {
    const { leaders, members } = partitionTeamByHierarchy([
      { fullName: "Zara Editor", role: "Video Editor" },
      { fullName: "Blake Co", role: "Co-Founder" },
      { fullName: "Alex Founder", role: "Founder" },
    ]);

    assert.deepEqual(
      leaders.map((member) => member.role),
      ["Founder", "Co-Founder"],
    );
    assert.deepEqual(
      members.map((member) => member.fullName),
      ["Zara Editor"],
    );
    assert.equal(isLeadershipRole("Founder"), true);
    assert.equal(isLeadershipRole("Video Editor"), false);
  });

  it("builds initials from a full name", () => {
    assert.equal(teamMemberInitials("Alex Founder"), "AF");
    assert.equal(teamMemberInitials("Madonna"), "M");
  });
});
