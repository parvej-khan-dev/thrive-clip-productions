"use client";

import { useMemo, useState } from "react";
import EmptyState from "@/components/sanity/empty-state";
import ProjectCard from "@/components/sanity/project-card";
import { projectCategories } from "@/lib/content";
import type { Project } from "@/lib/sanity-types";

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const filters = useMemo(() => projectCategories(projects), [projects]);
  const [filter, setFilter] = useState<string>("All");

  const filteredWork = useMemo(() => {
    if (filter === "All") {
      return projects;
    }
    return projects.filter((item) =>
      (item.techStack ?? []).some((tag) => tag === filter),
    );
  }, [filter, projects]);

  if (projects.length === 0) {
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
        <EmptyState
          title="No projects yet"
          message="Create Project documents in Sanity Studio. They will appear here automatically."
        />
      </section>
    );
  }

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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
          marginBottom: 44,
        }}
      >
        {filters.map((label) => {
          const active = filter === label;
          return (
            <button
              key={label}
              type="button"
              data-cursor="lg"
              onClick={() => setFilter(label)}
              style={{
                padding: "10px 20px",
                borderRadius: 100,
                fontSize: 13.5,
                fontFamily: "inherit",
                cursor: "none",
                transition: "all .3s ease",
                border: `1px solid ${active ? "rgba(224,166,90,.5)" : "rgba(244,239,231,.14)"}`,
                background: active
                  ? "linear-gradient(135deg,#E0A65A,#F0D3A0)"
                  : "rgba(244,239,231,.03)",
                color: active ? "#0A0908" : "rgba(244,239,231,.7)",
                fontWeight: active ? 600 : 400,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {filteredWork.length === 0 ? (
        <EmptyState
          title="No matches"
          message={`No projects are tagged with “${filter}” yet.`}
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
          {filteredWork.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              href={`/portfolio/${project.slug.current}`}
              showDescription
            />
          ))}
        </div>
      )}
    </section>
  );
}
