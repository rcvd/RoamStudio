/**
 * The settings of Roam Studio: one definition that the settings panel, the
 * settings applier, the module loader and the tests share.
 *
 * Every setting is stored under its `key` (always `rs-…`). A setting that is not
 * stored is at its default; for most settings that is "Theme default", which
 * defines nothing, so the active theme's own value applies. Values that are not
 * valid read as the default (see `readValue`).
 */
import {
  APPEARANCES,
  APPEARANCE_AUTO,
  CONTRASTS,
  CONTRAST_MEDIUM,
  SETTING_APPEARANCE,
  SETTING_GRUVBOX_CONTRAST,
  SETTING_COLLAPSED_BULLET,
  SETTING_ICON_THEME,
  SETTING_THEME,
  THEMES,
  THEME_DEFAULT,
  THEME_GRUVBOX,
} from "../constants";
import { parseColorChoice } from "./color-value";

export type SettingValue = string | boolean | null;
/** Reads a setting's effective value (stored or default) by key. */
export type Lookup = (key: string) => SettingValue;

export interface Option {
  value: string;
  label: string;
  /** The token value this option sets (choice settings with token targets). */
  css?: string;
  /** Embedded font family this option needs (font settings). */
  font?: string;
}

interface Base {
  key: string;
  label: string;
  description: string;
  /** Hidden while this returns false (`settings-panel`: controls show only when they apply). */
  visible?: (get: Lookup) => boolean;
}

/** A choice from a list; `null` (not stored) is "Theme default" when `themeDefault` is set. */
export interface ChoiceSetting extends Base {
  control: "select" | "segmented" | "font";
  options: Option[];
  themeDefault: boolean;
  /** Used when nothing valid is stored and there is no theme default. */
  fallback?: string;
  target: TokenTarget | { kind: "theme" } | { kind: "appearance" } | { kind: "contrast" } | { kind: "icon-theme" } | { kind: "collapsed-bullet" } | { kind: "mobile-font-size" };
}

/** A color from the picker (`color-selection`); `null` is "Theme default". */
export interface ColorSetting extends Base {
  control: "color";
  target: TokenTarget;
}

/** An on/off switch: a module, or the date icon. */
export interface SwitchSetting extends Base {
  control: "switch";
  target: { kind: "module"; module: string } | { kind: "date-icon" };
}

export interface TokenTarget {
  kind: "tokens";
  /** Every token the value is written to. */
  tokens: string[];
}

export type Setting = ChoiceSetting | ColorSetting | SwitchSetting;

export interface Section {
  /** Sub-section title, for groups with several parts (Links). */
  title?: string;
  settings: Setting[];
}

export interface Group {
  id: string;
  title: string;
  sections: Section[];
}

// ---------------------------------------------------------------- option lists

const SYSTEM_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const SYSTEM_MONO = 'Menlo, Consolas, Monaco, "Liberation Mono", "Lucida Console", monospace';

export const TEXT_FONTS: Option[] = [
  { value: "avenir", label: "Avenir Next, Nunito Sans", css: '"Avenir Next", "Nunito Sans", sans-serif', font: "Nunito Sans" },
  { value: "ia-quattro", label: "iA Writer Quattro S", css: '"iA Writer Quattro S", sans-serif', font: "iA Writer Quattro S" },
  { value: "ibarra", label: "Ibarra Real Nova", css: '"Ibarra Real Nova", serif', font: "Ibarra Real Nova" },
  // Inter needs no embedding: Roam ships it for its own UI.
  { value: "inter", label: "Inter", css: "Inter, sans-serif" },
  { value: "lato", label: "Lato", css: "Lato, sans-serif", font: "Lato" },
  { value: "system", label: "System font stack", css: SYSTEM_SANS },
];

export const CODE_FONTS: Option[] = [
  { value: "ia-mono", label: "iA Writer Mono S", css: '"iA Writer Mono S", monospace', font: "iA Writer Mono S" },
  { value: "inconsolata", label: "Inconsolata", css: "Inconsolata, monospace", font: "Inconsolata" },
  { value: "roboto-mono", label: "Roboto Mono", css: '"Roboto Mono", monospace', font: "Roboto Mono" },
  { value: "system", label: "System monospace stack", css: SYSTEM_MONO },
];

