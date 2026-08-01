import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { ADMIN_LOGIN_PATH } from "@/lib/admin/config";

export const metadata: Metadata = {
  title: "비밀번호 찾기 | The 6 Garage",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xl font-bold tracking-tight text-white">
            The 6<span className="text-brand"> Garage</span>
          </p>
          <p className="mt-2 text-sm text-zinc-400">비밀번호 찾기</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl sm:p-8">
          <h1 className="mb-2 text-lg font-semibold text-white">
            비밀번호 재설정
          </h1>
          <p className="mb-6 text-xs leading-relaxed text-zinc-500">
            아이디와 마이페이지에 등록한 휴대폰 앞·중간·뒷자리를 입력하면 새
            비밀번호로 변경할 수 있습니다.
          </p>
          <ForgotPasswordForm />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          <Link
            href={ADMIN_LOGIN_PATH}
            className="text-zinc-400 hover:text-white"
          >
            ← 로그인으로
          </Link>
        </p>
      </div>
    </main>
  );
}
