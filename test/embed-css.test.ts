import { mkdtempSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import webpack from "webpack";
import extension from "../src/index";
import { STYLE_ELEMENT_ID } from "../src/constants";

const require = createRequire(import.meta.url);
const baseConfig = require("../webpack.config.js") as webpack.Configuration;

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));
const fixtureCss = here("fixtures/tricky.css");

function bundle(entry: string, outDir: string): Promise<void> {
  return new Promise((done, fail) => {
    webpack(
      {
        ...baseConfig,
        entry,
        mode: "none",
        // CommonJS output so the test can load the bundle with require();
        // the module rules under test are the real ones.
        output: { filename: "bundle.js", path: outDir, library: { type: "commonjs2" } },
        experiments: {},
      },
      (err, stats) => {
        if (err) return fail(err);
        if (stats?.hasErrors()) return fail(new Error(stats.toString("errors-only")));
        done();
      },
    );
  });
}

describe("compiled CSS is embedded unchanged", () => {
  it("webpack keeps backslashes, quotes and line breaks byte for byte", async () => {
    const outDir = mkdtempSync(join(tmpdir(), "rs-embed-"));
    await bundle(here("fixtures/embed-entry.ts"), outDir);
    const output = require(join(outDir, "bundle.js")) as { default: string };
    expect(output.default).toBe(readFileSync(fixtureCss, "utf8"));
  }, 30_000);

  it("onload injects the default theme's CSS (Quattro) exactly as compiled", () => {
    extension.onload({ extensionAPI: { settings: { get: () => null, set: () => undefined } } });
    const compiled = readFileSync(here("../src/themes/quattro.css"), "utf8");
    expect(document.getElementById(STYLE_ELEMENT_ID)?.textContent).toBe(compiled);
    extension.onunload();
  });

  it("onload injects the Gruvbox CSS exactly as compiled when Gruvbox is selected", () => {
    const stored = new Map<string, unknown>([["rs-theme", "Gruvbox"]]);
    extension.onload({ extensionAPI: { settings: { get: (key) => stored.get(key) ?? null, set: (key, value) => void stored.set(key, value) } } });
    const compiled = readFileSync(here("../src/themes/gruvbox.css"), "utf8");
    expect(document.getElementById(STYLE_ELEMENT_ID)?.textContent).toBe(compiled);
    extension.onunload();
  });
});
