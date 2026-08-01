"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import type { GalleryContent } from "@/lib/cms/types";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function GalleryStrip({ content }: { content: GalleryContent }) {
  if (!content.visible) return null;

  const shots = content.shots.filter((s) => s.visible);
  if (!shots.length) return null;

  return (
    <section id="gallery" className="border-y border-zinc-200 bg-zinc-100 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold text-zinc-900 sm:text-2xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-zinc-600">
          {content.subtitle}
        </p>

        <div className="gallery-swiper mt-10">
          <Swiper
            modules={[Grid, Navigation, Pagination]}
            spaceBetween={12}
            slidesPerView={2}
            grid={{ rows: 2, fill: "row" }}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: {
                spaceBetween: 16,
              },
            }}
          >
            {shots.map((shot) => (
              <SwiperSlide key={shot.id}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md ring-1 ring-black/5">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
