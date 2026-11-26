/**
 * Theme selection: which stylesheet is injected and, for Gruvbox, which contrast
 * level its main background uses.
 *
 * Both choices are settings (`rs-theme`, `rs-gruvbox-contrast`) read through the
 * settings store. Changing one applies at once: the single theme `<style>` element
 * gets the other stylesheet's text, and the contrast is a class on `<html>`. The
 * appearance mode (Auto/Dark/Light, see dm-toggle) is not touched.
 */
import blueprintCss from "../themes/blueprint.css";
import craftCss from "../themes/craft.css";
import gruvboxCss from "../themes/gruvbox.css";
import quattroCss from "../themes/quattro.css";
import thingsCss from "../themes/things.css";
import themeFonts from "../themes/fonts.json";
import {
  CONTRAST_HARD,
  CONTRAST_SOFT,
  type CONTRASTS,
  CSS_CLASS_GRUVBOX_HARD,
  CSS_CLASS_GRUVBOX_SOFT,
  SETTING_GRUVBOX_CONTRAST,
  SETTING_THEME,
  STYLE_ELEMENT_ID,
  THEME_BLUEPRINT,
  THEME_CRAFT,
  THEME_GRUVBOX,
  THEME_QUATTRO,
  THEME_THINGS,
  type THEMES,
} from "../constants";
import type { SettingsStore } from "../settings/store";

export type Theme = (typeof THEMES)[number];
export type Contrast = (typeof CONTRASTS)[number];

const STYLESHEETS: Record<Theme, string> = {
  [THEME_QUATTRO]: quattroCss,
  [THEME_CRAFT]: craftCss,
  [THEME_THINGS]: thingsCss,
  [THEME_BLUEPRINT]: blueprintCss,
  [THEME_GRUVBOX]: gruvboxCss,
};

/**
 * The embedded fonts each theme uses (components/fonts.ts), from the theme files'
 * `fonts` (themes/fonts.json, written by `npm run generate`); Inter comes with Roam.
 */
export const THEME_FONTS = Object.fromEntries(
  (Object.keys(STYLESHEETS) as Theme[]).map((theme) => [theme, (themeFonts as Record<string, string[]>)[theme.toLowerCase()] ?? []]),
) as unknown as Record<Theme, readonly string[]>;

const CONTRAST_CLASSES: Partial<Record<Contrast, string>> = {
  [CONTRAST_HARD]: CSS_CLASS_GRUVBOX_HARD,
  [CONTRAST_SOFT]: CSS_CLASS_GRUVBOX_SOFT,
};

/** The stored theme; the store falls back to the default theme for anything invalid. */
export const storedTheme = (store: SettingsStore): Theme => store.get(SETTING_THEME) as Theme;

/** The stored Gruvbox contrast, or medium. */
export const storedContrast = (store: SettingsStore): Contrast => store.get(SETTING_GRUVBOX_CONTRAST) as Contrast;

function clearContrastClasses() {
  document.documentElement.classList.remove(CSS_CLASS_GRUVBOX_HARD, CSS_CLASS_GRUVBOX_SOFT);
}

/**
 * Injects the theme's stylesheet into the single theme `<style>` element (creating
 * it if needed) and sets the contrast class. The contrast only applies to Gruvbox.
 */
export function applyTheme(theme: Theme, contrast: Contrast) {
  let style = document.getElementById(STYLE_ELEMENT_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ELEMENT_ID;
    // First in <head> among the extension's elements: the settings, module and font
    // styles come after it.
    document.head.appendChild(style);
  }
  const css = STYLESHEETS[theme];
  if (style.textContent !== css) style.textContent = css;

  clearContrastClasses();
  const contrastClass = theme === THEME_GRUVBOX ? CONTRAST_CLASSES[contrast] : undefined;
  if (contrastClass) document.documentElement.classList.add(contrastClass);
}

/** Applies the stored theme and contrast. */
export function applyStoredTheme(store: SettingsStore) {
  applyTheme(storedTheme(store), storedContrast(store));
}

/** Removes the theme stylesheet and the contrast classes. */
export function removeTheme() {
  document.getElementById(STYLE_ELEMENT_ID)?.remove();
  clearContrastClasses();
}
