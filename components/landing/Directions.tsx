import Link from "next/link";
import Image from "next/image";
import type { DirectionsContent, SnsLink } from "@/lib/cms/types";

function SnsButton({ link }: { link: SnsLink }) {
  const id = link.id.toLowerCase();
  const isKakao = id.includes("kakao");
  const isNaver = id.includes("naver");
  const isDaangn = id.includes("daangn") || id.includes("carrot");

  const className = isKakao
    ? "flex w-full items-center justify-between gap-2 rounded-md bg-[#FEE500] px-3 py-2.5 text-sm font-semibold text-[#181600] transition-opacity hover:opacity-90"
    : isNaver
      ? "flex w-full items-center justify-between gap-2 rounded-md bg-[#03C75A] px-3 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      : isDaangn
        ? "flex w-full items-center justify-between gap-2 rounded-md bg-[#FF7E36] px-3 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        : "flex w-full items-center justify-between gap-2 rounded-md bg-zinc-900 px-3 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90";

  return (
    <Link href={link.href} aria-label={`${link.label} 열기`} className={className}>
      <span className="flex items-center gap-2">
        {isKakao ? (
          <svg
            className="h-4 w-4 shrink-0 scale-[1.3]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        ) : link.iconSrc ? (
          <Image
            src={link.iconSrc}
            alt=""
            width={16}
            height={16}
            className={`h-4 w-4 shrink-0 ${isDaangn ? "scale-y-[1.6]" : "scale-[1.3]"}`}
            aria-hidden
          />
        ) : null}
        {link.label}
      </span>
      <svg
        className="h-4 w-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </Link>
  );
}

export function Directions({ content }: { content: DirectionsContent }) {
  if (!content.visible) return null;

  const phoneHref = content.phoneHref.startsWith("tel:")
    ? content.phoneHref
    : `tel:${content.phoneHref.replace(/\D/g, "")}`;

  const hoursLines = content.hoursBody.split("\n").filter(Boolean);
  const snsLinks = content.snsLinks.filter((l) => l.visible);

  return (
    <section id="directions" className="bg-brand py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/80 sm:text-base">
            {content.subtitle}
          </p>
        </header>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-100 ring-1 ring-black/5 sm:mt-10">
          <Image
            src={content.mapImage}
            alt={content.mapAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-5 shadow-md ring-1 ring-black/5">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {content.phoneLabel}
            </p>
            <a
              href={phoneHref}
              className="mt-2 block text-lg font-semibold text-zinc-900 transition-colors hover:text-brand"
            >
              {content.phoneDisplay}
            </a>
            <br />
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {content.kakaoLabel}
            </p>
            <a
              href={content.kakaoHref}
              className="mt-2 block text-lg font-semibold text-zinc-900 transition-colors hover:text-brand"
            >
              {content.kakaoDisplay}
            </a>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-md ring-1 ring-black/5">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {content.hoursLabel}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-900">
              {hoursLines.map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            {content.hoursNote ? (
              <p className="mt-1 text-xs text-zinc-500">{content.hoursNote}</p>
            ) : null}
          </div>

          <div className="rounded-lg bg-white p-5 shadow-md ring-1 ring-black/5">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {content.snsLabel}
            </p>
            <ul className="mt-3 space-y-2">
              {snsLinks.map((link) => (
                <li key={link.id}>
                  <SnsButton link={link} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
