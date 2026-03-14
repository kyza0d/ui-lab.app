import tailwindcss from "@tailwindcss/postcss";

const MIX_FUNCTION = "mix(";
const MIX_FUNCTION_PATTERN = /(^|[^A-Za-z0-9_-])mix\(/g;

function expandMixFunctions(value: string): string {
  return value.replace(MIX_FUNCTION_PATTERN, "$1color-mix(in srgb, ");
}

function mixFunction() {
  return {
    postcssPlugin: "ui-lab-mix-function",
    Declaration(decl: { value: string }) {
      if (!decl.value.includes(MIX_FUNCTION)) return;
      decl.value = expandMixFunctions(decl.value);
    },
    AtRule(atRule: { params: string }) {
      if (!atRule.params.includes(MIX_FUNCTION)) return;
      atRule.params = expandMixFunctions(atRule.params);
    },
  };
}

export function demoteTailwindUtilityLayer() {
  return {
    postcssPlugin: "ui-lab-demote-tailwind-utility-layer",
    AtRule(atRule: { name: string; params: string; nodes?: unknown[] }) {
      // Keep library-generated utility selectors below consumer app utilities so
      // `@import "ui-lab-components/styles.css"` behaves the same as a JS CSS import.
      if (atRule.name !== "layer") return;
      if (atRule.params.trim() !== "utilities") return;
      if (!Array.isArray(atRule.nodes) || atRule.nodes.length === 0) return;

      atRule.params = "components";
    },
  };
}

export function createPostcssPlugins() {
  return [mixFunction(), tailwindcss(), demoteTailwindUtilityLayer()];
}

export default {
  plugins: createPostcssPlugins(),
};
