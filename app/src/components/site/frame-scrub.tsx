/**
 * FrameScrub: canvas-based scroll scrubbing of a pre-extracted JPEG frame
 * sequence. Replaces video-seek scrubbing, which stuttered on modest
 * hardware: drawing a decoded image is O(1) per scroll position, forward and
 * backward alike, so the scrub cannot lag behind the wheel.
 *
 * Layout: a full-viewport sticky stage (canvas + first-frame poster) with the
 * chapter copy scrolling over it in normal document flow, so all copy is
 * server-rendered and visible without JavaScript.
 */
import { useEffect, useRef } from "react";

import { smoothScrollTo } from "@/components/site/hooks";
import { dictionaries, type Chapter, type Locale } from "@/i18n";

export const FRAME_COUNT = 180;

function framePath(index: number, mobile: boolean): string {
  return `/assets/world/${mobile ? "m" : "d"}/f-${String(index + 1).padStart(4, "0")}.jpg`;
}

interface ChapterSlot {
  chapter: Chapter;
  weight: number;
  align: "start" | "end";
  withCta: boolean;
}

function slotsFor(lang: Locale): ChapterSlot[] {
  const c = dictionaries[lang].chapters;
  return [
    { chapter: c.sea, weight: 2.6, align: "start", withCta: true },
    { chapter: c.group, weight: 2, align: "end", withCta: false },
    { chapter: c.products, weight: 2, align: "start", withCta: false },
    { chapter: c.delivery, weight: 2.4, align: "end", withCta: false },
  ];
}

/** Corner-bracket viewfinder CTA: brackets close around the label on hover. */
function ViewfinderCta({ label }: { label: string }) {
  return (
    <a
      className="vf-cta"
      href="#contacts"
      onClick={(e) => {
        e.preventDefault();
        smoothScrollTo("contacts");
      }}
    >
      <span aria-hidden="true" className="vf-cta__corner vf-cta__corner--tl" />
      <span aria-hidden="true" className="vf-cta__corner vf-cta__corner--tr" />
      <span aria-hidden="true" className="vf-cta__corner vf-cta__corner--bl" />
      <span aria-hidden="true" className="vf-cta__corner vf-cta__corner--br" />
      <span className="vf-cta__label">{label}</span>
    </a>
  );
}

export function FrameScrub({ lang, ctaLabel }: { lang: Locale; ctaLabel: string }) {
  const slots = slotsFor(lang);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Static story: poster + server-rendered chapters, no frame fetches.
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const images: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
    let disposed = false;
    let raf = 0;
    let lastDrawn = -1;
    let firstDraw = true;

    const ensure = (i: number): HTMLImageElement => {
      let img = images[i];
      if (!img) {
        img = new Image();
        img.decoding = "async";
        img.src = framePath(i, mobile);
        images[i] = img;
      }
      return img;
    };

    // Progressive preload: sequential order with limited concurrency, so the
    // whole strip is cached within seconds without starving the first frames.
    let nextToLoad = 0;
    let inFlight = 0;
    const pump = () => {
      if (disposed) return;
      while (inFlight < 6 && nextToLoad < FRAME_COUNT) {
        const img = ensure(nextToLoad);
        nextToLoad += 1;
        if (img.complete) continue;
        inFlight += 1;
        const done = () => {
          inFlight -= 1;
          pump();
        };
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    };
    pump();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      lastDrawn = -1;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      if (firstDraw) {
        firstDraw = false;
        posterRef.current?.style.setProperty("visibility", "hidden");
      }
    };

    const nearestReady = (target: number): number => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        const lo = target - d;
        const hi = target + d;
        if (lo >= 0 && images[lo]?.complete && images[lo]!.naturalWidth) return lo;
        if (hi < FRAME_COUNT && images[hi]?.complete && images[hi]!.naturalWidth)
          return hi;
      }
      return -1;
    };

    const loop = () => {
      if (disposed) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = rect.height - vh;
      const progress = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      const target = Math.round(progress * (FRAME_COUNT - 1));
      // Warm decode just around the playhead.
      ensure(target);
      ensure(Math.min(FRAME_COUNT - 1, target + 3));
      const idx = images[target]?.complete && images[target]!.naturalWidth
        ? target
        : nearestReady(target);
      if (idx >= 0 && idx !== lastDrawn) {
        drawCover(images[idx]!);
        lastDrawn = idx;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const totalWeight = slots.reduce((sum, s) => sum + s.weight, 0);

  return (
    <div className="fs" ref={wrapRef}>
      <div className="fs__stage">
        <img
          alt=""
          className="fs__poster"
          fetchPriority="high"
          ref={posterRef}
          src={framePath(0, false)}
        />
        <canvas aria-hidden="true" className="fs__canvas" ref={canvasRef} />
        <div aria-hidden="true" className="fs__vignette" />
      </div>
      <div className="fs__chapters" style={{ minHeight: `${totalWeight * 100}svh` }}>
        {slots.map((s, i) => (
          <article
            className="fs__chapter"
            data-align={s.align}
            key={s.chapter.label}
            style={{ minHeight: `${s.weight * 100}svh` }}
          >
            <div className="fs__copy">
              {s.chapter.kicker ? (
                <p className="fs__kicker">{s.chapter.kicker}</p>
              ) : null}
              {i === 0 ? (
                <h1 className="fs__title">{s.chapter.title}</h1>
              ) : (
                <h2 className="fs__title">{s.chapter.title}</h2>
              )}
              <p className="fs__body">{s.chapter.body}</p>
              {s.chapter.tags && s.chapter.tags.length > 0 ? (
                <ul className="fs__tags">
                  {s.chapter.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : null}
              {s.withCta ? <ViewfinderCta label={ctaLabel} /> : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
