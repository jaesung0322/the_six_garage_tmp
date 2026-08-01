import "server-only";

import { timingSafeEqual } from "node:crypto";
import {
  createSupabaseAdmin,
  isSupabaseConfigured,
} from "@/lib/supabase/admin";
import { getAdminCredentials } from "./credentials";
import { hashPassword, verifyPassword } from "./password";
import {
  isValidKrMobile,
  joinPhoneParts,
  maskPhone,
  normalizePhone,
  phoneValidationHint,
} from "./phone";

export type AuthSource = "supabase" | "env";

export function getAuthSource(): AuthSource {
  return isSupabaseConfigured() ? "supabase" : "env";
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

type AdminRow = {
  id: string;
  username: string;
  password_hash: string;
  phone: string | null;
};

async function findByUsername(username: string): Promise<AdminRow | null> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, username, password_hash, phone")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    throw new Error(`admin_users 조회 실패: ${error.message}`);
  }
  return data;
}

export async function seedAdminUserIfEmpty(): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const supabase = createSupabaseAdmin();
  const { count, error } = await supabase
    .from("admin_users")
    .select("*", { count: "exact", head: true });

  if (error) {
    throw new Error(`admin_users 시드 확인 실패: ${error.message}`);
  }
  if ((count ?? 0) > 0) return false;

  const { username, password } = getAdminCredentials();
  if (!username || !password) {
    throw new Error(
      "admin_users가 비어 있습니다. ADMIN_USERNAME / ADMIN_PASSWORD로 시드하려면 env를 설정하세요.",
    );
  }

  const { error: insertError } = await supabase.from("admin_users").insert({
    username,
    password_hash: hashPassword(password),
  });

  if (insertError) {
    throw new Error(`admin_users 시드 실패: ${insertError.message}`);
  }
  return true;
}

export type VerifyAdminResult =
  | { ok: true; username: string; source: AuthSource }
  | { ok: false; error: string };

export async function verifyAdminLogin(
  username: string,
  password: string,
): Promise<VerifyAdminResult> {
  if (!isSupabaseConfigured()) {
    const creds = getAdminCredentials();
    const userOk = safeEqual(username, creds.username);
    const passOk = safeEqual(password, creds.password);
    if (!userOk || !passOk) {
      return { ok: false, error: "아이디 또는 비밀번호가 올바르지 않습니다." };
    }
    return { ok: true, username: creds.username, source: "env" };
  }

  try {
    await seedAdminUserIfEmpty();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "관리자 시드에 실패했습니다.";
    return { ok: false, error: message };
  }

  let row;
  try {
    row = await findByUsername(username);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "로그인 조회에 실패했습니다.";
    return { ok: false, error: message };
  }

  if (!row || !verifyPassword(password, row.password_hash)) {
    return { ok: false, error: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }

  return { ok: true, username: row.username, source: "supabase" };
}

export type AccountUpdateResult =
  | { ok: true }
  | { ok: false; error: string };

const MIN_PASSWORD_LEN = 8;

export async function getAdminPhoneMasked(
  username: string,
): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;
  const row = await findByUsername(username);
  if (!row?.phone) return null;
  return maskPhone(row.phone);
}

/** 마이페이지: 복구용 휴대폰 등록 (현재 비밀번호 확인) */
export async function updateAdminPhone(
  username: string,
  currentPassword: string,
  phoneFront: string,
  phoneMiddle: string,
  phoneBack: string,
): Promise<AccountUpdateResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "Supabase 연결 후에 휴대폰을 등록할 수 있습니다.",
    };
  }

  const phone = joinPhoneParts(phoneFront, phoneMiddle, phoneBack);
  if (!isValidKrMobile(phone)) {
    return {
      ok: false,
      error: phoneValidationHint(phone),
    };
  }

  let row;
  try {
    row = await findByUsername(username);
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "계정 조회에 실패했습니다.",
    };
  }

  if (!row || !verifyPassword(currentPassword, row.password_hash)) {
    return { ok: false, error: "현재 비밀번호가 올바르지 않습니다." };
  }

  const supabase = createSupabaseAdmin();
  const { data: taken } = await supabase
    .from("admin_users")
    .select("id")
    .eq("phone", phone)
    .neq("id", row.id)
    .maybeSingle();

  if (taken) {
    return { ok: false, error: "다른 계정에 이미 등록된 번호입니다." };
  }

  const { error } = await supabase
    .from("admin_users")
    .update({
      phone,
      updated_at: new Date().toISOString(),
    })
    .eq("id", row.id);

  if (error) {
    return { ok: false, error: `휴대폰 저장 실패: ${error.message}` };
  }

  return { ok: true };
}

export async function changeAdminPassword(
  username: string,
  currentPassword: string,
  newPassword: string,
): Promise<AccountUpdateResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error:
        "로컬 env 로그인 모드입니다. Supabase를 연결한 뒤 비밀번호를 변경할 수 있습니다.",
    };
  }

  if (newPassword.length < MIN_PASSWORD_LEN) {
    return {
      ok: false,
      error: `새 비밀번호는 ${MIN_PASSWORD_LEN}자 이상이어야 합니다.`,
    };
  }

  if (currentPassword === newPassword) {
    return { ok: false, error: "새 비밀번호가 현재 비밀번호와 같습니다." };
  }

  let row;
  try {
    row = await findByUsername(username);
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "계정 조회에 실패했습니다.",
    };
  }

  if (!row || !verifyPassword(currentPassword, row.password_hash)) {
    return {
      ok: false,
      error: "아이디 또는 현재 비밀번호가 올바르지 않습니다.",
    };
  }

  const supabase = createSupabaseAdmin();
  const { error } = await supabase
    .from("admin_users")
    .update({
      password_hash: hashPassword(newPassword),
      updated_at: new Date().toISOString(),
    })
    .eq("id", row.id);

  if (error) {
    return { ok: false, error: `비밀번호 변경 실패: ${error.message}` };
  }

  return { ok: true };
}

/**
 * 비밀번호 찾기: 아이디 + 휴대폰 앞·중간·뒷자리로 본인 확인 후 재설정.
 */
export async function resetPasswordWithPhoneParts(
  username: string,
  phoneFront: string,
  phoneMiddle: string,
  phoneBack: string,
  newPassword: string,
): Promise<AccountUpdateResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "비밀번호 찾기는 Supabase 연동 후에 사용할 수 있습니다.",
    };
  }

  if (newPassword.length < MIN_PASSWORD_LEN) {
    return {
      ok: false,
      error: `새 비밀번호는 ${MIN_PASSWORD_LEN}자 이상이어야 합니다.`,
    };
  }

  const phone = joinPhoneParts(phoneFront, phoneMiddle, phoneBack);
  if (!isValidKrMobile(phone)) {
    return {
      ok: false,
      error: phoneValidationHint(phone),
    };
  }

  let row;
  try {
    row = await findByUsername(username.trim());
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "계정 조회에 실패했습니다.",
    };
  }

  const stored = row?.phone ? normalizePhone(row.phone) : "";
  const phoneOk = Boolean(stored) && safeEqual(phone, stored);

  if (!row || !phoneOk) {
    return {
      ok: false,
      error: "아이디 또는 휴대폰 번호가 올바르지 않습니다.",
    };
  }

  const supabase = createSupabaseAdmin();
  const { error } = await supabase
    .from("admin_users")
    .update({
      password_hash: hashPassword(newPassword),
      updated_at: new Date().toISOString(),
    })
    .eq("id", row.id);

  if (error) {
    return { ok: false, error: `비밀번호 변경 실패: ${error.message}` };
  }

  return { ok: true };
}
