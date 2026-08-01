"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  forgotPasswordAction,
  type AccountFormState,
} from "@/lib/admin/actions";
import { ADMIN_LOGIN_PATH } from "@/lib/admin/config";

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-brand focus:ring-2 focus:ring-brand/40";

const partClass =
  "rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-2.5 text-center text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-brand focus:ring-2 focus:ring-brand/40";

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(
    forgotPasswordAction,
    undefined as AccountFormState,
  );

  if (state?.ok) {
    return (
      <div className="flex flex-col gap-4">
        <p
          role="status"
          className="rounded-lg border border-brand/30 bg-brand/10 px-3.5 py-2.5 text-sm text-lime-100"
        >
          {state.message}
        </p>
        <Link
          href={ADMIN_LOGIN_PATH}
          className="inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground"
        >
          로그인으로 이동
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-sm font-medium text-zinc-300">
          아이디
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-zinc-300">
          등록한 휴대폰 번호
        </span>
        <div className="flex items-center gap-2">
          <input
            name="phoneFront"
            type="text"
            inputMode="numeric"
            required
            maxLength={3}
            placeholder="010"
            aria-label="앞자리"
            className={`${partClass} w-[4.5rem]`}
          />
          <span className="text-zinc-500">-</span>
          <input
            name="phoneMiddle"
            type="text"
            inputMode="numeric"
            required
            maxLength={4}
            placeholder="1234"
            aria-label="중간자리"
            className={`${partClass} w-[5.5rem]`}
          />
          <span className="text-zinc-500">-</span>
          <input
            name="phoneBack"
            type="text"
            inputMode="numeric"
            required
            maxLength={4}
            placeholder="5678"
            aria-label="뒷자리"
            className={`${partClass} w-[5.5rem]`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="newPassword"
          className="text-sm font-medium text-zinc-300"
        >
          새 비밀번호
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-zinc-300"
        >
          새 비밀번호 확인
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={inputClass}
        />
      </div>

      {state && !state.ok && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "변경 중…" : "비밀번호 재설정"}
      </button>
    </form>
  );
}
