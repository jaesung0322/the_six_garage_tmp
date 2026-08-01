import Image from "next/image";
import Link from "next/link";
import type { HeroContent } from "@/lib/cms/types";

export function Hero({ content }: { content: HeroContent }) {
  if (!content.visible) return null;

  const bodyLines = content.body.split("\n").filter(Boolean);

  return (
    <section className="relative flex min-h-0 flex-1 flex-col bg-brand">
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="absolute inset-0 min-h-0">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-brand/70 via-brand/20 to-transparent"
              aria-hidden
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col justify-end px-4 pb-20 pt-[calc(var(--slant-shift)+2rem)] text-center sm:justify-center sm:px-6 sm:pb-28 sm:pt-[calc(var(--slant-shift)+3rem)] lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-lime-200">
            {content.eyebrow}
          </p>
          <h1 className="text-balance font-bold leading-tight tracking-tight text-white">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {content.headline}
            </span>
            <span className="mt-1 block whitespace-nowrap text-lg sm:text-2xl md:text-3xl lg:text-4xl">
              {content.subheadline}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-zinc-300 sm:text-lg">
            {bodyLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={content.ctaHref}
              className="inline-flex w-full min-w-[200px] items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-brand shadow-lg transition-opacity hover:opacity-90 sm:w-auto"
            >
              {content.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
