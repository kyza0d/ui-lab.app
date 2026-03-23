"use client";

import * as React from "react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { Popover } from "@/components/Popover";
import css from "./Anchor.module.css";

type Orientation = "horizontal" | "vertical";
type Size = "sm" | "md" | "lg";

interface AnchorStyleSlots {
  root?: StyleValue;
  underline?: StyleValue;
  preview?: StyleValue;
}

type AnchorStylesProp = StylesProp<AnchorStyleSlots>;

const resolveAnchorBaseStyles = createStylesResolver(['root', 'underline', 'preview'] as const);

const DASHED_DIMENSIONS = {
  sm: { thickness: 1, dashLength: 8, gapLength: 4 },
  md: { thickness: 2, dashLength: 8, gapLength: 4 },
  lg: { thickness: 4, dashLength: 10, gapLength: 6 },
} as const;

const DOTTED_DIMENSIONS = {
  sm: { thickness: 1, radius: 0.5, spacing: 6 },
  md: { thickness: 2, radius: 1, spacing: 8 },
  lg: { thickness: 4, radius: 2, spacing: 12 },
} as const;

function getPath(orientation: Orientation, size: Size): string {
  const { thickness, dashLength, gapLength } = DASHED_DIMENSIONS[size];
  const totalLength = dashLength + gapLength;

  if (orientation === "horizontal") {
    return `%3Csvg width='${totalLength}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${dashLength}' height='${thickness}' fill='%23ffffff'/%3E%3C/svg%3E`;
  }
  return `%3Csvg width='${thickness}' height='${totalLength}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${thickness}' height='${dashLength}' fill='%23ffffff'/%3E%3C/svg%3E`;
}

function getDottedMaskSvg(orientation: Orientation, size: Size): string {
  const { thickness, radius, spacing } = DOTTED_DIMENSIONS[size];

  if (orientation === "horizontal") {
    return `%3Csvg width='${spacing}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;
  }
  return `%3Csvg width='${thickness}' height='${spacing}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;
}

// --- Sub-components ---

export interface AnchorPreviewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AnchorPreview = React.forwardRef<HTMLSpanElement, AnchorPreviewProps>(
  ({ children }, ref) => {
    return <span ref={ref as React.Ref<HTMLSpanElement>} style={{ display: "none" }}>{children}</span>;
  },
);
AnchorPreview.displayName = "Anchor.Preview";

interface AnchorUnderlineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controls the line style of the underline */
  variant?: "solid" | "dashed" | "dotted";
}

const AnchorUnderline = React.forwardRef<HTMLDivElement, AnchorUnderlineProps>(
  ({ className, variant = "solid", style, ...props }, ref) => {
    const getMaskStyles = (): React.CSSProperties => {
      if (variant === "solid") return {}

      const orientation = "horizontal";
      const size = "sm";

      const svgDataUri = variant === "dashed" ? getPath(orientation, size) : getDottedMaskSvg(orientation, size);
      const maskRepeat = "repeat-x";
      const encodedSvg = `url("data:image/svg+xml,${svgDataUri}")`;

      return {
        WebkitMaskImage: encodedSvg,
        maskImage: encodedSvg,
        WebkitMaskRepeat: maskRepeat,
        maskRepeat: maskRepeat,
      } as React.CSSProperties;
    };

    return (
      <span
        ref={ref}
        className={cn(css.underline, className)}
        style={{ ...getMaskStyles(), ...style }}
        {...props}
      />
    );
  }
);
AnchorUnderline.displayName = "Anchor.Underline";

// --- Main Anchor Component ---

export interface AnchorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  children?: React.ReactNode;
  /** Additional CSS class for the anchor element */
  className?: string;
  /** URL the anchor navigates to */
  href?: string;
  /** Browsing context for the link (e.g. "_blank") */
  target?: string;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: AnchorStylesProp;
}

const AnchorRoot = React.forwardRef<HTMLAnchorElement | HTMLSpanElement, AnchorProps>(
  ({ className, children, href, target = "_blank", styles, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    let previewContent: React.ReactNode = null;
    let hasUnderline = false;

    const childrenArray = React.Children.toArray(children);
    const resolved = resolveAnchorBaseStyles(styles);

    let filteredChildren: React.ReactNode[] = [];

    // Extract preview content and filter it out from rendered children
    React.Children.forEach(childrenArray, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === AnchorPreview) {
          previewContent = (child.props as any).children;
          // Don't add to filteredChildren
        } else if (child.type === AnchorUnderline) {
          hasUnderline = true;
          // Clone AnchorUnderline to inject resolved.underline
          const underlineChild = child as React.ReactElement<AnchorUnderlineProps>;
          filteredChildren.push(React.cloneElement(underlineChild, {
            className: cn(underlineChild.props.className, resolved.underline),
          }));
        } else {
          filteredChildren.push(child);
        }
      } else {
        filteredChildren.push(child);
      }
    });

    // Inject default underline if none provided
    if (!hasUnderline) {
      filteredChildren.push(<AnchorUnderline key="__default_underline" className={resolved.underline} />);
    }

    const triggerElement = href ? (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={cn('anchor', 'trigger', css.trigger, resolved.root)}
      >
        {filteredChildren}
      </a>
    ) : (
      <span ref={ref as React.Ref<HTMLSpanElement>} className={cn('anchor', 'trigger', css.trigger, resolved.root)}>{filteredChildren}</span>
    );

    // If no preview content, render trigger directly without popover
    if (!previewContent) {
      return triggerElement;
    }

    return (
      <Popover
        content={previewContent}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        position="bottom"
        className={cn('preview', css.preview, className, resolved.preview)}
        {...props}
      >
        {triggerElement}
      </Popover>
    );
  },
);
AnchorRoot.displayName = "Anchor";

// Compound component with attached sub-components
const Anchor = React.forwardRef<HTMLDivElement, AnchorProps & { Preview: typeof AnchorPreview; Underline: typeof AnchorUnderline }>((props, ref) => {
  return <AnchorRoot ref={ref} {...props} />;
}) as React.ForwardRefExoticComponent<AnchorProps & React.RefAttributes<HTMLDivElement>> & { Preview: typeof AnchorPreview; Underline: typeof AnchorUnderline };

Anchor.displayName = "Anchor";
Anchor.Preview = AnchorPreview;
Anchor.Underline = AnchorUnderline;

export { Anchor };
