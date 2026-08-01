"use client";

import { useState } from "react";
import { Field, TextArea, TextInput, Toggle } from "@/components/admin/FormControls";
import { EditPage, FormCard, useSectionSave } from "@/components/admin/EditPage";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { ServicesContent } from "@/lib/cms/types";

export function ServicesEditor({ initial }: { initial: ServicesContent }) {
  const [data, setData] = useState<ServicesContent>(initial);
  const { toast, save, pending } = useSectionSave("services");

  return (
    <EditPage
      title="서비스 수정"
      subtitle="서비스 3종 (ServiceShowcase)"
      onSave={() => save(data)}
      onReset={() => setData(initial)}
      toast={toast}
      pending={pending}
    >
      <FormCard>
        <Toggle
          checked={data.visible}
          label="서비스 섹션 보이기"
          onChange={(visible) => setData({ ...data, visible })}
        />
      </FormCard>

      {data.items.map((item, index) => (
        <FormCard key={item.id} title={`서비스 ${index + 1}`}>
          <Toggle
            checked={item.visible}
            label="이 서비스 보이기"
            onChange={(visible) => {
              const items = [...data.items];
              items[index] = { ...item, visible };
              setData({ ...data, items });
            }}
          />
          <Field label="제목">
            <TextInput
              value={item.title}
              onChange={(e) => {
                const items = [...data.items];
                items[index] = { ...item, title: e.target.value };
                setData({ ...data, items });
              }}
            />
          </Field>
          <Field label="설명">
            <TextArea
              rows={5}
              value={item.description}
              onChange={(e) => {
                const items = [...data.items];
                items[index] = { ...item, description: e.target.value };
                setData({ ...data, items });
              }}
            />
          </Field>
          <ImageUploadField
            label="가격표 이미지"
            section="services"
            src={item.priceImage}
            aspect="photo"
            onChange={(priceImage) => {
              const items = [...data.items];
              items[index] = { ...item, priceImage };
              setData({ ...data, items });
            }}
          />
          <div>
            <p className="mb-3 text-sm font-medium text-zinc-300">
              작업 사진 ({item.workImages.length})
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {item.workImages.map((src, wi) => (
                <ImageUploadField
                  key={`${item.id}-${wi}`}
                  label={`${wi + 1}`}
                  section="services"
                  src={src}
                  aspect="square"
                  hint=""
                  onChange={(next) => {
                    const items = [...data.items];
                    const workImages = [...item.workImages];
                    workImages[wi] = next;
                    items[index] = { ...item, workImages };
                    setData({ ...data, items });
                  }}
                />
              ))}
            </div>
          </div>
        </FormCard>
      ))}
    </EditPage>
  );
}
