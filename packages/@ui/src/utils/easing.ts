/**
 * Micro interaction easing functions for consistent, polished animations.
 * These bezier curves are optimized for button transitions, hover effects, and focus states.
 */

export const EASING_FUNCTIONS = {
  smoothSettle: {
    name: "Smooth Settle",
    bezier: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    cssVar: "var(--ease-smooth-settle)",
    description: "Gentle ease with subtle deceleration. Perfect for hovering and state changes.",
  },
  snappyPop: {
    name: "Snappy Pop",
    bezier: "cubic-bezier(0.34, 1.56, 0.64, 1.00)",
    cssVar: "var(--ease-snappy-pop)",
    description: "Bouncy easing with overshoot for tactile, responsive feedback on clicks.",
  },
  gentleEase: {
    name: "Gentle Ease",
    bezier: "cubic-bezier(0.43, 0.13, 0.23, 0.96)",
    cssVar: "var(--ease-gentle-ease)",
    description: "Smooth ease-in-out perfect for focus transitions and subtle interactions.",
  },
} as const;

export type EasingKey = keyof typeof EASING_FUNCTIONS;

export const EASING_KEYS = Object.keys(EASING_FUNCTIONS) as EasingKey[];

export function getEasingByKey(key: EasingKey) {
  return EASING_FUNCTIONS[key];
}

export function getBezierValue(key: EasingKey): string {
  return EASING_FUNCTIONS[key].bezier;
}

export function getCssVar(key: EasingKey): string {
  return EASING_FUNCTIONS[key].cssVar;
}
