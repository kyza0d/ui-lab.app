# Animation Utilities

Reusable utilities for creating smooth GSAP animations with CSS variable-driven color blending that responds to theme changes.

## Pattern

The color-blend animation pattern works in three layers:

1. **GSAP** - Animates a progress value (0 → 1)
2. **CSS** - Uses `color-mix()` to blend colors based on progress
3. **React** - Manages lifecycle and event listeners

This approach is DRY, theme-aware, and smooth because:
- GSAP animates a numeric value (smooth interpolation)
- CSS `color-mix()` handles color blending automatically
- Theme changes update CSS variables, so colors update mid-animation if needed

## Usage

### Basic Animation (GridAnimation style)

```tsx
import { useAnimationTimeline, createColorBlendTimeline, injectStyles, COLOR_BLEND_CSS } from "@/gallery/timelines";
import { useRef } from "react";

export function MyAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const createTimeline = () => {
    if (!containerRef.current) return null;
    const items = Array.from(containerRef.current.querySelectorAll(".my-item")) as HTMLElement[];

    return createColorBlendTimeline(items, {
      0: { width: "50%", opacity: 0.9 },
      1: { width: "100px", opacity: 0.8 },
    });
  };

  useAnimationTimeline({
    containerRef,
    createTimeline,
    onBeforeMount: () => injectStyles("my-animation-styles", COLOR_BLEND_CSS),
  });

  return (
    <div ref={containerRef}>
      <div className="my-item" />
      <div className="my-item" />
    </div>
  );
}
```

### Custom Color Palette

Create a CSS constant for different color pairs:

```tsx
// constants/animation-styles.ts
export const ACCENT_BLEND_CSS = `
  .my-card {
    border-color: color-mix(
      in srgb,
      var(--color-neutral-600) calc(100% - var(--color-progress, 0) * 100%),
      var(--color-success-500) calc(var(--color-progress, 0) * 100%)
    );
  }
`;

// In component:
injectStyles("my-animation-styles", ACCENT_BLEND_CSS)
```

### Custom Animation Config

```tsx
createColorBlendTimeline(items, animations, {
  duration: 1.2,  // default 0.8
  ease: "power2.out",  // default "power1.inOut"
});
```

## API Reference

### `createColorBlendTimeline(items, animations, config)`

Creates a GSAP timeline that animates `--color-progress` (0→1) alongside width/opacity.

**Parameters:**
- `items`: HTMLElement[] - Elements to animate
- `animations`: Record<index, { width, opacity? }> - Animation config per item
- `config`: { duration?, ease? } - Optional animation settings

**Returns:** `gsap.core.Timeline` (paused)

### `useAnimationTimeline({ containerRef, createTimeline, onBeforeMount? })`

React hook managing timeline lifecycle with parent element hover/leave events.

**Features:**
- Auto-plays on mouseenter
- Auto-reverses on mouseleave
- Cleans up listeners and kills timeline on unmount
- Calls `onBeforeMount` before creating timeline (inject styles here)

### `injectStyles(id, css)`

One-time CSS injection into document head (idempotent).

**Parameters:**
- `id`: Unique identifier for the style tag
- `css`: CSS content string

## Theme Responsiveness

The CSS variables (`--color-background-700`, `--color-accent-500`, etc.) update when the theme changes. Since `color-mix()` reads from CSS variables directly, color transitions automatically adapt to the new theme.

The animation progress continues smoothly during theme changes with no interruption.
