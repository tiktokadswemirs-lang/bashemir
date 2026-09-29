/** Per-page <title>, description and social tags. The deepest route's head
 * wins over the root defaults (see TanStack buildTagsFromMatches). */
export function pageMeta(title: string, description: string) {
  const desc =
    description.length > 160
      ? `${description.slice(0, 157).replace(/\s+\S*$/, "")}...`
      : description;
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
    ],
  };
}

/** schema.org Organization, rendered once in the root head. */
export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bash Emir",
  url: "https://bashemir.com",
  logo: "https://bashemir.com/assets/brand/icon-512.png",
  email: "info@bashemir.com",
  telephone: "+99365616173",
  description: "International oil products trader: Turkmenistan, Azerbaijan, Uzbekistan.",
  address: [
    { "@type": "PostalAddress", addressLocality: "Ashgabat", addressCountry: "TM" },
    { "@type": "PostalAddress", addressLocality: "Baku", addressCountry: "AZ" },
    { "@type": "PostalAddress", addressLocality: "Bukhara", addressCountry: "UZ" },
  ],
  sameAs: [
    "https://t.me/bashemir",
    "https://www.instagram.com/bashemir5",
    "https://www.tiktok.com/@bashemir5",
    "https://www.linkedin.com/company/individual-enterprise-bash-emir/",
    "https://whatsapp.com/channel/0029VbCnEhlDuMRk9CQcyE10",
  ],
};
