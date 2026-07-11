import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import Loader from "@/components/home/loader";
import CustomCursor from "@/components/home/custom-cursor";
import ParticleField from "@/components/home/particle-field";
import ResizeDebugProbe from "@/components/home/resize-debug-probe";
import SocialFabBar from "@/components/home/social-fab-bar";
import Hero from "@/components/home/hero";
import LogoMarquee from "@/components/home/logo-marquee";
import ServicesPreview from "@/components/home/services-preview";
import PortfolioPreview from "@/components/home/portfolio-preview";
import ProcessSection from "@/components/home/process-section";
import Testimonials from "@/components/home/testimonials";
import Booking from "@/components/home/booking";
import ContactForm from "@/components/home/contact-form";
import {
  getFeaturedProjects,
  getSiteSettings,
  socialLinksToSocials,
} from "@/lib/content";

export default async function HomePage() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
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
      <ResizeDebugProbe />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(120% 90% at 80% -10%, rgba(224,166,90,.16), transparent 55%), radial-gradient(90% 80% at 5% 10%, rgba(120,110,255,.10), transparent 50%), radial-gradient(100% 100% at 50% 120%, rgba(224,166,90,.08), transparent 60%)",
        }}
      />
      <ParticleField />
      <CustomCursor />
      <Loader />

      <NavBar current="home" />

      <Hero settings={settings} />
      <LogoMarquee />
      <ServicesPreview />
      <PortfolioPreview projects={projects} />
      <ProcessSection />
      <Testimonials />
      <Booking />
      <ContactForm />

      <Footer socials={socials} />
      <SocialFabBar socials={socials} />
    </div>
  );
}
