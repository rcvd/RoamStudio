/**
 * Roam Studio — Roam Research theme extension entry point.
 *
 * The compiled themes (`themes/<name>.css`, produced by `npx gulp css`) are bundled
 * as strings by webpack; the selected one is injected as a `<style>` element (see
 * components/theme.ts). The user's customizations are token declarations in a
 * second element (settings/apply.ts).
 *
 * Every setting is read through the settings store (settings/store.ts). Nothing is
 * written on load: a setting that is not stored is at its default, so a fresh
 * install and a reset group look the same. Every change, from the panel or the
 * top-bar toggle, goes through the store, whose listener applies it.
 *
 * Exports `{ onload, onunload }` as a default module (Roam Depot convention).
 */
import { createToggle, destroyToggle, setAppearance } from "./components/dm-toggle";
import { applyFonts, removeFonts, requiredFonts } from "./components/fonts";
import { applyModules, removeModules } from "./components/modules";
import { THEME_FONTS, applyStoredTheme, removeTheme, storedTheme } from "./components/theme";
import { SETTING_APPEARANCE, SETTING_COLLAPSED_BULLET, SETTING_GRUVBOX_CONTRAST, SETTING_ICON_THEME, SETTING_OPEN_GROUPS, SETTING_THEME } from "./constants";
import { createSettingsPanel } from "./panel/register";
import { applySettings, removeSettings } from "./settings/apply";
import { SettingsStore } from "./settings/store";
import type { OnloadArgs } from "./types";

let unsubscribe: (() => void) | null = null;

/** Loads the embedded fonts the theme and the font settings use. */
const applyStoredFonts = (store: SettingsStore) => applyFonts(requiredFonts(THEME_FONTS[storedTheme(store)], store.lookup));

/** Applies what a changed setting affects. */
function applyChange(store: SettingsStore, key: string) {
  if (key === SETTING_OPEN_GROUPS) return; // panel state only
  if (key === SETTING_THEME || key === SETTING_GRUVBOX_CONTRAST) {
    applyStoredTheme(store);
    applyStoredFonts(store);
    // Phosphor's weight follows the theme.
    applyModules(store.lookup);
  } else if (key === SETTING_APPEARANCE) setAppearance(String(store.get(SETTING_APPEARANCE)));
  else if (key.startsWith("rs-module-") || key === SETTING_ICON_THEME || key === SETTING_COLLAPSED_BULLET || key === "rs-date-icon") applyModules(store.lookup);
  else {
    applySettings(store.lookup);
    applyStoredFonts(store);
  }
}

/**
 * Roam Depot onload hook.
 * Injects the selected theme and the customizations, creates the settings panel
 * and mounts the dark/light mode toggle in the top bar.
 */
function onload({ extensionAPI }: OnloadArgs) {
  unsubscribe?.();
  const store = new SettingsStore(extensionAPI);
  applyStoredTheme(store);
  applySettings(store.lookup);
  applyModules(store.lookup);
  applyStoredFonts(store);
  unsubscribe = store.subscribe((key) => applyChange(store, key));
  createSettingsPanel(extensionAPI, store);
  createToggle(store);
}

/**
 * Roam Depot onunload hook.
 * Removes the theme stylesheet, the customizations, the modules, the contrast
 * classes and the dark/light mode toggle from the DOM.
 */
function onunload() {
  unsubscribe?.();
  unsubscribe = null;
  removeFonts();
  removeModules();
  removeSettings();
  removeTheme();
  destroyToggle();
}

export default {
  onload: onload,
  onunload: onunload,
};
