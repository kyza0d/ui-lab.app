/**
 * CSS for color blending based on progress variable
 * Smoothly blends between two CSS variables using color-mix()
 * Progress goes from 0 (start color) to 1 (end color)
 */
export const COLOR_BLEND_CSS = `
  .grid-item {
    border-color: color-mix(
      in srgb,
      var(--color-background-700) calc(100% - var(--color-progress, 0) * 100%),
      var(--color-accent-500) calc(var(--color-progress, 0) * 100%)
    );
  }
`;

export const FLEX_BLEND_CSS = `
  .flex-item {
    border-color: color-mix(
      in srgb,
      var(--color-background-700) calc(100% - var(--color-progress, 0) * 100%),
      var(--color-accent-500) calc(var(--color-progress, 0) * 100%)
    );
  }
`;
