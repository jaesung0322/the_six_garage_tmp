"use client";

import { useState } from "react";
import { Field, TextArea, TextInput, Toggle } from "@/components/admin/FormControls";
import { EditPage, FormCard, useSectionSave } from "@/components/admin/EditPage";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { HeroContent } from "@/lib/cms/types";

export function HeroEditor({ initial }: { initial: HeroContent }) {
  const [data, setData] = useState<HeroContent>(initial);
  const { toast, save, pending } = useSectionSave("hero");

  return (
    <EditPage
      title="히어로 수정"
      subtitle="상단 메인 화면 (Hero)"
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
        <Field label="작은 제목 (Eyebrow)">
          <TextInput
            value={data.eyebrow}
            onChange={(e) => setData({ ...data, eyebrow: e.target.value })}
          />
        </Field>
        <Field label="큰 제목">
          <TextInput
            value={data.headline}
            onChange={(e) => setData({ ...data, headline: e.target.value })}
          />
        </Field>
        <Field label="부제목">
          <TextInput
            value={data.subheadline}
            onChange={(e) => setData({ ...data, subheadline: e.target.value })}
          />
        </Field>
        <Field label="설명 문구">
          <TextArea
            rows={4}
            value={data.body}
            onChange={(e) => setData({ ...data, body: e.target.value })}
          />
        </Field>
        <Field label="버튼 글자">
          <TextInput
            value={data.ctaLabel}
            onChange={(e) => setData({ ...data, ctaLabel: e.target.value })}
          />
        </Field>
        <Field label="버튼 링크">
          <TextInput
            value={data.ctaHref}
            onChange={(e) => setData({ ...data, ctaHref: e.target.value })}
          />
        </Field>
        <ImageUploadField
          label="배경 이미지"
          section="hero"
          src={data.image}
          onChange={(image) => setData({ ...data, image })}
        />
      </FormCard>
    </EditPage>
  );
}
