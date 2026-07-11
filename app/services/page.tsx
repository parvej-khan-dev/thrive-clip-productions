import type { Metadata } from "next";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import CustomCursor from "@/components/home/custom-cursor";
import ParticleField from "@/components/home/particle-field";
import ServicesHero from "@/components/services/services-hero";
import ServicesList from "@/components/services/services-list";
import ServicesCta from "@/components/services/services-cta";
import { getSiteSettings, socialLinksToSocials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — ThriveClip Productions",
  description:
    "Social content, paid media, short-form and YouTube editing, motion graphics, and campaign management — everything your content engine needs under one roof.",
};

export default async function ServicesPage() {
  const settings = await getSiteSettings();
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

      <NavBar current="services" />
      <ServicesHero />
      <ServicesList />
      <ServicesCta />
      <Footer socials={socials} />
    </div>
  );
}
