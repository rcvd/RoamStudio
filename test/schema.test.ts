import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { FAMILIES, PICKER_SHADES } from "../src/settings/colors";
import { GROUPS, MODULES, SETTINGS, defaultValue, groupOf, readValue, settingByKey, type ChoiceSetting, type Setting } from "../src/settings/schema";

// The project token list, outside the plugin (Vite rewrites `new URL()` for such paths).
const tokens = JSON.parse(readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../../src/roam/tokens.json"), "utf8")) as Record<string, unknown>;
const labelsIn = (groupTitle: string) => GROUPS.find((g) => g.title === groupTitle)!.sections.flatMap((s) => s.settings.map((x) => x.label));
const choice = (key: string) => settingByKey(key) as ChoiceSetting;
const optionLabels = (key: string) => choice(key).options.map((o) => o.label);

describe("settings schema", () => {
  it("lists the groups in the settings-panel order", () => {
    expect(GROUPS.map((g) => g.title)).toEqual([
      "Theme & Appearance", "Typography", "Headings", "Code", "Links", "Tags", "Dates",
      "Sidebars & Top Bar", "Blocks & Content", "Mobile", "Performance",
    ]);
  });

  it("puts every setting in exactly one group, under a unique rs- key", () => {
    const keys = SETTINGS.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
    expect(keys.filter((k) => !k.startsWith("rs-"))).toEqual([]);
    for (const k of keys) expect(groupOf(k)).toBeDefined();
  });

  it("targets only tokens that src/roam/tokens.json defines", () => {
    const targets = SETTINGS.flatMap((s) => (s.target.kind === "tokens" ? s.target.tokens : []));
    expect(targets.length).toBeGreaterThan(40);
    expect(targets.filter((t) => !(t in tokens))).toEqual([]);
  });

  it("assigns the groups' settings as the spec lists them", () => {
    expect(labelsIn("Theme & Appearance")).toEqual(["Theme", "Appearance", "Gruvbox contrast", "Icon theme"]);
    expect(labelsIn("Typography")).toEqual(["Font family", "Base font size", "Line spacing"]);
    expect(labelsIn("Headings")).toEqual(["Heading font", "Heading spacing", "Advanced heading spacing", "Heading 1 size", "Heading 1 color", "Heading 2 size", "Heading 2 color", "Heading 3 size", "Heading 3 color"]);
    expect(labelsIn("Code")).toEqual(["Code font", "Code font size", "Hide line numbers"]);
    expect(GROUPS.find((g) => g.id === "links")!.sections.map((s) => [s.title, s.settings.map((x) => x.label)])).toEqual(
      ["Page links", "External links", "Reference links", "Block references"].map((t) => [t, ["Color", "Underline", "Underline color", "Weight"]]),
    );
    expect(labelsIn("Tags")).toEqual(["Color", "Background", "Padding", "Underline", "Underline color", "Font size", "Corner radius"]);
    expect(labelsIn("Dates")).toEqual(["Color", "Background", "Padding", "Underline", "Underline color", "Font size", "Corner radius", "Date icons", "No line break within dates"]);
    expect(labelsIn("Sidebars & Top Bar")).toEqual(["Hide logo", "Hide shortcuts heading", "Hide sidebar icons", "Masonry sidebar", "Remove sidebar borders", "Remove top bar borders", "Centered search", "Enhanced search"]);
    expect(labelsIn("Blocks & Content")).toEqual(["Collapsed bullets", "Bullet effects", "Subtle controls", "More room", "Strike done todos", "Dynamic image sizes", "Dynamic PDF sizes", "Remove log page minimum height"]);
    expect(labelsIn("Mobile")).toEqual(["Mobile font size", "Mobile caret", "Mobile sidebar"]);
    expect(labelsIn("Performance")).toEqual(["Disable animations"]);
  });
});

describe("every option of the previous Roam Studio", () => {
  // The option lists of external/RoamStudio/roamjs-roamstudio/src/build.ts.
  it("offers its fonts", () => {
    expect(optionLabels("rs-font-main")).toEqual(["Avenir Next, Nunito Sans", "iA Writer Quattro S", "Ibarra Real Nova", "Inter", "Lato", "System font stack"]);
    expect(optionLabels("rs-font-heading")).toEqual(optionLabels("rs-font-main"));
    expect(optionLabels("rs-font-code")).toEqual(["iA Writer Mono S", "Inconsolata", "Roboto Mono", "System monospace stack"]);
  });

  it("offers its sizes, spacings and shapes", () => {
    const steps = (key: string) => choice(key).options.map((o) => o.label.replace(/ \(.*\)$/, ""));
    for (const key of ["rs-font-size", "rs-font-size-mobile", "rs-code-size"]) expect(steps(key)).toEqual(["extra small", "small", "medium", "large", "extra large"]);
    expect(steps("rs-line-spacing")).toEqual(["small", "medium", "large"]);
    expect(steps("rs-heading-spacing")).toEqual(["small", "medium", "large"]);
    for (const n of [1, 2, 3]) expect(steps(`rs-h${n}-size`)).toEqual(["text", "extra small", "small", "medium", "large", "extra large"]);
    for (const p of ["page-link", "external-link", "alias", "block-ref"]) {
      expect(steps(`rs-${p}-underline`)).toEqual(["none", "dotted", "thin", "medium", "fat"]);
      expect(steps(`rs-${p}-weight`)).toEqual(["normal", "bold"]);
    }
    for (const p of ["tag", "date"]) {
      expect(steps(`rs-${p}-padding`)).toEqual(["none", "slight", "medium", "large"]);
      expect(steps(`rs-${p}-size`)).toEqual(["text", "extra small", "small", "medium", "large", "extra large"]);
      expect(steps(`rs-${p}-radius`)).toEqual(["none", "slight", "medium", "heavy"]);
    }
  });

  it("offers its colors: every family at the seven lightness steps, and the accent", () => {
    expect(FAMILIES).toEqual(["rose", "pink", "fuchsia", "purple", "violet", "indigo", "blue", "sky", "cyan", "teal", "emerald", "green", "lime", "yellow", "amber", "orange", "red", "gray"]);
    expect(PICKER_SHADES).toEqual([100, 200, 300, 500, 600, 800, 900]);
    const colors = SETTINGS.filter((s) => s.control === "color").map((s) => s.key);
    expect(colors).toEqual(expect.arrayContaining(["rs-h1-color", "rs-h2-color", "rs-h3-color", "rs-page-link-color", "rs-external-link-color", "rs-alias-color", "rs-block-ref-color", "rs-tag-color", "rs-tag-background", "rs-date-color", "rs-date-background"]));
  });

  it("offers every module and the icon theme", () => {
    const previous = ["advanced-heading-spacing", "bullet-effects", "centered-search", "done", "dynamic-images", "dynamic-pdfs", "hide-line-numbers", "hide-logo", "hide-shortcuts",
      "hide-sidebar-icons", "masonry", "logpage-no-min-height", "mobile-caret", "mobile-sidebar", "more-room", "no-animations", "subtle-controls", "non-breakable-dates", "topbar-borders", "sidebar-borders"];
    expect(MODULES).toEqual(expect.arrayContaining(previous));
    expect(choice("rs-icon-theme").options.map((o) => o.value)).toEqual(["blueprint", "lucide", "phosphor"]);
    expect(choice("rs-icon-theme").options.map((o) => o.label)).toEqual(["BlueprintJS (Roam's icons)", "Lucide", "Phosphor"]);
    expect(settingByKey("rs-date-icon")?.control).toBe("switch");
  });
});

describe("stored values", () => {
  const theme = settingByKey("rs-theme") as Setting;
  const size = settingByKey("rs-font-size") as Setting;
  const linkColor = settingByKey("rs-page-link-color") as Setting;
  const masonry = settingByKey("rs-module-masonry") as Setting;

  it("read valid values as stored", () => {
    expect(readValue(theme, "Gruvbox")).toBe("Gruvbox");
    expect(readValue(size, "l")).toBe("l");
    expect(readValue(linkColor, "rose-600")).toBe("rose-600");
    expect(readValue(linkColor, "accent")).toBe("accent");
    // Feather (no longer offered) reads as Lucide, its maintained fork.
    expect(readValue(settingByKey("rs-icon-theme") as Setting, "feather")).toBe("lucide");
    expect(readValue(settingByKey("rs-icon-theme") as Setting, "lucide")).toBe("lucide");
    expect(readValue(theme, "feather")).toBe("Quattro");
    expect(readValue(masonry, true)).toBe(true);
    expect(readValue(masonry, "true")).toBe(true);
  });

  it("read missing, unknown or malformed values as the default", () => {
    expect(readValue(theme, "Solarized")).toBe(defaultValue(theme));
    expect(readValue(size, "huge")).toBeNull();
    expect(readValue(linkColor, "rose-650")).toBeNull();
    expect(readValue(linkColor, "salmon-600")).toBeNull();
    expect(readValue(linkColor, { family: "rose" })).toBeNull();
    expect(readValue(masonry, "yes")).toBe(false);
    expect(readValue(masonry, undefined)).toBe(false);
  });
});
