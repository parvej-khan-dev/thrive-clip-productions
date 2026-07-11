import { Reveal } from "@/components/reveal";
import { SocialIcon } from "@/components/icons";
import EmptyState from "@/components/sanity/empty-state";
import {
  partitionTeamByHierarchy,
  projectCardBackground,
  teamMemberInitials,
} from "@/lib/content-helpers";
import { urlForImage } from "@/lib/sanity";
import type { TeamMember } from "@/lib/sanity-types";

function TeamCard({
  member,
  index,
  featured = false,
}: {
  member: TeamMember;
  index: number;
  featured?: boolean;
}) {
  const imageUrl = member.profileImage
    ? urlForImage(member.profileImage)
        .width(featured ? 280 : 200)
        .height(featured ? 280 : 200)
        .auto("format")
        .url()
    : null;
  const avatarSize = featured ? 112 : 74;
  const initials = teamMemberInitials(member.fullName);

  return (
    <div
      style={{
        textAlign: "center",
        padding: featured ? "42px 28px" : "34px 22px",
        borderRadius: 20,
        background:
          "linear-gradient(180deg,rgba(244,239,231,.045),rgba(244,239,231,.012))",
        border: featured
          ? "1px solid rgba(224,166,90,.28)"
          : "1px solid rgba(244,239,231,.09)",
        height: "100%",
        maxWidth: featured ? 320 : undefined,
        width: "100%",
      }}
    >
      <div
        style={{
          width: avatarSize,
          height: avatarSize,
          margin: "0 auto 18px",
          borderRadius: "50%",
          background: imageUrl
            ? `center / cover no-repeat url(${imageUrl})`
            : projectCardBackground(index),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontSize: featured ? 34 : 26,
          border: featured
            ? "1px solid rgba(224,166,90,.35)"
            : "1px solid rgba(244,239,231,.2)",
          color: "#F4EFE7",
        }}
        aria-hidden={Boolean(imageUrl)}
      >
        {imageUrl ? null : initials}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: featured ? 24 : 20,
          marginBottom: 4,
        }}
      >
        {member.fullName}
      </div>
      <div style={{ fontSize: 13, color: "rgba(244,239,231,.55)" }}>
        {member.role}
      </div>
      {member.linkedIn ? (
        <a
          href={member.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="lg"
          aria-label={`${member.fullName} on LinkedIn`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 14,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#0A66C2",
            textDecoration: "none",
          }}
        >
          <SocialIcon name="LinkedIn" size={16} fill="#FFFFFF" />
        </a>
      ) : null}
    </div>
  );
}

export default function AboutTeam({ team }: { team: TeamMember[] }) {
  const { leaders, members } = partitionTeamByHierarchy(team);

  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1320,
        margin: "0 auto",
        padding: "20px clamp(18px,5vw,52px) 120px",
      }}
    >
      <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
        <div
          style={{
            fontSize: 12.5,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#E0A65A",
            marginBottom: 16,
          }}
        >
          / The team
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(34px,5vw,60px)",
            lineHeight: 1.02,
            margin: 0,
          }}
        >
          The people behind the work
        </h2>
      </Reveal>

      {team.length === 0 ? (
        <EmptyState
          title="Team coming soon"
          message="Add Team documents in Sanity Studio to introduce the people behind ThriveClip."
        />
      ) : (
        <>
          {leaders.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 22,
                marginBottom: members.length > 0 ? 28 : 0,
              }}
            >
              {leaders.map((member, i) => (
                <Reveal
                  key={member._id}
                  delay={i * 70}
                  distance={26}
                  style={{
                    flex: "1 1 260px",
                    maxWidth: 320,
                    display: "flex",
                  }}
                >
                  <TeamCard member={member} index={i} featured />
                </Reveal>
              ))}
            </div>
          ) : null}

          {members.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                gap: 18,
              }}
            >
              {members.map((member, i) => (
                <Reveal key={member._id} delay={i * 70} distance={26}>
                  <TeamCard
                    member={member}
                    index={leaders.length + i}
                  />
                </Reveal>
              ))}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
