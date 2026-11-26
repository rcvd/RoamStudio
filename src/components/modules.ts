/**
 * Runtime modules: optional UI tweaks, compiled separately (src/modules/*.scss →
 * modules/*.css) and injected only while switched on, one `<style>` element each.
 * A module that is off adds no rule to the page, and switching modules never touches
 * the theme stylesheet. Modules paint only with root tokens, so the same CSS fits
 * every theme (scripts/check-palette.mjs --modules).
 *
 * Besides the module switches, the icon theme (Feather) and the date icon (in the
 * active icon theme's style) are modules too.
 */
import advancedHeadingSpacing from "../modules/advanced-heading-spacing.css";
import bulletEffects from "../modules/bullet-effects.css";
import centeredSearch from "../modules/centered-search.css";
import dateIcon from "../modules/date-icon.css";
import dateIconFeather from "../modules/date-icon-feather.css";
import done from "../modules/done.css";
import dynamicImages from "../modules/dynamic-images.css";
import dynamicPdfs from "../modules/dynamic-pdfs.css";
import enhancedSearch from "../modules/enhanced-search.css";
import hideLineNumbers from "../modules/hide-line-numbers.css";
import hideLogo from "../modules/hide-logo.css";
import hideShortcuts from "../modules/hide-shortcuts.css";
import hideSidebarIcons from "../modules/hide-sidebar-icons.css";
import iconsFeather from "../modules/icons-feather.css";
import logpageNoMinHeight from "../modules/logpage-no-min-height.css";
import masonry from "../modules/masonry.css";
import mobileCaret from "../modules/mobile-caret.css";
import mobileSidebar from "../modules/mobile-sidebar.css";
import moreRoom from "../modules/more-room.css";
import noAnimations from "../modules/no-animations.css";
import nonBreakableDates from "../modules/non-breakable-dates.css";
import sidebarBorders from "../modules/sidebar-borders.css";
import subtleControls from "../modules/subtle-controls.css";
import topbarBorders from "../modules/topbar-borders.css";
import { SETTING_ICON_THEME } from "../constants";
import { MODULES, type Lookup } from "../settings/schema";

/** Every compiled module, by key. */
export const MODULE_CSS: Record<string, string> = {
  "advanced-heading-spacing": advancedHeadingSpacing,
  "bullet-effects": bulletEffects,
  "centered-search": centeredSearch,
  "date-icon": dateIcon,
  "date-icon-feather": dateIconFeather,
  "done": done,
  "dynamic-images": dynamicImages,
  "dynamic-pdfs": dynamicPdfs,
  "enhanced-search": enhancedSearch,
  "hide-line-numbers": hideLineNumbers,
  "hide-logo": hideLogo,
  "hide-shortcuts": hideShortcuts,
  "hide-sidebar-icons": hideSidebarIcons,
  "icons-feather": iconsFeather,
  "logpage-no-min-height": logpageNoMinHeight,
  "masonry": masonry,
  "mobile-caret": mobileCaret,
  "mobile-sidebar": mobileSidebar,
  "more-room": moreRoom,
  "no-animations": noAnimations,
  "non-breakable-dates": nonBreakableDates,
  "sidebar-borders": sidebarBorders,
  "subtle-controls": subtleControls,
  "topbar-borders": topbarBorders,
};

const ID_PREFIX = "roamstudio-module-";

/** The modules the current settings switch on. */
export function enabledModules(get: Lookup): string[] {
  const on = MODULES.filter((key) => get(`rs-module-${key}`) === true);
  const feather = get(SETTING_ICON_THEME) === "feather";
  if (feather) on.push("icons-feather");
  if (get("rs-date-icon") === true) on.push(feather ? "date-icon-feather" : "date-icon");
  return on;
}

/** Adds the style element of every switched-on module and removes the others. */
export function applyModules(get: Lookup): void {
  const on = new Set(enabledModules(get));
  for (const key of Object.keys(MODULE_CSS)) {
    const id = ID_PREFIX + key;
    const existing = document.getElementById(id);
    if (!on.has(key)) {
      existing?.remove();
      continue;
    }
    if (existing) continue;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = MODULE_CSS[key];
    document.head.appendChild(style);
  }
}

export function removeModules(): void {
  document.querySelectorAll(`style[id^="${ID_PREFIX}"]`).forEach((el) => el.remove());
}
