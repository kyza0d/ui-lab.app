import gsap from "gsap";

export interface ColorBlendAnimConfig {
  duration?: number;
  ease?: string;
}

export interface ItemAnimation {
  width: string | number;
  opacity?: number;
}

/**
 * Creates a GSAP timeline that animates color progress (0→1) alongside width/opacity changes
 * Pairs with CSS color-mix() to create smooth color transitions that respect theme changes
 *
 * @param items - HTMLElements to animate
 * @param animations - Object mapping item index to { width, opacity? }
 * @param config - Animation config { duration, ease }
 * @returns GSAP timeline (paused)
 */
export function createColorBlendTimeline(
  items: HTMLElement[],
  animations: Record<number, ItemAnimation>,
  config: ColorBlendAnimConfig = {}
): gsap.core.Timeline {
  const { duration = 0.8, ease = "power1.inOut" } = config;
  const tl = gsap.timeline({ paused: true });

  items.forEach((item, index) => {
    const animation = animations[index];
    if (!animation) return;

    tl.fromTo(
      item,
      {
        "--color-progress": 0,
        opacity: animation.opacity ?? 1,
      },
      {
        width: animation.width,
        "--color-progress": 1,
        opacity: animation.opacity ?? 0.9,
        duration,
        ease,
      },
      0 // All animations start at same time
    );
  });

  return tl;
}
