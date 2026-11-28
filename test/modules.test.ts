import { afterEach, describe, expect, it } from "vitest";
import extension from "../src/index";
import { MODULE_CSS, applyModules, enabledModules } from "../src/components/modules";
import { STYLE_ELEMENT_ID } from "../src/constants";
import { MODULES } from "../src/settings/schema";
import { SettingsStore } from "../src/settings/store";
import type { ExtensionAPI } from "../src/types";

function api(stored: Record<string, unknown> = {}): ExtensionAPI {
  const store = new Map<string, unknown>(Object.entries(stored));
  return { settings: { get: (key) => store.get(key) ?? null, set: (key, value) => void store.set(key, value) } };
}
const lookup = (stored: Record<string, unknown>) => new SettingsStore(api(stored)).lookup;
const moduleIds = () => [...document.querySelectorAll('style[id^="roamstudio-module-"]')].map((e) => e.id.replace("roamstudio-module-", "")).sort();

afterEach(() => {
  extension.onunload();
  document.head.innerHTML = "";
  document.body.innerHTML = "";
});

describe("module loader", () => {
  it("has compiled CSS for every module switch, the icon theme and both date icons", () => {
    for (const key of [...MODULES, "icons-lucide", "date-icon", "date-icon-lucide"]) expect(MODULE_CSS[key]?.length, key).toBeGreaterThan(0);
  });

  it("switches a module's style element on and off", () => {
    applyModules(lookup({ "rs-module-masonry": true }));
    expect(moduleIds()).toEqual(["masonry"]);
    expect(document.getElementById("roamstudio-module-masonry")?.textContent).toBe(MODULE_CSS.masonry);
    applyModules(lookup({}));
    expect(moduleIds()).toEqual([]);
  });

  it("follows the icon theme for Lucide and the date icon", () => {
    expect(enabledModules(lookup({ "rs-date-icon": true }))).toEqual(["date-icon"]);
    expect(enabledModules(lookup({ "rs-date-icon": true, "rs-icon-theme": "lucide" }))).toEqual(["icons-lucide", "date-icon-lucide"]);
    expect(enabledModules(lookup({ "rs-icon-theme": "lucide" }))).toEqual(["icons-lucide"]);
    // A Feather choice from an earlier version reads as Lucide.
    expect(enabledModules(lookup({ "rs-date-icon": true, "rs-icon-theme": "feather" }))).toEqual(["icons-lucide", "date-icon-lucide"]);
  });

  it("adds the chosen collapsed-bullet style, and none for the theme's own", () => {
    expect(enabledModules(lookup({ "rs-collapsed-bullet": "ring" }))).toEqual(["collapsed-bullet-ring"]);
    expect(enabledModules(lookup({ "rs-collapsed-bullet": "intensity" }))).toEqual(["collapsed-bullet-intensity"]);
    expect(enabledModules(lookup({ "rs-collapsed-bullet": "halo" }))).toEqual([]);
    expect(enabledModules(lookup({}))).toEqual([]);
  });

  it("adds nothing while every module is off", () => {
    extension.onload({ extensionAPI: api() });
    expect(moduleIds()).toEqual([]);
  });

  it("never replaces or rewrites the theme stylesheet when modules change", () => {
    extension.onload({ extensionAPI: api() });
    const theme = document.getElementById(STYLE_ELEMENT_ID)!;
    const before = theme.textContent;
    const changes: MutationRecord[] = [];
    const observer = new MutationObserver((records) => changes.push(...records));
    observer.observe(theme, { childList: true, characterData: true, subtree: true });
    applyModules(lookup({ "rs-module-bullet-effects": true, "rs-module-done": true }));
    applyModules(lookup({ "rs-module-done": true }));
    changes.push(...observer.takeRecords());
    observer.disconnect();
    expect(changes).toEqual([]);
    expect(document.getElementById(STYLE_ELEMENT_ID)).toBe(theme);
    expect(theme.textContent).toBe(before);
    expect(moduleIds()).toEqual(["done"]);
  });

  it("loads stored modules on load and removes every module on unload", () => {
    extension.onload({ extensionAPI: api({ "rs-module-hide-logo": "true", "rs-module-masonry": true, "rs-icon-theme": "feather" }) });
    expect(moduleIds()).toEqual(["hide-logo", "icons-lucide", "masonry"]);
    extension.onunload();
    expect(moduleIds()).toEqual([]);
  });
});
