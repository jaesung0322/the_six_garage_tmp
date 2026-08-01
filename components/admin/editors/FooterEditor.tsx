"use client";

import { useState } from "react";
import { Field, TextArea, TextInput, Toggle } from "@/components/admin/FormControls";
import { EditPage, FormCard, useSectionSave } from "@/components/admin/EditPage";
import type { FooterContent } from "@/lib/cms/types";

export function FooterEditor({ initial }: { initial: FooterContent }) {
  const [data, setData] = useState<FooterContent>(initial);
  const { toast, save, pending } = useSectionSave("footer");

  return (
    <EditPage
      title="푸터 수정"
      subtitle="하단 영역 (SiteFooter)"
      onSave={() => save(data)}
      onReset={() => setData(initial)}
      toast={toast}
      pending={pending}
    >
      <FormCard title="브랜드">
        <Toggle
          checked={data.visible}
          label="푸터 보이기"
          onChange={(visible) => setData({ ...data, visible })}
        />
        <Field label="브랜드 앞부분">
          <TextInput
            value={data.brandPrefix}
            onChange={(e) => setData({ ...data, brandPrefix: e.target.value })}
          />
        </Field>
        <Field label="브랜드 뒷부분">
          <TextInput
            value={data.brandAccent}
            onChange={(e) => setData({ ...data, brandAccent: e.target.value })}
          />
        </Field>
        <Field label="소개 문구">
          <TextArea
            rows={3}
            value={data.tagline}
            onChange={(e) => setData({ ...data, tagline: e.target.value })}
          />
        </Field>
        <Field label="저작권" hint="{year} = 올해 연도">
          <TextInput
            value={data.copyright}
            onChange={(e) => setData({ ...data, copyright: e.target.value })}
          />
        </Field>
      </FormCard>

      <FormCard title="Services 목록">
        {data.serviceLabels.map((label, i) => (
          <Field key={i} label={`항목 ${i + 1}`}>
            <TextInput
              value={label}
              onChange={(e) => {
                const serviceLabels = [...data.serviceLabels];
                serviceLabels[i] = e.target.value;
                setData({ ...data, serviceLabels });
              }}
            />
          </Field>
        ))}
      </FormCard>

      <FormCard title="Contact 링크">
        {data.contactLinks.map((link, i) => (
          <div key={link.id} className="grid gap-2 sm:grid-cols-2">
            <Field label="이름">
              <TextInput
                value={link.label}
                onChange={(e) => {
                  const contactLinks = [...data.contactLinks];
                  contactLinks[i] = { ...link, label: e.target.value };
                  setData({ ...data, contactLinks });
                }}
              />
            </Field>
            <Field label="링크">
              <TextInput
                value={link.href}
                onChange={(e) => {
                  const contactLinks = [...data.contactLinks];
                  contactLinks[i] = { ...link, href: e.target.value };
                  setData({ ...data, contactLinks });
                }}
              />
            </Field>
          </div>
        ))}
      </FormCard>
    </EditPage>
  );
}
