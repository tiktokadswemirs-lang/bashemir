import { createFileRoute, Link } from "@tanstack/react-router";

import { useReveals, useSmoothScroll } from "@/components/site/hooks";
import { LangMenu } from "@/components/site/nav-lang";
import { dictionaries, resolveLocale } from "@/i18n";
import { productBySlug, specValue } from "@/products";

export const Route = createFileRoute("/products/$slug")({
  validateSearch: (search: Record<string, unknown>): { lang?: "ru" | "en" | "tr" | "fa" } => ({
    lang: resolveLocale(search.lang),
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { lang = "ru" } = Route.useSearch();
  const d = dictionaries[lang];
  const product = productBySlug(slug);
  useSmoothScroll();
  useReveals();

  if (!product) {
    return (
      <main className="be-page pp">
        <div className="be-container pp__wrap">
          <h1 className="be-h2">{d.productUi.notFound}</h1>
          <Link className="pp__back" search={{ lang }} to="/">
            {d.productUi.back}
          </Link>
        </div>
      </main>
    );
  }

  const category = d.products.categories[product.category];
  const waHref = `https://wa.me/998939090341?text=${encodeURIComponent(
    `${d.productUi.requestTitle}: ${product.name[lang]}`,
  )}`;

  return (
    <main className="be-page pp">
      <header className="be-nav">
        <div className="be-nav__inner">
          <Link className="be-nav__brand" search={{ lang }} to="/">
            <img alt="" src="/assets/brand/emblem.png" />
            <span>BASH EMIR</span>
          </Link>
          <nav className="be-nav__links" aria-label="Catalog">
            <Link
              className="be-nav__link"
              hash="products"
              search={{ lang }}
              to="/"
            >
              {d.productUi.allProducts}
            </Link>
          </nav>
          <LangMenu lang={lang} page="product" slug={slug} />
        </div>
      </header>

      <article className="be-container pp__wrap">
        <div className="pp__head">
          <Link className="pp__back" hash="products" search={{ lang }} to="/">
            {d.productUi.back}
          </Link>
          <p className="be-eyebrow">{category?.name}</p>
          <h1 className="pp__title">{product.name[lang]}</h1>
        </div>

        <div className="pp__grid">
          <div className="pp__media">
            <img alt={product.name[lang]} className="pp__photo" src={product.image} />
            {product.gallery ? (
              <div className="pp__gallery">
                {product.gallery.map((g) => (
                  <img alt="" key={g} src={g} />
                ))}
              </div>
            ) : null}
          </div>

          <div className="pp__info">
            <p className="pp__desc">{product.desc[lang]}</p>

            <dl className="pp__facts">
              {product.origin ? (
                <div className="pp__fact">
                  <dt>{d.productUi.origin}</dt>
                  <dd>{product.origin[lang]}</dd>
                </div>
              ) : null}
              {product.grades ? (
                <div className="pp__fact">
                  <dt>{d.productUi.grades}</dt>
                  <dd>
                    <span className="pp__chips">
                      {product.grades.map((g) => (
                        <span className="pp__chip" key={g}>
                          {g}
                        </span>
                      ))}
                    </span>
                  </dd>
                </div>
              ) : null}
              {product.specTable?.standard ? (
                <div className="pp__fact">
                  <dt>{d.productUi.standard}</dt>
                  <dd className="be-mono">{product.specTable.standard}</dd>
                </div>
              ) : null}
            </dl>

            {product.pdfs ? (
              <div className="pp__pdfs">
                {product.pdfs.map((f, i) => (
                  <a
                    className="pp__pdf"
                    href={f}
                    key={f}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span aria-hidden="true" className="pp__pdf-badge be-mono">
                      PDF
                    </span>
                    {d.productUi.openPdf}
                    {product.pdfs && product.pdfs.length > 1 ? ` ${i + 1}` : ""}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {product.specTable ? (
          <section className="pp__spec" data-reveal="">
            <h2 className="pp__spec-title">{d.productUi.specification}</h2>
            <div className="pp__table-wrap">
              <table className="pp__table">
                <thead>
                  <tr>
                    {product.specTable.headers[lang].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.specTable.rows.map((row) => (
                    <tr key={row.name.en}>
                      <td>{row.name[lang]}</td>
                      {row.values.map((v, vi) => (
                        <td className="be-mono" key={vi}>
                          {specValue(v, lang)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {product.specTable.note ? (
              <p className="pp__note">{product.specTable.note[lang]}</p>
            ) : null}
          </section>
        ) : null}

        {product.specImage ? (
          <figure className="pp__analysis" data-reveal="">
            <img alt={d.productUi.analysisCaption} src={product.specImage} />
            <figcaption className="be-mono">
              {d.productUi.analysisCaption}
            </figcaption>
          </figure>
        ) : null}

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
