"use client";

import { useState } from "react";
import { Field, TextInput, Toggle } from "@/components/admin/FormControls";
import { EditPage, FormCard, useSectionSave } from "@/components/admin/EditPage";
import type { HeaderContent } from "@/lib/cms/types";

export function HeaderEditor({ initial }: { initial: HeaderContent }) {
  const [data, setData] = useState<HeaderContent>(initial);
  const { toast, save, pending } = useSectionSave("header");

  return (
    <EditPage
      title="헤더 수정"
      subtitle="상단 메뉴 (SiteHeader)"
      onSave={() => save(data)}
      onReset={() => setData(initial)}
      toast={toast}
      pending={pending}
    >
      <FormCard title="브랜드 이름">
        <Field label="앞부분">
          <TextInput
            value={data.brandPrefix}
            onChange={(e) => setData({ ...data, brandPrefix: e.target.value })}
          />
        </Field>
        <Field label="뒷부분 (초록색)">
          <TextInput
            value={data.brandAccent}
            onChange={(e) => setData({ ...data, brandAccent: e.target.value })}
          />
        </Field>
      </FormCard>

      <FormCard title="메뉴">
        {data.navItems.map((item, i) => (
          <div
            key={item.id}
            className="grid gap-2 border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
          >
            <Field label="메뉴 글자">
              <TextInput
                value={item.label}
                onChange={(e) => {
                  const navItems = [...data.navItems];
                  navItems[i] = { ...item, label: e.target.value };
                  setData({ ...data, navItems });
                }}
              />
            </Field>
            <Field label="링크">
              <TextInput
                value={item.href}
                onChange={(e) => {
                  const navItems = [...data.navItems];
                  navItems[i] = { ...item, href: e.target.value };
                  setData({ ...data, navItems });
                }}
              />
            </Field>
            <Toggle
              checked={item.visible}
              label="보이기"
              onChange={(visible) => {
                const navItems = [...data.navItems];
                navItems[i] = { ...item, visible };
                setData({ ...data, navItems });
              }}
            />
          </div>
        ))}
      </FormCard>
    </EditPage>
  );
}
