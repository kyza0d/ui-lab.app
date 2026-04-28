export const GAP_STEPS = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 8,
} as const;

export type GapSize = keyof typeof GAP_STEPS;

export function resolveGapStep(gap?: GapSize): number {
  return gap ? GAP_STEPS[gap] : GAP_STEPS.md;
}
