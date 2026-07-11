import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import CustomCursor from "@/components/home/custom-cursor";
import ParticleField from "@/components/home/particle-field";
import EmptyState from "@/components/sanity/empty-state";
import { Reveal } from "@/components/reveal";
import {
  getBlogs,
  getSiteSettings,
  socialLinksToSocials,
} from "@/lib/content";
import { urlForImage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Blog — ThriveClip Productions",
  description:
    "Insights on video content, growth systems, and creative production from ThriveClip Productions.",
};

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([getBlogs(), getSiteSettings()]);
  const socials = socialLinksToSocials(settings.socialLinks);

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

      <NavBar current="blog" />

      <section
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1320,
          margin: "0 auto",
          padding: "150px clamp(18px,5vw,52px) 100px",
        }}
      >
        <Reveal style={{ marginBottom: 44 }}>
          <div
            style={{
              fontSize: 12.5,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "#E0A65A",
              marginBottom: 14,
            }}
          >
            / Blog
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(40px,6vw,72px)",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Notes on content that grows
          </h1>
        </Reveal>

        {posts.length === 0 ? (
          <EmptyState
            title="No posts yet"
            message="Publish Blog documents in Sanity Studio to populate this page."
          />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 22,
            }}
          >
            {posts.map((post, index) => {
              const cover = post.coverImage
                ? urlForImage(post.coverImage)
                    .width(800)
                    .height(500)
                    .auto("format")
                    .url()
                : null;

              return (
                <Reveal key={post._id} delay={index * 50} distance={18}>
                  <Link
                    href={`/blog/${post.slug.current}`}
                    data-cursor="lg"
                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  >
                    <article
                      style={{
                        borderRadius: 18,
                        overflow: "hidden",
                        border: "1px solid rgba(244,239,231,.1)",
                        background: "rgba(244,239,231,.03)",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          height: 180,
                          background: cover
                            ? `center / cover no-repeat url(${cover})`
                            : "linear-gradient(160deg,#3a2d55,#1a1526)",
                        }}
                      />
                      <div style={{ padding: "20px 18px 22px" }}>
                        {post.publishedAt && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "rgba(244,239,231,.45)",
                              marginBottom: 8,
                            }}
                          >
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </div>
                        )}
                        <h2
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 26,
                            margin: "0 0 10px",
                            lineHeight: 1.15,
                          }}
                        >
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p
                            style={{
                              margin: 0,
                              fontSize: 14,
                              lineHeight: 1.6,
                              color: "rgba(244,239,231,.55)",
                            }}
                          >
                            {post.excerpt}
                          </p>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 8,
                              marginTop: 14,
                            }}
                          >
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  fontSize: 11,
                                  letterSpacing: ".04em",
                                  color: "#E0A65A",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      <Footer socials={socials} />
    </div>
  );
}
