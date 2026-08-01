import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { MOCK_CONTENT } from "./mock";
import type { SectionKey, SiteContent } from "./types";
import {
  createSupabaseAdmin,
  isSupabaseConfigured,
} from "@/lib/supabase/admin";

const LOCAL_FILE = path.join(process.cwd(), "data", "site-content.json");

const SECTION_KEYS = Object.keys(MOCK_CONTENT) as SectionKey[];

function cloneDefault(): SiteContent {
  return structuredClone(MOCK_CONTENT);
}

function mergeWithDefaults(partial: Partial<SiteContent> | null): SiteContent {
  const base = cloneDefault();
  if (!partial) return base;
  for (const key of SECTION_KEYS) {
    if (partial[key]) {
      // shallow section replace — admin always saves full section object
      (base as Record<string, unknown>)[key] = partial[key];
    }
  }
  return base;
}

async function readLocalFile(): Promise<SiteContent> {
  try {
    const raw = await readFile(LOCAL_FILE, "utf8");
    return mergeWithDefaults(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return cloneDefault();
  }
}

async function writeLocalFile(content: SiteContent): Promise<void> {
  await mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await writeFile(LOCAL_FILE, JSON.stringify(content, null, 2), "utf8");
}

async function readFromSupabase(): Promise<SiteContent> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from("site_sections").select("key, data");

  if (error) {
    throw new Error(`site_sections 조회 실패: ${error.message}`);
  }

  if (!data?.length) {
    return cloneDefault();
  }

  const partial: Partial<SiteContent> = {};
  for (const row of data) {
    const key = row.key as SectionKey;
    if (SECTION_KEYS.includes(key)) {
      (partial as Record<string, unknown>)[key] = row.data;
    }
  }
  return mergeWithDefaults(partial);
}

async function writeSectionSupabase(
  key: SectionKey,
  data: SiteContent[SectionKey],
): Promise<void> {
  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from("site_sections").upsert(
    {
      key,
      data,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) {
    throw new Error(`site_sections 저장 실패: ${error.message}`);
  }
}

export type ContentSource = "supabase" | "local";

export async function getContentSource(): Promise<ContentSource> {
  return isSupabaseConfigured() ? "supabase" : "local";
}

export async function getSiteContent(): Promise<SiteContent> {
  if (isSupabaseConfigured()) {
    try {
      return await readFromSupabase();
    } catch (err) {
      console.error(err);
      return cloneDefault();
    }
  }
  return readLocalFile();
}

export async function getSection<K extends SectionKey>(
  key: K,
): Promise<SiteContent[K]> {
  const content = await getSiteContent();
  return content[key];
}

export async function saveSection<K extends SectionKey>(
  key: K,
  data: SiteContent[K],
): Promise<{ source: ContentSource }> {
  if (isSupabaseConfigured()) {
    await writeSectionSupabase(key, data);
    return { source: "supabase" };
  }

  const content = await readLocalFile();
  content[key] = data;
  await writeLocalFile(content);
  return { source: "local" };
}

/** 최초 시드: DB가 비어 있으면 MOCK_CONTENT로 채움 */
export async function seedSiteContentIfEmpty(): Promise<number> {
  if (!isSupabaseConfigured()) return 0;

  const supabase = createSupabaseAdmin();
  const { count, error } = await supabase
    .from("site_sections")
    .select("*", { count: "exact", head: true });

  if (error) throw new Error(error.message);
  if ((count ?? 0) > 0) return 0;

  const rows = SECTION_KEYS.map((key) => ({
    key,
    data: MOCK_CONTENT[key],
    updated_at: new Date().toISOString(),
  }));

  const { error: upsertError } = await supabase
    .from("site_sections")
    .upsert(rows, { onConflict: "key" });

  if (upsertError) throw new Error(upsertError.message);
  return rows.length;
}
