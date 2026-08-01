import Link from "next/link";
import { getAuthSource } from "@/lib/admin/users";
import { adminPages } from "@/lib/admin/nav";
import { getCmsStatusAction } from "@/lib/cms/actions";

export default async function AdminHomePage() {
  const pages = adminPages.filter((p) => p.href !== "/six_garage_mgt");
  const { source } = await getCmsStatusAction();
  const authSource = getAuthSource();

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-xl font-semibold text-white">수정할 화면 선택</h2>
      <p className="mt-1 text-sm text-zinc-400">
        컴포넌트마다 페이지가 하나씩 있습니다. 왼쪽 메뉴에서도 이동할 수 있습니다.
      </p>
      <div className="mt-3 space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-400">
        <p>
          로그인:{" "}
          <span className="font-medium text-zinc-200">
            {authSource === "supabase"
              ? "Supabase (admin_users)"
              : "환경 변수 (ADMIN_*)"}
          </span>
        </p>
        <p>
          콘텐츠:{" "}
          <span className="font-medium text-zinc-200">
            {source === "supabase"
              ? "Supabase (site_sections)"
              : "로컬 data/site-content.json"}
          </span>
        </p>
        {(authSource === "env" || source === "local") && (
          <p className="text-zinc-500">
            Supabase 키 + SQL 마이그레이션(001, 002) 실행 후 DB 기준으로 전환됩니다.
            최초 로그인 시 ADMIN_* 값으로 admin_users가 비어 있으면 1회 시드됩니다.
          </p>
        )}
      </div>

      <ul className="mt-6 divide-y divide-zinc-800 overflow-hidden rounded-xl border border-zinc-800">
        {pages.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="flex items-center justify-between gap-3 bg-zinc-900/40 px-4 py-4 transition-colors hover:bg-zinc-900"
            >
              <span>
                <span className="block font-medium text-white">{p.label}</span>
                {p.hint && (
                  <span className="mt-0.5 block text-xs text-zinc-500">{p.hint}</span>
                )}
              </span>
              <span className="text-zinc-500">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
