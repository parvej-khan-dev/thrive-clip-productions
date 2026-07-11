import type { Metadata } from "next";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import CustomCursor from "@/components/home/custom-cursor";
import ParticleField from "@/components/home/particle-field";
import AboutHero from "@/components/about/about-hero";
import AboutStats from "@/components/about/about-stats";
import AboutSkills from "@/components/about/about-skills";
import AboutProcess from "@/components/about/about-process";
import AboutTeam from "@/components/about/about-team";
import AboutCta from "@/components/about/about-cta";
import {
  getSiteSettings,
  getSkills,
  getTeam,
  socialLinksToSocials,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About — ThriveClip Productions",
  description:
    "ThriveClip Productions helps businesses and creators grow faster with high-performance video content systems — strategy, production, and optimization under one roof.",
};

export default async function AboutPage() {
  const [settings, skills, team] = await Promise.all([
    getSiteSettings(),
    getSkills(),
    getTeam(),
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

      <NavBar current="about" />
      <AboutHero settings={settings} />
      <AboutStats />
      <AboutSkills skills={skills} />
      <AboutProcess />
      <AboutTeam team={team} />
      <AboutCta />
      <Footer socials={socials} />
    </div>
  );
}
