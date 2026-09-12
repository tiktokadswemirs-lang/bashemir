/**
 * Floating-header language dropdown: globe + current code + chevron, opening
 * a menu of language names (mirrors the original bashemir.com header).
 */
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { LOCALES, type Locale } from "@/i18n";

const NAMES: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  tr: "Türkçe",
  fa: "فارسی",
};

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="15"
      stroke="currentColor"
      strokeWidth="1.4"
      viewBox="0 0 16 16"
      width="15"
    >
      <circle cx="8" cy="8" r="6.4" />
      <ellipse cx="8" cy="8" rx="2.9" ry="6.4" />
      <path d="M1.9 6h12.2M1.9 10h12.2" />
    </svg>
  );
}

export function LangMenu({
  lang,
  page = "home",
  slug,
}: {
  lang: Locale;
  page?: "home" | "product" | "factories";
  slug?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="be-langdd" ref={rootRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className="be-langdd__btn"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <GlobeIcon />
        <span className="be-mono">{lang.toUpperCase()}</span>
        <span aria-hidden="true" className="be-langdd__chevron" data-open={open}>
          ▾
        </span>
      </button>
      {open ? (
        <div className="be-langdd__menu" role="menu">
          {LOCALES.map((l) => {
            const shared = {
              "aria-current": l.code === lang ? ("true" as const) : undefined,
              className: "be-langdd__item",
              onClick: () => setOpen(false),
              resetScroll: false,
              search: { lang: l.code },
            };
            if (page === "product" && slug) {
              return (
                <Link
                  key={l.code}
                  {...shared}
                  params={{ slug }}
                  to="/products/$slug"
                >
                  {NAMES[l.code]}
                </Link>
              );
            }
            if (page === "factories") {
              return (
                <Link key={l.code} {...shared} to="/factories">
                  {NAMES[l.code]}
                </Link>
              );
            }
            return (
              <Link key={l.code} {...shared} to="/">
                {NAMES[l.code]}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
