import Link from "next/link";
import Image from "next/image";

export function Location() {
  return (
    <section
      id="location"
      className="bg-brand py-12 sm:py-16"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            오시는 길
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/80 sm:text-base">
            방문 전 영업시간을 한 번 더 확인해 주세요.
          </p>
        </header>

        {/*
          지도 영역.
          실제 지도 이미지(또는 임베드)를 사용할 때:
          1) 아래 placeholder div 블록을 제거하세요.
          2) 이미지로 띄우려면 파일 상단에 `import Image from "next/image";` 추가 후
             아래 <Image /> 주석 블록을 활성화하세요.
             경로 예: public/images/map.jpg
          3) 네이버/구글 지도 임베드를 쓰려면 <iframe /> 주석 블록을 활성화하세요.
        */}
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-100 ring-1 ring-black/5 sm:mt-10">          
            <Image
              src="/images/tmp_map_03.jpg"
              alt="The 6 Garage 위치 지도"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          {/*
            <iframe
              src="https://map.naver.com/..."
              title="The 6 Garage 위치"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          */}

          {/* placeholder UI — 실제 지도 삽입 시 이 블록은 삭제 */}
          {/*
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-400">
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
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <p className="text-sm">지도 이미지가 들어갈 자리입니다</p>
          </div>
            */}
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3">
          {/* 전화 — href의 번호와 텍스트를 실제 번호로 교체하세요 */}
          <div className="rounded-lg bg-white p-5 shadow-md ring-1 ring-black/5">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              통화 예약 문의
            </p>
            <a
              href="tel:01040903476"
              className="mt-2 block text-lg font-semibold text-zinc-900 transition-colors hover:text-brand"
            >
              010-4090-3476
            </a>
            <br />
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              카카오톡 예약 문의
            </p>
            <a
              href="#"
              className="mt-2 block text-lg font-semibold text-zinc-900 transition-colors hover:text-brand"
            >
              KAKAO TALK : @the6garage
            </a>
          </div>

          {/* 운영시간 — 실제 영업시간으로 교체하세요 */}
          <div className="rounded-lg bg-white p-5 shadow-md ring-1 ring-black/5">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              운영시간
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-900">
              월 - 목 18:00 ~ 04:00
              <br />
              토 00:00 ~ 다음날 05:00
              <br />
              (휴게시간 12:00 ~ 20:00)
              <br />
              일 22:00 ~ 24:00
            </p>
            <p className="mt-1 text-xs text-zinc-500">설, 추석, 금 정기휴무</p>
          </div>

          {/* 바로가기 — 각 href를 실제 채널 URL로 교체하세요 */}
          <div className="rounded-lg bg-white p-5 shadow-md ring-1 ring-black/5">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              SNS
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="#KakaoTalk"
                  aria-label="카카오톡 채널 열기"
                  className="flex w-full items-center justify-between gap-2 rounded-md bg-[#FEE500] px-3 py-2.5 text-sm font-semibold text-[#181600] transition-opacity hover:opacity-90"
                >
                  <span className="flex items-center gap-2">
                    {/* 말풍선 — KakaoTalk */}
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
                    카카오톡 채널
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
              </li>
              <li>
                <Link
                  href="https://blog.naver.com/6detailing"
                  aria-label="네이버 블로그 열기"
                  className="flex w-full items-center justify-between gap-2 rounded-md bg-[#03C75A] px-3 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <span className="flex items-center gap-2">
                    {/* Naver 앱 아이콘 */}
                    <Image
                      src="/images/sns_naver_app.png"
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4 shrink-0 scale-[1.3]"
                      aria-hidden
                    />
                    네이버 블로그
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
              </li>
              <li>
                <Link
                  href="https://www.daangn.com/kr/local-profile/%EC%9D%B4%EB%8F%99%EC%8B%9D-%EC%84%B8%EC%B0%A8-citihr7tusrz/"
                  aria-label="당근 마켓 열기"
                  className="flex w-full items-center justify-between gap-2 rounded-md bg-[#FF7E36] px-3 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <span className="flex items-center gap-2">
                    {/* 당근 앱 아이콘 — 원본이 세로로 짜부되어 보여 scaleY(1.2)로 보정 */}
                    <Image
                      src="/images/sns_danggeun_icon.png"
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4 shrink-0 scale-y-[1.6]"
                      aria-hidden
                    />
                    당근
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
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}