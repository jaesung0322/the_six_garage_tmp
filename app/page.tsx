import { CTABanner } from "@/components/landing/CTABanner";
import { GalleryStrip } from "@/components/landing/GalleryStrip";
import { Hero } from "@/components/landing/Hero";
import { Location } from "@/components/landing/Location";
import { Reveal } from "@/components/landing/Reveal";
import { ServiceGrid } from "@/components/landing/ServiceGrid";
import { ServiceShowcase } from "@/components/landing/ServiceShowcase";
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
        {/*
        <Reveal>
          <ServiceGrid />
        </Reveal>
          */}
        <Reveal>
          <ServiceShowcase />
        </Reveal>
        {/*
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
        */}
        <Reveal>
          <GalleryStrip />
        </Reveal>
        <Reveal>
          <Location />
        </Reveal>
        {/*
        <Reveal>
          <CTABanner
            title="Time to get your vehicle to look its best"
            subtitle="Walk through options with a specialist before work begins."
            ctaLabel="Get started"
            ctaHref="#contact"
            variant="dark"
          />
        </Reveal>
        */}
        <Reveal>
          <SiteFooter />
        </Reveal>
      </main>
    </div>
  );
}