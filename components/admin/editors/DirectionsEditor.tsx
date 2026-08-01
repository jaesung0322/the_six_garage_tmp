"use client";

import { useState } from "react";
import { Field, TextArea, TextInput, Toggle } from "@/components/admin/FormControls";
import { EditPage, FormCard, useSectionSave } from "@/components/admin/EditPage";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { DirectionsContent } from "@/lib/cms/types";

export function DirectionsEditor({ initial }: { initial: DirectionsContent }) {
  const [data, setData] = useState<DirectionsContent>(initial);
  const { toast, save, pending } = useSectionSave("directions");

  return (
    <EditPage
      title="오시는 길 수정"
      subtitle="지도·연락처 (Directions)"
      onSave={() => save(data)}
      onReset={() => setData(initial)}
      toast={toast}
      pending={pending}
    >
      <FormCard title="제목 / 지도">
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
        <ImageUploadField
          label="지도 이미지"
          section="directions"
          src={data.mapImage}
          onChange={(mapImage) => setData({ ...data, mapImage })}
        />
      </FormCard>

      <FormCard title="전화 / 카카오">
        <Field label="전화 카드 제목">
          <TextInput
            value={data.phoneLabel}
            onChange={(e) => setData({ ...data, phoneLabel: e.target.value })}
          />
        </Field>
        <Field label="전화번호 (화면 표시)">
          <TextInput
            value={data.phoneDisplay}
            onChange={(e) => setData({ ...data, phoneDisplay: e.target.value })}
          />
        </Field>
        <Field label="카카오 카드 제목">
          <TextInput
            value={data.kakaoLabel}
            onChange={(e) => setData({ ...data, kakaoLabel: e.target.value })}
          />
        </Field>
        <Field label="카카오 ID">
          <TextInput
            value={data.kakaoDisplay}
            onChange={(e) => setData({ ...data, kakaoDisplay: e.target.value })}
          />
        </Field>
      </FormCard>

      <FormCard title="운영시간">
        <Field label="카드 제목">
          <TextInput
            value={data.hoursLabel}
            onChange={(e) => setData({ ...data, hoursLabel: e.target.value })}
          />
        </Field>
        <Field label="시간 내용">
          <TextArea
            rows={5}
            value={data.hoursBody}
            onChange={(e) => setData({ ...data, hoursBody: e.target.value })}
          />
        </Field>
        <Field label="휴무 안내">
          <TextInput
            value={data.hoursNote}
            onChange={(e) => setData({ ...data, hoursNote: e.target.value })}
          />
        </Field>
      </FormCard>

      <FormCard title="SNS 링크">
        {data.snsLinks.map((link, i) => (
          <div
            key={link.id}
            className="grid gap-2 border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
          >
            <Field label="이름">
              <TextInput
                value={link.label}
                onChange={(e) => {
                  const snsLinks = [...data.snsLinks];
                  snsLinks[i] = { ...link, label: e.target.value };
                  setData({ ...data, snsLinks });
                }}
              />
            </Field>
            <Field label="주소">
              <TextInput
                value={link.href}
                onChange={(e) => {
                  const snsLinks = [...data.snsLinks];
                  snsLinks[i] = { ...link, href: e.target.value };
                  setData({ ...data, snsLinks });
                }}
              />
            </Field>
          </div>
        ))}
      </FormCard>
    </EditPage>
  );
}
