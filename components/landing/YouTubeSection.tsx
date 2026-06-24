// TODO: YouTube URL의 watch?v= 뒤 영상 ID로 교체하세요.
// 예) https://www.youtube.com/watch?v=abc123xyz → "abc123xyz"
const YOUTUBE_VIDEO_ID = "";

export function YouTubeSection() {
  return (
    <section id="videos" className="bg-zinc-950 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-200 sm:text-sm">
            Watch
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            VIDEO
          </h2>
          <span
            aria-hidden
            className="mx-auto mt-4 block h-px w-12 bg-white/40"
          />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            The 6 Garage 작업 과정과 서비스를 영상으로 만나보세요.
          </p>
        </header>

        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-lg bg-black/40 ring-1 ring-white/10 sm:mt-10">
          {YOUTUBE_VIDEO_ID ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="The 6 Garage YouTube 영상"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white/50">
              <svg
                className="h-12 w-12"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <p className="text-sm">
                YouTubeSection.tsx 상단의{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white/70">
                  YOUTUBE_VIDEO_ID
                </code>
                를 설정해 주세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
