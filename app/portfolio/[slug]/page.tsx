import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import CustomCursor from "@/components/home/custom-cursor";
import ParticleField from "@/components/home/particle-field";
import VideoEmbed from "@/components/sanity/video-embed";
import {
  getProjectBySlug,
  getProjects,
  getSiteSettings,
  socialLinksToSocials,
} from "@/lib/content";
import { urlForImage } from "@/lib/sanity";
import { getProjectVideoUrl } from "@/lib/video";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects
    .filter((project) => project.slug?.current)
    .map((project) => ({ slug: project.slug.current }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return { title: "Project — ThriveClip Productions" };
  }
  return {
    title: `${project.title} — ThriveClip Productions`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
  ]);

  if (!project) {
    notFound();
  }

  const socials = socialLinksToSocials(settings.socialLinks);
  const imageUrl = project.image
    ? urlForImage(project.image).width(1400).height(900).auto("format").url()
    : null;
  const videoUrl = getProjectVideoUrl(project);

  return (
    <div
      data-page-root
      style={{
        position: "relative",
        background: "#0A0908",
        color: "#F4EFE7",
        overflowX: "hidden",
        cursor: "none",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(120% 90% at 80% -10%, rgba(224,166,90,.14), transparent 55%), radial-gradient(90% 80% at 5% 10%, rgba(120,110,255,.08), transparent 50%)",
        }}
      />
      <ParticleField />
      <CustomCursor />

      <NavBar current="portfolio" />

      <article
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 900,
          margin: "0 auto",
          padding: "150px clamp(18px,5vw,52px) 100px",
        }}
      >
        <Link
          href="/portfolio"
          data-cursor="lg"
          style={{
            display: "inline-flex",
            color: "rgba(244,239,231,.55)",
            textDecoration: "none",
            fontSize: 14,
            marginBottom: 28,
          }}
        >
          ← Back to portfolio
        </Link>

        <div
          style={{
            fontSize: 12.5,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "#E0A65A",
            marginBottom: 14,
          }}
        >
          {(project.techStack ?? []).join(" · ") || "Project"}
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(36px,6vw,64px)",
            lineHeight: 1.05,
            margin: "0 0 18px",
          }}
        >
          {project.title}
        </h1>

        {project.description && (
          <p
            style={{
              margin: "0 0 28px",
              fontSize: "clamp(16px,1.4vw,18px)",
              lineHeight: 1.7,
              color: "rgba(244,239,231,.62)",
            }}
          >
            {project.description}
          </p>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="lg"
              style={{
                padding: "12px 20px",
                borderRadius: 100,
                background: "linear-gradient(135deg,#E0A65A,#F0D3A0)",
                color: "#0A0908",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              View live →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="lg"
              style={{
                padding: "12px 20px",
                borderRadius: 100,
                border: "1px solid rgba(244,239,231,.16)",
                color: "#F4EFE7",
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              GitHub
            </a>
          )}
        </div>

        {videoUrl ? (
          <VideoEmbed url={videoUrl} title={project.title} />
        ) : imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={project.image?.alt ?? project.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 18,
              border: "1px solid rgba(244,239,231,.1)",
            }}
          />
        ) : null}
      </article>

      <Footer socials={socials} />
    </div>
  );
}