const PX_SIZES: Option[] = [
  { value: "xs", label: "extra small (13px)", css: "13px" },
  { value: "s", label: "small (14px)", css: "14px" },
  { value: "m", label: "medium (15px)", css: "15px" },
  { value: "l", label: "large (16px)", css: "16px" },
  { value: "xl", label: "extra large (17px)", css: "17px" },
];

const LINE_SPACINGS: Option[] = [
  { value: "small", label: "small", css: "calc(var(--rs-font-size, 15px) + 6px)" },
  { value: "medium", label: "medium", css: "calc(var(--rs-font-size, 15px) + 8px)" },
  { value: "large", label: "large", css: "calc(var(--rs-font-size, 15px) + 10px)" },
];

const HEADING_SIZES: Option[] = [
  { value: "text", label: "text (1rem)", css: "1rem" },
  { value: "xs", label: "extra small (1.2rem)", css: "1.2rem" },
  { value: "s", label: "small (1.4rem)", css: "1.4rem" },
  { value: "m", label: "medium (1.8rem)", css: "1.8rem" },
  { value: "l", label: "large (2.4rem)", css: "2.4rem" },
  { value: "xl", label: "extra large (3.2rem)", css: "3.2rem" },
];

const HEADING_SPACINGS: Option[] = [
  { value: "small", label: "small", css: "0" },
  { value: "medium", label: "medium", css: "0.5" },
  { value: "large", label: "large", css: "1" },
];

export const UNDERLINES: Option[] = [
  { value: "none", label: "none", css: "none" },
  { value: "dotted", label: "dotted", css: "1px dotted" },
  { value: "thin", label: "thin (1px)", css: "1px solid" },
  { value: "medium", label: "medium (2px)", css: "2px solid" },
  { value: "fat", label: "fat (3px)", css: "3px solid" },
];

const WEIGHTS: Option[] = [
  { value: "normal", label: "normal", css: "400" },
  { value: "bold", label: "bold", css: "700" },
];

const PADDINGS: Option[] = [
  { value: "none", label: "none", css: "0" },
  { value: "slight", label: "slight", css: "1px 2px" },
  { value: "medium", label: "medium", css: "2px 5px" },
  { value: "large", label: "large", css: "2px 10px" },
];

const INLINE_SIZES: Option[] = [
  { value: "text", label: "text (1rem)", css: "1rem" },
  { value: "xs", label: "extra small (0.9rem)", css: "0.9rem" },
  { value: "s", label: "small (0.95rem)", css: "0.95rem" },
  { value: "m", label: "medium (1rem)", css: "1rem" },
  { value: "l", label: "large (1.05rem)", css: "1.05rem" },
  { value: "xl", label: "extra large (1.1rem)", css: "1.1rem" },
];

const RADII: Option[] = [
  { value: "none", label: "none", css: "0" },
  { value: "slight", label: "slight (2px)", css: "2px" },
  { value: "medium", label: "medium (5px)", css: "5px" },
  { value: "heavy", label: "heavy (10px)", css: "10px" },
];

const plain = (values: readonly string[]): Option[] => values.map((value) => ({ value, label: value }));

// ---------------------------------------------------------------- helpers

const tokens = (...names: string[]): TokenTarget => ({ kind: "tokens", tokens: names });

function choice(key: string, label: string, description: string, options: Option[], target: ChoiceSetting["target"], extra: Partial<ChoiceSetting> = {}): ChoiceSetting {
  return { key, label, description, control: "select", options, themeDefault: true, target, ...extra };
}

const color = (key: string, label: string, description: string, token: string, extra: Partial<ColorSetting> = {}): ColorSetting => ({
  key, label, description, control: "color", target: tokens(token), ...extra,
});

