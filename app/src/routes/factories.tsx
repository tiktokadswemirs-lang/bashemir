import { createFileRoute, Link } from "@tanstack/react-router";

import { useReveals, useSmoothScroll } from "@/components/site/hooks";
import { SiteHeader } from "@/components/site/site-header";
import { dictionaries, resolveLocale } from "@/i18n";
import { FACTORIES } from "@/factories";

export const Route = createFileRoute("/factories")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { lang?: "ru" | "en" | "tr" | "fa" } => ({
    lang: resolveLocale(search.lang),
  }),
  component: FactoriesPage,
});

function FactoriesPage() {
  const { lang = "ru" } = Route.useSearch();
  const d = dictionaries[lang];
  useSmoothScroll();
  useReveals();

  return (
    <main className="be-page pp">
      <SiteHeader lang={lang} page="factories" />

      <article className="be-container pp__wrap">
        <div className="pp__head">
          <Link className="pp__back" search={{ lang }} to="/">
            {d.factoriesUi.back}
          </Link>
          <h1 className="pp__title">{d.factoriesUi.title}</h1>
          <p className="be-body" style={{ marginTop: "1.2rem" }}>
            {d.factoriesUi.intro}
          </p>
        </div>

        <div className="fc__grid" data-reveal="">
          {FACTORIES.map((f) => (
            <figure className="fc-card" key={f.image}>
              <img alt={f.name[lang]} loading="lazy" src={f.image} />
              <figcaption>{f.name[lang]}</figcaption>
            </figure>
          ))}
        </div>
      </article>
    </main>
  );
}
