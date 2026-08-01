"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

export function MockBanner({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-200/90">
      {children}
    </div>
  );
}

export function Panel({
  title,
  description,
  children,
  actions,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">
      {(title || actions) && (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-800 px-5 py-4">
          <div className="min-w-0">
            {title && <h2 className="text-base font-semibold text-white">{title}</h2>}
            {description && (
              <p className="mt-1 text-sm text-zinc-400">{description}</p>
            )}
          </div>
          {actions}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      {children}
      {hint && <span className="text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-brand focus:ring-2 focus:ring-brand/40";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${inputClass} min-h-[96px] resize-y ${props.className ?? ""}`}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3"
    >
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-brand" : "bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      <span className="text-sm text-zinc-300">{label}</span>
    </button>
  );
}

export function VisibilityPill({ visible }: { visible: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
        visible
          ? "bg-brand/15 text-brand"
          : "bg-zinc-700/40 text-zinc-400"
      }`}
    >
      {visible ? "노출" : "숨김"}
    </span>
  );
}

export function SaveBar({
  onSave,
  onReset,
  message,
  pending,
}: {
  onSave: () => void;
  onReset?: () => void;
  message?: string | null;
  pending?: boolean;
}) {
  return (
    <div className="sticky bottom-4 z-10 mt-6 flex flex-col gap-2 rounded-xl border border-zinc-700 bg-zinc-900/95 p-3 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <p className="px-1 text-xs text-zinc-400 sm:text-sm">
        {message ?? "저장하면 랜딩에 바로 반영됩니다."}
      </p>
      <div className="flex gap-2">
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            disabled={pending}
            className="rounded-lg border border-zinc-700 px-3.5 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50"
          >
            초기화
          </button>
        )}
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </div>
  );
}
