/**
 * Scene data for the scroll-scrub journey.
 *
 * Single-shot build: ONE continuous ~15s film exported as four consecutive,
 * frame-exact segments (the seam frames are adjacent frames of the same take,
 * so the scrub is seamless). One scene entry per chapter, per locale. Every
 * per-locale array is a module constant so the controller identity is stable;
 * switching locale swaps to another stable constant.
 *
 * Every `poster` is the exact first frame of the encoded clip beside it.
 */
import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";
import { dictionaries, type Dict, type Locale } from "@/i18n";

/** Brand tokens for the journey layer, from the design brief. */
export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#4AA47E",
  background: "#0B1614",
  ink: "#EDF3EE",
  muted: "#8DA69A",
};

/**
 * Corner-bracket viewfinder CTA (the hero chapter's garment): four brackets
 * close around the label on hover. Styled in styles.css under .vf-cta.
 */
function ViewfinderCta({ label }: { label: string }) {
  return (
    <a className="vf-cta" href="#contacts">
      <span aria-hidden="true" className="vf-cta__corner vf-cta__corner--tl" />
      <span aria-hidden="true" className="vf-cta__corner vf-cta__corner--tr" />
      <span aria-hidden="true" className="vf-cta__corner vf-cta__corner--bl" />
      <span aria-hidden="true" className="vf-cta__corner vf-cta__corner--br" />
      <span className="vf-cta__label">{label}</span>
    </a>
  );
}

const world = "/assets/world";

function buildScenes(d: Dict): ScrollScrubScene[] {
  const c = d.chapters;
  return [
    {
      id: "sea",
      label: c.sea.label,
      clip: `${world}/scene-01.mp4`,
      poster: `${world}/scene-01-poster.png`,
      mobileClip: `${world}/scene-01-mobile.mp4`,
      mobilePoster: `${world}/scene-01-mobile-poster.png`,
      title: c.sea.title,
      body: c.sea.body,
      align: "left",
      scroll: 2.2,
      linger: 0.15,
      actions: <ViewfinderCta label={d.ctaDiscuss} />,
    },
    {
      id: "group",
      label: c.group.label,
      clip: `${world}/scene-02.mp4`,
      poster: `${world}/scene-02-poster.png`,
      mobileClip: `${world}/scene-02-mobile.mp4`,
      mobilePoster: `${world}/scene-02-mobile-poster.png`,
      kicker: c.group.kicker,
      title: c.group.title,
      body: c.group.body,
      tags: c.group.tags,
      align: "right",
      scroll: 1.7,
    },
    {
      id: "products-chapter",
      label: c.products.label,
      clip: `${world}/scene-03.mp4`,
      poster: `${world}/scene-03-poster.png`,
      mobileClip: `${world}/scene-03-mobile.mp4`,
      mobilePoster: `${world}/scene-03-mobile-poster.png`,
      title: c.products.title,
      body: c.products.body,
      tags: c.products.tags,
      align: "left",
      scroll: 1.7,
    },
    {
      id: "delivery-chapter",
      label: c.delivery.label,
      clip: `${world}/scene-04.mp4`,
      poster: `${world}/scene-04-poster.png`,
      mobileClip: `${world}/scene-04-mobile.mp4`,
      mobilePoster: `${world}/scene-04-mobile-poster.png`,
      kicker: c.delivery.kicker,
      title: c.delivery.title,
      body: c.delivery.body,
      tags: c.delivery.tags,
      align: "right",
      scroll: 2,
      linger: 0.2,
    },
  ];
}

const scenesRu = buildScenes(dictionaries.ru);
const scenesEn = buildScenes(dictionaries.en);
const scenesTr = buildScenes(dictionaries.tr);
const scenesFa = buildScenes(dictionaries.fa);

const scenesByLocale: Record<Locale, ScrollScrubScene[]> = {
  ru: scenesRu,
  en: scenesEn,
  tr: scenesTr,
  fa: scenesFa,
};

export function scenesFor(locale: Locale): ScrollScrubScene[] {
  return scenesByLocale[locale];
}

/** Kept for the template's default import shape (RU is the primary locale). */
export const scrollScrubScenes = scenesRu;
