import type { OklchColor } from './types';

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const rnd = (n: number, p = 1000) => Math.round(n * p) / p;

export function hexToOklch(hex: string): OklchColor {
  const n = parseInt(hex.replace('#', ''), 16);
  const toL = (c: number) => (c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const [r, g, b] = [toL(n >> 16), toL((n >> 8) & 0xFF), toL(n & 0xFF)];

  const x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  const y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
  const z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;

  const l__ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
  const m__ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
  const s__ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z);

  const finalL = 0.2104542553 * l__ + 0.7936177850 * m__ - 0.0040720468 * s__;
  const a = 1.9779984951 * l__ - 2.4285922050 * m__ + 0.4505937099 * s__;
  const b_ = 0.0259040371 * l__ + 0.7827717662 * m__ - 0.8086757660 * s__;

  const c = Math.sqrt(a * a + b_ * b_);
  const h = (Math.atan2(b_, a) * (180 / Math.PI) + 360) % 360;
  return { l: rnd(finalL), c: rnd(c), h: rnd(h, 10) };
}

export function oklchToHex({ l, c, h }: OklchColor): string {
  const hr = h * Math.PI / 180;
  const [a, b_] = [c * Math.cos(hr), c * Math.sin(hr)];

  const [l_, m_, s_] = [
    l + 0.3963377774 * a + 0.2158037573 * b_,
    l - 0.1055613458 * a - 0.0638541728 * b_,
    l - 0.0894841775 * a - 1.2914855480 * b_
  ].map(v => v ** 3);

  const x = 1.2270138511 * l_ - 0.5577999807 * m_ + 0.2812561490 * s_;
  const y = -0.0405801784 * l_ + 1.1122568696 * m_ - 0.0716766787 * s_;
  const z = -0.0763812845 * l_ - 0.4214819784 * m_ + 1.5861632204 * s_;

  const toS = (v: number) => {
    v = clamp(v);
    return Math.round(255 * (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055));
  };

  const rgb = [
    3.2404542 * x - 1.5371385 * y - 0.4985314 * z,
    -0.9692660 * x + 1.8760108 * y + 0.0415560 * z,
    0.0556434 * x - 0.2040259 * y + 1.0572252 * z
  ].map(toS);

  return `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

export const oklchToCss = (c: OklchColor) => `oklch(${(c.l * 100).toFixed(1)}% ${c.c.toFixed(3)} ${c.h.toFixed(1)})`;

export function cssToOklch(css: string): OklchColor | null {
  const m = css.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)\s*\)/);
  return m ? { l: parseFloat(m[1]) / 100, c: parseFloat(m[2]), h: parseFloat(m[3]) } : null;
}

export const adjustLightness = (k: OklchColor, amt: number): OklchColor => ({ ...k, l: clamp(k.l + amt) });
export const adjustChroma = (k: OklchColor, amt: number): OklchColor => ({ ...k, c: Math.max(0, k.c + amt) });
export const rotateHue = (k: OklchColor, deg: number): OklchColor => ({ ...k, h: (k.h + deg + 360) % 360 });
