import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { defineConfig, type Plugin } from "vitest/config";

const PREFIX = "\0css-source:";
const SUFFIX = ".source.js";

/**
 * Mirrors webpack's `asset/source` rule: `.css` imports resolve to the file's text.
 * A virtual module id (not ending in `.css`) keeps Vite's own CSS handling
 * from replacing the module with an empty one.
 */
function cssAsSource(): Plugin {
  return {
    name: "css-as-source",
    enforce: "pre",
    resolveId(source, importer) {
      if (!source.endsWith(".css") || !importer) return null;
      return PREFIX + resolve(dirname(importer), source) + SUFFIX;
    },
    load(id) {
      if (!id.startsWith(PREFIX)) return null;
      const css = readFileSync(id.slice(PREFIX.length, -SUFFIX.length), "utf8");
      return `export default ${JSON.stringify(css)};`;
    },
  };
}

export default defineConfig({
  plugins: [cssAsSource()],
  resolve: {
    // Roam provides BlueprintJS at runtime; tests use a plain-HTML stand-in.
    alias: { "@blueprintjs/core": resolve(import.meta.dirname, "test/stubs/blueprint.tsx") },
  },
  esbuild: { jsx: "transform", jsxFactory: "React.createElement", jsxFragment: "React.Fragment" },
  test: {
    environment: "jsdom",
    include: ["test/**/*.test.ts", "test/**/*.test.tsx"],
  },
});
