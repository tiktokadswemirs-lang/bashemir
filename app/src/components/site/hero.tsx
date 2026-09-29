/**
 * Hero: one full-screen photo of the port with a slow CSS "Ken Burns" zoom.
 * Replaces the scroll-scrubbed film, which took too long to load and to
 * scroll through. One screen tall; the photo is AI-upscaled (Real-ESRGAN x4)
 * and served per screen size.
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
        <source media="(max-width: 768px)" srcSet="/assets/hero/port-mobile.webp" />
        <img
          alt=""
          className="be-hero__img"
          fetchPriority="high"
          sizes="100vw"
          src="/assets/hero/port-1920.webp"
          srcSet="/assets/hero/port-1920.webp 1920w, /assets/hero/port-2560.webp 2560w"
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
