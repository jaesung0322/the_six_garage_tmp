import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "관리자 로그인 | The 6 Garage",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xl font-bold tracking-tight text-white">
            The 6<span className="text-brand"> Garage</span>
          </p>
          <p className="mt-2 text-sm text-zinc-400">관리자 페이지</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl sm:p-8">
          <h1 className="mb-6 text-lg font-semibold text-white">로그인</h1>
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          권한이 있는 관리자만 접근할 수 있습니다.
        </p>
      </div>
    </main>
  );
}
