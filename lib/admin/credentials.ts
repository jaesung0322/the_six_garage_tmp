import "server-only";

/**
 * 로컬(폴백) 또는 DB 최초 시드용 자격증명.
 * Supabase `admin_users`에 계정이 있으면 로그인은 DB 해시를 사용합니다.
 * 시드 이후에는 비밀번호를 DB에서만 바꾸면 되고, env 비밀번호는 무시됩니다.
 */
export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME?.trim() || "thesix",
    password: process.env.ADMIN_PASSWORD || "thesix1234",
  };
}

export function getSessionSecret() {
  return (
    process.env.SESSION_SECRET?.trim() ||
    "dev-insecure-secret-please-change-in-env-local"
  );
}
