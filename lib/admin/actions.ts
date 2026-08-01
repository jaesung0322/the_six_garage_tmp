"use server";

import { redirect } from "next/navigation";
import { ADMIN_BASE_PATH, ADMIN_LOGIN_PATH } from "./config";
import { normalizePhone } from "./phone";
import { createSession, deleteSession, getSession } from "./session";
import {
  changeAdminPassword,
  resetPasswordWithPhoneParts,
  updateAdminPhone,
  verifyAdminLogin,
} from "./users";

export type LoginState = { error: string } | undefined;

export type AccountFormState =
  | { ok: true; message: string }
  | { ok: false; error: string }
  | undefined;

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "아이디와 비밀번호를 입력해 주세요." };
  }

  const result = await verifyAdminLogin(username, password);
  if (!result.ok) {
    return { error: result.error };
  }

  await createSession(result.username);
  redirect(ADMIN_BASE_PATH);
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect(ADMIN_LOGIN_PATH);
}

export async function updatePasswordAction(
  _prev: AccountFormState,
  formData: FormData,
): Promise<AccountFormState> {
  const session = await getSession();
  if (!session) {
    return { ok: false, error: "로그인이 필요합니다." };
  }

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { ok: false, error: "모든 비밀번호 칸을 입력해 주세요." };
  }
  if (newPassword !== confirmPassword) {
    return { ok: false, error: "새 비밀번호 확인이 일치하지 않습니다." };
  }

  const result = await changeAdminPassword(
    session.username,
    currentPassword,
    newPassword,
  );
  if (!result.ok) return result;

  return { ok: true, message: "비밀번호를 변경했습니다." };
}

export async function updatePhoneAction(
  _prev: AccountFormState,
  formData: FormData,
): Promise<AccountFormState> {
  const session = await getSession();
  if (!session) {
    return { ok: false, error: "로그인이 필요합니다." };
  }

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const phoneFront = String(formData.get("phoneFront") ?? "");
  const phoneMiddle = String(formData.get("phoneMiddle") ?? "");
  const phoneBack = String(formData.get("phoneBack") ?? "");

  // 공백만 있는 칸은 미입력으로 처리
  const hasParts =
    normalizePhone(phoneFront).length > 0 ||
    normalizePhone(phoneMiddle).length > 0 ||
    normalizePhone(phoneBack).length > 0;

  if (!currentPassword || !hasParts) {
    return {
      ok: false,
      error: "휴대폰 앞·중간·뒷자리와 현재 비밀번호를 입력해 주세요.",
    };
  }

  // 앞자리만 전체 번호 붙여넣기한 경우는 허용 (joinPhoneParts에서 처리)
  const frontLen = normalizePhone(phoneFront).length;
  const middleLen = normalizePhone(phoneMiddle).length;
  const backLen = normalizePhone(phoneBack).length;
  const pastedFull = frontLen >= 10 && middleLen === 0 && backLen === 0;

  if (!pastedFull && (middleLen === 0 || backLen === 0 || frontLen === 0)) {
    return {
      ok: false,
      error: "휴대폰을 앞(010) · 중간 · 뒤로 모두 입력해 주세요.",
    };
  }

  const result = await updateAdminPhone(
    session.username,
    currentPassword,
    phoneFront,
    phoneMiddle,
    phoneBack,
  );
  if (!result.ok) return result;

  return { ok: true, message: "복구용 휴대폰 번호를 저장했습니다." };
}

/** 로그인 전 비밀번호 찾기 (아이디 + 휴대폰 앞·중간·뒤) */
export async function forgotPasswordAction(
  _prev: AccountFormState,
  formData: FormData,
): Promise<AccountFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const phoneFront = String(formData.get("phoneFront") ?? "");
  const phoneMiddle = String(formData.get("phoneMiddle") ?? "");
  const phoneBack = String(formData.get("phoneBack") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (
    !username ||
    !phoneFront ||
    !phoneMiddle ||
    !phoneBack ||
    !newPassword ||
    !confirmPassword
  ) {
    return { ok: false, error: "모든 항목을 입력해 주세요." };
  }
  if (newPassword !== confirmPassword) {
    return { ok: false, error: "새 비밀번호 확인이 일치하지 않습니다." };
  }

  const result = await resetPasswordWithPhoneParts(
    username,
    phoneFront,
    phoneMiddle,
    phoneBack,
    newPassword,
  );
  if (!result.ok) return result;

  return {
    ok: true,
    message: "비밀번호를 변경했습니다. 새 비밀번호로 로그인해 주세요.",
  };
}
