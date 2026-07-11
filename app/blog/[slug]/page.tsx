import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import CustomCursor from "@/components/home/custom-cursor";
import ParticleField from "@/components/home/particle-field";
import PortableText from "@/components/sanity/portable-text";
import {
  getBlogBySlug,
  getBlogs,
  getSiteSettings,
  socialLinksToSocials,
} from "@/lib/content";
import { urlForImage } from "@/lib/sanity";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts
    .filter((post) => post.slug?.current)
    .map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) {
    return { title: "Blog — ThriveClip Productions" };
  }
  return {
    title: `${post.title} — ThriveClip Productions`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getBlogBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) {
    notFound();
  }

  const socials = socialLinksToSocials(settings.socialLinks);
  const cover = post.coverImage
    ? urlForImage(post.coverImage).width(1400).height(800).auto("format").url()
    : null;

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

      <article
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 760,
          margin: "0 auto",
          padding: "150px clamp(18px,5vw,52px) 100px",
        }}
      >
        <Link
          href="/blog"
          data-cursor="lg"
          style={{
            display: "inline-flex",
            color: "rgba(244,239,231,.55)",
            textDecoration: "none",
            fontSize: 14,
            marginBottom: 28,
          }}
        >
          ← Back to blog
        </Link>

        {post.publishedAt && (
          <div
            style={{
              fontSize: 12.5,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "#E0A65A",
              marginBottom: 14,
            }}
          >
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
        )}

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(36px,6vw,58px)",
            lineHeight: 1.08,
            margin: "0 0 18px",
          }}
        >
          {post.title}
        </h1>

        {post.excerpt && (
          <p
            style={{
              margin: "0 0 28px",
              fontSize: "clamp(16px,1.4vw,18px)",
              lineHeight: 1.7,
              color: "rgba(244,239,231,.62)",
            }}
          >
            {post.excerpt}
          </p>
        )}

        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={post.coverImage?.alt ?? post.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 18,
              border: "1px solid rgba(244,239,231,.1)",
              marginBottom: 36,
            }}
          />
        )}

        {post.body && post.body.length > 0 ? (
          <PortableText value={post.body} />
        ) : (
          <p style={{ color: "rgba(244,239,231,.5)" }}>
            This post does not have body content yet.
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 40,
              paddingTop: 24,
              borderTop: "1px solid rgba(244,239,231,.08)",
            }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "6px 12px",
                  borderRadius: 100,
                  border: "1px solid rgba(244,239,231,.12)",
                  fontSize: 12,
                  color: "rgba(244,239,231,.7)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      <Footer socials={socials} />
    </div>
  );
}
