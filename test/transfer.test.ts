import { describe, expect, it } from "vitest";
import { SETTING_OPEN_GROUPS } from "../src/constants";
import { SETTINGS } from "../src/settings/schema";
import { SettingsStore } from "../src/settings/store";
import {
  CURRENT_VERSION,
  FORMAT,
  MAX_INPUT_LENGTH,
  applyImport,
  exportDocument,
  exportFileName,
  importPlan,
  readDocument,
  serialize,
} from "../src/settings/transfer";
import type { ExtensionAPI } from "../src/types";

/** An extension API over a map; `lag` keeps set() values queued until flushed, like Roam's async store. */
function stub(stored: Record<string, unknown> = {}, { lag = false } = {}) {
  const map = new Map<string, unknown>(Object.entries(stored));
  const queued: [string, unknown][] = [];
  const api: ExtensionAPI = {
    settings: {
      get: (key) => map.get(key) ?? null,
      set: (key, value) => {
        if (lag) queued.push([key, value]);
        else if (value === null) map.delete(key);
        else map.set(key, value);
      },
    },
  };
  const flush = () => queued.splice(0).forEach(([k, v]) => (v === null ? map.delete(k) : map.set(k, v)));
  return { api, map, flush };
}

const storeOf = (values: Record<string, unknown>, opts = {}) => {
  const s = stub(values, opts);
  return { ...s, store: new SettingsStore(s.api) };
};

/** The error of a rejected document, or "" when it was accepted. */
const errorOf = (text: string) => {
  const result = readDocument(text);
  return "error" in result ? result.error : "";
};

const read = (text: string) => {
  const result = readDocument(text);
  if ("error" in result) throw new Error(result.error);
  return result;
};

describe("Feather icon theme", () => {
  it("imports and exports a stored Feather choice as Lucide", () => {
    const result = read(JSON.stringify({ format: FORMAT, version: 1, settings: { "rs-icon-theme": "feather" } }));
    expect(result.settings).toEqual({ "rs-icon-theme": "lucide" });
    expect(result.skipped).toEqual([]);
    const { store } = storeOf({ "rs-icon-theme": "feather" });
    expect(exportDocument(store.lookup).settings).toEqual({ "rs-icon-theme": "lucide" });
  });
});

describe("export", () => {
  it("holds exactly the customized settings, in panel order", () => {
    const { store } = storeOf({ "rs-page-link-color": "rose-600", "rs-theme": "Craft", [SETTING_OPEN_GROUPS]: '["tags"]' });
    expect(exportDocument(store.lookup)).toEqual({ format: FORMAT, version: CURRENT_VERSION, settings: { "rs-theme": "Craft", "rs-page-link-color": "rose-600" } });
    expect(Object.keys(exportDocument(store.lookup).settings)).toEqual(["rs-theme", "rs-page-link-color"]);
  });

  it("is a valid, empty export when nothing is customized", () => {
    const { store } = storeOf({ "rs-appearance": "Auto", "rs-module-done": false });
    const doc = exportDocument(store.lookup);
    expect(doc.settings).toEqual({});
    expect(read(serialize(doc)).settings).toEqual({});
  });

  it("writes switches as booleans and never the panel's own state", () => {
    const { store } = storeOf({ "rs-module-done": "true", [SETTING_OPEN_GROUPS]: '["tags"]' });
    const text = serialize(exportDocument(store.lookup));
    expect((JSON.parse(text) as { settings: unknown }).settings).toEqual({ "rs-module-done": true });
    expect(text).not.toContain(SETTING_OPEN_GROUPS);
  });

  it("has the documented shape", () => {
    const { store } = storeOf({ "rs-theme": "Things", "rs-appearance": "Dark" });
    expect(JSON.parse(serialize(exportDocument(store.lookup)))).toEqual({ format: "roam-studio-settings", version: 1, settings: { "rs-theme": "Things", "rs-appearance": "Dark" } });
  });

  it("names the file with the local date", () => {
    expect(exportFileName(new Date(2026, 10, 23, 23, 30))).toBe("roam-studio-settings-2026-11-23.json");
  });
});

