import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["extension.js", "node_modules/"] },
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.mts"],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: { allowDefaultProject: ["*.mts"] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["webpack.config.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
  },
);
