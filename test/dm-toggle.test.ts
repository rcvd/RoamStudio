import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  createToggle,
  destroyToggle,
  setAppearance,
  toggleAppearance,
} from "../src/components/dm-toggle";
import {
  APPEARANCE_AUTO,
  APPEARANCE_DARK,
  APPEARANCE_LIGHT,
  CSS_CLASS_ICON,
  CSS_CLASS_TOGGLE,
  SETTING_APPEARANCE,
} from "../src/constants";
import { SettingsStore } from "../src/settings/store";
import type { ExtensionAPI } from "../src/types";

function stubExtensionAPI(mode?: string): ExtensionAPI & { store: Map<string, unknown> } {
  const store = new Map<string, unknown>();
  if (mode) store.set(SETTING_APPEARANCE, mode);
  return {
    store,
    settings: {
      get: (key) => store.get(key) ?? null,
      set: (key, value) => {
        store.set(key, value);
      },
    },
  };
}

function mountTopbar() {
  document.body.innerHTML =
    '<div class="rm-topbar"><span class="first"></span><span class="last"></span></div>';
}

const html = () => document.documentElement.classList;
const icon = () => document.querySelector(`.${CSS_CLASS_ICON}`);

beforeEach(() => {
  mountTopbar();
});

afterEach(() => {
  destroyToggle();
  html().remove("bp3-dark", "bp3-light");
  document.body.innerHTML = "";
});

describe("theme classes are cleaned before applying new mode", () => {
  it("Dark → Auto leaves no appearance class", () => {
    createToggle(new SettingsStore(stubExtensionAPI(APPEARANCE_DARK)));
    setAppearance(APPEARANCE_AUTO);
    expect(html().contains("bp3-dark")).toBe(false);
    expect(html().contains("bp3-light")).toBe(false);
  });

  it("Light → Dark leaves only bp3-dark", () => {
    createToggle(new SettingsStore(stubExtensionAPI(APPEARANCE_LIGHT)));
    setAppearance(APPEARANCE_DARK);
    expect(html().contains("bp3-light")).toBe(false);
    expect(html().contains("bp3-dark")).toBe(true);
  });

  it("Auto → Light leaves only bp3-light", () => {
    createToggle(new SettingsStore(stubExtensionAPI(APPEARANCE_AUTO)));
    setAppearance(APPEARANCE_LIGHT);
    expect(html().contains("bp3-dark")).toBe(false);
    expect(html().contains("bp3-light")).toBe(true);
  });
});

describe("mode cycling Auto → Dark → Light → Auto", () => {
  it.each([
    [APPEARANCE_AUTO, APPEARANCE_DARK],
    [APPEARANCE_DARK, APPEARANCE_LIGHT],
    [APPEARANCE_LIGHT, APPEARANCE_AUTO],
  ])("%s → %s and persists it", (from, to) => {
    const api = stubExtensionAPI(from);
    const store = new SettingsStore(api);
    createToggle(store);
    toggleAppearance(store);
    expect(api.store.get(SETTING_APPEARANCE)).toBe(to);
  });

  it("clicking the button cycles the mode", () => {
    const api = stubExtensionAPI(APPEARANCE_AUTO);
    createToggle(new SettingsStore(api));
    (icon()?.parentElement as HTMLElement).click();
    expect(api.store.get(SETTING_APPEARANCE)).toBe(APPEARANCE_DARK);
    expect(html().contains("bp3-dark")).toBe(true);
  });
});

describe("toggle button mounts in Roam top bar", () => {
  it("creates a single button", () => {
    createToggle(new SettingsStore(stubExtensionAPI()));
    expect(document.querySelectorAll(`.${CSS_CLASS_ICON}`)).toHaveLength(1);
  });

  it("a second call is a no-op", () => {
    const store = new SettingsStore(stubExtensionAPI());
    createToggle(store);
    const before = document.body.innerHTML;
    createToggle(store);
    expect(document.body.innerHTML).toBe(before);
  });
});

describe("toggle button shows correct icon for current mode", () => {
  it.each([
    [APPEARANCE_AUTO, "bp3-icon-clean"],
    [APPEARANCE_DARK, "bp3-icon-moon"],
    [APPEARANCE_LIGHT, "bp3-icon-flash"],
  ])("%s shows %s", (mode, iconClass) => {
    createToggle(new SettingsStore(stubExtensionAPI(mode)));
    expect(icon()?.classList.contains(iconClass)).toBe(true);
  });
});

describe("toggle can be destroyed", () => {
  it("removes all toggle elements", () => {
    createToggle(new SettingsStore(stubExtensionAPI()));
    destroyToggle();
    expect(document.querySelectorAll(`.${CSS_CLASS_TOGGLE}`)).toHaveLength(0);
  });

  it("is safe when nothing is mounted", () => {
    expect(() => destroyToggle()).not.toThrow();
  });
});

describe("appearance is applied without a mounted toggle button", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("forced Dark without top bar", () => {
    expect(() => createToggle(new SettingsStore(stubExtensionAPI(APPEARANCE_DARK)))).not.toThrow();
    expect(html().contains("bp3-dark")).toBe(true);
  });

  it("forced Light without top bar", () => {
    expect(() => createToggle(new SettingsStore(stubExtensionAPI(APPEARANCE_LIGHT)))).not.toThrow();
    expect(html().contains("bp3-light")).toBe(true);
  });

  it("Auto without top bar", () => {
    createToggle(new SettingsStore(stubExtensionAPI(APPEARANCE_AUTO)));
    expect(html().contains("bp3-dark")).toBe(false);
    expect(html().contains("bp3-light")).toBe(false);
  });
});

describe("destroy removes appearance classes", () => {
  it.each([APPEARANCE_DARK, APPEARANCE_LIGHT])("after %s", (mode) => {
    createToggle(new SettingsStore(stubExtensionAPI(mode)));
    destroyToggle();
    expect(html().contains("bp3-dark")).toBe(false);
    expect(html().contains("bp3-light")).toBe(false);
  });
});
