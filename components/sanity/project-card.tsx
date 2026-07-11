import Link from "next/link";
import { PlayIcon } from "@/components/icons";
import { projectCardBackground } from "@/lib/content";
import { urlForImage } from "@/lib/sanity";
import type { Project } from "@/lib/sanity-types";
import { getProjectVideoUrl } from "@/lib/video";
import VideoLightbox from "@/components/portfolio/video-lightbox";

export default function ProjectCard({
  project,
  index,
  href,
  showDescription = false,
}: {
  project: Project;
  index: number;
  href: string;
  showDescription?: boolean;
}) {
  const category = project.techStack?.[0] ?? "Work";
  const videoUrl = getProjectVideoUrl(project);
  const imageUrl = project.image
    ? urlForImage(project.image).width(720).height(1280).auto("format").url()
    : null;
  const background = imageUrl
    ? `center / cover no-repeat url(${imageUrl})`
    : projectCardBackground(index);

  return (
    <Link
      href={href}
      data-cursor="lg"
      style={{
        display: "block",
        flex: "0 1 280px",
        width: "min(280px, 100%)",
        textDecoration: "none",
      }}
    >
      <div
        className="tc-portfolio-card"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 22,
          border: "1px solid rgba(244,239,231,.09)",
          background,
          aspectRatio: "9 / 16",
          width: "100%",
        }}
      >
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={project.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg,rgba(10,9,8,.18) 0%,transparent 28%,transparent 48%,rgba(10,9,8,.92))",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            padding: "6px 12px",
            borderRadius: 100,
            background: "rgba(10,9,8,.55)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(244,239,231,.12)",
            fontSize: 11.5,
            letterSpacing: ".05em",
            color: "rgba(244,239,231,.85)",
          }}
        >
          {category}
        </div>
        {videoUrl ? (
          <VideoLightbox videoUrl={videoUrl} title={project.title} />
        ) : project.liveUrl ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "rgba(244,239,231,.1)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(244,239,231,.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PlayIcon size={18} />
          </div>
        ) : null}
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 16 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              color: "#F4EFE7",
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </div>
          {showDescription && project.description && (
            <div
              style={{
                marginTop: 6,
                fontSize: 12.5,
                color: "rgba(244,239,231,.55)",
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </div>
          )}
          {project.techStack && project.techStack.length > 1 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 8,
              }}
            >
              {project.techStack.slice(1, 4).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    color: "#E0A65A",
                    letterSpacing: ".03em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
