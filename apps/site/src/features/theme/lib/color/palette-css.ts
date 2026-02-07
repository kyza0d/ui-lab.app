import type { ColorPalette, ShadeScale, SemanticPalettes } from './types';
import { oklchToCss } from './conversions';

export const paletteToCssVars = (name: string, p: ColorPalette): Record<string, string> => {
  const vars: Record<string, string> = {};
  Object.entries(p).forEach(([shade, color]) => {
    if (color) vars[`--${name}-${shade}`] = oklchToCss(color);
  });
  return vars;
};

export function applyPalettesToDocument(p: { background: ColorPalette; foreground: ColorPalette; accent: ColorPalette; semantic?: SemanticPalettes }) {
  const allVars = {
    ...paletteToCssVars('background', p.background),
    ...paletteToCssVars('foreground', p.foreground),
    ...paletteToCssVars('accent', p.accent),
    ...(p.semantic ? Object.entries(p.semantic).reduce((a, [k, v]) => ({ ...a, ...paletteToCssVars(k, v) }), {}) : {})
  };
  Object.entries(allVars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v as string));
}

export function logColorVariablesForExport(p: { background: ColorPalette; foreground: ColorPalette; accent: ColorPalette; semantic?: SemanticPalettes }) {
  let out = '';
  const add = (name: string, pal: ColorPalette) => {
    const shades = (Object.keys(pal) as unknown as ShadeScale[]).filter((s) => pal[s]).sort((a, b) => Number(a) - Number(b));
    out += `\n/* ${name.charAt(0).toUpperCase() + name.slice(1)} Palette */\n` + shades.map(s => `--color-${name}-${s}: ${oklchToCss(pal[s]!)};`).join('\n') + '\n';
  };
  add('background', p.background); add('foreground', p.foreground); add('accent', p.accent);
  if (p.semantic) Object.entries(p.semantic).forEach(([k, v]) => add(k, v));
  console.log(out);
}
