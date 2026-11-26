/**
 * Dark/light mode toggle for Roam Studio.
 *
 * Mounts a button in the Roam top bar that cycles through
 * Auto → Dark → Light appearance modes. Reads and writes
 * the `rs-appearance` setting through the settings store, so the
 * settings panel shows the same mode.
 */
import {
  SETTING_APPEARANCE,
  TOGGLE_ID_PREFIX,
  CSS_CLASS_TOGGLE,
  CSS_CLASS_ICON,
  CSS_CLASS_DARK,
  CSS_CLASS_LIGHT,
  APPEARANCE_AUTO,
  APPEARANCE_DARK,
  APPEARANCE_LIGHT,
  ICON_CLEAN,
  ICON_MOON,
  ICON_FLASH,
} from "../constants";
import type { SettingsStore } from "../settings/store";

function createIconButton(icon: string) {
  const popoverButton = document.createElement("span");
  popoverButton.className = "bp3-popover-wrapper";

  const popoverIcon = document.createElement("span");
  popoverIcon.className = `bp3-button bp3-minimal bp3-small bp3-icon-${icon} ${CSS_CLASS_TOGGLE} ${CSS_CLASS_ICON}`;

  popoverButton.appendChild(popoverIcon);

  return popoverButton;
}

/** Removes the forced-mode theme classes from `<html>`. */
function clearAppearanceClasses() {
  document.documentElement.classList.remove(CSS_CLASS_DARK, CSS_CLASS_LIGHT);
}

/**
 * Applies the given appearance mode to the DOM.
 * Removes any prior theme classes and sets the new mode's class.
 * The toggle button icon is updated only if the button is mounted.
 */
export function setAppearance(mode: string) {
  clearAppearanceClasses();
  let icon: string;
  if (mode === APPEARANCE_AUTO) {
    icon = ICON_CLEAN;
  } else if (mode === APPEARANCE_DARK) {
    icon = ICON_MOON;
    document.documentElement.classList.add(CSS_CLASS_DARK);
  } else {
    icon = ICON_FLASH;
    document.documentElement.classList.add(CSS_CLASS_LIGHT);
  }

  const btn = document.querySelector(`.${CSS_CLASS_ICON}`);
  if (!btn) return;

  btn.classList.remove("bp3-icon-clean", "bp3-icon-moon", "bp3-icon-flash");
  btn.classList.add(`bp3-icon-${icon}`);
}

/**
 * Cycles the appearance mode: Auto → Dark → Light → Auto.
 * Persists the new mode and applies it to the DOM.
 */
export function toggleAppearance(store: SettingsStore) {
  let mode = String(store.get(SETTING_APPEARANCE) ?? APPEARANCE_AUTO);

  if (mode === APPEARANCE_AUTO) {
    mode = APPEARANCE_DARK;
  } else if (mode === APPEARANCE_DARK) {
    mode = APPEARANCE_LIGHT;
  } else {
    mode = APPEARANCE_AUTO;
  }

  store.set(SETTING_APPEARANCE, mode);
  setAppearance(mode);
}

/** Returns the BlueprintJS icon name for a given appearance mode. */
function iconForMode(mode: string): string {
  switch (mode) {
    case APPEARANCE_AUTO:  return ICON_CLEAN;
    case APPEARANCE_DARK:  return ICON_MOON;
    case APPEARANCE_LIGHT: return ICON_FLASH;
    default:               return ICON_MOON;
  }
}

/**
 * Creates the dark/light mode toggle button and inserts it
 * into the Roam top bar. Only creates the button once —
 * subsequent calls are no-ops if the button already exists.
 */
export function createToggle(store: SettingsStore) {
  const mode = String(store.get(SETTING_APPEARANCE) ?? APPEARANCE_AUTO);
  const iconName = iconForMode(mode);

  const flexSpaceId = `${TOGGLE_ID_PREFIX}-flex-space`;
  const checkForButton = document.getElementById(flexSpaceId);
  if (!checkForButton) {
    const mainButton = createIconButton(iconName);
    const roamTopbar = document.getElementsByClassName("rm-topbar");
    const nextIconButton = roamTopbar[0]?.lastElementChild;

    if (nextIconButton) {
      const flexDiv = document.createElement("div");
      flexDiv.className = `rm-topbar__spacer-sm ${CSS_CLASS_TOGGLE}`;
      flexDiv.id = flexSpaceId;

      const flexDivAfter = document.createElement("div");
      flexDivAfter.className = `rm-topbar__spacer-sm ${CSS_CLASS_TOGGLE}`;
      flexDivAfter.id = `${TOGGLE_ID_PREFIX}-flex-space-after`;

      nextIconButton.insertAdjacentElement("afterend", mainButton);
      mainButton.insertAdjacentElement("beforebegin", flexDiv);
      mainButton.insertAdjacentElement("afterend", flexDivAfter);
      mainButton.addEventListener("click", () => toggleAppearance(store));
    }

    setAppearance(mode);
  }
}

/**
 * Removes all dark/light mode toggle elements from the DOM and the
 * forced-mode theme classes from `<html>`.
 * Safe to call even if the toggle has already been removed.
 */
export function destroyToggle() {
  document.querySelectorAll(`.${CSS_CLASS_TOGGLE}`).forEach((tog) => tog.remove());
  clearAppearanceClasses();
}