const moduleSwitch = (module: string, label: string, description: string): SwitchSetting => ({
  key: `rs-module-${module}`, label, description, control: "switch", target: { kind: "module", module },
});

/** Color, underline style, underline color and weight of one kind of link. */
function linkSection(prefix: string, title: string, what: string): Section {
  const underline = `rs-${prefix}-underline`;
  return {
    title,
    settings: [
      color(`rs-${prefix}-color`, "Color", `Text color of ${what}`, `${prefix}-color`),
      choice(underline, "Underline", `Underline style of ${what}`, UNDERLINES, tokens(`${prefix}-underline`)),
      color(`rs-${prefix}-underline-color`, "Underline color", `Underline color of ${what}`, `${prefix}-underline-color`, {
        visible: (get) => get(underline) !== "none",
      }),
      choice(`rs-${prefix}-weight`, "Weight", `Font weight of ${what}`, WEIGHTS, tokens(`${prefix}-weight`)),
    ],
  };
}

/** Colors and shape of tags or date links. */
function pillSettings(prefix: "tag" | "date", what: string): Setting[] {
  return [
    color(`rs-${prefix}-color`, "Color", `Text color of ${what}`, `${prefix}-color`),
    color(`rs-${prefix}-background`, "Background", `Background color of ${what}`, `${prefix}-background`),
    choice(`rs-${prefix}-padding`, "Padding", `Padding of ${what}`, PADDINGS, tokens(`${prefix}-padding`)),
    choice(`rs-${prefix}-underline`, "Underline", `Underline style of ${what}`, UNDERLINES, tokens(`${prefix}-underline`)),
    color(`rs-${prefix}-underline-color`, "Underline color", `Underline color of ${what}`, `${prefix}-underline-color`, {
      visible: (get) => get(`rs-${prefix}-underline`) !== "none",
    }),
    choice(`rs-${prefix}-size`, "Font size", `Font size of ${what}`, INLINE_SIZES, tokens(`${prefix}-size`)),
    choice(`rs-${prefix}-radius`, "Corner radius", `Corner radius of ${what}`, RADII, tokens(`${prefix}-radius`)),
  ];
}

function headingLevel(n: 1 | 2 | 3): Setting[] {
  return [
    choice(`rs-h${n}-size`, `Heading ${n} size`, `Font size of level-${n} headings`, HEADING_SIZES, tokens(`h${n}-size`)),
    color(`rs-h${n}-color`, `Heading ${n} color`, `Color of level-${n} headings`, `h${n}-color`),
  ];
}

// ---------------------------------------------------------------- the groups

/** How a collapsed block's bullet differs from an open one; "Theme default" keeps the theme's. */
export const COLLAPSED_BULLETS: Option[] = [
  { value: "ring", label: "Ring (as Craft and Things)" },
  { value: "intensity", label: "Intensity (as Blueprint and Gruvbox)" },
];

export const ICON_THEMES: Option[] = [
  { value: "blueprint", label: "BlueprintJS (Roam's icons)" },
  { value: "lucide", label: "Lucide" },
  { value: "phosphor", label: "Phosphor" },
];

