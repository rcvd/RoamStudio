export const SETTING_APPEARANCE = "rs-appearance";

export const STYLE_ELEMENT_ID = "roamstudio-theme";
/** The user's customizations: token declarations on `:root:root`. */
export const SETTINGS_STYLE_ID = "roamstudio-settings";
/** The @font-face rules of the embedded fonts in use. */
export const FONTS_STYLE_ID = "roamstudio-fonts";

export const TOGGLE_ID_PREFIX = "roamstudioToggleDarkMode";
export const CSS_CLASS_TOGGLE = "roamstudio-dm-toggle";
export const CSS_CLASS_ICON = "roamstudio-toggle-icon";
export const CSS_CLASS_DARK = "bp3-dark";
export const CSS_CLASS_LIGHT = "bp3-light";

export const APPEARANCE_AUTO = "Auto";
export const APPEARANCE_DARK = "Dark";
export const APPEARANCE_LIGHT = "Light";
export const APPEARANCES = [APPEARANCE_AUTO, APPEARANCE_DARK, APPEARANCE_LIGHT] as const;

export const ICON_CLEAN = "clean";
export const ICON_MOON = "moon";
export const ICON_FLASH = "flash";
export const SETTING_THEME = "rs-theme";
export const SETTING_GRUVBOX_CONTRAST = "rs-gruvbox-contrast";
export const SETTING_ICON_THEME = "rs-icon-theme";
export const SETTING_COLLAPSED_BULLET = "rs-collapsed-bullet";
/** Which groups of the settings panel are open (a JSON list of group ids). */
export const SETTING_OPEN_GROUPS = "rs-panel-open-groups";

export const THEME_BLUEPRINT = "Blueprint";
export const THEME_GRUVBOX = "Gruvbox";
export const THEME_QUATTRO = "Quattro";
export const THEME_CRAFT = "Craft";
export const THEME_THINGS = "Things";
export const THEMES = [THEME_QUATTRO, THEME_CRAFT, THEME_THINGS, THEME_BLUEPRINT, THEME_GRUVBOX] as const;
/** The theme of a fresh install. */
export const THEME_DEFAULT = THEME_QUATTRO;

export const CONTRAST_MEDIUM = "medium";
export const CONTRAST_HARD = "hard";
export const CONTRAST_SOFT = "soft";
export const CONTRASTS = [CONTRAST_MEDIUM, CONTRAST_HARD, CONTRAST_SOFT] as const;

/** Classes on `<html>` that switch Gruvbox's main background; medium needs none. */
export const CSS_CLASS_GRUVBOX_HARD = "roamstudio-gruvbox-hard";
export const CSS_CLASS_GRUVBOX_SOFT = "roamstudio-gruvbox-soft";
