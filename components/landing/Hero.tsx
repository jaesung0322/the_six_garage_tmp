import Image from "next/image";
import Link from "next/link";

const heroImage = "/images/hero_01.jpeg";

export function Hero() {
  return (
    <section className="relative flex min-h-0 flex-1 flex-col bg-brand">
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="absolute inset-0 min-h-0">
          <div className="clip-slant-frame absolute inset-0 overflow-hidden [filter:drop-shadow(0_0_0_1.5px_rgba(51,102,0,0.85))]">
            <Image
              src={heroImage}
              alt="Professional vehicle bay"
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
            Local vehicle care
          </p>
          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            The 6 Garage <br /> Detailing &amp; Light Maintenance
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-zinc-300 sm:text-lg">
            외부·내부 세차와 광택, 경정비까지—좋은 제품으로 꼼꼼히 진행하고, 직접
            작업하고 싶을 때는 DIY에 맞춘 안내도 함께합니다.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="#book"
              className="inline-flex w-full min-w-[200px] items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-brand shadow-lg transition-opacity hover:opacity-90 sm:w-auto"
            >
              예약 일정
            </Link>
            <Link
              href="#services"
              className="inline-flex w-full min-w-[200px] items-center justify-center rounded-md border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10 sm:w-auto"
            >
              서비스 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
