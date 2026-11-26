/**
 * Export and import of the Roam Studio customization (`settings-transfer`).
 *
 * An export is a JSON document with every setting that differs from its default.
 * An import replaces the whole customization: the document's settings take its
 * values, every other setting goes back to its default. Validity is the schema's
 * (`readValue`), the same rule loading uses, so an import never stores a value the
 * extension would ignore.
 */
import { SETTING_APPEARANCE, SETTING_THEME } from "../constants";
import { SETTINGS, isDefault, readValue, settingByKey, type Lookup } from "./schema";
import type { SettingsStore } from "./store";

export const FORMAT = "roam-studio-settings";
export const CURRENT_VERSION = 1;
/** Larger input is not an export of this extension (a full export is a few KB). */
export const MAX_INPUT_LENGTH = 1_000_000;

export interface SettingsDocument {
  format: typeof FORMAT;
  version: number;
  settings: Record<string, string | boolean>;
}

/** The document for the current customization: non-default values, in panel order. */
export function exportDocument(lookup: Lookup): SettingsDocument {
  const settings: Record<string, string | boolean> = {};
  for (const setting of SETTINGS) {
    const value = lookup(setting.key);
    if (value !== null && !isDefault(setting, value)) settings[setting.key] = value;
  }
  return { format: FORMAT, version: CURRENT_VERSION, settings };
}

export const serialize = (document: SettingsDocument): string => `${JSON.stringify(document, null, 2)}\n`;

const pad = (n: number) => String(n).padStart(2, "0");

/** `roam-studio-settings-YYYY-MM-DD.json`, with the local date. */
export const exportFileName = (date: Date): string =>
  `${FORMAT}-${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}.json`;

export interface SkippedEntry {
  key: string;
  reason: string;
}

export type ReadResult =
  | { error: string }
  | { settings: Record<string, string | boolean>; skipped: SkippedEntry[] };

const NOT_AN_EXPORT = "This is not a Roam Studio settings export.";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Reads a document. A text that is not an export of this extension (or of a newer
 * version) is an error; within an export, unknown keys and values the setting would
 * not keep are skipped, each with a reason.
 */
export function readDocument(text: string): ReadResult {
  if (text.length > MAX_INPUT_LENGTH) return { error: `${NOT_AN_EXPORT} It is too large.` };
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { error: NOT_AN_EXPORT };
  }
  if (!isObject(parsed) || parsed.format !== FORMAT) return { error: NOT_AN_EXPORT };
  const { version } = parsed;
  if (typeof version !== "number" || !Number.isInteger(version) || version < 1) return { error: `${NOT_AN_EXPORT} Its version is not valid.` };
  if (version > CURRENT_VERSION) return { error: "This export comes from a newer version of Roam Studio. Update Roam Studio to import it." };
  if (!isObject(parsed.settings)) return { error: `${NOT_AN_EXPORT} It has no settings.` };

  const settings: Record<string, string | boolean> = {};
  const skipped: SkippedEntry[] = [];
  for (const [key, value] of Object.entries(parsed.settings)) {
    const setting = settingByKey(key);
    if (!setting) {
      skipped.push({ key, reason: "not a Roam Studio setting" });
      continue;
    }
    // Kept only when the setting would read it back unchanged (switches as booleans).
    const valid = (typeof value === "string" || typeof value === "boolean") && readValue(setting, value) === value;
    if (!valid) {
      skipped.push({ key, reason: `not a valid value (${JSON.stringify(value)})` });
      continue;
    }
    settings[key] = value;
  }
  return { settings, skipped };
}

export interface ImportPlan {
  /** Settings the document sets, in the order they are applied (theme and appearance first). */
  set: [string, string | boolean][];
  /** Settings whose effective value changes. */
  changed: string[];
  /** Customized settings the document does not name: they go back to their default. */
  reset: string[];
  /** Every stored setting the document does not name, also those stored at their default. */
  clear: string[];
}

const FIRST = [SETTING_THEME, SETTING_APPEARANCE];

/** What applying the document's settings would do to the current customization. */
export function importPlan(settings: Record<string, string | boolean>, store: SettingsStore): ImportPlan {
  const ordered = Object.entries(settings).sort(([a], [b]) => rank(a) - rank(b));
  const changed = ordered.filter(([key, value]) => store.get(key) !== value).map(([key]) => key);
  const others = SETTINGS.filter((s) => !(s.key in settings));
  const reset = others.filter((s) => !isDefault(s, store.get(s.key))).map((s) => s.key);
  const clear = others.filter((s) => store.raw(s.key) !== null).map((s) => s.key);
  return { set: ordered, changed, reset, clear };
}

function rank(key: string): number {
  const at = FIRST.indexOf(key);
  if (at >= 0) return at;
  return FIRST.length + SETTINGS.findIndex((s) => s.key === key);
}

/** Applies a plan: the document's values, then every other stored setting cleared. */
export function applyImport(plan: ImportPlan, store: SettingsStore): void {
  for (const [key, value] of plan.set) store.set(key, value);
  for (const key of plan.clear) store.set(key, null);
}

