import { MyPageClient } from "@/components/admin/MyPageClient";
import { verifySession } from "@/lib/admin/dal";
import { getAdminPhoneMasked, getAuthSource } from "@/lib/admin/users";

export const metadata = { title: "마이페이지 | 관리자" };

export default async function Page() {
  const session = await verifySession();
  const authSource = getAuthSource();
  const maskedPhone =
    authSource === "supabase"
      ? await getAdminPhoneMasked(session.username)
      : null;

  return (
    <MyPageClient
      username={session.username}
      authSource={authSource}
      maskedPhone={maskedPhone}
    />
  );
}
