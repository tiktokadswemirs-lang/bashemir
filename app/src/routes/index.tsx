import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { FrameScrub } from "@/components/site/frame-scrub";
import { useReveals, useSmoothScroll } from "@/components/site/hooks";
import { SiteHeader } from "@/components/site/site-header";
import { dictionaries, resolveLocale } from "@/i18n";
import { productsInCategory } from "@/products";

export const Route = createFileRoute("/")({
  // Locale travels in ?lang= so the server renders the right language and the
  // link stays shareable. The home page inherits title/favicon/og from the
  // root route (app-meta.json).
  validateSearch: (search: Record<string, unknown>): { lang?: "ru" | "en" | "tr" | "fa" } => ({
    lang: resolveLocale(search.lang),
  }),
  component: Index,
});

/** Route-path arrow for contact channel links: the line draws on hover. */
function RouteArrow() {
  return (
    <svg
      aria-hidden="true"
      className="be-channel__path"
      fill="none"
      height="16"
      viewBox="0 0 56 16"
      width="56"
    >
      <path
        className="be-route-line"
        d="M1 12 C 16 12, 22 4, 38 4 L 46 4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        className="be-route-head"
        d="M41 0 L 47 4 L 41 8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const CATEGORY_ICONS = [
  "/assets/icons/icon-1.png",
  "/assets/icons/icon-2.png",
  "/assets/icons/icon-3.png",
  "/assets/icons/icon-4.png",
];

const PARTNER_ICONS = [
  "/assets/icons/icon-5.png",
  "/assets/icons/icon-6.png",
  "/assets/icons/icon-7.png",
  "/assets/icons/icon-8.png",
  "/assets/icons/icon-9.png",
];

const PARTNER_MARKS = [
  "VENUS DDCO",
  "CARPE DIEM ENERGY",
  "MENA CHEMICALS",
  "HETON",
  "GLOBALEX",
];

function CatalogCategory({
  defaultOpen,
  icon,
  index,
  lang,
  name,
  total,
}: {
  defaultOpen: boolean;
  icon: string;
  index: number;
  lang: "ru" | "en" | "tr" | "fa";
  name: string;
  total: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const items = productsInCategory(index);
  return (
    <div className={`be-cat${open ? " is-open" : ""}`}>
      <h3 className="be-cat__heading">
        <button
          aria-expanded={open}
          className="be-cat__summary"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <span className="be-cat__index">
            {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <span className="be-cat__name">{name}</span>
          <span className="be-cat__count">{items.length}</span>
          <img alt="" className="be-cat__icon" src={icon} />
        </button>
      </h3>
      <div className="be-cat__panelwrap">
        <ul className="be-cat__panel">
          {items.map((p, j) => (
            <li key={p.slug}>
              <Link
                className="be-cat__item be-cat__item--link"
                params={{ slug: p.slug }}
                search={{ lang }}
                tabIndex={open ? undefined : -1}
                to="/products/$slug"
              >
                <span className="be-cat__item-index">
                  {String(j + 1).padStart(2, "0")}
                </span>
                <span className="be-cat__item-name">{p.name[lang]}</span>
                <span aria-hidden="true" className="be-cat__item-arrow">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Index() {
  const { lang = "ru" } = Route.useSearch();
  const d = dictionaries[lang];
  useSmoothScroll();
  useReveals();

  return (
    <main className="be-page">
      <SiteHeader lang={lang} />

      <div id="top">
        <FrameScrub ctaLabel={d.ctaDiscuss} lang={lang} />
      </div>

      <section className="be-section" id="about">
        <div className="be-container">
          <div className="be-about__grid" data-reveal="">
            <div className="be-about__text">
              <h2 className="be-h2">{d.about.title}</h2>
              <p className="be-body" style={{ marginTop: "1.8rem" }}>
                {d.about.p1}
              </p>
              <p className="be-body">{d.about.p2}</p>
              <a
                className="be-about__factories"
                href={`/factories?lang=${lang}`}
              >
                {d.about.factoriesLink}
                <span aria-hidden="true" className="be-about__factories-arrow">
                  →
                </span>
              </a>
            </div>
            <figure className="be-about__map">
              <img alt={d.about.mapCaption} src="/assets/brand/route-map.png" />
              <figcaption>{d.about.mapCaption}</figcaption>
            </figure>
          </div>
          <div className="be-metrics" data-reveal="">
            {d.about.metrics.map((m) => (
              <div className="be-metric" key={m.caption}>
                <div className="be-metric__value be-mono">{m.value}</div>
                <div className="be-metric__caption">{m.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="be-section" id="products">
        <div className="be-container" data-reveal="">
          <div className="be-products__head">
            <p className="be-eyebrow">{d.products.eyebrow}</p>
            <h2 className="be-h2">{d.products.title}</h2>
          </div>
          <div>
            {d.products.categories.map((cat, i) => (
              <CatalogCategory
                defaultOpen={i === 0}
                icon={CATEGORY_ICONS[i]}
                index={i}
                key={cat.name}
                lang={lang}
                name={cat.name}
                total={d.products.categories.length}
              />
            ))}
          </div>
          <p className="be-products__note">{d.products.note}</p>
          <a
            className="be-quote-band"
            href="https://wa.me/998939090341"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="be-quote-band__line">{d.products.quoteLine}</span>
            <span className="be-quote-band__cta">{d.products.quoteCta}</span>
          </a>
        </div>
      </section>

      <section className="be-section be-delivery" id="delivery">
        <div className="be-container" data-reveal="">
          <div className="be-delivery__head">
            <h2 className="be-h2">{d.delivery.title}</h2>
          </div>
          <div className="be-terms">
            {d.delivery.terms.map((t) => (
              <article className="be-term" key={t.place}>
                <h3 className="be-term__name">
                  <span className="be-term__code be-mono">{t.code}</span> {t.place}
                </h3>
                <p className="be-term__body">{t.body}</p>
                <span aria-hidden="true" className="be-term__route" />
              </article>
            ))}
          </div>
          <p className="be-delivery__docs">{d.delivery.docsLine}</p>
        </div>
        <span aria-hidden="true" className="be-delivery__rail">
          {d.delivery.rail}
        </span>
      </section>

      <section className="be-section be-exchange" id="exchange">
        <div className="be-container" data-reveal="">
          <h2 className="be-exchange__statement">
            {d.exchange.statementBefore}
            <em>{d.exchange.statementAccent}</em>
            {d.exchange.statementAfter}
          </h2>
          <p className="be-exchange__body">{d.exchange.body}</p>
          <a
            className="be-exchange__link"
            href="https://www.exchange.gov.tm/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {d.exchange.linkLabel} ↗
          </a>
        </div>
      </section>

      <section className="be-section" id="partners">
        <div className="be-container">
          <div className="be-partners__head" data-reveal="">
            <h2 className="be-h2">{d.partners.title}</h2>
            <p className="be-body">{d.partners.intro}</p>
          </div>
          <ul className="be-partner-cats" data-reveal="">
            {d.partners.categories.map((cat, i) => (
              <li className="be-partner-cat" key={cat}>
                <img alt="" src={PARTNER_ICONS[i]} />
                <span>{cat}</span>
              </li>
            ))}
          </ul>
          <div className="be-partner-marks" dir="ltr">
            <ul className="be-partner-marks__track">
              {PARTNER_MARKS.map((mark) => (
                <li key={mark}>{mark}</li>
              ))}
              {PARTNER_MARKS.map((mark) => (
                <li aria-hidden="true" key={`${mark}-loop`}>
                  {mark}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="be-section be-legal" id="legal">
        <div className="be-container">
          <div className="be-legal__head">
            <h2 className="be-h2">{d.legal.title}</h2>
          </div>
          <div className="be-records" data-reveal="">
            {d.legal.entities.map((e) => (
              <article className="be-record" key={e.regNo}>
                <h3 className="be-record__name">{e.name}</h3>
                <dl className="be-record__rows">
                  <div className="be-record__row">
                    <dt>{d.legal.fields.jurisdiction}</dt>
                    <dd>{e.jurisdiction}</dd>
                  </div>
                  <div className="be-record__row">
                    <dt>{d.legal.fields.regNo}</dt>
                    <dd className="be-mono">{e.regNo}</dd>
                  </div>
                  <div className="be-record__row">
                    <dt>{d.legal.fields.regDate}</dt>
                    <dd className="be-mono">{e.regDate}</dd>
                  </div>
                  <div className="be-record__row">
                    <dt>{d.legal.fields.address}</dt>
                    <dd>{e.address}</dd>
                  </div>
                  <div className="be-record__row">
                    <dt>{d.legal.fields.activity}</dt>
                    <dd>{e.activity}</dd>
                  </div>
                  {e.bank ? (
                    <div className="be-record__row">
                      <dt>{d.legal.fields.bank}</dt>
                      <dd>{e.bank}</dd>
                    </div>
                  ) : null}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="be-section" id="contacts">
        <div className="be-container">
          <div className="be-contacts__grid" data-reveal="">
            <div>
              <h2 className="be-h2">{d.contacts.title}</h2>
              <p className="be-body be-contacts__lead">{d.contacts.lead}</p>
              <div className="be-channels" data-reveal="">
                {d.contacts.channels.map((ch) => (
                  <a
                    className="be-channel"
                    href={ch.href}
                    key={ch.label}
                    rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    target={ch.href.startsWith("http") ? "_blank" : undefined}
                  >
                    <span className="be-channel__label">{ch.label}</span>
                    <span className="be-channel__value">{ch.value}</span>
                    <RouteArrow />
                  </a>
                ))}
              </div>
            </div>
            <a className="be-frame" href="mailto:info@bashemir.com">
              <h3 className="be-frame__title">{d.contacts.frameTitle}</h3>
              <p className="be-frame__body">{d.contacts.frameBody}</p>
              <span className="be-frame__hint be-mono">info@bashemir.com</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="be-footer">
        <div className="be-container be-footer__inner">
          <div>
            <div className="be-footer__brand">
              <img alt="Bash Emir" className="be-footer__logo" src="/assets/brand/logo-dark.png" />
            </div>
            <p className="be-footer__tagline" style={{ marginTop: "0.8rem" }}>
              {d.footer.tagline}
            </p>
          </div>
          <div className="be-footer__legal">
            © 2026 Bash Emir · {d.footer.rights}
          </div>
          <div className="be-footer__social">
            <span className="be-footer__social-title">{d.footer.followTitle}</span>
            <a href="https://t.me/bashemir" rel="noopener noreferrer" target="_blank">
              Telegram
            </a>
            <a
              href="https://whatsapp.com/channel/0029VbCnEhlDuMRk9CQcyE10"
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/bashemir5"
              rel="noopener noreferrer"
              target="_blank"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@bashemir5"
              rel="noopener noreferrer"
              target="_blank"
            >
              TikTok
            </a>
            <a
              href="https://www.linkedin.com/company/individual-enterprise-bash-emir/"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
