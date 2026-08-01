export const UPLOAD_SECTIONS = [
  "hero",
  "about",
  "services",
  "gallery",
  "directions",
  "seo",
] as const;

export type UploadSection = (typeof UPLOAD_SECTIONS)[number];

export type UploadResult =
  | { ok: true; url: string; storage: "supabase" | "local" }
  | { ok: false; error: string };
