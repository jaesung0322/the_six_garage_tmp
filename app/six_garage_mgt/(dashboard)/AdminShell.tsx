"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { adminPages } from "@/lib/admin/nav";
import { logout } from "@/lib/admin/actions";

function isActive(href: string, pathname: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href;
}

export function AdminShell({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = adminPages.find((p) => isActive(p.href, pathname, p.exact));
  const pageTitle = current?.label ?? "관리자";

  const nav = (
    <nav className="flex flex-col gap-0.5">
      {adminPages.map((item) => {
        const active = isActive(item.href, pathname, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active ? "page" : undefined}
            className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-brand/15 font-semibold text-white"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-zinc-800 bg-zinc-900 lg:flex">
        <div className="flex h-14 items-center border-b border-zinc-800 px-4">
          <Link href="/six_garage_mgt" className="text-sm font-bold text-white">
            The 6<span className="text-brand"> Garage</span>
            <span className="ml-1.5 text-xs font-normal text-zinc-500">관리</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-2">{nav}</div>
        <div className="border-t border-zinc-800 p-2">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-xs text-zinc-500 hover:bg-white/5 hover:text-white"
          >
            ← 사이트 보기
          </Link>
        </div>
      </aside>

      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-56 transform flex-col border-r border-zinc-800 bg-zinc-900 transition-transform lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-zinc-800 px-4">
          <span className="text-sm font-bold text-white">메뉴</span>
          <button
            type="button"
            aria-label="닫기"
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-1 text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">{nav}</div>
      </aside>

      <div className="lg:pl-56">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-950/90 px-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="메뉴"
              onClick={() => setOpen(true)}
              className="rounded-md px-2 py-1 text-white hover:bg-white/10 lg:hidden"
            >
              ☰
            </button>
            <h1 className="text-base font-semibold text-white">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/six_garage_mgt/mypage"
              className="hidden text-xs text-zinc-500 transition-colors hover:text-white sm:inline"
            >
              {username}
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-zinc-700 px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-white/5"
              >
                로그아웃
              </button>
            </form>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
