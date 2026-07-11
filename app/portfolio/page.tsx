import type { Metadata } from "next";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import CustomCursor from "@/components/home/custom-cursor";
import ParticleField from "@/components/home/particle-field";
import PortfolioHero from "@/components/portfolio/portfolio-hero";
import PortfolioGrid from "@/components/portfolio/portfolio-grid";
import PortfolioCta from "@/components/portfolio/portfolio-cta";
import {
  getProjects,
  getSiteSettings,
  socialLinksToSocials,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio — ThriveClip Productions",
  description:
    "A sample of recent ThriveClip client work across short-form, YouTube, paid ads, and motion design — work that moved the numbers.",
};

export default async function PortfolioPage() {
  const [projects, settings] = await Promise.all([
    getProjects(),
    getSiteSettings(),
  ]);
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

      <NavBar current="portfolio" />
      <PortfolioHero />
      <PortfolioGrid projects={projects} />
      <PortfolioCta />
      <Footer socials={socials} />
    </div>
  );
}
