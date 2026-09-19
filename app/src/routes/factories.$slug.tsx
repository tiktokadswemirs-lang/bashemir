import { createFileRoute, Link } from "@tanstack/react-router";

import { useReveals, useSmoothScroll } from "@/components/site/hooks";
import { SiteHeader } from "@/components/site/site-header";
import { FACTORY_UI, factoryBySlug } from "@/factories";
import { dictionaries, resolveLocale } from "@/i18n";
import { productBySlug } from "@/products";

export const Route = createFileRoute("/factories/$slug")({
  validateSearch: (search: Record<string, unknown>): { lang?: "ru" | "en" | "tr" | "fa" } => ({
    lang: resolveLocale(search.lang),
  }),
  component: FactoryPage,
});

function FactoryPage() {
  const { slug } = Route.useParams();
  const { lang = "ru" } = Route.useSearch();
  const d = dictionaries[lang];
  const f = factoryBySlug(slug);
  useSmoothScroll();
  useReveals();

  if (!f) {
    return (
      <main className="be-page pp">
        <div className="be-container pp__wrap">
          <h1 className="be-h2">{d.productUi.notFound}</h1>
          <Link className="pp__back" search={{ lang }} to="/factories">
            {FACTORY_UI.all[lang]}
          </Link>
        </div>
      </main>
    );
  }

  const related = f.products.map(productBySlug).filter((p) => p !== undefined);
  const waHref = `https://wa.me/998939090341?text=${encodeURIComponent(
    `${d.productUi.requestTitle}: ${f.name[lang]}`,
  )}`;

  return (
    <main className="be-page pp">
      <SiteHeader lang={lang} page="factory" slug={slug} />
      <article className="be-container pp__wrap">
        <div className="pp__head">
          <Link className="pp__back" search={{ lang }} to="/factories">
            {FACTORY_UI.all[lang]}
          </Link>
          <p className="be-eyebrow">{d.about.factoriesLink}</p>
          <h1 className="pp__title">{f.name[lang]}</h1>
        </div>
        <div className="pp__grid">
          <div className="pp__media">
            <img alt={f.name[lang]} className="pp__photo" src={f.image} />
          </div>
          <div className="pp__info">
            <p className="pp__desc">{f.desc[lang]}</p>
            {related.length > 0 ? (
              <dl className="pp__facts">
                <div className="pp__fact">
                  <dt>{FACTORY_UI.products[lang]}</dt>
                  <dd>
                    <span className="pp__chips">
                      {related.map((p) => (
                        <Link
                          className="pp__chip"
                          key={p.slug}
                          params={{ slug: p.slug }}
                          search={{ lang }}
                          to="/products/$slug"
                        >
                          {p.name[lang]}
                        </Link>
                      ))}
                    </span>
                  </dd>
                </div>
              </dl>
            ) : null}
          </div>
        </div>
        <a
          className="pp__quote"
          data-reveal=""
          href={waHref}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>
            <span className="pp__quote-title">{d.productUi.requestTitle}</span>
            <span className="pp__quote-body">{d.productUi.requestBody}</span>
          </span>
          <span className="pp__quote-cta">{d.productUi.requestCta}</span>
        </a>
      </article>
    </main>
  );
}
