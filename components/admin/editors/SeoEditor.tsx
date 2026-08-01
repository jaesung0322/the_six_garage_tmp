"use client";

import { useState } from "react";
import { Field, TextArea, TextInput } from "@/components/admin/FormControls";
import { EditPage, FormCard, useSectionSave } from "@/components/admin/EditPage";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { SiteMeta } from "@/lib/cms/types";

export function SeoEditor({ initial }: { initial: SiteMeta }) {
  const [data, setData] = useState<SiteMeta>(initial);
  const { toast, save, pending } = useSectionSave("site");

  return (
    <EditPage
      title="SEO 수정"
      subtitle="브라우저 탭 제목 · SNS 공유 이미지"
      onSave={() => save(data)}
      onReset={() => setData(initial)}
      toast={toast}
      pending={pending}
    >
      <FormCard>
        <Field label="사이트 제목">
          <TextInput
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </Field>
        <Field label="사이트 설명">
          <TextArea
            rows={3}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </Field>
        <ImageUploadField
          label="공유 이미지"
          section="seo"
          src={data.ogImage}
          onChange={(ogImage) => setData({ ...data, ogImage })}
        />
      </FormCard>
    </EditPage>
  );
}
