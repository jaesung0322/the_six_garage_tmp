"use server";

import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getSession } from "./session";
import {
  UPLOAD_SECTIONS,
  type UploadResult,
  type UploadSection,
} from "./upload-config";
import {
  SITE_IMAGES_BUCKET,
  createSupabaseAdmin,
  isSupabaseConfigured,
} from "@/lib/supabase/admin";

const MAX_BYTES = 5 * 1024 * 1024;

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function isUploadSection(value: string): value is UploadSection {
  return (UPLOAD_SECTIONS as readonly string[]).includes(value);
}

function safeExtFromFile(file: File): string | null {
  const fromMime = MIME_TO_EXT[file.type];
  if (fromMime) return fromMime;

  const name = file.name.toLowerCase();
  const match = name.match(/\.(jpe?g|png|webp|gif)$/);
  return match ? match[1].replace("jpeg", "jpg") : null;
}

async function ensurePublicBucket() {
  const supabase = createSupabaseAdmin();
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    throw new Error(listError.message);
  }

  const exists = buckets?.some((b) => b.name === SITE_IMAGES_BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(SITE_IMAGES_BUCKET, {
      public: true,
      fileSizeLimit: MAX_BYTES,
      allowedMimeTypes: Object.keys(MIME_TO_EXT),
    });
    if (error) throw new Error(error.message);
  }

  return supabase;
}

async function uploadToSupabase(
  section: UploadSection,
  filename: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  const supabase = await ensurePublicBucket();
  const objectPath = `${section}/${filename}`;

  const { error } = await supabase.storage
    .from(SITE_IMAGES_BUCKET)
    .upload(objectPath, buffer, {
      contentType,
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage
    .from(SITE_IMAGES_BUCKET)
    .getPublicUrl(objectPath);

  return data.publicUrl;
}

async function uploadToLocal(
  section: UploadSection,
  filename: string,
  buffer: Buffer,
): Promise<string> {
  const dir = path.join(process.cwd(), "public", "uploads", section);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return `/uploads/${section}/${filename}`;
}

/**
 * 관리자 이미지 업로드.
 * - Supabase env가 있으면 Storage 버킷 `site-images` / {section}/ 에 저장
 * - 없으면 로컬 public/uploads/{section}/ 폴백 (개발용)
 */
export async function uploadImage(formData: FormData): Promise<UploadResult> {
  const session = await getSession();
  if (!session) {
    return { ok: false, error: "로그인이 필요합니다." };
  }

  const sectionRaw = String(formData.get("section") ?? "").trim();
  if (!isUploadSection(sectionRaw)) {
    return { ok: false, error: "잘못된 섹션입니다." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "이미지 파일을 선택해 주세요." };
  }

  if (file.size > MAX_BYTES) {
    return { ok: false, error: "파일은 5MB 이하여야 합니다." };
  }

  const ext = safeExtFromFile(file);
  if (!ext) {
    return { ok: false, error: "jpg, png, webp, gif만 업로드할 수 있습니다." };
  }

  const filename = `${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const contentType = file.type || `image/${ext === "jpg" ? "jpeg" : ext}`;

  try {
    if (isSupabaseConfigured()) {
      const url = await uploadToSupabase(
        sectionRaw,
        filename,
        buffer,
        contentType,
      );
      return { ok: true, url, storage: "supabase" };
    }

    const url = await uploadToLocal(sectionRaw, filename, buffer);
    return { ok: true, url, storage: "local" };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "파일 저장에 실패했습니다.";
    return { ok: false, error: message };
  }
}
