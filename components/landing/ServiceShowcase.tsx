"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function ServiceShowcase() {
  // 첫 번째 카드의 작업 사진 미리보기 상태
  const [selectedSrc, setSelectedSrc] = useState("/images/a45_01.jpg");
  const [hoveredSrc, setHoveredSrc] = useState<string | null>(null);
  const isHoverPreview =
    hoveredSrc !== null && hoveredSrc !== selectedSrc;

  return (
    <section className="bg-brand py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 서비스 1: 셀프 세차 도우미 */}
        <article className="scroll-mt-24 py-8 first:pt-4 sm:py-10 lg:first:pt-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-0">
            <div className="clip-slant-frame relative min-h-[280px] flex-1 self-stretch overflow-hidden bg-white shadow-xl ring-1 ring-black/10 sm:min-h-[320px] lg:z-20 lg:-mr-[10px] lg:min-h-[360px]">
              <div className="flex h-full flex-col justify-start px-8 pt-14 pb-8 sm:px-10 sm:pt-20 sm:pb-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  {/* 분무기 (스프레이 보틀) - 셀프 세차 도구 */}
                  <svg
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 14.25h6"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 5.25l3-.75M18 8.25h3M18 11.25l3 .75"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                  셀프 세차 도우미
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
                  세차시 세차에 필요한 모든 도구를 제공하며
                  <br />
                  사용만 하실 수 있도록 미리 준비하여 드립니다.
                  <br />
                  소요시간은 보통 1시간 30분 정도 소요되지만
                  <br />
                  오염 상태에 따라 변동 될 수 있습니다.
                </p>

                {/* 작업 사진 미리보기: 메인 1장 + 4x2 썸네일 */}
                <div className="mt-6 space-y-2">
                  {/* 메인 이미지: 클릭된 이미지(베이스) 위에 호버 이미지가 페이드 인 */}
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

                  {/* 4 x 2 썸네일 (각 항목 호버=미리보기, 클릭=확정) */}
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      type="button"
                      aria-label="작업 사진 1 보기"
                      aria-pressed={selectedSrc === "/images/a45_01.jpg"}
                      onMouseEnter={() => setHoveredSrc("/images/a45_01.jpg")}
                      onMouseLeave={() => setHoveredSrc(null)}
                      onFocus={() => setHoveredSrc("/images/a45_01.jpg")}
                      onBlur={() => setHoveredSrc(null)}
                      onClick={() => setSelectedSrc("/images/a45_01.jpg")}
                      className={`relative aspect-square overflow-hidden rounded-md ring-1 ring-black/5 transition-all duration-200 hover:scale-[1.03] hover:ring-2 hover:ring-brand focus-visible:scale-[1.03] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                        selectedSrc === "/images/a45_01.jpg"
                          ? "ring-2 ring-brand"
                          : ""
                      }`}
                    >
                      <Image
                        src="/images/a45_01.jpg"
                        alt="작업 사진 1"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12vw"
                      />
                    </button>
                    <button
                      type="button"
                      aria-label="작업 사진 2 보기"
                      aria-pressed={selectedSrc === "/images/a45_02.jpg"}
                      onMouseEnter={() => setHoveredSrc("/images/a45_02.jpg")}
                      onMouseLeave={() => setHoveredSrc(null)}
                      onFocus={() => setHoveredSrc("/images/a45_02.jpg")}
                      onBlur={() => setHoveredSrc(null)}
                      onClick={() => setSelectedSrc("/images/a45_02.jpg")}
                      className={`relative aspect-square overflow-hidden rounded-md ring-1 ring-black/5 transition-all duration-200 hover:scale-[1.03] hover:ring-2 hover:ring-brand focus-visible:scale-[1.03] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                        selectedSrc === "/images/a45_02.jpg"
                          ? "ring-2 ring-brand"
                          : ""
                      }`}
                    >
                      <Image
                        src="/images/a45_02.jpg"
                        alt="작업 사진 2"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12vw"
                      />
                    </button>
                    <button
                      type="button"
                      aria-label="작업 사진 3 보기"
                      aria-pressed={selectedSrc === "/images/a45_03.jpg"}
                      onMouseEnter={() => setHoveredSrc("/images/a45_03.jpg")}
                      onMouseLeave={() => setHoveredSrc(null)}
                      onFocus={() => setHoveredSrc("/images/a45_03.jpg")}
                      onBlur={() => setHoveredSrc(null)}
                      onClick={() => setSelectedSrc("/images/a45_03.jpg")}
                      className={`relative aspect-square overflow-hidden rounded-md ring-1 ring-black/5 transition-all duration-200 hover:scale-[1.03] hover:ring-2 hover:ring-brand focus-visible:scale-[1.03] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                        selectedSrc === "/images/a45_03.jpg"
                          ? "ring-2 ring-brand"
                          : ""
                      }`}
                    >
                      <Image
                        src="/images/a45_03.jpg"
                        alt="작업 사진 3"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12vw"
                      />
                    </button>
                    <button
                      type="button"
                      aria-label="작업 사진 4 보기"
                      aria-pressed={selectedSrc === "/images/a45_04.jpg"}
                      onMouseEnter={() => setHoveredSrc("/images/a45_04.jpg")}
                      onMouseLeave={() => setHoveredSrc(null)}
                      onFocus={() => setHoveredSrc("/images/a45_04.jpg")}
                      onBlur={() => setHoveredSrc(null)}
                      onClick={() => setSelectedSrc("/images/a45_04.jpg")}
                      className={`relative aspect-square overflow-hidden rounded-md ring-1 ring-black/5 transition-all duration-200 hover:scale-[1.03] hover:ring-2 hover:ring-brand focus-visible:scale-[1.03] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                        selectedSrc === "/images/a45_04.jpg"
                          ? "ring-2 ring-brand"
                          : ""
                      }`}
                    >
                      <Image
                        src="/images/a45_04.jpg"
                        alt="작업 사진 4"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12vw"
                      />
                    </button>
                    <button
                      type="button"
                      aria-label="작업 사진 5 보기"
                      aria-pressed={selectedSrc === "/images/tt_01.jpg"}
                      onMouseEnter={() => setHoveredSrc("/images/tt_01.jpg")}
                      onMouseLeave={() => setHoveredSrc(null)}
                      onFocus={() => setHoveredSrc("/images/tt_01.jpg")}
                      onBlur={() => setHoveredSrc(null)}
                      onClick={() => setSelectedSrc("/images/tt_01.jpg")}
                      className={`relative aspect-square overflow-hidden rounded-md ring-1 ring-black/5 transition-all duration-200 hover:scale-[1.03] hover:ring-2 hover:ring-brand focus-visible:scale-[1.03] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                        selectedSrc === "/images/tt_01.jpg"
                          ? "ring-2 ring-brand"
                          : ""
                      }`}
                    >
                      <Image
                        src="/images/tt_01.jpg"
                        alt="작업 사진 5"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12vw"
                      />
                    </button>
                    <button
                      type="button"
                      aria-label="작업 사진 6 보기"
                      aria-pressed={selectedSrc === "/images/tt_02.jpg"}
                      onMouseEnter={() => setHoveredSrc("/images/tt_02.jpg")}
                      onMouseLeave={() => setHoveredSrc(null)}
                      onFocus={() => setHoveredSrc("/images/tt_02.jpg")}
                      onBlur={() => setHoveredSrc(null)}
                      onClick={() => setSelectedSrc("/images/tt_02.jpg")}
                      className={`relative aspect-square overflow-hidden rounded-md ring-1 ring-black/5 transition-all duration-200 hover:scale-[1.03] hover:ring-2 hover:ring-brand focus-visible:scale-[1.03] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                        selectedSrc === "/images/tt_02.jpg"
                          ? "ring-2 ring-brand"
                          : ""
                      }`}
                    >
                      <Image
                        src="/images/tt_02.jpg"
                        alt="작업 사진 6"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12vw"
                      />
                    </button>
                    <button
                      type="button"
                      aria-label="작업 사진 7 보기"
                      aria-pressed={selectedSrc === "/images/tt_03.jpg"}
                      onMouseEnter={() => setHoveredSrc("/images/tt_03.jpg")}
                      onMouseLeave={() => setHoveredSrc(null)}
                      onFocus={() => setHoveredSrc("/images/tt_03.jpg")}
                      onBlur={() => setHoveredSrc(null)}
                      onClick={() => setSelectedSrc("/images/tt_03.jpg")}
                      className={`relative aspect-square overflow-hidden rounded-md ring-1 ring-black/5 transition-all duration-200 hover:scale-[1.03] hover:ring-2 hover:ring-brand focus-visible:scale-[1.03] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                        selectedSrc === "/images/tt_03.jpg"
                          ? "ring-2 ring-brand"
                          : ""
                      }`}
                    >
                      <Image
                        src="/images/tt_03.jpg"
                        alt="작업 사진 7"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12vw"
                      />
                    </button>
                    <button
                      type="button"
                      aria-label="작업 사진 8 보기"
                      aria-pressed={selectedSrc === "/images/tt_04.jpg"}
                      onMouseEnter={() => setHoveredSrc("/images/tt_04.jpg")}
                      onMouseLeave={() => setHoveredSrc(null)}
                      onFocus={() => setHoveredSrc("/images/tt_04.jpg")}
                      onBlur={() => setHoveredSrc(null)}
                      onClick={() => setSelectedSrc("/images/tt_04.jpg")}
                      className={`relative aspect-square overflow-hidden rounded-md ring-1 ring-black/5 transition-all duration-200 hover:scale-[1.03] hover:ring-2 hover:ring-brand focus-visible:scale-[1.03] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none ${
                        selectedSrc === "/images/tt_04.jpg"
                          ? "ring-2 ring-brand"
                          : ""
                      }`}
                    >
                      <Image
                        src="/images/tt_04.jpg"
                        alt="작업 사진 8"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12vw"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="clip-slant-frame relative flex-1 self-stretch overflow-hidden bg-white shadow-lg ring-1 ring-white/10 lg:z-10">
              <Image
                src="/images/price_01_edit_02.jpg"
                alt="Sports car in studio lighting"
                width={1334}
                height={2200}
                className="block h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </article>

        {/* 서비스 2: 출장 픽업 세차(기본형) - 좌우 반전 */}
        <article className="-mt-[min(2.75rem,calc(var(--slant-shift)*0.55))] scroll-mt-24 py-8 first:pt-4 sm:py-10 lg:first:pt-6">
          <div className="flex flex-col gap-6 lg:flex-row-reverse lg:items-stretch lg:gap-0">
            <div className="clip-slant-frame relative min-h-[280px] flex-1 self-stretch overflow-hidden bg-white shadow-xl ring-1 ring-black/10 sm:min-h-[320px] lg:z-20 lg:-ml-[10px] lg:min-h-[360px]">
              <div className="flex h-full flex-col justify-start px-8 pt-14 pb-8 sm:px-10 sm:pt-20 sm:pb-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  {/* 자동차 + 물방울 - 세차 */}
                  <svg
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
                  </svg>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                  출장 픽업 세차(기본형)
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
                  소요 시간은 약 2시간 30분 정도 소요되지만
                  <br />
                  작업 상황에 따라 변동될 수 있습니다.
                  <br />
                  차량 상태에 따라 진행 과정에 변화가 있을 수 있으며
                  <br />
                  오염 상태에 따라 추가 작업을 요청할 수 있습니다.
                </p>
                <Link
                  href="#book"
                  className="mt-6 inline-flex w-fit items-center rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
                >
                  작업 사진 보기
                </Link>
              </div>
            </div>
            <div className="clip-slant-frame relative flex-1 self-stretch overflow-hidden bg-white shadow-lg ring-1 ring-white/10 lg:z-10">
              <Image
                src="/images/price_02_edit_02.jpg"
                alt="Performance car in garage"
                width={1334}
                height={2200}
                className="block h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </article>

        {/* 서비스 3: 출장 픽업 세차(광택형) */}
        <article className="-mt-[min(2.75rem,calc(var(--slant-shift)*0.55))] scroll-mt-24 py-8 first:pt-4 sm:py-10 lg:first:pt-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-0">
            <div className="clip-slant-frame relative min-h-[280px] flex-1 self-stretch overflow-hidden bg-white shadow-xl ring-1 ring-black/10 sm:min-h-[320px] lg:z-20 lg:-mr-[10px] lg:min-h-[360px]">
              <div className="flex h-full flex-col justify-start px-8 pt-14 pb-8 sm:px-10 sm:pt-20 sm:pb-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  {/* 스파클(반짝임) - 광택 효과 */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624L16.5 21.75l-.398-1.126a3.375 3.375 0 00-2.158-2.158L12.75 18l1.194-.398a3.375 3.375 0 002.158-2.158L16.5 14.25l.398 1.194a3.375 3.375 0 002.158 2.158l1.126.398-1.126.398a3.375 3.375 0 00-2.158 2.158z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                  출장 픽업 세차(광택형)
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
                  소요 시간은 약 6시간 정도 소요되지만
                  <br />
                  작업 상황에 따라 변동될 수 있습니다.
                  <br />
                  차량 상태에 따라 진행 과정에 변화가 있을 수 있으며
                  <br />
                  오염 상태에 따라 추가 작업을 요청할 수 있습니다.
                </p>
                <Link
                  href="#book"
                  className="mt-6 inline-flex w-fit items-center rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
                >
                  작업 사진 보기
                </Link>
              </div>
            </div>
            <div className="clip-slant-frame relative flex-1 self-stretch overflow-hidden bg-white shadow-lg ring-1 ring-white/10 lg:z-10">
              <Image
                src="/images/price_03_edit_02.jpg"
                alt="Car profile with tinted glass"
                width={1334}
                height={2200}
                className="block h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
