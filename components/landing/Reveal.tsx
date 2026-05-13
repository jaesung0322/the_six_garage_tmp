"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** true면 마운트 직후 재생 (히어로 등 첫 화면) */
  animateOnMount?: boolean;
};

function scheduleReveal(setVisible: (v: boolean) => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => setVisible(true));
  });
}

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  animateOnMount = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [staticMotion, setStaticMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStaticMotion(true);
      setVisible(true);
      return;
    }

    if (animateOnMount) {
      scheduleReveal(setVisible);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            scheduleReveal(setVisible);
            io.disconnect();
            return;
          }
        }
      },
      { root: null, rootMargin: "0px 0px 64px 0px", threshold: 0 },
    );

    io.observe(el);
    for (const entry of io.takeRecords()) {
      if (entry.isIntersecting) {
        scheduleReveal(setVisible);
        io.disconnect();
        return () => io.disconnect();
      }
    }

    return () => io.disconnect();
  }, [animateOnMount]);

  const style: CSSProperties = staticMotion
    ? { opacity: 1 }
    : {
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0, 0, 0)"
          : "translate3d(0, 48px, 0)",
        transition:
          "opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)",
        ...(visible && delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : {}),
      };

  return (
    <div
      ref={ref}
      className={["w-full", className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
