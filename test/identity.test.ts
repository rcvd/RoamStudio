import { afterEach, describe, expect, it } from "vitest";
import extension from "../src/index";
import { SETTING_APPEARANCE, SETTING_GRUVBOX_CONTRAST, SETTING_THEME, STYLE_ELEMENT_ID } from "../src/constants";
import type { ExtensionAPI } from "../src/types";

/** An extension API over an in-memory store that records every write. */
function stub(stored: Record<string, string> = {}) {
  const store = new Map<string, unknown>(Object.entries(stored));
  const writes: string[] = [];
  let tabTitle = "";
  const extensionAPI: ExtensionAPI = {
    settings: {
      get: (key) => store.get(key) ?? null,
      set: (key, value) => {
        writes.push(key);
        store.set(key, value);
      },
      panel: { create: (config) => void (tabTitle = config.tabTitle) },
    },
  };
  return { extensionAPI, store, writes, tabTitle: () => tabTitle };
}

/** Every id and class on the page, plus the classes on <html>. */
function namesOnPage(): string[] {
  const names: string[] = [...document.documentElement.classList];
  for (const el of document.querySelectorAll("*")) {
    if (el.id) names.push(el.id);
    names.push(...el.classList);
  }
  return names;
}

afterEach(() => {
  extension.onunload();
  document.body.innerHTML = "";
});

describe("Roam Studio identity", () => {
  it("titles the settings tab Roam Studio", () => {
    const { extensionAPI, tabTitle } = stub();
    extension.onload({ extensionAPI });
    expect(tabTitle()).toBe("Roam Studio");
  });

  it("stores no setting on a fresh load", () => {
    document.body.innerHTML = '<div class="rm-topbar"><span></span></div>';
    const { extensionAPI, writes } = stub();
    extension.onload({ extensionAPI });
    expect(writes).toEqual([]);
  });

  it("adds only roamstudio-prefixed ids and classes besides Roam's appearance classes", () => {
    document.body.innerHTML = '<div class="rm-topbar"><span></span></div>';
    const before = new Set(namesOnPage());
    const { extensionAPI } = stub({ [SETTING_THEME]: "Gruvbox", [SETTING_GRUVBOX_CONTRAST]: "hard", [SETTING_APPEARANCE]: "Dark" });
    extension.onload({ extensionAPI });
    const added = namesOnPage().filter((n) => !before.has(n));
    // BlueprintJS classes on the toggle button belong to Roam's own button styling.
    const own = added.filter((n) => !/^bp3-/.test(n) && n !== "rm-topbar__spacer-sm");
    expect(own.length).toBeGreaterThan(0);
    expect(own.filter((n) => !n.startsWith("roamstudio"))).toEqual([]);
    expect(added.filter((n) => /blueprint/i.test(n))).toEqual([]);
    expect(document.getElementById(STYLE_ELEMENT_ID)).not.toBeNull();
  });

  it("uses rs- keys and ignores the old Roam Studio and Blueprint settings", () => {
    document.body.innerHTML = '<div class="rm-topbar"><span></span></div>';
    const { extensionAPI } = stub({ "css-theme": "Craft", "css-appearance": "Dark", "bp-theme": "Gruvbox", "bp-appearance": "Dark" });
    extension.onload({ extensionAPI });
    expect([SETTING_THEME, SETTING_APPEARANCE, SETTING_GRUVBOX_CONTRAST].every((k) => k.startsWith("rs-"))).toBe(true);
    expect(document.getElementById(STYLE_ELEMENT_ID)?.textContent).not.toContain("gruvbox-bg-dark");
    expect(document.documentElement.classList.contains("bp3-dark")).toBe(false);
  });
});
