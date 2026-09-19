import { Link } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent } from "react";

import { smoothScrollTo } from "@/components/site/hooks";
import { LangMenu } from "@/components/site/nav-lang";
import { dictionaries, type Locale } from "@/i18n";

const SECTIONS = ["about", "products", "delivery", "exchange", "legal", "contacts"] as const;
const MENU: Record<Locale, string> = { ru: "Меню", en: "Menu", tr: "Menü", fa: "منو" };

/** Floating pill header: logo, section links, language menu, mobile drawer. */
export function SiteHeader({
  lang,
  page = "home",
  slug,
}: {
  lang: Locale;
  page?: "home" | "product" | "factories";
  slug?: string;
}) {
  const d = dictionaries[lang];
  const [open, setOpen] = useState(false);
  const home = page === "home";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Home: smooth-scroll in place. Other pages: full navigation to /#section.
  const href = (id: string) => (home ? `#${id}` : `/?lang=${lang}#${id}`);
  const go = (id: string) => (e: MouseEvent) => {
    if (!home) return;
    e.preventDefault();
    setOpen(false);
    smoothScrollTo(id);
  };
  const logo = <img alt="Bash Emir" className="be-nav__logo" src="/assets/brand/logo-dark.png" />;

  return (
    <header className="be-nav">
      <div className="be-nav__inner">
        {home ? (
          <a className="be-nav__brand" href="#top" onClick={go("top")}>
            {logo}
          </a>
        ) : (
          <Link className="be-nav__brand" search={{ lang }} to="/">
            {logo}
          </Link>
        )}
        <nav className="be-nav__links" aria-label={MENU[lang]}>
          {SECTIONS.map((id) => (
            <a className="be-nav__link" href={href(id)} key={id} onClick={go(id)}>
              {d.nav[id]}
            </a>
          ))}
        </nav>
        <LangMenu lang={lang} page={page} slug={slug} />
        <button
          aria-expanded={open}
          aria-label={MENU[lang]}
          className="be-burger"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="be-drawer" hidden={!open}>
        <nav className="be-drawer__list" aria-label={MENU[lang]}>
          {SECTIONS.map((id, i) => (
            <a
              className="be-drawer__link"
              href={href(id)}
              key={id}
              onClick={go(id)}
              style={{ animationDelay: `${i * 45}ms` }}
            >
              {d.nav[id]}
            </a>
          ))}
          <a
            className="be-drawer__link be-drawer__link--sub"
            href={`/factories?lang=${lang}`}
            style={{ animationDelay: `${SECTIONS.length * 45}ms` }}
          >
            {d.about.factoriesLink}
          </a>
        </nav>
      </div>
    </header>
  );
}
