import * as React from "react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import styles from "./Mask.module.css";

interface MaskStyleSlots {
  root?: StyleValue;
  gradient?: StyleValue;
}

type MaskStylesProp = StylesProp<MaskStyleSlots>;

export interface MaskProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  children: React.ReactNode;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: MaskStylesProp;
}

type MaskFilter =
  | {
      kind: "fade";
      direction: NonNullable<MaskFadeProps["direction"]>;
      intensity: number;
      fixed?: boolean;
    }
  | {
      kind: "scroll-fade";
    };

const resolveMaskBaseStyles = createStylesResolver(['root', 'gradient'] as const);

const MaskRoot = React.forwardRef<HTMLDivElement, MaskProps>(
  ({ asChild = false, className, children, style, styles: stylesProp, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const maskFilters: MaskFilter[] = [];
    let clipPath: string | undefined;
    let hasFixedFade = false;
    let contentChildren: React.ReactNode[] = [];
    const supportsScrollFade = hasScrollFadeVariables(style);
    const resolved = resolveMaskBaseStyles(stylesProp);

    childArray.forEach((child) => {
      if (React.isValidElement(child)) {
        if (child.type === MaskFade) {
          const fadeChild = child as React.ReactElement<MaskFadeProps>;
          if (isScrollFade(fadeChild.props) && supportsScrollFade) {
            maskFilters.push({ kind: "scroll-fade" });
          } else {
            if (fadeChild.props.fixed) hasFixedFade = true;
            maskFilters.push({
              kind: "fade",
              direction: fadeChild.props.direction ?? "bottom",
              intensity: fadeChild.props.intensity ?? 1,
              fixed: fadeChild.props.fixed,
            });
          }
        } else if (child.type === MaskClip) {
          const clipChild = child as React.ReactElement<MaskClipProps>;
          clipPath = clipChild.props.shape;
        } else {
          contentChildren.push(child);
        }
      } else {
        contentChildren.push(child);
      }
    });

    const resolvedMaskFilters = maskFilters.map((maskFilter) => generateMaskFilter(maskFilter));

    const maskStyles = {
      ...style,
      ...(hasFixedFade ? { maxHeight: "inherit", overflow: "hidden" as const } : {}),
      ...(clipPath ? { "--mask-clip-path": clipPath } as Record<string, string> : {}),
      ...(resolvedMaskFilters.length > 0 ? {
        WebkitMaskImage: resolvedMaskFilters.join(", "),
        maskImage: resolvedMaskFilters.join(", "),
        WebkitMaskComposite: resolvedMaskFilters.length > 1 ? "source-in" : "source-over",
        maskComposite: resolvedMaskFilters.length > 1 ? "intersect" : "add",
      } : {}),
    } as React.CSSProperties;

    if (asChild) {
      if (contentChildren.length !== 1 || !React.isValidElement(contentChildren[0])) {
        throw new Error("Mask with asChild expects exactly one valid React element child.");
      }

      const child = contentChildren[0] as React.ReactElement<{
        className?: string;
        style?: React.CSSProperties;
        ref?: React.Ref<HTMLDivElement>;
      }>;

      return React.cloneElement(child, {
        ...props,
        ref: mergeRefs(ref, child.props.ref),
        className: cn("mask", styles.mask, resolved.root, className, child.props.className),
        style: {
          ...child.props.style,
          ...maskStyles,
        },
      });
    }

    return (
      <div
        {...props}
        ref={ref}
        className={cn("mask", styles.mask, resolved.root, className)}
        style={maskStyles}
      >
        {contentChildren}
      </div>
    );
  }
);

MaskRoot.displayName = "Mask";

interface MaskGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  /** CSS gradient string applied as the mask image */
  gradient: string;
}

const MaskGradient = React.forwardRef<HTMLDivElement, MaskGradientProps>(
  ({ className, gradient, style, children, ...props }, ref) => {
    const resolved = resolveMaskBaseStyles(undefined);
    const maskStyles = {
      ...style,
      "--mask-gradient": gradient,
    } as React.CSSProperties;

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.mask, styles["mask-gradient"], resolved.gradient, className)}
        style={maskStyles}
      >
        {children}
      </div>
    );
  }
);

MaskGradient.displayName = "MaskGradient";

interface MaskFadeProps {
  /** Edge of the container where the fade starts. Omit to use the variable-driven vertical scroll fade preset. */
  direction?: "top" | "bottom" | "left" | "right";
  /** Controls the size of the fade — higher values produce a longer fade */
  intensity?: number;
  /** Uses percentage-based fade size instead of pixel-based, for fixed-height containers */
  fixed?: boolean;
}

const MaskFade: React.FC<MaskFadeProps> = () => null;
MaskFade.displayName = "MaskFade";

function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(value);
        return;
      }

      (ref as React.MutableRefObject<T | null>).current = value;
    });
  };
}

function isScrollFade(props: MaskFadeProps): boolean {
  return props.direction === undefined && props.intensity === undefined && props.fixed === undefined;
}

function hasScrollFadeVariables(style: React.CSSProperties | undefined): boolean {
  if (!style) return false;

  const styleEntries = style as Record<string, unknown>;
  return "--mask-top-fade" in styleEntries || "--mask-bottom-fade" in styleEntries;
}

function generateMaskFilter(maskFilter: MaskFilter): string {
  if (maskFilter.kind === "scroll-fade") {
    return "linear-gradient(to bottom, transparent 0%, black var(--mask-top-fade, 0%), black calc(100% - var(--mask-bottom-fade, 0%)), transparent 100%)";
  }

  return generateFadeMask(maskFilter.direction, maskFilter.intensity, maskFilter.fixed);
}

function generateFadeMask(direction: string = "bottom", intensity: number = 1, fixed?: boolean): string {
  const fadeSize = fixed ? `${Math.min(50, 15 * intensity)}%` : `${Math.min(200, 40 * intensity)}px`;
  const directionMap = {
    top: `linear-gradient(to bottom, transparent 0, black ${fadeSize})`,
    bottom: `linear-gradient(to bottom, black calc(100% - ${fadeSize}), transparent 100%)`,
    left: `linear-gradient(to right, transparent 0, black ${fadeSize})`,
    right: `linear-gradient(to right, black calc(100% - ${fadeSize}), transparent 100%)`,
  };
  return directionMap[direction as keyof typeof directionMap] || directionMap.bottom;
}


interface MaskClipProps {
  /** CSS clip-path value applied to the container (e.g. polygon, circle) */
  shape: string;
}

const MaskClip: React.FC<MaskClipProps> = () => null;
MaskClip.displayName = "MaskClip";

const Mask = Object.assign(MaskRoot, {
  Gradient: MaskGradient,
  Fade: MaskFade,
  Clip: MaskClip,
});

export { Mask };
