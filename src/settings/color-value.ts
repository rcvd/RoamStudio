/**
 * Color choices of the settings: a family shade (`rose-600`), the theme's accent
 * (`accent`), or nothing (the theme's default). A family shade N renders as shade N
 * in Light and as shade 1000 − N of the same family in Dark, as the previous Roam
 * Studio did.
 */
import { FAMILIES, PICKER_SHADES, SCALE, type Family, type Shade } from "./colors";

export const ACCENT = "accent";

export type ColorChoice = { family: Family; shade: Shade } | typeof ACCENT;

const isFamily = (v: string): v is Family => (FAMILIES as readonly string[]).includes(v);
const isPickerShade = (v: number): v is Shade => (PICKER_SHADES as readonly number[]).includes(v);

/** Reads a stored color value; anything unknown is no choice (theme default). */
export function parseColorChoice(value: unknown): ColorChoice | null {
  if (value === ACCENT) return ACCENT;
  if (typeof value !== "string") return null;
  const m = value.match(/^([a-z]+)-(\d{3})$/);
  if (!m) return null;
  const shade = Number(m[2]);
  return isFamily(m[1]) && isPickerShade(shade) ? { family: m[1], shade } : null;
}

/** The stored form of a choice. */
export const formatColorChoice = (choice: ColorChoice): string => (choice === ACCENT ? ACCENT : `${choice.family}-${choice.shade}`);

/** The Light and Dark hex values of a family shade. */
export function colorPair(choice: { family: Family; shade: Shade }): { light: string; dark: string } {
  return { light: SCALE[choice.family][choice.shade], dark: SCALE[choice.family][(1000 - choice.shade) as Shade] };
}

/** The CSS value of a choice, for a `--rs-…` color token. */
export function colorCss(choice: ColorChoice): string {
  if (choice === ACCENT) return "var(--rs-accent)";
  const { light, dark } = colorPair(choice);
  return light === dark ? light : `light-dark(${light}, ${dark})`;
}

/** A readable label: "rose 600", "Theme accent". */
export const colorLabel = (choice: ColorChoice): string => (choice === ACCENT ? "Theme accent" : `${choice.family} ${choice.shade}`);
