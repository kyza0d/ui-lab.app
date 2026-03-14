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

export default {
  plugins: [mixFunction()],
};
