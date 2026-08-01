"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import type { ServiceItem, ServicesContent } from "@/lib/cms/types";

const ICONS: ReactNode[] = [
  <svg
    key="spray"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.75}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 3.75h3V6.75h1.5a1.5 1.5 0 0 1 1.5 1.5V18.75a2.25 2.25 0 0 1-2.25 2.25h-4.5a2.25 2.25 0 0 1-2.25-2.25V8.25a1.5 1.5 0 0 1 1.5-1.5h1.5V3.75z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25h6" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 5.25l3-.75M18 8.25h3M18 11.25l3 .75"
    />
  </svg>,
  <svg
    key="wash"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.75}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 2.5c.5.75 1 1.25 1 2a1 1 0 1 1-2 0c0-.75.5-1.25 1-2zM12 1.5c.5.75 1 1.25 1 2a1 1 0 1 1-2 0c0-.75.5-1.25 1-2zM17.25 2.5c.5.75 1 1.25 1 2a1 1 0 1 1-2 0c0-.75.5-1.25 1-2z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.5 16.5l1.5-4a2 2 0 0 1 1.9-1.3h10.2a2 2 0 0 1 1.9 1.3l1.5 4M3.5 16.5h17M3.5 16.5v2.25a1 1 0 0 0 1 1H6a1 1 0 0 0 1-1V17.5h10v1.25a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1V16.5"
    />
  </svg>,
  <svg
    key="polish"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.75}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.53 16.122a3 3 0 0 0-5.008 1.032l-.007.02a.75.75 0 0 0 1.39.563l.007-.02A1.5 1.5 0 0 1 9.53 16.122z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3.75c1.5 2.25 3 3.75 3 6a3 3 0 1 1-6 0c0-2.25 1.5-3.75 3-6z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.91 15.365a3 3 0 0 1 4.548 1.032l.007.02a.75.75 0 0 1-1.39.563l-.007-.02a1.5 1.5 0 0 0-2.274-.516 3 3 0 0 1-.884-.079z"
    />
  </svg>,
];

function WorkGallery({ images }: { images: string[] }) {
  const first = images[0] ?? "";
  const [selectedSrc, setSelectedSrc] = useState(first);
  const [hoveredSrc, setHoveredSrc] = useState<string | null>(null);
  const isHoverPreview = hoveredSrc !== null && hoveredSrc !== selectedSrc;

  if (!images.length) return null;

  return (
    <div className="mt-6 space-y-2">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-zinc-100 ring-1 ring-black/5">
        <Image
          src={selectedSrc}
          alt="작업 사진 메인"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <Image
          src={hoveredSrc ?? selectedSrc}
          alt=""
          aria-hidden
          fill
          className={`object-cover transition-opacity duration-500 ease-out ${
            isHoverPreview ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            aria-label={`작업 사진 ${i + 1} 보기`}
            aria-pressed={selectedSrc === src}
            onMouseEnter={() => setHoveredSrc(src)}
            onMouseLeave={() => setHoveredSrc(null)}
            onFocus={() => setHoveredSrc(src)}
            onBlur={() => setHoveredSrc(null)}
            onClick={() => setSelectedSrc(src)}
            className={`relative aspect-square overflow-hidden rounded-md ring-1 ring-black/5 transition-all duration-200 hover:scale-[1.03] hover:ring-2 hover:ring-brand focus-visible:scale-[1.03] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
              selectedSrc === src ? "ring-2 ring-brand" : ""
            }`}
          >
            <Image
              src={src}
              alt={`작업 사진 ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 25vw, 12vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function ServiceCard({
  item,
  index,
}: {
  item: ServiceItem;
  index: number;
}) {
  const reversed = index % 2 === 1;
  const descriptionParts = item.description.split("\n").filter(Boolean);
  const icon = ICONS[index % ICONS.length];

  return (
    <article
      className={`scroll-mt-24 py-8 first:pt-4 sm:py-10 lg:first:pt-6 ${
        index > 0
          ? "-mt-[min(2.75rem,calc(var(--slant-shift)*0.55))]"
          : ""
      }`}
    >
      <div
        className={`flex flex-col gap-6 lg:items-stretch lg:gap-0 ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div
          className={`clip-slant-frame relative min-h-[280px] flex-1 self-stretch overflow-hidden bg-white shadow-xl ring-1 ring-black/10 sm:min-h-[320px] lg:z-20 lg:min-h-[360px] ${
            reversed ? "lg:-ml-[10px]" : "lg:-mr-[10px]"
          }`}
        >
          <div className="flex h-full flex-col justify-start px-8 pt-14 pb-8 sm:px-10 sm:pt-20 sm:pb-10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/15 text-brand">
              {icon}
            </div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
              {descriptionParts[0]}
              {descriptionParts.slice(1).map((part, i) => (
                <span key={i} className="mt-4 block">
                  {part}
                </span>
              ))}
            </p>
            <WorkGallery images={item.workImages} />
          </div>
        </div>
        <div className="clip-slant-frame relative flex-1 self-stretch overflow-hidden bg-white shadow-lg ring-1 ring-white/10 lg:z-10">
          <Image
            src={item.priceImage}
            alt={item.priceImageAlt}
            width={1334}
            height={2200}
            className="block h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </article>
  );
}

export function ServiceShowcase({ content }: { content: ServicesContent }) {
  if (!content.visible) return null;

  const items = content.items.filter((item) => item.visible);
  if (!items.length) return null;

  return (
    <section id="services" className="bg-brand py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {items.map((item, index) => (
          <ServiceCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
