// import Image from "next/image";

export function AboutStory() {
  return (
    <section id="about" className="bg-zinc-950 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-200 sm:text-sm">
            Our Story
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ABOUT
          </h2>
          <span
            aria-hidden
            className="mx-auto mt-4 block h-px w-12 bg-white/40"
          />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            정직함으로 키운 개인 오토케어 디테일링 브랜드
          </p>
        </header>

        {/* 본문 2열 */}
        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-2 lg:items-center lg:gap-14">
          {/* 좌: 소개 */}
          <div className="space-y-5 text-base leading-relaxed text-white/85 sm:text-lg">
            <p>
              <span className="font-bold text-white">The 6 Garage</span>
              는 오토케어 서비스를 제공하는
              <span className="whitespace-nowrap"> 젊은 일명 차덕후의 </span>
              개인 브랜드입니다.
            </p>
            <p>
              출장 픽업 세차만 해도 2년 차에 접어든 나름 경기 남부지역에서는
              신뢰가 어느정도 쌓인 개인 출장 세차 브랜드로서, 보다 더 나은
              서비스를 위해 매일 공부하며 노력하고 있습니다.
            </p>
            <p>
              이미 당근 마켓 업체로는 단골이 100분이 넘으며, 후기만 약 60개.
              심지어 별점 5점 만점을 유지 중인 이동식 세차에 이동식이
              바로 저랍니다.
            </p>
          </div>

          {/* 우: 작업 사진 placeholder */}
          {/*
            TODO: 사진 자산 도착 시 아래 placeholder를 제거하고
            상단 `import Image from "next/image";` 주석을 풀어
            <Image /> 블록을 활성화하세요.
            권장 경로: /public/images/about_working_01.jpg (세로형, 4:5 비율 권장)
          */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/10 sm:max-w-md sm:justify-self-center lg:max-w-none lg:justify-self-stretch">
            {/*
            <Image
              src="/images/about_working_01.jpg"
              alt="디테일러 이동식의 작업 모습"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 512px"
            />
            */}

            {/* placeholder UI — 실제 사진 삽입 시 이 블록은 삭제 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/40">
              <svg
                className="h-12 w-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <p className="text-xs uppercase tracking-[0.2em]">
                Working Photo
              </p>
            </div>
          </div>
        </div>

        {/* 숫자 하이라이트 */}
        <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-white/15 pt-10 sm:mt-20 sm:gap-8 sm:pt-12">
          <div className="text-center">
            <dt className="text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
              단골 고객
            </dt>
            <dd className="mt-2 text-2xl font-bold text-white sm:text-4xl">
              100<span className="text-lime-200">+</span>
            </dd>
          </div>
          <div className="text-center">
            <dt className="text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
              누적 후기
            </dt>
            <dd className="mt-2 text-2xl font-bold text-white sm:text-4xl">
              60<span className="text-lime-200">+</span>
            </dd>
          </div>
          <div className="text-center">
            <dt className="text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
              평균 별점
            </dt>
            <dd className="mt-2 text-2xl font-bold text-white sm:text-4xl">
              5.0
            </dd>
          </div>
        </dl>

        {/* Pull-quote */}
        <figure className="mt-14 border-t border-white/15 pt-10 text-center sm:mt-20 sm:pt-14">
          <blockquote className="mx-auto max-w-2xl text-pretty text-lg font-medium italic leading-relaxed text-white sm:text-xl">
            “고객님의 소중한 차량의 외장, 앞으로 직접 관리해 드리겠습니다.”
          </blockquote>
          <figcaption className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-lime-200">
            — Detailor 이동식
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