export const GROUPS: Group[] = [
  {
    id: "theme",
    title: "Theme & Appearance",
    sections: [{
      settings: [
        choice(SETTING_THEME, "Theme", "Color theme. Every theme follows the Auto, Dark and Light modes.", plain(THEMES), { kind: "theme" }, { themeDefault: false, fallback: THEME_DEFAULT }),
        choice(SETTING_APPEARANCE, "Appearance", "Auto follows your system's light or dark preference. The top-bar button switches it too.", plain(APPEARANCES), { kind: "appearance" }, { control: "segmented", themeDefault: false, fallback: APPEARANCE_AUTO }),
        choice(SETTING_GRUVBOX_CONTRAST, "Gruvbox contrast", "Main background of Gruvbox: medium, hard (darker in Dark, lighter in Light) or soft.", plain(CONTRASTS), { kind: "contrast" }, {
          control: "segmented", themeDefault: false, fallback: CONTRAST_MEDIUM, visible: (get) => get(SETTING_THEME) === THEME_GRUVBOX,
        }),
        choice(SETTING_ICON_THEME, "Icon theme", "Icons in the top bar, sidebars and menus.", ICON_THEMES, { kind: "icon-theme" }, { themeDefault: false, fallback: "blueprint" }),
      ],
    }],
  },
  {
    id: "typography",
    title: "Typography",
    sections: [{
      settings: [
        choice("rs-font-main", "Font family", "Font of page text, references, the right sidebar and the log page", TEXT_FONTS, tokens("font-main"), { control: "font" }),
        choice("rs-font-size", "Base font size", "Root font size; other sizes scale with it", PX_SIZES, tokens("font-size")),
        choice("rs-line-spacing", "Line spacing", "Line height of block text", LINE_SPACINGS, tokens("line-height")),
      ],
    }],
  },
  {
    id: "headings",
    title: "Headings",
    sections: [{
      settings: [
        choice("rs-font-heading", "Heading font", "Font of page titles and headings", TEXT_FONTS, tokens("font-heading"), { control: "font" }),
        choice("rs-heading-spacing", "Heading spacing", "Space above and below headings", HEADING_SPACINGS, tokens("heading-spacing")),
        moduleSwitch("advanced-heading-spacing", "Advanced heading spacing", "Remove the margins of collapsed headings"),
        ...headingLevel(1),
        ...headingLevel(2),
        ...headingLevel(3),
      ],
    }],
  },
  {
    id: "code",
    title: "Code",
    sections: [{
      settings: [
        choice("rs-font-code", "Code font", "Font of code blocks, inline code and hotkey labels", CODE_FONTS, tokens("font-code", "font-code-block", "font-code-ui"), { control: "font" }),
        choice("rs-code-size", "Code font size", "Font size of code blocks and their line numbers", PX_SIZES, tokens("code-size")),
        moduleSwitch("hide-line-numbers", "Hide line numbers", "Hide the line numbers of code blocks"),
      ],
    }],
  },
  {
    id: "links",
    title: "Links",
    sections: [
      linkSection("page-link", "Page links", "page links"),
      linkSection("external-link", "External links", "external links and URLs"),
      linkSection("alias", "Reference links", "aliases to pages and blocks"),
      linkSection("block-ref", "Block references", "block references"),
    ],
  },
  {
    id: "tags",
    title: "Tags",
    sections: [{ settings: pillSettings("tag", "tags") }],
  },
  {
    id: "dates",
    title: "Dates",
    sections: [{
      settings: [
        ...pillSettings("date", "links to daily notes"),
        { key: "rs-date-icon", label: "Date icons", description: "Show a calendar icon before links to daily notes", control: "switch", target: { kind: "date-icon" } },
        moduleSwitch("non-breakable-dates", "No line break within dates", "Move a date to the next line instead of breaking it"),
      ],
    }],
  },
  {
    id: "sidebars",
    title: "Sidebars & Top Bar",
    sections: [{
      settings: [
        moduleSwitch("hide-logo", "Hide logo", "Hide the Roam Research logo"),
        moduleSwitch("hide-shortcuts", "Hide shortcuts heading", "Hide the heading of the shortcuts in the left sidebar"),
        moduleSwitch("hide-sidebar-icons", "Hide sidebar icons", "Hide the left sidebar's icons and make its entries bold"),
        moduleSwitch("masonry", "Masonry sidebar", "Arrange the right sidebar's windows as masonry columns"),
        moduleSwitch("sidebar-borders", "Remove sidebar borders", "Remove the borders of the sidebars"),
        moduleSwitch("topbar-borders", "Remove top bar borders", "Remove the borders of the top bar"),
        moduleSwitch("centered-search", "Centered search", "Center the find-or-create dialog and hide the search icon"),
        moduleSwitch("enhanced-search", "Enhanced search", "Widen the top-bar search while it has focus"),
      ],
    }],
  },
  {
    id: "blocks",
    title: "Blocks & Content",
    sections: [{
      settings: [
        choice(SETTING_COLLAPSED_BULLET, "Collapsed bullets", "How the bullet of a collapsed block stands out: a ring around it, or open bullets fainter than collapsed ones.", COLLAPSED_BULLETS, { kind: "collapsed-bullet" }),
        moduleSwitch("bullet-effects", "Bullet effects", "A subtle effect when hovering bullets"),
        moduleSwitch("subtle-controls", "Subtle controls", "Make bullets, carets and lines less prominent while a block is not focused"),
        moduleSwitch("more-room", "More room", "Hide the bullets of empty blocks"),
        moduleSwitch("done", "Strike done todos", "Strike out finished todos"),
        moduleSwitch("dynamic-images", "Dynamic image sizes", "Scale images to the full width"),
        moduleSwitch("dynamic-pdfs", "Dynamic PDF sizes", "Scale PDFs to the full width"),
        moduleSwitch("logpage-no-min-height", "Remove log page minimum height", "Remove the minimum height of the days on the log page"),
      ],
    }],
  },
  {
    id: "mobile",
    title: "Mobile",
    sections: [{
      settings: [
        choice("rs-font-size-mobile", "Mobile font size", "Base font size on screens up to 600px wide", PX_SIZES, { kind: "mobile-font-size" }),
        moduleSwitch("mobile-caret", "Mobile caret", "A bigger caret for collapsing blocks on mobile"),
        moduleSwitch("mobile-sidebar", "Mobile sidebar", "Show the right sidebar below the main window on mobile"),
      ],
    }],
  },
  {
    id: "performance",
    title: "Performance",
    sections: [{
      settings: [moduleSwitch("no-animations", "Disable animations", "Disable all animations and transitions to speed up the UI")],
    }],
  },
];

