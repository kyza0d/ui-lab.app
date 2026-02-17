export const minFontSizeConstraints = {
  xs: 0.875,
  sm: 1.0,
  md: 1.0,
  base: 1.0,
  lg: 1.125,
  xl: 1.25,
  "2xl": 1.5,
  "3xl": 1.75,
  "4xl": 2.0,
  "5xl": 2.25,
} as const;

export const staticFontSizes = {
  xs: 0.875,
  sm: 0.9375,
  md: 1.0,
  base: 1.0,
} as const;

export const fluidSizes = new Set(["lg", "xl", "2xl", "3xl", "4xl", "5xl"]);
