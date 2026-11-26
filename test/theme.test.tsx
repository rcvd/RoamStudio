import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import extension from "../src/index";
import { APPEARANCE_DARK, CSS_CLASS_GRUVBOX_HARD, CSS_CLASS_GRUVBOX_SOFT, SETTING_APPEARANCE, SETTING_GRUVBOX_CONTRAST, SETTING_THEME, STYLE_ELEMENT_ID, THEMES } from "../src/constants";
import type { ExtensionAPI } from "../src/types";
import { chooseSegment, chooseTheme, load, q, qa, setting } from "./helpers";

// Fixed paths: Vite rewrites `new URL()` with a template string into a glob import.
const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));
const blueprint = readFileSync(here("../src/themes/blueprint.css"), "utf8");
const gruvbox = readFileSync(here("../src/themes/gruvbox.css"), "utf8");
const quattro = readFileSync(here("../src/themes/quattro.css"), "utf8");

const styles = () => document.querySelectorAll(`#${STYLE_ELEMENT_ID}`);
const styleText = () => document.getElementById(STYLE_ELEMENT_ID)?.textContent;
const hasClass = (cls: string) => document.documentElement.classList.contains(cls);

let current: ReturnType<typeof load> | null = null;
afterEach(() => {
  current?.unmount();
  current = null;
  extension.onunload();
  document.body.innerHTML = "";
});

describe("theme selection", () => {
  it("injects Quattro, the default, without a contrast class when nothing is stored, and stores nothing", () => {
    current = load();
    expect(styleText()).toBe(quattro);
    expect(hasClass(CSS_CLASS_GRUVBOX_HARD) || hasClass(CSS_CLASS_GRUVBOX_SOFT)).toBe(false);
    expect(current.store.size).toBe(0);
  });

  it("applies a stored Gruvbox with hard contrast", () => {
    current = load({ [SETTING_THEME]: "Gruvbox", [SETTING_GRUVBOX_CONTRAST]: "hard" });
    expect(styleText()).toBe(gruvbox);
    expect(hasClass(CSS_CLASS_GRUVBOX_HARD)).toBe(true);
  });

  it("offers every theme, and the contrasts once Gruvbox is chosen", () => {
    current = load();
    expect(qa("option", setting(SETTING_THEME)).map((o) => o.textContent)).toEqual([...THEMES]);
    chooseTheme("Gruvbox");
    expect(qa("button", setting(SETTING_GRUVBOX_CONTRAST)).map((b) => b.textContent)).toEqual(["medium", "hard", "soft"]);
  });

  it("switches the theme in the single style element and keeps the appearance mode", () => {
    current = load({ [SETTING_APPEARANCE]: APPEARANCE_DARK });
    const element = document.getElementById(STYLE_ELEMENT_ID);
    chooseTheme("Gruvbox");
    expect(styles()).toHaveLength(1);
    expect(document.getElementById(STYLE_ELEMENT_ID)).toBe(element);
    expect(styleText()).toBe(gruvbox);
    expect(current.store.get(SETTING_THEME)).toBe("Gruvbox");
    expect(hasClass("bp3-dark")).toBe(true);
    chooseTheme("Blueprint");
    expect(styleText()).toBe(blueprint);
  });

  it("changes the contrast class without touching the stylesheet", () => {
    current = load({ [SETTING_THEME]: "Gruvbox" });
    chooseSegment(SETTING_GRUVBOX_CONTRAST, "soft");
    expect(hasClass(CSS_CLASS_GRUVBOX_SOFT)).toBe(true);
    expect(styleText()).toBe(gruvbox);
    chooseSegment(SETTING_GRUVBOX_CONTRAST, "hard");
    expect(hasClass(CSS_CLASS_GRUVBOX_SOFT)).toBe(false);
    expect(hasClass(CSS_CLASS_GRUVBOX_HARD)).toBe(true);
  });

  it("applies a contrast stored while another theme was active once Gruvbox is chosen", () => {
    current = load({ [SETTING_GRUVBOX_CONTRAST]: "soft" });
    expect(hasClass(CSS_CLASS_GRUVBOX_SOFT)).toBe(false);
    expect(styleText()).toBe(quattro);
    chooseTheme("Gruvbox");
    expect(hasClass(CSS_CLASS_GRUVBOX_SOFT)).toBe(true);
  });

  it("falls back to the default theme for an unknown stored theme", () => {
    current = load({ [SETTING_THEME]: "Solarized" });
    expect(styleText()).toBe(quattro);
    expect(q<HTMLSelectElement>("select", setting(SETTING_THEME)).value).toBe("Quattro");
  });

  it("works without a settings panel", () => {
    const store = new Map<string, unknown>([[SETTING_THEME, "Gruvbox"]]);
    const extensionAPI: ExtensionAPI = { settings: { get: (key) => store.get(key) ?? null, set: (key, value) => void store.set(key, value) } };
    extension.onload({ extensionAPI });
    expect(styleText()).toBe(gruvbox);
  });

  it("onunload removes the style element and both contrast classes", () => {
    current = load({ [SETTING_THEME]: "Gruvbox", [SETTING_GRUVBOX_CONTRAST]: "soft" });
    current.unmount();
    current = null;
    extension.onunload();
    expect(styles()).toHaveLength(0);
    expect(hasClass(CSS_CLASS_GRUVBOX_SOFT) || hasClass(CSS_CLASS_GRUVBOX_HARD)).toBe(false);
  });
});
