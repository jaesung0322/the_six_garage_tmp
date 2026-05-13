import { CTABanner } from "@/components/landing/CTABanner";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { GalleryStrip } from "@/components/landing/GalleryStrip";
import { Hero } from "@/components/landing/Hero";
import { LocationsBlock } from "@/components/landing/LocationsBlock";
import { Reveal } from "@/components/landing/Reveal";
import { ServiceGrid } from "@/components/landing/ServiceGrid";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";

export default function Home() {
  return (
    <div className="font-sans text-zinc-900 antialiased">
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <Reveal
          animateOnMount
          className="flex min-h-0 flex-1 flex-col"
        >
          <Hero />
        </Reveal>
      </div>
      <main>
        <Reveal>
          <ServiceGrid />
        </Reveal>
        <Reveal>
          <FeatureShowcase />
        </Reveal>
        <Reveal>
          <LocationsBlock />
        </Reveal>
        <Reveal>
          <CTABanner
            id="book"
            title="Protect your vehicle today"
            subtitle="Book a consult or drop-off window that fits your schedule."
            ctaLabel="Schedule today"
            ctaHref="#contact"
            variant="brand"
          />
        </Reveal>
        <Reveal>
          <GalleryStrip />
        </Reveal>
        <Reveal>
          <CTABanner
            title="Time to get your vehicle to look its best"
            subtitle="Walk through options with a specialist before work begins."
            ctaLabel="Get started"
            ctaHref="#contact"
            variant="dark"
          />
        </Reveal>
        <Reveal>
          <SiteFooter />
        </Reveal>
      </main>
    </div>
  );
}
