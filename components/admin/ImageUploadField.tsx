"use client";

import { useId, useRef, useState, useTransition } from "react";
import { uploadImage } from "@/lib/admin/upload";
import type { UploadSection } from "@/lib/admin/upload-config";

type Aspect = "video" | "square" | "photo";

const aspectClass: Record<Aspect, string> = {
  video: "aspect-video",
  square: "aspect-square",
  photo: "aspect-[4/3]",
};

type Props = {
  label: string;
  /** public/uploads/{section}/ 하위 폴더 */
  section: UploadSection;
  src: string;
  onChange: (nextSrc: string) => void;
  aspect?: Aspect;
  hint?: string;
};

/**
 * 현재 이미지를 보여주고, 업로드로 public/uploads/{section}/ 에 저장·교체합니다.
 */
export function ImageUploadField({
  label,
  section,
  src,
  onChange,
  aspect = "video",
  hint = "클릭하거나 파일을 선택해 이미지를 바꿉니다.",
}: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onFile = (file: File | undefined) => {
    if (!file) return;
    setError(null);

    const formData = new FormData();
    formData.set("section", section);
    formData.set("file", file);

    startTransition(async () => {
      const result = await uploadImage(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onChange(result.url);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      <label
        htmlFor={inputId}
        className={`group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 ${aspectClass[aspect]} ${
          pending ? "pointer-events-none opacity-60" : ""
        }`}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- 업로드 경로·로컬 미리보기
          <img src={src} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center text-sm text-zinc-500">
            이미지 없음
          </span>
        )}
        <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <span className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-zinc-900">
            {pending ? "업로드 중…" : "이미지 변경"}
          </span>
        </span>
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 hover:bg-white/5 disabled:opacity-50"
        >
          {pending ? "업로드 중…" : "파일 선택"}
        </button>
        {hint ? <span className="text-xs text-zinc-500">{hint}</span> : null}
      </div>
      {error && (
        <p role="alert" className="text-xs text-red-300">
          {error}
        </p>
      )}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        disabled={pending}
        onChange={(e) => {
          onFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
