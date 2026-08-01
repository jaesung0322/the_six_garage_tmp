"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput } from "@/components/admin/FormControls";
import {
  updatePasswordAction,
  updatePhoneAction,
  type AccountFormState,
} from "@/lib/admin/actions";

function FormMessage({ state }: { state: AccountFormState }) {
  if (!state) return null;
  if (state.ok) {
    return (
      <p
        role="status"
        className="rounded-lg border border-brand/30 bg-brand/10 px-3.5 py-2.5 text-sm text-lime-100"
      >
        {state.message}
      </p>
    );
  }
  return (
    <p
      role="alert"
      className="rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300"
    >
      {state.error}
    </p>
  );
}

const partClass =
  "rounded-lg border border-zinc-700 bg-zinc-950 px-2 py-2.5 text-center text-sm text-white outline-none focus:border-brand focus:ring-2 focus:ring-brand/40 disabled:opacity-50";

function PhoneForm({
  disabled,
  maskedPhone,
}: {
  disabled: boolean;
  maskedPhone: string | null;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    updatePhoneAction,
    undefined as AccountFormState,
  );

  useEffect(() => {
    if (state?.ok) router.refresh();
  }, [state, router]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <p className="text-xs text-zinc-500">
        비밀번호 찾기용 번호입니다. 사이트에 공개된 매장 번호보다는{" "}
        <span className="text-zinc-300">개인 번호</span>를 권장합니다.
      </p>
      {maskedPhone && (
        <p className="text-sm text-zinc-400">
          등록됨:{" "}
          <span className="font-medium text-zinc-200">{maskedPhone}</span>
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-zinc-300">휴대폰 번호</span>
        <p className="text-xs text-zinc-500">예: 010 - 1234 - 5678</p>
        <div className="flex items-center gap-2">
          <input
            name="phoneFront"
            type="text"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={11}
            placeholder="010"
            disabled={disabled || pending}
            className={`${partClass} w-[4.5rem]`}
          />
          <span className="text-zinc-500">-</span>
          <input
            name="phoneMiddle"
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="1234"
            disabled={disabled || pending}
            className={`${partClass} w-[5.5rem]`}
          />
          <span className="text-zinc-500">-</span>
          <input
            name="phoneBack"
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="5678"
            disabled={disabled || pending}
            className={`${partClass} w-[5.5rem]`}
          />
        </div>
      </div>
      <Field label="현재 비밀번호 (확인용)">
        <TextInput
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          disabled={disabled || pending}
        />
      </Field>
      <FormMessage state={state} />
      <button
        type="submit"
        disabled={disabled || pending}
        className="self-start rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "저장 중…" : maskedPhone ? "번호 변경" : "번호 등록"}
      </button>
    </form>
  );
}

function PasswordForm({ disabled }: { disabled: boolean }) {
  const [state, action, pending] = useActionState(
    updatePasswordAction,
    undefined as AccountFormState,
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      <Field label="현재 비밀번호">
        <TextInput
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          disabled={disabled || pending}
        />
      </Field>
      <Field label="새 비밀번호" hint="8자 이상">
        <TextInput
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          disabled={disabled || pending}
        />
      </Field>
      <Field label="새 비밀번호 확인">
        <TextInput
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          disabled={disabled || pending}
        />
      </Field>
      <FormMessage state={state} />
      <button
        type="submit"
        disabled={disabled || pending}
        className="self-start rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "변경 중…" : "비밀번호 변경"}
      </button>
    </form>
  );
}

export function MyPageClient({
  username,
  authSource,
  maskedPhone,
}: {
  username: string;
  authSource: "supabase" | "env";
  maskedPhone: string | null;
}) {
  const dbReady = authSource === "supabase";

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <header>
        <h2 className="text-xl font-semibold text-white">마이페이지</h2>
        <p className="mt-1 text-sm text-zinc-400">
          복구용 휴대폰과 비밀번호를 관리합니다. 아이디는 변경할 수 없습니다.
        </p>
      </header>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
        <h3 className="mb-3 text-sm font-semibold text-zinc-200">계정 상태</h3>
        <dl className="grid gap-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-zinc-500">아이디</dt>
            <dd className="font-medium text-white">{username}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-zinc-500">복구 휴대폰</dt>
            <dd className="font-medium text-zinc-200">
              {maskedPhone ?? "미등록"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
        <h3 className="mb-4 text-sm font-semibold text-zinc-200">
          복구용 휴대폰
        </h3>
        <PhoneForm disabled={!dbReady} maskedPhone={maskedPhone} />
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
        <h3 className="mb-4 text-sm font-semibold text-zinc-200">
          비밀번호 변경
        </h3>
        <PasswordForm disabled={!dbReady} />
      </section>
    </div>
  );
}
