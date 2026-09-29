/**
 * Hero: one full-screen photo of the port with a slow CSS "Ken Burns" zoom.
 * Replaces the scroll-scrubbed film, which took too long to load and to
 * scroll through; this is a single ~150-300 KB image and one screen tall.
 */
import { smoothScrollTo } from "@/components/site/hooks";
import { dictionaries, type Locale } from "@/i18n";

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

export function Hero({ lang }: { lang: Locale }) {
  const d = dictionaries[lang];
  return (
    <section className="be-hero" id="top">
      <picture>
        <source media="(max-width: 768px)" srcSet="/assets/hero/port-1280.webp" />
        <img
          alt=""
          className="be-hero__img"
          fetchPriority="high"
          src="/assets/hero/port-1920.webp"
        />
      </picture>
      <div aria-hidden="true" className="be-hero__shade" />
      <div className="be-container be-hero__copy">
        <h1 className="be-hero__title">{d.chapters.sea.title}</h1>
        <p className="be-hero__body">{d.chapters.sea.body}</p>
        <ViewfinderCta label={d.ctaDiscuss} />
      </div>
    </section>
  );
}
