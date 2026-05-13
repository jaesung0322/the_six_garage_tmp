import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type Block = {
  id: string;
  reverse?: boolean;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  icon: ReactNode;
};

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/15 text-brand">
      {children}
    </div>
  );
}

const blocks: Block[] = [
  {
    id: "ceramic",
    title: "Ceramic coatings",
    description:
      "Hydrophobic ceramic packages make washing easier and deepen gloss. Pick a tier that matches how long you keep your vehicle and how much daily exposure it sees.",
    ctaLabel: "Coating packages",
    ctaHref: "#book",
    imageSrc:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Sports car in studio lighting",
    icon: (
      <IconWrap>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      </IconWrap>
    ),
  },
  {
    id: "ppf",
    reverse: true,
    title: "Paint protection film",
    description:
      "Self-healing film shields paint from chips, scratches, and road debris. Installs are templated and wrapped by experienced techs so edges stay clean and invisible.",
    ctaLabel: "Explore PPF",
    ctaHref: "#book",
    imageSrc:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Performance car in garage",
    icon: (
      <IconWrap>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      </IconWrap>
    ),
  },
  {
    id: "tint",
    title: "Window tinting",
    description:
      "Cut heat and UV load in the cabin, add privacy, and keep the look consistent with films matched to your glass and local regulations.",
    ctaLabel: "Tint options",
    ctaHref: "#book",
    imageSrc:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Car profile with tinted glass",
    icon: (
      <IconWrap>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      </IconWrap>
    ),
  },
  {
    id: "detailing",
    reverse: true,
    title: "Vehicle detailing",
    description:
      "Correction, deep cleaning, and finishing steps bring clarity back to paint, wheels, and interior surfaces—whether you are prepping for film or refreshing daily drivers.",
    ctaLabel: "Detailing packages",
    ctaHref: "#book",
    imageSrc:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Detailing work on vehicle",
    icon: (
      <IconWrap>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      </IconWrap>
    ),
  },
  {
    id: "wrap",
    title: "Color & vinyl wraps",
    description:
      "Change color, add accents, or brand a commercial vehicle without repainting. Films are removable down the road when you want a new look.",
    ctaLabel: "Wrap consult",
    ctaHref: "#book",
    imageSrc:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Wrapped vehicle detail",
    icon: (
      <IconWrap>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
        </svg>
      </IconWrap>
    ),
  },
  {
    id: "pdr",
    reverse: true,
    title: "Paintless dent repair",
    description:
      "When panels are dinged but paint is intact, PDR can restore metal without fillers or respray—often faster and more affordable than traditional body work.",
    ctaLabel: "PDR inquiry",
    ctaHref: "#book",
    imageSrc:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Technician working on vehicle panel",
    icon: (
      <IconWrap>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 010-3.586L11.42 15.17z" />
        </svg>
      </IconWrap>
    ),
  },
];

function FeatureRow({
  block,
  index,
}: {
  block: Block;
  index: number;
}) {
  const card = (
    <div
      className={`clip-slant-frame relative h-full min-h-[280px] flex-1 overflow-hidden bg-white shadow-xl ring-1 ring-black/10 sm:min-h-[320px] lg:min-h-[360px] lg:z-20 ${block.reverse ? "lg:-ml-[20px]" : "lg:-mr-[20px]"}`}
    >
      <div className="flex h-full flex-col justify-center p-8 sm:p-10">
        {block.icon}
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          {block.title}
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
          {block.description}
        </p>
        <Link
          href={block.ctaHref}
          className="mt-6 inline-flex w-fit items-center rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
        >
          {block.ctaLabel}
        </Link>
      </div>
    </div>
  );

  const visual = (
    <div className="clip-slant-frame relative min-h-[280px] flex-1 overflow-hidden shadow-lg ring-1 ring-white/10 sm:min-h-[320px] lg:min-h-[360px] lg:z-10">
      <Image
        src={block.imageSrc}
        alt={block.imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );

  return (
    <article
      id={block.id}
      className={`scroll-mt-24 py-8 first:pt-4 sm:py-10 lg:first:pt-6 ${index > 0 ? "-mt-[min(2.75rem,calc(var(--slant-shift)*0.55))]" : ""}`}
    >
      <div
        className={`flex flex-col gap-6 lg:min-h-[360px] lg:flex-row lg:items-stretch lg:gap-0 ${block.reverse ? "lg:flex-row-reverse" : ""}`}
      >
        {card}
        {visual}
      </div>
    </article>
  );
}

export function FeatureShowcase() {
  return (
    <section className="bg-brand py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/10 pb-10 text-center sm:pb-14">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Full-service experience for detailing, protection &amp; coatings
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-white/80">
            Clear sections, strong imagery, and brand-forward CTAs—structured like
            premium auto-care landing pages.
          </p>
        </div>
        {blocks.map((block, index) => (
          <FeatureRow key={block.id} block={block} index={index} />
        ))}
      </div>
    </section>
  );
}
