import { useEffect } from "react";

interface LenisLike {
  raf: (t: number) => void;
  destroy: () => void;
  scrollTo: (
    target: HTMLElement | number,
    opts?: Record<string, unknown>,
  ) => void;
}

/** The live Lenis instance, for programmatic smooth scrolling from nav links. */
export const lenisStore: { current: LenisLike | null } = { current: null };

/** Smoothly scroll to a section by id (nav links, chapter CTAs). */
export function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisStore.current) {
    lenisStore.current.scrollTo(el, { offset: -84, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  history.replaceState(null, "", `#${id}`);
}

/** Inertial smooth scroll: makes scroll-driven motion glide between wheel ticks. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: LenisLike | undefined;
    let raf = 0;
    let cancelled = false;
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.14, smoothWheel: true });
      lenisStore.current = lenis ?? null;
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenisStore.current = null;
    };
  }, []);
}

/** Slide [data-reveal] blocks in as they enter the viewport (transform only). */
export function useReveals() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (els.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const el of els) el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, []);
}