describe("reading a document", () => {
  it.each([
    ["not JSON", "hello"],
    ["a JSON list", "[]"],
    ["no format", JSON.stringify({ version: 1, settings: {} })],
    ["a previous Roam Studio settings object", JSON.stringify({ "css-theme": "Craft", "css-page-link-color": "rose" })],
    ["a non-integer version", JSON.stringify({ format: FORMAT, version: 1.5, settings: {} })],
    ["settings that are not an object", JSON.stringify({ format: FORMAT, version: 1, settings: [] })],
  ])("rejects %s", (_, text) => {
    expect(errorOf(text)).toContain("not a Roam Studio settings export");
  });

  it("rejects an export of a newer version", () => {
    expect(errorOf(JSON.stringify({ format: FORMAT, version: CURRENT_VERSION + 1, settings: {} }))).toContain("newer version");
  });

  it("rejects oversized input before parsing it", () => {
    expect(errorOf(" ".repeat(MAX_INPUT_LENGTH + 1))).toContain("too large");
  });

  it("skips unknown keys and invalid values and keeps the rest", () => {
    const result = read(JSON.stringify({ format: FORMAT, version: 1, settings: { "rs-theme": "Things", "rs-tag-radius": "banana", "rs-unknown": 1 } }));
    expect(result.settings).toEqual({ "rs-theme": "Things" });
    expect(result.skipped.map((s) => s.key)).toEqual(["rs-tag-radius", "rs-unknown"]);
  });

  it("skips a switch stored as text and a css-* key inside an export", () => {
    const result = read(JSON.stringify({ format: FORMAT, version: 1, settings: { "rs-module-done": "true", "css-theme": "Craft", "rs-module-masonry": true } }));
    expect(result.settings).toEqual({ "rs-module-masonry": true });
    expect(result.skipped.map((s) => s.key)).toEqual(["rs-module-done", "css-theme"]);
  });
});

describe("importing", () => {
  it("summarizes how many settings change and how many go back to their default", () => {
    const { store } = storeOf({ "rs-tag-radius": "heavy", "rs-font-size": "l", "rs-module-done": true });
    const plan = importPlan({ "rs-theme": "Things", "rs-appearance": "Dark" }, store);
    expect(plan.changed).toHaveLength(2);
    expect(plan.reset).toHaveLength(3);
  });

  it("applies theme and appearance first", () => {
    const { store } = storeOf({});
    const plan = importPlan({ "rs-page-link-color": "rose-600", "rs-appearance": "Dark", "rs-theme": "Gruvbox" }, store);
    expect(plan.set.map(([k]) => k)).toEqual(["rs-theme", "rs-appearance", "rs-page-link-color"]);
  });

  it("leaves nothing stored after an empty import, apart from the panel's own state", () => {
    const { store, map } = storeOf({ "rs-tag-radius": "heavy", "rs-appearance": "Auto", [SETTING_OPEN_GROUPS]: '["tags"]' });
    applyImport(importPlan({}, store), store);
    expect([...map.keys()]).toEqual([SETTING_OPEN_GROUPS]);
    for (const s of SETTINGS) expect(store.raw(s.key)).toBeNull();
  });

  it("round-trips: an export right after an import equals the imported document, also while Roam stores asynchronously", () => {
    const { store: a } = storeOf({ "rs-theme": "Craft", "rs-page-link-color": "rose-600", "rs-module-done": true });
    const text = serialize(exportDocument(a.lookup));
    const b = storeOf({ "rs-tag-radius": "heavy", "rs-theme": "Things", [SETTING_OPEN_GROUPS]: '["dates"]' }, { lag: true });
    applyImport(importPlan(read(text).settings, b.store), b.store);
    expect(serialize(exportDocument(b.store.lookup))).toBe(text);
    b.flush();
    expect(serialize(exportDocument(b.store.lookup))).toBe(text);
    expect(b.map.get(SETTING_OPEN_GROUPS)).toBe('["dates"]');
  });

  it("notifies the store's listeners for every key it writes", () => {
    const { store } = storeOf({ "rs-tag-radius": "heavy" });
    const keys: string[] = [];
    store.subscribe((k) => keys.push(k));
    applyImport(importPlan({ "rs-theme": "Things" }, store), store);
    expect(keys).toEqual(["rs-theme", "rs-tag-radius"]);
  });
});
