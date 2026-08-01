"use client";

import { useState } from "react";
import { Field, TextInput, Toggle } from "@/components/admin/FormControls";
import { EditPage, FormCard, useSectionSave } from "@/components/admin/EditPage";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { GalleryContent } from "@/lib/cms/types";

export function GalleryEditor({ initial }: { initial: GalleryContent }) {
  const [data, setData] = useState<GalleryContent>(initial);
  const { toast, save, pending } = useSectionSave("gallery");

  return (
    <EditPage
      title="갤러리 수정"
      subtitle="OUR WORK (GalleryStrip)"
      onSave={() => save(data)}
      onReset={() => setData(initial)}
      toast={toast}
      pending={pending}
    >
      <FormCard title="제목">
        <Toggle
          checked={data.visible}
          label="이 섹션 보이기"
          onChange={(visible) => setData({ ...data, visible })}
        />
        <Field label="제목">
          <TextInput
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </Field>
        <Field label="부제">
          <TextInput
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          />
        </Field>
      </FormCard>

      {data.shots.map((shot, i) => (
        <FormCard key={shot.id} title={`사진 ${i + 1}`}>
          <ImageUploadField
            label="이미지"
            section="gallery"
            src={shot.src}
            onChange={(src) => {
              const shots = [...data.shots];
              shots[i] = { ...shot, src };
              setData({ ...data, shots });
            }}
          />
          <Field label="설명 (alt)">
            <TextInput
              value={shot.alt}
              onChange={(e) => {
                const shots = [...data.shots];
                shots[i] = { ...shot, alt: e.target.value };
                setData({ ...data, shots });
              }}
            />
          </Field>
          <Toggle
            checked={shot.visible}
            label="이 사진 보이기"
            onChange={(visible) => {
              const shots = [...data.shots];
              shots[i] = { ...shot, visible };
              setData({ ...data, shots });
            }}
          />
        </FormCard>
      ))}
    </EditPage>
  );
}
