import { afterEach, describe, expect, it } from "vitest";
import extension from "../src/index";
import { SETTINGS_STYLE_ID, STYLE_ELEMENT_ID } from "../src/constants";
import { applySettings, settingsCss } from "../src/settings/apply";
import { SettingsStore } from "../src/settings/store";
import type { ExtensionAPI, PanelSetting } from "../src/types";

/** An extension API over a map; `lag` makes get() return the old value until flushed, like Roam's async store. */
function stub(stored: Record<string, unknown> = {}, { lag = false } = {}) {
  const store = new Map<string, unknown>(Object.entries(stored));
  const queued: [string, unknown][] = [];
  let panel: PanelSetting[] = [];
  const api: ExtensionAPI = {
    settings: {
      get: (key) => store.get(key) ?? null,
      set: (key, value) => {
        if (lag) queued.push([key, value]);
        else store.set(key, value);
      },
      panel: { create: (config) => void (panel = config.settings) },
    },
  };
  const flush = () => queued.splice(0).forEach(([k, v]) => store.set(k, v));
  return { api, store, flush, panel: () => panel };
}

const lookup = (values: Record<string, unknown>) => (key: string) => {
  const store = new SettingsStore(stub(values).api);
  return store.get(key);
};

afterEach(() => {
  extension.onunload();
  document.head.innerHTML = "";
  document.body.innerHTML = "";
});

describe("settings store", () => {
  it("reads unknown or malformed values as the default", () => {
    const s = new SettingsStore(stub({ "rs-theme": 42, "rs-font-size": "huge", "rs-page-link-color": "rose-650", "rs-module-masonry": "maybe" }).api);
    expect(s.get("rs-theme")).toBe("Quattro");
    expect(s.get("rs-font-size")).toBeNull();
    expect(s.get("rs-page-link-color")).toBeNull();
    expect(s.get("rs-module-masonry")).toBe(false);
  });

  it("returns a written value at once, even while Roam still returns the old one", () => {
    const { api, store, flush } = stub({ "rs-theme": "Blueprint" }, { lag: true });
    const s = new SettingsStore(api);
    s.set("rs-theme", "Gruvbox");
    expect(store.get("rs-theme")).toBe("Blueprint");
    expect(s.get("rs-theme")).toBe("Gruvbox");
    flush();
    expect(s.get("rs-theme")).toBe("Gruvbox");
  });

  it("clears values on reset and tells the listeners about each key", () => {
    const { api, store } = stub({ "rs-tag-color": "rose-600", "rs-tag-padding": "large" });
    const s = new SettingsStore(api);
    const heard: string[] = [];
    const off = s.subscribe((key) => heard.push(key));
    s.reset(["rs-tag-color", "rs-tag-padding"]);
    expect(store.get("rs-tag-color")).toBeNull();
    expect(s.get("rs-tag-padding")).toBeNull();
    expect(heard).toEqual(["rs-tag-color", "rs-tag-padding"]);
    off();
    s.set("rs-tag-radius", "heavy");
    expect(heard).toHaveLength(2);
  });

  it("rejects keys outside the schema in get, but stores them raw", () => {
    const s = new SettingsStore(stub().api);
    expect(() => s.get("rs-nope")).toThrow(/Unknown setting/);
    s.set("rs-panel-open-groups", '["theme","tags"]');
    expect(s.raw("rs-panel-open-groups")).toBe('["theme","tags"]');
  });
});

describe("settings applier", () => {
  it("writes nothing when every setting is at its default", () => {
    expect(settingsCss(lookup({}))).toBe("");
  });

  it.each([
    ["rs-page-link-color", "rose-600", "--rs-page-link-color: light-dark(#e11d48, #fb7185);"],
    ["rs-page-link-color", "accent", "--rs-page-link-color: var(--rs-accent);"],
    ["rs-h2-color", "emerald-600", "--rs-h2-color: light-dark(#059669, #34d399);"],
    ["rs-tag-background", "gray-200", "--rs-tag-background: light-dark(#e5e7eb, #1f2937);"],
    ["rs-font-size", "l", "--rs-font-size: 16px;"],
    ["rs-line-spacing", "small", "--rs-line-height: calc(var(--rs-font-size, 15px) + 6px);"],
    ["rs-h2-size", "l", "--rs-h2-size: 2.4rem;"],
    ["rs-heading-spacing", "medium", "--rs-heading-spacing: 0.5;"],
    ["rs-page-link-underline", "fat", "--rs-page-link-underline: 3px solid;"],
    ["rs-block-ref-weight", "bold", "--rs-block-ref-weight: 700;"],
    ["rs-tag-padding", "medium", "--rs-tag-padding: 2px 5px;"],
    ["rs-tag-radius", "heavy", "--rs-tag-radius: 10px;"],
    ["rs-date-size", "xl", "--rs-date-size: 1.1rem;"],
    ["rs-font-main", "lato", "--rs-font-main: Lato, sans-serif;"],
    ["rs-code-size", "s", "--rs-code-size: 14px;"],
  ])("%s = %s", (key, value, decl) => {
    const css = settingsCss(lookup({ [key]: value }));
    expect(css).toBe(`:root:root {\n  ${decl}\n}\n`);
  });

  it("writes the code font to code blocks, inline code and hotkeys", () => {
    const css = settingsCss(lookup({ "rs-font-code": "inconsolata" }));
    for (const token of ["font-code", "font-code-block", "font-code-ui"]) expect(css).toContain(`--rs-${token}: Inconsolata, monospace;`);
  });

  it("sets the mobile font size for narrow screens only", () => {
    const css = settingsCss(lookup({ "rs-font-size": "m", "rs-font-size-mobile": "xl" }));
    expect(css).toBe(":root:root {\n  --rs-font-size: 15px;\n}\n@media screen and (max-width: 600px) {\n  :root:root {\n    --rs-font-size: 17px;\n  }\n}\n");
  });

  it("ignores switches, the theme and invalid values", () => {
    expect(settingsCss(lookup({ "rs-module-masonry": true, "rs-theme": "Gruvbox", "rs-tag-padding": "huge" }))).toBe("");
  });

  it("creates, updates and removes its element", () => {
    applySettings(lookup({ "rs-tag-radius": "heavy" }));
    expect(document.getElementById(SETTINGS_STYLE_ID)?.textContent).toContain("--rs-tag-radius: 10px;");
    applySettings(lookup({}));
    expect(document.getElementById(SETTINGS_STYLE_ID)).toBeNull();
  });
});

describe("settings in the extension's lifecycle", () => {
  it("applies stored customizations on load, after the theme stylesheet", () => {
    extension.onload({ extensionAPI: stub({ "rs-page-link-color": "violet-600" }).api });
    const theme = document.getElementById(STYLE_ELEMENT_ID)!;
    const settings = document.getElementById(SETTINGS_STYLE_ID)!;
    expect(settings.textContent).toContain("--rs-page-link-color: light-dark(#7c3aed, #a78bfa);");
    expect(theme.compareDocumentPosition(settings) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("removes the settings element on unload", () => {
    extension.onload({ extensionAPI: stub({ "rs-tag-radius": "heavy" }).api });
    expect(document.getElementById(SETTINGS_STYLE_ID)).not.toBeNull();
    extension.onunload();
    expect(document.getElementById(SETTINGS_STYLE_ID)).toBeNull();
  });
});
