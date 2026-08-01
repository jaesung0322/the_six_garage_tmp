import { AboutStory } from "@/components/landing/AboutStory";
import { GalleryStrip } from "@/components/landing/GalleryStrip";
import { Hero } from "@/components/landing/Hero";
import { Directions } from "@/components/landing/Directions";
import { Reveal } from "@/components/landing/Reveal";
import { ServiceShowcase } from "@/components/landing/ServiceShowcase";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { YouTubeSection } from "@/components/landing/YouTubeSection";
import { getSiteContent } from "@/lib/cms/repository";

/** CMS 저장 직후 최신 콘텐츠를 반영하기 위해 매 요청 조회 */
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <div className="font-sans text-zinc-900 antialiased">
      <div className="flex min-h-dvh flex-col">
        <SiteHeader content={content.header} />
        <Reveal animateOnMount className="flex min-h-0 flex-1 flex-col">
          <Hero content={content.hero} />
        </Reveal>
      </div>
      <main>
        <Reveal>
          <AboutStory content={content.about} />
        </Reveal>
        <Reveal>
          <ServiceShowcase content={content.services} />
        </Reveal>
        <Reveal>
          <GalleryStrip content={content.gallery} />
        </Reveal>
        <Reveal className="flex min-h-0 flex-col">
          <YouTubeSection content={content.youtube} />
        </Reveal>
        <Reveal>
          <Directions content={content.directions} />
        </Reveal>
        <Reveal>
          <SiteFooter content={content.footer} />
        </Reveal>
      </main>
    </div>
  );
}
