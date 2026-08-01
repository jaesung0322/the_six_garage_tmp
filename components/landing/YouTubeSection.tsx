import type { YoutubeContent } from "@/lib/cms/types";

export function YouTubeSection({ content }: { content: YoutubeContent }) {
  if (!content.visible) return null;

  return (
    <section
      id="videos"
      className="relative flex min-h-dvh flex-col bg-zinc-950"
    >
      <header className="relative z-10 shrink-0 px-4 pb-6 pt-14 text-center sm:px-6 sm:pb-8 sm:pt-16 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-200 sm:text-sm">
          {content.eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {content.title}
        </h2>
        <span
          aria-hidden
          className="mx-auto mt-4 block h-px w-12 bg-white/40"
        />
      </header>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-lg bg-black/40 ring-1 ring-white/10">
          {content.videoId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${content.videoId}`}
              title={content.embedTitle}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white/50">
              <p className="text-sm">관리자에서 유튜브 영상 ID를 설정해 주세요.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
