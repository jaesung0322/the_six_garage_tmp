import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

function renderWithBreaks(text: string): ReactNode {
  const parts = text.split(/<br\s*\/?>|\r?\n/i);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <br />}
    </Fragment>
  ));
}

type Service = {
  id: number;
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

const services: Service[] = [
  {
    id: 0,
    title: "셀프 세차 도우미",
    description:
      "세차시 세차에 필요한 모든 도구를 제공하며<br>사용만 하실 수 있도록 미리 준비하여 드립니다.<br>소요시간은 보통 1시간 30분 정도 소요되지만 오염 상태에 따라 변동 될 수 있습니다.",
    ctaLabel: "자세히보기",
    ctaHref: "#book",
    imageSrc: "/images/price_01_edit_02.jpg",
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
    id: 1,
    reverse: true,
    title: "출장 픽업 세차(기본형)",
    description:
      "소요 시간은 약 2시간 30분 정도 소요되지만 작업 상황에 따라 변동될 수 있습니다.<br>차량 상태에 따라 진행 과정에 변화가 있을 수 있으며<br>오염 상태에 따라 추가 작업을 요청할 수 있습니다.",
    ctaLabel: "자세히보기",
    ctaHref: "#book",
    imageSrc: "/images/price_02_edit_02.jpg",
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
    id: 2,
    title: "출장 픽업 세차(광택형)",
    description:
      "소요 시간은 약 6시간 정도 소요되지만 작업 상황에 따라 변동될 수 있습니다.<br>차량 상태에 따라 진행 과정에 변화가 있을 수 있으며<br>오염 상태에 따라 추가 작업을 요청할 수 있습니다.",
    ctaLabel: "자세히보기",
    ctaHref: "#book",
    imageSrc: "/images/price_03_edit_02.jpg",
    imageAlt: "Car profile with tinted glass",
    icon: (
      <IconWrap>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      </IconWrap>
    ),
  },
];

function ServiceRow({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const card = (
    <div
      className={`clip-slant-frame relative h-full min-h-[280px] flex-1 overflow-hidden bg-white shadow-xl ring-1 ring-black/10 sm:min-h-[320px] lg:min-h-[360px] lg:z-20 ${service.reverse ? "lg:-ml-[10px]" : "lg:-mr-[10px]"}`}
    >
      <div className="flex h-full flex-col justify-center p-8 sm:p-10">
        {service.icon}
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          {service.title}
        </h3>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
          {renderWithBreaks(service.description)}
        </p>
        <Link
          href={service.ctaHref}
          className="mt-6 inline-flex w-fit items-center rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
        >
          {service.ctaLabel}
        </Link>
      </div>
    </div>
  );

  const visual = (
    <div className="clip-slant-frame relative flex-1 overflow-hidden bg-white shadow-lg ring-1 ring-white/10 lg:z-10">
      <Image
        src={service.imageSrc}
        alt={service.imageAlt}
        width={1600}
        height={1200}
        className="block h-auto w-full"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );

  return (
    <article
      className={`scroll-mt-24 py-8 first:pt-4 sm:py-10 lg:first:pt-6 ${index > 0 ? "-mt-[min(2.75rem,calc(var(--slant-shift)*0.55))]" : ""}`}
    >
      <div
        className={`flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-0 ${service.reverse ? "lg:flex-row-reverse" : ""}`}
      >
        {card}
        {visual}
      </div>
    </article>
  );
}

export function ServiceShowcase() {
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
        {services.map((service, index) => (
          <ServiceRow key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
