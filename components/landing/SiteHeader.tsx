"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "#top", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#services", label: "SERVICES" },
  { href: "#gallery", label: "GALLERY" },
  { href: "#location", label: "LOCATION" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // ESC 키로 닫기 + 메뉴 열린 동안 본문 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // 메뉴 내 해시 링크 클릭 처리:
  // 1) 패널을 먼저 닫고 본문 스크롤 잠금을 동기적으로 해제한 뒤
  // 2) 다음 프레임에서 해시 이동을 수행해야
  //    scroll-padding-top(=헤더 높이) 보정이 정확히 적용된다.
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    // useEffect cleanup보다 먼저 본문 스크롤을 풀어 즉시 스크롤 가능 상태로 만든다.
    document.body.style.overflow = "";

    const id = href.slice(1);
    const target =
      id === "top" ? document.documentElement : document.getElementById(id);

    // 패널 닫힘 트랜지션 시작 직후 다음 프레임에서 스크롤
    requestAnimationFrame(() => {
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // URL 해시도 반영(브라우저 히스토리)
      if (href !== window.location.hash) {
        history.replaceState(null, "", href);
      }
    });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white sm:text-xl"
          >
            The 6<span className="text-brand"> Garage</span>
          </Link>

          {/* 햄버거 버튼 (PC, 모바일 공통) */}
          <button
            type="button"
            aria-label="메뉴 열기"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* 백드롭 */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* 슬라이딩 패널 (우측에서 열림) */}
      <aside
        id="site-menu"
        aria-label="사이트 내비게이션"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-[20rem] transform flex-col border-l border-white/10 bg-zinc-950 shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
          <span className="text-base font-semibold tracking-tight text-zinc-300">
            MENU
          </span>
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-6 sm:px-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              tabIndex={open ? 0 : -1}
              className="rounded-md px-4 py-3 text-base font-medium text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:outline-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
