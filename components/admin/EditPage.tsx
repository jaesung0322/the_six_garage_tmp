"use client";

import { useState, useTransition, type ReactNode } from "react";
import { MockBanner, SaveBar } from "@/components/admin/FormControls";
import { saveSectionAction } from "@/lib/cms/actions";
import type { SectionKey, SiteContent } from "@/lib/cms/types";

export function useSectionSave<K extends SectionKey>(section: K) {
  const [toast, setToast] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const save = (data: SiteContent[K]) => {
    startTransition(async () => {
      const result = await saveSectionAction(section, data);
      if (!result.ok) {
        setToast(result.error);
      } else {
        setToast(
          result.source === "supabase"
            ? "Supabase에 저장했습니다."
            : "로컬 파일에 저장했습니다. (Supabase 키 없음)",
        );
      }
      window.setTimeout(() => setToast(null), 2800);
    });
  };

  return { toast, save, pending };
}

export function EditPage({
  title,
  subtitle,
  children,
  onSave,
  onReset,
  toast,
  pending,
  sourceHint,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onSave?: () => void;
  onReset?: () => void;
  toast?: string | null;
  pending?: boolean;
  sourceHint?: string;
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <header>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>}
      </header>

      <MockBanner>
        {sourceHint ??
          "저장 시 Supabase(키 설정 시) 또는 로컬 data/site-content.json 에 기록됩니다."}
      </MockBanner>

      <div className="flex flex-col gap-4">{children}</div>

      {onSave && (
        <SaveBar
          onSave={onSave}
          onReset={onReset}
          pending={pending}
          message={pending ? "저장 중…" : undefined}
        />
      )}

      {toast && (
        <div
          role="status"
          className="fixed right-4 bottom-24 z-50 max-w-sm rounded-lg border border-brand/40 bg-zinc-900 px-4 py-3 text-sm text-white shadow-xl"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

export function FormCard({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
      {title && (
        <h3 className="mb-4 text-sm font-semibold text-zinc-200">{title}</h3>
      )}
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
