# Bash Emir — design brief (Phase 0)

## Design read
International buyers, refineries and state enterprises evaluating a Caspian-region
oil products trading house; the register is institutional confidence carried with
cinematic gravity, not startup energy.

## Concept spine
**Journey / waypoints: "the route of a cargo".** The whole site is one voyage:
from open water to the vessel, then waypoint by waypoint through the group,
the products, the delivery terms, the exchange, the paperwork, the handshake.
A thin route line threads the static sections; coordinates mark the ports.

## Delivery tier
`cinema` — Lenis + GSAP, animated website (scroll-scrub) as the Tier-1 carrier.

## Locked palette (v2, user-directed repaint)
- `--bg`      #0A0F1A  midnight navy-black (never #000)
- `--surface` #101B2E  raised navy
- `--ink`     #F2F6FC  cool white
- `--muted`   #8FA3BF  slate blue-grey
- `--accent`  #74B4FF  light sky-blue (ONE accent, soft, no neon glow)
- `--hairline` #1D2C47
Defense: the USER explicitly rejected the original petrol/jade palette ("dirty,
muddy") and requested a premium modern dark design with light blue as the main
accent; this overrides the dark+blue-accent default ban per the explicit-user-choice
rule. Executed clean and low-glow: desaturated ground, one soft sky-blue accent,
warm gold only inside the film's deck lights. The whole asset kit (film, map,
icons, texture, cover) was regenerated in this grade.
(v1 was petrol #0B1614 / jade #4AA47E, drawn from the logo; superseded 2026-08-31.)

## Locked type
- Display + body: **Golos Text** (Swiss rational sans, hard hierarchy; native
  Cyrillic, full Turkish Latin). Display 800–900 `tracking-tighter leading-none`.
- Data / labels / coordinates: **JetBrains Mono** (Cyrillic OK).
- Farsi locale: **Vazirmatn** substitutes both roles, `dir="rtl"` on html.
No serif anywhere.

## Languages
ru (default), en, tr, fa (RTL). Locale via `?lang=` search param, SSR-rendered,
persisted; switcher in nav. All copy lives in `src/i18n.ts`. Zero em/en dashes in
every locale.

## Animation mode: animated-website
User picked Animated at intake.

- **Journey shape:** `single-shot`. One continuous ~15s aerial push, exported as 4
  consecutive frame-exact segments (seams are adjacent source frames, invisible).
- **Journey (4 chapters over the one film):**
  1. `sea` (wide establishing: vast night Caspian, laden tanker small, port lights
     on horizon) — H1 "Нефтепродукты по всему миру"; body: spot and term contracts
     with transparent pricing. No kicker, no tags.
  2. `group` (push closer: vessel grows, deck lights resolve) — kicker "О группе",
     title on the three-country group; tags: Азербайджан / Туркменистан / Узбекистан.
  3. `products` (alongside: hull and cargo manifolds fill frame) — title on the
     14-product book; tags: СУГ / Дизель / Битум. No kicker.
  4. `delivery` (close: bow cutting dark water, jade rim light) — kicker
     "Incoterms 2020", title on delivery basis; tags: FOB Baku / FOB Turkmenbashi /
     DAP Bukhara. CTA in actions.
  The push from horizon to bow enacts the spine: a deal traveling the route from
  open market to handover.
- **World grammar (byte-identical preamble for film + storyboard):** one continuous
  slow aerial push-in over a calm night Caspian sea toward a single laden products
  tanker; deep petrol-green water #0B1614, bone #EDF3EE highlights, one oxidized
  jade #4AA47E dusk glow at the horizon; locked exposure, no flicker, constant slow
  speed, no cuts, no camera shake, no on-screen text, subject center-safe with wide
  dark negative space.
- **Mobile framing:** vessel held in the center-safe column; 720p mobile encodes.
- **Delivery budget:** ≤32 MiB desktop clips total, ≤16 MiB mobile.

## Section plan (after the journey; one family each, no repeats)
1. **About + route map** — asymmetric split (text left, generated route-map plate
   right) + oversized metrics strip (3 jurisdictions, 14 products, since 2020).
2. **Products catalog** — hover-accordion slices: 4 category rows opening to the 14
   products with mono spec labels. Eyebrow "Каталог".
3. **Delivery terms** — 3 stacked full-width route bands (FOB Baku, FOB
   Turkmenbashi, DAP Bukhara) threaded by the route line; the second-read moment
   lives here: a narrow vertical side-rail of port coordinates in mono.
4. **Exchange model** — full-width statement band: exports run through ГТСБТ;
   pricing anchored to Platts and Argus, fixed in SPA and CI.
5. **Partners** — 5 partner categories as an icon strip (generated icon set).
6. **Legal dossier** — off-grid editorial: 3 legal entities as dark dossier
   cards (surface gradient, jade spine, hairline border) with mono field labels
   (reg numbers, dates, addresses). Originally paper-light; user asked for dark.
7. **Contact + footer** — contact channels + the one framed CTA block; footer.

Eyebrow budget: kickers on chapters 2 and 4 + eyebrow on Products = 3 total. OK.

## Asset plan (all generated, palette-locked)
- Storyboard: ONE 16:9 six-panel grid of the single move (refs/ only).
- Film: ONE generate_video call ~15s 16:9 max quality, storyboard as style ref;
  split to 4 segments + posters (desktop + mobile) in `public/assets/world/`.
- Route-map plate: dark cartographic Caspian map, route arcs, no text (About).
- Section plate: subtle nautical-chart texture tile (Delivery / Legal grounds).
- Icon sheet: 8 glyphs, 2px jade stroke on solid ground (tanker, drum, rail car,
  port crane, certificate, droplet, flask, handshake) → sliced, keyed transparent.
- Monogram "BE" + head kit (favicon.ico/svg, apple-touch, 192/512 + maskable,
  webmanifest, theme-color) — user's own logo swaps in later if provided.
- OG 1200×630 + 3:2 launch cover per app-cover.md; app-meta.json filled.

## Journey delivery (v3): canvas frame sequence
The A4 scrub is delivered as a canvas-drawn JPEG frame sequence
(`components/site/frame-scrub.tsx`, 180 frames desktop 1440w + 180 mobile
720w), per the asset-system §7 canvas image-sequence recipe. Video-seek
scrubbing (the template engine) stuttered on the client's hardware even at
GOP 2/baseline, and the client asked twice to fix the lag; drawing decoded
frames is O(1) per scroll position in both directions. The film itself is
image-to-video from the client's own port photograph (their explicit request).
Chapter copy is server-rendered flow content over the sticky canvas stage.

## Product pages (client request, parity with old site)
`/products/$slug` for all 14 products: the old site's real descriptions
(translated RU/EN/TR/FA), the client's own photos, and their spec PDFs
mirrored into /assets/specs. Sulfur and sulfuric acid render inline localized
spec tables (copied verbatim from the old pages); white cement shows the
analysis-report image. Catalog rows on the home page link to these pages;
product pages enter with mount animations (rise + image unclip).

## Motion pass (post-launch tune)
- Lenis inertial smooth scroll (reduced-motion gated) smooths the scrub itself.
- [data-reveal] IntersectionObserver reveals: transform-only slide-ups with
  per-child stagger; content always visible (screenshot-safe).
- Partner name marquee (CSS, pauses on hover, reduced-motion static).
- Desktop clips re-encoded 1600w / GOP 4 / fastdecode for stutter-free seeking;
  chapter scroll weights raised (2.6 / 2 / 2 / 2.4) for a calmer scrub.
- No people imagery: correct register for this B2B.

## CTA inventory (bespoke chrome, one garment each)
- **Nav links:** moving hairline underline; locale switcher as mono toggle chips.
- **Hero / contact intent, one label page-wide ("Обсудить поставку"):** hero uses
  corner-bracket viewfinder that closes around the label on hover; the contact
  section repeats the intent as the ONE rationed framed block that fills on hover.
- **Quote intent ("Запросить котировку"), Products band:** whole-band CTA, strip
  shifts grade and shears slightly on hover.
- **Channel links (email, phone, WhatsApp, Telegram):** arrow travels along a
  drawn route path on hover (mono labels).

## Combinatorial pick (Phase 1, held across all boards)
Theme paradigm: Deep Dark with a nautical-chart twist · Background character:
full-bleed cinematic imagery (journey) / tactile chart texture (content) ·
Typography character: Swiss rational sans, hard hierarchy · Hero architecture:
massive image-first, restrained text · Section system: Swiss grid discipline ·
Signature components: hover-accordion slices, oversized metrics strip, vertical
rhythm lines, off-grid editorial dossier · Narrative spine: journey/waypoints ·
Second-read moment: vertical side-rail coordinates note (Delivery, once).
