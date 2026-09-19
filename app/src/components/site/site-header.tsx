import { Link } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent } from "react";

import { smoothScrollTo } from "@/components/site/hooks";
import { LangMenu } from "@/components/site/nav-lang";
import { dictionaries, type Locale } from "@/i18n";

const SECTIONS = ["about", "products", "delivery", "exchange", "legal", "contacts"] as const;
const MENU: Record<Locale, string> = { ru: "Меню", en: "Menu", tr: "Menü", fa: "منو" };

const SOCIAL = [
  { icon: "whatsapp", href: "https://wa.me/998939090341", label: { ru: "WhatsApp", en: "WhatsApp", tr: "WhatsApp", fa: "واتس‌اپ" } },
  { icon: "whatsapp", href: "https://whatsapp.com/channel/0029VbCnEhlDuMRk9CQcyE10", label: { ru: "WhatsApp канал", en: "WhatsApp channel", tr: "WhatsApp kanalı", fa: "کانال واتس‌اپ" } },
  { icon: "telegram", href: "https://t.me/bashemir", label: { ru: "Telegram канал", en: "Telegram channel", tr: "Telegram kanalı", fa: "کانال تلگرام" } },
  { icon: "instagram", href: "https://www.instagram.com/bashemir5", label: { ru: "Instagram", en: "Instagram", tr: "Instagram", fa: "اینستاگرام" } },
  { icon: "tiktok", href: "https://www.tiktok.com/@bashemir5", label: { ru: "TikTok", en: "TikTok", tr: "TikTok", fa: "تیک‌تاک" } },
  { icon: "linkedin", href: "https://www.linkedin.com/company/individual-enterprise-bash-emir/", label: { ru: "LinkedIn", en: "LinkedIn", tr: "LinkedIn", fa: "لینکدین" } },
] as const;

/** Social channel icons (footer with labels, mobile drawer icons only). */
export function SocialLinks({ lang, labels = false }: { lang: Locale; labels?: boolean }) {
  return (
    <div className={`be-social${labels ? " be-social--labels" : ""}`}>
      {SOCIAL.map((s) => (
        <a
          aria-label={s.label[lang]}
          href={s.href}
          key={s.href}
          rel="noopener noreferrer"
          target="_blank"
          title={s.label[lang]}
        >
          <img alt="" src={`/assets/social/${s.icon}.svg`} />
          {labels ? <span>{s.label[lang]}</span> : null}
        </a>
      ))}
    </div>
  );
}

/** Floating pill header: logo, section links, language menu, mobile drawer. */
export function SiteHeader({
  lang,
  page = "home",
  slug,
}: {
  lang: Locale;
  page?: "home" | "product" | "factories" | "factory";
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
        <div className="be-drawer__social">
          <SocialLinks lang={lang} />
        </div>
      </div>
    </header>
  );
}
