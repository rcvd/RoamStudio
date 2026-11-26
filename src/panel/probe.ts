/**
 * Probes: read what the active theme paints, in Light and in Dark, without touching
 * the page. A hidden container holds Roam's markup for the element in question
 * twice, once in a `.bp3-light` and once in a `.bp3-dark` wrapper (each with its own
 * `color-scheme`), and getComputedStyle reads the result. The color picker uses
 * this for the "Theme default" and "Theme accent" swatches and for the contrast
 * warning's background, so they show the theme's actual colors, not placeholders.
 */

import { SETTINGS_STYLE_ID } from "../constants";

export interface Pair {
  light: string;
  dark: string;
}

/** Roam's markup and the property to read, per color token. */
const PROBES: Record<string, { html: string; property: string }> = {
  "page-link-color": { html: '<span class="rm-page-ref rm-page-ref--link">x</span>', property: "color" },
  "page-link-underline-color": { html: '<span class="rm-page-ref rm-page-ref--link">x</span>', property: "border-bottom-color" },
  "external-link-color": { html: '<div class="roam-block"><a class="rm-alias rm-alias--external">x</a></div>', property: "color" },
  "external-link-underline-color": { html: '<div class="roam-block"><a class="rm-alias rm-alias--external">x</a></div>', property: "border-bottom-color" },
  "alias-color": { html: '<a class="rm-alias rm-alias--page">x</a>', property: "color" },
  "alias-underline-color": { html: '<a class="rm-alias rm-alias--page">x</a>', property: "border-bottom-color" },
  "block-ref-color": { html: '<div class="roam-block"><span class="rm-block-ref">x</span></div>', property: "color" },
  "block-ref-underline-color": { html: '<span class="rm-block-ref">x</span>', property: "border-bottom-color" },
  "tag-color": { html: '<span class="rm-page-ref rm-page-ref--tag">x</span>', property: "color" },
  "tag-background": { html: '<span class="rm-page-ref rm-page-ref--tag">x</span>', property: "background-color" },
  "tag-underline-color": { html: '<span class="rm-page-ref rm-page-ref--tag">x</span>', property: "border-bottom-color" },
  "date-color": { html: '<span data-link-uid="11-22-2026"><span class="rm-page-ref rm-page-ref--link">x</span></span>', property: "color" },
  "date-background": { html: '<span data-link-uid="11-22-2026"><span class="rm-page-ref rm-page-ref--link">x</span></span>', property: "background-color" },
  "date-underline-color": { html: '<span data-link-uid="11-22-2026"><span class="rm-page-ref rm-page-ref--link">x</span></span>', property: "border-bottom-color" },
  "h1-color": { html: '<div class="rm-heading-level-1"><div class="rm-block__self"><div class="rm-block__input">x</div></div></div>', property: "color" },
  "h2-color": { html: '<div class="rm-heading-level-2"><div class="rm-block__self"><div class="rm-block__input">x</div></div></div>', property: "color" },
  "h3-color": { html: '<div class="rm-heading-level-3"><div class="rm-block__self"><div class="rm-block__input">x</div></div></div>', property: "color" },
  accent: { html: '<span style="color: var(--rs-accent)">x</span>', property: "color" },
  "main-background": { html: '<span style="color: var(--rs-main-background)">x</span>', property: "color" },
};

export const probedTokens = (): string[] => Object.keys(PROBES);

/** The innermost element of a probe's markup: the one Roam's rules style. */
function target(root: Element): Element {
  let el = root;
  while (el.firstElementChild) el = el.firstElementChild;
  return el;
}

/**
 * What the active theme (and the user's settings, unless `ignoreSettings`) paints
 * for a color token, in Light and in Dark, as computed `rgb()` strings.
 */
export function probe(token: string, { ignoreSettings = false }: { ignoreSettings?: boolean } = {}): Pair | null {
  const spec = PROBES[token];
  if (!spec) return null;
  const host = document.createElement("div");
  host.className = "roamstudio-probe";
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = "position: absolute; visibility: hidden; pointer-events: none; left: -10000px; top: 0;";
  host.innerHTML = `<div class="bp3-light" style="color-scheme: light">${spec.html}</div><div class="bp3-dark" style="color-scheme: dark">${spec.html}</div>`;
  document.body.appendChild(host);
  // The theme's own value: the user's settings stylesheet is switched off for the
  // reading, which is synchronous, so the page never renders without it.
  const settings = ignoreSettings ? (document.getElementById(SETTINGS_STYLE_ID) as HTMLStyleElement | null)?.sheet : null;
  if (settings) settings.disabled = true;
  try {
    const [light, dark] = [...host.children].map((w) => getComputedStyle(target(w)).getPropertyValue(spec.property).trim());
    return { light, dark };
  } finally {
    if (settings) settings.disabled = false;
    host.remove();
  }
}

/** Parses `rgb()`/`rgba()`/`#hex` into [r, g, b, a]. */
export function parseRgb(value: string): [number, number, number, number] | null {
  const hex = value.trim().match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
  }
  const m = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])] : null;
}

/** WCAG relative luminance. */
function luminance([r, g, b]: [number, number, number, number]): number {
  const lin = (v: number) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG contrast ratio of two colors (the foreground composited over the background when translucent). */
export function contrastRatio(foreground: string, background: string): number | null {
  const fg = parseRgb(foreground);
  const bg = parseRgb(background);
  if (!fg || !bg) return null;
  const a = fg[3];
  const blended: [number, number, number, number] = [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)) as unknown as [number, number, number, number];
  blended[3] = 1;
  const [l1, l2] = [luminance(blended), luminance(bg)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
