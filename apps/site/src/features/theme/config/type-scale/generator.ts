import { scaleNameMap } from "./constants";

export function getScaleName(ratio: number): string {
  const rounded = Math.round(ratio * 1000) / 1000;
  const entries = Object.entries(scaleNameMap);
  const closest = entries.reduce((prev, curr) =>
    Math.abs((curr[0] as unknown as number) - ratio) <
      Math.abs((prev[0] as unknown as number) - ratio)
      ? curr
      : prev,
  );
  return closest[1];
}
