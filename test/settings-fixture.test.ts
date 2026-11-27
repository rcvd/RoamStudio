import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { settingsCss } from "../src/settings/apply";
import { SettingsStore } from "../src/settings/store";
import { GROUPS } from "../src/settings/schema";

const SECTIONS_SETTINGS = () => GROUPS.flatMap((g) => g.sections.flatMap((s) => s.settings));

// Fixtures for `npm run measure -- … --settings <file>.css`: each <name>.json holds
// setting values, and <name>.css the settings applier's output for them. Run the
// tests with UPDATE_FIXTURES=1 to rewrite the .css files.
const dir = resolve(dirname(fileURLToPath(import.meta.url)), "../../scripts/fixtures/settings");

describe("settings fixtures for the measure tools", () => {
  for (const name of ["custom-colors", "every-token"]) {
    it(`${name}.css is the applier's output for ${name}.json`, () => {
      const values = JSON.parse(readFileSync(resolve(dir, `${name}.json`), "utf8")) as Record<string, unknown>;
      const store = new SettingsStore({ settings: { get: (key) => values[key] ?? null, set: () => undefined } });
      const css = settingsCss(store.lookup);
      const file = resolve(dir, `${name}.css`);
      if (process.env.UPDATE_FIXTURES) writeFileSync(file, css);
      expect(existsSync(file) ? readFileSync(file, "utf8") : "").toBe(css);
      // A setting writes one declaration per token it targets (the code font writes three).
      const written = Object.keys(values).reduce((n, key) => {
        const target = SECTIONS_SETTINGS().find((s) => s.key === key)?.target;
        return n + (target && "tokens" in target ? target.tokens.length : 1);
      }, 0);
      expect(css.match(/^ {2}--rs-(?!x-)/gm)?.length).toBe(written);
    });
  }

  // The settings reach check (`npm run measure -- reach`) needs a value for every token a
  // setting writes, each different from what Blueprint and every theme use, so that a
  // target computing the chosen value proves the setting reached it.
  it("every-token sets every token setting to a value no theme uses", () => {
    const values = JSON.parse(readFileSync(resolve(dir, "every-token.json"), "utf8")) as Record<string, unknown>;
    const store = new SettingsStore({ settings: { get: (key) => values[key] ?? null, set: () => undefined } });
    const declared = new Map([...settingsCss(store.lookup).matchAll(/^ {2}(--rs-[a-z0-9-]+): (.+);$/gm)].map((m) => [m[1], m[2]]));
    const tokenSettings = SECTIONS_SETTINGS().filter((s) => s.target && "tokens" in s.target);
    for (const setting of tokenSettings) expect(values, `${setting.key} is missing`).toHaveProperty(setting.key);
    const tokens = JSON.parse(readFileSync(resolve(dir, "../../../src/roam/tokens.json"), "utf8")) as Record<string, { value?: string; light?: string; dark?: string }>;
    const themesDir = resolve(dir, "../../../plugin/src/themes");
    const themeValue = (css: string, name: string) => css.match(new RegExp(`(?:^|[;{\\s])${name}:\\s*([^;}]+)`))?.[1].trim();
    const themes = ["blueprint", "gruvbox", "quattro", "craft", "things"].map((t) => readFileSync(resolve(themesDir, `${t}.css`), "utf8"));
    for (const [name, value] of declared) {
      // `--rs-x-…` are local variables the rule file reads, not tokens.
      if (name.startsWith("--rs-x-")) continue;
      const token = tokens[name.slice(5)];
      expect(token, `${name} is not a token`).toBeDefined();
      for (const v of [token.value, token.light, token.dark]) if (v) expect(value, `${name} equals Blueprint's ${v}`).not.toBe(v);
      for (const css of themes) {
        const own = themeValue(css, name);
        if (own) expect(value, `${name} equals a theme's ${own}`).not.toBe(own);
      }
    }
  });
});
