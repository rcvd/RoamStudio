import { afterEach, describe, expect, it } from "vitest";
import extension from "../src/index";
import { FONT_CSS, applyFonts, requiredFonts, settingFonts } from "../src/components/fonts";
import { FONTS_STYLE_ID } from "../src/constants";
import { SettingsStore } from "../src/settings/store";
import type { ExtensionAPI } from "../src/types";

function api(stored: Record<string, unknown> = {}): ExtensionAPI {
  const store = new Map<string, unknown>(Object.entries(stored));
  return { settings: { get: (key) => store.get(key) ?? null, set: (key, value) => void store.set(key, value) } };
}
const lookup = (stored: Record<string, unknown>) => new SettingsStore(api(stored)).lookup;
const fontsText = () => document.getElementById(FONTS_STYLE_ID)?.textContent ?? "";

afterEach(() => {
  extension.onunload();
  document.head.innerHTML = "";
});

describe("embedded fonts", () => {
  it("embed every family offline: each source is a WOFF2 data URL", () => {
    for (const [family, css] of Object.entries(FONT_CSS)) {
      const sources = [...css.matchAll(/src:\s*url\("([^"]{0,40})/g)].map((m) => m[1]);
      expect(sources.length, family).toBeGreaterThanOrEqual(2);
      for (const src of sources) expect(src.startsWith("data:font/woff2;base64,"), family).toBe(true);
      expect(css).toContain(`font-family: "${family}";`);
    }
  });

  it("offer every family a font setting can choose, except Inter, which Roam ships", () => {
    const chosen = ["rs-font-main", "rs-font-heading", "rs-font-code"].flatMap((key) => ["avenir", "ia-quattro", "ibarra", "inter", "lato", "system", "ia-mono", "inconsolata", "roboto-mono"].flatMap((v) => settingFonts(lookup({ [key]: v }))));
    for (const family of new Set(chosen)) expect(FONT_CSS[family], family).toBeDefined();
    expect(FONT_CSS.Inter).toBeUndefined();
  });

  it("load the theme's fonts and drop them when the theme no longer uses them", () => {
    const quattroLike = ["iA Writer Quattro S", "iA Writer Mono S"];
    applyFonts(requiredFonts(quattroLike, lookup({})));
    expect(fontsText()).toContain('font-family: "iA Writer Quattro S"');
    applyFonts(requiredFonts(["Roboto Mono"], lookup({})));
    expect(fontsText()).not.toContain("iA Writer Quattro S");
    expect(fontsText()).toContain('font-family: "Roboto Mono"');
  });

  it("add the family a font setting chooses, and nothing for the system stack or Inter", () => {
    expect(requiredFonts([], lookup({ "rs-font-main": "lato", "rs-font-code": "inconsolata" }))).toEqual(["Lato", "Inconsolata"]);
    expect(requiredFonts([], lookup({ "rs-font-main": "system", "rs-font-heading": "inter" }))).toEqual([]);
  });

  it("add no element without fonts, and remove it on unload", () => {
    extension.onload({ extensionAPI: api({ "rs-theme": "Blueprint" }) });
    expect(document.getElementById(FONTS_STYLE_ID)).toBeNull();
    extension.onunload();
    // The default theme, Quattro, brings its iA Writer fonts.
    extension.onload({ extensionAPI: api() });
    expect(fontsText()).toContain('font-family: "iA Writer Quattro S"');
    extension.onunload();
    extension.onload({ extensionAPI: api({ "rs-font-heading": "ibarra" }) });
    expect(fontsText()).toContain('font-family: "Ibarra Real Nova"');
    extension.onunload();
    expect(document.getElementById(FONTS_STYLE_ID)).toBeNull();
  });
});
