"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/admin/session";
import {
  getContentSource,
  getSection,
  saveSection,
  seedSiteContentIfEmpty,
} from "@/lib/cms/repository";
import type { SectionKey, SiteContent } from "@/lib/cms/types";

export type SaveSectionResult =
  | { ok: true; source: "supabase" | "local" }
  | { ok: false; error: string };

export async function saveSectionAction<K extends SectionKey>(
  key: K,
  data: SiteContent[K],
): Promise<SaveSectionResult> {
  const session = await getSession();
  if (!session) {
    return { ok: false, error: "로그인이 필요합니다." };
  }

  try {
    const { source } = await saveSection(key, data);
    revalidatePath("/");
    revalidatePath("/six_garage_mgt", "layout");
    return { ok: true, source };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "저장에 실패했습니다.";
    return { ok: false, error: message };
  }
}

export async function loadSectionAction<K extends SectionKey>(
  key: K,
): Promise<SiteContent[K]> {
  return getSection(key);
}

export async function getCmsStatusAction(): Promise<{
  source: "supabase" | "local";
}> {
  return { source: await getContentSource() };
}

export async function seedCmsAction(): Promise<SaveSectionResult> {
  const session = await getSession();
  if (!session) {
    return { ok: false, error: "로그인이 필요합니다." };
  }

  try {
    await seedSiteContentIfEmpty();
    return { ok: true, source: "supabase" };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "시드에 실패했습니다.";
    return { ok: false, error: message };
  }
}
