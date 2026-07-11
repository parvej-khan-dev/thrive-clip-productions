import Link from "next/link";
import { Reveal } from "@/components/reveal";
import EmptyState from "@/components/sanity/empty-state";
import ProjectCard from "@/components/sanity/project-card";
import type { Project } from "@/lib/sanity-types";

export default function PortfolioPreview({ projects }: { projects: Project[] }) {
  const items = projects.slice(0, 6);

  return (
    <section
      id="portfolio"
      style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "clamp(60px,7vw,100px) clamp(18px,5vw,52px)" }}
    >
      <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
        <div style={{ fontSize: 12.5, letterSpacing: ".2em", textTransform: "uppercase", color: "#E0A65A", marginBottom: 16 }}>
          / Selected work
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(36px,5.5vw,68px)", lineHeight: 1.02, margin: 0 }}>
          Work that moved the numbers
        </h2>
      </Reveal>

      {items.length === 0 ? (
        <EmptyState
          title="Projects coming soon"
          message="Add featured projects in Sanity Studio to showcase selected work here."
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 18,
          }}
        >
          {items.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              href={`/portfolio/${project.slug.current}`}
            />
          ))}
        </div>
      )}

      <Reveal distance={20} style={{ textAlign: "center", marginTop: 14 }}>
        <Link
          href="/portfolio"
          data-cursor="lg"
          className="tc-outline-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "15px 28px",
            borderRadius: 100,
            background: "rgba(244,239,231,.04)",
            border: "1px solid rgba(244,239,231,.16)",
            color: "#F4EFE7",
            fontSize: 14.5,
            textDecoration: "none",
          }}
        >
          View full portfolio <span style={{ color: "#E0A65A" }}>→</span>
        </Link>
      </Reveal>
    </section>
  );
}
