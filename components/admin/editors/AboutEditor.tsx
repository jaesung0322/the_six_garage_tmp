"use client";

import { useState } from "react";
import { Field, TextArea, TextInput, Toggle } from "@/components/admin/FormControls";
import { EditPage, FormCard, useSectionSave } from "@/components/admin/EditPage";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { AboutContent } from "@/lib/cms/types";

export function AboutEditor({ initial }: { initial: AboutContent }) {
  const [data, setData] = useState<AboutContent>(initial);
  const { toast, save, pending } = useSectionSave("about");

  return (
    <EditPage
      title="소개 수정"
      subtitle="About 스토리 (AboutStory)"
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
        <Field label="부제">
          <TextInput
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          />
        </Field>
      </FormCard>

      <FormCard title="본문">
        {data.paragraphs.map((p, i) => (
          <Field key={i} label={`문단 ${i + 1}`}>
            <TextArea
              rows={3}
              value={p}
              onChange={(e) => {
                const paragraphs = [...data.paragraphs];
                paragraphs[i] = e.target.value;
                setData({ ...data, paragraphs });
              }}
            />
          </Field>
        ))}
      </FormCard>

      <FormCard title="인용 / 로고">
        <Field label="인용문">
          <TextArea
            rows={2}
            value={data.quote}
            onChange={(e) => setData({ ...data, quote: e.target.value })}
          />
        </Field>
        <Field label="인용 출처">
          <TextInput
            value={data.quoteBy}
            onChange={(e) => setData({ ...data, quoteBy: e.target.value })}
          />
        </Field>
        <ImageUploadField
          label="로고 이미지"
          section="about"
          src={data.logo}
          aspect="square"
          onChange={(logo) => setData({ ...data, logo })}
        />
      </FormCard>

      <FormCard title="숫자 통계">
        {data.stats.map((stat, i) => (
          <div key={stat.id} className="grid grid-cols-3 gap-2">
            <Field label="이름">
              <TextInput
                value={stat.label}
                onChange={(e) => {
                  const stats = [...data.stats];
                  stats[i] = { ...stat, label: e.target.value };
                  setData({ ...data, stats });
                }}
              />
            </Field>
            <Field label="숫자">
              <TextInput
                value={stat.value}
                onChange={(e) => {
                  const stats = [...data.stats];
                  stats[i] = { ...stat, value: e.target.value };
                  setData({ ...data, stats });
                }}
              />
            </Field>
            <Field label="기호">
              <TextInput
                value={stat.suffix}
                onChange={(e) => {
                  const stats = [...data.stats];
                  stats[i] = { ...stat, suffix: e.target.value };
                  setData({ ...data, stats });
                }}
              />
            </Field>
          </div>
        ))}
      </FormCard>
    </EditPage>
  );
}
