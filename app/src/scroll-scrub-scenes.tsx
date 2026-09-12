/**
 * Brand theme tokens for the journey layer, from the design brief (v2 navy
 * palette). The journey itself is rendered by
 * `components/site/frame-scrub.tsx`, which scrubs a pre-extracted JPEG frame
 * sequence on canvas: video-seek scrubbing (the template's default engine)
 * stuttered on the client's hardware, so the film ships as frames instead.
 */
import type { ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#74B4FF",
  background: "#0A0F1A",
  ink: "#F2F6FC",
  muted: "#8FA3BF",
};