/** Every setting, in panel order. */
export const SETTINGS: Setting[] = GROUPS.flatMap((g) => g.sections.flatMap((s) => s.settings));

export const settingByKey = (key: string): Setting | undefined => SETTINGS.find((s) => s.key === key);

/** The group a setting is in. */
export const groupOf = (key: string): Group | undefined => GROUPS.find((g) => g.sections.some((s) => s.settings.some((x) => x.key === key)));

/** Every module a switch controls. */
export const MODULES: string[] = SETTINGS.flatMap((s) => (s.control === "switch" && s.target.kind === "module" ? [s.target.module] : []));

/** A setting's default: `null` (theme default) for most, a fixed value for the rest. */
export function defaultValue(setting: Setting): SettingValue {
  if (setting.control === "switch") return false;
  if (setting.control === "color") return null;
  return setting.themeDefault ? null : (setting.fallback ?? null);
}

/**
 * Stored values that earlier versions offered and that now read as another option.
 * Nothing rewrites them: "not stored" and old values stay as Roam has them.
 */
export const VALUE_ALIASES: Record<string, Record<string, string>> = {
  // Feather is no longer maintained; Lucide, its maintained fork, replaces it.
  [SETTING_ICON_THEME]: { feather: "lucide" },
};

/**
 * Reads a stored value: a valid value as stored, an alias (`VALUE_ALIASES`) as the
 * value it stands for, anything else (missing, unknown, malformed) as the setting's
 * default. Roam may store switches as booleans or as "true"/"false".
 */
export function readValue(setting: Setting, stored: unknown): SettingValue {
  if (typeof stored === "string") stored = VALUE_ALIASES[setting.key]?.[stored] ?? stored;
  if (setting.control === "switch") {
    if (stored === true || stored === "true") return true;
    if (stored === false || stored === "false") return false;
    return defaultValue(setting);
  }
  if (setting.control === "color") return parseColorChoice(stored) ? (stored as string) : null;
  return setting.options.some((o) => o.value === stored) ? (stored as string) : defaultValue(setting);
}

/** Whether a value is the setting's default (not counted as customized, not stored). */
export const isDefault = (setting: Setting, value: SettingValue): boolean => value === defaultValue(setting);
