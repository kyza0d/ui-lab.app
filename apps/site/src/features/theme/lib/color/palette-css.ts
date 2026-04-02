import type { ColorPalette } from './types';
import { oklchToCss } from './conversions';

export const paletteToCssVars = (name: string, p: ColorPalette): Record<string, string> => {
  const vars: Record<string, string> = {};
  Object.entries(p).forEach(([shade, color]) => {
    if (color) vars[`--${name}-${shade}`] = oklchToCss(color);
  });
  return vars;
};
