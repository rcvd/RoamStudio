/**
 * The settings applier: turns the user's customizations into token declarations
 * (design D3) in one `<style id="roamstudio-settings">`. Only settings that differ
 * from "Theme default" appear, so with every setting at its default the element
 * is absent and the theme renders exactly as it defines itself.
 */
import { SETTINGS_STYLE_ID } from "../constants";
import { colorCss, parseColorChoice } from "./color-value";
import { SETTINGS, type Lookup, type Setting } from "./schema";

/** The token declarations one setting contributes, as `[token, value]` pairs. */
export function tokenValues(setting: Setting, value: unknown): [string, string][] {
  if (value === null || setting.target.kind !== "tokens") return [];
  let css: string | undefined;
  if (setting.control === "color") {
    const choice = parseColorChoice(value);
    css = choice ? colorCss(choice) : undefined;
  } else if (setting.control !== "switch") {
    css = setting.options.find((o) => o.value === value)?.css;
  }
  return css === undefined ? [] : setting.target.tokens.map((token) => [token, css]);
}

/**
 * Links whose underline setting draws their own line (a border). Roam underlines a hovered
 * link's text as well, which would show two lines; for these the settings stylesheet sets a
 * local variable that the rule file's hover rules read (`--rs-x-<prefix>-hover-line`).
 */
const HOVER_LINES = ["page-link", "external-link", "alias", "tag", "date"];

/** `none` while a link kind has an underline of its own, `underline` when set to none. */
export function hoverLineValues(get: Lookup): [string, string][] {
  return HOVER_LINES.flatMap((prefix) => {
    const value = get(`rs-${prefix}-underline`);
    if (value === null || value === undefined) return [];
    return [[`x-${prefix}-hover-line`, value === "none" ? "underline" : "none"]];
  });
}

/** The settings stylesheet's text: empty when every setting is at its default. */
export function settingsCss(get: Lookup): string {
  const decls: string[] = [];
  let mobile = "";
  for (const setting of SETTINGS) {
    const value = get(setting.key);
    for (const [token, css] of tokenValues(setting, value)) decls.push(`  --rs-${token}: ${css};`);
    if (setting.target.kind === "mobile-font-size" && value !== null && setting.control !== "switch" && setting.control !== "color") {
      const css = setting.options.find((o) => o.value === value)?.css;
      if (css) mobile = `@media screen and (max-width: 600px) {\n  :root:root {\n    --rs-font-size: ${css};\n  }\n}\n`;
    }
  }
  for (const [name, css] of hoverLineValues(get)) decls.push(`  --rs-${name}: ${css};`);
  const root = decls.length ? `:root:root {\n${decls.join("\n")}\n}\n` : "";
  return root + mobile;
}

/** Writes the settings stylesheet, creating or removing its element as needed. */
export function applySettings(get: Lookup): void {
  const css = settingsCss(get);
  let style = document.getElementById(SETTINGS_STYLE_ID);
  if (!css) {
    style?.remove();
    return;
  }
  if (!style) {
    style = document.createElement("style");
    style.id = SETTINGS_STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== css) style.textContent = css;
}

export function removeSettings(): void {
  document.getElementById(SETTINGS_STYLE_ID)?.remove();
}
