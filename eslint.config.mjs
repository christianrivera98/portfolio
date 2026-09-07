import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const reactCompilerRules = {
  "react-hooks/component-hook-factories": "error",
  "react-hooks/config": "error",
  "react-hooks/error-boundaries": "error",
  "react-hooks/gating": "error",
  "react-hooks/globals": "error",
  "react-hooks/immutability": "error",
  "react-hooks/incompatible-library": "error",
  "react-hooks/preserve-manual-memoization": "error",
  "react-hooks/purity": "error",
  "react-hooks/refs": "error",
  "react-hooks/set-state-in-effect": "error",
  "react-hooks/set-state-in-render": "error",
  "react-hooks/static-components": "error",
  "react-hooks/unsupported-syntax": "error",
  "react-hooks/use-memo": "error",
  "react-hooks/void-use-memo": "error",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  { rules: reactCompilerRules },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
