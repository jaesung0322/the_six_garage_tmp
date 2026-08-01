"use client";

import { useState } from "react";
import { Field, TextInput, Toggle } from "@/components/admin/FormControls";
import { EditPage, FormCard, useSectionSave } from "@/components/admin/EditPage";
import type { YoutubeContent } from "@/lib/cms/types";

export function YoutubeEditor({ initial }: { initial: YoutubeContent }) {
  const [data, setData] = useState<YoutubeContent>(initial);
  const { toast, save, pending } = useSectionSave("youtube");

  return (
    <EditPage
      title="비디오 수정"
      subtitle="유튜브 영상 (YouTubeSection)"
      onSave={() => save(data)}
      onReset={() => setData(initial)}
      toast={toast}
      pending={pending}
    >
      <FormCard>
        <Toggle
          checked={data.visible}
          label="이 섹션 보이기"
          onChange={(visible) => setData({ ...data, visible })}
        />
        <Field label="작은 제목">
          <TextInput
            value={data.eyebrow}
            onChange={(e) => setData({ ...data, eyebrow: e.target.value })}
          />
        </Field>
        <Field label="제목">
          <TextInput
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </Field>
        <Field label="유튜브 영상 ID" hint="주소의 watch?v= 뒤 부분">
          <TextInput
            value={data.videoId}
            onChange={(e) => setData({ ...data, videoId: e.target.value })}
          />
        </Field>
        {data.videoId && (
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-black">
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${data.videoId}`}
                title={data.embedTitle}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </FormCard>
    </EditPage>
  );
}
