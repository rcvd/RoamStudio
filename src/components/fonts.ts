/**
 * Embedded fonts: one `<style id="roamstudio-fonts">` with the @font-face rules of
 * exactly the families the active theme and the current font settings use. Every
 * source is a WOFF2 data URL (scripts/build-fonts.mjs), so fonts work offline and
 * nothing is fetched. Inter is not embedded: Roam ships it itself.
 */
import iaWriterMonoS from "../fonts/ia-writer-mono-s.css";
import iaWriterQuattroS from "../fonts/ia-writer-quattro-s.css";
import ibarraRealNova from "../fonts/ibarra-real-nova.css";
import inconsolata from "../fonts/inconsolata.css";
import lato from "../fonts/lato.css";
import nunitoSans from "../fonts/nunito-sans.css";
import robotoMono from "../fonts/roboto-mono.css";
import { FONTS_STYLE_ID } from "../constants";
import { SETTINGS, type Lookup } from "../settings/schema";

/** Every embedded family's @font-face rules, by family name. */
export const FONT_CSS: Record<string, string> = {
  "iA Writer Quattro S": iaWriterQuattroS,
  "iA Writer Mono S": iaWriterMonoS,
  "Nunito Sans": nunitoSans,
  "Ibarra Real Nova": ibarraRealNova,
  "Lato": lato,
  "Inconsolata": inconsolata,
  "Roboto Mono": robotoMono,
};

/** The embedded families the font settings currently choose. */
export function settingFonts(get: Lookup): string[] {
  const out: string[] = [];
  for (const setting of SETTINGS) {
    if (setting.control !== "font") continue;
    const font = setting.options.find((o) => o.value === get(setting.key))?.font;
    if (font) out.push(font);
  }
  return out;
}

/** The families to load: the theme's and the settings', embedded ones only, in FONT_CSS order. */
export function requiredFonts(themeFonts: readonly string[], get: Lookup): string[] {
  const wanted = new Set([...themeFonts, ...settingFonts(get)]);
  return Object.keys(FONT_CSS).filter((family) => wanted.has(family));
}

/** Writes the fonts stylesheet for these families, or removes it when there are none. */
export function applyFonts(families: string[]): void {
  const css = families.map((f) => FONT_CSS[f]).join("");
  let style = document.getElementById(FONTS_STYLE_ID);
  if (!css) {
    style?.remove();
    return;
  }
  if (!style) {
    style = document.createElement("style");
    style.id = FONTS_STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== css) style.textContent = css;
}

export function removeFonts(): void {
  document.getElementById(FONTS_STYLE_ID)?.remove();
}
