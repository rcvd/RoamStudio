/**
 * Runtime modules: optional UI tweaks, compiled separately (src/modules/*.scss →
 * modules/*.css) and injected only while switched on, one `<style>` element each.
 * A module that is off adds no rule to the page, and switching modules never touches
 * the theme stylesheet. Modules paint only with root tokens, so the same CSS fits
 * every theme (scripts/check-palette.mjs --modules).
 *
 * Besides the module switches, the icon theme (Lucide, or Phosphor in the active theme's
 * weight), the date icon (in the active icon theme's style) and the collapsed-bullet style
 * are modules too.
 */
import advancedHeadingSpacing from "../modules/advanced-heading-spacing.css";
import bulletEffects from "../modules/bullet-effects.css";
import centeredSearch from "../modules/centered-search.css";
import collapsedBulletIntensity from "../modules/collapsed-bullet-intensity.css";
import collapsedBulletRing from "../modules/collapsed-bullet-ring.css";
import dateIcon from "../modules/date-icon.css";
import dateIconLucide from "../modules/date-icon-lucide.css";
import dateIconPhosphorLight from "../modules/date-icon-phosphor-light.css";
import dateIconPhosphorRegular from "../modules/date-icon-phosphor-regular.css";
import done from "../modules/done.css";
import dynamicImages from "../modules/dynamic-images.css";
import dynamicPdfs from "../modules/dynamic-pdfs.css";
import enhancedSearch from "../modules/enhanced-search.css";
import hideLineNumbers from "../modules/hide-line-numbers.css";
import hideLogo from "../modules/hide-logo.css";
import hideShortcuts from "../modules/hide-shortcuts.css";
import hideSidebarIcons from "../modules/hide-sidebar-icons.css";
import iconsLucide from "../modules/icons-lucide.css";
import iconsPhosphorLight from "../modules/icons-phosphor-light.css";
import iconsPhosphorRegular from "../modules/icons-phosphor-regular.css";
import themeIcons from "../themes/icons.json";
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
import { SETTING_COLLAPSED_BULLET, SETTING_ICON_THEME, SETTING_THEME } from "../constants";
import { MODULES, type Lookup } from "../settings/schema";

/** Every compiled module, by key. */
export const MODULE_CSS: Record<string, string> = {
  "advanced-heading-spacing": advancedHeadingSpacing,
  "bullet-effects": bulletEffects,
  "centered-search": centeredSearch,
  "collapsed-bullet-intensity": collapsedBulletIntensity,
  "collapsed-bullet-ring": collapsedBulletRing,
  "date-icon": dateIcon,
  "date-icon-lucide": dateIconLucide,
  "date-icon-phosphor-light": dateIconPhosphorLight,
  "date-icon-phosphor-regular": dateIconPhosphorRegular,
  "done": done,
  "dynamic-images": dynamicImages,
  "dynamic-pdfs": dynamicPdfs,
  "enhanced-search": enhancedSearch,
  "hide-line-numbers": hideLineNumbers,
  "hide-logo": hideLogo,
  "hide-shortcuts": hideShortcuts,
  "hide-sidebar-icons": hideSidebarIcons,
  "icons-lucide": iconsLucide,
  "icons-phosphor-light": iconsPhosphorLight,
  "icons-phosphor-regular": iconsPhosphorRegular,
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

/** Each theme's weight per icon set (src/themes/<theme>.json "icons"); a set left out is regular. */
const ICON_WEIGHTS = themeIcons as Record<string, Record<string, string>>;

/**
 * The icon module set the settings choose, without its `icons-`/`date-icon-` prefix:
 * `lucide`, `phosphor-<weight>` (the active theme's Phosphor weight), or null for
 * BlueprintJS's own icons.
 */
export function iconSet(get: Lookup): string | null {
  const theme = get(SETTING_ICON_THEME);
  if (theme === "lucide") return "lucide";
  if (theme === "phosphor") return `phosphor-${ICON_WEIGHTS[String(get(SETTING_THEME)).toLowerCase()]?.phosphor ?? "regular"}`;
  return null;
}

/** The modules the current settings switch on. */
export function enabledModules(get: Lookup): string[] {
  const on = MODULES.filter((key) => get(`rs-module-${key}`) === true);
  const set = iconSet(get);
  if (set) on.push(`icons-${set}`);
  if (get("rs-date-icon") === true) on.push(set ? `date-icon-${set}` : "date-icon");
  const bullet = get(SETTING_COLLAPSED_BULLET);
  if (bullet === "ring" || bullet === "intensity") on.push(`collapsed-bullet-${bullet}`);
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
