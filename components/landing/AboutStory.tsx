import Image from "next/image";
import type { AboutContent } from "@/lib/cms/types";

export function AboutStory({ content }: { content: AboutContent }) {
  if (!content.visible) return null;

  return (
    <section id="about" className="bg-zinc-950 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-200 sm:text-sm">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {content.title}
          </h2>
          <span
            aria-hidden
            className="mx-auto mt-4 block h-px w-12 bg-white/40"
          />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {content.subtitle}
          </p>
        </header>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="space-y-5 text-base leading-relaxed text-white/85 sm:text-lg">
            {content.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/10 sm:max-w-md sm:justify-self-center lg:max-w-none lg:justify-self-stretch">
            <Image
              src={content.logo}
              alt={content.logoAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 512px"
            />
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-white/15 pt-10 sm:mt-20 sm:gap-8 sm:pt-12">
          {content.stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <dt className="text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
                {stat.label}
              </dt>
              <dd className="mt-2 text-2xl font-bold text-white sm:text-4xl">
                {stat.value}
                {stat.suffix ? (
                  <span className="text-lime-200">{stat.suffix}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        <figure className="mt-14 border-t border-white/15 pt-10 text-center sm:mt-20 sm:pt-14">
          <blockquote className="mx-auto max-w-2xl text-pretty text-lg font-medium italic leading-relaxed text-white sm:text-xl">
            {content.quote}
          </blockquote>
          <figcaption className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-lime-200">
            {content.quoteBy}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
